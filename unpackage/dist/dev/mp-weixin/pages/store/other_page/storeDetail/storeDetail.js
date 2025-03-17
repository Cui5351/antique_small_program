"use strict";
const common_vendor = require("../../../../common/vendor.js");
const request_request = require("../../../../request/request.js");
require("../../../../request/baseUrl.js");
const _sfc_main = {
  onLoad(res) {
    console.log(res, "res");
    this.storeName = res.name;
    return;
  },
  onShow() {
    this.search.page = 1;
    this.services.splice(0, this.services.length);
    this.loadData();
  },
  methods: {
    loadData() {
      common_vendor.index.showLoading({
        title: "加载商品中"
      });
      request_request.instance.get("/StoreItem/list", {
        store: this.storeName,
        ...this.search
      }).then((res) => {
        if (res.list.length <= 0) {
          common_vendor.index.showToast({
            title: "已经没有更多了",
            icon: "none"
          });
          return;
        }
        this.services.push(...res.list);
        this.search.page = res.pageNum + 1;
        console.log(res, "res");
      }).catch((err) => {
        console.log(err, "err");
      }).finally(() => {
        common_vendor.index.hideLoading();
      });
    }
  },
  setup() {
    const currentTab = common_vendor.ref(0);
    const storeName = common_vendor.ref("");
    const currentSubTab = common_vendor.ref(0);
    const carousel = common_vendor.reactive([
      "https://www.mengzhiyuan.email/antique/storeCarousel/carousel1.png",
      "https://www.mengzhiyuan.email/antique/storeCarousel/carousel2.png",
      "https://www.mengzhiyuan.email/antique/storeCarousel/carousel3.png"
    ]);
    const search = common_vendor.reactive({
      page: 1,
      pageSize: 10
    });
    const orderType = common_vendor.ref(null);
    const data = common_vendor.reactive({
      avatar: "",
      businessHours: "",
      name: "",
      storeType: "",
      townName: "",
      storeId: "",
      status: 1
    });
    const swiperList = common_vendor.reactive([]);
    const services = common_vendor.reactive([]);
    const switchTab = (index) => {
      currentTab.value = index;
    };
    const switchSubTab = (index) => {
      currentSubTab.value = index;
    };
    const enterService = (item) => {
      console.log(item, "item");
      Object.assign(item, {
        storeId: data.storeId
      });
      common_vendor.index.navigateTo({
        url: `/pages/store/other_page/store_page/store_page?id=${item.id}&name=${item.name}`
        // url:'/pages/store/order/order?item='+JSON.stringify({...item,orderType:orderType.value})
      });
    };
    return {
      enterService,
      currentSubTab,
      switchSubTab,
      currentTab,
      swiperList,
      carousel,
      storeName,
      search,
      services,
      switchTab,
      data,
      orderType
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($setup.carousel, (img, index, i0) => {
      return {
        a: img,
        b: index
      };
    }),
    b: $setup.services.length > 0
  }, $setup.services.length > 0 ? {
    c: common_vendor.f([...$setup.services], (item, index, i0) => {
      var _a;
      return {
        a: item.url,
        b: common_vendor.t(item.name),
        c: common_vendor.t(item.description.length >= 10 ? item.description.substring(0, 10) + "..." : item.description),
        d: common_vendor.t((_a = item.money) == null ? void 0 : _a.toFixed(2)),
        e: common_vendor.t(item.sale),
        f: common_vendor.t(item.depository),
        g: index,
        h: common_vendor.o(($event) => $setup.enterService(item), index)
      };
    })
  } : {}, {
    d: common_vendor.o((...args) => $options.loadData && $options.loadData(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-84caa7b7"], ["__file", "C:/Users/86130/Documents/HBuilderProjects/传承非遗/pages/store/other_page/storeDetail/storeDetail.vue"]]);
wx.createPage(MiniProgramPage);
