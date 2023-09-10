"use strict";
var common_vendor = require("../../../../common/vendor.js");
const back = () => "../../../../components/back.js";
const _sfc_main = {
  name: "",
  mounted() {
    let that = this;
    common_vendor.index.getStorage({
      key: "search_history_video",
      success(res) {
        that.record.push(...res.data);
      }
    });
  },
  components: {
    back
  },
  setup() {
    let text = common_vendor.ref("");
    let record = common_vendor.reactive([]);
    let video_label = common_vendor.reactive([]);
    let videos = common_vendor.reactive([]);
    function input(txt) {
      text.value = txt;
      search({ detail: { value: txt } });
    }
    let timer = "";
    let search_state = false;
    common_vendor.watch(text, (n) => {
      if (search_state)
        return;
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        search({ detail: { value: n } });
      }, 700);
    });
    function clear_video_label() {
      let n = video_label.length;
      for (let i = 0; i < n; i++) {
        video_label.pop();
      }
    }
    function clear_video() {
      let n = videos.length;
      for (let i = 0; i < n; i++) {
        videos.pop();
      }
    }
    let show_state = common_vendor.ref("empty");
    let skip = common_vendor.ref(0);
    function search_result({ model, t }) {
      if (model != "input") {
        search_state = true;
        text.value = t;
      }
      common_vendor.index.request({
        url: common_vendor.index.current_this.baseURL + ":5001/get_video_by_name",
        data: {
          name: t,
          skip: skip.value
        },
        success(data) {
          skip.value += data.data.length;
          show_state.value = "video";
          videos.push(...data.data.data);
          videos.forEach((item) => {
            item.arr = [];
            let n = item.name.split("");
            let n2 = t.split("");
            for (let i = 0; i < n.length; i++) {
              let flag = true;
              let count = i;
              if (n[i] == n2[0]) {
                let flag2 = false;
                for (let j = 0; j < n2.length; j++) {
                  if (n[count] != n2[j])
                    flag2 = true;
                  count++;
                }
                if (!flag2)
                  flag = false;
              }
              if (flag) {
                item.arr.push({ flag: false, txt: n[i] });
              } else {
                item.arr.push({ flag: true, txt: n.join("").substring(i, count) });
                i = --count;
              }
            }
          });
        },
        complete() {
          search_state = false;
        }
      });
    }
    common_vendor.watch(show_state, (n) => {
      if (n == "empty") {
        skip.value = 0;
        clear_video();
        clear_video_label();
      } else if (n == "label") {
        clear_video();
        skip.value = 0;
      }
    });
    function search(e) {
      if (e.detail.value.trim().length <= 0) {
        show_state.value = "empty";
        return;
      }
      if (record.length >= 8)
        record.pop();
      record.unshift(e.detail.value);
      common_vendor.index.request({
        method: "GET",
        url: common_vendor.index.current_this.baseURL + ":5001/get_label_by_name",
        data: {
          name: e.detail.value
        },
        success(e2) {
          clear_video_label();
          if (e2.data.data.length > 0) {
            video_label.push(...e2.data.data);
            show_state.value = "label";
          } else {
            show_state.value = "empty";
          }
        },
        fail(e2) {
          console.log(e2);
        }
      });
      common_vendor.index.setStorage({
        key: "search_history_video",
        data: [...record]
      });
    }
    function fill(item) {
      text.value = item;
      search({ detail: {
        value: item
      } });
    }
    let inter = common_vendor.index.current_this.inter;
    return { text, input, search, record, fill, show_state, video_label, inter, search_result, videos };
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
      name: "\u8FD4\u56DE"
    }),
    b: common_vendor.o(($event) => $setup.search_result({
      model: "input",
      t: $setup.text
    })),
    c: $setup.text,
    d: common_vendor.o(($event) => $setup.text = $event.detail.value),
    e: common_vendor.f($setup.video_label, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.o(($event) => $setup.search_result({
          model: "input",
          t: item.name
        }))
      };
    }),
    f: $setup.show_state == "label",
    g: common_vendor.f($setup.record, (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: common_vendor.o(($event) => $setup.search_result({
          model: "click",
          t: item
        }), index),
        c: index
      };
    }),
    h: $setup.show_state == "empty",
    i: common_vendor.f($setup.videos, (item, index, i0) => {
      return {
        a: item.mask,
        b: common_vendor.t(item.title.length >= 10 ? item.title.substring(0, 9) + "..." : item.title),
        c: common_vendor.f(item.arr, (word, i, i1) => {
          return {
            a: common_vendor.t(word.txt),
            b: common_vendor.n(word.flag ? "high" : "")
          };
        }),
        d: index,
        e: common_vendor.t(item.user_name),
        f: index,
        g: common_vendor.o(($event) => $setup.inter({
          uuid: item.work_uuid
        }), index)
      };
    }),
    j: $setup.show_state == "video",
    k: common_vendor.p({
      type: "refreshempty"
    }),
    l: common_vendor.p({
      type: "eye"
    }),
    m: common_vendor.f(["\u624B\u5DE5\u5236\u4F5C", "\u975E\u9057\u4F20\u627F\u89C6\u9891", "\u975E\u9057\u6587\u7269\u5236\u4F5C\u89C6\u9891", "\u975E\u9057", "\u6587\u7269"], (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: index,
        c: common_vendor.o(($event) => $setup.fill(item), index)
      };
    }),
    n: $setup.show_state == "empty"
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1633f750"], ["__file", "C:/Users/86130/Documents/HBuilderProjects/\u4F20\u627F\u975E\u9057/pages/workroom/other_page/search_video/search_video.vue"]]);
wx.createPage(MiniProgramPage);
