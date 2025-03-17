"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const _sfc_main = {
  onLoad(res) {
    let data = JSON.parse(res.data);
    Object.keys(this.info).forEach((item) => {
      this.info[item] = data[item];
    });
  },
  setup() {
    let back = common_vendor.index.current_this.back;
    let info = common_vendor.reactive({
      src: "",
      born: "",
      date: "",
      name: "",
      description: ""
    });
    return { back, info };
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($setup.back),
    b: common_vendor.p({
      type: "left",
      size: "25",
      color: "rgb(200,200,186)"
    }),
    c: $setup.info.src,
    d: common_vendor.t($setup.info.name),
    e: common_vendor.p({
      type: "location"
    }),
    f: common_vendor.t($setup.info.born),
    g: common_vendor.t($setup.info.description)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-a9a7e72e"], ["__file", "C:/Users/86130/Documents/HBuilderProjects/传承非遗/pages/home/other_page/show_antique3d/antique/antique.vue"]]);
wx.createPage(MiniProgramPage);
