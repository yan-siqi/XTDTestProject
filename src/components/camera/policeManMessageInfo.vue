<template>
  <div class="apply_policing" :id="guid" :style="messageinfostyle">
    <div class="apply_titles">详细信息</div>
    <div class="policing">
      <div>
        <p>姓名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</p>
        <span>{{ contents.name }}</span>
      </div>
      <div>
        <p>经度&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</p>
        <span>{{ contents.x }}</span>
      </div>
      <div>
        <p>纬度&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</p>
        <span>{{ contents.y }}</span>
      </div>
      <div>
        <p>电话&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</p>
        <span>{{ contents.tel }}</span>
      </div>
      <div>
        <p>装备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</p>
        <span>{{ contents.equip }}</span>
      </div>
    </div>
    <div class="L_close" @click="close">
      <img src="../../assets/imageBS/tankuangclose.png" alt="" />
    </div>
  </div>
</template>
<script>
export default {
  name: "messageinfo",
  data() {
    return {
      messageinfostyle: {},
      _left: 0,
      _top: 0,
      _display: "block",
      offset: [-170, -270],
    };
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    guid: {
      type: String,
      default: "",
    },
    position: {
      type: Array,
    },
    contents: {
      type: Object,
    },
  },
  methods: {
    updateStyle() {
      this.messageinfostyle = {
        //width: this._width + "px",
        //height: this._height + "px",
        top: parseFloat(this._top) + parseFloat(this.offset[1]) + "px",
        left: parseFloat(this._left) + parseFloat(this.offset[0]) + "px",
        display: this._display,
      };
    },
    getPosition() {
      return this.position;
    },
    exchangeposition(item) {
      this._left = item.left;
      this._top = item.top;
      this._display = item.display;
      this.updateStyle();
    },
    close() {
      this.$root.$emit("onClose", { guid: this.guid });
    },
  },
};
</script>

<style lang="less" scoped>
.apply_policing {
  // user-select: none; /*禁止选中*/
  // pointer-events: none; /*鼠标穿透*/
  /*重要*/
  position: fixed;
  top: -12px;
  left: 0;
  width: 327px;
  height: 240px;
  z-index: 99999;
  background-size: 100% 100%;
  background: url(../../assets/imageBS/tankuang.png) no-repeat;
  animation: opactiyLayer 0.5s forwards;
  //border-radius: 5px;
  color: #081632;
  font-family: "微软雅黑";
  .apply_titles {
    position: absolute;
    left: 50%;
    top: 8px;
    transform: translateX(-50%);
    color: #000;
    font-weight: 700;
  }
  .policing {
    position: absolute;
    left: 0;
    top: 50px;
    width: 100%;
    height: 64%;
    color: #fff;
    padding: 10px 25px;
    animation: opactiyLayer 0.5s forwards;
    font-family: "微软雅黑";
    p {
      display: inline-block;
      width: 60px;
      text-align: center;
      color: #00a8a4;
      letter-spacing: 2px;
      font-weight: 700;
    }
    span {
      color: #e0e0e0;
      letter-spacing: 1px;
    }
  }
  .L_close {
    position: absolute;
    top: 12px;
    right: 12px;
    cursor: pointer;
    color: #fff;
    &:hover {
      animation: cricleRotate 0.8s;
    }
  }
  @keyframes cricleRotate {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(1.1);
    }
  }
  @keyframes opactiyLayer {
    from {
      opacity: 0;
      transform: scale3d(0.3, 0.3, 0.3);
    }
    to {
      opacity: 1;
    }
  }
}
</style>
