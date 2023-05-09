"use strict";
var common_vendor = require("../common/vendor.js");
const _sfc_main = {
  name: "back",
  props: ["name"],
  setup(props) {
    let back = common_vendor.index.current_this.back;
    let name = common_vendor.ref(props.name);
    return { back, name };
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      type: "left",
      size: "23"
    }),
    b: common_vendor.t($setup.name),
    c: common_vendor.o((...args) => $setup.back && $setup.back(...args))
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-026711bc"], ["__file", "C:/Users/86130/Documents/HBuilderProjects/\u4F20\u627F\u975E\u9057/components/back.vue"]]);
wx.createComponent(Component);
