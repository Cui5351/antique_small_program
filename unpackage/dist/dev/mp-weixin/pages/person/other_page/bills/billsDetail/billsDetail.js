"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const request_request = require("../../../../../request/request.js");
require("../../../../../request/baseUrl.js");
const _sfc_main = {
  name: "BillsDetail",
  onLoad(res) {
    const uuid = res.uuid;
    common_vendor.index.showLoading({
      title: "加载订单中",
      mask: true
    });
    request_request.instance.get("/StoreItem/GetBuyGoodsAll", {
      uuid,
      page: 1,
      pageSize: 1
    }).then((res2) => {
      console.log(res2, "res");
      const list = res2.list;
      if (list.length <= 0) {
        common_vendor.index.showToast({
          title: "加载失败",
          icon: "none"
        });
        return;
      }
      Object.keys(this.orderInfo).forEach((item) => {
        this.orderInfo[item] = list[0][item];
      });
      common_vendor.index.hideLoading();
    }).catch(() => {
      common_vendor.index.showToast({
        title: "加载失败",
        icon: "none"
      });
    });
  },
  setup() {
    const orderInfo = common_vendor.reactive({
      address: "",
      avatar_src: "",
      count: 1,
      date: "",
      id: 0,
      goods_id: 0,
      store_id: "",
      money: 0,
      name: "",
      realName: "",
      src: "",
      state2: "",
      store: "",
      tel: "",
      transport_money: 9,
      user: "",
      uuid: ""
    });
    const innerStore = () => {
      common_vendor.index.navigateTo({
        url: "/pages/store/other_page/storeDetail/storeDetail?id=" + orderInfo.store_id
      });
    };
    const back = () => {
      common_vendor.index.navigateBack();
    };
    function again_bought() {
      common_vendor.index.navigateTo({
        url: `/pages/store/other_page/store_page/store_page?id=${orderInfo.goods_id}`
      });
    }
    const copy = () => {
      common_vendor.index.setClipboardData({
        data: orderInfo.uuid,
        success() {
          common_vendor.index.showToast({
            title: "复制成功",
            icon: "none"
          });
        }
      });
    };
    return {
      again_bought,
      orderInfo,
      back,
      innerStore,
      copy
    };
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      type: "left",
      color: "white",
      size: "30"
    }),
    b: common_vendor.o((...args) => $setup.back && $setup.back(...args)),
    c: common_vendor.t($setup.orderInfo.state2),
    d: $setup.orderInfo.avatar_src,
    e: common_vendor.t($setup.orderInfo.store),
    f: common_vendor.o((...args) => $setup.innerStore && $setup.innerStore(...args)),
    g: $setup.orderInfo.src,
    h: common_vendor.t($setup.orderInfo.name),
    i: common_vendor.t($setup.orderInfo.money.toFixed(2)),
    j: common_vendor.t($setup.orderInfo.count),
    k: common_vendor.t($setup.orderInfo.transport_money.toFixed(2)),
    l: common_vendor.t($setup.orderInfo.count),
    m: common_vendor.t(($setup.orderInfo.transport_money + $setup.orderInfo.money * $setup.orderInfo.count).toFixed(2)),
    n: common_vendor.t($setup.orderInfo.uuid),
    o: common_vendor.o((...args) => $setup.copy && $setup.copy(...args)),
    p: common_vendor.t($setup.orderInfo.date),
    q: common_vendor.t($setup.orderInfo.realName),
    r: common_vendor.t($setup.orderInfo.tel),
    s: common_vendor.t($setup.orderInfo.address),
    t: common_vendor.o((...args) => $setup.again_bought && $setup.again_bought(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-c63c7a34"], ["__file", "C:/Users/86130/Documents/HBuilderProjects/传承非遗/pages/person/other_page/bills/billsDetail/billsDetail.vue"]]);
wx.createPage(MiniProgramPage);
