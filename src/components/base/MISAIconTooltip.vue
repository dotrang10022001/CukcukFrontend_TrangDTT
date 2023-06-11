<template>
    <span class="icon-and-tooltip">
        <div class="icon"><i :class="iconClass"></i></div>
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