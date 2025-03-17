"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  mounted() {
    let that = this;
    common_vendor.index.request({
      url: common_vendor.index.current_this.baseURL + ":5001/get_community_moments",
      method: "GET",
      data: {
        skip: 0
      },
      success(res) {
        console.log(res, "res");
        if (common_vendor.index.current_this.check_res_state(res))
          return;
        res.data.data.forEach((item) => {
          item.send_date = common_vendor.index.current_this.dateformat(new Date(item.send_date));
        });
        that.moment.push(...res.data.data.reverse());
      }
    });
  },
  setup() {
    let moment = common_vendor.reactive([]);
    let back = common_vendor.index.current_this.back;
    return { back, moment };
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
      size: "23"
    }),
    b: common_vendor.o((...args) => $setup.back && $setup.back(...args)),
    c: common_vendor.f(["传承非遗", "工匠精神", "习总书记说非遗", "来自非遗工作室的秘密", "非遗元宇宙", "和我们一起畅游非遗吧"], (item, index, i0) => {
      return {
        a: common_vendor.t(index + 1),
        b: common_vendor.t(item),
        c: index
      };
    }),
    d: common_vendor.f($setup.moment, (item, index, i0) => {
      return common_vendor.e({
        a: item.avatar,
        b: common_vendor.t(item.name),
        c: common_vendor.t(item.content),
        d: item.src[0] != null
      }, item.src[0] != null ? {
        e: common_vendor.f(item.src, (item2, index2, i1) => {
          return {
            a: item2,
            b: index2
          };
        })
      } : {}, {
        f: "62ccf36e-1-" + i0,
        g: "62ccf36e-2-" + i0,
        h: "62ccf36e-3-" + i0,
        i: "62ccf36e-4-" + i0,
        j: common_vendor.t(item.send_date),
        k: index
      });
    }),
    e: common_vendor.p({
      type: "heart",
      size: "25"
    }),
    f: common_vendor.p({
      type: "star",
      size: "25"
    }),
    g: common_vendor.p({
      type: "chat",
      size: "25"
    }),
    h: common_vendor.p({
      type: "paperplane",
      size: "25"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-62ccf36e"], ["__file", "C:/Users/86130/Documents/HBuilderProjects/传承非遗/pages/home/other_page/news/news.vue"]]);
wx.createPage(MiniProgramPage);
