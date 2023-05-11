"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  mounted() {
    common_vendor.index.showLoading({
      title: "\u52A0\u8F7D\u4E2D",
      mask: true
    });
    common_vendor.index.request({
      url: common_vendor.index.current_this.baseURL + ":5001/get_community_moments",
      method: "GET",
      data: {
        skip: 0
      },
      success(res) {
        if (common_vendor.index.current_this.check_res_state(res))
          return;
        res.data.data.forEach((item) => {
          item.send_date = common_vendor.index.current_this.dateformat(new Date(item.send_date));
        });
        common_vendor.index.current_this.store.state.moments.push(...res.data.data.reverse());
      },
      complete() {
        common_vendor.index.hideLoading();
      }
    });
  },
  setup() {
    let moment = common_vendor.computed$1(() => common_vendor.index.current_this.store.getters.moments);
    let back = common_vendor.index.current_this.back;
    function publish_moment() {
      if (common_vendor.index.current_this.check_login_state()) {
        common_vendor.index.showToast({
          title: "\u6E05\u5148\u767B\u5F55",
          icon: "none"
        });
        return;
      }
      common_vendor.index.chooseImage({
        success(res) {
          let paths = res.tempFilePaths;
          common_vendor.index.navigateTo({
            url: `/pages/workroom/other_page/public_moment/public_moment?paths=${JSON.stringify(paths)}`
          });
        }
      });
    }
    return { back, moment, publish_moment };
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
    a: common_vendor.p({
      type: "plusempty",
      color: "rgb(110,121,226)"
    }),
    b: common_vendor.o((...args) => $setup.publish_moment && $setup.publish_moment(...args)),
    c: common_vendor.f(["\u4F20\u627F\u975E\u9057", "\u5DE5\u5320\u7CBE\u795E", "\u4E60\u603B\u4E66\u8BB0\u8BF4\u975E\u9057", "\u6765\u81EA\u975E\u9057\u5DE5\u4F5C\u5BA4\u7684\u79D8\u5BC6", "\u975E\u9057\u5143\u5B87\u5B99", "\u548C\u6211\u4EEC\u4E00\u8D77\u7545\u6E38\u975E\u9057\u5427"], (item, index, i0) => {
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
        c: common_vendor.t(item.place),
        d: common_vendor.t(item.content),
        e: item.src[0] != null
      }, item.src[0] != null ? {
        f: common_vendor.f(item.src, (item2, index2, i1) => {
          return {
            a: item2,
            b: index2
          };
        })
      } : {}, {
        g: "0672b006-1-" + i0,
        h: "0672b006-2-" + i0,
        i: "0672b006-3-" + i0,
        j: "0672b006-4-" + i0,
        k: common_vendor.t(item.send_date),
        l: index
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
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0672b006"], ["__file", "C:/Users/86130/Documents/HBuilderProjects/\u4F20\u627F\u975E\u9057/pages/workroom/workroom.vue"]]);
wx.createPage(MiniProgramPage);
