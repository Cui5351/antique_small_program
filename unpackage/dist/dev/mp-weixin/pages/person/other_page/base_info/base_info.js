"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  setup() {
    let userInfo = common_vendor.reactive({
      avatar: common_vendor.computed(() => common_vendor.index.current_this.store.getters.avatar),
      name: common_vendor.computed(() => common_vendor.index.current_this.store.getters.name),
      openid: common_vendor.computed(() => common_vendor.index.current_this.store.getters.openid),
      sex: common_vendor.computed(() => common_vendor.index.current_this.store.getters.sex),
      introduce: common_vendor.computed(() => common_vendor.index.current_this.store.getters.introduce)
    });
    let userInfo_ = common_vendor.reactive({
      ...userInfo
    });
    userInfo_.avatar = common_vendor.computed(() => userInfo.avatar);
    let info = common_vendor.reactive(common_vendor.index.getSystemInfoSync());
    function reset_data() {
      Object.keys(userInfo).forEach((item) => {
        if (item == "avatar")
          return;
        userInfo_[item] = userInfo[item];
      });
    }
    function show_corp_fun() {
      common_vendor.index.navigateTo({
        url: "/pages/person/other_page/avatar_edit/avatar_edit?url=https://www.mengzhiyuan.email:5001/upload_avatar&height=500&width=500&property=avatar&name=avatar"
      });
    }
    function submit_data() {
      let atb = ["name", "sex", "introduce"];
      atb.forEach((item) => {
        if (userInfo[item] != userInfo_[item]) {
          common_vendor.index.showLoading({
            title: "修改中",
            mask: true
          });
          common_vendor.index.request({
            url: "https://www.mengzhiyuan.email:5001/set_user_property",
            method: "POST",
            data: {
              openid: userInfo.openid,
              value: userInfo_[item],
              property: item
            },
            success(res) {
              if (res.data.state == 1) {
                common_vendor.index.current_this.store.state.user_info[item] = userInfo_[item];
                common_vendor.index.showToast({
                  icon: "success",
                  title: "修改成功",
                  duration: 1e3
                });
              } else {
                common_vendor.index.showToast({
                  icon: "error",
                  title: "修改失败",
                  duration: 1e3
                });
              }
            },
            fail() {
              common_vendor.index.showToast({
                icon: "error",
                title: "网络错误"
              });
            }
          });
        }
      });
    }
    function radioChange(e) {
      userInfo_.sex = e.detail.value;
    }
    let back = common_vendor.index.current_this.back;
    return {
      back,
      show_corp_fun,
      userInfo_,
      userInfo,
      info,
      reset_data,
      radioChange,
      submit_data
    };
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
      type: "left",
      size: "20"
    }),
    b: common_vendor.o((...args) => $setup.back && $setup.back(...args)),
    c: $setup.userInfo_.avatar,
    d: common_vendor.o((...args) => $setup.show_corp_fun && $setup.show_corp_fun(...args)),
    e: "50%",
    f: $setup.userInfo_.name,
    g: common_vendor.o(($event) => $setup.userInfo_.name = $event.detail.value),
    h: $setup.userInfo.sex == "男",
    i: $setup.userInfo.sex == "女",
    j: common_vendor.o((...args) => $setup.radioChange && $setup.radioChange(...args)),
    k: $setup.userInfo_.introduce,
    l: common_vendor.o(($event) => $setup.userInfo_.introduce = $event.detail.value),
    m: common_vendor.o((...args) => $setup.reset_data && $setup.reset_data(...args)),
    n: common_vendor.o((...args) => $setup.submit_data && $setup.submit_data(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-32d1c9ba"], ["__file", "C:/Users/86130/Documents/HBuilderProjects/传承非遗/pages/person/other_page/base_info/base_info.vue"]]);
wx.createPage(MiniProgramPage);
