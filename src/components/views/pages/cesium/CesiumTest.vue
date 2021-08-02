<template>
  <div class="contentxbsjTest">
    <ul class="mainContant">
      <li v-for="(item,index) in liList" :key="index" @click="clickTochangeItem(item.type,item)">
        {{item.name}}
        <div v-if="item.isShow">
            <ThreeDTitlesPicking/>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import ThreeDTitlesPicking from "./3DTitles/3DTitlesPickUp"
export default {
  name: "cesiumTestCom",
  components:{
      ThreeDTitlesPicking
  },
  data() {
    return {
      liList: [
        {
          name: "拾取-3DTitles数据",
          type:'3DTitles',
          isShow:false,
        }
      ],
    };
  },
  methods: {
      clickTochangeItem(curType,liContent){
        switch (curType) {
            case '3DTitles':
                liContent.isShow = true
                break;
        
            default:
                break;
        }
      }
  },
};
</script>

<style lang="less" scoped>
.contentxbsjTest {
  position: relative;
  pointer-events: auto;
  .mainContant {
    list-style: none;
    width: 300px;
    position: absolute;
    left: 10px;
    top: 10px;
    height: 500px;
    // background-color: #555;
    background-image: url("../../../../assets/imageBS/leftbottom.png");
    background-size: 100% 100%;
    color: #fff;
    font-family: "微软雅黑";
    padding: 20px;
    li {
      text-align: left;
      height: 30px;
      border: 1px solid #fff;
      box-sizing: border-box;
      cursor: pointer;
      position: relative;
      line-height: 30px;
    }
    li:hover {
      color: #1aade6;
      border: 1px solid yellow;
      background: red;
    }
    #model:hover {
      color: #fff;
      border: 1px solid red;
      background-color: rgba(1, 1, 1, 0.1);
    }
  }
}
</style>
