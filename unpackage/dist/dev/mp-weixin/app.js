"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports[Symbol.toStringTag] = "Module";
var common_vendor = require("./common/vendor.js");
var store_vuex = require("./store/vuex.js");
if (!Math) {
  "./pages/home/home.js";
  "./pages/store/store.js";
  "./pages/person/person.js";
  "./pages/home/other_page/museum/museum.js";
  "./pages/workroom/workroom.js";
  "./pages/home/other_page/all_museum/all_museum.js";
  "./pages/store/other_page/store_page/store_page.js";
  "./pages/home/other_page/all_anitique/all_anitique.js";
  "./pages/home/other_page/show_antique3d/show_antique3d.js";
  "./pages/home/other_page/show_antique3d/antique/antique.js";
  "./pages/person/other_page/bills/bills.js";
}
const _sfc_main = {
  onLaunch: function() {
    common_vendor.index.current_this = this;
    this.baseURL = "https://www.mynameisczy.asia";
    this.store = common_vendor.useStore();
    this.back = function() {
      if (getCurrentPages().length > 1)
        common_vendor.index.navigateBack();
      else
        common_vendor.index.switchTab({
          url: "/pages/home/home"
        });
    };
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
  app.use(store_vuex.store);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
