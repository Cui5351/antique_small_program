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
      toggle: false,
      works: common_vendor.computed$1(() => common_vendor.index.current_this.store.getters.works),
      works2: common_vendor.computed$1(() => common_vendor.index.current_this.store.getters.my_moments)
    });
    function toggle(bool) {
      person_info.toggle = bool;
    }
    const reqs = common_vendor.reactive({
      state: false,
      skip: 0
    });
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
                        if (common_vendor.index.current_this.check_res_state(res2)) {
                          return;
                        }
                        common_vendor.index.current_this.store.state.user_info.works.push(...res2.data.data);
                      }
                    });
                    common_vendor.index.current_this.store.dispatch("set_login", 1);
                    reqmoment();
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
    function works(item) {
      common_vendor.index.navigateTo({
        url: `/pages/person/other_page/manage_work/manage_work?work=${JSON.stringify(item)}`
      });
    }
    function lower() {
      if (person_info.toggle)
        return;
      reqmoment();
    }
    function reqmoment() {
      if (reqs.state || !login_state)
        return;
      reqs.state = true;
      common_vendor.index.request({
        url: common_vendor.index.current_this.baseURL + ":5001/get_person_community_moments",
        method: "POST",
        data: {
          openid: person_info.openid,
          skip: reqs.skip
        },
        success(res) {
          let w = res.data.data;
          w.forEach((item) => {
            if (item.src[0]) {
              if (item.src[0].substring(item.src[0].length - 3) == "mp4")
                item.type = "v";
              else
                item.type = "p";
            }
            item.send_date = common_vendor.index.current_this.dateformat(new Date(item.send_date));
          });
          reqs.skip += w.length;
          if (!w.length)
            return;
          common_vendor.index.current_this.store.state.user_info.moments.push(...w);
        },
        complete() {
          setTimeout(() => {
            reqs.state = false;
          }, 1e3);
        }
      });
    }
    function detail(item) {
      common_vendor.index.navigateTo({
        url: `/pages/workroom/other_page/moment_detail/moment_detail?info=${JSON.stringify(item)}`
      });
    }
    return { reqs, detail, lower, reqmoment, works, start_, change_background, login_state, login, opacity, person_info, toggle, top, toggle_page };
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
    k: common_vendor.t($setup.person_info.works.length),
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
    A: !$setup.person_info.toggle
  }, !$setup.person_info.toggle ? {
    B: common_vendor.f($setup.person_info.works2, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.send_date),
        b: common_vendor.t(item.place),
        c: item.src.length && item.type == "p"
      }, item.src.length && item.type == "p" ? {
        d: item.src[0]
      } : {}, {
        e: item.type == "v"
      }, item.type == "v" ? {
        f: item.mask[0]
      } : {}, {
        g: common_vendor.t(item.content),
        h: item.type == "p"
      }, item.type == "p" ? {
        i: common_vendor.t(item.src.length)
      } : {}, {
        j: item.type == "v"
      }, item.type == "v" ? {} : {}, {
        k: common_vendor.o(($event) => $setup.detail(item), index),
        l: index
      });
    })
  } : {}, {
    C: $setup.person_info.toggle
  }, $setup.person_info.toggle ? common_vendor.e({
    D: $setup.person_info.works.length <= 0 && $setup.person_info.toggle
  }, $setup.person_info.works.length <= 0 && $setup.person_info.toggle ? {
    E: common_vendor.o((...args) => $setup.start_ && $setup.start_(...args))
  } : {}, {
    F: $setup.person_info.works.length > 0 && $setup.person_info.toggle
  }, $setup.person_info.works.length > 0 && $setup.person_info.toggle ? {
    G: common_vendor.o((...args) => $setup.start_ && $setup.start_(...args))
  } : {}, {
    H: common_vendor.f($setup.person_info.works, (item, index, i0) => {
      return {
        a: item.mask,
        b: index,
        c: common_vendor.o(($event) => $setup.works(item), index)
      };
    }),
    I: $setup.person_info.toggle,
    J: common_vendor.n($setup.person_info.works.length <= 0 && $setup.person_info.toggle ? "start_btn_cen" : "")
  }) : {}, {
    K: common_vendor.o((...args) => $setup.lower && $setup.lower(...args))
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-390a77b4"], ["__file", "C:/Users/86130/Documents/HBuilderProjects/\u4F20\u627F\u975E\u9057/pages/person/person.vue"]]);
wx.createPage(MiniProgramPage);
