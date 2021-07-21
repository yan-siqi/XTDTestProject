<template>
  <div class="layer-list" v-show="isShow">
    <div class="L_title">
      <p>高点建筑物单位信息采集</p>
      <div class="L_rightBtn"></div>
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
            <el-form-item label="单位名称:" prop="name">
              <el-input
                @change="inputUnit($event, 'name')"
                v-model="form.name"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位代码:" prop="code">
              <el-input
                v-model="form.code"
                @change="inputUnit($event, 'code')"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="建筑物名称:" prop="buname">
              <el-input
                @change="inputUnit($event, 'buname')"
                v-model="form.buildingName"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="建筑物代码:" prop="bucode">
              <el-input
                @change="inputUnit($event, 'bucode')"
                v-model="form.buildingCode"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="地址:" prop="buaddress">
          <el-input
            @change="inputUnit($event, 'buaddress')"
            v-model="form.address"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="基本信息:" prop="bubasic">
          <el-input
            @change="inputUnit($event, 'bubasic')"
            v-model="form.basicInformation"
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
  name: "units",
  data() {
    var vallidateUnitName = (rule, value, callback) => {
      if (!value) {
        callback(new Error("单位名称不能为空!"));
      } else {
        callback();
      }
    };
    var vallidateUnitCode = (rule, value, callback) => {
      if (!value) {
        callback(new Error("单位代码不能为空!"));
      } else {
        callback();
      }
    };
    var validateUnitBuildingName = (rule, value, callback) => {
      if (!value) {
        callback(new Error("建筑物名称不能为空!"));
      } else {
        callback();
      }
    };
    var vallidateUnitBuildingCode = (rule, value, callback) => {
      if (!value) {
        callback(new Error("建筑物代码不能为空!"));
      } else {
        callback();
      }
    };
    var vallidateUnitAddress = (rule, value, callback) => {
      if (!value) {
        callback(new Error("建筑物地址不能为空!"));
      } else {
        callback();
      }
    };
    var vallidateUnitBasicInformation = (rule, value, callback) => {
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
        name: "",
        code: "",
        buildingName: "",
        buildingCode: "",
        address: "",
        basicInformation: "",
      },
      rules: {
        name: [
          {
            validator: vallidateUnitName,
            trigger: "blur",
          },
        ],
        code: [
          {
            validator: vallidateUnitCode,
            trigger: "blur",
          },
        ],
        buildingName: [
          {
            validator: validateUnitBuildingName,
            trigger: "blur",
          },
        ],
        buildingCode: [
          {
            validator: vallidateUnitBuildingCode,
            trigger: "blur",
          },
        ],
        address: [
          {
            validator: vallidateUnitAddress,
            trigger: "blur",
          },
        ],
        basicInformation: [
          {
            validator: vallidateUnitBasicInformation,
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    resets() {
      this.form.name = "";
      this.form.code = "";
      this.form.buildingName = "";
      this.form.buildingCode = "";
      this.form.address = "";
      this.form.basicInformation = "";
    },
    cancel() {
      this.resets();
    },
    confirm(formConfig) {
      this.$refs[formConfig].validate((val) => {
        if (val) {
          let paramsData = {
            names: this.form.name, // 单位名称
            code: this.form.code, //单位代码
            buildingName: this.form.buildingName, //建筑物名称
            buildingCode: this.form.buildingCode, // 建筑物代码
            address: this.form.address, //地址
            basicInformation: this.form.basicInformation, //基本信息
          };
          information
            .addgaodianDanwei(paramsData)
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
    inputUnit(event, type) {
      switch (type) {
        case "name":
          this.form.name = event;
          break;
        case "code":
          this.form.code = event;
          break;
        case "buname":
          this.form.buildingName = event;
          break;
        case "bucode":
          this.form.buildingCode = event;
          break;
        case "buaddress":
          this.form.address = event;
          break;
        case "bubasic":
          this.form.basicInformation = event;
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
    .current-row {
      background: rgba(19, 235, 236, 0.15) !important;
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
    //  background: rgba(255, 255, 255, 0.7);
  }
}
</style>