"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  mounted() {
  },
  onTabItemTap() {
    common_vendor.index.showLoading({
      title: "加载中",
      mask: true
    });
    this.moment.splice(0, this.moment.length);
    this.reqs.skip = 0;
    this.reqs.state = false;
    this.get_moments();
  },
  methods: {
    reload() {
      common_vendor.index.showLoading({
        title: "加载中",
        mask: true
      });
      this.moment.splice(0, this.moment.length);
      this.reqs.skip = 0;
      this.reqs.state = false;
      this.get_moments();
    }
  },
  setup() {
    let show_add = common_vendor.ref(false);
    let reqs = common_vendor.reactive({
      state: false,
      skip: 0
    });
    let moment = common_vendor.reactive([]);
    let back = common_vendor.index.current_this.back;
    function publish_moment() {
      if (common_vendor.index.current_this.check_login_state()) {
        common_vendor.index.showToast({
          title: "请先登录",
          icon: "none"
        });
        return;
      }
      common_vendor.index.chooseMedia({
        // count:9默认为9
        sourceType: ["album"],
        //从相册选择
        mediaType: ["image"],
        count: 9,
        success(res) {
          let paths = res.tempFiles;
          paths = paths.map((item) => {
            return item.tempFilePath;
          });
          common_vendor.index.navigateTo({
            url: `/pages/workroom/other_page/public_moment/public_moment?paths=${JSON.stringify(paths)}`,
            events: {
              loadData() {
                moment.splice(0, moment.length);
                reqs.skip = 0;
                reqs.state = false;
                get_moments();
              }
            }
          });
        }
      });
    }
    function publish_moment2() {
      if (common_vendor.index.current_this.check_login_state()) {
        common_vendor.index.showToast({
          title: "请先登录",
          icon: "none"
        });
        return;
      }
      common_vendor.index.chooseMedia({
        count: 1,
        mediaType: ["video"],
        // count:9默认为9
        success(res) {
          let paths = res.tempFiles[0];
          if (paths.size / 1024 / 1024 >= 200) {
            common_vendor.index.showToast({
              title: "上传视频大小必须小于200Mb",
              icon: "none"
            });
            return;
          }
          common_vendor.index.navigateTo({
            url: `/pages/workroom/other_page/public_moment/public_moment_v?path=${JSON.stringify(paths)}`,
            events: {
              loadData() {
                moment.splice(0, moment.length);
                reqs.skip = 0;
                reqs.state = false;
                get_moments();
              }
            }
          });
        },
        fail(e) {
          common_vendor.index.showToast({
            title: "上传视频大小必须小于200Mb",
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
          itemList: ["发送给朋友", "保存图片", "收藏"]
        }
      });
    }
    function detail(item) {
      common_vendor.index.navigateTo({
        // url:`/pages/workroom/other_page/moment_detail/moment_detail?info=${JSON.stringify(item)}`
        url: "/pages/workroom/view/view?uuid=" + item.uuid
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
    function upper() {
      if (reqs.state) {
        return;
      }
      common_vendor.index.showLoading({
        title: "加载中",
        mask: true
      });
      reqs.state = true;
      common_vendor.index.request({
        url: common_vendor.index.current_this.baseURL + ":5001/get_new_community_moments",
        method: "POST",
        data: {
          uuid: moment[0].uuid
        },
        success(res) {
          if (common_vendor.index.current_this.check_res_state(res))
            return;
          if (res.data.data.length <= 0) {
            common_vendor.index.showToast({
              title: "没有更多了"
            });
            return;
          }
          res.data.data.forEach((item) => {
            item.send_date = common_vendor.index.current_this.dateformat_accuracy(new Date(item.send_date));
          });
          moment.unshift(...res.data.data);
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
      common_vendor.index.navigateTo({
        url: `/pages/person/other_page/author_info/author_info?info=${JSON.stringify({
          avatar: item.avatar,
          name: item.name,
          openid: item.openid
        })}`
      });
    }
    return { back, show_add, moment, reqs, user_info, upper, publish_moment2, publish_moment, get_moments, reqs, check_pict, detail, lower };
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
    c: common_vendor.o((...args) => $setup.publish_moment && $setup.publish_moment(...args)),
    d: common_vendor.n($setup.show_add ? "add show_add2 flex_j_a_c" : "add flex_j_a_c"),
    e: common_vendor.o((...args) => $setup.publish_moment2 && $setup.publish_moment2(...args)),
    f: common_vendor.n($setup.show_add ? "add show_add3 flex_j_a_c" : "add flex_j_a_c"),
    g: common_vendor.o((...args) => $options.reload && $options.reload(...args)),
    h: common_vendor.o(($event) => $setup.show_add = true),
    i: common_vendor.f(["传承非遗", "工匠精神", "习总书记说非遗", "来自非遗工作室的秘密", "非遗元宇宙", "和我们一起畅游非遗吧"], (item, index, i0) => {
      return {
        a: common_vendor.t(index + 1),
        b: common_vendor.t(item),
        c: index
      };
    }),
    j: common_vendor.f($setup.moment, (item, index, i0) => {
      return common_vendor.e({
        a: item.avatar,
        b: common_vendor.o(($event) => $setup.user_info(item), index),
        c: common_vendor.t(item.name),
        d: common_vendor.t(item.place),
        e: common_vendor.t(item.content.length >= 100 ? item.content.substring(0, 100) + "..." : item.content),
        f: item.type == "v"
      }, item.type == "v" ? {
        g: item.src,
        h: item.mask,
        i: common_vendor.o(() => {
        }, index)
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
        m: "bdd71059-1-" + i0,
        n: "bdd71059-2-" + i0,
        o: common_vendor.t(item.browse),
        p: "bdd71059-3-" + i0,
        q: common_vendor.t(item.moment_count),
        r: "bdd71059-4-" + i0,
        s: common_vendor.t(item.send_date),
        t: index,
        v: common_vendor.o(($event) => $setup.detail(item), index)
      });
    }),
    k: common_vendor.p({
      type: "heart",
      size: "25"
    }),
    l: common_vendor.p({
      type: "eye",
      size: "25"
    }),
    m: common_vendor.p({
      type: "chat",
      size: "25"
    }),
    n: common_vendor.p({
      type: "paperplane",
      size: "25"
    }),
    o: common_vendor.o(($event) => $setup.show_add = false),
    p: common_vendor.o(($event) => $setup.show_add = false),
    q: common_vendor.o((...args) => $setup.lower && $setup.lower(...args)),
    r: common_vendor.o((...args) => $setup.upper && $setup.upper(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-bdd71059"], ["__file", "C:/Users/86130/Documents/HBuilderProjects/传承非遗/pages/workroom/workroom.vue"]]);
wx.createPage(MiniProgramPage);
