<template>
  <div class="tab-controller">
    <div class="tab-controller-item" :class="{action:index == clickindex}" @click.stop="tabClick(index)" v-for="(item,index) in titles" :key="item.id">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name:'TabController',
  components:{},
  props:{
    titles:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return{
      clickindex:0,
    }
  },
  created(){},
  methods:{
    tabClick(index){
      this.clickindex = index
    },
  },
}
</script>

<style scoped>
  .tab-controller{
    display: flex;
    justify-content: center;
  }
  .tab-controller-item{
    display: flex;
    flex: 1;
    justify-content: center;
    line-height: 2.5em;
    padding:0 5px 0 5px;
  }
  .action{
    color: hotpink;
  }
  .action span{
    border-bottom: 3px solid hotpink;
  }
</style>