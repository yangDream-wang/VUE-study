<!--  -->
<template>
  <div id="home" class="home">
    
      <navbar class="navbar"><div slot="center">首页</div></navbar>
      <scroll ref="wrapper" class="wrapper" :data="recommendData[comTabIndex].list" :probeType="3" :toTop="true" :listenScroll="true" @scroll="listenScroll" :pullUpDown="true" @pullUp="pullUp" @pullDown="pullDown" @scrollToElement="scrollToElement">
          <!-- <keep-alive> -->
          <home-swiper :bannerList="bannerList" @swiperImgLoad="swiperImgLoad"></home-swiper>
          <tab-controller ref='tabController' class="tab-controller" :titles="['推荐歌单','推荐MV','推荐新音乐']" @tabchange="tabchange" ></tab-controller>
          
            <div class="goodsCom"><goods :data="recommendData[comTabIndex].list"></goods></div>
          <!-- </keep-alive> -->
      </scroll>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》'
import navbar from "components/common/navbar/NavBar"
import TabController from "../../components/content/tabController/TabController"
import Goods from '../../components/content/goods/Goods'
import scroll from '../../components/common/better-scroll/BetterScroll'

import HomeSwiper from "./homeComs/HomeSwiper";

import {
  getBannerList,
  getRecommendSongSheet,
  getRecommendMv,
  getRecommendNew,
} from "network/home";
export default {
  name: "home",
  //import引入的组件需要注入到对象中才能使用
  components: { navbar, HomeSwiper, TabController,Goods,scroll },
  data() {
    //这里存放数据
    return {
      bannerList: [],
      recommendData: {
        song: { page: 1, list: [] },
        mv: { page: 1, list: [] },
        new: { page: 1, list: [] },
      },
      tabIndex:0,
      /**导航栏距顶部多少单位 */
      tabOffSetTop:0,
    };
  },
  //监听属性 类似于data概念
  computed: {
    comTabIndex(){
      if(this.tabIndex == 0){
        return 'song'
      }else if(this.tabIndex == 1){
        return 'mv'
      }else if(this.tabIndex == 2){
        return 'new'
      }
    },
  },
  //监控data中的数据变化
  watch: {
    
  },
  //方法集合
  methods: {
    /**轮播图加载完毕后 */
    swiperImgLoad(){
      /**获取某个元素据顶部多少单位 */
      this.tabOffSetTop = this.$refs.tabController.$el.offsetTop
    },
    scrollToElement(){
      console.log(`到达指定地方`);
      this.$refs.wrapper.scrollToElement(this.$refs.tab,200)
    },
    /**监听滚动位置 */
    listenScroll(e){
      // if(e.y){}
      if(-e.y >= this.tabOffSetTop){
        console.log(`到了`);
      }
    },
    /**加载更多 */
    pullUp(){
      this.$refs.wrapper.pullupstatus(2)
      setTimeout(() => {
        this.$refs.wrapper.pullupstatus(1)
        console.log(`上拉加载`);
      }, 2000);
    },
    /**下拉刷新 */
    pullDown(e){
      setTimeout(() => {
        this.$refs.wrapper.pulldownstatus(2)
        setTimeout(() => {
          this.$refs.wrapper.pulldownstatus(1)
        }, 2000);
      }, 2000);
    },
    IncNum() {
      this.$store.commit("incNum");
    },
    DecNum() {
      this.$store.commit("decNum");
    },
    actionIncNum() {
      this.$store.dispatch("testaction", 1111).then((res) => {});
    },
    /**点击切换tab导航 */
    tabchange(e){
      this.tabIndex = e
    },
    /**获取推荐歌单 */
    getRecommendSongSheet(data, fn) {
      getRecommendSongSheet(data).then((res) => {
        const page = this.recommendData.song.page + 1;
        this.recommendData.song.list.push(...res.result);
        this.recommendData.song.page = page;
        return typeof fn == "function" && fn();
      });
    },
    /**获取推荐MV */
    getRecommendMv(fn) {
      getRecommendMv().then((res) => {
        const page = this.recommendData.mv.page + 1;
        this.recommendData.mv.list.push(...res.result);
        this.recommendData.mv.page = page;
        return typeof fn == "function" && fn();
      });
    },
    /**获取新音乐 */
    getRecommendNew(fn) {
      getRecommendNew().then((res) => {
        const page = this.recommendData.new.page + 1;
        this.recommendData.new.list.push(...res.result);
        this.recommendData.new.page = page;
        return typeof fn == "function" && fn();
      });
    },
  },

  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    getBannerList().then((res) => {
      this.bannerList = res.banners;
    });
    this.getRecommendSongSheet({ limit: this.recommendData.song.page }, () => {
      console.log(`song回调了`);
    });
    this.getRecommendMv(() => {
      console.log(`MV回调了`);
    });
    this.getRecommendNew(() => {
      console.log(`newSong回调了`);
    });
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  deactivated(){
    console.log(`keep销毁之后`);
  },
  activated() {
    console.log(`keep销毁之前`);
  }, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 2;
}
.wrapper{
  height: calc(100vh - 93px);
}
.tab-controller {
  position: sticky;
  top: 44px;
  background-color: white;
}
.goodsCom{
  width:100%;
}

</style>