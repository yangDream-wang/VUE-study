<template>
  <swiper>
      <swiper-item v-for="item in bannerList" :key="item.id">
        <img :src="item.imageUrl" alt="" @load="imgLoad">
      </swiper-item>
    </swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'
export default {
  name:'DetailSwiper',
  props:{
    bannerList: {
      type:Array,
      default:()=>[]
    }
  },
  data(){
    return {
      isLoad:false
    }
  },
  components:{Swiper,SwiperItem},
   //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    
  },
  methods:{
    imgLoad(){
      if(!this.isLoad){
        this.isLoad= true
        this.$emit('swiperImgLoad')
      }
      
    },
  },
}
</script>

<style>

</style>