<template>
  <div class="popupTip">
    <div class="topTitle">
      <div class="topTitleLeft">
        <div class="img">
          <img src="@/assets/imageBS/ODxian.png" alt="" srcset="" />
        </div>
        <p>OD线</p>
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
      <el-form-item label="名称" prop="valueOfODLineName">
        <el-input
          :value="ruleForm.valueOfODLineName"
          @input="inpR('4', 'ODLine', $event)"
        ></el-input> </el-form-item
      ><el-form-item label="首尾相连">
        <el-switch
          v-model="isLoop"
          @change="loopChange"
          active-color="#13c66"
          style="text-align: left"
        ></el-switch>
        <span
          style="
            display: inline-block;
            text-align: left;
            font-size: 16px;
            color: #00eaff;
            margin: 0 15px 0 30px;
          "
          >深度检测</span
        >
        <el-switch
          v-model="isDepthTest"
          @change="depthTestChange"
          active-color="#13c66"
          style="text-align: left"
        ></el-switch
      ></el-form-item>
      <el-form-item label="宽度">
        <div class="block">
          <el-slider
            v-model="valueOfODLineWidth"
            @change="changeWidth('OD', $event)"
          ></el-slider>
        </div>
      </el-form-item>
      <el-form-item label="插值方式">
        <el-select
          v-model="interpolationQuery"
          @change="changeSelect('1', $event)"
        >
          <el-option
            v-for="item in interpolationOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="材质类型">
        <el-select v-model="querymaterial" @change="changeSelect('2', $event)">
          <el-option
            v-for="item in materialOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="颜色">
        ><input
          class="colorbox"
          type="color"
          value="#ffffff"
          v-model="valueOfODColor"
          @input="colorchange('OD', $event)"
        />
        <span
          style="
            display: inline-block;
            text-align: left;
            font-size: 16px;
            color: #00eaff;
            margin: 0 15px 0 30px;
          "
          >是否贴地</span
        >
        <el-switch
          v-model="isDepthTest"
          @change="isGround"
          active-color="#13c66"
          style="text-align: left"
        ></el-switch>
      </el-form-item>
      <div class="bottomBtn">
        <span
          class="confirm"
          @click="confirmCordon('ODlineDetail', 'ruleForm')"
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
  name: "ODLineComponent",
  props: {
    CurThis: Object,
    default: () => {},
  },
  data() {
    var validateValueOfODLineName = (rule, value, callback) => {
      if (!value) {
        callback(new Error("OD线名称不能为空!"));
      } else {
        callback();
      }
    };
    return {
      name: "OD线",
      interpolationQuery: "GE",
      policeCurThis: null,
      // 插值方式
      interpolationOptions: [
        {
          value: "GE",
          label: "GEODESIC",
        },
        {
          value: "NO",
          label: "NONE",
        },
        {
          value: "RH",
          label: "RHUMB",
        },
      ],
      querymaterial: "gjx",
      // 材质类型
      materialOptions: [
        {
          value: "sx",
          label: "实线",
        },
        {
          value: "jtx",
          label: "箭头线",
        },
        {
          value: "gjx",
          label: "轨迹线",
        },
      ],
      valueOfODLineName: "", //名称
      valueOfODColor: "#C6D133",
      isLoop: false, // 首尾相连
      isDepthTest: false, // 是否开启深度检测
      valueOfODLineWidth: 2,
      interpolation: "", // 插值方式
      material: "", // 材质类型
      curGround: true,
      flag: "",
      WKT: "",
      ruleForm: {
        valueOfODLineName: "", // 警戒线名称
      },
      rules: {
        // 警戒线名称
        valueOfODLineName: [
          {
            validator: validateValueOfODLineName,
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 判断是编辑还是添加
    getLineFlag(type) {
      this.CurThis._sfTreeid = undefined;
      if (type == "1") {
        this.CurThis.$parent.$refs.leftContent.guids.forEach((item, index) => {
          if (this.CurThis.$parent.$refs.leftContent.curLineID == item[0]) {
            if (earth.getObject(item[1])) {
              this.CurThis._sfTreeid = earth.getObject(item[1]);
              this.CurThis._sfTreeid.isSelected = false;
            }
          }
        });
      } else if (type == "2") {
        this.CurThis.$parent.$refs.leftContent.ODLineGuids.forEach(
          (item, index) => {
            if (this.CurThis.$parent.$refs.leftContent.curLineID == item[0]) {
              if (earth.getObject(item[1])) {
                this.CurThis._sfTreeid = earth.getObject(item[1]);
                this.CurThis._sfTreeid.isSelected = false;
              }
            }
          }
        );
      }
    },
    confirmCordon(type, formObj) {
      this.$refs[formObj].validate((val) => {
        if (val) {
          var listPositionsOfPolyline = undefined;
          if (type === "ODlineDetail") {
            this.getLineFlag("2");
            this.flag = "2";
            listPositionsOfPolyline =
              this.CurThis._sfTreeid == undefined
                ? this.CurThis.$parent.$refs.leftContent._ODline.positions
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
              lid: 6,
              type: "2",
              name: this.ruleForm.valueOfODLineName,
              link: this.isLoop,
              depeth: this.isDepthTest,
              width: this.valueOfODLineWidth,
              style: this.interpolationQuery,
              material: this.querymaterial,
              color: this.valueOfODColor,
              land: this.curGround,
              status: 1,
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
                if (this.flag == "2") {
                  this.CurThis.$parent.$refs.leftContent._ODline.enabled = false;
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
                successMsg(res.msg); // 添加成功
              })
              .catch((err) => {
                errorMsg(err);
              });
          }
        }
      });
    },

    // 切换颜色
    colorchange(type, event) {
      if (type == "OD") {
        this.getLineFlag("2");
        var color = event.target.value;
        if (this.CurThis._sfTreeid != undefined) {
          if (
            this.CurThis._sfTreeid.material.type == "XbsjPolylineDashMaterial"
          ) {
            this.CurThis._sfTreeid.material.XbsjPolylineDashMaterial.color =
              color.xeColor;
          } else if (
            this.CurThis._sfTreeid.material.type == "XbsjPolylineArrowMaterial"
          ) {
            this.CurThis._sfTreeid.material.XbsjPolylineArrowMaterial.color =
              color.xeColor;
          } else {
            this.CurThis._sfTreeid.material.XbsjODLineMaterial.color =
              color.xeColor;
          }
        } else {
          if (
            this.CurThis.$parent.$refs.leftContent._ODline.material.type ==
            "XbsjPolylineDashMaterial"
          ) {
            this.CurThis.$parent.$refs.leftContent._ODline.material.XbsjPolylineDashMaterial.color =
              color.xeColor;
          } else if (
            this.CurThis.$parent.$refs.leftContent._ODline.material.type ==
            "XbsjPolylineArrowMaterial"
          ) {
            this.CurThis.$parent.$refs.leftContent._ODline.material.XbsjPolylineArrowMaterial.color =
              color.xeColor;
          } else {
            this.CurThis.$parent.$refs.leftContent._ODline.material.XbsjODLineMaterial.color =
              color.xeColor;
          }
        }
        this.valueOfODColor = event.target.value;
      } else if (type == "polyline") {
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
      } else if (type == "Polygon") {
        this.getPolygonFlag();
        if (this.CurThis._sfTreeid !== undefined) {
          this.CurThis._sfTreeid.color = event.target.value.xeColor;
        } else {
          this.CurThis.$parent.$refs.leftContent._polygon.color =
            event.target.value.xeColor;
        }
        this.CurThis.valueOfPolygonColor = event.target.value;
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
    changeSelect(type, event) {
      this.getLineFlag("2");
      if (type === "1") {
        this.interpolation = event;
        if (this.CurThis._sfTreeid != undefined) {
          if (this.interpolation == "GE") {
            this.CurThis.$parent.$refs.leftContent._ODline.arcType = "GEODESIC";
            this.CurThis._sfTreeid.arcType = "GEODESIC";
            this.interpolation = "GEODESIC";
          } else if (this.interpolation == "NO") {
            this.CurThis.$parent.$refs.leftContent._ODline.arcType = "NONE";
            this.interpolation = "NONE";
            this.CurThis._sfTreeid.arcType = "NONE";
          } else if (this.interpolation == "RH") {
            this.CurThis.$parent.$refs.leftContent._ODline.arcType = "RHUMB";
            this.interpolation = "RHUMB";
            this.CurThis._sfTreeid.arcType = "RHUMB";
          }
        } else {
          if (this.interpolation == "GE") {
            this.CurThis.$parent.$refs.leftContent._ODline.arcType = "GEODESIC";
          } else if (this.interpolation == "NO") {
            this.CurThis.$parent.$refs.leftContent._ODline.arcType = "NONE";
          } else if (this.interpolation == "RH") {
            this.CurThis.$parent.$refs.leftContent._ODline.arcType = "RHUMB";
          }
        }
      } else {
        this.material = event;
        if (this.CurThis._sfTreeid != undefined) {
          if (this.material == "sx") {
            this.CurThis._sfTreeid.material.type = "XbsjPolylineDashMaterial";
            this.CurThis._sfTreeid.material.XbsjPolylineDashMaterial.color = this.valueOfODColor.xeColor;
          } else if (this.material == "jtx") {
            this.CurThis._sfTreeid.material.type = "XbsjPolylineArrowMaterial";
            this.CurThis._sfTreeid.material.XbsjPolylineArrowMaterial.color = this.valueOfODColor.xeColor;
          } else if (this.material == "gjx") {
            this.CurThis._sfTreeid.material.type = "XbsjODLineMaterial";
            this.CurThis._sfTreeid.material.XbsjODLineMaterial.color = this.valueOfODColor.xeColor;
          }
        } else {
          if (this.material == "sx") {
            this.CurThis.$parent.$refs.leftContent._ODline.material.type =
              "XbsjPolylineDashMaterial";
            this.CurThis.$parent.$refs.leftContent._ODline.material.XbsjPolylineDashMaterial.color = this.valueOfODColor.xeColor;
            this.material = "XbsjPolylineDashMaterial";
          } else if (this.material == "jtx") {
            this.CurThis.$parent.$refs.leftContent._ODline.material.type =
              "XbsjPolylineArrowMaterial";
            this.CurThis.$parent.$refs.leftContent._ODline.material.XbsjPolylineArrowMaterial.color = this.valueOfODColor.xeColor;
            this.material = "XbsjPolylineArrowMaterial";
          } else if (this.material == "gjx") {
            this.CurThis.$parent.$refs.leftContent._ODline.material.type =
              "XbsjODLineMaterial";
            this.CurThis.$parent.$refs.leftContent._ODline.material.XbsjODLineMaterial.color = this.valueOfODColor.xeColor;
            this.material = "XbsjODLineMaterial";
          }
        }
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
    isGround(event) {
      this.getLineFlag("2");
      this.curGround = event;
      if (this.CurThis._sfTreeid != undefined) {
        this.CurThis._sfTreeid.ground = this.curGround;
      } else {
        this.CurThis.$parent.$refs.leftContent._ODline.ground = this.curGround;
      }
    },
    depthTestChange(event) {
      this.getLineFlag("2");
      this.isDepthTest = event;
      if (this.CurThis._sfTreeid != undefined) {
      } else {
        this.CurThis.$parent.$refs.leftContent._ODline.depthTest = this.isDepthTest;
      }
    },
    loopChange(event) {
      this.getLineFlag("2");
      this.isLoop = event;
      if (this.CurThis._sfTreeid != undefined) {
        this.CurThis._sfTreeid.loop = this.isLoop;
      } else {
        this.CurThis.$parent.$refs.leftContent._ODline.loop = this.isLoop;
      }
    },
    inpR(type, falg, con) {
      if (type === "4") {
        switch (falg) {
          case "ODLine":
            this.ruleForm.valueOfODLineName = con;
          default:
            break;
        }
      }
    },
    cancel() {
      this.CurThis.$parent.isShowTip = false;
      this.getLineFlag("2");
      if (this.CurThis._sfTreeid == undefined) {
        this.CurThis.$parent.$refs.leftContent._ODline.destroy();
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
    width: 150px;
    height: 30px;
    display: flex;
    .img {
      width: 30px;
      height: 100%;
    }
    p {
      display: inline-block;
      color: #fff;
      line-height: 30px;
      width: 50px;
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
/deep/.el-input__inner {
  //background: rgba(255, 255, 255, 0.7);
}
</style>