<template>
    <div class="tooltip">{{ text }}</div>
</template>
<script>
export default {
    name: "MISATooltip",
    props: ["text"]
}
</script>
<style scoped> 
@import '@/css/base/tooltip.css';
</style>