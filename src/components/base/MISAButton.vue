<template>
    <button class="button">
        <span class="button__icon" v-if="type == MISA_ENUMS.BUTTON_TYPE.ICON_TEXT"><i :class="iconClass" :style="{'color': iconColor}"></i></span>
        {{ text }}
        <MISATooltip v-if="tooltipText != ''" :text="tooltipText"></MISATooltip>
    </button>
</template>
<script>
import MISA_ENUMS from '@/resources/enum';
import MISA_RESOURCES from '@/resources/resource';
export default{
    name: "MISAButton",
    props: {
        // Loại nút
        type: {
            type: Number,
            default: MISA_ENUMS.BUTTON_TYPE.TEXT
        },
        // Nội dung văn bản của nút
        text: {
            type: String,
            default: ""
        },
        // Class icon dành cho nút có chứa icon
        iconClass: {
            type: String,
            default: ""
        },
        // Màu của icon
        iconColor: {
            type: String,
            default: MISA_RESOURCES.ICON_BUTTON_COLOR.PRIMARY
        },
        // Tooltip text
        tooltipText: {
            type: String,
            default: ""
        }
    },
    data(){
        return {
            // Enums
            MISA_ENUMS: MISA_ENUMS,
            // Resources
            MISA_RESOURCES: MISA_RESOURCES
        }
    }
}
</script>
<style scoped>
@import "@/css/base/button.css";
</style>