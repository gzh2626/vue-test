import axios from "axios";
import qs from "qs";
import { Notification } from "element-ui";
import { debug } from "util";
axios.defaults.timeout = 36000000000;
axios.defaults.baseURL = "";
// 传参序列化
axios.interceptors.request.use(
  config => {
    // if (config.method === 'post') {
    //     config.data = qs.stringify(config.data);
    // }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
// 返回状态判断
axios.interceptors.response.use(
  res => {
    if (res.data.status != 0) {
      Notification.error({
        message: res.data.msg || "服务器错误，请联系管理员。",
        duration: 3000
      });
      //return Promise.reject(res);
    }
    return res;
  },
  error => {
    if (error.response) {
      if (error.response.status === 401) {
        //登录超时，后端检测到前端token过期
        Notification.error({
          message: "token已过期请重新登录",
          duration: 3000
        });
      } else if (error.response.status === 500) {
        Notification.error({
          message: "服务器错误，请联系管理员。",
          duration: 3000
        });
      } else if (error.response.status === -1) {
        Notification.error({
          message: "请求超时，请稍后重试。",
          duration: 3000
        });
      }
    } else {
      Notification.error({
        message: "系统异常，请稍后重试。",
        duration: 3000
      });
    }
    return Promise.reject(error);
  }
);

// function checkStatus(response) {
//     // loading
//     if (response.status === 200 || response.status === 304) {
//         return response;
//     }
//     return {
//         data: {
//             code: -401,
//             message: response.statusText,
//             data:  response.statusText
//         }
//     }
// }
export default {
  post(url, data) {
    return axios({
      method: "post",
      url: url,
      data: data,
      headers: {
        "X-Requested-With": "XMLHttpRequest"
      }
    });
  },
  postFile(url, data) {
    return axios({
      method: "post",
      url: url,
      data: data,
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "multipart/form-data"
      }
    });
  },
  put(url, data) {
    return axios({
      method: "PUT",
      url: url,
      data: data
    });
  },
  delete(url) {
    return axios({
      method: "DELETE",
      url: url
    });
  },
  postForm(url, data) {
    return axios({
      method: "post",
      url: url,
      data: qs.stringify(data),
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      }
    });
  },
  get(url, params) {
    return axios({
      method: "get",
      url: url,
      params,
      headers: {
        "X-Requested-With": "XMLHttpRequest"
      }
    });
  }
};
