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
      type: "left",
      size: "23"
    }),
    b: common_vendor.o((...args) => $setup.back && $setup.back(...args)),
    c: common_vendor.f(["\u4F20\u627F\u975E\u9057", "\u5DE5\u5320\u7CBE\u795E", "\u4E60\u603B\u4E66\u8BB0\u8BF4\u975E\u9057", "\u6765\u81EA\u975E\u9057\u5DE5\u4F5C\u5BA4\u7684\u79D8\u5BC6", "\u975E\u9057\u5143\u5B87\u5B99", "\u548C\u6211\u4EEC\u4E00\u8D77\u7545\u6E38\u975E\u9057\u5427"], (item, index, i0) => {
      return {
        a: common_vendor.t(index + 1),
        b: common_vendor.t(item),
        c: index
      };
    }),
    d: common_vendor.f([1, 2, 3, 4, 5, 6], (item, index, i0) => {
      return {
        a: common_vendor.f(item, (item2, index2, i1) => {
          return {
            a: index2
          };
        }),
        b: "4c7f4fb6-1-" + i0,
        c: "4c7f4fb6-2-" + i0,
        d: "4c7f4fb6-3-" + i0,
        e: "4c7f4fb6-4-" + i0,
        f: index
      };
    }),
    e: common_vendor.p({
      type: "heart",
      size: "25"
    }),
    f: common_vendor.p({
      type: "star",
      size: "25"
    }),
    g: common_vendor.p({
      type: "chat",
      size: "25"
    }),
    h: common_vendor.p({
      type: "paperplane",
      size: "25"
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-4c7f4fb6"], ["__file", "C:/Users/86130/Documents/HBuilderProjects/\u4F20\u627F\u975E\u9057/pages/home/other_page/news/news.vue"]]);
wx.createPage(MiniProgramPage);
