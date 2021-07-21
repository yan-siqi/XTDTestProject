<template>
  <div class="layer-list" v-show="isShow">
    <div class="L_title">
      <p>高点建筑物企业信息采集</p>
    </div>
    <div class="layer-table">
      <el-form
        ref="form"
        :model="form"
        label-width="200px"
        style="color: #fff"
        :rules="rules"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="企业名称:" prop="businessname">
              <el-input
                @change="inputCon($event, 'qiye')"
                v-model="form.businessname"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="法人:" prop="farname">
              <el-input
                @change="inputCon($event, 'faren')"
                v-model="form.farname"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系方式:" prop="tel">
              <el-input
                v-model="form.tel"
                @change="inputCon($event, 'tel')"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="企业地址:" prop="address">
              <el-input
                @change="inputCon($event, 'address')"
                v-model="form.address"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="房屋所属人:" prop="belongOfperson">
              <el-input
                @change="inputCon($event, 'belongOfperson')"
                v-model="form.belongOfperson"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="房屋使用人:" prop="useOfPerson">
              <el-input
                @change="inputCon($event, 'useOfPerson')"
                v-model="form.useOfPerson"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="房屋信息:" prop="onseHoseInformation">
          <el-input
            @change="inputCon($event, 'onseHoseInformation')"
            v-model="form.onseHoseInformation"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-footer>
          <el-row>
            <div style="width: 400px">
              <img
                src="@/assets/imageBS/confirmButton.png"
                alt=""
                srcset=""
                style="margin-left: 60px"
                @click="confirm('form')"
              />
              <img
                style="margin-left: 200px"
                src="@/assets/imageBS/cancelbutton.png"
                alt=""
                srcset=""
                @click="cancel"
              />
            </div>
          </el-row>
        </el-footer>
      </el-form>
    </div>
  </div>
</template>

<script>
import { successMsg, errorMsg } from "../../../../utils/msg";
import * as information from "../../../../app/BPS/informationSelecting";

export default {
  name: "enterPrise",
  data() {
    var vallidateEnterBussiname = (rule, value, callback) => {
      if (!value) {
        callback(new Error("企业名称不能为空!"));
      } else {
        callback();
      }
    };
    var vallidateEnterFarname = (rule, value, callback) => {
      if (!value) {
        callback(new Error("法人名称不能为空!"));
      } else {
        callback();
      }
    };
    var validateEnterTel = (rule, value, callback) => {
      if (!value) {
        callback(new Error("联系方式不能为空!"));
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
    var vallidateEnterAddress = (rule, value, callback) => {
      if (!value) {
        callback(new Error("企业地址不能为空!"));
      } else {
        callback();
      }
    };
    var vallidateEnterBelongOfperson = (rule, value, callback) => {
      if (!value) {
        callback(new Error("房屋所属人不能为空!"));
      } else {
        callback();
      }
    };
    var vallidateEnterUseOfPerson = (rule, value, callback) => {
      if (!value) {
        callback(new Error("房屋使用人不能为空!"));
      } else {
        callback();
      }
    };
    var vallidateEnterOnseHoseInformation = (rule, value, callback) => {
      if (!value) {
        callback(new Error("每层每户房屋信息不能为空!"));
      } else {
        callback();
      }
    };
    return {
      totalCount: 12,
      tableData: [],
      imageUrl: "",
      isShow: true,
      form: {
        businessname: "",
        farname: "",
        tel: "",
        address: "",
        belongOfperson: "",
        useOfPerson: "",
        onseHoseInformation: "",
      },
      rules: {
        businessname: [
          {
            validator: vallidateEnterBussiname,
            trigger: "blur",
          },
        ],
        farname: [
          {
            validator: vallidateEnterFarname,
            trigger: "blur",
          },
        ],
        tel: [
          {
            validator: validateEnterTel,
            trigger: "blur",
          },
        ],
        address: [
          {
            validator: vallidateEnterAddress,
            trigger: "blur",
          },
        ],
        belongOfperson: [
          {
            validator: vallidateEnterBelongOfperson,
            trigger: "blur",
          },
        ],
        useOfPerson: [
          {
            validator: vallidateEnterUseOfPerson,
            trigger: "blur",
          },
        ],
        onseHoseInformation: [
          {
            validator: vallidateEnterOnseHoseInformation,
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    publicReset() {
      this.form.businessname = "";
      this.form.farname = "";
      this.form.tel = "";
      this.form.address = "";
      this.form.belongOfperson = "";
      this.form.useOfPerson = "";
      this.form.onseHoseInformation = "";
    },
    cancel() {
      this.publicReset();
    },
    confirm(formConfig) {
      this.$refs[formConfig].validate((val) => {
        if (val) {
          let paramsData = {
            businessname: this.form.businessname, // 企业名称
            farname: this.form.farname, //法人
            tel: this.form.tel, //联系方式
            address: this.form.address, // 企业地址
            belongOfperson: this.form.belongOfperson, //房屋所属人
            useOfPerson: this.form.useOfPerson, //房屋使用人
            onseHoseInformation: this.form.onseHoseInformation, // 每层每户的房屋信息
          };
          information
            .addgaodianQiye(paramsData)
            .then((res) => {
              successMsg(res.msg);
            })
            .catch((err) => {
              errorMsg(err);
            });
          // 提交完成后数据清空
          this.publicReset();
        }
      });
    },
    inputCon(event, type) {
      switch (type) {
        case "qiye":
          this.form.businessname = event;
          break;
        case "faren":
          this.form.farname = event;
          break;
        case "tel":
          this.form.tel = event;
          break;
        case "address":
          this.form.address = event;
          break;
        case "belongOfperson":
          this.form.belongOfperson = event;
          break;
        case "useOfPerson":
          this.form.useOfPerson = event;
          break;
        case "onseHoseInformation":
          this.form.onseHoseInformation = event;
          break;
        default:
          break;
      }
    },
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
.layer-list {
  pointer-events: auto;
  width: 80%;
  height: 80%;
  background-image: url(../../../../assets/imageBS/xinxicaijibeijing.png);
  background-size: 100% 100%;
  position: relative;
  margin: 8% auto;
  .L_title {
    color: #fff;
    height: 50px;
    text-align: center;
    font-size: 25px;
    line-height: 40px;
  }
  .layer-table {
    height: calc(100% - 50px);
    padding: 40px 50px;
    box-sizing: border-box;
    .el-table__row:hover {
      background: rgba(19, 235, 236, 0.15) !important;
      transition: all 0.5s;
      cursor: pointer;
    }
    /deep/.el-form-item__label {
      font-size: 20px;
      color: #00eaffff !important;
    }
    /deep/.el-input__inner {
      width: 100%;
      background-image: url(../../../../assets/imageBS/tianxie.png);
      background-size: 100% 100%;
      border-radius: 0;
    }
    // 表格

    .el-footer {
      position: absolute;
      left: 50%;
      transform: translate(-50%);
      bottom: 30px;
    }
  }
  /deep/.el-input__inner {
    // background: rgba(255, 255, 255, 0.7);
  }
}
</style>