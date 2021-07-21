import appglobal from "@/global/appglobal.js";
import SceneTree from "./tools/SceneTree";
import ContextMenu from "./ContextMenu";
class MainUI {
  constructor(root) {
    this._root = root;
    this._com = appglobal.layerapp;
    //工具初始化
    const mainUI = this;
    this._sceneTree = new SceneTree(this._root);
    Object.defineProperties(this, "tools", {
      get: () => {
        return {
          //图层管理器
          get sceneTree() {
            return mainUI._sceneTree;
          }
        };
      }
    });

    //右键菜单
    this._contextMenu = new ContextMenu(this._root);

    Object.defineProperties(this, "contextMenu", {
      get: () => {
        return this._contextMenu;
      }
    });
  }

  //get方法返回三维地球属性
  get earth() {
    return this._earth;
  }

  //弹出模块对话框确认
  confirm(info, ok, cancel) {
    //this.
  }
}
