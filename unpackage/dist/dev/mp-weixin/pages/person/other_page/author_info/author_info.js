"use strict";
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "",
  onLoad(res) {
    let that = this;
    let inf = JSON.parse(res.info);
    Object.keys(inf).forEach((item) => {
      this.info[item] = inf[item];
    });
    this.reqmoment();
    common_vendor.index.request({
      url: common_vendor.index.current_this.baseURL + ":5001/get_author_info",
      method: "POST",
      data: {
        openid: that.info.openid
      },
      success(res2) {
        if (common_vendor.index.current_this.check_res_state(res2)) {
          return;
        }
        Object.keys(res2.data.data).forEach((item) => {
          that.info[item] = res2.data.data[item];
        });
      }
    });
    common_vendor.index.request({
      url: common_vendor.index.current_this.baseURL + ":5001/get_workAll",
      method: "POST",
      data: {
        openid: that.info.openid
      },
      success(res2) {
        if (common_vendor.index.current_this.check_res_state(res2)) {
          return;
        }
        that.info.works.push(...res2.data.data);
      }
    });
  },
  setup() {
    let info = common_vendor.reactive({
      name: "",
      avatar: "",
      sex: "",
      openid: "",
      background: "",
      introduce: "",
      counts: [0, 0, 0],
      works: [],
      works2: [],
      toggle: true
    });
    function toggle(bool) {
      info.toggle = bool;
    }
    let opacity = common_vendor.ref(true);
    let top = common_vendor.ref(common_vendor.index.getMenuButtonBoundingClientRect().height * 2);
    let back = common_vendor.index.current_this.back;
    const reqs = common_vendor.reactive({
      state: false,
      skip: 0
    });
    function lower() {
      if (info.toggle)
        return;
      reqmoment();
    }
    function reqmoment() {
      if (reqs.state)
        return;
      reqs.state = true;
      common_vendor.index.request({
        url: common_vendor.index.current_this.baseURL + ":5001/get_person_community_moments2",
        method: "POST",
        data: {
          openid: info.openid,
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
          info.works2.push(...w);
        },
        fail(e) {
          console.log(e);
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
    function inter(item) {
      common_vendor.index.request({
        url: common_vendor.index.current_this.baseURL + ":5001/get_video",
        method: "POST",
        data: {
          uuid: item.uuid
        },
        success(res) {
          if (common_vendor.index.current_this.check_res_state(res)) {
            return;
          }
          if (!res.data.data.length) {
            common_vendor.index.showToast({
              title: "\u8BE5\u4F5C\u54C1\u96C6\u4E3A\u7A7A",
              icon: "none"
            });
            return;
          }
          common_vendor.index.navigateTo({
            url: `/pages/workroom/other_page/play_video/play_video?video=${JSON.stringify(res.data.data)}&title=${item.title}&avatar=${info.avatar}&name=${info.name}&openid=${info.openid}`
          });
        }
      });
    }
    return { inter, info, detail, toggle, reqs, opacity, reqmoment, top, back, lower };
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
  return common_vendor.e({
    a: common_vendor.t($setup.info.name),
    b: $setup.top + "px",
    c: $setup.opacity ? "0%" : "100%",
    d: common_vendor.o($setup.back),
    e: common_vendor.p({
      type: "left",
      size: "25",
      color: "white"
    }),
    f: $setup.info.background,
    g: $setup.info.avatar,
    h: common_vendor.t($setup.info.works.length),
    i: common_vendor.t($setup.info.counts[1]),
    j: common_vendor.t($setup.info.counts[2]),
    k: common_vendor.t($setup.info.name),
    l: common_vendor.t($setup.info.sex),
    m: common_vendor.t($setup.info.openid),
    n: common_vendor.t($setup.info.introduce),
    o: common_vendor.o(($event) => $setup.toggle(true)),
    p: common_vendor.o(($event) => $setup.toggle(false)),
    q: $setup.info.toggle ? "0%" : "50%",
    r: $setup.top + "px",
    s: !$setup.info.toggle
  }, !$setup.info.toggle ? {} : {}, {
    t: !$setup.info.toggle
  }, !$setup.info.toggle ? {
    v: common_vendor.f($setup.info.works2, (item, index, i0) => {
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
    w: $setup.info.toggle
  }, $setup.info.toggle ? common_vendor.e({
    x: $setup.info.works.length <= 0 && $setup.info.toggle
  }, $setup.info.works.length <= 0 && $setup.info.toggle ? {} : {}, {
    y: common_vendor.f($setup.info.works, (item, index, i0) => {
      return {
        a: item.mask,
        b: common_vendor.o(($event) => $setup.inter(item), index),
        c: index
      };
    }),
    z: $setup.info.toggle,
    A: common_vendor.n($setup.info.works.length <= 0 && $setup.info.toggle ? "start_btn_cen" : "")
  }) : {}, {
    B: common_vendor.o((...args) => $setup.lower && $setup.lower(...args))
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-ae4c9f56"], ["__file", "C:/Users/86130/Documents/HBuilderProjects/\u4F20\u627F\u975E\u9057/pages/person/other_page/author_info/author_info.vue"]]);
wx.createPage(MiniProgramPage);
