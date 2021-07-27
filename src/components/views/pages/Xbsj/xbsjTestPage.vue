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
      <li @click="curItemClick('dantihua')">
        测试单体化+编辑
        <div v-if="isDantihua">
          <Dantihua />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Manyou from "./manyou/Manyou.vue";
import VideoConnect from "./sprh/VideoConnect.vue";
import Mapvjiqun from "./mapv-jiqun/Mapvjiqun.vue";
import HeatMap from "./heatmap/HeatMap.vue";
import Vision from "./vision/vision.vue";
import Surface from "./surface/Surface.vue";
import Dantihua from "./dantihua/Dantihua.vue";
export default {
  name: "xbsjtestcom",
  components: {
    Manyou,
    VideoConnect,
    Mapvjiqun,
    HeatMap,
    Vision,
    Surface,
    Dantihua,
  },
  data() {
    return {
      isManyou: false, // 漫游
      isVideoConnect: false, // 视频融合
      isJq: false, //mapv 集群
      isheatmap: false, // 热力图
      isVision: false, // 视域
      isSurface: false, // 展示地下模式和地表不透明
      isDantihua: false, // 展示单体化
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
          this.isDantihua = false;
          break;
        case "sprh":
          this.isVideoConnect = true;
          this.isManyou = false;
          this.isJq = false;
          this.isheatmap = false;
          this.isVision = false;
          this.isSurface = false;
          this.isDantihua = false;
          break;
        case "mapjq":
          this.isJq = true;
          this.isVideoConnect = false;
          this.isManyou = false;
          this.isheatmap = false;
          this.isVision = false;
          this.isSurface = false;
          this.isDantihua = false;
          break;
        case "mapvrlt":
          this.isVideoConnect = false;
          this.isManyou = false;
          this.isJq = false;
          this.isheatmap = true;
          this.isVision = false;
          this.isSurface = false;
          this.isDantihua = false;
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
          this.isDantihua = false;
          break;
        case "dantihua":
          this.isVision = false;
          this.isVideoConnect = false;
          this.isManyou = false;
          this.isJq = false;
          this.isheatmap = false;
          this.isSurface = false;
          this.isDantihua = true;
          var curEarth = this.$parent._earth;
          //本质是创建的多边形
          var classificationpolygon = new XE.Obj.ClassificationPolygon(
            curEarth
          );
          // 相机所处位置
          curEarth.camera.position = [
            1.9016991633909208,
            0.5971695799282292,
            756.7010439120457,
          ];
          // 多边形的旋转角
          curEarth.camera.rotation = [
            0.027900493226680645,
            -0.6716444402205366,
            0.00011144258520534578,
          ];
          // 多边形的所处位置
          classificationpolygon.positions = [
            1.901696187121785,
            0.5972449008742788,
            1.9017061471418992,
            0.5972447321375927,
            1.9017067914212735,
            0.5972580482997942,
            1.9016939145423322,
            0.5972563596224854,
          ];
          // 多边形的高度
          classificationpolygon.height = 511.3415929293872;
          window.classificationpolygon = classificationpolygon;
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
