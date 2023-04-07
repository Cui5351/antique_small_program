"use strict";
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "",
  setup() {
    let back = common_vendor.index.current_this.back;
    return { back };
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      type: "left"
    }),
    b: common_vendor.o((...args) => $setup.back && $setup.back(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-2b8567f6"], ["__file", "C:/Users/86130/Documents/HBuilderProjects/\u4F20\u627F\u975E\u9057/pages/home/other_page/all_anitique/all_anitique.vue"]]);
wx.createPage(MiniProgramPage);
