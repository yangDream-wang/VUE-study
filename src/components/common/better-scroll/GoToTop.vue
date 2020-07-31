<!--
  功能：回顶部
  作者：兜兜里有糖
  邮箱：麋鹿不迷路@糖.兜兜
  时间：2020-07-31 15:23:22
  版本：v1.0
  修改记录：
  修改内容：
  修改人员：
  修改时间：
-->
<template>
  <div class='gototop' @click.stop="clickGotoTop">
    <img src="./top.png" alt="top.png" style="width:100%;">
  </div>
</template>
<script>
//这里可以import(导入)其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）

export default {
  components: {},
  props:{/**接受父组件传值*/ 
  },
  name:'GoToTop',
  data() {
    return {
      defalutImg:''
    };
  },
  computed: {/**计算属性*/ },
  watch: {/**监听data数据变化*/ 
  },
  methods: {/**所有方法*/
    clickGotoTop(){
      this.$emit('clickGotoTop')
    }
  },
  created() {/**创建组件时执行(加载完成之前执行可以调用this,主要预处理数据)*/

  },
  mounted() {/**加载完组件时执行(加载完成之后执行)*/ 
    
  },
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
.gototop{
  width: 13vw;
  height: 13vw;
}
.gototop img{
  box-shadow: 0 3px 8px 0 rgba(0,0,0,.08);
}
</style>