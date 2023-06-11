const MISA_ENUMS = {
    // Loại popup
    POPUP_TYPE: {
        // Thêm mới
        ADD: 0,
        // Sửa
        EDIT: 1,
        // Nhân bản
        REPLICATION: 2
    },
    // Loại nút
    BUTTON_TYPE: {
        // Nút chỉ chứa văn bản
        TEXT: 0,
        // Nút chứa cả icon và văn bản
        ICON_TEXT: 1
    },
    // Loại combobox
    COMBOBOX_TYPE: {
        // Combobox hiển thị dropdown bên trên
        TOP: 0,
        // Combobox hiển thị dropdown bên dưới
        BOTTOM: 1
    },
    // Loại sự kiện
    EVENT_TYPE: {
        // Đóng hộp thoại/popup
        CLOSE: 0,
        // Xóa
        DELETE: 1,
        // Xóa nhiều
        DELETE_MULTIPLE: 2,
        // Lưu và đóng popup
        SAVE_AND_CLOSE_POPUP: 3,
        // Không lưu và đóng popup
        NOT_SAVE_AND_CLOSE_POPUP: 4,
        // Đóng và reset popup
        CLOSE_AND_RESET_POPUP: 5,
        // Đóng và tải lại
        CLOSE_AND_RELOAD: 6,
        // Tải lại danh sách đơn vị
        RELOAD_UNIT: 7,
        // Tải lại danh sách kho
        RELOAD_STORE: 8,
        // Tải lại danh sách nhóm nguyên vật liệu
        RELOAD_CATEGORY: 9
    },
    // Độ dài tối đa của input number
    NUMBER_MAX_LENGTH: 18,
    // Mã lỗi
    ERROR_CODE: {
        // Dữ liệu không hợp lệ
        INVALID_DATA: 1
    },
    // Tính chất nguyên vật liệu
    PROPERTY: {
        // Tất cả
        ALL: -1,
        // Nguyên vật liệu
        MATERIAL: 0,
        // Đồ uống đóng chai
        BOTTLED_DRINK: 1,
        // Mặt hàng khác
        OTHER_ITEM: 2,
        // Bán thành phẩm
        SEMI_FINISHED_PRODUCT: 3
    },
    // Ngưng sử dụng
    STOP_USING: {
        YES: 0,
        NO: 1
    },
    // Tùy chọn lọc
    FILTER_OPTION: {
        // Chứa
        CONTAIN: '*',
        // Bắt đầu bằng
        START: '+',
        // Kết thúc bằng
        END: '-',
        // Bằng
        EQUAL: '='
    },
    // Đơn vị thời hạn
    EXPIRE_UNIT: {
        // Ngày
        DAY: 0,
        // Tháng
        MONTH: 1,
        // Năm
        YEAR: 2
    },
    // Phép toán
    CALCULATOR: {
        // Phép nhân
        MULTIPLY: 0,
        // Phép chia
        DIVIDE: 1
    }
}
export default MISA_ENUMS;