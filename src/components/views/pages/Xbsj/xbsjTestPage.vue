<template>
  <div class="contentxbsjTest">
    <ul class="mainContant">
      <li @click="curItemClick('manyou')">
        场景漫游(Y)
        <div v-if="isManyou">
          <Manyou />
        </div>
      </li>
      <li @click="curItemClick('sprh')">
        视频融合(Y)
        <div v-if="isVideoConnect">
          <VideoConnect />
        </div>
      </li>
      <li @click="curItemClick('mapjq')">
        mapv-集群(Y)
        <div v-if="isJq">
          <Mapvjiqun />
        </div>
      </li>
      <li @click="curItemClick('mapvrlt')">
        热力图(Y)
        <div v-if="isheatmap">
          <HeatMap />
        </div>
      </li>
      <li @click="curItemClick('sy')">
        视域(Y)
        <div v-if="isVision">
          <Vision />
        </div>
      </li>
      <li @click="curItemClick('surface')">
        地下模式和地表透明(Y)
        <div v-if="isSurface">
          <Surface />
        </div>
      </li>
      <li @click="curItemClick('dantihua')">
        测试单体化+编辑(Gs)
        <div v-if="isDantihua">
          <Dantihua />
        </div>
      </li>
      <li @click="curItemClick('model')" id="model">
        <span style="dispaly: inline-block; margin-right: 20px">模型</span>
        <span v-if="isShowModel">
          <el-radio v-model="radio" label="wzxz" @change="modelTypeChange"
            >平移旋转</el-radio
          >
          <el-radio v-model="radio" label="wzpp" @change="modelTypeChange"
            >位置匹配</el-radio
          >
        </span>
        <div v-if="isTranslateRotatecom">
          <TranslateRotation />
        </div>
        <div v-if="isPositionMatchcom">
          <PositionMatch />
        </div>
      </li>
      <li @click="curItemClick('lujinghuanqiufeixing')">
        路径-环球飞行(GS)
        <div v-if="isAllWorld">
          <PathAllAround />
        </div>
      </li>
      <li @click="curItemClick('lujingcurrentD')">
        路径-currentD(GS)
        <div v-if="isCurrentD">
          <PathCurrentD />
        </div>
      </li>
      <li @click="curItemClick('lujingDireaction')">
        路径-方向(GS)
        <div v-if="isPathDirection">
          <PathDireaction />
        </div>
      </li>
      <li @click="curItemClick('lujingEdit')">
        路径-编辑(GS)
        <span style="position: absolute; right: 0; top: 0" v-show="isShowTime"
          >剩余加载时间{{ time }}s</span
        >
        <div v-if="isPathEdit">
          <PathEdit />
        </div>
      </li>
      <li @click="curItemClick('lujingYingyantu')">
        路径-鹰眼图(GS)
        <div v-if="isPathYingyantu">
          <PathYingyan />
        </div>
      </li>
      <li @click="curItemClick('lujingShiyufenxi')">
        路径-视域分析(Y)
        <div v-if="isPathShiyufenxi">
          <PathShiyuFenxi />
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
import TranslateRotation from "./model/TranslateRotation.vue";
import PositionMatch from "./model/PositionMatch.vue";
import PathAllAround from "./pathoptions/huanqiufx";
import PathCurrentD from "./pathoptions/PathCurrentD";
import PathDireaction from "./pathoptions/PathDeraction";
import PathEdit from "./pathoptions/PathEdit";
import PathYingyan from "./pathoptions/PathYingyanimage";
import PathShiyuFenxi from "./pathoptions/PathShiyufenxi";
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
    TranslateRotation,
    PositionMatch,
    PathAllAround,
    PathCurrentD,
    PathDireaction,
    PathEdit,
    PathYingyan,
    PathShiyuFenxi,
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
      isShowModel: false, // 展示模型
      isTranslateRotatecom: false, //
      isPositionMatchcom: false,
      isAllWorld: false, // 路径环球飞行
      isCurrentD: false, // 展示当前运动
      isPathDirection: false, // 展示路径方向
      isPathEdit: false, // 展示路径编辑
      isPathYingyantu: false, // 展示路径鹰眼图
      isShowTime: false,
      isPathShiyufenxi: false,
      radio: "wzxz", // 默认展示平移旋转功能
      time: 10,
    };
  },
  methods: {
    wzxzInit() {
      var curEarth = window.earth;
      this.isTranslateRotatecom = true;
      this.isPositionMatchcom = false;
      // 位置旋转
      var model1 = curEarth.sceneTree.$refs.model1.czmObject;
      console.log(model1);
      // 设置相机位置
      curEarth.camera.position = [2.0273210056641258, 0.6957050387098255, 1000];
      curEarth.camera.flyTo(curEarth.camera.position); // 飞入当前模型
    },
    wzpp() {
      // 位置匹配
      this.isTranslateRotatecom = false;
      this.isPositionMatchcom = true;
    },
    // 改变模型选项卡
    modelTypeChange(val) {
      if (val == "wzxz") {
        this.wzxzInit();
      } else if (val == "wzpp") {
        // 位置匹配
        this.wzpp();
      }
    },
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
          this.isShowModel = false;
          this.isAllWorld = false; // 路径环球飞行
          this.isCurrentD = false;
          this.isPathDirection = false;
          this.isPathEdit = false;
          this.isPathYingyantu = false;
          this.isShowTime = false;
          break;
        case "sprh":
          this.isVideoConnect = true;
          this.isManyou = false;
          this.isJq = false;
          this.isheatmap = false;
          this.isVision = false;
          this.isSurface = false;
          this.isDantihua = false;
          this.isShowModel = false;
          this.isAllWorld = false; // 路径环球飞行
          this.isCurrentD = false;
          this.isPathDirection = false;
          this.isPathEdit = false;
          this.isPathYingyantu = false;
          this.isShowTime = false;
          break;
        case "mapjq":
          this.isJq = true;
          this.isVideoConnect = false;
          this.isManyou = false;
          this.isheatmap = false;
          this.isVision = false;
          this.isSurface = false;
          this.isDantihua = false;
          this.isShowModel = false;
          this.isAllWorld = false; // 路径环球飞行
          this.isCurrentD = false;
          this.isPathDirection = false;
          this.isPathEdit = false;
          this.isPathYingyantu = false;
          this.isShowTime = false;
          break;
        case "mapvrlt":
          this.isVideoConnect = false;
          this.isManyou = false;
          this.isJq = false;
          this.isheatmap = true;
          this.isVision = false;
          this.isSurface = false;
          this.isDantihua = false;
          this.isShowModel = false;
          this.isAllWorld = false; // 路径环球飞行
          this.isCurrentD = false;
          this.isPathDirection = false;
          this.isPathEdit = false;
          this.isShowTime = false;
          break;
        case "sy":
          this.isVision = true;
          this.isVideoConnect = false;
          this.isManyou = false;
          this.isJq = false;
          this.isheatmap = false;
          this.isSurface = false;
          this.isShowModel = false;
          this.isAllWorld = false; // 路径环球飞行
          this.isCurrentD = false;
          this.isPathDirection = false;
          this.isPathEdit = false;
          this.isPathYingyantu = false;
          this.isShowTime = false;
          break;
        case "surface":
          this.isVision = false;
          this.isVideoConnect = false;
          this.isManyou = false;
          this.isJq = false;
          this.isheatmap = false;
          this.isSurface = true;
          this.isDantihua = false;
          this.isShowModel = false;
          this.isAllWorld = false; // 路径环球飞行
          this.isCurrentD = false;
          this.isPathDirection = false;
          this.isPathEdit = false;
          this.isShowTime = false;
          break;
        case "dantihua":
          this.isVision = false;
          this.isVideoConnect = false;
          this.isManyou = false;
          this.isJq = false;
          this.isheatmap = false;
          this.isSurface = false;
          this.isDantihua = true;
          this.isShowModel = false;
          this.isAllWorld = false; // 路径环球飞行
          this.isCurrentD = false;
          this.isPathDirection = false;
          this.isPathEdit = false;
          this.isPathYingyantu = false;
          this.isShowTime = false;
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
        case "model":
          this.isVision = false;
          this.isVideoConnect = false;
          this.isManyou = false;
          this.isJq = false;
          this.isheatmap = false;
          this.isSurface = false;
          this.isDantihua = false;
          this.isShowModel = true;
          this.isAllWorld = false; // 路径环球飞行
          this.isCurrentD = false;
          this.isPathDirection = false;
          this.isPathEdit = false;
          this.isShowTime = false;
          this.wzxzInit(); // 初始化展示位置旋转
          break;
        case "lujinghuanqiufeixing":
          this.isVision = false;
          this.isVideoConnect = false;
          this.isManyou = false;
          this.isJq = false;
          this.isheatmap = false;
          this.isSurface = false;
          this.isDantihua = false;
          this.isShowModel = false;
          this.isCurrentD = false;
          this.isAllWorld = true; // 路径环球飞行
          this.isPathDirection = false;
          this.isPathEdit = false;
          this.isPathYingyantu = false;
          this.isShowTime = false;
          break;
        case "lujingcurrentD":
          this.isShowTime = false;
          this.isVision = false;
          this.isVideoConnect = false;
          this.isManyou = false;
          this.isJq = false;
          this.isheatmap = false;
          this.isSurface = false;
          this.isDantihua = false;
          this.isShowModel = false;
          this.isAllWorld = false; // 路径环球飞行
          this.isCurrentD = true;
          this.isPathDirection = false;
          this.isPathEdit = false;
          break;
        case "lujingDireaction":
          // 路径方向
          this.isVision = false;
          this.isVideoConnect = false;
          this.isManyou = false;
          this.isJq = false;
          this.isheatmap = false;
          this.isSurface = false;
          this.isDantihua = false;
          this.isShowModel = false;
          this.isAllWorld = false; // 路径环球飞行
          this.isCurrentD = false;
          this.isPathDirection = true;
          this.isPathEdit = false;
          this.isPathYingyantu = false;
          this.isShowTime = false;
          break;
        case "lujingEdit":
          this.isShowTime = true;
          this.isVision = false;
          this.isVideoConnect = false;
          this.isManyou = false;
          this.isJq = false;
          this.isheatmap = false;
          this.isSurface = false;
          this.isDantihua = false;
          this.isShowModel = false;
          this.isAllWorld = false; // 路径环球飞行
          this.isCurrentD = false;
          this.isPathDirection = false;
          let that = this;
          let setinter = setInterval(function () {
            that.time--;
          }, 1000);
          // 10秒之后获取地图资源
          setTimeout(function () {
            that.isPathEdit = true;
            clearInterval(setinter);
            that.time = 0;
          }, 10000);
          break;
        case "lujingYingyantu":
          this.isShowTime = false;
          this.isPathYingyantu = true;
          this.isVision = false;
          this.isVideoConnect = false;
          this.isManyou = false;
          this.isJq = false;
          this.isheatmap = false;
          this.isSurface = false;
          this.isDantihua = false;
          this.isShowModel = false;
          this.isAllWorld = false; // 路径环球飞行
          this.isCurrentD = false;
          this.isPathDirection = false;
          break;
        case "lujingShiyufenxi":
          this.isPathShiyufenxi = true;
          // window.earth.camera.flyTo([
          //   2.0314139084786236,
          //   0.6965029141612101,
          //   1000.65,
          // ]);
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
    #model:hover {
      color: #fff;
      border: 1px solid red;
      background-color: rgba(1, 1, 1, 0.1);
    }
  }
}
</style>
