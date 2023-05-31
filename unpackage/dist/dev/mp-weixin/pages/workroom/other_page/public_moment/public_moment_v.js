"use strict";
var common_vendor = require("../../../../common/vendor.js");
const back = () => "../../../../components/back.js";
const _sfc_main = {
  async onLoad(res) {
    let path = JSON.parse(res.path);
    this.info.mask = path.thumbTempFilePath;
    this.info.path = path.tempFilePath;
  },
  components: {
    back
  },
  setup() {
    let info = common_vendor.reactive({
      content: "",
      show_work: true,
      place: "",
      path: "",
      mask: "",
      sus: ""
    });
    let state = common_vendor.ref(false);
    function develop(name) {
      common_vendor.index.showToast({
        icon: "none",
        title: name + "\u6682\u65F6\u672A\u5F00\u653E"
      });
    }
    async function publish() {
      common_vendor.index.showToast({
        title: "\u529F\u80FD\u6682\u672A\u5F00\u653E",
        icon: "none"
      });
      return;
    }
    function delPic() {
      common_vendor.index.showModal({
        title: "\u662F\u5426\u5220\u9664\u8BE5\u89C6\u9891",
        success(res) {
          if (res.cancel)
            return;
          info.path = "";
        }
      });
    }
    function check_pict(path, index) {
      common_vendor.index.previewImage({
        urls: path,
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
    return { info, develop, publish, state, check_pict, delPic };
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
      name: "\u65B0\u5E16\u5B50"
    }),
    b: $setup.info.content,
    c: common_vendor.o(($event) => $setup.info.content = $event.detail.value),
    d: $setup.info.path.length > 0
  }, $setup.info.path.length > 0 ? {
    e: $setup.info.path,
    f: $setup.info.mask,
    g: common_vendor.o($setup.delPic),
    h: common_vendor.p({
      type: "closeempty",
      size: "25",
      color: "white"
    })
  } : {}, {
    i: common_vendor.p({
      type: "location-filled",
      color: "rgb(110,121,226)"
    }),
    j: $setup.info.place,
    k: common_vendor.o(($event) => $setup.info.place = $event.detail.value),
    l: common_vendor.o((...args) => _ctx.public_work && _ctx.public_work(...args)),
    m: $setup.info.show_work,
    n: common_vendor.p({
      type: "plusempty",
      color: "rgb(110,121,226)"
    }),
    o: common_vendor.o(($event) => $setup.develop("\u9009\u62E9\u597D\u53CB")),
    p: common_vendor.o((...args) => $setup.publish && $setup.publish(...args))
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-387ee4bd"], ["__file", "C:/Users/86130/Documents/HBuilderProjects/\u4F20\u627F\u975E\u9057/pages/workroom/other_page/public_moment/public_moment_v.vue"]]);
wx.createPage(MiniProgramPage);
