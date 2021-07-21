/*
 *图层管理面板
 */
import appglobal from "@/global/appglobal.js";
class SceneTree {
  constructor(root) {
    this._root = root;
    this._comp = appglobal.layerapp.$refs.SceneTreeTool[0]; //用于for创建
    XE.MVVM.extend(this, {
      show: true
    });
    var toolbar = appglobal.layerapp.$refs.mainBarControl.$refs.view;
    //数据绑定
    this.unbind1 = XE.MVVM.bing(toolbar, "layershow", this, "show");
  }
  isDestroyed() {
    return false;
  }

  destroy() {
    this.unbind1 = this.unbind1 && this.unbind1();
  }

  //添加一个场景树
  addSceneObject(layer, title) {
    const obj = new XE.SceneTree.Leaf(layer);
    obj.title = title;
    var earth = this._root._earth;
    //获得当前选中的树节点
    var selected = earth.SceneTree.currentSelectedNode;
    //如果是空,那么添加到根下
    if (!selected) {
      earth.SceneTree.root.children.push(obj);
    }
    //如果是group，添加到group最后
    else if (selected.children) {
      selected.children.push(obj);
    }
    //如果node,添加到node的parent最后
    else if (selected.parent) {
      selected.parent.children.push(obj);
    }
  }
}

export default SceneTree;
