<template>
    <div class="popup-container" v-on:keydown.esc="closeUnitInfoPopup" @keydown.ctrl.s.prevent.stop="handleClickButtonSave">
        <div class="popup" id="popup--unit" v-click-outside="closeUnitInfoPopup">
            <div class="popup__header">
                <div class="popup__title">
                    {{ MISA_RESOURCES.POPUP_TITLE.ADD + OBJECT_NAME }}
                </div>
                <div class="popup__action">
                    <MISAIconTooltip :tooltipText="TOOLTIP_TEXT.CLOSE" :iconClass="ICON_CLASS.CLOSE"
                        class="popup__action--close" v-on:click="closeUnitInfoPopup"></MISAIconTooltip>
                </div>
            </div>
            <div class="popup__content" id="popup__content--unit">
                <div class="popup__group">
                    <MISAInput label="Đơn vị tính" v-model="unitInfo.unitName"
                        v-model:validationRule="validationRule.unitName" v-model:error="validateErrorInfo.unitName"
                        ref="txtUnitName"></MISAInput>
                </div>
                <div class="popup__group">
                    <label class="input__label">Diễn giải</label>
                    <textarea class="input__content" v-model="unitInfo.description"></textarea>
                </div>
            </div>
            <div class="popup__footer">
                <div class="popup__action">
                    <MISAButton text="Cất" :type="MISA_ENUMS.BUTTON_TYPE.ICON_TEXT"
                        :iconClass="MISA_RESOURCES.ICON_CLASS.SAVE" v-on:click="handleClickButtonSave"></MISAButton>
                    <MISAButton text="Hủy bỏ" :type="MISA_ENUMS.BUTTON_TYPE.ICON_TEXT"
                        :iconClass="MISA_RESOURCES.ICON_CLASS.CANCEL"
                        :iconColor="MISA_RESOURCES.ICON_BUTTON_COLOR.DANGEROUS" v-on:click="closeUnitInfoPopup">
                    </MISAButton>
                </div>
                <MISAButton text="Giúp" :type="MISA_ENUMS.BUTTON_TYPE.ICON_TEXT"
                    :iconClass="MISA_RESOURCES.ICON_CLASS.HELP"></MISAButton>
            </div>
            <MISADialog ref="dialog" v-show="isShowDialog" v-on:closeDialogNotify="closeDialogNotify"
                v-on:handleClickDialogButton="handleEvent"></MISADialog>
        </div>
    </div>
    <MISAToast ref="toast" v-show="isShowToast" v-on:closeToastMessage="closeToastMessage"></MISAToast>
</template>
<script>
import MISA_ENUMS from '@/resources/enum';
import MISA_RESOURCES from '@/resources/resource';
import { v4 as uuidv4 } from 'uuid';
import UNIT_SERVICE from '@/services/UnitService';
export default {
    name: "UnitDetail",
    mounted() {
        // Khởi tạo thông tin popup đơn vị
        this.initUnitInfoPopup();
        this.$refs.txtUnitName.focusInput();

    },
    methods: {
        /**
         * Khởi tạo thông tin popup đơn vị
         * Author: TrangDTT (29/05/2023)
         */
        initUnitInfoPopup: async function () {
            this.oldUnitInfo = JSON.stringify(this.unitInfo);
        },
        /**
         * Xử lý sự kiện
         * @param {*} eventInfo Thông tin sự kiện
         * Author: TrangDTT (31/05/2023)
         */
        handleEvent: function (eventInfo) {
            let eventType = eventInfo.eventType;
            // Xử lý sự kiện
            switch (eventType) {
                case MISA_ENUMS.EVENT_TYPE.RELOAD_UNIT:
                    // Đóng popup
                    this.$emit("closeUnitInfoPopup");
                    // Yêu cầu reload dữ liệu
                    this.$emit("requestReloadUnits");
                    break;
                case MISA_ENUMS.EVENT_TYPE.SAVE_AND_CLOSE_POPUP:
                    // Lưu lại dữ liệu
                    this.saveData();
                    // Yêu cầu reload danh sách đơn vị
                    this.$emit("requestReloadUnits");
                    break;
                case MISA_ENUMS.EVENT_TYPE.NOT_SAVE_AND_CLOSE_POPUP:
                    // Đóng popup chi tiết
                    this.$emit("closeUnitInfoPopup");
                    break;
                default:
                    break;
            }
        },
        /**
         * Đóng popup thông tin đơn vị
         * Author: TrangDTT (29/05/2023)
         */
        closeUnitInfoPopup: function () {
            // 1. Kiểm tra xem dữ liệu của popup có bị thay đổi hay không
            let oldValue = this.oldUnitInfo;
            let newValue = JSON.stringify(this.unitInfo);

            if (oldValue == newValue) {
                // 2.1. Nếu dữ liệu không thay đổi
                // Yêu cầu đóng popup
                this.$emit("closeUnitInfoPopup");
            } else {
                // 2.2. Nếu dữ liệu thay đổi
                // Thiết lập thông tin dialog xác nhận hành động tiếp theo
                let dialog = MISA_RESOURCES.DIALOG.CONFIRM_CLOSE_POPUP;
                dialog.TITLE = this.title;
                dialog.DESCRIPTION = [MISA_RESOURCES.MESSAGE.CLOSE_POPUP];

                this.$refs.dialog.setDialogInfo(dialog);

                // Hiển thị dialog
                this.openDialogNotify();
            }
        },
        /**
         * Hàm validate dữ liệu
         * Author: TrangDTT (02/06/2023)
         */
        validateData: function () {
            // 1. Khởi tạo danh sách lỗi validate bằng rỗng
            let listOfValidationErrors = [];

            // 2. Yêu cầu validate các trường dữ liệu
            this.$refs.txtUnitName.validate();

            // 3. Cập nhật danh sách lỗi
            if (this.validateErrorInfo.unitName != "") {
                listOfValidationErrors.push(this.validateErrorInfo.unitName);
            }
            // 4. Trả về danh sách lỗi
            return listOfValidationErrors;
        },
        /**
         * Hàm cất dữ liệu
         * Author: TrangDTT(31/05/2023)
         */
        saveData: async function () {
            // 1. Validate dữ liệu
            let listOfValidationErrors = this.validateData();

            // Nếu có lỗi
            if (listOfValidationErrors.length > 0) {
                // 2.1. Hiển thị thông báo validate dữ liệu

                // Thiết lập nội dung thông báo
                this.warningDialog.TITLE = MISA_RESOURCES.DIALOG_TITLE.VALIDATE;
                this.warningDialog.DESCRIPTION = listOfValidationErrors;
                this.$refs.dialog.setDialogInfo(this.warningDialog);

                // Hiển thị thông báo
                this.openDialogNotify();
            } else {
                // 2.2. Chuẩn bị dữ liệu gửi tới api
                let data = {};
                for (let key of Object.keys(this.unitInfo)) {
                    data[key] = this.unitInfo[key];
                }

                // Tạo id đơn vị mới
                data.unitID = uuidv4();

                // Gọi API thêm mới đơn vị
                await this.addUnit(data);
            }
        },
        /**
         * Hàm xử lý gọi API thêm mới đơn vị
         * @param {*} data Dữ liệu đơn vị
         * Author: TrangDTT (02/06/2023)
         */
        addUnit: async function (data) {
            try {
                // 1. Hiển thị loading
                this.isShowLoading = true;

                // 2. Gọi API thêm mới đơn vị
                await UNIT_SERVICE.post(data);

                // 3. Ẩn loading
                this.isShowLoading = false;

                // 4. Hiển thị toast message
                // 4.1. Hiển thị toast message thành công
                // Thiết lập thông tin toast message
                this.successToast.DESCRIPTION = MISA_RESOURCES.MESSAGE.UNIT.ADD.SUCCESS;

                this.$refs.toast.setToastMessageInfo(this.successToast);

                // Hiển thị toast message
                this.openToastMessage();

                // 4.2. Thiết lập timeout
                setTimeout(() => {
                    this.closeToastMessage();
                    this.handleEvent({ eventType: MISA_ENUMS.EVENT_TYPE.RELOAD_UNIT });
                }, MISA_RESOURCES.TOAST_TIME_OUT);

            } catch (error) {
                // Tiêu đề dialog
                let title = MISA_RESOURCES.POPUP_TITLE.ADD + this.OBJECT_NAME;
                // Xử lý ngoại lệ
                this.displayDialogForException(error, title);
            } finally {
                // Ẩn loading
                this.isShowLoading = false;
            }
        },
        /**
         * Xử lý sự kiện click button Cất
         * Author: TrangDTT (31/05/2023)
         */
        handleClickButtonSave: function () {
            this.saveData();
        },
        /**
         * Hàm xử lý ngoại lệ
         * @param {*} error Thông tin lỗi
         * @param {*} titleDialog Tiêu đề hộp thoại cho hiển thị thông báo lỗi
         * Author: TrangDTT (20/04/2023)
         */
        displayDialogForException: function (error, titleDialog) {

            // 1. Thiết lập thông tin dialog
            this.failedDialog.TITLE = titleDialog;

            // Nếu nhận được câu trả lời từ server
            if (error.response) {
                this.failedDialog.DESCRIPTION = error.response.data.userMsg;
                if (error.response.data.errorCode == MISA_ENUMS.ERROR_CODE.INVALID_DATA) {
                    error.response.data.moreInfo.forEach(element => {
                        let propertyName = element.propertyName;
                        propertyName = propertyName.charAt(0).toLowerCase() + propertyName.slice(1);
                        this.validateErrorInfo[propertyName] = element.message;
                    });
                }
            } else {
                this.failedDialog.DESCRIPTION = [MISA_RESOURCES.MESSAGE.EXCEPTION];
            }

            this.$refs.dialog.setDialogInfo(this.failedDialog);

            // 2. Hiển thị dialog
            this.openDialogNotify();
        },
        /**
         * Hiển thị hộp thoại thông báo
         * Author: TrangDTT (31/05/2023)
         */
        openDialogNotify: function () {
            this.isShowDialog = true;
        },
        /**
         * Đóng hộp thoại thông báo
         * Author: TrangDTT (31/05/2023)
         */
        closeDialogNotify: function () {
            this.isShowDialog = false;
        },
        /**
         * Mở toast message
         * Author: TrangDTT (30/05/2023)
         */
        openToastMessage: function () {
            this.isShowToast = true;
        },
        /**
         * Đóng toast message
         * Author: TrangDTT (30/05/2023)
         */
        closeToastMessage: function () {
            this.isShowToast = false;
        },
    },
    data() {
        return {
            // Thông tin đơn vị
            unitInfo: {
                // ID đơn vị
                unitID: "",
                // Tên đơn vị
                unitName: "",
                // Mô tả
                description: ""
            },
            // Thông tin validate dữ liệu
            validateErrorInfo: {
                unitName: ""
            },
            // Các luật cần validate
            validationRule: {
                unitName: {
                    isRequired: true,
                },
            },
            // Enums
            MISA_ENUMS: MISA_ENUMS,
            // Resources
            MISA_RESOURCES: MISA_RESOURCES,
            // Icon class
            ICON_CLASS: MISA_RESOURCES.ICON_CLASS,
            // Tooltip text
            TOOLTIP_TEXT: MISA_RESOURCES.TOOLTIP_TEXT,
            // Tên đối tượng
            OBJECT_NAME: MISA_RESOURCES.OBJECT_NAME.UNIT,
            // Hiển thị dialog
            isShowDialog: false,
            // Hiển thị toast message
            isShowToast: false,
            // Hộp thoại thất bại
            failedDialog: MISA_RESOURCES.DIALOG.FAILED,
            // Hộp thoại cảnh báo
            warningDialog: MISA_RESOURCES.DIALOG.WARNING,
            // Toast message thành công
            successToast: MISA_RESOURCES.TOAST.SUCCESS,
            // Thông tin đơn vị cũ
            oldUnitInfo: ""
        }
    },
    emits: ["closeUnitInfoPopup", "requestReloadUnits"]
}
</script>
<style scoped>
@import "@/css/units/unit-detail.css";
</style>