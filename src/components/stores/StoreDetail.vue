<template>
    <div class="popup-container" v-on:keydown.esc="closeStoreInfoPopup"
        @keydown.ctrl.s.prevent.stop="handleClickButtonSave">
        <div class="popup" id="popup--store" v-click-outside="closeStoreInfoPopup">
            <div class="popup__header">
                <div class="popup__title">
                    {{ MISA_RESOURCES.POPUP_TITLE.ADD + OBJECT_NAME }}
                </div>
                <div class="popup__action">
                    <MISAIconTooltip :tooltipText="TOOLTIP_TEXT.CLOSE" :iconClass="ICON_CLASS.CLOSE"
                        class="popup__action--close" v-on:click="closeStoreInfoPopup"></MISAIconTooltip>
                </div>
            </div>
            <div class="popup__content" id="popup__content--store">
                <div class="popup__group">
                    <MISAInput label="Mã kho" v-model="storeInfo.storeCode"
                        v-model:validationRule="validationRule.storeCode" v-model:error="validateErrorInfo.storeCode"
                        ref="txtStoreCode"></MISAInput>
                </div>
                <div class="popup__group">
                    <MISAInput label="Tên kho" v-model="storeInfo.storeName"
                        v-model:validationRule="validationRule.storeName" v-model:error="validateErrorInfo.storeName"
                        ref="txtStoreName"></MISAInput>
                </div>
                <div class="popup__group">
                    <label class="input__label">Địa chỉ</label>
                    <textarea class="input__content" v-model="storeInfo.address"></textarea>
                </div>
            </div>
            <div class="popup__footer">
                <div class="popup__action">
                    <MISAButton text="Cất" :type="MISA_ENUMS.BUTTON_TYPE.ICON_TEXT"
                        :iconClass="MISA_RESOURCES.ICON_CLASS.SAVE" v-on:click="handleClickButtonSave"></MISAButton>
                    <MISAButton text="Hủy bỏ" :type="MISA_ENUMS.BUTTON_TYPE.ICON_TEXT"
                        :iconClass="MISA_RESOURCES.ICON_CLASS.CANCEL"
                        :iconColor="MISA_RESOURCES.ICON_BUTTON_COLOR.DANGEROUS" v-on:click="closeStoreInfoPopup">
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
import STORE_SERVICE from '@/services/StoreService';
export default {
    name: "StoreDetail",
    mounted() {
        // Khởi tạo thông tin popup kho
        this.initStoreInfoPopup();
        this.$refs.txtStoreCode.focusInput();

    },
    methods: {
        /**
         * Khởi tạo thông tin popup kho
         * Author: TrangDTT (29/05/2023)
         */
        initStoreInfoPopup: async function () {
            try {
                this.storeInfo.storeCode = await this.getNewCode();
                this.oldStoreInfo = JSON.stringify(this.storeInfo);
            } catch (error) {
                this.displayDialogForException(error, MISA_RESOURCES.DIALOG_TITLE.EXCEPTION);
            }
        },
        /**
         * Lấy mã kho mới
         * Author: TrangDTT (02/06/2023)
         */
        getNewCode: async function () {
            let newCode = await STORE_SERVICE.getNewCode();
            return newCode;
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
                case MISA_ENUMS.EVENT_TYPE.RELOAD_STORE:
                    // Đóng popup
                    this.$emit("closeStoreInfoPopup");
                    // Yêu cầu reload dữ liệu
                    this.$emit("requestReloadStores");
                    break;
                case MISA_ENUMS.EVENT_TYPE.SAVE_AND_CLOSE_POPUP:
                    // Lưu lại dữ liệu
                    this.saveData();
                    // Yêu cầu reload danh sách kho
                    this.$emit("requestReloadStores");
                    break;
                case MISA_ENUMS.EVENT_TYPE.NOT_SAVE_AND_CLOSE_POPUP:
                    // Đóng popup chi tiết
                    this.$emit("closeStoreInfoPopup");
                    break;
                default:
                    break;
            }
        },
        /**
         * Đóng popup thông tin kho
         * Author: TrangDTT (29/05/2023)
         */
        closeStoreInfoPopup: function () {
            // 1. Kiểm tra xem dữ liệu của popup có bị thay đổi hay không
            let oldValue = this.oldStoreInfo;
            let newValue = JSON.stringify(this.storeInfo);

            if (oldValue == newValue) {
                // 2.1. Nếu dữ liệu không thay đổi
                // Yêu cầu đóng popup
                this.$emit("closeStoreInfoPopup");
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
            this.listOfFieldRefs.forEach(ref => {
                this.$refs[ref].validate();
            });

            // 3. Cập nhật danh sách lỗi
            for (let key in this.validateErrorInfo) {
                if (this.validateErrorInfo[key] != "") {
                    listOfValidationErrors.push(this.validateErrorInfo[key]);
                }
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
                for (let key of Object.keys(this.storeInfo)) {
                    data[key] = this.storeInfo[key];
                }

                // Tạo id kho mới
                data.storeID = uuidv4();

                // Gọi API thêm mới kho
                await this.addStore(data);
            }
        },
        /**
         * Hàm xử lý gọi API thêm mới kho
         * @param {*} data Dữ liệu kho
         * Author: TrangDTT (02/06/2023)
         */
        addStore: async function (data) {
            try {
                // 1. Hiển thị loading
                this.isShowLoading = true;

                // 2. Gọi API thêm mới kho
                await STORE_SERVICE.post(data);

                // 3. Ẩn loading
                this.isShowLoading = false;

                // 4. Hiển thị toast message
                // 4.1. Hiển thị toast message thành công
                // Thiết lập thông tin toast message
                this.successToast.DESCRIPTION = MISA_RESOURCES.MESSAGE.STORE.ADD.SUCCESS;

                this.$refs.toast.setToastMessageInfo(this.successToast);

                // Hiển thị toast message
                this.openToastMessage();

                // 4.2. Thiết lập timeout
                setTimeout(() => {
                    this.closeToastMessage();
                    this.handleEvent({ eventType: MISA_ENUMS.EVENT_TYPE.RELOAD_STORE });
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
            // Thông tin kho
            storeInfo: {
                // ID kho
                storeID: "",
                // Tên kho
                storeName: "",
                // Mã kho
                storeCode: "",
                // Địa chỉ
                address: ""
            },
            // Thông tin validate dữ liệu
            validateErrorInfo: {
                storeCode: "",
                storeName: ""
            },
            // Các luật cần validate
            validationRule: {
                storeCode: {
                    isRequired: true,
                    isStoreCode: true,
                },
                storeName: {
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
            OBJECT_NAME: MISA_RESOURCES.OBJECT_NAME.STORE,
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
            // Thông tin kho cũ
            oldStoreInfo: "",
            // Danh sách tham chiếu
            listOfFieldRefs: ["txtStoreCode", "txtStoreName"]
        }
    },
    emits: ["closeStoreInfoPopup", "requestReloadStores"]
}
</script>
<style scoped>
@import "@/css/stores/store-detail.css";
</style>