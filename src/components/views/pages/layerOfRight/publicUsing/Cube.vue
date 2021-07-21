<template>
  <div class="popupTip">
    <div class="topTitle">
      <div class="topTitle">
        <div class="topTitleLeft">
          <div class="img">
            <img src="@/assets/imageBS/jiheti.png" alt="" srcset="" />
          </div>
          <p>几何体</p>
          <div class="imgBottom">
            <img src="@/assets/imageBS/guangbiao.png" alt="" srcset="" />
          </div>
        </div>
        <div class="topTitleRight">
          <img src="@/assets/imageBS/qingxiexian.png" alt="" srcset="" />
        </div>
      </div>
    </div>
    <el-form
      class="mainContent"
      label-width="80px"
      style="margin-top: 20px"
      :rules="rules"
      :model="ruleForm"
      ref="ruleForm"
    >
      <el-form-item label="名称:" prop="valueOfPolygonName">
        <el-input
          :value="ruleForm.valueOfPolygonName"
          @input="inpR('5', 'polygon', $event)"
        ></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="贴地:">
            <el-switch
              v-model="isPolygonGround"
              @change="groundChange"
              active-color="#13c66"
              style="text-align: left"
            ></el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="边框显示:">
            <el-switch
              v-model="isShowBorder"
              @change="borderChange"
              active-color="#13c66"
              style="text-align: left"
            ></el-switch>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="拉伸:">
        <el-slider
          :max="maxWidth"
          v-model="valueOfdependWidth"
          @change="changeWidth('depend', $event)"
        ></el-slider>
      </el-form-item>
      <el-form-item label="边框宽度:">
        <div class="block">
          <el-slider
            v-model="valueOfBorderWidth"
            @change="changeWidth('border', $event)"
          ></el-slider>
        </div>
      </el-form-item>

      <el-row>
        <el-col :span="12">
          <el-form-item label="颜色:">
            ><input
              class="colorbox"
              type="color"
              value="#ffffff"
              v-model="valueOfPolygonColor"
              @input="colorchange('Polygon', $event)"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="边框颜色:">
            ><input
              class="colorbox"
              type="color"
              value="#ffffff"
              v-model="valueOfBorderColor"
              @input="colorchange('Border', $event)"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <div class="bottomBtn">
        <span
          class="confirm"
          @click="confirmPolygon('ruleForm')"
          style="margin-right: 50px"
        >
          <img src="@/assets/imageBS/confirmButton.png" alt="" />
        </span>
        <span class="confirm" @click="cancel">
          <img src="@/assets/imageBS/cancelbutton.png" alt="" />
        </span>
      </div>
    </el-form>
  </div>
</template>

<script>
import * as security from "../../../../../app/BPS/security";
import { successMsg, errorMsg } from "../../../../../utils/msg";
export default {
  name: "PolygonComponent",
  props: {
    CurThis: Object,
    default: () => {},
  },
  data() {
    var validateValueOfPolygonName = (rule, value, callback) => {
      if (!value) {
        callback(new Error("几何体名称不能为空!"));
      } else {
        callback();
      }
    };
    return {
      name: "立方体",
      valueOfPolygonName: "",
      isPolygonGround: false,
      isShowBorder: true,
      valueOfdependWidth: 5,
      valueOfBorderWidth: 2,
      valueOfPolygonColor: "#C6D133",
      valueOfBorderColor: "#C6D133",
      maxWidth: 1000,
      WKT: "",
      ruleForm: {
        valueOfPolygonName: "",
      },
      rules: {
        valueOfPolygonName: [
          {
            validator: validateValueOfPolygonName,
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 切换颜色
    colorchange(type, event) {
      if (type == "Polygon") {
        this.getPolygonFlag();
        if (this.CurThis._sfTreeid !== undefined) {
          this.CurThis._sfTreeid.color = event.target.value.xeColor;
        } else {
          this.CurThis.$parent.$refs.leftContent._polygon.color =
            event.target.value.xeColor;
        }
        this.valueOfPolygonColor = event.target.value;
      } else if (type == "Border") {
        this.getPolygonFlag();
        if (this.CurThis._sfTreeid !== undefined) {
          this.CurThis._sfTreeid.outline.color = event.target.value.xeColor;
        } else {
          this.CurThis.$parent.$refs.leftContent._polygon.outline.color =
            event.target.value.xeColor;
        }
        this.valueOfBorderColor = event.target.value;
      }
    },
    changeWidth(type, e) {
      if (type == "OD" && e) {
        this.getLineFlag("2");
        if (this.CurThis._sfTreeid != undefined) {
          this.CurThis._sfTreeid.width = e;
        } else {
          this.CurThis.$parent.$refs.leftContent._ODline.width = e;
        }
        this.valueOfODLineWidth = e;
      } else if (type == "polyline") {
        if (e) {
          this.getLineFlag("1");
          if (this.CurThis._sfTreeid != undefined) {
            this.CurThis._sfTreeid.width = e;
          } else {
            this.CurThis.$parent.$refs.leftContent._line.width = e;
          }
          this.valueOfCordonWidth = e;
        }
      } else if (type == "depend") {
        this.getPolygonFlag();
        if (this.CurThis._sfTreeid != undefined) {
          this.CurThis._sfTreeid.extrudedHeight = e;
        } else {
          this.CurThis.$parent.$refs.leftContent._polygon.extrudedHeight = e;
          this.valueOfdependWidth = e;
        }
      } else if (type === "border") {
        this.getPolygonFlag();
        if (this.CurThis._sfTreeid != undefined) {
          this.CurThis._sfTreeid.outline.width = e;
        }
        this.CurThis.$parent.$refs.leftContent._polygon.outline.width = e;
        this.valueOfBorderWidth = e;
      }
    },
    inpR(type, falg, con) {
      if (type === "5") {
        this.getPolygonFlag();
        if (this.CurThis._sfTreeid != undefined) {
          // 编辑
          switch (falg) {
            case "polygon":
              this.CurThis._sfTreeid.name = con;
              this.ruleForm.valueOfPolygonName = con;
              break;
            default:
              break;
          }
        } else {
          // 添加
          switch (falg) {
            case "polygon":
              this.ruleForm.valueOfPolygonName = con;
              break;
            default:
              break;
          }
        }
      }
    },
    // 创建立方体
    confirmPolygon(formObj) {
      this.$refs[formObj].validate((val) => {
        if (val) {
          this.getPolygonFlag();
          var listPositionsOfPolyGon = undefined;
          listPositionsOfPolyGon =
            this.CurThis._sfTreeid !== undefined
              ? this.CurThis._sfTreeid.positions
              : this.CurThis.$parent.$refs.leftContent._polygon.positions;
          var list = [];
          for (var i = 0; i < listPositionsOfPolyGon.length; i++) {
            list.push(listPositionsOfPolyGon[i]);
          }
          var listPositions = [];
          for (var j = 0; j < list.length; j++) {
            listPositions.push(list[j]);
          }
          var tempList = [];
          for (var i = 0; i < listPositions.length; i++) {
            tempList.push([listPositions[i], listPositions[i + 1]]);
          }
          var finalPositionList = [];
          for (var j = 0; j < tempList.length; j++) {
            if (j % 2 == 0) {
              finalPositionList.push(tempList[j]);
            }
          }
          var string = "";
          for (var i = 0; i < finalPositionList.length; i++) {
            if (i == finalPositionList.length - 1) {
              string =
                string +
                (finalPositionList[i][0] * 180) / Math.PI +
                " " +
                (finalPositionList[i][1] * 180) / Math.PI +
                " " +
                " 0.0000000000000000 ";
            } else if (i < finalPositionList.length - 1) {
              string =
                string +
                (finalPositionList[i][0] * 180) / Math.PI +
                " " +
                (finalPositionList[i][1] * 180) / Math.PI +
                " " +
                " 0.0000000000000000, ";
            }
          }
          this.WKT =
            "POLYGON Z ((" + string.substring(0, string.length - 1) + "))";

          var dataParams = {
            wkt: this.WKT,
            lid: 3, // 查询传
            name: this.ruleForm.valueOfPolygonName,
            ground: this.isPolygonGround,
            show: this.isShowBorder,
            height: this.valueOfdependWidth,
            width: this.valueOfBorderWidth,
            color: this.valueOfPolygonColor,
            bcolor: this.valueOfBorderColor,
            pid: this.CurThis.$parent.$refs.leftContent.curLineID,
            treeid: this.CurThis.$parent.$refs.leftContent.curNode.id,
            status: 1,
          };
          if (this.CurThis._sfTreeid != undefined) {
            dataParams.id = this.CurThis.$parent.$refs.leftContent.curPolyGonID;
            security
              .editPolygon(dataParams)
              .then((res) => {
                this.CurThis.$parent.$refs.leftContent.getTreeList();
                this.CurThis.$parent.isShowTip = false; // 关闭弹窗
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            security
              .addPolygon(dataParams)
              .then((res) => {
                this.CurThis.$parent.$refs.leftContent._polygon.enabled = false;
                this.CurThis.$parent.$refs.leftContent.curId = res.data;
                this.CurThis.$parent.$refs.leftContent.localCheckList.push(
                  res.data
                );
                let addchecked = Array.from(
                  new Set(this.CurThis.$parent.$refs.leftContent.localCheckList)
                );
                sessionStorage.setItem("checkedNodeLists", addchecked);
                this.CurThis.$parent.$refs.leftContent.$nextTick(() => {
                  this.CurThis.$parent.$refs.leftContent.$refs.tree.setCheckedKeys(
                    addchecked
                  );
                });
                this.CurThis.$parent.$refs.leftContent.getTreeList();
                this.CurThis.$parent.isShowTip = false; // 关闭弹窗
                successMsg(res.msg);
              })
              .catch((err) => {
                errorMsg(res.msg);
              });
          }
        }
      });
    },
    getPolygonFlag() {
      this.CurThis._sfTreeid = undefined;
      this.CurThis.$parent.$refs.leftContent.Polygonguids.forEach(
        (item, index) => {
          if (this.CurThis.$parent.$refs.leftContent.curPolyGonID == item[0]) {
            if (earth.getObject(item[1])) {
              this.CurThis._sfTreeid = earth.getObject(item[1]);
            }
          }
        }
      );
    },
    borderChange(val) {
      this.getPolygonFlag();
      if (this.CurThis._sfTreeid !== undefined) {
        this.CurThis._sfTreeid.outline.show = val;
      } else {
        this.CurThis.$parent.$refs.leftContent._polygon.outline.show = val;
      }
      this.isShowBorder = val;
    },
    groundChange(val) {
      this.getPolygonFlag();
      if (this.CurThis._sfTreeid !== undefined) {
        this.CurThis._sfTreeid.ground = val;
      } else {
        this.CurThis.$parent.$refs.leftContent._polygon.ground = val;
      }
      this.isPolygonGround = val;
    },
    cancel() {
      this.CurThis.$parent.isShowTip = false;
      //0623
      this.getPolygonFlag();
      if (this.CurThis._sfTreeid == undefined) {
        this.CurThis.$parent.$refs.leftContent._polygon.destroy();
      } else {
        return;
      }
    },
  },
};
</script>

<style scoped lang='less'>
.popupTip .topTitle {
  height: 45px;
  position: relative;
  display: flex;
  .topTitleLeft {
    width: 100px;
    height: 30px;
    display: flex;
    .img {
      width: 50%;
    }
    p {
      display: inline-block;
      color: #fff;
      line-height: 30px;
    }
    .imgBottom {
      position: absolute;
      left: 20px;
      bottom: -5px;
    }
  }
  .topTitleRight {
    margin-top: 5px;
  }
}
.popupTip .topTitle i {
  display: inline-block;
}
.popupTip .topTitle i img {
  position: absolute;
  left: -4px;
  top: -10px;
}
.popupTip .topTitle span {
  position: absolute;
  left: 27px;
  top: 0;
  color: rgb(231, 229, 229);
  font-size: 16px;
}
.popupTip {
  position: relative;
}
.popupTip .mainContent /deep/.el-input__inner {
  height: 26px;
  border: none;
  color: rgb(231, 229, 229);
  color: #21222c;
}
.popupTip .mainContent /deep/.el-form-item__label {
  display: inline-block;
  text-align: left;
  font-size: 16px;
  color: #00eaff !important;
}
.popupTip .mainContent .bottomBtn {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 5px;
  height: 30px;
  margin-left: 20px;
  width: 100%;
}
.popupTip .mainContent .bottomBtn .confirm {
  width: 72px;
  height: 30px;
  margin-right: 21px;
  position: relative;
  display: inline-block;
  color: rgb(231, 229, 229);
  line-height: 30px;
}
.popupTip .mainContent .bottomBtn .confirm img {
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
/deep/.el-form-item__label {
  color: #00eaff !important;
}
/deep/.el-input__inner {
  background-image: url("../../../../../assets/imageBS/tianxie.png") !important;
  background-size: 100% 100%;
  border-radius: 0;
}
/deep/.el-form-item__content {
  text-align: justify;
}
/deep/.el-input__inner {
  //background: rgba(255, 255, 255, 0.7);
}
</style>