"use strict";
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "",
  onload(res) {
    console.log(res, "res");
  },
  onShareAppMessage(res) {
    return {
      imageUrl: this.info.pic[0],
      title: this.info.name,
      path: `/pages/store/other_page/store_page/store_page`
    };
  },
  onShareTimeline() {
    return {
      imageUrl: this.info.pic[0],
      title: this.info.name,
      type: 0
    };
  },
  setup() {
    let info = common_vendor.reactive({
      pic: ["https://www.mynameisczy.asia/image/antique/fan.jpg"],
      name: "\u56E2\u6247",
      src: "https://www.mynameisczy.asia/image/antique/fan.jpg",
      money: 99.9,
      store_name: "\u5C0F\u4E03\u7684\u5E97\u94FA",
      count: 1
    });
    let back = common_vendor.index.current_this.back;
    function join_car() {
      common_vendor.index.showToast({
        title: "\u6682\u672A\u5F00\u653E",
        icon: "none"
      });
    }
    function show_all() {
      common_vendor.index.showToast({
        title: "\u6682\u672A\u5F00\u653E",
        icon: "none"
      });
    }
    function buy() {
      common_vendor.index.showLoading({
        title: "\u8D2D\u4E70\u4E2D",
        mask: true
      });
      common_vendor.index.current_this.store.dispatch("buy", JSON.stringify(this.info));
      setTimeout(() => {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "\u8D2D\u4E70\u6210\u529F",
          mask: true
        });
      }, Math.random() * 2e3);
    }
    return { back, info, join_car, show_all, buy };
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_rate2 = common_vendor.resolveComponent("uni-rate");
  (_easycom_uni_icons2 + _easycom_uni_rate2)();
}
const _easycom_uni_icons = () => "../../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_rate = () => "../../../../uni_modules/uni-rate/components/uni-rate/uni-rate.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_rate)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      type: "left"
    }),
    b: common_vendor.o((...args) => $setup.back && $setup.back(...args)),
    c: common_vendor.f([1, 2, 3], (item, index, i0) => {
      return {
        a: index
      };
    }),
    d: common_vendor.p({
      type: "redo",
      size: "20"
    }),
    e: common_vendor.p({
      type: "right"
    }),
    f: common_vendor.o((...args) => $setup.show_all && $setup.show_all(...args)),
    g: common_vendor.f([1, 2], (item, index, i0) => {
      return {
        a: index
      };
    }),
    h: common_vendor.o((...args) => $setup.show_all && $setup.show_all(...args)),
    i: common_vendor.p({
      type: "right"
    }),
    j: common_vendor.o((...args) => $setup.show_all && $setup.show_all(...args)),
    k: common_vendor.f([1, 2, 3], (item, index, i0) => {
      return {
        a: "92cbb4f6-4-" + i0,
        b: index
      };
    }),
    l: common_vendor.o(_ctx.onChange),
    m: common_vendor.p({
      activeColor: "#6E79E2",
      readonly: true,
      value: 5
    }),
    n: common_vendor.o((...args) => $setup.show_all && $setup.show_all(...args)),
    o: common_vendor.o((...args) => $setup.show_all && $setup.show_all(...args)),
    p: common_vendor.o((...args) => $setup.show_all && $setup.show_all(...args)),
    q: common_vendor.o((...args) => $setup.join_car && $setup.join_car(...args)),
    r: common_vendor.o((...args) => $setup.buy && $setup.buy(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-92cbb4f6"], ["__file", "C:/Users/86130/Documents/HBuilderProjects/\u4F20\u627F\u975E\u9057/pages/store/other_page/store_page/store_page.vue"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
