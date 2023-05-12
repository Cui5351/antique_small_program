"use strict";
var common_vendor = require("../../../../common/vendor.js");
const back = () => "../../../../components/back.js";
const _sfc_main = {
  name: "",
  onLoad({ info }) {
    let tmp = JSON.parse(info);
    Object.keys(this.info).forEach((item) => {
      if (item == "src") {
        this.info[item].push(...tmp[item]);
        return;
      }
      this.info[item] = tmp[item];
    });
  },
  components: {
    back
  },
  setup() {
    let info = common_vendor.reactive({
      avatar: "",
      name: "",
      send_date: "",
      place: "",
      content: "",
      src: []
    });
    function send_mes() {
      common_vendor.index.showToast({
        title: "\u6682\u672A\u5F00\u542F",
        icon: "none"
      });
    }
    function check_pict(index) {
      common_vendor.index.previewImage({
        urls: info.src,
        current: index,
        longPressActions: {
          itemList: ["\u53D1\u9001\u7ED9\u670B\u53CB", "\u4FDD\u5B58\u56FE\u7247", "\u6536\u85CF"],
          success: function(data) {
            console.log("\u9009\u4E2D\u4E86\u7B2C" + (data.tapIndex + 1) + "\u4E2A\u6309\u94AE,\u7B2C" + (data.index + 1) + "\u5F20\u56FE\u7247");
          },
          fail: function(err) {
            console.log(err.errMsg);
          }
        }
      });
    }
    return { info, send_mes, check_pict };
  }
};
if (!Array) {
  const _component_back = common_vendor.resolveComponent("back");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_component_back + _easycom_uni_icons2)();
}
const _easycom_uni_icons = () => "../../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      name: "\u8FD4\u56DE"
    }),
    b: $setup.info.avatar,
    c: common_vendor.t($setup.info.name),
    d: common_vendor.t($setup.info.send_date),
    e: common_vendor.t($setup.info.place),
    f: common_vendor.p({
      type: "star",
      size: "20"
    }),
    g: common_vendor.t($setup.info.content),
    h: $setup.info.src[0] != null
  }, $setup.info.src[0] != null ? {
    i: common_vendor.f($setup.info.src, (item2, index, i0) => {
      return {
        a: item2,
        b: common_vendor.o(($event) => $setup.check_pict(index), index),
        c: index
      };
    })
  } : {}, {
    j: common_vendor.p({
      type: "star",
      size: "25"
    }),
    k: common_vendor.p({
      size: "25",
      type: "paperplane"
    }),
    l: common_vendor.o((...args) => $setup.send_mes && $setup.send_mes(...args))
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-2a14840c"], ["__file", "C:/Users/86130/Documents/HBuilderProjects/\u4F20\u627F\u975E\u9057/pages/workroom/other_page/moment_detail/moment_detail.vue"]]);
wx.createPage(MiniProgramPage);
