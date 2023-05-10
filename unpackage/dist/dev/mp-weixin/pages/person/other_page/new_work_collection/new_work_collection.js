"use strict";
var common_vendor = require("../../../../common/vendor.js");
const back = () => "../../../../components/back.js";
const _sfc_main = {
  name: "",
  components: {
    back
  },
  setup() {
    let info = common_vendor.reactive({
      title: "",
      description: "",
      mask: "../../../../static/add.svg",
      show_work: "show",
      top: false
    });
    function publish() {
      common_vendor.index.current_this.no_develop("\u53D1\u5E03\u4F5C\u54C1\u96C6");
    }
    function set_mask() {
      common_vendor.index.current_this.no_develop("\u9009\u62E9\u7167\u7247");
    }
    return { info, publish, set_mask };
  }
};
if (!Array) {
  const _component_back = common_vendor.resolveComponent("back");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_component_back + _easycom_uni_icons2)();
}
const _easycom_uni_icons = () => "../../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      name: "\u65B0\u5EFA\u4F5C\u54C1\u96C6"
    }),
    b: $setup.info.title,
    c: common_vendor.o(($event) => $setup.info.title = $event.detail.value),
    d: $setup.info.description,
    e: common_vendor.o(($event) => $setup.info.description = $event.detail.value),
    f: common_vendor.o((...args) => $setup.set_mask && $setup.set_mask(...args)),
    g: $setup.info.mask,
    h: $setup.info.top,
    i: $setup.info.show_work == "show",
    j: common_vendor.p({
      type: "plusempty",
      color: "rgb(110,121,226)"
    }),
    k: common_vendor.o((...args) => $setup.publish && $setup.publish(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-44d5a8eb"], ["__file", "C:/Users/86130/Documents/HBuilderProjects/\u4F20\u627F\u975E\u9057/pages/person/other_page/new_work_collection/new_work_collection.vue"]]);
wx.createPage(MiniProgramPage);
