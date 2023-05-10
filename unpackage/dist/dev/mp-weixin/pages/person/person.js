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
    let login_state = common_vendor.computed$1(() => common_vendor.index.current_this.store.getters.login_state);
    let opacity = common_vendor.ref(true);
    let top = common_vendor.ref(common_vendor.index.getMenuButtonBoundingClientRect().height * 2);
    function toggle_page(title) {
      if (common_vendor.index.current_this.check_login_state()) {
        return;
      }
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
                    common_vendor.index.request({
                      url: common_vendor.index.current_this.baseURL + ":5001/get_workAll",
                      method: "POST",
                      data: {
                        openid: common_vendor.index.current_this.store.state.user_info.openid
                      },
                      success(res2) {
                        console.log(res2, "res");
                        if (common_vendor.index.current_this.check_res_state(res2)) {
                          return;
                        }
                        person_info.works.push(...res2.data.data);
                      }
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
    function change_background() {
      if (!common_vendor.index.current_this.store.getters.login_state) {
        return;
      }
      common_vendor.index.navigateTo({
        url: "/pages/person/other_page/avatar_edit/avatar_edit?url=https://www.mynameisczy.asia:5001/upload_background&height=500&width=700&property=background&name=avatar"
      });
      return;
    }
    function start_() {
      if (common_vendor.index.current_this.check_login_state())
        return;
      common_vendor.index.navigateTo({
        url: `/pages/person/other_page/new_work_collection/new_work_collection`
      });
    }
    return { start_, change_background, login_state, login, opacity, person_info, toggle, top, toggle_page };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($setup.person_info.name),
    b: $setup.top + "px",
    c: $setup.opacity ? "0%" : "100%",
    d: $setup.person_info.background,
    e: common_vendor.o((...args) => $setup.change_background && $setup.change_background(...args)),
    f: $setup.person_info.avatar,
    g: common_vendor.o((...args) => $setup.login && $setup.login(...args)),
    h: !$setup.login_state
  }, !$setup.login_state ? {
    i: common_vendor.o((...args) => $setup.login && $setup.login(...args))
  } : {}, {
    j: $setup.login_state
  }, $setup.login_state ? {
    k: common_vendor.t($setup.person_info.counts[0]),
    l: common_vendor.t($setup.person_info.counts[1]),
    m: common_vendor.t($setup.person_info.counts[2])
  } : {}, {
    n: $setup.login_state
  }, $setup.login_state ? {
    o: common_vendor.t($setup.person_info.name),
    p: common_vendor.t($setup.person_info.openid),
    q: common_vendor.t($setup.person_info.introduce)
  } : {}, {
    r: !$setup.login_state
  }, !$setup.login_state ? {} : {}, {
    s: common_vendor.o(($event) => $setup.toggle_page("bill")),
    t: common_vendor.o(($event) => $setup.toggle_page("bills")),
    v: common_vendor.o(($event) => $setup.toggle(true)),
    w: common_vendor.o(($event) => $setup.toggle(false)),
    x: $setup.person_info.toggle ? "0%" : "50%",
    y: $setup.top + "px",
    z: !$setup.person_info.toggle
  }, !$setup.person_info.toggle ? {} : {}, {
    A: $setup.person_info.works.length <= 0 && $setup.person_info.toggle
  }, $setup.person_info.works.length <= 0 && $setup.person_info.toggle ? {
    B: common_vendor.o((...args) => $setup.start_ && $setup.start_(...args))
  } : {}, {
    C: $setup.person_info.works.length > 0 && $setup.person_info.toggle
  }, $setup.person_info.works.length > 0 && $setup.person_info.toggle ? {
    D: common_vendor.o((...args) => $setup.start_ && $setup.start_(...args))
  } : {}, {
    E: common_vendor.f($setup.person_info.works, (item, index, i0) => {
      return {
        a: item.mask,
        b: index
      };
    }),
    F: $setup.person_info.toggle,
    G: common_vendor.f($setup.person_info.works2, (item, index, i0) => {
      return {
        a: item.mask,
        b: index
      };
    }),
    H: !$setup.person_info.toggle,
    I: common_vendor.n($setup.person_info.works.length <= 0 && $setup.person_info.toggle ? "start_btn_cen" : "")
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-390a77b4"], ["__file", "C:/Users/86130/Documents/HBuilderProjects/\u4F20\u627F\u975E\u9057/pages/person/person.vue"]]);
wx.createPage(MiniProgramPage);
