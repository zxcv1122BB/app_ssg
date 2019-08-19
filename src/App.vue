<template>
  <div id="app" :class="themeStyle">
    <!-- <ul class="check-word">
      <li @click="checkWord('cn')">简体</li>
      <li @click="checkWord('tr')">繁体</li>
    </ul> -->
    <transition  :enter-active-class="enterActive" :leave-active-class="leaveActive">
      <!-- <transition :name="fadeActive"> -->
      <keep-alive>
        <router-view  class="child-view"></router-view>
      </keep-alive>
    </transition>

    <!-- <goodsd></goodsd> -->
    <!-- <div id="mLoading">
      <div  class="mui-loading">
        <span v-for="(it,index) in mLoadList" :key="index" :class="it.cla"></span>
      </div>
    </div> -->

    <div id="mLoading" class="loading-wrap hide"><div class="dots-loading-container"><div class="dot dot-a"></div><div class="dot dot-b"></div><div class="dot dot-c"></div><div class="dot dot-d"></div><div class="text">{{$t('正在加载中')}}...</div></div></div>
  </div>

</template>


<script>
window.all_TBet = "";
window.Promise = Promise;
import '@/style/base/theme.scss';
// import goodsd from '@/components/tab/sundry/fixedGameList';
// import { Loading } from 'element-ui';
export default {
  name: 'App',
  //  components: {
  //     goodsd
  //   },
  data(){
    return {
      maxHeight:"",
      transitionName: ' ',
      enterActive:'',
      leaveActive:'',
      themeStyle:'custome-14b2ba',
      loading:'false',


      mLoadList:[
        {cla:'bl bl_g',mcla:'bl bl_g bl_big'},
        {cla:'bl bl_r',mcla:'bl bl_r bl_big'},
        {cla:'bl bl_b',mcla:'bl bl_b bl_big'}
      ],
      mLNowIndex:0,

      fadeActive:"fade",
      // mLNextIndex:1,
      //控制显示更多彩种的路由名
      fixedName:["bj28","eleven5","k3","lhc","pk10","qxc","ssc","threed","xync","fbsg","qbdg","qbhh","qfdg","qfhh","rxnine","sfc"],
    }
  },
  created:function(){
    this.setSize(localStorage.sizes);

    this.setThemeStyle();
    this.maxHeight="min-height:"+window.screen.height+"px;font-size:1rem";
    this.add_mLNowIndex();
  },
  mounted:function(){
    // require("../static/template/001/base.css")
    var h=document.documentElement.clientHeight;
    var w=document.documentElement.clientWidth;
    var _this=this;
    $("#app").css({
//    height:h,
      width:w
    })
    setTimeout(function(){
      $("#loading_wrap").hide();
    },300)

    window.onload = function() {
      // 阻止双击放大
      var lastTouchEnd = 0;
      document.addEventListener('touchstart', function(event) {
        if (event.touches.length > 1) {
          event.preventDefault();
        }
      });
      // document.body.addEventListener('touchmove', function(event) {
      //   function stopScroll(event) {
      //       event.preventDefault();
      //     }
      //   // console.log(_this.$route,_this.$router)
      //   if(_this.$route.name=="index"){
      //     document.addEventListener('touchmove',stopScroll,false );
      //   }else{
      //     document.removeEventListener("touchmove", stopScroll);
      //     //  event.preventDefault();
      //   }

      // });
      document.addEventListener('touchend', function(event) {
        var now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
          event.preventDefault();
        }
        lastTouchEnd = now;
      }, false);
      // function stopScroll(event){
      //   event.preventDefault();
      // }
      // document.addEventListener('touchmove',stopScroll,false)
      // 阻止双指放大
      document.addEventListener('gesturestart', function(event) {
        event.preventDefault();
      });
//        document.addEventListener('touchmove',function(){
//         //  window.dclientY=document.body.scrollTop=0;
//         if(event.scrollTop>0){
// alert(111)
//         }

//         console.log(document.body.offsetTop)
      // },false)


    // document.addEventListener("touchmove",function(e){
    //   e.preventDefault();
    // },false)
    }
    this.init();

  },
  methods:{
    init(){
      //解决触发滚动时候的点击
      function stopTouchendPropagationAfterScroll(){

        window.locked = false;

        window.addEventListener('touchmove', function(ev){

            window.locked || (window.locked = true, window.addEventListener('touchstart', stopTouchendPropagation, true));

        }, true);

        function stopTouchendPropagation(ev){
            ev.stopPropagation();

            window.removeEventListener('touchstart', stopTouchendPropagation, true);

            window.locked = false;

        }

    }

    stopTouchendPropagationAfterScroll();
      this.base.initData();

      this.baseCss.style_this=this;
        // var html = '<div id="collectTips" style="display:none;position: fixed;background-color: rgba(0, 0, 0, 0.7);color: white;width: 130px;height: 70px;z-index: 99999;line-height: 70px;text-align: center;border-radius: 10px;top: 0;bottom: 0;margin: 300px auto;left: 0;right: 0;">收藏成功</div>';
        // $('body').append(html);
      if(localStorage.collectGame){
        var obj=JSON.parse(localStorage.collectGame);
        this.collectGame.collectList=obj.collectList;
        this.collectGame.idList=obj.idList;
      }
      mui.plusReady(function() {
        document.addEventListener("netchange", onNetChange, false);
        //获取当前网络类型
        function onNetChange() {
            var nt = plus.networkinfo.getCurrentType();
            switch (nt) {
                case plus.networkinfo.CONNECTION_ETHERNET:
                case plus.networkinfo.CONNECTION_WIFI:
                    mui.toast("当前网络为WiFi");
                    break;
                case plus.networkinfo.CONNECTION_CELL2G:
                case plus.networkinfo.CONNECTION_CELL3G:
                case plus.networkinfo.CONNECTION_CELL4G:
                    mui.toast("当前网络非WiFi,请注意流量!");
                    break;
                default:
                    // mui.toast("当前没有网络");
                    mui.alert('当前没有网络', '温馨提示', function() {
                        // info.innerText = '你刚关闭了警告框';
                    });
                    break;
            }
        }
      });
    },
    add_mLNowIndex(){
      return
      var _this=this;
      if(this.mLNowIndex_t){
        window.clearInterval(this.mLNowIndex_t);
      }
      this.mLNowIndex_t=setInterval(function(){
        setTimeout(function(){
          $('#mLoading .bl:nth-child(1)').addClass('bl_big');
        },30)
        setTimeout(function(){
          $('#mLoading .bl:nth-child(2)').addClass('bl_big');
        },60)
        setTimeout(function(){
          $('#mLoading .bl:nth-child(3)').addClass('bl_big');
        },90)

        setTimeout(function(){
          $('#mLoading .bl:nth-child(1)').removeClass('bl_big');
        },100)
        setTimeout(function(){
          $('#mLoading .bl:nth-child(2)').removeClass('bl_big');
        },130)
        setTimeout(function(){
          $('#mLoading .bl:nth-child(3)').removeClass('bl_big');
        },160)
        // if(_this.mLNowIndex==2){
        //   _this.mLNowIndex=0;
        // }else{
        //   _this.mLNowIndex++;
        // }
      },300);
    },
    setThemeStyle:function(num){
      if(localStorage.skin_color&&!num){
        this.baseCss.setStyleColor(parseInt(localStorage.skin_color));
      }
      var color=this.baseCss.styleColor;
      this.themeStyle="custome-"+color.replace("#","");
    },
    setSize:function(newValue){
     this.baseCss.setSize(newValue);
      var a = this.baseCss.size;
			var links = $('head>link#link_new');
      links.remove();
			if(a != undefined) {

				if(a == 1) {
					var new_link = '<link rel="stylesheet" type="text/css" id="link_new" href="static/css/base.css"/>';
					$('head').append(new_link);
				} else if(a == 2) {
					var new_link = '<link rel="stylesheet" type="text/css" id="link_new" href="static/css/base2.css"/>';
					$('head').append(new_link);
				} else if(a == 3) {
					var new_link = '<link rel="stylesheet" type="text/css" id="link_new" href="static/css/base3.css"/>';
					$('head').append(new_link);
				}
                localStorage.sizes = newValue;
			}else{
                var new_link = '<link rel="stylesheet" type="text/css" id="link_new" href="static/css/base2.css"/>';
                $('head').append(new_link);
                localStorage.sizes = 2;
            }

    },
 //路由跳转返回
    // routerBack: function () {
    //   if (localStorage.turnPathName){
    //     this.$router.push({ name: localStorage.turnPathName });
    //   }else{
    //     this.$router.push({ name: index });
    //   }

    // },
  },
  watch:{

    '$route'(to,from){
        $(".mui-backdrop.mui-backdrop-action").remove();
        $(".mui-backdrop.mui-active").remove();
      if(to.name!='onlineService'){
          if(!localStorage.userName&&to.name!='index'&&to.name!='transfer'&&to.name!="customerService"&&to.name!='lose'&&to.name!='login'&&to.name!='register'&&to.name!='announcement'){
            this.$router.push({name:"login"});
            mui.toast("请先登录")
          }
      }


      if(this.fixedName.indexOf(to.name)!=-1){
        $("#fixedGameList").show();
      }else{
        $("#fixedGameList").hide();
      }
      localStorage.turnPathName=from.name;
      // if(this.baseCss.isChange){
      //   this.setSize();
      // }
      //动画处理

      if(to.path == '/'||from.name=="login"||from.name=="sgHelp"||from.name=="detail"||from.name=="basketDetail"){
        // this.transitionName = 'slide-right';
        if(from.name){
          this.enterActive="animated fadeInLeft";
          this.leaveActive="animated fadeInOutRight";
        }

      } else{
        // this.transitionName = 'slide-left';
        this.enterActive="animated fadeInRight";
        this.leaveActive="animated fadeInOutLeft";
      }
      if(this.global_timingStorage[from.name]){
        this.global_timingStorage.clearTiming(from.name,from.path);
      }else{
        this.global_timingStorage.restartTiming(to.name,to.path);
      }

       $("#mLoading").removeClass('hide');
       this.$nextTick(function(){
         $(function(){
            $("#mLoading").addClass('hide');
         })
       })
      // if(){

      // }
      // if(to.name="login"&&from.name=="register"){
      //   this.fadeActive="fade";
      // }else if(to.name="register"&&from.name=="login"){
      //   this.fadeActive="rfade";
      // }

    },

  }
}
</script>

<style>
/* .fade-enter-active{
  animation: fadeInLeft 1s;
  }
  .fade-leave-active{
  animation: fadeInOutRight 1s;
  } */

  /* .fade-enter-active{
  animation: fadeInRight 1s;
  }
  .fade-leave-active{
  animation: fadeInOutLeft 1s;
  } */
/* body{
  overflow:hidden !important;
} */
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  /*font-family: Arial,Helvetica,sans-serif;*/
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  /* text-align: center; */
  /*text-align: center;*/
  color: #2c3e50;
  /* margin-top: 60px; */
}
#app .check-word {
  position: relative;
  z-index: 9999999;
  background: linear-gradient(left, black , #575956);
  margin-top: 44px;
  color: #fff;
}
#app .check-word span {
  display: block;
  width: 100%;
  box-sizing: border-box;
  padding: 5px;
}
 input{
  margin: 0;
  padding: 0;
}
.child-view {
  position: absolute;
  left:0;
   right:0;
   top:0;
   bottom:0;
   z-index: 100;
  /* width: 100%;
  height: 100%;
  -webkit-overflow-scrolling:touch; */
  /* transition: all .5s cubic-bezier(.55,0,.1,1); */
  /* z-index: 100; */
}
.child-view::-webkit-scrollbar {
  display: none;
}
.slide-left-enter, .slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(30px, 0);
  transform: translate(30px, 0);
}
.slide-left-leave-active, .slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-30px, 0);
  transform: translate(-30px, 0);
}
/* #mLoading{
   position: absolute;
  top:0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .6);
  z-index: 10000;
}
#mLoading .mui-loading{
  position: absolute;
  top:50%;
  left: 50%;
  margin-left: -60px;
  margin-top: -12px;
  z-index: 10001;
}
#mLoading .mui-spinner{
   background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAEG0lEQVRoQ+1Z3VHbQBD+VrZnbL3EVABUEPKWCfbEVABUEKgAp4KQCjAVhFQQUkHMSGTyhqkA6ABeJM8o1mbuZIN/dLoVkjEP0av2bvfbvdv9bpdQ0setegegIxB1ADQB3AM4RxR/pT/D25LULGxDZWzMbfcbgAPjXsxd8sPTMnTN71EYALcaPRAd2Y2LD8kbntnl8kkUAqCPDTm/hCrvUQk2qa+PVmlfMQBtV3n0k9ya8qNQDECr0QfRRzkAfCcvMN+VHBtNRAsCcAcgvBXrZb4gP1RZ6vHj7fonOE4HzBtJ5qIBqsGp9KgVBJAzAsyn5IddZT130MTfxo9x2p33gbonh+QF5zbnFAOw3ejCoRObkqn/+xOjuKWN38tcy/EO+cN+lkwxAMqLI1cVqTdWEIxr8oMt7f22qwz/YV0DviUv3HwWgEQJnwCkqqoxnEJjHjCKOvQ7GowByLPXKHo3WZcGxBgBbjfOAdpNFmV7YkwjzkC0vqCE+QLx3+60Edxyr0DQ0bB/2ak3A8BUjk/JHmmKdTRYGcZNgO4RR+dp3uN86ffx3uSLwPv6BqrUBVETo6iXFUa7F2cl5PQDQBRvZpHBQpc4r+ETef5Q20KldmVdL4j8SgDoW9Vyj0H4kgHiAZVgw1bQVgZgCoQqbLNpmHGNODqQHNuVAtAg1F2roQN2FJUAEPdtxWs6aisHYL0HFoH/AIp60LR+nKmOdF0hbIC5DygyOMuNXmUEuF0/ABz1zk75uEde+HnyQwMYX6R1RLhbZgdBEi1hjXiszrSANubPdBn2JMqWITPLwQwaGAPyg3fqL3G7cQPQOIXpBffkBWvLME6yZ4o9qcvIC/TpIW67PC8x+SlRWLYMt131GrO+L54AzDNDAf8o2+jp/URMlfmO/FCfGkousHOsH9VEt4ji41VeZNEDifGV/OBYA1imN5+7N2f1m+ZOyKsEoFO7ahgQ1Htk8sp7AKM38fxMHXiup15inW6/DOtN07F+tRGQOuc/AKmnliW38gho7uPUdnWzUaXxOO7T5fC7FLC5raLqQwVJ57k2/Gl7m0oVzhQtE+tU1Lka7kt0pgIYDy5U60915ZLP0iHLC0Bnl5F7M6NjBt1TIzhrbwOA1K5zqSRPMt2RcLJ0ACkET3tB0C2WRkLQVhHpM0TAMLioBGuScykBIeI8lq6ckQulemdqOGEyUBPDqpPMzAgDVIILE2D7y4t/khdmzw+yyJx+qTEl8yziM9uIVHOX+WEHQ42LdowgTKSN+Q7VcEsS7VLqwJiSq4yy+DH3yQ93jFFTLUZgT8/alOFE/TzN5HIA2ObFJafgaWe8DIASs9d8JF8CwAN5wVNBlKSoHDKlANAlwjh1KX86X/oR0gASatADa1K2DjUbI+pJZr05HL4g+g/MLNtAfOBKhQAAAABJRU5ErkJggg==") no-repeat;
   background-size: cover;
} */
#mLoading.hide{
  display: none;
}

/* #mLoading .bl_big{
  transform: scale(1.5);
  margin-right: 30px;
} */

.loading-wrap{position: fixed;left: 0;top: 0;width: 100%;height: 100%;background: rgba(0,0,0,.5);z-index:999}
      .loading-wrap .text{position: absolute;left: 50%;top: 40%;color: #fff;font-size: 16px;width: 200px;margin-top: 40px;margin-left: -100px;text-align:center;}
      .dots-loading-container {position: absolute;left: 50%;margin-left: -33px;top: 46%;width: 66px;-webkit-animation: expand .75s ease-in-out infinite alternate;animation: expand .75s ease-in-out infinite alternate;}
      .dot {width: 13px;height: 13px;border-radius: 50%;position: absolute;}
      .dot.dot-a {-webkit-animation: scaleA 1.5s ease-in-out infinite;animation: scaleA 1.5s ease-in-out infinite;background-color: #f66;left: 0}
      .dot.dot-b {-webkit-animation: scaleA 1.5s ease-in-out 0.15s infinite;animation: scaleA 1.5s ease-in-out 0.15s infinite;background-color: #93f;left: 33%}
      .dot.dot-c {-webkit-animation: scaleA 1.5s ease-in-out 0.3s infinite;animation: scaleA 1.5s ease-in-out 0.3s infinite;background-color: #0cf;left: 66%}
      .dot.dot-d {-webkit-animation: scaleA 1.5s ease-in-out 0.45s infinite;animation: scaleA 1.5s ease-in-out 0.45s infinite;background-color: #0f9;left: 100%}
      @-webkit-keyframes scaleA { 0% {transform: scale(1)} 30% {transform: scale(1.5)} 60% {transform: scale(1)} }
      @keyframes scaleA { 0% {transform: scale(1)} 30% {transform: scale(1.5)} 60% {transform: scale(1)} }
      @-webkit-keyframes expand { from {width: 66px} to {width: 100px;transform: translateX(-17px)} }
      @keyframes expand { from {width: 66px} to {width: 100px;transform: translateX(-17px)} }





      .slider ul {
				border: none !important;
			}

			.osSlider-main .slider-nav {
				bottom: 5px !important;
			}

			.osSlider-main .slider-nav li {
				padding: 0;
				font-size: 0;
				width: 10px !important;
				height: 10px !important;
				line-height: inherit;
				border-radius: 50%;
				margin: 0 6px !important;
			}
#container #header{
  background-image: -webkit-linear-gradient(top,black,#575956);
}

 /* * { touch-action: pan-y; }  */
</style>
