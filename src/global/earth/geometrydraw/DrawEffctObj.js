import createEarthMessage from "./GeomEffect/createEarthMessage";

function DrawEffctObj() {
  this.earth = null;
  this.viewer = null;
  this.scene = null;
  this.camera = null;
  this._css3Renderer = new createEarthMessage();
}
DrawEffctObj.prototype.inited = function (cesiumconfig) {
  this.earth = cesiumconfig;
  this.viewer = cesiumconfig.czm.viewer;
  this.scene = cesiumconfig.czm.scene;
  this.camera = cesiumconfig.czm.camera;
  this._css3Renderer.inited(cesiumconfig);
};
//css div
DrawEffctObj.prototype.addCssHtml = function (param) {
  if (this._css3Renderer == null) {
    return;
  }
  this._css3Renderer.appendItem(param);
};
DrawEffctObj.prototype.clearALL = function () {
  if (this._css3Renderer == null) {
    return;
  }
  this._css3Renderer.removeAllLayer();
};
export default DrawEffctObj;