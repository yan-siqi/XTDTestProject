// 普通点位初始化
export function isShowPinPub(_thisShow) {
    _thisShow.$parent.$children[1].isShowPoliceCar = false;
    _thisShow.$parent.$children[1].isShowPoliceMan = false;
    _thisShow.$parent.$children[1].isShowVideo = false;
    _thisShow.$parent.$children[1].isShowCordon = false;
    _thisShow.$parent.$children[1].isShowODLine = false;
    _thisShow.$parent.$children[1].isShowPolygon = false;
    _thisShow.$parent.$children[1].isShowPublicPoint = true;
    _thisShow.$parent.$children[1].isShowPublicFace = false; // 只显示面的配置弹框
    //0527修改
    _thisShow.$parent.$children[1].$refs.PublicPointRef.ruleForm.valueOfPoint = "";
    _thisShow.$parent.$children[1].$refs.PublicPointRef.valueOfPointLong = "";
    _thisShow.$parent.$children[1].$refs.PublicPointRef.valueOfPointLat = "";
    _thisShow.$parent.$children[1].$refs.PublicPointRef.size = "48";
    _thisShow.$parent.$children[1].$refs.PublicPointRef.content = "";
    _thisShow.$parent.$children[1].$refs.PublicPointRef.extendText = "";
    _thisShow.$parent.$children[1].$refs.PublicPointRef.deviationL = "";
    _thisShow.$parent.$children[1].$refs.PublicPointRef.deviationR = "";
}
// 折线初始化 isShowPubUtils 函数总称
export function isShowCordon(_thisShow) {
    _thisShow.$parent.$children[1].isShowPoliceCar = false;
    _thisShow.$parent.$children[1].isShowPoliceMan = false;
    _thisShow.$parent.$children[1].isShowVideo = false;
    _thisShow.$parent.$children[1].isShowCordon = true;
    _thisShow.$parent.$children[1].isShowODLine = false;
    _thisShow.$parent.$children[1].isShowPolygon = false;
    _thisShow.$parent.$children[1].isShowPublicPoint = false;
    _thisShow.$parent.$children[1].isShowPublicFace = false; // 只显示面的配置弹框
    // 初始化
    //0527 修改
    _thisShow.$parent.$children[1].$refs.lineRef.ruleForm.valueOfCordonName = "";
    _thisShow.$parent.$children[1].$refs.lineRef.isToground = false;
    _thisShow.$parent.$children[1].$refs.lineRef.valueOfCordonWidth = 2;
    _thisShow.$parent.$children[1].$refs.lineRef.valueOfColor = "#ffffff";
}
// OD线初始化 isShowPubUtils 函数总称
export function isShowODLine(_thisShow) {
    _thisShow.$parent.$children[1].isShowPoliceCar = false;
    _thisShow.$parent.$children[1].isShowPoliceMan = false;
    _thisShow.$parent.$children[1].isShowVideo = false;
    _thisShow.$parent.$children[1].isShowCordon = false;
    _thisShow.$parent.$children[1].isShowODLine = true;
    _thisShow.$parent.$children[1].isShowPolygon = false;
    _thisShow.$parent.$children[1].isShowPublicPoint = false;
    _thisShow.$parent.$children[1].isShowPublicFace = false; // 只显示面的配置弹框
    // 初始化
    //0527修改
    _thisShow.$parent.$children[1].$refs.ODLineRef.ruleForm.valueOfODLineName = "";
    _thisShow.$parent.$children[1].$refs.ODLineRef.isLoop = false;
    _thisShow.$parent.$children[1].$refs.ODLineRef.isDepthTest = "";
    _thisShow.$parent.$children[1].$refs.ODLineRef.valueOfODLineWidth = 2;
    _thisShow.$parent.$children[1].$refs.ODLineRef.interpolationQuery = "GE";
    _thisShow.$parent.$children[1].$refs.ODLineRef.querymaterial = "gjx";
    _thisShow.$parent.$children[1].$refs.ODLineRef.valueOfODColor = "#C6D133";
}
// 立方体初始化 isShowPubUtils 函数总称
export function isShowLifangti(_thisShow) {
    _thisShow.$parent.$children[1].isShowPoliceCar = false;
    _thisShow.$parent.$children[1].isShowPoliceMan = false;
    _thisShow.$parent.$children[1].isShowVideo = false;
    _thisShow.$parent.$children[1].isShowCordon = false;
    _thisShow.$parent.$children[1].isShowODLine = false;
    _thisShow.$parent.$children[1].isShowPolygon = true;
    _thisShow.$parent.$children[1].isShowPublicPoint = false;
    _thisShow.$parent.$children[1].isShowPublicFace = false;
    _thisShow.$parent.$children[1].valueOfPolygonName = "";
    _thisShow.$parent.$children[1].isPolygonGround = false;
    // 弹框配置
    _thisShow.$parent.$children[1].isShowBorder = true;
    _thisShow.$parent.$children[1].isShowPublicFace = false; // 只显示面的配置弹框
    // 0527修改
    _thisShow.$parent.$children[1].$refs.cubeRef.ruleForm.valueOfPolygonName = "";
    _thisShow.$parent.$children[1].$refs.cubeRef.valueOfdependWidth = 5;
    _thisShow.$parent.$children[1].$refs.cubeRef.valueOfBorderWidth = 2;
    _thisShow.$parent.$children[1].$refs.cubeRef.valueOfPolygonColor = "#C6D133";
    _thisShow.$parent.$children[1].$refs.cubeRef.valueOfBorderColor = "#C6D133";
    _thisShow.$parent.$children[1].$refs.cubeRef.valueOfPolygonName = "";
}
// 面初始化 isShowPubUtils 函数总称
export function isShowFace(_thisShow) {
    _thisShow.$parent.isShowTip = true;
    _thisShow.$parent.$children[1].isShowPublicFace = true; // 只显示面的配置弹框
    _thisShow.$parent.$children[1].isShowPoliceCar = false;
    _thisShow.$parent.$children[1].isShowPoliceMan = false;
    _thisShow.$parent.$children[1].isShowVideo = false;
    _thisShow.$parent.$children[1].isShowCordon = false;
    _thisShow.$parent.$children[1].isShowODLine = false;
    _thisShow.$parent.$children[1].isShowPolygon = false;
    _thisShow.$parent.$children[1].isShowPublicPoint = false;
    //0527
    _thisShow.$parent.$children[1].$refs.polygonRef.ruleForm.valueOfFaceName = "";
    _thisShow.$parent.$children[1].$refs.polygonRef.isFaceGround = false;
    _thisShow.$parent.$children[1].$refs.polygonRef.isShowFaceBorder = true;
    _thisShow.$parent.$children[1].$refs.polygonRef.valueOfFaceBorderWidth = 2;
    _thisShow.$parent.$children[1].$refs.polygonRef.valueOffaceColor = "#C6D133";
    _thisShow.$parent.$children[1].$refs.polygonRef.valueOfFaceBorderColor = "#73FB18";
}
// 警员初始化 isShowPubUtils 函数总称
export function isShowPoliceCar(_thisShow) {
    _thisShow.$parent.$children[1].isShowPoliceCar = true;
    _thisShow.$parent.$children[1].isShowPoliceMan = false;
    _thisShow.$parent.$children[1].isShowVideo = false;
    _thisShow.$parent.$children[1].isShowCordon = false;
    _thisShow.$parent.$children[1].isShowODLine = false;
    _thisShow.$parent.$children[1].isShowPolygon = false;
    _thisShow.$parent.$children[1].isShowPublicPoint = false;
    _thisShow.$parent.$children[1].isShowPublicFace = false; // 只显示面的配置弹框
    //0527 修改 组件拆分 0528 +校验规则
    _thisShow.$parent.$children[1].$refs.policeCarRef.ruleForm.valueOfPoliceCarID = "";
    _thisShow.$parent.$children[1].$refs.policeCarRef.ruleForm.valueOfCarNum = ""; // 清除
    _thisShow.$parent.$children[1].$refs.policeCarRef.ruleForm.valueOfCarType = "";
    _thisShow.$parent.$children[1].$refs.policeCarRef.ruleForm.valueOfCarLongitude = "";
    _thisShow.$parent.$children[1].$refs.policeCarRef.ruleForm.valueOfCarLatitude = "";
}
// 警员初始化 isShowPubUtils 函数总称
export function isShowPolicePerson(_thisShow) {
    _thisShow.$parent.$children[1].isShowPoliceMan = true;
    _thisShow.$parent.$children[1].isShowPoliceCar = false; // 展示警车
    _thisShow.$parent.$children[1].isShowVideo = false;
    _thisShow.$parent.$children[1].isShowPublicPoint = false;
    _thisShow.$parent.$children[1].isShowODLine = false;
    _thisShow.$parent.$children[1].isShowCordon = false;
    _thisShow.$parent.$children[1].isShowPolygon = false;
    _thisShow.$parent.$children[1].isShowPublicFace = false; // 只显示面的配置弹框
    //0527 修改 拆分组件 0528 定义校验规则
    _thisShow.$parent.$children[1].$refs.policePersonRef.ruleForm.valueOfPoliceID = "";
    _thisShow.$parent.$children[1].$refs.policePersonRef.ruleForm.valueOfName = ""; // 清除
    _thisShow.$parent.$children[1].$refs.policePersonRef.ruleForm.valueOfPoliceTel = "";
    _thisShow.$parent.$children[1].$refs.policePersonRef.ruleForm.valueOfPoliceEqp = "";
    _thisShow.$parent.$children[1].$refs.policePersonRef.ruleForm.valueOfPoliceLongitude = "";
    _thisShow.$parent.$children[1].$refs.policePersonRef.ruleForm.valueOfPoliceLatitude = "";
}