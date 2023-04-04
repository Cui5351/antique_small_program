"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  setup() {
    let person_info = common_vendor.reactive({
      name: "\u674E\u56DB",
      id: "123321",
      introduction: "\u5C0F\u56DB\u7684\u7B80\u4ECB",
      counts: [5, 6, 7],
      toggle: true,
      works: ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"],
      works2: ["six", "seven", "eight", "nine", "ten"]
    });
    function toggle(bool) {
      person_info.toggle = bool;
    }
    return { person_info, toggle };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($setup.person_info.counts[0]),
    b: common_vendor.t($setup.person_info.counts[1]),
    c: common_vendor.t($setup.person_info.counts[2]),
    d: common_vendor.t($setup.person_info.name),
    e: common_vendor.t($setup.person_info.id),
    f: common_vendor.t($setup.person_info.introduction),
    g: common_vendor.o(($event) => $setup.toggle(true)),
    h: common_vendor.o(($event) => $setup.toggle(false)),
    i: $setup.person_info.toggle ? "0%" : "50%",
    j: !$setup.person_info.toggle
  }, !$setup.person_info.toggle ? {} : {}, {
    k: common_vendor.f($setup.person_info.works, (item, index, i0) => {
      return {
        a: "https://www.mynameisczy.asia/image/antique/" + item + ".jpg",
        b: index
      };
    }),
    l: $setup.person_info.toggle,
    m: common_vendor.f($setup.person_info.works2, (item, index, i0) => {
      return {
        a: "https://www.mynameisczy.asia/image/antique/" + item + ".jpg",
        b: index
      };
    }),
    n: !$setup.person_info.toggle
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-390a77b4"], ["__file", "C:/Users/86130/Documents/HBuilderProjects/\u4F20\u627F\u975E\u9057/pages/person/person.vue"]]);
wx.createPage(MiniProgramPage);
