<template>
  <div class="listDetail">
    <p class="listDetail_title">详情</p>
    <ul v-show="showBol">
      <li v-for='(value, key, index) of map' :key="index">
        <label><span>{{value}}:</span></label>
        <p v-html = 'detail[key]'></p>
      </li>
    </ul>
  </div>
</template>

<script>
import {getUrlParams, IsPosInteNum} from 'common/js/utils.js'
import {getTechDetail, getScienDetail, getPatentDetail, getTalentDetail, getExpertDetail} from 'api/index.js'
const techMap = {
  'Name': '需求名称',
  'InvestmentScale': '拟投资规模',
  'InstitutionName': '单位名称',
  'IndustryField': '行业领域',
  'CoopWay': '拟合作方式',
  'CName': '联系人',
  'CMobile': '手机号',
  'CEmail': '邮箱',
  'Introduction': '技术需求介绍'
}
const scienMap = {
  'Name': '成果名称',
  'InstitutionName': '成果单位',
  'IndustryField': '行业领域',
  'CoopWay': '拟合作方式',
  'Introduction': '科技成果介绍',
  'CName': '联系人',
  'CMobile': '手机号',
  'CEmail': '邮箱'
}
const patentMap = {
  'Name': '专利名称',
  'Patentee': '专利权人',
  'IndustryField': '行业领域',
  'CoopWay': '拟合作方式',
  'Introduction': '专利成果介绍',
  'CName': '联系人',
  'CMobile': '手机号',
  'CEmail': '邮箱'
}
const talentMap = {
  'Position': '职位名称',
  'ProfessionalTitle': '职称要求',
  'IndustryField': '行业领域',
  'JobRequirement': '职位要求',
  'JobDuties': '工作职责',
  'CName': '联系人',
  'CMobile': '手机号',
  'CEmail': '邮箱'
}
const expertMap = {
  'Name': '专家姓名',
  'InstitutionName': '所在单位',
  'IndustryField': '行业领域',
  'CMobile': '手机号',
  'CEmail': '邮箱',
  'ResearchDirection': '研究方向',
  'ProfessionalTitle': '职称',
  'Introduction': '个人介绍'
}
export default {
  name: 'BookDetail',
  props: {
    bookType: String
  },
  data () {
    return {
      id: 0,
      detail: {},
      map: {},
      showBol: false
    }
  },
  methods: {
    getDetailSucc (res) {
      const data = res.Data
      if (data === null || data === {}) {
        window.location.href = 'page404.html'
      }
      this.detail = data
      this.showBol = true
      if (data.Introduction != null) {
        this.detail.Introduction = data.Introduction.replace(/\n/g, '</br>')
      }
      if (data.JobRequirement != null) {
        this.detail.JobRequirement = data.JobRequirement.replace(/\n/g, '</br>')
      }
      if (data.JobDuties != null) {
        this.detail.JobDuties = data.JobDuties.replace(/\n/g, '</br>')
      }
    }
  },
  created () {
    const params = getUrlParams()
    this.id = IsPosInteNum(parseInt(params['id'])) ? parseInt(params['id']) : this.id
    if (this.id === 0) {
      window.location.href = 'page404.html'
    }
    const type = this.bookType
    if (type === 'tech') {
      this.map = techMap
      getTechDetail(this.id).then((res) => {
        if (res.Code === 0 && res.Result) {
          this.getDetailSucc(res)
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
      this.map = scienMap
      getScienDetail(this.id).then((res) => {
        if (res.Code === 0 && res.Result) {
          this.getDetailSucc(res)
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
      this.map = patentMap
      getPatentDetail(this.id).then((res) => {
        if (res.Code === 0 && res.Result) {
          this.getDetailSucc(res)
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
      this.map = talentMap
      getTalentDetail(this.id).then((res) => {
        if (res.Code === 0 && res.Result) {
          this.getDetailSucc(res)
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
      this.map = expertMap
      getExpertDetail(this.id).then((res) => {
        if (res.Code === 0 && res.Result) {
          this.getDetailSucc(res)
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
  }
}
</script>

<style lang='stylus' scoped>
  .listDetail
    float right
    width 910px
    padding-bottom 66px
    min-height 672px
    border-radius 5px
    background #fff
    box-sizing border-box
    .listDetail_title
      height 50px
      line-height 50px
      text-indent 20px
      font-size 18px
      color #333
      font-weight bold
      border-bottom 1px solid #e8e8e8
    ul
      margin 0 17px 0 30px
      li
        margin-top 20px
        overflow hidden
        font-size 14px
        color #666
        >label
          float left
          width 104px
          text-align left
          line-height 20px
          span
            float left
            font-weight bold
        p
          float left
          margin-left 4px
          width 755px
          line-height 20px
</style>
