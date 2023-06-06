<template>
    <div class="dropdown" v-click-outside="closeListOfOptions">
        <input ref="txtDropdown" class="dropdown__content" type="text" v-bind:value="modelValue"
            v-on:click="handleOnClickInput" v-on:focus="handleOnClickInput" readonly="readonly"
            v-on:keydown="handleEventPressKey" />
        <div class="dropdown__option" v-if="isShowListOptions">
            <div class="option__content">
                <ul class="option__data">
                    <li class="option__item"
                        :class="{ 'option__item--active': (idx == index), 'option__item--selected': (item.key == selectedKey) }"
                        v-for="(item, idx) in listOfOptions" :key="idx" v-on:click="handleOnSelectOption(item)">
                        {{ item.value }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "MISADropdown",
    methods: {
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
                if (this.index == -1) this.index = this.listOfOptions.length - 1;
            }
            // Nếu phím mũi tên đi xuống được nhấn
            if (event.keyCode == 40) {
                event.preventDefault();
                this.index += 1;
                if (this.index == this.listOfOptions.length) this.index = 0;
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
         * Xử lý sự kiện click ô input
         * Author: TrangDTT (03/05/2023)
         */
        handleOnClickInput: function () {
            this.index = -1;
            // Hiển thị danh sách lựa chọn
            this.displayListOfOptions();
        },
        /**
         * Xử lý sự kiện tab input
         * Author: TrangDTT (02/06/2023)
         */
        handleOnTabInput: function () {
            this.closeListOfOptions();
        },
        /**
         * Xử lý sự kiện enter chọn option
         * Author: TrangDTT (01/05/2023)
         */
        handleOnEnterInput: function () {
            // Thiết lập giá trị lựa chọn cho ô input
            let idx = (this.index == -1) ? 0 : this.index;
            if (this.listOfOptions[idx]) {
                this.$emit('update:modelValue', this.listOfOptions[idx].value);
                this.$emit('update:selectedKey', this.listOfOptions[idx].key);
            }

            // Đóng danh sách lựa chọn
            this.$refs.txtDropdown.focus();
            this.closeListOfOptions();
        },
        /**
         * Xử lý việc chọn giá trị
         * @param {*} option Lựa chọn
         * Author: TrangDTT (03/05/2023)
         */
        handleOnSelectOption: function (option) {
            // Thiết lập giá trị lựa chọn cho ô input
            this.$emit('update:modelValue', option.value);
            this.$emit('update:selectedKey', option.key);

            // Đóng danh sách lựa chọn
            this.$refs.txtDropdown.focus();
            this.closeListOfOptions();
        },
        /**
         * Thiết lập danh sách lựa chọn
         * @param {*} listOfOptions Danh sách lựa chọn
         * Author: TrangDTT (01/05/2023)
         */
        setListOfOptions: function (listOfOptions) {
            this.listOfOptions = listOfOptions;
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
        // Gía trị model
        modelValue: {
            type: undefined,
            default() {
                return "";
            }
        },
        // Key được lựa chọn
        selectedKey: {
            type: undefined,
            default() {
                return "";
            }
        }
    },
    data() {
        return {
            // Danh sách lựa chọn
            listOfOptions: [],
            // Hiển thị danh sách lựa chọn
            isShowListOptions: false,
            // Thứ tự phần tử đang trỏ tới
            index: -1
        }
    },
    emits: ["update:selectedKey", "update:modelValue"]
}
</script>
<style scoped>@import '@/css/base/dropdown.css';</style>