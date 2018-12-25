<template>
  <div class="result_item" :style="`width:${wrapWidth}`">
    <div class="result_item_h">
      <span>{{infos.type}}</span>
      <a :href="`${infos.urlPre}List.html`">更多<i class="iconfont icon-you1"></i></a>
    </div>
    <div class="result_item_b">
      <div class="result_item_title">
        <div :style="`width:${col1Width}`">{{infos.col1Name}}</div>
        <div>{{infos.col2Name}}</div>
        <div :style="`width:${col3Width}`">{{infos.col3Name}}</div>
      </div>
      <div class="result_item_con" ref="con">
        <div class="bd">
          <ul class="infoList">
            <li v-for="(page,index) in data" :key="index">
              <ol class="onePageShow">
                <li v-for="item in page" :key="item.id">
                  <a :href="`${infos.urlPre}Detail.html?id=${item.id}`">
                    <div :style="`width:${col1Width}`" :title="item.col1">{{item.col1}}</div>
                    <div :title="item.col2">{{item.col2}}</div>
                    <div :style="`width:${col3Width}`" :title="item.col3">{{item.col3}}</div>
                  </a>
                </li>
              </ol>
            </li>
          </ul>
        </div>
        <div class="hd" v-if="data.length > 1">
          <ul class="num">
            <li v-for="(page,index) in data" :key="index"></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import 'static/js/slide'
export default {
  props: {
    wrapWidth: {
      type: String
    },
    col1Width: {
      type: String,
      default: '160px'
    },
    col3Width: {
      type: String,
      default: '70px'
    },
    data: {
      type: Array,
      default: () => []
    },
    infos: Object
  },
  data () {
    return {

    }
  },
  components: {

  },
  mounted () {
  },
  watch: {
    data (newVal) {
      this.$nextTick(() => {
        $(this.$refs.con).slide({
          titCell: '.hd ul',
          mainCell: '.bd ul',
          autoPage: true,
          effect: 'left',
          autoPlay: false,
          trigger: 'click'
        })
      })
    }
  }
}
</script>

<style lang='stylus' scoped>
  @import '~common/stylus/mixins.styl';
  .result_item
    height 268px
    margin-bottom 33px
    position relative
  .result_item_h
    height 50px
    background $red
    padding 0 20px
    display flex
    align-items center
    justify-content space-between
    span
      font-size 16px
      color #ffffff
      font-weight bold
    a
      font-size 14px
      color #E6E6E6
      i
        margin-left 4px
        font-size 14px
  .result_item_b
    padding 0 20px
    background #fff
    height 218px
    .result_item_title
      height 36px
      border-bottom 1px solid #E8E8E8
      display flex
      align-items center
      color #333333
      >div
        font-weight bold
        font-size 14px
        &:nth-of-type(1)
          width 160px
        &:nth-of-type(2)
          margin 0 20px
          flex 1
        &:nth-of-type(3)
          width 70px
  .onePageShow
    li
      a
        height 28px
        display flex
        align-items center
        color #999
        &:hover
          color $red
      div
        font-size 14px
        height 16px
        ellipsis()
        &:nth-of-type(1)
          width 160px
        &:nth-of-type(2)
          margin 0 20px
          flex 1
        &:nth-of-type(3)
          width 70px
  .hd
    position absolute
    width 100%
    left 0
    bottom 19px
    text-align center
    li
      font-size 0
      display inline-block
      width 10px
      height 10px
      border-radius 50%
      margin 0 5p
      background #E8E8E8
      &.on
        background #999
</style>

<style lang="stylus">
  // ! 这里的圆圈li是动态生成的 所以scoped 里的样式无效
  .result_item_con
    .hd
      li
        font-size 0
        display inline-block
        width 10px
        height 10px
        border-radius 50%
        margin 0 5px
        background #E8E8E8
        cursor pointer
        &.on
          background #999
</style>
