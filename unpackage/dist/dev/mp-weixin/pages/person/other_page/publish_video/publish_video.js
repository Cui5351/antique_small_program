"use strict";
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "",
  onLoad(res) {
    common_vendor.index.current_this_publish_video = this;
    this.works.push(...JSON.parse(res.works));
  },
  setup() {
    let works = common_vendor.reactive([]);
    let back = common_vendor.index.current_this.back;
    let publish_work = common_vendor.reactive({
      title: "",
      mask_url: ""
    });
    function uploadMask() {
      common_vendor.index.navigateTo({
        url: "/pages/person/other_page/avatar_edit/choose"
      });
    }
    function uploadVideo() {
      common_vendor.index.chooseVideo({
        extension: "mp4",
        success(res) {
          let { tempFilePath } = res;
          common_vendor.index.openVideoEditor({
            filePath: tempFilePath,
            minDuration: 10,
            maxDuration: 180,
            success(res2) {
              let { tempFilePath: tempFilePath2 } = res2;
              common_vendor.index.uploadFile({
                url: "https://www.mynameisczy.asia:5001/upload_material",
                filePath: tempFilePath2,
                name: "files",
                formData: { openid: common_vendor.index.current_this.store.state.user_info.openid },
                success(res3) {
                  console.log(res3);
                }
              });
            }
          });
        }
      });
    }
    return { back, uploadVideo, uploadMask, publish_work, works };
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
  return {
    a: common_vendor.p({
      type: "left"
    }),
    b: common_vendor.o((...args) => $setup.back && $setup.back(...args)),
    c: common_vendor.o((...args) => $setup.uploadMask && $setup.uploadMask(...args)),
    d: common_vendor.f($setup.works, (item, index, i0) => {
      return {
        a: item.mask,
        b: common_vendor.t(item.title),
        c: index
      };
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-fda038b2"], ["__file", "C:/Users/86130/Documents/HBuilderProjects/\u4F20\u627F\u975E\u9057/pages/person/other_page/publish_video/publish_video.vue"]]);
wx.createPage(MiniProgramPage);
