import MISA_ENUMS from "./enum";
const MISA_HELPERS = {
    /**
     * Kiểm tra một xâu có phải là xâu rỗng hay không
     * @param {*} str Xâu cần kiểm tra
     * Author: TrangDTT (30/04/2023)
     */
    CHECK_EMPTY: function (str) {
        if (!str) return true;
        return false;
    },
    /**
     * Kiểm tra định dạng mã nguyên vật liệu: Bắt đầu bằng chuỗi ký tự tạo bởi các chữ cái
     * đầu in hoa của các từ trong tên và kết thúc bằng chuỗi số
     * @param {*} materialCode Mã nguyên vật liệu
     * @param {*} materialName Tên nguyên vật liệu
     * Author: TrangDTT (03/06/2023)
     */
    CHECK_MATERIAL_CODE: function (materialCode, materialName) {
        let startStr = this.GET_FIRST_LETTER_STRING(materialName);
        if (!materialCode.startsWith(startStr) || !this.CHECK_NUMBER(materialCode.substr(startStr.length))) return false;
        return true;
    },
    /**
     * Lấy chuỗi ký tự tạo bởi các chữ cái đầu in hoa của các từ trong chuỗi 
     * @param {*} str Xâu chứa các từ
     * Author: TrangDTT (03/06/2023)
     */
    GET_FIRST_LETTER_STRING: function (str) {
        let result = "";
        let words = str.split(" ");
        words.forEach(word => {
            result += word[0].toString().toUpperCase();
        });
        return result;
    },
    /**
     * Kiểm tra định dạng mã kho
     * @param {} storeCode Mã kho
     * Author: TrangDTT (26/05/2023)
     */
    CHECK_STORE_CODE: function (storeCode) {
        if (!storeCode.startsWith("S-") || !this.CHECK_NUMBER(storeCode.substr(2))) return false;
        return true;
    },
    /**
     * Kiểm tra định dạng mã nhóm nguyên vật liệu
     * @param {} categoryCode Mã nhóm nguyên vật liệu
     * Author: TrangDTT (26/05/2023)
     */
    CHECK_CATEGORY_CODE: function (categoryCode) {
        if (!categoryCode.startsWith("C-") || !this.CHECK_NUMBER(categoryCode.substr(2))) return false;
        return true;
    },
    /**
     * Kiểm tra một xâu xem có phải là 1 xâu số hay không
     * @param {*} str Xâu cần kiểm tra
     * Trả về kết quả kiểm tra
     * Author: TrangDTT (17/04/2023)
     */
    CHECK_NUMBER: function (str) {
        if (!str) return false;
        for (let i = 0; i < str.length; i++) {
            if (str[i] > '9' || str[i] < '0') return false;
        }
        return true;
    },
    /**
     * Biến đổi giá trị lọc truyền cho api
     * @param {*} filterType Loại lọc: chứa, bắt đầu bằng, kết thúc bằng, bằng
     * @param {*} filterValue Gía trị lọc
     * @returns Xâu đã biến đổi
     * Author: TrangDTT (31/05/2023)
     */
    GET_FILTER_STRING: function (filterType, filterValue) {
        switch (filterType) {
            // Chứa
            case MISA_ENUMS.FILTER_OPTION.CONTAIN:
                if (filterValue) return '%25' + filterValue + '%25';
                return '%25';
            // Bằng
            case MISA_ENUMS.FILTER_OPTION.EQUAL:
                return filterValue;
            // Bắt đầu bằng
            case MISA_ENUMS.FILTER_OPTION.START:
                return filterValue + '%25';
            // Kết thúc bằng
            case MISA_ENUMS.FILTER_OPTION.END:
                return '%25' + filterValue;

            default:
                break;
        }
    },
}
export default MISA_HELPERS;