<template>
  <div class="title">
    {{titleName}}
  </div>
</template>

<script>
export default {
  props: {
    titleName: {
      type: String
    }
  },
  data () {
    return {

    }
  },
  components: {

  }
}
</script>

<style lang='stylus' scoped>
  @import '~common/stylus/mixins.styl';
  .title
    width:220px;
    height:48px;
    background:rgba(255,255,255,1);
    border:2px solid $red;
    border-radius:26px;
    color #333333
    line-height 48px
    font-size 24px
    font-weight bold
    text-align center
    margin 0 auto
    position relative
    &::before
      content ''
      position absolute
      width  478px
      background #E8E8E8
      height 2px
      top 50%
      transform translateY(-50%)
      left -480px
    &::after
      content ''
      position absolute
      width  478px
      background #E8E8E8
      height 2px
      top 50%
      transform translateY(-50%)
      left 222px
</style>
