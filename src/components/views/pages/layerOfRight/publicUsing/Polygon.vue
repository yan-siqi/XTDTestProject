<template>
  <div class="popupTip">
    <div class="topTitle">
      <div class="topTitleLeft">
        <div class="img">
          <img src="@/assets/imageBS/mian.png" alt="" srcset="" />
        </div>
        <p>面</p>
        <div class="imgBottom">
          <img src="@/assets/imageBS/guangbiao.png" alt="" srcset="" />
        </div>
      </div>
      <div class="topTitleRight">
        <img src="@/assets/imageBS/qingxiexian.png" alt="" srcset="" />
      </div>
    </div>
    <el-form
      class="mainContent"
      label-width="80px"
      style="margin-top: 20px"
      key=""
      :rules="rules"
      :model="ruleForm"
      ref="ruleForm"
    >
      <el-form-item label="名称:" prop="valueOfFaceName">
        <el-input
          :value="ruleForm.valueOfFaceName"
          @input="inpFaceName"
        ></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="贴地:">
            <el-switch
              v-model="isFaceGround"
              @change="faceChange"
              active-color="#13c66"
              style="text-align: left"
            ></el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="边框显示:">
            <el-switch
              v-model="isShowFaceBorder"
              @change="borderFaceChange"
              active-color="#13c66"
              style="text-align: left"
            ></el-switch>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="边框宽度:">
        <div class="block">
          <el-slider
            v-model="valueOfFaceBorderWidth"
            @change="changefaceWidth"
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
              v-model="valueOffaceColor"
              @input="colorOfFace('face', $event)"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="边框颜色:">
            ><input
              class="colorbox"
              type="color"
              value="#ffffff"
              v-model="valueOfFaceBorderColor"
              @input="colorOfFace('border', $event)"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <div class="bottomBtn">
        <span
          class="confirm"
          @click="confirmface('ruleForm')"
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
    var validateValueOfFaceName = (rule, value, callback) => {
      if (!value) {
        callback(new Error("面名称不能为空!"));
      } else {
        callback();
      }
    };
    return {
      name: "面",
      valueOfFaceName: "",
      isFaceGround: false,
      isShowFaceBorder: false,
      valueOfFaceBorderWidth: 2,
      valueOffaceColor: "#C6D133",
      valueOfFaceBorderColor: "#73FB18",
      WKT: "",
      ruleForm: {
        valueOfFaceName: "",
      },
      rules: {
        valueOfFaceName: [
          {
            validator: validateValueOfFaceName,
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    getFaceFlag() {
      this.CurThis._sfTreeid = undefined;
      this.CurThis.$parent.$refs.leftContent.faceguids.forEach(
        (item, index) => {
          if (this.CurThis.$parent.$refs.leftContent.curFaceId == item[0]) {
            if (earth.getObject(item[1])) {
              this.CurThis._sfTreeid = earth.getObject(item[1]);
            }
          }
        }
      );
    },
    confirmface(formObj) {
      this.$refs[formObj].validate((val) => {
        if (val) {
          this.getFaceFlag();
          var listPositionsOfPolyGon = undefined;
          listPositionsOfPolyGon =
            this.CurThis._sfTreeid == undefined
              ? this.CurThis.$parent.$refs.leftContent._face.positions
              : this.CurThis._sfTreeid.positions;
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
            lid: 5, // 查询传
            name: this.ruleForm.valueOfFaceName,
            ground: this.isFaceGround,
            show: this.isShowFaceBorder,
            width: this.valueOfFaceBorderWidth,
            color: this.valueOffaceColor,
            bcolor: this.valueOfFaceBorderColor,
            pid: this.CurThis.$parent.$refs.leftContent.curLineID,
            treeid: this.CurThis.$parent.$refs.leftContent.curNode.id,
            status: 1,
          };
          if (this.CurThis._sfTreeid !== undefined) {
            dataParams.id = this.CurThis._sfTreeid.id;
            security
              .editPolygon(dataParams)
              .then((res) => {
                this.CurThis.$parent.$refs.leftContent.getTreeList();
                this.CurThis.$parent.isShowTip = false;
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            security
              .addPolygon(dataParams)
              .then((res) => {
                this.CurThis.$parent.$refs.leftContent._face.enabled = false;
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
                this.CurThis.$parent.isShowTip = false;
                successMsg(res.msg);
              })
              .catch((err) => {
                errorMsg(err);
              });
          }
        }
      });
    },
    colorOfFace(type, event) {
      if (type == "face") {
        this.getFaceFlag();
        if (this.CurThis._sfTreeid !== undefined) {
          this.CurThis._sfTreeid.color = event.target.value.xeColor;
        } else {
          this.CurThis.$parent.$refs.leftContent._face.color =
            event.target.value.xeColor;
        }
        this.valueOffaceColor = event.target.value;
      } else {
        this.getFaceFlag();
        if (this.CurThis._sfTreeid !== undefined) {
          this.CurThis._sfTreeid.outline.color = event.target.value.xeColor;
        } else {
          this.CurThis.$parent.$refs.leftContent._face.outline.color =
            event.target.value.xeColor;
        }
        this.valueOfFaceBorderColor = event.target.value;
      }
    },
    changefaceWidth(val) {
      this.getFaceFlag();
      if (this.CurThis._sfTreeid !== undefined) {
        this.CurThis._sfTreeid.outline.width = val;
      } else {
        this.CurThis.$parent.$refs.leftContent._face.outline.width = val;
      }
      this.valueOfFaceBorderWidth = val;
    },
    borderFaceChange(val) {
      this.getFaceFlag();
      if (this.CurThis._sfTreeid !== undefined) {
        this.CurThis._sfTreeid.outline.show = val;
      } else {
        this.CurThis.$parent.$refs.leftContent._face.outline.show = val;
      }
      this.isShowFaceBorder = val;
    },
    faceChange(val) {
      this.getFaceFlag();
      if (this.CurThis._sfTreeid !== undefined) {
        this.CurThis._sfTreeid.ground = val;
      } else {
        this.CurThis.$parent.$refs.leftContent._face.ground = val;
      }
      this.isFaceGround = val;
    },
    inpFaceName(eve) {
      this.ruleForm.valueOfFaceName = eve;
    },
    cancel() {
      this.CurThis.$parent.isShowTip = false;
      this.getFaceFlag();
      if (this.CurThis._sfTreeid == undefined) {
        this.CurThis.$parent.$refs.leftContent._face.destroy();
      } else {
        return;
      }
    },
  },
};
</script>

<style scoped lang='less'>
.popupTip {
  width: 292px;
  height: 484px;
}
.popupTip .topTitle {
  height: 20px;
  position: relative;
  .topTitleLeft {
    width: 80px;
    height: 30px;
    //border: 1px solid #fff;
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
      left: 0;
      bottom: 1-30px;
    }
  }
  .topTitleRight {
    margin-top: -27px;
    margin-left: 67px;
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
  left: 0;
  bottom: 5px;
  height: 30px;
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
.el-form-item__label {
  color: #00eaff !important;
}
/deep/.el-form-item__content {
  text-align: justify;
}
/deep/.el-input__inner {
  //background: rgba(255, 255, 255, 0.7);
}
</style>