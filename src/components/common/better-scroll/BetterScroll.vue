<!--
  功能：BetterScroll
  作者：兜兜里有糖
  邮箱：麋鹿不迷路@糖.兜兜
  时间：2020-07-30 16:16:12
  版本：v1.0
  修改记录：
  修改内容：
  修改人员：
  修改时间：
-->

<!--
    参数解释在props中
    使用说明：
      <scroll
      class="wrapper"
      :data="data"
    >
      <div class="content">
      </div>
    </scroll>

    要想betterScroll产生滚动效果，你需要设置'.wrapper'的高度,content的内容高度必须要高于warpper的高度才会显示出滚动条
    如果content里面内容的高度是不固定的，那么需要给scroll传值data
-->
<!-- 
在vue中封装一个betterscroll组件，并解决ios、Android在微信页面上下拉出现滑动的问题
首先在app.vue的mounted中添加如下代码
mounted(){
  document.body.addEventListener(
    'touchmove',
    function (e) {
      e.preventDefault()
    },
    { passive: false }
  )
}
-->
<template>
  <div ref="wrapper" class="better-scroll">
    <div class="content-bg better-scroll-container">
      <div>
        <!--不太需要，待优化-->
        <div v-if="pullUpDown" class="pulldown-tip">
          <i class="pull-icon indexicon icon-pull-down" :class="[pulldownTip.rotate]"></i>
          <span class="tip-content">{{pulldownTip.text}}</span>
        </div>
        <div v-show="loadingStatus.showIcon || loadingStatus.status" class="loading-pos">
          <div v-show="loadingStatus.showIcon" class="loading-container">
            <div class="cube">
              <div class="side side1"></div>
              <div class="side side2"></div>
              <div class="side side3"></div>
              <div class="side side4"></div>
              <div class="side side5"></div>
              <div class="side side6"></div>
            </div>
          </div>
          <span class="loading-connecting">{{loadingStatus.status}}</span>
        </div>
      </div>
      <slot></slot>
      <div class='pullup' v-if="pullUpDown">- {{pullupStatus.text}} -</div>
    </div>
    <go-to-top v-if="toTopStatus" class="gototop" @clickGotoTop="clickGotoTop"></go-to-top>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import GoToTop from './GoToTop'
export default {
  components:{GoToTop},
  name: "BetterScroll",
  props: {
    /*    传1 滚动的时候会派发scroll事件，会截流。
          传2 滚动的时候实时派发scroll事件，不会截流。
          传3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件     */
    probeType: {
      type: Number,
      default: 1,
    },
    //  点击列表是否派发click事件
    click: {
      type: Boolean,
      default: true,
    },
    //  是否开启横向滚动
    scrollX: {
      type: Boolean,
      default: false,
    },
    //  是否派发滚动事件
    listenScroll: {
      type: Boolean,
      default: false,
    },
    /** 是否启用下拉上拉  */
    pullUpDown: {
      type: Boolean,
      default: true
    },
    //  列表的数据,用于数据改变导致视图更改后重新初始化滚动
    data: {
      type: Array,
      default: ()=>[],
    },

    /** * 是否派发列表滚动开始的事件 */
    beforeScroll: {
      type: Boolean,
      default: false,
    },
    /** * 当数据更新后，刷新scroll的延时。 */
    refreshDelay: {
      type: Number,
      default: 20,
    },
    /** 是否开启回顶部 */
    toTop:{
      type:Boolean,
      default:false
    },
  },
  data() {
    return {
      loadingConnecting: false,
      pulldowns:1, /** 0:'正在加载...', 1:'隐藏刷新', 2:'加载成功', -1:'加载失败' */
      pulldownTip: {
        text: "下拉刷新", // 松开立即刷新
        rotate: "", // icon-rotate
      }, 
      pullups:0, /**0:'正在加载...', 1:'已经加载完毕数据' 2:数据加载中*/
      pullupTip:{
        text:'努力加载中'
      },
      toTopStatus:false,/**是否显示回顶部按钮 */
    };
  },
  computed:{
    /**
     * 如果下拉刷新启用loading交互，传递loading的状态
     * isShow: false
     * showIcon: false,    // 是否显示loading的icon
     * status: ''  // 0:'正在加载...', 1:'隐藏刷新', 2:'加载成功', -1:'加载失败'
     */
    loadingStatus(status){
      if(this.pulldowns == 0){
        return {
          isShow:true,
          showIcon: true,
          status: '正在加载'
        }
      }else if(this.pulldowns == 2){
        return {
          isShow:true,
          showIcon: false,
          status: '加载成功'
        }
      }else if(this.pulldowns == -1){
        return {
          isShow:true,
          showIcon: false,
          status: '加载失败'
        }
      }else if(this.pulldowns == 1){
        this.finishPullDown(()=>{
          console.log('已执行 - finishPullDown');
        })
        return {
          isShow:false,
          showIcon: false,
          status: ''
        }
      }
    },
    /**
     * 上拉加载状态
     * 上拉加载 0:'正在加载...', 1:'已经加载完毕数据' 2:数据加载中
     */
    pullupStatus(status){
      if(this.pullups == 0 || this.pullups == 2){
        return {
          text: '正在加载'
        }
      }else if(this.pullups == 1){
        this.finishPullUp(()=>{
          this.pullups = 0
          console.log('上拉已执行 - finishPullUp');
        })
        return {
          text: '已加载完毕'
        }
      }
    }
  },
  watch: {
    // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
    data() {
      setTimeout(() => {
        this.refresh();
      }, this.refreshDelay);
    },
  },
  mounted() {
    // 保证在DOM渲染完毕后初始化better-scroll
    setTimeout(() => {
      this._initScroll();
    }, 20);
  },
  methods: {
    _initScroll() {
      if (!this.$refs.wrapper) { return; }
      // better-scroll的初始化
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        useTransition: false, // 防止iphone微信滑动卡顿
        scrollX: this.scrollX, //横向滚动
        preventDefault: true, //阻止原生的滚动,也同时阻止了一些原生组件的默认行为,但不包括 input、textarea、button、select
        momentum: true, //当快速在屏幕上滑动一段距离的时候，会根据滑动的距离和时间计算出动量，并生成滚动动画。
        bounce: true, //是否开启betterscroll的弹性动画，如果不需要设置为false
      });
      // 是否派发滚动事件
      if (this.listenScroll) {
        const me = this;
        this.scroll.on("scroll", (pos) => {
          me.$emit("scroll", pos);
          if(this.toTop){
            if(-pos.y > 900){
              if(this.toTopStatus){return;}
              console.log(pos);
              this.toTopStatus = true
            }else{
              if(!this.toTopStatus){return;}
              console.log(`不足300`,pos);
              this.toTopStatus = false
            }
          }
          if (this.pulldown) {
            if (pos.y > 50) {
              this.pulldownTip = {
                text: "松开立即刷新",
                rotate: "icon-rotate",
              };
            } else {
              this.pulldownTip = {
                text: "下拉刷新", // 松开立即刷新
                rotate: "", // icon-rotate
              };
            }
          }
        });
      }
      // 是否派发上拉加载和下拉刷新
      if (this.pullUpDown) {
        this.scroll.on("scrollEnd", () => {
          // 滚动到底部
          if ((this.scroll.y <= this.scroll.maxScrollY + 50 ) && this.pullups == 0) {
            setTimeout(()=>{
              this.pullupstatus(2)
              this.$emit("pullUp");
            },200)
          }
        });
        this.scroll.on("touchEnd", (pos) => {
          // 下拉动作
          if (pos.y > 50 && this.pulldowns == 1) {
            setTimeout(() => {
              // 重置提示信息
              this.pulldownstatus(0)
              this.pulldownTip = {
                text: "下拉刷新", // 松开立即刷新
                rotate: "", // icon-rotate
              };
              this.$emit("pullDown", pos);
            }, 400);
          }
        });
      }
      // 是否派发列表滚动开始的事件
      if (this.beforeScroll) {
        this.scroll.on("beforeScrollStart", () => {
          this.$emit("beforeScroll");
        });
      }
    },
    /**当下拉刷新数据加载完毕后，需要调用此方法告诉 better-scroll 数据已加载。 */
    finishPullDown(fn) {
      this.scroll && this.scroll.finishPullDown();
      return typeof fn == "function" && fn();
    },
    /**下拉刷新 0:'正在加载...', 1:'隐藏刷新', 2:'加载成功', -1:'加载失败' */
    pulldownstatus(status){
      this.pulldowns = status
    },
    /**上拉加载 0:'正在加载...', 1:'已经加载完毕数据' 2:数据加载中*/
    pullupstatus(status){
      console.log(`pullupstatus`,status);
      this.pullups = status
    },
    /**当上拉加载数据加载完毕后，需要调用此方法告诉 better-scroll 数据已加载。 */
    finishPullUp(fn) {
      this.scroll && this.scroll.finishPullUp();
      return typeof fn == "function" && fn();
    },
    /**禁用 better-scroll，DOM 事件（如 touchstart、touchmove、touchend）的回调函数不再响应 */
    disable() {
      this.scroll && this.scroll.disable();
    },
    /**启用 better-scroll, 默认 开启 */
    enable() {
      this.scroll && this.scroll.enable();
    },
    /**重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常*/
    refresh(fn) {
      this.scroll && this.scroll.refresh();
      return typeof fn == "function" && fn();
    },
    /**一般回顶部 */
    scrollTo(fn) {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
      return typeof fn == "function" && fn();
    },
    /**滚动到指定的目标元素 */
    scrollToElement(fn) {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll,arguments);
      return typeof fn == "function" && fn();
    },
    /**回顶部 */
    clickGotoTop(){
      this.scrollTo(0,0,400)
    },
  },
};
</script>

<style scoped>
.better-scroll {
  overflow: hidden;
  background-color: rgb(231, 231, 231);
  position: relative;
}
.loading-pos,
.pulldown-tip {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 35px;
  color: #fcfcfc;
  text-align: center;
  z-index: 2000;
}

.loading-pos {
  background-color: rgba(7, 17, 27, 0.7);
}
.pulldown-tip {
  top: -50px;
  height: 50px;
  line-height: 50px;
  z-index: 1;
}
.tip-content{
  color: rgb(105, 105, 105);
}
.pull-icon {
  position: absolute;
  top: 0;
  left: 30%;
  color: #a5a1a1;
  font-size: 1.5em;
  transition: all 0.15s ease-in-out;
}
.pull-icon.icon-rotate {
  transform: rotate(180deg);
}

.loading-container {
  position: absolute;
  height: 10px;
  width: 10px;
  left: 35%;
  top: 50%;
  transform: translate(-50%, -50%);
  perspective: 40px;
}
.loading-connecting {
  line-height: 35px;
}
.cube {
  height: 10px;
  width: 10px;
  transform-origin: 50% 50%;
  transform-style: preserve-3d;
  animation: rotate 3s infinite ease-in-out;
}
.side {
  position: absolute;
  height: 10px;
  width: 10px;
  border-radius: 50%;
}
.side1 {
  background: #4bc393;
  transform: translateZ(10px);
}
.side2 {
  background: #ff884d;
  transform: rotateY(90deg) translateZ(10px);
}
.side3 {
  background: #32526e;
  transform: rotateY(180deg) translateZ(10px);
}
.side4 {
  background: #c53fa3;
  transform: rotateY(-90deg) translateZ(10px);
}
.side5 {
  background: #ffcc5c;
  transform: rotateX(90deg) translateZ(10px);
}
.side6 {
  background: #ff6b57;
  transform: rotateX(-90deg) translateZ(10px);
}

@keyframes rotate {
  0% {
    transform: rotateX(0deg) rotateY(0deg);
  }
  50% {
    transform: rotateX(360deg) rotateY(0deg);
  }
  100% {
    transform: rotateX(360deg) rotateY(360deg);
  }
}
.pullup{
  width: 100%;
  padding:5px 0;
  text-align: center;
  font-size: 15px;
}
.gototop{
  position: absolute;
  bottom: 4vw;
  right: 4vw;
  z-index: 2;
}
</style>