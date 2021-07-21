<template>
  <div class="contReg">
    <div class="inforList">
      <el-tabs :tab-position="tabPosition" @tab-click="menuSelect">
        <el-tab-pane label="高点建筑物内部结构信息采集" class="jianzhuwu">
          <HightPointBuilding />
        </el-tab-pane>
        <el-tab-pane label="高点建筑物企业信息采集" class="qiye">
          <EnterPrise />
        </el-tab-pane>
        <el-tab-pane label="高点建筑物单位信息采集" class="danwei">
          <Units />
        </el-tab-pane>
        <el-tab-pane label="高点建筑物人员信息采集" class="renyuan">
          <PersonalInformation />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import HightPointBuilding from "./pages/register/HightPointBuilding";
import EnterPrise from "./pages/register/EnterPrise";
import Units from "./pages/register/Units";
import PersonalInformation from "./pages/register/PersonalInformation";
export default {
  components: {
    HightPointBuilding,
    EnterPrise,
    Units,
    PersonalInformation,
  },
  name: "register",
  data() {
    return {
      tabPosition: "left",
    };
  },
  methods: {
    menuSelect(type) {},
  },
};
</script>

<style lang="less" scoped>
.contReg {
  margin-top: 2%;
  width: 100%;
  height: 100%;
  pointer-events: auto;
  z-index: 100;
  .inforList {
    width: 95%;
    height: 80%;
    //  border: 1px solid #fff;
    .jianzhuwu {
      height: 100%;
    }
    .qiye {
      height: 100%;
    }
    .danwei {
      height: 100%;
    }
    .renyuan {
      height: 100%;
    }

    /deep/.el-tabs--left .el-tabs__item.is-left {
      width: 80%;
      height: 64px;
      position: absolute;
      left: 0;
      top: 100px;
      line-height: 64px;
      font-family: "微软雅黑";
      font-size: 22px;
      color: #aec9ff;
      text-align: center;
      background-image: url(../../assets/imageBS/xixniweidianji.png);
      background-size: 100% 100%;
    }
    /deep/.el-tabs--left .el-tabs__item:nth-child(3).is-left {
      top: 220px;
    }
    /deep/.el-tabs--left .el-tabs__item:nth-child(4).is-left {
      top: 340px;
    }
    /deep/.el-tabs--left .el-tabs__item:nth-child(5).is-left {
      top: 460px;
    }
    /deep/.el-tabs--left,
    .el-tabs--right {
      height: 100%;
      width: 100%;
    }

    /deep/.el-tabs--left .el-tabs__header.is-left {
      width: 25%;
      height: 100%;
      background-image: url(../../assets/imageBS/leftback.png);
      background-size: 100% 100%;
    }
    /deep/.el-tabs__content {
      height: 100%;
    }

    /deep/.el-tabs--left .el-tabs__nav-wrap.is-left::after,
    .el-tabs--left .el-tabs__nav-wrap.is-right::after,
    .el-tabs--right .el-tabs__nav-wrap.is-left::after,
    .el-tabs--right .el-tabs__nav-wrap.is-right::after {
      width: 0px;
    }
    /deep/.el-tabs--left .el-tabs__active-bar.is-left,
    .el-tabs--left .el-tabs__active-bar.is-right,
    .el-tabs--right .el-tabs__active-bar.is-left,
    .el-tabs--right .el-tabs__active-bar.is-right {
      width: 0px;
    }
    /deep/.el-tabs__item.is-active {
      width: 90% !important;
      height: 64px !important;
      background-image: url(../../assets/imageBS/xinxidianji.png) !important;
      background-size: 100% 100%;
      color: #fff !important;
    }
  }
  /deep/.el-input__inner {
    // background: rgba(255, 255, 255, 0.7);
  }
}
</style>