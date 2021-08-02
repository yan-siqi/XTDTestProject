<template>
  <div class="pathEditContainer">
    <div
      style="width: 100%; height: 100%"
      @click.stop="(raise = false), (reduce = false)"
    >
      <div class="mainOption">
        <div class="section1">
          <el-button type="primary" size="small" @click="creating = !creating"
            >创建</el-button
          >
          <el-button type="success" size="small" @click="editing = !editing"
            >编辑</el-button
          >
          <el-button type="info" size="small" @click.stop="clickraise"
            >抬高</el-button
          >
          <el-button type="danger" size="small" @click.stop="clickreduce"
            >降低</el-button
          >
        </div>
        <div class="seccion2">
          <el-tooltip placement="top-start">
            <!--  <div slot="content">
              平滑过渡：对首末两个相机之间的相机自动进行插值处理,这样可以做到自动进行相机姿态的平滑。<br />操作方法：点击下拉框根据相机编号选择要进行平滑过渡的首末两个相机，再点击设置按钮就可以做到相机姿态的平滑。<br />注意：首个相机的编号务必要小于末个相机的编号
            </div> -->
            <header class="header">平滑过渡</header>
          </el-tooltip>
          <el-row class="phgd">
            <el-col :span="9">
              <span>首个相机:</span>
              <el-select v-model="previous">
                <el-option
                  v-for="item in previousArr"
                  :key="item"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="9">
              <span>末个相机:</span>
              <el-select v-model="next">
                <el-option
                  v-for="item in nextArr"
                  :key="item"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="2">
              <el-button type="primary" style="margin-top: 30px" @click="set"
                >设置</el-button
              >
            </el-col>
          </el-row>
        </div>
        <div class="section3">
          <el-tooltip placement="top-start">
            <!-- <div slot="content">
              沿着路径方向：自动沿路径计算相机的姿态。<br />注意：如果不选择相机，将会修改所有相机的姿态。<br />操作方法：点击下拉框选择相机编号，再点击确定按钮即可。
            </div> -->
            <header class="header">沿着路径方向</header>
          </el-tooltip>
          <el-row class="phgd">
            <el-col :span="20">
              <span>选择目标:</span>
              <el-select v-model="selectArr1" multiple>
                <el-option
                  v-for="item in previousArr"
                  :key="item"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="2">
              <el-button type="primary" @click="alongThePath">确定</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="section4">
          <el-tooltip placement="top-start">
            <!-- <div slot="content">
              相机指向：将相机的方向指向目标点所在位置。<br />操作方法：点击目标点按钮来确定目标点所在位置，点击下拉框选择要进行操作的相机，再点击确定按钮即可将选择的相机方向指向目标点。<br />注意：如果不选择相机将会将所有相机指向目标点，如果不选择目标点将会指向默认位置。
            </div> -->
            <header class="header">相机指向</header>
          </el-tooltip>
          <el-row class="phgd">
            <el-col :span="24">
              <span>选择目标:</span>
              <el-select v-model="arr" multiple>
                <el-option
                  v-for="item in previousArr"
                  :key="item"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row style="margin-top: 15px">
            <el-col :span="12" :offset="0">
              <el-button
                type="primary"
                style="margin-right: 30px"
                @click="setdirection"
                >目标点</el-button
              >
            </el-col>
            <el-col :span="1" :offset="7">
              <el-button type="primary" style="margin-right: 30px" @click="ok"
                >确定</el-button
              >
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "pathEditcom",
  data() {
    return {
      _earth: undefined, // 注意：Earth和Cesium的相关变量放在vue中，必须使用下划线作为前缀！
      _pin: undefined,
      // 是否处于创建状态
      // 设置为true以后，将进入重新创建的状态；此时可以使用鼠标左键在三维窗口中点击来创建路径的关键点，当点击鼠标右键，则表示创建完成。此时该属性会自动变成false。
      creating: false,
      // 是否处于编辑状态
      // 设置为true以后，将进入重新创建的状态；此时可以使用鼠标左键在三维窗口中选取需要修改路径的关键点，当点击鼠标右键，则表示编辑完成。此时该属性会自动变成false。
      editing: false,
      raise: false,
      reduce: false,
      previous: 0,
      next: 0,
      previousArr: [],
      nextArr: [],
      selectArr1: [],
      arr: [],
      position: [],
      currentCamera: "",
      curPosition: [],
      allPinguids: [],
      timmer: null, // 设置定时器
    };
  },
  methods: {
    // 初始化
    initPathEdit() {
      var path1 = window.earth.sceneTree.$refs.path1.czmObject;
      var pin = new XE.Obj.Pin(earth);
      var ps = path1.positions.map((e, i) => {
        var pin = new XE.Obj.Pin(earth);
        pin.position = e;
        pin.pinBuilder.text = "" + i;
        return pin;
      });
      // 绑定的相机位置
      earth.camera.position = [
        1.901703273472499,
        0.5971739421771012,
        965.6307343927805,
      ];
      earth.camera.rotation = [
        1.758593271006248e-13,
        -0.7854502059287727,
        6.283185307179586,
      ];
      var cameraLength = path1.positions.length;
      for (var i = 0; i < cameraLength; i++) {
        this.previousArr.push(i);
        this.nextArr.push(i);
      }
      this._creatingUnbind = XE.MVVM.bind(this, "creating", path1, "creating");
      this._editingUnbind = XE.MVVM.bind(this, "editing", path1, "editing");

      this._earth = window.earth;
    }, // 抬高相机路径，每次加10
    clickraise() {
      var path1 = window.earth.sceneTree.$refs.path1.czmObject;
      this.raise = true;
      this.reduce = false;
      // 同时给所有关键点增加高度
      path1.addHeight(10);
    },
    // 降低相机路径，每次减10
    clickreduce() {
      var path1 = window.earth.sceneTree.$refs.path1.czmObject;
      this.reduce = true;
      this.raise = false;
      // 同时给所有关键点增加高度
      path1.addHeight(-10);
    },
    alongThePath() {
      if (this.selectArr1.length === 0) {
        var path1 = window.earth.sceneTree.$refs.path1.czmObject;
        // directionAlongThePath(includeIndex)
        // 自动沿路径计算关键点的姿态
        // 注意：如果不设置参数，从修改所有关键点的姿态
        // includeIndex是一个数组，囊括所有需要计算的关键点的索引。
        path1.directionAlongThePath();
      } else {
        var path1 = window.earth.sceneTree.$refs.path1.czmObject;
        // var selectNumArr1 = this.selectArr1.map(Number);
        path1.directionAlongThePath(this.selectArr1);
      }
    },
    set() {
      var path1 = window.earth.sceneTree.$refs.path1.czmObject;
      // directionLerpBetween(first, last)
      // 根据索引值为first和last的关键点的姿态，对first和last之间的关键点自动进行插值处理。
      // 注意：first务必小于last
      path1.directionLerpBetween(this.previous, this.next);
    },
    ok() {
      let that = this;
      setTimeout(function () {
        console.log(that.curPosition);
        if (that.arr.length === 0) {
          var path1 = window.earth.sceneTree.$refs.path1.czmObject;
          // targetTo(target, includeIndex)
          // 将所有关键点的方向指向target所在位置
          // target用来表示观察位置，包含三个元素的数组，分别表示经度、纬度、高度
          // includeIndex索引数组，如果有值，则指只处理includeIndex有的索引，如果无值，则全部处理
          path1.targetTo(that.curPosition);
        } else {
          var path1 = window.earth.sceneTree.$refs.path1.czmObject;
          // var arrnum = this.arr.map(Number);
          path1.targetTo(that.curPosition, that.arr);
        }
      }, 10000);
      //console.log(this.curPosition, "当前点的位置");
    },
    setdirection() {
      this.curPosition = [];
      if (this.allPinguids.length == 0) {
        console.log(11);
        var pin = new XE.Obj.Pin(window.earth);
        pin.creating = true;
        pin.pinBuilder.text = "目标点";
        pin.pinBuilder.size = 80;
        this.allPinguids.push(pin.xbsjGuid);
        let that = this;
        setTimeout(function () {
          that.curPosition = [...pin.position];
          console.log(that.curPosition);
        }, 5000);
        this.curPosition = [...pin.position];
        // console.log(this.curPosition, "手动创建点位");
      } else {
        this.allPinguids.forEach((item) => {
          if (window.earth.getObject(item)) {
            window.earth.getObject(item).destroy();
          }
        });
        var pin = new XE.Obj.Pin(earth);
        pin.creating = true;
        pin.pinBuilder.text = "目标点";
        pin.pinBuilder.size = 80;
        console.log(pin);
        this.allPinguids.push(pin.xbsjGuid);
        let that = this;
        setTimeout(function () {
          that.curPosition = [...pin.position];
          console.log(that.curPosition);
        }, 5000);
      }
    },
  },
  mounted() {
    this.initPathEdit();
  },
  beforeDestroy() {
    // vue程序销毁时，需要清理相关资源
    this._creatingUnbind = this._creatingUnbind && this._creatingUnbind();
    this._editingUnbind = this._editingUnbind && this._editingUnbind();
    this._earth = this._earth && this._earth.destroy();
    this._uw = this._uw && this._uw();
  },
};
</script>

<style lang='less' scoped>
html,
body {
  overflow-x: hidden;
  overflow-y: auto;
}

.pathEditContainer {
  position: absolute;
  right: -400px;
  top: -300px;
  width: 390px;
  height: 419px;
  background-color: pink;
  .mainOption {
    width: 350px;
    height: 100%;
    .section1 {
      width: 100%;
      height: 35px;
      border-bottom: 1px solid #000;
    }
    .seccion2 {
      height: 120px;
      border-bottom: 1px solid #000;
      .header {
        color: #333;
      }
      .phgd {
        color: blue;
      }
    }
    .section3 {
      height: 80px;
      border-bottom: 1px solid #000;
      .header {
        color: #333;
      }
      .phgd {
        color: blue;
      }
    }
    .section4 {
      height: 180px;
      border-bottom: 1px solid #000;
      .header {
        color: #333;
      }
      .phgd {
        color: blue;
      }
    }
  }
}
</style>