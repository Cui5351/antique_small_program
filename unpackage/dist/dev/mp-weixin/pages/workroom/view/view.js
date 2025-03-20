"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  name: "",
  onLoad(res) {
    this.getInfo(res.uuid);
    this.get_moments(res.uuid);
  },
  methods: {
    swiperChange(e) {
      if (this.moment[e.detail.current].src[0].substring(this.moment[e.detail.current].src[0].length - 3) == "mp4") {
        console.log("mp4", this.swiperIndex);
        this.pauseVideo(this.swiperIndex, e.detail.current);
      } else if (this.moment[this.swiperIndex].src[0].substring(this.moment[this.swiperIndex].src[0].length - 3) == "mp4") {
        this.pauseVideoOne(this.swiperIndex);
      }
      this.swiperIndex = e.detail.current;
      if (e.detail.current == this.moment.length - 1) {
        this.get_moments(this.moment[this.swiperIndex].uuid);
      }
    },
    pauseVideoOne(id) {
      const videoContext = common_vendor.index.createVideoContext(id + "", this);
      videoContext.pause();
    },
    pauseVideo(id, id2) {
      const videoContext = common_vendor.index.createVideoContext(id + "", this);
      const videoContext2 = common_vendor.index.createVideoContext(id2 + "", this);
      videoContext.pause();
      videoContext2.play();
    },
    getInfo(uuid) {
      let that = this;
      common_vendor.index.request({
        url: common_vendor.index.current_this.baseURL + ":5001/get_community_moments_info",
        data: {
          uuid
        },
        method: "GET",
        success(res) {
          console.log(res, "ress");
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
          that.moment.unshift(...res.data.data);
        },
        complete() {
          setTimeout(() => {
            that.reqs.state = false;
          }, 1e3);
          common_vendor.index.hideLoading();
        },
        fail(err) {
          console.log(err, "err");
        }
      });
    }
  },
  setup() {
    function detail_info(item) {
      common_vendor.index.navigateTo({
        url: `/pages/workroom/other_page/moment_detail/moment_detail?info=${JSON.stringify(item)}`
      });
    }
    let back = () => {
      common_vendor.index.navigateBack();
    };
    function tip(title) {
      common_vendor.index.showToast({
        title: title + "功能暂未开放",
        icon: "none"
      });
    }
    const reqs = common_vendor.reactive({
      stsate: false,
      skip: 0
    });
    const moment = common_vendor.reactive([]);
    function get_moments(uuid) {
      reqs.state = true;
      common_vendor.index.request({
        url: common_vendor.index.current_this.baseURL + ":5001/get_community_moments_next",
        method: "GET",
        data: {
          uuid
        },
        success(res) {
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
          moment.push(...res.data.data);
          reqs.skip += res.data.data.length;
        },
        complete() {
          setTimeout(() => {
            reqs.state = false;
          }, 1e3);
          common_vendor.index.hideLoading();
        },
        fail(err) {
          console.log(err, "err");
        }
      });
    }
    function user_info(item) {
      common_vendor.index.navigateTo({
        url: `/pages/person/other_page/author_info/author_info?info=${JSON.stringify({
          avatar: item.avatar,
          name: item.name,
          openid: item.openid
        })}`
      });
    }
    const swiperIndex = common_vendor.ref(0);
    return { detail_info, back, tip, get_moments, moment, user_info, reqs, swiperIndex };
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($setup.back),
    b: common_vendor.p({
      type: "left",
      size: "25",
      color: "rgb(200,200,186)"
    }),
    c: common_vendor.f($setup.moment, (item, index, i0) => {
      return common_vendor.e({
        a: item.type == "v"
      }, item.type == "v" ? {
        b: index == 0,
        c: index,
        d: index == $setup.swiperIndex,
        e: item.src,
        f: item.mask,
        g: common_vendor.o(() => {
        }, index)
      } : {}, {
        h: item.src[0] != null && item.type == "p"
      }, item.src[0] != null && item.type == "p" ? {
        i: common_vendor.f(item.src, (item2, index2, i1) => {
          return {
            a: item2,
            b: index2
          };
        }),
        j: item.src.length > 1,
        k: common_vendor.n(item.src.length > 1 ? "pic" : "pic2")
      } : {}, {
        l: common_vendor.o(($event) => $setup.detail_info(item), index),
        m: common_vendor.t(item.content.length >= 50 ? item.content.substring(0, 50) + "..." : item.content),
        n: item.avatar,
        o: common_vendor.t(item.name),
        p: common_vendor.o(($event) => $setup.user_info(item), index),
        q: common_vendor.t(item.send_date),
        r: "99e505f6-1-" + i0,
        s: common_vendor.t(item.place.length >= 20 ? item.place.substring(0, 20) + "..." : item.place),
        t: common_vendor.o(($event) => $setup.detail_info(item), index),
        v: index
      });
    }),
    d: common_vendor.p({
      color: "background-color: rgba(0,0,0,0)",
      type: "location"
    }),
    e: common_vendor.o((...args) => $options.swiperChange && $options.swiperChange(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-99e505f6"], ["__file", "C:/Users/86130/Documents/HBuilderProjects/传承非遗/pages/workroom/view/view.vue"]]);
wx.createPage(MiniProgramPage);
