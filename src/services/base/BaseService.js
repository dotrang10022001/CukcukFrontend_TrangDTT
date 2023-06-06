import axios from "axios";
import MISA_API_URLS from "@/resources/api";
const URL = MISA_API_URLS.DEV_URL;
const TIMEOUT = MISA_API_URLS.TIMEOUT;

export default class BaseService{
    // Tên controller truyền vào
    controller;
    
    constructor(){
        
    }

    /**
     * Gọi API lấy danh sách bản ghi
     * @returns Response data
     * Author: TrangDTT (06/04/2023)
     */
    async getAll(){
        let response = await axios.get(URL + this.controller, { timeout: TIMEOUT });
        return response.data;
    }

    /**
     * Gọi API lấy dữ liệu theo id
     * @param {*} id id của đối tượng cần lấy dữ liệu
     * @returns Response data
     * Author: TrangDTT (06/04/2023)
     */
    async getById(id){
        let response = await axios.get(URL + this.controller + "/" + id, {timeout: TIMEOUT});
        return response.data;
    }

    /**
     * Gọi API xóa dữ liệu
     * @param {*} id id của đối tượng cần xóa
     * @returns Response data
     * Author: TrangDTT (06/04/2023)
     */
    async deleteById(id){
        let response = await axios.delete(URL + this.controller + "/" + id, {timeout: TIMEOUT});
        return response.data;
    }

    /**
     * Gọi API thêm mới dữ liệu
     * @param {*} obj Thông tin đối tượng thêm mới
     * @returns Response data
     * Author: TrangDTT (06/04/2023)
     */
    async post(obj){
        let response = await axios.post(URL + this.controller, obj, {timeout: TIMEOUT});
        return response.data;
    }

    /**
     * Gọi API sửa đổi dữ liệu
     * @param {*} obj thông tin đối tượng cần sửa
     * @returns Response data
     * Author: TrangDTT (06/04/2023)
     */
    async put(obj){
        let response = await axios.put(URL + this.controller, obj, {timeout: TIMEOUT});
        return response.data;
    }

}