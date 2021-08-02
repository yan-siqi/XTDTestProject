<template>
  <div class="modelContent">
    <div style="width: 100%; height: 100%">
                    <div ref="earthContainer" style="width: 100%; height: 100%">
                    </div>
                    <div class="box" style="position: absolute; left: 18px; top: 18px; color: white; background: rgba(0, 0, 0, 0.6); padding: 20px; border-radius: 25px;min-width:300px; font-size:24px; font-family: 宋体;">
                        <div class="defultbtn"  @click="flyToPylon()">电塔定位</div>
                        <div class="defultbtn"  @click="flyToWire()">电线定位</div>
                        <div class="defultbtn" :class="{'btnon':positionEditing}"  @click="positionEditing = !positionEditing">平移</div>
                        <div>
                            <label>电塔经度：</label><input type='text' v-model='xbsjPosition[0]'>°</input> 
                        </div>
                        <div>
                            <label>电塔纬度：</label><input type='text' v-model='xbsjPosition[1]'>°</input> 
                        </div>
                        <div>
                            <label>电塔高度：</label><input type='text' v-model='xbsjPosition[2]'>m</input>
                        </div>
                        <div>
                            <label>绝缘子挂接点相对X：</label><input type='text' v-model='insulator[0]'></input> 
                        </div>
                        <div>
                            <label>绝缘子挂接点相对Y：</label><input type='text' v-model='insulator[1]'></input> 
                        </div>
                        <div>
                            <label>绝缘子挂接点相对Z：</label><input type='text' v-model='insulator[2]'></input>
                        </div>
    
                    </div>
                </div>
  </div>
</template>

<script>
export default {
  name: "positionmatchcom",
  data() {
    return {
      positionEditing: false,
      rotationEditing: false,
      xbsjPosition: [0, 0, 0],
      insulator: [0.8, 5.8, 31],
      insulatorPosition: { longitude: 0, latitude: 0, height: 0 },
      insulatorRotation: {},
      insulatorScale: 0,
      contactPoint: [0, 0, 0],
      contactPointLine: [0, 0, 0],
      _earth: undefined,
      _model: undefined,
    };
  },
  methods: {
    flyToPylon() {
      this._model.flyTo();
    },
    flyToWire() {
      this._line.flyTo();
    },
    compute() {
      var r = XE.Tool.Math.ab2Ab(
        new Cesium.Cartesian3(0, 0, 0),
        new Cesium.Cartesian3(0, 0, 10),
        Cesium.Cartesian3.fromDegrees(
          this.xbsjPosition[0],
          this.xbsjPosition[1],
          this.xbsjPosition[2]
        ),
        Cesium.Cartesian3.fromDegrees(
          this.xbsjPosition[0],
          this.xbsjPosition[1],
          this.xbsjPosition[2] + 10
        )
      );

      if (!isNaN(this.insulatorPosition.longitude)) {
        var cartesian = {
          x: this.insulator[0],
          y: this.insulator[1],
          z: this.insulator[2],
        };
        var projectPoint = Cesium.Matrix4.multiplyByPoint(
          r.modelMatrix,
          cartesian,
          new Cesium.Cartesian3()
        );
        projectPoint = Cesium.Cartographic.fromCartesian(projectPoint);
        this._pin1.position[0] = projectPoint.longitude;
        this._pin1.position[1] = projectPoint.latitude;
        this._pin1.position[2] = projectPoint.height;

        var r2 = XE.Tool.Math.ab2Ab(
          new Cesium.Cartesian3(0, 0, -1.540082),
          new Cesium.Cartesian3(0, 0, 1.62862),
          Cesium.Cartesian3.fromRadians(
            this._pin1.position[0],
            this._pin1.position[1],
            this._pin1.position[2]
          ),
          Cesium.Cartesian3.fromRadians(
            this._pin2.position[0],
            this._pin2.position[1],
            this._pin2.position[2]
          )
        );

        this._model2.xbsjScale[2] = r2.scale;
        this._model2.xbsjPosition[0] = r2.positionInRadians.longitude;
        this._model2.xbsjPosition[1] = r2.positionInRadians.latitude;
        this._model2.xbsjPosition[2] = r2.positionInRadians.height;
        this._model2.xbsjRotation[0] = r2.hpr.heading;
        this._model2.xbsjRotation[1] = r2.hpr.pitch;
        this._model2.xbsjRotation[2] = r2.hpr.roll;

        this.insulatorPosition = r2.positionInDegrees;
        this.insulatorRotation = r2.hpr;
        this.insulatorScale = r2.scale;
      } else {
        this._model.xbsjRotation = [0, 0, 0];
        console.log(this.insulatorPosition.longitude);
      }
    },
    initWzmatch() {
      // 数据绑定
      var model1 = earth.sceneTree.$refs.model1.czmObject;
      this._model = model1;
      this._model2 = earth.sceneTree.$refs.model2.czmObject;
      var pin1 = earth.sceneTree.$refs.pin1.czmObject;
      this._pin1 = pin1;
      var pin2 = earth.sceneTree.$refs.pin2.czmObject;
      this._pin2 = pin2;
      this._line = earth.sceneTree.$refs.line.czmObject;

      earth.camera.position = [
        2.0313939158337986,
        0.6963882052359618,
        37.59368984403024,
      ];
      earth.camera.rotation = [
        2.609848767179005,
        -0.3729591726011434,
        0.0017965861104354275,
      ];

      // this._model.flyTo();
      this._pin2.position[0] = this._line.positions[0][0];
      this._pin2.position[1] = this._line.positions[0][1];
      this._pin2.position[2] = this._line.positions[0][2];
      this._positionEditingUnbind = XE.MVVM.bind(
        this,
        "positionEditing",
        model1,
        "positionEditing"
      );
      this._xbsjPositionUnbind = XE.MVVM.bindPosition(
        this,
        "xbsjPosition",
        model1,
        "xbsjPosition"
      );
      this._xbsjPositionUnbind = XE.MVVM.bindPosition(
        this,
        "contactPointLine",
        pin2,
        "position"
      );

      // 设置初始值
      earth.terrainEffect.subSurfaceEnabled = false;
      earth.terrainEffect.surfaceOpacity = 0.0;
    },
  },
  mounted() {},
  beforeDestroy() {},
};
</script>

<style lang="less" scoped>
.modelContent {
  position: absolute;
  right: 0;
  bottom: 0;
}
</style>
