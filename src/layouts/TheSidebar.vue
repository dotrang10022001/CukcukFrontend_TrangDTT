<template>
    <div class="sidebar">
        <ul class="menu">
            <li class="menu__item">
                <span class="menu__icon"><i class="fa-solid fa-palette"></i></span>
                <span>Tổng quan</span>
            </li>
            <li class="menu__item" v-on:click="showOrHideReportChilds">
                <span class="menu__icon"><i class="fa-solid fa-chart-pie"></i></span>
                <span>Báo cáo</span>
                <span class="menu__arrow"><i :class="{'fa-solid fa-angle-up': isShowReportChilds, 'fa-solid fa-angle-down': !isShowReportChilds}"></i></span>
            </li>
            <li class="menu__item menu__item--child" v-show="isShowReportChilds">
                <span class="menu__icon"></span>
                <span>Mua hàng</span>
            </li>
            <li class="menu__item menu__item--child" v-show="isShowReportChilds">
                <span class="menu__icon"></span>
                <span>Bán hàng</span>
            </li>
            <li class="menu__item menu__item--child" v-show="isShowReportChilds">
                <span class="menu__icon"></span>
                <span>Kho</span>
            </li>
            <li class="menu__item menu__item--child" v-show="isShowReportChilds">
                <span class="menu__icon"></span>
                <span>Công nợ</span>
            </li>
            <li class="menu__item menu__item--child" v-show="isShowReportChilds">
                <span class="menu__icon"></span>
                <span>Quỹ tiền</span>
            </li>
            <li class="menu__item menu__item--child" v-show="isShowReportChilds">
                <span class="menu__icon"></span>
                <span>Lợi nhuận</span>
            </li>
            <li class="menu__item">
                <span class="menu__icon"><i class="fa-solid fa-cart-plus"></i></span>
                <span>Mua hàng</span>
            </li>
            <li class="menu__item">
                <span class="menu__icon"><i class="fa-solid fa-shop"></i></span>
                <span>Kho</span>
            </li>
            <li class="menu__item">
                <span class="menu__icon"><i class="fa-solid fa-dollar-sign"></i></span>
                <span>Quỹ tiền mặt</span>
            </li>
            <li class="menu__item">
                <span class="menu__icon">
                    <i class="fa-solid fa-hand-holding-dollar"></i>
                </span>
                <span>Quỹ tiền gửi</span>
            </li>
            <li class="menu__item">
                <span class="menu__icon"><i class="fa-solid fa-sack-dollar"></i></span>
                <span>Chi phí</span>
            </li>
            <li class="menu__item">
                <span class="menu__icon"><i class="fa-solid fa-gift"></i></span>
                <span>Khuyến mại</span>
            </li>
            <li class="menu__item">
                <span class="menu__icon"><i class="fa-solid fa-file-lines"></i></span>
                <span>Thực đơn</span>
            </li>
            <li class="menu__item" v-on:click="showOrHideCatelog">
                <span class="menu__icon"><i class="fa-solid fa-bars"></i></span>
                <span>Danh mục</span>
            </li>
            <li class="menu__item">
                <span class="menu__icon"><i class="fa-solid fa-file-circle-xmark"></i></span>
                <span>Hủy hóa đơn</span>
            </li>
            <li class="menu__item">
                <span class="menu__icon"><i class="fa-solid fa-gear"></i></span>
                <span>Thiết lập hệ thống</span>
            </li>
            <li class="menu__item">
                <span class="menu__icon"><i class="fa-brands fa-windows"></i></span>
                <span>Ứng dụng</span>
            </li>
            <li class="menu__item" v-on:click="showOrHideOnlineChilds">
                <span class="menu__icon"><i class="fa-solid fa-globe"></i></span>
                <span>Bán hàng online</span>
                <span class="menu__arrow"><i :class="{'fa-solid fa-angle-up': isShowOnlineChilds, 'fa-solid fa-angle-down': !isShowOnlineChilds}"></i></span>
            </li>
            <li class="menu__item menu__item--child" v-show="isShowOnlineChilds">
                <span class="menu__icon"></span>
                <span>Website bán hàng</span>
            </li>
            <li class="menu__item menu__item--child" v-show="isShowOnlineChilds">
                <span class="menu__icon"></span>
                <span>Gọi món tại bàn</span>
            </li>
            <li class="menu__item">
                <span class="menu__icon"><i class="fa-solid fa-heart-pulse"></i></span>
                <span>MISA Lomas</span>
            </li>
            <li class="menu__item" v-on:click="showOrHideHelperChilds">
                <span class="menu__icon"><i class="fa-solid fa-circle-question"></i></span>
                <span>Trợ giúp</span>
                <span class="menu__arrow"><i :class="{'fa-solid fa-angle-up': isShowHelperChilds, 'fa-solid fa-angle-down': !isShowHelperChilds}"></i></span>
            </li>
            <li class="menu__item menu__item--child" v-show="isShowHelperChilds">
                <span class="menu__icon"></span>
                <span>Nội dung trợ giúp</span>
            </li>
            <li class="menu__item menu__item--child" v-show="isShowHelperChilds">
                <span class="menu__icon"></span>
                <span>Thỏa thuận sử dụng dịch vụ</span>
            </li>
            <li class="menu__item menu__item--child" v-show="isShowHelperChilds">
                <span class="menu__icon"></span>
                <span>Thông tin sản phẩm</span>
            </li>
            <li class="menu__item">
                <span class="menu__icon"><i class="fa-solid fa-user-group"></i></span>
                <span>Thuê bao</span>
            </li>
        </ul>
    </div>
    <TheCatelog v-if="isShowCatelog" v-click-outside="handleClickOutsideCatelog"></TheCatelog>
</template>
<script>
import TheCatelog from '@/layouts/TheCatelog.vue';
export default {
    name: "TheSidebar",
    methods: {
        /**
         * Ẩn hoặc hiển thị tùy chọn báo cáo
         * Author: TrangDTT (24/05/2023)
         */
        showOrHideReportChilds: function(){
            this.isShowReportChilds = !this.isShowReportChilds;
        },
        /**
         * Ẩn hoặc hiển thị tùy chọn trợ giúp
         * Author: TrangDTT (24/05/2023)
         */
        showOrHideHelperChilds: function(){
            this.isShowHelperChilds = !this.isShowHelperChilds;
        },
        /**
         * Ẩn hoặc hiển thị tùy chọn bán hàng online
         * Author: TrangDTT (24/05/2023)
         */
        showOrHideOnlineChilds: function(){
            this.isShowOnlineChilds = !this.isShowOnlineChilds;
        },
        /**
         * Ẩn hoặc hiển thị danh mục
         * Author: TrangDTT (24/05/2023)
         */
        showOrHideCatelog: function(){
            this.isShowCatelog = !this.isShowCatelog;
        },
        /**
         * Xử lý sự kiện click ra ngoài catelog
         * Author: TrangDTT (03/06/2023)
         */
        handleClickOutsideCatelog: function(){
            this.isShowCatelog = false;
        }
    },
    data(){
        return {
            // Hiển thị tủy chọn báo cáo
            isShowReportChilds: false,
            // Hiển thị tùy chọn bán hàng online
            isShowOnlineChilds: false,
            // Hiển thị tùy chọn trợ giúp
            isShowHelperChilds: false,
            // Hiển thị danh mục
            isShowCatelog: false
        }
    },
    components: {
        TheCatelog
    }
};
</script>
<style>
@import '@/css/layouts/sidebar.css';
</style>
  
  
  