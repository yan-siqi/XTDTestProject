<template>
  <div class="dantihuaContent">
    <div
      style="width: 100%; height: 100%"
      @click="(raise = false), (reduce = false)"
    >
      <div ref="earthContainer" style="width: 100%; height: 100%"></div>
      <div
        class="box"
        style="position: absolute; left: 18px; top: 18px; color: white; background: rgba(0, 0, 0, 0.6); padding: 20px; border-radius: 25px;min-width:200px; font-size:24px; font-family: 宋体;"
      >
        <div
          class="defultbtn"
          :class="{ btnon: creating }"
          @click="creating = !creating"
        >
          创建
        </div>
        <div
          class="defultbtn"
          style="margin-left:20px;"
          :class="{ btnon: editing }"
          @click="editing = !editing"
        >
          编辑
        </div>
        <div
          class="defultbtn"
          style="margin-left:20px;"
          :class="{ btnon: extrudedHeightEditing }"
          @click="extrudedHeightEditing = !extrudedHeightEditing"
        >
          拉伸编辑
        </div>
        <br />
        <span @click="show = !show" style="cursor: pointer;"
          ><input
            type="checkbox"
            style="width: 14px; cursor: pointer;"
            v-model="show"
          />单体化显隐</span
        ><br />
        <span @click="showHelper = !showHelper" style="cursor: pointer;"
          ><input
            type="checkbox"
            style="width: 14px; cursor: pointer;"
            v-model="showHelper"
          />线框显隐</span
        ><br />
        <span>拉伸：</span><input v-model.number="extrudedHeight" /><br />
        <span>颜色：</span
        ><input
          class="colorbox"
          type="color"
          value="#ffff00"
          @input="colorchange(event)"
        /><br />
        <span>填充不透明度: {{ colors[3] }}</span
        ><br />
        <span
          ><input
            type="range"
            min="0"
            max="1"
            step="0.1"
            v-model.number="colors[3]"/></span
        ><br />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "dantihuacom",
  data() {
    return {
      creating: false,
      editing: false,
      extrudedHeightEditing: false,
      show: true,
      showHelper: false,
      height: 0,
      outlineWidth: 0,
      extrudedHeight: 0,
      depthTest: false,
      colors: [0, 0, 0, 0],
      timmer: null,
    };
  },
  watch: {
    extrudedHeight(val) {
      if (typeof val == "string") {
        console.log("展示组件");
      }
    },
  },
  methods: {
    colorchange(event) {
      var color = event.target.value;
      console.log(color);
    },
    initDantihua() {
      let classificationpolygon = window.classificationpolygon;
      this._creatingUnbind = XE.MVVM.bind(
        this,
        "creating",
        classificationpolygon,
        "creating"
      );
      this._editingUnbind = XE.MVVM.bind(
        this,
        "editing",
        classificationpolygon,
        "editing"
      );
      this._showHelperUnbind = XE.MVVM.bind(
        this,
        "showHelper",
        classificationpolygon,
        "showHelper"
      );
      this._showUnbind = XE.MVVM.bind(
        this,
        "show",
        classificationpolygon,
        "show"
      );
      this._extrudedHeightEditingUnbind = XE.MVVM.bind(
        this,
        "extrudedHeightEditing",
        classificationpolygon,
        "extrudedHeightEditing"
      );
      this._extrudedHeightUnbind = XE.MVVM.bind(
        this,
        "extrudedHeight",
        classificationpolygon,
        "extrudedHeight"
      );
      this._colorsUnbind = XE.MVVM.bind(
        this,
        "colors",
        classificationpolygon,
        "color"
      );
    },
  },
  mounted() {
      this.initDantihua()
  },
  beforeDestroy() {
    // vue程序销毁时，需要清理相关资源
    this._creatingUnbind = this._creatingUnbind && this._creatingUnbind();
    this._editingUnbind = this._editingUnbind && this._editingUnbind();
    this._showUnbind = this._showUnbind && this._showUnbind();
    this._showHelperUnbind = this._showHelperUnbind && this._showHelperUnbind();
    this._extrudedHeightEditingUnbind =
      this._extrudedHeightEditingUnbind && this._extrudedHeightEditingUnbind();
    this._extrudedHeightUnbind =
      this._extrudedHeightUnbind && this._extrudedHeightUnbind();
    this._colorsUnbind = this._colorsUnbind && this._colorsUnbind();
    this._earth = this._earth && this._earth.destroy();
  },
};
</script>

<style lang="less" scoped>
.dantihuaContent {
  position: absolute;
  right: 0;
  bottom: 0;
  color: white;
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

  input {
    width: 222px;
  }

  .colorbox {
    width: 50px;
  }
}
</style>
