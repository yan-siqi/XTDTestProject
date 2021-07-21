
export function checkedCancelCordon(nodeList, curThis, obj) {
  for (var i = 0; i < nodeList.length; i++) {
    curThis._line = new XE.Obj.Polyline(earth);
    curThis.guidsLine1.push(curThis._line.guid);
    var lineArr = Array.from(new Set(curThis.guidsLine1));
    lineArr.forEach((item) => {
      curThis.allCheckedGUidsList.push(item);
    });
    curThis._line.id = obj.id;
    var objCon = {
      id: curThis._line.id,
      guid: curThis._line.guid,
    };
    curThis.checkguidsListLine.push(objCon);
    curThis._line.ground = nodeList[i].land;
    curThis._line.material.XbsjColorMaterial.color =
      nodeList[i].color.xeColor;
    curThis._line.width = parseInt(nodeList[i].width);
    curThis.guids.push([curThis._line.id, curThis._line.guid]);
    var str = nodeList[i].wkt;
    var str1 = str.slice(14, str.length - 1);
    var str2 = str1.split(",");
    var arr = [];
    for (var i = 0; i < str2.length; i++) {
      var str3 = str2[i].replace(/\s+/g, ",");
      var str4 = str3.split(",");
      var arr3 = [];
      for (var item in str4) {
        arr3.push(str4[item] * 1);
      }
      arr.push(arr3);
    }
    var cur1 = [];
    for (var j = 0; j < arr.length; j++) {
      cur1.push(arr[j].xeptr);
    }
    curThis._line.positions = cur1;
  }
}
//立方体
export function checkedCancelLifangti(nodeList, curThis, obj) {
  for (var i = 0; i < nodeList.length; i++) {
    var str = nodeList[i].wkt;
    curThis._polygon = new XE.Obj.Polygon(earth);
    //0524
    curThis.guidsLifangti.push(curThis._polygon.guid);
    var llifangtiArr = Array.from(new Set(curThis.guidsLifangti));
    llifangtiArr.forEach((item) => {
      curThis.allCheckedGUidsList.push(item);
    });
    curThis._polygon.id = obj.id;
    curThis._polygon.ground = nodeList[i].ground;
    curThis._polygon.outline.show = nodeList[i].show;
    curThis._polygon.extrudedHeight = nodeList[i].height;
    curThis._polygon.outline.width = nodeList[i].width;
    curThis._polygon.color = nodeList[i].color.xeColor;
    curThis._polygon.outline.color = nodeList[i].bcolor.xeColor;
    var objCon = {
      id: curThis._polygon.id,
      guid: curThis._polygon.guid,
    };
    curThis.Polygonguids.push([curThis._polygon.id, curThis._polygon.guid]);
    curThis.checkguidsListPolygon.push(objCon);
    var str1 = str.slice(12, str.length - 2);
    var str2 = str1.split("0.0000000000000000");
    var arr = [];
    for (var i = 0; i < str2.length; i++) {
      var str3 = str2[i].replace(/\s+/g, ",");
      if (i == 0) {
        var str3 = str2[i].replace(/\s+/g, ",");
        var str4 = str3.slice(0, str3.length - 1);
      } else {
        var str3 = str2[i].replace(/\s+/g, ",");
        var str4 = str3.slice(2, str3.length - 1);
      }
      arr.push(str4);
    }
    var final = [];
    for (var i = 0; i < arr.length; i++) {
      if (i !== arr.length - 1) {
        var a = arr[i].split(",");
        for (var j = 0; j < a.length; j++) {
          var b = parseFloat(a[j] * 1);
          final.push(b);
        }
      }
    }
    var radianList = [];
    for (var m = 0; m < final.length; m++) {
      radianList.push((final[m] / 180) * Math.PI);
    }
    curThis._polygon.positions = radianList;
  }
}
//一般点位
export function checkedCancelPubPin(nodeList, curThis, obj) {
  for (var i = 0; i < nodeList.length; i++) {
    curThis._PinPub = new XE.Obj.Pin(earth);
    curThis._PinPub.pointShow = false;
    curThis.guidsPin1.push(curThis._PinPub.guid);
    var pinArr = Array.from(new Set(curThis.guidsPin1));
    pinArr.forEach((item) => {
      curThis.allCheckedGUidsList.push(item);
    });
    curThis.pinId = obj.id;
    curThis.curPInID = obj.id;
    curThis.pinGUids.push([curThis.pinId, curThis._PinPub.guid]);
    var objCon = {
      id: curThis.pinId,
      guid: curThis._PinPub.guid,
    };
    curThis.checkguidsListPin.push(objCon);
    curThis._PinPub.position = nodeList[i].position;
    curThis._PinPub.enabled = true;
    curThis._PinPub.show = true;
    curThis._PinPub.pinBuilder.size = parseInt(nodeList[i].size) == 0 ? 1 : parseInt(nodeList[i].size);
    curThis._PinPub.pinBuilder.text = nodeList[i].content;
    curThis._PinPub.pinBuilder.extText = nodeList[i].text;
    curThis._PinPub.pinBuilder.extTextPixelOffset = [
      nodeList[i].left,
      nodeList[i].right,
    ];
    curThis._PinPub.pinBuilder.makiIcon = "";
  }
}
// 面
export function checkedCancelFace(nodeList, curThis, obj) {
  for (var i = 0; i < nodeList.length; i++) {
    var str = nodeList[i].wkt;
    curThis._face = new XE.Obj.Polygon(earth);
    curThis.guidsPolygon.push(curThis._face.guid);
    var polygonArr = Array.from(new Set(curThis.guidsPolygon));
    polygonArr.forEach((item) => {
      curThis.allCheckedGUidsList.push(item);
    });
    curThis._face.id = obj.id;
    var objCon = {
      id: curThis._face.id,
      guid: curThis._face.guid,
    };
    curThis.checkguidsListFace.push(objCon);
    curThis._face.ground = nodeList[i].ground;
    curThis._face.outline.show = nodeList[i].show;
    curThis._face.extrudedHeight = nodeList[i].height;
    curThis._face.outline.width = parseInt(nodeList[i].width);
    curThis._face.color = nodeList[i].color.xeColor;
    curThis._face.outline.color = nodeList[i].bcolor.xeColor;
    curThis.faceguids.push([curThis._face.id, curThis._face.guid]);
    var str1 = str.slice(12, str.length - 2);
    var str2 = str1.split("0.0000000000000000");
    var arr = [];
    for (var i = 0; i < str2.length; i++) {
      var str3 = str2[i].replace(/\s+/g, ",");
      if (i == 0) {
        var str3 = str2[i].replace(/\s+/g, ",");
        var str4 = str3.slice(0, str3.length - 1);
      } else {
        var str3 = str2[i].replace(/\s+/g, ",");
        var str4 = str3.slice(2, str3.length - 1);
      }
      arr.push(str4);
    }
    var final = [];
    for (var i = 0; i < arr.length; i++) {
      if (i !== arr.length - 1) {
        var a = arr[i].split(",");
        for (var j = 0; j < a.length; j++) {
          var b = parseFloat(a[j] * 1);
          final.push(b);
        }
      }
    }
    var radianList = [];
    for (var m = 0; m < final.length; m++) {
      radianList.push((final[m] / 180) * Math.PI);
    }
    curThis._face.positions = radianList;
  }
}
// OD线
export function checkedCancelODLine(nodeList, curThis, obj) {
  for (var i = 0; i < nodeList.length; i++) {
    curThis._ODline = new XE.Obj.Polyline(earth);
    //0524
    curThis.guidsODline1.push(curThis._ODline.guid);
    var ODlineArr = Array.from(new Set(curThis.guidsODline1));
    ODlineArr.forEach((item) => {
      curThis.allCheckedGUidsList.push(item);
    });
    curThis._ODline.id = obj.id;
    var objCon = {
      id: curThis._ODline.id,
      guid: curThis._ODline.guid,
    };
    curThis.checkguidsListODLine.push(objCon);
    curThis._ODline.material.XbsjODLineMaterial.color =
      nodeList[i].color.xeColor;
    curThis.ODLineGuids.push([curThis._ODline.id, curThis._ODline.guid]);
    // 材质
    if (nodeList[i].material === "sx") {
      curThis._ODline.material.type = "XbsjPolylineDashMaterial";
      curThis._ODline.material.XbsjPolylineDashMaterial.color =
        nodeList[i].color.xeColor;
      ("XbsjPolylineDashMaterial");
    } else if (nodeList[i].material === "jtx") {
      curThis._ODline.material.type = "XbsjPolylineArrowMaterial";
      curThis._ODline.material.XbsjPolylineArrowMaterial.color =
        nodeList[i].color.xeColor;
    } else if (nodeList[i].material === "gjx") {
      curThis._ODline.material.type = "XbsjODLineMaterial";
      curThis._ODline.material.XbsjODLineMaterial.color =
        nodeList[i].color.xeColor;
    }
    // 样式
    if (nodeList[i].style === "GE") {
      curThis._ODline.arcType = "GEODESIC";
    } else if (nodeList[i].style === "NO") {
      curThis._ODline.arcType = "NONE";
    } else if (nodeList[i].style === "RH") {
      curThis._ODline.arcType = "RHUMB";
    }
    curThis._ODline.ground = nodeList[i].land;
    curThis._ODline.loop = nodeList[i].link;
    curThis._ODline.width = nodeList[i].width;
    curThis._ODline.isSelected = false;
    var str = nodeList[i].wkt; //wkt
    var str1 = str.slice(14, str.length - 1);
    var str2 = str1.split(",");
    var arr = [];
    for (var i = 0; i < str2.length; i++) {
      var str3 = str2[i].replace(/\s+/g, ",");
      var str4 = str3.split(",");
      var arr3 = [];
      for (var item in str4) {
        arr3.push(str4[item] * 1);
      }
      arr.push(arr3);
    }
    var cur1 = [];
    for (var j = 0; j < arr.length; j++) {
      cur1.push(arr[j].xeptr);
    }
    curThis._ODline.positions = cur1;
    curThis._ODline.playing = true;
    curThis._ODline.duration = 100.0;
    curThis._ODline.id = obj.id;
  }
}
// 警员/警车
export function checkedCancelPolice(nodeList, curThis, obj) {
  earth.czm.viewer.scene.globe.depthTestAgainstTerrain = true;
  for (var i = 0; i < nodeList.length; i++) {
    if (nodeList[i].equipment !== null) {
      // 警员
      let x = nodeList[i].longtitude;
      let y = nodeList[i].altitude;
      var points = earth.czm.viewer.entities.add({
        id: obj.id,
        descriptionOfpolice: 'policeInformation',
        name: nodeList[i].name,
        tel: nodeList[i].phonenumber,
        equip: nodeList[i].equipment,
        pointTypeShow: "policePoint",
        longitude: x,
        latitude: y,
        height: nodeList[i].position[2],
        position: Cesium.Cartesian3.fromDegrees(x, y, nodeList[i].position[2]),
        billboard: {
          show: true,
          image: require("../../assets/imageBS/policePoint.png"),
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM
        },
      });
      console.log(points.position, '选中警员的位置坐标');
    } else if (nodeList[i].carType !== null) {
      // 警车
      var x = nodeList[i].longtitude;
      var y = nodeList[i].altitude;
      var points = earth.czm.viewer.entities.add({
        id: obj.id,
        descriptionOfpolice: 'policeInformation',
        policeCarId: nodeList[i].id,
        policeCarNumber: nodeList[i].name,
        policeCarType: nodeList[i].carType,
        pointTypeShow: "policeCarPoint",
        longitude: x,
        latitude: y,
        position: Cesium.Cartesian3.fromDegrees(x, y, nodeList[i].position[2]),
        billboard: {
          show: true,
          image: require("../../assets/imageBS/jingchedian.png"),
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM
        },
      });
    }
  }
}