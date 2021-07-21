<template>
  <div class="leftContainer">
    <div class="container">
      <div class="jingyong">
        <div class="topTitle">
          <div>
            <span>警用图层</span>
            <img src="../../../assets/imageBS/guangbiao.png" alt="" srcset="" />
            <img
              class="qingxiexian"
              src="../../../assets/imageBS/qingxiexian.png"
              alt=""
              srcset=""
            />
          </div>
        </div>
        <ul class="topcon">
          <li v-for="(item, i) in dataJsonjy" :key="i">
            <img
              :src="item.imgurl ? item.imgurl : ''"
              alt=""
              @click="addDeatil(item.type)"
            />
            <p @click="addDeatil(item.type)">{{ item.name }}</p>
          </li>
        </ul>
      </div>
      <div class="yewutuceng">
        <div class="topTitle">
          <div>
            <span>业务图层</span>
            <img src="../../../assets/imageBS/guangbiao.png" alt="" srcset="" />
            <img
              class="qingxiexian"
              src="../../../assets/imageBS/qingxiexian.png"
              alt=""
              srcset=""
            />
          </div>
        </div>
        <ul class="topcon">
          <li v-for="(item, i) in dataJsonyw" :key="i">
            <div class="containerli" style="height: 30px">
              <img
                :src="item.imgurl ? item.imgurl : ''"
                alt=""
                @click="addDeatil(item.type)"
              />
            </div>
            <p @click="addDeatil(item.type)">{{ item.name }}</p>
          </li>
        </ul>
      </div>
    </div>

    <div
      class="layerManagemet"
      @mousewheel="scrollMouseWheel($event)"
      id="context-table"
      style="position: relative"
    >
      <el-tree
        class="treeStyle"
        v-loading="isLoading"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0,0,0,0.5)"
        :data="treeData"
        id="context-table1"
        ref="tree"
        show-checkbox
        highlight-current
        node-key="id"
        :default-expand-all="true"
        :expand-on-click-node="false"
        :default-checked-keys="localCheckList"
        @node-click="nodeClick"
        @check-change="checkChangeS"
        @check="currentChanges"
      >
        <!-- :default-checked-keys="checkedIDS" -->
        <span class="custom-tree-node" slot-scope="{ node }">
          <span
            id="test"
            :style="{
              position: 'relative',
              fontSize:
                node.data.id == 0
                  ? (activeFontSize = '16px')
                  : node.data.lid == 0 && node.data.id !== 0
                  ? (activeFontSize = '14px')
                  : (activeFontSize = '12px'),
            }"
          >
            <i
              v-show="node.data.lid == 0 || node.data.id == 0"
              class="el-icon-folder"
              :style="{ color: '#f5b553' }"
            ></i>
            {{ node.label }}</span
          >
          <span>
            <i
              v-show="node.data.label == '图层管理'"
              @click="deleteCheckedChild"
              style="color: #87bbe0"
              ><img src="../../../assets/imageBS/nodel.png" alt="" srcset="" />
            </i>
          </span>
        </span>
        <!-- <span class="iconName">
          <i @click="deleteCheckedChild" style="color: #87bbe0"
            ><img src="../../../assets/imageBS/nodel.png" alt="" srcset="" />
          </i>
        </span> -->
      </el-tree>
    </div>
  </div>
</template>

<script>
import * as police from "../../../app/BPS/police";
import * as security from "../../../app/BPS/security";
import { successMsg, errorMsg, warningMsg } from "../../../utils/msg";
import earthGlobal from "@/global/earth/earthutils.js";
import * as publicUtils from "../../tools/createEntity";
import * as isShowPubUtils from "../../tools/isShowDetai";
import * as clickNodeUtils from "../../tools/clickNode";
import * as checkCancel from "../../tools/checkboxChecked";

export default {
  name: "left",
  props: {
    leftThisCur: Object,
    default: () => {},
  },
  data() {
    return {
      isLoading: true, // loading加载
      localCheckList: [],
      curCheckListNodes: [],
      uncheckedList: [],
      leftThis: null,
      activeFontSize: "20px",
      scroTop: 0,
      dataJsonjy: [
        {
          name: "警员",
          imgurl: require("../../../assets/imageBS/jingyuanicon.png"),
          type: "jingyuan",
        },
        {
          name: "警车",
          imgurl: require("../../../assets/imageBS/jingcheicon.png"),
          type: "jingche",
        },
      ],
      dataJsonyw: [
        {
          name: "点",
          imgurl: require("../../../assets/imageBS/dian.png"),
          type: "public",
        },
        {
          name: "线",
          imgurl: require("../../../assets/imageBS/xian.png"),
          type: "line",
        },
        {
          name: "面",
          imgurl: require("../../../assets/imageBS/mian.png"),
          type: "face",
        },
        {
          name: "OD线",
          imgurl: require("../../../assets/imageBS/ODxian.png"),
          type: "ODLine",
        },
        {
          name: "几何体",
          imgurl: require("../../../assets/imageBS/jiheti.png"),
          type: "polygon",
        },
      ],
      idsOfPolice: [],
      checkedIDS: [],
      refValue: "",
      policeIDCur: "",
      //
      guidsPin1: [],
      guidsLine1: [],
      guidsODline1: [],
      guidsPolygon: [],
      guidsLifangti: [],
      allCheckedGUidsList: [],
      checkguidsListPin: [],
      checkguidsListLine: [],
      checkguidsListFace: [],
      checkguidsListPolygon: [],
      checkguidsListODLine: [],
      arr: [],
      ids: [],
      guids: [],
      faceguids: [],
      ODLineGuids: [],
      ids: [],
      policeManGuids: [],
      pinGUids: [],
      pointsList: [],
      arrPointsList: [],
      isCheckedList: [], // 当前选中
      Polygonguids: [],
      tucengStatus: false,
      treeData: [
        {
          label: "图层管理",
          id: 0,
          lid: 0,
          status: false,
          children: [],
        },
      ],
      // 弧度
      positions: [
        [2.0, 1.0, 0],
        [2.1, 155.0, 0],
        [2.2, 1.0, 0],
        [96, 1.0, 0],
      ],
      curFaceId: undefined,
      isShowCard: false,
      isShowJL: false,
      isShowAF: false,
      isChecked: false,
      isShowPoint: false,
      isShowFirst: true,
      isCheckedPoliceMan: true,
      curNode: undefined,
      curPInID: undefined,
      curPolyGonID: undefined,
      _line: undefined,
      _ODline: undefined,
      _PinPub: undefined,
      _PinPolice: undefined,
      WKT: undefined,
      curLineID: undefined,
      curODLineID: undefined,
      line: {
        name: "line1",
        x: "10000",
        y: "35",
        z: "-125",
        q: "35",
      },
      value: "",
      typePoliceName: "",
      isChecked: false,
      curId: "",
      pids: "",
      str: "",
      curId: "",
      str: "",
      pinId: "",
      status: false,
      wrapDiv: undefined,
      contentDiv: undefined,
      contentDiv1: undefined,
      sliderWrap: undefined,
      slider: undefined,
      mouseFlag: false,
      //0618
      checkedKeysCur: [],
    };
  },
  methods: {
    deleteCheckedChild() {
      var ids = this.$refs.tree.getCheckedKeys(true);
      if (ids.length == 0) {
        warningMsg("请先选中要删除的子节点!!");
      } else {
        if (ids.length == 1) {
          var that = this;
          this.$confirm("此操作将永久删除该图层,是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
            center: true,
          })
            .then(() => {
              that.deleteClick();
            })
            .catch(() => {});
        } else if (ids.length > 1) {
          var that = this;
          this.$confirm("此操作将永久删除已经选中的图层,是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
            center: true,
          })
            .then(() => {
              that.deleteClick();
            })
            .catch(() => {});
        } else {
          return;
        }
      }
    },
    currentChanges(obj, node) {
      this.checkedKeysCur = [];
      let curCkeck = node.checkedNodes;
      curCkeck.forEach((item) => {
        if (item.lid !== 0) {
          this.checkedKeysCur.push(item.id);
        }
      });
      this.localCheckList = this.checkedKeysCur;
      sessionStorage.setItem(
        "checkedNodeLists",
        Array.from(new Set(this.localCheckList))
      );
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys(this.localCheckList);
      });
      var curStatus = !obj.status;
      if (obj.id == 0) {
        return new Promise((resolve) => {
          police
            .changeCurStatus(obj.id, this.tucengStatus)
            .then((res) => {
              resolve();
            })
            .catch((err) => {});
        }).then(() => {});
      } else {
        return new Promise((resolve) => {
          police
            .changeCurStatus(obj.id, curStatus)
            .then((res) => {
              resolve();
            })
            .catch((err) => {});
        }).then(() => {});
      }
    },
    checkChangeS(obj, checked, e) {
      if (checked) {
        let curThis = this;
        if (obj.lid == 0) {
          this.tucengStatus = true;
        }
        if (obj.lid == 1) {
          police.getTreeNodeById(obj.id, obj.lid).then((res) => {
            let nodeList = res.data ? res.data : [];
            checkCancel.checkedCancelPolice(nodeList, curThis, obj);
          });
        } else if (obj.lid == 2) {
          police.getTreeNodeById(obj.id, obj.lid).then((res) => {
            let nodeList = res.data ? res.data : [];
            checkCancel.checkedCancelCordon(nodeList, curThis, obj);
          });
        } else if (obj.lid == 3) {
          police.getTreeNodeById(obj.id, obj.lid).then((res) => {
            let nodeList = res.data ? res.data : [];
            checkCancel.checkedCancelLifangti(nodeList, curThis, obj);
          });
        } else if (obj.lid == 4) {
          police.getTreeNodeById(obj.id, obj.lid).then((res) => {
            let nodeList = res.data ? res.data : [];
            this.curPInID = obj.id;
            checkCancel.checkedCancelPubPin(nodeList, curThis, obj);
          });
        } else if (obj.lid == 5) {
          police.getTreeNodeById(obj.id, obj.lid).then((res) => {
            let nodeList = res.data ? res.data : [];
            checkCancel.checkedCancelFace(nodeList, curThis, obj);
          });
        } else if (obj.lid == 6) {
          police.getTreeNodeById(obj.id, obj.lid).then((res) => {
            let nodeList = res.data ? res.data : [];
            checkCancel.checkedCancelODLine(nodeList, curThis, obj);
          });
        }
      } else {
        if (obj.lid == 0) {
          this.tucengStatus = false;
        }
        if (obj.lid == 2) {
          this.uniqueArr(obj.id, this.checkguidsListLine);
        } else if (obj.lid == 3) {
          this.uniqueArr(obj.id, this.checkguidsListPolygon);
        } else if (obj.lid == 4) {
          this.uniqueArr(obj.id, this.checkguidsListPin);
        } else if (obj.lid == 5) {
          this.uniqueArr(obj.id, this.checkguidsListFace);
        } else if (obj.lid == 6) {
          this.uniqueArr(obj.id, this.checkguidsListODLine);
        } else {
          earth.czm.viewer.entities.removeById(obj.id);
        }
      }
    },
    nodeClick(e, a, b) {
      this.curLineID = e.id;
      let clickThis = this;
      police.getTreeNodeById(e.id, e.lid).then((res) => {
        let tipContent = res.data ? res.data : [];
        if (e.lid === 1) {
          clickNodeUtils.clickPolice(e, a, clickThis, tipContent);
        } else if (e.lid === 2) {
          clickNodeUtils.clickCordon(e, a, clickThis, tipContent);
        } else if (e.lid === 3) {
          // 立方体
          clickNodeUtils.clickLifangti(e, a, clickThis, tipContent);
        } else if (e.lid === 4) {
          // 一般点位
          clickNodeUtils.clickPublicPin(e, a, clickThis, tipContent);
        } else if (e.lid === 5) {
          // 创建面
          clickNodeUtils.clickPublicFace(e, a, clickThis, tipContent);
        } else if (e.lid === 6) {
          // OD线
          clickNodeUtils.clickODLine(e, a, clickThis, tipContent);
        }
      });
      this.pids = e.id;
      this.curNode = e;
      if (a.checked == false) {
        this.$parent.isShowTip = false;
      }
    },
    // 展示弹框
    bindMapEvent() {
      earthGlobal.earthmaptool.xtdEarthScene.pick3dtileevent.starteventpick();
      earthGlobal.earthmaptool.xtdEarthScene.mapemitevent.addHandler(
        "on3dtileevent",
        this.resive3dtileevent
      );
    },
    // 删除
    deleteClick() {
      //0528
      var idsCur = [];
      this.idsOfPolice = this.$refs.tree.getCheckedNodes(true, false); //只拿到子节点的id
      this.idsOfPolice.forEach((item) => {
        if (item.lid !== 0) {
          idsCur.push(item.id);
        }
      });
      security
        .delSecurity(idsCur)
        .then((res) => {
          this.getTreeList();
          this.isdelete = false;
          var allGuids = Array.from(new Set(this.allCheckedGUidsList));
          for (var i = 0; i < allGuids.length; i++) {
            if (earth.getObject(allGuids[i])) {
              earth.getObject(allGuids[i]).destroy();
            }
          }
          for (var i = 0; i < idsCur.length; i++) {
            if (earth.czm.viewer.entities.getById(idsCur[i])) {
              earth.czm.viewer.entities.removeById(idsCur[i]);
            }
          }
          this.$parent.isShowTip = false;
          successMsg(res.msg);
        })
        .catch((err) => {
          errorMsg(res.msg);
        });
    },
    getTreeList() {
      return new Promise((resolve) => {
        police
          .treeData()
          .then((res) => {
            this.treeData[0].children = res.data;
            //存在session中节点
            if (sessionStorage.getItem("checkedNodeLists") != null) {
              sessionStorage
                .getItem("checkedNodeLists")
                .trim()
                .split(",")
                .forEach((item) => this.localCheckList.push(parseInt(item)));
              this.$nextTick(() => {
                this.$refs.tree.setCheckedKeys(this.localCheckList);
              });
            }
            this.isLoading = false; // 当拿到数据的时候去除loading加载
            resolve();
          })
          .catch((err) => {
            errorMsg(err);
          });
      });
    },
    getSelectNodes() {
      if (sessionStorage.getItem("checkedNodeLists") != null) {
        sessionStorage
          .getItem("checkedNodeLists")
          .trim()
          .split(",")
          .forEach((item) => this.localCheckList.push(parseInt(item)));
        this.$nextTick(() => {
          this.$refs.tree.setCheckedKeys(this.localCheckList);
        });
      } else {
        police.getSelectIDS().then((res) => {
          sessionStorage.setItem("checkedNodeLists", res.data);
          this.localCheckList = res.data;
        });
      }
    },
    addDeatil(a) {
      this.str = this.curNode.label;
      this.$parent.isShowTip = true;
      let that = this;
      if (a == "jingyuan") {
        isShowPubUtils.isShowPolicePerson(that);
        publicUtils.createPolciePerson(earth, that);
      } else if (a == "jingche") {
        isShowPubUtils.isShowPoliceCar(that);
        publicUtils.createPolcieCar(earth, that);
      } else if (a == "line") {
        isShowPubUtils.isShowCordon(that);
        publicUtils.createPublicCordon(that);
      } else if (a == "ODLine") {
        isShowPubUtils.isShowODLine(that);
        publicUtils.createODLine(that);
      } else if (a == "polygon") {
        isShowPubUtils.isShowLifangti(that);
        publicUtils.createLifangti(that);
      } else if (a == "public") {
        let that = this;
        isShowPubUtils.isShowPinPub(that);
        publicUtils.createPublicPin(earth, that);
      } else if (a == "face") {
        isShowPubUtils.isShowFace(that);
        publicUtils.createPubFace(that);
      }
    },
    typeConfirm() {
      if (this.pids === 1) {
        let data = {
          parentid: 0,
          name: this.typePoliceName,
          lid: 0,
          status: 1,
        };
        police.addTreeData(data).then((res) => {
          this.getTreeList();
          successMsg(res.msg);
        });
      } else {
        let data = {
          parentid: this.pids,
          name: this.typePoliceName,
          lid: 0,
          status: 1,
        };
        police.addTreeData(data).then((res) => {
          this.getTreeList();
          this.ids.push(res.data.id);
          this.$nextTick(() => {
            this.$refs.tree.setCheckedKeys(this.ids);
          });
          successMsg(res.msg);
        });
      }
      this.typePoliceName = "";
    },
    typePoliceNameInpt(e) {
      this.typePoliceName = e;
    },
    // 飞入该对象
    flyToEntity(curEnID, curListGuids) {
      curListGuids.forEach((item) => {
        if (curEnID == item.id) {
          let curEntity = earth.getObject(item.guid);
          curEntity.flyTo();
        }
      });
    },
    uniqueArr(curId, waitUniqueList) {
      let arr = waitUniqueList;
      let objcon = {};
      for (let i = 0; i < arr.length; i++) {
        for (let j = 1; j < arr.length; j++) {
          arr[i].id = arr[i].guid == arr[j].guid ? arr[j].id : arr[i].id;
        }
      }
      arr = arr.reduce((item, next) => {
        objcon[next.guid] ? "" : (objcon[next.guid] = true && item.push(next));
        return item;
      }, []);
      arr.forEach((item) => {
        if (curId == item.id) {
          if (earth.getObject(item.guid)) {
            earth.getObject(item.guid).destroy();
          }
        }
      });
    },
    appendFileName(node) {
      this.$prompt("文件夹名称", "新建图层", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          if (node.data.id == -1) {
            let data = {
              parentid: 0,
              name: value,
              lid: 0,
              status: 1,
            };
            police.addTreeData(data).then((res) => {
              successMsg(res.msg);
              this.getTreeList();
            });
          } else {
            let data = {
              parentid: node.data.id,
              name: value,
              lid: 0,
              status: 1,
            };
            police.addTreeData(data).then((res) => {
              this.ids.push(res.data.id);
              this.$nextTick(() => {
                this.$refs.tree.setCheckedKeys(this.ids);
              });
              successMsg(res.msg);
              this.getTreeList();
            });
          }
        })
        .catch(() => {});
    },
    resetFileName(node) {
      this.$prompt("文件夹名称", "修改图层", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: node.label,
      })
        .then(({ value }) => {
          if (node.data.lid == 0) {
            let data = {
              name: value,
              lid: 0,
              id: node.data.id,
              status: 1,
            };
            police.modifyTreeData(data).then((res) => {
              this.getTreeList();
              successMsg(res.msg);
            });
          }
        })
        .catch(() => {});
    },
    refValueChange(a) {
      this.refValue = a;
    },
    // 实时的获取滚动条top值改变
    handleScroll() {
      if (document.getElementById("context-table1").scrollTop) {
        this.scroTop = document.getElementById("context-table1").scrollTop;
      }
    },
    // 鼠标滚轮滚动
    scrollMouseWheel(event) {
      if (event.wheelDelta > 0) {
        // 说明向上移动 - 相对于元素的偏移
        document.getElementById("context-table1").scrollTop = event.offsetY;
      } else {
        // 向下移动
        document.getElementById("context-table1").scrollTop =
          this.scroTop + event.offsetY;
      }
    },
  },
  mounted() {
    window.onscroll = function () {};
    this.getTreeList();
    this.getSelectNodes();
    this.$nextTick(() => {
      this.bindMapEvent();
      this.pointsList = this.$refs.tree.getCurrentNode(); // 数组
    });
    if (this.$parent.isShowPolice) {
      this.isShowJL = true;
    } else if (this.$parent.isShowSecurity) {
      this.isShowAF = false;
    }
    window.addEventListener("scroll", this.handleScroll, true);
  },
  destroyed() {},
};
</script>
 <style lang="less" scoped>
.leftContainer {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 340px;
  pointer-events: auto;
}
.leftContainer .policeMan {
  position: relative;
  height: 100px;
  cursor: pointer;
}
.leftContainer .policeCar {
  position: relative;
  height: 100px;
  cursor: pointer;
}
.leftContainer .policeVideo {
  position: relative;
  height: 100px;
  cursor: pointer;
}
.leftContainer .policeMan .image,
.leftContainer .policeCar .image,
.leftContainer .policeVideo .image {
  width: 34px;
  height: 34px;
  position: absolute;
  left: 15px;
  top: 25px;
}
.leftContainer .policeMan .icon,
.leftContainer .policeCar .icon,
.leftContainer .policeVideo .icon {
  width: 100%;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.container {
  height: 314px !important;
  background-color: rgba(255, 255, 255, 1);
  background-size: 100%;
  background: url(../../../assets/imageBS/lefttop.png);
  background-size: 100% 100%;
  padding: 20px;
  box-sizing: border-box;
  .jingyong {
    //border: 1px solid #fff;
    height: 40%;
    width: 100%;
    color: #fff;
    .topTitle {
      width: 100%;
      position: relative;
      height: 35%;
      span {
        display: block;
        width: 100px;
      }
      img {
        position: absolute;
        left: 5%;
        bottom: 0;
      }
      .qingxiexian {
        width: 60%;
        position: absolute;
        left: 33%;
        bottom: 21px;
      }
    }
    .topcon {
      height: 65%;
      list-style: none;
      display: flex;
      li {
        width: 80px;
        height: 100%;
        padding: 10px;
        box-sizing: border-box;
        cursor: pointer;
        img {
          width: 23px;
          height: 26px;
        }
        p {
          font-size: 14px;
        }
      }
    }
  }
  .yewutuceng {
    height: 60%;
    width: 100%;
    color: #fff;
    .topTitle {
      width: 100%;
      position: relative;
      height: 25%;
      span {
        display: block;
        width: 100px;
      }
      img {
        position: absolute;
        left: 5%;
        bottom: 0;
      }
      .qingxiexian {
        width: 60%;
        position: absolute;
        left: 33%;
        bottom: 21px;
      }
    }
    .topcon {
      height: 65%;
      list-style: none;
      li {
        float: left;
        width: 70px;
        height: 50%;
        padding: 10px;
        box-sizing: border-box;
        cursor: pointer;

        p {
          height: 30px;
          display: block;
          font-size: 14px;
        }
      }
    }
  }
}

.el-tree {
  cursor: pointer;
  width: calc(100% - 10px);
}
.el-tree > .el-tree-node {
  min-width: 100%;
  display: inline-block;
}
.el-tree > .el-tree-node:hover {
  background-color: pink;
}
.layerManagemet {
  width: 100%;
  height: calc(50vh + 15px);
  margin-top: 15px;
  background: url(../../../assets/imageBS/leftbottom.png);
  //overflow-y: auto !important;
  background-size: 100% 100%;
  //border: 1px solid #fff;
  position: relative;
  pointer-events: auto;
  /deep/.el-tree-node__content {
    color: #fff;
  }
  /deep/.el-checkbox__inner {
    border: 1px solid #00eaff;
    background-color: rgba(255, 255, 255, 0.2);
  }
  /deep/.el-checkbox__input.is-checked .el-checkbox__inner {
    background-color: rgba(255, 255, 255, 0.2);
  }
  /deep/.el-tree-node__content:hover {
    background-color: rgb(73, 125, 189);
  }
}
::-webkit-scrollbar-track {
  border-radius: 8px;
  -webkit-box-shodow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f5f5f5;
}
::-webkit-scrollbar {
  width: 10px;
  border-radius: 8px;
  background-color: #f5f5f5;
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-image: -webkit-gradient(
    linear,
    left bottom,
    left top,
    color-stop(0.44, rgb(122, 153, 217)),
    color-stop(0.72, rgb(73, 125, 189)),
    color-stop(0.86, rgb(28, 58, 148))
  );
}
.layerManagemet .treeStyle {
  // 给树中的内容添加滚动条管用
  z-index: 10000000001;
  pointer-events: auto;
  position: absolute;
  left: 15px;
  top: 15px;
  width: calc(100% - 17px);
  height: calc(50vh - 20px);
  overflow-y: auto !important;
  display: block;
  //border-right: 1px solid rgba(169, 219, 255);
  // border-bottom: 1px solid rgb(0, 99, 170);
  // background: rgba(1, 26, 69, 0.9);
  // 修改透明度
  background: rgba(0, 0, 0, 0.1);
  background-size: 100% 100%;
}
.layerManagemet .layerBottomCon {
  height: 30px;
  background-color: #999;
}
/deep/.el-input__inner {
  height: 30px;
  background-color: #eee;
  border-radius: 0;
}
/deep/.el-tree--highlight-current
  .el-tree-node.is-current
  > .el-tree-node__content {
  background-color: rgb(73, 125, 189);
}
.historyList {
  margin-top: 15px;
  height: 100px;
  .el-scrollbar {
    background-color: azure;
    background-size: 100% 100%;
    div {
      margin: 6px 4px;
    }
  }
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
}
/deep/.el-scrollbar__wrap {
  overflow-x: hidden !important;
}
li:hover {
  color: rgb(66, 210, 249);
  img {
    transform: scale(1.2);
  }
}
li:active {
  color: rgb(66, 210, 249);
  img {
    transform: scale(1.2);
  }
}
</style>