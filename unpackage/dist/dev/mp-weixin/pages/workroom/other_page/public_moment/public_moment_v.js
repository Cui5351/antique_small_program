"use strict";
var common_vendor = require("../../../../common/vendor.js");
const back = () => "../../../../components/back.js";
const _sfc_main = {
  async onLoad(res) {
    let path = JSON.parse(res.path);
    this.info.mask = path.thumbTempFilePath;
    this.info.duration = "" + path.duration;
    let duration = path.duration;
    if ((duration / 60 + "").split(".")[0] != 0) {
      let minute = (duration / 60 + "").split(".")[0];
      let second = duration.toFixed() - minute * 60;
      this.info.duration = minute < 10 ? `0${minute}:${second < 10 ? `0${second}` : second}` : `${minute}:${second < 10 ? `0${second}` : second}`;
    } else {
      this.info.duration = duration.toFixed() < 10 ? `00:0${duration.toFixed()}` : `00:${duration.toFixed()}`;
    }
    this.info.path = path.tempFilePath;
  },
  components: {
    back
  },
  setup() {
    let info = common_vendor.reactive({
      content: "",
      duration: "0.0",
      show_work: true,
      place: "",
      path: "",
      mask: "",
      sus: []
    });
    let state = common_vendor.ref(false);
    function develop(name) {
      common_vendor.index.showToast({
        icon: "none",
        title: name + "\u6682\u65F6\u672A\u5F00\u653E"
      });
    }
    async function publish() {
      if (state.value)
        return;
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
      state.value = true;
      common_vendor.index.showLoading({
        title: "\u4E0A\u4F20\u4E2D",
        mask: true
      });
      let p = [info.path, info.mask];
      for (let i = 0; i < p.length; i++) {
        try {
          let url = await new Promise((resolve, reject) => {
            common_vendor.index.uploadFile({
              url: common_vendor.index.current_this.baseURL + ":5001/upload_moment_material",
              filePath: p[i],
              name: "moment",
              success(res) {
                let data = JSON.parse(res.data);
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
          info.sus.push(url);
        } catch (e) {
          info.sus.push(0);
        }
      }
      let count = 0;
      for (let i = 0; i < info.sus.length; i++)
        if (info.sus[i] == 0) {
          info.sus.splice(i, 1);
          count++;
          i--;
        }
      if (count) {
        common_vendor.index.showToast({
          icon: "error",
          title: `\u4E0A\u4F20\u5931\u8D25`
        });
        let i = info.sus.length;
        for (let k = 0; k < i; k++)
          info.sus.pop();
        return;
      }
      common_vendor.index.showLoading({
        title: "\u53D1\u5E03\u4F5C\u54C1\u4E2D",
        mask: true
      });
      common_vendor.index.request({
        url: common_vendor.index.current_this.baseURL + ":5001/upload_moment",
        method: "POST",
        data: {
          paths: [info.sus[0]],
          openid: common_vendor.index.current_this.store.state.user_info.openid,
          show_work: info.show_work ? "show" : "hid",
          place: info.place,
          content: info.content,
          mask: info.sus[1],
          duration: info.duration
        },
        success(res) {
          if (common_vendor.index.current_this.check_res_state(res))
            return;
          common_vendor.index.current_this.store.dispatch("addmoment", JSON.stringify({
            avatar: common_vendor.index.current_this.store.state.user_info.avatar,
            openid: common_vendor.index.current_this.store.state.user_info.openid,
            name: common_vendor.index.current_this.store.state.user_info.name,
            type: "v",
            src: info.sus[0],
            mask: [info.sus[1]],
            content: info.content,
            place: info.place.length ? info.place : "\u706B\u661F",
            send_date: common_vendor.index.current_this.dateformat_accuracy(new Date()),
            browser: 0,
            uuid: res.data.data.uuid,
            moment_count: 0
          }));
          common_vendor.index.navigateBack();
          common_vendor.index.showToast({
            title: "\u53D1\u5E03\u6210\u529F",
            icon: "success"
          });
        },
        complete() {
          state.value = false;
          common_vendor.index.hideLoading();
        }
      });
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
