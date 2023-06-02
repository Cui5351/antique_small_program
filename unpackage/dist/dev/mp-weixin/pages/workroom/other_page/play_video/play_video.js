"use strict";
var common_vendor = require("../../../../common/vendor.js");
var common_assets = require("../../../../common/assets.js");
const _sfc_main = {
  name: "",
  onLoad(res) {
    this.person.name = res.name;
    this.person.avatar = res.avatar;
    this.person.openid = res.openid;
    let v = JSON.parse(res.video);
    v.forEach((item) => {
      item.publish_date = common_vendor.index.current_this.dateformat_accuracy(new Date(item.publish_date));
    });
    this.video.push(...v);
    if (this.video.length > 0)
      Object.keys(this.current_video).forEach((item) => {
        if (this.video[0][item] == void 0) {
          return;
        }
        this.current_video[item] = this.video[0][item];
      });
    this.title = res.title;
    let that = this;
    common_vendor.index.request({
      url: common_vendor.index.current_this.baseURL + ":5001/get_danmu",
      method: "POST",
      data: {
        video_id: that.current_video.video_id
      },
      success(res2) {
        if (common_vendor.index.current_this.check_res_state(res2)) {
          return;
        }
        that.current_video.danmu.push(...res2.data.data.map((item) => {
          item.send_date = common_vendor.index.current_this.dateformat(new Date(item.send_date));
          return {
            text: item.danmu,
            time: item.video_time,
            user_name: item.user_name,
            user_avatar: item.user_avatar,
            color: "white",
            date: item.send_date,
            stars: 0
          };
        }));
      }
    });
  },
  onShareAppMessage() {
    this.current_video.share++;
    return {
      title: this.current_video.name,
      imageUrl: this.current_video.mask,
      path: `/pages/workroom/other_page/play_video/play_video?video=${JSON.stringify(this.video)}&title:${this.title}`
    };
  },
  setup() {
    let video = common_vendor.reactive([]);
    let title = common_vendor.ref("");
    let current_video = common_vendor.reactive({
      name: "",
      mask: "",
      src: "",
      video_id: "",
      danmu: [],
      time: 0,
      stars: 0,
      share: 0,
      collection: 0,
      publish_date: ""
    });
    let person = common_vendor.reactive({
      avatar: "",
      name: "",
      openid: ""
    });
    let danmu = common_vendor.ref("");
    let state = common_vendor.ref(true);
    function timeupdate(e) {
      current_video.time = Number.parseInt(e.detail.currentTime);
    }
    let index = common_vendor.ref(0);
    function toggle(ind) {
      if (ind == index.value)
        return;
      common_vendor.index.showLoading({
        title: "\u8D44\u6E90\u52A0\u8F7D\u4E2D",
        mask: true
      });
      Object.keys(current_video).forEach((item) => {
        if (item == "danmu") {
          let i = current_video[item].length;
          for (let j = 0; j < i; j++) {
            current_video[item].pop();
          }
          common_vendor.index.request({
            url: common_vendor.index.current_this.baseURL + ":5001/get_danmu",
            method: "POST",
            data: {
              video_id: current_video.video_id
            },
            success(res) {
              if (common_vendor.index.current_this.check_res_state(res)) {
                return;
              }
              current_video.danmu.push(...res.data.data.map((item2) => {
                console.log(current_video.danmu, "danmu");
                return {
                  text: item2.danmu,
                  time: item2.video_time,
                  date: common_vendor.index.current_this.dateformat_accuracy(new Date(item2.send_date)),
                  user_name: item2.user_name,
                  user_avatar: item2.user_avatar,
                  color: "white"
                };
              }));
            }
          });
          return;
        }
        if (video[ind][item] == void 0)
          return;
        current_video[item] = video[ind][item];
      });
      index.value = ind;
      setTimeout(() => {
        common_vendor.index.hideLoading();
      }, 300);
    }
    function send() {
      if (common_vendor.index.current_this.store.state.user_info.openid.length < 1) {
        common_vendor.index.showToast({
          title: "\u6E05\u5148\u767B\u5F55",
          icon: "none"
        });
        return;
      }
      if (!state.value) {
        common_vendor.index.showToast({
          title: "\u60A8\u8F93\u5165\u7684\u901F\u5EA6\u592A\u5FEB\u4E86,\u4F11\u606F\u4E00\u4E0B\u5427",
          icon: "none"
        });
        return;
      }
      if (danmu.value.length <= 0) {
        common_vendor.index.showToast({
          title: "\u8F93\u5165\u5185\u5BB9\u4E3A\u7A7A",
          icon: "error"
        });
        return;
      }
      state.value = false;
      common_vendor.index.request({
        url: common_vendor.index.current_this.baseURL + ":5001/send_danmu",
        method: "POST",
        data: {
          video_id: current_video.video_id,
          message: danmu.value,
          openid: common_vendor.index.current_this.store.state.user_info.openid,
          video_time: current_video.time
        },
        success(res) {
          if (common_vendor.index.current_this.check_res_state(res))
            return;
          current_video.danmu.push({
            user_avatar: common_vendor.index.current_this.store.state.user_info.avatar,
            user_name: common_vendor.index.current_this.store.state.user_info.name,
            text: danmu.value,
            time: current_video.time,
            color: "white",
            date: common_vendor.index.current_this.dateformat_accuracy(new Date())
          });
        },
        complete() {
          setTimeout(() => {
            danmu.value = "";
            state.value = true;
          }, Math.random() * 1e3);
        }
      });
    }
    let no_develop = common_vendor.index.current_this.no_develop;
    function increment(pro) {
      current_video[pro]++;
    }
    function user_info() {
      common_vendor.index.navigateTo({
        url: `/pages/person/other_page/author_info/author_info?info=${JSON.stringify({
          avatar: person.avatar,
          name: person.name,
          openid: person.openid
        })}`
      });
    }
    return { user_info, video, current_video, person, title, state, timeupdate, danmu, send, toggle, no_develop, increment };
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
    a: $setup.current_video.danmu,
    b: common_vendor.o((...args) => $setup.timeupdate && $setup.timeupdate(...args)),
    c: $setup.current_video.mask,
    d: $setup.current_video.src,
    e: common_vendor.t($setup.title),
    f: common_vendor.t($setup.current_video.name),
    g: common_vendor.t($setup.current_video.publish_date),
    h: $setup.person.avatar,
    i: common_vendor.o((...args) => $setup.user_info && $setup.user_info(...args)),
    j: common_vendor.t($setup.person.name),
    k: common_vendor.o(($event) => $setup.increment("stars")),
    l: common_vendor.p({
      type: $setup.current_video.stars > 0 ? "heart-filled" : "heart",
      color: $setup.current_video.stars > 0 ? "red" : "",
      size: "25"
    }),
    m: common_vendor.t($setup.current_video.stars),
    n: common_vendor.o(($event) => $setup.increment("collection")),
    o: common_vendor.p({
      type: $setup.current_video.collection > 0 ? "star-filled" : "star",
      color: $setup.current_video.collection > 0 ? "gold" : "",
      size: "25"
    }),
    p: common_vendor.t($setup.current_video.collection),
    q: common_vendor.p({
      size: "25",
      type: $setup.current_video.share > 0 ? "paperplane-filled" : "paperplane",
      color: $setup.current_video.share > 0 ? "yellowgreen" : ""
    }),
    r: common_vendor.t($setup.current_video.share),
    s: common_vendor.t($setup.video.length),
    t: common_vendor.p({
      type: "right",
      size: "20"
    }),
    v: common_vendor.f($setup.video, (item, index, i0) => {
      return {
        a: item.mask,
        b: index,
        c: common_vendor.o(($event) => $setup.toggle(index), index)
      };
    }),
    w: common_assets._imports_0,
    x: common_vendor.f($setup.current_video.danmu, (item, index, i0) => {
      return {
        a: item.user_avatar,
        b: common_vendor.t(item.user_name),
        c: common_vendor.t(item.text),
        d: common_vendor.t(item.date),
        e: common_vendor.o(($event) => item.stars++),
        f: "5d1767d0-4-" + i0,
        g: common_vendor.p({
          size: "20",
          type: item.stars > 0 ? "hand-up-filled" : "hand-up",
          color: item.stars > 0 ? "red" : ""
        }),
        h: common_vendor.t(item.stars),
        i: index
      };
    }),
    y: common_vendor.p({
      type: "location",
      size: "30"
    }),
    z: $setup.danmu,
    A: common_vendor.o(($event) => $setup.danmu = $event.detail.value),
    B: common_vendor.o((...args) => $setup.send && $setup.send(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-5d1767d0"], ["__file", "C:/Users/86130/Documents/HBuilderProjects/\u4F20\u627F\u975E\u9057/pages/workroom/other_page/play_video/play_video.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
