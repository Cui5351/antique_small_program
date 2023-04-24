"use strict";
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  setup() {
    let info = common_vendor.reactive([
      {
        title: "\u5317\u4EAC\u5E02",
        main: "/static/background.jpg",
        picture: []
      },
      {
        title: "\u5929\u6D25\u5E02",
        main: "/static/background.jpg",
        picture: []
      },
      {
        title: "\u4E0A\u6D77\u5E02",
        main: "/static/background.jpg",
        picture: []
      },
      {
        title: "\u91CD\u5E86\u5E02",
        main: "/static/background.jpg",
        picture: []
      },
      {
        title: "\u6E56\u5317\u7701",
        main: "/static/background.jpg",
        picture: [{
          name: "aaa",
          src: "/static/background.jpg"
        }, {
          name: "aaa",
          src: "/static/background.jpg"
        }, {
          name: "aaa",
          src: "/static/background.jpg"
        }, {
          name: "aaa",
          src: "/static/background.jpg"
        }, {
          name: "aaa",
          src: "/static/background.jpg"
        }, {
          name: "aaa",
          src: "/static/background.jpg"
        }, {
          name: "aaa",
          src: "/static/background.jpg"
        }, {
          name: "aaa",
          src: "/static/background.jpg"
        }, {
          name: "aaa",
          src: "/static/background.jpg"
        }, {
          name: "aaa",
          src: "/static/background.jpg"
        }, {
          name: "aaa",
          src: "/static/background.jpg"
        }, {
          name: "aaa",
          src: "/static/background.jpg"
        }, {
          name: "aaa",
          src: "/static/background.jpg"
        }, {
          name: "aaa",
          src: "/static/background.jpg"
        }]
      },
      {
        title: "\u5E7F\u4E1C\u7701",
        main: "/static/background.jpg",
        picture: []
      },
      {
        title: "\u6D77\u5357\u7701",
        main: "/static/background.jpg",
        picture: []
      },
      {
        title: "\u56DB\u5DDD\u7701",
        main: "/static/background.jpg",
        picture: []
      },
      {
        title: "\u8D35\u5DDE\u7701",
        main: "/static/background.jpg",
        picture: []
      },
      {
        title: "\u4E91\u5357\u7701",
        main: "/static/background.jpg",
        picture: []
      },
      {
        title: "\u9655\u897F\u7701",
        main: "/static/background.jpg",
        picture: []
      },
      {
        title: "\u7518\u8083\u7701",
        main: "/static/background.jpg",
        picture: []
      },
      {
        title: "\u9752\u6D77\u7701",
        main: "/static/background.jpg",
        picture: []
      },
      {
        title: "\u53F0\u6E7E\u7701",
        main: "/static/background.jpg",
        picture: []
      },
      {
        title: "\u6CB3\u5317\u7701",
        main: "/static/background.jpg",
        picture: []
      },
      {
        title: "\u5C71\u897F\u7701",
        main: "/static/background.jpg",
        picture: []
      },
      {
        title: "\u8FBD\u5B81\u7701",
        main: "/static/background.jpg",
        picture: []
      },
      {
        title: "\u5409\u6797\u7701",
        main: "/static/background.jpg",
        picture: []
      },
      {
        title: "\u9ED1\u9F99\u6C5F\u7701",
        main: "/static/background.jpg",
        picture: []
      },
      {
        title: "\u6C5F\u82CF\u7701",
        main: "/static/background.jpg",
        picture: []
      },
      {
        title: "\u6D59\u6C5F\u7701",
        main: "/static/background.jpg",
        picture: []
      },
      {
        title: "\u5B89\u5FBD\u7701",
        main: "/static/background.jpg",
        picture: []
      },
      {
        title: "\u798F\u5EFA\u7701",
        main: "/static/background.jpg",
        picture: []
      },
      {
        title: "\u6C5F\u897F\u7701",
        main: "/static/background.jpg",
        picture: []
      },
      {
        title: "\u5C71\u4E1C\u7701",
        main: "/static/background.jpg",
        picture: []
      },
      {
        title: "\u6CB3\u5357\u7701",
        main: "/static/background.jpg",
        picture: []
      },
      {
        title: "\u6E56\u5357\u7701",
        main: "/static/background.jpg",
        picture: []
      },
      {
        title: "\u5E7F\u4E1C\u7701",
        main: "/static/background.jpg",
        picture: []
      },
      {
        title: "\u6E56\u5357\u7701",
        main: "/static/background.jpg",
        picture: []
      },
      {
        title: "\u6D77\u5357\u7701",
        main: "/static/background.jpg",
        picture: []
      },
      {
        title: "\u56DB\u5DDD\u7701",
        main: "/static/background.jpg",
        picture: []
      },
      {
        title: "\u8D35\u5DDE\u7701",
        main: "/static/background.jpg",
        picture: []
      },
      {
        title: "\u9655\u897F\u7701",
        main: "/static/background.jpg",
        picture: []
      },
      {
        title: "\u7518\u8083\u7701",
        main: "/static/background.jpg",
        picture: []
      },
      {
        title: "\u9752\u6D77\u7701",
        main: "/static/background.jpg",
        picture: []
      },
      {
        title: "\u53F0\u6E7E\u7701",
        main: "/static/background.jpg",
        picture: []
      },
      {
        title: "\u5E7F\u897F\u58EE\u65CF\u81EA\u6CBB\u533A",
        main: "/static/background.jpg",
        picture: []
      },
      {
        title: "\u5185\u8499\u53E4\u81EA\u6CBB\u533A",
        main: "/static/background.jpg",
        picture: []
      },
      {
        title: "\u897F\u85CF\u81EA\u6CBB\u533A",
        main: "/static/background.jpg",
        picture: []
      },
      {
        title: "\u5B81\u590F\u65CF\u81EA\u6CBB\u533A",
        main: "/static/background.jpg",
        picture: []
      },
      {
        title: "\u65B0\u7586\u7EF4\u543E\u5C14\u81EA\u6CBB\u533A",
        main: "/static/background.jpg",
        picture: []
      },
      {
        title: "\u9999\u6E2F\u7279\u522B\u884C\u653F\u533A",
        main: "/static/background.jpg",
        picture: []
      },
      {
        title: "\u6FB3\u95E8\u7279\u522B\u884C\u653F\u533A",
        main: "/static/background.jpg",
        picture: []
      }
    ]);
    let show_store = common_vendor.reactive({
      main: "1",
      store: []
    });
    let active = common_vendor.ref("\u6E56\u5317\u7701");
    function toggle_active(item) {
      if (active.value != item.title) {
        active.value = item.title;
        show_store.main = item.main;
        let c = show_store.store.length;
        for (let i = 0; i < c; i++)
          show_store.store.shift();
        show_store.store.push(...item.picture);
      }
    }
    function toggle_page(name) {
      common_vendor.index.showToast({
        icon: "none",
        title: name + "\u529F\u80FD\u6682\u65F6\u672A\u5F00\u653E"
      });
    }
    info.forEach((item) => {
      if (item.title == active.value) {
        show_store.main = item.main;
        show_store.store.push(...item.picture);
      }
    });
    function enter(item) {
      common_vendor.index.showToast({
        icon: "none",
        title: item.name + "\u6682\u65F6\u8FD8\u4E0D\u80FD\u770B"
      });
    }
    let back = common_vendor.index.current_this.back;
    return { back, enter, show_store, info, active, toggle_active, toggle_page };
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
      size: "25"
    }),
    b: common_vendor.o((...args) => $setup.back && $setup.back(...args)),
    c: common_vendor.p({
      color: "gray",
      size: "25",
      type: "search"
    }),
    d: common_vendor.o(($event) => $setup.toggle_page("\u641C\u7D22")),
    e: common_vendor.f($setup.info, (item, index, i0) => {
      return {
        a: $setup.active == item.title,
        b: common_vendor.t(item.title),
        c: common_vendor.o(($event) => $setup.toggle_active(item), index),
        d: common_vendor.n($setup.active == item.title ? "active" : ""),
        e: index
      };
    }),
    f: $setup.show_store.main
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-85a52bf6"], ["__file", "C:/Users/86130/Documents/HBuilderProjects/\u4F20\u627F\u975E\u9057/pages/home/other_page/all_museum/all_museum.vue"]]);
wx.createPage(MiniProgramPage);
