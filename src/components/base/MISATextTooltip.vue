<template>
    <span class="text-and-tooltip">
        <span>{{ text }}</span>
        <MISATooltip v-if="tooltipText != ''" :text="tooltipText"></MISATooltip>
    </span>
</template>
<script>
export default {
    name: "MISTextTooltip",
    props: ["text", "tooltipText"],
}
</script>
<style scoped>
@import '@/css/base/text-tooltip.css';
</style>