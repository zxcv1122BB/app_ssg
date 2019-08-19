
<template>
    <div>
        <div id="container">
            <header id="header">
                <a class="goBack" href="javascript:void(0)" @click="routerBack"></a>
                <!-- <div class=""> -->
                    <!-- <div class="info_left">
                        <img :src="pic_url" />
                    </div> -->
                    <!-- <div class="info_right" v-cloak>
                        <p> -->
                            <!-- <span v-cloak></span> -->
                            
                            <a class="mui-title" href="javascript:void(0)" @click="s_middlePopover=1">{{name}}<i class="mui-icon mui-icon-arrowdown"></i></a>
                            <!-- <span v-cloak>{{courtDown}}</span> -->
                        <!-- </p> -->
                        <!-- <p v-if="qici">
                            <span v-cloak>第{{qici}}{{$t('期')}}</span>
                            <span id="flag">即将开奖...</span>
                        </p>
                        <p v-else>
                            <span v-cloak>{{$t('暂未开售')}}</span>
                        </p> -->
                    <!-- </div> -->
                <!-- </div> -->
                <span v-if="userName" :class="isCollect==1?'iconfont collect1':'iconfont collect'" @touchstart="collectFn"></span>
                        
                <a  href="javascript:void(0)" @click="refreshData"  class="mui-icon mui-icon-loop refresh"></a>
                
            </header>
            <div id="middlePopover" class="mui-popover" :style="s_middlePopover?'opacity:1;display:block':''">
                <div class="wrap" @click="s_middlePopover=0" style="position: fixed;top: 0;width: 100%;height: 100%;background: rgba(0,0,0,.3); left: 0;"></div>
                <div class="mui-popover-arrow" style="left:50%;margin-left: -13px;"></div>
                <div id="middle" style="margin:0;overflow: auto;height: 300px;" class="mui-scroll-wrapper">
                    <div class="mui-scroll">
                        <ul class="mui-table-view">
                            <li v-bind:key="index" v-for="(item,index) in all_TBet" class="mui-table-view-cell"><a  @click='s_middlePopover=0;togoSkip(item)'>{{item.show_name}}</a>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
            <!-- <div id="middlePopover" class="mui-popover" style="height: 300px;position: absolute;top: 0;overflow: scroll;">
              <ul class="mui-table-view">
                            <li v-bind:key="index" v-for="(item,index) in all_TBet" class="mui-table-view-cell"><a  @click='togoSkip(item)'>{{item.show_name}}</a>
                            </li>
                        </ul>
            </div> -->
            <div id="main">
                <div class="nav_title">
                    <div style="padding: 0 15px">
                            <ul class="mui-row" style="padding: 5px 0;">
                                <li class="mui-col-xs-9 mui-col-sm-9" style="line-height: 30px;color: #fff;font-size: 14px;">
                                    
                                    <span style="margin-right:10px;">第{{qici}}{{$t('期')}}</span>
                                    <span>{{$t('截止时间')}}：{{courtDown}}</span>
                                    <!-- <button class="mui-btn" style="padding: 2px 7px;font-size: 13px;background: #8b8feb;border: none;margin-left: 10px;margin-top: 5px;">结果走势</button> -->
                                    <!-- <img  class="refresh" src="../../../assets/images/base/refresh.png"  @click="downRefresh()" style="width: 28px;vertical-align: middle;margin-left: 8px;"> -->
                                </li>
                                <li class="mui-col-xs-3 mui-col-sm-3" style="padding-left: 10px;margin-top: 4px;color:#fff;">
                                    <button style="padding: .2rem 10px;font-size: .8rem;background: green;color: #fff;border: none;"  @click='togofc3d'>{{$t('去投注')}}</button>
                                    
                                </li>
                            </ul>
                            
                            <!-- <div class="mui-row" style="padding: 10px 0 7px;">
                                <div class="mui-col-xs-4 mui-col-sm-4" style="line-height: 20px;color: #fff;font-size: 14px;font-weight: 300;width:40%;">
                                    第{{preventBanner}}{{$t('期')}}
                                </div>
                               
                            </div> -->
                        </div>
                </div>
                <!--顶部-->
                <div class="inner">
                    <div id="pullrefresh">
                        <ul class="award">
                            <li v-for='item in datas'>
                                <p>
                                    <span v-cloak>第{{item.issue}}{{$t('期')}}</span>
                                    <span v-cloak>{{item.open_time}}</span>
                                </p>
                                <template v-if="code!='k3'">
                                    <p class="others" v-if="code=='PCDD'">
                                        <span v-for='it in item.luck_number' :class="[it=='+'||it=='='?'':'ball',bj28CL[it]]" v-cloak>{{it}}</span>
                                    </p>
                                    <p class="others" v-else-if="code=='hk6'">
                                        <span v-for='it in item.luck_number' :class="[it=='='?'':'ball',lhcCL[it-1]]" v-cloak>{{it}}</span>
                                    </p>
                                    <p class="others" v-else-if="code=='PK10'||code=='pk10'">
                                        <span v-for='it in item.luck_number' :class="it?('square '+'square-'+it):''" style="width:1.8rem" v-cloak></span>
                                    </p>
                                    <p class="others" v-else>
                                        <span v-for='it in item.luck_number' :class="it=='='?'':'ball'" v-cloak>{{it}}</span>
                                    </p>
                                </template>
                                <template v-else>
                                    <p class="fast3">
                                        <span v-for='it in item.luck_number' :class="['dice','dice-'+it]" v-cloak></span>
                                    </p>
                                </template>
                            </li>
                        </ul>
                    </div>
                    <!-- <p class="footer">
                        <a href="javascript:void(0)" @click='togofc3d'>{{$t('去购彩')}}</a>
                    </p> -->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "award_page",
  data() {
    return {
      datas: [], //数据
      id: "", //id
      name: "", //名称
      pic_url: "", //图片路径
      bet_url: "", //跳转到投注页面
      qici: "", //期次
      lastTime: "", //开奖时间
      courtDown: "", //倒计时
      deadlineTiming: "", //清除定时用
      code: "",
      bj28CL: [
        "gray",
        "green",
        "blue",
        "red",
        "green",
        "blue",
        "red",
        "green",
        "blue",
        "red",
        "green",
        "blue",
        "red",
        "gray",
        "gray",
        "red",
        "gray",
        "blue",
        "red",
        "green",
        "blue",
        "red",
        "green",
        "blue",
        "red",
        "green",
        "blue",
        "gray"
      ],
      lhcCL: [
        "red",
        "red",
        "blue",
        "blue",
        "green", //1
        "green",
        "red",
        "red",
        "blue",
        "blue", //2
        "green",
        "red",
        "red",
        "blue",
        "blue", //3
        "green",
        "green",
        "red",
        "red",
        "blue", //4
        "green",
        "green",
        "red",
        "red",
        "blue", //5
        "blue",
        "green",
        "green",
        "red",
        "red", //6
        "blue",
        "green",
        "green",
        "red",
        "red", //7
        "blue",
        "blue",
        "green",
        "green",
        "red", //8
        "blue",
        "blue",
        "green",
        "green",
        "red", //9
        "red",
        "blue",
        "blue",
        "green" //10
      ],
      all_TBet: [],

      //用于控制彩种选择区域显示
      s_middlePopover:'',

      isCollect:-1,

      collectList:{

      }

    };
  },
  created: function() {
    this.initData();
    this.all_TBet = window.all_TBet;
  },
  mounted(){
    this.userName=localStorage.userName;
    
    
  },
  methods: {
    //路由跳转返回
    routerBack: function() {
      if (localStorage.turnPathName && localStorage.turnPathName != "login") {
        // this.$router.push({ name: localStorage.turnPathName });
        this.$router.go(-1);
      } else {
        this.$router.push({ name: index });
      }
      
    },
    collectFn(){
      if(this.isCollect==1){
        this.isCollect=-1
      }else{
          this.isCollect=1;
      };

      if(this.collectList){
        // 

        this.collectList[this.id]=this.isCollect;
        localStorage.collectTrend=JSON.stringify( this.collectList);
      }else{
        this.collectList={[this.id]:this.isCollect};
        localStorage.collectTrend=JSON.stringify( this.collectList);
      }

    },
    initData: function() {
      this.id = localStorage.chartId;
      this.pic_url = this.webUrl + "./static/" + localStorage.lottery_img;
      this.bet_url = localStorage.lottery_url
        .replace("_", "")
        .replace(".html", "")
        .replace("?", "/");
      this.getBetsBannerInfo();
      this.getHistoryBannerInfo();
      var params = this.$route.params;
      if (params) {
        this.code = params.code;
        this.name = params.name;
      }

      if(localStorage.collectTrend){
        this.collectList=JSON.parse(localStorage.collectTrend);
        if(this.collectList&&this.collectList[this.id]&&this.collectList[this.id]==1){
          this.isCollect=1;
        }else{
          this.isCollect=-1;
        }
      }else{
        this.collectList={};
         this.isCollect=-1;
      }
    },
    refreshData(){
        if ($(" .refresh").is(".isClick")) {
        return
      }
      $(" .refresh").addClass("isClick");
      this.getHistoryBannerInfo();
      $(" .refresh").css({
        "transition": "transform 1s linear",
        "transform": "rotate(360deg)",
        "opacity": "0.5"
      });
      setTimeout(function () {
        
        $(" .refresh").css({
          "transition": "inherit",
          "transform": "rotate(0deg)",
          "opacity": "1"
        });
        $(" .refresh").removeClass("isClick");
      }, 1000)
        this.getBetsBannerInfo();
      this.getHistoryBannerInfo();
    },
    //数字彩点击跳转
	togoSkip: function(item) {
			localStorage.lottery_img = item.pic_url; //开奖页面用到图片url
			localStorage.lottery_url = item.bet_url; //开奖页面用到投注页面url
			localStorage.chartId = item.gameID; //一级玩法id
			this.initData();
        this.code = item.code;
        this.name = item.show_name;
			
	},
    //获取最新一期未开奖的数据
    getBetsBannerInfo: function() {
      var _this = this,
        obj = {
          //获取最新一期未开奖的数据
          type: "post",
          data: { one_type_id: parseInt(this.id) },
          dataType: "json",
          url: "/commonAPI/getIssueInfo",
          success: function(data) {
            _this.qici = "";
            _this.courtDown = "";
            if (_this.deadlineTiming) {
              clearInterval(_this.deadlineTiming);
              _this.deadlineTiming = "";
            }
            if (data.code == 200 && data.body) {
              _this.qici = data.body.issue;
              _this.lastTime = _this.getMilliseconds(data.body.deadline);
              _this.startTime = _this.getMilliseconds(data.body.response_date);
              _this.setTimeFn(_this.lastTime, _this.startTime);

              _this.deadlineTiming = setInterval(function() {
                _this.startTime += 1000;
                _this.setTimeFn(_this.lastTime, _this.startTime);
              }, 1000);
            } else if (data.code == 201) {
              _this.courtDown = data.msg;
            }
          },
          error: function(msg) {}
        };
      this.base.callCommonApi(obj);
    },
    //获取历史开奖数据
    getHistoryBannerInfo: function() {
      var _this = this,
        obj2 = {
          //获取历史数据
          type: "post",
          data: {
            one_type_id: parseInt(this.id),
            count: 20
          },
          dataType: "json",
          url: "/commonAPI/hisOpenData",
          success: function(data) {
            if (data.code == 200) {
              if (data.body.length != 0) {
                if (_this.code == "PCDD") {
                  for (var i = 0; i < data.body.length; i++) {
                    data.body[i].luck_number = data.body[i].luck_number.replace(
                      /,/g,
                      ",+,"
                    );
                    data.body[i].luck_number = data.body[i].luck_number.split(
                      ","
                    );
                    var sum =
                      parseInt(data.body[i].luck_number[0]) +
                      parseInt(data.body[i].luck_number[2]) +
                      parseInt(data.body[i].luck_number[4]);
                    data.body[i].luck_number.push("=");
                    data.body[i].luck_number.push(sum);
                  }
                } else {
                  for (var i = 0; i < data.body.length; i++) {
                    data.body[i].luck_number = data.body[i].luck_number.replace(
                      "+",
                      ",=,"
                    );
                    data.body[i].luck_number = data.body[i].luck_number.split(
                      ","
                    );
                  }
                }

                _this.datas = data.body;
                // _this.name = data.body[0].type_name_CN;
                // $('#flag').show();
              } else {
                _this.datas = [];
                // _this.name = "";
              }
            } else {
              _this.datas = [];
              // _this.name = "";
            }
          },
          error: function(msg) {
            // //console.log(msg);
          }
        };
      this.base.callCommonApi(obj2);
    },
    //点击去购彩跳转
    togofc3d: function() {
      $("#fixedGameList span.active").removeClass("active");
      $("#fixedGameList span[name=" + this.name + "]").addClass("active");
      // if(localStorage.app_flag==undefined){
      // window.location.href = '../' + this.bet_url;
      this.$router.push({ path: "../" + this.bet_url });
      // }else{
      //     mui.openWindow({
      //         url: '../' + this.bet_url,
      //         id: 'bet_url',
      //         styles: {
      //             top: base.getStatusbarHeight() + 'px',
      //             bottom: 0
      //         },
      //         createNew: true,
      //         show: {
      //             autoShow: true, //页面loaded事件发生后自动显示，默认为true
      //             aniShow: 'pop-in', //页面显示动画，默认为”slide-in-right“；
      //             duration: '200' //页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
      //         },
      //     });
      // }
    },
    // 获取毫秒数
    getMilliseconds: function(str) {
      str = str.replace(new RegExp("-", "gm"), "/");
      return new Date(str).getTime(); //得到毫秒数
    },
    // 获取倒计时字符串
    getDownTime: function(time, index) {
      var d = Math.floor(time / 1000 / 60 / 60 / 24);
      var h = Math.floor((time / 1000 / 60 / 60) % 24);
      var m = Math.floor((time / 1000 / 60) % 60);
      var s = Math.floor((time / 1000) % 60);
      var str =
        (h > 9 ? h : "0" + h) +
        ":" +
        (m > 9 ? m : "0" + m) +
        ":" +
        (s > 9 ? s : "0" + s);
      return str;
    },
    //倒计时及相关业务逻辑
    setTimeFn: function(lastTime, startTime) {
      var _this = this,
        deadlineT = lastTime - startTime,
        deadline_hour = _this.getzf(Math.floor(deadlineT / 1000 / 60 / 60)),
        deadline_minute = _this.getzf(Math.floor((deadlineT / 1000 / 60) % 60)),
        deadline_second = _this.getzf(Math.floor((deadlineT / 1000) % 60));
      if (deadlineT >= 0) {
        _this.courtDown =
          deadline_hour + ":" + deadline_minute + ":" + deadline_second;
      } else {
        _this.courtDown = "正在请求数据...";
        clearInterval(_this.deadlineTiming);
        _this.deadlineTiming = "";
        _this.getBetsBannerInfo();
        _this.getHistoryBannerInfo();
      }
    },
    //补0
    getzf: function(num) {
      if (parseInt(num) < 10) {
        num = "0" + num;
      }
      return num;
    },
    //页面跳转--返回
    goback_click: function() {
      this.$router.back(-1);
    }
  },
  watch: {
    s_middlePopover(val){
      if(val==1){
        var w= document.body.clientWidth;
        $("#middlePopover").css({
          top:"50px",
          left:(w-280)/2+"px"
        });
        $(".inner").css({
          overflow:'hidden'
        });
      }else{
        $(".inner").css({
          overflow:'auto'
        });
      }
    },
    $route(to, from) {
      if (to.name == "award_page") {
        this.initData();
      }
    }
  }
};
</script>
<style scoped>
[v-cloak] {
  display: none;
}
body {
  margin-bottom: 48px;
  padding-top: 4.66rem !important;
}
#container{
    
    /* background: #f9f6f6; */
}
#container {
  background: url(../../../assets/images/base/black_bg.png);
  background-size: 100% 100%;
  height: 100%;
  height: calc(100% - 44px);
  /* padding: 10px; */
}
#main {
  padding-top: 44px;
  padding-bottom: 3.5rem;
  overflow: hidden;
  height: 100%;
}
#main .inner{
    height: 100%;
    overflow: auto;
}
#header {
  height: 44px;
}
#header .mui-title {
  color: #fff;
  margin: 0 20%;
  width: 60%;
}
#header .mui-icon-loop {
  float: right;
  line-height: 44px;
  margin-right: 0.5rem;
  color: #fff;
}
.goBack {
  /* line-height: 4.66rem; */
  width: 44px;
  height: 44px;
  top:0px;
}

.info {
  background-color: #fff;
  height: 80%;
  border-radius: 2rem 0 0 2rem;
  padding: 0.3rem;
  box-sizing: border-box;
  position: absolute;
  width: 78%;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  overflow: hidden;
}
.info_left {
  float: left;
  width: 3.1rem;
  height: 100%;
  margin-right: 0.4rem;
}
.info_left img {
  width: 100%;
  height: auto;
}
.info_right {
  float: left;
  width: 80%;
}
.info_right > p {
  position: relative;
}
.info_right > p:first-child > span:first-child {
  font-weight: bold;
  font-size: 1.2rem;
}
.info_right > p:first-child > span:last-child {
  color: #ec0909;
  font-size: 1.4rem;
}
.info_right > p:last-child > span:first-child {
  color: #999;
}
.info_right > p > span:last-child {
  position: absolute;
  right: 0;
}
.award {
  background-color: rgba(0, 0, 0, 0);
  margin: 1rem;
}
.award > li {
  border-bottom: 1px solid #cccccc;
  font-size: 1.1rem;
  padding: 0 10px;
  box-sizing: border-box;
  position: relative;
  color: #fff;
  padding-bottom: 0.5rem;
}
.award > li > p {
  line-height: 2rem;
}
.award > li > p:first-child > span:last-child {
  float: right;
}
.award > li > p.others > span {
  /*font-size: 2rem;*/
  display: inline-block;
  margin-right: 0.3rem;
  height: 2rem;
  /* line-height: 3rem; */
  vertical-align: top;
  color: red;
  font-size: 1.4rem;
}
.award > li > p.others > span.ball {
  width: 2rem;
  height: 2rem;
  line-height: 2rem;
  font-size: 1rem;
  vertical-align: middle;


  background: url(../../../assets/images/base/ssc_ball.png);
  background-size: cover;
  text-align: center;
  color: #1a1a1a;
  font-weight: 700;
}
.award > li > p.others > span.green {
  background: #38be4f;
}
.award > li > p.others > span.blue {
  background: #0e86e3;
}
.award > li > p.others > span.red {
  background: red;
}
.award > li > p.others > span.gray {
  background: #a3a3a3;
}
/*快三*/
.dice {
  height: 1.8rem;
  width: 1.8rem;
  display: inline-block;
  background-size: 100% 100%;
  vertical-align: middle;
}

.dice.dice-1 {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAABCFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD9/f3o6Oj5+fkAAAAAAAAAAAAAAAAAAAD7+/sAAAAAAADw8PD4+Pny8vLa2tuDg4Ozs7Tj4+MAAAAAAABBQUF6enr09PXy8vTp6uv6+vrh4eHv7+/39/eamprg4OATExMUFBQgICAhISH////29vf+/v7sCQn39/j8/P329/n5+fr19fX7+/v4+Pn9/v77+/zqCQn+9vbZCAjZW1vvPT3tFRW+FRXnCQniCAi0Bwf/+vr20dH3lZXuhITwODjgLCzQISG5Dw/HBga0Bgb95eX1zc24BQWem8y+AAAANHRSTlMDDBwATTNkCAoQFBhAMCEqHvnd1kpGNi0o9WFX8e7Y1pNwYF1UJRT6+Ovh4N3cjnNpZkc96NuwPAAAAm1JREFUSMe91+d22jAYBmCckHqzN5lN0r0rCcnGYs8maVbb+7+TfhY2wecEbPlH3p86PH4lDqCPzP4qmcQJQchUVVNio6mqoCEE9rpcJOugSAiEEcZIr/jhq64AFUa4N2VEmMspxpQFLEIZxSLc+3ypaxmBhGsCo13c7XpoS7yV7LpHl4aQGXBaGRyGuARtDeFdCMjjnC8BwvkQcbvggrrdpZSdFXTV78soUIhhmwzFhPmN2C3lTSUDUfUi8TcKLlZiCG/WclAJ0ECEYtEXL/1KZjUMH2omwKfzxZ+TVOumBlDZQwRzlDAc417F3lNCSJJCAo3ZgxD2PJQ43iYkSCI0LWS9lJBsNMrl5SHaCYfj2XI5Gw9l4d/7x4fRYjG6u5KDw/t/o/mg0xnMb4dScPw4AuZncCMFZw/zTpCJFFxCYZCpHFx00sEZwFRbHT9t9VoKDu/mgfv9Swqiq9vByv2R/sjdTKbTyTX0xUCZvPjXKv1PR0rI0kK+CfvJXZ9uQpq4k9AodJNCNwox7SfdKMaRRocmu1gppZytYZFwTJNd5Q523OYaHhMXKuM7mePA67xScLFq5hny4EkO7sedj1IMzz8NrnLVyH9iVGTngOQ6EOp4pXYwPKh67ueRB1uFVWdrKfPbMJzw8HtWjCsQxcz/KLkY1gHz54dATsX5qPvx24W1GpD2obJgW19O3r9zsP+uca8XZT2PwzLG/O3hyWnrwrLFSCaGQCNnW9n2eetVTFrn7axlh0OgkIV8zapWsjGpVK1aviAcQCF1M9eo2wcxseuNnKmD2xitFd0w92JjGsFoHR3mNZlhPvXfh/9x1uL0AjkLCQAAAABJRU5ErkJggg==");
}

.dice.dice-2 {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAABL1BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAwMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD9/f0AAAAAAADv7+/x8fH4+PgAAAD5+fn09Pb4+Pjf398AAAAAAABSUlL39/f5+fnl5eXp6erj4+PY2dn5+fns7Ozv7+9zc3WRkZN8fHza2tqtrbClpaXl5eXX19cTExMWFhYgICD///8zMzP9/v729/j29vb39/n8/P37+/v4+fr5+vowMDAoKCgtLS0GBgb4+Pg4ODjl5eXNzc0lJSUhISEPDw/3+Pjz8/OAgIB7e3taWlodHR0YGBgUFBTu7u7q6uqxsbGsrKylpaWUlJROTk5GRkZCQkI9PT01NTULCwv+///V1dXT09OOjo5wcHBubm5lZWUaImq2AAAANXRSTlMEAQ0cTTNkCQsYIBAsMD8VE14o+EY179TPV/j47t1TQg/n397d29jT08+QiYhoZ2ZYU0Q6IP1LOVAAAAKgSURBVEjH7ddpd6IwFAZgW20DKO5L7T77vg8SCSDiUrVadTrd29n//2+YG4STOpkh4pmPfc/RD4nPuQE0ucZWgsQWCvt4oBCSJGk1NPABhKhlMIbePil80YNoc4EBohMCb4X7r5IS8olXbn9Dg1m7hTEmjDFKcN0Ltisfk1A0gPvbMGfRSVP7R8z6LNY9JSv5MIY2qKOjrBpftTWT9jMli6gC9w6GbVYuvCg23yiwWgolWhCGiCYI8aT1NCVLFKJkAQoyJ5KtzRKUpA8wAysdMCeSmKTzGbizMUkGiE2RYdepF2GtFMYBWtqCsQAmVAb559A5cpzzLv9UKFyLU7gKkHenrjsd98ZDfrEeXJ1BPt/cvtOAND9zUzgUXt44jRrNEX9nQ+F0As5Li7vKUNg/COAnbi4UHji+u9SiwWHPr/hd4xMGtYvm7N7Uo0Jz1K7V2sNDTQT54G6XMQHkcgf/Nzw8Oe0sAe1z173pX3WiQt1xJ06z2WwfR4Qjd+x9WRujiLA3BUdzFfFn1e8t+UOeOL67tqNtHRfB1vEr4mb11YfX/JZs3Ib8hnzSprLNb6smnoO8PD778fOsw98ZzGC0Q+c2jHLM4T+hsdjBCs4gPpTicJQbGJMFnIENo7UJUPJgBa4Re1LsMLYfBQer/BqaBwMGTfH1QchL/yhHmXxFJwMMCW2QLMOgFe2dqtc80HZF+bCt2zAGE2Z4OQNb5fXErF1ZgbWm3j/ULX/i702gVw3m7Z313TRdKYVQUt178aC8hb2qA5vMM2LPkLFVfvw8t7un+i0ZyKyiphPVXG5dkFyumkirQRMILymrpErpYkKYYrqU8tpOH8JqZSWfUtcEUVN5RWaNLn1HUjIjy3FBZDnDWmvWzCNxM49YM7/034ffWfrvYaJDv1AAAAAASUVORK5CYII=");
}

.dice.dice-3 {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAABL1BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAwMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD9/f0DAwMAAAAAAADv7+/j4+P4+Pj5+fn09Pb4+Pjr6+zb29vz8/Pu7u53d3jf398AAAAAAABSUlL19fX7+/v5+fmRkZOtrbClpaXX19cTExMWFhb///8zMzP9/v739/f29vb39/n7+/z8/f35+fr19fYwMDAuLi76+vssLCwgICBra2sJCQnKysoTExP4+Pnl5eVeXl5FRUUoKCgNDQ0EBASioqKEhIQlJSUaGhoXFxfFxcWzs7OLi4tSUlLz8/Pt7e3Z2dnT09O8vLy3t7etra2Tk5N3d3dxcXFvb29AQEA9PT0GBgapqamdnZ2Xl5dZWVk1NTUT2iIUAAAAL3RSTlMDDBwATTNkBwkgEBgsPy8VE1Uo+GFGNe/dz/j449va0tGMYF1CD/Dr04lnZlNEOi//UpEAAALjSURBVEjHnddnV+JAFAZgQDSNLvZetpeQSTIJJCFIF7B3XXXb//8Neyd1swdS9j1+mpzHe8eJzCU1ZycVNx5wGEXR6RihKSrlENvR++8XBS98ILCABQw/wuLmPpumQTowRb1Zg8ey1kYIyT7zqYxEK0jbybA0ZSHLveMFrCBVVWV+RmTRTnuTKaUpokifa8TBqiLwMyO0RVUVVVHbZUrQLYH0Z1jWwDnlwosi+RPDUqQelYaCsqgSF0cquzkOmgXILloFMR8ZbO1yfZlhCaSL0Cmy60XXVFWE85UiDTDNEei56G6FJeiVwAxAxXt0fXwX1rQCMDuf8aB7Di1jaA6OnkJOJQg9Z5qG3mj0myHNBqAbw+zXa5DG6WyJpsDroQGOZBRScgo8NvWanZBehSnwbNBw4CM/O1MgPnLhfTLIP/VtdxH6PvjQT7NhuQ6fFPKno+bjPanX6vZ+3cWGfi6G5snkpCcmhd3hid6o1/VuQtgBVyOpt5LBkdmv2fmZDDa9Az1PBh88eJwMXk4c+LuTDPIjZ48/Ep/jwwuwF9Ko2tTHvbPYkFdvv99ekldp8HpkGJNuTOj7wWAMb0JdP08Im69j+0PhGXv/VrGg7h3MTTI4NuoObLkuHux58MpZkePBs4kDv7kr0t9QmC27uuV6HbcgCsAQef5M6rlOQEGohN2KN60r/9IJwATXHPoXSjiOw+Ak7EG4yiWEcAwnIUlqr3twB/aIQMZxCGmrLuQ+wvAgwaIcvT+IvOdc5XSxsiVgRBI6ICkS+eVQsOwMDxTLfH0raLAGD+TwchJSVqpZZ1yh0lzuy5a1S4LxtCEQ29WQpGwvlPP2gAQjGcsUDj+srmxYEJrBQYY1G0kbK9t71fJhgRS0h8ASU8hnywfVhYhUD8rZfMEdAueg2RKTW84vZSOzlF/OeWMnkTTLMZVcYT4ihVyF4axB1x+t02yRy0SGK7LW3yU4zNMxZnl/mP/vrw9/AAGZwDMteYRiAAAAAElFTkSuQmCC");
}

.dice.dice-4 {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAA21BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4+PgAAAAAAAAAAAD9/f329vfo6OgAAAAAAAAAAAD5+frx8fEAAADw8PDa2tvk5OQTExNBQUF6enrp6uv6+vrh4eF+fn6IiIiampq3t7mvr6/c3NwgICAhISH////sCQn39/j9/f329vbkCAj7+/zsFRXXCAi0Bwf6+vv4+fn6tLTum5vkhYXigYHdVVXxSEjsQ0PCGxu/GBjCBwewBQX2fn7PPz/MBwf2+Ppj8sXDAAAALnRSTlMDDBwATTNkBwkZECEUKzBF119WKPny3UpANvbaP/HWa2clFOvh4JaPjnFwXkc9fJsbHQAAAjdJREFUSMftl9d6ozAQRsF2FlHdu9O2V1ljZFukty3v/0QrJFBihFfa3OQm526A883oYj79OE2JY4sSCs3zkGsB8jyuKtHx0HFngKEE7wCKwfvjgLvSEd7bDgbKCFmtCAWsAZSsBIR1TgNpOsKbATDxjuI90JUkG55Grpdb/HyoA5CJp4D3Apk02TyMkOPkIvqGgWnt9jUl8DUMUN7PcztAlWc22Sj2+bBcDAaiIWAjIFrOpmGQiyjCQFQ/i54w6UeIi67PReFZmtDms+Zig4+QYUsyLo6ThhLBVgQutg6USLHi8m67vb3YX9MdESt+Pdxv0nRzpdUKUitePvxOl5z0XKtLaK14d58uBTdaXQJPxEe2m6VkrdWKejGtiKmleFt+eK3XijrxohztrFobRHwlW/zUapOIz2/W6+szra4XzbyKzxXN+6iL5n00iOZ91EXzPipech/hf/YRNNFyH6kmWu4jeSpS+32kOyKxvwLIrmh/6VREYnvNkapIwG7QHXEga0svmylxDpkyjR5ho/Ji9b9gJh5R0/kE8Km4ylHUnwMR/DMgMVI07BXhwQvCH0NGJNTQjmSHJ60irniuH38fZaQAakPgHyJhH056ExmQeCQLwqT9+ejdsHwJ2pCS4eHRx26vnchI1sxPGSaTVq/bfWOg2+21FkkZApt82CiMp4v2uGVg3F5M40YRO2VADvywHycHBpK4H/oq6HL4tG4Q+X7DgO9HgcvnrIR5ZJHlH8P8s38f/gLNwrCxSczkhQAAAABJRU5ErkJggg==");
}

.dice.dice-5 {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAA4VBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD9/f35+fnz8/MAAAAAAAD6+vrk5OQAAADz8/Xw8PDr6+uDg4Ozs7QTExMAAAAAAAAAAABBQUF6enr5+fr6+vrp6uv6+vra29vZ2duamprg4ODo6Ojc3NwgICAhISH///8yMjL29vf9/v739/krKysGBgb7/Pz6+vs7OzsiIiL19fb9/f34+fnAwMClpaWMjIyIiIhmZmZhYWFeXl4hISEcHByUlJRHR0caGhoSEhIRERHg5f83AAAAL3RSTlMEDAEcMk1kCRkQFCwhPyge+djYRjbv4Ff58dqTcGddVEMlFPj36+Ha0o5zY15HPewlqQ0AAAJ1SURBVEjHnZfndqMwEIVNjCPA4O44vW2viiSQbGCTTdv2/g+0IxBWWFgEvifxj2s+7uh4PIx7e4V6raQvLyiErBZCSLIa7KFP0wndCpcknYQm8Dd5+9G1kEKyuOspplykBMQ1plFOcqVieuVCaAFeL2kiSEziWOD/SORknC6vPEuBPTSlSZaW6rRqahqDSCxmvockBdxnTEUMnIozhCanY6hWgtZMniGOOTaIy0QijoeOJUHkTqiQd8JGJdl5Xi98F8kP0MOUEZVnzITIJBh5CHrBcjAtnc90TjqHWiXYBzDFub4/R9HTHVaq8VIAB3Z/C9Lc/hn92YTh5qFgqh4tg0LdO/oV3oDCWwXVeKIE4lzPv+EaqUcNVrw6MNrc5FprsOLxOjCsgFWPvgALPRUX3eMGrwa8K8r6hmu8BhA/5Lf/gXGTp0Gt28f1+l7nVbwqqNXQQ2ZQ90tXUPdLR1D3S0dQ90tXMNwR1P3SEdT90hHU/dIN1P1iBI0zpxk0z5wqaJ45dV+rLjMH7zpz6K4zh5fADjOHvQR5+5nDax8B5plDSRlMzTOn/qFDOG4lTv4BmSZNHEu24ISyto9yRlj6agvOaAqOOZMz4Ig4KEDnFAtwoFpznbLSE/UoR95oxhkxLkiCgQgTB6t8eYB1xf+6FEDKVN4cByc8Ohvk68oe1Dr8cpyqN1j9EpgdJcs7uwhkpRJE7ti+/PD+zaFKFUkZS0QGEXZ49O5k/+LSVisZkJ5vB4PV+b5R56tBYBdLIPxb3ni4COYDo+bBYjSWa6cCoVrHHw1to4Yj39GLrnxFlus5Tt8gx/FKq3Ue2mabR3qZ3/nnw19mmrwUFBuBMwAAAABJRU5ErkJggg==");
}

.dice.dice-6 {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAABfVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQAAAAAAAAGBgYAAAAAAAAAAADz9PX9/f0AAAAAAADv7+/29vYKCgoAAAAAAAAHBwf5+fn4+Pji4uLr6+z5+fnu7u7f398AAABSUlL39/f5+fnl5eXd3d3Y2dnx8fJzc3WRkZN8fHza2tqtrbClpaUKCgr///8zMzP9/v729vb3+Pj39/cuLi77+/z39/n8/f0XFxf5+fowMDApKSksLCwICAgEBAT6+vsSEhL4+PmVlZU4ODj19fXd3d2Li4uBgYEmJiYMDAzq6urm5uZ3d3d1dXVQUFCzs7Ovr6+jo6NjY2MQEBDQ0NC8vLyGhoZ7e3tZWVkODg719fbh4eHZ2dnU1NS5ubmsrKypqamfn5+Pj49wcHBra2tdXV1KSkpISEhEREQ/Pz8hISEbGxvv7+/Y2NhUVFQ1NTUDAwP+///Nzc3Jycm1tbWampqFhYVeXl47OzvJIPy4AAAANHRSTlMDDBwAM01kBwkYEBRLITA/NionHvv4Ri3v0GNfV0P47tzb0dFVUw/n397c2NSQiYhoZ2ZmK7CZSwAAA8tJREFUSMfNl2dX2zAUhjEt9chide+9NziSZ5w9SEIgCVA2pVAoBbp3f3uvbEnGhxZxevqhL5wDr3Uf36tYlm56jgTqOaw4QDFZVqRDSJHlHooEnHLtyvFPOtNIRHDB1m341Y/feqRJCpAU7JFvXIFhs4AwxibFIqiJ075w4XSvpsg+5HMXR3TbxdVq1Rz5g8x0oNLNREySCUXqPE04uOqG2fZnRelqNV1NF64mYlAtgDA/uFwAjqY7OCk2nwxpMsknS5DQTC9RTki6VwdUKBZA7bif0KbDzzfbm8/C6NZke3qW/m8TEF3oT2gEVGJkAjzf+3yu6DgLjJvIEbs9zHIuLWE7NRhTAJRUADHjFvJO1sgY2Y3Azn0sesS+31OtfuKkKhGwF0CXDtSAG/W14sc1i4E1VmmAC2A8GYI6r8wbDTRFbDffoLbOngoBj/ZykE3pVdGgkWVix5rMToYfrd7HwVDzDot8QWxnhtkxHoJ+Cy4zsDLu+zcMDB+QGQG5Nugc1wNbprYeRuhRkKv+AeJ+TjH7bQfsh7G9qyoKhhrvrnfehna4s/6iBX/FoFj/GHxWaeaLbV5c6/VifnHnuRjs5HJvvGzDWKGvymLOaWQ9b1UEppuLXoasTfp67OYaBtjMDhKA9XwDOBLqP/HV/C61XQH4eiay5CabWbbkRKCToZFdH+Rr/qWoVA7WiJ3l4KwAxLs0cjPwGVpq2xQ9jq+jGT9wPLDvKr7dXhEvgHeT25V2ucpXbn2rsvV9PBLyv6zVkeX5V/O10L6d+7Hx+TCv1bS/IU8zO5fLzTjOFhaBwDmeYRjeRGBffiwSm10QbR3LfEOu+UHNmcAas4LNaj66IXf4hjzHQywA/2pDRgyMHgF8Q14jtrtvQ9YRZmD00OEbcotYm2/IX9ihg6IZ+TE37fFK/VrpHCdYoRhHMyLLZsX6+YCjz6NCfJ1WZCOESjYH4SgvYczI2lR5rbVnf14rT7GFZFvYskoX4gy8B3OEWzFyvziHLIQKl9jBqj6G5sGCm4naFYQw/JgP6VGuxAYv6zYiOrBBci0LMkLCc7R5kLVE/0W9ANdg4M8tGcmGLeyeOtNH2xVZUgfOX9ZdGAG4ZP+uCbRLfjZUcu88vZ4KGiRoybSh5PkHt08NkztCQMGOYnahBAMwMnzq7v2z188ng5bsCJllIpnqO3f2zDGBzpw9F08lWRN4BIqNDQ30p07E430HKh4/keofGGJtJyEVTU0MnkweFSh5cjCh0kaXtdaSFlPVXoFUNab5n0u0mVckoZSwmf/rrw+/AEBTBIegG3r5AAAAAElFTkSuQmCC");
}
/*底部按钮样式*/
.footer {
  position: fixed;
  bottom: 0;
  padding: 0.5rem 0;
  box-sizing: border-box;
  background-color: black;
  width: 100%;
}
.footer > a {
  /* background-color: #d91d37; */
  display: block;
  width: 80%;
  margin: 0 auto;
  color: white;
  text-align: center;
  border-radius: 4px;
  padding: 0.9rem 0;
  box-sizing: border-box;
  font-size: 1.3rem;
}


 span.collect{
  background: url(../../../assets/images/star_empty.png) no-repeat ;
  background-size: contain;
  width: 25px;
  height: 25px;
  top: 10px;
  right:50px;
  position: absolute;
}
 span.collect1{
  background: url(../../../assets/images/star_full.png) no-repeat ;
  background-size: contain;
  width: 25px;
  height: 25px;
  top: 10px;
  right:50px;
  position: absolute;
}
/* background: url(../assets/images/base/ssc_ball.png);
  display: inline-block;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  font-size: 16px;
  color: #1a1a1a;
  font-weight: 700; */
</style>

