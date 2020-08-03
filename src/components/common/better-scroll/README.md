<scroll 
//给个ref为调组件的方法
ref="wrapper"
//一定给个固定高度
class="wrapper"  
//要展示的数据,供内部计算高度使用
:data="recommendData[comTabIndex].list" 
//传1滚动的时候会派发scroll事件，会截流。
//传2滚动的时候实时派发scroll事件，不会截流。
//传3除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
:probeType="3" 
//true:使用回顶部功能,false:不使用
:toTop="true" 
//true:开启滚动监听(toTop,pullUpDown均使用),
:listenScroll="true" 
//监听滚动事件
@scroll="listenScroll" 
//上拉下拉是否开启
:pullUpDown="true"
//开启上拉,可以做上拉加载数据 
//1.请求数据前 this.$refs.wrapper.pullupstatus(2)
//2.请求数据后 this.$refs.wrapper.pullupstatus(1)
@pullUp="pullUp"
//开启下拉,可以做下拉刷新数据 
//1.请求数据前 this.$refs.wrapper.pulldownstatus(2)
//2.请求数据后 this.$refs.wrapper.pulldownstatus(1)
@pullDown="pullDown"
//滚动到指定位置(暂无)
@scrollToElement="scrollToElement" 
/>