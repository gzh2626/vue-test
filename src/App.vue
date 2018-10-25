<template>
  <div id="app">
    <keep-alive>
        <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {
  }
};
</script>

<style lang="scss">
    @import "./assets/scss/public.scss";
</style>
