"use strict";
const common_vendor = require("../../../../common/vendor.js");
const request_request = require("../../../../request/request.js");
require("../../../../request/baseUrl.js");
const _sfc_main = {
  name: "Order",
  computed: {
    balance() {
      var _a;
      return (_a = this.count * this.goodsInfo.money + this.goodsInfo.transport_money) == null ? void 0 : _a.toFixed(2);
    }
  },
  methods: {
    chooseLocation(type) {
      let that = this;
      common_vendor.index.chooseAddress({
        success(res) {
          that.Address.realName = res.userName;
          that.Address.tel = res.telNumber;
          that.Address.address = `${res.provinceName}${res.cityName}${res.countyName}${res.detailInfo}`;
          console.log(res, "res");
        },
        fail(err) {
          console.log(err, "err");
        }
      });
    }
  },
  onLoad(res) {
    const goods = JSON.parse(res.info);
    Object.keys(this.goodsInfo).forEach((item) => {
      this.goodsInfo[item] = goods[item];
    });
  },
  setup() {
    const goodsInfo = common_vendor.reactive({
      name: "",
      money: 0,
      sale: 0,
      depository: 0,
      description: "",
      id: "",
      store_id: "",
      store: "",
      pic: [],
      uuid: "",
      transport_money: 0
    });
    const Address = common_vendor.reactive({
      realName: "",
      tel: "",
      address: "请选择下单地址"
    });
    const count = common_vendor.ref(1);
    const updateCount = (step) => {
      const newCount = count.value + step;
      if (newCount > goodsInfo.depository) {
        common_vendor.index.showModal({
          title: "没有更多的库存了，亲!",
          showCancel: false
        });
        return;
      }
      if (newCount >= 1) {
        count.value = newCount;
      }
    };
    const submitOrder = async () => {
      var _a, _b;
      if (!Address.address || Address.address == "请选择下单地址") {
        common_vendor.index.showToast({ title: "请选择下单地址", icon: "none" });
        return;
      }
      let data = {
        address: Address,
        ...goodsInfo,
        openid: common_vendor.index.current_this.store.getters.openid,
        money: (_a = goodsInfo.money) == null ? void 0 : _a.toFixed(2),
        src: goodsInfo.pic[0],
        transport_money: (_b = goodsInfo.transport_money) == null ? void 0 : _b.toFixed(2),
        count: count.value
      };
      console.log(data, "data");
      common_vendor.index.showLoading({
        title: "下单中",
        mask: true
      });
      request_request.instance.post("/StoreItem/order", {
        ...data
      }).then((res) => {
        common_vendor.index.showToast({
          title: "下单成功"
        });
        common_vendor.index.redirectTo({
          url: "/pages/person/other_page/bills/bills"
        });
      }).catch((err) => {
        common_vendor.index.showToast({
          title: "下单失败"
        });
      }).finally(() => {
        common_vendor.index.hideLoading();
      });
    };
    return {
      goodsInfo,
      count,
      updateCount,
      submitOrder,
      Address
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
  return common_vendor.e({
    a: $setup.goodsInfo.pic[0],
    b: common_vendor.t($setup.goodsInfo.name),
    c: common_vendor.t($setup.goodsInfo.money.toFixed(2)),
    d: $setup.count == 1 ? "rgba(0,0,0,.1);" : "",
    e: common_vendor.o(($event) => $setup.updateCount(-1)),
    f: common_vendor.t($setup.count),
    g: common_vendor.o(($event) => $setup.updateCount(1)),
    h: common_vendor.p({
      size: "25",
      type: "location"
    }),
    i: $setup.Address.tel.trim().length > 0
  }, $setup.Address.tel.trim().length > 0 ? {
    j: common_vendor.t($setup.Address.realName),
    k: common_vendor.t($setup.Address.tel),
    l: common_vendor.t($setup.Address.address)
  } : {
    m: common_vendor.t($setup.Address.address)
  }, {
    n: common_vendor.p({
      type: "right"
    }),
    o: common_vendor.o((...args) => $options.chooseLocation && $options.chooseLocation(...args)),
    p: common_vendor.t($setup.goodsInfo.transport_money.toFixed(2)),
    q: common_vendor.t($setup.goodsInfo.description),
    r: common_vendor.t($options.balance),
    s: common_vendor.o((...args) => $setup.submitOrder && $setup.submitOrder(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-edaf33eb"], ["__file", "C:/Users/86130/Documents/HBuilderProjects/传承非遗/pages/store/other_page/storeOrder/storeOrder.vue"]]);
wx.createPage(MiniProgramPage);
