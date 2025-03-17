"use strict";
const common_vendor = require("../../../../common/vendor.js");
const back = () => "../../../../components/back.js";
const _sfc_main = {
  name: "",
  components: {
    back
  },
  onLoad({ work }) {
    common_vendor.index.showLoading({
      title: "加载中"
    });
    let that = this;
    common_vendor.index.manage_work_this = this;
    work = JSON.parse(work);
    common_vendor.index.request({
      url: common_vendor.index.current_this.baseURL + ":5001/get_my_video",
      method: "POST",
      data: {
        uuid: work.uuid,
        openid: common_vendor.index.current_this.store.getters.openid
      },
      success(res) {
        if (common_vendor.index.current_this.check_res_state(res)) {
          return;
        }
        if (!res.data.data.arr.length) {
          common_vendor.index.showToast({
            title: "该作品集为空",
            icon: "none"
          });
          return;
        }
        res.data.data.arr.forEach((item) => {
          item.more = false;
        });
        that.info.works.push(...res.data.data.arr);
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
      avatar: common_vendor.computed(() => common_vendor.index.current_this.store.getters.avatar),
      name: common_vendor.computed(() => common_vendor.index.current_this.store.getters.name)
    });
    function addWork() {
      common_vendor.index.chooseMedia({
        count: 1,
        mediaType: ["video"],
        // 最长时间为30分钟
        // maxDuration:1800,
        extension: ["mp4"],
        success(res) {
          let { tempFilePath, thumbTempFilePath, duration } = res.tempFiles[0];
          if ((duration / 60 + "").split(".")[0] != 0) {
            let minute = (duration / 60 + "").split(".")[0];
            let second = duration.toFixed() - minute * 60;
            duration = minute < 10 ? `0${minute}:${second < 10 ? `0${second}` : second}` : `${minute}:${second < 10 ? `0${second}` : second}`;
          } else {
            duration = duration.toFixed() < 10 ? `00:0${duration.toFixed()}` : `00:${duration.toFixed()}`;
          }
          common_vendor.index.navigateTo({
            url: `/pages/person/other_page/publish_video/publish_video?path=${tempFilePath}&uuid=${info.uuid}&mask=${thumbTempFilePath}&title=${info.title}&duration=${duration}`
          });
        }
      });
    }
    let ite;
    function more_click(item) {
      item.more = true;
      ite = item;
    }
    function more_stop() {
      if (ite == void 0)
        return;
      ite.more = false;
    }
    function delete_work() {
      common_vendor.index.showModal({
        title: "是否删除该作品集和全部作品",
        success(res) {
          if (res.cancel)
            return;
          common_vendor.index.request({
            url: common_vendor.index.current_this.baseURL + ":5001/deleted_video_collection",
            method: "POST",
            data: {
              uuid: info.uuid
            },
            success(res2) {
              console.log(res2);
              if (common_vendor.index.current_this.check_res_state(res2))
                return;
              common_vendor.index.current_this.store.state.user_info.works.forEach((ite2, i) => {
                if (ite2.uuid == info.uuid)
                  common_vendor.index.current_this.store.state.user_info.works.splice(i, 1);
              });
              common_vendor.index.navigateBack();
              common_vendor.index.showToast({
                title: "删除成功"
              });
            }
          });
        }
      });
    }
    function trash(item, index) {
      common_vendor.index.showModal({
        title: "是否删除该作品",
        success(res) {
          if (res.cancel)
            return;
          common_vendor.index.showLoading({
            title: "删除中",
            mask: true
          });
          common_vendor.index.request({
            url: common_vendor.index.current_this.baseURL + ":5001/deleted_video",
            method: "POST",
            data: {
              uuid: item.video_id
            },
            success(res2) {
              if (common_vendor.index.current_this.check_res_state(res2))
                return;
              info.works.splice(index, 1);
              common_vendor.index.showToast({
                title: "删除成功"
              });
            },
            complete() {
              common_vendor.index.hideLoading();
            }
          });
        }
      });
    }
    function hid_work(item) {
      common_vendor.index.showModal({
        title: `是否${item.show_work == "show" ? "隐藏" : "显示"}该作品`,
        success(res) {
          if (res.cancel)
            return;
          common_vendor.index.showLoading({
            title: `${item.show_work == "show" ? "隐藏" : "显示"}中`
          });
          common_vendor.index.request({
            url: common_vendor.index.current_this.baseURL + ":5001/set_video",
            method: "POST",
            data: {
              uuid: item.video_id,
              state: item.show_work == "show" ? false : true
            },
            success(res2) {
              if (common_vendor.index.current_this.check_res_state(res2))
                return;
              common_vendor.index.showToast({
                title: `${item.show_work == "show" ? "隐藏" : "显示"}成功`
              });
              item.show_work = res2.data.data;
            },
            complete() {
              common_vendor.index.hideLoading();
            }
          });
        }
      });
    }
    function see() {
      common_vendor.index.previewImage({
        urls: [info.mask]
      });
    }
    function download(item) {
      common_vendor.index.showModal({
        title: "是否保存该视频",
        success(res) {
          if (res.cancel)
            return;
          common_vendor.index.showLoading({
            title: "下载到本地中"
          });
          common_vendor.index.downloadFile({
            url: item.src,
            success({ tempFilePath }) {
              common_vendor.index.showLoading({
                title: "保存中"
              });
              common_vendor.index.saveVideoToPhotosAlbum({
                filePath: tempFilePath,
                success() {
                  common_vendor.index.showToast({
                    title: "保存成功"
                  });
                },
                fail(e) {
                  common_vendor.index.showToast({
                    title: "保存失败",
                    icon: "error"
                  });
                },
                complete() {
                  common_vendor.index.hideLoading();
                }
              });
            },
            complete() {
              common_vendor.index.hideLoading();
            }
          });
        }
      });
    }
    return { info, person, hid_work, download, see, addWork, trash, more_stop, more_click, delete_work };
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
      name: "作品集管理"
    }),
    b: common_vendor.t($setup.info.title),
    c: common_vendor.t($setup.info.description),
    d: common_vendor.o((...args) => $setup.see && $setup.see(...args)),
    e: $setup.info.mask,
    f: $setup.person.avatar,
    g: common_vendor.t($setup.person.name),
    h: common_vendor.t($setup.info.works.length),
    i: common_vendor.o($setup.delete_work),
    j: common_vendor.p({
      type: "trash",
      size: "25"
    }),
    k: common_vendor.o((...args) => $setup.addWork && $setup.addWork(...args)),
    l: common_vendor.f($setup.info.works, (item, index, i0) => {
      return {
        a: item.mask,
        b: common_vendor.t(item.name),
        c: common_vendor.o(($event) => $setup.more_click(item), index),
        d: "a418ed33-2-" + i0,
        e: item.more,
        f: common_vendor.o(($event) => $setup.hid_work(item), index),
        g: "a418ed33-3-" + i0,
        h: common_vendor.p({
          type: item.show_work == "show" ? "eye" : "eye-slash",
          size: "25"
        }),
        i: item.more,
        j: common_vendor.o(($event) => $setup.trash(item, index), index),
        k: "a418ed33-4-" + i0,
        l: item.more,
        m: common_vendor.o(($event) => $setup.download(item), index),
        n: "a418ed33-5-" + i0,
        o: item.more ? "120px" : "0px",
        p: index
      };
    }),
    m: $setup.person.avatar,
    n: common_vendor.t($setup.person.name),
    o: common_vendor.p({
      type: "more-filled",
      size: "25"
    }),
    p: common_vendor.p({
      type: "trash",
      size: "25"
    }),
    q: common_vendor.p({
      type: "download",
      size: "25"
    }),
    r: common_vendor.o((...args) => $setup.more_stop && $setup.more_stop(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-a418ed33"], ["__file", "C:/Users/86130/Documents/HBuilderProjects/传承非遗/pages/person/other_page/manage_work/manage_work.vue"]]);
wx.createPage(MiniProgramPage);
