<template>
  <div id="header">
    <div class="logo">
      <img src="../assets/logo.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"  scoped>
#header{
  height: 80px;
  background: rgb(84, 92, 100);
  .logo{
    height:100%;
    width:200px;
    img{
      display: inline-block;
      height:100%;
      width:100%;
    }
  }
}
</style>
