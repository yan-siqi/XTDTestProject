import earthGlobal from "@/global/earth/earthutils.js";
// wifi 弹窗
export function wifipopup(pickedFeature) {
	var latitude = pickedFeature.id._latitide == undefined ? pickedFeature.id._latitude : pickedFeature.id._latitide;
	var Startname = pickedFeature.id.id;
	// 0531修改
	var curName =  pickedFeature.id.name;
	earthGlobal.earthmaptool.xtdEarthScene.draweffctobj.clearALL();
	earthGlobal.earthmaptool.xtdEarthScene.draweffctobj.addCssHtml({
		type: pickedFeature.id._pointTypeShow,
		position: [pickedFeature.id._longitude, latitude, 0],
		contents: {
			name: curName, // 姓名/警车车牌号
			tel:pickedFeature.id._tel,
			x: pickedFeature.id._longitude,//经度
			y: pickedFeature.id._latitude, // 纬度
			equip:pickedFeature.id._equip,
			title: pickedFeature.id._pointTypeShow,
			policeCarId: pickedFeature.id._policeCarId,
			policeCarNumber: pickedFeature.id._policeCarNumber,
			policeCarType:pickedFeature.id._policeCarType,
		}
	});

}
//分层分户的方法
export function fcfhpopup(that, movement) {
	var ids = that.nameOverlay.textContent; //真实数据时应该不对
	console.log(ids);
	var b = [] //存放结果
	console.log(b);
	earth.pickPosition(movement.position, b); //获取点击的位置
	//定义弹窗内容对象
	var item = {
		longitude: b[0] / Math.PI * 180, //对点击的位置进行转换
		latitude: b[1] / Math.PI * 180,
		height: b[2],
		name: ids,
	}
	earthGlobal.earthmaptool.xtdEarthScene.draweffctobj.clearALL();
	earthGlobal.earthmaptool.xtdEarthScene.draweffctobj.addCssHtml({
		type: 1,
		position: [item.longitude, item.latitude, item.height],
		contents: {
			name: item.name,
		}
	});

}