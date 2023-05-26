<template>
  <TheHeader v-on:openOrCloseSidebar="openOrCloseSidebar"></TheHeader>
  <div class="body">
    <TheSidebar v-if="isShowSidebar"></TheSidebar>
    <TheMainContent>
    
    </TheMainContent>
  </div>
</template>

<script>
import TheHeader from './layouts/TheHeader.vue';
import TheMainContent from './layouts/TheMainContent.vue';
import TheSidebar from './layouts/TheSidebar.vue';

export default {
  name: "App",
  methods: {
    /**
     * Mở hoặc đóng sidebar
     * Author: TrangDTT (22/05/2023)
     */
    openOrCloseSidebar: function(){
      this.isShowSidebar = !this.isShowSidebar;
    }
  },
  data(){
    return {
      // Hiển thị sidebar
      isShowSidebar: true,
    }
  },
  components: { TheSidebar, TheHeader, TheMainContent }
}
</script>

<style>
@import '@/css/index.css';
</style>
