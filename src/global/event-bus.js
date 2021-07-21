//import Vue from "vue";
//vue 插件开发
/*eslint-disable no-unused-vars*/
let BusPlugin = {};
BusPlugin.install = function(Vue, options) {
  const Bus = new Vue({
    methods: {
      emit(event, ...args) {
        this.$emit(event, ...args);
      },
      on(event, callback) {
        this.$on(event, callback);
      },
      off(event, callback) {
        this.$off(event, callback);
      }
    }
  });
  // 添加实例方法
  Vue.prototype.$bus = Bus;
};
export default BusPlugin;
