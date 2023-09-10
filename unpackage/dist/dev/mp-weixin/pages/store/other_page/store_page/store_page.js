"use strict";
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  onLoad(res) {
    common_vendor.index.showLoading({
      title: "\u5546\u54C1\u52A0\u8F7D\u4E2D"
    });
    let that = this;
    if (res.state == 1) {
      if (!common_vendor.index.current_this.store.getters.login_state) {
        common_vendor.index.showToast({
          title: "\u8BF7\u5148\u767B\u5F55",
          icon: "none"
        });
        common_vendor.index.switchTab({
          url: "/pages/person/person"
        });
        return;
      }
      common_vendor.index.request({
        url: common_vendor.index.current_this.baseURL + ":5001/getStoreInfo",
        method: "POST",
        data: {
          name: res.name
        },
        success(res2) {
          if (res2.data.state != 1) {
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
          info2.pic.push(...res2.data.data.pic.map((item) => item.src));
          Object.keys(info2).forEach((item) => {
            if (item == "pic" || item == "bought_log" || item == "comment")
              return;
            that.info[item] = res2.data.data.info[item];
          });
          get_count(res.name);
        },
        complete() {
          common_vendor.index.hideLoading();
        }
      });
      return;
    }
    let data = JSON.parse(res.info);
    Object.keys(this.info).forEach((item) => {
      if (item == "pic") {
        this.info.pic.push(...data.pic);
        return;
      }
      if (data[item] == void 0)
        return;
      this.info[item] = data[item];
    });
    get_count(data.name);
    common_vendor.index.hideLoading();
    function get_count(name) {
      common_vendor.index.request({
        url: common_vendor.index.current_this.baseURL + ":5001/get_goods",
        method: "POST",
        data: {
          goods_name: name
        },
        success(res2) {
          if (res2.data.state != 1) {
            return;
          }
          function format(date) {
            let month = date.getMonth() == 12 ? 1 : date.getMonth() + 1;
            let day = date.getDate();
            let now = new Date();
            if (now.getFullYear() == date.getFullYear())
              return `${month < 10 ? "0" + month : month}\u6708${day < 10 ? "0" + day : day}\u65E5`;
            else
              return `${date.getFullYear()}\u5E74${month < 10 ? "0" + month : month}\u6708${day < 10 ? "0" + day : day}\u65E5`;
          }
          res2.data.data.forEach((item) => {
            item.bought_date = format(new Date(item.bought_date));
          });
          that.info.bought_log.push(...res2.data.data.reverse().slice(0, 3));
          that.full.bought_log.push(...res2.data.data);
        }
      });
    }
  },
  onShareAppMessage(res) {
    return {
      imageUrl: this.info.pic[0],
      title: this.info.name,
      path: `/pages/store/other_page/store_page/store_page?name=${info.name}&state=1`
    };
  },
  onShareTimeline() {
    return {
      imageUrl: this.info.pic[0],
      title: this.info.name,
      type: 0
    };
  },
  setup() {
    let info2 = common_vendor.reactive({
      count: 1,
      name: "",
      money: 0,
      sale: 0,
      depository: 0,
      src: "",
      description: "",
      store: "",
      pic: [],
      comment: [],
      bought_log: [],
      transport_money: 0
    });
    let full = common_vendor.reactive({
      bought_log: [],
      comment: []
    });
    let back = common_vendor.index.current_this.back;
    function join_car() {
      common_vendor.index.showToast({
        title: "\u6682\u672A\u5F00\u653E",
        icon: "none"
      });
    }
    function show_all() {
      common_vendor.index.showToast({
        title: "\u6682\u672A\u5F00\u653E",
        icon: "none"
      });
    }
    function buy() {
      if (!common_vendor.index.current_this.store.getters.login_state) {
        common_vendor.index.showToast({
          title: "\u8BF7\u5148\u767B\u5F55",
          icon: "none"
        });
        common_vendor.index.switchTab({
          url: "/pages/person/person"
        });
        return;
      }
      common_vendor.index.showLoading({
        title: "\u8D2D\u4E70\u4E2D",
        mask: true
      });
      common_vendor.index.request({
        url: common_vendor.index.current_this.baseURL + ":5001/buy_goods",
        method: "POST",
        data: {
          openid: common_vendor.index.current_this.store.getters.openid,
          goods_name: info2.name,
          count: 1
        },
        success(res) {
          console.log(res, "res");
          if (res.data.state !== 1) {
            common_vendor.index.hideLoading();
            common_vendor.index.showToast({
              title: "\u8D2D\u4E70\u5931\u8D25",
              icon: "error"
            });
          }
          setTimeout(() => {
            common_vendor.index.hideLoading();
            common_vendor.index.showToast({
              title: "\u8D2D\u4E70\u6210\u529F",
              mask: true
            });
            setTimeout(() => {
              common_vendor.index.reLaunch({
                url: "/pages/person/other_page/bills/bills"
              });
            }, 500);
          }, Math.random() * 1e3);
        }
      });
      return;
    }
    return { back, info: info2, join_car, show_all, buy, full };
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
  return {
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
    d: common_vendor.t($setup.info.money),
    e: common_vendor.t($setup.info.description.length >= 20 ? $setup.info.description.substring(0, 20) + "..." : $setup.info.description),
    f: common_vendor.p({
      type: "redo",
      size: "20"
    }),
    g: common_vendor.t($setup.info.transport_money),
    h: common_vendor.t($setup.info.sale),
    i: common_vendor.t($setup.info.depository),
    j: common_vendor.t($setup.full.bought_log.length),
    k: common_vendor.p({
      type: "right"
    }),
    l: common_vendor.o((...args) => $setup.show_all && $setup.show_all(...args)),
    m: common_vendor.f($setup.info.bought_log, (item, index, i0) => {
      return {
        a: item.user_avatar,
        b: common_vendor.t(item.user_name),
        c: common_vendor.t(item.bought_date),
        d: common_vendor.t(item.bought_count),
        e: index
      };
    }),
    n: common_vendor.o((...args) => $setup.show_all && $setup.show_all(...args)),
    o: common_vendor.t($setup.info.comment.length),
    p: common_vendor.p({
      type: "right"
    }),
    q: common_vendor.o((...args) => $setup.show_all && $setup.show_all(...args)),
    r: common_vendor.f($setup.info.comment, (item, index, i0) => {
      return {
        a: item.avatar,
        b: common_vendor.t(item.name),
        c: "92cbb4f6-4-" + i0,
        d: common_vendor.t(item.info),
        e: index
      };
    }),
    s: common_vendor.p({
      activeColor: "#6E79E2",
      readonly: true,
      value: 5
    }),
    t: common_vendor.o((...args) => $setup.show_all && $setup.show_all(...args)),
    v: common_vendor.o((...args) => $setup.show_all && $setup.show_all(...args)),
    w: common_vendor.o((...args) => $setup.show_all && $setup.show_all(...args)),
    x: common_vendor.o((...args) => $setup.join_car && $setup.join_car(...args)),
    y: common_vendor.o((...args) => $setup.buy && $setup.buy(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-92cbb4f6"], ["__file", "C:/Users/86130/Documents/HBuilderProjects/\u4F20\u627F\u975E\u9057/pages/store/other_page/store_page/store_page.vue"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
