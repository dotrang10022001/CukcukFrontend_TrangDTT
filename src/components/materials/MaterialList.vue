<template>
    <div class="table">
        <div class="table__action">
            <MISAButton text="Thêm" :type="MISA_ENUMS.BUTTON_TYPE.ICON_TEXT" :iconClass="MISA_RESOURCES.ICON_CLASS.ADD"
                v-on:click="handleClickButtonAdd" :tooltipText="TOOLTIP_TEXT.ADD">
            </MISAButton>
            <MISAButton text="Nhân bản" :type="MISA_ENUMS.BUTTON_TYPE.ICON_TEXT"
                :iconClass="MISA_RESOURCES.ICON_CLASS.REPLICATION" v-on:click="handleClickButtonReplication"
                :class="{ 'button--disable': (selectedMaterialID == '') }" :tooltipText="TOOLTIP_TEXT.REPLICATION"></MISAButton>
            <MISAButton text="Sửa" :type="MISA_ENUMS.BUTTON_TYPE.ICON_TEXT" :iconClass="MISA_RESOURCES.ICON_CLASS.EDIT"
                v-on:click="handleClickButtonEdit" :tooltipText="TOOLTIP_TEXT.EDIT" :class="{ 'button--disable': (selectedMaterialID == '') }">
            </MISAButton>
            <MISAButton text="Xóa" :type="MISA_ENUMS.BUTTON_TYPE.ICON_TEXT" :iconClass="MISA_RESOURCES.ICON_CLASS.DELETE"
                :iconColor="MISA_RESOURCES.ICON_BUTTON_COLOR.DANGEROUS" v-on:click="handleClickButtonDelete"
                :class="{ 'button--disable': (selectedMaterialID == '') }" :tooltipText="TOOLTIP_TEXT.DELETE"></MISAButton>
            <MISAButton text="Nạp" :type="MISA_ENUMS.BUTTON_TYPE.ICON_TEXT" :iconClass="MISA_RESOURCES.ICON_CLASS.LOAD"
                v-on:click="handleClickButtonLoad" :tooltipText="TOOLTIP_TEXT.RELOAD">
            </MISAButton>
        </div>
        <div class="table__content">
            <table>
                <thead>
                    <tr>
                        <th width="10%">
                            Mã nguyên liệu
                            <div class="search search--code">
                                <TheFilterMenu name="materialCode" v-on:handleSelectFilterOption="handleSelectFilterOption">
                                </TheFilterMenu>
                                <input type="text" v-model="filterInfo.materialCode"
                                    v-on:keydown.enter="handleRequestFilterData" />
                            </div>
                        </th>
                        <th width="15%">
                            Tên nguyên liệu
                            <div class="search search--name">
                                <TheFilterMenu name="materialName" v-on:handleSelectFilterOption="handleSelectFilterOption">
                                </TheFilterMenu>
                                <input type="text" v-model="filterInfo.materialName"
                                    v-on:keydown.enter="handleRequestFilterData" />
                            </div>
                        </th>
                        <th width="15%">
                            Tính chất
                            <div class="search search--property">
                                <MISADropdown ref="dropdownProperty" v-model:selectedKey="filterInfo.property.key"
                                    v-model="filterInfo.property.value"></MISADropdown>
                            </div>
                        </th>
                        <th width="10%">
                            <MISATextTooltip text="ĐVT chính" tooltipText="Đơn vị tính chính"></MISATextTooltip>
                            <div class="search search--unit">
                                <TheFilterMenu name="unitName" v-on:handleSelectFilterOption="handleSelectFilterOption">
                                </TheFilterMenu>
                                <input type="text" v-model="filterInfo.unitName"
                                    v-on:keydown.enter="handleRequestFilterData" />
                            </div>
                        </th>
                        <th width="20%">
                            Nhóm nguyên vật liệu
                            <div class="search search--group">
                                <TheFilterMenu name="categoryName" v-on:handleSelectFilterOption="handleSelectFilterOption">
                                </TheFilterMenu>
                                <input type="text" v-model="filterInfo.categoryName"
                                    v-on:keydown.enter="handleRequestFilterData" />
                            </div>
                        </th>
                        <th width="20%">
                            Ghi chú
                            <div class="search search--note">
                                <TheFilterMenu name="note" v-on:handleSelectFilterOption="handleSelectFilterOption">
                                </TheFilterMenu>
                                <input type="text" v-model="filterInfo.note" v-on:keydown.enter="handleRequestFilterData" />
                            </div>
                        </th>
                        <th width="10%">
                            Ngừng theo dõi
                            <div class="search search--stop-using">
                                <MISADropdown ref="dropdownStopUsing" v-model:selectedKey="filterInfo.isStopUsing.key"
                                    v-model="filterInfo.isStopUsing.value"></MISADropdown>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody v-if="listOfMaterials.length > 0 && !isShowLoading">
                    <tr :class="{ 'row--selected': (selectedMaterialID == item.materialID) }"
                        v-for="(item, index) in listOfMaterials" :key="index"
                        v-on:click="handleOnSelectMaterial(item.materialID, item.materialCode, item.materialName)"
                        v-on:dblclick="handleClickButtonEdit">
                        <td>{{ item.materialCode }}</td>
                        <td>{{ item.materialName }}</td>
                        <td>{{ item.propertyName }}</td>
                        <td>{{ item.unitName }}</td>
                        <td>{{ item.categoryName }}</td>
                        <td>{{ item.note }}</td>
                        <td>
                            <div class="checkbox-container"><input type="checkbox" v-bind:checked="item.isStopUsing"
                                    disabled="disabled" /></div>
                        </td>
                    </tr>
                </tbody>
                <tbody v-if="listOfMaterials.length == 0 && !isShowLoading">
                    <tr>
                        <td colspan="7">
                            <div class="text-align--center">Không có nguyên vật liệu nào để hiển thị</div>
                        </td>
                    </tr>
                </tbody>
                <tbody v-if="isShowLoading">
                    <tr>
                        <td colspan="7">
                            <div class="table__loading">
                                <span><i class="fa-solid fa-spinner"></i></span>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="table__footer">
            <div class="left">
                <MISAIconTooltip class="arrow arrow--first-page" :tooltipText="TOOLTIP_TEXT.FIRST_PAGE" :iconClass="ICON_CLASS.FIRST_PAGE" v-on:click="moveToFirstPage"
                    :class="{ 'arrow--disable': !canMoveToFirstPage }"></MISAIconTooltip>
                <MISAIconTooltip class="arrow arrow--previous-page" :tooltipText="TOOLTIP_TEXT.PREVIOUS_PAGE" :iconClass="ICON_CLASS.PREVIOUS_PAGE" v-on:click="backToPreviousPage"
                    :class="{ 'arrow--disable': !canBackToPreviousPage }"></MISAIconTooltip>
                <div class="paging__info">
                    <span>Trang</span>
                    <input type="number" v-model="currentPage" min="1" :max="numberPages"
                        v-on:blur="handleOnSelectPage" />&nbsp;
                    <span>trên {{ numberPages }}</span>
                </div>
                <MISAIconTooltip class="arrow arrow--next-page" :tooltipText="TOOLTIP_TEXT.NEXT_PAGE" :iconClass="ICON_CLASS.NEXT_PAGE" v-on:click="moveToNextPage"
                    :class="{ 'arrow--disable': !canMoveToNextPage }"></MISAIconTooltip>
                <MISAIconTooltip class="arrow arrow--last-page" :tooltipText="TOOLTIP_TEXT.LAST_PAGE" :iconClass="ICON_CLASS.LAST_PAGE" v-on:click="moveToLastPage"
                    :class="{ 'arrow--disable': !canMoveToLastPage }"></MISAIconTooltip>
                <MISAIconTooltip class="load" :tooltipText="TOOLTIP_TEXT.LOAD" :iconClass="ICON_CLASS.LOAD" v-on:click="handleRequestLoadTable"></MISAIconTooltip>
                <div class="paging__option" v-click-outside="closeListPagingOptions">
                    <div class="content" v-on:click="openListPagingOptions"><span>{{ this.numberOfRecords }}</span>
                        <span><i class="fa-solid fa-caret-down"></i></span>
                    </div>
                    <div class="dropdown__option" v-if="isShowListPagingOptions"
                        v-on:click-outside="closeListPagingOptions">
                        <div class="option__content">
                            <ul class="option__data">
                                <li class="option__item" :class="{ 'option__item--active': (item == numberOfRecords) }"
                                    v-for="(item, index) in listOfPagingOptions" :key="index"
                                    v-on:click="handleOnSelectOption(item)">
                                    {{ item }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right">
                <span>Hiển thị {{ startRecordNumber }} - {{ endRecordNumber }} trên {{ totalRecords }} kết quả</span>
            </div>
        </div>
    </div>
    <MISADialog ref="dialog" v-show="isShowDialog" v-on:closeDialogNotify="closeDialogNotify"
        v-on:handleClickDialogButton="handleEvent"></MISADialog>
    <MISAToast ref="toast" v-show="isShowToast" v-on:closeToastMessage="closeToastMessage"></MISAToast>
</template>
<script>
import MISA_ENUMS from '@/resources/enum';
import MISA_RESOURCES from '@/resources/resource';
import MISA_HELPERS from '@/resources/helper';
import MATERIAL_SERVICE from '@/services/MaterialService';
import TheFilterMenu from '@/layouts/TheFilterMenu.vue';
export default {
    name: "MaterialList",
    beforeMount(){
        // Đăng ký sự kiện gõ phím tắt
        document.addEventListener("keydown", this.handleOnKeyboardShortcuts.bind(this), true);
    },
    async mounted() {
        // Lấy danh sách dữ liệu
        await this.getListOfMaterials();

        // Dropdown ngưng sử dụng
        this.$refs.dropdownStopUsing.setListOfOptions(MISA_RESOURCES.LIST_OF_FILTER_STOP_USING);

        // Dropdown tính chất
        this.$refs.dropdownProperty.setListOfOptions(MISA_RESOURCES.LIST_OF_FILTER_PROPERTIES);
    },
    unmounted() {
        // Hủy bỏ sự kiện nhấn phím tắt
        document.removeEventListener("keydown", this.handleOnKeyboardShortcuts, true)
    },
    computed: {
        /**
         * Xác định tổng số trang
         * Author: TrangDTT (30/05/2023)
         */
        numberPages: function () {
            let totalRecords = Number(this.totalRecords);
            let numberRecords = Number(this.numberOfRecords);
            if (totalRecords == 0) return 1;
            if ((totalRecords % numberRecords) == 0) return Math.floor(totalRecords / numberRecords);
            return Math.floor((totalRecords / numberRecords)) + 1;
        },
        /**
         * Hàm xác định có thể chuyển tới trang dữ liệu tiếp theo hay không
         * Author: TrangDTT (12/04/2023)
         */
        canMoveToNextPage: function () {
            let newOffset = Number(this.offset) + Number(this.numberOfRecords);
            if (newOffset < this.totalRecords) return true;
            return false;
        },
        /**
         * Hàm xác định có thể quay lại trang dữ liệu trước hay không
         * Author: TrangDTT (12/04/2023)
         */
        canBackToPreviousPage: function () {
            if (this.offset == 0) return false;
            return true;
        },

        /**
         * Hàm xác định có thể chuyển tới trang dữ liệu đầu tiên hay không
         * Author: TrangDTT (30/05/2023)
         */
        canMoveToFirstPage: function () {
            if (this.currentPage > 1) return true;
            return false;
        },
        /**
         * Hàm xác định có thể di chuyển đến trang dữ liệu cuối hay không
         * Author: TrangDTT (30/05/2023)
         */
        canMoveToLastPage: function () {
            if (this.currentPage < this.numberPages) return true;
            return false;
        },
    },
    methods: {
        /**
         * Xử lý sự kiện gõ các phím tắt
         * @param {*} event Sự kiện gõ phím
         * Author: TrangDTT (06/06/2023)
         */
         handleOnKeyboardShortcuts: function(event){
            // Phím tắt cho thao tác thêm
            if(event.ctrlKey && (event.key == 'a' || event.key == 'A')) {
                event.preventDefault();
                this.handleClickButtonAdd();
            }
            // Phím tắt cho thao tác nhân bản
            if(event.ctrlKey && (event.key == 'r' || event.key == 'R')) {
                event.preventDefault();
                this.handleClickButtonReplication();
            }
            // Phím tắt cho thao tác sửa
            if(event.ctrlKey && (event.key == 'e' || event.key == 'E')) {
                event.preventDefault();
                this.handleClickButtonEdit();
            }
            // Phím tắt cho thao tác xóa
            if(event.ctrlKey && (event.key == 'd' || event.key == 'D')) {
                event.preventDefault();
                this.handleClickButtonDelete();
            }
            // Phím tắt cho thao tác nạp
            if(event.ctrlKey && (event.key == 'l' || event.key == 'L')) {
                event.preventDefault();
                this.handleClickButtonLoad();
            }
        },
        /**
         * Lấy danh sách nguyên vật liệu
         * Author: TrangDTT (30/05/2023)
         */
        getListOfMaterials: async function () {
            try {
                // 1. Hiển thị loading
                this.isShowLoading = true;

                // 2. Gọi API lấy dữ liệu
                let data = await MATERIAL_SERVICE.getPagingForFilter(this.numberOfRecords, this.offset, MISA_HELPERS.GET_FILTER_STRING(this.filterRule.materialCode, this.filterInfo.materialCode), MISA_HELPERS.GET_FILTER_STRING(this.filterRule.materialName, this.filterInfo.materialName),
                    this.filterInfo.property.key, MISA_HELPERS.GET_FILTER_STRING(this.filterRule.unitName, this.filterInfo.unitName), MISA_HELPERS.GET_FILTER_STRING(this.filterRule.categoryName, this.filterInfo.categoryName),
                    MISA_HELPERS.GET_FILTER_STRING(this.filterRule.note, this.filterInfo.note), this.filterInfo.isStopUsing.key == MISA_ENUMS.STOP_USING.NO ? false : true);

                // 3. Xử lý dữ liệu trả về
                this.listOfMaterials = data['data'];
                this.totalRecords = data['totalRecords'];

                // 4. Cập nhật id, mã nguyên vật liệu được chọn
                if (this.listOfMaterials.length > 0) {
                    this.selectedMaterialID = this.listOfMaterials[0].materialID;
                    this.selectedMaterialCode = this.listOfMaterials[0].materialCode;
                    this.selectedMaterialName = this.listOfMaterials[0].materialName;
                }
                else {
                    this.selectedMaterialID = '';
                    this.selectedMaterialCode = '';
                    this.selectedMaterialName = '';
                }

                // 5. Thiết lập thứ tự bản ghi bắt đầu kết thúc
                this.setStartAndEndRecordNumber();
            } catch (error) {
                // Hiển thị dialog cho lỗi xảy ra
                this.displayDialogForException(error, MISA_RESOURCES.DIALOG_TITLE.GET_DATA + this.OBJECT_NAME);
            } finally {
                // Ẩn loading
                this.isShowLoading = false;
            }
        },
        /**
         * Thiết lập số thứ tự bản ghi bắt đầu và kết thúc
         * Author: TrangDTT (12/04/2023)
         */
        setStartAndEndRecordNumber: function () {
            // Nếu không có bản ghi dữ liệu nào được trả về
            if (this.listOfMaterials.length == 0) {
                this.setStartRecordNumber(0);
                this.setEndRecordNumber(0);
            } else {
                this.setStartRecordNumber(Number(this.offset) + 1);
                this.setEndRecordNumber(Number(this.offset) + Number(this.listOfMaterials.length));
            }
        },
        /**
         * Xử lý sự kiện chọn nguyên vật liệu
         * @param {*} materialID ID nguyên vật liệu
         * @param {*} materialCode Mã nguyên vật liệu
         * @param {*} materialName Tên nguyên vật liệu
         * Author: TrangDTT (30/05/2023)
         */
        handleOnSelectMaterial: function (materialID, materialCode, materialName) {
            this.selectedMaterialID = materialID;
            this.selectedMaterialCode = materialCode;
            this.selectedMaterialName = materialName;
        },
        /**
         * Xử lý sự kiện chọn option phân trang
         * @param {*} option Lựa chọn phân trang
         * Author: TrangDTT (30/05/2023)
         */
        handleOnSelectOption: function (option) {
            this.numberOfRecords = option;
            this.closeListPagingOptions();
            this.offset = 0;
            this.currentPage = 1;
            this.getListOfMaterials();
        },
        /**
         * Xử lý sự kiện click button thêm
         * Author: TrangDTT (29/05/2023)
         */
        handleClickButtonAdd: function () {
            this.$emit("openMaterialInfoPopup", { popupType: MISA_ENUMS.POPUP_TYPE.ADD, data: '' });
        },
        /**
         * Xử lý sự kiện click button nhân bản
         * Author: TrangDTT (29/05/2023)
         */
        handleClickButtonReplication: function () {
            if (this.selectedMaterialID != '') this.$emit("openMaterialInfoPopup", { popupType: MISA_ENUMS.POPUP_TYPE.REPLICATION, data: this.selectedMaterialID });
        },
        /**
         * Xử lý sự kiện click button sửa
         * Author: TrangDTT (29/05/2023)
         */
        handleClickButtonEdit: function () {
            if (this.selectedMaterialID != '') this.$emit("openMaterialInfoPopup", { popupType: MISA_ENUMS.POPUP_TYPE.EDIT, data: this.selectedMaterialID });
        },
        /**
         * Xử lý sự kiện click button nạp
         * Author: TrangDTT (30/05/2023)
         */
        handleClickButtonLoad: function () {
            this.offset = 0;
            this.currentPage = 1;
            for (let key in this.filterInfo) {
                this.filterInfo[key] = '';
            }
            this.filterInfo.property = {
                key: MISA_ENUMS.PROPERTY.ALL,
                value: MISA_RESOURCES.PROPERTY.ALL
            }
            this.filterInfo.isStopUsing = {
                key: MISA_ENUMS.STOP_USING.NO,
                value: MISA_RESOURCES.STOP_USING.NO
            }
            this.getListOfMaterials();
        },
        /**
         * Xử lý sự kiện load data bảng
         * Author: TrangDTT (30/05/2023)
         */
        handleRequestLoadTable: function () {
            this.getListOfMaterials();
        },
        /**
         * Xử lý yêu cầu lọc dữ liệu
         * Author: TrangDTT (31/05/2023)
         */
        handleRequestFilterData: function () {
            this.offset = 0;
            this.currentPage = 1;
            this.getListOfMaterials();
        },
        /**
         * Xử lý sự kiện click button xóa
         * Author: TrangDTT (29/05/2023)
         */
        handleClickButtonDelete: function () {
            if (this.selectedMaterialID != '') {
                // Hiển thị hộp thoại xác nhận xóa
                this.confirmDialog.TITLE = MISA_RESOURCES.DIALOG_TITLE.DELETE + this.OBJECT_NAME;
                this.confirmDialog.DESCRIPTION = [MISA_RESOURCES.MESSAGE.MATERIAL.DELETE.CONFIRM + this.selectedMaterialCode + " - " + this.selectedMaterialName + " ?"];

                this.$refs.dialog.setDialogInfo(this.confirmDialog);
                this.openDialogNotify();
            }
        },
        /**
         * Xử lý sự kiện
         * @param {*} eventInfo Thông tin sự kiện cần xử lý
         * Author: TrangDTT (30/05/2023)
         */
        handleEvent: function (eventInfo) {
            let eventType = eventInfo.eventType;
            switch (eventType) {
                case MISA_ENUMS.EVENT_TYPE.DELETE:
                    this.deleteMaterial();
                    break;

                default:
                    break;
            }
        },
        /**
         * Xử lý sự kiện chọn option lọc/so sánh
         * @param {*} data Chứa tên trường và lựa chọn lọc/so sánh gửi kèm
         * Author: TrangDTT (31/05/2023)
         */
        handleSelectFilterOption: function (data) {
            this.filterRule[data.name] = data.option;
        },
        /**
         * Gọi API xóa nguyên vật liệu
         * Author: TrangDTT (30/05/2023)
         */
        deleteMaterial: async function () {
            try {
                // 1. Hiển thị loading
                this.isShowLoading = true;

                // 2. Gọi API xóa nguyên vật liệu
                await MATERIAL_SERVICE.deleteById(this.selectedMaterialID);

                // 3. Ẩn loading
                this.isShowLoading = false;

                // 4. Load lại dữ liệu
                await this.getListOfMaterials();

                // 5. Hiển thị toast message thành công
                this.successToast.DESCRIPTION = MISA_RESOURCES.MESSAGE.MATERIAL.DELETE.SUCCESS;
                this.$refs.toast.setToastMessageInfo(this.successToast);
                this.openToastMessage();
                setTimeout(() => {
                    this.closeToastMessage();
                }, MISA_RESOURCES.TOAST_TIME_OUT);
            } catch (error) {
                // Hiển thị dialog thông báo cho ngoại lệ
                this.displayDialogForException(error, MISA_RESOURCES.MESSAGE.MATERIAL.DELETE);
            } finally {
                // Ẩn loading
                this.isShowLoading = false;
            }
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
            } else {
                this.failedDialog.DESCRIPTION = [MISA_RESOURCES.MESSAGE.EXCEPTION];
            }

            this.$refs.dialog.setDialogInfo(this.failedDialog);

            // 2. Hiển thị dialog
            this.openDialogNotify();
        },
        /**
         * Xử lý sự kiện di chuyển tới trang đầu
         * Author: TrangDTT (30/05/2023)
         */
        moveToFirstPage: function () {
            if (this.canMoveToFirstPage) {
                this.offset = 0;
                this.currentPage = 1;
                this.getListOfMaterials();
            }
        },

        /**
         * Xử lý sự kiện di chuyển tới trang cuối
         * Author: TrangDTT (30/05/2023)
         */
        moveToLastPage: function () {
            if (this.canMoveToLastPage) {
                this.offset = (Number(this.numberPages) - 1) * Number(this.numberOfRecords);
                this.currentPage = Number(this.numberPages);
                this.getListOfMaterials();
            }
        },

        /**
         * Xử lý sự kiện quay lại trang dữ liệu trước
         * Author: TrangDTT (11/04/2023)
         */
        backToPreviousPage: function () {
            if (this.canBackToPreviousPage) {
                this.currentPage--;
                this.offset = Number(this.offset) - Number(this.numberOfRecords);
                this.getListOfMaterials();
            }
        },
        /**
         * Xử lý sự kiện di chuyển tới trang dữ liệu tiếp theo
         * Author: TrangDTT (11/04/2023)
         */
        moveToNextPage: function () {
            if (this.canMoveToNextPage) {
                this.currentPage++;
                this.offset = Number(this.offset) + Number(this.numberOfRecords);
                this.getListOfMaterials();
            }
        },
        /**
         * Thiết lập số thứ tự bản ghi bắt đầu lấy dữ liệu
         * @param {*} startRecordNumber Số thứ tự bản ghi bắt đầu lấy dữ liệu
         * Author: TrangDTT (11/04/2023)
         */
        setStartRecordNumber: function (startRecordNumber) {
            this.startRecordNumber = startRecordNumber;
        },
        /**
         * Thiết lập số thứ tự bản ghi kết thúc việc lấy dữ liệu
         * @param {*} startRecordNumber Số thứ tự bản ghi kết thúc việc lấy dữ liệu
         * Author: TrangDTT (11/04/2023)
         */
        setEndRecordNumber: function (endRecordNumber) {
            this.endRecordNumber = endRecordNumber;
        },
        /**
         * Xử lý sự kiện chọn số thứ tự trang
         * Author: TrangDTT (31/05/2023)
         */
        handleOnSelectPage: function () {
            if (this.currentPage > this.numberPages || this.currentPage < 1) {
                this.currentPage = 1;
                this.offset = 0;
            } else {
                this.offset = Number(this.numberOfRecords) * (Number(this.currentPage) - 1);
            }
            this.getListOfMaterials();
        },
        /**
         * Mở hộp thoại thông báo
         * Author: TrangDTT (29/05/2023)
         */
        openDialogNotify: function () {
            this.isShowDialog = true;
        },
        /**
         * Đóng hộp thoại thông báo
         * Author: TrangDTT (29/05/2023)
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
         * Hiển thị danh sách lựa chọn phân trang
         * Author: TrangDTT (30/05/2023)
         */
        openListPagingOptions: function () {
            this.isShowListPagingOptions = true;
        },
        /**
         * Đóng danh sách lựa chọn phân trang
         * Author: TrangDTT (30/05/2023)
         */
        closeListPagingOptions: function () {
            this.isShowListPagingOptions = false;
        },
        /**
         * Tải lại dữ liệu
         * Author: TrangDTT (02/06/2023)
         */
        reloadData: function () {
            this.offset = 0;
            this.currentPage = 1;
            this.getListOfMaterials();
        }
    },
    data() {
        return {
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
            // Danh sách nguyên vật liệu
            listOfMaterials: [],
            // Tổng số bản ghi
            totalRecords: 0,
            // Số bản ghi trên trang
            numberOfRecords: MISA_RESOURCES.LIST_OF_PAGING_OPTIONS[0],
            // Độ lệch
            offset: 0,
            // Trang hiện tại
            currentPage: 1,
            // Hiển thị danh sách lựa chọn
            isShowListPagingOptions: false,
            // Danh sách lựa chọn phân trang
            listOfPagingOptions: MISA_RESOURCES.LIST_OF_PAGING_OPTIONS,
            // Hộp thoại xác nhận xóa
            confirmDialog: MISA_RESOURCES.DIALOG.CONFIRM,
            // Hộp thoại thất bại
            failedDialog: MISA_RESOURCES.DIALOG.FAILED,
            // Toast message thành công
            successToast: MISA_RESOURCES.TOAST.SUCCESS,
            // Hiển thị hộp thoại thông báo
            isShowDialog: false,
            // Hiển thị loading
            isShowLoading: false,
            // Hiển thị toast message
            isShowToast: false,
            // Số thứ tự bản ghi bắt đầu
            startRecordNumber: 0,
            // Số thứ tự bản ghi kết thúc
            endRecordNumber: 0,
            // Luật lọc giá trị
            filterRule: {
                // Mã nguyên vật liệu
                materialCode: MISA_ENUMS.FILTER_OPTION.CONTAIN,
                // Tên nguyên vật liệu
                materialName: MISA_ENUMS.FILTER_OPTION.CONTAIN,
                // Tên đơn vị
                unitName: MISA_ENUMS.FILTER_OPTION.CONTAIN,
                // Tên nhóm nguyên vật liệu
                categoryName: MISA_ENUMS.FILTER_OPTION.CONTAIN,
                // Ghi chú
                note: MISA_ENUMS.FILTER_OPTION.CONTAIN,
            },
            // Đối tượng chứa thông tin lọc dữ liệu
            filterInfo: {
                // Mã nguyên vật liệu
                materialCode: '',
                // Tên nguyên vật liệu
                materialName: '',
                // Tính chất
                property: {
                    key: MISA_ENUMS.PROPERTY.ALL,
                    value: MISA_RESOURCES.PROPERTY.ALL
                },
                // Tên đơn vị
                unitName: '',
                // Tên nhóm nguyên vật liệu
                categoryName: '',
                // Ghi chú
                note: '',
                // Ngưng sử dụng
                isStopUsing: {
                    key: MISA_ENUMS.STOP_USING.NO,
                    value: MISA_RESOURCES.STOP_USING.NO
                },
            },
            // ID nguyên vật liệu được chọn
            selectedMaterialID: '',
            // Mã nguyên vật liệu được chọn
            selectedMaterialCode: '',
            // Tên nguyên vật liệu được chọn
            selectedMaterialName: ''
        }
    },
    watch: {
        // Quan sát sự thay đổi của giá trị lọc tương ứng với cột ngưng sử dụng
        'filterInfo.isStopUsing.key'() {
            this.getListOfMaterials();
        },
        // Quan sát sự thay đổi của giá trị lọc tương ứng với cột tính chất
        'filterInfo.property.key'() {
            this.getListOfMaterials();
        },
    },
    components: {
        TheFilterMenu
    },
    emits: ["openMaterialInfoPopup"]
}
</script>
<style scoped>@import "@/css/materials/material-list.css";</style>