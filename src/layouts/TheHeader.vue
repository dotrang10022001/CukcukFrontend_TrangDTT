<template>
    <div class="header">
        <div class="header__left">
            <div class="header__icon">
                <span v-on:click="openOrCloseSidebar"><i class="fa-solid fa-bars"></i></span>
            </div>
            <div class="header__title">CUKCUK</div>
        </div>
        <div class="header__middle">
            <div class="restaurant"></div>
        </div>
        <div class="header__right">
            <div class="language"></div>
            <div class="operation">
                <span><i class="fa-solid fa-bullhorn"></i></span>
                <span><i class="fa-solid fa-earth-americas"></i></span>
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
export default {
    name: "TheHeader",
    methods: {
        /**
         * Yêu cầu mở hoặc đóng sidebar
         * Author: TrangDTT (22/05/2023)
         */
        openOrCloseSidebar: function () {
            this.$emit("openOrCloseSidebar");
        }
    },
    emits: ["openOrCloseSidebar"]
}
</script>
<style scoped>
@import "@/css/layouts/header.css";
</style>