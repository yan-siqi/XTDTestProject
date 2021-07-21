<template>
  <div class="contentContainer">
    <!-- 左侧内容 -->
    <LeftContent :leftThisCur="blankThis" ref="leftContent" />
    <RightContent :rightThisCur="blankThis" ref="rightContent" />
  </div>
</template>

<script>
import LeftContent from "./pages/Left";
import RightContent from "./pages/Right";
export default {
  components: { LeftContent, RightContent },
  data() {
    return {
      blankThis: null,
      isShowPolice: false, // 展示警力
      isShowSecurity: false, //安防
      isShowBaseEqp: false, //基础设施
      isShowOther: false,
      isShowTip: false, // 展示弹框
      policeName: "", // 警员姓名
      submit: false,
      appendTree: false,
    };
  },
  methods: {},
  mounted() {
    this.blankThis = this;
  },
};
</script>

<style scoped>
</style>