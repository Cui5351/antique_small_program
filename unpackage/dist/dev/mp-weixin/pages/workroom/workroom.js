"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  mounted() {
    common_vendor.index.showLoading({
      title: "\u52A0\u8F7D\u4E2D",
      mask: true
    });
    this.get_moments();
  },
  setup() {
    let show_add = common_vendor.ref(false);
    let reqs = common_vendor.reactive({
      state: false,
      skip: 0
    });
    let moment = common_vendor.computed$1(() => common_vendor.index.current_this.store.getters.moments);
    let back = common_vendor.index.current_this.back;
    function publish_moment() {
      if (common_vendor.index.current_this.check_login_state()) {
        common_vendor.index.showToast({
          title: "\u8BF7\u5148\u767B\u5F55",
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
    function publish_moment2() {
      if (common_vendor.index.current_this.check_login_state()) {
        common_vendor.index.showToast({
          title: "\u8BF7\u5148\u767B\u5F55",
          icon: "none"
        });
        return;
      }
      common_vendor.index.chooseMedia({
        count: 1,
        mediaType: ["video"],
        success(res) {
          let paths = res.tempFiles[0];
          if (paths.size / 1024 / 1024 >= 200) {
            common_vendor.index.showToast({
              title: "\u4E0A\u4F20\u89C6\u9891\u5927\u5C0F\u5FC5\u987B\u5C0F\u4E8E200Mb",
              icon: "none"
            });
            return;
          }
          console.log(res, "res");
          common_vendor.index.navigateTo({
            url: `/pages/workroom/other_page/public_moment/public_moment_v?path=${JSON.stringify(paths)}`
          });
        },
        fail(e) {
          common_vendor.index.showToast({
            title: "\u4E0A\u4F20\u89C6\u9891\u5927\u5C0F\u5FC5\u987B\u5C0F\u4E8E200Mb",
            icon: "none"
          });
        }
      });
    }
    function check_pict(path, index) {
      common_vendor.index.previewImage({
        urls: path,
        current: index,
        longPressActions: {
          itemList: ["\u53D1\u9001\u7ED9\u670B\u53CB", "\u4FDD\u5B58\u56FE\u7247", "\u6536\u85CF"]
        }
      });
    }
    function detail(item) {
      common_vendor.index.navigateTo({
        url: `/pages/workroom/other_page/moment_detail/moment_detail?info=${JSON.stringify(item)}`
      });
    }
    function lower() {
      if (reqs.state) {
        return;
      }
      get_moments();
    }
    function get_moments() {
      reqs.state = true;
      common_vendor.index.request({
        url: common_vendor.index.current_this.baseURL + ":5001/get_community_moments",
        method: "GET",
        data: {
          skip: reqs.skip
        },
        success(res) {
          console.log(res, "res");
          if (common_vendor.index.current_this.check_res_state(res))
            return;
          res.data.data.forEach((item) => {
            if (item.hasOwnProperty("src")) {
              if (item.src[0]) {
                if (item.src[0].substring(item.src[0].length - 3) == "mp4")
                  item.type = "v";
                else
                  item.type = "p";
              }
            } else {
              item.src = [];
            }
            item.send_date = common_vendor.index.current_this.dateformat_accuracy(new Date(item.send_date));
          });
          console.log(res.data);
          common_vendor.index.current_this.store.state.moments.push(...res.data.data);
          reqs.skip += res.data.data.length;
        },
        complete() {
          setTimeout(() => {
            reqs.state = false;
          }, 1e3);
          common_vendor.index.hideLoading();
        }
      });
    }
    function upper() {
      if (reqs.state) {
        return;
      }
      common_vendor.index.showLoading({
        title: "\u52A0\u8F7D\u4E2D",
        mask: true
      });
      reqs.state = true;
      common_vendor.index.request({
        url: common_vendor.index.current_this.baseURL + ":5001/get_new_community_moments",
        method: "POST",
        data: {
          uuid: common_vendor.index.current_this.store.state.moments[0].uuid
        },
        success(res) {
          if (common_vendor.index.current_this.check_res_state(res))
            return;
          if (res.data.data.length <= 0) {
            common_vendor.index.showToast({
              title: "\u6CA1\u6709\u66F4\u591A\u4E86"
            });
            return;
          }
          res.data.data.forEach((item) => {
            item.send_date = common_vendor.index.current_this.dateformat_accuracy(new Date(item.send_date));
          });
          common_vendor.index.current_this.store.state.moments.unshift(...res.data.data);
        },
        complete() {
          setTimeout(() => {
            reqs.state = false;
          }, 1e3);
          common_vendor.index.hideLoading();
        }
      });
    }
    function user_info(item) {
      console.log(item, "item");
      common_vendor.index.navigateTo({
        url: `/pages/person/other_page/author_info/author_info?info=${JSON.stringify({
          avatar: item.avatar,
          name: item.name,
          openid: item.openid
        })}`
      });
    }
    return { back, show_add, moment, user_info, upper, publish_moment2, publish_moment, get_moments, reqs, check_pict, detail, lower };
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
      size: "25",
      color: "white"
    }),
    b: common_vendor.n($setup.show_add ? "add show_add flex_j_a_c" : "add flex_j_a_c"),
    c: common_vendor.n($setup.show_add ? "add show_add2 flex_j_a_c" : "add flex_j_a_c"),
    d: common_vendor.o((...args) => $setup.publish_moment && $setup.publish_moment(...args)),
    e: common_vendor.n($setup.show_add ? "add show_add3 flex_j_a_c" : "add flex_j_a_c"),
    f: common_vendor.o((...args) => $setup.publish_moment2 && $setup.publish_moment2(...args)),
    g: common_vendor.o(($event) => $setup.show_add = true),
    h: common_vendor.f(["\u4F20\u627F\u975E\u9057", "\u5DE5\u5320\u7CBE\u795E", "\u4E60\u603B\u4E66\u8BB0\u8BF4\u975E\u9057", "\u6765\u81EA\u975E\u9057\u5DE5\u4F5C\u5BA4\u7684\u79D8\u5BC6", "\u975E\u9057\u5143\u5B87\u5B99", "\u548C\u6211\u4EEC\u4E00\u8D77\u7545\u6E38\u975E\u9057\u5427"], (item, index, i0) => {
      return {
        a: common_vendor.t(index + 1),
        b: common_vendor.t(item),
        c: index
      };
    }),
    i: common_vendor.f($setup.moment, (item, index, i0) => {
      return common_vendor.e({
        a: item.avatar,
        b: common_vendor.o(($event) => $setup.user_info(item)),
        c: common_vendor.t(item.name),
        d: common_vendor.t(item.place),
        e: common_vendor.t(item.content.length >= 100 ? item.content.substring(0, 100) + "..." : item.content),
        f: item.type == "v"
      }, item.type == "v" ? {
        g: item.src,
        h: item.mask,
        i: common_vendor.o(() => {
        })
      } : {}, {
        j: item.src[0] != null && item.type == "p"
      }, item.src[0] != null && item.type == "p" ? {
        k: common_vendor.f(item.src, (item2, index2, i1) => {
          return {
            a: common_vendor.o(($event) => $setup.check_pict(item.src, index2), index2),
            b: item2,
            c: index2
          };
        }),
        l: common_vendor.n(item.src.length > 1 ? "pic" : "pic2")
      } : {}, {
        m: "0672b006-1-" + i0,
        n: "0672b006-2-" + i0,
        o: common_vendor.t(item.browse),
        p: "0672b006-3-" + i0,
        q: common_vendor.t(item.moment_count),
        r: "0672b006-4-" + i0,
        s: common_vendor.t(item.send_date),
        t: index,
        v: common_vendor.o(($event) => $setup.detail(item), index)
      });
    }),
    j: common_vendor.p({
      type: "heart",
      size: "25"
    }),
    k: common_vendor.p({
      type: "eye",
      size: "25"
    }),
    l: common_vendor.p({
      type: "chat",
      size: "25"
    }),
    m: common_vendor.p({
      type: "paperplane",
      size: "25"
    }),
    n: common_vendor.o(($event) => $setup.show_add = false),
    o: common_vendor.o(($event) => $setup.show_add = false),
    p: common_vendor.o((...args) => $setup.lower && $setup.lower(...args)),
    q: common_vendor.o((...args) => $setup.upper && $setup.upper(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0672b006"], ["__file", "C:/Users/86130/Documents/HBuilderProjects/\u4F20\u627F\u975E\u9057/pages/workroom/workroom.vue"]]);
wx.createPage(MiniProgramPage);
