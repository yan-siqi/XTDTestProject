<template>
  <div class="pathShiyuFenxi">
    <div style="width: 100%; height: 100%">
      <div ref="earthContainer" style="width: 100%; height: 100%"></div>
      <div
        class="box"
        style="
          position: absolute;
          left: 18px;
          top: 18px;
          color: white;
          background: rgba(0, 0, 0, 0.6);
          padding: 20px;
          border-radius: 25px;
          min-width: 200px;
          font-size: 24px;
          font-family: 宋体;
        "
      >
        <div
          class="defultbtn"
          :class="{ btnon: playing }"
          @click="isPlaying"
        >
          路径播放
        </div>
        <div
          class="defultbtn"
          style="margin-left: 20px"
          :class="{ btnon: cameraAttached }"
          @click="cameraAttachedClick"
        >
          相机绑定
        </div>
        <br />
        <span @click="show = !show" class="checkbox"
          ><input class="fly" type="checkbox" v-model="show" />路径显隐</span
        ><br />
        <span>当前速度: {{ currentSpeed }}m/s</span><br />
        <span
          ><input
            type="range"
            min="0"
            max="100"
            step="1"
            v-model.number="currentSpeed"/></span
        ><br />
        <span>当前位置：{{ currentD | numFilter }}米</span>
      </div>
    </div>
  </div>
</template>

<script>
import PathSYXJson from "../../../../../../public/pathShiyufenxi.json";
export default {
  name: "pathshiyufenxi",
  data() {
    return {
      twoPostionsEditing: true,
      positionEditing: true,
      rotationEditing: true,
      _uw1: undefined,
      _uw2: undefined,
      show: true, // 控制路径的显示与隐藏，默认为隐藏
      // 当前播放速度，单位为米/秒。
      // 注意，此属性可以实时修改，修改后的速度立即生效，所以可以动态修改路径上物体的前进速度！
      currentSpeed: 0,
      // 当前步进距离
      // 指当前播放状态下由第一个关键点沿路径运动到当前位置的长度，单位是米。
      // 当前playing属性为false时，此属性恒定不变；当playing为true，此属性会自动增加。 随着currentD的变化，会实时计算currentPosition、currentRotation这两个属性。 currentPosition指当前位置，currentRotation指当前姿态
      currentD: 0,
      playing: false,
      cameraAttached: false,
      _earth: undefined, // 注意：Earth和Cesium的相关变量放在vue中，必须使用下划线作为前缀！
    };
  },
  filters: {
    numFilter(value) {
      // 截取当前数据到小数点后两位
      let realVal = parseFloat(value).toFixed(2);
      return realVal;
    },
  },
  methods: {
    isPlaying(){
      // 是否展示路径播放
      this.playing = !this.playing;
    },
    // 初始化视域分析
    initshiyufenxi() {
      console.log(this.playing, "当前路径的状态");
      let earth = window.earth;
      // 定义视域分析
      var viewshed = earth.sceneTree.$refs.dayantaViewShed.czmObject;
      this._viewshed = viewshed;
      // 视域分析追随的路径
      var path1 = earth.sceneTree.$refs.dayantaViewShedOfPath.czmObject;
      earth.camera.position = [
        1.901699952569712,
        0.5971691902914926,
        957.7418221028558,
      ];
      earth.camera.rotation = [
        6.283185307179429,
        -0.7855047806765185,
        1.0658141036401503e-14,
      ];
      // 收集准备销毁的资源
      this._disposers = [];
      //当前展示
      this._disposers.push(XE.MVVM.bind(this, "show", path1, "show"));
      // 当前的播放速度
      this._disposers.push(
        XE.MVVM.bind(this, "currentSpeed", path1, "currentSpeed")
      );
      //当前位置
      this._disposers.push(XE.MVVM.bind(this, "currentD", path1, "currentD"));
      // 相机绑定
      this._disposers.push(
        XE.MVVM.bind(this, "cameraAttached", path1, "cameraAttached")
      );
      // 路径播放
      this._disposers.push(XE.MVVM.bind(this, "playing", path1, "playing"));
      // 监视当前相机的位置
      // currentPosition 当前相机位置，形式如：[0, 0, 0] 该数组中的元素分别表示经度（单位弧度）、纬度（单位弧度）、高度（单位米）。 注意该属性，为只读属性！
      this._uw1 = XE.MVVM.watch(path1, "currentPosition", (position) => {
        viewshed.position = [...position];
      });
      // currentRotation 当前相机姿态，形式如：[0, 0, 0] 该数组中的元素分别表示偏航角（单位弧度）、俯仰角（单位弧度）、翻转角（单位弧度）。 注意该属性，为只读属性！
      this._uw2 = XE.MVVM.watch(path1, "currentRotation", (rotation) => {
        viewshed.rotation = [...rotation];
      });
      this._earth = earth;
    },
    cameraAttachedClick() {
      this.cameraAttached = !this.cameraAttached;
      // 飞回原始位置
      earth.camera.flyTo(
        [1.901699952569712, 0.5971691902914926, 957.7418221028558],
        0,
        [6.283185307179429, -0.7855047806765185, 1.0658141036401503e-14]
      );
    },
  },
  mounted() {
    let curEarth = window.earth;
    PathSYXJson.forEach((eachScene) => {
      curEarth.sceneTree.root.children.push(eachScene); // 遍历json对象将大雁塔的json数据加到场景中
    });
    curEarth.camera.flyTo([
      1.9016941363233133,
      0.5972280994903124,
      441.33440879700987,
    ]);
    this.initshiyufenxi();
  },
  beforeDestroy() {
    // vue程序销毁时，需要清理相关资源
    this._earth = this._earth && this._earth.destroy();
    this._disposers.forEach((d) => d());
    this._disposers.length = 0;
    this._uw1 = this._uw1 && this._uw1();
    this._uw2 = this._uw2 && this._uw2();
  },
};
</script>

<style lang="less" scoped>
.pathShiyuFenxi {
  position: absolute;
  right: 0;
  top: 0;
}
</style>
