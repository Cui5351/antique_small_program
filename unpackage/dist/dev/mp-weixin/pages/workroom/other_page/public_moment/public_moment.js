"use strict";
var common_vendor = require("../../../../common/vendor.js");
const back = () => "../../../../components/back.js";
const _sfc_main = {
  async onLoad(res) {
    let paths = JSON.parse(res.paths);
    let that = this;
    for (let i = 0; i < paths.length; i++) {
      try {
        let url = await new Promise((resolve, reject) => {
          common_vendor.index.uploadFile({
            url: common_vendor.index.current_this.baseURL + ":5001/upload_moment_material",
            filePath: paths[i],
            name: "moment",
            success(res2) {
              let data = JSON.parse(res2.data);
              if (data.state != 1) {
                reject();
                return;
              }
              resolve(data.data);
            },
            fail(e) {
              reject();
            }
          });
        });
        that.info.sus.push(url);
      } catch (e) {
        that.info.sus.push(0);
      }
    }
    let count = 0;
    for (let i = 0; i < that.info.sus.length; i++)
      if (that.info.sus[i] != 0) {
        this.info.paths.push(paths[i]);
      } else {
        this.info.sus.splice(i, 1);
        count++;
        i--;
      }
    if (count)
      common_vendor.index.showToast({
        icon: "error",
        title: `\u6709${count}\u5F20\u56FE\u7247\u52A0\u8F7D\u5931\u8D25`
      });
  },
  components: {
    back
  },
  setup() {
    let info = common_vendor.reactive({
      content: "",
      show_work: true,
      place: "",
      paths: [],
      sus: []
    });
    let state = common_vendor.ref(0);
    function develop(name) {
      common_vendor.index.showToast({
        icon: "none",
        title: name + "\u6682\u65F6\u672A\u5F00\u653E"
      });
    }
    async function publish() {
      if (common_vendor.index.current_this.store.state.user_info.openid.length <= 0) {
        common_vendor.index.showToast({
          title: "\u8BF7\u91CD\u65B0\u767B\u5F55\u540E\u5C1D\u8BD5",
          icon: "none"
        });
        return;
      }
      if (info.content.length <= 0) {
        common_vendor.index.showToast({
          title: "\u5E16\u5B50\u5185\u5BB9\u4E0D\u5141\u8BB8\u4E3A\u7A7A",
          icon: "none"
        });
        return;
      }
      common_vendor.index.request({
        url: common_vendor.index.current_this.baseURL + ":5001/upload_moment",
        method: "POST",
        data: {
          paths: info.sus,
          openid: common_vendor.index.current_this.store.state.user_info.openid,
          show_work: info.show_work ? "show" : "hid",
          place: info.place,
          content: info.content
        },
        success(res) {
          if (common_vendor.index.current_this.check_res_state(res))
            return;
          common_vendor.index.current_this.store.state.moments.unshift({
            avatar: common_vendor.index.current_this.store.state.user_info.avatar,
            name: common_vendor.index.current_this.store.state.user_info.name,
            content: info.content,
            place: info.place,
            src: res.data.data.sus,
            send_date: common_vendor.index.current_this.dateformat(new Date()),
            browser: 0,
            uuid: res.data.data.uuid
          });
          common_vendor.index.navigateBack();
          common_vendor.index.showToast({
            title: "\u53D1\u5E03\u6210\u529F",
            icon: "success"
          });
        }
      });
    }
    return { info, develop, publish, state };
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
      name: "\u65B0\u5E16\u5B50"
    }),
    b: $setup.info.content,
    c: common_vendor.o(($event) => $setup.info.content = $event.detail.value),
    d: common_vendor.f($setup.info.paths, (item, index, i0) => {
      return {
        a: item,
        b: index
      };
    }),
    e: common_vendor.p({
      type: "location-filled",
      color: "rgb(110,121,226)"
    }),
    f: $setup.info.place,
    g: common_vendor.o(($event) => $setup.info.place = $event.detail.value),
    h: common_vendor.o((...args) => _ctx.public_work && _ctx.public_work(...args)),
    i: $setup.info.show_work,
    j: common_vendor.p({
      type: "plusempty",
      color: "rgb(110,121,226)"
    }),
    k: common_vendor.o(($event) => $setup.develop("\u9009\u62E9\u597D\u53CB")),
    l: common_vendor.o((...args) => $setup.publish && $setup.publish(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-7edb8074"], ["__file", "C:/Users/86130/Documents/HBuilderProjects/\u4F20\u627F\u975E\u9057/pages/workroom/other_page/public_moment/public_moment.vue"]]);
wx.createPage(MiniProgramPage);
