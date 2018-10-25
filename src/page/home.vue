<template>
    <div id="home">
        <myHeader></myHeader>
        <myNav></myNav>
        <div class="home-view">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import myHeader from "@/components/myHeader";
import myNav from "@/components/myNav";
export default {
  data() {
    return {};
  },
  components: {
    myHeader,
    myNav
  }
};
</script>

<style lang="scss">
#home {
  height: 100%;
  width: 100%;
  min-width: 960px;
  position: relative;
  .home-view {
    position: absolute;
    width: 100%;
    left: 0;
    top:80px;
    padding: 20px 20px 20px 220px;
  }
}
</style>

