"use strict";
const common_vendor = require("../common/vendor.js");
const request_baseUrl = require("./baseUrl.js");
const instance = {
  get(url, params) {
    return req("GET", url, params);
  },
  post(url, params) {
    return req("POST", url, params);
  },
  put(url, params) {
    return req("PUT", url, params);
  },
  delete(url, params) {
    return req("DELETE", url, params);
  }
};
const req = (method, url, params) => {
  return new Promise((res, rej) => {
    common_vendor.index.request({
      url: request_baseUrl.baseURL + url,
      method,
      data: {
        ...params
      },
      success(response) {
        console.log(response.data);
        if (response.data.code != 1) {
          rej(response.data.msg);
          return;
        }
        res(response.data.data);
      },
      fail(err) {
        rej(err);
      }
    });
  });
};
exports.instance = instance;
