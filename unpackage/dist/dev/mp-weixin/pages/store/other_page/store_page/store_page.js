"use strict";
const common_vendor = require("../../../../common/vendor.js");
const request_baseUrl = require("../../../../request/baseUrl.js");
const request_request = require("../../../../request/request.js");
const _sfc_main = {
  methods: {
    loadData() {
      common_vendor.index.showLoading({
        title: "商品加载中"
      });
      let that = this;
      common_vendor.index.request({
        url: request_baseUrl.baseURL + "/StoreItem/findById",
        method: "GET",
        data: {
          id: this.id
        },
        success(res2) {
          if (res2.data.code != 1) {
            common_vendor.index.showToast({
              title: "发生了未知的错误",
              icon: "error"
            });
            return;
          }
          let info = {
            name: "",
            money: 0,
            id: "",
            sale: 0,
            depository: 0,
            src: "",
            description: "",
            store: "",
            pic: [],
            transport_money: 0
          };
          that.info.pic.splice(0, that.info.pic.length);
          that.info.pic.push(...res2.data.data.src.map((item) => item.src));
          Object.keys(info).forEach((item) => {
            if (item == "pic" || item == "bought_log" || item == "comment")
              return;
            that.info[item] = res2.data.data[item];
          });
          that.info.store_id = res2.data.data.store_id;
          that.loadStore();
          that.get_count();
        },
        complete() {
          common_vendor.index.hideLoading();
        }
      });
    },
    loadStore() {
      common_vendor.index.showLoading({
        title: "加载商品中"
      });
      console.log(this.info, "info");
      request_request.instance.get("/StoreItem/list", {
        store_id: this.info.store_id,
        ...this.search
      }).then((res) => {
        console.log(res.list, "res");
        this.total = res.total;
        this.services.splice(0, this.services.length);
        this.services.push(...res.list);
      }).catch((err) => {
        console.log(err, "err");
      }).finally(() => {
        common_vendor.index.hideLoading();
      });
    },
    get_count() {
      let that = this;
      common_vendor.index.request({
        url: common_vendor.index.current_this.baseURL + ":5001/get_goods",
        // url:baseURL+':8666/get_goods',
        method: "POST",
        data: {
          id: this.id
        },
        success(res) {
          if (res.data.state != 1) {
            return;
          }
          function format(date) {
            let month = date.getMonth() == 12 ? 1 : date.getMonth() + 1;
            let day = date.getDate();
            let now = /* @__PURE__ */ new Date();
            if (now.getFullYear() == date.getFullYear())
              return `${month < 10 ? "0" + month : month}月${day < 10 ? "0" + day : day}日`;
            else
              return `${date.getFullYear()}年${month < 10 ? "0" + month : month}月${day < 10 ? "0" + day : day}日`;
          }
          res.data.data.forEach((item) => {
            item.bought_date = format(new Date(item.date));
          });
          that.info.bought_log.splice(0, that.info.bought_log.length);
          that.full.bought_log.splice(0, that.full.bought_log.length);
          that.info.bought_log.push(...res.data.data.reverse().slice(0, 3));
          that.full.bought_log.push(...res.data.data);
        }
      });
    }
  },
  onShow() {
    this.loadData();
  },
  onLoad(res) {
    this.id = res.id;
    return;
  },
  onShareAppMessage(res) {
    return {
      imageUrl: this.info.pic[0],
      title: this.info.name,
      //分享的名称
      path: `/pages/store/other_page/store_page/store_page?store_id=${this.info.store_id}&id=${this.id}`
    };
  },
  //分享到朋友圈
  onShareTimeline() {
    return {
      imageUrl: this.info.pic[0],
      title: this.info.name,
      //分享的名称
      type: 0
    };
  },
  setup() {
    let id = common_vendor.ref(null);
    const search = common_vendor.reactive({
      page: 1,
      pageSize: 10
    });
    const total = common_vendor.ref(0);
    let info = common_vendor.reactive({
      count: 1,
      name: "",
      store_id: "",
      money: 0,
      sale: 0,
      depository: 0,
      src: "",
      description: "",
      id: "",
      store: "",
      pic: [],
      comment: [],
      bought_log: [],
      transport_money: 0
    });
    let services = common_vendor.reactive([]);
    let full = common_vendor.reactive({
      bought_log: [],
      comment: []
    });
    let back = common_vendor.index.current_this.back;
    function join_car() {
      common_vendor.index.showToast({
        title: "暂未开放",
        icon: "none"
      });
    }
    function show_all() {
      common_vendor.index.showToast({
        title: "暂未开放",
        icon: "none"
      });
    }
    function buy() {
      if (!common_vendor.index.current_this.store.getters.login_state) {
        common_vendor.index.showModal({
          title: "系统提示",
          content: "亲！下单前请先登录",
          showCancel: false,
          success() {
            common_vendor.index.switchTab({
              url: "/pages/person/person"
            });
          }
        });
        return;
      }
      if (info.depository <= 0) {
        common_vendor.index.showModal({
          title: "该商品暂时没有库存了，请等待店主补库存!",
          showCancel: false
        });
        return;
      }
      common_vendor.index.navigateTo({
        url: `/pages/store/other_page/storeOrder/storeOrder?info=${JSON.stringify(info)}`
      });
    }
    const enterService = (item) => {
      console.log(item, "item");
      common_vendor.index.redirectTo({
        url: `/pages/store/other_page/store_page/store_page?id=${item.id}&name=${item.name}`
      });
    };
    return { back, info, join_car, show_all, buy, full, id, services, search, enterService, total };
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_rate2 = common_vendor.resolveComponent("uni-rate");
  (_easycom_uni_icons2 + _easycom_uni_rate2)();
}
const _easycom_uni_icons = () => "../../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_rate = () => "../../../../uni_modules/uni-rate/components/uni-rate/uni-rate.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_rate)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _a;
  return common_vendor.e({
    a: common_vendor.p({
      type: "left",
      size: "25"
    }),
    b: common_vendor.o((...args) => $setup.back && $setup.back(...args)),
    c: common_vendor.f($setup.info.pic, (item, index, i0) => {
      return {
        a: item,
        b: index
      };
    }),
    d: common_vendor.t((_a = $setup.info.money) == null ? void 0 : _a.toFixed(2)),
    e: common_vendor.t($setup.info.name),
    f: common_vendor.t($setup.info.description.length >= 40 ? $setup.info.description.substring(0, 40) + "..." : $setup.info.description),
    g: common_vendor.p({
      type: "redo",
      size: "20"
    }),
    h: common_vendor.t($setup.info.transport_money.toFixed(2)),
    i: common_vendor.t($setup.info.sale),
    j: common_vendor.t($setup.info.depository),
    k: common_vendor.t($setup.full.bought_log.length),
    l: common_vendor.p({
      type: "right"
    }),
    m: common_vendor.o((...args) => $setup.show_all && $setup.show_all(...args)),
    n: common_vendor.f($setup.info.bought_log, (item, index, i0) => {
      return {
        a: item.user_avatar,
        b: common_vendor.t(item.user_name),
        c: common_vendor.t(item.bought_date),
        d: common_vendor.t(item.count),
        e: index
      };
    }),
    o: common_vendor.t($setup.info.comment.length),
    p: common_vendor.p({
      type: "right"
    }),
    q: common_vendor.o((...args) => $setup.show_all && $setup.show_all(...args)),
    r: common_vendor.f($setup.info.comment, (item, index, i0) => {
      return {
        a: item.avatar,
        b: common_vendor.t(item.name),
        c: "cdeee895-4-" + i0,
        d: common_vendor.t(item.info),
        e: index
      };
    }),
    s: common_vendor.p({
      activeColor: "#6E79E2",
      readonly: true,
      value: 5
    }),
    t: common_vendor.t($setup.total != 0 ? $setup.total - 1 : 0),
    v: $setup.services.length > 0
  }, $setup.services.length > 0 ? {
    w: common_vendor.f([...$setup.services], (item, index, i0) => {
      var _a2, _b;
      return {
        a: item.url,
        b: common_vendor.t(item.name),
        c: common_vendor.t(item.description.length >= 15 ? item.description.substring(0, 15) + "..." : item.description),
        d: common_vendor.t((_a2 = item.money) == null ? void 0 : _a2.toFixed(2)),
        e: common_vendor.t(item.sale),
        f: common_vendor.t(item.depository),
        g: index,
        h: common_vendor.o(($event) => $setup.enterService(item), index),
        i: (item == null ? void 0 : item.id) != ((_b = $setup.info) == null ? void 0 : _b.id) ? "block" : "none"
      };
    })
  } : {}, {
    x: common_vendor.o((...args) => $setup.show_all && $setup.show_all(...args)),
    y: common_vendor.o((...args) => $setup.show_all && $setup.show_all(...args)),
    z: common_vendor.o((...args) => $setup.show_all && $setup.show_all(...args)),
    A: common_vendor.o((...args) => $setup.join_car && $setup.join_car(...args)),
    B: common_vendor.o((...args) => $setup.buy && $setup.buy(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-cdeee895"], ["__file", "C:/Users/86130/Documents/HBuilderProjects/传承非遗/pages/store/other_page/store_page/store_page.vue"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
