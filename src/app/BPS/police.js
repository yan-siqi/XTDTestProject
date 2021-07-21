import request, {
    emptyAjax
} from "@/utils/request";
// import axios from "axios";
// 警力
// 警员添加
export function addPolice(data) {
    return request({
        url: process.env.VUE_APP_API_ROOT + "api/v1/police/add",
        method: "POST",
        data: data
    });
}
// 一般点添加
export function addPoint(data) {
    return request({
        url: process.env.VUE_APP_API_ROOT + "api/v1/point/add",
        method: "POST",
        data: data
    });
}
// 一般点修改
export function editPoint(data) {
    return request({
        url: process.env.VUE_APP_API_ROOT + "api/v1/point/edit",
        method: "POST",
        data: data
    });
}
// 警员修改
export function editPolice(data) {
    return request({
        url: process.env.VUE_APP_API_ROOT + "api/v1/police/modify",
        method: "POST",
        data: data
    });
}


// 线修改
export function editLine(data) {
    return request({
        url: process.env.VUE_APP_API_ROOT + "api/v1/route/modify",
        method: "POST",
        data: data
    });
}

// 查询树列表
export function treeData(data) {
    return request({
        url: "api/v1/tree/getTree",
        method: "GET",
        data: data
    });
}
// 添加树节点数据
export function addTreeData(data) {
    return request({
        url: process.env.VUE_APP_API_ROOT + "api/v1/tree/addTree",
        method: "POST",
        data: data
    });
}
// 修改树节点数据
export function modifyTreeData(data) {
    return request({
        url: process.env.VUE_APP_API_ROOT + "api/v1/tree/modify",
        method: "POST",
        data: data
    });
}

// 当前ID的节点数据
export function getTreeNodeById(id, lid, status) {
    return request({
        url: process.env.VUE_APP_API_ROOT + `api/v1/tree/getidTree?id=${id}&&lid=${lid}`,
        method: "GET",
        data: {}
    });
}

// 查询当前选中的id集合
export function getSelectIDS() {
    return request({
        url: process.env.VUE_APP_API_ROOT + `api/v1/tree/getTreeStatus`,
        method: "GET",
        data: {}
    });
}

// 修改当前树结构的状态
export function changeCurStatus(id, status) {
    return request({
        url: process.env.VUE_APP_API_ROOT + `api/v1/tree/modifyStatus`,
        method: "POST",
        data: {
            id: id,
            status: status
        }
    });
}