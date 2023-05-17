"use strict";
var common_vendor = require("../../../../common/vendor.js");
const back = () => "../../../../components/back.js";
const _sfc_main = {
  name: "",
  components: {
    back
  },
  onLoad({ work }) {
    common_vendor.index.showLoading({
      title: "\u52A0\u8F7D\u4E2D"
    });
    let that = this;
    common_vendor.index.manage_work_this = this;
    work = JSON.parse(work);
    common_vendor.index.request({
      url: common_vendor.index.current_this.baseURL + ":5001/get_video",
      method: "POST",
      data: {
        uuid: work.uuid
      },
      success(res) {
        if (common_vendor.index.current_this.check_res_state(res)) {
          return;
        }
        if (!res.data.data.length) {
          common_vendor.index.showToast({
            title: "\u8BE5\u4F5C\u54C1\u96C6\u4E3A\u7A7A",
            icon: "none"
          });
          return;
        }
        that.info.works.push(...res.data.data);
        console.log(res, "res");
      },
      complete() {
        common_vendor.index.hideLoading();
      }
    });
    Object.keys(this.info).forEach((item) => {
      if (item == "works")
        return;
      this.info[item] = work[item];
    });
    console.log(this.info, "info");
  },
  setup() {
    let info = common_vendor.reactive({
      works: [],
      title: "",
      mask: "",
      score: 0,
      show_work: "show",
      description: "",
      uuid: ""
    });
    let person = common_vendor.reactive({
      avatar: common_vendor.computed$1(() => common_vendor.index.current_this.store.getters.avatar),
      name: common_vendor.computed$1(() => common_vendor.index.current_this.store.getters.name)
    });
    function addWork() {
      console.log("add");
      common_vendor.index.chooseVideo({
        extension: ["mp4"],
        success(res) {
          const { tempFilePath, thumbTempFilePath } = res;
          console.log(res, "res");
          common_vendor.index.navigateTo({
            url: `/pages/person/other_page/publish_video/publish_video?path=${tempFilePath}&uuid=${info.uuid}&mask=${thumbTempFilePath}&title=${info.title}`
          });
        },
        fail(err) {
          console.log(err);
        }
      });
    }
    return { info, person, addWork };
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
      name: "\u4F5C\u54C1\u96C6\u7BA1\u7406"
    }),
    b: common_vendor.t($setup.info.title),
    c: common_vendor.t($setup.info.description),
    d: $setup.info.mask,
    e: $setup.person.avatar,
    f: common_vendor.t($setup.person.name),
    g: common_vendor.t($setup.info.works.length),
    h: common_vendor.o((...args) => $setup.addWork && $setup.addWork(...args)),
    i: common_vendor.f($setup.info.works, (item, index, i0) => {
      return {
        a: item.mask,
        b: common_vendor.t(item.name),
        c: "297aef67-1-" + i0,
        d: index
      };
    }),
    j: $setup.person.avatar,
    k: common_vendor.t($setup.person.name),
    l: common_vendor.p({
      type: "heart"
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-297aef67"], ["__file", "C:/Users/86130/Documents/HBuilderProjects/\u4F20\u627F\u975E\u9057/pages/person/other_page/manage_work/manage_work.vue"]]);
wx.createPage(MiniProgramPage);
