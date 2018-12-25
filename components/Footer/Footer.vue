<template>
  <div class="footer_wrap">
    <div class="footer w1180">
      <div class="footer_t">
        <div class="footer_t_l">
          <dl v-for="(item, index) of list" :key="index">
            <dt>{{item.Name}}</dt>
            <dd v-for="(child, index) of item.Children" :key="index"><a :href="anchor(child.NewsId, child.Id)" target="_blank">{{child.Name}}</a></dd>
          </dl>
        </div>
        <div class="footer_t_r">
          <div class="QRArea">
            <img src="./QRcode.png" alt="二维码">
          </div>
          <div class="remind">
            <p>扫描二维码</p>
            <p>关注高航微信</p>
            <p>科技成果立即转化</p>
          </div>
          <div class="telArea">
            <p>联系电话</p>
            <p class="tel">18903078315</p>
            <p>24小时免费热线</p>
          </div>
        </div>
      </div>
      <div class="partner">
        <span>战略合作伙伴：</span>
        <a :href="spUrl !== '' ? spUrl : 'javascript:;'" target="_blank">华南技术转移中心</a>
        <a href="http://www.gdsoftpark.com/" target="_blank">广东软件科学园</a>
        <a href="http://www.techcode.com/" target="_blank">太库科技孵化器</a>
        <a href="http://www.gzhu.edu.cn/" target="_blank">广州大学</a>
        <a href="https://www.jnu.edu.cn/" target="_blank">暨南大学</a>
      </div>
      <p class="footerPS">Copyright © 2012 - 2018 GaohangTT.com, All Rights Reserved. 高航技术转移(广州高航科技成果转化有限公司) 版权所有. 网站ICP备案号：粤ICP备18120615号-1</p>
    </div>
  </div>
</template>

<script>
import {session} from 'common/js/utils'
import {getNewsCategories} from 'api/index.js'
export default {
  name: 'Footer',
  data () {
    return {
      list: {},
      spUrl: ''
    }
  },
  computed: {
    anchor (newsId, Id) {
      return function (newsId, Id) {
        if (newsId === 0) {
          return '/newsList.html?category=' + Id
        } else {
          return '/newsDetail.html?newsId=' + newsId
        }
      }
    }
  },
  methods: {
    getListSucc (res) {
      this.list = res.Data.FootNewsCategories
      this.spUrl = res.Data.StrategicPartnerUrl
      session.set('__FooterMsg__', this.list)
      session.set('__spUrl__', this.spUrl)
    }
  },
  created () {
    let _list = session.get('__FooterMsg__')
    let _spUrl = session.get('__spUrl__')
    if (_list !== '{}' && _list !== null) {
      this.list = _list
      this.spUrl = _spUrl
    } else {
      getNewsCategories().then((res) => {
        if (res.Code === 0 && res.Result) {
          this.getListSucc(res)
        } else if (res.Code === 500) {
          if (window.location.pathname.indexOf('page500') === -1) {
            window.location.href = '/page500.html'
          }
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
}
</script>

<style lang='stylus' scoped>
  @import '~common/stylus/mixins.styl';
  .footer_wrap
    width 100%
    .footer
      padding-bottom 26px
      .footer_t
        padding 30px 0px 20px 0px
        border-bottom 1px solid #e8e8e8
        overflow hidden
        .footer_t_l
          float left
          width 50%
          dl
            float left
            margin-left 80px
            dt
              margin-bottom 2px
              line-height 22px
              font-size 16px
              color #666
              font-weight bold
            dd
              margin-top 10px
              line-height 20px
              a
                font-size 14px
                color #999
                &:hover
                  color #c9151e
          dl:first-child
            margin-left 0px
        .footer_t_r
          position relative
          float right
          width 50%
          &:before
            display block
            content ''
            position absolute
            top 8px
            left 0px
            width 1px
            height 124px
            background #e8e8e8
          >div
            float left
          .QRArea
            margin-left 81px
            width 141px
            height 141px
            img
              width 100%
              height 100%
          .remind
            margin-left 30px
            margin-top 43px
            line-height 20px
            font-size 14px
            color #666
          .telArea
            margin-left 40px
            p:first-child
              line-height 22px
              font-size 16px
              color #666
              font-weight bold
            .tel
              margin-top 17px
              line-height 24px
              font-size 20px
              color #C9151E
              font-weight bold
            .tel+p
              margin-top 5px
              line-height 20px
              font-size 14px
              color #666
      .partner
        margin-top 15px
        line-height 20px
        text-align center
        a,span
          font-size 14px
          color #666
        a:hover
          color #C9151E
        span
          margin-right 14px
      .footerPS
        margin-top 6px
        text-align center
        line-height 20px
        font-size 14px
        color #666
</style>
