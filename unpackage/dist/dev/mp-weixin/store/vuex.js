"use strict";
var common_vendor = require("../common/vendor.js");
common_vendor.index.getStorage({
  key: "cars",
  success(res) {
    let data = JSON.parse(res.data);
    state.cars.push(...data);
  }
});
const state = {
  cars: []
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
  deleteBill({ commit }, value) {
    let val = JSON.parse(value);
    let len = state.cars.length;
    for (let i = 0; i < len; i++) {
      if (state.cars[i].name == val.name)
        state.cars.splice(i, 1);
    }
    commit("DELETEBILL");
  }
};
const getters = {};
var store = common_vendor.createStore({
  actions,
  mutations,
  getters,
  state
});
exports.store = store;
