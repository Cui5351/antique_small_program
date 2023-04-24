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
    let danmulist = common_vendor.reactive([
      {
        text: "\u592A\u597D\u770B\u4E86",
        color: "#ff0000",
        time: 1
      },
      {
        text: "\u4E0B\u6B21\u591A\u53D1\u4E00\u70B9",
        color: "#ff0000",
        time: 2
      },
      {
        text: "\u5FEB\u70B9\u66F4\u65B0",
        color: "#ff0000",
        time: 1
      },
      {
        text: "\u535A\u4E3B\u5927\u5927\u771F\u5E05",
        color: "#ff0000",
        time: 1
      },
      {
        text: "\u7B80\u65E0\u4E0E\u4F26\u6BD4",
        color: "#ff00ff",
        time: 3
      },
      {
        text: "\u535A\u4E3B\u5927\u5927\u771F\u5E05",
        color: "#ff0000",
        time: 4
      },
      {
        text: "\u535A\u4E3B\u5927\u5927\u771F\u5E05",
        color: "#ff0000",
        time: 7
      }
    ]);
    return { toggle, base_url, danmulist };
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f([1, 2, 3], (item, index, i0) => {
      return {
        a: index
      };
    }),
    b: common_vendor.o(($event) => $setup.toggle("3d\u5DE5\u4F5C\u5BA4")),
    c: common_vendor.p({
      type: "right"
    }),
    d: common_vendor.f([0, 1, 2, 3], (item, index, i0) => {
      return {
        a: "https://www.mynameisczy.asia/antique/videos/source" + item + ".jpg",
        b: "https://www.mynameisczy.asia/antique/videos/source" + item + ".mp4",
        c: index
      };
    }),
    e: $setup.danmulist,
    f: common_vendor.f([1, 2, 3, 4, 5, 6], (item, index, i0) => {
      return {
        a: common_vendor.t(item)
      };
    }),
    g: common_vendor.f([1, 2, 3, 4, 5], (item, index, i0) => {
      return {
        a: common_vendor.t(item)
      };
    }),
    h: common_vendor.p({
      type: "right"
    }),
    i: common_vendor.o(($event) => $setup.toggle("community"))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0672b006"], ["__file", "C:/Users/86130/Documents/HBuilderProjects/\u4F20\u627F\u975E\u9057/pages/workroom/workroom.vue"]]);
wx.createPage(MiniProgramPage);
