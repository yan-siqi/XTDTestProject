<template>
  <div id="errBlank">
    <div class="content">404</div>
    <div class="contentBottom">抱歉,该页面不存在!</div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
#errBlank {
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  .content {
    width: 400px !important;
    line-height: 400px;
    font-size: 80px;
    height: 400px;
    margin: 100px auto !important;
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
  }
  .contentBottom {
    width: 400px !important;
    height: 50px !important;
    line-height: 50px;
    margin: 510px auto !important;
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
  }
}
</style>