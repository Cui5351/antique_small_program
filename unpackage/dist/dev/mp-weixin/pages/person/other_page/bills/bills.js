"use strict";
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  mounted() {
    let that = this;
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
          return `${date.getFullYear()}\u5E74${month < 10 ? "0" + month : month}\u6708${day < 10 ? "0" + day : day}\u65E5`;
        }
        that.stores.all.push(...res.data.data.reverse());
        res.data.data.forEach((item) => {
          if (item.state2 == "\u5F85\u53D1\u8D27") {
            that.stores.wait_send.push(item);
          }
          if (item.state2 == "\u5F85\u6536\u8D27") {
            that.stores.wait_receive.push(item);
          }
        });
      }
    });
  },
  setup() {
    let back = common_vendor.index.current_this.back;
    let state = common_vendor.ref(0);
    let stores = common_vendor.reactive({
      all: [],
      wait_send: [],
      wait_receive: []
    });
    function delete_store(item, index) {
      common_vendor.index.showModal({
        content: "\u662F\u5426\u5220\u9664\u8BE5\u8BA2\u5355",
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
      common_vendor.index.showToast({
        title: title + "\u6682\u672A\u5F00\u653E",
        icon: "none"
      });
    }
    function toggle_category(index) {
      state.value = index;
    }
    function again_bought(item) {
      common_vendor.index.request({
        url: common_vendor.index.current_this.baseURL + ":5001/getStoreInfo",
        method: "POST",
        data: {
          name: item.name
        },
        success(res) {
          if (res.data.state != 1) {
            common_vendor.index.showToast({
              title: "\u53D1\u751F\u4E86\u672A\u77E5\u7684\u9519\u8BEF",
              icon: "error"
            });
            return;
          }
          let info = {
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
          info.pic.push(...res.data.data.pic.map((item2) => item2.src));
          Object.keys(info).forEach((item2) => {
            if (item2 == "pic" || item2 == "bought_log" || item2 == "comment")
              return;
            info[item2] = res.data.data.info[item2];
          });
          common_vendor.index.navigateTo({
            url: `/pages/store/other_page/store_page/store_page?info=${JSON.stringify(info)}`
          });
        }
      });
    }
    return { back, again_bought, stores, delete_store, no_develop, state, toggle_category };
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
    d: common_vendor.o(($event) => $setup.no_develop("\u641C\u7D22\u8BA2\u5355")),
    e: common_vendor.f(["\u5168\u90E8", "\u5F85\u53D1\u8D27", "\u5F85\u6536\u8D27"], (item, index, i0) => {
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
        b: "105a4c2e-2-" + i0,
        c: item.src,
        d: common_vendor.t(item.name),
        e: common_vendor.t(item.money.toFixed(2)),
        f: "105a4c2e-3-" + i0,
        g: common_vendor.t(item.count)
      }, $setup.state == 1 ? {
        h: common_vendor.t(item.date)
      } : {}, {
        i: common_vendor.t(item.date),
        j: common_vendor.t((item.count * item.money).toFixed(2))
      }, $setup.state == 0 ? {
        k: common_vendor.o(($event) => $setup.delete_store(item, index)),
        l: common_vendor.o(($event) => $setup.again_bought(item)),
        m: common_vendor.o(($event) => $setup.no_develop("\u8BC4\u4EF7"))
      } : {}, $setup.state == 1 ? {
        n: common_vendor.o(($event) => $setup.no_develop("\u50AC\u53D1\u8D27"))
      } : {}, $setup.state == 2 ? {
        o: common_vendor.o(($event) => $setup.no_develop("\u66F4\u591A")),
        p: common_vendor.o(($event) => $setup.no_develop("\u67E5\u770B\u7269\u6D41")),
        q: common_vendor.o(($event) => $setup.no_develop("\u786E\u5B9A\u6536\u8D27"))
      } : {}, {
        r: index
      });
    }),
    h: common_vendor.p({
      type: "right",
      color: "gray"
    }),
    i: common_vendor.p({
      color: "gray",
      type: "closeempty"
    }),
    j: $setup.state == 1,
    k: $setup.state == 0,
    l: $setup.state == 1,
    m: $setup.state == 2
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-105a4c2e"], ["__file", "C:/Users/86130/Documents/HBuilderProjects/\u4F20\u627F\u975E\u9057/pages/person/other_page/bills/bills.vue"]]);
wx.createPage(MiniProgramPage);
