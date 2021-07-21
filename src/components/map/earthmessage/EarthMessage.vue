<template>
  <div class="earthmessagediv" id="earth-message-container"></div>
</template>
<script>
import Vue from "vue";
// wifi详细信息
import wifiInfo from "@/components/camera/wifimessageInfo";
import policeCarMessageInfo from "../../../components/camera/policeCarMessageInfo";
import policeManMessageInfo from "../../../components/camera/policeManMessageInfo";
import siteModel from "@/components/camera/siteModel";

export default {
  name: "earthmessage",
  data() {
    return {};
  },
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  created() {
    this._$messagetiles = [];
  },
  mounted() {
    this.$nextTick(() => {
      this.$root.$emit("onStart");
    });
  },
  methods: {
    //动态创建组件
    createMessageinfo(option) {
      let type = option.type;
      let messageinfo = null;
      switch (type) {
        // case 0:
        //   messageinfo = Vue.extend(MessageInfos);
        //   break;
        // case 1:
        //   messageinfo = Vue.extend(siteModel);
        //   break;
        case "policePoint":
          messageinfo = Vue.extend(policeManMessageInfo);
          window.messageinfo = messageinfo;
          break;
        case "policeCarPoint":
          messageinfo = Vue.extend(policeCarMessageInfo);
          window.messageinfo = messageinfo;
          break;
        default:
          break;
      }
      let guid = option.guid || this.uuid();
      let component_vue = new messageinfo({
        propsData: {
          guid: guid,
          position: option.position,
          contents: option.contents,
        },
      }).$mount();
      //手动挂载
      let container = document.getElementById("earth-message-container");
      component_vue.$on("onClose", this.onCloseHandler);
      container.appendChild(component_vue.$el);
      //保存
      this._$messagetiles.push({ guid: guid, component_node: component_vue });
      //0611
      window._$messagetiles = this._$messagetiles;
    },
    onCloseHandler(pval) {
      this.$root._$comscenemanage.closemessagepupo(pval.guid);
    },
    //生成guid
    uuid() {
      var s = [];
      var hexDigits = "0123456789abcdef";
      for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
      }
      s[14] = "4";
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
      s[8] = s[13] = s[18] = s[23] = "-";
      var uuid = s.join("");
      return uuid;
    },
  },
};
</script>

<style lang="less" scoped>
.earthmessagediv {
  position: fixed;
  z-index: 99;
}
</style>