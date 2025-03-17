"use strict";
const common_vendor = require("../../../../common/vendor.js");
const back = () => "../../../../components/back.js";
const _sfc_main = {
  async onLoad({ path, uuid, mask, title, duration }) {
    if (path.length <= 0 || uuid.length <= 0 || mask.length <= 0) {
      common_vendor.index.showToast({
        title: "加载错误",
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
        title: name + "暂时未开放"
      });
    }
    async function publish() {
      common_vendor.index.showLoading({
        title: "发布中",
        mask: "true"
      });
      if (common_vendor.index.current_this.store.state.user_info.openid.length <= 0) {
        common_vendor.index.showToast({
          title: "请重新登录后尝试",
          icon: "none"
        });
        return;
      }
      if (info.name.length <= 0) {
        common_vendor.index.showToast({
          title: "作品名不允许为空",
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
                        reject("封面上传失败");
                        return;
                      }
                      let { mask } = res2.data.data;
                      info.su_mask = mask;
                      resolve1();
                    }
                  });
                });
              } catch (e) {
                reject("封面上传失败");
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
                    title: "发布成功"
                  });
                  common_vendor.index.manage_work_this.info.works.push({
                    avatar: common_vendor.computed(() => common_vendor.index.current_this.store.getters.avatar),
                    mask: info.su_mask,
                    name: common_vendor.computed(() => common_vendor.index.current_this.store.getters.name),
                    uuid: info.su_uuid,
                    title: info.name,
                    show_work: "show"
                  });
                  common_vendor.index.navigateBack();
                  resolve();
                } else {
                  reject("发布失败");
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
                reject("视频上传失败");
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
                    reject("封面上传失败");
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
                          title: "发布成功"
                        });
                        common_vendor.index.manage_work_this.info.works.push({
                          avatar: common_vendor.computed(() => common_vendor.index.current_this.store.getters.avatar),
                          mask: info.su_mask,
                          name: common_vendor.computed(() => common_vendor.index.current_this.store.getters.name),
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
          itemList: ["发送给朋友", "保存图片", "收藏"],
          success: function(data) {
            console.log("选中了第" + (data.tapIndex + 1) + "个按钮,第" + (data.index + 1) + "张图片");
          },
          fail: function(err2) {
            console.log(err2.errMsg);
          }
        }
      });
    }
    function public_work(e) {
      info.show_work = e.detail.value;
    }
    return { info, develop, publish, state, check_pict, public_work };
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
      name: "新帖子"
    }),
    b: $setup.info.name,
    c: common_vendor.o(($event) => $setup.info.name = $event.detail.value),
    d: $setup.info.mask,
    e: $setup.info.path,
    f: common_vendor.o((...args) => $setup.public_work && $setup.public_work(...args)),
    g: $setup.info.show_work,
    h: common_vendor.p({
      type: "plusempty",
      color: "rgb(110,121,226)"
    }),
    i: common_vendor.o(($event) => $setup.develop("选择好友")),
    j: common_vendor.o((...args) => $setup.publish && $setup.publish(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-c4d06b6c"], ["__file", "C:/Users/86130/Documents/HBuilderProjects/传承非遗/pages/person/other_page/publish_video/publish_video.vue"]]);
wx.createPage(MiniProgramPage);
