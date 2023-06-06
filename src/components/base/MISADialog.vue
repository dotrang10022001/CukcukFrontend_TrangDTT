<template>
    <div class="dialog-container">
        <div class="dialog" v-click-outside="handleClickOutsideDialog">
            <div class="dialog__header">
                <div class="dialog__title">{{ title }}</div>
                <MISAIconTooltip :tooltipText="TOOLTIP_TEXT.CLOSE" :iconClass="ICON_CLASS.CLOSE" class="dialog__close"
                    v-on:click="closeDialogNotify"></MISAIconTooltip>
            </div>
            <div class="dialog__content">
                <div class="dialog__icon" :class="'dialog__icon--' + type"><i :class="icon"></i></div>
                <div class="dialog__description">
                    <li v-for="(item, index) in description" :key="index" :style="styleDescription">{{ item }}</li>
                </div>
            </div>
            <div class="dialog__footer">
                <MISAButton :text="txtBtnPrimary" :type="MISA_ENUMS.BUTTON_TYPE.TEXT"
                    v-on:click="handleClickDialogButton(eventForBtnPrimary)">
                </MISAButton>
                <MISAButton :text="txtBtnSecondary" v-if="isShowBtnSecondary" :type="MISA_ENUMS.BUTTON_TYPE.TEXT"
                    v-on:click="handleClickDialogButton(eventForBtnSecondary)">
                </MISAButton>
                <MISAButton :text="txtBtnThird" v-if="isShowBtnThird" :type="MISA_ENUMS.BUTTON_TYPE.TEXT"
                    v-on:click="handleClickDialogButton(eventForBtnThird)"></MISAButton>
            </div>
        </div>
    </div>
</template>
<script>
import MISA_ENUMS from '@/resources/enum';
import MISA_RESOURCES from '@/resources/resource';

export default {
    name: "MISADialog",
    computed: {
        /**
         * Hàm xác định định dạng cho phần mô tả của thông báo khi có nhiều nội dung
         * Author: TrangDTT (27/03/2023)
         */
        styleDescription: function () {
            if (this.description.length == 1) {
                return { 'list-style': 'none' };
            }
            return { 'list-style': 'disc' };
        }
    },
    methods: {
        /**
         * Yêu cầu xử lý sự kiện đóng dialog
         * Author: TrangDTT (27/03/2023)
         */
        closeDialogNotify: function(){
            this.$emit("closeDialogNotify");
        },
        /**
         * Xử lý sự kiện click button trong dialog
         * @param {*} eventType Loại sự kiện
         * Author: TrangDTT (27/03/2023)
         */
        handleClickDialogButton: function (eventType) {
            // Đóng hộp thoại thông báo
            this.$emit("closeDialogNotify");
            // Yêu cầu xử lý sự kiện
            this.$emit("handleClickDialogButton", {eventType: eventType});
        },
        /**
         * Xử lý sự kiện click ra ngoài dialog
         * Author: TrangDTT (05/05/2023)
         */
        handleClickOutsideDialog: function () {
            if (this.isShowBtnThird) {
                this.handleClickDialogButton(this.eventForBtnThird);
            } else if (this.isShowBtnSecondary) {
                this.handleClickDialogButton(this.eventForBtnSecondary);
            } else {
                this.handleClickDialogButton(this.eventForBtnPrimary)
            }
        },
        /**
         * Hàm thiết lập thông tin thông báo
         * @param {*} dialogInfo Đối tượng chứa thông tin thông báo
         * Author: TrangDTT (02/04/2023)
         */
        setDialogInfo: function (dialogInfo) {
            this.title = dialogInfo.TITLE;
            this.type = dialogInfo.TYPE;
            this.icon = dialogInfo.ICON;
            this.description = dialogInfo.DESCRIPTION;
            this.txtBtnSecondary = dialogInfo.TXT_BTN_SECONDARY ?? "";
            this.txtBtnPrimary = dialogInfo.TXT_BTN_PRIMARY;
            this.txtBtnThird = dialogInfo.TXT_BTN_THIRD ?? "";
            this.isShowBtnSecondary = dialogInfo.IS_SHOW_SECONDARY ?? false;
            this.isShowBtnThird = dialogInfo.IS_SHOW_THIRD ?? false;
            this.eventForBtnPrimary = dialogInfo.EVENT_FOR_PRIMARY ?? "";
            this.eventForBtnSecondary = dialogInfo.EVENT_FOR_SECONDARY ?? "";
            this.eventForBtnThird = dialogInfo.EVENT_FOR_THIRD ?? "";
        }

    },
    data() {
        return {
            // Tiêu đề dialog
            title: "",
            // Loại
            type: "",
            // Icon class
            icon: "",
            // Mô tả
            description: [],
            // Text cho nút chính
            txtBtnPrimary: "",
            // Text cho nút phụ thứ nhất
            txtBtnSecondary: "",
            // Text cho nút phụ thứ hai
            txtBtnThird: "",
            // Có sử dụng nút phụ thứ nhất không, nằm bên phải dialog
            isShowBtnSecondary: false,
            // Có sử dụng nút phụ thứ hai hay không, nằm bên trái dialog, thường dùng để hủy
            isShowBtnThird: false,
            // Sự kiện khi click nút chính
            eventForBtnPrimary: "",
            // Sự kiện khi click nút phụ thứ nhất
            eventForBtnSecondary: "",
            // Sự kiện khi click nút phụ thứ hai
            eventForBtnThird: "",
            // Enums
            MISA_ENUMS: MISA_ENUMS,
            // Resources
            MISA_RESOURCES: MISA_RESOURCES,
            // Icon class
            ICON_CLASS: MISA_RESOURCES.ICON_CLASS,
            // Tooltip text
            TOOLTIP_TEXT: MISA_RESOURCES.TOOLTIP_TEXT

        }
    }
}
</script>
<style scoped>
@import '@/css/base/dialog.css';
</style>