<template>
  <div class="libPanel">
    <p class="libPanel_title">{{curPos}}</p>
    <div class="libPanel_main">
      <div class="lib_desc">
        <p class="desc">{{desc}}</p>
        <br>
        <p class="PS"><span class="PSW">{{PSW}}</span></p>
      </div>
      <!-- 搜索区域 -->
      <div class="libSearch">
        <div class="keywordArea">
          <span>{{labelW}}：</span>
          <input type="text" :class="{long: !coopBol}" class="keywordInp" v-model="keyword">
        </div>
        <div class="realmArea">
          <span>行业领域：</span>
          <select class="realmSel" id="realmSel">
            <option v-for="item of realmArr" :value="item.value" :key="item.value" :selected="item.value == realmNO">{{item.text}}</option>
          </select>
        </div>
        <div class="coopArea" v-if="coopBol">
          <span>拟合作方式：</span>
          <select class="coopSel" id="coopSel">
            <option v-for="item of coopArr" :value="item.value" :key="item.value" :selected="item.value == coopNO">{{item.text}}</option>
          </select>
        </div>
        <a href="javascript:;" class="searchBtn" @click="search">搜索</a>
      </div>
      <!-- 列表区域 -->
      <div class="libList">
        <p class="libList_title">
          <span class="title1">{{title1}}</span>
          <span class="title2">行业领域</span>
          <span class="title3">{{title3}}</span>
        </p>
        <ul class="list" v-if="list.length > 0">
          <li v-for="item of list" :key="item.Id">
            <a :href="anchor + item.Id" target="_blank">
              <span v-for="(value, key) of item" :key="key" v-if="key !== 'Id'" :title="value">{{value}}</span>
            </a>
          </li>
        </ul>
        <p class="none" style="display: none">无数据</p>
      </div>
      <Pager :totalPage="totalPage" :curPage="curPage" :preBol="preBol" :nextBol="nextBol" @goPage='goP'></Pager>
    </div>
  </div>
</template>

<script>
import Pager from 'components/Pager/Pager.vue'
import {getUrlParams, goPage, storage, IsPosInteNum} from 'common/js/utils.js'
import {getTechList, getScienList, getPatentList, getTalentList, getExpertList} from 'api/index.js'

export default {
  name: 'LibPanel',
  props: {
    curPos: String,
    desc: String,
    PSW: String,
    libType: String,
    searchBol: Boolean
  },
  data () {
    return {
      labelW: '',
      keyword: '',
      coopBol: false,
      title1: '',
      title3: '',
      curPage: 1,
      totalPage: 1,
      pageSize: 20,
      list: [],
      preBol: true,
      nextBol: true,
      realmArr: [
        {value: '', text: '全部'},
        {value: 1, text: '电子信息与人工智能'},
        {value: 2, text: '高端制造与智能制造'},
        {value: 3, text: '新材料与化工'},
        {value: 4, text: '生物医药与生物工程'},
        {value: 5, text: '新能源与环保'},
        {value: 99, text: '其他'}
      ],
      coopArr: [
        {value: '', text: '全部'},
        {value: 1, text: '技术转让'},
        {value: 2, text: '许可生产'},
        {value: 4, text: '合作开发'},
        {value: 1024, text: '其他'}
      ],
      realmNO: '',
      coopNO: '',
      anchor: '',
      searA: ''
    }
  },
  methods: {
    getListSucc (res) {
      const data = res.Data
      this.list = data.Datas
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
    search () {
      if (this.searchBol) {
        let loginBol = storage.get('__login__')
        if (loginBol !== 'true') {
          this.$message({
            type: 'error',
            message: '请先登录',
            duration: 1500,
            onClose () {
              window.location.href = '/login.html'
            }
          })
        } else {
          let Str = ''
          Str += this.keyword !== '' ? '&keyword=' + this.keyword : ''
          let relamNO = document.getElementById('realmSel').value
          Str += relamNO !== '' ? '&relam=' + relamNO : ''
          if (document.getElementById('coopSel')) {
            let coopNO = document.getElementById('coopSel').value
            Str += coopNO !== '' ? '&coop=' + coopNO : ''
          }
          Str = Str !== '' ? '?' + Str : ''
          let newUrl = this.searA + Str
          window.location.href = encodeURI(newUrl)
        }
      }
    },
    goP (num) {
      goPage(num)
    }
  },
  created () {
    const params = getUrlParams()
    this.keyword = params['keyword'] !== undefined ? params['keyword'] : this.keyword
    this.realmNO = IsPosInteNum(parseInt(params['relam'])) ? params['relam'] : this.realmNO
    this.coopNO = IsPosInteNum(parseInt(params['coop'])) ? params['coop'] : this.coopNO
    this.curPage = IsPosInteNum(parseInt(params['page'])) ? parseInt(params['page']) : this.curPage
    const type = this.libType
    if (type === 'tech') {
      this.labelW = '需求名称'
      this.title1 = '需求名称'
      this.title3 = '拟投资规模'
      this.anchor = '/techDetail.html?id='
      this.searA = '/techList.html'
      getTechList(this.keyword, this.realmNO, this.curPage, this.pageSize).then((res) => {
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
    } else if (type === 'scien') {
      this.labelW = '成果名称'
      this.title1 = '成果名称'
      this.title3 = '拟合作方式'
      this.coopBol = true
      this.anchor = '/scienDetail.html?id='
      this.searA = '/scienList.html'
      getScienList(this.keyword, this.realmNO, this.coopNO, this.curPage, this.pageSize).then((res) => {
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
    } else if (type === 'patent') {
      this.labelW = '专利名称'
      this.title1 = '专利名称'
      this.title3 = '拟合作方式'
      this.coopBol = true
      this.anchor = '/patentDetail.html?id='
      this.searA = '/patentList.html'
      getPatentList(this.keyword, this.realmNO, this.coopNO, this.curPage, this.pageSize).then((res) => {
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
    } else if (type === 'talent') {
      this.labelW = '职位名称'
      this.title1 = '职位名称'
      this.title3 = '工作职责'
      this.anchor = '/talentDetail.html?id='
      this.searA = '/talentList.html'
      getTalentList(this.keyword, this.realmNO, this.curPage, this.pageSize).then((res) => {
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
    } else if (type === 'expert') {
      this.labelW = '研究方向'
      this.title1 = '专家名称'
      this.title3 = '研究方向'
      this.anchor = '/expertDetail.html?id='
      this.searA = '/expertList.html'
      getExpertList(this.keyword, this.realmNO, this.curPage, this.pageSize).then((res) => {
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
  components: {
    Pager
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/mixins.styl';
  .libPanel
    float right
    width 910px
    border-radius 5px
    background #fff
    .libPanel_title
      height 50px
      line-height 50px
      text-indent 20px
      font-size 18px
      color #333
      font-weight bold
      border-bottom 1px solid #e8e8e8
    .libPanel_main
      padding 20px
      box-sizing border-box
      width 910px
      .lib_desc
        width 100%
        padding 10px 18px 10px 10px
        box-sizing border-box
        background #F5F5F5
        p
          font-size 14px
          line-height 18px
          color #666
      .libSearch
        margin-left 10px
        margin-top 20px
        display flex
        height 32px
        line-height 32px
        >div
          span
            font-size 14px
            color #666
          input
            height 32px
            line-height 32px
            font-size 14px
            color #333
            padding-left 12px
            border-radius 3px
            border 1px solid #e8e8e8
            outline none
          select
            width 162px
            height 32px
            line-height 32px
            font-size 14px
            color #333
            padding-left 12px
            border-radius 3px
            border 1px solid #e8e8e8
            outline none
        .keywordArea
          input
            width 170px
          .long
            width 442px
        .realmArea
          margin-left 20px
        .coopArea
          margin-left 20px
        .searchBtn
          float right
          margin-left 20px
          width 52px
          height 32px
          line-height 32px
          font-size 14px
          text-align center
          color #fff
          background #C9151E
          border-radius 5px
      .libList
        margin-top 20px
        border-radius 3px
        border 1px solid #eaeaea
        box-sizing border-box
        .libList_title
          height 48px
          line-height 48px
          border-bottom 1px solid #e8e8e8
          span
            float left
            font-size 14px
            color #333
            font-weight bold
          .title1
            margin-left 20px
            width 434px
          .title2
            margin-left 28px
            width 126px
          .title3
            margin-left 76px
            width 126px
        ul
          li
            height 36px
            a
              display block
              height 36px
              line-height 36px
              span
                float left
                font-size 14px
                color #999
                overflow hidden
                text-overflow ellipsis
                white-space nowrap
              span:nth-of-type(1)
                margin-left 20px
                width 434px
              span:nth-of-type(2)
                margin-left 28px
                width 126px
              span:nth-of-type(3)
                margin-left 76px
                width 126px
          li:nth-child(odd)
            background #fff
          li:nth-child(even)
            background #F8F8F8
          li:hover a
            background #C9151E
          li:hover span
            color #fff
      .none
        line-height 36px
        text-align center
        font-size 14px
        color #999
</style>
