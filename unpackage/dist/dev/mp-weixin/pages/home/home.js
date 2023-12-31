"use strict";
var common_vendor = require("../../common/vendor.js");
const loading = () => "../loading/loading.js";
const _sfc_main = {
  onShareAppMessage() {
    return {
      title: "\u535A\u5B66\u82D1",
      path: "/pages/home/home"
    };
  },
  onShareTimeline() {
    return {
      title: "\u535A\u5B66\u82D1",
      type: 0
    };
  },
  components: {
    loading
  },
  mounted() {
    common_vendor.index.current_this.inter = this.inter;
    this.lower();
  },
  setup() {
    let other = common_vendor.reactive([{
      name: "\u5730\u56FE\u5BFC\u89C8",
      pic: "/static/map.svg"
    }, {
      name: "\u6587\u7269\u5E93",
      pic: "/static/storehouse.svg"
    }, {
      name: "\u7126\u70B9\u65B0\u95FB",
      pic: "/static/news.svg"
    }, {
      name: "\u7EBF\u4E0B\u4F53\u9A8C\u9986",
      pic: "/static/feelhouse.svg"
    }]);
    let show_loading = common_vendor.ref(false);
    let reqs = common_vendor.reactive({ state: false, skip: 0 });
    let base_url = common_vendor.ref(common_vendor.index.current_this.baseURL);
    function loading2() {
      show_loading.value = true;
      setTimeout(() => {
        show_loading.value = false;
        common_vendor.index.showToast({
          icon: "none",
          title: "\u8BE5\u535A\u7269\u9986\u5C1A\u672A\u5F00\u653E"
        });
      }, 1e3 * Math.random() * 10);
    }
    function toggle_other(item) {
      if (item.name == "\u6587\u7269\u5E93") {
        common_vendor.index.navigateTo({
          url: "/pages/home/other_page/antique_repository/antique_repository"
        });
        return;
      }
      common_vendor.index.showToast({
        icon: "none",
        title: item.name + "\u6682\u672A\u5F00\u653E"
      });
    }
    function more(name) {
      if (name == "all") {
        common_vendor.index.navigateTo({
          url: "/pages/home/other_page/all_museum/all_museum"
        });
        return;
      }
    }
    function museum(name) {
      let result;
      if (name == "\u8346\u5DDE\u535A\u7269\u9986") {
        result = {
          name: "\u8346\u5DDE\u535A\u7269\u9986",
          description: [`  \u8346\u5DDE\u535A\u7269\u9986\u4F4D\u4E8E\u6E56\u5317\u7701\u8346\u5DDE\u5E02\u8346 \u8DEF166\u53F7\uFF0C\u662F\u4E00\u5EA7\u5730\u65B9\u7EFC
	\u5408\u6027\u535A\u7269\u9986\uFF0C\u4E3A\u56FD\u5BB6AAAA\u7EA7\u65C5\u6E38\u666F\u533A\uFF0C\u5360\u57304.8\u4E07\u5E73\u65B9\u7C73\u3002\u59CB
	\u5EFA\u4E8E1958\u5E74\uFF0C\u9986\u820D\u5360\u5730\u9762\u79EF5\u4E07\u4F59\u5E73\u65B9\u7C73\uFF0C\u5EFA\u7B51\u9762\u79EF\u8FBE2.3\u4E07\u5E73
	\u65B9\u7C73\uFF0C\u7EFF\u5316\u9762\u79EF11000\u591A\u5E73\u65B9\u7C73\u3002`, `\u8346\u5DDE\u535A\u7269\u9986\u6709\u9986\u85CF\u6587\u726913\u4E07\u4F59\u4EF6\uFF0C\u5176\u4E2D\u56FD\u5BB6\u4E00\u7EA7\u6587\u7269492\u4EF6
	\u5957\u3002\u8346\u5DDE\u535A\u7269\u9986\u914D\u5408\u5404\u9879\u5DE5\u7A0B\u5EFA\u8BBE\uFF0C\u53D1\u6398\u51FA\u571F\u73CD\u8D35\u6587\u726912\u4E07\u4F59
	\u4EF6\u3002\u5176\u4E2D\uFF0C\u6709\u6218\u56FD\u4E1D\u7EF8\uFF1B\u5434\u738B\u592B\u5DEE\u77DB\uFF1B\u6709\u6218\u56FD\u79E6\u6C49\u6F06\u5668\uFF1B\u6709\u4E2D
	\u56FD\u4E5F\u662F\u4E16\u754C\u4E0A\u6700\u65E9\u7684\u6570\u5B66\u4E13\u8457\u300A\u7B97\u6570\u4E66\u300B\u548C\u8427\u548C\u201C\u4E8C\u5E74\u9020\u5F8B\u201D
	\u7684\u300A\u4E8C\u5E74\u5F8B\u4EE4\u300B\u7B49\u6C49\u521D\u7B80\u724D\uFF1B\u6709\u897F\u6C49\u7537\u5C38\u3002\u8BE5\u9986\u914D\u5408\u5404\u79CD\u57FA\u672C
	\u5EFA\u8BBE\uFF0C\u5148\u540E\u53D1\u6398\u4E867000\u591A\u5EA7\u53E4\u5893\u846C\u548C\u8FD120\u4E07\u5E73\u65B9\u7C73\u7684\u53E4\u6587\u5316\u9057
	\u5740\u3002`, `1994\u5E74\u7ECF\u56FD\u5BB6\u6587\u7269\u5C40\u4E13\u5BB6\u8BC4\u9009\uFF0C\u8BE5\u9986\u8363\u83B7\u4E2D\u56FD\u5730\u5E02\u7EA7\u201C\u5341
	\u4F73\u535A\u7269\u9986\u4E4B\u9996\u201D\u7684\u79F0\u53F7\u30022008\u5E74 \u7269\u9986\u88AB\u5217\u5165\u56FD\u5BB6\u4E00\u7EA7\u535A\u7269\u9986
	\u540D\u5355\u3002`],
          antique: [
            { name: "\u9ED1\u79DE\u6267\u58F6", src: "https://www.mynameisczy.cn/image/antique/\u7C89\u5F69\u7F20\u679D\u82B1\u5349\u7897.jpg" },
            { name: "\u9ED1\u79DE\u6267\u58F6", src: "https://www.mynameisczy.cn/image/antique/\u9752\u74F7\u72D7.jpg" },
            { name: "\u9ED1\u79DE\u6267\u58F6", src: "https://www.mynameisczy.cn/image/antique/\u9EC4\u5730\u7C89\u5F69\u9F99\u7EB9\u676F.jpg" }
          ],
          max_pic: ["https://www.mynameisczy.cn/image/antique/inter_top/\u8346\u5DDE\u535A\u7269\u99861.jpg", "https://www.mynameisczy.cn/image/antique/inter_top/\u8346\u5DDE\u535A\u7269\u99862.jpg", "https://www.mynameisczy.cn/image/antique/inter_top/\u8346\u5DDE\u535A\u7269\u99863.jpg"],
          full_src: "https://www.mynameisczy.cn/image/antique/\u8346\u5DDE\u535A\u7269\u9986\u5168\u666F\u56FE.jpg"
        };
      } else if (name == "\u957F\u6C5F\u827A\u672F\u5DE5\u7A0B\u804C\u4E1A\u5B66\u9662\u975E\u9057\u4F20\u627F\u9662") {
        result = {
          name: "\u957F\u6C5F\u827A\u672F\u5DE5\u7A0B\u804C\u4E1A\u5B66\u9662\u975E\u9057\u4F20\u627F\u9662",
          description: [`\u8346\u5DDE\u5E02\u8346\u695A\u975E\u7269\u8D28\u6587\u5316\u9057\u4EA7\u6280\u80FD\u4F20\u627F\u9662(\u7B80\u79F0\u4F20\u627F\u9662) \uFF0C\u662F\u7ECF\u8346\u5DDE\u5E02\u6587\u5316\u548C\u65C5\u6E38\u5C40\u3001\u8346\u5DDE
										\u5E02\u975E\u9057\u4FDD\u62A4\u4E2D\u5FC3\u6279\u51C6\uFF0C\u4F9D\u6258\u957F\u6C5F\u827A\u672F\u5DE5\u7A0B\u804C\u4E1A\u5B66\u9662\u8BBE\u7ACB\u7684\u975E\u9057\u4F20\u4E60\u4FDD\u62A4\u57FA\u5730\u3002
										`, `2015\u5E74\u88AB\u6388\u4E88\u56FD\u5BB63A\u7EA7\u65C5\u6E38\u666F\u533A\u3002`, `2017\u5E7410\u6708\uFF0C\u6587\u5316\u548C\u65C5\u6E38\u90E8\u5728\u8346\u695A\u975E\u9057\u4F20\u627F\u9662\u8BBE\u7ACB\u56FD\u5BB6\u4F20\u7EDF\u5DE5\u827A(\u8346\u5DDE)\u5DE5\u4F5C\u7AD9\uFF0C\u7531\u6E05\u534E\u5927\u5B66\u7F8E\u672F\u5B66\u9662\u4E3A\u9A7B\u7AD9\u5355\u4F4D\uFF0C
										 \u4EE5\u201C\u89C1\u4EBA\u3001\u89C1\u7269\u3001\u89C1\u751F\u6D3B"\u4E3A\u7406\u5FF5\uFF0C\u4E3A\u65B0\u65F6\u4EE3\u632F\u5174\u4F20\u7EDF\u5DE5\u827A\u63D0\u4F9B\u793A\u8303\uFF0C\u8BA9\u4F20\u7EDF\u5DE5\u827A\u5728\u5F53\u4EE3\u751F\u6D3B\u5F97\u5230\u65B0\u7684\u5E7F\u6CDB\u5E94\u7528\u3002`],
          antique: [
            { name: "\u6DE1\u6C34\u8D1D\u96D5", src: "https://www.mynameisczy.cn/image/antique/changyi/\u6DE1\u6C34\u8D1D\u96D5.jpeg" },
            { name: "\u846B\u82A6\u70D9\u753B", src: "https://www.mynameisczy.cn/image/antique/changyi/\u846B\u82A6.jpeg" },
            { name: "\u53E4\u7B5D", src: "https://www.mynameisczy.cn/image/antique/changyi/\u53E4\u7B5D.jpeg" },
            { name: "\u6F06\u827A", src: "https://www.mynameisczy.cn/image/antique/changyi/\u6F06\u827A.jpeg" }
          ],
          max_pic: [
            "https://www.mynameisczy.cn/image/antique/changyi/\u4F20\u627F\u9662.jpg",
            "https://www.mynameisczy.cn/image/antique/changyi/\u4F20\u627F\u96622.jpg",
            "https://www.mynameisczy.cn/image/antique/museum1.jpg"
          ],
          full_src: "https://www.mynameisczy.cn/image/antique/changyi/full.jpg"
        };
      }
      common_vendor.index.navigateTo({
        url: `./other_page/museum/museum?data=${JSON.stringify(result)}`
      });
    }
    function story(name) {
      common_vendor.index.showToast({
        icon: "none",
        title: "\u975E\u9057\u6545\u4E8B" + name + "\u6682\u65F6\u672A\u5F00\u653E"
      });
    }
    function inter(item) {
      common_vendor.index.request({
        url: common_vendor.index.current_this.baseURL + ":5001/get_video",
        method: "POST",
        data: {
          uuid: item.uuid
        },
        success(res) {
          if (common_vendor.index.current_this.check_res_state(res)) {
            return;
          }
          console.log(res, "inter");
          if (!res.data.data.arr.length) {
            common_vendor.index.showToast({
              title: "\u8BE5\u4F5C\u54C1\u96C6\u4E3A\u7A7A",
              icon: "none"
            });
            return;
          }
          common_vendor.index.navigateTo({
            url: `/pages/workroom/other_page/play_video/play_video?video=${JSON.stringify(res.data.data.arr)}&title=${res.data.data.arr[0].title}&avatar=${res.data.data.avatar}&name=${res.data.data.name}&openid=${res.data.data.openid}`
          });
        }
      });
    }
    let video = common_vendor.reactive([]);
    let head_img = common_vendor.reactive([
      "https://www.mynameisczy.cn/image/antique/home_top/title1.jpg",
      "https://www.mynameisczy.cn/image/antique/home_top/title2.jpg",
      "https://www.mynameisczy.cn/image/antique/home_top/title3.jpg"
    ]);
    function lower(e) {
      if (reqs.state)
        return;
      reqs.state = true;
      common_vendor.index.showLoading({
        title: "\u52A0\u8F7D\u4E2D",
        mask: true
      });
      common_vendor.index.request({
        url: common_vendor.index.current_this.baseURL + ":5001/get_hottest_video",
        method: "GET",
        data: {
          skip: reqs.skip
        },
        success(res) {
          if (common_vendor.index.current_this.check_res_state(res)) {
            return;
          }
          if (res.data.data.length <= 0) {
            common_vendor.index.showToast({
              title: "\u5DF2\u7ECF\u6ED1\u5230\u5E95\u4E86"
            });
            return;
          }
          video.push(...res.data.data);
          reqs.skip += res.data.data.length;
        },
        complete() {
          setTimeout(() => {
            if (video.push.length >= 20)
              return;
            reqs.state = false;
          }, 1e3);
          common_vendor.index.hideLoading();
        }
      });
    }
    function search_page() {
      common_vendor.index.navigateTo({
        url: "/pages/workroom/other_page/search_video/search_video"
      });
    }
    return { head_img, search_page, reqs, loading: loading2, inter, video, story, more, museum, show_loading, base_url, other, toggle_other, lower };
  }
};
if (!Array) {
  const _component_loading = common_vendor.resolveComponent("loading");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_component_loading + _easycom_uni_icons2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      show_loading: $setup.show_loading
    }),
    b: common_vendor.f($setup.head_img, (item, index, i0) => {
      return {
        a: item,
        b: index
      };
    }),
    c: common_vendor.f($setup.other, (item, inex, i0) => {
      return {
        a: item.pic,
        b: common_vendor.t(item.name),
        c: common_vendor.o(($event) => $setup.toggle_other(item), _ctx.index)
      };
    }),
    d: _ctx.index,
    e: common_vendor.p({
      color: "rgb(59,92,130)",
      type: "right"
    }),
    f: common_vendor.o(($event) => $setup.more("all")),
    g: common_vendor.f(["\u957F\u6C5F\u827A\u672F\u5DE5\u7A0B\u804C\u4E1A\u5B66\u9662\u975E\u9057\u4F20\u627F\u9662", "\u8346\u5DDE\u535A\u7269\u9986"], (item, index, i0) => {
      return {
        a: $setup.base_url + "/image/antique/museum" + (index + 1) + ".jpg",
        b: common_vendor.t(item),
        c: common_vendor.o(($event) => $setup.museum(item), index),
        d: index
      };
    }),
    h: common_vendor.p({
      color: "rgb(59,92,130)",
      type: "right"
    }),
    i: common_vendor.o((...args) => $setup.search_page && $setup.search_page(...args)),
    j: common_vendor.f($setup.video, (item, index, i0) => {
      return {
        a: item.mask,
        b: item.avatar,
        c: common_vendor.t(item.name),
        d: common_vendor.o(($event) => $setup.inter(item))
      };
    }),
    k: common_vendor.o((...args) => $setup.lower && $setup.lower(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-92bb8f34"], ["__file", "C:/Users/86130/Documents/HBuilderProjects/\u4F20\u627F\u975E\u9057/pages/home/home.vue"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
