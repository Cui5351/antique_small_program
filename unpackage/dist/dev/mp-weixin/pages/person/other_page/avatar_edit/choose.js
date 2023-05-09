"use strict";
var common_vendor = require("../../../../common/vendor.js");
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
        title: "\u4FEE\u6539\u4E2D"
      });
      common_vendor.index.current_this_publish_video.publish_work.mask_url = e.tempFilePath;
      back();
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
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-194b0d66"], ["__file", "C:/Users/86130/Documents/HBuilderProjects/\u4F20\u627F\u975E\u9057/pages/person/other_page/avatar_edit/choose.vue"]]);
wx.createPage(MiniProgramPage);
