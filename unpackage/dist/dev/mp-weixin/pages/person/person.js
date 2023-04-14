"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  setup() {
    let person_info = common_vendor.reactive({
      name: common_vendor.computed$1(() => common_vendor.index.current_this.store.getters.name),
      openid: common_vendor.computed$1(() => common_vendor.index.current_this.store.getters.openid),
      background: common_vendor.computed$1(() => common_vendor.index.current_this.store.getters.background),
      avatar: common_vendor.computed$1(() => common_vendor.index.current_this.store.getters.avatar),
      introduce: common_vendor.computed$1(() => common_vendor.index.current_this.store.getters.introduce),
      counts: [0, 0, 0],
      toggle: true,
      works: [],
      works2: []
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
    function login() {
      if (common_vendor.index.current_this.store.getters.login_state) {
        common_vendor.index.navigateTo({
          url: "/pages/person/other_page/base_info/base_info"
        });
        return;
      }
      common_vendor.index.showLoading({
        title: "\u767B\u5F55\u4E2D"
      });
      common_vendor.index.login({
        provider: "weixin",
        success({ code }) {
          common_vendor.index.request({
            url: common_vendor.index.current_this.baseURL + ":5001/getOpenid",
            method: "POST",
            data: {
              code
            },
            success(res1) {
              if (res1.data.state != 1) {
                common_vendor.index.showToast({
                  title: "\u767B\u5F55\u5931\u8D25",
                  icon: "error"
                });
                return;
              }
              common_vendor.index.current_this.store.state.user_info.openid = res1.data.value.openid;
              common_vendor.index.request({
                url: common_vendor.index.current_this.baseURL + ":5001/login_user",
                method: "POST",
                data: {
                  openid: res1.data.value.openid
                },
                success(res) {
                  console.log(res.data);
                  if (res.data.state) {
                    common_vendor.index.current_this.store.state.user_info.openid = res1.data.value.openid;
                    Object.keys(res.data.value).forEach((item) => {
                      common_vendor.index.current_this.store.state.user_info[item] = res.data.value[item];
                    });
                    common_vendor.index.showToast({
                      title: "\u767B\u5F55\u6210\u529F"
                    });
                    common_vendor.index.current_this.store.dispatch("set_login", 1);
                  } else {
                    common_vendor.index.showToast({
                      title: "\u767B\u5F55\u5931\u8D25"
                    });
                  }
                },
                complete() {
                  common_vendor.index.hideLoading();
                }
              });
            }
          });
        }
      });
    }
    return { login, opacity, person_info, toggle, top, toggle_page };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($setup.person_info.name),
    b: $setup.top + "px",
    c: $setup.opacity ? "0%" : "100%",
    d: $setup.person_info.background,
    e: $setup.person_info.avatar,
    f: common_vendor.o((...args) => $setup.login && $setup.login(...args)),
    g: common_vendor.t($setup.person_info.counts[0]),
    h: common_vendor.t($setup.person_info.counts[1]),
    i: common_vendor.t($setup.person_info.counts[2]),
    j: common_vendor.t($setup.person_info.name),
    k: common_vendor.t($setup.person_info.openid),
    l: common_vendor.t($setup.person_info.introduce),
    m: common_vendor.o(($event) => $setup.toggle_page("bill")),
    n: common_vendor.o(($event) => $setup.toggle_page("bills")),
    o: common_vendor.o(($event) => $setup.toggle(true)),
    p: common_vendor.o(($event) => $setup.toggle(false)),
    q: $setup.person_info.toggle ? "0%" : "50%",
    r: $setup.top + "px",
    s: !$setup.person_info.toggle
  }, !$setup.person_info.toggle ? {} : {}, {
    t: common_vendor.f($setup.person_info.works, (item, index, i0) => {
      return {
        a: "https://www.mynameisczy.asia/image/antique/" + item + ".jpg",
        b: index
      };
    }),
    v: $setup.person_info.toggle,
    w: common_vendor.f($setup.person_info.works2, (item, index, i0) => {
      return {
        a: "https://www.mynameisczy.asia/image/antique/" + item + ".jpg",
        b: index
      };
    }),
    x: !$setup.person_info.toggle
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-390a77b4"], ["__file", "C:/Users/86130/Documents/HBuilderProjects/\u4F20\u627F\u975E\u9057/pages/person/person.vue"]]);
wx.createPage(MiniProgramPage);
