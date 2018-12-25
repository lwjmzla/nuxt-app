<template>
  <div class="newsShow">
    <p class="newsShow_title">
      <span>{{title}}</span>
      <br>
      <span>{{date}}</span>
    </p>
    <div class="newsShow_main">
      <div class="news_content" id="news_content"></div>
      <div class="shift">
        <a :href="'/newsDetail.html?newsId=' + prevId" class="prevNews" v-if='prevId !== 0'>
          <span>上一页</span>
          <p class="prevNewsW">{{prevNews}}</p>
        </a>
        <a :href="'/newsDetail.html?newsId='+ nextId" class="nextNews" v-if='nextId !== 0'>
          <span>下一页</span>
          <p class="nextNewsW">{{nextNews}}</p>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import {getUrlParams, IsPosInteNum} from 'common/js/utils.js'
import {getNewsDetail} from 'api/index.js'

export default {
  name: 'NewsShow',
  data () {
    return {
      title: '',
      date: '',
      newsId: 0,
      prevNews: '',
      prevId: 0,
      nextNews: '',
      nextId: 0,
      catePos: '',
      cataId: ''
    }
  },
  methods: {
    getNewsDetailSucc (res) {
      const data = res.Data
      if (res.Data === null) {
        window.location.href = 'page404.html'
      }
      this.title = data.Title
      this.catePos = data.NewsCategoryName
      this.cateId = data.NewsCategoryId
      this.$emit('callBread', this.title, this.catePos, this.cateId)
      this.date = data.PublishDate
      let conStr = data.Full
      if (conStr === '') {
        document.getElementById('news_content').innerHTML = "<p class='none' style='text-align:center'>无数据</p>"
      } else {
        document.getElementById('news_content').innerHTML = conStr
      }
      this.prevNews = data.PrevTitle
      this.prevId = data.PrevId
      this.nextNews = data.NextTitle
      this.nextId = data.NextId
    }
  },
  created () {
    const params = getUrlParams()
    this.newsId = IsPosInteNum(parseInt(params['newsId'])) ? parseInt(params['newsId']) : this.newsId
    if (this.newsId === 0) {
      window.location.href = 'page404.html'
    }
    getNewsDetail(this.newsId).then((res) => {
      if (res.Code === 0 && res.Result) {
        this.getNewsDetailSucc(res)
      } else if (res.Code === 500) {
        window.location.href = '/page500.html'
      } else if (res.Data === null) {
        window.location.href = '/page404.html'
      } else {
        this.$message({
          message: res.ErrorMsg,
          type: 'error',
          showClose: true
        })
      }
    })
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/mixins.styl';
  .newsShow
    float right
    width 910px
    border-radius 5px
    background #fff
    .newsShow_title
      min-height 60px
      padding 10px 20px
      line-height 30px
      border-bottom 1px solid #e8e8e8
      overflow hidden
      span:nth-of-type(1)
        font-size 18px
        color #333
        font-weight bold
      span:nth-of-type(2)
        font-size 14px
        color #999
    .newsShow_main
      padding 20px 20px 40px
      box-sizing border-box
      .news_content
        padding-bottom 20px
        line-height 1.6
        border-bottom 1px solid #e8e8e8
        overflow hidden
        min-height 668px
      .shift
        margin-top 20px
        overflow hidden
        a
          width 40%
          line-height 20px;
          span
            font-size 14px
            color #999
          p
            font-size 14px
            color #666
            font-weight bold
          &:hover
            p
              color #c9151e
        .prevNews
          float left
        .nextNews
          float right
          text-align right
</style>

<style lang="stylus">
  // 文章图片添加间距
  .news_content img
    margin 10px 0
</style>
