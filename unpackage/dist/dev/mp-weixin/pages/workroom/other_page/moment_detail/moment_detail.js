"use strict";
const common_vendor = require("../../../../common/vendor.js");
const back = () => "../../../../components/back.js";
const _sfc_main = {
  name: "",
  onShareAppMessage() {
    return {
      title: (this.info.content.length >= 7 ? this.info.content.substring(0, 7) : this.info.content) + "...",
      //分享的名称
      imageUrl: this.info.src[0],
      url: `/pages/workroom/other_page/moment_detail/moment_detail?info=${JSON.stringify(this.info)}`
      // mpId:'' //此处配置微信小程序的AppId
    };
  },
  onLoad({ info }) {
    common_vendor.index.showLoading({
      mask: true,
      title: "加载中"
    });
    this.channel = this.getOpenerEventChannel();
    let tmp = JSON.parse(info);
    console.log("info", info);
    Object.keys(this.info).forEach((item) => {
      if (tmp[item] instanceof Array) {
        this.info[item].push(...tmp[item]);
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
    console.log(this.info);
    this.getComment();
  },
  onUnload() {
    this.flag = false;
  },
  onBackPress() {
    this.flag = false;
  },
  components: {
    back
  },
  methods: {
    delComment(comment) {
      if (comment.openid != common_vendor.index.current_this.store.getters.openid)
        return;
      let that = this;
      common_vendor.index.showModal({
        title: "是否删除该评论",
        success(confirm) {
          if (!confirm.confirm)
            return;
          common_vendor.index.request({
            url: common_vendor.index.current_this.baseURL + ":5001/del_community_comment",
            method: "GET",
            data: {
              uuid: comment.uuid,
              openid: common_vendor.index.current_this.store.getters.openid
            },
            success(res) {
              if (common_vendor.index.current_this.check_res_state(res)) {
                return;
              }
              that.getComment();
            }
          });
        }
      });
    },
    getComment() {
      let that = this;
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
            if (res.data.mes == "该作品被隐藏" && that.info.openid == common_vendor.index.current_this.store.state.user_info.openid) {
              res.data.data.forEach((item) => {
                item.date = common_vendor.index.current_this.dateformat_accuracy(new Date(item.date));
              });
              that.moments.push(...res.data.data);
              that.info.show = false;
              this.channel.emit("loadData");
              common_vendor.index.navigateBack();
              return;
            }
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
          that.moments.splice(0, that.moments.length);
          that.moments.push(...res.data.data);
          if (that.flag) {
            console.log(that.flag, "flag");
            setTimeout(() => {
              that.getComment();
            }, 5e3);
          }
        },
        complete() {
          common_vendor.index.hideLoading();
        }
      });
    }
  },
  setup() {
    let flag = common_vendor.ref(true);
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
      type: "",
      mask: [],
      show: true
    });
    let moments = common_vendor.reactive([]);
    let channel = common_vendor.ref(null);
    let text = common_vendor.ref("");
    function send_mes() {
      if (!common_vendor.index.current_this.store.getters.login_state) {
        common_vendor.index.showToast({
          title: "请先登录",
          icon: "none"
        });
        return;
      }
      if (text.value.length <= 0) {
        common_vendor.index.showToast({
          title: "输入内容不能为空",
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
            date: common_vendor.index.current_this.dateformat_accuracy(/* @__PURE__ */ new Date())
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
          itemList: ["发送给朋友", "保存图片", "收藏"],
          success: function(data) {
            console.log("选中了第" + (data.tapIndex + 1) + "个按钮,第" + (data.index + 1) + "张图片");
          },
          fail: function(err) {
            console.log(err.errMsg);
          }
        }
      });
    }
    function delW() {
      common_vendor.index.showModal({
        confirmText: "删除",
        title: "是否删除该作品",
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
              common_vendor.index.showToast({
                title: `删除作品成功`
              });
              channel.value.emit("loadData");
              common_vendor.index.navigateBack();
            }
          });
        }
      });
    }
    function hidW() {
      common_vendor.index.showModal({
        confirmText: `${info.show ? "隐藏" : "显示"}`,
        title: `是否${info.show ? "隐藏" : "显示"}该作品`,
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
                title: `${info.show ? "显示" : "隐藏"}作品成功`
              });
              channel.value.emit("loadData");
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
    function author_info() {
      common_vendor.index.navigateTo({
        url: `/pages/person/other_page/author_info/author_info?info=${JSON.stringify({
          avatar: info.avatar,
          name: info.name,
          openid: info.openid
        })}`
      });
    }
    return { info, more_stop, author_info, more_click, more, send_mes, check_pict, text, moments, delW, hidW, channel, flag };
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
      name: "返回"
    }),
    b: $setup.info.avatar,
    c: common_vendor.o((...args) => $setup.author_info && $setup.author_info(...args)),
    d: common_vendor.t($setup.info.name),
    e: common_vendor.t($setup.info.send_date),
    f: common_vendor.t($setup.info.place),
    g: $setup.info.state
  }, $setup.info.state ? {
    h: common_vendor.o($setup.more_click),
    i: common_vendor.p({
      type: "more-filled",
      size: "25"
    }),
    j: $setup.more,
    k: common_vendor.o($setup.hidW),
    l: common_vendor.p({
      type: $setup.info.show ? "eye" : "eye-slash",
      size: "25"
    }),
    m: $setup.more,
    n: common_vendor.o($setup.delW),
    o: common_vendor.p({
      type: "trash",
      size: "25"
    }),
    p: $setup.more ? "90px" : "0px"
  } : {
    q: common_vendor.p({
      type: "star",
      size: "25"
    })
  }, {
    r: common_vendor.t($setup.info.content),
    s: $setup.info.src[0] != null && $setup.info.type == "p"
  }, $setup.info.src[0] != null && $setup.info.type == "p" ? {
    t: common_vendor.f($setup.info.src, (item2, index, i0) => {
      return {
        a: item2,
        b: common_vendor.o(($event) => $setup.check_pict(index), index),
        c: index
      };
    })
  } : {}, {
    v: $setup.info.type == "v"
  }, $setup.info.type == "v" ? {
    w: $setup.info.src,
    x: $setup.info.mask
  } : {}, {
    y: common_vendor.o(_ctx.send_friend),
    z: common_vendor.p({
      type: "redo",
      size: "25"
    }),
    A: common_vendor.f($setup.moments, (item, index, i0) => {
      return {
        a: item.avatar,
        b: common_vendor.t(item.name),
        c: common_vendor.t(item.date),
        d: common_vendor.t(item.content),
        e: index,
        f: common_vendor.o(($event) => $options.delComment(item), index)
      };
    }),
    B: common_vendor.o((...args) => $setup.more_stop && $setup.more_stop(...args)),
    C: common_vendor.p({
      type: "star",
      size: "25"
    }),
    D: common_vendor.o((...args) => $setup.send_mes && $setup.send_mes(...args)),
    E: $setup.text,
    F: common_vendor.o(($event) => $setup.text = $event.detail.value),
    G: common_vendor.p({
      size: "25",
      type: "paperplane"
    }),
    H: common_vendor.o((...args) => $setup.send_mes && $setup.send_mes(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0e974b8c"], ["__file", "C:/Users/86130/Documents/HBuilderProjects/传承非遗/pages/workroom/other_page/moment_detail/moment_detail.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
