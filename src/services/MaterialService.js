import MISA_API_URLS from "@/resources/api";
import BaseService from "./base/BaseService";
import axios from "axios";
const URL = MISA_API_URLS.DEV_URL;
const TIMEOUT = MISA_API_URLS.TIMEOUT;

class MaterialService extends BaseService {
    constructor() {
        super();
        this.controller = "Materials";
    }

    /**
     * Lấy danh sách nguyên vật liệu
     * @param {*} numberOfRecords Số bản ghi trên trang
     * @param {*} offset Độ lệch
     * @param {*} materialCode Mã nguyên vật liệu
     * @param {*} materialName Tên nguyên vật liệu
     * @param {*} property Tính chất
     * @param {*} unitName Tên đơn vị
     * @param {*} categoryName Tên nhóm nguyên vật liệu
     * @param {*} note Ghi chú
     * @param {*} isStopUsing Ngưng sử dụng
     * @returns Response data
     * Author: TrangDTT (30/05/2023)
     */
    async getPagingForFilter(numberOfRecords, offset, materialCode, materialName, property, unitName, categoryName, note, isStopUsing) {
        let response = await axios.get(URL + this.controller + "?numberOfRecords=" + numberOfRecords + "&offset=" + offset + "&materialCode=" + materialCode + "&materialName=" + materialName + "&property=" + property
        + "&unitName=" + unitName + "&categoryName=" + categoryName + "&note=" + note + "&isStopUsing=" + isStopUsing, { timeout: TIMEOUT });
        return response.data;
    }

    /**
     * Lấy mã nguyên vật liệu mới
     * @param {*} startStr Chuỗi ký tự bắt đầu mã nguyên vật liệu
     * Author: TrangDTT (02/06/2023)
     */
    async getNewCode(startStr){
        let response = await axios.get(URL + this.controller + "/GetNewCode/" + startStr, { timeout: TIMEOUT });
        return response.data;
    }

    /**
     * Xuất danh sách nguyên vật liệu
     * @param {*} materialCode Mã nguyên vật liệu
     * @param {*} materialName Tên nguyên vật liệu
     * @param {*} property Tính chất
     * @param {*} unitName Tên đơn vị
     * @param {*} categoryName Tên nhóm nguyên vật liệu
     * @param {*} note Ghi chú
     * @param {*} isStopUsing Ngưng sử dụng
     * @returns Response data
     * Author: TrangDTT (08/06/2023)
     */
    async exportExcel(materialCode, materialName, property, unitName, categoryName, note, isStopUsing){
        let response = await axios.get(URL + this.controller + "/ExportExcel?materialCode=" + materialCode + "&materialName=" + materialName + "&property=" + property
        + "&unitName=" + unitName + "&categoryName=" + categoryName + "&note=" + note + "&isStopUsing=" + isStopUsing, { responseType: 'blob', timeout: TIMEOUT });
        return response.data;
    }
}
const MATERIAL_SERVICE = new MaterialService();
export default MATERIAL_SERVICE;