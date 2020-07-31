<!--
  功能：商品列表子项
  作者：兜兜里有糖
  邮箱：麋鹿不迷路@糖.兜兜
  时间：2020-07-29 16:32:46
  版本：v1.0
  修改记录：
  修改内容：
  修改人员：
  修改时间：
-->
<template>
  <div class='GoodsItem'>
    <div class="goodsitem">
        <img :src="data.picUrl" alt="">
        <div class="goodsbottom">
          <div class="goodsbottom-title">{{data.name}}</div>
          <div class="goodsbottom-content">
            <div class="goodsbottom-content-item">{{data.trackCount}}</div>
            <div class="goodsbottom-content-item2">{{data.playCount}}</div>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
//这里可以import(导入)其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
export default {
  components: {},
  props:{/**接受父组件传值*/ 
    data:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  name:'GoodsItem',
  data() {
    return {

    };
  },
  computed: {/**计算属性*/ },
  watch: {/**监听data数据变化*/ },
  methods: {/**所有方法*/

  },
  created() {/**创建组件时执行(加载完成之前执行可以调用this,主要预处理数据)*/

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
.goodsitem{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.goodsitem img{
  width: 100%;
}
.goodsbottom{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
}
.goodsbottom-title{
  padding: 1em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
.goodsbottom-content{
  display: flex;
  width: 100%;
}
.goodsbottom-content-item,.goodsbottom-content-item2{
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 10px;

  text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
}
.goodsbottom-content-item2{
  color: red;
}
</style>