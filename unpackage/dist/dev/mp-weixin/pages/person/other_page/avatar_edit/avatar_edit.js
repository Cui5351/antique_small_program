"use strict";
const common_vendor = require("../../../../common/vendor.js");
const QfImageCropper = () => "../../../../uni_modules/qf-image-cropper/components/qf-image-cropper/qf-image-cropper.js";
const _sfc_main = {
  components: {
    QfImageCropper
  },
  onLoad(res) {
    this.url = res.url;
    this.base.height = res.height;
    this.base.width = res.width;
    this.base.name = res.name;
    this.base.property = res.property;
  },
  setup() {
    let url = common_vendor.ref("");
    let base = common_vendor.reactive({
      width: 0,
      height: 0,
      property: "",
      name: ""
    });
    function choosePortrait(e) {
      common_vendor.index.showLoading({
        title: "修改中"
      });
      let image_path = e.tempFilePath;
      common_vendor.index.uploadFile({
        url: url.value,
        filePath: image_path,
        name: base.name,
        formData: {
          openid: common_vendor.index.current_this.store.state.user_info.openid
        },
        success(e2) {
          let data = JSON.parse(e2.data);
          if (data.error) {
            common_vendor.index.showToast({
              icon: "error",
              title: "修改失败"
            });
            return;
          }
          if (base.property != null)
            common_vendor.index.current_this.store.state.user_info[base.property] = data.value;
          common_vendor.index.showToast({
            icon: "success",
            title: "修改成功"
          });
          common_vendor.index.navigateBack();
        },
        fail(e2) {
          common_vendor.index.hideLoading();
        }
      });
    }
    let back = common_vendor.index.current_this.back;
    return { choosePortrait, back, url, base };
  },
  methods: {
    handleCrop(e) {
      this.choosePortrait(e);
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_qf_image_cropper2 = common_vendor.resolveComponent("qf-image-cropper");
  (_easycom_uni_icons2 + _easycom_qf_image_cropper2)();
}
const _easycom_uni_icons = () => "../../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_qf_image_cropper = () => "../../../../uni_modules/qf-image-cropper/components/qf-image-cropper/qf-image-cropper.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_qf_image_cropper)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      type: "left"
    }),
    b: common_vendor.o((...args) => $setup.back && $setup.back(...args)),
    c: common_vendor.o($options.handleCrop),
    d: common_vendor.p({
      width: $setup.base.width,
      height: $setup.base.height,
      areaScale: "0.8",
      maxScale: "1.5"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6d0a3689"], ["__file", "C:/Users/86130/Documents/HBuilderProjects/传承非遗/pages/person/other_page/avatar_edit/avatar_edit.vue"]]);
wx.createPage(MiniProgramPage);
