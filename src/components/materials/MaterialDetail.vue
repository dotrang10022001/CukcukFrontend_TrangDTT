<template>
    <div class="popup-container">
        <div class="popup" v-click-outside="closeMaterialInfoPopup" @keydown.esc="closeMaterialInfoPopup"
            @keydown.ctrl.s.prevent="handleClickButtonSave" @keydown.alt.s.prevent="handleClickButtonSaveAndAdd">
            <div class="popup__header">
                <div class="popup__title">
                    {{ title }}
                </div>
                <input ref="checkboxForTabIndex" type="checkbox" style="opacity: 0" />
                <div class="popup__action">
                    <MISAIconTooltip :tooltipText="TOOLTIP_TEXT.CLOSE" :iconClass="ICON_CLASS.CLOSE"
                        class="popup__action--close" v-on:click="closeMaterialInfoPopup"></MISAIconTooltip>
                </div>
            </div>
            <div class="popup__content">
                <div class="popup__content--left">
                    <div class="popup__group">
                        <MISAInput label="Tên" v-model="materialInfo.materialName"
                            v-model:validationRule="validationRule.materialName"
                            v-model:error="validateErrorInfo.materialName" ref="txtMaterialName" name="materialName"
                            v-on:handleBlurMaterialName="handleBlurMaterialName"></MISAInput>
                    </div>
                </div>
                <div class="popup__content--right">
                    <div class="popup__group">
                        <MISAInput label="Mã" v-model="materialInfo.materialCode"
                            v-model:validationRule="validationRule.materialCode"
                            v-model:error="validateErrorInfo.materialCode" ref="txtMaterialCode"
                            v-on:requestCheckMaterialCode="checkMaterialCode" :maxLength="20"></MISAInput>
                    </div>
                </div>
                <div class="popup__content--left">
                    <div class="popup__group popup__group--property">
                        <label class="input__label"><span>Tính chất</span> <span>(*)</span></label>
                        <MISADropdown ref="txtProperty" v-model="materialInfo.propertyName"
                            v-model:selectedKey="materialInfo.property"></MISADropdown>
                    </div>
                </div>
                <div class="popup__content--right">
                    <div class="popup__group">
                        <MISACombobox ref="txtCategory" label="Nhóm NVL" :isRequired="false"
                            v-model="materialInfo.categoryName" v-model:selectedKey="materialInfo.categoryID"
                            v-model:error="validateErrorInfo.categoryName" name="category"
                            v-on:requestOpenAddPopup="handleRequestOpenAddPopup" tooltipText="Nhóm nguyên vật liệu"
                            :canAdd="true"></MISACombobox>
                    </div>
                </div>
                <div class="popup__content--left">
                    <div class="popup__group">
                        <MISACombobox ref="txtUnit" label="ĐVT" :isRequired="true" v-model="materialInfo.unitName"
                            v-model:selectedKey="materialInfo.unitID" v-model:error="validateErrorInfo.unitName" name="unit"
                            v-on:requestOpenAddPopup="handleRequestOpenAddPopup" tooltipText="Đơn vị tính" :canAdd="true">
                        </MISACombobox>
                    </div>
                </div>
                <div class="popup__content--right">
                    <div class="popup__group">
                        <MISACombobox ref="txtStore" label="Kho ngầm định" :isRequired="false"
                            v-model="materialInfo.storeName" v-model:selectedKey="materialInfo.storeID"
                            v-model:error="validateErrorInfo.storeName" name="store"
                            v-on:requestOpenAddPopup="handleRequestOpenAddPopup" :canAdd="true">
                        </MISACombobox>
                    </div>
                </div>
                <div class="popup__content--left">
                    <div class="popup__group popup__group--expire">
                        <MISAInput label="Thời hạn" v-model="materialInfo.expireValue"
                            type="number"></MISAInput>
                        <MISADropdown ref="txtExpireUnit" v-model="materialInfo.expireUnitName"
                            v-model:selectedKey="materialInfo.expireUnit"></MISADropdown>
                    </div>
                </div>
                <div class="popup__content--right">
                    <div class="popup__group popup__group--miniquantity">
                        <MISAInput label="SL tồn tối thiểu" tooltipText="Số lượng tồn kho tối thiểu"
                            v-model="materialInfo.miniQuantity" class="text-align--right"
                            type="number">
                        </MISAInput>
                    </div>
                </div>
                <div class="popup__group popup__group--note">
                    <MISATextarea label="Ghi chú" ref="txtNote" v-model="materialInfo.note" v-model:error="validateErrorInfo.note" v-model:validationRule="validationRule.note"></MISATextarea>
                </div>
            </div>
            <div class="conversion-container">
                <div class="conversion__header">
                    <div class="title">Đơn vị chuyển đổi</div>
                </div>
                <div class="conversion__content">
                    <table>
                        <thead>
                            <tr>
                                <th class="text-align--center" width="8%">
                                    <MISATextTooltip text="STT" tooltipText="Số thứ tự"></MISATextTooltip>
                                </th>
                                <th width="25%">Đơn vị chuyển đổi</th>
                                <th width="15%">Tỷ lệ chuyển đổi</th>
                                <th width="14%">Phép tính</th>
                                <th width="25%"
                                    :class="{ 'border-right--none': materialInfo.property == MISA_ENUMS.PROPERTY.MATERIAL }">
                                    Mô tả</th>
                                <th width="13%" v-show="materialInfo.property != MISA_ENUMS.PROPERTY.MATERIAL">Là đơn vị bán
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in materialInfo.listOfConversions" :key="index">
                                <td class="text-align--center">{{ index + 1 }}</td>
                                <td>
                                    <MISACombobox ref="txtConversion" v-model:selectedKey="item.unitID"
                                        v-model="item.unitName" name="unit"
                                        v-on:requestOpenAddPopup="handleRequestOpenAddPopup" :canAdd="true"
                                        ></MISACombobox>
                                </td>
                                <td>
                                    <MISAInput v-model="item.conversionRate" type="number"
                                        ></MISAInput>
                                </td>
                                <td>
                                    <MISADropdown ref="txtCalculator" v-model:selectedKey="item.calculator"
                                        v-model="item.calculatorName"></MISADropdown>
                                </td>
                                <td :class="{ 'border-right--none': materialInfo.property == MISA_ENUMS.PROPERTY.MATERIAL }">
                                    <input type="text" v-model="item.description" /></td>
                                <td v-show="materialInfo.property != MISA_ENUMS.PROPERTY.MATERIAL">
                                    <div class="checkbox-container"><input type="checkbox" v-model="item.isVendor" /></div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="conversion__footer">
                    <MISAButton text="Thêm dòng" :type="MISA_ENUMS.BUTTON_TYPE.ICON_TEXT" :iconClass="ICON_CLASS.ADD"
                        v-on:click="handleClickAddLine">
                    </MISAButton>
                    <MISAButton text="Xóa dòng" :type="MISA_ENUMS.BUTTON_TYPE.ICON_TEXT" :iconClass="ICON_CLASS.DELETE"
                        :iconColor="MISA_RESOURCES.ICON_BUTTON_COLOR.DANGEROUS"
                        :class="{ 'button--disable': (materialInfo.listOfConversions.length == 0) }"
                        v-on:click="handleClickRemoveLine">
                    </MISAButton>
                </div>
            </div>
            <div class="popup__group popup__group--stop-using" v-show="popupType != MISA_ENUMS.POPUP_TYPE.ADD">
                <input type="checkbox" v-model="materialInfo.isStopUsing" />
                <label class="input__label">Ngưng sử dụng</label>
            </div>
            <div class="popup__footer">
                <div class="popup__action">
                    <MISAButton text="Cất" :type="MISA_ENUMS.BUTTON_TYPE.ICON_TEXT"
                        :iconClass="MISA_RESOURCES.ICON_CLASS.SAVE" v-on:click="handleClickButtonSave"></MISAButton>
                    <MISAButton text="Cất và thêm" :type="MISA_ENUMS.BUTTON_TYPE.ICON_TEXT"
                        :iconClass="MISA_RESOURCES.ICON_CLASS.SAVE_AND_ADD" v-on:click="handleClickButtonSaveAndAdd">
                    </MISAButton>
                    <MISAButton text="Hủy bỏ" :type="MISA_ENUMS.BUTTON_TYPE.ICON_TEXT"
                        :iconClass="MISA_RESOURCES.ICON_CLASS.CANCEL"
                        :iconColor="MISA_RESOURCES.ICON_BUTTON_COLOR.DANGEROUS" v-on:click="closeMaterialInfoPopup">
                    </MISAButton>
                </div>
                <MISAButton text="Giúp" :type="MISA_ENUMS.BUTTON_TYPE.ICON_TEXT" :iconClass="MISA_RESOURCES.ICON_CLASS.HELP"
                    v-on:keydown="handleOnTabHelper">
                </MISAButton>
            </div>
            <MISADialog ref="dialog" v-show="isShowDialog" v-on:closeDialogNotify="closeDialogNotify"
                v-on:handleClickDialogButton="handleEvent"></MISADialog>
            <UnitDetail v-if="isShowUnitPopup" v-on:closeUnitInfoPopup="closeUnitInfoPopup"
                v-on:requestReloadUnits="handleRequestReloadUnits"></UnitDetail>
            <StoreDetail v-if="isShowStorePopup" v-on:closeStoreInfoPopup="closeStoreInfoPopup"
                v-on:requestReloadStores="handleRequestReloadStores"></StoreDetail>
            <CategoryDetail v-if="isShowCategoryPopup" v-on:closeCategoryInfoPopup="closeCategoryInfoPopup"
                v-on:requestReloadCategories="handleRequestReloadCategories"></CategoryDetail>
        </div>
    </div>
    <MISAToast ref="toast" v-show="isShowToast" v-on:closeToastMessage="closeToastMessage"></MISAToast>
    <MISALoading v-if="isShowLoading"></MISALoading>
</template>
<script>
import MISA_ENUMS from '@/resources/enum';
import MISA_RESOURCES from '@/resources/resource';
import MISA_HELPERS from '@/resources/helper';
import { v4 as uuidv4 } from 'uuid';
import CATEGORY_SERVICE from '@/services/CategoryService';
import STORE_SERVICE from '@/services/StoreService';
import UNIT_SERVICE from '@/services/UnitService';
import MATERIAL_SERVICE from '@/services/MaterialService';
import UnitDetail from '@/components/units/UnitDetail.vue';
import StoreDetail from '@/components/stores/StoreDetail.vue';
import CategoryDetail from '@/components/categories/CategoryDetail.vue';
export default {
    name: "MaterialDetail",
    props: ["popupType", "data"],
    mounted() {
        // Khởi tạo thông tin popup nguyên vật liệu
        this.initMaterialInfoPopup();
        this.$refs.txtMaterialName.focusInput();
    },
    updated() {
        // Khởi tạo các trường nhập đơn vị chuyển đổi
        this.initConversionInput();
    },
    methods: {
        /**
         * Khởi tạo thông tin popup nguyên vật liệu
         * Author: TrangDTT (29/05/2023)
         */
        initMaterialInfoPopup: async function () {
            try {
                // 1. Thiết lập tiêu đề popup
                this.title = this.getPopupTitle();

                // 2. Lấy các dữ liệu cần thiết
                // Khởi tạo danh sách tính chất nguyên vật liệu
                this.$refs.txtProperty.setListOfOptions(MISA_RESOURCES.LIST_OF_PROPERTIES);

                // Khởi tạo danh sách đơn vị thời hạn
                this.$refs.txtExpireUnit.setListOfOptions(MISA_RESOURCES.LIST_OF_EXPIRE_UNITS);

                // Hiển thị loading
                this.isShowLoading = true;

                // Gọi API lấy danh sách nhóm nguyên vật liệu
                let listOfCategories = await this.getListOfCategories();
                this.$refs.txtCategory.setListOfOptions(listOfCategories);

                // Gọi API lấy danh sách đơn vị
                let listOfUnits = await this.getListOfUnits();
                this.$refs.txtUnit.setListOfOptions(listOfUnits);

                // Gọi API lấy danh sách kho
                let listOfStores = await this.getListOfStores();
                this.$refs.txtStore.setListOfOptions(listOfStores);

                // Goọi API lấy thông tin nguyên vật liệu nếu là popup sửa/nhân bản
                if (this.data != "") {
                    // Lấy thông tin nguyên vật liệu
                    let data = await MATERIAL_SERVICE.getById(this.data);
                    // Nếu là popup nhân bản, lấy mã nguyên vật liệu mới
                    if (this.popupType == MISA_ENUMS.POPUP_TYPE.REPLICATION) data.materialCode = await this.getNewMaterialCode(data.materialName);
                    for (let key in data) {
                        this.materialInfo[key] = data[key];
                    }
                }
                this.oldMaterialInfo = JSON.stringify(this.materialInfo);
            } catch (error) {
                console.log(error);
                this.displayDialogForException(error, MISA_RESOURCES.DIALOG_TITLE.EXCEPTION);
            } finally {
                this.isShowLoading = false;
            }
        },

        /**
         * Lấy mã nguyên vật liệu mới
         * @param {*} startStr Chuỗi ký tự bắt đầu mã nguyên vật liệu
         * Author: TrangDTT (02/06/2023)
         */
        getNewMaterialCode: async function (materialName) {
            // 1. Lấy chuỗi ký tự bắt đầu mã nguyên vật liệu từ tên
            let words = materialName.split(" ");
            let startStr = "";
            words.forEach(word => {
                startStr += word[0].toString().toUpperCase();
            });

            // 2. Gọi API lấy mã nguyên vật liệu mới
            let newCode = await MATERIAL_SERVICE.getNewCode(startStr);

            // 3. Trả về mã nguyên vật liệu mới
            return newCode;
        },
        /**
         * Gọi API lấy danh sách nhóm nguyên vật liệu
         * Author: TrangDTT (31/05/2023)
         */
        getListOfCategories: async function () {
            // 1. Gọi API lấy danh sách nhóm nguyên vật liệu
            let data = await CATEGORY_SERVICE.getAll();

            // 2. Xử lý kết quả trả về
            let listOfCategories = [];
            data.forEach(element => {
                listOfCategories.push({ key: element.categoryID, value: element.categoryName });
            });

            return listOfCategories;
        },
        /**
         * Gọi API lấy danh sách đơn vị
         * Author: TrangDTT (31/05/2023)
         */
        getListOfUnits: async function () {
            // 1. Gọi API lấy danh sách đơn vị
            let data = await UNIT_SERVICE.getAll();

            // 2. Xử lý kết quả trả về
            let listOfUnits = [];
            data.forEach(element => {
                listOfUnits.push({ key: element.unitID, value: element.unitName });
            });
            this.listOfConversions = listOfUnits;

            return listOfUnits;
        },
        /**
         * Gọi API lấy danh sách kho
         * Author: TrangDTT (31/05/2023)
         */
        getListOfStores: async function () {
            // 1. Gọi API lấy danh sách kho
            let data = await STORE_SERVICE.getAll();

            // 2. Xử lý kết quả trả về
            let listOfStores = [];
            data.forEach(element => {
                listOfStores.push({ key: element.storeID, value: element.storeName });
            });

            return listOfStores;
        },
        /**
         * Lấy tiêu đề popup
         * Author: TrangDTT (29/05/2023)
         */
        getPopupTitle: function () {
            switch (this.popupType) {
                // Popup thêm mới
                case MISA_ENUMS.POPUP_TYPE.ADD:
                    return MISA_RESOURCES.POPUP_TITLE.ADD + this.OBJECT_NAME;
                // Popup sửa
                case MISA_ENUMS.POPUP_TYPE.EDIT:
                    return MISA_RESOURCES.POPUP_TITLE.EDIT + this.OBJECT_NAME;
                // Popup nhân bản
                case MISA_ENUMS.POPUP_TYPE.REPLICATION:
                    return MISA_RESOURCES.POPUP_TITLE.REPLICATION + this.OBJECT_NAME;

                default:
                    return "";
            }
        },
        /**
         * Kiểm tra định dạng mã nguyên vật liệu
         * @param {*} label Nhãn truyền vào phục vụ cho việc hiển thị lỗi
         * Author: TrangDTT (04/06/2023)
         */
        checkMaterialCode: function (label) {
            // Nếu tên chưa nhập mà đã nhập mã, yêu cầu nhập tên
            if (!this.materialInfo.materialName) this.validateErrorInfo.materialCode = MISA_RESOURCES.VALIDATION_ERROR.REQUEST_NAME;
            else {
                let res = MISA_HELPERS.CHECK_MATERIAL_CODE(this.materialInfo.materialCode, this.materialInfo.materialName)
                if (res) {
                    this.validateErrorInfo.materialCode = "";
                } else {
                    this.validateErrorInfo.materialCode = label + MISA_RESOURCES.VALIDATION_ERROR.INCORRECT_FORMAT;
                }
            }
        },
        /**
         * Xử lý sự kiện blur tên nguyên vật liệu
         * Author: TrangDTT (04/06/2023)
         */
        handleBlurMaterialName: async function () {
            try {
                if (!this.validateErrorInfo.materialName) {
                    // Nếu chưa có mã thì gọi api lấy mã mới
                    if (this.materialInfo.materialCode == "" || !MISA_HELPERS.CHECK_MATERIAL_CODE(this.materialInfo.materialCode, this.materialInfo.materialName)) {
                        // Hiển thị loading
                        this.isShowLoading = true;
                        this.materialInfo.materialCode = await this.getNewMaterialCode(this.materialInfo.materialName);
                        this.validateErrorInfo.materialCode = "";
                    }
                }
            } catch (error) {
                console.log(error);
                this.displayDialogForException(error, MISA_RESOURCES.DIALOG_TITLE.EXCEPTION);
            } finally {
                this.isShowLoading = false;
            }
        },
        /**
         * Khởi tạo dữ liệu cho các trường nhập đơn vị chuyển đổi
         * Author: TrangDTT (03/06/2023)
         */
        initConversionInput: function () {
            let size = this.materialInfo.listOfConversions.length; 
            for (let index = 0; index < size; index++) {
                this.$refs.txtConversion[index].setListOfOptions(this.listOfConversions);
                this.$refs.txtCalculator[index].setListOfOptions(MISA_RESOURCES.LIST_OF_CALCULATORS);
            }
        },
        /**
         * Xử lý sự kiện thêm dòng
         * Author: TrangDTT (31/05/2023)
         */
        handleClickAddLine: async function () {
            let conversion = {
                conversionID: uuidv4(),
                unitID: "",
                conversionRate: 1,
                calculator: MISA_ENUMS.CALCULATOR.MULTIPLY,
                description: "",
                isVendor: false,
                unitName: "",
                calculatorName: MISA_RESOURCES.CALCULATOR.MULTIPLY,
            };
            await this.materialInfo.listOfConversions.push(conversion);
            this.$refs.txtConversion[this.materialInfo.listOfConversions.length-1].focusInput();
        },
        /**
         * Xử lý sự kiện xóa dòng
         * Author: TrangDTT (31/05/2023)
         */
        handleClickRemoveLine: function () {
            this.materialInfo.listOfConversions.pop();
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
                case MISA_ENUMS.EVENT_TYPE.CLOSE_AND_RELOAD:
                    // Đóng popup
                    this.$emit("closeMaterialInfoPopup");
                    // Yêu cầu reload dữ liệu
                    this.$emit("requestReloadData");
                    break;
                case MISA_ENUMS.EVENT_TYPE.CLOSE_AND_RESET_POPUP:
                    // Reset popup thông tin nguyên vật liệu
                    this.resetMaterialInfoPopup();
                    // Thiết lập lại tiêu đề, loại popup
                    this.$emit('update:popupType', MISA_ENUMS.POPUP_TYPE.ADD);
                    this.title = MISA_RESOURCES.POPUP_TITLE.ADD + this.OBJECT_NAME;
                    // Focus vào ô nhập liệu đầu tiên
                    this.$refs.txtMaterialName.focusInput();
                    break;
                case MISA_ENUMS.EVENT_TYPE.SAVE_AND_CLOSE_POPUP:
                    // Lưu lại dữ liệu
                    this.saveData();
                    break;
                case MISA_ENUMS.EVENT_TYPE.NOT_SAVE_AND_CLOSE_POPUP:
                    // Đóng popup chi tiết
                    this.$emit("closeMaterialInfoPopup");
                    break;
                default:
                    break;
            }
        },
        /**
         * Đóng popup thông tin nguyên vật liệu
         * Author: TrangDTT (29/05/2023)
         */
        closeMaterialInfoPopup: function () {
            // 1. Kiểm tra xem dữ liệu của popup có bị thay đổi hay không
            let oldValue = this.oldMaterialInfo;
            let newValue = JSON.stringify(this.materialInfo);

            if (oldValue == newValue) {
                // 2.1. Nếu dữ liệu không thay đổi
                // Yêu cầu đóng popup
                this.$emit("closeMaterialInfoPopup");
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
         * Reset thông tin popup
         * Author: TrangDTT (02/06/2023)
         */
        resetMaterialInfoPopup: function () {
            for (let key in this.materialInfo) {
                this.materialInfo[key] = "";
            }
            this.materialInfo.propertyName = MISA_RESOURCES.PROPERTY.MATERIAL;
            this.materialInfo.property = MISA_ENUMS.PROPERTY.MATERIAL;
            this.materialInfo.expireUnit = MISA_ENUMS.EXPIRE_UNIT.DAY;
            this.materialInfo.expireUnitName = MISA_RESOURCES.EXPIRE_UNIT.DAY;
            this.materialInfo.listOfConversions = [];
            this.oldMaterialInfo = JSON.stringify(this.materialInfo);
        },
        /**
         * Kiểm tra đơn vị chuyển đổi
         * @param {*} unitID ID đơn vị
         * @param {*} unitName Tên đơn vị
         * @param {*} listOfPreviousUnits Danh sách id đơn vị chuyển đổi trước
         * Author: TrangDTT (06/06/2023)
         */
        checkUnitForConversion: function (unitID, unitName, listOfPreviousUnits) {
            let objectName = MISA_RESOURCES.OBJECT_NAME.CONVERSION;
            let validationError = MISA_RESOURCES.VALIDATION_ERROR;
            // Kiểm tra tính bắt buộc
            if (unitID == "") {
                // Lỗi để trống
                if (unitName == "") {
                    return objectName + validationError.NOT_EMPTY_NAME;
                }
                // Lỗi không tồn tại
                return objectName + validationError.NOT_EXIST;
            }
            // Lỗi trùng lặp đơn vị chính
            if (unitID == this.materialInfo.unitID) return objectName + validationError.NOT_REPEAT_MAIN_UNIT;

            // Lỗi bị trùng lặp đơn vị chuyển đổi
            if (listOfPreviousUnits.includes(unitID)) return objectName + validationError.DUPLICATE;

            return "";
        },
        /**
         * Validate danh sách đơn vị chuyển đổi
         * Author: TrangDTT (06/06/2023)
         */
        validateListOfConversions: function () {
            // 1. Khởi tạo danh sách lỗi
            let listOfErrors = [];

            // 2. Validate danh sách đơn vị chuyển đổi
            let conversion = {};

            // Duyệt danh sách đơn vị chuyển đổi
            let error = "";
            let listOfPreviousUnits = [];
            for (let index = 0; index < this.materialInfo.listOfConversions.length; index++) {
                conversion = this.materialInfo.listOfConversions[index];
                // Kiểm tra tên đơn vị chuyển đổi
                error = this.checkUnitForConversion(conversion.unitID, conversion.unitName, listOfPreviousUnits);
                if (error != "") {
                    listOfErrors.push(error);
                    break;
                }
                // Kiểm tra tỷ lệ chuyển đổi
                if (Number(conversion.conversionRate) == 0) {
                    listOfErrors.push(MISA_RESOURCES.VALIDATION_ERROR.CONVERSION_RATE);
                    break;
                }
                listOfPreviousUnits.push(conversion.unitID);
            }

            // 3. Trả về danh sách lỗi
            return listOfErrors;
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

            // 4. Validate danh sách đơn vị chuyển đổi
            let listOfConversionErrors = this.validateListOfConversions();
            listOfValidationErrors = listOfValidationErrors.concat(listOfConversionErrors);

            // 5. Trả về danh sách lỗi
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
                for (let key of Object.keys(this.materialInfo)) {
                    data[key] = this.materialInfo[key];
                }

                // Format lại một số trường dữ liệu đặc biệt
                data["expireValue"] = (data["expireValue"] == "") ? null : Number(data["expireValue"]);
                data["miniQuantity"] = (data["miniQuantity"] == "") ? null : Number(data["miniQuantity"]);
                if (data["storeID"] == "") data["storeID"] = null;
                if (data["categoryID"] == "") data["categoryID"] = null;
                if (data.unitID == "") data.unitID = MISA_RESOURCES.UUID_EMPTY;
                data['listOfConversions'] = [];
                this.materialInfo.listOfConversions.forEach(element => {
                    let conversion = {
                        conversionID: uuidv4(),
                        unitID: element.unitID,
                        conversionRate: (element.conversionRate == "") ? null : Number(element.conversionRate),
                        calculator: element.calculator,
                        description: element.description,
                        isVendor: element.isVendor,
                        unitName: element.unitName,
                        calculatorName: element.calculatorName,
                    };
                    data['listOfConversions'].push(conversion);
                });

                // Nếu là thêm mới hoặc nhân bản
                if (this.popupType == MISA_ENUMS.POPUP_TYPE.ADD || this.popupType == MISA_ENUMS.POPUP_TYPE.REPLICATION) {

                    // Tạo id nguyên vật liệu mới
                    data.materialID = uuidv4();

                    // Gọi API thêm mới nguyên vật liệu
                    await this.addOrEditMaterial(data, true);
                } else {
                    // Gán id nguyên vật liệu nhận được
                    data.materialID = this.data;

                    // Gọi API sửa thông tin nguyên vật liệu
                    await this.addOrEditMaterial(data, false);
                }
            }
        },
        /**
         * Hàm xử lý gọi API thêm hoặc sửa nguyên vật liệu
         * @param {*} data Dữ liệu nguyên vật liệu cần thêm mới/sửa đổi
         * @param {*} isAdd Có phải thao tác thêm mới không: true là thêm mới, false là sửa đổi (nhân bản bản chất cũng là thêm mới)
         * Author: TrangDTT (02/06/2023)
         */
        addOrEditMaterial: async function (data, isAdd) {
            try {
                // 1. Hiển thị loading
                this.isShowLoading = true;

                // 2. Gọi API thêm/sửa đổi nguyên vật liệu
                if (isAdd) await MATERIAL_SERVICE.post(data);
                else await MATERIAL_SERVICE.put(data);

                // 3. Hiển thị toast message
                // 3.1. Hiển thị toast message thành công
                // Thiết lập thông tin toast message
                this.successToast.DESCRIPTION = isAdd ? (!this.data ? MISA_RESOURCES.MESSAGE.MATERIAL.ADD.SUCCESS : MISA_RESOURCES.MESSAGE.MATERIAL.REPLICATION.SUCCESS) : MISA_RESOURCES.MESSAGE.MATERIAL.EDIT.SUCCESS;

                this.$refs.toast.setToastMessageInfo(this.successToast);

                // Hiển thị toast message
                this.openToastMessage();

                // 3.2. Thiết lập timeout
                setTimeout(() => {
                    this.closeToastMessage();
                    // Nếu button cất và thêm đang được click
                    if (this.isButtonSaveAndAdd) {
                        this.handleEvent({ eventType: MISA_ENUMS.EVENT_TYPE.CLOSE_AND_RESET_POPUP });
                    } else {
                        this.handleEvent({ eventType: MISA_ENUMS.EVENT_TYPE.CLOSE_AND_RELOAD });
                    }
                }, MISA_RESOURCES.TOAST_TIME_OUT);

            } catch (error) {
                console.log(error);
                let title = this.getPopupTitle();
                this.displayDialogForException(error, title);
            } finally {
                this.isShowLoading = false;
            }
        },
        /**
         * Xử lý sự kiện click button Cất
         * Author: TrangDTT (31/05/2023)
         */
        handleClickButtonSave: function () {
            this.isButtonSaveAndAdd = false;
            this.saveData();
        },
        /**
         * Xử lý sự kiện click button cất và thêm
         * Author: TrangDTT (31/05/2023)
         */
        handleClickButtonSaveAndAdd: function () {
            this.isButtonSaveAndAdd = true;
            this.saveData();
        },
        /**
         * Thiết lập lại tab index khi tab đến nút trợ giúp
         * Author: TrangDTT (05/06/2023)
         */
        handleOnTabHelper: function () {
            this.$refs.checkboxForTabIndex.focus();
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
        /**
         * Xử lý yêu cầu mở popup thêm mới
         * @param {*} data Thông tin popup cần mở
         * Author: TrangDTT (02/06/2023)
         */
        handleRequestOpenAddPopup: function (data) {
            switch (data.name) {
                case "unit":
                    this.isShowUnitPopup = true;
                    break;
                case "store":
                    this.isShowStorePopup = true;
                    break;
                case "category":
                    this.isShowCategoryPopup = true;
                    break;

                default:
                    break;
            }
        },
        /**
         * Đóng popup thông tin đơn vị
         * Author: TrangDTT (02/06/2023)
         */
        closeUnitInfoPopup: function () {
            this.isShowUnitPopup = false;
        },
        /**
         * Xử lý yêu cầu tải lại danh sách đơn vị
         * Author: TrangDTT (02/06/2023)
         */
        handleRequestReloadUnits: async function () {
            let newList = [];
            newList = await this.getListOfUnits();
            this.$refs.txtUnit.setListOfOptions(newList);
        },
        /**
         * Đóng popup thông tin kho
         * Author: TrangDTT (02/06/2023)
         */
        closeStoreInfoPopup: function () {
            this.isShowStorePopup = false;
        },
        /**
         * Xử lý yêu cầu tải lại danh sách kho
         * Author: TrangDTT (02/06/2023)
         */
        handleRequestReloadStores: async function () {
            let newList = [];
            newList = await this.getListOfStores();
            this.$refs.txtStore.setListOfOptions(newList);
        },
        /**
         * Đóng popup thông tin nhóm nguyên vật liệu
         * Author: TrangDTT (02/06/2023)
         */
        closeCategoryInfoPopup: function () {
            this.isShowCategoryPopup = false;
        },
        /**
         * Xử lý yêu cầu tải lại danh sách nhóm nguyên vật liệu
         * Author: TrangDTT (02/06/2023)
         */
        handleRequestReloadCategories: async function () {
            let newList = [];
            newList = await this.getListOfCategories();
            this.$refs.txtCategory.setListOfOptions(newList);
        },
    },
    data() {
        return {
            // Tiêu đề popup
            title: "",
            // Thông tin nguyên vật liệu
            materialInfo: {
                // ID nguyên vật liệu
                materialID: "",
                // Mã nguyên vật liệu
                materialCode: "",
                // Tên nguyên vật liệu
                materialName: "",
                // Tính chất
                property: MISA_ENUMS.PROPERTY.MATERIAL,
                // Đơn vị thời hạn
                expireUnit: MISA_ENUMS.EXPIRE_UNIT.DAY,
                // ID nhóm nguyên vật liệu
                categoryID: "",
                // ID kho
                storeID: "",
                // ID đơn vị
                unitID: "",
                // Tên đơn vị
                unitName: "",
                // Giá trị thời hạn
                expireValue: 0,
                // Ghi chú
                note: "",
                // Số lượng tồn kho tối thiểu
                miniQuantity: 0,
                // Tên tính chất
                propertyName: MISA_RESOURCES.PROPERTY.MATERIAL,
                // Tên đơn vị thời hạn
                expireUnitName: MISA_RESOURCES.EXPIRE_UNIT.DAY,
                // Tên nhóm nguyên vật liệu
                categoryName: "",
                // Tên kho
                storeName: "",
                // Danh sách đơn vị chuyển đổi
                listOfConversions: [],
                // Trạng thái ngưng sử dụng
                isStopUsing: false,
            },
            // Thông tin validate dữ liệu
            validateErrorInfo: {
                materialCode: "",
                materialName: "",
                categoryName: "",
                storeName: "",
                unitName: "",
                note: ""
            },
            // Các luật cần validate
            validationRule: {
                materialCode: {
                    isRequired: true,
                    isMaterialCode: true,
                    maxLength: 20
                },
                materialName: {
                    isRequired: true,
                    maxLength: 255
                },
                note: {
                    maxLength: 255
                },
            },
            // Enums
            MISA_ENUMS: MISA_ENUMS,
            // Resources
            MISA_RESOURCES: MISA_RESOURCES,
            // Helpers
            MISA_HELPERS: MISA_HELPERS,
            // Icon class
            ICON_CLASS: MISA_RESOURCES.ICON_CLASS,
            // Tooltip text
            TOOLTIP_TEXT: MISA_RESOURCES.TOOLTIP_TEXT,
            // Tên đối tượng
            OBJECT_NAME: MISA_RESOURCES.OBJECT_NAME.MATERIAL,
            // Hiển thị dialog
            isShowDialog: false,
            // Hiển thị loading
            isShowLoading: false,
            // Hiển thị toast message
            isShowToast: false,
            // Danh sách đơn vị chuyển đổi
            listOfConversions: [],
            // Có phải nút cất và thêm đang được click không
            isButtonSaveAndAdd: false,
            // Hộp thoại thất bại
            failedDialog: MISA_RESOURCES.DIALOG.FAILED,
            // Hộp thoại cảnh báo
            warningDialog: MISA_RESOURCES.DIALOG.WARNING,
            // Toast message thành công
            successToast: MISA_RESOURCES.TOAST.SUCCESS,
            // Danh sách tham chiếu các trường dữ liệu
            listOfFieldRefs: ["txtMaterialName", "txtMaterialCode", "txtUnit", "txtCategory", "txtStore", "txtNote"],
            // Thông tin nguyên vật liệu cũ
            oldMaterialInfo: "",
            // Hiển thị popup thêm mới đơn vị
            isShowUnitPopup: false,
            // Hiển thị popup thêm mới kho
            isShowStorePopup: false,
            // Hiển thị popup thêm mới nhóm nguyên vật liệu
            isShowCategoryPopup: false,
        }
    },
    components: {
        UnitDetail,
        StoreDetail,
        CategoryDetail
    },
    emits: ["closeMaterialInfoPopup", "requestReloadData"]
}
</script>
<style scoped>@import "@/css/materials/material-detail.css";</style>