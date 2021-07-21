import XTDEarthScene from "./managermap/XTDEarthScene.js";
const earthcesium = {
  earth: null
};

function earthMapTool(earth) {
  this.earth = earth.earth;
  this.xtdEarthScene = new XTDEarthScene();
}

earthMapTool.prototype.setearth = function (earth) {
  this.earth = earth.earth;
  //触发事件
  this.xtdEarthScene.inited(earth.earth);
};

earthMapTool.prototype.initearth = function () {
  this.initializescene();

};

//全图浏览
earthMapTool.prototype.initializescene = function () {
  if (this.earth == null) return;

};

let earthmaptool = new earthMapTool(earthcesium);

export default {
  earthcesium,
  earthmaptool
};