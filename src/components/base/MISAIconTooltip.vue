<template>
    <span class="icon-and-tooltip">
        <span><i :class="iconClass"></i></span>
        <MISATooltip :text="tooltipText"></MISATooltip>
    </span>
</template>
<script>
export default {
    name: "MISAIconTooltip",
    props: ["iconClass", "tooltipText"],
}
</script>
<style scoped>
@import '@/css/base/icon-tooltip.css';
</style>