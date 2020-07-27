<template>
  <div id="app">
    <router-view></router-view>
    <tabbar>
      <tabbaritem path="/home" activecolor="red">
        <img slot="tabbar-icon" src="~assets/img/tabbar/home.svg" />
        <img slot="tabbar-icon-active" src="~assets/img/tabbar/home_active.svg" />
        <div slot="tabbar-text">首页</div>
      </tabbaritem>
      <tabbaritem path="/category" activecolor="red">
        <img slot="tabbar-icon" src="~assets/img/tabbar/category.svg" />
        <img slot="tabbar-icon-active" src="~assets/img/tabbar/category_active.svg" />
        <div slot="tabbar-text">分类</div>
      </tabbaritem>
      <tabbaritem path="/cart" activecolor="red">
        <img slot="tabbar-icon" src="~assets/img/tabbar/shopcart.svg" />
        <img slot="tabbar-icon-active" src="~assets/img/tabbar/shopcart_active.svg" />
        <div slot="tabbar-text">购物车</div>
      </tabbaritem>
      <tabbaritem path="/profile" activecolor="red">
        <img slot="tabbar-icon" src="~assets/img/tabbar/profile.svg" />
        <img slot="tabbar-icon-active" src="~assets/img/tabbar/profile_active.svg" />
        <div slot="tabbar-text">我的</div>
      </tabbaritem>
    </tabbar>
  </div>
</template>

<script>
import tabbar from "components/common/tabbar/tabbar";
import tabbaritem from "components/common/tabbar/tabbaritem";
export default {
  name: 'App',
  components: { tabbar,tabbaritem }
}
</script>

<style>
  @import url('assets/css/base.css');
  
</style>
