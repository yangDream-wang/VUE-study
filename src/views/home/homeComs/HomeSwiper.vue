<template>
  <swiper>
      <swiper-item v-for="item in bannerList" :key="item.id">
        <img :src="item.imageUrl" alt="">
      </swiper-item>
    </swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'
export default {
  name:'HomeSwiper',
  props:{
    bannerList: {
      type:Array,
      default:[]
      // default(){
      //   return []
      // }
    }
  },
  data(){
    return {
      
    }
  },
  components:{Swiper,SwiperItem},
   //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    
  },
}
</script>

<style>

</style>