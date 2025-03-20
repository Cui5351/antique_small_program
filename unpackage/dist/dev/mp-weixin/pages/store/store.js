"use strict";
const common_vendor = require("../../common/vendor.js");
const request_request = require("../../request/request.js");
require("../../request/baseUrl.js");
const _sfc_main = {
  onTabItemTap() {
    this.search.page = 1;
    this.info.splice(0, this.info.length);
    this.loadData();
  },
  methods: {
    loadData() {
      common_vendor.index.showLoading({
        title: "加载店铺中",
        mask: true
      });
      request_request.instance.get("/Store/getAllStore", {
        ...this.search
      }).then((res) => {
        if (res.list.length <= 0) {
          common_vendor.index.showToast({
            title: "已经没有更多了",
            icon: "none"
          });
          return;
        }
        this.info.push(...res.list);
        this.search.page = res.pageNum + 1;
      }).catch((err) => {
        console.log(err, "err");
      }).finally(() => {
        common_vendor.index.hideLoading();
      });
    }
  },
  setup() {
    const carousel = common_vendor.reactive([
      "https://www.mengzhiyuan.email/antique/storeCarousel/carousel1.png",
      "https://www.mengzhiyuan.email/antique/storeCarousel/carousel2.png",
      "https://www.mengzhiyuan.email/antique/storeCarousel/carousel3.png"
    ]);
    const search = common_vendor.reactive({
      page: 1,
      pageSize: 10
    });
    const innerStore = (item) => {
      common_vendor.index.navigateTo({
        url: "/pages/store/other_page/storeDetail/storeDetail?id=" + item.id
      });
    };
    let info = common_vendor.reactive([]);
    let show_store = common_vendor.reactive({
      main: "",
      store: []
    });
    let active = common_vendor.ref("非遗制品");
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
        title: name + "功能暂时未开放"
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
          title: "请先登录",
          icon: "none"
        });
        return;
      }
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
              title: "发生了未知的错误",
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
    return { enter, show_store, info, active, toggle_active, toggle_page, innerStore, search, carousel };
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
    a: common_vendor.f($setup.carousel, (item, index, i0) => {
      return {
        a: item,
        b: index
      };
    }),
    b: common_vendor.f($setup.info, (item, k0, i0) => {
      return {
        a: item.src,
        b: common_vendor.t(item.name),
        c: common_vendor.t(item.description.length >= 25 ? item.description.substring(0, 25) + "..." : item.description),
        d: "c1a2745a-0-" + i0,
        e: item.id,
        f: common_vendor.o(($event) => $setup.innerStore(item), item.id)
      };
    }),
    c: common_vendor.p({
      type: "right",
      size: "30",
      color: "rgba(0,0,0,.5)"
    }),
    d: common_vendor.o((...args) => $options.loadData && $options.loadData(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-c1a2745a"], ["__file", "C:/Users/86130/Documents/HBuilderProjects/传承非遗/pages/store/store.vue"]]);
wx.createPage(MiniProgramPage);
