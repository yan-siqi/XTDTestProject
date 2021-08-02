<template>
  <div class="pathDireactionContainer">
    <div style="width: 100%; height: 100%">
      <div ref="earthContainer" style="width: 100%; height: 100%"></div>
      <div
        class="box"
        style="
          position: absolute;
          left: 18px;
          top: 18px;
          color: white;
          border-radius: 25px;
          min-width: 100px;
          font-size: 24px;
          font-family: 宋体;
        "
      >
        <div
          class="defultbtn"
          :class="{ btnon: targetPicking }"
          @click="targetPicking = !targetPicking"
        >
          相机方向
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "pathdirection",
  data() {
    return {
      _earth: undefined, // 注意：Earth和Cesium的相关变量放在vue中，必须使用下划线作为前缀！
      // 是否处于指定所有关键点相机的目标的状态w
      // 设置为true以后，所有关键点相机都会同时旋转，指向目标点。鼠标左键点击以后，该属性会自动变为false。 注意：关键点相机状态需要开启showDirection属性以后，才能方便观察！
      targetPicking: false,
    };
  },
  methods: {
    initPathDireaction() {
      var path1 = earth.sceneTree.$refs.ljdh.czmObject;
      this._targetPickingUnbind = XE.MVVM.bind(
        this,
        "targetPicking",
        path1,
        "targetPicking"
      );
    },
  },
  mounted() {
    this.initPathDireaction(); // 设置当前路径播放的方向
  },
  beforeDestroy() {
    // vue程序销毁时，需要清理相关资源
    this._targetPickingUnbind =
      this._targetPickingUnbind && this._targetPickingUnbind();
    this._earth = this._earth && this._earth.destroy();
  },
};
</script>

<style lang='less' scoped>
.pathDireactionContainer {
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
    min-width: 120px;
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