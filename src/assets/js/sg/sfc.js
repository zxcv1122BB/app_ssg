export default{
  name: 'sfc',
  data(){
    return {
      all_count: 3, //总场数
      select_count: 0, //已选的场数
      flag: true, //判断是否显示
      sel_num: 0, //定义一个数组用来存放已选的场次。
      prevDataList: [], //定义一个存放对象的数组。
      multiple: 1, //投注倍数
      session: 0, //期数
      datas: [], //存储接收数据
      banner_number: 0, //期数
      endTime: "0天0时", //截止日期
      matchIdList: [], //储存march_Id
      isShark: true, //判断是否点击
      iftipsContent: false,
      tipsContent: '',
      isSelecting: false,
      isAble: false,
      selectNum: 0,

      state: '游客',//查看状态(游客或者登录后的余额)
      coin: "", //钱包可用钱数
      singleMaxSum: "", //投注金额上限
      coinUnit: "元",//金额单位
      sharkTime: "",//摇一摇定时器
      isNoMsg:"",//无比赛记录
      countTimingNum:20000,
    }
  },
  created: function () {
    this.loadData();
    //		this.get_userState();
    this.getSysConfig();
        this.startCountWorker();
    this.pullToRefresh.setNowThis(this);
  },
  mounted:function(){
    this.initDom();
    this.induced_vibration();
  },
  methods: {
    //路由跳转返回
    routerBack: function () {
      if (localStorage.turnPathName && localStorage.turnPathName != "login"&&!localStorage.userName) {
        // this.$router.push({ name: localStorage.turnPathName });
        this.$router.go(-1)
      } else {
        this.$router.push({ name: "index" });
      }

    },
    pulldownRefresh: function (_this) {
      _this.loadData();
      _this.get_userState(1);
    },
    initDom:function(){
      // if (localStorage.app_flag != undefined) {
      //   var _this=this;
      //   //mui.init({
      //     pullRefresh: {
      //       container: '#pullrefresh',		//下拉容器
      //       down: {
      //         style: 'circle',				//下拉刷新样式
      //         offset: '50px',
      //         range: '200px',	 //可选 默认100px,控件可下拉拖拽的范围
      //         callback: pulldownRefresh	//刷新后执行的函数
      //       }
      //     }
      //   })
      //   function pulldownRefresh() {
      //     var that=this;
      //     setTimeout(function () {
      //       _this.loadData();
      //       _this.get_userState(1);
      //       // mui('#pullrefresh').pullRefresh().endPulldown();
      //       this.endPullupToRefresh(false);
      //       //mui.toast("刷新成功");
      //     }, 1500);
      //   }
      // }
    },
    //摇一摇功能实现
    induced_vibration:function(){
      var _this=this;
      if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', deviceMotionHandler, false);
      } else {
        _this.tips("您的设备不支持位置感应", "", 0);
      }
      var SHAKE_THRESHOLD = 2500;
      var last_update = 0;
      var x, y, z, last_x, last_y, last_z;
      function deviceMotionHandler(eventData) {
        var acceleration = eventData.accelerationIncludingGravity;
        var curTime = new Date().getTime();
        if ((curTime - last_update) > 100) {

          var diffTime = curTime - last_update;
          last_update = curTime;
          x = acceleration.x;
          y = acceleration.y;
          z = acceleration.z;
          var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;
          if (speed > SHAKE_THRESHOLD) {
            _this.sharkitFn();
          }
          last_x = x;
          last_y = y;
          last_z = z;
        }
      }
    },
    //获取登录状态
    get_userState: function (isRefresh) {
      var that = this,
        userNameMsg = localStorage.userName;
      if ((userNameMsg && that.coin === "") || (userNameMsg &&isRefresh)) {
        that.isLogin = true;
        var getUserInfo = {
          type: "post",
          url: "/authApi/getCoin",
          async: false,
          data: {
            "username": localStorage.getItem("userName"),
            isWhite: true
          },
          success: function success(data) {
            if (data.code == 200) {
              that.coin = (parseFloat(data.body.coin)).toFixed(2);
              that.state = "钱包:" + that.coin + that.coinUnit;
            }
          }
        };

        this.base.callAuthApi(getUserInfo);
      }
    },
    //获取系统配置相关信息
    getSysConfig: function () {
      var that = this,
        getSingleMaxSum = {
          type: "post",
          url: "/commonAPI/privacy/getSysConfigureResult",
          data: {},
          success: function (data) {
            if (data.code == 200) {
              if (data.body.coinUnit) {
                that.coinUnit = data.body.coinUnit;
              }
              localStorage.config = JSON.stringify(data.body);
              that.singleMaxSum = data.body.singleMaxSum;
            }
          },
        },
        config = localStorage.config ? JSON.parse(localStorage.config) : '';
      if (!config) {
        this.base.callCommonApi(getSingleMaxSum);
      } else {
        if (config.coinUnit) {
          that.coinUnit = config.coinUnit;
        }
        that.singleMaxSum = config.singleMaxSum;
      }
    },
    //时间worker
    startCountWorker: function () {
      var that = this;
      var timing = 4,
        countNum = 0;
      that.countTiming = setInterval(function () {
          // countNum += 1;
          // if (countNum >= timing) {
        that.countTimingNum-=1000;
        // //console.log(that.countTimingNum)
        if (that.countTimingNum==0){


            clearInterval(that.countTiming);
          Object.assign(that.$data, that.$options.data())
            that.startCountWorker();
            that.loadData();
            that.getSysConfig();
        }
            // var isUseTime = setTimeout(function () {
            //   location.reload();
            // }, 5000);
            // mui.confirm('是否刷新本页面', '确认框', ['确定', '取消'], function (e) {
            //   if (e.index == 0) {
            //     location.reload();
            //   } else {
            //     window.clearTimeout(isUseTime);
            //   }
            //   //console.log(e.index)
            // });
          // }
      }, 1000);
    },
    //页面跳转--返回
    // goback_click: function () {
    //   if (localStorage.app_flag == undefined) {
    //      this.$router.push({ name: "index" });
    //   } else {
    //     var h = plus.webview.getLaunchWebview(); //获取首页窗口
    //     localStorage.renovate = 1; //存入变量控制首页刷新
    //     mui.fire(h, 'refresh'); //传值给首页执行的方法名
    //     setTimeout(function () { //延迟关闭本窗口，目的是给首页足够的刷新时间做判断是展开哪个页面.
    //       var ws = plus.webview.currentWebview();
    //       plus.webvie
    // w.close(ws);
    //     }, 500)
    //   }
    // },
    //点击委托投注规则
    togorule: function () {
      this.$router.push({ name: "sgHelp" });
      // if (localStorage.app_flag == undefined) {
      //   window.location.href = '../rule.html';
      // } else {
      //   mui.openWindow({
      //     url: '../rule.html',
      //     id: 'rule',
      //     styles: {
      //       top: base.getStatusbarHeight() + 'px',
      //       bottom: 0
      //     },
      //     show: {
      //       autoShow: true, //页面loaded事件发生后自动显示，默认为true
      //       aniShow: 'slide-in-bottom', //页面显示动画，默认为”slide-in-right“；
      //       duration: '200' //页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
      //     },
      //     createNew: true
      //   })
      // }
    },
    //点击帮助
    togohelp: function () {
      localStorage.singTo = this.$route.name;
      this.$router.push({ name: "rule" });
      // if (localStorage.app_flag == undefined) {
      //   // window.location.href = 'help-sfc.html';
      //   localStorage.singTo = this.$route.path;
      //   this.$router.push({ path: "./help" });
      // } else {
      //   mui.openWindow({
      //     url: 'help-sfc.html',
      //     id: 'helpsfc',
      //     styles: {
      //       top: base.getStatusbarHeight() + 'px',
      //       bottom: 0
      //     },
      //     show: {
      //       autoShow: true, //页面loaded事件发生后自动显示，默认为true
      //       aniShow: 'slide-in-bottom', //页面显示动画，默认为”slide-in-right“；
      //       duration: '200' //页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
      //     },
      //     createNew: true
      //   })
      // }
    },
    //加载数据
    loadData: function () {
      var _this = this,
        getData = {
          type: "post",
          contentType: "application/json",
          url: "/commonAPI/getMatchInfoByPlayId",
          data: {
            "playTypeId": 14
          },
          dataType: "json",
          success: function (data) {
            //console.log(data);
            var list = [],
              sessionsList = [],
              obj;
            //													data.body={};
            //							data.body[0]={"10086":[{"home_team_name":"尼斯","is_win_draw_lose":"1","sessions":"008","away_team_name":"里尔","deadline_bet":"2018-03-02 23:50:00","letball_win":"3.150","letball_number":"-1","match_id":"F20180302008","league_name":"法甲","letball_draw":"3.250","home_lose":"4.550","letball_lose":"1.990","match_status":"1","home_win":"1.650","is_letball_win_draw_lose":"1","home_draw":"3.300"},{"home_team_name":"阿雅克肖GFCO","is_win_draw_lose":"1","sessions":"009","away_team_name":"朗斯","deadline_bet":"2018-03-02 23:50:00","letball_win":"6.300","letball_number":"-1","match_id":"F20180302009","league_name":"法乙","letball_draw":"4.100","home_lose":"2.600","letball_lose":"1.380","match_status":"1","home_win":"2.600","is_letball_win_draw_lose":"1","home_draw":"2.780"},{"home_team_name":"柏太阳神","is_win_draw_lose":"1","sessions":"004","away_team_name":"横滨水手","deadline_bet":"2018-03-02 18:20:00","letball_win":"3.630","letball_number":"-1","match_id":"F20180302004","league_name":"日职","letball_draw":"3.350","home_lose":"3.550","letball_lose":"1.800","match_status":"1","home_win":"1.820","is_letball_win_draw_lose":"1","home_draw":"3.350"},{"home_team_name":"凯泽斯劳滕","is_win_draw_lose":"1","sessions":"006","away_team_name":"柏林联合","deadline_bet":"2018-03-02 23:50:00","letball_win":"1.600","letball_number":"1","match_id":"F20180302006","league_name":"德乙","letball_draw":"3.650","home_lose":"2.050","letball_lose":"4.350","match_status":"1","home_win":"3.050","is_letball_win_draw_lose":"1","home_draw":"3.200"},{"home_team_name":"德累斯顿","is_win_draw_lose":"1","sessions":"007","away_team_name":"达姆施塔特","deadline_bet":"2018-03-02 23:50:00","letball_win":"3.320","letball_number":"-1","match_id":"F20180302007","league_name":"德乙","letball_draw":"3.450","home_lose":"3.850","letball_lose":"1.860","match_status":"1","home_win":"1.740","is_letball_win_draw_lose":"1","home_draw":"3.400"},{"home_team_name":"墨尔本城","is_win_draw_lose":"1","sessions":"001","away_team_name":"墨尔本胜利","deadline_bet":"2018-03-02 16:40:00","letball_win":"5.000","letball_number":"-1","match_id":"F20180302001","league_name":"澳超","letball_draw":"4.250","home_lose":"2.400","letball_lose":"1.440","match_status":"1","home_win":"2.400","is_letball_win_draw_lose":"1","home_draw":"3.400"},{"home_team_name":"大阪樱花","is_win_draw_lose":"1","sessions":"002","away_team_name":"札幌冈萨多","deadline_bet":"2018-03-02 17:50:00","letball_win":"2.450","letball_number":"-1","match_id":"F20180302002","league_name":"日职","letball_draw":"3.350","home_lose":"5.250","letball_lose":"2.370","match_status":"1","home_win":"1.460","is_letball_win_draw_lose":"1","home_draw":"3.950"},{"home_team_name":"川崎前锋","is_win_draw_lose":"1","sessions":"003","away_team_name":"湘南海洋","deadline_bet":"2018-03-02 17:50:00","letball_win":"2.250","letball_number":"-1","match_id":"F20180302003","league_name":"日职","letball_draw":"3.450","home_lose":"5.600","letball_lose":"2.530","match_status":"1","home_win":"1.400","is_letball_win_draw_lose":"1","home_draw":"4.250"},{"home_team_name":"布尔格","is_win_draw_lose":"1","sessions":"010","away_team_name":"阿雅克肖","deadline_bet":"2018-03-02 23:50:00","letball_win":"1.770","letball_number":"1","match_id":"F20180302010","league_name":"法乙","letball_draw":"3.550","home_lose":"1.850","letball_lose":"3.550","match_status":"1","home_win":"3.500","is_letball_win_draw_lose":"1","home_draw":"3.300"},{"home_team_name":"多德勒支","is_win_draw_lose":"1","sessions":"019","away_team_name":"特尔斯达","deadline_bet":"2018-03-02 23:50:00","letball_win":"4.020","letball_number":"-1","match_id":"F20180302019","league_name":"荷乙","letball_draw":"4.100","home_lose":"2.620","letball_lose":"1.570","match_status":"1","home_win":"2.130","is_letball_win_draw_lose":"1","home_draw":"3.600"},{"home_team_name":"卡昂","is_win_draw_lose":"1","sessions":"007","home_team_id":"902","away_team_name":"里昂","deadline_bet":"2018-03-01 23:50:00","letball_win":"1.800","letball_number":"1","match_id":"F20180301007","league_name":"法国杯","letball_draw":"3.550","home_lose":"1.780","letball_lose":"3.420","match_status":"1","match_date":"2018-03-02 04:00:00","event_id":"2717485","home_win":"3.650","is_letball_win_draw_lose":"1","away_team_id":"884","home_draw":"3.400"},{"home_team_name":"阿拉维斯","is_win_draw_lose":"1","sessions":"008","home_team_id":"2037","away_team_name":"莱万特","deadline_bet":"2018-03-01 23:50:00","letball_win":"3.020","letball_number":"-1","match_id":"F20180301008","league_name":"西甲","letball_draw":"3.350","home_lose":"4.800","letball_lose":"2.000","match_status":"1","match_date":"2018-03-02 04:30:00","event_id":"2580791","home_win":"1.620","is_letball_win_draw_lose":"1","away_team_id":"2036","home_draw":"3.300"},{"home_team_name":"圣菲独立","is_win_draw_lose":"1","sessions":"009","home_team_id":"469","away_team_name":"埃梅莱克","deadline_bet":"2018-03-01 23:50:00","letball_win":"3.400","letball_number":"-1","match_id":"F20180301009","league_name":"解放者杯","letball_draw":"3.250","home_lose":"4.400","letball_lose":"1.900","match_status":"1","match_date":"2018-03-02 06:15:00","event_id":"2725310","home_win":"1.710","is_letball_win_draw_lose":"1","away_team_id":"649","home_draw":"3.150"},{"home_team_name":"瓦朗谢纳","is_win_draw_lose":"1","sessions":"015","away_team_name":"奥尔良","deadline_bet":"2018-03-02 23:50:00","letball_win":"5.250","letball_number":"-1","match_id":"F20180302015","league_name":"法乙","letball_draw":"3.750","home_lose":"2.890","letball_lose":"1.490","match_status":"1","home_win":"2.290","is_letball_win_draw_lose":"1","home_draw":"2.900"},{"home_team_name":"皇家贝蒂斯","is_win_draw_lose":"1","sessions":"004","home_team_id":"2025","away_team_name":"皇家社会","deadline_bet":"2018-03-01 23:50:00","letball_win":"1.440","letball_number":"1","match_id":"F20180301004","league_name":"西甲","letball_draw":"4.450","home_lose":"2.380","letball_lose":"4.750","match_status":"1","match_date":"2018-03-02 02:30:00","event_id":"2580790","home_win":"2.320","is_letball_win_draw_lose":"1","away_team_id":"2028","home_draw":"3.600"},{"home_team_name":"奎维利鲁昂","is_win_draw_lose":"1","sessions":"016","away_team_name":"尼奥尔","deadline_bet":"2018-03-02 23:50:00","letball_win":"3.950","letball_number":"-1","match_id":"F20180302016","league_name":"法乙","letball_draw":"3.600","home_lose":"3.150","letball_lose":"1.670","match_status":"1","home_win":"1.970","is_letball_win_draw_lose":"1","home_draw":"3.300"},{"home_team_name":"阿森纳","is_win_draw_lose":"2","sessions":"005","home_team_id":"660","away_team_name":"曼彻斯特城","deadline_bet":"2018-03-01 23:50:00","letball_win":"2.040","letball_number":"1","match_id":"F20180301005","league_name":"英超","letball_draw":"3.700","home_lose":"1.600","letball_lose":"2.710","match_status":"1","match_date":"2018-03-02 03:45:00","event_id":"2523013","home_win":"4.150","is_letball_win_draw_lose":"1","away_team_id":"676","home_draw":"3.800"},{"home_team_name":"罗达JC","is_win_draw_lose":"1","sessions":"017","away_team_name":"赫拉克勒斯","deadline_bet":"2018-03-02 23:50:00","letball_win":"4.950","letball_number":"-1","match_id":"F20180302017","league_name":"荷甲","letball_draw":"4.150","home_lose":"2.470","letball_lose":"1.460","match_status":"1","home_win":"2.350","is_letball_win_draw_lose":"1","home_draw":"3.350"},{"home_team_name":"阿尔梅勒城","is_win_draw_lose":"1","sessions":"018","away_team_name":"阿贾克斯青年队","deadline_bet":"2018-03-02 23:50:00","letball_win":"1.760","letball_number":"1","match_id":"F20180302018","league_name":"荷乙","letball_draw":"4.000","home_lose":"1.860","letball_lose":"3.210","match_status":"1","home_win":"2.980","is_letball_win_draw_lose":"1","home_draw":"3.900"},{"home_team_name":"拉斯帕尔马斯","is_win_draw_lose":"1","sessions":"006","home_team_id":"2055","away_team_name":"巴塞罗那","deadline_bet":"2018-03-01 23:50:00","letball_win":"4.600","letball_number":"1","match_id":"F20180301006","league_name":"西甲","letball_draw":"4.400","home_lose":"1.120","letball_lose":"1.460","match_status":"1","match_date":"2018-03-02 04:00:00","event_id":"2580796","home_win":"13.500","is_letball_win_draw_lose":"1","away_team_id":"2017","home_draw":"6.150"},{"home_team_name":"克莱蒙","is_win_draw_lose":"1","sessions":"011","away_team_name":"兰斯","deadline_bet":"2018-03-02 23:50:00","letball_win":"6.100","letball_number":"-1","match_id":"F20180302011","league_name":"法乙","letball_draw":"4.000","home_lose":"2.530","letball_lose":"1.400","match_status":"1","home_win":"2.530","is_letball_win_draw_lose":"1","home_draw":"2.950"},{"home_team_name":"索肖","is_win_draw_lose":"1","sessions":"012","away_team_name":"欧塞尔","deadline_bet":"2018-03-02 23:50:00","letball_win":"4.700","letball_number":"-1","match_id":"F20180302012","league_name":"法乙","letball_draw":"3.750","home_lose":"2.870","letball_lose":"1.540","match_status":"1","home_win":"2.180","is_letball_win_draw_lose":"1","home_draw":"3.100"},{"home_team_name":"沙托鲁","is_win_draw_lose":"1","sessions":"013","away_team_name":"南锡","deadline_bet":"2018-03-02 23:50:00","letball_win":"5.000","letball_number":"-1","match_id":"F20180302013","league_name":"法乙","letball_draw":"3.750","home_lose":"2.830","letball_lose":"1.510","match_status":"1","home_win":"2.240","is_letball_win_draw_lose":"1","home_draw":"3.050"},{"home_team_name":"布雷斯特","is_win_draw_lose":"1","sessions":"014","away_team_name":"图尔","deadline_bet":"2018-03-02 23:50:00","letball_win":"2.570","letball_number":"-1","match_id":"F20180302014","league_name":"法乙","letball_draw":"3.250","home_lose":"5.750","letball_lose":"2.310","match_status":"1","home_win":"1.480","is_letball_win_draw_lose":"1","home_draw":"3.600"},{"home_team_name":"奥斯","is_win_draw_lose":"1","sessions":"020","away_team_name":"坎布尔","deadline_bet":"2018-03-02 23:50:00","letball_win":"1.870","letball_number":"1","match_id":"F20180302020","league_name":"荷乙","letball_draw":"3.650","home_lose":"1.750","letball_lose":"3.120","match_status":"1","home_win":"3.520","is_letball_win_draw_lose":"1","home_draw":"3.650"},{"home_team_name":"福伦丹","is_win_draw_lose":"1","sessions":"021","away_team_name":"埃因霍温FC","deadline_bet":"2018-03-02 23:50:00","letball_win":"2.450","letball_number":"-1","match_id":"F20180302021","league_name":"荷乙","letball_draw":"3.750","home_lose":"4.250","letball_lose":"2.200","match_status":"1","home_win":"1.530","is_letball_win_draw_lose":"1","home_draw":"4.150"},{"home_team_name":"纽约红牛","is_win_draw_lose":"1","sessions":"014","home_team_id":"6571","away_team_name":"CD奥林匹亚","deadline_bet":"2018-03-02 08:50:00","letball_win":"2.200","letball_number":"-1","match_id":"F20180301014","league_name":"中北美冠","letball_draw":"3.450","home_lose":"6.200","letball_lose":"2.600","match_status":"1","match_date":"2018-03-02 09:00:00","event_id":"2684124","home_win":"1.380","is_letball_win_draw_lose":"1","away_team_id":"3860","home_draw":"4.100"},{"home_team_name":"米德尔斯堡","is_win_draw_lose":"2","sessions":"026","away_team_name":"利兹联","deadline_bet":"2018-03-02 23:50:00","letball_win":"3.100","letball_number":"-1","match_id":"F20180302026","league_name":"英冠","letball_draw":"3.250","home_lose":"4.700","letball_lose":"2.010","match_status":"1","home_win":"1.620","is_letball_win_draw_lose":"1","home_draw":"3.350"},{"home_team_name":"摩纳哥","is_win_draw_lose":"1","sessions":"027","away_team_name":"波尔多","deadline_bet":"2018-03-02 23:50:00","letball_win":"2.500","letball_number":"-1","match_id":"F20180302027","league_name":"法甲","letball_draw":"3.450","home_lose":"5.000","letball_lose":"2.280","match_status":"1","home_win":"1.500","is_letball_win_draw_lose":"1","home_draw":"3.800"},{"home_team_name":"波尔图","is_win_draw_lose":"1","sessions":"028","away_team_name":"里斯本竞技","deadline_bet":"2018-03-02 23:50:00","letball_win":"2.950","letball_number":"-1","match_id":"F20180302028","league_name":"葡超","letball_draw":"3.300","home_lose":"4.600","letball_lose":"2.050","match_status":"1","home_win":"1.620","is_letball_win_draw_lose":"1","home_draw":"3.400"},{"home_team_name":"巴勒斯坦人","is_win_draw_lose":"1","sessions":"029","away_team_name":"奥达科斯意大利人","deadline_bet":"2018-03-02 23:50:00","letball_win":"3.850","letball_number":"-1","match_id":"F20180302029","league_name":"智利甲","letball_draw":"3.800","home_lose":"2.950","letball_lose":"1.650","match_status":"1","home_win":"1.980","is_letball_win_draw_lose":"1","home_draw":"3.500"},{"home_team_name":"福图纳锡塔德","is_win_draw_lose":"1","sessions":"022","away_team_name":"马斯特里赫特","deadline_bet":"2018-03-02 23:50:00","letball_win":"3.600","letball_number":"-1","match_id":"F20180302022","league_name":"荷乙","letball_draw":"3.800","home_lose":"3.110","letball_lose":"1.700","match_status":"1","home_win":"1.900","is_letball_win_draw_lose":"1","home_draw":"3.550"},{"home_team_name":"皇家加西拉索","is_win_draw_lose":"1","sessions":"010","home_team_id":"17205","away_team_name":"桑托斯","deadline_bet":"2018-03-01 23:50:00","letball_win":"4.900","letball_number":"-1","match_id":"F20180301010","league_name":"解放者杯","letball_draw":"3.750","home_lose":"3.070","letball_lose":"1.520","match_status":"1","match_date":"2018-03-02 06:15:00","event_id":"2690495","home_win":"2.180","is_letball_win_draw_lose":"1","away_team_id":"319","home_draw":"2.900"},{"home_team_name":"拉腊","is_win_draw_lose":"1","sessions":"011","home_team_id":"7950","away_team_name":"阿根廷独立","deadline_bet":"2018-03-01 23:50:00","letball_win":"2.030","letball_number":"1","match_id":"F20180301011","league_name":"解放者杯","letball_draw":"3.150","home_lose":"1.620","letball_lose":"3.150","match_status":"1","match_date":"2018-03-02 06:15:00","event_id":"2690514","home_win":"4.700","is_letball_win_draw_lose":"1","away_team_id":"100","home_draw":"3.350"},{"home_team_name":"瓦尔韦克","is_win_draw_lose":"1","sessions":"023","away_team_name":"奈梅亨","deadline_bet":"2018-03-02 23:50:00","letball_win":"2.320","letball_number":"1","match_id":"F20180302023","league_name":"荷乙","letball_draw":"3.600","home_lose":"1.480","letball_lose":"2.380","match_status":"1","home_win":"4.800","is_letball_win_draw_lose":"1","home_draw":"4.070"},{"home_team_name":"利马联盟","is_win_draw_lose":"1","sessions":"012","home_team_id":"1631","away_team_name":"博卡青年","deadline_bet":"2018-03-01 23:50:00","letball_win":"2.360","letball_number":"1","match_id":"F20180301012","league_name":"解放者杯","letball_draw":"3.200","home_lose":"1.460","letball_lose":"2.550","match_status":"1","match_date":"2018-03-02 08:30:00","event_id":"2690525","home_win":"5.850","is_letball_win_draw_lose":"1","away_team_id":"95","home_draw":"3.650"},{"home_team_name":"海尔蒙特","is_win_draw_lose":"1","sessions":"024","away_team_name":"阿尔克马尔青年队","deadline_bet":"2018-03-02 23:50:00","letball_win":"3.300","letball_number":"-1","match_id":"F20180302024","league_name":"荷乙","letball_draw":"3.750","home_lose":"3.250","letball_lose":"1.790","match_status":"1","home_win":"1.830","is_letball_win_draw_lose":"1","home_draw":"3.650"},{"home_team_name":"门兴格拉德巴赫","is_win_draw_lose":"1","sessions":"025","away_team_name":"云达不来梅","deadline_bet":"2018-03-02 23:50:00","letball_win":"3.300","letball_number":"-1","match_id":"F20180302025","league_name":"德甲","letball_draw":"3.500","home_lose":"3.650","letball_lose":"1.850","match_status":"1","home_win":"1.770","is_letball_win_draw_lose":"1","home_draw":"3.450"},{"home_team_name":"巴兰基亚青年","is_win_draw_lose":"1","sessions":"013","home_team_id":"458","away_team_name":"帕尔梅拉斯","deadline_bet":"2018-03-01 23:50:00","letball_win":"4.500","letball_number":"-1","match_id":"F20180301013","league_name":"解放者杯","letball_draw":"3.600","home_lose":"3.250","letball_lose":"1.590","match_status":"1","match_date":"2018-03-02 08:30:00","event_id":"2726043","home_win":"2.050","is_letball_win_draw_lose":"1","away_team_id":"310","home_draw":"3.000"},{"home_team_name":"兵工厂","is_win_draw_lose":"1","sessions":"030","away_team_name":"拉努斯","deadline_bet":"2018-03-02 23:50:00","letball_win":"4.850","letball_number":"-1","match_id":"F20180302030","league_name":"阿甲","letball_draw":"3.550","home_lose":"3.150","letball_lose":"1.560","match_status":"1","home_win":"2.140","is_letball_win_draw_lose":"1","home_draw":"2.900"},{"home_team_name":"贝尔格拉诺","is_win_draw_lose":"1","sessions":"031","away_team_name":"天主教青年会","deadline_bet":"2018-03-02 23:50:00","letball_win":"3.350","letball_number":"-1","match_id":"F20180302031","league_name":"阿甲","letball_draw":"3.200","home_lose":"4.800","letball_lose":"1.930","match_status":"1","home_win":"1.690","is_letball_win_draw_lose":"1","home_draw":"3.050"},{"home_team_name":"埃弗顿VM","is_win_draw_lose":"1","sessions":"032","away_team_name":"基约塔","deadline_bet":"2018-03-02 23:50:00","letball_win":"3.300","letball_number":"-1","match_id":"F20180302032","league_name":"智利甲","letball_draw":"3.550","home_lose":"3.600","letball_lose":"1.840","match_status":"1","home_win":"1.770","is_letball_win_draw_lose":"1","home_draw":"3.500"},{"home_team_name":"科隆竞技","is_win_draw_lose":"1","sessions":"033","away_team_name":"飓风","deadline_bet":"2018-03-02 23:50:00","letball_win":"4.300","letball_number":"-1","match_id":"F20180302033","league_name":"阿甲","letball_draw":"3.300","home_lose":"3.700","letball_lose":"1.690","match_status":"1","home_win":"1.930","is_letball_win_draw_lose":"1","home_draw":"2.930"},{"home_team_name":"蒂华纳","is_win_draw_lose":"1","sessions":"034","away_team_name":"普埃布拉大学","deadline_bet":"2018-03-02 23:50:00","letball_win":"3.800","letball_number":"-1","match_id":"F20180302034","league_name":"墨超","letball_draw":"3.550","home_lose":"3.350","letball_lose":"1.710","match_status":"1","home_win":"1.910","is_letball_win_draw_lose":"1","home_draw":"3.250"},{"home_team_name":"莫雷利亚","is_win_draw_lose":"1","sessions":"035","away_team_name":"阿特拉斯","deadline_bet":"2018-03-02 23:50:00","letball_win":"3.500","letball_number":"-1","match_id":"F20180302035","league_name":"墨超","letball_draw":"3.550","home_lose":"3.550","letball_lose":"1.780","match_status":"1","home_win":"1.840","is_letball_win_draw_lose":"1","home_draw":"3.300"}]};
            if (data.code == 200 && data.body) {
              data.body.sort(function (a, b) {
                var a1, b1;
                for (var key in a) {
                  a1 = key;
                }
                for (var key in b) {
                  b1 = key;
                }
                return a1 - b1;
              });
              // for (var key in data.body[0]) {
              //   sessionsList.push(key);
              // }
              //							if(sessionsList.length > 1) {
              //								sessionsList.sort(function(a, b) {
              //									return a - b
              //								});
              //							}
              var ableIndex="";
              data.body.map(function(item,index){
                // sessionsList.push(item);
                for (var key in data.body[index]) {
                  sessionsList.push(key);
                }

                if (item[sessionsList[index]].length>=14){
                  ableIndex=index;
                }
              })
              if (!ableIndex && ableIndex!==0) {
                _this.setDom_noMsg();
                return
              }

              _this.dealData(data.body[ableIndex][sessionsList[ableIndex]]);
            } else {
              _this.setDom_noMsg();
            }
          }
        };
      this.base.callCommonApi(getData);
    },
    //处理数据
    dealData: function (data) {
      var _this = this;

      //删除多于14条的数据
      for (var i = 0, len = data.length; i < len; i++) {
        if (i > 14) {
          data.splice(i, 1);
        }
      }
      //场次排序
      data.sort(function (a, b) {
        return a.sessions - b.sessions;
      });
      var now = (new Date()).getTime(),
        matchTime = (new Date((data[0].deadline_bet.substr(0, 19)).replace(/-/g, "/"))).getTime();
      if (matchTime > now) {
        _this.session = data[0].banner_number;
        for (var i = 0; i < 14; i++) {
          var obj = data[i],
            obj1 = {
              selectItemList: []
            };
          obj1.match_id = obj.match_id;
          obj.win = '0.00';
          obj.draw = '0.00';
          obj.lose = '0.00';
          obj.isShow = 0;
          obj.winNum = 0;
          obj.drawNum = 0;
          obj.loseNum = 0;
          _this.matchIdList.push(obj.match_id);
          _this.prevDataList.push(obj1);
        }
        _this.datas = data;
        _this.banner_number = data[0].banner_number;
        _this.count_endTime = matchTime;
        _this.endTime = _this.setEndTime(matchTime);
        _this.upDate_tzEndTime();
      }
      //console.log(_this.data);
    },
    //计时器更新投注时间
    upDate_tzEndTime: function () {
      var _this = this;
      _this.upDateTzTime = setInterval(function () {
        _this.count_endTime = _this.count_endTime + 10000;
        _this.endTime = _this.setEndTime(_this.count_endTime);
      }, 10000);

    },
    //没数据时修改Dom树加载内容
    setDom_noMsg: function () {
      this.isNoMsg=true;
      $('body').css({
        "margin-bottom": 0,
        "overflow":'hidden'
      });
    },
    //获得时间---毫秒数
    getMilliseconds: function (str) {
      str = str.replace(new RegExp("-", "gm"), "/");
      return new Date(str).getTime(); //得到毫秒数
    },
    //计算截止时间
    setEndTime: function (time) {
      var now = new Date(),
        end = new Date(time),
        betTime = end.getTime() - now.getTime(),
        dayTime = parseInt(betTime / 24 / 60 / 60 / 1000),
        hourTime = parseInt((betTime % (24 * 60 * 60 * 1000)) / 60 / 60 / 1000);
      return dayTime + '天' + hourTime + '时'
    },
    //点击投注内容执行
    selectItem: function (num, index, matchId, event) {
      var that = this,
        //				smId = [],
        flag = true,
        aa = {},
        tzNum = 0,
        e = event.currentTarget,
        len2 = that.prevDataList[index].selectItemList.length;
      if ($(e).is('.selected')) {
        $(e).removeClass("selected");
        (num == 0) && (that.datas[index].winNum = 0);
        (num == 1) && (that.datas[index].drawNum = 0);
        (num == 2) && (that.datas[index].loseNum = 0);
      } else {
        $(e).addClass("selected");
        (num == 0) && (that.datas[index].winNum = 1);
        (num == 1) && (that.datas[index].drawNum = 1);
        (num == 2) && (that.datas[index].loseNum = 1);
      }
      if (len2 == 0) { //否则
        that.prevDataList[index].selectItemList.push(num);
      } else {
        for (var j = 0; j < len2; j++) {
          var obj = that.prevDataList[index].selectItemList[j];
          if (obj == num) {
            that.prevDataList[index].selectItemList.splice(j, 1);
            break
          } else if (j == len2 - 1) {
            that.prevDataList[index].selectItemList.push(num);
          }
        }
      }
      that.isAble = false;
      for (var i = 0, len = that.prevDataList.length; i < len; i++) {
        if (that.prevDataList[i].selectItemList.length == 0) {
          that.isAble = true;
        } else {
          tzNum++;
        }
      }
      that.selectNum = tzNum;
      if (tzNum == 0) {
        $('.btn-p1').css('display', 'block');
        $('.btn-p2').css('display', 'none');
      } else {
        var bb = 14 - tzNum;
        $('.btn-p2>span:first-child').html('已选择' + tzNum + '场,' + '还差' + bb + '场');
        $('.btn-p1').css('display', 'none');
        $('.btn-p2').css('display', 'block');
      }
      if (!that.isAble) {
        this.tzNum = this.tzNum_count(this.prevDataList);
        var html = "<span>" + this.tzNum + " 注,</span><span>共 " + (this.tzNum * 2 * this.multiple) + that.coinUnit + "</span>";
        $('.btn2 .top-2').html(html);
        $('.btn>a').html('选好了，下一步');
        $('.btn-p2>span:first-child').html('已选择14场,' + this.tzNum + ' 注, 共 ' + (this.tzNum * 2 * this.multiple) + that.coinUnit);
      } else {
        var html = "<span>0注,</span><span>共0" + that.coinUnit + "</span>";
        $('.btn2 .top-2').html(html);
        $('.btn>a').html('请选择全部比赛结果');
      }
    },
    //点击提交按钮执行
    sub: function () {
      this.isAble = false;
      var count = 0;
      for (var i = 0, len = this.prevDataList.length; i < len; i++) {
        if (this.prevDataList[i].selectItemList.length == 0) {
          this.isAble = true;
        } else {
          count++;
        }
      }
      if (count == 14) {
        var _this = this;
        if (!_this.isLogin) {
          _this.get_userState();
        }

        $('#sharkit').hide();
        $('body').css("padding-top", "6.6rem");
        $('#loading_wait').addClass('show');
        var html = "<span>" + _this.tzNum + "注,</span><span>共" + (_this.tzNum * 2 * _this.multiple) + _this.coinUnit + "</span>";
        $('.btn2 .top-2').html(html);
        $('.saishi').hide();
        $('.inner').hide();
        $('.inner-hide').show();
        $('.btn').hide();
        $('.btn2').show();
        $('#main').css('margin-bottom', '3rem');
        //console.log(_this.prevDataList);
        //查看状态
        //				var userNameMsg = localStorage.userName;
        //				if(userNameMsg) {
        //					var getUserInfo = {
        //						type: "post",
        //						url: "/authApi/AutoLoginGetUserinfoByRedis",
        //						data: {
        //							"username": localStorage.getItem("userName")
        //						},
        //						success: function(data) {
        //							if(data.code == 200) {
        //								_this.state = "钱包:" + (parseFloat(data.body.COIN) - parseFloat(data.body.FCION)).toFixed(2) + "元";
        //							}
        //						}
        //					};
        //					this.base.callAuthApi(getUserInfo);
        //				} else {
        //					_this.state = "游客";
        //				}
      } else {
        this.tips("投注项未满14项，请继续投注", "", 1);
        return
      }
    },
    //点击清空按钮执行
    clearSelect: function () {
      var that = this;
      mui.confirm(' ', '清除所选赛事', ['确定', '取消'], function (e) {
        if (e.index == 1) {
          return
        } else {
          that.confirm();
        }
      })
    },
    //点击清空按钮执行
    //		clearSelect: function() {
    //			$('.tishi').show();
    //			$('.zhezhao').show();
    //		},
    //点击清空框里面的取消执行
    esc: function () {
      //			$('.tishi').hide();
      //			$('.zhezhao').hide();
    },
    //点击清空框里面的确定执行
    confirm: function () {
      for (var i = 0, len = this.prevDataList.length; i < len; i++) {
        this.prevDataList[i].selectItemList = [];
      }
      for (var i = 0; i < this.datas.length; i++) {
        this.datas[i].winNum = 0;
        this.datas[i].drawNum = 0;
        this.datas[i].loseNum = 0;
      };
      $('.btn-p1').css('display', 'block');
      $('.btn-p2').css('display', 'none');
      $('.tishi').hide();
      $('.zhezhao').hide();
      $('.li-top div').removeClass('selected');
      $('.btn>a').html('请选择全部比赛结果');
    },
    //点击展开下拉框
    launch: function (id) {
      $('#' + id + '>.li-top img').toggleClass('zhuan');
      if ($('#' + id + '>.li-top img').hasClass('zhuan')) {
        $('#' + id + '>.li-top img').css('transform', 'rotate(180deg)');
      } else {
        $('#' + id + '>.li-top img').css('transform', 'rotate(0deg)');
      }
      $('#' + id + '>.li-bottom').slideToggle('slow');
    },
    //投注注数计算
    tzNum_count: function (dataList) {
      var tzNum = 1;
      for (var i = 0; i < dataList.length; i++) {
        tzNum = tzNum * dataList[i].selectItemList.length;
      }
      return tzNum;
    },
    //倍数变化显示
    multipleNum_change: function (event) {
      var e = event.currentTarget;
      this.multiple = $(e).val();
      $('.fixMultiple span.active').removeClass('active');
      if (!this.multiple) {
        this.multiple = 1;
        $(e).val(1);
      } else {
        $(e).val(parseInt(this.multiple));
      }

      var html = "<span>" + this.tzNum + "注,</span><span>共" + (this.tzNum * 2 * this.multiple) + this.coinUnit + "</span>";
      $('.btn2 .top-2').html(html);
    },
    //倍数数据限制
    multipleNum_limit: function (event) {
      var e = event.currentTarget;
      var c = $(e);
      if (/[^\d]/.test(c.val())) { //替换非数字字符
        var temp_amount = c.val().replace(/[^\d]/g, '');
        $(this).val(temp_amount);
      }
    },
    //固定倍数变化
    fix_multiple_change: function (event, num) {
      event = event.currentTarget;
      this.multiple = num;
      $(event).parent().children('span.active').removeClass('active');
      $(event).addClass('active');
    },
    //退出编辑
    quitEdit: function () {
      $('#sharkit').show();
      $('.saishi').show();
      $('.inner').show();
      $('.inner-hide').hide();
      $('.btn').show();
      $('.btn2').hide();
      $('#main').css('margin-bottom', 'auto');
      $('#loading_wait').removeClass('show');
      $('body').css("padding-top", "3.6rem");
    },
    //立即付款
    payment: function (event) {
      var _this = this, userNameMsg = localStorage.userName;
      _this.isAble = false;
      var json1 = {
        tzMsg: {
          "tzType": ["14*1"],
          "tzMultiple": _this.multiple,
          "tzMoney": _this.tzNum * 2 * _this.multiple,
          "one_type_id": 2,
          "played_group_id": 4,
          "played_id": 14,
          "banner_number": _this.session,
          "expect_bonuses": "",
        },
        selectItemList: []
      };
      for (var i = 0, len = _this.prevDataList.length; i < len; i++) {
        if (_this.prevDataList[i].selectItemList.length == 0) {
          _this.isAble = true;
        }
      }
      if (_this.isAble) {
        _this.tips("投注项未满14项，请继续投注", "", 1);
        return
      } else if (!userNameMsg) {
        localStorage.loginTo = "../sfc/sfc";
        _this.tips("请先登录", "login", 2);
        return
      } else if (_this.coin < json1.tzMsg.tzMoney) {
        _this.tips("余额不足，请先充值", "depositFile", 2);
        return
      } else if (_this.singleMaxSum && json1.tzMsg.tzMoney > parseInt(_this.singleMaxSum)) {
        _this.tips("投注金额不能超过" + _this.singleMaxSum, "", 1);
        return
      }
      event = event.currentTarget;
      //console.log(_this.prevDataList);
      if ($(event).is('.disabled')) {
        return
      }
      $(event).addClass('disabled');
      if (_this.prevDataList.length == 14) {
        $('.zhezhao').show();
        $('#loading_wait').addClass('active');
        _this.isSelecting = true;
        for (var i = 0; i < _this.prevDataList.length; i++) {
          var selectItem = {},
            obj = _this.prevDataList[i];
          selectItem.match_id = obj.match_id;
          selectItem.fixedFlag = 0;
          selectItem.X = [];
          for (var j = 0; j < obj.selectItemList.length; j++) {
            var list = obj.selectItemList.sort(function (a, b) {
              return a - b
            });
            switch (list[j]) {
              case 0:
                selectItem.X.push(3);
                break;
              case 1:
                selectItem.X.push(1);
                break;
              case 2:
                selectItem.X.push(0);
                break;
            }
          }
          json1.selectItemList.push(selectItem);
        };
        //console.log(JSON.stringify(json1));
        //				var userNameMsg = localStorage.userName;
        //				//console.log(userNameMsg);
        setTimeout(function () {
          //					if(userNameMsg) {
          _this.get_login(json1);
          //					} else {
          //						localStorage.loginTo = "../sfc/sfc.html";
          //						_this.tips("请先登录", "../loginIn/login.html", 2);
          //					}
        }, 500)
        _this.isSelecting = false;
      }
    },
    //摇一摇
    sharkitFn: function () {
      if (!$(".inner-hide").is(":hidden")) {
        return
      }
      if (this.datas.length != 0) {
        var i = 0,
          time = "",_this=this,
          sharkit = $('#sharkit');
        if (_this.sharkTime !== "") {
          return
        }
        $("#audio_shark")[0].play();
        _this.isShark = false;
        _this.sharkTime = setInterval(function () {
          $(sharkit).unbind('click');
          if (i == 8) {
            _this.isShark = true;
            $(".inner .inner-li .li-top .top-right>div.selected").trigger("click");
            var max = _this.matchIdList.length,
              list = [],
              contentList = [];
            for (var j = 0; j < 14; j++) {
              var i1 = parseInt(Math.random() * 3),
                isRepeat = false,
                i3;
              do {
                isRepeat = false;
                i3 = parseInt(Math.random() * max);
                for (var m = 0; m < contentList.length; m++) {
                  if (contentList[m] == i3) {
                    isRepeat = true;
                  }
                }
              } while (isRepeat)
              list.push(i1);
              contentList.push(i3);
            }
            for (var j = 0; j < 14; j++) {
              $(".inner .inner-li[data-index=" + _this.matchIdList[contentList[j]] + "] .li-top .top-right>div[data-index=" + list[j] + "]").trigger("click");
            }
            //						window.clearInterval(time);
            window.clearInterval(_this.sharkTime);
            setTimeout(function () {
              _this.sharkTime = "";
            }, 1000)

          } else if (i < 8) {
            if (i % 2 == 0) {
              $(sharkit).css({
                "-ms-transform": "rotate(-30deg)",
                /* IE 9 */
                "-moz-transform": "rotate(-30deg)",
                /* Firefox */
                "-webkit-transform": "rotate(-30deg)",
                /* Safari 和 Chrome */
                "-o-transform": "rotate(-30deg)"
              });
            } else {
              $(sharkit).css({
                "-ms-transform": "rotate(0deg)",
                /* IE 9 */
                "-moz-transform": "rotate(0deg)",
                /* Firefox */
                "-webkit-transform": "rotate(0deg)",
                /* Safari 和 Chrome */
                "-o-transform": "rotate(0deg)"
              });
            }
          }
          i++;
        }, 100);
      }
    },
    //进入详情页设置
    //进入详情页设置
    detail: function (event_id, home, away, homeId, awayId) {
      if (event_id) {
        var dataset = {
          id: event_id,
          away: away,
          awayId: awayId,
          home: home,
          homeId: homeId,
        }
        localStorage.setItem("datasetList", JSON.stringify(dataset));
//				localStorage.setItem("eventId", event_id);
//				localStorage.setItem("footHome",home);
//				localStorage.setItem("footAway",away);
        this.$router.push({ name: "detail" });
        // if (localStorage.app_flag == undefined) {
        //   window.location.href = '../rx9/detail.html';
        // } else {
        //   mui.openWindow({
        //     url: '../rx9/detail.html',
        //     id: 'detail',
        //     styles: {
        //       top: base.getStatusbarHeight() + 'px',
        //       bottom: 0
        //     },
        //     show: {
        //       autoShow: true,//页面loaded事件发生后自动显示，默认为true
        //       aniShow: 'pop-in',//页面显示动画，默认为”slide-in-right“；
        //       duration: '200'//页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
        //     },
        //     createNew: true
        //   })
        // }
        //window.location.href = "../rx9/detail.html";
      } else {
        mui.toast('暂无详情数据', { duration: 'long', type: 'div' })
      }
    },
    //是否登录
    get_login: function (test) {
      var that = this;
      var obj = {
        type: 'post',
        data: {
          tzJson: (test)
        },
        url: '/authApi/footballBet',
        success: function (data) {
          if (data.code == 200) {
            that.coin = parseFloat(that.coin - test.tzMsg.tzMoney).toFixed(2);
            that.state = "钱包:" + that.coin + that.coinUnit;
            that.tips("投注成功", "", 3);
          } else {
            that.tips(data.msg, "", 3);
          }
        }
      };
      this.base.callAuthApi(obj);
    },
    tips: function (str, urlName, index) {
      $('body').css('padding-top', '3.6rem');
      $('#loading_wait').removeClass('show');
      var that = this;
      that.iftipsContent = true;
      that.tipsContent = str;
      $('.saishi').show();
      $('.inner').show();
      $('.inner-hide').hide();
      $('.btn').show();
      $('.btn2').hide();
      $('#main').css('margin-bottom', 'auto');
      $('.iDialogWrap').addClass('heightZIndex');
      $('.bet-confirm').css('display', 'block');
      $('.iDialogLayout').css('display', 'block');
      var timeout = setTimeout(function () {
        $('.iDialogWrap').removeClass('heightZIndex');
        $('.bet-confirm').css('display', 'none');
        $('.iDialogLayout').css('display', 'none');
        $("#sharkit").css('display', 'block');
        $(".btn2.goNext .btn2-bottom a").removeClass('disabled');
        $('#loading_wait').removeClass('active show');
        clearTimeout(timeout);
        if (index == 2) {
          that.$router.push({name:urlName});
          // if (localStorage.app_flag == undefined) {
          //   window.location.href = url;
          // } else {
          //   mui.openWindow({
          //     url: url,
          //     id: 'url',
          //     styles: {
          //       top: base.getStatusbarHeight() + 'px',
          //       bottom: 0
          //     },
          //     show: {
          //       autoShow: true,//页面loaded事件发生后自动显示，默认为true
          //       aniShow: 'pop-in',//页面显示动画，默认为”slide-in-right“；
          //       duration: '200'//页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
          //     },
          //     createNew: true
          //   })
          // }
        } else if (index == 3) {
          that.confirm();
        }
      }, 1500);
    },
  },
  computed: {
    surplus_count: function () {
      return this.all_count - this.select_count;
    }
  },
  watch: {
    multiple: function () {
      var that = this;
      //倍数校验
      if (isNaN(that.multiple) || that.multiple < 0 || that.multiple === "") {
        that.multiple = 1;
      } else if (that.multiple > 100000) {
        that.multiple = 100000;
      }
      var html = "<span>" + this.tzNum + "注,</span><span>共" + (this.tzNum * 2 * this.multiple) + this.coinUnit + "</span>";
      $('.btn2 .top-2').html(html);
      if (that.selectNum == 14) {
        $('.btn-p2>span:first-child').html('已选择14场,' + this.tzNum + ' 注, 共 ' + (this.tzNum * 2 * this.multiple) + that.coinUnit);
      }
    },
    //单位显示
    coinUnit: function () {
      var that = this;
      if (that.coin !== "") {
        that.user_state = "钱包:" + that.coin + that.coinUnit + "(可用)";
      }
    },
    $route(to,from){
      var _this=this;
      if(to.name=="sfc"){
        if (this.isNoMsg){
          $("body").css({
            overflow:'hidden'
          })
        }
        this.pullToRefresh.setNowThis(this);
        _this.startCountWorker();
          if(!localStorage.config){
              this.getSysConfig();
          }
      }else if(from.name=="sfc"){
        $("body").css({
          overflow: 'auto'
        })
        window.clearInterval(_this.countTiming);
        _this.confirm();
        _this.quitEdit();
      }
    }
  }
};




