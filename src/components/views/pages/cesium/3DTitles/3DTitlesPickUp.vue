<template>
  <div class="contentCom">
    <div style="width: 100%; height: 100%">
      <div
        class="box"
        style="position: absolute; left: 18px; top: 18px; color: white; border-radius: 25px;min-width:150px; font-size:24px; font-family: 宋体;"
      >
        <button class="defultbtn" @click="flyTo">定位</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "threedtitlesPickUpCom",
  data() {
    return {
      _earth: undefined, // 注意：Earth和Cesium的相关变量放在vue中，必须使用下划线作为前缀！
    };
  },
  methods: {
    initScene() {
      // 初始化场景'
      let earth = window.earth;
      earth.interaction.picking.enabled = true;
      const tileset1 = earth.sceneTree._$refs.qx.children[0].czmObject;
      tileset1.flyTo();
      // Cesium后处理
      var silhouetteBlue = Cesium.PostProcessStageLibrary.createEdgeDetectionStage(); //创建一个检测边缘的后处理阶段
      //将颜色写入输出纹理，当它位于边缘时，alpha 设置为 1.0。是突出显示边缘的颜色。默认值为Color#BLACK.
      silhouetteBlue.uniforms.length = 0.01;
      //是边缘的长度（以像素为单位）。默认值为0.5.
      silhouetteBlue.selected = [];

      var silhouetteGreen = Cesium.PostProcessStageLibrary.createEdgeDetectionStage();
      silhouetteGreen.uniforms.color = Cesium.Color.LIME;
      silhouetteGreen.uniforms.length = 0.01;
      silhouetteBlue.uniforms.color = Cesium.Color.BLUE;
      silhouetteGreen.selected = [];

      earth.czm.scene.postProcessStages.add(
        Cesium.PostProcessStageLibrary.createSilhouetteStage([
          silhouetteBlue,
          silhouetteGreen,
        ])
      );

      // 拾取事件定制
      tileset1.onclick = (pickedObject) => {
        console.log("拾取事件触发了", pickedObject);
        console.log(silhouetteBlue,'当前地形的后处理')
        if (!silhouetteBlue.selected ||silhouetteBlue.selected[0] !== pickedObject){
            console.log('满足条件')
          silhouetteBlue.selected = [pickedObject];
        }
        // return false; 是否禁用点选效果？
      };

      tileset1.onclickout = () => {
        if (silhouetteBlue.selected && silhouetteBlue.selected.length > 0) {
          silhouetteBlue.selected = [];
        }

        // return false; 是否禁用点选效果？
      };

      tileset1.onmouseover = (pickedObject) => {
          console.log('鼠标移入的事件',pickedObject)
        if (
          !silhouetteGreen.selected ||
          silhouetteGreen.selected[0] !== pickedObject
        ) {
          silhouetteGreen.selected = [pickedObject];
        }
        // return false; 是否禁用点选效果？
      };

      tileset1.onmouseout = () => {
        if (silhouetteGreen.selected && silhouetteGreen.selected.length > 0) {
          silhouetteGreen.selected = [];
        }
        // return false; 是否禁用点选效果？
      };

      earth.camera.position = [
        2.0314298769404595,
        0.6965174410620686,
        82.46076133637786,
      ];
      earth.camera.rotation = [
        4.052519100358341,
        -0.6321174896815931,
        6.279954969503336,
      ];

      this._tileset = tileset1;
      this._earth = earth;

      // only for debug
      window.earth = this._earth;
      window.tileset1 = this._tileset;
    },
    flyTo() {
      this._tileset.flyTo();
    },
  },
  mounted() {
    this.initScene();
  },
  beforeDestroy() {
    // vue程序销毁时，需要清理相关资源
    this._earth = this._earth && this._earth.destroy();
  },
};
</script>

<style lang="less" scoped>
.contentCom {
  width: 100px;
  height: 50px;
  position: absolute;
  right: -150px;
  bottom: 0px;
  background-color: brown;
  border-radius: 1px;
}
</style>
