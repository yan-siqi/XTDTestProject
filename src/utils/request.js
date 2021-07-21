/* eslint-disable no-unused-vars,no-dupe-keys */
import axios from "axios";
import { getToken, removeToken } from '@/utils/auth';
import { MessageBox, Message } from "element-ui";
// console.log(this.$store.state.currenUser);

// create an axios instance
let baseURL = process.env.NODE_ENV == 'development' ? process.env.VUE_APP_API_ROOT : ""
const service = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  timeout: 60 * 1000

});

// request interceptor
service.interceptors.request.use(
  config => {

    config.headers['token'] = getToken();
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response;
    if (res.status == 200) {
      return response.data;
    } else {
      Message({
        message: res.msg || "error",
        type: "error",
        duration: 5 * 1000
      });
      return Promise.reject(res.msg || "error");
    }
  },
  error => {
    if (error.response && error.response.status == 401) {
      MessageBox.confirm("登陆过期，请重新登录！", "登陆过期", {
        confirmButtonText: "登陆",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        localStorage.clear();
        location.reload();
      });
    } else {
      Message({
        message: "错误",
        type: "error",
        duration: 5 * 1000
      });
    }
    return Promise.reject(error.msg);
  }
);

export function emptyAjax(data) {
  return {
    then: function (callback) {
      callback(data);
      return this;
    },
    catch: function (callback) {
      return this;
    }
  }
}
export default service;
