import axios from "axios";
const service = axios.create({
  //process.env.VUE_APP_API_ROOT
  baseURL: process.env.NODE_ENV == "production" ? "" : "",
  withCredentials: true,
  timeout: 5000,
  headers: {
    // 'X-Requested-With': 'XMLHttpRequest',
    "Content-Type": "application/x-www-form-urlencoded",
    "Access-Control-Allow-Origin": "*"
  }
});

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    return config;
  },
  error => {
    // do something with request error
    console.log(error);
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  response => {
    // const res = response.data;
    // if (!res.success) {
    //   Message({
    //     message: res.msg || "error",
    //     type: "error",
    //     duration: 5 * 1000
    //   });
    //   return Promise.reject(res.msg || "error");
    // } else {
    //   return res;
    // }
    const res = response;
    if (res.status == 200) {
      return response.data;
    } else {
      return Promise.reject(res.msg || "error");
    }
  },
  error => {
    return Promise.reject(error.msg || error);
  }
);

export default service;
