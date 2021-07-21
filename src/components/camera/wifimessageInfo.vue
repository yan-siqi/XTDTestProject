<template>
  <div class="apply_policing" :id="guid" :style="messageinfostyle">
    <div class="apply_titles">
      <span>{{ contents.name }}</span
      ><br />
    </div>
    <div class="policing">
      <span>{{ contents.x }}</span
      ><br />
      <span>{{ contents.y }}</span
      ><br />
      <span>{{ contents.title }}</span>
    </div>
    <div class="L_close" @click="close">X</div>
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
  top: 0;
  left: 0;
  width: 327px;
  height: 221px;
  z-index: 99999;
  background-size: 100% 100%;
  background: url(../../assets/img/image/Car.png) no-repeat;
  animation: opactiyLayer 0.5s forwards;
  border-radius: 5px;
  .apply_titles {
    margin: 10px 20px;
    padding-bottom: 5px;
    cursor: move;
    border-bottom: 1px solid #adadad;
    img {
      vertical-align: middle;
      margin-right: 10px;
    }
    span {
      color: #fff;
      vertical-align: middle;
    }
  }
  .policing {
    width: 100%;
    height: 64%;
    color: #fff;
    padding: 10px 25px;
    animation: opactiyLayer 0.5s forwards;
    video {
      width: 100%;
      height: 100%;
    }
  }
  .L_close {
    position: absolute;
    top: 10px;
    right: 15px;
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
