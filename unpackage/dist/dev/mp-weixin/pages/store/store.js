"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  setup() {
    let info = common_vendor.reactive([
      {
        title: "\u6587\u520A",
        main: "",
        picture: []
      },
      {
        title: "\u975E\u9057\u5236\u54C1",
        main: common_vendor.index.current_this.baseURL + "/image/antique/culture_big.jpg",
        picture: [{
          name: "\u56E2\u6247",
          src: common_vendor.index.current_this.baseURL + "/image/antique/fan.jpg"
        }, {
          name: "\u864E\u5934\u5E3D",
          src: common_vendor.index.current_this.baseURL + "/antique/store_picture/\u864E\u5934\u5E3D.jpg"
        }, {
          name: "\u7CBE\u7F8E\u8D1D\u96D5",
          src: common_vendor.index.current_this.baseURL + "/antique/store_picture/\u7CBE\u7F8E\u8D1D\u96D5.jpg"
        }]
      },
      {
        title: "\u8054\u540D\u6587\u520A",
        main: common_vendor.index.current_this.baseURL + "/image/antique/culture_big.jpg",
        picture: []
      },
      {
        title: "\u4E13\u5C5E\u5B9A\u5236",
        main: "",
        picture: []
      },
      {
        title: "\u8054\u540D\u670D\u88C5",
        main: "",
        picture: []
      }
    ]);
    let show_store = common_vendor.reactive({
      main: "",
      store: []
    });
    let active = common_vendor.ref("\u975E\u9057\u5236\u54C1");
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
      if (!common_vendor.index.current_this.store.getters.login_state) {
        common_vendor.index.showToast({
          title: "\u8BF7\u5148\u767B\u5F55",
          icon: "none"
        });
        return;
      }
      if (item.name == "\u56E2\u6247" || item.name == "\u864E\u5934\u5E3D" || item.name == "\u7CBE\u7F8E\u8D1D\u96D5") {
        common_vendor.index.request({
          url: common_vendor.index.current_this.baseURL + ":5001/getStoreInfo",
          method: "POST",
          data: {
            name: item.name
          },
          success(res) {
            console.log(res, "res");
            if (res.data.state != 1) {
              common_vendor.index.showToast({
                title: "\u53D1\u751F\u4E86\u672A\u77E5\u7684\u9519\u8BEF",
                icon: "error"
              });
              return;
            }
            let info2 = {
              name: "",
              money: 0,
              sale: 0,
              depository: 0,
              src: "",
              description: "",
              store: "",
              pic: [],
              transport_money: 0
            };
            info2.pic.push(...res.data.data.pic.map((item2) => item2.src));
            Object.keys(info2).forEach((item2) => {
              if (item2 == "pic" || item2 == "bought_log" || item2 == "comment")
                return;
              info2[item2] = res.data.data.info[item2];
            });
            common_vendor.index.navigateTo({
              url: `/pages/store/other_page/store_page/store_page?info=${JSON.stringify(info2)}&state=0`
            });
          }
        });
        return;
      }
      common_vendor.index.showToast({
        icon: "none",
        title: item.name + "\u6682\u65F6\u8FD8\u4E0D\u80FD\u770B"
      });
    }
    return { enter, show_store, info, active, toggle_active, toggle_page };
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
      color: "gray",
      size: "25",
      type: "search"
    }),
    b: common_vendor.o(($event) => $setup.toggle_page("\u641C\u7D22")),
    c: common_vendor.f($setup.info, (item, index, i0) => {
      return {
        a: $setup.active == item.title,
        b: common_vendor.t(item.title),
        c: common_vendor.o(($event) => $setup.toggle_active(item), index),
        d: common_vendor.n($setup.active == item.title ? "active" : ""),
        e: index
      };
    }),
    d: $setup.show_store.main,
    e: common_vendor.f($setup.show_store.store, (item, index, i0) => {
      return {
        a: item.src,
        b: common_vendor.o(($event) => $setup.enter(item), index),
        c: index
      };
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-644d0e6c"], ["__file", "C:/Users/86130/Documents/HBuilderProjects/\u4F20\u627F\u975E\u9057/pages/store/store.vue"]]);
wx.createPage(MiniProgramPage);
