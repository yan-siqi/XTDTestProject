<template>
  <div class="surfaceContent">
    <div style="width: 100%; height: 100%">
      <div ref="earthContainer" style="width: 100%; height: 100%"></div>
      <div
        class="box"
        style="position: absolute; left: 18px; top: 18px; color: white; background: rgba(0, 0, 0, 0.6); padding: 20px; border-radius: 25px;min-width:350px; font-size:24px; font-family: 宋体;"
      >
        <div
          class="defultbtn"
          :class="{ btnon: subSurfaceEnabled }"
          @click="subSurfaceEnabled = !subSurfaceEnabled"
        >
          地下模式
        </div>
        <br />
        <span>地表不透明度: {{ surfaceOpacity | numFilter }}</span
        ><br />
        <span
          ><input
            type="range"
            min="0.0"
            max="1.0"
            step="0.01"
            v-model.number="surfaceOpacity"/></span
        ><br />
      </div>
    </div>
  </div>
</template>

<script>
import surfaceJson from "../../../.././../../public/surface.json";
export default {
  name: "surfacecom",
  data() {
    return {
      subSurfaceEnabled: false,
      surfaceOpacity: 0.0,
      _bgImagery: undefined,
      timmer: null, // 自定义定时器
    };
  },
  methods: {
    initSurface() {
      // 初始化地表
      let that = this;
      this.timmer = setTimeout(function() {
          that.$parent.$parent._earth.sceneTree.root.children.push(surfaceJson);
          let curEarth = that.$parent.$parent._earth;
          console.log(curEarth.sceneTree.$refs.model1.czmObject,'当前飞机模型');
          curEarth.sceneTree.$refs.model1.czmObject.flyTo();
        curEarth.camera.position = [
          1.9017020682146637,
          0.5972460779975362,
          444.77,
        ];
        curEarth.camera.rotation = [
          3.1610812679605633,
          -0.35387649068319726,
          6.283128281412125,
        ];
        {
          that._disposers = [];
          that._disposers.push(
            XE.MVVM.bind(
              that,
              "subSurfaceEnabled",
              curEarth.terrainEffect,
              "subSurfaceEnabled"
            )
          );
          that._disposers.push(
            XE.MVVM.bind(
              that,
              "surfaceOpacity",
              curEarth.terrainEffect,
              "surfaceOpacity"
            )
          );

          // 设置初始值
          curEarth.terrainEffect.subSurfaceEnabled = true;
          curEarth.terrainEffect.surfaceOpacity = 0.5;
          // only for debug
          window.curEarth = curEarth;
          //window.model = curEarth.sceneTree.$refs.model1.czmObject;
        }
      }, 1000);
    },
  },
  filters: {
    numFilter(value) {
      // 截取当前数据到小数点后两位
      let realVal = parseFloat(value).toFixed(2);
      return realVal;
    },
  },
  mounted() {
    this.initSurface(); // 初始化地表数据
  },
  beforeDestroy() {
    // vue程序销毁时，需要清理相关资源
    this._earth = this._earth && this._earth.destroy();
    this._disposers.forEach((d) => d());
    this._disposers.length = 0;
  },
};
</script>

<style lang="less" scoped>
.surfaceContent {
  position: absolute;
  right: 0;
  bottom: 0;
}
</style>
