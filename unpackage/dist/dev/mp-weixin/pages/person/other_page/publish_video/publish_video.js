"use strict";
var common_vendor = require("../../../../common/vendor.js");
const back = () => "../../../../components/back.js";
const _sfc_main = {
  async onLoad({ path, uuid, mask, title, duration }) {
    if (path.length <= 0 || uuid.length <= 0 || mask.length <= 0) {
      common_vendor.index.showToast({
        title: "\u52A0\u8F7D\u9519\u8BEF",
        icon: "error"
      });
      common_vendor.index.navigateBack();
    }
    this.info.path = path;
    this.info.mask = mask;
    this.info.uuid = uuid;
    this.info.title = title;
    this.info.duration = duration;
  },
  components: {
    back
  },
  setup() {
    let info = common_vendor.reactive({
      show_work: true,
      name: "",
      path: "",
      mask: "",
      uuid: "",
      title: "",
      su_path: "",
      su_mask: "",
      su_uuid: "",
      duration: ""
    });
    let state = common_vendor.ref(0);
    function develop(name) {
      common_vendor.index.showToast({
        icon: "none",
        title: name + "\u6682\u65F6\u672A\u5F00\u653E"
      });
    }
    async function publish() {
      common_vendor.index.showLoading({
        title: "\u53D1\u5E03\u4E2D",
        mask: "true"
      });
      if (common_vendor.index.current_this.store.state.user_info.openid.length <= 0) {
        common_vendor.index.showToast({
          title: "\u8BF7\u91CD\u65B0\u767B\u5F55\u540E\u5C1D\u8BD5",
          icon: "none"
        });
        return;
      }
      if (info.name.length <= 0) {
        common_vendor.index.showToast({
          title: "\u4F5C\u54C1\u540D\u4E0D\u5141\u8BB8\u4E3A\u7A7A",
          icon: "none"
        });
        return;
      }
      try {
        await new Promise(async (resolve, reject) => {
          if (info.su_path.length > 0) {
            if (info.su_mask.length <= 0) {
              try {
                await new Promise((resolve1, reject1) => {
                  common_vendor.index.uploadFile({
                    url: common_vendor.index.current_this.baseURL + ":5001/upload_mask",
                    filePath: info.mask,
                    name: "mask",
                    success(res2) {
                      res2.data = JSON.parse(res2.data);
                      if (res2.data.state !== 1) {
                        reject("\u5C01\u9762\u4E0A\u4F20\u5931\u8D25");
                        return;
                      }
                      let { mask } = res2.data.data;
                      info.su_mask = mask;
                      resolve1();
                    }
                  });
                });
              } catch (e) {
                reject("\u5C01\u9762\u4E0A\u4F20\u5931\u8D25");
              }
            }
            common_vendor.index.request({
              url: common_vendor.index.current_this.baseURL + ":5001/upload_work_info",
              method: "POST",
              data: {
                openid: common_vendor.index.current_this.store.state.user_info.openid,
                show_work: info.show_work ? "show" : "hid",
                title: info.title,
                name: info.name,
                src: info.su_path,
                mask: info.su_mask,
                work_uuid: info.uuid,
                video_id: info.su_uuid
              },
              success(res3) {
                if (res3.data.state == 1) {
                  common_vendor.index.showToast({
                    title: "\u53D1\u5E03\u6210\u529F"
                  });
                  common_vendor.index.manage_work_this.info.works.push({
                    avatar: common_vendor.computed$1(() => common_vendor.index.current_this.store.getters.avatar),
                    mask: info.su_mask,
                    name: common_vendor.computed$1(() => common_vendor.index.current_this.store.getters.name),
                    uuid: info.su_uuid,
                    title: info.name
                  });
                  common_vendor.index.navigateBack();
                  resolve();
                } else {
                  reject("\u53D1\u5E03\u5931\u8D25");
                }
              }
            });
            return;
          }
          common_vendor.index.uploadFile({
            url: common_vendor.index.current_this.baseURL + ":5001/upload_work",
            filePath: info.path,
            name: "works",
            success(res) {
              res.data = JSON.parse(res.data);
              if (res.data.state !== 1) {
                reject("\u89C6\u9891\u4E0A\u4F20\u5931\u8D25");
                return;
              }
              let { uuid, src } = res.data.data;
              info.su_path = src;
              info.su_uuid = uuid;
              common_vendor.index.uploadFile({
                url: common_vendor.index.current_this.baseURL + ":5001/upload_mask",
                filePath: info.mask,
                name: "mask",
                success(res2) {
                  res2.data = JSON.parse(res2.data);
                  if (res2.data.state !== 1) {
                    reject("\u5C01\u9762\u4E0A\u4F20\u5931\u8D25");
                    return;
                  }
                  let { mask } = res2.data.data;
                  info.su_mask = mask;
                  common_vendor.index.request({
                    url: common_vendor.index.current_this.baseURL + ":5001/upload_work_info",
                    method: "POST",
                    data: {
                      openid: common_vendor.index.current_this.store.state.user_info.openid,
                      show_work: info.show_work ? "show" : "hid",
                      title: info.title,
                      name: info.name,
                      src: info.su_path,
                      mask: info.su_mask,
                      work_uuid: info.uuid,
                      video_id: info.su_uuid,
                      duration: info.duration
                    },
                    success(res3) {
                      console.log(res3, "res");
                      ;
                      if (res3.data.state == 1) {
                        common_vendor.index.showToast({
                          title: "\u53D1\u5E03\u6210\u529F"
                        });
                        common_vendor.index.manage_work_this.info.works.push({
                          avatar: common_vendor.computed$1(() => common_vendor.index.current_this.store.getters.avatar),
                          mask: info.su_mask,
                          name: common_vendor.computed$1(() => common_vendor.index.current_this.store.getters.name),
                          uuid: info.su_uuid,
                          title: info.name,
                          duration: info.duration
                        });
                        common_vendor.index.navigateBack();
                        resolve();
                      } else {
                        reject();
                      }
                    }
                  });
                },
                fail(err2) {
                  console.log(err2);
                }
              });
            },
            fail(err2) {
              console.log(err2);
            }
          });
        });
        return;
      } catch (e) {
        common_vendor.index.showToast({
          title: err,
          icon: "error"
        });
      }
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
          fail: function(err2) {
            console.log(err2.errMsg);
          }
        }
      });
    }
    return { info, develop, publish, state, check_pict };
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
    b: $setup.info.name,
    c: common_vendor.o(($event) => $setup.info.name = $event.detail.value),
    d: $setup.info.mask,
    e: $setup.info.path,
    f: common_vendor.o((...args) => _ctx.public_work && _ctx.public_work(...args)),
    g: $setup.info.show_work,
    h: common_vendor.p({
      type: "plusempty",
      color: "rgb(110,121,226)"
    }),
    i: common_vendor.o(($event) => $setup.develop("\u9009\u62E9\u597D\u53CB")),
    j: common_vendor.o((...args) => $setup.publish && $setup.publish(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-fda038b2"], ["__file", "C:/Users/86130/Documents/HBuilderProjects/\u4F20\u627F\u975E\u9057/pages/person/other_page/publish_video/publish_video.vue"]]);
wx.createPage(MiniProgramPage);
