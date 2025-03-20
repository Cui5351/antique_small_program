"use strict";
const common_vendor = require("../../common/vendor.js");
const loading = () => "../loading/loading.js";
const _sfc_main = {
  onShareAppMessage() {
    return {
      title: "博学苑",
      //分享的名称
      path: "/pages/home/home"
      // mpId:'' //此处配置微信小程序的AppId
    };
  },
  //分享到朋友圈
  onShareTimeline() {
    return {
      title: "博学苑",
      type: 0
    };
  },
  components: {
    loading
  },
  onTabItemTap() {
    this.reqs.skip = 0;
    this.video.splice(0, this.video.length);
    this.lower();
  },
  mounted() {
    common_vendor.index.current_this.inter = this.inter;
    this.lower();
  },
  setup() {
    let other = common_vendor.reactive([{
      name: "地图导览",
      pic: "/static/map.svg"
    }, {
      name: "文物库",
      pic: "/static/storehouse.svg"
    }, {
      name: "焦点新闻",
      pic: "/static/news.svg"
    }, {
      name: "线下体验馆",
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
          title: "该博物馆尚未开放"
        });
      }, 1e3 * Math.random() * 10);
    }
    function toggle_other(item) {
      if (item.name == "文物库") {
        common_vendor.index.navigateTo({
          url: "/pages/home/other_page/antique_repository/antique_repository"
        });
        return;
      }
      common_vendor.index.showToast({
        icon: "none",
        title: item.name + "暂未开放"
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
      if (name == "荆州博物馆") {
        result = {
          name: "荆州博物馆",
          description: [`  荆州博物馆位于湖北省荆州市荆 路166号，是一座地方综
	合性博物馆，为国家AAAA级旅游景区，占地4.8万平方米。始
	建于1958年，馆舍占地面积5万余平方米，建筑面积达2.3万平
	方米，绿化面积11000多平方米。`, `荆州博物馆有馆藏文物13万余件，其中国家一级文物492件
	套。荆州博物馆配合各项工程建设，发掘出土珍贵文物12万余
	件。其中，有战国丝绸；吴王夫差矛；有战国秦汉漆器；有中
	国也是世界上最早的数学专著《算数书》和萧和“二年造律”
	的《二年律令》等汉初简牍；有西汉男尸。该馆配合各种基本
	建设，先后发掘了7000多座古墓葬和近20万平方米的古文化遗
	址。`, `1994年经国家文物局专家评选，该馆荣获中国地市级“十
	佳博物馆之首”的称号。2008年 物馆被列入国家一级博物馆
	名单。`],
          antique: [
            { name: "黑秞执壶", src: "https://www.mengzhiyuan.email/image/antique/粉彩缠枝花卉碗.jpg" },
            { name: "黑秞执壶", src: "https://www.mengzhiyuan.email/image/antique/青瓷狗.jpg" },
            { name: "黑秞执壶", src: "https://www.mengzhiyuan.email/image/antique/黄地粉彩龙纹杯.jpg" }
          ],
          max_pic: ["https://www.mengzhiyuan.email/image/antique/inter_top/荆州博物馆1.jpg", "https://www.mengzhiyuan.email/image/antique/inter_top/荆州博物馆2.jpg", "https://www.mengzhiyuan.email/image/antique/inter_top/荆州博物馆3.jpg"],
          full_src: "https://www.mengzhiyuan.email/image/antique/荆州博物馆全景图.jpg"
        };
      } else if (name == "长江艺术工程职业学院非遗传承院") {
        result = {
          name: "长江艺术工程职业学院非遗传承院",
          description: [`荆州市荆楚非物质文化遗产技能传承院(简称传承院) ，是经荆州市文化和旅游局、荆州
										市非遗保护中心批准，依托长江艺术工程职业学院设立的非遗传习保护基地。
										`, `2015年被授予国家3A级旅游景区。`, `2017年10月，文化和旅游部在荆楚非遗传承院设立国家传统工艺(荆州)工作站，由清华大学美术学院为驻站单位，
										 以“见人、见物、见生活"为理念，为新时代振兴传统工艺提供示范，让传统工艺在当代生活得到新的广泛应用。`],
          antique: [
            { name: "淡水贝雕", src: "https://www.mengzhiyuan.email/image/antique/changyi/淡水贝雕.jpeg" },
            { name: "葫芦烙画", src: "https://www.mengzhiyuan.email/image/antique/changyi/葫芦.jpeg" },
            { name: "古筝", src: "https://www.mengzhiyuan.email/image/antique/changyi/古筝.jpeg" },
            { name: "漆艺", src: "https://www.mengzhiyuan.email/image/antique/changyi/漆艺.jpeg" }
          ],
          max_pic: [
            "https://www.mengzhiyuan.email/image/antique/changyi/传承院.jpg",
            "https://www.mengzhiyuan.email/image/antique/changyi/传承院2.jpg",
            "https://www.mengzhiyuan.email/image/antique/museum1.jpg"
          ],
          full_src: "https://www.mengzhiyuan.email/image/antique/changyi/full.jpg"
        };
      }
      common_vendor.index.navigateTo({
        url: `./other_page/museum/museum?data=${JSON.stringify(result)}`
      });
    }
    function story(name) {
      common_vendor.index.showToast({
        icon: "none",
        title: "非遗故事" + name + "暂时未开放"
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
              title: "该作品集为空",
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
      "https://www.mengzhiyuan.email/image/antique/home_top/title1.jpg",
      "https://www.mengzhiyuan.email/image/antique/home_top/title2.jpg",
      "https://www.mengzhiyuan.email/image/antique/home_top/title3.jpg"
    ]);
    function lower(e) {
      if (reqs.state)
        return;
      reqs.state = true;
      common_vendor.index.showLoading({
        title: "加载中",
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
              title: "已经滑到底了"
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
    c: common_vendor.p({
      color: "rgb(59,92,130)",
      type: "right"
    }),
    d: common_vendor.o(($event) => $setup.more("all")),
    e: common_vendor.f(["长江艺术工程职业学院非遗传承院", "荆州博物馆"], (item, index, i0) => {
      return {
        a: $setup.base_url + "/image/antique/museum" + (index + 1) + ".jpg",
        b: common_vendor.t(item),
        c: common_vendor.o(($event) => $setup.museum(item), index),
        d: index
      };
    }),
    f: common_vendor.p({
      color: "rgb(59,92,130)",
      type: "right"
    }),
    g: common_vendor.o((...args) => $setup.search_page && $setup.search_page(...args)),
    h: common_vendor.f($setup.video, (item, index, i0) => {
      return {
        a: item.mask,
        b: item.avatar,
        c: common_vendor.t(item.name),
        d: common_vendor.o(($event) => $setup.inter(item))
      };
    }),
    i: common_vendor.o((...args) => $setup.lower && $setup.lower(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-07e72d3c"], ["__file", "C:/Users/86130/Documents/HBuilderProjects/传承非遗/pages/home/home.vue"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
