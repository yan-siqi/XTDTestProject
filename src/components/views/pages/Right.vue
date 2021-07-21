<template>
  <div class="rightContainer" v-show="$parent.isShowTip">
    <!-- 警员 -->
    <div v-show="isShowPoliceMan" class="popupTip">
      <PoliceMan :CurThis="policeCurThis" ref="policePersonRef" />
    </div>
    <!-- 警车 -->
    <div v-show="isShowPoliceCar" class="popupTip">
      <PoliceCar :CurThis="policeCurThis" ref="policeCarRef" />
    </div>
    <!-- 编辑普通点 -->
    <div v-show="isShowPublicPoint">
      <Point :CurThis="policeCurThis" ref="PublicPointRef" />
    </div>
    <!-- 折线 -->
    <div v-show="isShowCordon" class="popupTip">
      <LineComponent :CurThis="policeCurThis" ref="lineRef" />
    </div>
    <!-- 面 -->
    <div v-show="isShowPublicFace" class="popupTip">
      <PolygonComponent :CurThis="policeCurThis" ref="polygonRef" />
    </div>
    <!-- 立方体 -->
    <div v-show="isShowPolygon" class="popupTip">
      <CubeComponent :CurThis="policeCurThis" ref="cubeRef" />
    </div>
    <!-- OD线 -->
    <div v-show="isShowODLine" class="popupTip">
      <ODLineComponent :CurThis="policeCurThis" ref="ODLineRef" />
    </div>
  </div>
</template>

<script>
import PoliceMan from "./layerOfRight/policeUsing/PoliceMan";
import PoliceCar from "./layerOfRight/policeUsing/PoliceCar";
import Point from "./layerOfRight/publicUsing/Point";
import LineComponent from "./layerOfRight/publicUsing/Line";
import PolygonComponent from "./layerOfRight/publicUsing/Polygon";
import CubeComponent from "./layerOfRight/publicUsing/Cube";
import ODLineComponent from "./layerOfRight/publicUsing/ODLine";
export default {
  name: "right",
  props: {
    rightThisCur: Object,
    default: () => {},
  },
  components: {
    PoliceMan,
    PoliceCar,
    Point,
    LineComponent,
    PolygonComponent,
    CubeComponent,
    ODLineComponent,
  },
  data() {
    return {
      policeCurThis: null,
      isShowPopupTip: false,
      curId: "", // 当前添加的id
      // 写到对象
      _sfTreeid: undefined, //当前叶子节点获得的实体
      isShowPoliceMan: false,
      isSubmit: false, //没点击确定
      // 警车
      isShowPoliceCar: false,
      //视频
      isShowVideo: false,
      // 折线
      isShowCordon: false,
      // OD线
      isShowODLine: false,
      // 立方体
      isShowPolygon: false,
      maxWidth: 1000,
      // 普通点
      isShowPublicPoint: false,
      // 面
      isShowPublicFace: false,
    };
  },
  mounted() {
    this.policeCurThis = this;
  },
};
</script>

<style scoped lang="less">
.rightContainer {
  user-select: auto; //用户可以选取文本
  position: absolute;
  right: 0;
  top: 0;
  width: 340px;
  height: 60vh;
  background-image: url("../../../assets/imageBS/rightbac.png");
  background-size: 100% 100%;
  padding: 20px;
  box-sizing: border-box;
  font-family: "微软雅黑";
  pointer-events: auto;
}
.rightContainer .popupTip {
  width: 100%;
  height: 100%;
}
.rightContainer .popupTip {
  position: relative;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
/deep/.el-form-item__content {
  text-align: justify;
}
</style>