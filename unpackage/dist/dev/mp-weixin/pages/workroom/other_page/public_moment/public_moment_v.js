"use strict";
const common_vendor = require("../../../../common/vendor.js");
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
    this.channel = this.getOpenerEventChannel();
  },
  components: {
    back
  },
  setup() {
    let channel = common_vendor.ref(null);
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
      common_vendor.index.showLoading({
        title: "上传中",
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
          title: `上传失败`
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
        }
      });
    }
    function delPic() {
      common_vendor.index.showModal({
        title: "是否删除该视频",
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
  return common_vendor.e({
    a: common_vendor.p({
      name: "新帖子"
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
    j: common_vendor.t($setup.info.place == "" ? "请选择地区" : $setup.info.place),
    k: common_vendor.o((...args) => $setup.getLocation && $setup.getLocation(...args)),
    l: common_vendor.o((...args) => $setup.public_work && $setup.public_work(...args)),
    m: $setup.info.show_work,
    n: common_vendor.p({
      type: "plusempty",
      color: "rgb(110,121,226)"
    }),
    o: common_vendor.o(($event) => $setup.develop("选择好友")),
    p: common_vendor.o((...args) => $setup.publish && $setup.publish(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-c4643944"], ["__file", "C:/Users/86130/Documents/HBuilderProjects/传承非遗/pages/workroom/other_page/public_moment/public_moment_v.vue"]]);
wx.createPage(MiniProgramPage);
