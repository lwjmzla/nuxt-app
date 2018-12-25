<template>
  <div class="bookList">
    <p>
      <span>{{title1}}</span>
      <span>{{title2}}</span>
      <span>{{title3}}</span>
      <span>操作</span>
    </p>
    <ul v-if="list.length > 0">
      <li v-for="item of list" :key="item.Id">
        <span v-for="(value, key) of item" :key="key" v-if="key !== 'Id'" :title="value">{{value}}</span>
        <a href="javascript:;" class="read" @click="checkDetail" :data-Id="item.Id">查看详情</a>
        <a href="javascript:;" style="outline:none;border:none;" class="del" @click="delItem" :data-Id="item.Id">删除</a>
      </li>
    </ul>
    <p class="none" style="display: none">无数据</p>
  </div>
</template>

<script>
export default {
  props: {
    list: Array,
    title1: String,
    title2: {
      type: String,
      default: '行业领域'
    },
    title3: String
  },
  methods: {
    delItem (event) {
      let id = event.currentTarget.getAttribute('data-Id')
      if (this.list.length !== 1) {
        this.$emit('delItem', id, false)
      } else {
        this.$emit('delItem', id, true)
      }
    },
    checkDetail (event) {
      let id = event.currentTarget.getAttribute('data-Id')
      this.$emit('checkDetail', id)
    }
  },
  watch: {
    list (newVal) {
      this.$nextTick(() => {
        this.$emit('listRendered')
      })
    }
  },
  updated () {
    if (this.list.length === 0) {
      document.getElementsByClassName('none')[0].style.display = 'block'
    }
  }
}
</script>

<style lang="stylus" scoped>
  .bookList
    margin 10px auto 0px
    width 870px
    border-radius 3px
    border 1px solid #e8e8e8
    box-sizing border-box
    p
      height 48px
      line-height 48px
      border-bottom 1px solid #e8e8e8
      span
        float left
        font-size 14px
        color #666
        font-weight bold
        text-align left
      span:nth-of-type(1)
        width 456px
        text-indent 20px
      span:nth-of-type(2)
        width 162px
      span:nth-of-type(3)
        width 127px
    ul
      li
        height 36px
        line-height 36px
        >span
          float left
          font-size 14px
          color #999
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
        span:nth-of-type(1)
          margin-left 20px
          width 404px
        span:nth-of-type(2)
          margin-left 32px
          width 126px
          min-height 1px
        span:nth-of-type(3)
          margin-left 38px
          width 122px
          min-height 1px
        a
          float left
          font-size 14px
        .read
          color #57A4FF
        .del
          margin-left 10px
          color #C9151E
      li:nth-of-type(even)
        background #F8F8F8
    .none
      line-height 48px
      text-align center
      font-size 14px
      color #999
</style>
