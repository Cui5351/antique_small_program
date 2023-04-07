"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  setup() {
    function toggle(title) {
      common_vendor.index.showToast({
        title: title + "\u6682\u672A\u5F00\u653E",
        icon: "none"
      });
    }
    let base_url = common_vendor.ref(common_vendor.index.current_this.baseURL);
    return { toggle, base_url };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $setup.base_url + "/image/antique/workroom.jpg",
    b: common_vendor.o(($event) => $setup.toggle("workroom")),
    c: $setup.base_url + "/image/antique/community.jpg",
    d: common_vendor.o(($event) => $setup.toggle("community"))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0672b006"], ["__file", "C:/Users/86130/Documents/HBuilderProjects/\u4F20\u627F\u975E\u9057/pages/workroom/workroom.vue"]]);
wx.createPage(MiniProgramPage);
