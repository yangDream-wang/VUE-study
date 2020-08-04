<!--
  功能：歌曲详情页
  作者：兜兜里有糖
  邮箱：麋鹿不迷路@糖.兜兜
  时间：2020-08-04 09:55:49
  版本：v1.0
  修改记录：
  修改内容：
  修改人员：
  修改时间：
-->
<template>
  <div class='Detail'>
    <detail-swiper :bannerList="bannerList" @swiperImgLoad="swiperImgLoad"></detail-swiper>
    <div class="detail-content" v-for="index in 20" :key="index">详情页</div>
    <detail-tab>
      <div class="collection" @click.stop="collection">收藏歌曲</div>
    </detail-tab>
  </div>
</template>
<script>
//这里可以import(导入)其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
import DetailSwiper from "./DetailComs/DetailSwiper"
import DetailTab from "./DetailComs/DetailTab"
import {getSongDetail,swiperData} from '../../network/detail'
export default {
  components: {DetailSwiper,DetailTab},
  props:{/**接受父组件传值*/ },
  name:'Detail',
  data() {
    return {
      ids:null,
      bannerList:null
    };
  },
  computed: {/**计算属性*/ },
  watch: {/**监听data数据变化*/ },
  methods: {/**所有方法*/
    swiperImgLoad(){},
    collection(){
      console.log(this.$store);
      this.$store.dispatch('collectionSong',this.ids).then((res)=>{
        console.log(`回调`,res);
      })
    },
  },
  created() {/**创建组件时执行(加载完成之前执行可以调用this,主要预处理数据)*/
    this.ids = this.$route.query.ids
    getSongDetail(this.$route.query.ids).then((res)=>{
      this.bannerList = new swiperData(res).swiperdata
    })
  },
  mounted() {/**加载完组件时执行(加载完成之后执行)*/ },
  beforeCreate() {/**生命周期 - 创建之前*/},
  beforeMount() {/**生命周期 - 挂载之前*/},
  beforeUpdate() {/**生命周期 - 更新之前*/},
  updated() {/**生命周期 - 更新之后*/},
  beforeDestroy() {/**生命周期 - 销毁之前*/},
  destroyed() {/**生命周期 - 销毁完成*/},
  activated() {/**keep-alive组件激活时调用。仅针对keep-alive组件有效*/ },
  deactivated() {/**keep-alive组件停用时调用。仅针对keep-alive组件有效*/ },
}
</script>
<style scoped>
.Detail{
  position: relative;
  z-index:9999;
  height: 30vh;
}
.detail-content{
  display: flex;
  width: 100%;
  padding: 20px;
  justify-content: center;
  background-color: white;
}
.collection{
  padding:10px 20px;
}
</style>