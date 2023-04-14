"use strict";
var common_vendor = require("../../../../common/vendor.js");
const QfImageCropper = () => "../../../../uni_modules/qf-image-cropper/components/qf-image-cropper/qf-image-cropper.js";
const _sfc_main = {
  components: {
    QfImageCropper
  },
  setup() {
    function choosePortrait(e) {
      common_vendor.index.showLoading({
        title: "\u4FEE\u6539\u4E2D"
      });
      let image_path = e.tempFilePath;
      let url = "https://www.mynameisczy.asia:5001/upload_avatar";
      common_vendor.index.uploadFile({
        url,
        filePath: image_path,
        name: "avatar",
        formData: {
          openid: common_vendor.index.current_this.store.state.user_info.openid
        },
        success(e2) {
          common_vendor.index.navigateBack();
          common_vendor.index.hideLoading();
          let data = JSON.parse(e2.data);
          if (data.error) {
            common_vendor.index.showToast({
              icon: "error",
              title: "\u4FEE\u6539\u5931\u8D25"
            });
            return;
          }
          common_vendor.index.current_this.store.state.user_info.avatar = data.value;
          common_vendor.index.showToast({
            icon: "success",
            title: "\u4FEE\u6539\u6210\u529F"
          });
        },
        fail(e2) {
          common_vendor.index.hideLoading();
        }
      });
    }
    let back = common_vendor.index.current_this.back;
    return { choosePortrait, back };
  },
  methods: {
    handleCrop(e) {
      this.choosePortrait(e);
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _component_qf_image_cropper = common_vendor.resolveComponent("qf-image-cropper");
  (_easycom_uni_icons2 + _component_qf_image_cropper)();
}
const _easycom_uni_icons = () => "../../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      type: "left"
    }),
    b: common_vendor.o((...args) => $setup.back && $setup.back(...args)),
    c: common_vendor.o($options.handleCrop),
    d: common_vendor.p({
      width: 500,
      height: 500,
      radius: 30,
      areaScale: "0.8",
      maxScale: "1.5"
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-ddac9c1e"], ["__file", "C:/Users/86130/Documents/HBuilderProjects/\u4F20\u627F\u975E\u9057/pages/person/other_page/avatar_edit/avatar_edit.vue"]]);
wx.createPage(MiniProgramPage);
