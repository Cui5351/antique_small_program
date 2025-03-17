"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  mounted() {
    let query = common_vendor.index.createSelectorQuery();
    let doms = query.select(".data");
    common_vendor.index.current_this1 = this;
    doms.boundingClientRect(function(res) {
      common_vendor.index.current_this1.data_height.height = "150px";
      common_vendor.index.current_this1.data_height.min = "150px";
      common_vendor.index.current_this1.data_height.max = res.height + 100 + "px";
    }).exec(function() {
    });
  },
  onLoad(args) {
    let arg = JSON.parse(args.data);
    Object.keys(this.data).forEach((item) => {
      if (typeof item[item] == "array") {
        this.data[item].push(...arg[item]);
        return;
      }
      this.data[item] = arg[item];
    });
  },
  onShareAppMessage(res) {
    this.state.share = true;
    return {
      imageUrl: this.data.full_src,
      title: this.data.name,
      //分享的名称
      path: `/pages/home/other_page/museum/museum?data=${JSON.stringify(this.data)}`
      // desc:this.data.description[0].substring(0,15)+'...'
      // mpId:'' //此处配置微信小程序的AppId
    };
  },
  //分享到朋友圈
  onShareTimeline() {
    return {
      imageUrl: this.data.full_src,
      title: this.data.name,
      //分享的名称
      type: 0
    };
  },
  setup() {
    let data = common_vendor.reactive({
      name: "",
      max_pic: [],
      description: "",
      antique: [],
      full_src: ""
    });
    let state = common_vendor.reactive({
      subscribe: false,
      share: false
    });
    function back() {
      common_vendor.index.current_this.back();
    }
    function full_screen() {
      common_vendor.index.showToast({
        icon: "none",
        title: "暂未开放"
      });
    }
    function all_antique() {
      if (data.name == "长江艺术工程职业学院非遗传承院")
        return;
      common_vendor.index.navigateTo({
        url: `/pages/home/other_page/show_antique3d/show_antique3d`
      });
    }
    function show_all() {
      data_height.state = !data_height.state;
      if (data_height.state) {
        data_height.height = data_height.max;
      } else
        data_height.height = data_height.min;
    }
    let data_height = common_vendor.reactive({
      height: "50%",
      min: "50%",
      max: "50%",
      state: false
    });
    function subscribe() {
      common_vendor.index.showToast({
        icon: "none",
        title: "暂未开放"
      });
    }
    function show_antique(item) {
      subscribe();
    }
    return {
      show_antique,
      subscribe,
      data_height,
      data,
      back,
      full_screen,
      all_antique,
      show_all,
      state
    };
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
    a: common_vendor.p({
      type: "left",
      size: "25",
      color: "white"
    }),
    b: common_vendor.o((...args) => $setup.back && $setup.back(...args)),
    c: common_vendor.f($setup.data.max_pic, (item, index, i0) => {
      return {
        a: item,
        b: index
      };
    }),
    d: common_vendor.p({
      type: "location",
      size: "30",
      color: "rgb(59,92,130)"
    }),
    e: common_vendor.t($setup.data.name),
    f: common_vendor.f($setup.data.description, (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: index
      };
    }),
    g: $setup.data_height.state ? "auto" : "hidden",
    h: common_vendor.t($setup.data_height.state ? "隐藏" : "展开"),
    i: common_vendor.p({
      type: "bottom",
      size: "20",
      color: "rgb(59,92,130)"
    }),
    j: common_vendor.o((...args) => $setup.show_all && $setup.show_all(...args)),
    k: $setup.data_height.height,
    l: common_vendor.p({
      color: "rgb(59,92,130)",
      type: "right"
    }),
    m: common_vendor.o((...args) => $setup.all_antique && $setup.all_antique(...args)),
    n: common_vendor.f($setup.data.antique, (item, index, i0) => {
      return {
        a: item.src,
        b: common_vendor.t(item.name),
        c: common_vendor.o(($event) => $setup.show_antique(item), index),
        d: index
      };
    }),
    o: $setup.data.full_src,
    p: common_vendor.o((...args) => $setup.full_screen && $setup.full_screen(...args)),
    q: common_vendor.p({
      color: "rgb(77,92,136)",
      type: $setup.state.subscribe ? "star-filled" : "star",
      size: "35"
    }),
    r: common_vendor.o((...args) => $setup.subscribe && $setup.subscribe(...args)),
    s: common_vendor.p({
      color: "rgb(77,92,136)",
      type: $setup.state.share ? "redo-filled" : "redo",
      size: "35"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-be515839"], ["__file", "C:/Users/86130/Documents/HBuilderProjects/传承非遗/pages/home/other_page/museum/museum.vue"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
