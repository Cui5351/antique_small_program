"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports[Symbol.toStringTag] = "Module";
var common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/store/store.js";
  "./pages/home/home.js";
  "./pages/person/person.js";
  "./pages/index/index.js";
}
const _sfc_main = {
  onLaunch: function() {
    common_vendor.index.current_this = this;
    this.baseURL = "https://www.mynameisczy.asia";
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
var App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/86130/Documents/HBuilderProjects/\u4F20\u627F\u975E\u9057/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
