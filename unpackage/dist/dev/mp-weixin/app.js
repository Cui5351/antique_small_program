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
  "./pages/person/other_page/avatar_edit/avatar_edit.js";
  "./pages/person/other_page/avatar_edit/choose.js";
  "./pages/person/other_page/base_info/base_info.js";
  "./pages/workroom/other_page/play_video/play_video.js";
  "./pages/person/other_page/publish_video/publish_video.js";
  "./pages/workroom/other_page/search_video/search_video.js";
  "./pages/home/other_page/news/news.js";
  "./pages/person/other_page/new_work_collection/new_work_collection.js";
  "./pages/workroom/other_page/public_moment/public_moment.js";
  "./pages/workroom/other_page/public_moment/public_moment_v.js";
  "./pages/person/other_page/comment/comment.js";
  "./pages/home/other_page/antique_repository/antique_repository.js";
  "./pages/workroom/other_page/moment_detail/moment_detail.js";
  "./pages/person/other_page/manage_work/manage_work.js";
  "./pages/person/other_page/author_info/author_info.js";
}
const _sfc_main = {
  onLaunch: function() {
    common_vendor.index.current_this = this;
    this.baseURL = "https://124.71.192.181";
    this.store = common_vendor.useStore();
    this.no_develop = function(name) {
      common_vendor.index.showToast({
        icon: "none",
        title: name + "\u6682\u672A\u5F00\u653E"
      });
    };
    this.dateformat = function(date) {
      let month = date.getMonth() == 12 ? 1 : date.getMonth() + 1;
      let day = date.getDate();
      let now = new Date();
      if (now.getFullYear() == date.getFullYear())
        return `${month < 10 ? "0" + month : month}\u6708${day < 10 ? "0" + day : day}\u65E5`;
      else
        return `${date.getFullYear()}\u5E74${month < 10 ? "0" + month : month}\u6708${day < 10 ? "0" + day : day}\u65E5`;
    };
    this.dateformat2 = function(date) {
      let month = date.getMonth() == 12 ? 1 : date.getMonth() + 1;
      let day = date.getDate();
      return { year: date.getFullYear(), month: `${month < 10 ? "0" + month : month}\u6708${day < 10 ? "0" + day : day}\u65E5` };
    };
    this.dateformat_accuracy = function(date) {
      let month = date.getMonth() == 12 ? 1 : date.getMonth() + 1;
      let day = date.getDate();
      let now = new Date();
      let hour = date.getHours();
      let minute = date.getMinutes();
      if (now.getFullYear() == date.getFullYear())
        return `${month < 10 ? "0" + month : month}\u6708${day < 10 ? "0" + day : day}\u65E5${hour < 10 ? "0" + hour : hour}:${minute < 10 ? "0" + minute : minute}`;
      else
        return `${date.getFullYear()}\u5E74${month < 10 ? "0" + month : month}\u6708${day < 10 ? "0" + day : day}\u65E5${hour < 10 ? "0" + hour : hour}:${minute < 10 ? "0" + minute : minute}`;
    };
    this.back = function() {
      if (getCurrentPages().length > 1)
        common_vendor.index.navigateBack();
      else
        common_vendor.index.switchTab({
          url: "/pages/home/home"
        });
    };
    console.log("App Launch");
    this.check_res_state = function(res) {
      if (!res.data.state) {
        common_vendor.index.showToast({
          title: "\u53D1\u751F\u9519\u8BEF"
        });
        return 1;
      }
      return 0;
    };
    this.check_login_state = function() {
      if (!common_vendor.index.current_this.store.getters.login_state) {
        common_vendor.index.showToast({
          title: "\u6E05\u5148\u767B\u5F55",
          icon: "none"
        });
        return 1;
      }
      return 0;
    };
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
