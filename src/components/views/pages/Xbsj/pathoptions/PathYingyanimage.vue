<template>
  <div class="pathYingyancom">
    <div>
      <div ref="earthContainer" style="width: 100%; height: 100%"></div>
      <header style="color: #000">相机运动视图</header>
      <div
        class="defultbtn"
        :class="{ btnon: playing }"
        @click="playing = !playing"
        style="color: #000"
      >
        路径播放
      </div>
    </div>
    <div class="section1">
      <div ref="earthContainer2" style="width: 100%; height: 100%"></div>
      <div style="color: #000">高空俯视视图</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "pathyingyantu",
  data() {
    return {
      _earth: undefined,
      _earth2: undefined,
      playing: true,
    };
  },
  filters: {
    numFilter(value) {
      // 截取当前数据到小数点后两位
      let realVal = parseFloat(value).toFixed(2);
      return realVal;
    },
  },
  methods: {
    // 场景资源初始化
    initImagry() {
      let earth = window.earth;
      var path1 = earth.sceneTree.$refs.path1.czmObject;
      // 1.1.3 设置相机位置
      // earth.camera.position.toString()和earth.camera.toAllJSONStr()这两个方法可获取相机位置
      earth.camera.position = [
        1.9016859135352737,
        0.5971488635785961,
        1114.657560131578,
      ];
      earth.camera.rotation = [
        6.283185307179421,
        -0.7855578455379368,
        6.283185307179586,
      ];
      var path1 = earth.sceneTree.$refs.path11.czmObject;
      const pin1 = new XE.Obj.Pin(earth);
      // 单向绑定的属性，pin将跟踪path1，但pin发生变化path1并不会跟踪！
      this._pin1Unbind = XE.MVVM.track(
        pin1,
        "position",
        path1,
        "currentPosition"
      );
      this._playingUnbind = XE.MVVM.bind(this, "playing", path1, "playing");
      var earth2 = new XE.Earth(this.$refs.earthContainer2);
      // 2.1.2 场景配置
      earth2.sceneTree.root = {
        expand: true,
        title: "预览场景",
        children: [
          {
            ref: "path2",
            czmObject: {
              xbsjType: "Path",
              positions: [
                [1.9016746584889261, 0.5972140444354529, 540.3422462577171],
                [1.9017267341518718, 0.5972133503414322, 520.1137699152557],
                [1.9017257997179968, 0.5972736030398242, 528.3876170108886],
                [1.9016747349263112, 0.5972754003153069, 521.087861389408],
              ],
              rotations: [
                [6.868275118748086, -0.2742692911775144, 0.0016584301080495578],
                [5.703866308921896, -0.19385405041989068, 6.281509509407803],
                [3.8005195675504133, -0.2597408290639396, 6.281339310424716],
                [2.501667530825695, -0.2173829253288364, 0.001819016773946025],
              ],
              show: true, // 显示路径
              loop: true, // 环形
              showDirection: false, // 显示方向(默认为true)
              // 是否处于播放状态
              // 如果属性值为true，则所有'current'开头的相关属性会动态发生变化。 可以通过手动设置为false，来结束播放状态。 当loopPlay属性为false时，playing属性会在路径播放到最后一个关键点的位置时，自动变为false。
              playing: true,
              // 是否循环播放
              // 如果为false，则playing设置为true时，会从当前位置播放到最后一个关键点，并停止播放，此时playing属性会自动变成false。 若此属性为true时，播放到最后一个关键点以后，将自动重第一个关键点继续播放。
              loopPlay: true,
            },
          },
          {
            czmObject: {
              name: "默认影像",
              xbsjType: "Imagery",
              xbsjImageryProvider: XE.Obj.Imagery.defaultImageryProviderConfig,
            },
          },
        ],
      };
      var tileset2 = earth2.sceneTree.$refs.tileset2.czmObject;
      var path2 = earth2.sceneTree.$refs.path2.czmObject;

      // 2.1.3 设置相机位置
      // earth.camera.position.toString()和earth.camera.toAllJSONStr()这两个方法可获取相机位置
      earth2.camera.position = [
        1.9016997564877027,
        0.5972461950379998,
        1383.5728918822476,
      ];
      earth2.camera.rotation = [8.881784197001252e-16, -1.5707963267948966, 0];

      // 定义一个pin用来跟踪路径
      const pin2 = new XE.Obj.Pin(earth2);
      pin2.pinBuilder.size = 16;

      // 2.1.4 跟踪
      // 单向绑定的属性，pin2将跟踪pin1，但pin2发生变化pin1并不会跟踪！
      // currentPosition 当前相机位置，形式如：[0, 0, 0] 该数组中的元素分别表示经度（单位弧度）、纬度（单位弧度）、高度（单位米）。 注意该属性，为只读属性！
      this._pin2Unbind = XE.MVVM.track(pin2, "position", pin1, "position");
    },
  },
  mounted() {
    this.initImagry();
  },
  beforeDestroy() {
    // vue程序销毁时，需要清理相关资源
    this._earth = this._earth && this._earth.destroy();
    this._pin1Unbind = this._pin1Unbind && this._pin1Unbind();
    this._playingUnbind = this._playingUnbind && this._playingUnbind();
    this._pin2Unbind = this._pin2Unbind && this._pin2Unbind();
    this._earth2 = this._earth2 && this._earth2.destroy();
  },
};
</script>

<style lang='less' scoped>
.pathYingyancom {
  position: absolute;
  right: -300px;
  top: 0;
  width: 300px;
  height: 200px;
  background-color: aquamarine;
  padding: 20px;
  box-sizing: border-box;
  input {
    width: 350px;
  }

  .checkbox {
    display: inline-block;
    margin: 5px 0;
    cursor: pointer;
  }

  .fly {
    width: 20px;
    height: 16px;
  }

  .defultbtn {
    display: inline-block;
    text-align: center;
    min-width: 60px;
    height: 38px;
    padding: 0 10px;
    line-height: 38px;
    border-radius: 100px;
    border: 1px solid #c9c9c9;
    background-color: #fff;
    color: #000;
    cursor: pointer;
    margin-top: 5px;
  }

  .btnon {
    background-color: #1e9fff;
    color: #fff;
    border: 1px solid #1e9fff;
  }
  .section1 {
    position: fixed;
    right: 0px;
    bottom: 0px;
    width: 350px;
    height: 350px;
  }
}
</style>