// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import cn from './common/lang/cn.js'
import tr from './common/lang/tr.js'



import VueClipboard from 'vue-clipboard2'
import YDUI from 'vue-ydui'; /* 相当于import YDUI from 'vue-ydui/ydui.rem.js' */
import Share from 'vue-social-share'

Vue.use(VueI18n)
Vue.use(Share)
Vue.use(YDUI);
Vue.use(VueClipboard)
import config from './config/config.js'
Vue.use(config)
import App from './App'
import router from './router/index'
// import $ from 'jquery'
// import mui from '../static/js/mui.min.js'
// import './assets/js/common/security.js'

if (process.env.NODE_ENV === 'development') {
  // require('element-ui/lib/theme-chalk/loading.css')
  // require('./style/base/mui.min.css')
  // require('./style/base/swiper-3.4.2.min.css')
  // require('vue-social-share/dist/client.css')
  // require('./style/common/mobileSelect.css')
  require('./style/base/animate.css')
}
import 'element-ui/lib/theme-chalk/loading.css'
import './style/base/mui.min.css'
import './style/base/swiper-3.4.2.min.css'
// import './style/base/iconfont.css'

// // import './style/base/animate.css'
import 'vue-social-share/dist/client.css'
import './style/common/mobileSelect.css'
import './style/base/base.css'


// import './assets/js/security.js'
// import './assets/js/md5.js'
// 通过引入fn实现调用

let lang = localStorage.getItem('lang') || 'tr';
const i18n = new VueI18n({
  locale: lang,
  messages: {
    'cn': cn,   // 中文简体语言包
    'tr': tr    // 繁体语言包
  },
  silentTranslationWarn: true
})

console.log(require('./common/lang/cn.js'), '==============');


Vue.config.productionTip = false
Vue.prototype.isJump=false;
// router.beforeEach((to, from, next) => {
//   //console.log(555)
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  components: { App },
  template: '<App/>'
})

