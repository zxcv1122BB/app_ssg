import Vue from 'vue'
import $ from 'jquery'
import Router from 'vue-router'
import { Loading } from 'element-ui';

// import index from '@/components/index'

//竞技彩
// import qfhh from '@/components/bet/sg/qfhh'
// import qfdg from '@/components/bet/sg/qfdg'
// import fbsg from '@/components/bet/sg/fbsg'

// import qbhh from '@/components/bet/sg/qbhh'
// import qbdg from '@/components/bet/sg/qbdg'

// import sfc from '@/components/bet/sg/sfc'
// import rxnine from '@/components/bet/sg/rxnine'

// import sgHelp from '@/components/bet/sg/help'
// import basketDetail from '@/components/bet/sg/basketDetail'
// import detail from '@/components/bet/sg/detail'

//数字彩
// import ssc from '@/components/bet/ng/ssc'
// import threed from '@/components/bet/ng/threed'

// import bj28 from '@/components/bet/ng/bj28'
// import eleven5 from '@/components/bet/ng/eleven5'
// import k3 from '@/components/bet/ng/k3'
// import pk10 from '@/components/bet/ng/pk10'
// import qxc from '@/components/bet/ng/qxc'
// import xync from '@/components/bet/ng/xync'
// import award_page from '@/components/bet/ng/award_page'
// import trend from '@/components/bet/ng/trend'
// import lhc from '@/components/bet/ng/lhc'

//个人中心
// import login from '@/components/myCenter/login'
// import caiMore from '@/components/myCenter/caiMore'
// import moreMes from '@/components/myCenter/moreMes'
// import register from '@/components/myCenter/register'
// import setting from '@/components/myCenter/setting'
// import deposit from '@/components/myCenter/deposit'
// import share from '@/components/myCenter/share'
// import message from '@/components/myCenter/message'
// import mesContent from '@/components/myCenter/mesContent'
// import depositFile from '@/components/myCenter/depositFile'
// import enchashment from '@/components/myCenter/enchashment'
// import changePwd from '@/components/myCenter/changePwd'
// import company from '@/components/myCenter/company'
// import weChat from '@/components/myCenter/weChat'
// import ebank from '@/components/myCenter/ebank'
// import moneyPwd from '@/components/myCenter/moneyPwd'
// import userSign from '@/components/myCenter/userSign'
// import activity from '@/components/myCenter/activity'
// import ticketDetails from '@/components/myCenter/ticketDetails'
// import footFundDetails from '@/components/myCenter/footFundDetails'
// import bettingRecord from '@/components/myCenter/bettingRecord'
// import userPerfectInfo from '@/components/myCenter/userPerfectInfo'
//首页信息
// import announcement from '@/components/message/announcement'
// import winningDetails from '@/components/message/winningDetails'

//开奖
// import jclq from '@/components/tab/startlotto/jclq'
// import jczq from '@/components/tab/startlotto/jczq'
// import zqdc from '@/components/tab/startlotto/zqdc'
// import sfc_rxnine from '@/components/tab/startlotto/sfc_rxnine'

//彩票资讯
// import information from '@/components/tab/sundry/information'
// import live from '@/components/tab/sundry/live'

//客服
// import customerService from '@/components/service/customerService'
// import onlineService from '@/components/service/onlineService'


//红包页面
// import fetchRedPacket from '@/components/tab/sundry/fetchRedPacket'
//投注规则
// import rule from '@/components/tab/sundry/rule'
//中转页
// import transfer from '@/components/tab/sundry/transfer'

Vue.use(Router);
const router= new Router({
  // mode: 'history',
  routes: [
    {
      path: '/myCenter',
      name: 'memCen',
      // component: index,
      component: resolve => require.ensure([], () => resolve(require('@/components/myCenter/memCen.vue')), 'memCen'),
    },
    {
      path: '/',
      name: 'index',
      // component: index,
      component: resolve => require.ensure([], () => resolve(require('@/components/index')), 'index'),
    },
    //代理中心
    {
      path: '/agency/agencyCenter',
      name: 'agencyCenter',
      component: resolve => require.ensure([], () => resolve(require('@/components/agency/agencyCenter')), 'agencyCenter'),
      beforeEnter: (to, from, next) => {
        if (!from.name) {
          next({ path: '/' })
        } else { next() }
      }
    },
    //代理中心--下级开户
    {
      path: '/agency/downAccount',
      name: 'downAccount',
      component: resolve => require.ensure([], () => resolve(require('@/components/agency/downAccount')), 'downAccount'),
      beforeEnter: (to, from, next) => {
        if (!from.name) {
          next({ path: '/' })
        } else { next() }
      }
    },
    //代理中心--返点赔率表
    {
      path: '/agency/agencyRebateList',
      name: 'agencyRebateList',
      component: resolve => require.ensure([], () => resolve(require('@/components/agency/agencyRebateList')), 'agencyRebateList'),

    },
    //代理中心--代理说明
    {
      path: '/agency/agentIntro',
      name: 'agentIntro',
      component: resolve => require.ensure([], () => resolve(require('@/components/agency/agentIntro')), 'agentIntro'),
      beforeEnter: (to, from, next) => {
        if (!from.name) {
          next({ path: '/' })
        } else { next() }
      }
    },
    //代理中心--会员管理
    {
      path: '/agency/agentMember',
      name: 'agentMember',
      component: resolve => require.ensure([], () => resolve(require('@/components/agency/agentMember')), 'agentMember'),
      beforeEnter: (to, from, next) => {
        if (!from.name) {
          next({ path: '/' })
        } else { next() }
      }
    },
    //代理中心--代理报表
    {
      path: '/agency/agentReport',
      name: 'agentReport',
      component: resolve => require.ensure([], () => resolve(require('@/components/agency/agentReport')), 'agentReport'),
      beforeEnter: (to, from, next) => {
        if (!from.name) {
          next({ path: '/' })
        } else { next() }
      }
    },
    //代理中心--下级报表
    {
      path: '/agency/lowerReport',
      name: 'lowerReport',
      component: resolve => require.ensure([], () => resolve(require('@/components/agency/lowerReport')), 'lowerReport'),
      beforeEnter: (to, from, next) => {
        if (!from.name) {
          next({ path: '/' })
        } else { next() }
      }
    },
    //代理中心--投注明细
    {
      path: '/agency/agencyBetDetail',
      name: 'agencyBetDetail',
      component: resolve => require.ensure([], () => resolve(require('@/components/agency/agencyBetDetail')), 'agencyBetDetail'),
      beforeEnter: (to, from, next) => {
        if (!from.name) {
          next({ path: '/' })
        } else { next() }
      }
    },
    //代理中心--交易明细
    {
      path: '/agency/agencyDealDetail',
      name: 'agencyDealDetail',
      component: resolve => require.ensure([], () => resolve(require('@/components/agency/agencyDealDetail')), 'agencyDealDetail'),
      beforeEnter: (to, from, next) => {
        if (!from.name) {
          next({ path: '/' })
        } else { next() }
      }
    },
    //聊天室
    {
      path: '/chat/wChat',
      name: 'wChat',
      // component: login,
      component: resolve => require.ensure([], () => resolve(require('@/components/chat/wChat')), 'wChat'),
      beforeEnter: (to, from, next) => {
        if (!from.name) {
          next({ path: '/' })
        } else { next() }
      }
    },
    {
      path: '/chat/chat/:chatName',
      name: 'chat',
      // component: login,
      component: resolve => require.ensure([], () => resolve(require('@/components/chat/chat')), 'chat'),
      beforeEnter: (to, from, next) => {
        if (!from.name) {
          next({ path: '/' })
        } else { next() }
      }
    },
    {
      path: '/chat/chatUser',
      name: 'chatUser',
      // component: login,
      component: resolve => require.ensure([], () => resolve(require('@/components/chat/chatUser')), 'chatUser'),
      beforeEnter: (to, from, next) => {
        if (!from.name) {
          next({ path: '/' })
        } else { next() }
      }
    },
    {
      path: '/chat/chatSetting/:id',
      name: 'chatSetting',
      // component: login,
      component: resolve => require.ensure([], () => resolve(require('@/components/chat/chatSetting')), 'chatSetting'),
      beforeEnter: (to, from, next) => {
        if (!from.name) {
          next({ path: '/' })
        } else { next() }
      }
    },
    //个人中心
    {
      path: '/loginIn/login',
      name: 'login',
      // component: login,
      component: resolve => require.ensure([], () => resolve(require('@/components/myCenter/login')), 'login'),
      beforeEnter: (to, from, next) => {
        if (!from.name) {
          next({ path: '/' })
        } else { next() }
      }
    },
    {
      path: '/mycenter/moreMes/:id/:outOfThrity',
      name: 'moreMes',
      // component: moreMes,
      component: resolve => require.ensure([], () => resolve(require('@/components/myCenter/moreMes')), 'moreMes'),
      beforeEnter: (to, from, next) => {
        if (!from.name) {
          next({ path: '/' })
        } else {
          next()
        }
      }
    },
    {
      path: '/mycenter/caiMore/:id/:outOfThrity',
      name: 'caiMore',
      // component: caiMore,
      component: resolve => require.ensure([], () => resolve(require('@/components/myCenter/caiMore')), 'caiMore'),
      beforeEnter: (to, from, next) => {
        if (!from.name) {
          next({ path: '/' })
        } else {
          next()
        }
      }
    },
    {
      path: '/myCenter/register',
      name: 'register',
      // component: register,
      component: resolve => require.ensure([], () => resolve(require('@/components/myCenter/register')), 'register'),
      beforeEnter: (to, from, next) => {
        if (!from.name) {
          next({ path: '/' })
        } else {
          next()
        }
      }
    },
//  {
//    path: '/myCenter/registerFree',
//    name: 'registerFree',
//    // component: register,
//    component: resolve => require.ensure([], () => resolve(require('@/components/myCenter/registerFree')), 'webApp'),
//    beforeEnter: (to, from, next) => {
//      if (!from.name) {
//        next({ path: '/' })
//      } else {
//        next()
//      }
//    }
//  },
    {
      path: '/myCenter/setting',
      name: 'setting',
      // component: setting,
      component: resolve => require.ensure([], () => resolve(require('@/components/myCenter/setting')), 'setting'),
      beforeEnter: (to, from, next) => {
        if (!from.name) {
          next({ path: '/' })
        } else {
          next()
        }
      }
    },
    {
      path: '/mycenter/activity',
      name: 'activity',
      // component: activity,
      component: resolve => require.ensure([], () => resolve(require('@/components/myCenter/activity')), 'activity'),
      beforeEnter: (to, from, next) => {
        if (!from.name) {
          next({ path: '/' })
        } else {
          next()
        }
      }
    },
    {
      path: '/mycenter/ticketDetails/:id/:typeId',
      name: 'ticketDetails',
      // component: ticketDetails,
      component: resolve => require.ensure([], () => resolve(require('@/components/myCenter/ticketDetails')), 'ticketDetails'),
      beforeEnter: (to, from, next) => {
        if (!from.name) {
          next({ path: '/' })
        } else {
          next()
        }
      }
    },
    {
      path: '/myCenter/deposit',
      name: 'deposit',
      // component: deposit,
      component: resolve => require.ensure([], () => resolve(require('@/components/myCenter/deposit')), 'deposit'),
      beforeEnter: (to, from, next) => {
        if (!from.name) {
          next({ path: '/' })
        } else {
          next()
        }
      }
    },
    {
      path: '/myCenter/psdetail',
      name: 'psdetail',
      // component: psdetail,
      component: resolve => require.ensure([], () => resolve(require('@/components/myCenter/psdetail')), 'psdetail'),
      beforeEnter: (to, from, next) => {
        if (!from.name) {
          next({ path: '/' })
        } else {
          next()
        }
      }
    },
    {
      path: '/myCenter/rcdetail',
      name: 'rcdetail',
      component: resolve => require.ensure([], () => resolve(require('@/components/myCenter/rcdetail')), 'rcdetail'),
      beforeEnter: (to, from, next) => {
        if (!from.name) {
          next({ path: '/' })
        } else {
          next()
        }
      }
    },
    {
      path: '/myCenter/share',
      name: 'share',
      // component: share,
      component: resolve => require.ensure([], () => resolve(require('@/components/myCenter/share')), 'share'),
      beforeEnter: (to, from, next) => {
        if (!from.name) {
          next({ path: '/' })
        } else {
          next()
        }
      }
    },
    {
      path: '/myCenter/message',
      name: 'message',
      // component: message,
      component: resolve => require.ensure([], () => resolve(require('@/components/myCenter/message')), 'message'),
      beforeEnter: (to, from, next) => {
        if (!from.name) { next({ path: '/' }) } else { next() }
      }
    },
    {
      path: '/myCenter/mesContent',
      name: 'mesContent',
      // component: mesContent,
      component: resolve => require.ensure([], () => resolve(require('@/components/myCenter/mesContent')), 'mesContent'),
      beforeEnter: (to, from, next) => {
        if (!from.name) { next({ path: '/' }) } else { next() }
      }
    },
    {
      path: '/myCenter/depositFile',
      name: 'depositFile',
      // component: depositFile,
      component: resolve => require.ensure([], () => resolve(require('@/components/myCenter/depositFile')), 'depositFile'),
      beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    },
    {
      path: '/myCenter/enchashment',
      name: 'enchashment',
      // component: enchashment,
      component: resolve => require.ensure([], () => resolve(require('@/components/myCenter/enchashment')), 'enchashment'),
      beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    },
    {
      path: '/myCenter/company',
      name: 'company',
      // component: company,
      component: resolve => require.ensure([], () => resolve(require('@/components/myCenter/company')), 'company'),
      beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    },
    {
      path: '/myCenter/weChat',
      name: 'weChat',
      // component: weChat,
      component: resolve => require.ensure([], () => resolve(require('@/components/myCenter/weChat')), 'weChat'),
      beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    },
    {
      path: '/myCenter/ebank',
      name: 'ebank',
      // component: ebank,
      component: resolve => require.ensure([], () => resolve(require('@/components/myCenter/ebank')), 'ebank'),
      beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    },
    // {
    //   path: '/mycenter/activity',
    //   name: 'activity',
    //   component: activity,
    //   beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    // },
    {
      path: '/mycenter/changePwd',
      name: 'changePwd',
      // component: changePwd,
      component: resolve => require.ensure([], () => resolve(require('@/components/myCenter/changePwd')), 'changePwd'),
      beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    },
    {
      path: '/mycenter/moneyPwd',
      name: 'moneyPwd',
      // component: moneyPwd,
      component: resolve => require.ensure([], () => resolve(require('@/components/myCenter/moneyPwd')), 'moneyPwd'),
      beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    },
    {
      path: '/mycenter/bindCard',
      name: 'bindCard',
      // component: moneyPwd,
      component: resolve => require.ensure([], () => resolve(require('@/components/myCenter/bindCard')), 'bindCard'),
      beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    },
    {
      path: '/mycenter/userSign',
      name: 'userSign',
      // component: userSign,
      component: resolve => require.ensure([], () => resolve(require('@/components/myCenter/userSign')), 'userSign'),
      beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    },
    // {
    //   path: '/mycenter/ticketDetails',
    //   name: 'ticketDetails',
    //   component: ticketDetails,
    //   beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    // },
    {
      path: '/mycenter/bettingRecord/:status',
      name: 'bettingRecord',
      // component: bettingRecord,
      component: resolve => require.ensure([], () => resolve(require('@/components/myCenter/bettingRecord')), 'bettingRecord'),
      beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    },
    {
      path: '/message/announcement',
      name: 'announcement',
      // component: announcement,
      component: resolve => require.ensure([], () => resolve(require('@/components/message/announcement')), 'announcement'),
      beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    },
    {
      path: '/message/winningDetails',
      name: 'winningDetails',
      // component: winningDetails,
      component: resolve => require.ensure([], () => resolve(require('@/components/message/winningDetails')), 'winningDetails'),
      beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    },
    {

      path: '/mycenter/footFundDetails',
      name: 'footFundDetails',
      // component: footFundDetails,
      component: resolve => require.ensure([], () => resolve(require('@/components/myCenter/footFundDetails')), 'footFundDetails'),
      beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    },
    {

      path: '/mycenter/rechargeRecord',
      name: 'rechargeRecord',
      // component: footFundDetails,
      component: resolve => require.ensure([], () => resolve(require('@/components/myCenter/rechargeRecord')), 'rechargeRecord'),
      beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    },
    {

      path: '/mycenter/presentRecord',
      name: 'presentRecord',
      // component: footFundDetails,
      component: resolve => require.ensure([], () => resolve(require('@/components/myCenter/presentRecord')), 'presentRecord'),
      beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    },
    {
      path: '/mycenter/userPerfectInfo',
      name: 'userPerfectInfo',
      // component: userPerfectInfo,
      component: resolve => require.ensure([], () => resolve(require('@/components/myCenter/userPerfectInfo')), 'userPerfectInfo'),
      beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    },
    //数字彩
    {
      path: '/ng/ssc/:num',
      // path: '/ssc/ssc#6',
      name: 'ssc',
      // component: ssc,
      component: resolve => require.ensure([], () => resolve(require('@/components/bet/ng/nssc')), 'ssc'),
      beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    },
    // {
    //   path: '/ng/ssc/6',
    //   // path: '/ssc/ssc#6',
    //   name: 'ssc',
    //   // component: ssc,
    //   component: resolve => require.ensure([], () => resolve(require('@/components/bet/ng/ssc')), 'webApp'),
    //   beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    // },
    // {
    //   path: '/ng/ssc/13',
    //   // path: '/ssc/ssc#13',
    //   name: 'ssc',
    //   // component: ssc,
    //   component: resolve => require.ensure([], () => resolve(require('@/components/bet/ng/ssc')), 'webApp'),
    //   beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    // },
    // {
    //   path: '/ng/ssc/14',
    //   // path: '/ssc/ssc#14',
    //   name: 'ssc',
    //   // component: ssc,
    //   component: resolve => require.ensure([], () => resolve(require('@/components/bet/ng/ssc')), 'webApp'),
    //   beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    // },
    {
      path: '/ng/threed/:num',
      // path: '/3d/3d#5',
      name: 'threed',
      // component: threed,
      component: resolve => require.ensure([], () => resolve(require('@/components/bet/ng/nthreed')), 'threed'),
      beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    },
    // {
    //   path: '/ng/threed/5',
    //   // path: '/3d/3d#5',
    //   name: 'threed',
    //   // component: threed,
    //   component: resolve => require.ensure([], () => resolve(require('@/components/bet/ng/threed')), 'webApp'),
    //   beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    // },
    // {

    //   path: '/ng/threed/19',
    //   // path: '/3d/3d#19',
    //   name: 'threed',
    //   // component: threed,
    //   component: resolve => require.ensure([], () => resolve(require('@/components/bet/ng/threed')), 'webApp'),
    //   beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    // },
    {
      // path: '/bet/ng/award_page',
      path: '/tab/award_page',
      name: 'award_page',
      // component: award_page ,
      component: resolve => require.ensure([], () => resolve(require('@/components/bet/ng/naward_page')), 'award_page'),
      beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    },
    {
      path: '/ng/bj28/:num',
      name: 'bj28',
      // component: bj28,
      component: resolve => require.ensure([], () => resolve(require('@/components/bet/ng/nbj28')), 'bj28'),
      beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    },
    // {
    //     path: '/ng/ahk3',
    //   // path: '/ssc/ah_fast3',
    //     name: 'ahk3',
    //     component: ahk3
    // ,beforeEnter:(to,from,next)=>{         if(!from.name){           next({path:'/'})         } else { next()}       }     },
     {
      path: '/ng/k3/:num',  //安徽快三
      // path: '/ssc/ah_fast3',
      name: 'k3',
      // component: k3,
       component: resolve => require.ensure([], () => resolve(require('@/components/bet/ng/nk3')), 'k3'),
      beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    },
    // {
    //   path: '/ng/k3/11',  //安徽快三
    //   // path: '/ssc/ah_fast3',
    //   name: 'k3',
    //   // component: k3,
    //   component: resolve => require.ensure([], () => resolve(require('@/components/bet/ng/k3')), 'webApp'),
    //   beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    // },
    // {
    //   path: '/ng/k3/20',  //北京快三
    //   // path: '/ssc/ah_fast3',
    //   name: 'k3',
    //   // component: k3,
    //   component: resolve => require.ensure([], () => resolve(require('@/components/bet/ng/k3')), 'webApp'),
    //   beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    // },
    // {
    //   path: '/ng/k3/21',  //广西快三
    //   // path: '/ssc/ah_fast3',
    //   name: 'k3',
    //   // component: k3,
    //   component: resolve => require.ensure([], () => resolve(require('@/components/bet/ng/k3')), 'webApp'),
    //   beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    // },
    // {
    //   path: '/ng/k3/22',  //湖北快三
    //   // path: '/ssc/ah_fast3',
    //   name: 'k3',
    //   // component: k3,
    //   component: resolve => require.ensure([], () => resolve(require('@/components/bet/ng/k3')), 'webApp'),
    //   beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    // },
    // {
    //   path: '/ng/k3/23',  //江苏快三
    //   // path: '/ssc/ah_fast3',
    //   name: 'k3',
    //   // component: k3,
    //   component: resolve => require.ensure([], () => resolve(require('@/components/bet/ng/k3')), 'webApp'),
    //   beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    // },
    // {
    //   path: '/ng/k3/24',  //上海快三
    //   // path: '/ssc/ah_fast3',
    //   name: 'k3',
    //   // component: k3,
    //   component: resolve => require.ensure([], () => resolve(require('@/components/bet/ng/k3')), 'webApp'),
    //   beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    // },
    // {
    //   path: '/ng/k3/25',  //江西快三
    //   // path: '/ssc/ah_fast3',
    //   name: 'k3',
    //   // component: k3,
    //   component: resolve => require.ensure([], () => resolve(require('@/components/bet/ng/k3')), 'webApp'),
    //   beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    // },
    {
      path: '/ng/pk10/:num',
      // path: '/ssc/pk10#8',
      name: 'pk10',
      // component: pk10,
      component: resolve => require.ensure([], () => resolve(require('@/components/bet/ng/npk10')), 'pk10'),
      beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    },
    // {
    //   path: '/ng/pk10/8',
    //   // path: '/ssc/pk10#8',
    //   name: 'pk10',
    //   // component: pk10,
    //   component: resolve => require.ensure([], () => resolve(require('@/components/bet/ng/pk10')), 'webApp'),
    //   beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    // },
    // {
    //   path: '/ng/pk10/15',
    //   // path: '/ssc/pk10#15',
    //   name: 'pk10',
    //   // component: pk10,
    //   component: resolve => require.ensure([], () => resolve(require('@/components/bet/ng/pk10')), 'webApp'),
    //   beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    // }
    // ,
    {
      path: '/ng/qxc/:num',
      // path: '/sxync/qxc',
      name: 'qxc',
      // component: qxc,
      component: resolve => require.ensure([], () => resolve(require('@/components/bet/ng/nqxc')), 'qxc'),
      beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    }
    ,
    {
      path: '/ng/xync/:num',  //幸运农场
      // path: '/sxync/xync',
      name: 'xync',
      // component: xync,
      component: resolve => require.ensure([], () => resolve(require('@/components/bet/ng/nxync')), 'xync'),
      beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    },
    // {
    //   path: '/ng/xync/10',  //幸运农场
    //   // path: '/sxync/xync',
    //   name: 'xync',
    //   // component: xync,
    //   component: resolve => require.ensure([], () => resolve(require('@/components/bet/ng/xync')), 'webApp'),
    //   beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    // },
    // {
    //   path: '/ng/xync/26',  //广东快乐十分
    //   // path: '/sxync/xync',
    //   name: 'xync',
    //   // component: xync,
    //   component: resolve => require.ensure([], () => resolve(require('@/components/bet/ng/xync')), 'webApp'),
    //    beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    // },
    // {
    //   path: '/ng/xync/27',  //天津快乐十分
    //   // path: '/sxync/xync',
    //   name: 'xync',
    //   // component: xync,
    //   component: resolve => require.ensure([], () => resolve(require('@/components/bet/ng/xync')), 'webApp'),
    //    beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    // },
    // {
    //   path: '/ng/xync/28',  //湖南快乐十分
    //   // path: '/sxync/xync',
    //   name: 'xync',
    //   // component: xync,
    //   component: resolve => require.ensure([], () => resolve(require('@/components/bet/ng/xync')), 'webApp'),
    //   beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    // },
    // {
    //   path: '/ng/xync/29',  //广西快乐十分
    //   // path: '/sxync/xync',
    //   name: 'xync',
    //   // component: xync ,
    //   component: resolve => require.ensure([], () => resolve(require('@/components/bet/ng/xync')), 'webApp'),
    //   beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    // },
    // {
    //   path: '/ng/xync/30',  //黑龙江快乐十分
    //   // path: '/sxync/xync',
    //   name: 'xync',
    //   // component: xync,
    //   component: resolve => require.ensure([], () => resolve(require('@/components/bet/ng/xync')), 'webApp'),
    //   beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    // },
    //11选5
    {
      path: '/ng/eleven5/:num',
      // path: '/ssc/eleven5#7',
      name: 'eleven5',
      // component: eleven5,
      component: resolve => require.ensure([], () => resolve(require('@/components/bet/ng/neleven5')), 'eleven5'),
      beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    },
    // {
    //   path: '/ng/eleven5/7',
    //   // path: '/ssc/eleven5#7',
    //   name: 'eleven5',
    //   // component: eleven5,
    //   component: resolve => require.ensure([], () => resolve(require('@/components/bet/ng/eleven5')), 'webApp'),
    //   beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    // },
    // {
    //   path: '/ng/eleven5/16',
    //   // path: '/ssc/eleven5#16',
    //   name: 'eleven5',
    //   // component: eleven5,
    //   component: resolve => require.ensure([], () => resolve(require('@/components/bet/ng/eleven5')), 'webApp'),
    //   beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    // },
    // {
    //   path: '/ng/eleven5/17',
    //   // path: '/ssc/eleven5#17',
    //   name: 'eleven5',
    //   // component: eleven5,
    //   component: resolve => require.ensure([], () => resolve(require('@/components/bet/ng/eleven5')), 'webApp'),
    //    beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    // },
    // {
    //   path: '/ng/eleven5/18',
    //   // path: '/ssc/eleven5#18',
    //   name: 'eleven5',
    //   // component: eleven5,
    //   component: resolve => require.ensure([], () => resolve(require('@/components/bet/ng/eleven5')), 'webApp'),
    //    beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    // },

    {
      path: '/ng/trend',
      name: 'trend',
      // component: trend,
      component: resolve => require.ensure([], () => resolve(require('@/components/bet/ng/trend.vue')), 'trend'),
       beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    },

    {
      path: '/ng/lhc/:num',
      name: 'lhc',
      // component: lhc,
      component: resolve => require.ensure([], () => resolve(require('@/components/bet/ng/nlhc')), 'lhc'),
       beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    },

    //竞技彩--竞足
    // {
    //   // path: '/bet/sg/qfhh',
    //   path: '/quizzesFootbal/qfhh',
    //   name: 'qfhh',
    //   // component: qfhh,
    //   component: resolve => require.ensure([], () => resolve(require('@/components/bet/sg/qfhh')), 'quizzesFootbal'),
    //    beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    // },
    // {
    //   // path: '/bet/sg/qfdg',
    //   path: '/quizzesFootbal/qfdg',
    //   name: 'qfdg',
    //   // component: qfdg,
    //   component: resolve => require.ensure([], () => resolve(require('@/components/bet/sg/qfdg')), 'quizzesFootbal'),
    //    beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    // },
    // //竞技彩--单场
    // {
    //   // path: '/bet/sg/fbsg',
    //   path: '/footbalSingle/footbalSingle',
    //   name: 'fbsg',
    //   // component: fbsg,
    //   component: resolve => require.ensure([], () => resolve(require('@/components/bet/sg/fbsg')), 'footbalSingle'),
    //    beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    // },
    // //竞技彩--竞篮
    // {
    //   // path: '/bet/sg/qbhh',
    //   path: '/quizzesBasket/qbhh',
    //   name: 'qbhh',
    //   // component: qbhh,
    //   component: resolve => require.ensure([], () => resolve(require('@/components/bet/sg/qbhh')), 'quizzesBasket'),
    //    beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    // },
    // {
    //   // path: '/bet/sg/qbdg',
    //   path: '/quizzesBasket/qbdg',
    //   name: 'qbdg',
    //   // component: qbdg,
    //   component: resolve => require.ensure([], () => resolve(require('@/components/bet/sg/qbdg')), 'quizzesBasket'),
    //    beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    // },
    // {
    //   // path: '/bet/sg/sfc',
    //   path: '/sfc/sfc',
    //   name: 'sfc',
    //   // component: sfc,
    //   component: resolve => require.ensure([], () => resolve(require('@/components/bet/sg/sfc')), 'sfc'),
    //    beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    // },
    // {
    //   // path: '/bet/sg/rxnine',
    //   path: '/rx9/rx9',
    //   name: 'rxnine',
    //   // component: rxnine,
    //   component: resolve => require.ensure([], () => resolve(require('@/components/bet/sg/rxnine')), 'rxnine'),
    //   beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    // },
    // {
    //   path: '/tab/help',
    //   name: 'sgHelp',
    //   // component: sgHelp,
    //   component: resolve => require.ensure([], () => resolve(require('@/components/bet/sg/help')), 'sgHelp'),
    //    beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    // },
    // {
    //   path: '/tab/basketDetail',
    //   name: 'basketDetail',
    //   // component: basketDetail,
    //   component: resolve => require.ensure([], () => resolve(require('@/components/bet/sg/basketDetail')), 'basketDetail'),
    //   beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    // },
    // {
    //   path: '/tab/footballdetail',
    //   name: 'detail',
    //   // component: detail,
    //   component: resolve => require.ensure([], () => resolve(require('@/components/bet/sg/detail')), 'footballdetail'),
    //    beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    // },

    // //开奖
    // {
    //   path: '/tab/jclq',
    //   name: 'jclq',
    //   // component: jclq,
    //   component: resolve => require.ensure([], () => resolve(require('@/components/tab/startlotto/jclq')), 'jclq'),
    //   beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    // },
    // {
    //   path: '/tab/jczq',
    //   name: 'jczq',
    //   // component: jczq,
    //   component: resolve => require.ensure([], () => resolve(require('@/components/tab/startlotto/jczq')), 'jczq'),
    //    beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    // },
    // {
    //   path: '/tab/zqdc',
    //   name: 'zqdc',
    //   // component: zqdc,
    //   component: resolve => require.ensure([], () => resolve(require('@/components/tab/startlotto/zqdc')), 'zqdc'),
    //    beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    // },
    // {
    //   path: '/tab/sfc_rx9',
    //   name: 'sfc_rxnine',
    //   // component: sfc_rxnine,
    //   component: resolve => require.ensure([], () => resolve(require('@/components/tab/startlotto/sfc_rxnine')), 'sfc_rxnine'),
    //    beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    // },
    // //彩票资讯
    // {
    //   path: '/tab/sundry/information',
    //   name: 'information',
    //   // component: information,
    //   component: resolve => require.ensure([], () => resolve(require('@/components/tab/sundry/information')), 'information'),
    //    beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    // },
    // //比分直播
    // {
    //   // path: '/tab/sundry/live',
    //   path: '/tab/live',
    //   name: 'live',
    //   // component: live,
    //   component: resolve => require.ensure([], () => resolve(require('@/components/tab/sundry/live')), 'live'),
    //    beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    // },
    //客服
    {
      path: '/service/customerService',
      name: 'customerService',
      // component: customerService,
      component: resolve => require.ensure([], () => resolve(require('@/components/service/customerService')), 'customerService'),
       beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    },
    {
      path: '/service/onlineService',
      name: 'onlineService',
      // component: onlineService,
      component: resolve => require.ensure([], () => resolve(require('@/components/service/onlineService')), 'onlineService'),

    },
    //红包
    {
      path: "/tab/fetchRedPacket",
      name: "fetchRedPacket",
      // component: fetchRedPacket,
      component: resolve => require.ensure([], () => resolve(require('@/components/tab/sundry/fetchRedPacket')), 'fetchRedPacket'),
       beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    },
    //委托规则
    {
      path: "/tab/rule",
      name: "rule",
      // component: rule,
      component: resolve => require.ensure([], () => resolve(require('@/components/tab/sundry/rule')), 'rule'),
       beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    },
    //中转页
    {
      path: "/transfer",
      name: "transfer",
      // component: transfer ,
      component: resolve => require.ensure([], () => resolve(require('@/components/tab/sundry/transfer')), 'transfer'),
      //  beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    },
    //公告
    {
      path: "/lose",
      name: "lose",
      // component: transfer ,
      component: resolve => require.ensure([], () => resolve(require('@/components/tab/sundry/lose')), 'lose'),
      beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    },
    //     {
    //       path: '/*',
    //       redirect: {name:"index"}
    //     },

  ],
  //跳转时返回顶部(苹果可能不适用，保留)，只在发生路由跳转时触发，返回历史不触发 不完整触发条件(触发无闪动)
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  },

})
var unique
function show() {
      let opt = { body: true, text: 'Loading...' };
      if (!unique) unique = Loading.service(opt);
  }
function resolve(resolve) {
          if (unique) {
              unique.close();
              unique = null;
          }
  }
router.beforeEach((to, from, next) => {
  if(localStorage.toRoute!=to.name&&to.name){
    localStorage.toRoute=to.name;
    $("#mLoading").removeClass('hide');
  }


  // $(".child-view").css({
  //   "position":"fixed",
  //   "z-index":100
  // });
  // show()
  if (to.matched.length === 0) {                                        //如果未匹配到路由
    from.name ? next({ name: from.name }) : next('/');   //如果上级也未匹配到路由则跳转登录页面，如果上级能匹配到则转上级路由
  } else {
    next();                                                                            //如果匹配到正确跳转
  }
});
//跳转时返回顶部(苹果可能不适用，保留) 完美触发条件(触发有闪动)
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
  // resolve()
  // $(function(){
  //   setTimeout(function(){
  //     $(".child-view").css({
  //       "position":"absolute"
  //     })
  //   },1000)
  // })
  $("#mLoading").addClass('hide');
})
export default router
