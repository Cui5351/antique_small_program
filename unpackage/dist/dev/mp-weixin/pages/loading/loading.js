"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  props: {
    show_loading: {
      default: false,
      type: Boolean
    }
  },
  setup() {
    return {};
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.show_loading
  }, $props.show_loading ? {} : {});
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-b1b56100"], ["__file", "C:/Users/86130/Documents/HBuilderProjects/\u4F20\u627F\u975E\u9057/pages/loading/loading.vue"]]);
wx.createComponent(Component);
