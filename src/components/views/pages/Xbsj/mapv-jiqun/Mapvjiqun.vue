<template>
  <div></div>
</template>

<script>
export default {
  name: "mapvjq",
  data() {
    return {
      timmer: null, // 设置定时器
    };
  },
  methods: {
    startup() {
      var that = this;
      this.timmer = setTimeout(function() {
        var viewer = that.$parent.$parent._earth.czm.viewer;
        viewer.imageryLayers.addImageryProvider(
          new Cesium.UrlTemplateImageryProvider({
            url: "http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
            subdomains: ["a", "b", "c", "d", "e"],
          })
        );
        viewer.camera.setView({
          destination: Cesium.Cartesian3.fromDegrees(
            -102.17609405517578,
            34.41583177128595,
            5000000
          ),
        });

        var randomCount = 300;
        var data = [];
        while (randomCount--) {
          data.push({
            // 点数据
            geometry: {
              type: "Point",
              coordinates: [
                -125.8 + Math.random() * 50,
                30.3 + Math.random() * 20,
              ],
            },
            count: 30 * Math.random(),
          });
        }
        var dataSet = new mapv.DataSet(data);
        var options = {
          fillStyle: "#fa8b2e", // 填充颜色
          strokeStyle: "#fff", // 边框颜色
          label: {
            // 是否显示文字标签
            show: true,
          },
          draw: "cluster",
        };

        var mapvLayer = XE.mixins.mapVLayer(viewer, dataSet, options);
      }, 10000);
    },
  },
  mounted() {
      this.startup()
  },
  beforeDestroy() {},
};
</script>

<style lang="less" scoped></style>
