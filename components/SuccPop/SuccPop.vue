<template>
  <div class="pop_wrap" v-show="openBol">
    <transition name="move">
      <div class="succPop" v-show="openBol">
        <div class="QRImg">
          <img src="./QRcode.png" alt="二维码">
        </div>
        <p class="QRW">客服微信二维码</p>
        <h4>感谢您的关注</h4>
        <h4>立即联系顾问对接进一步信息</h4>
        <div class="line"></div>
        <p class="pop_tel">18903078315</p>
        <p class="pop_telW">24小时免费热线</p>
        <a href="javascript:;" class="pop_close" @click="close">
          <i class="iconfont icon-guanbi1"></i>
        </a>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SuccPop',
  props: {
    openBol: Boolean
  },
  methods: {
    close () {
      this.$emit('closePop')
    }
  }
}
</script>

<style lang='stylus' scoped>
  .pop_wrap
    position fixed
    width 100%
    height 100%
    background rgba(0,0,0,.8)
    z-index 3
    top 0
    left 0
    .succPop
      position fixed
      left 50%
      top 50%
      width 420px
      height 460px
      background #fff
      border-radius 3px
      overflow hidden
      text-align center
      box-shadow: 1px 1px 30px rgba(0,0,0,.3)
      opacity 1
      transform translate(-50%,-50%) scale(1)
      &.move-enter-active, &.move-leave-active
        transition all .5s
      &.move-enter, &.move-leave-to
        opacity 0
        transform translate(-50%,-50%) scale(.8)
      .QRImg
        margin 40px auto 0px
        width 200px
        height 200px
        img
          width 100%
          height 100%
      .QRW
        margin-top 6px
        line-height 20px
        font-size 14px
        color #666
      h4
        font-size 20px
        font-weight bold
        color #333
        line-height 25px
      h4:nth-of-type(1)
        margin-top 19px
      h4:nth-of-type(2)
        margin-top 7px
      .line
        margin 11px auto 0px
        width 260px
        height 1px
        background #e8e8e8
      .pop_tel
        margin-top 11px
        line-height 28px
        font-size 24px
        color #C9151E
      .pop_telW
        line-height 20px
        font-size 14px
        color #666
      .pop_close
        position absolute
        top 10px
        right 10px
        display block
        width 30px
        height 30px
        line-height 30px
        border-radius 50%
        background #999
        text-align center
        i
          font-size 14px
          color #fff
</style>
