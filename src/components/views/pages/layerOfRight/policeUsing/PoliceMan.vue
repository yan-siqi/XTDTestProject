<template>
  <!-- 警员 -->
  <div class="popupTip">
    <div class="topTitle">
      <div class="topTitleLeft">
        <div class="img">
          <img src="@/assets/imageBS/jingyuanicon.png" alt="" srcset="" />
        </div>
        <p>警员</p>
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
      <el-form-item label="警员ID" prop="valueOfPoliceID">
        <el-input
          :value="ruleForm.valueOfPoliceID"
          @input="inpR('1', 'jyID', $event)"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="警员姓名:" prop="valueOfName">
        <el-input
          :value="ruleForm.valueOfName"
          @input="inpR('1', 'jyName', $event)"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="警员电话:" prop="valueOfPoliceTel">
        <el-input
          :value="ruleForm.valueOfPoliceTel"
          @input="inpR('1', 'jyTel', $event)"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="装备:" prop="valueOfPoliceEqp">
        <el-input
          :value="ruleForm.valueOfPoliceEqp"
          @input="inpR('1', 'Eqp', $event)"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="longitude:" prop="valueOfPoliceLongitude">
        <el-input
          :disabled="true"
          :value="ruleForm.valueOfPoliceLongitude"
          @input="inpR('1', 'jyLongitude', $event)"
        ></el-input>
      </el-form-item>
      <el-form-item label="latitude:" prop="valueOfPoliceLatitude">
        <el-input
          :disabled="true"
          :value="ruleForm.valueOfPoliceLatitude"
          @input="inpR('1', 'jyLatitude', $event)"
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
  name: "PoliceMan",
  props: {
    CurThis: Object,
    default: () => {},
  },
  data() {
    var validatePoliceID = (rule, value, callback) => {
      if (!value) {
        callback(new Error("警员id不能为空!"));
      } else {
        callback();
      }
    };
    var validatePoliceName = (rule, value, callback) => {
      if (!value) {
        callback(new Error("警员姓名不能为空!"));
      } else {
        callback();
      }
    };
    var validatePoliceTel = (rule, value, callback) => {
      if (!value) {
        callback(new Error("手机号不能为空!"));
      } else if (value) {
        var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
        if (!reg.test(value)) {
          callback(new Error("请输入正确的手机号"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    var validatePoliceEquip = (rule, value, callback) => {
      if (!value) {
        callback(new Error("设备不能为空"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        valueOfName: "",
        valueOfPoliceTel: "",
        valueOfPoliceEqp: "",
        valueOfPoliceID: "",
        valueOfPoliceLongitude: "",
        valueOfPoliceLatitude: "",
        position: undefined,
      },
      valueOfName: "",
      valueOfPoliceTel: "",
      valueOfPoliceEqp: "",
      valueOfPoliceLongitude: "",
      valueOfPoliceLatitude: "",
      isSubmit: false,
      valueOfPoliceID: "",
      // 自定义校验规则
      rules: {
        valueOfPoliceID: [
          {
            validator: validatePoliceID,
            trigger: "blur",
          },
        ],
        valueOfName: [
          {
            validator: validatePoliceName,
            trigger: "blur",
          },
        ],
        valueOfPoliceTel: [
          {
            validator: validatePoliceTel,
            trigger: "blur",
          },
        ],
        valueOfPoliceEqp: [
          {
            validator: validatePoliceEquip,
            trigger: "blur",
          },
        ],
      },
      name: "警6452",
    };
  },
  methods: {
    // 判断是面的添加还是编辑
    getPolicePointFlag() {
      console.log(
        "判断是添加还是编辑函数",
        this.CurThis.$parent.$refs.leftContent.policeManGuids
      );
      this.CurThis._sfTreeid = undefined;
      this.CurThis.$parent.$refs.leftContent.policeManGuids.forEach(
        (item, index) => {
          if (this.CurThis.$parent.$refs.leftContent.policeIDCur == item[0]) {
            if (earth.getObject(item[1])) {
              this.CurThis._sfTreeid = earth.getObject(item[1]);
            }
          }
        }
      );
    },
    // 警员信息修改
    confirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.CurThis.isSubmit = true;
          var dataParams = {
            id: this.ruleForm.valueOfPoliceID,
            name: this.ruleForm.valueOfName,
            phonenumber: this.ruleForm.valueOfPoliceTel,
            equipment: this.ruleForm.valueOfPoliceEqp,
            longtitude: this.ruleForm.valueOfPoliceLongitude,
            altitude: this.ruleForm.valueOfPoliceLatitude,
            treeid: this.CurThis.$parent.$refs.leftContent.curNode.id,
            position:
              this.ruleForm.position == undefined
                ? this.CurThis.$parent.$refs.leftContent._Pin.position
                : this.ruleForm.position,
            lid: 1,
            status: 1,
          };
          //判断添加还是编辑
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
    // 警员输入
    inpR(type, falg, con) {
      if (type === "1") {
        switch (falg) {
          //  警员
          case "jyID":
            this.ruleForm.valueOfPoliceID = con;
            break;
          case "jyName":
            this.ruleForm.valueOfName = con;
            break;
          case "jyTel":
            this.ruleForm.valueOfPoliceTel = con;
            break;
          case "Eqp":
            this.ruleForm.valueOfPoliceEqp = con;
            break;
          case "jyLongitude":
            this.ruleForm.valueOfPoliceLongitude = con;
            break;
          case "jyLatitude":
            this.ruleForm.valueOfPoliceLatitude = con;
            break;
          default:
            break;
        }
      }
    },
    // 点击取消
    cancel() {
      this.CurThis.$parent.isShowTip = false;
      var sfTreeid = earth.czm.viewer.entities.getById(
        this.CurThis.$parent.$refs.leftContent.curNode.id
      );
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
      bottom: -5px;
    }
  }
  .topTitleRight {
    margin-top: 5px;
  }
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
/deep/.el-input__inner {
  // background: rgba(255, 255, 255, 0.7);
}
</style>