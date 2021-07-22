<template>
  <div></div>
</template>

<script>
export default {
  name: "mapvheatmapcom",
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
        viewer.imageryLayers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
                url: 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
                subdomains: ['a', 'b', 'c', 'd', 'e'],
            }));
            viewer.camera.setView({
                destination: Cesium.Cartesian3.fromDegrees(-102.17609405517578, 34.41583177128595, 5000000)
            });

            var randomCount = 300;
            var data = [];
            while (randomCount--) {
                data.push({
                    // 点数据
                    geometry: {
                        type: 'Point',
                        coordinates: [-125.8 + Math.random() * 50, 30.3 + Math.random() * 20]
                    },
                    count: 30 * Math.random()
                });
            }

            var dataSet = new mapv.DataSet(data);

            var options = {
                fillStyle: 'rgba(255, 250, 50, 0.8)', // 填充颜色
                globalCompositeOperation: "lighter", // 颜色叠加方式
                maxSize: 10, // 显示的圆最大半径大小
                max: 30, // 数值最大值范围
                shadowBlur: 30, // 投影模糊级数
                shadowColor: 'rgba(255, 250, 50, 1)', // 投影颜色
                draw: 'bubble' // 用不同大小的圆来展示
            }

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
