import request, {
    emptyAjax
} from "@/utils/request";

// 上传图片
export function addimg(data) {
    return request({
        url: process.env.VUE_APP_API_ROOT + "api/v1/gaodian/addimg",
        method: "POST",
        data:data
    });
}

// 高点建筑物信息采集

export function addgaodian(data) {
    return request({
        url: process.env.VUE_APP_API_ROOT + "api/v1/gaodian/addgaodian",
        method: "POST",
        data:data
    });
}
// 高点企业信息采集

export function addgaodianQiye(data) {
    return request({
        url: process.env.VUE_APP_API_ROOT + "api/v1/gaodian/addgaodianQiye",
        method: "POST",
        data:data
    });
}
// 高点人员信息采集

export function  addgaodianRenyuan(data) {
    return request({
        url: process.env.VUE_APP_API_ROOT + "api/v1/gaodian/addgaodianRenyuan",
        method: "POST",
        data:data
    });
}
// 高点建筑物信息采集

export function addgaodianDanwei(data) {
    return request({
        url: process.env.VUE_APP_API_ROOT + "api/v1/gaodian/addgaodianDanwei",
        method: "POST",
        data:data
    });
}
