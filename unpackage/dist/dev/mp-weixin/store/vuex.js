"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var common_vendor = require("../common/vendor.js");
common_vendor.index.getStorage({
  key: "cars",
  success(res) {
    let data = JSON.parse(res.data);
    state.cars.push(...data);
  }
});
const state = {
  cars: [],
  login_state: 0,
  moments: [],
  user_info: {
    openid: "",
    name: "",
    avatar: "https://www.mynameisczy.cn/antique/user_avatar/default_avatar.jpg",
    introduce: "",
    sex: "",
    background: "https://www.mynameisczy.cn/antique/user_background/default_background.jpg",
    works: [],
    moments: []
  }
};
const mutations = {
  BUY(state2) {
    common_vendor.index.setStorage({
      key: "cars",
      data: JSON.stringify(state2.cars)
    });
  },
  DELETEBILL(state2) {
    common_vendor.index.setStorage({
      key: "cars",
      data: JSON.stringify(state2.cars)
    });
  }
};
const actions = {
  buy({ commit, state: state2 }, value) {
    let val = JSON.parse(value);
    let len = state2.cars.length;
    if (len == 0) {
      state2.cars.push(val);
    }
    for (let i = 0; i < len; i++) {
      if (state2.cars[i].name == val.name) {
        state2.cars[i].count++;
        break;
      } else if (i == len)
        state2.cars.push(val);
    }
    commit("BUY");
  },
  addmoment({ state: state2 }, value) {
    state2.user_info.moments.unshift(__spreadValues({}, JSON.parse(value)));
    state2.moments.unshift(__spreadValues({}, JSON.parse(value)));
    console.log(state2);
  },
  deleteBill({ commit }, value) {
    let val = JSON.parse(value);
    let len = state.cars.length;
    for (let i = 0; i < len; i++) {
      if (state.cars[i].name == val.name)
        state.cars.splice(i, 1);
    }
    commit("DELETEBILL");
  },
  set_login({ commit, state: state2 }, value) {
    state2.login_state = value;
  }
};
const getters = {
  login_state(state2) {
    return state2.login_state;
  },
  openid(state2) {
    return state2.user_info.openid;
  },
  name(state2) {
    return state2.user_info.name;
  },
  avatar(state2) {
    return state2.user_info.avatar;
  },
  sex(state2) {
    return state2.user_info.sex;
  },
  introduce(state2) {
    return state2.user_info.introduce;
  },
  background(state2) {
    return state2.user_info.background;
  },
  moments(state2) {
    return state2.moments;
  },
  my_moments(state2) {
    return state2.user_info.moments;
  },
  works(state2) {
    return state2.user_info.works;
  }
};
var store = common_vendor.createStore({
  actions,
  mutations,
  getters,
  state
});
exports.store = store;
