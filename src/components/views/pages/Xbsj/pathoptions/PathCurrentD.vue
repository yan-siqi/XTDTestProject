<template>
  <div class="pathCurrentDcontainer">
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
          min-width: 350px;
          font-size: 24px;
          font-family: 宋体;
        "
      >
        <span>当前位置(currentD): {{ currentD | numFilter }}米</span><br />
        <span
          ><input
            type="range"
            min="0"
            max="1320"
            step="1"
            v-model.number="currentD" /></span
        ><br />
        <div
          class="defultbtn"
          :class="{ btnon: cameraAttached }"
          @click="cameraAttachedClick"
        >
          相机绑定
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "pathCurrentDcom",
  data() {
    return {
      _earth: undefined, // 注意：Earth和Cesium的相关变量放在vue中，必须使用下划线作为前缀！
      // 当前步进距离
      // 指当前播放状态下由第一个关键点沿路径运动到当前位置的长度，单位是米。
      currentD: 0,
      cameraAttached: false,
    };
  },
  methods: {
    initPathCurrent() {
      var path1 = earth.sceneTree.$refs.ljdh.czmObject; // 选择路径
      // 定义一个pin用来跟踪路径
      const pin = new XE.Obj.Pin(earth);
      // 飞入大雁塔
      path1.flyTo();
      // 1.1.3 数据绑定
      // 双向绑定的属性，如果一方发生变化，另一方同样会跟随变化
      this._currentDUnbind = XE.MVVM.bind(this, "currentD", path1, "currentD");
      this._cameraAttachedUnbind = XE.MVVM.bind(
        this,
        "cameraAttached",
        path1,
        "cameraAttached"
      );
      // 1.1.4 跟踪
      // 单向绑定的属性，pin将跟踪path1，但pin发生变化path1并不会跟踪！
      // currentPosition 当前相机位置，形式如：[0, 0, 0] 该数组中的元素分别表示经度（单位弧度）、纬度（单位弧度）、高度（单位米）。 注意该属性，为只读属性！
      this._pinUnbind = XE.MVVM.track(
        pin,
        "position",
        path1,
        "currentPosition"
      );

      this._earth = window.earth;
      window.path1 = path1;
    },
    cameraAttachedClick() {
      this.cameraAttached = !this.cameraAttached;
      // 飞回原始位置
      //   window.earth.camera.flyTo(
      //     [1.9017007350831854, 0.5971922118633656, 852.1812706303504],
      //     0,
      //     [1.794120407794253e-13, -0.7863066183499514, 6.283185307179586]
      //   );
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
    this.initPathCurrent();
  },
  beforeDestroy() {
    // vue程序销毁时，需要清理相关资源
    this._currentDUnbind = this._currentDUnbind && this._currentDUnbind();
    this._pinUnbind = this._pinUnbind && this._pinUnbind();
    this._cameraAttachedUnbind =
      this._cameraAttachedUnbind && this._cameraAttachedUnbind();
    this._earth = this._earth && this._earth.destroy();
  },
};
</script>

<style lang='less' scoped>
.pathCurrentDcontainer {
  position: absolute;
  right: 0;
  bottom: 0;
  input {
    width: 350px;
  }

  .checkbox {
    display: inline-block;
    margin: 5px 0;
    cursor: pointer;
  }

  .fly {
    width: 20px;
    height: 16px;
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