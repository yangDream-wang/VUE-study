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
    <div class="scroll-wrap">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name:'',
  props: {
    /*    传1 滚动的时候会派发scroll事件，会截流。
          传2 滚动的时候实时派发scroll事件，不会截流。
          传3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件     */
    probeType: {
      type: Number,
      default: 1
    },
    //  点击列表是否派发click事件
    click: {
      type: Boolean,
      default: true
    },
    //  是否开启横向滚动
    scrollX: {
      type: Boolean,
      default: false
    },
    //  是否派发滚动事件
    listenScroll: {
      type: Boolean,
      default: false
    },
    //  列表的数据,用于数据改变导致视图更改后重新初始化滚动
    data: {
      type: Array,
      default: null
    },
    /** * 是否派发滚动到底部的事件，用于上拉加载 */
    pullup: {
      type: Boolean,
      default: false
    },
    /** * 是否派发顶部下拉的事件，用于下拉刷新 */
    pulldown: {
      type: Boolean,
      default: false
    },
    /** * 是否派发列表滚动开始的事件 */
    beforeScroll: {
      type: Boolean,
      default: false
    },
    /** * 当数据更新后，刷新scroll的延时。 */
    refreshDelay: {
      type: Number,
      default: 20
    }
  },
  watch: {
    // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
    data () {
      setTimeout(() => {
        this.refresh()
      }, this.refreshDelay)
    }
  },
  mounted () {
    // 保证在DOM渲染完毕后初始化better-scroll
    setTimeout(() => {
      this._initScroll()
    }, 20)
  },
  methods: {
    _initScroll () {
      if (!this.$refs.wrapper) { return }
      // better-scroll的初始化
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        useTransition: false, // 防止iphone微信滑动卡顿
        scrollX: this.scrollX,
        preventDefault: true,
        momentum: true,
        bounce: true //是否开启betterscroll的弹性动画，如果不需要设置为false
      })
      // 是否派发滚动事件
      if (this.listenScroll) {
        const me = this
        this.scroll.on('scroll', pos => {
          me.$emit('scroll', pos)
        })
      }
      // 是否派发滚动到底部事件，用于上拉加载
      if (this.pullup) {
        this.scroll.on('scrollEnd', () => {
          // 滚动到底部
          if (this.scroll.y <= this.scroll.maxScrollY + 50) {
            this.$emit('scrollToEnd')
          }
        })
      }
      // 是否派发顶部下拉事件，用于下拉刷新
      if (this.pulldown) {
        this.scroll.on('touchEnd', pos => {
          // 下拉动作
          if (pos.y > 50) {
            this.$emit('pulldown',pos)
          }
        })
      }
      // 是否派发列表滚动开始的事件
      if (this.beforeScroll) {
        this.scroll.on('beforeScrollStart', () => {
          this.$emit('beforeScroll')
        })
      }
    },
    /**禁用 better-scroll，DOM 事件（如 touchstart、touchmove、touchend）的回调函数不再响应 */
    disable() {
      this.scroll && this.scroll.disable()
    },
    /**启用 better-scroll, 默认 开启 */
    enable() {
      this.scroll && this.scroll.enable()
    },
    /**重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常*/
    refresh(fn) {
      this.scroll && this.scroll.refresh()
      return typeof fn == 'function' && fn()
    },
    /**一般回顶部 */
    scrollTo(fn) {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      return typeof fn == 'function' && fn()
    },
    /**滚动到指定的目标元素 */
    scrollToElement(fn) {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      return typeof fn == 'function' && fn()
    }
  }
}
</script>

<style scoped>
.better-scroll {
  overflow: hidden;
}
</style>