import MISA_API_URLS from "@/resources/api";
import BaseService from "./base/BaseService";
import axios from "axios";
const URL = MISA_API_URLS.DEV_URL;
const TIMEOUT = MISA_API_URLS.TIMEOUT;

class StoreService extends BaseService {
    constructor() {
        super();
        this.controller = "Stores";
    }

    /**
     * Lấy mã kho mới
     * Author: TrangDTT (02/06/2023)
     */
    async getNewCode(){
        let response = await axios.get(URL + this.controller + "/GetNewCode", { timeout: TIMEOUT });
        return response.data;
    }
}
const STORE_SERVICE = new StoreService();
export default STORE_SERVICE;