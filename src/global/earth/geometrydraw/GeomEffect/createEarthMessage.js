import Vue from "vue";
const vuecomclass = () => import("@/components/map/earthmessage/EarthMessage");

function createEarthMessage() {
  this._viewer = null;
  this._scene = null;
  this._vuecom = null;
  this._vueinstance = null;
}
createEarthMessage.prototype.inited = function (cesiumconfig) {
  this._earth = cesiumconfig;
  this._viewer = cesiumconfig.czm.viewer;
  this._scene = cesiumconfig.czm.scene;
  this._camera = cesiumconfig.czm.camera;
  this.initedCssHtml();
};

createEarthMessage.prototype.initedCssHtml = function () {
  let that = this;

  let startedit = new Promise((resolve, reject) => {
    let body = document.body;
    let vueinstance = new Vue({
      render: h => {
        return h(vuecomclass, {
          props: {
            title: "option.props.title"
          }
        });
      }
    }).$mount();
    vueinstance.$on("onStart", function () {
      resolve();
    });
    body.appendChild(vueinstance.$el);
    that._vueinstance = vueinstance;
  });
  //
  startedit.then(() => {
    that._vuecom = that._vueinstance.$children[0];
    that._scene.preRender.addEventListener(that.onEarthViewerChange, that);
    that._vueinstance._$comscenemanage = that;
  });
};

createEarthMessage.prototype.onEarthViewerChange = function () {
  if (this._vuecom == null) return;
  if (this._vuecom._$messagetiles == null) return;
  const scratch = new Cesium.Cartesian2();
  for (let i = 0; i < this._vuecom._$messagetiles.length; i++) {
    let nodevalue = this._vuecom._$messagetiles[i].component_node;
    let nodepostion = nodevalue.getPosition();
    const p = Cesium.Cartesian3.fromDegrees(
      nodepostion[0],
      nodepostion[1],
      nodepostion[2] || 0
    );
    const canvasPosition = this._scene.cartesianToCanvasCoordinates(p, scratch);

    if (Cesium.defined(canvasPosition)) {
      let left = parseFloat(canvasPosition.x);
      let top = parseFloat(canvasPosition.y);
      let display = "block";
      let j = this._camera.position,
        n = this._scene.globe.ellipsoid.cartesianToCartographic(j).height;
      if (
        !((n += 1 * this._scene.globe.ellipsoid.maximumRadius),
          Cesium.Cartesian3.distance(j, p) > n)
      ) {
        display = "block";
      } else {
        display = "none";
      }
      //改变位置
      nodevalue.exchangeposition({
        left: left,
        top: top,
        display: display
      });
    }
  }
};
//添加元素
createEarthMessage.prototype.appendItem = function (option) {
  if (this._vuecom == null) return;
 this._vuecom.createMessageinfo(option);
};
createEarthMessage.prototype.removeItem = function (guid) {
  if (this._vuecom == null) return;
  let dele = -2;
  for (let i = 0; i < this._vuecom._$messagetiles.length; i++) {
    let ele = this._vuecom._$messagetiles[i];
    if (ele.guid == guid) {
      let value = ele.component_node;
      value.$el.remove();
      value.$destroy();
      value = null;
      dele = i;
      break;
    }
  }
  if (dele > -1) {
    this._vuecom._$messagetiles.splice(dele, 1);
  }
};
createEarthMessage.prototype.removeItem1 = function ( _$messagetiles) {
  for (let i = 0; i <_$messagetiles.length; i++) {
    let ele = _$messagetiles[i];
      let value = ele.component_node;
      value.$el.remove();
      value.$destroy();
      value = null;
  }
};
createEarthMessage.prototype.uuid = function () {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4";
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
  s[8] = s[13] = s[18] = s[23] = "-";
  var uuid = s.join("");
  return uuid;
};



createEarthMessage.prototype.removeEntityLayer = function (guid) {
  this._viewer.entities.removeById(guid + "_1");
  this._viewer.entities.removeById(guid + "_2");
  this._viewer.entities.removeById(guid + "_3");
  this.removeItem(guid);
};

createEarthMessage.prototype.removeLayer = function (guid) {
  this.removeItem(guid);
};
createEarthMessage.prototype.closemessagepupo = function (guid) {
  this.removeLayer(guid);
};
createEarthMessage.prototype.removeAllLayer = function () {
  if (this._vuecom == null) return;
  let elements = this._vuecom._$messagetiles;
  if (elements == null) return;
  for (let i = 0; i < elements.length; i++) {
    let ele = elements[i];
    //let key = ele.guid;
    let value = ele.component_node;
    value.$el.remove();
    value.$destroy();
    value = null;
  }
  elements = [];
};


export default createEarthMessage;