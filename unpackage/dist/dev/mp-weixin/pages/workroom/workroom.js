"use strict";
var common_vendor = require("../../common/vendor.js");
var common_assets = require("../../common/assets.js");
const _sfc_main = {
  setup() {
    common_vendor.index.request({
      url: common_vendor.index.current_this.baseURL + ":5001/get_hottest_video",
      method: "GET",
      success(res) {
        if (common_vendor.index.current_this.check_res_state(res)) {
          return;
        }
        video.push(...res.data.data);
      }
    });
    function toggle(title) {
      common_vendor.index.showToast({
        title: title + "\u6682\u672A\u5F00\u653E",
        icon: "none"
      });
    }
    let base_url = common_vendor.ref(common_vendor.index.current_this.baseURL);
    let video = common_vendor.reactive([]);
    let danmulist = common_vendor.reactive([
      {
        text: "\u592A\u597D\u770B\u4E86",
        color: "#ff0000",
        time: 1
      },
      {
        text: "\u4E0B\u6B21\u591A\u53D1\u4E00\u70B9",
        color: "#ff0000",
        time: 2
      },
      {
        text: "\u5FEB\u70B9\u66F4\u65B0",
        color: "#ff0000",
        time: 1
      },
      {
        text: "\u535A\u4E3B\u5927\u5927\u771F\u5E05",
        color: "#ff0000",
        time: 1
      },
      {
        text: "\u7B80\u65E0\u4E0E\u4F26\u6BD4",
        color: "#ff00ff",
        time: 3
      },
      {
        text: "\u535A\u4E3B\u5927\u5927\u771F\u5E05",
        color: "#ff0000",
        time: 4
      },
      {
        text: "\u535A\u4E3B\u5927\u5927\u771F\u5E05",
        color: "#ff0000",
        time: 7
      }
    ]);
    function inter(item) {
      console.log(item, "item");
      common_vendor.index.request({
        url: common_vendor.index.current_this.baseURL + ":5001/get_video",
        method: "POST",
        data: {
          title: item.title,
          openid: item.openid
        },
        success(res) {
          if (common_vendor.index.current_this.check_res_state(res)) {
            return;
          }
          common_vendor.index.navigateTo({
            url: `/pages/workroom/other_page/play_video/play_video?video=${JSON.stringify(res.data.data)}`
          });
        }
      });
    }
    let no_develop = common_vendor.index.current_this.no_develop;
    return { toggle, base_url, danmulist, video, inter, no_develop };
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f([1, 2, 3], (item, index, i0) => {
      return {
        a: index
      };
    }),
    b: common_vendor.o(($event) => $setup.toggle("3d\u5DE5\u4F5C\u5BA4")),
    c: common_vendor.p({
      type: "right"
    }),
    d: common_vendor.o(($event) => $setup.no_develop("\u67E5\u770B\u5168\u90E8")),
    e: common_vendor.f($setup.video, (item, index, i0) => {
      return {
        a: item.mask,
        b: index,
        c: common_vendor.o(($event) => $setup.inter(item), index)
      };
    }),
    f: common_assets._imports_0,
    g: common_vendor.f(["\u4F20\u627F\u975E\u9057", "\u5DE5\u5320\u7CBE\u795E", "\u4E60\u603B\u4E66\u8BB0\u8BF4\u975E\u9057", "\u6765\u81EA\u975E\u9057\u5DE5\u4F5C\u5BA4\u7684\u79D8\u5BC6", "\u975E\u9057\u5143\u5B87\u5B99"], (item, index, i0) => {
      return {
        a: common_vendor.t(index + 1),
        b: common_vendor.t(item)
      };
    }),
    h: common_vendor.o(($event) => $setup.no_develop("\u975E\u9057\u793E\u533A")),
    i: common_vendor.f(["\u548C\u6211\u4EEC\u4E00\u8D77\u7545\u6E38\u975E\u9057\u5427"], (item, index, i0) => {
      return {
        a: common_vendor.t(index + 6),
        b: common_vendor.t(item)
      };
    }),
    j: common_vendor.o(($event) => $setup.no_develop("\u975E\u9057\u793E\u533A")),
    k: common_vendor.p({
      type: "right"
    }),
    l: common_vendor.o(($event) => $setup.no_develop("\u66F4\u591A"))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0672b006"], ["__file", "C:/Users/86130/Documents/HBuilderProjects/\u4F20\u627F\u975E\u9057/pages/workroom/workroom.vue"]]);
wx.createPage(MiniProgramPage);
