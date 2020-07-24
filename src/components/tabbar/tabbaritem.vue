<template>
  <div class="tab-bar-item" @click="clickitem">
    <div v-if="!active">
      <slot name="tabbar-icon"></slot>
    </div>
    <div v-else>
      <slot name="tabbar-icon-active"></slot>
    </div>
    <div :style="activestyle"><slot name="tabbar-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: "tabbaritem",
  props:{
    path:String,
    activecolor:{
      type:String,
      default:'red'
    }
  },
  data() {
    return {
      
    };
  },
  computed:{
    active(){
      return this.$route.path.indexOf(this.path) !== -1
    },
    activestyle(){
      return this.active ? {color:this.activecolor}:{}
    }
  },
  methods:{
    clickitem(){
      this.$router.replace(this.path)
    }
  }
};
</script>

<style>
.tab-bar-item {
  flex: 1;
  height: 49px;
  text-align: center;
  background-color: #f6f6f6;
}
.tab-bar-item img {
  width: 20px;
  height: 20px;
}
.active {
  color: red;
}
</style>