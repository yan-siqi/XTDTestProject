<template>
  <div class="content">
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
        <div
          class="defultbtn"
          :class="{ btnon: showHelper }"
          @click="showHelper = !showHelper"
        >
          辅助线
        </div>

        <div>
          视频url：<input type="text" style="width:400px;" v-model="videoUrl" />
        </div>
        <div>
          掩码url：<input type="text" style="width:400px;" v-model="maskUrl" />
        </div>
        <div>
          <span>经度：{{ position[0] | numFilter2 }}°</span>
          <span>纬度：{{ position[1] | numFilter2 }}°</span>
          <span>高度：{{ position[2] | numFilter }}m</span>
        </div>
        <div>
          <span>偏航角：{{ rotation[0] | numFilter2 }}度</span>
          <span>俯仰角：{{ rotation[1] | numFilter2 }}度</span>
          <span>翻滚角：{{ rotation[2] | numFilter2 }}度</span>
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
import sprhJson from "../../../../../../public/sprhJson.json";
export default {
  name:'sprh',// 视频融合
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
      videoUrl: "",
      maskUrl: "",
      showHelper: true,
      timeOut: null, // 设置定时器
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
  mounted() {
    // 加载三维场景json
    var that = this;
    this.timeOut = setTimeout(function() {
      that.$parent.$parent._earth.sceneTree.root.children.push(sprhJson);
      that.initsprh();
    }, 10000);
  },
  methods: {
    initsprh() {
      window.cameravideo = this.$parent.$parent._earth.sceneTree.$refs.cameravideo.czmObject;
      this._cameravideo = cameravideo;
      console.log(this._cameravideo );
      this._disposers = [];
      this._disposers.push(
        XE.MVVM.bind(
          this,
          "twoPostionsEditing",
          cameravideo,
          "twoPostionsEditing"
        )
      );
      this._disposers.push(
        XE.MVVM.bind(this, "positionEditing", cameravideo, "positionEditing")
      );
      this._disposers.push(
        XE.MVVM.bind(this, "rotationEditing", cameravideo, "rotationEditing")
      );
      this._disposers.push(
        XE.MVVM.bindPosition(this, "position", cameravideo, "position")
      );
      this._disposers.push(
        XE.MVVM.bindRotation(this, "rotation", cameravideo, "rotation")
      );
      this._disposers.push(XE.MVVM.bind(this, "near", cameravideo, "near"));
      this._disposers.push(XE.MVVM.bind(this, "far", cameravideo, "far"));
      this._disposers.push(
        XE.MVVM.bind(this, "showHelper", cameravideo, "showHelper")
      );
      this._disposers.push(
        XE.MVVM.bind(this, "videoUrl", cameravideo, "videoUrl")
      );
      this._disposers.push(
        XE.MVVM.bind(this, "maskUrl", cameravideo, "maskUrl")
      );
      this._disposers.push(
        XE.MVVM.bindDegreeRadian(this, "fovH", cameravideo, "fovH")
      );
      this._disposers.push(
        XE.MVVM.bindDegreeRadian(this, "fovV", cameravideo, "fovV")
      );
    },
    setPositionWithCurrentCamera() {
      this._cameravideo && this._cameravideo.setPositionWithCurrentCamera();
    },
  }, // 1.2 资源销毁
  beforeDestroy() {
    // vue程序销毁时，需要清理相关资源
    this._earth = this._earth && this._earth.destroy();

  },
};
</script>

<style lang="less" scoped>
.content {
  position: absolute;
  right: 0;
  bottom: 0;
  pointer-events: auto;
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
    margin-bottom: 4px;
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
