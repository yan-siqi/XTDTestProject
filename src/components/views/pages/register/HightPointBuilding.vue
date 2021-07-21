<template>
  <div class="layer-list" v-show="isShow">
    <div class="L_title">
      <p>高点建筑物内部结构信息采集</p>
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
          <el-form-item label="建筑物名称:" prop="name">
            <el-input
              @change="inputH($event, 'jianzhuname')"
              v-model="form.name"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-row>
        <el-form-item label="建筑物地址:" prop="address">
          <el-input
            v-model="form.address"
            @change="inputH($event, 'address')"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <div class="xianchang">
              <p>现场照片</p>
              <el-upload
                style="position: relative"
                class="avatar-uploader"
                action="#"
                :show-file-list="false"
                :before-upload="beforeAvatarUpload"
                :http-request="uploadImgCur"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                <i
                  @click.stop="imageUrl = ''"
                  v-if="imageUrl"
                  class="el-icon-circle-close"
                  style="
                    font-size: 26px;
                    vertical-align: top;
                    position: absolute;
                    right: 0;
                    top: 0;
                  "
                ></i>
              </el-upload>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="neibuhuxing">
              <p>内部户型图</p>
              <el-upload
                class="avatar-uploader"
                action="#"
                :show-file-list="false"
                :before-upload="beforeAvatarUpload"
                :http-request="uploadImgInner"
              >
                <img v-if="imageUrlInner" :src="imageUrlInner" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                <i
                  @click.stop="imageUrlInner = ''"
                  v-if="imageUrlInner"
                  class="el-icon-circle-close"
                  style="
                    font-size: 26px;
                    vertical-align: top;
                    position: absolute;
                    right: 0;
                    top: 0;
                  "
                ></i>
              </el-upload>
            </div>
          </el-col>
        </el-row>
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
import { errorMsg, successMsg } from "../../../../utils/msg";
import * as information from "../../../../app/BPS/informationSelecting";
export default {
  name: "hightPointBuilding",
  data() {
    var validateName = (rule, value, callback) => {
      if (!value) {
        callback(new Error("建筑物名称不能为空!"));
      } else {
        callback();
      }
    };
    var validateAddress = (rule, value, callback) => {
      if (!value) {
        callback(new Error("建筑物地址不能为空!"));
      } else {
        callback();
      }
    };
    return {
      totalCount: 12,
      tableData: [],
      imageOfxianchangUrl: "",
      imageOfnbhxtUrl: "",
      isShow: true,
      form: {
        name: "",
        address: "",
      },
      rules: {
        name: [
          {
            validator: validateName,
            trigger: "blur",
          },
        ],
        address: [
          {
            validator: validateAddress,
            trigger: "blur",
          },
        ],
      },
      //list: [],
      currentPage: 1,
      pageSize: 9,
      total: 0,
      loading: false,
      datas: [],
      currentRow: null,
      filename: "请插入图片",
      objectHeight: 0,
      iconBase64: null,
      scene: null,
      textInput: "",
      textNumber: "",
      imageUrl: "", // 现场照片
      imageUrlInner: "", //内部户型图
    };
  },
  methods: {
    resets() {
      this.form.name = "";
      this.form.address = "";
      this.imageUrl = "";
      this.imageUrlInner = "";
    },
    // 确认提交
    confirm(formConfig) {
      this.$refs[formConfig].validate((val) => {
        if (val) {
          let paramsData = {
            name: this.form.name,
            address: this.form.address,
            imageUrl: this.imageUrl, //现场照片
            imageUrlInner: this.imageUrlInner, // 内部户型图
          };
          information
            .addgaodian(paramsData)
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
    // 取消
    cancel() {
      this.resets();
    },
    // 覆盖面默认
    uploadImgCur(param) {
      let formData = new FormData();
      const isJPG = param.file.type === "image/jpeg";
      const isPNG = param.file.type === "image/png";
      const isLt2M = param.file.size / 1024 / 1024 < 2;
      if (!isPNG) {
        this.$message.error("上传现场照片图片只能是 PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传现场照片图片大小不能超过 2MB!");
      }
      formData.append("files", param.file);
      information.addimg(formData).then((res) => {
        this.imageUrl = process.env.VUE_APP_API_ROOT + "images/" + res.data;
      });
      return isPNG && isLt2M;
    },
    uploadImgInner(file) {
      let formData = new FormData();
      const isJPG = file.file.type === "image/jpeg";
      const isPNG = file.file.type === "image/png";
      const isLt2M = file.file.size / 1024 / 1024 < 2;
      if (!isPNG) {
        this.$message.error("上传内部户型图只能是 PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传内部户型图大小不能超过 2MB!");
      }
      formData.append("files", file.file);
      information.addimg(formData).then((res) => {
        this.imageUrlInner =
          process.env.VUE_APP_API_ROOT + "images/" + res.data;
        successMsg(res.msg);
      });
      //  this.imageUrlInner = URL.createObjectURL(file.file);
      //blob:http://192.168.0.132:8080/f0b14cc0-5f41-494a-a8b7-9319e8feab54
      return isPNG && isLt2M;
    },
    // 上传之前做校验
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isPNG) {
        this.$message.error("上传头像图片能是 PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isPNG && isLt2M;
    },
    inputH(eve, type) {
      switch (type) {
        case "jianzhuname":
          this.form.businessname = eve;
          break;
        case "address":
          this.form.farname = eve;
          break;
        default:
          break;
      }
    },
    // 数据渲染
    data() {
      this.datas = this.list;
      this.tableData = this.list.slice(0, 9);
      this.total = this.totalCount;
    },
    //
    closePop() {
      //this.$emit("OnClosePopWin", { show: false });
      // this.isShow = false;
    },
  },
  mounted() {},
};
</script>
<style lang="less"scoped>
.layer-list {
  pointer-events: auto;
  width: 80%;
  height: 80%;
  background-image: url(../../../../assets/imageBS/xinxicaijibeijing.png);
  background-size: 100% 100%;
  margin: 8% auto;
  position: relative;
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
    .xianchang {
      margin: 20px 0 0 100px;
      width: 334px;
      height: 200px;
      p {
        text-align: left;
        font-size: 20px;
        color: #00eaffff !important;
      }
    }
    .neibuhuxing {
      margin: 20px 0 0 90px;
      width: 334px;
      height: 200px;
      p {
        text-align: left;
        font-size: 20px;
        color: #00eaffff !important;
      }
    }
    /deep/.el-form-item__label {
      font-size: 20px;
      color: #00eaffff !important;
    }
    /deep/.el-input__inner {
      width: 90%;
      background-image: url(../../../../assets/imageBS/tianxie.png);
      background-size: 100% 100%;
      border-radius: 0;
    }
    /deep/.avatar-uploader .el-upload {
      border: 2px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 16vw;
      height: 165px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 16vw;
      height: 165px;
      display: block;
    }
  }
  .el-footer {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    bottom: 30px;
  }
  /deep/.el-input__inner {
    //background: rgba(255, 255, 255, 0.9);
  }
}
</style>