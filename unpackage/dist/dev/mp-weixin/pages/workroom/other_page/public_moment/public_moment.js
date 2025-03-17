"use strict";
const common_vendor = require("../../../../common/vendor.js");
const back = () => "../../../../components/back.js";
const _sfc_main = {
  async onLoad(res) {
    let paths = JSON.parse(res.paths);
    this.info.paths.push(...paths);
    this.channel = this.getOpenerEventChannel();
  },
  components: {
    back
  },
  setup() {
    let channel = common_vendor.ref(null);
    let info = common_vendor.reactive({
      content: "",
      show_work: true,
      place: "",
      paths: [],
      sus: []
    });
    let state = common_vendor.ref(false);
    function develop(name) {
      common_vendor.index.showToast({
        icon: "none",
        title: name + "暂时未开放"
      });
    }
    const getLocation = () => {
      common_vendor.index.getLocation({
        success({ latitude, longitude }) {
          common_vendor.index.chooseLocation({
            latitude,
            longitude,
            success(res) {
              console.log(res, "res");
              info.place = res.name;
            }
          });
        }
      });
    };
    async function publish() {
      if (state.value)
        return;
      if (common_vendor.index.current_this.store.state.user_info.openid.length <= 0) {
        common_vendor.index.showToast({
          title: "请重新登录后尝试",
          icon: "none"
        });
        return;
      }
      if (info.content.length <= 0) {
        common_vendor.index.showToast({
          title: "帖子内容不允许为空",
          icon: "none"
        });
        return;
      }
      state.value = true;
      let c = 0;
      for (let i = 0; i < info.paths.length; i++) {
        try {
          let url = await new Promise((resolve, reject) => {
            common_vendor.index.uploadFile({
              url: common_vendor.index.current_this.baseURL + ":5001/upload_moment_material",
              filePath: info.paths[i],
              name: "moment",
              success(res) {
                let data = JSON.parse(res.data);
                if (data.state != 1) {
                  reject();
                  return;
                }
                common_vendor.index.showLoading({
                  title: "上传中" + ++c,
                  mask: true
                });
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
          title: `有${count}张图片加载失败`
        });
        let i = info.sus.length;
        for (let k = 0; k < i; k++)
          info.sus.pop();
        return;
      }
      common_vendor.index.showLoading({
        title: "发布作品中",
        mask: true
      });
      console.log(info.sus, "sus");
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
          console.log(res, "res");
          if (common_vendor.index.current_this.check_res_state(res))
            return;
          channel.value.emit("loadData");
          common_vendor.index.navigateBack();
          common_vendor.index.showToast({
            title: "发布成功",
            icon: "success"
          });
        },
        complete() {
          state.value = false;
          common_vendor.index.hideLoading();
        },
        fail(e) {
          console.log(e, "fail");
        }
      });
    }
    function delPic(index) {
      common_vendor.index.showModal({
        title: "是否删除该图片",
        success(res) {
          if (res.cancel)
            return;
          info.paths.splice(index, 1);
        }
      });
      console.log(info.paths[index], "delete");
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
          fail: function(err) {
            console.log(err.errMsg);
          }
        }
      });
    }
    const public_work = (e) => {
      info.show_work = e.detail;
    };
    return { info, develop, publish, state, check_pict, delPic, getLocation, public_work, channel };
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
    b: $setup.info.content,
    c: common_vendor.o(($event) => $setup.info.content = $event.detail.value),
    d: common_vendor.f($setup.info.paths, (item, index, i0) => {
      return {
        a: item,
        b: common_vendor.o(($event) => $setup.check_pict($setup.info.paths, index), index),
        c: common_vendor.o(($event) => $setup.delPic(index), index),
        d: "6ff3ab06-1-" + i0,
        e: index
      };
    }),
    e: common_vendor.p({
      type: "closeempty",
      size: "25",
      color: "white"
    }),
    f: common_vendor.p({
      type: "location-filled",
      color: "rgb(110,121,226)"
    }),
    g: common_vendor.t($setup.info.place == "" ? "请选择地区" : $setup.info.place),
    h: common_vendor.o((...args) => $setup.getLocation && $setup.getLocation(...args)),
    i: common_vendor.o((...args) => $setup.public_work && $setup.public_work(...args)),
    j: $setup.info.show_work,
    k: common_vendor.p({
      type: "plusempty",
      color: "rgb(110,121,226)"
    }),
    l: common_vendor.o(($event) => $setup.develop("选择好友")),
    m: common_vendor.o((...args) => $setup.publish && $setup.publish(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6ff3ab06"], ["__file", "C:/Users/86130/Documents/HBuilderProjects/传承非遗/pages/workroom/other_page/public_moment/public_moment.vue"]]);
wx.createPage(MiniProgramPage);
