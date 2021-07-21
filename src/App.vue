<template>
  <div id="app">
    <router-view></router-view>
    <!-- <div class="mapdiv">
      <div class="mask" style="height: 100%; width: 100%">
        <div class="maincontent">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </div>
      </div>
      <div class="bj"></div>
    </div>
    <div class="head">
      <HeaderView />
    </div> -->
    <!-- <div class="content">
      <router-view></router-view>
    </div>
    <div class="bj"></div> -->
    <!-- <div
      ref="earthContainer"
      style="width: 100%; height: 100%; background: grey; position: relative"
    ></div> -->
  </div>
</template>

<script>
import earthGlobal from "@/global/earth/earthutils.js";
import Json from "../public/scene.json";
export default {
  name: "App",
  components: {},
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
body,
html {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
#app {
  width: 100%;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  font-family: "微软雅黑";
  list-style: none;
  #app .content {
    width: 100%;
    /* height: 100%; */
    position: absolute;
    left: 0;
    top: 0;
  }
  body {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  @media print {
    body {
      -webkit-print-color-adjust: exact;
      -moz-print-color-adjust: exact;
      -ms-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    button {
      display: none;
    }
  }
}
</style>