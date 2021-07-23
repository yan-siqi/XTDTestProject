<template>
  <div class="syContent">
    <div style="width: 100%; height: 100%">
      <div ref="earthContainer" style="width: 100%; height: 100%"></div>
      <div
        class="box"
        style="position: absolute; left: 18px; top: 18px; color: white; background: rgba(0, 0, 0, 0.6); padding: 20px; border-radius: 25px;min-width:350px; font-size:24px; font-family: 宋体;"
      >
        <div class="defultbtn" @click="setPositionWithCurrentCamera">
          设置为当前相机姿态
        </div>
        <div
          class="defultbtn"
          :class="{ btnon: twoPostionsEditing }"
          @click="twoPostionsEditing = !twoPostionsEditing"
        >
          拾取
        </div>
        <div
          class="defultbtn"
          :class="{ btnon: positionEditing }"
          @click="positionEditing = !positionEditing"
        >
          平移
        </div>
        <div
          class="defultbtn"
          :class="{ btnon: rotationEditing }"
          @click="rotationEditing = !rotationEditing"
        >
          旋转
        </div>
        <div>
          <span>经度：{{ position[0] | numFilter2 }}°</span>
          <span>纬度：{{ position[1] | numFilter2 }}°</span>
          <span>高度：{{ position[2] | numFilter }}m</span>
        </div>
        <div>
          <span>偏航角：{{ rotation[0] | numFilter2 }}°</span>
          <span>俯仰角：{{ rotation[1] | numFilter2 }}°</span>
          <span>翻滚角：{{ rotation[2] | numFilter2 }}°</span>
        </div>
        <div>
          <span>近裁：<input type="text" v-model.number="near"/></span><br />
          <span>远裁：<input type="text" v-model.number="far"/></span><br />
        </div>
        <div>
          水平广角<span
            ><input
              type="range"
              min="1"
              max="179"
              step="1"
              v-model.number="fovH"/></span
          ><br />
        </div>
        <div>
          垂直广角<span
            ><input
              type="range"
              min="1"
              max="179"
              step="1"
              v-model.number="fovV"/></span
          ><br />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import syJson from "../../../../../../public/sy.json";
export default {
  name: "visioncom",
  data() {
    return {
      twoPostionsEditing: true,
      positionEditing: true,
      rotationEditing: true,
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      near: 0,
      far: 0,
      fovH: 0,
      fovV: 0,
      timmer: null, // 定义定时器
      viewshed: null,
    };
  },
  filters: {
    numFilter(value) {
      // 截取当前数据到小数点后两位
      let realVal = parseFloat(value).toFixed(2);
      return realVal;
    },
    numFilter2(value) {
      // 截取当前数据到小数点后五位
      let realVal = parseFloat(value).toFixed(5);
      return realVal;
    },
  },
  watch: {
    fovH() {
      console.log(this.fovH);
    },
  },
  methods: {
    initSY() {
      // 初始化视域
      let curThis = this;
      this.timmer = setTimeout(function() {
        syJson.forEach((item) => {
          curThis.$parent.$parent._earth.sceneTree.root.children.push(item);
        });
        let curEarth = curThis.$parent.$parent._earth;
        curEarth.sceneTree.$refs.viewshed.czmObject.flyTo();
        let viewshed = curEarth.sceneTree.$refs.viewshed.czmObject;
        window.viewshed = viewshed;
        {
          curThis._disposers = [];
          curThis._disposers.push(
            XE.MVVM.bind(
              curThis,
              "twoPostionsEditing",
              viewshed,
              "twoPostionsEditing"
            )
          );
          curThis._disposers.push(
            XE.MVVM.bind(
              curThis,
              "positionEditing",
              viewshed,
              "positionEditing"
            )
          );
          curThis._disposers.push(
            XE.MVVM.bind(
              curThis,
              "rotationEditing",
              viewshed,
              "rotationEditing"
            )
          );
          curThis._disposers.push(
            XE.MVVM.bindPosition(curThis, "position", viewshed, "position")
          );
          curThis._disposers.push(
            XE.MVVM.bindRotation(curThis, "rotation", viewshed, "rotation")
          );
          curThis._disposers.push(
            XE.MVVM.bind(curThis, "near", viewshed, "near")
          );// 最近可视距离
          curThis._disposers.push(
            XE.MVVM.bind(curThis, "far", viewshed, "far")
          );// 最远可视距离
          curThis._disposers.push(
            XE.MVVM.bindDegreeRadian(curThis, "fovH", viewshed, "fovH")
          );// 水平广角 横向可是范围
          curThis._disposers.push(
            XE.MVVM.bindDegreeRadian(curThis, "fovV", viewshed, "fovV")
          );// 垂直广角 纵向可是范围
        }
      }, 1000); // 10秒后构建json
    },
    // 设置当前相机状态
    setPositionWithCurrentCamera() {
      this._viewshed && this._viewshed.setPositionWithCurrentCamera();
    },
  },
  mounted() {
    this.initSY(); // 初始化当前视域
  },
  beforeDestroy() {
    // vue程序销毁时，需要清理相关资源
    // let earthObj = this.$parent.$parent._earth;
    // earthObj = earthObj && earthObj.destroy();
    this._disposers.forEach((d) => d());
    this._disposers.length = 0;
  },
};
</script>

<style; lang="less" scoped>
.syContent {
  position: absolute;
  right: 0px;
  bottom: 0px;
}
</style;
>;
