export const iconfontUrl = 'http:' + '//at.alicdn.com/t/font_852007_vo8kmkf2jkh.css'

export const BASE_URL = process.env.NODE_ENV === 'production' ? 'http://www.gaohangtt.com' : 'http://www.gaohangtt.com'

export const loadingDefaultOpts = {
  lock: true,
  text: '',
  background: 'rgba(0, 0, 0, 0.7)'
}

export const captchaImgType = {
  pwdLogin: 1,
  smsRegister: 2,
  smsLogin: 3,
  findPwd: 4
}

export const IndustryFieldOptions = [
  {
    key: 1,
    value: '电子信息与人工智能'
  },
  {
    key: 2,
    value: '高端装备与智能制造'
  },
  {
    key: 3,
    value: '新材料与化工'
  },
  {
    key: 4,
    value: '生物医药与生物工程'
  },
  {
    key: 5,
    value: '新能源与环保'
  },
  {
    key: 99,
    value: '其他'
  }
]
// 多选用的
export const CoopWayOptions = [
  {
    value: 1,
    label: '技术转让'
  },
  {
    value: 2,
    label: '许可生产'
  },
  {
    value: 4,
    label: '合作开发'
  },
  {
    value: 1024,
    label: '其他'
  }
]
export const ProfessionalTitleOptions = [
  {
    key: 1,
    value: '教授/研究员/教授级高工及以上'
  },
  {
    key: 2,
    value: '副教授/副研究员/高级工程师及以上'
  },
  {
    key: 3,
    value: '讲师/助理研究员/工程师及以上'
  },
  {
    key: 99,
    value: '其他'
  }
]

export const ProfessionalTitleOptionsExpert = [
  {
    key: 1,
    value: '教授/研究员/教授级高工'
  },
  {
    key: 2,
    value: '副教授/副研究员/高级工程师'
  },
  {
    key: 3,
    value: '讲师/助理研究员/工程师'
  },
  {
    key: 99,
    value: '其他'
  }
]
