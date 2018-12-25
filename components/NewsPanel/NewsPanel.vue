<template>
  <div class="newsPanel">
    <p class="newsPanel_title">{{newPanel_title}}</p>
    <div class="newsPanel_main">
      <ul v-if="list.length > 0">
        <li v-for="item of list" :key='item.Id'>
          <div>
            <p><a :href="'/newsDetail.html?newsId='+item.Id" target="_blank" :title="item.Title">{{item.Title}}</a></p>
            <p>{{item.PublishDate}}</p>
          </div>
          <a :href="'/newsDetail.html?newsId='+item.Id" target="_blank">
            <span>立即查看</span>
            <span>
              <i class="iconfont icon-jiantou1"></i>
            </span>
          </a>
        </li>
      </ul>
      <p class="none" style="display: none">无数据</p>
      <Pager :totalPage="totalPage" :curPage="curPage" :preBol="preBol" :nextBol="nextBol" @goPage='goP'></Pager>
    </div>
  </div>
</template>

<script>
import Pager from 'components/Pager/Pager.vue'
import {getUrlParams, goPage, IsPosInteNum} from 'common/js/utils.js'
import {getNewsList} from 'api/index.js'

export default {
  name: 'NewsPanel',
  data () {
    return {
      newPanel_title: '',
      curPage: 1,
      totalPage: 0,
      preBol: true,
      nextBol: true,
      pageSize: 20,
      cate: 10,
      list: []
    }
  },
  methods: {
    getNewsListSucc (res) {
      const data = res.Data
      if (res.Data === null) {
        window.location.href = 'page404.html'
      }
      this.newPanel_title = data.NewsCategoryName
      this.$emit('callBread', this.newPanel_title)
      this.list = data.NewsItems
      if (this.list.length === 0) {
        document.getElementsByClassName('none')[0].style.display = 'block'
      }
      this.totalPage = data.TotalPages
      this.curPage = data.PageNumber
      // 手动输入页码大于总页码
      if (this.curPage > this.totalPage) {
        if (this.totalPage > 0) {
          this.goP(this.totalPage)
        }
      }
      this.preBol = data.HasPreviousPage
      this.nextBol = data.HasNextPage
    },
    goP (num) {
      goPage(num)
    }
  },
  created () {
    const params = getUrlParams()
    this.cate = IsPosInteNum(parseInt(params['category'])) ? parseInt(params['category']) : this.cate
    this.curPage = IsPosInteNum(parseInt(params['page'])) ? parseInt(params['page']) : this.curPage
    getNewsList(this.cate, this.curPage, this.pageSize).then((res) => {
      if (res.Code === 0 && res.Result) {
        this.getNewsListSucc(res)
      } else if (res.Data === null) {
        window.location.href = 'page404.html'
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
  },
  components: {
    Pager
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/mixins.styl';
  [v-cloak]
    display none
  .newsPanel
    float right
    width 910px
    border-radius 5px
    background #fff
    min-height 852px
    .newsPanel_title
      height 50px
      line-height 50px
      text-indent 20px
      font-size 18px
      color #333
      font-weight bold
      border-bottom 1px solid #e8e8e8
    .newsPanel_main
      padding 20px 20px 24px;
      box-sizing border-box
      ul
        li
          height 80px
          border-bottom 1px solid #e8e8e8
          overflow hidden
          div
            float left
            width 800px
            overflow hidden
            p:nth-of-type(1)
              margin-top 16px
              height 22px
              line-height 22px
              overflow hidden
              text-overflow ellipsis
              white-space nowrap
              a
                font-size 16px
                color #333
                &:hover
                  color #c9151e
            p:nth-of-type(2)
              margin-top 8px
              line-height 16px
              font-size 14px
              color #999
          >a
            display block
            float right
            color #999
            font-size 14px
            overflow hidden
            span:nth-of-type(1)
              margin-top 20px
              display block
              line-height 20px
            span:nth-of-type(2)
              margin-top 6px
              display block
              line-height 13px
              float right
              i
                font-size 18px
            &:hover
              color #c9151e
      .none
        line-height 80px
        text-align center
        font-size 14px
        color #999
</style>
