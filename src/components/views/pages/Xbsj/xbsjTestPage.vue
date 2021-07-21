<template>
  <div class="contentxbsjTest">
    <ul class="mainContant">
      <li @click="curItemClick('manyou')">
        场景漫游:
        <div v-show="isManyou">
          <Manyou />
        </div>
      </li>
      <li @click="curItemClick('sprh')">
        视频融合:
        <div v-show="isVideoConnect">
          <VideoConnect />
        </div>
      </li>
      <li @click="curItemClick('mapjq')">
        mapv-集群:
        <div v-show="isJq">
          <Mapvjiqun />
        </div>
      </li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>

<script>
import Manyou from "./manyou/Manyou.vue";
import VideoConnect from "./sprh/VideoConnect.vue";
import Mapvjiqun from "./mapv-jiqun/Mapvjiqun.vue";
export default {
  name: "xbsjtestcom",
  components: {
    Manyou,
    VideoConnect,
    Mapvjiqun,
  },
  data() {
    return {
      isManyou: false, // 漫游
      isVideoConnect: false, // 视频融合
      isJq: false, //mapv 集群
    };
  },
  methods: {
    curItemClick(type) {
      switch (type) {
        case "manyou":
          this.isManyou = !this.isManyou;
          break;
        case "sprh":
          this.isVideoConnect = !this.isVideoConnect;
          break;
        case "mapjq":
          this.isJq = !this.isJq;
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.contentxbsjTest {
  position: relative;
  pointer-events: auto;
  .mainContant {
    list-style: none;
    width: 200px;
    position: absolute;
    left: 10px;
    top: 10px;
    height: 500px;
    background-color: #555;
    color: #000;
    font-family: '微软雅黑';
    li{
      text-align: left;
      height: 30px;
      border: 1px solid #000;
      box-sizing: border-box;
      cursor: pointer;
    }
  }
}
</style>
