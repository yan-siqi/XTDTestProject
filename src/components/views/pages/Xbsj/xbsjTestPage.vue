<template>
  <div class="contentxbsjTest">
    <ul class="mainContant">
      <li @click="curItemClick('manyou')">
        场景漫游
        <div v-if="isManyou">
          <Manyou />
        </div>
      </li>
      <li @click="curItemClick('sprh')">
        视频融合
        <div v-if="isVideoConnect">
          <VideoConnect />
        </div>
      </li>
      <li @click="curItemClick('mapjq')">
        mapv-集群
        <div v-if="isJq">
          <Mapvjiqun />
        </div>
      </li>
      <li @click="curItemClick('mapvrlt')">
        热力图
        <div v-if="isheatmap">
          <HeatMap />
        </div>
      </li>
      <li @click="curItemClick('sy')">
        视域
        <div v-if="isVision">
          <Vision />
        </div>
      </li>
      <li @click="curItemClick('surface')">
        地下模式和地表透明
        <div v-if="isSurface">
          <Surface />
        </div>
      </li>
      <li></li>
    </ul>
  </div>
</template>

<script>
import Manyou from "./manyou/Manyou.vue";
import VideoConnect from "./sprh/VideoConnect.vue";
import Mapvjiqun from "./mapv-jiqun/Mapvjiqun.vue";
import HeatMap from "./heatmap/HeatMap.vue";
import Vision from "./vision/vision.vue";
import Surface from "./surface/Surface.vue"
export default {
  name: "xbsjtestcom",
  components: {
    Manyou,
    VideoConnect,
    Mapvjiqun,
    HeatMap,
    Vision,
    Surface
  },
  data() {
    return {
      isManyou: false, // 漫游
      isVideoConnect: false, // 视频融合
      isJq: false, //mapv 集群
      isheatmap: false, // 热力图
      isVision: false, // 视域
      isSurface: false, // 展示地下模式和地表不透明
    };
  },
  methods: {
    curItemClick(type) {
      switch (type) {
        case "manyou":
          this.isManyou = true;
          this.isVideoConnect = false;
          this.isJq = false;
          this.isheatmap = false;
          this.isVision = false;
          this.isSurface = false;
          break;
        case "sprh":
          this.isVideoConnect = true;
          this.isManyou = false;
          this.isJq = false;
          this.isheatmap = false;
          this.isVision = false;
          this.isSurface = false;
          break;
        case "mapjq":
          this.isJq = true;
          this.isVideoConnect = false;
          this.isManyou = false;
          this.isheatmap = false;
          this.isVision = false;
          this.isSurface = false;
          break;
        case "mapvrlt":
          this.isVideoConnect = false;
          this.isManyou = false;
          this.isJq = false;
          this.isheatmap = true;
          this.isVision = false;
          this.isSurface = false;
          break;
        case "sy":
          this.isVision = true;
          this.isVideoConnect = false;
          this.isManyou = false;
          this.isJq = false;
          this.isheatmap = false;
          this.isSurface = false;
          break;
        case "surface":
          this.isVision = false;
          this.isVideoConnect = false;
          this.isManyou = false;
          this.isJq = false;
          this.isheatmap = false;
          this.isSurface = true;
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.contentxbsjTest {
  position: relative;
  pointer-events: auto;
  .mainContant {
    list-style: none;
    width: 300px;
    position: absolute;
    left: 10px;
    top: 10px;
    height: 500px;
    // background-color: #555;
    background-image: url("../../../../assets/imageBS/leftbottom.png");
    background-size: 100% 100%;
    color: #fff;
    font-family: "微软雅黑";
    padding: 20px;
    li {
      text-align: left;
      height: 30px;
      border: 1px solid #fff;
      box-sizing: border-box;
      cursor: pointer;
      position: relative;
      line-height: 30px;
    }
    li:hover {
      color: #1aade6;
      border: 1px solid yellow;
      background: red;
    }
  }
}
</style>
