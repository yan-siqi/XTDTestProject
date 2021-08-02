<template>
  <div class="modelContent">
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
          :class="{ btnon: positionEditing }"
          @click="positionEditing = !positionEditing"
        >
          平移
        </div>
        <div
          class="defultbtn"
          style="margin-left: 20px"
          :class="{ btnon: rotationEditing }"
          @click="rotationEditing = !rotationEditing"
        >
          旋转
        </div>
        <br />
        <span>经度：{{ xbsjPosition[0] | numFilter }}°</span>
        <span>纬度：{{ xbsjPosition[1] | numFilter }}°</span>
        <span>高度：{{ xbsjPosition[2] | numFilter2 }}m</span>
        <span>偏航角：{{ xbsjRotation[0] | numFilter2 }}°</span>
        <span>俯仰角：{{ xbsjRotation[1] | numFilter2 }}°</span>
        <span>翻滚角：{{ xbsjRotation[2] | numFilter2 }}°</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "translateRotatecom",
  data() {
    return {
      positionEditing: false,
      rotationEditing: false,
      xbsjPosition: [0, 0, 0],
      xbsjRotation: [0, 0, 0],
      _earth: undefined, // 注意：Earth和Cesium的相关变量放在vue中，必须使用下划线作为前缀！
      _model: undefined,
    };
  },
  methods: {
    // 初始化位置平移
    initWzpy() {
      // let model1 = window.earth.sceneTree.$refs.model1.czmObject;
      console.log(window.earth.sceneTree.$refs.model1.czmObject);
      this._earth = window.earth;
      this._model = window.earth.sceneTree.$refs.model1.czmObject;
      this._rotationEditingUnbind = XE.MVVM.bind(
        this,
        "rotationEditing",
        this._model,
        "rotationEditing"
      );
      this._positionEditingUnbind = XE.MVVM.bind(
        this,
        "positionEditing",
        this._model,
        "positionEditing"
      );
      this._xbsjPositionUnbind = XE.MVVM.bindPosition(
        this,
        "xbsjPosition",
        this._model,
        "xbsjPosition"
      );
      this._xbsjRotationUnbind = XE.MVVM.bindRotation(
        this,
        "xbsjRotation",
        this._model,
        "xbsjRotation"
      );

      // 设置初始值
      earth.terrainEffect.subSurfaceEnabled = false;
      earth.terrainEffect.surfaceOpacity = 0.0;
      this.positionEditing = true; // 默认状态开启位置编辑
    },
  },
  filters: {
    numFilter(value) {
      // 截取当前数据到小数点后两位
      let realVal = parseFloat(value).toFixed(5);
      return realVal;
    },
    numFilter2(value) {
      // 截取当前数据到小数点后两位
      let realVal = parseFloat(value).toFixed(2);
      return realVal;
    },
  },
  mounted() {
    // 资源加载中
    this.initWzpy();
  },
  beforeDestroy() {
    // vue程序销毁时，需要清理相关资源
    this._earth = this._earth && this._earth.destroy();
    this._model = this._model && this._model.destroy();
    this._rotationEditingUnbind =
      this._rotationEditingUnbind && this._rotationEditingUnbind();
    this._positionEditingUnbind =
      this._positionEditingUnbind && this._positionEditingUnbind();
    this._xbsjPositionUnbind =
      this._xbsjPositionUnbind && this._xbsjPositionUnbind();
    this._xbsjRotationUnbind =
      this._xbsjRotationUnbind && this._xbsjRotationUnbind();
  },
};
</script>

<style lang="less" scoped>
.modelContent {
  position: absolute;
  right: 0;
  bottom: 0;
  .box span {
    display: block;
    margin-top: 10px;
  }

  .defultbtn {
    display: inline-block;
    text-align: center;
    min-width: 60px;
    height: 38px;
    padding: 0 10px;
    line-height: 38px;
    border-radius: 100px;
    border: 1px solid #c9c9c9;
    background-color: #fff;
    color: #555;
    cursor: pointer;
  }

  .defultbtn:hover {
    background-color: #b3daf8;
  }

  .btnon {
    background-color: #1e9fff;
    color: #fff;
    border: 1px solid #1e9fff;
  }
}
</style>
