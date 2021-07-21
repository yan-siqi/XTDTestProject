// 点击折线节点 clickNodeUtils
export function clickCordon(event, isChecked, clickThis, tipContent) {
    if (isChecked.checked) {
        clickThis.$parent.isShowTip = true;
    }
    clickThis.curLineID = event.id;
    for (var i = 0; i < tipContent.length; i++) {
        clickThis.$parent.$refs.rightContent.isShowPoliceCar = false;
        clickThis.$parent.$refs.rightContent.isShowPoliceMan = false;
        clickThis.$parent.$refs.rightContent.isShowVideo = false;
        clickThis.$parent.$refs.rightContent.isShowPublicPoint = false;
        clickThis.$parent.$refs.rightContent.isShowCordon = true;
        clickThis.$parent.$refs.rightContent.isShowODLine = false;
        clickThis.$parent.$refs.rightContent.isShowPublicFace = false;
        clickThis.$parent.$refs.rightContent.isShowPolygon = false;
        //0527
        clickThis.$parent.$refs.rightContent.$refs.lineRef.ruleForm.valueOfCordonName = tipContent[i].name;
        clickThis.$parent.$refs.rightContent.$refs.lineRef.isToground = tipContent[i].land;
        clickThis.$parent.$refs.rightContent.$refs.lineRef.valueOfCordonWidth = parseInt(
            tipContent[i].width
        );
        clickThis.$parent.$refs.rightContent.$refs.lineRef.valueOfColor = tipContent[i].color;
        if (isChecked.checked) {
            try {
                clickThis.$parent.$refs.rightContent.$refs.lineRef.getLineFlag("1");
                clickThis.$parent.$refs.rightContent._sfTreeid.flyTo(); //飞入该对象
            } catch (err) {
                console.log(err);
            }

        }
    }
}
// 点击立方体节点 clickNodeUtils
export function clickLifangti(event, isChecked, clickThis, tipContent) {
    if (isChecked.checked) {
        clickThis.$parent.isShowTip = true;// 如果是选中状态
    }
    clickThis.curPolyGonID = event.id;
    for (var i = 0; i < tipContent.length; i++) {
        clickThis.$parent.$refs.rightContent.isShowPoliceCar = false;
        clickThis.$parent.$refs.rightContent.isShowPoliceMan = false;
        clickThis.$parent.$refs.rightContent.isShowVideo = false;
        clickThis.$parent.$refs.rightContent.isShowPublicPoint = false;
        clickThis.$parent.$refs.rightContent.isShowCordon = false;
        clickThis.$parent.$refs.rightContent.isShowODLine = false;
        clickThis.$parent.$refs.rightContent.isShowPublicFace = false;
        clickThis.$parent.$refs.rightContent.isShowPolygon = true;
        //0527
        clickThis.$parent.$refs.rightContent.$refs.cubeRef.ruleForm.valueOfPolygonName = tipContent[i].name;
        clickThis.$parent.$refs.rightContent.$refs.cubeRef.isPolygonGround = tipContent[i].ground;
        clickThis.$parent.$refs.rightContent.$refs.cubeRef.isShowBorder = tipContent[i].show;
        clickThis.$parent.$refs.rightContent.$refs.cubeRef.valueOfdependWidth = tipContent[i].height;
        clickThis.$parent.$refs.rightContent.$refs.cubeRef.valueOfBorderWidth = parseInt(
            tipContent[i].width
        );
        clickThis.$parent.$refs.rightContent.$refs.cubeRef.valueOfBorderColor = tipContent[i].bcolor;
        clickThis.$parent.$refs.rightContent.$refs.cubeRef.valueOfPolygonColor = tipContent[i].color;
    }
    if (isChecked.checked) {
        try {
            clickThis.$parent.$refs.rightContent.$refs.cubeRef.getPolygonFlag();
            clickThis.$parent.$refs.rightContent._sfTreeid.flyTo(); //飞入该对象   
        } catch (err) {
            console.log(err);
        }
    }

}
// 点击一般点位节点 clickNodeUtils
export function clickPublicPin(event, isChecked, clickThis, tipContent) {
    if (isChecked.checked) {
        clickThis.$parent.isShowTip = true;// 如果是选中状态
    }
    clickThis.curPInID = event.id;
    for (var i = 0; i < tipContent.length; i++) {
        clickThis.$parent.$refs.rightContent.isShowPoliceCar = false;
        clickThis.$parent.$refs.rightContent.isShowPoliceMan = false;
        clickThis.$parent.$refs.rightContent.isShowVideo = false;
        clickThis.$parent.$refs.rightContent.isShowPublicPoint = true;
        clickThis.$parent.$refs.rightContent.isShowCordon = false;
        clickThis.$parent.$refs.rightContent.isShowODLine = false;
        clickThis.$parent.$refs.rightContent.isShowPublicFace = false;
        clickThis.$parent.$refs.rightContent.isShowPolygon = false;
        //0527修改
        clickThis.$parent.$refs.rightContent.$refs.PublicPointRef.ruleForm.valueOfPoint = tipContent[i].name;
        clickThis.$parent.$refs.rightContent.$refs.PublicPointRef.valueOfPointLong =
            tipContent[i].longtitude;
        clickThis.$parent.$refs.rightContent.$refs.PublicPointRef.valueOfPointLat = tipContent[i].altitude;
        clickThis.$parent.$refs.rightContent.$refs.PublicPointRef.size = tipContent[i].size == '1' ? 0 : tipContent[i].size;
        clickThis.$parent.$refs.rightContent.$refs.PublicPointRef.content = tipContent[i].content;
        clickThis.$parent.$refs.rightContent.$refs.PublicPointRef.extendText = tipContent[i].text;
        clickThis.$parent.$refs.rightContent.$refs.PublicPointRef.deviationL = tipContent[i].left == null ? 0 : tipContent[i].left;
        clickThis.$parent.$refs.rightContent.$refs.PublicPointRef.deviationR = tipContent[i].right == null ? 0 : tipContent[i].right;
    }
    if (isChecked.checked) {
        try {
            clickThis.$parent.$refs.rightContent.$refs.PublicPointRef.getPINFLag();
            clickThis.$parent.$refs.rightContent._sfTreeid.flyTo(); //飞入该对象
        } catch (err) {
            console.log(err);
        }
    }
}
// 点击面节点 clickNodeUtils
export function clickPublicFace(event, isChecked, clickThis, tipContent) {
    if (isChecked.checked) {
        clickThis.$parent.isShowTip = true;// 如果是选中状态
    }
    clickThis.curFaceId = event.id;
    for (var i = 0; i < tipContent.length; i++) {
        clickThis.$parent.$refs.rightContent.isShowPoliceCar = false;
        clickThis.$parent.$refs.rightContent.isShowPoliceMan = false;
        clickThis.$parent.$refs.rightContent.isShowVideo = false;
        clickThis.$parent.$refs.rightContent.isShowPolygon = false;
        clickThis.$parent.$refs.rightContent.isShowODLine = false;
        clickThis.$parent.$refs.rightContent.isShowCordon = false;
        clickThis.$parent.$refs.rightContent.isShowPublicPoint = false;
        clickThis.$parent.$refs.rightContent.isShowPublicFace = true;
        //0527
        clickThis.$parent.$refs.rightContent.$refs.polygonRef.ruleForm.valueOfFaceName = tipContent[i].name;
        clickThis.$parent.$refs.rightContent.$refs.polygonRef.isFaceGround = tipContent[i].ground;
        clickThis.$parent.$refs.rightContent.$refs.polygonRef.isShowFaceBorder = tipContent[i].show;
        clickThis.$parent.$refs.rightContent.$refs.polygonRef.valueOfFaceBorderWidth = parseInt(
            tipContent[i].width
        );
        clickThis.$parent.$refs.rightContent.$refs.polygonRef.valueOfFaceBorderColor =
            tipContent[i].bcolor;
        clickThis.$parent.$refs.rightContent.$refs.polygonRef.valueOffaceColor = tipContent[i].color;
    }
    if (isChecked.checked) {
        try {
            clickThis.$parent.$refs.rightContent.$refs.polygonRef.getFaceFlag();
            clickThis.$parent.$refs.rightContent._sfTreeid.flyTo(); //飞入该对象
        } catch (err) {
            console.log(err);
        }
    }
}
// 点击OD线节点 clickNodeUtils
export function clickODLine(event, isChecked, clickThis, tipContent) {
    if (isChecked.checked) {
        clickThis.$parent.isShowTip = true;// 如果是选中状态
    }
    clickThis.curODLineID = event.id;
    for (var i = 0; i < tipContent.length; i++) {
        clickThis.$parent.$refs.rightContent.isShowPoliceCar = false;
        clickThis.$parent.$refs.rightContent.isShowPoliceMan = false;
        clickThis.$parent.$refs.rightContent.isShowVideo = false;
        clickThis.$parent.$refs.rightContent.isShowPolygon = false;
        clickThis.$parent.$refs.rightContent.isShowODLine = true;
        clickThis.$parent.$refs.rightContent.isShowCordon = false;
        clickThis.$parent.$refs.rightContent.isShowPublicPoint = false;
        clickThis.$parent.$refs.rightContent.isShowPublicFace = false;
        //0527修改
        clickThis.$parent.$refs.rightContent.$refs.ODLineRef.ruleForm.valueOfODLineName = tipContent[i].name;
        clickThis.$parent.$refs.rightContent.$refs.ODLineRef.isLoop = tipContent[i].link;
        clickThis.$parent.$refs.rightContent.$refs.ODLineRef.isDepthTest = tipContent[i].depeth;
        clickThis.$parent.$refs.rightContent.$refs.ODLineRef.interpolationQuery = tipContent[i].style;
        clickThis.$parent.$refs.rightContent.$refs.ODLineRef.querymaterial = tipContent[i].material;
        clickThis.$parent.$refs.rightContent.$refs.ODLineRef.valueOfODColor = tipContent[i].color;
    }
    if (isChecked.checked) {
        try {
            clickThis.$parent.$refs.rightContent.$refs.ODLineRef.getLineFlag("2");
            clickThis.$parent.$refs.rightContent._sfTreeid.flyTo(); //飞入该对象
        } catch (err) {
            console.log(err);
        }
    }
}
// 点击警员节点 clickNodeUtils
export function clickPolice(event, isChecked, clickThis, tipContent) {
    // 选中警员节点开启深度检测
    earth.czm.viewer.scene.globe.depthTestAgainstTerrain = true;
    if (isChecked.checked) {
        clickThis.$parent.isShowTip = true;// 如果是选中状态
    }
    for (var i = 0; i < tipContent.length; i++) {
        if (tipContent[i].equipment && tipContent[i].equipment !== null) {
            // 警员
            clickThis.$parent.$refs.rightContent.isShowPoliceCar = false;
            clickThis.$parent.$refs.rightContent.isShowPoliceMan = true;
            clickThis.$parent.$refs.rightContent.isShowVideo = false;
            clickThis.$parent.$refs.rightContent.isShowPolygon = false;
            clickThis.$parent.$refs.rightContent.isShowODLine = false;
            clickThis.$parent.$refs.rightContent.isShowCordon = false;
            clickThis.$parent.$refs.rightContent.isShowPublicPoint = false;
            clickThis.$parent.$refs.rightContent.isShowPublicFace = false;
            //0527修改 0528+校验
            clickThis.$parent.$refs.rightContent.$refs.policePersonRef.ruleForm.valueOfPoliceID = tipContent[i].id;
            clickThis.$parent.$refs.rightContent.$refs.policePersonRef.ruleForm.valueOfName = tipContent[i].name; // 清除
            clickThis.$parent.$refs.rightContent.$refs.policePersonRef.ruleForm.valueOfPoliceTel =
                tipContent[i].phonenumber;
            clickThis.$parent.$refs.rightContent.$refs.policePersonRef.ruleForm.valueOfPoliceEqp =
                tipContent[i].equipment;
            clickThis.$parent.$refs.rightContent.$refs.policePersonRef.ruleForm.valueOfPoliceLongitude =
                tipContent[i].longtitude;
            clickThis.$parent.$refs.rightContent.$refs.policePersonRef.ruleForm.valueOfPoliceLatitude =
                tipContent[i].altitude;
            clickThis.$parent.$refs.rightContent.$refs.policePersonRef.ruleForm.position =
                tipContent[i].position;
            if (isChecked.checked) {
                try {
                    let entity = earth.czm.viewer.entities.getById(event.id);
                    // 0623 直接是取 创建警员点的 position 转弧度
                    //console.log(tipContent[i].position, '当前警员点实体');
                    earth.camera.flyTo(tipContent[i].position, 30)
                } catch (err) {
                    console.log(err);
                }
            }
        } else if (
            tipContent[i].carType &&
            tipContent[i].carType !== null
        ) {
            // 警车
            clickThis.$parent.$refs.rightContent.isShowPoliceCar = true;
            clickThis.$parent.$refs.rightContent.isShowPoliceMan = false;
            clickThis.$parent.$refs.rightContent.isShowVideo = false;
            clickThis.$parent.$refs.rightContent.isShowPolygon = false;
            clickThis.$parent.$refs.rightContent.isShowODLine = false;
            clickThis.$parent.$refs.rightContent.isShowCordon = false;
            clickThis.$parent.$refs.rightContent.isShowPublicPoint = false;
            clickThis.$parent.$refs.rightContent.isShowPublicFace = false;
            //0527修改 + 校验
            clickThis.$parent.$refs.rightContent.$refs.policeCarRef.ruleForm.valueOfPoliceCarID = tipContent[i].id;
            clickThis.$parent.$refs.rightContent.$refs.policeCarRef.ruleForm.valueOfCarNum = tipContent[i].name;
            clickThis.$parent.$refs.rightContent.$refs.policeCarRef.ruleForm.valueOfCarType = tipContent[i].carType;
            clickThis.$parent.$refs.rightContent.$refs.policeCarRef.ruleForm.valueOfCarLongitude =
                tipContent[i].longtitude;
            clickThis.$parent.$refs.rightContent.$refs.policeCarRef.ruleForm.valueOfCarLatitude =
                tipContent[i].altitude;
            clickThis.$parent.$refs.rightContent.$refs.policeCarRef.ruleForm.position =
                tipContent[i].position;
            if (isChecked.checked) {
                try {
                    let entity = earth.czm.viewer.entities.getById(event.id);
                    earth.camera.flyTo(tipContent[i].position, 30)
                } catch (err) {
                    console.log(err);
                }
            }

        }
    }
}