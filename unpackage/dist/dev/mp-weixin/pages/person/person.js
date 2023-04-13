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
    let opacity = common_vendor.ref(true);
    let top = common_vendor.ref(common_vendor.index.getMenuButtonBoundingClientRect().height * 2);
    function toggle_page(title) {
      if (title == "bills") {
        common_vendor.index.navigateTo({
          url: "/pages/person/other_page/bills/bills"
        });
        return;
      }
      common_vendor.index.showToast({
        title: title + "\u6682\u672A\u5F00\u653E",
        icon: "none"
      });
    }
    return { opacity, person_info, toggle, top, toggle_page };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($setup.person_info.name),
    b: $setup.top + "px",
    c: $setup.opacity ? "0%" : "100%",
    d: common_vendor.t($setup.person_info.counts[0]),
    e: common_vendor.t($setup.person_info.counts[1]),
    f: common_vendor.t($setup.person_info.counts[2]),
    g: common_vendor.t($setup.person_info.name),
    h: common_vendor.t($setup.person_info.id),
    i: common_vendor.t($setup.person_info.introduction),
    j: common_vendor.o(($event) => $setup.toggle_page("bill")),
    k: common_vendor.o(($event) => $setup.toggle_page("bills")),
    l: common_vendor.o(($event) => $setup.toggle(true)),
    m: common_vendor.o(($event) => $setup.toggle(false)),
    n: $setup.person_info.toggle ? "0%" : "50%",
    o: $setup.top + "px",
    p: !$setup.person_info.toggle
  }, !$setup.person_info.toggle ? {} : {}, {
    q: common_vendor.f($setup.person_info.works, (item, index, i0) => {
      return {
        a: "https://www.mynameisczy.asia/image/antique/" + item + ".jpg",
        b: index
      };
    }),
    r: $setup.person_info.toggle,
    s: common_vendor.f($setup.person_info.works2, (item, index, i0) => {
      return {
        a: "https://www.mynameisczy.asia/image/antique/" + item + ".jpg",
        b: index
      };
    }),
    t: !$setup.person_info.toggle
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-390a77b4"], ["__file", "C:/Users/86130/Documents/HBuilderProjects/\u4F20\u627F\u975E\u9057/pages/person/person.vue"]]);
wx.createPage(MiniProgramPage);
