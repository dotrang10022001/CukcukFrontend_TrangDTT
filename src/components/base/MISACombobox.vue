<template>
    <div class="popup__control">
        <label class="combobox__label" v-if="label != ''">
            <MISATextTooltip :text="label" :tooltipText="tooltipText"></MISATextTooltip> <span v-if="isRequired">(*)</span>
        </label>
        <div class="combobox__content" v-click-outside="handleOnClickOutside">
            <div class="combobox__content--main" :class="{ 'combobox__content--secondary': !canAdd }">
                <input ref="txtCombobox" class="combobox__text" type="text" :class="{ 'combobox--error': !isValid }"
                    v-on:click="handleOnClickInput" v-on:focus="handleOnClickInput" v-bind:value="modelValue"
                    v-on:input="$emit('update:modelValue', $event.target.value)" v-on:keyup="handleFilterListOptions"
                    v-on:keydown="handleEventPressKey" />
                <span v-if="canAdd" :class="{ 'icon--error': !isValid }" v-on:click="requestOpenAddPopup"><i
                        class="fa-solid fa-plus"></i></span>
            </div>
            <div class="combobox__option" v-if="isShowListOptions" :class="{'combobox__option--top': isTop, 'combobox__option--bottom': isBottom}">
                <div class="option__content">
                    <ul class="option__data">
                        <li class="option__item"
                            :class="{ 'option__item--selected': (item.key == selectedKey), 'option__item--active': (idx == index) }"
                            v-for="(item, idx) in listOfFilteredOptions" :key="idx" v-on:click="handleOnSelectOption(item)">
                            <span>{{ item.value }}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <MISAIconTooltip v-if="!isValid" class="combobox__icon" :tooltipText="error" :iconClass="ICON_CLASS.ERROR">
        </MISAIconTooltip>
    </div>
</template>
<script>
import MISA_HELPERS from '@/resources/helper';
import MISA_RESOURCES from '@/resources/resource';
import MISA_ENUMS from '@/resources/enum';
export default {
    name: "MISACombobox",
    mounted() {
        // Khởi tạo danh sách lựa chọn đã được lọc
        this.listOfFilteredOptions = this.listOfOptions;
    },
    computed: {
        /**
         * Xác định tính hợp lệ của combobox
         * Author: TrangDTT (01/05/2023)
         */
        isValid: function () {
            return this.error === "";
        },
        /**
         * Loại combobox hiển thị dropdown phía trên
         * Author: TrangDTT (07/06/2023)
         */
        isTop: function(){
            return this.comboboxType === MISA_ENUMS.COMBOBOX_TYPE.TOP;
        },
        /**
         * Loại combobox hiển thị dropdown phía dưới
         * Author: TrangDTT (07/06/2023)
         */
        isBottom: function(){
            return this.comboboxType === MISA_ENUMS.COMBOBOX_TYPE.BOTTOM;
        }
    },
    methods: {
        /**
         * Xử lý sự kiện click ô input
         * Author: TrangDTT (01/05/2023)
         */
        handleOnClickInput: function () {
            this.index = -1;
            this.$emit('update:error', '');
            // Hiển thị danh sách lựa chọn
            this.displayListOfOptions();
        },
        /**
         * Xử lý sự kiện nhấn các phím mũi tên
         * @param {*} event Sự kiện nhấn phím
         * Author: TrangDTT (04/06/2023)
         */
        handleEventPressKey: function (event) {
            // Nếu phím mũi tên đi lên được nhấn
            if (event.keyCode == 38) {
                event.preventDefault();
                this.index -= 1;
                if (this.index == -1) this.index = this.listOfFilteredOptions.length - 1;
            }
            // Nếu phím mũi tên đi xuống được nhấn
            if (event.keyCode == 40) {
                event.preventDefault();
                this.index += 1;
                if (this.index == this.listOfFilteredOptions.length) this.index = 0;
            }
            // Nếu phím enter được nhấn
            if (event.keyCode == 13) {
                this.handleOnEnterInput(event);
            }
            // Nếu phím tab được nhấn
            if (event.keyCode == 9) {
                this.handleOnTabInput(event);
            }
        },
        /**
         * Xử lý sự kiện tab combobox
         * @param {*} event Sự kiện tab combobox
         * Author: TrangDTT (01/05/2023)
         */
        handleOnTabInput: async function (event) {
            // Đóng danh sách lựa chọn đơn vị
            this.closeListOfOptions();

            // Cập nhật giá trị modelValue, selectedKey
            let value = event.target.value;
            let key = "";

            for (let i = 0; i < this.listOfOptions.length; i++) {
                if (this.listOfOptions[i].value.toLowerCase() == value.toLowerCase()) {
                    key = this.listOfOptions[i].key;
                    value = this.listOfOptions[i].value;
                    break;
                }
            }

            await this.$emit('update:modelValue', value);
            await this.$emit('update:selectedKey', key);

            // Validate giá trị combobox
            this.validate();
        },
        /**
         * Xử lý sự kiện enter chọn option
         * @param {*} event Sự kiện enter chọn option
         * Author: TrangDTT (01/05/2023)
         */
        handleOnEnterInput: async function (event) {
            let value = event.target.value;
            let key = "";

            // Nếu có lựa chọn ở vị trí index, chọn luôn lựa chọn khi ấn enter
            let idx = (this.index < 0 || this.index > (this.listOfFilteredOptions.length - 1)) ? 0 : this.index;
            if (this.listOfFilteredOptions[idx]) {
                value = this.listOfFilteredOptions[idx].value;
                key = this.listOfFilteredOptions[idx].key;
            }
            await this.$emit('update:modelValue', value);
            await this.$emit('update:selectedKey', key);

            this.validate();
            this.closeListOfOptions();
            this.$refs.txtCombobox.focus();
        },
        /**
         * Xử lý sự kiện lọc danh sách lựa chọn
         * @param {*} event Sự kiện lọc danh sách lựa chọn
         * Author: TrangDTT (01/05/2023)
         */
        handleFilterListOptions: function (event) {
            this.listOfFilteredOptions = this.listOfOptions.filter((option) => {
                return option.value.toLowerCase().includes(event.target.value.toLowerCase());
            });
        },
        /**
         * Xử lý việc chọn giá trị
         * @param {*} option Lựa chọn
         * Author: TrangDTT (01/05/2023)
         */
        handleOnSelectOption: async function (option) {
            // Thiết lập giá trị lựa chọn cho ô input
            await this.$emit('update:modelValue', option.value);
            await this.$emit('update:selectedKey', option.key);

            // Đóng danh sách lựa chọn
            this.$refs.txtCombobox.focus();
            this.closeListOfOptions();
        },
        /**
         * Yêu cầu mở hộp thoại thêm
         * Author: TrangDTT (02/06/2023)
         */
        requestOpenAddPopup: function () {
            this.closeListOfOptions();
            this.$emit("requestOpenAddPopup", { name: this.name });
        },
        /**
         * Thiết lập danh sách lựa chọn
         * @param {*} listOfOptions Danh sách lựa chọn
         * Author: TrangDTT (01/05/2023)
         */
        setListOfOptions: function (listOfOptions) {
            this.listOfOptions = listOfOptions;
            this.listOfFilteredOptions = this.listOfOptions;
        },
        /**
         * Validate dữ liệu combobox
         * Author: TrangDTT (01/05/2023)
         */
        validate: function () {
            let isValid = true;
            let error = "";
            if (this.isRequired) {
                error = this.label + MISA_RESOURCES.VALIDATION_ERROR.EMPTY;
                isValid = !(MISA_HELPERS.CHECK_EMPTY(this.modelValue));
            }

            if (isValid) {
                error = this.label + MISA_RESOURCES.VALIDATION_ERROR.NOT_EXIST;
                let isExist = false;
                if (this.modelValue) {
                    for (let i = 0; i < this.listOfOptions.length; i++) {
                        if (this.listOfOptions[i].value.toLowerCase() == this.modelValue.toLowerCase()) {
                            isExist = true;
                            this.$emit("update:selectedKey", this.listOfOptions[i].key);
                            this.$emit("update:modelValue", this.listOfOptions[i].value);
                            break;
                        }
                    }
                }
                if (!isExist) {
                    this.$emit('update:selectedKey', '');
                    if (this.modelValue) {
                        isValid = false;
                    }
                }
            }

            if (!isValid) {
                this.$emit('update:error', error);
            }
        },
        /**
         * Xử lý sự kiện click ra bên ngoài combobox
         * Author: TrangDTT (01/05/2023)
         */
        handleOnClickOutside: function () {
            if(this.isShowListOptions){
                this.validate();
            }
            this.closeListOfOptions();
        },
        /**
         * Xử lý focus combobox
         * Author: TrangDTT (10/06/2023)
         */
        focusInput: function(){
            this.$refs.txtCombobox.focus();
        },
        /**
         * Hiển thị danh sách lựa chọn
         * Author: TrangDTT (01/05/2023)
         */
        displayListOfOptions: function () {
            this.isShowListOptions = true;
        },
        /**
         * Ẩn danh sách lựa chọn
         */
        closeListOfOptions: function () {
            this.isShowListOptions = false;
        }
    },
    props: {
        // Loại combobox
        comboboxType: {
            type: Number,
            default: MISA_ENUMS.COMBOBOX_TYPE.BOTTOM
        },
        // Nhãn combobox
        label: {
            type: String,
            default: ""
        },
        // Có bắt buộc hay không
        isRequired: {
            type: Boolean,
            default: false
        },
        // Lỗi
        error: {
            type: String,
            default: ""
        },
        // Key được lựa chọn
        selectedKey: {
            type: String,
            default: ""
        },
        // Model value
        modelValue: {
            type: String,
            default: ""
        },
        // Tên combobox
        name: {
            type: String,
            default: ""
        },
        // Tooltip text
        tooltipText: {
            type: String,
            default: ""
        },
        // Có hỗ trợ thao tác thêm không
        canAdd: {
            type: Boolean,
            default: false,
        }
    },
    data() {
        return {
            // Resources
            MISA_RESOURCES: MISA_RESOURCES,
            // Helpers
            MISA_HELPERS: MISA_HELPERS,
            // Enums
            MISA_ENUMS: MISA_ENUMS,
            // Icon class
            ICON_CLASS: MISA_RESOURCES.ICON_CLASS,
            // Tooltip text
            TOOLTIP_TEXT: MISA_RESOURCES.TOOLTIP_TEXT,
            // Danh sách lựa chọn
            listOfOptions: [],
            // Danh sách lựa chọn đã được lọc
            listOfFilteredOptions: [],
            // Hiển thị danh sách lựa chọn
            isShowListOptions: false,
            // Thứ tự lựa chọn đang được trỏ tới
            index: -1
        }
    },
    emits: ["requestOpenAddPopup", "update:error", "update:selectedKey", "update:modelValue"]
}
</script>
<style scoped>@import '@/css/base/combobox.css';</style>