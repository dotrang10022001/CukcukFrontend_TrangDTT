<template>
    <div class="header">
        <div class="header__left">
            <div class="header__icon">
                <span v-on:click="openOrCloseSidebar"><i class="fa-solid fa-bars"></i></span>
            </div>
            <div class="header__title">CUKCUK</div>
        </div>
        <div class="header__middle">
            <div class="restaurant">
                <MISADropdown ref="txtRestaurant" v-model="restaurant.value" v-model:selectedKey="restaurant.key"></MISADropdown>
            </div>
            <div class="language">
                <MISADropdown ref="txtLanguage" v-model="language.value" v-model:selectedKey="language.key"></MISADropdown>
            </div>
        </div>
        <div class="header__right">
            <div class="language"></div>
            <div class="operation">
                <MISAIconTooltip :iconClass="ICON_CLASS.NOTIFICATION" :tooltipText="TOOLTIP_TEXT.NOTIFICATION" class="operation--notification"></MISAIconTooltip>
                <MISAIconTooltip :iconClass="ICON_CLASS.WEBSITE" :tooltipText="TOOLTIP_TEXT.WEBSITE"></MISAIconTooltip>
            </div>
            <div class="user">
                <img src="@/assets/imgs/profile-image.png" class="profile__image" />
                <div class="profile__name">Nguyễn Thị Lan</div>
                <span class="profile__choice"><i class="fa-solid fa-caret-down"></i></span>
            </div>
        </div>
    </div>
</template>
<script>
import MISA_RESOURCES from '@/resources/resource.js';
export default {
    name: "TheHeader",
    mounted(){
        this.$refs.txtRestaurant.setListOfOptions(MISA_RESOURCES.LIST_OF_RESTAURANT);
        this.$refs.txtLanguage.setListOfOptions(MISA_RESOURCES.LIST_OF_LANGUAGE);
    },
    methods: {
        /**
         * Yêu cầu mở hoặc đóng sidebar
         * Author: TrangDTT (22/05/2023)
         */
        openOrCloseSidebar: function () {
            this.$emit("openOrCloseSidebar");
        }
    },
    data(){
        return {
            // Resources
            MISA_RESOURCES: MISA_RESOURCES,
            // Nhà hàng
            restaurant: {
                key: MISA_RESOURCES.LIST_OF_RESTAURANT[0].key,
                value: MISA_RESOURCES.LIST_OF_RESTAURANT[0].value
            },
            // Ngôn ngữ
            language: {
                key: MISA_RESOURCES.LIST_OF_LANGUAGE[0].key,
                value: MISA_RESOURCES.LIST_OF_LANGUAGE[0].value
            },
            // Icon class
            ICON_CLASS: MISA_RESOURCES.ICON_CLASS,
            // Tooltip text
            TOOLTIP_TEXT: MISA_RESOURCES.TOOLTIP_TEXT
        }
    },
    emits: ["openOrCloseSidebar"]
}
</script>
<style scoped>
@import "@/css/layouts/header.css";
</style>