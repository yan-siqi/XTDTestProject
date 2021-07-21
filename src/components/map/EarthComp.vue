<template>
  <div style="width: 100%; height: 100%">
    <div ref="earthContainer" style="width: 100%; height: 100%"></div>
  </div>
</template>

<script>
/* eslint-disable */
import earthGlobal from "@/global/earth/earthutils.js";
import Json from "../../../public/scene.json";
function createEarth(comp) {
  // 1.1.1 创建地球
  var earth = new XE.Earth(comp.$refs.earthContainer);

  // 1.1.2 添加默认地球影像
  earth.sceneTree.root = {
    children: [
      {
        czmObject: {
          name: "地球",
          xbsjType: "Imagery",
          xbsjImageryProvider: {
            createTileMapServiceImageryProvider: {
              url: XE.HTML.cesiumDir + "Assets/Textures/NaturalEarthII",
              fileExtension: "jpg",
            },
            type: "createTileMapServiceImageryProvider",
          },
        },
      },
      {
        czmObject: {
          xbsjType: "Imagery",
          xbsjGuid: "b9349c59-3a8b-42e3-b7d4-2dba126f405a",
          name: "beijing_image",
          rectangle: [
            2.0144041356824007,
            0.6883833591808336,
            2.050903836155496,
            0.7166187990692222,
          ],
          xbsjImageryProvider: {
            XbsjImageryProvider: {},
            UrlTemplateImageryProvider: {},
            WebMapServiceImageryProvider: {},
            WebMapTileServiceImageryProvider: {
              url:
                "http://192.168.0.224:9090/geowebcache/service/wmts/rest/beijing_image/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}?format=image/png",
              format: "image/png",
              layer: "beijing_image",
              style: "[object Object]",
              tileMatrixSetID: "EPSG:4326_beijing_image",
              tileMatrixLabels: [
                "EPSG:4326_beijing_image:1",
                "EPSG:4326_beijing_image:2",
                "EPSG:4326_beijing_image:3",
                "EPSG:4326_beijing_image:4",
                "EPSG:4326_beijing_image:5",
                "EPSG:4326_beijing_image:6",
                "EPSG:4326_beijing_image:7",
                "EPSG:4326_beijing_image:8",
                "EPSG:4326_beijing_image:9",
                "EPSG:4326_beijing_image:10",
                "EPSG:4326_beijing_image:11",
                "EPSG:4326_beijing_image:12",
                "EPSG:4326_beijing_image:13",
                "EPSG:4326_beijing_image:14",
                "EPSG:4326_beijing_image:15",
                "EPSG:4326_beijing_image:16",
                "EPSG:4326_beijing_image:17",
                "EPSG:4326_beijing_image:18",
              ],
              tilingScheme: "Geographic",
              maximumLevel: 17,
            },
            ArcGisMapServerImageryProvider: {},
            createTileMapServiceImageryProvider: {},
            type: "WebMapTileServiceImageryProvider",
          },
        },
      },
    ],
  };
  // earth.camera.navigator.showCompass=true;//开启指南针
  comp._earth = earth;
  earth.sceneTree.root.children.push(Json);
  earthGlobal.earthcesium.earth = earth;
  earthGlobal.earthmaptool.setearth(earthGlobal.earthcesium);
  //comp.$root._earth = earth;
  earthGlobal.earthcesium.earth = earth;
  earthGlobal.earthmaptool.setearth(earthGlobal.earthcesium);
  window.earth = earth;
}

function createCesium(comp) {
  window.viewer = new Cesium.Viewer(comp.$refs.earthContainer);
}

// 1 创建Earth的vue组件
var EarthComp = {
  data() {
    return {
      //_earth: undefined,
      // 注意：Earth和Cesium的相关变量放在vue中，必须使用下划线作为前缀！
      _bgImagery: undefined,
      _ksdh: new Map(),
      timer: null,
    };
  },
  // 1.1 资源创建
  mounted() {
    if (typeof XE !== "undefined") {
      createEarth(this);
    } else if (typeof Cesium !== "undefined") {
      createCesium(this);
    }
    this.$nextTick(() => {
      //0606
      // this._earth.xbsjFromJSON(Json);
      this.sceneloaded();
      //  this.tileschange();
    });
  },
  methods: {
    //场景加载完成
    sceneloaded() {
      earthGlobal.earthmaptool.initearth();
    },
    tileschange() {
      var kf = earth.sceneTree.$refs.five_one_four.czmObject._tileset;
      var that = this;

      kf.tileLoad.addEventListener(function (tile) {
        that.processTileFeatures(tile, null);
      });

      window.weibutiaoshi = that._data._ksdh;
      // console.log(that._ksdh);
      console.log(kf);
      // 隔5米座位席变颜色
      if (that._data._ksdh != null) {
        setInterval(() => {
          //     console.log("1111111111111111111111");
          if (this._data._ksdh.get("1-1") != null) {
            this._data._ksdh.get("1-1").setProperty("status", 1);
          }
        }, 10000);
      }
    },
    processTileFeatures(tile, callback) {
      //Cesium3DTile
      var content = tile.content;
      var featuresLength = content.featuresLength;
      if (featuresLength > 0) {
        for (var i = 0; i < featuresLength; i++) {
          var feature = content.getFeature(i);
          var featureName = feature.getPropertyNames();
          var ids = feature.getProperty("sitenum");
          this._data._ksdh.set(ids, feature);
        }
      }
    },
  },
  // 1.2 资源销毁
  beforeDestroy() {
    // vue程序销毁时，需要清理相关资源
    this._earth = this._earth && this._earth.destroy();
  },
};

export default EarthComp;
</script>
