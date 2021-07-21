import Vue from "vue";
import App from "./App.vue";
import ElementUi from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import router from "./router/index";
// import { fas } from "@fortawesome/free-solid-svg-icons";
//import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from "@fortawesome/vue-fontawesome";
//引入自定义指令
// import "echarts/theme/blue.js";
//插件 事件总线

Vue.use(ElementUi);
Vue.use(scroll);

Vue.prototype.$info = new Vue({
  data() {
    return {
      selectId: '',
      enabledSelect: '',
      showPatrolCars: true,
      showCars: true,
      showPeople:false,
      showRadio:false,
      showPoliceRadio:false,
      showPoliceCar:true,
      showAlertPer:true,  // 警情信息权限
      showZhihuiPer:true,  // 指挥调度权限
      CarmessgaeGuid:"",
    }
  }
});

Vue.config.productionTip = false;
//全局使用
// Vue.prototype.$echarts = echarts;
// new Vue({
//  // router,
//   // store,
//   render: h => h(App)
// }).$mount("#app");

//全局mixin
Vue.mixin({
  data: function() {
    return {
      lang: {}
    };
  },
  created: function() {
    // this.switchLanguage();
    // this.$root.$on("language.changed", lang => {
    //   this.switchLanguage();
    // });
  },
  methods: {
    switchLanguage: function() {
      var lang = this.$root.language;
      if (this.langs && this.langs) {
        this.lang = this.langs[lang];
      }
    }
  }
});

if (typeof XE !== "undefined") {
  // 如果XE存在，说明EarthSDK已载入
  // eslint-disable-next-line no-console
  /* eslint-disable*/
  function startup() {
    new Vue({
    router,
      // store,
      render: h => h(App),
      data: {
        language: 'zh'
      },
      mounted() {

      },
      watch: {
        language: function (lang) {
          this.$emit('language.changed', lang);
        }
      }
    }).$mount('#app')
  }

  // 1 XE.ready()会加载Cesium.js等其他资源，注意ready()返回一个Promise对象。
  XE.ready().then(() => {
    // 加载标绘插件
    return XE.HTML.loadJS('./js/earthsdk/XbsjEarth-Plugins/plottingSymbol/plottingSymbol.js');
  }).then(() => {
    // 加载标绘插件
    return XE.HTML.loadJS('./js/earthsdk/XbsjEarth-Plugins/plottingSymbol2/plottingSymbol2.js');
  }).
  then(() => {
    // 加载标绘插件
    return XE.HTML.loadJS('./js/earthsdk/XbsjEarth-Plugins/customPrimitive/customPrimitive.js');
  }).then(() => {
    // 加载标绘插件
    return XE.HTML.loadJS('./js/earthsdk/XbsjEarth-Plugins/customPrimitiveImage/customPrimitiveImage.js');
  }).then(() => {
    // 加载webgl
    return XE.HTML.loadJS('./js/earthsdk/XbsjEarth-Plugins/threejs/three.min.js');
  })
  .then(() => XE.HTML.loadMapV())
  .then(() => {
    startup()
  });
} else if (typeof Cesium !== 'undefined') { // 如果XE不存在，存在Cesium，则此时用纯Cesium进行开发
  new Vue({
    router,
    store,
    render: h => h(App),
    data: {
      language: 'zh'
    },
    mounted() {

    },
    watch: {
      language: function (lang) {
        this.$emit('language.changed', lang);
      }
    }
  }).$mount('#app')
}