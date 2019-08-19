import { Loading } from 'element-ui';
var unique;
export default {
  show() {
    let opt = { body: true, text: 'Loading...' };
    if (!unique) unique = Loading.service(opt);
  },
  resolve(resolve) {
    return function (component) {
      if (unique) {
        unique.close();
        unique = null;
      }
      resolve(component)
    }
  }
}
const basicInfo = {
  // mode: 'history',
  routes: [

    {
      path: '/',
      name: 'index',
      // component: index,
      component: resolve => {
        spinRoute.show();
        require(['@/components/index'], spinRoute.resolve(resolve))
      }
    },
    //个人中心
    {
      path: '/loginIn/login',
      name: 'login',
      // component: login,
      component: resolve => require(['@/components/myCenter/login'], resolve),
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
      component: resolve => require(['@/components/myCenter/moreMes'], resolve),
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
      component: resolve => require(['@/components/myCenter/caiMore'], resolve),
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
      component: resolve => require(['@/components/myCenter/register'], resolve),
      beforeEnter: (to, from, next) => {
        if (!from.name) {
          next({ path: '/' })
        } else {
          next()
        }
      }
    },
    {
      path: '/myCenter/setting',
      name: 'setting',
      // component: setting,
      component: resolve => require(['@/components/myCenter/setting'], resolve),
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
      component: resolve => require(['@/components/myCenter/activity'], resolve),
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
      component: resolve => require(['@/components/myCenter/ticketDetails'], resolve),
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
      component: resolve => require(['@/components/myCenter/deposit'], resolve),
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
      component: resolve => require(['@/components/myCenter/share'], resolve),
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
      component: resolve => require(['@/components/myCenter/message'], resolve),
      beforeEnter: (to, from, next) => {
        if (!from.name) { next({ path: '/' }) } else { next() }
      }
    },
    {
      path: '/myCenter/mesContent',
      name: 'mesContent',
      // component: mesContent,
      component: resolve => require(['@/components/myCenter/mesContent'], resolve),
      beforeEnter: (to, from, next) => {
        if (!from.name) { next({ path: '/' }) } else { next() }
      }
    },
    {
      path: '/myCenter/depositFile',
      name: 'depositFile',
      // component: depositFile,
      component: resolve => require(['@/components/myCenter/depositFile'], resolve),
      beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    },
    {
      path: '/myCenter/enchashment',
      name: 'enchashment',
      // component: enchashment,
      component: resolve => require(['@/components/myCenter/enchashment'], resolve),
      beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    },
    {
      path: '/myCenter/company',
      name: 'company',
      // component: company,
      component: resolve => require(['@/components/myCenter/company'], resolve),
      beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    },
    {
      path: '/myCenter/weChat',
      name: 'weChat',
      // component: weChat,
      component: resolve => require(['@/components/myCenter/weChat'], resolve),
      beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    },
    {
      path: '/myCenter/ebank',
      name: 'ebank',
      // component: ebank,
      component: resolve => require(['@/components/myCenter/ebank'], resolve),
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
      component: resolve => require(['@/components/myCenter/changePwd'], resolve),
      beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    },
    {
      path: '/mycenter/moneyPwd',
      name: 'moneyPwd',
      // component: moneyPwd,
      component: resolve => require(['@/components/myCenter/moneyPwd'], resolve),
      beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    },
    {
      path: '/mycenter/userSign',
      name: 'userSign',
      // component: userSign,
      component: resolve => require(['@/components/myCenter/userSign'], resolve),
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
      component: resolve => require(['@/components/myCenter/bettingRecord'], resolve),
      beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    },
    {
      path: '/message/announcement',
      name: 'announcement',
      // component: announcement,
      component: resolve => require(['@/components/message/announcement'], resolve),
      beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    },
    {
      path: '/message/winningDetails',
      name: 'winningDetails',
      // component: winningDetails,
      component: resolve => require(['@/components/message/winningDetails'], resolve),
      beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    },
    {

      path: '/mycenter/footFundDetails',
      name: 'footFundDetails',
      // component: footFundDetails,
      component: resolve => require(['@/components/myCenter/footFundDetails'], resolve),
      beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    },
    {
      path: '/mycenter/userPerfectInfo',
      name: 'userPerfectInfo',
      // component: userPerfectInfo,
      component: resolve => require(['@/components/myCenter/userPerfectInfo'], resolve),
      beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    },
    //数字彩
    {
      path: '/ng/ssc/:num',
      // path: '/ssc/ssc#6',
      name: 'ssc',
      // component: ssc,
      component: resolve => require(['@/components/bet/ng/ssc'], resolve),
      beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    },
    // {
    //   path: '/ng/ssc/6',
    //   // path: '/ssc/ssc#6',
    //   name: 'ssc',
    //   // component: ssc,
    //   component: resolve => require(['@/components/bet/ng/ssc'], resolve),
    //   beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    // },
    // {
    //   path: '/ng/ssc/13',
    //   // path: '/ssc/ssc#13',
    //   name: 'ssc',
    //   // component: ssc,
    //   component: resolve => require(['@/components/bet/ng/ssc'], resolve),
    //   beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    // },
    // {
    //   path: '/ng/ssc/14',
    //   // path: '/ssc/ssc#14',
    //   name: 'ssc',
    //   // component: ssc,
    //   component: resolve => require(['@/components/bet/ng/ssc'], resolve),
    //   beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    // },
    {
      path: '/ng/threed/:num',
      // path: '/3d/3d#5',
      name: 'threed',
      // component: threed,
      component: resolve => require(['@/components/bet/ng/threed'], resolve),
      beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    },
    // {
    //   path: '/ng/threed/5',
    //   // path: '/3d/3d#5',
    //   name: 'threed',
    //   // component: threed,
    //   component: resolve => require(['@/components/bet/ng/threed'], resolve),
    //   beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    // },
    // {

    //   path: '/ng/threed/19',
    //   // path: '/3d/3d#19',
    //   name: 'threed',
    //   // component: threed,
    //   component: resolve => require(['@/components/bet/ng/threed'], resolve),
    //   beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    // },
    {
      // path: '/bet/ng/award_page',
      path: '/tab/award_page',
      name: 'award_page',
      // component: award_page ,
      component: resolve => require(['@/components/bet/ng/award_page'], resolve),
      beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    },
    {
      path: '/ng/bj28',
      name: 'bj28',
      // component: bj28,
      component: resolve => require(['@/components/bet/ng/bj28'], resolve),
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
      component: resolve => require(['@/components/bet/ng/k3'], resolve),
      beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    },
    // {
    //   path: '/ng/k3/11',  //安徽快三
    //   // path: '/ssc/ah_fast3',
    //   name: 'k3',
    //   // component: k3,
    //   component: resolve => require(['@/components/bet/ng/k3'], resolve),
    //   beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    // },
    // {
    //   path: '/ng/k3/20',  //北京快三
    //   // path: '/ssc/ah_fast3',
    //   name: 'k3',
    //   // component: k3,
    //   component: resolve => require(['@/components/bet/ng/k3'], resolve),
    //   beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    // },
    // {
    //   path: '/ng/k3/21',  //广西快三
    //   // path: '/ssc/ah_fast3',
    //   name: 'k3',
    //   // component: k3,
    //   component: resolve => require(['@/components/bet/ng/k3'], resolve),
    //   beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    // },
    // {
    //   path: '/ng/k3/22',  //湖北快三
    //   // path: '/ssc/ah_fast3',
    //   name: 'k3',
    //   // component: k3,
    //   component: resolve => require(['@/components/bet/ng/k3'], resolve),
    //   beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    // },
    // {
    //   path: '/ng/k3/23',  //江苏快三
    //   // path: '/ssc/ah_fast3',
    //   name: 'k3',
    //   // component: k3,
    //   component: resolve => require(['@/components/bet/ng/k3'], resolve),
    //   beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    // },
    // {
    //   path: '/ng/k3/24',  //上海快三
    //   // path: '/ssc/ah_fast3',
    //   name: 'k3',
    //   // component: k3,
    //   component: resolve => require(['@/components/bet/ng/k3'], resolve),
    //   beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    // },
    // {
    //   path: '/ng/k3/25',  //江西快三
    //   // path: '/ssc/ah_fast3',
    //   name: 'k3',
    //   // component: k3,
    //   component: resolve => require(['@/components/bet/ng/k3'], resolve),
    //   beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    // },
    {
      path: '/ng/pk10/:num',
      // path: '/ssc/pk10#8',
      name: 'pk10',
      // component: pk10,
      component: resolve => require(['@/components/bet/ng/pk10'], resolve),
      beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    },
    // {
    //   path: '/ng/pk10/8',
    //   // path: '/ssc/pk10#8',
    //   name: 'pk10',
    //   // component: pk10,
    //   component: resolve => require(['@/components/bet/ng/pk10'], resolve),
    //   beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    // },
    // {
    //   path: '/ng/pk10/15',
    //   // path: '/ssc/pk10#15',
    //   name: 'pk10',
    //   // component: pk10,
    //   component: resolve => require(['@/components/bet/ng/pk10'], resolve),
    //   beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    // }
    // ,
    {
      path: '/ng/qxc',
      // path: '/sxync/qxc',
      name: 'qxc',
      // component: qxc,
      component: resolve => require(['@/components/bet/ng/qxc'], resolve),
      beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    }
    ,
    {
      path: '/ng/xync/:num',  //幸运农场
      // path: '/sxync/xync',
      name: 'xync',
      // component: xync,
      component: resolve => require(['@/components/bet/ng/xync'], resolve),
      beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    },
    // {
    //   path: '/ng/xync/10',  //幸运农场
    //   // path: '/sxync/xync',
    //   name: 'xync',
    //   // component: xync,
    //   component: resolve => require(['@/components/bet/ng/xync'], resolve),
    //   beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    // },
    // {
    //   path: '/ng/xync/26',  //广东快乐十分
    //   // path: '/sxync/xync',
    //   name: 'xync',
    //   // component: xync,
    //   component: resolve => require(['@/components/bet/ng/xync'], resolve),
    //    beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    // },
    // {
    //   path: '/ng/xync/27',  //天津快乐十分
    //   // path: '/sxync/xync',
    //   name: 'xync',
    //   // component: xync,
    //   component: resolve => require(['@/components/bet/ng/xync'], resolve),
    //    beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    // },
    // {
    //   path: '/ng/xync/28',  //湖南快乐十分
    //   // path: '/sxync/xync',
    //   name: 'xync',
    //   // component: xync,
    //   component: resolve => require(['@/components/bet/ng/xync'], resolve),
    //   beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    // },
    // {
    //   path: '/ng/xync/29',  //广西快乐十分
    //   // path: '/sxync/xync',
    //   name: 'xync',
    //   // component: xync ,
    //   component: resolve => require(['@/components/bet/ng/xync'], resolve),
    //   beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    // },
    // {
    //   path: '/ng/xync/30',  //黑龙江快乐十分
    //   // path: '/sxync/xync',
    //   name: 'xync',
    //   // component: xync,
    //   component: resolve => require(['@/components/bet/ng/xync'], resolve),
    //   beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    // },
    //11选5
    {
      path: '/ng/eleven5/:num',
      // path: '/ssc/eleven5#7',
      name: 'eleven5',
      // component: eleven5,
      component: resolve => require(['@/components/bet/ng/eleven5'], resolve),
      beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    },
    // {
    //   path: '/ng/eleven5/7',
    //   // path: '/ssc/eleven5#7',
    //   name: 'eleven5',
    //   // component: eleven5,
    //   component: resolve => require(['@/components/bet/ng/eleven5'], resolve),
    //   beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    // },
    // {
    //   path: '/ng/eleven5/16',
    //   // path: '/ssc/eleven5#16',
    //   name: 'eleven5',
    //   // component: eleven5,
    //   component: resolve => require(['@/components/bet/ng/eleven5'], resolve),
    //   beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    // },
    // {
    //   path: '/ng/eleven5/17',
    //   // path: '/ssc/eleven5#17',
    //   name: 'eleven5',
    //   // component: eleven5,
    //   component: resolve => require(['@/components/bet/ng/eleven5'], resolve),
    //    beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    // },
    // {
    //   path: '/ng/eleven5/18',
    //   // path: '/ssc/eleven5#18',
    //   name: 'eleven5',
    //   // component: eleven5,
    //   component: resolve => require(['@/components/bet/ng/eleven5'], resolve),
    //    beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    // },

    {
      path: '/ng/trend',
      name: 'trend',
      // component: trend,
      component: resolve => require(['@/components/bet/ng/trend'], resolve),
      beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    },

    {
      path: '/ng/lhc',
      name: 'lhc',
      // component: lhc,
      component: resolve => require(['@/components/bet/ng/lhc'], resolve),
      beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    },

    //竞技彩--竞足
    {
      // path: '/bet/sg/qfhh',
      path: '/quizzesFootbal/qfhh',
      name: 'qfhh',
      // component: qfhh,
      component: resolve => require(['@/components/bet/sg/qfhh'], resolve),
      beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    },
    {
      // path: '/bet/sg/qfdg',
      path: '/quizzesFootbal/qfdg',
      name: 'qfdg',
      // component: qfdg,
      component: resolve => require(['@/components/bet/sg/qfdg'], resolve),
      beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    },
    //竞技彩--单场
    {
      // path: '/bet/sg/fbsg',
      path: '/footbalSingle/footbalSingle',
      name: 'fbsg',
      // component: fbsg,
      component: resolve => require(['@/components/bet/sg/fbsg'], resolve),
      beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    },
    //竞技彩--竞篮
    {
      // path: '/bet/sg/qbhh',
      path: '/quizzesBasket/qbhh',
      name: 'qbhh',
      // component: qbhh,
      component: resolve => require(['@/components/bet/sg/qbhh'], resolve),
      beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    },
    {
      // path: '/bet/sg/qbdg',
      path: '/quizzesBasket/qbdg',
      name: 'qbdg',
      // component: qbdg,
      component: resolve => require(['@/components/bet/sg/qbdg'], resolve),
      beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    },
    {
      // path: '/bet/sg/sfc',
      path: '/sfc/sfc',
      name: 'sfc',
      // component: sfc,
      component: resolve => require(['@/components/bet/sg/sfc'], resolve),
      beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    },
    {
      // path: '/bet/sg/rxnine',
      path: '/rx9/rx9',
      name: 'rxnine',
      // component: rxnine,
      component: resolve => require(['@/components/bet/sg/rxnine'], resolve),
      beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    },
    {
      path: '/tab/help',
      name: 'sgHelp',
      // component: sgHelp,
      component: resolve => require(['@/components/bet/sg/help'], resolve),
      beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    },
    {
      path: '/tab/basketDetail',
      name: 'basketDetail',
      // component: basketDetail,
      component: resolve => require(['@/components/bet/sg/basketDetail'], resolve),
      beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    },
    {
      path: '/tab/footballdetail',
      name: 'detail',
      // component: detail,
      component: resolve => require(['@/components/bet/sg/detail'], resolve),
      beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    },

    //开奖
    {
      path: '/tab/jclq',
      name: 'jclq',
      // component: jclq,
      component: resolve => require(['@/components/tab/startlotto/jclq'], resolve),
      beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    },
    {
      path: '/tab/jczq',
      name: 'jczq',
      // component: jczq,
      component: resolve => require(['@/components/tab/startlotto/jczq'], resolve),
      beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    },
    {
      path: '/tab/zqdc',
      name: 'zqdc',
      // component: zqdc,
      component: resolve => require(['@/components/tab/startlotto/zqdc'], resolve),
      beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    },
    {
      path: '/tab/sfc_rx9',
      name: 'sfc_rxnine',
      // component: sfc_rxnine,
      component: resolve => require(['@/components/tab/startlotto/sfc_rxnine'], resolve),
      beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    },
    //彩票资讯
    {
      path: '/tab/sundry/information',
      name: 'information',
      // component: information,
      component: resolve => require(['@/components/tab/sundry/information'], resolve),
      beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    },
    //比分直播
    {
      // path: '/tab/sundry/live',
      path: '/tab/live',
      name: 'live',
      // component: live,
      component: resolve => require(['@/components/tab/sundry/live'], resolve),
      beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    },
    //客服
    {
      path: '/service/customerService',
      name: 'customerService',
      // component: customerService,
      component: resolve => require(['@/components/service/customerService'], resolve),
      beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    },
    {
      path: '/service/onlineService',
      name: 'onlineService',
      // component: onlineService,
      component: resolve => require(['@/components/service/onlineService'], resolve),
      beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    },
    //红包
    {
      path: "/tab/fetchRedPacket",
      name: "fetchRedPacket",
      // component: fetchRedPacket,
      component: resolve => require(['@/components/tab/sundry/fetchRedPacket'], resolve),
      beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    },
    //委托规则
    {
      path: "/tab/rule",
      name: "rule",
      // component: rule,
      component: resolve => require(['@/components/tab/sundry/rule'], resolve),
      beforeEnter: (to, from, next) => { if (!from.name) { next({ path: '/' }) } else { next() } }
    },
    //中转页
    {
      path: "/transfer",
      name: "transfer",
      // component: transfer ,
      component: resolve => require(['@/components/tab/sundry/transfer'], resolve),
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

}
