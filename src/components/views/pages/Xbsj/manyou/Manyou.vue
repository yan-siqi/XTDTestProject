<template>
  <div class="xbsjTestpagesty">
    <div style="width: 100%; height: 100%">
      <div ref="earthContainer" style="width: 100%; height: 100%"></div>
      <div
        class="box"
        style="position: absolute; left: 18px; top: 18px; color: white; background: rgba(0, 0, 0, 0.6); padding: 20px; border-radius: 25px;min-width:200px; font-size:24px; font-family: 宋体;"
      >
        <div class="defultbtn" @click="ghostMode = !ghostMode">浸入模式</div>
        <div
          class="defultbtn"
          :class="{ btnon: enabled }"
          @click="enabled = !enabled"
        >
          键盘漫游
        </div>
        <div class="defultbtn" @click="clickkeynoteHelp">
          按键说明
        </div>
        <br />
        <div v-show="keynoteHelpShow" style="margin-top:10px">
          <table border="1" cellpadding="0" cellspacing="0">
            <tr>
              <th colspan="2">键盘按键说明</th>
            </tr>
            <tr v-for="(value, index) in shortcutkeys" :key="index">
              <td>{{ value.key }}</td>
              <td>{{ value.value }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "manyoucom",
  data() {
    return {
      timer: null, // 定义定时器
      ghostMode: false, // 控制浸入模式的开启与关闭，默认为关闭
      enabled: true, // 控制键盘漫游的开启与关闭，默认为开启
      keynoteHelpShow: true,
      shortcutkeys: [
        {
          key: "W(↑)",
          value: "水平方向前进",
        },
        {
          key: "A(←)",
          value: "水平方向左移",
        },
        {
          key: "S(↓)",
          value: "水平方向后退",
        },
        {
          key: "D(→)",
          value: "水平方向右移",
        },
        {
          key: "SHIFT + W(↑)",
          value: "视线方向前进",
        },
        {
          key: "SHIFT + S(↓)",
          value: "视线方向后退",
        },
        {
          key: "Q",
          value: "向左旋转",
        },
        {
          key: "E",
          value: "向右旋转",
        },
        {
          key: "R",
          value: "视点抬高",
        },
        {
          key: "F",
          value: "视点降低",
        },
        {
          key: "1",
          value: "减速（默认速度的基础上*0.8）",
        },
        {
          key: "2",
          value: "恢复默认速度",
        },
        {
          key: "3",
          value: "提速（默认速度的基础上*1.2）",
        },
        {
          key: "4",
          value: "切换 固定速度模式/自动速度模式",
        },
      ],
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
    initearth() {
      var that = this;
      this.timer = setTimeout(function() {
        // 资源加载缓慢 设置定时器
        console.log("初始化地球", that.$parent.$parent._earth);
        let earthcur = that.$parent.$parent._earth;
        // 双向绑定的属性，如果一方发生变化，另一方同样会跟随变化
        that._ghostModeUnbind = XE.MVVM.bind(
          that,
          "ghostMode",
          earthcur.camera.immersion,
          "ghostMode"
        );
        that._enabledUnbind = XE.MVVM.bind(
          that,
          "enabled",
          earthcur.camera.immersion,
          "enabled"
        );
      }, 10000);
      // 初始化地球数据
    },
    clickkeynoteHelp(){
      // 点击按键说明
      this.keynoteHelpShow = !this.keynoteHelpShow
      console.log('按键说明是否可以被点击');
    }
  },
  mounted() {
    this.initearth();
  },
  // 1.2 资源销毁
  beforeDestroy() {
    // vue程序销毁时，需要清理相关资源
    this._ghostModeUnbind = this._ghostModeUnbind && this._ghostModeUnbind();
    this._enabledUnbind = this._enabledUnbind && this._enabledUnbind();
    this._earth = this._earth && this._earth.destroy();
  },
};
</script>

<style lang="less" scoped>
.xbsjTestpagesty{
  pointer-events: auto;
  position: absolute;
  right:0;
  bototm:0;
}
</style>
