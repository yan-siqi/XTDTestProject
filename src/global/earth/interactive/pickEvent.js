/* eslint-disable no-undef */
import {
  wifipopup,
  fcfhpopup,
} from "./testPick";
import {
  log
} from "util";
class pickEvent {
  constructor() {

    //xe.earth.czm
    this.pickselected = {
      feature: undefined,
      originalColor: null
    };
    this.highlighted = {
      feature: undefined,
      originalColor: null
    };

    this.viewer = null;
    this.scene = null;
    this.camera = null;
    this.earth = null;
    this.nameOverlay = null;
    //事件句柄
    this.handlerglobe = null;
    this.flag = true;
    //地图事交互
    this.mapevent = null;
  }
  initpick(cesiumconfig, event) {
    this.viewer = cesiumconfig.czm.viewer;
    this.scene = cesiumconfig.czm.scene;
    this.camera = cesiumconfig.czm.camera;
    this.mapevent = event;
    this.earth = cesiumconfig;
    this.pickselected.originalColor = new Cesium.Color();
    this.highlighted.originalColor = new Cesium.Color()

  }
  init3dtilehtml() {
    this.nameOverlay = document.createElement("div");
    this.viewer.container.appendChild(this.nameOverlay);
    this.nameOverlay.className = "backdrop";
    this.nameOverlay.style.display = "none";
    this.nameOverlay.style.borderRadius = "8px";
    this.nameOverlay.style.position = "absolute";
    this.nameOverlay.style.bottom = "0";
    this.nameOverlay.style.left = "0";
    this.nameOverlay.style["pointer-events"] = "none";
    this.nameOverlay.style.padding = "5px 10px";
    this.nameOverlay.style.color = "rgb(255,255,255)";
    this.nameOverlay.style.backgroundColor = "rgba(0,0,128,0.5)";

  }
  pick3dtiles() {
    //移动鼠标
    let that = this;

    // earth.czm.viewer.scene.globe.depthTestAgainstTerrain = true;
    this.handlerglobe.setInputAction(function (movement) {
      if (Cesium.defined(that.highlighted.feature)) {
        that.highlighted.feature.color = that.highlighted.originalColor;
        that.highlighted.feature = undefined;
      }

      let pickedFeature = that.scene.pick(movement.endPosition);
      if (!Cesium.defined(pickedFeature)) {
        that.nameOverlay.style.display = "none";
        return;
      }
      if (pickedFeature instanceof Cesium.Cesium3DTileFeature) {
        that.nameOverlay.style.display = "none";
        that.nameOverlay.style.bottom =
          that.viewer.canvas.clientHeight - movement.endPosition.y + "px";
        that.nameOverlay.style.left = movement.endPosition.x + "px";
        that.nameOverlay.textContent = pickedFeature.getProperty("sitenum");

        if (pickedFeature !== that.pickselected.feature && pickedFeature.getProperty("sitenum")) {
          that.highlighted.feature = pickedFeature;
          Cesium.Color.clone(
            pickedFeature.color,
            that.highlighted.originalColor
          );
          pickedFeature.color = new Cesium.Color(0.49, 0.222, 0.90, 1);
        }
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    //鼠标左键单击
    this.handlerglobe.setInputAction(function (movement) {
      var pickedFeature = that.scene.pick(movement.position);
      //console.log(pickedFeature, '鼠标点击的位置');
      //0531修改
      if (pickedFeature === undefined) { // 判断分层分户
        return;
      }

      if (!pickedFeature.id) {
        // 含有sitenum字段，座位模型
        if (pickedFeature.tileset && pickedFeature.getProperty("sitenum")) {

          //得到唯一值
          that.nameOverlay.textContent = pickedFeature.getProperty("sitenum");
          fcfhpopup(that, movement);
        }
        // 不是座位模型
        else {

        }
      } else if (pickedFeature !== undefined && pickedFeature.id._descriptionOfpolice === "policeInformation") {
        // 警员警车
        var names = pickedFeature.id._pointTypeShow;
        if (names == "policePoint" || "policeCarPoint") {
          wifipopup(pickedFeature);
          return
        }
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);



    this.handlerglobe.setInputAction(function (wheelment) { }, Cesium.ScreenSpaceEventType.WHEEL)
  }
  starteventpick() {
    if (this.handlerglobe == null) {
      this.handlerglobe = new Cesium.ScreenSpaceEventHandler;
      this.pick3dtiles();
    }
  }

  endeventpick() {
    if (this.pickselected.feature != null) {
      this.pickselected.feature.color = this.pickselected.originalColor;
      this.pickselected.feature = null;
    }
    if (this.highlighted.feature != null) {
      this.highlighted.feature.color = this.highlighted.originalColor;
      this.highlighted.feature = null;
    }
    this.nameOverlay.style.display = "none";
  }
}

export default pickEvent;