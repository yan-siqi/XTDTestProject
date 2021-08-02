<template>
  <div class="headerV" id="headid">
    <div class="left">
      <div
        class="informationSample"
        @click="toInformationSampling"
        :style="{ color: curxinxiColor }"
      >
        XE练习测试
        <img
          v-if="isdianji"
          src="../../assets/imageBS/titleweidianji.png"
          alt=""
          srcset=""
        />
        <img
          v-else
          src="../../assets/imageBS/titledianji.png"
          alt=""
          srcset=""
        />
      </div>
      <div
        class="staticLayer"
        @click="toLayerPaint"
        :style="{ color: curyewuColor }"
      >
        cesium练习测试
        <img
          v-if="isdianjiyw"
          src="../../assets/imageBS/titleweidianji.png"
          alt=""
          srcset=""
        /><img
          v-else
          src="../../assets/imageBS/titledianji.png"
          alt=""
          srcset=""
        />
      </div>
    </div>
    <div class="center" @click="returnTomain">
      <span>测试练习</span>
    </div>
    <div class="right">
      <div class="yMD">{{ year }}</div>
      <div class="time">{{ times }}</div>
      <div class="week">{{ week }}</div>
    </div>
  </div>
</template>

<script>
// 切换路由 信息采集录入弹框删除
import * as createEarthMessage from "../../global/earth/geometrydraw/GeomEffect/createEarthMessage";
export default {
  name: "headerv",
  data() {
    return {
      isdianji: false,
      isdianjiyw: false,
      curxinxiColor: "#00ecfc",
      curyewuColor: "#00ecfc",
      year: undefined,
      times: undefined,
      week: undefined,
      intervalCur: undefined,
    };
  },
  methods: {
    getTimes() {
      this.intervalCur = setInterval(this.getTimesInterval, 1000);
    },
    getTimesInterval: function () {
      let _this = this;
      let year = new Date().getFullYear(); //获取当前时间的年份
      let month = new Date().getMonth() + 1; //获取当前时间的月份
      let day = new Date().getDate(); //获取当前时间的天数
      let hours = new Date().getHours(); //获取当前时间的小时
      let minutes = new Date().getMinutes(); //获取当前时间的分数
      let seconds = new Date().getSeconds(); //获取当前时间的秒数
      let wk = new Date().getDay(); //获取当前日期下面的星期
      let weeks = [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
      ];
      //当小于 10 的是时候，在前面加 0
      if (hours < 10) {
        hours = "0" + hours;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      month = month < 10 ? "0" + month : month;
      day = day < 10 ? "0" + day : day;
      _this.date = year + "-" + month + "-" + day + "  ";
      //拼接格式化当前时间
      _this.times = hours + ":" + minutes + ":" + seconds;
      _this.week = weeks[wk];
      _this.year = year + "年" + month + "月" + day + "日";
    },
    toInformationSampling() {
      this.isdianji = true;
      this.isdianjiyw = false;
      this.$router.push({ path: `/xbsjTest` });
      this.curxinxiColor = "#f9b46a";
      this.curyewuColor = "#00ecfc";
      console.log(window._$messagetiles);
      if (window._$messagetiles !== undefined) {
        // 0616 解决初次进入信息采集录入模块中 没popup弹框 删除报错问题
        createEarthMessage.default.prototype.removeItem1(window._$messagetiles);
      }
    },
    toLayerPaint() {
      this.isdianjiyw = true;
      this.isdianji = false;
      this.curxinxiColor = "#00ecfc";
      this.curyewuColor = "#f9b46a";
      //this.$router.push({ path: `/MainApp/Poltting` });
      this.$router.push({ path: `/cesiumTest` });
    },
    returnTomain() {
      this.$router.push({ path: `/MainApp` });
      this.isdianjiyw = false;
      this.isdianji = false;
      this.curxinxiColor = "#00ecfc";
      this.curyewuColor = "#00ecfc";
      if (window._$messagetiles !== undefined) {
        // 0616 解决初次进入首页模块中 没popup弹框 删除报错问题
        createEarthMessage.default.prototype.removeItem1(window._$messagetiles);
      }
    },
  },
  mounted() {
    if (this.$router.currentRoute.path == "/MainApp/Poltting") {
      this.curxinxiColor = "#00ecfc";
      this.curyewuColor = "#f9b46a";
    } else if (this.$router.currentRoute.path == "/MainApp/Register") {
      this.curxinxiColor = "#f9b46a";
      this.curyewuColor = "#00ecfc";
    }
  },
  created() {
    this.getTimes();
  },
  destroyed() {
    // 清除定时器
    var that = this;
    clearInterval(that.intervalCur);
  },
};
</script>

<style lang="less" scoped>
.headerV {
  width: 100%;
  height: 90px;
  color: #fff;
  display: flex;
  //margin: 0 auto;
  box-sizing: border-box;
  // border: 1px solid #fff;
  background: url(../../assets/imageBS/title1.png) no-repeat center;
  background-size: 100% 100%;
  position: relative;
  .left {
    width: 24%;
    height: 100%;
    position: relative;
    font-weight: 700;
    .informationSample {
      width: 142px;
      height: 40px;
      position: absolute;
      left: 25px;
      bottom: 50%;
      transform: translateY(50%);
      line-height: 40px;
      color: #00ecfc;
      cursor: pointer;
      img {
        position: absolute;
        left: 0;
        bottom: 50%;
        transform: translateY(50%);
      }
    }
    .informationSample:hover {
      color: #f9b46a !important;
    }
    .staticLayer {
      width: 142px;
      height: 40px;
      position: absolute;
      left: 174px;
      bottom: 50%;
      transform: translateY(50%);
      line-height: 40px;
      color: #00ecfc;
      cursor: pointer;
      img {
        position: absolute;
        left: 0;
        bottom: 50%;
        transform: translateY(50%);
      }
    }
    .staticLayer:hover {
      color: #f9b46a !important;
    }
  }

  .center {
    width: 40%;
    height: 100%;
    //border: 1px solid #fff;
    line-height: 90px;
    // color: #02a9ff;
    font-weight: 700;
    font-size: 40px;
    cursor: pointer;
    span {
      display: block;
      width: 50%;
      height: 100%;
      margin: 0 auto;
      background-image: linear-gradient(
        to right,
        rgb(28, 84, 163),
        rgb(3, 249, 249),
        rgb(28, 84, 163)
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  .right {
    position: absolute;
    right: 1.6%;
    top: 20px;
    width: 300px;
    height: 50px;
    display: flex;
    color: #00ecfc;
    line-height: 50px;
    font-size: 14px;
    .yMD {
      width: 40%;
    }
    .time,
    .week {
      width: 30%;
      height: 100%;
    }
  }
}
</style>