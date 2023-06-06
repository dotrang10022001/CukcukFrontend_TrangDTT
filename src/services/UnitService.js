import BaseService from "./base/BaseService";

class UnitService extends BaseService {
    constructor() {
        super();
        this.controller = "Units";
    }
}
const UNIT_SERVICE = new UnitService();
export default UNIT_SERVICE;