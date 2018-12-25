<template>
  <div class="header_top">
    <div class="header">
      <div class="w1180">
        <ul v-if="!hasLogined">
          <li><a href="/register">免费注册</a></li>
          <li><span>您好，请</span><a class="login" href="/login">登录</a></li>
          <li><a href="/">高航首页</a></li>
        </ul>
        <ul v-else>
          <li><a href="javascript:void(0)" @click="logout">退出</a></li>
          <li v-if="CanAccessAdminPanel"><a href="/admin">后台系统</a></li>
          <li>您好，<a href="/basicInfo.html" class="login">{{showName}}</a></li>
        </ul>
      </div>
    </div>
    <div class="top">
      <div class="w1180">
        <a href="/" class="logo">
          <img :src="logoSrc" />
        </a>
        <div class="nav">
          <ul>
            <li class="home"><a href="/">首页</a></li>
            <li class="select" v-for='(item,index) in list' :key='index'>
              <a href="javascript:void(0)">{{item.Name}}</a>
              <div class="selsectMenu">
                <ol>
                  <h3><a :href="anchor(item.Children[0].NewsId,item.Children[0].Id)" style="display: block;">{{item.Name}}</a></h3>
                  <li v-for='(child,index) in item.Children' :key="index"><a :href="anchor(child.NewsId, child.Id)" :class="{act:child.Name === actA}">{{child.Name}}</a></li>
                </ol>
              </div>
            </li>
          </ul>
        </div>
        <div class="search">
          <div class="search_type" @mouseenter="showMenu" @mouseleave="hideMenu">
            <div class="cur_type">
              <span>{{selectedName}}</span><i class="iconfont icon-xiala"></i>
            </div>
            <div class="selsectMenu" v-show="menuShow">
              <ol>
                <li v-for="(item,index) in selsectMenuArr" :key="index" @click="chooseType(item)">{{item.name}}</li>
              </ol>
            </div>
          </div>
          <div class="search_key">
            <input type="text" placeholder="请输入搜索内容" v-model="keyword" @keyup.enter="search" />
            <i class="iconfont icon-sousuo1" @click="search"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { storage, session, getUrlParams } from '@/assets/js/utils'
import { reqLogout } from '@/assets/api/index.js' // getUserInfos getNewsCategories
import '@/assets/fonts/iconfont.css'
export default {
  props: {
    logo: {
      type: String,
      default: 'logo1'
    },
    actA: {
      type: String,
      default: ''
    }
  },
  computed: {
    logoSrc () {
      return require('./' + this.logo + '.png')
    },
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
  },
  data () {
    return {
      hasLogined: false,
      menuShow: false,
      showName: '',
      list: {},
      selectedType: 'tech',
      selectedName: '技术需求',
      keyword: '',
      headerShow: false,
      CanAccessAdminPanel: false,
      searchBol: false,
      selsectMenuArr: [
        {
          name: '技术需求',
          type: 'tech'
        },
        {
          name: '科技成果',
          type: 'scien'
        },
        {
          name: '专利成果',
          type: 'patent'
        },
        {
          name: '人才需求',
          type: 'talent'
        },
        {
          name: '专家引进',
          type: 'expert'
        }
      ],
      cateId: -1,
      newsId: -1,
      kw: ''
    }
  },
  created () {
    console.log(this.$store.state.newsCategories) // 这里才是 服务端渲染 的生命周期
    const res = this.$store.state.newsCategories
    if (res.Code === 0 && res.Result) {
      this.getListSucc(res)
    }
  },
  mounted () {
    // console.log(this.list)
    session.set('__Category__', this.list)
    // loadIconfontCSS()
    this.initSeachType()
    this.initKeyWord()
    console.log(this.$store.state.loginStatus)
    // getUserInfos().then((res) => {
    //   this.headerShow = true
    //   this.searchBol = true
    //   if (window.location.pathname.indexOf('List') > 0 && window.location.pathname.indexOf('news') === -1) {
    //     this.$emit('enableSearch', this.searchBol)
    //   }
    //   this.$emit('getInfos', res)
    //   if (res.Result) {
    //     this.hasLogined = true
    //     this.showName = res.Data.ShowName
    //     this.CanAccessAdminPanel = res.Data.CanAccessAdminPanel
    //     storage.set('__login__', 'true')
    //     storage.set('__mobile__', res.Data.Mobile)
    //   } else {
    //     storage.set('__login__', 'false') // 火狐狂点搜索按钮跳转到登陆页，就是这2个造成（就是接口不稳定）获取登陆信息失败
    //   }
    // }).catch(() => {
    //   storage.set('__login__', 'false') // 火狐狂点搜索按钮跳转到登陆页，就是这2个造成（就是接口不稳定）获取登陆信息失败
    // })
    const params = getUrlParams()
    this.cateId = params['category'] !== undefined ? parseInt(params['category']) : this.cateId
    this.newsId = params['newsId'] !== undefined ? parseInt(params['newsId']) : this.newsId
    this.kw = params['kw'] !== undefined ? params['kw'] : this.kw
    // let _list = session.get('__Category__')
    // if (_list !== '{}' && _list !== null) {
    //   this.list = _list
    // } else {
    // getNewsCategories().then((res) => {
    //   if (res.Code === 0 && res.Result) {
    //     this.getListSucc(res)
    //   } else if (res.Code === 500) {
    //     if (window.location.pathname.indexOf('page500') === -1) {
    //       window.location.href = '/page500.html'
    //     }
    //   } else {
    //     this.$message({
    //       message: res.ErrorMsg,
    //       type: 'error',
    //       showClose: true
    //     })
    //   }
    // })
    // }
  },
  updated () {
    this.judge()
  },
  methods: {
    logout () {
      reqLogout().then((res) => {
        if (res.Code === 0 && res.Result) {
          storage.set('__login__', 'false')
          window.location.href = '/'
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
    getListSucc (res) {
      this.list = res.Data.TopNewsCategories
      // session.set('__Category__', this.list)
    },
    chooseType (item) {
      this.selectedType = item.type
      this.selectedName = item.name
      this.menuShow = false
    },
    showMenu () {
      this.menuShow = true
    },
    hideMenu () {
      this.menuShow = false
    },
    search () {
      if (this.searchBol) {
        if (storage.get('__login__') === 'false') {
          window.location.href = '/login.html'
        } else {
          const type = this.selectedType
          window.location.href = `/${type}List.html?keyword=${this.keyword}`
        }
      }
    },
    initSeachType () {
      const str = window.location.pathname // xx.html
      if (str.indexOf('List') > -1) {
        const type = str.substring(str.indexOf('/') + 1, str.indexOf('List'))
        const map = {
          tech: '技术需求',
          scien: '科技成果',
          patent: '专利成果',
          talent: '人才需求',
          expert: '专家引进'
        }
        if (type === 'news') {
          return false
        }
        this.selectedType = type
        this.selectedName = map[type]
      }
    },
    initKeyWord () {
      const params = getUrlParams()
      this.keyword = params.keyword ? params.keyword : ''
    },
    judge () {
      if (document.getElementsByClassName('act')[0]) {
        document.getElementsByClassName('act')[0].parentNode.parentNode.parentNode.parentNode.classList.add('on')
      } else if (window.location.pathname === '/') {
        document.getElementsByClassName('home')[0].classList.add('on')
      } else if (this.kw === 'AboutUs') {
        document.getElementsByClassName('aboutUs')[0].classList.add('on')
      }
    }
  }
}
</script>

<style lang='stylus' scoped>
  @import '~assets/stylus/mixins.styl';
  input::-webkit-input-placeholder {        /* WebKit, Blink, Edge */
      color: #999999;
  }
  input:-moz-placeholder{color: #999999;}    /* Mozilla Firefox 4 to 18 */
  input::-moz-placeholder{color: #999999;}    /* Mozilla Firefox 19+ */
  input:-ms-input-placeholder{color: #999999;}  /* Internet Explorer 10-11 */
  .header
    height 30px
    background #F8F8F8
    ul
      clearFix()
      padding-top 7px
      li
        float right
        padding 0 10px
        line-height 16px
        height 16px
        font-size 14px
        border-right 1px solid #999999
        color #999999
        &:first-child
          border-right none
          padding-right 0px
        a
          color #999999
          vertical-align top
          &.login
            color #F95254
            vertical-align top
          &:hover
            text-decoration underline
  .top
    // background #fff
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
        min-width 668px
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
              color #666666
            &.select
              &:hover
                border-top-left-radius 3px
                border-top-right-radius 3px
                .selsectMenu
                  display block
                  box-shadow: 0 0 10px 2px rgba(41,38,38,.2)
          .home
            a
              &:hover
                color $red
          .aboutUs
            a
              &:hover
                color $red
        .selsectMenu
          position absolute
          top 0
          left -1px
          width 100%
          text-align center
          border 1px solid transparent
          display none
          background #fff
          z-index 1
          h3
            color #666
            height 36px
            line-height 32px
            background #fff
          li
            height 32px
            line-height 32px
            a
              display block
              font-size 14px
              &:hover
                color #333333
                background #dddddd
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
          border 1px solid #999999
          font-size 14px
          color #666666
          position relative
          &:hover
            border-bottom-color transparent
            .selsectMenu
              border 1px solid #999999
              border-top-color transparent
              // display block
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
            position absolute
            left -1px
            top 100%
            width 100%
            border 1px solid transparent
            background #fff
            z-index 1
            li
              height 32px
              line-height 32px
              text-align center
              &:hover
                color #333333
                background #dddddd
                cursor pointer
        .search_key
          width 142px
          height 100%
          border 1px solid #83809F
          border-left none
          display flex
          align-items center
          justify-content center
          color #999999
          input
            width 110px
            background transparent
            color #666666
            font-size 14px
          i
            cursor pointer

</style>
