"use strict";
var common_vendor = require("../../../../common/vendor.js");
const back = () => "../../../../components/back.js";
const _sfc_main = {
  name: "",
  onShareAppMessage() {
    return {
      title: (this.info.content.length >= 7 ? this.info.content.substring(0, 7) : this.info.content) + "...",
      imageUrl: this.info.src[0],
      url: `/pages/workroom/other_page/moment_detail/moment_detail?info=${JSON.stringify(this.info)}`
    };
  },
  onLoad({ info }) {
    common_vendor.index.showLoading({
      mask: true,
      title: "\u52A0\u8F7D\u4E2D"
    });
    let tmp = JSON.parse(info);
    let that = this;
    Object.keys(this.info).forEach((item) => {
      if (item == "src") {
        this.info[item].push(...tmp[item]);
        return;
      }
      if (item == "state") {
        if (tmp.openid == common_vendor.index.current_this.store.state.user_info.openid)
          this.info.state = true;
        return;
      }
      if (item == "show") {
        if (tmp.show == void 0) {
          this.info.show = true;
          return;
        }
        this.info.show = false;
      }
      this.info[item] = tmp[item];
    });
    common_vendor.index.request({
      url: common_vendor.index.current_this.baseURL + ":5001/get_community_comment",
      method: "GET",
      data: {
        uuid: this.info.uuid,
        openid: common_vendor.index.current_this.store.state.user_info.openid
      },
      success(res) {
        if (common_vendor.index.current_this.check_res_state(res)) {
          return;
        }
        if (res.data.state == 2) {
          if (res.data.mes == "\u8BE5\u4F5C\u54C1\u88AB\u9690\u85CF" && that.info.openid == common_vendor.index.current_this.store.state.user_info.openid) {
            res.data.data.forEach((item) => {
              item.date = common_vendor.index.current_this.dateformat_accuracy(new Date(item.date));
            });
            that.moments.push(...res.data.data);
            that.info.show = false;
            console.log("hid");
            return;
          }
          common_vendor.index.navigateBack();
          if (that.info.openid == common_vendor.index.current_this.store.state.user_info.openid) {
            common_vendor.index.current_this.store.state.user_info.moments.forEach((item, index) => {
              if (item.uuid == that.info.uuid)
                common_vendor.index.current_this.store.state.user_info.moments.splice(index, 1);
            });
          }
          common_vendor.index.current_this.store.state.moments.forEach((item, index) => {
            if (item.uuid == that.info.uuid)
              common_vendor.index.current_this.store.state.moments.splice(index, 1);
          });
          common_vendor.index.showToast({
            title: res.data.mes,
            icon: "none",
            duration: 3e3
          });
          return;
        }
        res.data.data.forEach((item) => {
          item.date = common_vendor.index.current_this.dateformat_accuracy(new Date(item.date));
        });
        that.moments.push(...res.data.data);
      },
      complete() {
        common_vendor.index.hideLoading();
      }
    });
  },
  components: {
    back
  },
  setup() {
    let info = common_vendor.reactive({
      avatar: "",
      name: "",
      send_date: "",
      place: "",
      content: "",
      src: [],
      uuid: "",
      state: false,
      openid: "",
      show: true
    });
    let moments = common_vendor.reactive([]);
    let text = common_vendor.ref("");
    function send_mes() {
      if (!common_vendor.index.current_this.store.getters.login_state) {
        common_vendor.index.showToast({
          title: "\u8BF7\u5148\u767B\u5F55",
          icon: "none"
        });
        return;
      }
      if (text.value.length <= 0) {
        common_vendor.index.showToast({
          title: "\u8F93\u5165\u5185\u5BB9\u4E0D\u80FD\u4E3A\u7A7A",
          icon: "none"
        });
        return;
      }
      common_vendor.index.request({
        url: common_vendor.index.current_this.baseURL + ":5001/send_community_comment",
        method: "POST",
        data: {
          openid: common_vendor.index.current_this.store.state.user_info.openid,
          uuid: info.uuid,
          content: text.value
        },
        success(res) {
          if (common_vendor.index.current_this.check_res_state(res)) {
            return;
          }
          moments.unshift({
            avatar: common_vendor.index.current_this.store.state.user_info.avatar,
            name: common_vendor.index.current_this.store.state.user_info.name,
            content: text.value,
            date: common_vendor.index.current_this.dateformat_accuracy(new Date())
          });
          text.value = "";
        }
      });
    }
    function check_pict(index) {
      common_vendor.index.previewImage({
        urls: info.src,
        current: index,
        longPressActions: {
          itemList: ["\u53D1\u9001\u7ED9\u670B\u53CB", "\u4FDD\u5B58\u56FE\u7247", "\u6536\u85CF"],
          success: function(data) {
            console.log("\u9009\u4E2D\u4E86\u7B2C" + (data.tapIndex + 1) + "\u4E2A\u6309\u94AE,\u7B2C" + (data.index + 1) + "\u5F20\u56FE\u7247");
          },
          fail: function(err) {
            console.log(err.errMsg);
          }
        }
      });
    }
    function delW() {
      common_vendor.index.showModal({
        confirmText: "\u5220\u9664",
        title: "\u662F\u5426\u5220\u9664\u8BE5\u4F5C\u54C1",
        success(e) {
          if (e.cancel)
            return;
          common_vendor.index.request({
            url: common_vendor.index.current_this.baseURL + ":5001/delete_works",
            method: "POST",
            data: {
              openid: common_vendor.index.current_this.store.state.user_info.openid,
              uuid: info.uuid
            },
            success(res) {
              console.log(res);
              if (common_vendor.index.current_this.check_res_state(res)) {
                return;
              }
              common_vendor.index.navigateBack();
              common_vendor.index.current_this.store.state.moments.forEach((item, index) => {
                if (item.uuid == info.uuid)
                  common_vendor.index.current_this.store.state.moments.splice(index, 1);
              });
              if (info.openid == common_vendor.index.current_this.store.state.user_info.openid) {
                common_vendor.index.current_this.store.state.user_info.moments.forEach((item, index) => {
                  if (item.uuid == info.uuid)
                    common_vendor.index.current_this.store.state.user_info.moments.splice(index, 1);
                });
              }
              common_vendor.index.showToast({
                title: `\u5220\u9664\u4F5C\u54C1\u6210\u529F`
              });
            }
          });
        }
      });
    }
    function hidW() {
      common_vendor.index.showModal({
        confirmText: `${info.show ? "\u9690\u85CF" : "\u663E\u793A"}`,
        title: `\u662F\u5426${info.show ? "\u9690\u85CF" : "\u663E\u793A"}\u8BE5\u4F5C\u54C1`,
        success(e) {
          if (e.cancel)
            return;
          common_vendor.index.request({
            url: common_vendor.index.current_this.baseURL + ":5001/show_hid_works",
            method: "POST",
            data: {
              openid: common_vendor.index.current_this.store.state.user_info.openid,
              uuid: info.uuid,
              state: info.show ? "hid" : "show"
            },
            success(res) {
              if (common_vendor.index.current_this.check_res_state(res)) {
                return;
              }
              info.show = !info.show;
              common_vendor.index.showToast({
                title: `${info.show ? "\u663E\u793A" : "\u9690\u85CF"}\u4F5C\u54C1\u6210\u529F`
              });
            }
          });
        }
      });
    }
    let more = common_vendor.ref(false);
    function more_click() {
      more.value = true;
    }
    function more_stop() {
      more.value = false;
    }
    return { info, more_stop, more_click, more, send_mes, check_pict, text, moments, delW, hidW };
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
  return common_vendor.e({
    a: common_vendor.p({
      name: "\u8FD4\u56DE"
    }),
    b: $setup.info.avatar,
    c: common_vendor.t($setup.info.name),
    d: common_vendor.t($setup.info.send_date),
    e: common_vendor.t($setup.info.place),
    f: $setup.info.state
  }, $setup.info.state ? {
    g: common_vendor.o($setup.more_click),
    h: common_vendor.p({
      type: "more-filled",
      size: "25"
    }),
    i: common_vendor.o($setup.hidW),
    j: common_vendor.p({
      type: $setup.info.show ? "eye" : "eye-slash",
      size: "25"
    }),
    k: common_vendor.o($setup.delW),
    l: common_vendor.p({
      type: "trash",
      size: "25"
    }),
    m: $setup.more ? "90px" : "0px"
  } : {
    n: common_vendor.p({
      type: "star",
      size: "25"
    })
  }, {
    o: common_vendor.t($setup.info.content),
    p: $setup.info.src[0] != null
  }, $setup.info.src[0] != null ? {
    q: common_vendor.f($setup.info.src, (item2, index, i0) => {
      return {
        a: item2,
        b: common_vendor.o(($event) => $setup.check_pict(index), index),
        c: index
      };
    })
  } : {}, {
    r: common_vendor.o(_ctx.send_friend),
    s: common_vendor.p({
      type: "redo",
      size: "25"
    }),
    t: common_vendor.f($setup.moments, (item, index, i0) => {
      return {
        a: item.avatar,
        b: common_vendor.t(item.name),
        c: common_vendor.t(item.date),
        d: common_vendor.t(item.content),
        e: index
      };
    }),
    v: common_vendor.o((...args) => $setup.more_stop && $setup.more_stop(...args)),
    w: common_vendor.p({
      type: "star",
      size: "25"
    }),
    x: $setup.text,
    y: common_vendor.o(($event) => $setup.text = $event.detail.value),
    z: common_vendor.p({
      size: "25",
      type: "paperplane"
    }),
    A: common_vendor.o((...args) => $setup.send_mes && $setup.send_mes(...args))
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-2a14840c"], ["__file", "C:/Users/86130/Documents/HBuilderProjects/\u4F20\u627F\u975E\u9057/pages/workroom/other_page/moment_detail/moment_detail.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
