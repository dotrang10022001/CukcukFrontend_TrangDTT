import MISA_API_URLS from "@/resources/api";
import BaseService from "./base/BaseService";
import axios from "axios";
const URL = MISA_API_URLS.DEV_URL;
const TIMEOUT = MISA_API_URLS.TIMEOUT;

class CategoryService extends BaseService {
    constructor() {
        super();
        this.controller = "Categories";
    }

    /**
     * Lấy mã nhóm nguyên vật liệu mới
     * Author: TrangDTT (02/06/2023)
     */
    async getNewCode(){
        let response = await axios.get(URL + this.controller + "/GetNewCode", { timeout: TIMEOUT });
        return response.data;
    }
}
const CATEGORY_SERVICE = new CategoryService();
export default CATEGORY_SERVICE;