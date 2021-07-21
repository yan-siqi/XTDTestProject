<template>
  <div class="layer-list" v-show="isShow">
    <div class="L_title">
      <p>高点建筑物人员信息采集</p>
    </div>
    <div class="layer-table">
      <el-form
        ref="form"
        :model="form"
        label-width="100px"
        style="color: #fff"
        :rules="rules"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名:" prop="name">
              <el-input
                @change="inputP($event, 'name')"
                v-model="form.name"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工作单位:" prop="unit">
              <el-input
                @change="inputP($event, 'unit')"
                v-model="form.unit"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="联系方式:" prop="tel">
              <el-input
                v-model="form.tel"
                @change="inputP($event, 'tel')"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="居住地址:" prop="address">
          <el-input
            v-model="form.address"
            @change="inputP($event, 'address')"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="基本信息:" prop="basic">
          <el-input
            v-model="form.basic"
            @change="inputP($event, 'basic')"
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
  name: "personalInformation",
  data() {
    var validatePersonName = (rule, value, callback) => {
      if (!value) {
        callback(new Error("名称不能为空!"));
      } else {
        callback();
      }
    };
    var validatePersonUnit = (rule, value, callback) => {
      if (!value) {
        callback(new Error("工作单位不能为空!如暂无工作单位请写'无'!"));
      } else {
        callback();
      }
    };
    var validatePersonTel = (rule, value, callback) => {
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
    var validatePersonAddress = (rule, value, callback) => {
      if (!value) {
        callback(new Error("地址不能为空!"));
      } else {
        callback();
      }
    };
    var validatePersonBasic = (rule, value, callback) => {
      if (!value) {
        callback(new Error("基本信息不能为空!"));
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
        name: "", //名称
        unit: "", //工作单位
        tel: "", // 联系方式
        address: "", //地址
        basic: "", //基本信息
      },
      rules: {
        name: [
          {
            validator: validatePersonName,
            trigger: "blur",
          },
        ],
        unit: [
          {
            validator: validatePersonUnit,
            trigger: "blur",
          },
        ],
        tel: [
          {
            validator: validatePersonTel,
            trigger: "blur",
          },
        ],
        address: [
          {
            validator: validatePersonAddress,
            trigger: "blur",
          },
        ],
        basic: [
          {
            validator: validatePersonBasic,
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    resets() {
      this.form.name = "";
      this.form.unit = "";
      this.form.tel = "";
      this.form.address = "";
      this.form.basic = "";
    },
    cancel() {
      this.resets();
    },
    confirm(formConfig) {
      this.$refs[formConfig].validate((val) => {
        if (val) {
          let paramsData = {
            name: this.form.name, // 姓名
            unit: this.form.unit, //工作单位
            tel: this.form.tel, //联系方式
            address: this.form.address, // 居住地址
            basic: this.form.basic, //基本信息
          };
          information
            .addgaodianRenyuan(paramsData)
            .then((res) => {
              successMsg(res.msg);
            })
            .catch((err) => {
              errorMsg(err);
            });
          // 提交完成后数据清空
          this.resets();
        }
      });
    },
    inputP(event, type) {
      switch (type) {
        case "name":
          this.form.name = event;
          break;
        case "unit":
          this.form.unit = event;
          break;
        case "tel":
          this.form.tel = event;
          break;
        case "address":
          this.form.address = event;
          break;
        case "basic":
          this.form.basic = event;
          break;
        default:
          break;
      }
    },
    closePop() {},
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