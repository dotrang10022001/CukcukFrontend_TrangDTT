<template>
    <div class="material">
        <div class="material__header">
            <div class="left">
                <div class="title">
                    Danh mục
                </div>
                <span class="icon"><i class="fa-solid fa-caret-right"></i></span>
                <div class="subtitle">
                    Nguyên vật liệu
                </div>
            </div>
            <div class="right">
                <MISAButton class="button--setting" text="Quay lại thiết lập ban đầu" :type="MISA_ENUMS.BUTTON_TYPE.TEXT"></MISAButton>
                <MISAButton class="button--feedback" text="Phản hồi" :type="MISA_ENUMS.BUTTON_TYPE.ICON_TEXT" :iconClass="MISA_RESOURCES.ICON_CLASS.FEEDBACK"></MISAButton>
            </div>
        </div>
        <div class="material__content">
            <MaterialList ref="materialList" v-on:openMaterialInfoPopup="openMaterialInfoPopup"></MaterialList>
        </div>
        <MaterialDetail v-if="showMaterialInfoPopup" :popupType="popupInfo.popupType" :data="popupInfo.data" v-on:closeMaterialInfoPopup="closeMaterialInfoPopup" v-on:requestReloadData="handleRequestReloadData"></MaterialDetail>
    </div>
</template>
<script>
import MISA_ENUMS from '@/resources/enum';
import MISA_RESOURCES from '@/resources/resource';
import MaterialList from '@/components/materials/MaterialList.vue';
import MaterialDetail from '@/components/materials/MaterialDetail.vue';
export default {
    name: "MaterialView",
    methods: {
        /**
         * Mở popup thông tin nguyên vật liệu
         * @param {*} data Dữ liệu gửi kèm (bao gồm loại popup và id nguyên vật liệu(nếu có))
         * Author: TrangDTT (29/05/2023)
         */
        openMaterialInfoPopup: function(data){
            this.showMaterialInfoPopup = true;
            this.popupInfo.popupType = data.popupType;
            this.popupInfo.data = data.data;
        },
        /**
         * Đóng popup thông tin nguyên vật liệu
         * Author: TrangDTT (29/05/2023)
         */
        closeMaterialInfoPopup: function(){
            this.showMaterialInfoPopup = false;
        },
        /**
         * Xử lý yêu cầu tải lại dữ liệu
         * Author: TrangDTT (02/06/2023)
         */
        handleRequestReloadData: function(){
            this.$refs.materialList.reloadData();
        }
    },
    data(){
        return {
            // Enums
            MISA_ENUMS: MISA_ENUMS,
            // Resources
            MISA_RESOURCES: MISA_RESOURCES,
            // Hiển thị popup thông tin nguyên vật liệu
            showMaterialInfoPopup: false,
            // Thông tin popup
            popupInfo: {
                popupType: MISA_ENUMS.POPUP_TYPE.ADD,
                data: ""
            }
        }
    },
    components: {
        MaterialList,
        MaterialDetail
    }
}
</script>
<style scoped>
@import url('@/css/views/material-view.css');
</style>