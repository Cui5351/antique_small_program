"use strict";
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "",
  setup() {
    let back = common_vendor.index.current_this.back;
    let state = common_vendor.ref(0);
    let stores = common_vendor.reactive({
      all: [...common_vendor.index.current_this.store.state.cars],
      await_pay: [],
      cars: [...common_vendor.index.current_this.store.state.cars],
      comment: []
    });
    function delete_store(item) {
      common_vendor.index.showModal({
        content: "\u662F\u5426\u5220\u9664\u8BE5\u8BA2\u5355",
        success({ cancel }) {
          if (cancel)
            return;
          common_vendor.index.current_this.store.dispatch("deleteBill", JSON.stringify(item));
          stores[Object.keys(stores)[state.value]].splice(item, 1);
        }
      });
    }
    function no_develop(title) {
      common_vendor.index.showToast({
        title: title + "\u6682\u672A\u5F00\u653E",
        icon: "none"
      });
    }
    function toggle_category(index) {
      state.value = index;
    }
    return { back, stores, delete_store, no_develop, state, toggle_category };
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
  return common_vendor.e({
    a: common_vendor.p({
      type: "left"
    }),
    b: common_vendor.o((...args) => $setup.back && $setup.back(...args)),
    c: common_vendor.p({
      type: "search",
      color: "gray"
    }),
    d: common_vendor.o(($event) => $setup.no_develop("\u641C\u7D22\u8BA2\u5355")),
    e: common_vendor.f(["\u5168\u90E8", "\u5F85\u652F\u4ED8", "\u5F85\u53D1\u8D27", "\u5F85\u8BC4\u4EF7"], (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: common_vendor.n($setup.state == index ? "hig" : ""),
        c: index,
        d: common_vendor.o(($event) => $setup.toggle_category(index), index)
      };
    }),
    f: $setup.stores[Object.keys($setup.stores)[$setup.state]].length ? false : true
  }, ($setup.stores[Object.keys($setup.stores)[$setup.state]].length ? false : true) ? {} : {}, {
    g: common_vendor.f($setup.stores[Object.keys($setup.stores)[$setup.state]], (item, index, i0) => {
      return {
        a: common_vendor.t(item.store_name),
        b: "105a4c2e-2-" + i0,
        c: item.src,
        d: common_vendor.t(item.name),
        e: common_vendor.t(item.money.toFixed(2)),
        f: "105a4c2e-3-" + i0,
        g: common_vendor.t(item.count),
        h: common_vendor.t((item.count * item.money).toFixed(2)),
        i: common_vendor.o(($event) => $setup.delete_store(item)),
        j: index
      };
    }),
    h: common_vendor.p({
      type: "right",
      color: "gray"
    }),
    i: common_vendor.p({
      color: "gray",
      type: "closeempty"
    }),
    j: common_vendor.o(($event) => $setup.no_develop("\u518D\u6B21\u8D2D\u4E70")),
    k: common_vendor.o(($event) => $setup.no_develop("\u8BC4\u4EF7"))
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-105a4c2e"], ["__file", "C:/Users/86130/Documents/HBuilderProjects/\u4F20\u627F\u975E\u9057/pages/person/other_page/bills/bills.vue"]]);
wx.createPage(MiniProgramPage);
