/*
包含n个接口请求函数的模块
函数的返回值: promise对象
 */
import ajax from './ajax'
import { BASE_URL } from '@/assets/js/config.js'

export const ERR_OK = 0
// 首页获取需求&成果
export const getAllForHomePage = () => ajax(BASE_URL + '/api/ResourcePool/GetAllForHomePage')
// 用户登出
export const reqLogout = () => ajax(BASE_URL + '/api/Customer/Logout')
// 注册发送短信验证码
export const reqSendCodeRegister = (Mobile, recaptcha) => ajax(BASE_URL + '/api/Customer/GetSmsCode4Register', { Mobile, recaptcha_challenge_field: recaptcha }, 'POST')
// 注册账号
export const reqRegister = (Mobile, Password, ConfirmPassword, SmsValidCode) => ajax(BASE_URL + '/api/Customer/Register', { Mobile, Password, ConfirmPassword, SmsValidCode }, 'POST')
// 短信登录送短信验证码
export const reqSendCodeLoginMsg = (Mobile, recaptcha) => ajax(BASE_URL + '/api/Customer/GetSmsCode4Login', { Mobile, recaptcha_challenge_field: recaptcha }, 'POST')
// 短信登录
export const reqMsgLogin = (Mobile, SmsValidCode) => ajax(BASE_URL + '/api/Customer/SmsLogin', { Mobile, SmsValidCode }, 'POST')
// 获取用户的登录信息
export const getUserInfos = () => ajax(BASE_URL + '/api/Customer/GetCurCustomer')
// 账号密码登录
export const reqPwdLogin = (Mobile, Password, recaptcha) => ajax(BASE_URL + '/api/Customer/login', { Mobile, Password, recaptcha_challenge_field: recaptcha }, 'POST')
// 找回密码发送短信验证码
export const reqSendCodeFindPwd = (Mobile, recaptcha) => ajax(BASE_URL + '/api/Customer/GetSmsCode4FindPwd', { Mobile, recaptcha_challenge_field: recaptcha }, 'POST')
// 找回密码Step1-身份验证
export const reqFindPwdIdAuth = (Mobile, SmsValidCode) => ajax(BASE_URL + '/api/Customer/FindPwdIdAuth', { Mobile, SmsValidCode }, 'POST')
// 找回密码Step2-重置密码
export const reqFindPwdSetPwd = (Password, ConfirmPassword) => ajax(BASE_URL + '/api/Customer/FindPwdSetPwd', { Password, ConfirmPassword }, 'POST')
// ! 用户中心
// 用户基本信息修改
export const reqUpdateCustomerInfo = (Name, Email, Enterprise, Duty) => ajax(BASE_URL + '/api/Customer/UpdateCustomerInfo', { Name, Email, Enterprise, Duty }, 'POST')
// 修改密码
export const reqChangePassword = (OldPassword, NewPassword, ConfirmNewPassword) => ajax(BASE_URL + '/api/Customer/ChangePassword', { OldPassword, NewPassword, ConfirmNewPassword }, 'POST')

// 用户新增技术需求
export const reqAddTechReq = (obj) => ajax(BASE_URL + '/api/ResourcePool/AddTechReq', {
  Name: obj.Name,
  InvestmentScale: obj.InvestmentScale,
  InstitutionName: obj.InstitutionName,
  IndustryField: obj.IndustryField,
  CoopWay: obj.CoopWay,
  Introduction: obj.Introduction,
  CName: obj.CName,
  CMobile: obj.CMobile,
  CEmail: obj.CEmail,
  Id: obj.Id
}, 'POST')
// 用户新增科技成果
export const reqAddTechAchi = (obj) => ajax(BASE_URL + '/api/ResourcePool/AddTechAchi', {
  Name: obj.Name,
  InstitutionName: obj.InstitutionName,
  IndustryField: obj.IndustryField,
  CoopWay: obj.CoopWay,
  Introduction: obj.Introduction,
  CName: obj.CName,
  CMobile: obj.CMobile,
  CEmail: obj.CEmail,
  Id: obj.Id
}, 'POST')
// 用户新增专利成果
export const reqAddPatentAchie = (obj) => ajax(BASE_URL + '/api/ResourcePool/AddPatentAchie', {
  Name: obj.Name,
  Patentee: obj.Patentee,
  IndustryField: obj.IndustryField,
  CoopWay: obj.CoopWay,
  Introduction: obj.Introduction,
  CName: obj.CName,
  CMobile: obj.CMobile,
  CEmail: obj.CEmail,
  Id: obj.Id
}, 'POST')
// 用户新增人才需求
export const reqAddTaleRequ = (obj) => ajax(BASE_URL + '/api/ResourcePool/AddTaleRequ', {
  Position: obj.Position,
  ProfessionalTitle: obj.ProfessionalTitle,
  IndustryField: obj.IndustryField,
  JobRequirement: obj.JobRequirement,
  JobDuties: obj.JobDuties,
  CName: obj.CName,
  CMobile: obj.CMobile,
  CEmail: obj.CEmail,
  Id: obj.Id
}, 'POST')
// 用户新增专家
export const reqAddExpert = (obj) => ajax(BASE_URL + '/api/ResourcePool/AddExpert', {
  Name: obj.Name,
  InstitutionName: obj.InstitutionName,
  IndustryField: obj.IndustryField,
  ResearchDirection: obj.ResearchDirection,
  ProfessionalTitle: obj.ProfessionalTitle,
  Introduction: obj.Introduction,
  CName: obj.CName,
  CMobile: obj.CMobile,
  CEmail: obj.CEmail,
  Id: obj.Id
}, 'POST')
// 上传计划url
// export const uploadUrl = BASE_URL + '/api/ResourcePool/BPUpload'

// --------------------------------------------------------------------------------------------

// 获取技术需求列表
export const getTechList = (SearchRequirementName, SearchIndustryField, PageNumber, PageSize) => ajax(BASE_URL + '/api/ResourcePool/TechReqSearch', { SearchRequirementName, SearchIndustryField, PageNumber, PageSize }, 'POST')
// 获取科技成果列表
export const getScienList = (SearchAchivementName, SearchIndustryField, SearchProposedCooperationWay, PageNumber, PageSize) => ajax(BASE_URL + '/api/ResourcePool/TechAchiSearch', { SearchAchivementName, SearchIndustryField, SearchProposedCooperationWay, PageNumber, PageSize }, 'POST')
// 获取专利成果列表
export const getPatentList = (SearchPatentName, SearchIndustryField, SearchProposedCooperationWay, PageNumber, PageSize) => ajax(BASE_URL + '/api/ResourcePool/PatentAchieSearch', { SearchPatentName, SearchIndustryField, SearchProposedCooperationWay, PageNumber, PageSize }, 'POST')
// 获取人才需求列表
export const getTalentList = (SearchPosition, SearchIndustryField, PageNumber, PageSize) => ajax(BASE_URL + '/api/ResourcePool/TaleRequSearch', { SearchPosition, SearchIndustryField, PageNumber, PageSize }, 'POST')
// 获取专家列表
export const getExpertList = (SearchResearchDirection, SearchIndustryField, PageNumber, PageSize) => ajax(BASE_URL + '/api/ResourcePool/ExpertSearch', { SearchResearchDirection, SearchIndustryField, PageNumber, PageSize }, 'POST')

// 获取技术需求详情
export const getTechDetail = (id) => ajax(BASE_URL + '/api/ResourcePool/GetTechReqDetail', { id })
// 获取科技成果详情
export const getScienDetail = (id) => ajax(BASE_URL + '/api/ResourcePool/GetTechAchiDetail', { id })
// 获取专利成果详情
export const getPatentDetail = (id) => ajax(BASE_URL + '/api/ResourcePool/GetPatentAchieDetail', { id })
// 获取人才需求详情
export const getTalentDetail = (id) => ajax(BASE_URL + '/api/ResourcePool/TaleRequDetail', { id })
// 获取专家详情
export const getExpertDetail = (id) => ajax(BASE_URL + '/api/ResourcePool/GetExpertDetail', { id })

// 获取当前用户的技术需求
export const getUserTech = (pageNumber, pageSize) => ajax(BASE_URL + '/api/ResourcePool/GetCustomerTechnicalRequirements', { pageNumber, pageSize })
// 获取当前用户的科技成果
export const getUserScien = (pageNumber, pageSize) => ajax(BASE_URL + '/api/ResourcePool/GetCustomerTechAchievements', { pageNumber, pageSize })
// 获取当前用户的专利成果
export const getUserPatent = (pageNumber, pageSize) => ajax(BASE_URL + '/api/ResourcePool/GetCustomerPatentAchievements', { pageNumber, pageSize })
// 获取当前用户的人才需求
export const getUserTalent = (pageNumber, pageSize) => ajax(BASE_URL + '/api/ResourcePool/CustomerTaleRequ', { pageNumber, pageSize })
// 获取当前用户的专家
export const getUserExpert = (pageNumber, pageSize) => ajax(BASE_URL + '/api/ResourcePool/GetCustomerExperts', { pageNumber, pageSize })

// 删除当前用户的技术需求
export const delUserTech = (id) => ajax(BASE_URL + '/api/ResourcePool/DelTechReq', { id })
// 删除当前用户的科技成果
export const delUserScien = (id) => ajax(BASE_URL + '/api/ResourcePool/DelTechAchi', { id })
// 删除当前用户的专利成果
export const delUserPatent = (id) => ajax(BASE_URL + '/api/ResourcePool/DelPatentAchie', { id })
// 删除当前用户的人才需求
export const delUserTalent = (id) => ajax(BASE_URL + '/api/ResourcePool/DelTaleRequ', { id })
// 删除当前用户的专家
export const delUserExpert = (id) => ajax(BASE_URL + '/api/ResourcePool/DelPatentAchieExpert', { id })

// --------------------------------------------------------------------------------------------

// 获取新闻分类
export const getNewsCategories = () => ajax(BASE_URL + '/api/News/GetAllNewsCategories')
// 获取新闻分类下新闻列表
export const getNewsList = (CategoryId, PageNumber, PageSize) => ajax(BASE_URL + '/api/News/GetNewsByNewsCategoryId', { CategoryId, PageNumber, PageSize }, 'POST')
// 获取新闻分类下新闻详情
export const getNewsDetail = (newsId) => ajax(BASE_URL + '/api/News/GetNewsDetail', { newsId })
