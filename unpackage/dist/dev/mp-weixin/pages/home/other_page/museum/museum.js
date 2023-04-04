"use strict";
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  onLoad(args) {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ["shareAppMessage", "shareTimeline"]
    });
    let arg = JSON.parse(args.data);
    Object.keys(this.data).forEach((item) => {
      if (typeof item[item] == "array") {
        this.data[item].push(...arg[item]);
        return;
      }
      this.data[item] = arg[item];
    });
  },
  onShareAppMessage(res) {
    if (res.from === "button") {
      common_vendor.index.showToast({
        icon: "none",
        title: "\u5206\u4EAB\u6210\u529F"
      });
    }
    return {
      imageUrl: this.data.full_src,
      title: this.data.name,
      path: `/pages/home/other_page/museum/museum?data=${JSON.stringify(this.data)}`
    };
  },
  onShareTimeline() {
    return {
      title: "\u535A\u5B66\u82D1",
      type: 0
    };
  },
  setup() {
    let data = common_vendor.reactive({
      name: "",
      description: "",
      antique: [],
      full_src: ""
    });
    function back() {
      common_vendor.index.current_this.back();
    }
    function full_screen() {
      common_vendor.index.showToast({
        icon: "none",
        title: "\u6682\u672A\u5F00\u653E"
      });
    }
    return {
      data,
      back,
      full_screen
    };
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
      color: "white"
    }),
    b: common_vendor.o((...args) => $setup.back && $setup.back(...args)),
    c: common_vendor.t($setup.data.name),
    d: common_vendor.f($setup.data.description, (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: index
      };
    }),
    e: common_vendor.p({
      color: "rgb(59,92,130)",
      type: "right"
    }),
    f: common_vendor.f($setup.data.antique, (item, index, i0) => {
      return {
        a: item.src,
        b: common_vendor.t(item.name),
        c: index
      };
    }),
    g: $setup.data.full_src,
    h: common_vendor.o((...args) => $setup.full_screen && $setup.full_screen(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-857ef576"], ["__file", "C:/Users/86130/Documents/HBuilderProjects/\u4F20\u627F\u975E\u9057/pages/home/other_page/museum/museum.vue"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
