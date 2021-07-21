//地图事件
import MapEvent from "../customevent/mapEvent.js";
//3dtile事件
import Pick3dtileEvent from "../interactive/pickEvent.js";
//
import DrawEffctObj from "../geometrydraw/DrawEffctObj";

function XTDEarthScene() {
  this.earth = null;
  this.viewer = null;
  this.scene = null;
  this.camera = null;

  this._mapemitevent = new MapEvent();

  this._pick3dtileevent = new Pick3dtileEvent();
  this._draweffctobj = new DrawEffctObj();
}

Object.defineProperties(XTDEarthScene.prototype, {

  mapemitevent: {
    get: function () {
      return this._mapemitevent;
    }
  },
  pick3dtileevent: {
    get: function () {
      return this._pick3dtileevent;
    }
  },
  draweffctobj: {
    get: function () {
      return this._draweffctobj;
    }
  }
});

XTDEarthScene.prototype.inited = function (cesiumconfig) {
  this.earth = cesiumconfig;
  this.viewer = cesiumconfig.czm.viewer;
  this.scene = cesiumconfig.czm.scene;

  this._pick3dtileevent.initpick(cesiumconfig, this._mapemitevent);
  //
  this._draweffctobj.inited(cesiumconfig);
  this.startsetting();
};

//默认设置
XTDEarthScene.prototype.startsetting = function () {
  //取消默认双击事件
  if (this.earth == null) return;
  this.viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
    Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
  );

  this._pick3dtileevent.starteventpick();
  //设置事件html
  this._pick3dtileevent.init3dtilehtml();
};

export default XTDEarthScene;