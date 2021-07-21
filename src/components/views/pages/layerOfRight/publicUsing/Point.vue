<template>
  <div class="popupTip">
    <div class="topTitle">
      <div class="topTitleLeft">
        <div class="img">
          <img src="@/assets/imageBS/dian.png" alt="" srcset="" />
        </div>
        <p>点</p>
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
      :rules="rules"
      :model="ruleForm"
      ref="ruleForm"
    >
      <el-form-item label="名称:" prop="valueOfPoint">
        <el-input
          :value="ruleForm.valueOfPoint"
          @input="inpR('6', 'publicPin', $event)"
        ></el-input>
      </el-form-item>
      <el-form-item label="经度:">
        <el-input
          :value="valueOfPointLong"
          @input="inpR('6', 'publicPinx', $event)"
        ></el-input>
      </el-form-item>
      <el-form-item label="纬度:">
        <el-input
          :value="valueOfPointLat"
          @input="inpR('6', 'publicPiny', $event)"
        ></el-input>
      </el-form-item>
      <el-form-item label="大小:">
        <el-input
          :value="size"
          @input="inpR('6', 'pinSize', $event)"
        ></el-input>
      </el-form-item>
      <el-form-item label="内容:">
        <el-input
          :value="content"
          @input="inpR('6', 'pinContent', $event)"
        ></el-input>
      </el-form-item>
      <el-form-item label="扩展文本:">
        <el-input
          :value="extendText"
          @input="inpR('6', 'extentText', $event)"
        ></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="左偏移:">
            <el-input
              v-model.number="deviationL"
              @input="inpR('6', 'deviationL', $event)"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="右偏移:">
            <el-input
              v-model.number="deviationR"
              @input="inpR('6', 'deviationR', $event)"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="bottomBtn">
        <span
          class="confirm"
          @click="confirmPubPin('ruleForm')"
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
import * as police from "../../../../../app/BPS/police";
import { successMsg, errorMsg } from "../../../../../utils/msg";
export default {
  name: "Point",
  props: {
    CurThis: Object,
    default: () => {},
  },
  data() {
    var validateValueOfPoint = (rule, value, callback) => {
      if (!value) {
        callback(new Error("图标点名称不能为空!"));
      } else {
        callback();
      }
    };
    return {
      valueOfPoint: "",
      valueOfPointLong: "",
      valueOfPointLat: "",
      size: "",
      content: "",
      extendText: "",
      deviationL: 0,
      deviationR: 0,
      name: "点",
      final: [],
      ruleForm: {
        valueOfPoint: "",
      },
      rules: {
        valueOfPoint: [
          {
            validator: validateValueOfPoint,
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    offsetProcessing(left, right) {
      this.final = [];
      var cur;
      var cur1;
      if (left == "") {
        cur = `0,${right}`; //123,12
        cur1 = cur.split(",");
        cur1.forEach((item) => {
          this.final.push(parseInt(item));
        });
      } else if (right == "") {
        cur = `${left},0`; //123,12
        cur1 = cur.split(",");
        cur1.forEach((item) => {
          this.final.push(parseInt(item));
        });
      } else if (left == "" && right == "") {
        cur = `0,0`; //123,12
        cur1 = cur.split(",");
        cur1.forEach((item) => {
          this.final.push(parseInt(item));
        });
      } else {
        cur = `${left},${right}`; //123,12
        cur1 = cur.split(",");
        cur1.forEach((item) => {
          this.final.push(parseInt(item));
        });
      }
      return this.final;
    },
    getPINFLag() {
      this.CurThis._sfTreeid = undefined;
      this.CurThis.$parent.$refs.leftContent.pinGUids.forEach((item, index) => {
        if (this.CurThis.$parent.$refs.leftContent.curPInID == item[0]) {
          if (earth.getObject(item[1])) {
            this.CurThis._sfTreeid = earth.getObject(item[1]);
            this.CurThis._sfTreeid.pointShow = false;
          }
        }
      });
    },
    confirmPubPin(formObj) {
      this.$refs[formObj].validate((val) => {
        if (val) {
          this.CurThis.$parent.isShowTip = false;
          let queryData = {
            name: this.ruleForm.valueOfPoint,
            longtitude: this.valueOfPointLong,
            altitude: this.valueOfPointLat,
            lid: 4,
            size: this.size == "" ? 0 : this.size,
            content: this.content,
            text: this.extendText,
            left: this.deviationL,
            right: this.deviationR,
            treeid: this.CurThis.$parent.$refs.leftContent.curNode.id,
            position: this.CurThis.$parent.$refs.leftContent._PinPub.position,
            status: 1,
          };
          this.getPINFLag();
          if (this.CurThis._sfTreeid != undefined) {
            queryData.id = this.CurThis.$parent.$refs.leftContent.curPInID;
            queryData.position = this.CurThis._sfTreeid.position;
            police.editPoint(queryData).then((res) => {
              this.CurThis.$parent.$refs.leftContent.getTreeList();
            });
          } else {
            police
              .addPoint(queryData)
              .then((res) => {
                this.CurThis.$parent.$refs.leftContent._PinPub.enabled = false;
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
                successMsg(res.msg);
              })
              .catch((err) => {
                errorMsg(err);
              });
          }
        }
      });
    },
    inpR(type, falg, con) {
      if (type == "6") {
        this.getPINFLag();
        if (this.CurThis._sfTreeid != undefined) {
          switch (falg) {
            case "publicPin":
              this.CurThis._sfTreeid.name = con;
              this.ruleForm.valueOfPoint = con;
              break;
            case "publicPinx":
              this.CurThis._sfTreeid.position[0] = con;
              this.valueOfPointLong = con;
              break;
            case "publicPiny":
              this.CurThis._sfTreeid.position[1] = con;
              this.valueOfPointLat = con;
              break;
            case "pinSize":
              this.CurThis._sfTreeid.pinBuilder.size = con;
              this.size = con;
              this.CurThis.$parent.$refs.leftContent._PinPub.pinBuilder.size = this.size;
              break;
            case "extentText":
              this.CurThis._sfTreeid.pinBuilder.extText = con;
              this.extendText = con;
              this.CurThis.$parent.$refs.leftContent._PinPub.pinBuilder.extText = this.extendText;
              break;
            case "pinContent":
              this.CurThis._sfTreeid.pinBuilder.text = con;
              this.content = con;
              this.CurThis.$parent.$refs.leftContent._PinPub.pinBuilder.text = this.content;
              break;
            case "deviationL":
              if (con !== "" && con !== "-") {
                this.deviationL = parseInt(con);
              } else if (con == "-") {
                return;
              } else {
                this.deviationL = con;
              }
              var curOffset = this.offsetProcessing(
                this.deviationL,
                this.deviationR
              );
              this.CurThis._sfTreeid.pinBuilder.extTextPixelOffset = curOffset;
              this.CurThis.$parent.$refs.leftContent._PinPub.pinBuilder.extTextPixelOffset = curOffset;
              break;
            case "deviationR":
              if (con !== "" && con !== "-") {
                this.deviationR = parseInt(con);
              } else if (con == "-") {
                return;
              } else {
                this.deviationR = con;
              }
              var curOffset = this.offsetProcessing(
                this.deviationL,
                this.deviationR
              );
              this.CurThis._sfTreeid.pinBuilder.extTextPixelOffset = curOffset;
              this.CurThis.$parent.$refs.leftContent._PinPub.pinBuilder.extTextPixelOffset = curOffset;
              break;
            default:
              break;
          }
        } else {
          switch (falg) {
            case "publicPin":
              this.ruleForm.valueOfPoint = con;
              break;
            case "publicPinx":
              this.valueOfPointLong = con;
              break;
            case "publicPiny":
              this.valueOfPointLat = con;
              break;
            case "pinSize":
              this.size = con;
              this.CurThis.$parent.$refs.leftContent._PinPub.pinBuilder.size = this.size;
              break;
            case "extentText":
              this.extendText = con;
              this.CurThis.$parent.$refs.leftContent._PinPub.pinBuilder.extText = this.extendText;
              break;
            case "pinContent":
              this.content = con;
              this.CurThis.$parent.$refs.leftContent._PinPub.pinBuilder.text = this.content;
              break;
            case "deviationL":
              if (con !== "" && con !== "-") {
                this.deviationL = parseInt(con);
              } else if (con == "-") {
                return;
              } else {
                this.deviationL = con;
              }
              var curOffsetL = undefined;
              if (this.deviationR == "") {
                // console.log("输入左偏移,右偏移为空");
                curOffsetL = this.offsetProcessing(this.deviationL, 0);
                // console.log(curOffsetL, "1");
              } else if (this.deviationL == "") {
                // console.log("输入左偏移,左偏移为空");
                curOffsetL = this.offsetProcessing(0, this.deviationR);
              } else if (this.deviationL == "" && this.deviationR == "") {
                // console.log("输入左偏移左偏移均为空");
                curOffsetL = this.offsetProcessing(0, 0);
              } else if (this.deviationL == "") {
                // 如果输入负值
              } else {
                // console.log("输入左偏移,左右偏移均有值");
                curOffsetL = this.offsetProcessing(
                  this.deviationL,
                  this.deviationR
                );
              }
              this.CurThis.$parent.$refs.leftContent._PinPub.pinBuilder.extTextPixelOffset = curOffsetL;
              break;
            case "deviationR":
              let RL = undefined;
              let RR = undefined;
              if (con !== "" && con !== "-") {
                this.deviationR = parseInt(con);
              } else if (con == "-") {
                return;
              } else {
                this.deviationR = con;
              }
              let curOffsetR = undefined;
              if (this.deviationL == "") {
                // console.log("输入右偏移,左偏移为空");
                curOffsetR = this.offsetProcessing(0, this.deviationR);
              } else if (this.deviationR == "") {
                // console.log("输入右偏移,右偏移为空");
                curOffsetR = this.offsetProcessing(this.deviationL, 0);
              } else if (this.deviationL == "" && this.deviationR == "") {
                // console.log("输入右偏移,左右偏移为空");
                curOffsetL = this.offsetProcessing(0, 0);
              } else {
                // console.log("输入右偏移,左右偏移均有值");
                curOffsetR = this.offsetProcessing(
                  this.deviationL,
                  this.deviationR
                );
              }
              this.CurThis.$parent.$refs.leftContent._PinPub.pinBuilder.extTextPixelOffset = curOffsetR;
              break;
            default:
              break;
          }
        }
      }
    },
    cancel() {
      this.CurThis.$parent.isShowTip = false;
      this.getPINFLag();
      if (this.CurThis._sfTreeid == undefined) {
        this.CurThis.$parent.$refs.leftContent._PinPub.destroy();
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
    width: 80px;
    height: 30px;
    display: flex;
    .img {
      width: 40px;
      line-height: 30px;
      height: 100%;
      // border: 1px solid #fff;
    }
    p {
      display: inline-block;
      color: #fff;
      line-height: 30px;
    }
    .imgBottom {
      position: absolute;
      left: 0;
      bottom: -5px;
    }
  }
  .topTitleRight {
    margin-top: 3px;
    margin-left: 20px;
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
  color: rgb(129, 184, 255);
}
.popupTip .mainContent .bottomBtn {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -25px;
  height: 30px;
  margin-left: 20px;
  width: 100%;
}
.popupTip .mainContent .bottomBtn .confirm {
  width: 72px;
  height: 30px;
  position: relative;
  display: inline-block;
  margin-right: 10px;
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
  // background: rgba(255, 255, 255, 0.7);
}
</style>