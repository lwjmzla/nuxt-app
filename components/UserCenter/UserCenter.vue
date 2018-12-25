<template>
<div class="userCenter">
  <p class="userCenter_title">用户中心</p>
  <ul>
    <li v-for="(item, index) of liArr" :key="index"><a :href="item.url" :class="{on: item.pageName === activeLi}">{{item.text}}</a></li>
  </ul>
</div>
</template>

<script>
export default {
  props: {
    activeLi: String
  },
  data () {
    return {
      liArr: [
        {text: '基本信息', url: '/basicInfo.html', pageName: 'basicInfo'},
        {text: '修改密码', url: '/modifyPwd.html', pageName: 'modifyPwd'},
        {text: '登记技术需求', url: '/bookTech.html', pageName: 'bookTech'},
        {text: '登记科技成果', url: '/bookScien.html', pageName: 'bookScien'},
        {text: '登记专利成果', url: '/bookPatent.html', pageName: 'bookPatent'},
        {text: '登记人才需求', url: '/bookTalent.html', pageName: 'bookTalent'},
        {text: '登记成为专家', url: '/bookExpert.html', pageName: 'bookExpert'},
        {text: '上传商业计划书', url: '/uploadPlan.html', pageName: 'uploadPlan'}
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
  .userCenter
    float left
    width 250px
    border-radius 5px
    background #fff
    min-height 394px
    overflow hidden
    .userCenter_title
      line-height 50px
      background #C9151E
      text-indent 20px
      color #fff
      font-size 18px
      font-weight bold
    ul
      li
        height 36px
        line-height 36px
        a
          display block
          text-indent 20px
          font-size 16px
          color #333
          &:hover
            color #C9151E
        .on
          color #C9151E
</style>
