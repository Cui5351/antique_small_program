"use strict";
var common_vendor = require("../../../../common/vendor.js");
const back = () => "../../../../components/back.js";
const _sfc_main = {
  name: "",
  mounted() {
    let that = this;
    common_vendor.index.getStorage({
      key: "search_history_video",
      success(res) {
        that.record.push(...res.data);
      }
    });
  },
  components: {
    back
  },
  setup() {
    let text = common_vendor.ref("");
    let record = common_vendor.reactive([]);
    function input(txt) {
      text.value = txt;
      search({ detail: { value: txt } });
    }
    function search(e) {
      if (record.length >= 8)
        record.pop();
      record.unshift(e.detail.value);
      common_vendor.index.setStorage({
        key: "search_history_video",
        data: [...record]
      });
    }
    function fill(item) {
      text.value = item;
      search({ detail: {
        value: item
      } });
    }
    return { text, input, search, record, fill };
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
      name: "\u8FD4\u56DE"
    }),
    b: common_vendor.o((...args) => $setup.search && $setup.search(...args)),
    c: $setup.text,
    d: common_vendor.o(($event) => $setup.text = $event.detail.value),
    e: common_vendor.f($setup.record, (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: common_vendor.o(($event) => $setup.input(item), index),
        c: index
      };
    }),
    f: common_vendor.p({
      type: "refreshempty"
    }),
    g: common_vendor.p({
      type: "eye"
    }),
    h: common_vendor.f(["\u624B\u5DE5\u5236\u4F5C", "\u975E\u9057\u4F20\u627F\u89C6\u9891", "\u975E\u9057\u6587\u7269\u5236\u4F5C\u89C6\u9891", "\u975E\u9057", "\u6587\u7269"], (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: index,
        c: common_vendor.o(($event) => $setup.fill(item), index)
      };
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1633f750"], ["__file", "C:/Users/86130/Documents/HBuilderProjects/\u4F20\u627F\u975E\u9057/pages/workroom/other_page/search_video/search_video.vue"]]);
wx.createPage(MiniProgramPage);
