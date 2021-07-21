
// 绘制普通点位
export function createPublicPin(earth, _thisP) {
  _thisP.$message("请点击鼠标左键拾取位置!!");
  earth.czm.viewer.scene.globe.depthTestAgainstTerrain = true;
  _thisP.pinGUids = [];
  var that = _thisP;
  _thisP._PinPub = new XE.Obj.Pin(earth);
  _thisP._creatingPin = XE.MVVM.bind(
    _thisP,
    "creating",
    _thisP._PinPub,
    "creating"
  );
  _thisP._PinPub.creating = true;
  _thisP.$parent.isShowTip = true;
  _thisP._PinPub.enabled = true;
  var that = _thisP;
  _thisP._PinPub.pinBuilder.makiIcon = "";
  _thisP._PinPub.pinBuilder.text = "";
  _thisP._PinPub.pinBuilder.extText = "";
  _thisP._PinPub.pinBuilder.extTextPixelOffset = [0, 0];
  var handler = new Cesium.ScreenSpaceEventHandler(earth.czm.scene._canvas);
  //0527 修改
  handler.setInputAction(function (movement) {
    that.$parent.$children[1].$refs.PublicPointRef.valueOfPointLong =
      that._PinPub.position[0] * (180 / Math.PI);
    that.$parent.$children[1].$refs.PublicPointRef.valueOfPointLat =
      that._PinPub.position[1] * (180 / Math.PI);
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}
// 绘制折线 函数总称 publicUtils
export function createPublicCordon(_thisCordon) {
  _thisCordon.$message("请点击鼠标左键开始创建,shift+鼠标右键结束,右键创建完成!");
  _thisCordon.guids = [];
  // 画折线
  _thisCordon._line = new XE.Obj.Polyline(earth);
  _thisCordon._line._pointsColor = Cesium.Color.YELLOW;
  _thisCordon._creatingUnbin = XE.MVVM.bind(
    _thisCordon,
    "creating",
    _thisCordon._line,
    "creating"
  );
  _thisCordon._line.creating = true;
}
// 绘制OD线 函数总称 publicUtils
export function createODLine(_thisODLine) {
  _thisODLine.$message("请点击鼠标左键开始创建,shift+鼠标右键结束,右键创建完成!");
  _thisODLine.ODLineGuids = [];
  _thisODLine._ODline = new XE.Obj.Polyline(earth);
  _thisODLine._ODline._pointsColor = Cesium.Color.YELLOW;
  _thisODLine._creatingUnbin = XE.MVVM.bind(
    _thisODLine,
    "creating",
    _thisODLine._ODline,
    "creating"
  );
  _thisODLine._ODline.creating = true;
  _thisODLine._ODline.loop = false;
  _thisODLine._ODline.material.type = "XbsjODLineMaterial"; // OD线

}
// 绘制立方体 函数总称 publicUtils
export function createLifangti(_thisLifangti) {
  _thisLifangti.$message("请点击鼠标左键开始创建,shift+鼠标右键结束,右键创建完成!");
  _thisLifangti.Polygonguids = [];
  _thisLifangti._polygon = new XE.Obj.Polygon(earth);
  _thisLifangti._polygon._pointsColor = Cesium.Color.YELLOW;
  _thisLifangti._polygon.ground = false;
  _thisLifangti._creatingpolygon = XE.MVVM.bind(
    _thisLifangti,
    "creating",
    _thisLifangti._polygon,
    "creating"
  );
  _thisLifangti._polygon.creating = true;
}
// 绘制面 函数总称 publicUtils
export function createPubFace(_thisFace) {
  _thisFace.$message("请点击鼠标左键开始创建,shift+鼠标右键结束,右键创建完成!");
  _thisFace.faceguids = [];
  _thisFace._face = new XE.Obj.Polygon(earth);
  _thisFace._face._pointsColor = Cesium.Color.YELLOW;
  _thisFace._face.ground = false;
  _thisFace._creatingpolygon = XE.MVVM.bind(
    _thisFace,
    "creating",
    _thisFace._face,
    "creating"
  );
  _thisFace._face.creating = true;
}
// 绘制警车 函数总称 publicUtils
export function createPolcieCar(earth, _thisPoliCar) {
  _thisPoliCar.$message("请点击鼠标左键开始拾取位置!");
  _thisPoliCar.isCheckedPoliceMan = false;
  _thisPoliCar._Pin = new XE.Obj.Pin(earth);
  _thisPoliCar._creatingPin = XE.MVVM.bind(_thisPoliCar, "creating", _thisPoliCar._Pin, "creating");
  _thisPoliCar._Pin.creating = true;
  _thisPoliCar._Pin.imageUrl = require("../../assets/imageBS/jingchedian.png");
  _thisPoliCar.$parent.isShowTip = true;
  _thisPoliCar._Pin.enabled = true;
  var that = _thisPoliCar;
  var handler = new Cesium.ScreenSpaceEventHandler(earth.czm.scene._canvas);
  // 0527 修改 0528+校验
  handler.setInputAction(function (movement) {
    that.$parent.$children[1].$refs.policeCarRef.ruleForm.valueOfCarLongitude =
      that._Pin.position[0] * (180 / Math.PI);
    that.$parent.$children[1].$refs.policeCarRef.ruleForm.valueOfCarLatitude =
      that._Pin.position[1] * (180 / Math.PI);
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}
// 绘制警员 函数总称 publicUtils
export function createPolciePerson(earth, _thisPolicePerson) {
  _thisPolicePerson.$message("请点击鼠标左键开始拾取位置!");
  _thisPolicePerson.isCheckedPoliceMan = false;
  _thisPolicePerson._Pin = new XE.Obj.Pin(earth);
  _thisPolicePerson._creatingPin = XE.MVVM.bind(_thisPolicePerson, "creating", _thisPolicePerson._Pin, "creating");
  _thisPolicePerson._Pin.creating = true;
  _thisPolicePerson._Pin.imageUrl = require("../../assets/imageBS/policePoint.png");
  _thisPolicePerson.$parent.isShowTip = true;
  _thisPolicePerson._Pin.enabled = true;
  var that = _thisPolicePerson;
  var handler = new Cesium.ScreenSpaceEventHandler(earth.czm.scene._canvas);
  handler.setInputAction(function (movement) {
    that.$parent.$children[1].$refs.policePersonRef.ruleForm.valueOfPoliceLongitude =
      that._Pin.position[0] * (180 / Math.PI);
    that.$parent.$children[1].$refs.policePersonRef.ruleForm.valueOfPoliceLatitude =
      that._Pin.position[1] * (180 / Math.PI);
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}
function measureMentType(selfThis, earth, type) {
  selfThis._earth = window.earth;
  selfThis._disposers = [];
  earth.analyzation.measurement.type = type;
}