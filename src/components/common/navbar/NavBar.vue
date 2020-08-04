<template>
  <div class="nav-bar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name:'navbar'
};
</script>

<style scope>
.nav-bar {
  display: flex;
  line-height: 44px;
  background-color: rgb(219, 76, 76);
  text-align: center;
  color: white;
  width: 100%;
}
.nav-bar .center{
  width: 80%;
  display: flex;
  justify-content: center;
  /**border: 1px solid white;*/
}
.nav-bar .left,.nav-bar .right{
  width: 10%;
  display: flex;
  justify-content: center;
}
</style>