<template>
  <div class="popupTip">
    <div class="topTitle">
      <div class="topTitleLeft">
        <div class="img">
          <img src="@/assets/imageBS/jingcheicon.png" alt="" srcset="" />
        </div>
        <p>警车</p>
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
      label-width="90px"
      :rules="rules"
      :model="ruleForm"
      ref="ruleForm"
    >
      <el-form-item label="警车ID" prop="valueOfPoliceCarID">
        <el-input
          :value="ruleForm.valueOfPoliceCarID"
          @input="inpR('2', 'jcId', $event)"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="车牌号:" prop="valueOfCarNum">
        <el-input
          :value="ruleForm.valueOfCarNum"
          @input="inpR('2', 'cph', $event)"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="车辆型号:" prop="valueOfCarType">
        <el-input
          :value="ruleForm.valueOfCarType"
          @input="inpR('2', 'clxh', $event)"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="longitude:">
        <el-input
          :disabled="true"
          :value="ruleForm.valueOfCarLongitude"
          @input="inpR('2', 'jclongitude', $event)"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="latitude:">
        <el-input
          :disabled="true"
          :value="ruleForm.valueOfCarLatitude"
          @input="inpR('2', 'jcLatitude', $event)"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <div class="bottomBtn">
        <span class="confirm" @click="confirm('ruleForm')">
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
  name: "PoliceCar",
  props: {
    CurThis: Object,
    default: () => {},
  },
  data() {
    var validatePoliceCarID = (rule, value, callback) => {
      if (!value) {
        callback(new Error("警车id不能为空!"));
      } else {
        callback();
      }
    };
    var validateCarNumber = (rule, value, callback) => {
      if (!value) {
        callback(new Error("车牌号不能为空!"));
      } else if (value) {
        var reg = /^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领][警]))$/;
        if (!reg.test(value)) {
          callback(new Error("车牌号格式有误!请参考:冀F666HB警"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    var validatePoliceCarType = (rule, value, callback) => {
      if (!value) {
        callback(new Error("警车型号不能为空!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        valueOfPoliceCarID: "",
        valueOfCarNum: "",
        valueOfCarType: "",
        valueOfCarLongitude: "",
        valueOfCarLatitude: "",
        position: undefined,
      },
      rules: {
        valueOfPoliceCarID: [
          {
            validator: validatePoliceCarID,
            trigger: "blur",
          },
        ],
        valueOfCarNum: [
          {
            validator: validateCarNumber,
            trigger: "blur",
          },
        ],
        valueOfCarType: [
          {
            validator: validatePoliceCarType,
            trigger: "blur",
          },
        ],
      },
      name: "警6452",
    };
  },
  methods: {
    // 确定
    confirm(formObj) {
      this.$refs[formObj].validate((vali) => {
        if (vali) {
          // 校验成功
          this.CurThis.isSubmit = true;
          // 参数
          var dataParams = {
            id: this.ruleForm.valueOfPoliceCarID,
            name: this.ruleForm.valueOfCarNum,
            carType: this.ruleForm.valueOfCarType,
            longtitude: this.ruleForm.valueOfCarLongitude,
            altitude: this.ruleForm.valueOfCarLatitude,
            treeid: this.CurThis.$parent.$refs.leftContent.curNode.id,
            position:
              this.ruleForm.position == undefined
                ? this.CurThis.$parent.$refs.leftContent._Pin.position
                : this.ruleForm.position,
            lid: 1,
            status: 1,
          };
          var sfTreeid = earth.czm.viewer.entities.getById(
            this.CurThis.$parent.$refs.leftContent.curNode.id
          );
          if (sfTreeid != undefined) {
            police
              .editPolice(dataParams)
              .then((res) => {
                this.CurThis.$parent.$refs.leftContent.getTreeList();
              })
              .catch((err) => {});
          } else {
            police
              .addPolice(dataParams)
              .then((res) => {
                this.CurThis.$parent.$refs.leftContent._Pin.id = res.data;
                this.CurThis.$parent.$refs.leftContent._Pin;
                this.CurThis.$parent.$refs.leftContent._Pin.enabled = false;
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
          this.CurThis.$parent.isShowTip = false;
        }
      });
    },
    inpR(type, falg, con) {
      if (type === "2") {
        // 警车
        switch (falg) {
          case "jcId":
            this.ruleForm.valueOfPoliceCarID = con;
            break;
          case "cph":
            this.ruleForm.valueOfCarNum = con;
            break;
          case "clxh":
            this.ruleForm.valueOfCarType = con;
            break;
          case "longitude":
            this.ruleForm.valueOfLongitude = con;
            break;
          case "latitude":
            this.ruleForm.valueOfLatitude = con;
            break;
          case "jclongitude":
            this.ruleForm.valueOfCarLongitude = con;
            break;
          case "jcLatitude":
            this.ruleForm.valueOfCarLatitude = con;
            break;
          default:
            break;
        }
      }
    },
    cancel() {
      this.CurThis.$parent.isShowTip = false;
      var sfTreeid = earth.czm.viewer.entities.getById(
        this.CurThis.$parent.$refs.leftContent.curNode.id
      );
      //0623
      if (sfTreeid == undefined) {
        this.CurThis.$parent.$refs.leftContent._Pin.destroy();
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
    height: 50px;
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
  color: rgb(129, 184, 255);
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
</style>