<template>
    <div class="popup__control">
        <label class="input__label" v-if="label != ''">
            <MISATextTooltip :text="label" :tooltipText="tooltipText"></MISATextTooltip> <span v-if="isRequired">(*)</span>
        </label>
        <input class="input__content" ref="input" :type="type" :placeholder="placeholder" :value="modelValue"
            :class="{ 'border--error': !isValid}"
            v-on:keydown="handleKeyDownInput" v-on:focus="handleOnFocusInput" v-on:keyup="handleKeyUpInput"
            v-on:blur="handleOnBlurInput" />
        <MISAIconTooltip v-if="!isValid" class="input__icon" :tooltipText="error" :iconClass="ICON_CLASS.ERROR">
        </MISAIconTooltip>
    </div>
</template>
<script>
import MISA_RESOURCES from '@/resources/resource';
import MISA_HELPERS from '@/resources/helper';
import MISA_ENUMS from '@/resources/enum';
export default {
    name: "MISAInput",
    computed: {
        /**
         * Xác định tính hợp lệ của input
         * Author: TrangDTT (30/04/2023)
         */
        isValid: function () {
            return this.error === "";
        },
        /**
         * Có bắt buộc hay không
         * Author: TrangDTT (30/04/2023)
         */
        isRequired: function () {
            if (this.validationRule[this.VALIDATION_RULE.REQUIRED]) return true;
            return false;
        },
    },
    methods: {
        /**
         * Xử lý sự kiện format số nguyên
         * @param {*} event Sự kiện nhấc phím
         * Author: TrangDTT (05/06/2023)
         */
        handleKeyUpInput: function (event) {
            this.$emit("update:modelValue", event.target.value);
        },
        /**
         * Xử lý sự kiện nhấn phím nhập vào dữ liệu
         * @param {*} event Sự kiện nhập vào dữ liệu
         * Author: TrangDTT (05/06/2023)
         */
        handleKeyDownInput: function (event) {
            console.log(event);
        },
        /**
         * Xử lý sự kiện focus ô input
         * Author: TrangDTT (30/04/2023)
         */
        handleOnFocusInput: function () {
            this.$emit('update:error', '');
        },
        /**
         * Xử lý sự kiện blur ô input
         * Author: TrangDTT (30/04/2023)
         */
        handleOnBlurInput: function () {
            this.validate();
            if (this.name == "materialName") this.$emit("handleBlurMaterialName");
        },
        /**
         * Validate nội dung input
         * Author: TrangDTT (01/05/2023)
         */
        validate: function () {
            // Duyệt danh sách các khóa của đối tượng validationRule
            for (let key in this.validationRule) {
                let valid = true;
                let error = "";
                switch (key) {
                    // Kiểm tra tính bắt buộc
                    case this.VALIDATION_RULE.REQUIRED:
                        error = this.label + this.VALIDATION_ERROR.EMPTY;
                        valid = !(MISA_HELPERS.CHECK_EMPTY(this.modelValue));
                        break;

                    // Kiểm tra độ dài tối đa
                    case this.VALIDATION_RULE.MAX_LENGTH:
                        error = this.label + this.VALIDATION_ERROR.EXCEED_LENGTH + this.validationRule[key];
                        valid = (this.modelValue.length > this.validationRule[key]) ? false : true;
                        break;

                    // Kiểm tra định dạng mã kho
                    case this.VALIDATION_RULE.STORE_CODE:
                        error = this.label + this.VALIDATION_ERROR.INCORRECT_FORMAT;
                        valid = MISA_HELPERS.CHECK_STORE_CODE(this.modelValue);
                        break;
                    // Kiểm tra định dạng mã nhóm nguyên vật liệu
                    case this.VALIDATION_RULE.CATEGORY_CODE:
                        error = this.label + this.VALIDATION_ERROR.INCORRECT_FORMAT;
                        valid = MISA_HELPERS.CHECK_CATEGORY_CODE(this.modelValue);
                        break;
                    // Kiểm tra định dạng mã nguyên vật liệu
                    case this.VALIDATION_RULE.MATERIAL_CODE:
                        this.$emit("requestCheckMaterialCode", this.label);
                        break;

                    default:
                        break;
                }
                // 3. Cập nhật lỗi và dừng lại validate khi có 1 luật không thỏa mãn
                if (!valid) {
                    this.$emit('update:error', error);
                    return;
                }
            }
        },
        /**
         * Focus vào ô input
         * Author: TrangDTT (30/04/2023)
         */
        focusInput: function () {
            this.$refs.input.focus();
        }
    },
    props: {
        // Nhãn input
        label: {
            type: String,
            default: ""
        },
        // Hint
        placeholder: {
            type: String,
            default: ""
        },
        // Thông tin lỗi
        error: {
            type: String,
            default: ""
        },
        // Luật validate
        validationRule: {
            type: Object,
            default() {
                return {}
            }
        },
        // Model value
        modelValue: {
            type: undefined,
            default() {
                return "";
            }
        },
        // Tên
        name: {
            type: String,
            default: ""
        },
        // Tooltip text
        tooltipText: {
            type: String,
            default: ""
        },
        // Loại input
        type: {
            type: String,
            default: "text"
        },
    },
    data() {
        return {
            // Resources
            MISA_RESOURCES: MISA_RESOURCES,
            // Enums
            MISA_ENUMS: MISA_ENUMS,
            // Helpers
            MISA_HELPERS: MISA_HELPERS,
            // Luật validate
            VALIDATION_RULE: MISA_RESOURCES.VALIDATION_RULE,
            // Lỗi validate
            VALIDATION_ERROR: MISA_RESOURCES.VALIDATION_ERROR,
            // Icon class
            ICON_CLASS: MISA_RESOURCES.ICON_CLASS,
            // Tooltip text
            TOOLTIP_TEXT: MISA_RESOURCES.TOOLTIP_TEXT
        }
    },
    emits: ["update:error", "update:modelValue", "requestCheckMaterialCode", "handleBlurMaterialName"]
}
</script>
<style>
@import '@/css/base/input.css';
</style>