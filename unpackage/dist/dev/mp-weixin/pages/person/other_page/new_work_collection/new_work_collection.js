"use strict";
var common_vendor = require("../../../../common/vendor.js");
const back = () => "../../../../components/back.js";
const _sfc_main = {
  name: "",
  components: {
    back
  },
  mounted() {
    common_vendor.index.current_this_publish_video = this;
  },
  setup() {
    let info = common_vendor.reactive({
      title: "",
      description: "",
      mask: "",
      default_mask: "../../../../static/add.svg",
      show_work: true,
      top: false
    });
    function publish() {
      let Info = Object.keys(info);
      for (let item of Info) {
        if (typeof info[item] !== "boolean" && info[item].length <= 0) {
          common_vendor.index.showToast({
            title: (item == "title" ? "\u4F5C\u54C1\u6807\u9898" : item == "description" ? "\u4F5C\u54C1\u7B80\u4ECB" : item == "mask" ? "\u4F5C\u54C1\u5C01\u9762" : "") + "\u4E0D\u80FD\u4E3A\u7A7A"
          });
          return;
        }
      }
      common_vendor.index.showLoading({
        mask: true,
        title: "\u65B0\u5EFA\u4E2D"
      });
      common_vendor.index.uploadFile({
        url: common_vendor.index.current_this.baseURL + ":5001/upload_mask",
        filePath: info.mask,
        name: "mask",
        success(res) {
          let data = JSON.parse(res.data);
          if (data.error) {
            common_vendor.index.showToast({
              icon: "error",
              title: "\u4FEE\u6539\u5931\u8D25"
            });
            common_vendor.index.hideLoading();
            return;
          }
          let src = data.data.mask;
          common_vendor.index.request({
            url: common_vendor.index.current_this.baseURL + ":5001/new_work_collection",
            method: "POST",
            data: {
              openid: common_vendor.index.current_this.store.state.user_info.openid,
              mask: src,
              title: info.title,
              description: info.description,
              show_work: info.show_work ? "show" : "hid"
            },
            success(res2) {
              if (common_vendor.index.current_this.check_res_state(res2))
                return;
              common_vendor.index.showToast({
                title: "\u6DFB\u52A0\u6210\u529F",
                icon: "none"
              });
              common_vendor.index.current_this.store.state.user_info.works.push({
                title: info.title,
                mask: src,
                description: info.description,
                show_work: info.show_work ? "show" : "hid",
                score: 0,
                uuid: res2.data.data
              });
              common_vendor.index.navigateBack();
            },
            complete() {
              common_vendor.index.hideLoading();
            }
          });
        }
      });
    }
    function set_mask() {
      common_vendor.index.current_this.no_develop("\u9009\u62E9\u7167\u7247");
    }
    function uploadMask() {
      common_vendor.index.navigateTo({
        url: "/pages/person/other_page/avatar_edit/choose"
      });
    }
    function public_work(e) {
      info.show_work = e.detail.value;
    }
    return { info, publish, set_mask, uploadMask, public_work };
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
  return {
    a: common_vendor.p({
      name: "\u65B0\u5EFA\u4F5C\u54C1\u96C6"
    }),
    b: $setup.info.title,
    c: common_vendor.o(($event) => $setup.info.title = $event.detail.value),
    d: $setup.info.description,
    e: common_vendor.o(($event) => $setup.info.description = $event.detail.value),
    f: $setup.info.mask.length <= 0 ? $setup.info.default_mask : $setup.info.mask,
    g: common_vendor.o((...args) => $setup.uploadMask && $setup.uploadMask(...args)),
    h: $setup.info.top,
    i: common_vendor.o((...args) => $setup.public_work && $setup.public_work(...args)),
    j: $setup.info.show_work,
    k: common_vendor.p({
      type: "plusempty",
      color: "rgb(110,121,226)"
    }),
    l: common_vendor.o((...args) => $setup.publish && $setup.publish(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-44d5a8eb"], ["__file", "C:/Users/86130/Documents/HBuilderProjects/\u4F20\u627F\u975E\u9057/pages/person/other_page/new_work_collection/new_work_collection.vue"]]);
wx.createPage(MiniProgramPage);
