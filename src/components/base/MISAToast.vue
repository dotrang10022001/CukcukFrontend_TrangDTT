<template>
    <div :class="'toast toast--' + typeValue">
        <div class="toast__header">
            <div :class="'toast__icon toast__icon--' + typeValue"><i :class="icon"></i></div>
            <div :class="'toast__type toast__type--' + typeValue">{{ typeText }}</div>&nbsp;
            <div class="toast__content">{{ description }}</div>
        </div>
        <div class="toast__footer">
            <div class="toast__close" v-on:click="closeToastMessage"><i class="fa-solid fa-xmark"></i></div>
        </div>
    </div>
</template>
<script>
export default {
    name: "MISAToast",
    methods: {
        /**
         * Đóng toast message
         * Author: TrangDTT (02/04/2023)
         */
        closeToastMessage: function () {
            this.$emit("closeToastMessage");
        },
        /**
         * Thiết lập thông tin toast message
         * @param {*} toastInfo Thông tin toast
         * Author: TrangDTT (02/04/2023)
         */
        setToastMessageInfo: function (toastInfo) {
            this.typeText = toastInfo.TYPE_TEXT ?? "";
            this.typeValue = toastInfo.TYPE_VALUE ?? "";
            this.icon = toastInfo.ICON ?? "";
            this.description = toastInfo.DESCRIPTION ?? "";
        }
    },
    data() {
        return {
            // Gía trị của kiểu toast
            typeValue: "",
            // Chuỗi tương ứng kiểu toast
            typeText: "",
            // Mô tả
            description: "",
            // Icon
            icon: ""
        }
    }
}
</script>
<style scoped>
@import '@/css/base/toast.css';
</style>