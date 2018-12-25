<template>
  <div class="crumb_wrap">
    <div class="crumb w1180">
      <span>当前位置：</span>
      <a :href="anchor(upperPos)">{{upperPos}}</a>
      <span>/</span>
      <a :href="secUrl" v-if="secPos !== ''">{{secPos}}</a>
      <span v-if="secPos !== ''">/</span>
      <span class="final" :title="curPos">{{curPos}}</span>
    </div>
  </div>
</template>

<script>
const anchorMap = {
  '首页': '/index.html',
  '用户中心': '/basicInfo.html'
}
export default {
  name: 'BreadCrumb',
  data () {
    return {
      map: {}
    }
  },
  props: {
    upperPos: String,
    curPos: String,
    secPos: {
      type: String,
      default: ''
    },
    secUrl: {
      type: String,
      default: ''
    }
  },
  computed: {
    anchor (key) {
      return function (key) {
        return this.map[key]
      }
    }
  },
  created () {
    this.map = anchorMap
  }
}
</script>

<style lang='stylus' scoped>
  @import '~common/stylus/mixins.styl';
  .crumb_wrap
    background #F5F5F5
  .crumb
    padding 20px 0
    height 20px
    line-height 20px
    color #999
    font-size 14px
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
    a
      color #999
      font-size 14px
      &:hover
        color #c9151e
</style>
