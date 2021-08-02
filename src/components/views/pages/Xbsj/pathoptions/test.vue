<template>
  <div class="pathEditContainer">
    <div
      style="width: 100%; height: 100%"
      @click="(raise = false), (reduce = false)"
    >
      <div ref="earthContainer" style="width: 100%; height: 100%"></div>
      <div
        class="box"
        style="
          position: absolute;
          left: 18px;
          top: 18px;
          color: white;
          background: rgba(0, 0, 0, 0.6);
          padding: 20px;
          border-radius: 25px;
          min-width: 200px;
          font-size: 24px;
          font-family: 宋体;
        "
      >
        <div
          class="defultbtn"
          :class="{ btnon: creating }"
          @click="creating = !creating"
        >
          创建
        </div>
        <div
          class="defultbtn"
          style="margin-left: 20px"
          :class="{ btnon: editing }"
          @click="editing = !editing"
        >
          编辑
        </div>
        <div
          class="defultbtn"
          style="margin-left: 20px"
          @click.stop="clickraise"
        >
          抬高
        </div>
        <div
          class="defultbtn"
          style="margin-left: 20px"
          @click.stop="clickreduce"
        >
          降低
        </div>
        <br />
        <hr />
        <div class="setbox" style="margin-top: 5px">
          <Tooltip
            max-width="200"
            content="平滑过渡：对首末两个相机之间的相机自动进行插值处理，这样可以做到自动进行相机姿态的平滑。操作方法：点击下拉框根据相机编号选择要进行平滑过渡的首末两个相机，再点击设置按钮就可以做到相机姿态的平滑。注意：首个相机的编号务必要小于末个相机的编号"
          >
            <button style="width: 200px">平滑过渡</button> </Tooltip
          ><br />
          <span>首个相机：</span>
          <Select v-model="previous" style="width: 60px">
            <Option v-for="item in previousArr" :value="item" :key="item">{{
              item
            }}</Option>
          </Select>
          <span>末个相机：</span>
          <Select v-model="next" style="width: 60px">
            <Option v-for="item in nextArr" :value="item" :key="item">{{
              item
            }}</Option>
          </Select>
          <div class="defultbtn" style="margin-left: 20px" @click="set">
            设置
          </div>
          <br />
          <hr />
          <Tooltip
            max-width="300"
            content="沿着路径方向：自动沿路径计算相机的姿态。注意：如果不选择相机，将会修改所有相机的姿态。操作方法：点击下拉框选择相机编号，再点击确定按钮即可。"
          >
            <button style="width: 300px">沿着路径方向</button> </Tooltip
          ><br />
          <span>选择目标：</span
          ><Select
            v-model="selectArr1"
            multiple
            style="
              width: 276px;
              display: inline-block;
              color: black;
              background: white;
            "
          >
            <Option v-for="item in previousArr" :value="item" :key="item">{{
              item
            }}</Option>
          </Select>
          <div
            class="defultbtn"
            style="margin-left: 20px"
            @click="alongThePath"
          >
            确定
          </div>
          <br />
          <hr />
          <Tooltip
            max-width="200"
            content="相机指向：将相机的方向指向目标点所在位置。操作方法：点击目标点按钮来确定目标点所在位置，点击下拉框选择要进行操作的相机，再点击确定按钮即可将选择的相机方向指向目标点。注意：如果不选择相机将会将所有相机指向目标点，如果不选择目标点将会指向默认位置。"
          >
            <button>相机指向</button><br /> </Tooltip
          ><br />
          <span>选择目标：</span
          ><Select
            v-model="arr"
            multiple
            style="
              width: 170px;
              display: inline-block;
              color: black;
              background: white;
            "
          >
            <Option v-for="item in previousArr" :value="item" :key="item">{{
              item
            }}</Option>
          </Select>
          <div
            class="defultbtn"
            style="margin-left: 10px"
            @click="setdirection"
          >
            目标点
          </div>
          <div class="defultbtn" style="margin-left: 10px" @click="ok">
            确定
          </div>
          <br />
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
    };
  },
  methods: {
    // 初始化
    initPathEdit() {
      var path1 = earth.sceneTree.$refs.ljdh.czmObject;
      var pin = new XE.Obj.Pin(earth);
      var ps = path1.positions.map((e, i) => {
        var pin = new XE.Obj.Pin(earth);
        pin.position = e;
        pin.pinBuilder.text = "" + i;
        return pin;
      });

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
      this.raise = true;
      this.reduce = false;
      // 同时给所有关键点增加高度
      path1.addHeight(10);
    },
    // 降低相机路径，每次减10
    clickreduce() {
      this.reduce = true;
      this.raise = false;
      // 同时给所有关键点增加高度
      path1.addHeight(-10);
    },
    alongThePath() {
      if (this.selectArr1.length === 0) {
        // directionAlongThePath(includeIndex)
        // 自动沿路径计算关键点的姿态
        // 注意：如果不设置参数，从修改所有关键点的姿态
        // includeIndex是一个数组，囊括所有需要计算的关键点的索引。
        path1.directionAlongThePath();
      } else {
        // var selectNumArr1 = this.selectArr1.map(Number);
        path1.directionAlongThePath(this.selectArr1);
      }
    },
    set() {
      // directionLerpBetween(first, last)
      // 根据索引值为first和last的关键点的姿态，对first和last之间的关键点自动进行插值处理。
      // 注意：first务必小于last
      path1.directionLerpBetween(this.previous, this.next);
    },
    ok() {
      this.position = [...pin.position];
      if (this.arr.length === 0) {
        // targetTo(target, includeIndex)
        // 将所有关键点的方向指向target所在位置
        // target用来表示观察位置，包含三个元素的数组，分别表示经度、纬度、高度
        // includeIndex索引数组，如果有值，则指只处理includeIndex有的索引，如果无值，则全部处理
        path1.targetTo(this.position);
      } else {
        // var arrnum = this.arr.map(Number);
        path1.targetTo(this.position, this.arr);
      }
    },
    setdirection() {
      pin.creating = true;
      pin.pinBuilder.text = "目标点";
      pin.pinBuilder.size = 80;
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
.pathEditContainer {
  position: absolute;
  right: 0;
  bottom: 0;
}
</style>