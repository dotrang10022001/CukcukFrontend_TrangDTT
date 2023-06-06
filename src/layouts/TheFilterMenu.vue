<template>
    <div class="filter-menu" v-click-outside="closeListOfOptions">
        <span v-on:click="displayListOfOptions" class="filter-menu__content">{{
            selectedKey }}</span>
        <div class="filter-menu__option" v-if="isShowListOptions">
            <div class="option__content">
                <ul class="option__data">
                    <li class="option__item" v-for="(item, idx) in listOfOptions" :key="idx"
                        v-on:click="handleOnSelectOption(item)">
                        <div class="option__mark"
                            :class="{ 'option__mark--visible': (item.key == selectedKey) }">
                        </div>{{ item.value }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import MISA_RESOURCES from '@/resources/resource.js';
export default {
    name: "TheFilterMenu",
    methods: {
        /**
         * Hiển thị danh sách lựa chọn
         * Author: TrangDTT (01/05/2023)
         */
        displayListOfOptions: function () {
            this.isShowListOptions = true;
        },
        /**
         * Ẩn danh sách lựa chọn
         */
        closeListOfOptions: function () {
            this.isShowListOptions = false;
        },
        /**
         * Xử lý sự kiện chọn option lọc
         * @param {*} option Lựa chọn lọc
         * Author: TrangDTT (31/05/2023)
         */
        handleOnSelectOption: function (option) {
            this.selectedKey = option.key;
            this.closeListOfOptions();
            this.$emit("handleSelectFilterOption", { name: this.name, option: option.key });
        },
    },
    data() {
        return {
            // Danh sách lựa chọn
            listOfOptions: MISA_RESOURCES.LIST_OF_FILTER_OPTIONS,
            // Hiển thị danh sách lựa chọn
            isShowListOptions: false,
            // Khóa đang được lựa chọn
            selectedKey: MISA_RESOURCES.LIST_OF_FILTER_OPTIONS[0].key,
        }
    },
    props: ["name"]
}
</script>
<style scoped>@import '@/css/layouts/filter-menu.css';</style>