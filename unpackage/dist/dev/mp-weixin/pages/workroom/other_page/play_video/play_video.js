"use strict";
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "",
  onLoad(res) {
    this.video.push(...JSON.parse(res.video));
    if (this.video.length > 0)
      Object.keys(this.current_video).forEach((item) => {
        if (this.video[0][item] == void 0) {
          return;
        }
        this.current_video[item] = this.video[0][item];
      });
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
        console.log(res2.data.data);
        that.current_video.danmu.push(...res2.data.data);
        console.log(that.current_video);
      }
    });
  },
  setup() {
    let video = common_vendor.reactive([]);
    let current_video = common_vendor.reactive({
      name: "",
      mask: "",
      src: "",
      video_id: "",
      danmu: [],
      time: 0
    });
    let state = common_vendor.ref(false);
    function fouc() {
      state.value = true;
    }
    function unfocu() {
      state.value = false;
    }
    function timeupdate(e) {
      current_video.time = Number.parseInt(e.detail.currentTime);
    }
    return { video, current_video, state, fouc, unfocu, timeupdate };
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
    a: common_vendor.o((...args) => $setup.timeupdate && $setup.timeupdate(...args)),
    b: $setup.current_video.mask,
    c: $setup.current_video.src,
    d: common_vendor.t($setup.current_video.name),
    e: common_vendor.p({
      type: "heart",
      size: "25"
    }),
    f: common_vendor.p({
      type: "star",
      size: "25"
    }),
    g: common_vendor.p({
      size: "25",
      type: "paperplane"
    }),
    h: common_vendor.t($setup.video.length),
    i: common_vendor.p({
      type: "right",
      size: "20"
    }),
    j: common_vendor.f($setup.video, (item, index, i0) => {
      return {
        a: item.mask,
        b: index
      };
    }),
    k: common_vendor.f($setup.current_video.danmu, (item, index, i0) => {
      return {
        a: item.user_avatar,
        b: common_vendor.t(item.user_name),
        c: common_vendor.t(item.danmu),
        d: "5d1767d0-4-" + i0,
        e: "5d1767d0-5-" + i0,
        f: "5d1767d0-6-" + i0,
        g: index
      };
    }),
    l: common_vendor.p({
      size: "20",
      type: "chat"
    }),
    m: common_vendor.p({
      size: "20",
      type: "heart"
    }),
    n: common_vendor.p({
      size: "20",
      type: "paperplane"
    }),
    o: common_vendor.p({
      type: "location",
      size: "30"
    }),
    p: common_vendor.o((...args) => $setup.unfocu && $setup.unfocu(...args)),
    q: common_vendor.o((...args) => $setup.fouc && $setup.fouc(...args)),
    r: common_vendor.n($setup.state ? "middle" : "")
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-5d1767d0"], ["__file", "C:/Users/86130/Documents/HBuilderProjects/\u4F20\u627F\u975E\u9057/pages/workroom/other_page/play_video/play_video.vue"]]);
wx.createPage(MiniProgramPage);
