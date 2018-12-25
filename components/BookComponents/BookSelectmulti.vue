<template>
  <div class="common_row">
    <span><em v-if="need">*</em>{{title}}：</span>
    <el-select v-model="selectValueArr" multiple placeholder="全部">
      <el-option v-for="(item,index) in options" :label="item.label" :value="item.value" :key="index"></el-option>
    </el-select>
    <span class="err_tips" v-if="showErrorTips"><i class="iconfont icon-tanhao"></i>{{error_tips}}</span>
  </div>
</template>

<script>
export default {
  props: {
    need: {
      type: Boolean,
      default: false
    },
    title: String,
    error_tips: String,
    options: Array
  },
  data () {
    return {
      showErrorTips: false,
      selectValueArr: ''
    }
  }
}
</script>

<style lang='stylus' scoped>
  .common_row
    display flex
    margin-top 20px
    line-height 32px
    overflow hidden
    span
      height 32px
    span:first-child
      width 118px
      text-align right
      color #666
      font-size 14px
      font-weight bold
      em
        margin-right 3px
        color #C9151E
    input
      width 520px
      height 32px
      border 1px solid #E8E8E8
      box-sizing border-box
      text-indent 10px
      border-radius 3px
      color #333
      outline none
    select
      width 520px
      height 32px
      border 1px solid #E8E8E8
      box-sizing border-box
      padding-left 10px
      border-radius 3px
      color #333
      outline none
    .err_tips
      flex 1
      margin-left 10px
      color #C9151E
      font-size 14px
    .txtArea
      width 772px
      textarea
        width 100%
        height 140px
        color #333
        line-height 28px
        resize none
        border 1px soild #E8E8E8
        box-sizing border-box
        border-radius 3px
        outline none
      .err_tips
        margin-left 0px
</style>
<style lang="stylus">
  .el-select
    width 520px
  .el-input__inner
    height 32px
    line-height 32px
  .el-input__icon
    line-height 32px
</style>
