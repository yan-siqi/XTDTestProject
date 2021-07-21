import request, { emptyAjax } from "@/utils/request";
export function addSecurity(data) {
    return request({
        url: process.env.VUE_APP_API_ROOT + "api/v1/route/add",
        method: "POST",
        data: data
    });
}
// 删除
export function delSecurity(data) {
    return request({
        url: process.env.VUE_APP_API_ROOT + "api/v1/tree/update",
        method: "POST",
        data: data
    });
}
// 添加面
export function addPolygon(data) {
    return request({
        url: process.env.VUE_APP_API_ROOT + "api/v1/Area/addFace",
        method: "POST",
        data: data
    });
}
// 编辑面
export function editPolygon(data) {
    return request({
        url: process.env.VUE_APP_API_ROOT + "api/v1/Area/modifyFace",
        method: "POST",
        data: data
    });
}