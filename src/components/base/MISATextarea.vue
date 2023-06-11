<template>
    <div class="popup__control">
        <label class="textarea__label" v-if="label != ''">
            <MISATextTooltip :text="label" :tooltipText="tooltipText"></MISATextTooltip> <span v-if="isRequired">(*)</span>
        </label>
        <textarea :value="modelValue"
            :class="{ 'border--error': !isValid }" v-on:focus="handleOnFocusTextarea"
            v-on:input="handleOnInputTextarea" v-on:blur="handleOnBlurTextarea"></textarea>
        <MISAIconTooltip v-if="!isValid" class="textarea__icon" :tooltipText="error" :iconClass="ICON_CLASS.ERROR">
        </MISAIconTooltip>
    </div>
</template>
<script>
import MISA_RESOURCES from '@/resources/resource';
import MISA_HELPERS from '@/resources/helper';
export default {
    name: "MISATextarea",
    computed: {
        /**
         * Xác định tính hợp lệ của textarea
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
         * Xử lý sự kiện nhập vào ô textarea
         * @param {*} event Sự kiện nhập
         * Author: TrangDTT (05/06/2023)
         */
        handleOnInputTextarea: function (event) {
            this.$emit("update:modelValue", event.target.value);
        },
        /**
         * Xử lý sự kiện focus ô textarea
         * Author: TrangDTT (30/04/2023)
         */
        handleOnFocusTextarea: function () {
            this.$emit('update:error', '');
        },
        /**
         * Xử lý sự kiện blur ô textarea
         * Author: TrangDTT (30/04/2023)
         */
        handleOnBlurTextarea: function () {
            this.validate();
        },
        /**
         * Validate nội dung textarea
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
            this.$refs.textarea.focus();
        }
    },
    props: {
        // Nhãn input
        label: {
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
        // Tooltip text
        tooltipText: {
            type: String,
            default: ""
        },
    },
    data() {
        return {
            // Resources
            MISA_RESOURCES: MISA_RESOURCES,
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
    emits: ["update:error", "update:modelValue"]
}
</script>
<style>
@import '@/css/base/textarea.css';
</style>