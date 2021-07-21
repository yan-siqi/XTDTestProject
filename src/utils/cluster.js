

//全局属性
let dataSourceForCluster;   //自定义的数据源
let entityMarkerList;  //实体类集合
let sourcesName;   // 数据源名字
let sourcesNames;  //数据源集合名字
let cusData;      //自定义的数据源
let cusdataSourceLists;   //自定义的数据源集合
let showStatus = false;
/*
完善思路：
应该每类摄像头都要有一个数据源，名字不同 可以传递一个item参数（普通：normal，车卡：car,人脸：face,高点：height）  Ok
数据源合集估计也要进行分类  Ok
监听的方法也要进行区分  OK
删除的时候在集合内通过自定义数据源名字进行删除   OK;

待解决:
        1.加载过慢  : 考虑将删除换成假删除   即控制每个实体类的显示和隐藏即可   OK
        2.聚合关闭后 点位聚合依然开启 OK   
        3.多个类别打开后，无法全部聚合解散    疑似原因： 监听器有问题 

        建议： 不要多个类别同时打开   如果要看无聚合的 请关闭其他只看一个。
*/

let that = this;


/**
 * @description  通过方法将局部对象设置为全局对象
 * @param {*} cusData   自定义数据源
 * @param {*} listName  实体类集合
 */
function returnData(cusData, listName) {
  dataSourceForCluster = cusData;
  entityMarkerList = listName;
}

//创建点位之前应该先执行本方法创建数据源和聚合类
/**
 * 
 * @param {*} item   聚合类名字尾缀  -- 为了区分其他数据源    注意！！！：不要将item设置为数字
 */
export function createPre(item) {
  //将数据源名字搞到全局
  sourcesName = item;
  //将数据源集合名字搞到全局
  sourcesNames =  "cusDataSourceCollection"
  if (window[sourcesName] == undefined || !window[sourcesName].showStatus) {
    //实例化自定义的数据源
    window[sourcesName] = new Cesium.CustomDataSource("clusterSurrounding" + item);
    //将数据源加入window  --为了防止和其他数据冲突   例如： window.aa   那么后面开启的数据将覆盖之前开启的数据 
    // window[sourcesName] = cusData;

    //实例化数据源集合
    console.log(typeof window[sourcesNames] );
    if( typeof window[sourcesNames]  !="object" ){
      window[sourcesNames] = new Cesium.DataSourceCollection("cuscollectionName");
    }
    
    //将数据源集合加入到window
    //  window[sourcesNames]  = cusdataSourceLists;

    //调用聚合的方法  并传递数据源
    getDataSource( window[sourcesName]);
    let listName = new Cesium.EntityCollection( window[sourcesName]);
    //调用返回数据的方法
    returnData(window[sourcesName], listName)
    return ;
  }

    //下面是非第一次打开执行的代码 

    //当数据源不是undefined   那么就设置数据源下的展示状态属性设置为 false
  if (window[sourcesName] != undefined) {
    window[sourcesName][showStatus] = false;
  }
    // 如果展示状态为true 那么就将第一次关闭时show =false  改为 show = true;
  if (window[sourcesName].showStatus) {
    window[sourcesName].entities.values.forEach((e, i) => {
      e.show = true;
    })
    //数据源show 也设置为true ;
    window[sourcesNames]._dataSources.forEach((e, i) => {
      if (window[sourcesName]._name == e._name) {
        window[sourcesName].show = true;
      }
    })
  }



}


/**
 * @desc  将实体类加入集合
 * @param {@} billboard   //实体类
 */
export function createAfterPre(billboard) {
  //第一次打开才执行
  if (!window[sourcesName].showStatus) {
    let a = dataSourceForCluster.entities.add(billboard);
    entityMarkerList.add(a);
  }
}
//添加监听
export function addLister(itemName) {
  const  enerName = itemName+"Func"
  console.log(enerName);
  //为了区分不同数据的不同监听方法  将当前数据的监听方法赋值给自己的对象   然后监听时获取自己的对象内的属性就获得了监听方法;
    let  lister =  createListener(itemName)
  //可能要改成一个摄像头一个监听的方法
  console.log(earth.czm.viewer.camera.moveEnd.numberOfListeners);
  console.log(  window[enerName]);
  window[enerName] =lister;
  console.log(  window[enerName]);
  earth.czm.viewer.camera.moveEnd.addEventListener( window[enerName]);
  console.log(  window[enerName]);
  console.log(earth.czm.viewer.camera.moveEnd.numberOfListeners);
  // let listenterName = {};
  // listenterName[sourcesName] = myListener;
  // if (window.listenerList == undefined) {
  //   window.listenerList = [];
  // }
  // let listenerObj = {
  //   name:itemName,
  // }
  // listenerObj.listenterName = listenterName;
  // window.listenerList.push(listenerObj);
  // console.log(window.listenerList);
  // window.listenerList.forEach((e,i) =>{
  //   console.log(e);
  //   console.log(itemName);
  //   if(  e.name = itemName){
  //         console.log(1111);
  //         console.log(e.listenterName[itemName]);
          
  //   }
  // })
  //此处是为了解决多个数据打开时 上一个数据还未启用聚合 就被顶替的问题;
    window[sourcesName].clustering.enabled = true;


  // window.listenerList.keys().forEach(  (e,i) =>{
  //   console.log(e);
  //   console.log(i);
  // } )
  // window.listenerList.forEach((e,i) =>{
  //    window.listenerList.keys();
  //   // var keys =   Object.keys(e);

  //   console.log(window.listenerList);
  //   console.log(e);
  //   console.log(window.listenerList[window.listenerList.size-1]);
  //   console.log(window.listenerList.get(name));
  //   if(window.listenerList.get(name) == i ){
  //     earth.czm.viewer.camera.moveEnd.addEventListener(e[name]);
  //   }
   
  // }
  // )

  //此处是为了解决多个数据打开时 上一个数据还未启用聚合 就被顶替的问题;
    window[sourcesName].clustering.enabled = true;
}
//移除监听
export function removeListener(sourcesName) {

    //将数据源的聚合状态设置为false
    window[sourcesName].clustering.enabled = false;

  //假删除
  window[sourcesName].entities.values.forEach(e => {
    e.show = false;
  });
  window[sourcesNames]._dataSources.forEach((e, i) => {
    if (window[sourcesName]._name == e._name) {
      
      window[sourcesName].show = false;
    }
  })
  //展示状态设置为false
  window[sourcesName].showStatus = true;



  // //通过实体ID在自定义数据源内删除
  // window[sourcesName].entities.values.forEach(e => {
  //   window[sourcesName].entities.removeById(e.id);
  // })
  // //有时候数据正常但是没有删除  就执行这个
  // if (window[sourcesName].entities.values.length > 0) {
  //   removeListener(sourcesName);
  //   return;
  // }

  // //在数据源集合内部删除当前关闭的数据源
  // window[sourcesNames]._dataSources.forEach((e, i) => {
  //   if (window[sourcesName]._name == e._name) {
  //     window[sourcesNames]._dataSources.splice(i, 1);
  //   }
  // })
  //单独清除监听
  // if(window.listenerList == undefined){
    //无操作 --这里是因为编写的时候113摄像头没有数据关闭时报错
  // }else{
    console.log(window[sourcesName]);
    console.log(earth.czm.viewer.camera.moveEnd.numberOfListeners);

    const  enerName = sourcesName+"Func";
    console.log(enerName);
      console.log(window[enerName]);
    earth.czm.viewer.camera.moveEnd.removeEventListener(window[enerName]);

    console.log(earth.czm.viewer.camera.moveEnd.numberOfListeners);
    // window[enerName] = undefined;
    console.log(   window[enerName]);
    console.log(earth.czm.viewer.camera.moveEnd.numberOfListeners);
    console.log(1111);

    // console.log(window.listenerList.listenterName[sourcesName]);

    // window.listenerList.forEach(e =>{
    // var keys =   Object.keys(e);
    // // console.log(keys);
    // if(keys[0] == sourcesName ){
    //   // console.log(e[sourcesName]);
    //   console.log(window.listenerList.keys());
    //   window.listenerList.delete(e[sourcesName]);
    //   console.log(window.listenerList.keys());
    //   console.log(earth.czm.viewer.camera.moveEnd.numberOfListeners);
    //   // earth.czm.viewer.camera.moveEnd.removeEventListener(e[sourcesName]);
   
      
    //   console.log(earth.czm.viewer.camera.moveEnd.numberOfListeners);
    // }
      
    // })
    // earth.czm.viewer.camera.moveEnd.removeEventListener(window.listenerList.listenterName[sourcesName]);
    // console.log(earth.czm.viewer.camera.moveEnd.numberOfListeners);
  // }
 
}


/**
 * @description 点位聚合方法
 * @param {*} cusData  //已经实例化的自定义的数据源
 */
export function getDataSource(cusData) {
  //通过earth实例将数据源加入数据源集合
  let dataSourcePromise = earth.czm.viewer.dataSources.add(cusData);

  //将数据源集合加入到window中的数据源集合
  window[sourcesNames].add(dataSourcePromise);
  //设置本次数据源集合
  dataSourcePromise.then(function (dataSource) {
    var pixelRange = 50;
    var minimumClusterSize = 2;
    var enabled = false;
    dataSource.clustering.enabled = enabled; //是否启用集群 
    dataSource.clustering.pixelRange = pixelRange;  //设置像素范围以扩展屏幕空间边界框
    dataSource.clustering.minimumClusterSize = minimumClusterSize;   //设置集群的最小屏幕空间对象数
    var removeListener;
    customStyle(dataSource, removeListener);
  });
}

//自定义风格(聚合的数字样式和背景图片等)
export function customStyle(dataSource, removeListener) {
  if (Cesium.defined(removeListener)) {
    that.removeListener();
    removeListener = undefined;
  } else {
    removeListener = dataSource.clustering.clusterEvent.addEventListener(
      function (clusteredEntities, cluster) {
        let len = clusteredEntities.length;
        cluster.billboard.show = true;
        cluster.billboard.id = cluster.label.ids;
        // cluster.billboard.disableDepthTestDistance = Number.POSITIVE_INFINITY;
        // cluster.billboard.image = require("../assets/img/image/number.jpg"); // 聚合效果的背景
        cluster.billboard.width = 90;
        cluster.billboard.height = 90;

        cluster.label.show = true;
        cluster.label.text = len + ""; //显示的数字
        cluster.label.style = Cesium.LabelStyle.FILL;
        cluster.label.fillColor = Cesium.Color.white;
        cluster.label.outlineWidth = 4;
        cluster.label.horizontalOrigin = Cesium.HorizontalOrigin.CENTER;
        cluster.label.verticalOrigin = Cesium.VerticalOrigin.CENTER;
        cluster.label.disableDepthTestDistance = Number.POSITIVE_INFINITY;

        cluster.label.pixelOffset = new Cesium.Cartesian2(0, 3);
        cluster.label.eyeOffset = new Cesium.Cartesian3(0, 0, -10);
        //   为下面每个不同数量时添加不同的背景图片
        if (len < 10) {
          cluster.label.font = "normal 32px MicroSoft YaHei";
          cluster.billboard.image = require("../assets/img/image/number.png"); // 聚合效果的背景
        } else if (len < 100) {
          cluster.label.font = "normal 28px MicroSoft YaHei";
          cluster.billboard.image = require("../assets/img/image/number.png"); // 聚合效果的背景
        } else if (len < 1000) {
          cluster.label.font = "normal 24px MicroSoft YaHei";
          cluster.billboard.image = require("../assets/img/image/number.png"); // 聚合效果的背景
        } else if (len < 10000) {
          cluster.label.font = "normal 20px MicroSoft YaHei";
          cluster.billboard.image = require("../assets/img/image/number.png"); // 聚合效果的背景
        } else {
          cluster.billboard.image = require("../assets/img/image/number.png"); // 聚合效果的背景
          cluster.label.font = "normal 16px MicroSoft YaHei";
        }
      }
    );
  }
};


//监听视角移动
// var myListener = 
function createListener(name){
  name = function clusterFunc() {
    console.log(window[sourcesNames]);
    if (window[sourcesNames] && window[sourcesNames].length > 0) {
      var currentMagnitude = earth.czm.viewer.camera.getMagnitude();
      // console.log(currentMagnitude);
      // 6373248.307914881
      // 6373578.596961181
      let length = window[sourcesNames].length;
      console.log(length);
      if (currentMagnitude < 6376016.432104735) {
        for (let i = 0; i < length; i++) {
          console.log("false");
          // console.log(DataSourceCollection.get(i));
          window[sourcesNames].get(i).clustering.enabled = false;
        }
      } else {
        for (let i = 0; i < length; i++) {
          console.log("true");
          // console.log(DataSourceCollection.get(i).clustering);
          window[sourcesNames].get(i).clustering.enabled = true;
        }
      }
  
    }
  };

  return name ;
}