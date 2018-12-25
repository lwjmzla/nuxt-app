<template>
  <div class="cate_panel">
      <p class="cate_panel_title">分类</p>
      <div class="cate_panel_main">
        <div v-for='item of list' :key='item.Id'>
          <a :href="anchor(item.Children[0].NewsId,item.Children[0].Id)">{{item.Name}}<i class="iconfont icon-xia"></i></a>
          <ul class="cateUl">
            <li v-for='child of item.Children' :key="child.Id"><a :href="anchor(child.NewsId, child.Id)" :class="{act:child.Name === actA}">{{child.Name}}</a></li>
          </ul>
        </div>
        <div class="lib"><a :href="actLib === 'tech'? 'javascript:;' : '/techList.html'" :class="{act:actLib === 'tech'}">企业技术需求库</a></div>
        <div class="lib"><a :href="actLib === 'scien'? 'javascript:;' : '/scienList.html'" :class="{act:actLib === 'scien'}">科技成果库</a></div>
        <div class="lib"><a :href="actLib === 'patent'? 'javascript:;' : '/patentList.html'" :class="{act:actLib === 'patent'}">专利成果库</a></div>
        <div class="lib"><a :href="actLib === 'talent'? 'javascript:;' : '/talentList.html'" :class="{act:actLib === 'talent'}">企业人才需求库</a></div>
        <div class="lib"><a :href="actLib === 'expert'? 'javascript:;' : '/expertList.html'" :class="{act:actLib === 'expert'}">专家库</a></div>
      </div>
  </div>
</template>

<script>
import {getUrlParams, session} from 'common/js/utils.js'
import {getNewsCategories} from 'api/index.js'
export default {
  name: 'Category',
  props: {
    actA: {
      type: String,
      default: ''
    },
    actLib: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      list: {},
      cateId: -1,
      newsId: -1
      // flag: []
    }
  },
  methods: {
    // toggle (index) {
    //   this.flag[index] = !this.flag[index]
    //   this.$set(this.flag, index, this.flag[index])
    // },
    getListSucc (res) {
      this.list = res.Data.NewsCategories
      session.set('__Category__', this.list)
    }
  },
  created () {
    const params = getUrlParams()
    this.cateId = params['category'] !== undefined ? parseInt(params['category']) : this.cateId
    this.newsId = params['newsId'] !== undefined ? parseInt(params['newsId']) : this.newsId
    let _list = session.get('__Category__')
    if (_list !== '{}') {
      this.list = _list
    } else {
      getNewsCategories(true).then((res) => {
        if (res.Code === 0 && res.Result) {
          this.getListSucc(res)
        } else if (res.Code === 500) {
          window.location.href = '/page500.html'
        } else {
          this.$message({
            message: res.ErrorMsg,
            type: 'error',
            showClose: true
          })
        }
      })
    }
  },
  computed: {
    anchor (newsId, Id) {
      return function (newsId, Id) {
        if (newsId !== this.newsId && Id !== this.cateId) {
          if (newsId !== 0) {
            return '/newsDetail.html?newsId=' + newsId
          } else {
            return '/newsList.html?category=' + Id
          }
        } else {
          return 'javascript:;'
        }
      }
    }
  }
}
</script>

<style lang='stylus' scoped>
  .cate_panel
    float left
    width 250px
    border-radius 5px
    background #fff
    overflow: hidden
    .cate_panel_title
      height 50px
      line-height 50px
      background #C9151E
      text-indent 20px
      color #fff
      font-size 18px
      font-weight bold
    .cate_panel_main
      padding 0px 20px 22px
      min-height 802px
      box-sizing border-box
      >div
        overflow hidden
        &.lib
          a
            color #999
          .act
            color #C9151E
        >a
          display block
          position relative
          height 36px
          line-height 36px
          font-size 16px
          color #333
          &:hover
            color #C9151E
          i
            float right
            display inline-block
            font-size 14px
            color #666
            transform rotate(0deg)
            transition rotate .8s linear
        >a.draw+ul
          max-height 0px
          transition max-height .5s ease-out
          overflow hidden
        >a.draw i
          transform rotate(180deg)
          transition rotate .5s ease-out
        ul
          margin-left 15px
          max-height 999px
          transition max-height .8s linear
          li
            height 28px
            line-height 28px
            a
              display block
              font-size 14px
              color #999
              &:hover
                color #C9151E
            .act
              color #C9151E
</style>
