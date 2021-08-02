<template>
  <div id="app">
    <div class="mapdiv">
      <div class="mask" style="height: 100%; width: 100%">
        <div class="maincontent">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </div>
      </div>
      <div class="bj"></div>
    </div>
    <div class="headclass" id="headid">
      <HeaderView />
    </div>
    <div
      ref="earthContainer"
      style="width: 100%; height: 100%; background: grey; position: relative"
    ></div>
  </div>
</template>

<script>
import earthGlobal from "@/global/earth/earthutils.js";
import Json from "../../../public/scene.json";
import XTDJSON from "../../../public/xtdJson.json";
import HeaderView from "../../components/appCom/HeaderContent";
export default {
  name: "App",
  components: { HeaderView },
  data() {
    return {};
  },
  methods: {},
  mounted() {
    var earth = new XE.Earth(this.$refs.earthContainer);
    earthGlobal.earthcesium.earth = earth;
    earthGlobal.earthmaptool.setearth(earthGlobal.earthcesium);
    this._earth = earth;
    this._earth.xbsjFromJSON(Json); // 展示当前影像json
    //this._earth.xbsjFromJSON(XTDJSON); // 测试模型的平移旋转

    window.earth = earth;
    //  / earth.camera.flyTo([2.0273210056641258, 0.6957050387098255, 1000]);
  },
  beforeDestroy() {
    window.earth.removeAll();
  },
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
  // pointer-events: none;
  .mapdiv {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: url(../../assets/imageBS/backBackground.png) no-repeat center !important;
    pointer-events: none;
    z-index: 10;
    .mask {
      //border: 1px solid red;
      padding: 0 25px;
      box-sizing: border-box;
      .maincontent {
        position: absolute;
        left: 50px;
        top: 114px;
        //border: 1px solid red;
        width: calc(100% - 100px);
        height: calc(100% - 120px);
      }
    }
  }
  .bj {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
  }
}
.cesium-widget {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
.cesium-widget,
.cesium-widget canvas {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
#app .content {
  width: 100%;
  /* height: 100%; */
  position: absolute;
  left: 0;
  top: 0;
}
.headclass {
  width: 100%;
  height: 90px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 20;
  padding: 10px 25px;
  margin: 0 auto;
  box-sizing: border-box;
  pointer-events: auto;
  .imgClose {
    position: absolute;
    right: 10px;
    top: 15px;
    cursor: pointer;
  }
}
</style>