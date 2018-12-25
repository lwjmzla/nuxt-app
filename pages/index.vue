<template>
  <div id="app">
    <header-top logo="logo"></header-top>
    <banner :bannerScienceUrl="bannerScienceUrl" :bannerIncubationUrl="bannerIncubationUrl"></banner>
  </div>
</template>

<script>
import { getUserInfos } from '@/assets/api/index.js' // getAllForHomePage
import Banner from '@/components/Banner/Banner.vue'
import HeaderTop from '@/components/HeaderTop/HeaderTop.vue'
// // import IndexResult from '@/components/IndexResult/IndexResult.vue'
// // import Footer from '@/components/Footer/Footer.vue'
// import { createResult } from '@/assets/js/createObj.js'

export default {
  components: {
    Banner,
    HeaderTop
    // IndexResult,
    // Footer
  },
  data () {
    return {
      dataArr1: [],
      dataArr2: [],
      dataArr3: [],
      dataArr4: [],
      dataArr5: [],
      serviceContent: [],
      unitDisplay: [],
      infos: [
        {
          type: '技术需求',
          col1Name: '需求名称',
          col2Name: '行业领域',
          col3Name: '拟投资规模',
          urlPre: '/tech'
        },
        {
          type: '科技成果展示',
          col1Name: '成果名称',
          col2Name: '行业领域',
          col3Name: '拟合作方式',
          urlPre: '/scien'
        },
        {
          type: '专利成果展示',
          col1Name: '专利名称',
          col2Name: '行业领域',
          col3Name: '拟合作方式',
          urlPre: '/patent'
        },
        {
          type: '人才需求',
          col1Name: '职位名称',
          col2Name: '行业领域',
          col3Name: '工作职责',
          urlPre: '/talent'
        },
        {
          type: '专家库',
          col1Name: '专家姓名',
          col2Name: '研究领域',
          col3Name: '研究方向',
          urlPre: '/expert'
        }
      ]
    }
  },
  computed: {
    bannerScienceUrl () {
      return this.serviceContent[1]
    },
    bannerIncubationUrl () {
      return this.serviceContent[0]
    }
  },
  async asyncData (ctx) {
    const { status, data } = await ctx.$axios.get('http://www.gaohangtt.com/api/Customer/GetCurCustomer')
    // console.log(status)
    // console.log(data)
    // !竟然没跨域，估计在服务器里获取是不会跨域的
    // getUserInfos().then(res => {
    //   console.log(res)
    // })
    // function calculateResultData (arr) {
    //   let arrNew = []
    //   // 转成新的统一数据格式
    //   arr.forEach((obj, index) => {
    //     arrNew.push(createResult(obj))
    //   })
    //   const data = arrNew.slice()
    //   // 数据转为 [[],[],[]]格式
    //   const swiperPages = Math.ceil(data.length / 5)
    //   let bigArr = []
    //   let smallArr = []
    //   for (let i = 0; i < swiperPages; i++) {
    //     smallArr = data.slice(i * 5, (i + 1) * 5)
    //     bigArr.push(smallArr)
    //   }
    //   return bigArr
    // }
    // const res = await getAllForHomePage()
    // const data = res.Data
    // const dataObj = {
    //   dataArr1: calculateResultData(data.technicalRequirements),
    //   dataArr2: calculateResultData(data.techAchievements),
    //   dataArr3: calculateResultData(data.patentAchievements),
    //   dataArr4: calculateResultData(data.talentsRequirements),
    //   dataArr5: calculateResultData(data.experts),
    //   serviceContent: data.serviceContent,
    //   unitDisplay: data.unitDisplay
    // }
    // return dataObj // warn cannot stringify arbitrary non-POJOs 莫名其妙
  }
}
</script>

<style lang='stylus'>
  // !以前替换 HeaderTop样式
  @import '~assets/stylus/mixins.styl';
  input::-webkit-input-placeholder {        /* WebKit, Blink, Edge */
      color: #CDCCD8;
  }
  input:-moz-placeholder{color: #CDCCD8;}    /* Mozilla Firefox 4 to 18 */
  input::-moz-placeholder{color: #CDCCD8;}    /* Mozilla Firefox 19+ */
  input:-ms-input-placeholder{color: #CDCCD8;}  /* Internet Explorer 10-11 */
  #app
    .header_top
      position absolute
      top 0
      left 0
      width 100%
      z-index 2
    .header
      height 30px
      background transparent
      ul
        clearFix()
        padding-top 7px
        li
          float right
          padding 0 10px
          line-height 16px
          height 16px
          font-size 14px
          border-right 1px solid #8A88A5
          color #8A88A5
          &:first-child
            border-right none
            padding-right 0px
          a
            color #8A88A5
            vertical-align top
            &.login
              color #F95254
              vertical-align top
            &:hover
              text-decoration underline
    .top
      .w1180
        height 68px
        display flex
        align-items center
        .logo
          margin-right 76px
          img
            width 180px
            height 36px
        .nav
          ul
            display flex
            >li
              font-size 16px
              padding 9px 24px
              position relative
              border 1px solid transparent
              &.on
                >a
                  color $red
                  border-bottom 2px solid $red
                  padding 7px 0px
              a
                color #fff
              &.select
                &:hover
                  border-top-left-radius 3px
                  border-top-right-radius 3px
                  border 1px solid #83809F
                  border-bottom-color transparent
                  .selsectMenu
                    display block
                    border 1px solid #83809F
                    border-top-color transparent
          .selsectMenu
            position absolute
            top 0
            left -1px
            width 100%
            text-align center
            border 1px solid transparent
            display none
            background transparent
            h3
              color #666
              height 36px
              line-height 32px
              background transparent
            li
              height 32px
              line-height 32px
              a
                display block
                font-size 14px
                &:hover
                  color #333333
                  background #ffffff
        .search
          width 230px
          height 36px
          box-sizing border-box
          border-radius 3px
          margin-left 25px
          display flex
          .search_type
            width 87px
            height 100%
            border 1px solid #83809F
            font-size 14px
            color #fff
            position relative
            &:hover
              border-bottom-color transparent
              .selsectMenu
                border 1px solid #83809F
                border-top-color transparent
                display block
            .cur_type
              height 100%
              display flex
              align-items center
              justify-content center
              span
                width 56px
                margin-right 3px
                text-align center
              i
                font-size 10px
                transform: scale(0.7)
            .selsectMenu
              display none
              position absolute
              left -1px
              top 100%
              width 100%
              border 1px solid transparent
              background transparent
              li
                height 32px
                line-height 32px
                text-align center
                &:hover
                  color #333333
                  background #ffffff
                  cursor pointer
          .search_key
            width 142px
            height 100%
            border 1px solid #83809F
            border-left none
            display flex
            align-items center
            justify-content center
            color #ffffff
            input
              width 110px
              background transparent
              color #ffffff
              font-size 14px

</style>
