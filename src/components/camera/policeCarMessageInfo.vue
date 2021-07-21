<template>
  <div class="apply_policing" :id="guid" :style="messageinfostyle">
    <div class="apply_titles">详细信息</div>
    <div class="policing">
      <div>
        <p>地理位置X&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</p>
        <span>{{ contents.x }}</span>
      </div>
      <div>
        <p>地理位置Y&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</p>
        <span>{{ contents.y }}</span>
      </div>
      <div>
        <p>车牌号&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</p>
        <span>{{ contents.policeCarNumber }}</span>
      </div>
      <div>
        <p>警车编号&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</p>
        <span>{{ contents.policeCarId }}</span>
      </div>
      <div>
        <p>车辆型号&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</p>
        <span>{{ contents.policeCarType }}</span>
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
      offset: [-165, -250],
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
  top: 0;
  left: 0;
  width: 327px;
  height: 221px;
  z-index: 99999;
  background: url(../../assets/imageBS/tankuang.png) no-repeat;
  background-size: 100% 100%;
  animation: opactiyLayer 0.5s forwards;
  border-radius: 5px;
  color: #000;
  font-family: "微软雅黑";
  .apply_titles {
    position: absolute;
    left: 50%;
    top: 8px;
    transform: translateX(-50%);
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
      width: 100px;
      text-align: center;
      color: #00a8a4;
      font-weight: 700;
      letter-spacing: 2px;
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
