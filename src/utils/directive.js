/**
 * 通过自定义指令完成权限分配流程：
 * 1.登录时获取用户名，然后获取用户名下所有权限并存入vuex,然后再存入sessionStorage
 * 2.登录成功后采用 v-prem指令的权限模块进入本js文件的检查方法 
 *  判断流程：如果传入的参数permission在该用户下所有权限内那么返回true 否则为false ,如果为false则代表没有权限，那么就会隐藏入口（从DOm中删除节点）
 * 
 * 待解决：动态数据问题  修改后台数据  前台未发生变化
 *   思路：1.在权限修改页面 修改完后修改vuex 内的数据和 sessionStorage的数据
 *         2. 保证用户的权限列表 permissionList 是从vuex中获取的
 * 
 */


import Vue from "vue";
import store from "@/store/index"  //为了从vuex中获取用户权限
import { mapState } from "vuex";
//开始注册自定义指令

/**=========================================================== v-prem自定义指令部分   ========================================================================================================= */
Vue.directive("perm", {
  inserted: function (el, bingind, vnode) {
    //判断返回值  true为有权限  false为没有权限
    if (!Vue.prototype.$_has(bingind.value)) {

      if(bingind.value == "测量" || bingind.value == "标注" || bingind.value == "查询"){
        return;
      }
      //如果没有就直接取出节点
      if(bingind.value == "警情信息"){
        // console.log("删除了："+bingind.value);
       return  Vue.prototype.$info.showAlertPer = false;
       
      }
      if(bingind.value == "指挥调度"){
        // console.log("删除了："+bingind.value);
        return Vue.prototype.$info.showZhihuiPer = false;
       }
       
      el.parentNode.removeChild(el);
      // console.log("删除了："+bingind.value);
    }
  },
});

//检查是否具有该权限的方法
Vue.prototype.$_has = function (permission) {
  let flag = true;
  if(permission === undefined){
    return flag;
  }
  let permissionList = []; //定义权限数组
  let tempList = [];  //定义权限数组的替补数组
  //为了解决刷新页面vuex的数据会清空的问题，从sessionStorage中获取
  var JSONData = sessionStorage.getItem("userPermission");
  //将sessionStorage的数据存入vuex是因为   为了让permissionList的数据是从vuex中获取的=> 因为vuex的数据时动态的 一旦在权限修改界面修改权限，同时修改vuex和sessionStorage的数据得话 vuex会变动 vuex一变会保证页面数据也会随着vuex进行动态变化
  store.dispatch("app/set_UserPermission", JSON.parse(JSONData));
  //数据从vuex获取
  permissionList = store.state.app.userPermission;
  //因为权限数组为的是对象数组 所以我们遍历他得到字符串数组，
  permissionList.forEach(e => {
    tempList.push(e.name)  //tempList 只存储name
  })
  //判断是否包含
  if (!tempList.includes(permission)) {
    return flag = false;
  }
  //因为默认为true 所以不需要额外判断


  //返回flag
  return flag;
}

/**=========================================================== .........   ========================================================================================================= */