<template>
  <div class="pathComContainer">
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
          min-width: 400px;
          font-size: 24px;
          font-family: 宋体;
        "
      >
        <div
          class="defultbtn"
          :class="{ btnon: playing }"
          @click="playing = !playing"
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
            min="300"
            max="3000"
            step="50"
            v-model.number="currentSpeed" /></span
        ><br />
        <span>当前位置：{{ currentD | numFilter }}米</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "hqfxPathcom",
  data() {
    return {
      _earth: undefined, // 注意：Earth和Cesium的相关变量放在vue中，必须使用下划线作为前缀！
      show: true, // 控制路径的显示与隐藏，默认为隐藏
      // 当前播放速度，单位为米/秒。
      // 注意，此属性可以实时修改，修改后的速度立即生效，所以可以动态修改路径上物体的前进速度！
      currentSpeed: 0,
      // 当前步进距离
      // 指当前播放状态下由第一个关键点沿路径运动到当前位置的长度，单位是米。
      // 当前playing属性为false时，此属性恒定不变；当playing为true，此属性会自动增加。 随着currentD的变化，会实时计算currentPosition、currentRotation这两个属性。 currentPosition指当前位置，currentRotation指当前姿态
      currentD: 0,
      playing: true,
      cameraAttached: false,
    };
  },
  methods: {
    // 初始化资源路径
    initPath() {
      var path1 = window.earth.sceneTree.$refs.ljdh.czmObject;
      const pin = new XE.Obj.Pin(earth);
      path1.currentSpeed = 300;
      // 1.1.3 数据绑定
      // 双向绑定的属性，如果一方发生变化，另一方同样会跟随变化
      this._showUnbind = XE.MVVM.bind(this, "show", path1, "show");
      this._currentSpeedUnbind = XE.MVVM.bind(
        this,
        "currentSpeed",
        path1,
        "currentSpeed"
      );
      this._currentDUnbind = XE.MVVM.bind(this, "currentD", path1, "currentD");
      this._cameraAttachedUnbind = XE.MVVM.bind(
        this,
        "cameraAttached",
        path1,
        "cameraAttached"
      );
      this._playingUnbind = XE.MVVM.bind(this, "playing", path1, "playing");

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

      // only for Debug
      window.path1 = path1;
    },
    cameraAttachedClick() {
      this.cameraAttached = !this.cameraAttached;
      // 飞回原始位置
      earth.camera.flyTo(
        [-2.874550461322836, 0.5427586086174048, 32964777.473697472],
        0,
        [0.3748566245885465, -1.5444700677176155, 0]
      );
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
    this.initPath();
  },
  beforeDestroy() {
    // vue程序销毁时，需要清理相关资源
    this._showUnbind = this._showUnbind && this._showUnbind();
    this._currentSpeedUnbind =
      this._currentSpeedUnbind && this._currentSpeedUnbind();
    this._currentDUnbind = this._currentDUnbind && this._currentDUnbind();
    this._pinUnbind = this._pinUnbind && this._pinUnbind();
    this._cameraAttachedUnbind =
      this._cameraAttachedUnbind && this._cameraAttachedUnbind();
    this._playingUnbind = this._playingUnbind && this._playingUnbind();
    this._earth = this._earth && this._earth.destroy();
  },
};
</script>

<style lang='less' scoped>
.pathComContainer {
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