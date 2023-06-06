import MISA_ENUMS from "./enum";
const MISA_RESOURCES = {
    // Text cho tooltip
    TOOLTIP_TEXT: {
        CLOSE: "Đóng",
        NOTIFICATION: "Thông báo",
        WEBSITE: "Website",
        UNIT: "Đơn vị tính",
        MINI_QUANTITY: "Số lượng tồn kho tối thiểu",
        CATEGORY: "Nhóm nguyên vật liệu",
        LOAD: "Tải lại dữ liệu",
        LAST_PAGE: "Trang cuối",
        FIRST_PAGE: "Trang đầu",
        PREVIOUS_PAGE: "Trang trước",
        NEXT_PAGE: "Trang tiếp",
        ADD: "Ctrl + A",
        EDIT: "Ctrl + E",
        REPLICATION: "Ctrl + R",
        RELOAD: "Ctrl + L",
        DELETE: "Ctrl + D"
    },
    // Thông tin toast thông báo
    TOAST: {
        // Thành công
        SUCCESS: {
            TYPE_VALUE: "success",
            ICON: "fa-solid fa-circle-check",
            TYPE_TEXT: "Thành công!",
            DESCRIPTION: "Thêm mới nguyên vật liệu thành công"
        },
    },
    // Thông tin hộp thoại
    DIALOG: {
        // Thất bại
        FAILED: {
            TITLE: "",
            TYPE: "error",
            ICON: "fa-solid fa-circle-xmark",
            DESCRIPTION: [],
            TXT_BTN_PRIMARY: "Đồng ý",
            EVENT_FOR_PRIMARY: MISA_ENUMS.EVENT_TYPE.CLOSE,
        },
        // Cảnh báo
        WARNING: {
            TITLE: "",
            TYPE: "warning",
            ICON: "fa-solid fa-triangle-exclamation",
            DESCRIPTION: [],
            TXT_BTN_PRIMARY: "Đồng ý",
            EVENT_FOR_PRIMARY: MISA_ENUMS.EVENT_TYPE.CLOSE,
        },
        // Xác nhận
        CONFIRM: {
            TITLE: "",
            TYPE: "info",
            ICON: "fa-solid fa-circle-question",
            DESCRIPTION: [],
            TXT_BTN_PRIMARY: "Có",
            TXT_BTN_SECONDARY: "Không",
            IS_SHOW_SECONDARY: true,
            EVENT_FOR_SECONDARY: MISA_ENUMS.EVENT_TYPE.CLOSE,
            EVENT_FOR_PRIMARY: MISA_ENUMS.EVENT_TYPE.DELETE,
        },
        // Xác nhận đóng popup
        CONFIRM_CLOSE_POPUP: {
            TITLE: "",
            TYPE: "info",
            ICON: "fa-solid fa-circle-question",
            DESCRIPTION: [],
            TXT_BTN_PRIMARY: "Có",
            TXT_BTN_SECONDARY: "Không",
            TXT_BTN_THIRD: "Hủy",
            IS_SHOW_SECONDARY: true,
            IS_SHOW_THIRD: true,
            EVENT_FOR_PRIMARY: MISA_ENUMS.EVENT_TYPE.SAVE_AND_CLOSE_POPUP,
            EVENT_FOR_SECONDARY: MISA_ENUMS.EVENT_TYPE.NOT_SAVE_AND_CLOSE_POPUP,
            EVENT_FOR_THIRD: MISA_ENUMS.EVENT_TYPE.CLOSE
        }
    },
    // Màu cho icon trong nút
    ICON_BUTTON_COLOR: {
        // Màu chính
        PRIMARY: "#0072BC",
        // Màu cho nút cảnh báo thao tác
        DANGEROUS: "#E04742"
    },
    // Lớp icon
    ICON_CLASS: {
        // Phản hồi
        FEEDBACK: 'fa-solid fa-bullhorn',
        // Thêm 
        ADD: 'fa-solid fa-file-circle-plus',
        // Nhân bản
        REPLICATION: 'fa-solid fa-copy',
        // Sửa
        EDIT: 'fa-solid fa-file-pen',
        // Xóa
        DELETE: 'fa-solid fa-xmark',
        // Nạp
        LOAD: 'fa-solid fa-arrow-rotate-right',
        // Đóng
        CLOSE: 'fa-solid fa-xmark',
        // Lỗi
        ERROR: 'fa-solid fa-circle-exclamation',
        // Cất
        SAVE: 'fa-solid fa-floppy-disk',
        // Cất và thêm
        SAVE_AND_ADD: 'fa-solid fa-file-circle-plus',
        // Hủy bỏ
        CANCEL: 'fa-solid fa-ban',
        // Giúp
        HELP: 'fa-solid fa-circle-question',
        // Thông báo
        NOTIFICATION: 'fa-solid fa-bullhorn',
        // Website
        WEBSITE: 'fa-solid fa-earth-americas',
        // Trang trước
        PREVIOUS_PAGE: 'fa-solid fa-angle-left',
        // Trang tiếp
        NEXT_PAGE: 'fa-solid fa-angle-right',
        // Trang đầu
        FIRST_PAGE: 'fa-solid fa-angles-left',
        // Trang cuối
        LAST_PAGE: 'fa-solid fa-angles-right'
    },
    // Thông tin lỗi xác thực chung
    VALIDATION_ERROR: {
        // Trống
        EMPTY: " không được bỏ trống",
        // Không đúng định dạng
        INCORRECT_FORMAT: " không đúng định dạng",
        // Không hợp lệ
        INVALID: " không hợp lệ",
        // Không có trong danh sách
        NOT_EXIST: " không có tên trong danh sách",
        // Yêu cầu nhập tên nguyên vật liệu trước
        REQUEST_NAME: "Vui lòng nhập tên trước khi nhập mã",
        // Bị trùng lặp
        DUPLICATE: " không được trùng lặp",
        // Không được trùng đơn vị chính
        NOT_REPEAT_MAIN_UNIT: " không được trùng đơn vị chính",
        // Không được bỏ trống tên
        NOT_EMPTY_NAME: " không được bỏ trống tên",
        // Tỷ lệ chuyển đổi phải lớn hơn 0
        CONVERSION_RATE: "Tỷ lệ chuyển đổi phải lớn hơn 0"
    },
    // Tên các giá trị khóa trong chuỗi json thể hiện luật validation
    VALIDATION_RULE: {
        // Bắt buộc
        REQUIRED: "isRequired",
        // Mã nguyên vật liệu
        MATERIAL_CODE: "isMaterialCode",
        // Tên nguyên vật liệu
        MATERIAL_NAME: "isMaterialName",
        // Mã kho
        STORE_CODE: "isStoreCode",
        // Mã nhóm nguyên vật liệu
        CATEGORY_CODE: "isCategoryCode"
    },
    // Tiêu đề popup
    POPUP_TITLE: {
        ADD: "Thêm mới ",
        EDIT: "Sửa thông tin ",
        REPLICATION: "Nhân bản "
    },
    // Tên đối tượng
    OBJECT_NAME: {
        MATERIAL: "nguyên vật liệu",
        UNIT: "đơn vị",
        STORE: "kho",
        CATEGORY: "nhóm nguyên vật liệu",
        CONVERSION: "Đơn vị chuyển đổi"
    },
    // Tiêu đề dialog
    DIALOG_TITLE: {
        EXCEPTION: "Ngoại lệ xảy ra",
        VALIDATE: "Dữ liệu không hợp lệ",
        DELETE: "Xóa ",
        GET_DATA: "Lấy danh sách ",
        EDIT: "Sửa thông tin ",
        ADD: "Thêm mới ",
        REPLICATION: "Nhân bản "
    },
    // Thông báo
    MESSAGE: {
        // Thông báo ngoại lệ
        EXCEPTION: "Có lỗi xảy ra khi cố gắng kết nối tới server. Vui lòng thử lại sau",
        // Thông báo khi đóng popup
        CLOSE_POPUP: "Dữ liệu đã thay đổi. Bạn có muốn cất không",
        // Nguyên vật liệu
        MATERIAL: {
            // Xóa
            DELETE: {
                CONFIRM: "Bạn có chắc chắn muốn xóa nguyên vật liệu ",
                SUCCESS: "Xóa nguyên vật liệu thành công!"
            },
            // Thêm
            ADD: {
                SUCCESS: "Thêm mới nguyên vật liệu thành công"
            },
            // Sửa
            EDIT: {
                SUCCESS: "Sửa thông tin nguyên vật liệu thành công"
            },
            // Nhân bản
            REPLICATION: {
                SUCCESS: "Nhân bản nguyên vật liệu thành công"
            }
        },
        // Đơn vị
        UNIT: {
            // Thêm
            ADD: {
                SUCCESS: "Thêm mới đơn vị thành công"
            }
        },
        // Kho
        STORE: {
            // Thêm
            ADD: {
                SUCCESS: "Thêm mới kho thành công"
            }
        },
        // Nhóm nguyên vật liệu
        CATEGORY: {
            // Thêm
            ADD: {
                SUCCESS: "Thêm mới nhóm nguyên vật liệu thành công"
            }
        }
    },
    // Danh sách lựa chọn phân trang
    LIST_OF_PAGING_OPTIONS: [25, 50, 100],
    // Tên tính chất
    PROPERTY: {
        ALL: "Tất cả",
        MATERIAL: "Nguyên vật liệu",
        OTHER_ITEM: "Mặt hàng khác",
        SEMI_FINISHED_PRODUCT: "Bán thành phẩm",
        BOTTLED_DRINK: "Đồ uống đóng chai"
    },
    // Đơn vị thời hạn
    EXPIRE_UNIT: {
        DAY: "Ngày",
        MONTH: "Tháng",
        YEAR: "Năm"
    },
    // Tùy chọn ngưng sử dụng
    STOP_USING: {
        YES: "Có",
        NO: "Không"
    },
    // Phép tính
    CALCULATOR: {
        MULTIPLY: "Phép nhân",
        DIVIDE: "Phép chia"
    },
    // Trống
    UUID_EMPTY: '00000000-0000-0000-0000-000000000000',
    // Danh sách nhà hàng
    LIST_OF_RESTAURANT: [
        { key: 0, value: "Misathai" },
        { key: 1, value: "Chi nhánh Hà Nội"},
        { key: 2, value: "Kho tổng"},
        { key: 3, value: "Chi nhánh Đà Nẵng"}
    ],
    // Danh sách ngôn ngữ
    LIST_OF_LANGUAGE: [
        { key: 0, value: "Tiếng Việt"},
        { key: 1, value: "Tiếng Thái" },
        { key: 2, value: "Tiếng Anh"}
    ],
    // Danh sách tính chất dùng cho dropdown lọc dữ liệu
    LIST_OF_FILTER_PROPERTIES: [
        // Tất cả
        { key: MISA_ENUMS.PROPERTY.ALL, value: "Tất cả" },
        // Nguyên vật liệu
        { key: MISA_ENUMS.PROPERTY.MATERIAL, value: "Nguyên vật liệu" },
        // Đồ uống đóng chai
        { key: MISA_ENUMS.PROPERTY.BOTTLED_DRINK, value: "Đồ uống đóng chai" },
        // Bán thành phẩm
        { key: MISA_ENUMS.PROPERTY.SEMI_FINISHED_PRODUCT, value: "Bán thành phẩm" },
        // Mặt hàng khác
        { key: MISA_ENUMS.PROPERTY.OTHER_ITEM, value: "Mặt hàng khác" }
    ],
    // Danh sách các trạng thái ngưng sử dụng dùng cho dropdown lọc
    LIST_OF_FILTER_STOP_USING: [
        { key: MISA_ENUMS.STOP_USING.YES, value: "Có" },
        { key: MISA_ENUMS.STOP_USING.NO, value: "Không" }
    ],
    // Danh sách các tùy chọn lọc
    LIST_OF_FILTER_OPTIONS: [
        { key: MISA_ENUMS.FILTER_OPTION.CONTAIN, value: "* : Chứa" },
        { key: MISA_ENUMS.FILTER_OPTION.START, value: "+ : Bắt đầu bằng" },
        { key: MISA_ENUMS.FILTER_OPTION.END, value: "- : Kết thúc bằng" },
        { key: MISA_ENUMS.FILTER_OPTION.EQUAL, value: "= : Bằng" }
    ],
    // Danh sách các tính chất nguyên vật liệu dùng cho dropdown trong popup thêm/sửa/nhân bản
    LIST_OF_PROPERTIES: [
        // Nguyên vật liệu
        { key: MISA_ENUMS.PROPERTY.MATERIAL, value: "Nguyên vật liệu" },
        // Đồ uống đóng chai
        { key: MISA_ENUMS.PROPERTY.BOTTLED_DRINK, value: "Đồ uống đóng chai" },
        // Bán thành phẩm
        { key: MISA_ENUMS.PROPERTY.SEMI_FINISHED_PRODUCT, value: "Bán thành phẩm" },
        // Mặt hàng khác
        { key: MISA_ENUMS.PROPERTY.OTHER_ITEM, value: "Mặt hàng khác" }
    ],
    // Danh sách các phép toán dùng cho dropdown trong popup thêm/sửa/nhân bản
    LIST_OF_CALCULATORS: [
        { key: MISA_ENUMS.CALCULATOR.MULTIPLY, value: "Phép nhân" },
        { key: MISA_ENUMS.CALCULATOR.DIVIDE, value: "Phép chia" }
    ],
    // Danh sách các đơn vị thời hạn dùng cho dropdown trong popup thêm/sửa/nhân bản
    LIST_OF_EXPIRE_UNITS: [
        { key: MISA_ENUMS.EXPIRE_UNIT.DAY, value: "Ngày" },
        { key: MISA_ENUMS.EXPIRE_UNIT.MONTH, value: "Tháng" },
        { key: MISA_ENUMS.EXPIRE_UNIT.YEAR, value: "Năm" }
    ],
    // Timeout cho toast message
    TOAST_TIME_OUT: 1000,
}
export default MISA_RESOURCES;