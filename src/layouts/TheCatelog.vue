<template>
    <div class="catelog-container">
        <div class="catelog">
            <div class="catelog__left">
                <div class="catelog__item" v-for="(item, index) in listOfLeftCatelogs" :key="index">
                    <div class="catelog__header">
                        <div class="header__icon"><i :class="item.icon"></i></div>
                        <div class="header__title">{{ item.title }}</div>
                    </div>
                    <ul class="catelog__body">
                        <li class="body__item" v-for="(child, index) in item.listOfChildItems" :key="index">
                            <div>{{ child.text }}</div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="catelog__right">
                <div class="catelog__item" v-for="(item, index) in listOfRightCatelogs" :key="index">
                    <div class="catelog__header">
                        <div class="header__icon"><i :class="item.icon"></i></div>
                        <div class="header__title">{{ item.title }}</div>
                    </div>
                    <ul class="catelog__body">
                        <li class="body__item" v-for="(child, index) in item.listOfChildItems" :key="index">
                            <div>{{ child.text }}</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "TheCatelog",
    data() {
        return {
            // Danh sách các mục bên trái
            listOfLeftCatelogs: [
                {
                    title: "THỰC ĐƠN",
                    icon: "fa-solid fa-utensils",
                    listOfChildItems: [
                        {
                            text: "Thực đơn",
                            link: ""
                        },
                        {
                            text: "Nhóm thực đơn",
                            link: ""
                        },
                        {
                            text: "Sở thích phục vụ",
                            link: ""
                        }, {
                            text: "Nhóm sở thích phục vụ",
                            link: ""
                        },
                        {
                            text: "Dịch vụ tính tiền theo thời gian",
                            link: ""
                        },
                        {
                            text: "Thuế suất",
                            link: ""
                        }]
                },
                {
                    title: "KH, NCC, NHÂN VIÊN",
                    icon: "fa-solid fa-user-group",
                    listOfChildItems: [
                        {
                            text: "Nhân viên",
                            link: ""
                        },
                        {
                            text: "Khách hàng",
                            link: ""
                        },
                        {
                            text: "Nhóm khách hàng",
                            link: ""
                        },
                        {
                            text: "Nhà cung cấp",
                            link: ""
                        },
                        {
                            text: "Nhóm nhà cung cấp",
                            link: ""
                        },
                        {
                            text: "Đối tác giao hàng/Kênh giao hàng",
                            link: ""
                        }
                    ]
                }
            ],
            // Danh sách các mục bên phải
            listOfRightCatelogs: [
                {
                    title: "NGUYÊN VẬT LIỆU",
                    icon: "fa-solid fa-cart-shopping",
                    listOfChildItems: [
                        {
                            text: "Nguyên vật liệu",
                            link: ""
                        },
                        {
                            text: "Nhóm nguyên vật liệu",
                            link: ""
                        },
                        {
                            text: "Kho",
                            link: ""
                        },
                        {
                            text: "Đơn vị tính",
                            link: ""
                        },
                    ]
                },
                {
                    title: "KHÁC",
                    icon: "fa-solid fa-puzzle-piece",
                    listOfChildItems: [
                        {
                            text: "Ca làm việc",
                            link: ""
                        },
                        {
                            text: "Khung giờ phục vụ",
                            link: ""
                        },
                        {
                            text: "Két đựng tiền",
                            link: ""
                        },
                        {
                            text: "Bếp/Bar",
                            link: "",
                        },
                        {
                            text: "Khu vực chế biến",
                            link: ""
                        },
                        {
                            text: "Lý do hủy món",
                            link: ""
                        },
                        {
                            text: "Lý do hủy order",
                            link: ""
                        },
                        {
                            text: "Mục thu/chi",
                            link: ""
                        },
                        {
                            text: "Thẻ ngân hàng/ví điện tử",
                            link: ""
                        },
                        {
                            text: "Tài khoản NH/ví điện tử",
                            link: ""
                        }
                    ]
                }
            ]
        }
    }
}
</script>
<style scoped>
@import "@/css/layouts/catelog.css";
</style>