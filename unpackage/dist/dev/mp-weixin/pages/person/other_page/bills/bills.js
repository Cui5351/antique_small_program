"use strict";
const common_vendor = require("../../../../common/vendor.js");
const request_request = require("../../../../request/request.js");
require("../../../../request/baseUrl.js");
const _sfc_main = {
  mounted() {
    this.loadData();
  },
  setup() {
    let back = common_vendor.index.current_this.back;
    let state = common_vendor.ref(0);
    let stores = common_vendor.reactive({
      all: [],
      wait_send: [],
      wait_receive: [],
      // isReach:[],
      isDone: [],
      cancel: []
    });
    const innerStore = (id) => {
      common_vendor.index.navigateTo({
        url: "/pages/store/other_page/storeDetail/storeDetail?id=" + id
      });
    };
    const loadData = () => {
      common_vendor.index.request({
        url: common_vendor.index.current_this.baseURL + ":5001/get_bills",
        method: "POST",
        data: {
          openid: common_vendor.index.current_this.store.getters.openid
        },
        success(res) {
          console.log(res, "res");
          if (common_vendor.index.current_this.check_res_state(res))
            return;
          res.data.data.map((item) => {
            item.date = format(new Date(item.date));
          });
          function format(date) {
            let month = date.getMonth() == 12 ? 1 : date.getMonth() + 1;
            let day = date.getDate();
            return `${date.getFullYear()}年${month < 10 ? "0" + month : month}月${day < 10 ? "0" + day : day}日`;
          }
          Object.keys(stores).forEach((item) => {
            stores[item].splice(0, stores[item].length);
          });
          stores.all.push(...res.data.data.reverse());
          res.data.data.forEach((item) => {
            if (item.state2 == "待发货") {
              stores.wait_send.push(item);
            }
            if (item.state2 == "待收货") {
              stores.wait_receive.push(item);
            }
            if (item.state2 == "已完成") {
              stores.isDone.push(item);
            }
            if (item.state2 == "已取消") {
              stores.cancel.push(item);
            }
          });
        }
      });
    };
    function delete_store(item, index) {
      common_vendor.index.showModal({
        content: "是否删除该订单",
        success({ cancel }) {
          if (cancel)
            return;
          common_vendor.index.request({
            url: common_vendor.index.current_this.baseURL + ":5001/hid_bill",
            method: "POST",
            data: {
              uuid: item.uuid
            },
            success(res) {
              if (common_vendor.index.current_this.check_res_state(res))
                return;
              stores.all.splice(index, 1);
            }
          });
        }
      });
    }
    function no_develop(title) {
      if (title == "催发货") {
        setTimeout(() => {
          common_vendor.index.showModal({
            title: "系统提示",
            content: "您的催促已送达,请您耐心等候",
            showCancel: false
          });
        }, 100);
        return;
      }
      common_vendor.index.showToast({
        title: title + "暂未开放",
        icon: "none"
      });
    }
    function toggle_category(index) {
      state.value = index;
    }
    function again_bought(item) {
      common_vendor.index.navigateTo({
        url: `/pages/store/other_page/store_page/store_page?id=${item.goods_id}`
      });
      return;
    }
    function receive_store(item, State) {
      common_vendor.index.showModal({
        title: "系统提示",
        content: State == "已完成" ? "是否已收到包裹" : "是否取消该订单",
        success(res) {
          if (res.confirm) {
            console.log(item, "收");
            common_vendor.index.showLoading({
              title: "加载中",
              mask: true
            });
            request_request.instance.put("/StoreItem/editBuyGoodsState2", {
              state2: State,
              uuid: item.uuid
            }).then(() => {
              if (State == "已完成") {
                common_vendor.index.showToast({
                  title: "收货成功",
                  icon: "none"
                });
                state.value = 3;
              } else {
                common_vendor.index.showToast({
                  title: "订单已取消",
                  icon: "none"
                });
                state.value = 4;
              }
              loadData();
            }).finally(() => {
              common_vendor.index.hideLoading();
            });
          }
        }
      });
    }
    const Detail = (item) => {
      common_vendor.index.navigateTo({
        url: "/pages/person/other_page/bills/billsDetail/billsDetail?uuid=" + item.uuid
      });
    };
    return { back, again_bought, stores, delete_store, no_develop, state, toggle_category, receive_store, innerStore, loadData, Detail };
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
    a: common_vendor.p({
      type: "left"
    }),
    b: common_vendor.o((...args) => $setup.back && $setup.back(...args)),
    c: common_vendor.p({
      type: "search",
      color: "gray"
    }),
    d: common_vendor.o(($event) => $setup.no_develop("搜索订单")),
    e: common_vendor.f(["全部", "待发货", "待收货", "已完成", "已取消"], (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: common_vendor.n($setup.state == index ? "hig" : ""),
        c: index,
        d: common_vendor.o(($event) => $setup.toggle_category(index), index)
      };
    }),
    f: $setup.stores[Object.keys($setup.stores)[$setup.state]].length ? false : true
  }, ($setup.stores[Object.keys($setup.stores)[$setup.state]].length ? false : true) ? {} : {}, {
    g: common_vendor.f($setup.stores[Object.keys($setup.stores)[$setup.state]], (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.store),
        b: "a067aa4c-2-" + i0,
        c: common_vendor.t(item.state2),
        d: common_vendor.o(($event) => $setup.innerStore(item.store_id), index),
        e: item.src,
        f: common_vendor.t(item.name),
        g: common_vendor.t(item.money.toFixed(2)),
        h: common_vendor.t(item.count),
        i: common_vendor.t(item.transport_money.toFixed(2)),
        j: common_vendor.t(item.date),
        k: common_vendor.t((item.count * item.money + item.transport_money).toFixed(2)),
        l: common_vendor.o(($event) => $setup.again_bought(item), index),
        m: item.state2 == "已完成"
      }, item.state2 == "已完成" ? {
        n: common_vendor.o(($event) => $setup.delete_store(item, index), index)
      } : {}, {
        o: item.state2 == "待发货"
      }, item.state2 == "待发货" ? {
        p: common_vendor.o(($event) => $setup.no_develop("催发货"), index)
      } : {}, {
        q: item.state2 == "待收货"
      }, item.state2 == "待收货" ? {
        r: common_vendor.o(($event) => $setup.receive_store(item, "已完成"), index)
      } : {}, {
        s: item.state2 == "待发货"
      }, item.state2 == "待发货" ? {
        t: common_vendor.o(($event) => $setup.receive_store(item, "已取消"), index)
      } : {}, {
        v: index,
        w: common_vendor.o(($event) => $setup.Detail(item), index)
      });
    }),
    h: common_vendor.p({
      type: "right",
      color: "gray"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-a067aa4c"], ["__file", "C:/Users/86130/Documents/HBuilderProjects/传承非遗/pages/person/other_page/bills/bills.vue"]]);
wx.createPage(MiniProgramPage);
