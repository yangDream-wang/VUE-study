<!--
  功能：商品列表
  作者：兜兜里有糖
  邮箱：麋鹿不迷路@糖.兜兜
  时间：2020-07-29 16:31:02
  版本：v1.0
  修改记录：
  修改内容：
  修改人员：
  修改时间：
-->
<template>
  <div class='goods'>
    <div class="goodsitem" v-for="item in data" :key="item.id"><goods-item :data="item"></goods-item></div>
  </div>
</template>
<script>
//这里可以import(导入)其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
import GoodsItem from './GoodsItem'
export default {
  components: {GoodsItem},
  props:{/**接受父组件传值*/ 
    data:{
      type:Array,
      default(){
        return []
      }
    }
  },
  name:'Goods',
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
.goods{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
.goodsitem{
  width: 48%;
  border-radius: 15px;
}
</style>