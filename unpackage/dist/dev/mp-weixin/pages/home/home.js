"use strict";
var common_vendor = require("../../common/vendor.js");
const loading = () => "../loading/loading.js";
const _sfc_main = {
  onShareAppMessage() {
    return {
      title: "\u535A\u5B66\u82D1",
      path: "/pages/home/home"
    };
  },
  onShareTimeline() {
    return {
      title: "\u535A\u5B66\u82D1",
      type: 0
    };
  },
  components: {
    loading
  },
  setup() {
    let other = common_vendor.reactive([{
      name: "\u5730\u56FE\u5BFC\u89C8",
      pic: "../../static/my_head.png"
    }, {
      name: "\u6587\u7269\u5E93",
      pic: "../../static/my_head.png"
    }, {
      name: "\u7126\u70B9\u65B0\u95FB",
      pic: "../../static/my_head.png"
    }, {
      name: "\u7EBF\u4E0B\u4F53\u9A8C\u9986",
      pic: "../../static/my_head.png"
    }]);
    let show_loading = common_vendor.ref(false);
    let base_url = common_vendor.ref(common_vendor.index.current_this.baseURL);
    function loading2() {
      show_loading.value = true;
      setTimeout(() => {
        show_loading.value = false;
      }, 1e3 * Math.random() * 10);
    }
    function toggle_other(item) {
      console.log(item, "item");
      common_vendor.index.showToast({
        icon: "none",
        title: item.name + "\u6682\u672A\u5F00\u653E"
      });
    }
    function more(name) {
      common_vendor.index.showToast({
        icon: "none",
        title: name + "\u6682\u65F6\u672A\u5F00\u653E"
      });
    }
    function museum(name) {
      common_vendor.index.showToast({
        icon: "none",
        title: "\u6682\u65F6\u672A\u5F00\u653E"
      });
    }
    function story(name) {
      common_vendor.index.showToast({
        icon: "none",
        title: "\u975E\u9057\u6545\u4E8B" + name + "\u6682\u65F6\u672A\u5F00\u653E"
      });
    }
    return { loading: loading2, story, more, museum, show_loading, base_url, other, toggle_other };
  }
};
if (!Array) {
  const _component_loading = common_vendor.resolveComponent("loading");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_component_loading + _easycom_uni_icons2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      show_loading: $setup.show_loading
    }),
    b: $setup.base_url + "/image/antique/home_swiper1.jpg",
    c: $setup.base_url + "/image/antique/home_swiper1.jpg",
    d: $setup.base_url + "/image/antique/home_swiper1.jpg",
    e: common_vendor.f($setup.other, (item, inex, i0) => {
      return {
        a: item.pic,
        b: common_vendor.t(item.name),
        c: common_vendor.o(($event) => $setup.toggle_other(item), _ctx.index)
      };
    }),
    f: _ctx.index,
    g: common_vendor.p({
      color: "rgb(59,92,130)",
      type: "right"
    }),
    h: common_vendor.o(($event) => $setup.more("all")),
    i: common_vendor.f([1, 2], (item, index, i0) => {
      return {
        a: $setup.base_url + "/image/antique/museum" + item + ".jpg",
        b: common_vendor.o(($event) => $setup.museum(item), index),
        c: index
      };
    }),
    j: common_vendor.p({
      color: "rgb(59,92,130)",
      type: "right"
    }),
    k: common_vendor.o(($event) => $setup.more("more_category")),
    l: common_vendor.f([1, 2, 3], (item, index, i0) => {
      return {
        a: $setup.base_url + "/image/antique/story" + item + ".jpg",
        b: common_vendor.o(($event) => $setup.story(item), index),
        c: index
      };
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-92bb8f34"], ["__file", "C:/Users/86130/Documents/HBuilderProjects/\u4F20\u627F\u975E\u9057/pages/home/home.vue"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
