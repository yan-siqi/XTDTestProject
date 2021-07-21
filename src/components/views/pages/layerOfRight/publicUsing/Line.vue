<template>
  <div class="popupTip">
    <div class="topTitle">
      <div class="topTitleLeft">
        <div class="img">
          <img src="@/assets/imageBS/xian.png" alt="" srcset="" />
        </div>
        <p>折线</p>
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
      label-width="50px"
      style="margin-top: 20px"
      :rules="rules"
      :model="ruleForm"
      ref="ruleForm"
    >
      <el-form-item label="名称:" prop="valueOfCordonName">
        <el-input
          :value="ruleForm.valueOfCordonName"
          @input="inpR('4', 'jingjieLine', $event)"
        ></el-input> </el-form-item
      ><el-form-item label="贴地:">
        <el-switch
          v-model="isToground"
          @change="changeGround"
          active-color="#13c66"
          style="text-align: left"
        ></el-switch>
      </el-form-item>
      <el-form-item label="宽度:">
        <div class="block">
          <el-slider
            v-model="valueOfCordonWidth"
            @change="changeWidth('polyline', $event)"
          ></el-slider>
        </div>
      </el-form-item>
      <el-form-item label="颜色:">
        ><input
          class="colorbox"
          type="color"
          value="#ffffff"
          v-model="valueOfColor"
          @input="colorchange('polyline', $event)"
        /><br />
      </el-form-item>
      <div class="bottomBtn">
        <span
          class="confirm"
          @click="confirmCordon('jingjielineDetail', 'ruleForm')"
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
import * as security from "../../../../../app/BPS/security";
import { errorMsg, successMsg } from "../../../../../utils/msg";
export default {
  name: "LineComponent",
  props: {
    CurThis: Object,
    default: () => {},
  },
  data() {
    var validateValueOfCordonName = (rule, value, callback) => {
      if (!value) {
        callback(new Error("折线名称不能为空!"));
      } else {
        callback();
      }
    };
    return {
      name: "折线",
      valueOfCordonName: "",
      isToground: true,
      valueOfCordonWidth: 2,
      valueOfColor: "#C6D133",
      WKT: undefined,
      flag: "",
      ruleForm: {
        valueOfCordonName: "",
      },
      rules: {
        valueOfCordonName: [
          {
            validator: validateValueOfCordonName,
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    confirmCordon(type, formObj) {
      this.$refs[formObj].validate((val) => {
        if (val) {
          var listPositionsOfPolyline = undefined;
          if (type === "jingjielineDetail") {
            this.getLineFlag("1");
            this.flag = "1";
            listPositionsOfPolyline =
              this.CurThis._sfTreeid == undefined
                ? this.CurThis.$parent.$refs.leftContent._line.positions
                : this.CurThis._sfTreeid.positions;
            var string = "";
            for (var i = 0; i < listPositionsOfPolyline.length; i++) {
              string =
                string +
                (listPositionsOfPolyline[i][0] * 180) / Math.PI +
                " " +
                (listPositionsOfPolyline[i][1] * 180) / Math.PI +
                " " +
                listPositionsOfPolyline[i][2] +
                ",";
            }
            this.WKT =
              "LINESTRING Z (" + string.substring(0, string.length - 1) + ")";
            var dataParams = {
              wkt: this.WKT,
              treeid: this.CurThis.$parent.$refs.leftContent.curLineID,
              name: this.ruleForm.valueOfCordonName,
              land: this.isToground,
              width: this.valueOfCordonWidth,
              color: this.valueOfColor,
              type: "1",
              status: 1,
              lid: 2,
            };
          }
          if (this.CurThis._sfTreeid != undefined) {
            dataParams.id = this.CurThis._sfTreeid.id;
            police
              .editLine(dataParams)
              .then((res) => {
                this.CurThis.$parent.$refs.leftContent.getTreeList();
                this.CurThis.$parent.isShowTip = false;
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            security
              .addSecurity(dataParams)
              .then((res) => {
                if (this.flag == "1") {
                  this.CurThis.$parent.$refs.leftContent._line.enabled = false;
                  this.CurThis.$parent.isShowTip = false;
                  this.CurThis.$parent.$refs.leftContent.localCheckList.push(
                    res.data
                  );
                  let addchecked = Array.from(
                    new Set(
                      this.CurThis.$parent.$refs.leftContent.localCheckList
                    )
                  );
                  sessionStorage.setItem("checkedNodeLists", addchecked);
                  this.CurThis.$parent.$refs.leftContent.$nextTick(() => {
                    this.CurThis.$parent.$refs.leftContent.$refs.tree.setCheckedKeys(
                      addchecked
                    );
                  });
                  this.CurThis.$parent.$refs.leftContent.getTreeList();
                }
                successMsg(res.msg);
              })
              .catch((err) => {
                errorMsg(err);
              });
          }
        }
      });
    },
    getLineFlag(type) {
      this.CurThis._sfTreeid = undefined;
      if (type == "1") {
        this.CurThis.$parent.$refs.leftContent.guids.forEach((item, index) => {
          if (this.CurThis.$parent.$refs.leftContent.curLineID == item[0]) {
            if (earth.getObject(item[1])) {
              this.CurThis._sfTreeid = earth.getObject(item[1]);
            }
          }
        });
      }
    },
    colorchange(type, event) {
      if (type == "polyline") {
        this.getLineFlag("1");
        var color = event.target.value;
        if (this.CurThis._sfTreeid != undefined) {
          this.CurThis._sfTreeid.material.XbsjColorMaterial.color =
            color.xeColor;
        } else {
          this.CurThis.$parent.$refs.leftContent._line.material.XbsjColorMaterial.color =
            color.xeColor;
        }
        this.valueOfColor = event.target.value;
      }
    },
    changeWidth(type, e) {
      if (type == "polyline") {
        if (e) {
          this.getLineFlag("1");
          if (this.CurThis._sfTreeid != undefined) {
            this.CurThis._sfTreeid.width = e;
          } else {
            this.CurThis.$parent.$refs.leftContent._line.width = e;
          }
          this.valueOfCordonWidth = e;
        }
      }
    },
    changeGround(event) {
      this.getLineFlag("1");
      if (this.CurThis._sfTreeid != undefined) {
        this.CurThis._sfTreeid.ground = event;
      } else {
        this.CurThis.$parent.$refs.leftContent._line.ground = event;
      }

      this.isToground = event;
    },
    inpR(type, falg, con) {
      if (type === "4") {
        switch (falg) {
          case "jingjieLine":
            this.ruleForm.valueOfCordonName = con;
            break;
          default:
            break;
        }
      }
    },
    cancel() {
      this.CurThis.$parent.isShowTip = false;
      this.getLineFlag("1");
      if (this.CurThis._sfTreeid == undefined) {
        this.CurThis.$parent.$refs.leftContent._line.destroy();
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
    width: 200px;
    height: 30px;
    // border: 1px solid #fff;
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
      bottom: -10px;
    }
  }
  .topTitleRight {
    margin-top: 7px;
    //margin-left: 62px;
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
/deep/.el-input__inner {
  // background: rgba(255, 255, 255, 0.7);
}
</style>