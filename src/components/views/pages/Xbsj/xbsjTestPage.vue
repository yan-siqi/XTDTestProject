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
      <li></li>
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
export default {
  name: "xbsjtestcom",
  components: {
    Manyou,
    VideoConnect,
  },
  data() {
    return {
      isManyou: false, // 漫游
      isVideoConnect: false, // 视频融合
    };
  },
  methods: {
    curItemClick(type) {
      switch (type) {
        case "manyou":
          this.isManyou = !this.isManyou;
          break;
        case 'sprh':
          this.isVideoConnect = !this.isVideoConnect
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
    background-color: black;
    color: #eee;
  }
}
</style>
