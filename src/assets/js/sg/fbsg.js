export default{
  // el: "#fs",
  name:"fbsg",
	data(){
    return {
		user_state: "游客", //用户状态
		singleMaxSum: '', //投注金额上限
		coin: 0, //钱包余额
		coinUnit:"元",//金额单位
		totalNum: 0,
		multiple:1,
		noDataListReturn:false,
		index:0,

		playType: 18,
		playTypeName:"胜平负",
		playTypeNameList:["胜平负","上下单双","总进球","半全场","比分"],

		dealData:[],
		tzArea_dataList: [], //展开的比分投注数据项
		selectDataList: [], //存儲投注的數據
		leagueNameList: [], //联赛名列表
		league_signNumList: [],
		league_indexList: [],
		nowSfcIndexs: "",
		nowSfcIndex: "",
		tz_sumNum:1,
		sharkTime:'',
		sfcTzAreaList : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		isLoading:true,//是否正在加载数据
		odds_percent:0.65,//单场赔率百分比
		isSelectDataChange:false,//数据是否被改变


		tzType_free: [], //投注类型--自由过关
		tzType_freeList: [], //投注类型--自由过关
		tzType_freeShow: [0, 0, 0, 0, 0, 0, 0, 0], //已选择投注类型对应
		tzType_free_html: "", //投注类型显示--自由过关

		tzType_group: [], //投注类型--组合过关
		tzType_groupList: [], //投注类型--组合过关

		saveAllDataList:{
					spf_rqspf:[],
					sxds:[],
					zjq:[],
					bf:[],
				},//存储上一次数据，用于数据比较刷新
		        allDataNameList:{
		            spf_rqspf:["home_win", "home_draw", "home_lose","letball_win", "letball_draw", "letball_lose"],
		            zjq:["total_goal0", "total_goal1", "total_goal2", "total_goal3", "total_goal4", "total_goal5", "total_goal6", "more_than6"],
					bf:["win10", "win20", "win21", "win30", "win31", "win32", "win40", "win41", "win42", "win50", "win51", "win52", "win_other", "draw00", "draw11", "draw22", "draw33", "draw_other", "lose01", "lose02", "lose12", "lose03", "lose13", "lose23", "lose04", "lose14", "lose24", "lose05", "lose15", "lose25", "lose_other"],
					sxds:["up_odd","up_even","down_odd","down_even"],
		        },//对应的字段名

		        allLeagueNameList:{
					spf_rqspf:[],
					sxds:[],
					zjq:[],
					bf:[],
            },//对应联赛名筛选
      countTimingNum:20000
    }
	},
	created: function() {
//		mui.toast('你已被强制下线;确定,将重新登陆!',{ duration:'long', type:'div' });
		var backAim = localStorage.backAim_tz;
		if(backAim && backAim != 0 && backAim >= 18 && backAim < 24) {
			this.playType = parseInt(backAim);
		}
    this.startCountWorker();
    this.pullToRefresh.setNowThis(this);
	},
	mounted: function() {
		var backAim = localStorage.backAim_tz;
		if(backAim && backAim != 0 && backAim >= 18 && backAim < 24) {
			this.playType = parseInt(backAim);
			$('#mainArea .match-table .bar-tab-item.active').removeClass('active');
			$('#mainArea .match-table .bar-tab-item[data-index=' + backAim + ']').addClass('active');
			//			localStorage.backAim_tz=0;
		}
		this.load(this.playType);
		this.initialize();
		this.click();
//		this.get_userState();
		this.getSysConfig();
//		this.openTzArea(this.playType);
		$(document).on('click', function(event) {
            if($(".gameplayArea").is(":visible")===true&&!$(event.target).is('.gameplaySelect .btn') && $(event.target).parents('.gameplayArea').length === 0) {
                $('.gameplaySelect .btn').trigger('click');
            }
        });
    // this.initDom();
    this.initFn();
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
    pulldownRefresh(_this) {
      _this.changeLoad(_this.playType, 1, 2);
      _this.get_userState(1);
    },
    initFn:function(){

      // if (localStorage.app_flag != undefined) {
      //   var _this = this;
      //   //mui.init({
      //     pullRefresh: {
      //       container: '#pullrefresh', //下拉容器
      //       down: {
      //         style: 'circle', //下拉刷新样式
      //         offset: '50px',
      //         range: '200px', //可选 默认100px,控件可下拉拖拽的范围
      //         callback: pulldownRefresh //刷新后执行的函数
      //       }
      //     }
      //   })

      //   function pulldownRefresh() {
      //     var that=this;
      //     setTimeout(function () {
      //       _this.changeLoad(_this.playType, 1, 2);
      //       _this.get_userState(1);
      //       // mui('#pullrefresh').pullRefresh().endPulldown();
      //       this.endPullupToRefresh(false);
      //       //mui.toast("刷新成功");
      //     }, 1500);
      //   }

      // }
      //摇一摇功能实现
      if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', deviceMotionHandler, false);
      } else {
        this.tips("您的设备不支持位置感应", "", 0);
      }
      var that=this;
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
            that.sharkitFn();
          }
          last_x = x;
          last_y = y;
          last_z = z;
        }
      }
    },
    //页面跳转--返回
    goback_click: function () {
      if (localStorage.app_flag == undefined) {
        this.$router.push({ name: "index" });
      } else {
        var h = plus.webview.getLaunchWebview(); //获取首页窗口
        localStorage.renovate = 1; //存入变量控制首页刷新
        mui.fire(h, 'refresh'); //传值给首页执行的方法名
        setTimeout(function () { //延迟关闭本窗口，目的是给首页足够的刷新时间做判断是展开哪个页面.
          var ws = plus.webview.currentWebview();
          plus.webview.close(ws);
        }, 500)
      }
    },
    //打开投注选项卡
    openGameplayArea: function (event) {
      if (!$(".selectContent").is(":hidden")) {
        return
      }
      if (event !== 1) {
        event = event.currentTarget;
        if ($(event).is('.isOpen')) {
          return
        }
        $(event).addClass('isOpen');
        $(event).toggleClass('openArea');
        $(event).children('.triangle').toggleClass("reversal");
        $(event).parent().find('.gameplayArea').slideToggle();
        if ($(event).is('.openArea')) {
          $('.iDialogWrap').addClass('heightZIndex');
        } else {
          $('.iDialogWrap').removeClass('heightZIndex');
        }

        setTimeout(function () {
          $(event).removeClass('isOpen');
        }, 500);

      } else {
        $(".gameplaySelect .btn").trigger('click');
      }
    },
    //获取登录状态
    get_userState: function (isRefresh) {
      var that = this,
        userNameMsg = localStorage.userName;


      if ((userNameMsg && that.coin === 0) || (userNameMsg &&isRefresh)) {
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
              that.user_state = "钱包:" + that.coin + that.coinUnit + "(可用)";
            }
          }
        };

        this.base.callAuthApi(getUserInfo);
      }
    },
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
              if (data.body.northReturnAwardRate) {
                that.odds_percent = parseFloat(data.body.northReturnAwardRate) > 1 ? parseFloat(data.body.northReturnAwardRate) / 100 : parseFloat(data.body.northReturnAwardRate);
              }
              that.singleMaxSum = data.body.singleMaxSum;
              localStorage.config = JSON.stringify(data.body);

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
        if (config.northReturnAwardRate) {
          that.odds_percent = parseFloat(config.northReturnAwardRate) > 1 ? parseFloat(config.northReturnAwardRate) / 100 : parseFloat(config.northReturnAwardRate);
        }
        that.singleMaxSum = config.singleMaxSum;
      }
    },
    //点击委托投注规则
    togorule: function () {
      this.$router.push({ name: "rule" });
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
      this.$router.push({ name:"sgHelp"});
      // if (localStorage.app_flag == undefined) {
      //   window.location.href = 'help.html';
      // } else {
      //   mui.openWindow({
      //     url: 'help.html',
      //     id: 'help',
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
    //获得时间---毫秒数
    getMilliseconds: function (str) {
      str = str.replace(new RegExp("-", "gm"), "/");
      return new Date(str).getTime(); //得到毫秒数
    },
    //获得时间---显示的日期时间
    getDate: function (str) {
      var that = this,
        list = [],
        oDate = new Date(str),
        now = new Date(),
        isNow = true,
        nowDate = new Date(now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate() + ' ' + '12:00:00'),
        weekList = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        oTime = oDate.getFullYear() + "-" + that.getzf(oDate.getMonth() + 1) + "-" + that.getzf(oDate.getDate()) + " " + weekList[oDate.getDay()]; //最后拼接时间
      oDate.getTime() < nowDate.getTime() && (isNow = false);
      list.isNow = isNow;
      list.oTime = oTime;
      list.headTime = oDate.getFullYear() + "" + that.getzf(oDate.getMonth() + 1) + "" + that.getzf(oDate.getDate());
      return list;
    },
    //补0
    getzf: function (num) {
      if (parseInt(num) < 10) {
        num = '0' + num;
      }
      return num;
    },
    //得到截止时间\n(比赛时间-10分钟)
    getDeadline: function (millisecond) {
      //			var milli = new Date(millisecond - 600000),
      var milli = new Date(millisecond),
        hour = milli.getHours(),
        minutes = milli.getMinutes(),
        sum = parseInt(hour) * 60 + parseInt(minutes);
      return sum;
    },
    //判断是否为一天的数据
    isOneDay: function (dataTime) {
      var that = this,
        str = dataTime.replace(new RegExp("-", "gm"), "/"),
        oDate = new Date(str),
        weekList = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        oYear = oDate.getFullYear(),
        oMonth = oDate.getMonth() + 1,
        oDay = oDate.getDate(),
        str = oYear + "/" + oMonth + "/" + oDay + " " + "12:00:00",
        str1,
        tz_startTime = new Date(str).getTime(),
        tz_endTime = "",
        oTime = []; //投注开始时间
      if (oDate.getTime() < tz_startTime) {
        oDate.setDate(oDay - 1); //日期加一天
        oYear = oDate.getFullYear();
        oMonth = oDate.getMonth() + 1;
        oDay = oDate.getDate();
        str = oYear + "/" + oMonth + "/" + oDay + " " + "12:00:00";
        tz_endTime = new Date(str).getTime(); //投注截止时间
        oTime.push(tz_endTime, tz_startTime);
      } else {
        oDate.setDate(oDay + 1); //日期加一天
        oYear = oDate.getFullYear();
        oMonth = oDate.getMonth() + 1;
        oDay = oDate.getDate(),
          str1 = oYear + "/" + oMonth + "/" + oDay + " " + "12:00:00";
        tz_endTime = new Date(str1).getTime(); //投注截止时间
        oTime.push(tz_startTime, tz_endTime);
      }

      return oTime;
    },
    //清空选择数据
    clearSelectData: function () {
      var that = this;

      that.tzArea_dataList = [], //展开的胜分差投注数据项
        that.selectDataList = [], //存儲投注的數據
        that.nowSfcIndexs = "",
        that.nowSfcIndex = "",
        that.sfcTzAreaList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

        that.tzType_free = [], //投注类型--自由过关
        that.tzType_freeList = [], //投注类型--自由过关
        that.tzType_freeShow = [0, 0, 0, 0, 0, 0, 0, 0], //已选择投注类型对应
        that.tzType_free_html = "", //投注类型显示--自由过关

        that.tzType_group = [], //投注类型--组合过关
        that.tzType_groupList = [], //投注类型--组合过关

        that.multiple = 1, //倍数
        that.tz_sumNum = 1, //投注注数

        that.minList = [], //每场比赛最小赔率列表
        that.maxList = [], //每场比赛最大赔率列表
        that.min = 0, //最小奖金
        that.max = 0; //最大奖金

      $('.goNext .methods').addClass('hide');
      $('span.col.betbtn.active').removeClass('active');
      $('.bet-bottom .btn-confirm').attr('data-index', 0);
      $('.bet-bottom .btn-confirm').html('请选择比赛结果');
      $('.bet-bottom .box-center').addClass('hide');
      $('.bet-bottom .bet-help').removeClass('hide');
      $('.bet-bottom .btn-confirm').removeClass('cNext');
      $('.goNext .center input').attr('value', 1);
      var html = "展开" + '<br>' + "全部";
      $('div.content .game-more.active').removeClass('active');
      // $('div.content .game-more>span').html(html);
      if (that.playType == 22) {
        html = "点击选择比分";
        $('.betbtn.more-option.ellipsis').removeClass('active');
        $('.betbtn.more-option.ellipsis').html(html);
      }
    },
    //清空数据
    clearAllData: function () {
      var that = this;
      //				user_state: "游客", //用户状态
      //				singleMaxSum: '', //投注金额上限
      //				coin: 0, //钱包余额
      //				coinUnit:"元",//金额单位

      that.tzArea_dataList = [], //展开的胜分差投注数据项
        that.selectDataList = [], //存儲投注的數據
        that.nowSfcIndexs = "",
        that.nowSfcIndex = "",
        that.sfcTzAreaList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

        that.tzType_free = [], //投注类型--自由过关
        that.tzType_freeList = [], //投注类型--自由过关
        that.tzType_freeShow = [0, 0, 0, 0, 0, 0, 0, 0], //已选择投注类型对应
        that.tzType_free_html = "", //投注类型显示--自由过关

        that.tzType_group = [], //投注类型--组合过关
        that.tzType_groupList = [], //投注类型--组合过关

        that.multiple = 1, //倍数
        that.tz_sumNum = 1, //投注注数

        that.minList = [], //每场比赛最小赔率列表
        that.maxList = [], //每场比赛最大赔率列表
        that.min = 0, //最小奖金
        that.max = 0; //最大奖金
    },
    //数据截取---长度限制
    dataLenLimit: function (data, playType) {
      var that = this, list = that.allDataNameList, typeName = "spf_rqspf";
      switch (playType) {
        case 18:
          typeName = "spf_rqspf";
          break;
        case 19:
          typeName = "sxds";
          break;
        case 20:
          typeName = "zjq";
          break;
        case 22:
          typeName = "bf";
          break;
      }
      list = list[typeName];
      for (var i = 0, len = data.length; i < len; i++) {
        var item = data[i];
        item.deadline_bet = item.deadline_bet.slice(0, 19);
        item.league_name = item.league_name.replace(/[1-9]*[-][1-9]+/, '').replace(/[1-9]*$/, "");
        //						item.sessions = item.sessions.slice(item.sessions.length - 3, item.sessions.length);
        item.home_team_name = item.home_team_name.substring(0, 6);
        item.away_team_name = item.away_team_name.substring(0, 6);

        for (var j = 0, len1 = list.length; j < len1; j++) {
          var obj = list[j];
          if (item[obj]) {
            item[obj] = parseFloat(item[obj]).toFixed(2);
          }
        }

        if (this.getMilliseconds(item.deadline_bet) < (new Date()).getTime()) {
          data.splice(i, 1);
          len = data.length;
          i--;
        }
      }
    },
    //对加载的数据进行处理
    ddTemp: function (data, playType) {
      var that = this;
      //			//console.log(that);
      that.dataLenLimit(data, playType);
      if (data.length == 0) {
        return []
      }
      //场次排序
      data.sort(function (a, b) {
        return a.sessions - b.sessions;
      });
      var allList = {},
        lightBox = [],
        htmlList = [],
        dataList = [],
        reg = /^[a-zA-Z]/;
      for (var i = 0, len = data.length; i < len; i++) {
        if (data[i].sessions) {
          var checkList = {},
            light = {},
            obj = data[i],
            html = '',
            list = [],
            mdh = that.getMilliseconds(obj.deadline_bet),
            now = new Date(),
            isNowList = "",
            //数据是否过期
            endTimeMinutes = that.getDeadline(mdh);
          obj.hours = Math.floor(endTimeMinutes / 60),
            //显示的小时数
            obj.minutes = that.getzf(Math.floor(endTimeMinutes % 60));
          //显示的分钟数
          //********************************
          //模板设置
          checkList.dateTime = that.isOneDay(obj.deadline_bet);
          isNowList = that.getDate(checkList.dateTime[0]); //校验时间
          checkList.titleDateTime = isNowList.oTime;
          list.push(obj);
          checkList.dataList = list;
          if (dataList == null || dataList == '') {
            dataList.push(checkList);
          } else {
            for (var j = 0, len1 = dataList.length; j < len1; j++) {
              if (dataList[j].dateTime[0] == checkList.dateTime[0]) {
                dataList[j].dataList.push(obj);
                break;
              }
            }
            if (j == dataList.length) {
              dataList.push(checkList);
            }
          }
        }
      }
      //数据时间排序
      dataList.sort(function (a, b) { return a.dateTime[0] - b.dateTime[0] });
      //给每个数据加标识
      //						for(var i = 0, len = dataList.length; i < len; i++) {
      //							for(var j = 0, len1 = dataList[i].dataList.length; j < len1; j++) {
      //								var obj = dataList[i].dataList[j];
      //								dataList[i].dataList[j].signNum = i + "" + j;
      //								dataList[i].dataList[j].leagueIndex = that.getAllLeagueName(obj);
      //							}
      //						}
      //数据比对
      that.comparison_loadDataList(playType, dataList);
      //			that.dealData = dataList;
      $('#competition-screen .competition-total').html(data.length);
    },
    //获得所有联赛名和处理
    getAllLeagueName: function (data) {
      var that = this,
        leagueName = data.league_name,
        len1 = that.leagueNameList.length;
      if (len1 == 0) {
        that.leagueNameList.push(leagueName);
        that.league_signNumList.push([data.signNum]);
        that.league_indexList.push(1);
        return 0
      } else {
        for (var i = 0; i < len1; i++) {
          var obj = that.leagueNameList[i];
          if (obj == leagueName) {
            that.league_signNumList[i].push(data.signNum);
            return i;
          } else if (i == len1 - 1) {
            that.league_indexList.push(1);
            that.league_signNumList.push([data.signNum]);
            that.leagueNameList.push(leagueName);
            return len1;
          }
        }
      };

    },
    //加载数据比对
    comparison_loadDataList: function (playType, dataList) {
      var that = this, list = that.saveAllDataList, typeName = "hh", typeNamelist = [], ischange = false;
      switch (playType) {
        case 18:
          typeName = "spf_rqspf";
          break;
        case 19:
          typeName = "sxds";
          break;
        case 20:
          typeName = "zjq";
          break;
        case 22:
          typeName = "bf";
          break;
      }
      typeNamelist = that.allDataNameList[typeName];
      if (list[typeName].length !== 0) {
        //          	dataList[0].dataList.splice(0,1);
        //						that.dealData = list[typeName];
        //						去除过期数据
        for (var i = 0; i < dataList.length; i++) {
          //删除隔天过期数据----可去除（应当不会发生）
          if (dataList[i].titleDateTime !== list[typeName][i].titleDateTime) {
            list[typeName][i].titleDateTime.splice(i, 1); i--;
          } else {
            //删除当天更新的过期数据
            for (var j = 0; j < dataList[i].dataList.length; j++) {
              var obj1 = dataList[i].dataList[j],//新数据
                obj2 = that.dealData[i].dataList[j];//旧数据
              if (obj1.match_id !== obj2.match_id) {
                that.dealData[i].dataList.splice(j, 1);
                ischange = true;
                j--;
              } else {
                break;
              }
            }
          }
        }
        //更新新数据
        for (var i = 0; i < dataList.length; i++) {
          for (var j = 0; j < dataList[i].dataList.length; j++) {
            var obj = dataList[i].dataList[j];//新数据
            for (var m = 0; m < typeNamelist.length; m++) {
              var item = obj[typeNamelist[m]];
              if (item) {
                that.dealData[i].dataList[j][typeNamelist[m]] = item;
                //										m==0&&(that.dealData[i].dataList[j][typeNamelist[m]]="0.00")
                if (!that.isSelectDataChange && that.dealData[i].dataList[j][typeNamelist[m]] !== item) {
                  that.isSelectDataChange = true;
                }
              } else {
                that.dealData[i].dataList[j][typeNamelist[m]] = "0.00";
              }
            }
          }
        }
        if (ischange) {
          that.leagueNameList = [],
            that.league_signNumList = [],
            that.league_indexList = [];
          //给每个数据加标识
          for (var i = 0, len = dataList.length; i < len; i++) {
            for (var j = 0, len1 = dataList[i].dataList.length; j < len1; j++) {
              var obj = dataList[i].dataList[j];
              obj.signNum = i + "" + j;
              obj.leagueIndex = that.getAllLeagueName(obj);
            }
          }
          that.allLeagueNameList[typeName].leagueNameList = that.leagueNameList;
          that.allLeagueNameList[typeName].league_signNumList = that.league_signNumList;
          that.allLeagueNameList[typeName].league_indexList = that.league_indexList;
        }
        list[typeName] = that.dealData;
      } else {
        that.leagueNameList = [],
          that.league_signNumList = [],
          that.league_indexList = [];
        //给每个数据加标识
        for (var i = 0, len = dataList.length; i < len; i++) {
          for (var j = 0, len1 = dataList[i].dataList.length; j < len1; j++) {
            var obj = dataList[i].dataList[j];
            dataList[i].dataList[j].signNum = i + "" + j;
            dataList[i].dataList[j].leagueIndex = that.getAllLeagueName(obj);
          }
        }

        that.dealData = dataList;
        list[typeName] = dataList;
        that.allLeagueNameList[typeName].leagueNameList = that.leagueNameList;
        that.allLeagueNameList[typeName].league_signNumList = that.league_signNumList;
        that.allLeagueNameList[typeName].league_indexList = that.league_indexList;
      }
    },
    //加载数据
    load: function (playType, index) {
      var that = this;
      //			that.clearSelectData();
      that.isLoading = true;
      var getData = {
        type: "post",
        contentType: "application/json",
        url: "/commonAPI/getMatchInfoByPlayId",
        data: {
          "playTypeId": playType
        },
        dataType: "json",
        success: function (data) {
          that.isLoading = false;
          //console.log(data);
          if (data.code == 200) {
            if (data.body.length > 0) {
              if (index == 2) {
                $('.loading_wait').hide();
              }
              $('.iDialogWrap').removeClass("heightZIndex");
              //							//console.log(data);
              that.banner_number = data.body[0].banner_number;
              that.ddTemp(data.body, playType);
              if (that.dealData.length == 0) {
                that.noDataListReturn = true;
              } else {
                that.noDataListReturn = false;
              }
              //							else {
              //								that.setDom(allList.htmlList, playType);
              //								that.openAll = allList.lightBox;
              //								if(allList.htmlList.length == 0) {
              //									that.setDom_noMsg();
              //								}
              //							}
            } else {
              that.noDataListReturn = true;
            }
          } else {
            that.noDataListReturn = true;
          }
        }
      };
      this.base.callCommonApi(getData);
    },
    //没数据时修改Dom树加载内容
    //		setDom_noMsg: function() {
    //			var html = "";
    //			html = "<div class='noMsg'><img class='icon' src='../images/bg_noMsg_white.png'/><p>当前投注没有比赛</p><p>您可以到其他投注区查看</p></div>";
    //			$("#mainContent").html(html);
    ////			$('body').css("margin-bottom", 0);
    //			$('.iDialogWrap').removeClass('heightZIndex');
    //		},
    //改变玩法
    changeLoad: function (playType, event, index) {
      if (this.isLoading) {
        return
      }
      //			$('.iDialogWrap').addClass('heightZIndex');
      localStorage.backAim_tz = playType;

      if (event != 1) {
        if (playType == this.playType && index !== 2) {
          this.openGameplayArea(1);
          return
        }
        event = event.currentTarget;
        $('.bar-tab a.active').removeClass('active');
        $(event).addClass('active');
      }
      if (this.playType !== playType) {
        this.dealData = [];
        this.clearAllData();
        $('.iDialogWrap').addClass('heightZIndex');
        document.documentElement.scrollTop = 0;
      }
      //			this.clearData();
      var typeName = "hh", list = this.saveAllDataList, that = this;
      switch (playType) {
        case 18:
          typeName = "spf_rqspf";
          break;
        case 19:
          typeName = "sxds";
          break;
        case 20:
          typeName = "zjq";
          break;
        case 22:
          typeName = "bf";
          break;
      }
      if (list[typeName].length > 0 && playType != that.playType) {
        that.dealData = list[typeName];
        that.leagueNameList = that.allLeagueNameList[typeName].leagueNameList;
        that.league_signNumList = that.allLeagueNameList[typeName].league_signNumList;
        that.league_indexList = that.allLeagueNameList[typeName].league_indexList;
        //				league_signNumList
      }
      //			$('.iDialogWrap').addClass('heightZIndex');
      //
      this.load(playType, index);
      if (this.playType !== playType) {
        this.playType = playType;
        this.leagueScreen_selectAll();
      }

      //			this.openTzArea(playType);
      if (that.dealData.length !== 0) {
        that.noDataListReturn = false;
      }
      if (playType == 22) {
        $('#sharkit').addClass('hide');
      } else {
        $('#sharkit').removeClass('hide');
      }
      if (index !== 2) {
        this.openGameplayArea(1);
      }
      //			$(document.body).animate({'scrollTop':0},200);
      //			document.documentElement.scrollTop=0;
    },
    //初始化
    initialize: function () {
      var ow = document.documentElement.clientWidth,
        oh = document.documentElement.clientHeight,
        w = document.documentElement.clientWidth,
        h = document.documentElement.clientHeight,
        liLen = $('ul.gametype li').length,
        num = 0, that = this,
        headerH = $('#header').height();
      $('.iDialogWrap').css('width', ow).css('height', oh);
      //	设置body的margin-bottom
      $('body').css('margin-bottom', $('.bet-bottom').height() + 'px');
      //设置点击下一步弹出框样式
      $('#showSelectContent').css('width', ow).css('height', oh);
      //			$('.match-table').css('margin', '3rem 0');
      $('div.selectContent').css('margin-top', $('.header').height() + 'px').css('margin-bottom', $('.goNext').height() + 'px');
      //设置最小高度，匹配左右移动
      $('#mainContent').css("min-height", h - headerH - $('.bet-bottom').height() + 'px');

      //初始化画布
      $("#coverRandow").attr("width", $("#mainContent").width());
      $("#coverRandow").attr("height", $("#mainContent").height());

      //记录一个dd投注区的高度
      that.randowLimit = {};
      that.randowLimit.ddH = $("#mainContent dl:first dd:first").height();
      //记录头部的高度
      that.randowLimit.headerH = headerH;
      //记录一个dt头部的高度
      that.randowLimit.dtH = $("#mainContent dl:first dt:first").height();
    },
    //公用函数进行位置中间位移
    middleDisplacement: function (e) {
      var screenW = e.width(),
        screenH = e.height();
      e.css('visibility', 'visible').css('top', '50%').css('left', '50%').css('margin-left', -screenW / 2 + 'px').css('margin-top', -screenH / 2 + 'px').css('display', 'block');
    },
    //选中项事件点击
    tzItem_click: function (event, indexs, index, type, num) {
      event = event.currentTarget;
      var that = this, isHave = false;
      if (that.selectDataList && that.selectDataList.length != 0) {
        that.selectDataList.map(function (item) {
          if (that.dealData[indexs].dataList[index].match_id == item.match_id) {
            isHave = true;
          }
        });
      }
      if (that.selectDataList.length == 15 && !isHave) {
        that.tips('一次选择最多不超过15场', '', 0);
        return
      }
      $(event).toggleClass('active');
      if (type == 'bf') {
        if ($(event).is('.active')) {
          this.sfcTzAreaList[num] = 1;
        } else {
          this.sfcTzAreaList[num] = 0;
        }
      }
      var obj = that.dealData[indexs].dataList[index],
        selectItemList = {
          //比赛id
          match_id: obj.match_id,
          signNum: obj.signNum,
          rqNum: obj.letball_number,
          //					letScore: obj.let_score,
          indexs: indexs,
          index: index,

        },
        nameList = "",
        selectItem = type,
        selectItemOdds = type + "Odds",
        nameList = that.allDataNameList[type];
      selectItemList[selectItem] = [num];
      selectItemList[selectItemOdds] = [parseFloat(obj[nameList[num]])];
      if (that.selectDataList.length == 0) {
        that.selectDataList.push(selectItemList)
      } else {
        for (var i = 0, len = that.selectDataList.length; i < len; i++) {
          var item = that.selectDataList[i];
          if (item.match_id == selectItemList.match_id) {
            if (item[selectItem] && item[selectItem].length != 0) {
              for (var j = 0, len1 = item[selectItem].length; j < len1; j++) {
                var signNum = item[selectItem][j];
                if (signNum == num) {
                  item[selectItem].splice(j, 1);
                  item[selectItemOdds].splice(j, 1);
                  break;
                } else if (j == len1 - 1) {
                  item[selectItem].push(num);
                  item[selectItemOdds].push(selectItemList[selectItemOdds][0]);
                  break;
                }
              }
            } else {
              item[selectItem] = selectItemList[selectItem];
              item[selectItemOdds] = selectItemList[selectItemOdds];
            }
            break;
          } else if (i == len - 1) {
            that.selectDataList.push(selectItemList);
            break;
          }
        }
      }
      that.clearEmptyData();
    },
    //清除为空的数据
    clearEmptyData: function () {
      var that = this;
      for (var i = 0, len = that.selectDataList.length; i < len; i++) {
        var obj = that.selectDataList[i],
          num = 0;
        if (obj.spf_rqspf) {
          num += obj.spf_rqspf.length;
        }
        if (obj.sxds) {
          num += obj.sxds.length;
        }
        if (obj.zjq) {
          num += obj.zjq.length;
        }
        if (obj.bf) {
          num += obj.bf.length;
        }
        if (num == 0) {
          that.selectDataList.splice(i, 1);
          if (that.selectDataList.length == 0 || i == len - 1) {
            break;
          }
          i--;
        }
      }
      that.minList = [], //每场比赛最小赔率列表
        that.maxList = [];
    },
    //底部按钮
    bottom_click: function () {
      if (this.isLoading) {
        return
      }
      var that = this,
        playType = that.playType, //玩法类型
        len = that.selectDataList.length,
        html = "",
        maxLen = len, //限制串数
        lenList = [], //用于统计计算投注金额
        hasSfc = false, typeName = "", typeOddName = "", list = [],
        userNameMsg = localStorage.userName;
      $('.goNext .paymentBtn').addClass('disabled');
      if (len == 0) {
        that.tips("请选择至少一场比赛", "", 0)
        return
      }
      if (!that.isLogin) {
        that.get_userState();
      }
      //			if(userNameMsg && that.coin === 0) {
      //				var getUserInfo = {
      //						type: "post",
      //						url: "/authApi/AutoLoginGetUserinfoByRedis",
      //						async: false,
      //						data: {
      //							"username": localStorage.getItem("userName")
      //						},
      //						success: function success(data) {
      //							if(data.code == 200) {
      //								that.coin = (parseFloat(data.body.COIN) - parseFloat(data.body.FCION)).toFixed(2);
      //								that.user_state = "钱包:" + that.coin + that.coinUnit +"(可用)";
      //							}
      //						}
      //					};
      //
      //				this.base.callAuthApi(getUserInfo);
      //			}
      switch (playType) {
        case 18:
          typeName = "spf_rqspf";
          break;
        case 19:
          typeName = "sxds";
          break;
        case 20:
          typeName = "zjq";
          break;
        case 22:
          typeName = "bf";
          break;
      }
      typeOddName = typeName + "Odds";
      list = that.allDataNameList[typeName];
      for (var i = 0; i < len; i++) {
        var indexs = that.selectDataList[i].indexs,
          index = that.selectDataList[i].index;
        for (var j = 0, len1 = that.selectDataList[i][typeName].length; j < len1; j++) {
          var itemIndex = that.selectDataList[i][typeName][j];
          that.selectDataList[i][typeOddName][j] = that.dealData[indexs].dataList[index][list[itemIndex]];
        }
      }
      if (that.isSelectDataChange) {
        that.isSelectDataChange = false;
        that.min = "";
        that.max = "";
        that.minList = [];
        that.maxList = [];
      }
      $('.goNext').removeClass('hide');
      $('.goNext .box-header').text('已经选择' + len + '场比赛');
      //				for(var i = 0; i < that.selectDataList.length; i++) {
      //					var obj = that.selectDataList[i];
      //					if(obj.sfc) {
      //						if(obj.sfc.length != 0) {
      //							hasSfc = true;
      //						}
      //					}
      //				};
      switch (playType) {
        case 18:
          maxLen > 15 && (maxLen = 15);
          break;
        case 19:
          maxLen > 6 && (maxLen = 6);
          break;
        case 20:
          maxLen > 6 && (maxLen = 6);
          break;
        case 22:
          maxLen > 3 && (maxLen = 3);
          break;
      }
      //				if(hasSfc) {
      //					maxLen > 4 && (maxLen = 4);
      //				} else {
      //					maxLen > 8 && (maxLen = 8);
      //				}
      //				if(playType > 28) {
      //					maxLen = 1;
      //				}
      if (that.tzType_free.length <= 1) {
        that.tzType_free = [maxLen];
        that.min = "";
        that.max = "";
        that.maxList = [];
        that.minList = [];
        that.tzType_freeShow[maxLen - 1] = 1;
        $(".method-wrap .method.active").removeClass('active');
        $(".method-wrap .method[data-index=" + maxLen + "]").addClass('active');
      }
      that.tzType_freeList = [];
      for (var i = 0; i < maxLen; i++) {
        if (i == 0) {
          html = "单关";
        } else if (i != 0) {
          html = (i + 1) + "串1";
        }
        if (html != "") {
          that.tzType_freeList.push(html);
        }
      }
      html = "";
      for (var i = 0, len1 = that.tzType_free.length; i < len1; i++) {
        if (i == 2) {
          html += "...";
          break
        }
        if (i != len1 - 1) {
          if (that.tzType_free[i] == 1) {
            html += "单关+";
          } else {
            html += that.tzType_free[i] + "串1+";
          }
        } else {
          if (that.tzType_free[i] == 1) {
            html += "单关";
          } else {
            html += that.tzType_free[i] + "串1";
          }
        }
      }
      that.tzType_free_html = html;
      //弹出已经显示的元素
      var parentId = [],
        firstEle = 0;
      $("#showSelectContent>.selectContent>.selectMain").html('');
      for (var i = 0, len1 = that.selectDataList.length; i < len1; i++) {
        var obj = that.selectDataList[i],
          list = [],
          str1 = obj.signNum.substring(0, 1);
        list.push(obj.signNum);
        if (parentId.length == 0) {
          parentId.push(list);
        } else {
          for (var j = 0, len2 = parentId.length; j < len2; j++) {
            var str2 = parentId[j][0].substring(0, 1);
            if (str1 == str2) {
              parentId[j].push(obj.signNum);
              break;
            } else if (j == len2 - 1) {
              parentId.push(list);
            }
          }
        }
      }
      //投注单顺序调整（从小到大）
      for (var i = 0, len1 = parentId.length; i < len1; i++) {
        var str1 = parentId[i][0].substring(0, 1);
        parentId[i] = parentId[i].sort(function (a, b) {
          return a - b;
        });
        $('#mainContent .match-divider[data-index=' + str1 + ']').clone(true).appendTo("#showSelectContent>.selectContent>.selectMain");
        for (var j = 0, len2 = parentId[i].length; j < len2; j++) {
          $('#mainContent .match-item[data-sign=' + parentId[i][j] + ']').clone(true).appendTo("#showSelectContent>.selectContent>.selectMain");
        }

      }

      $('body').css('overflow', 'hidden');
      $('#showSelectContent').removeClass('hide');
      $('#showSelectContent').addClass('heightZIndex');

      //计算投注金额
      for (var i = 0, len1 = that.selectDataList.length; i < len1; i++) {
        var item = that.selectDataList[i],
          num = 0;
        if (item.spf_rqspf) {
          num += item.spf_rqspf.length;
        }
        if (item.sxds) {
          num += item.sxds.length;
        }
        if (item.zjq) {
          num += item.zjq.length;
        }
        if (item.bf) {
          num += item.bf.length;
        }
        lenList.push(num);
      }
      that.tz_sumNum = that.calculateNum(that.tzType_free, lenList);
      //计算奖金
      if (window.Worker) {
        that.startWorker(that.playType);
      } else {
        that.calculateMinMaxBonus(that.selectDataList, that.tzType_free);
      }
    },
    //**********展开比分的投注区域************
    unfold_tzArea: function (indexs, index) {
      var that = this;
      that.tzArea_dataList = that.dealData[indexs].dataList[index];
      that.nowSfcIndexs = indexs;
      that.nowSfcIndex = index;
      that.sfcTzAreaList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      //			for(var i=0;i<that.sfcTzAreaList.length;i++){
      //				Vue.set(that.sfcTzAreaList, i, 0);
      //			}
      //			$(".iDialogMain .game-listBody .col.betbtn.active").removeClass('active');
      for (var i = 0, len = that.selectDataList.length; i < len; i++) {
        var item = that.selectDataList[i];
        if (item.match_id == that.tzArea_dataList.match_id) {
          if (item.bf) {
            for (var j = 0, len2 = item.bf.length; j < len2; j++) {
              var obj = item.bf[j];
              that.$set(that.sfcTzAreaList, obj, 1);
            }
          } else {
            break
          }
        }
      };
      for (var i = 0, len = that.sfcTzAreaList.length; i < len; i++) {
        var item = that.sfcTzAreaList[i];
        if (item == 1) {
          $('#iDialogContent .represent .options-block .col.betbtn[data-index=' + i + ']').addClass('active');
        } else {
          $('#iDialogContent .represent .options-block .col.betbtn[data-index=' + i + ']').removeClass('active');
        }
      }

      that.middleDisplacement($('div.iDialog'));
      $('.iDialogWrap').css('z-index', 10000);
      $('.iDialogLayout').css('display', 'block');
      $('body').css('overflow', "hidden");
    },
    //展开胜分差的投注区域--确认
    confirm_tzArea: function () {
      var html = "",
        that = this,
        sfcNameList = ["1:0", "2:0", "2:1", "3:0", "3:1", "3:2", "4:0", "4:1", "4:2", "5:0", "5:1", "5:2", "胜其他", "0:0", "1:1", "2:2", "3:3", "平其他", "0:1", "0:2", "1:2", "0:3", "1:3", "2:3", "0:4", "1:4", "2:4", "0:5", "1:5", "2:5", "负其他"],
        num = 0;
      $('.iDialog').css('display', 'none');
      $('.iDialogLayout').css('display', 'none');
      $('.iDialogWrap').css('z-index', -1);
      $('body').css('overflow', "auto");
      for (var i = 0; i < 31; i++) {
        var item = that.sfcTzAreaList[i];
        if (item == 1) {
          html += sfcNameList[i] + " ";
          num++;
          if (num >= 8) {
            html += "..."
            break
          }
        }
      }
      if (html == "") {
        html = "点击展开胜分差投注选项";
        $('.match-item.represent[data-index=' + that.tzArea_dataList.match_id + '] .betbtn.more-option.ellipsis').html(html);
        $('.match-item.represent[data-index=' + that.tzArea_dataList.match_id + '] .betbtn.more-option.ellipsis').removeClass('active');
      } else {
        $('.match-item.represent[data-index=' + that.tzArea_dataList.match_id + '] .betbtn.more-option.ellipsis').html(html);
        $('.match-item.represent[data-index=' + that.tzArea_dataList.match_id + '] .betbtn.more-option.ellipsis').addClass('active');
      }

    },
    //展开胜分差的投注区域--取消
    cancel_tzArea: function () {
      var that = this,
        html = "点击展开胜分差投注选项";
      $('.iDialog').css('display', 'none');
      $('.iDialogLayout').css('display', 'none');
      $('.iDialogWrap').css('z-index', -1);
      $('body').css('overflow', "auto");
      $('.match-item.represent[data-index=' + that.tzArea_dataList.match_id + '] .betbtn.more-option.ellipsis').html(html);
      $('.match-item.represent[data-index=' + that.tzArea_dataList.match_id + '] .betbtn.more-option.ellipsis').removeClass('active');
      that.sfcTzAreaList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      for (var i = 0, len = that.selectDataList.length; i < len; i++) {
        var item = that.selectDataList[i];
        if (item.match_id == that.tzArea_dataList.match_id) {
          item.bf = [];
          item.bfOdds = [];
        }
      }
      that.clearEmptyData();

    },
    //联赛弹出框
    openLeagueArea: function () {
      if (!$(".selectContent").is(":hidden")) {
        return
      }
      var ow = document.documentElement.clientWidth;
      var oh = document.documentElement.clientHeight;
      $('#competition-screen').css('display', 'block').css('width', ow).css('height', oh).css('position', 'fixed').css('top', 0).css('left', 0).css('z-index', 10000);
      this.middleDisplacement($('#competition-screen>.screen-content'));
      $('#competition-screen>.screen-content').css('width', '23rem');
      $('body').css('overflow', "hidden");
    },
    //联赛名点击事件
    leagueScreen_click: function (event, index) {
      event = event.currentTarget;
      $(event).toggleClass('active');
      var that = this;
      if (that.league_indexList[index] == 1) {
        that.$set(that.league_indexList, index, 0);
      } else {
        that.$set(that.league_indexList, index, 1);
      };
      that.countSelectLeague();
    },
    //联赛区域----全选
    leagueScreen_selectAll: function () {
      var that = this,
        len = that.league_indexList.length;
      for (var i = 0; i < len; i++) {
        that.$set(that.league_indexList, i, 1);
      }
      $('.screnn-main .competition-option>li').addClass('active');
      that.countSelectLeague();
    },
    //联赛区域----反选
    leagueScreen_selectReversal: function () {
      var that = this,
        selectbtnList = $('.screnn-main .competition-option>li'),
        len = that.league_indexList.length;
      for (var i = 0; i < len; i++) {
        if (that.league_indexList[i] == 1) {
          that.$set(that.league_indexList, i, 0);
        } else {
          that.$set(that.league_indexList, i, 1);
        }
      };
      for (var i = 0, len = selectbtnList.length; i < len; i++) {
        if (selectbtnList[i].className == '') {
          selectbtnList[i].className = "active";
        } else {
          selectbtnList[i].className = '';
        }
      }
      that.countSelectLeague();
    },
    //联赛区域---5大联赛
    leagueScreen_selectFive: function () {
      var that = this,txt="",
        selectbtnList = $('.screnn-main .competition-option>li'),
        len = that.league_indexList.length;
      for (var i = 0; i < len; i++) {
        txt = that.leagueNameList[i];
        if (txt == '英超' || txt == '法甲' || txt == '西甲' || txt == '意甲' || txt == '德甲') {
          that.$set(that.league_indexList, i, 1);
          selectbtnList[i].className = "active";
        } else {
          that.$set(that.league_indexList, i, 0);
          selectbtnList[i].className = "";
        }
      };
      that.countSelectLeague();
    },
    //计算筛选后比赛数量
    countSelectLeague: function () {
      var that = this,
        selectLeagueNum = 0;
      that.clearSelectData();
      //页面头部
      for (var i = 0, len = that.dealData.length; i < len; i++) {
        var obj = that.dealData[i].dataList,
          matchNum = obj.length;
        for (var j = 0, len2 = obj.length; j < len2; j++) {
          var item = obj[j].leagueIndex;
          if (that.league_indexList[item] == 0) {
            matchNum--;
          }
        }
        $('#mainContent .match-divider[data-index=' + i + '] .match-num').html(matchNum + "场");
      }
      //赛事筛选比赛统计
      for (var i = 0, len = that.league_indexList.length; i < len; i++) {
        if (that.league_indexList[i] == 1) {
          selectLeagueNum += that.league_signNumList[i].length;
        }
      }
      $('#competition-screen .competition-total').html(selectLeagueNum);


    },
    //联赛区域----确定
    leagueScreen_confirm: function () {
      $('#competition-screen').css('display', 'none');
      $('body').css('overflow', "auto");
    },
    //串场点击
    tzTypeFreeList_click: function (event, item) {
      var that = this,
        num = parseInt(item == "单关" ? 1 : item),
        len = that.tzType_free.length,
        lenList = [];
      if (len == 0) {
        that.tzType_free.push(num)
      } else {
        for (var i = 0; i < len; i++) {
          if (num == that.tzType_free[i]) {
            that.tzType_free.splice(i, 1);
            break;
          } else if (i == len - 1) {
            that.tzType_free.push(num);
            break;
          }
        }
      }
      that.tzType_free.sort(function (a, b) {
        return a - b
      });
      event = event.currentTarget;
      $(event).toggleClass('active');
      //计算投注金额
      for (var i = 0, len1 = that.selectDataList.length; i < len1; i++) {
        var item = that.selectDataList[i],
          num = 0;
        if (item.spf_rqspf) {
          num += item.spf_rqspf.length;
        }
        if (item.sxds) {
          num += item.sxds.length;
        }
        if (item.zjq) {
          num += item.zjq.length;
        }
        if (item.bf) {
          num += item.bf.length;
        }
        lenList.push(num);
      }
      that.tz_sumNum = that.calculateNum(that.tzType_free, lenList);
      that.min = 0; //最小奖金
      that.max = 0; //最大奖金
      //计算奖金
      if (window.Worker) {
        that.startWorker(that.playType);
      } else {
        that.calculateMinMaxBonus(that.selectDataList, that.tzType_free);
      }
    },
    //改变倍数
    changeMultiple: function (event, num) {
      var that = this;
      if (event != 1) {
        event = event.currentTarget;
        $(event).parent().children('.active').removeClass('active');
        $(event).addClass('active');
        that.multiple = parseInt(num);
      } else {
        $('.goNext .fixMultiple .active').removeClass('active');
        if (that.multiple + parseInt(num) != 0) {
          that.multiple = that.multiple + parseInt(num);
        }
      }
    },
    //底部右上角关闭按钮
    goNext_close_click: function () {
      $('.goNext').addClass('hide');
      $('.bottom-box .btn-confirm').removeClass('hide');
      $('.iDialogLayout').css('display', 'none');
      $('.iDialogWrap').removeClass("heightZIndex");
      //隐藏被选中的元素
      $('#showSelectContent').addClass('hide');
      $('#showSelectContent').removeClass('heightZIndex');
      //$('body').css('overflow', 'auto');
      $('#loading_wait').removeClass('show');
      //检查更新后的数据是否为空
      //			this.checkUpdateSelectData();
    },
    //		检查更新后的数据是否为空---赔率是否为空
    //		checkUpdateSelectData:function(){
    //			var that = this,playType=that.playType,list1=["sxds","bf","zjq"],typeName,typeNameOdds;
    //			if(!that.isRefresh){
    //				that.isRefresh=false;
    //				return
    //			}
    //			for(var i = 0, len = that.selectDataList.length; i < len; i++) {
    //				var obj = that.selectDataList[i],
    //					num = 0,
    //					list=[],
    //					indexs=that.selectDataList[i].indexs,
    //					index=that.selectDataList[i].index;
    //				if(obj.spf_rqspf) {
    //					list=that.allDataNameList.spf_rqspf;
    //					for(var j=0,len1=obj.spf_rqspf.length;j<len1;j++){
    //						var itemIndex=obj.spf_rqspf[j];
    //						var item=that.dealData[indexs].dataList[index][list[itemIndex]];
    //						if(item==0){
    //							obj.spf_rqspfOdds.splice(j,1);
    //							obj.spf_rqspf.splice(j,1);
    //							j--;
    //							if(len1==1){
    //								break;
    //							}
    //							len1=len1-1;
    //						}
    //					}
    //					num += obj.spf_rqspf.length;
    //				}
    //				for(var m=0;m<list1.length;m++){
    //					typeName=list1[m],
    //					typeNameOdds=typeName+"Odds";
    //					if(obj[typeName]) {
    //						if(obj[typeName].length==0&&playType==6){
    //							delete that.selectDataList[i][typeName];
    //							delete that.selectDataList[i][typeNameOdds];
    //						}else{
    //							list=that.allDataNameList[typeName];
    //							for(var j=0,len1=obj[typeName].length;j<len1;j++){
    //								var itemIndex=obj[typeName][j];
    //								var item=that.dealData[indexs].dataList[index][list[itemIndex]];
    //								if(item==0){
    //									obj[typeNameOdds].splice(j,1);
    //									obj[typeName].splice(j,1);
    //									that.showAreaData_change(that.selectDataList[i],itemIndex);
    //									j--;
    //									if(len1==1){
    //										break;
    //									}
    //									len1=len1-1;
    //								}
    //							}
    //							num += obj[typeName].length;
    //						}
    //					}
    //				}
    //				if(num == 0) {
    //					that.selectDataList.splice(i, 1);
    //					if(that.selectDataList.length == 0 || i == len - 1) {
    //						break;
    //					}
    //					i--;
    //					len=len-1;
    //				}
    //			}
    //			that.isRefresh=false;
    //		},
    //点击事件
    click: function () {
      var that = this;
      //公用函数进行位置中间位移
      function middleDisplacement(e) {
        var screenW = e.width();
        var screenH = e.height();
        e.css('visibility', 'visible').css('top', '50%').css('left', '50%').css('margin-left', -screenW / 2 + 'px').css('margin-top', -screenH / 2 + 'px').css('display', 'block');
      }
      //设置公用数组方法来判断数组的包含
      Array.prototype.contains = function (needle) {
        for (i in this) {
          if (this[i] == needle) return true;
        }
        return false;
      };
      //设置函数来确定包含的数组下标
      function contains(arr, obj) {
        var i = arr.length;
        while (i--) {
          if (arr[i] === obj) {
            return i;
          }
        }
        return i;
      }
      //计算数组中最大最小
      function getMaximin(arr, maximin) {
        if (maximin == "max") {
          var max = arr[1],
            len = arr.length;
          for (var i = 2; i < len; i++) {
            if (arr[i] != 0) {
              if (arr[i] > max) {
                max = arr[i];
              }
            }
          }
          return max;
        } else if (maximin == "min") {
          var len = arr.length,
            min;
          for (var i = 1; i < len; i++) {
            if (arr[i] != 0) {
              min = arr[i];
              break;
            }
          }
          for (var i = 2; i < len; i++) {
            if (arr[i] != 0) {
              if (arr[i] < min) {
                min = arr[i];
              }
            }
          }
          return min;
        }
      }
      //比赛列表头的折叠按钮设置
      $('#mainContent').on('click', '.match-divider', function () {
        if ($(this).is('.close')) {
          $(this).removeClass('close');
          $(this).children('i.match-foldBtn.arrow-ico').css('transform', 'rotate(45deg)');
          $(this).parents('.match-list').removeClass('hideOneDay');
        } else {
          $(this).addClass('close');
          $(this).children('i.match-foldBtn.arrow-ico').css('transform', 'rotate(-135deg)');
          $(this).parents('.match-list').addClass('hideOneDay');
        }
      });
      //进入详情页设置
      $('div.content').on('click', 'span.detail', function () {
        var index = $(this).attr('data-index');
        var eventId = $(this).attr('data-id');
        if (!eventId) {
          return;
        }
        localStorage.setItem("datasetList", JSON.stringify(this.dataset));
        //				localStorage.setItem("eventId",eventId)
        //				localStorage.setItem("footHome", this.dataset.home);
        //				localStorage.setItem("footAway", this.dataset.away);
        //				localStorage.matchId = that.openAll[index].teamList[2];
        that.$router.push({ name: "detail" });
        // if (localStorage.app_flag == undefined) {
        //   that.$router.push({ path: "./detail" });
        // } else {
        //   mui.openWindow({
        //     url: '../rx9/detail.html',
        //     id: 'detail',
        //     styles: {
        //       top: base.getStatusbarHeight() + 'px',
        //       bottom: 0
        //     },
        //     show: {
        //       autoShow: true, //页面loaded事件发生后自动显示，默认为true
        //       aniShow: 'pop-in', //页面显示动画，默认为”slide-in-right“；
        //       duration: '200' //页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
        //     },
        //     createNew: true
        //   })
        // }
      });
      //弹出框-点击选择比分的按钮设置
      $('body').on('click', '.col.betbtn.more-option.ellipsis', function () {
        middleDisplacement($('div.iDialog'));
        $('div.iDialog').css('width', '95%');
        $('.iDialogLayout').css('display', 'block');
      });
      //显示串场数的按钮
      $('.goNext').on('click', '.count>span', function () {
        $(this).parents('.count').next().slideToggle('hide');
        $(this).children('i.arrow-ico').toggleClass('reversal');
      });
      //			//底部右上角关闭按钮
      //			$('.goNext').on('click', '.close', function() {
      //				$('.goNext').addClass('hide');
      //				$('.bottom-box .btn-confirm').removeClass('hide');
      //				$('.iDialogLayout').css('display', 'none');
      //				$('.iDialogWrap').removeClass("heightZIndex");
      //				//隐藏被选中的元素
      //				$('#showSelectContent').addClass('hide');
      //				$('#showSelectContent').removeClass('heightZIndex');
      //				//$('body').css('overflow', 'auto');
      //				$('#loading_wait').removeClass('show');
      //			});
      //弹出框确认按钮设置
      $('.bet-confirm div:last').on('click', function () {
        $('.iDialogWrap').removeClass('heightZIndex');
        $('.bet-confirm').css('display', 'none');
        $('.iDialogLayout').css('display', 'none');
      });
      //清空按钮
      $('.bet-bottom').on('click', '.btn-cancel', function () {
        mui.confirm(' ', '清除所选赛事', ['确定', '取消'], function (e) {
          if (e.index == 1) {
            return
          } else {
            that.clearSelectData();
          }
        })

      });
      //立即付款
      $('.goNext').on('click', '.paymentBtn', function () {
        if ($(this).is('.disabled') || $(this).is('.isDisabled')) {
          return
        } else {
          $(this).addClass('disabled');
        }
        $('.iDialogWrap').removeClass('heightZIndex').css('z-index', '100000');
        var userNameMsg = localStorage.userName,
          test = {},
          playType = that.playType;
        test.tzMsg = {
          //投注类型--串场类型
          //						tzType: tzType,
          //投注倍数
          tzMultiple: parseInt($('.goNext .count .multiple .center input').val()),
          //投注金额
          tzMoney: parseInt($('.goNext .paymentBtn .payNum').html()),
          one_type_id: 3,
          played_group_id: playType - 10,
          played_id: playType,
          banner_number: that.banner_number,
          expect_bonuses: $('.totalNum').html().replace(that.coinUnit, '').replace('~', '-'),
        };

        if (!userNameMsg) {
          localStorage.loginTo = "../footbalSingle/footbalSingle";
          localStorage.backAim_tz = that.playType;
          // that.tips("请先登录", "../loginIn/login.html", 1);
          that.tips("请先登录", "login", 1);
          return
        } else if (that.coin < test.tzMsg.tzMoney) {
          localStorage.loginTo = "../footbalSingle/footbalSingle";
          localStorage.backAim_tz = that.playType;
          // that.tips("余额不足，请先充值", "../loginIn/depositFile.html", 1);
          that.tips("余额不足，请先充值", "depositFile", 1);
          return
        } else if (!that.singleMaxSum || test.tzMsg.tzMoney > parseInt(that.singleMaxSum)) {
          that.tips("投注金额不能超过" + that.singleMaxSum, "", 0);
          return
        } else {
          $('#loading_wait').addClass('active');
          var tzType = [],
            selectBrqList = ["A1", "A2", "A3"],
            selectRQList = ["B1", "B2", "B3"],
            selectZjqList = ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8"],
            selectBfList = ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10", "D11", "D12", "D13", "D14", "D15", "D16", "D17", "D18", "D19", "D20", "D21", "D22", "D23", "D24", "D25", "D26", "D27", "D28", "D29", "D30", "D31"],
            selectBqcList = ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9"],
            selectUpDownList = ["F1", "F2", "F3", "F4"],
            test_selectItemList = [];
          $(".goNext .method.active").each(function () {
            var str = $(this).text();
            if (str == "单关") {
              tzType.push('1*1');
            } else {
              tzType.push(str.replace('串', '*'));
            }
          });
          test.tzMsg.tzType = tzType;
          for (var i = 0, len = that.selectDataList.length; i < len; i++) {
            var obj = that.selectDataList[i],
              selectItemList = {
                match_id: obj.match_id,
                A: [],
                B: [],
                D: [],
                E: [],
                C: [],
                F: [],
                fixedFlag: 0
              };
            switch (playType) {
              case 18:
                for (var j = 0, len1 = obj.spf_rqspf.length; j < len1; j++) {
                  if (obj.rqNum == 0) {
                    selectItemList.A.push(selectBrqList[obj.spf_rqspf[j]]);
                  } else {
                    selectItemList.B.push(selectRQList[obj.spf_rqspf[j] - 3]);
                  }
                }
                break;
              case 19:
                for (var j = 0, len1 = obj.sxds.length; j < len1; j++) {
                  selectItemList.F.push(selectUpDownList[obj.sxds[j]]);
                }
                break;
              case 20:
                for (var j = 0, len1 = obj.zjq.length; j < len1; j++) {
                  selectItemList.E.push(selectZjqList[obj.zjq[j]]);
                }
                break;
              case 22:
                for (var j = 0, len1 = obj.bf.length; j < len1; j++) {
                  selectItemList.D.push(selectBfList[obj.bf[j]]);
                }
                break;
            }
            selectItemList.A.length == 0 && delete selectItemList.A;
            selectItemList.B.length == 0 && delete selectItemList.B;
            selectItemList.E.length == 0 && delete selectItemList.E;
            selectItemList.D.length == 0 && delete selectItemList.D;
            selectItemList.C.length == 0 && delete selectItemList.C;
            selectItemList.F.length == 0 && delete selectItemList.F;
            test_selectItemList.push(selectItemList);
          }
          test.selectItemList = test_selectItemList;
          // llll = test;
          var str = {
            tzJson: (test)
          };
          //console.log(JSON.stringify(test));
          setTimeout(function () {
            $('#loading_wait').css('display', 'none');
            that.get_login(test);
          }, 500);
        }

      });
    },
    //开始一个时间worker
    startCountWorker: function () {
      var that = this;
      var timing = 4,
        countNum = 0;
        that.countTiming = setInterval(function () {
          // countNum += 1;
          // if (countNum >= timing) {
          //   clearInterval(that.countTiming);
            // that.startCountWorker();
          that.countTimingNum-=1000;
          if (that.countTimingNum==0){
            that.changeLoad(that.playType, 1, 2);
            that.countTimingNum=20000
          }

            //						location.reload();
            //						var isUseTime = setTimeout(function() {
            //							location.reload();
            //						}, 5000);
            //						mui.confirm('是否刷新本页面', '确认框', ['确定', '取消'], function(e) {
            //							if(e.index == 0) {
            //								location.reload();
            //							} else {
            //								window.clearTimeout(isUseTime);
            //							}
            //							//console.log(e.index)
            //						});
          // }
        }, 20000);
    },
    //开始一个worker
    //开始一个計算worker
    startWorker: function (playType) {
      var worker = new Worker("./static/js/compute/qf_worker.js"),
        that = this,
        data = {
          dataList: that.selectDataList,
          indexList: that.tzType_free,
          minList: that.minList,
          maxList: that.maxList,
          dataType: that.playType,
          //					isSingle: 0,
        };
      worker.postMessage(JSON.stringify(data));
      worker.onmessage = function (evt) { //接收worker传过来的数据函数
        //console.log(evt.data); //输出worker发送来的数据
        var k = JSON.parse(evt.data);
        that.setMaxMin(parseFloat(k.min), parseFloat(k.max));
        that.maxList = k.maxList;
        that.minList = k.minList;
        worker.terminate();
      }
    },
    //得到最大最小进行计算
    setMaxMin: function (min, max) {
      var that = this,
        html = "";
      if (min.toFixed(2) != max.toFixed(2)) {
        that.totalNum = (min * 2 * that.multiple * that.odds_percent).toFixed(2) + '~' + (max * 2 * that.multiple * that.odds_percent).toFixed(2);
        that.min = min;
        that.max = max;
      } else {
        that.totalNum = (min * 2 * that.multiple * that.odds_percent).toFixed(2);
        that.min = min;
        that.max = max;
      }
      $('.goNext .paymentBtn').removeClass('disabled');
    },
    //摇一摇
    sharkitFn: function () {
      if (!$(".selectContent").is(":hidden")) {
        return
      }
      if (this.dealData.length > 0) {
        var is = 0,that=this,
          _this = $('#sharkit');
        if (this.sharkTime !== "") {
          return
        }
        $("#audio_shark")[0].play();
        $('body').css('overflow', 'hidden');
        this.sharkTime = setInterval(function () {
          if (is > 7) {
            that.clearSelectData();
            //						var dataList = fs.league_signNumList,
            //							playType = fs.playType,
            //							outIndex = 0, //外层随机下标
            //							inIndex = 0, //里层随机下标
            //							typeIndex = 0, //混合全部和单关全部区分
            //							rowIndex =0,
            //							itemIndex = 0; //触发点击的下标
            //						for(var i = 0; i < 2; i++) {
            //							//找到随机到的数据
            //							var outNowIndex=parseInt(Math.random() * dataList.length),
            //								inNowIndex= parseInt(Math.random() * dataList[outIndex].length);
            //							if(outNowIndex!==outIndex){
            //								outIndex=outNowIndex;
            //								inIndex = parseInt(Math.random() * dataList[outIndex].length);
            //							}else{
            //								outIndex=outNowIndex;
            //								do{
            //									inNowIndex= parseInt(Math.random() * dataList[outIndex].length)
            //								}while(inIndex===inNowIndex)
            //								inIndex=inNowIndex;
            //							}
            //							switch (playType){
            //								case 18:
            //									itemIndex = parseInt(Math.random() * 2+2);
            //									$('#mainContent .match-item[data-sign=' + dataList[outIndex][inIndex] + '] .betbtn:nth-child(' + itemIndex + ')').trigger('click');
            //									break;
            //								case 19:
            //									rowIndex=parseInt(Math.random() * 2+1);
            //									itemIndex = parseInt(Math.random() * 2+1);
            //									$('#mainContent .match-item[data-sign=' + dataList[outIndex][inIndex] + '] .row:nth-child(' + rowIndex + ') .betbtn:nth-child(' + itemIndex + ')').trigger('click');
            //									break;
            //								case 20:
            //									rowIndex=parseInt(Math.random() * 2+1);
            //									itemIndex = parseInt(Math.random() * 2+1);
            //									$('#mainContent .match-item[data-sign=' + dataList[outIndex][inIndex] + '] .row:nth-child(' + rowIndex + ') .betbtn:nth-child(' + itemIndex + ')').trigger('click');
            //									break;
            //								case 22:
            //									break;
            //							}
            //						}

            var maxNum = 0, len = $("#mainContent dl dd").length;
            if (len == 1) {
              maxNum = 1;
            } else if (len == 2) {
              maxNum = 2;
            } else {
              maxNum = 3;
            }
            var playType = that.playType,
              randomNumList = {
                //dd的随机下标（1-3）
                dI_f: Math.floor(Math.random() * maxNum + 1),//+1使得最小为1,范围(1~3)
                dI_s: Math.floor(Math.random() * maxNum + 1),//+1使得最小为1,范围(1~3)

              },
              ddH = $("#mainContent dl:first dd:first")[0].clientHeight,
              dtH = $("#mainContent dl:first dt:first").height(),
              headerH = that.randowLimit.headerH,
              scrollH = $("#mainContent").scrollTop(),
              offsetY,
              list = [],
              domList = [],
              rowList = [Math.floor(Math.random() * 2 + 1), Math.floor(Math.random() * 2 + 1)],
              colList = [Math.floor(Math.random() * 3), Math.floor(Math.random() * 3)],
              ele1, ele2;

            if (len > 1) {
              do {
                randomNumList.dI_s = Math.floor(Math.random() * maxNum + 1);
              } while (randomNumList.dI_f == randomNumList.dI_s)
            }
            list = [randomNumList.dI_s, randomNumList.dI_f];
            //console.log(list);
            switch (playType) {
              case 18://单场-胜平负
                if (scrollH > dtH) {
                  dtH = 0;
                }
                for (var i = 0; i < 1; i++) {
                  offsetY = that.randowX(ddH, list[i]) + scrollH + dtH + headerH;
                  //console.log(scrollH + dtH + headerH, offsetY)
                  ele1 = document.elementFromPoint(50, offsetY);
                  if ($(ele1).is(".match-item.represent")) {
                    domList.push($(ele1).find(".betbtn:nth-child(" + (colList[i] + 2) + ")"))

                  } else {
                    domList.push($(ele1).parents(".match-item.represent").find(".betbtn:nth-child(" + (colList[i] + 2) + ")"))
                  }
                  //									//console.log(scrollH+dtH+headerH,offsetY)
                  //									//console.log(domList)

                }
                that.drawLine(domList);
                break;
              case 19://单场-上下单双
                if (scrollH > dtH) {
                  dtH = 0;
                }
                colList = [Math.floor(Math.random() * 2), Math.floor(Math.random() * 2)];
                for (var i = 0; i < 1; i++) {
                  offsetY = that.randowX(ddH, list[i]) + scrollH + dtH + headerH;
                  //console.log(scrollH + dtH + headerH, offsetY)
                  ele1 = document.elementFromPoint(50, offsetY);
                  if ($(ele1).is(".match-item.represent")) {
                    domList.push($(ele1).find(".row:nth-child(" + rowList[i] + ") .betbtn:nth-child(" + (colList[i] + 1) + ")"))

                  } else {
                    domList.push($(ele1).parents(".match-item.represent").find(".row:nth-child(" + rowList[i] + ") .betbtn:nth-child(" + (colList[i] + 1) + ")"))
                  }
                  //									//console.log(scrollH+dtH+headerH,offsetY)
                  //									//console.log(domList)

                }
                that.drawLine(domList);
                break;
              case 20://总进球
                if (scrollH > dtH) {
                  dtH = 0;
                }
                colList = [Math.floor(Math.random() * 4), Math.floor(Math.random() * 4)];
                for (var i = 0; i < 1; i++) {
                  offsetY = that.randowX(ddH, list[i]) + scrollH + dtH + headerH;
                  ele1 = document.elementFromPoint(50, offsetY);
                  if ($(ele1).is(".match-item.represent")) {
                    domList.push($(ele1).find(".row:nth-child(" + rowList[i] + ") .betbtn:nth-child(" + (colList[i] + 1) + ")"))

                  } else {
                    domList.push($(ele1).parents(".match-item.represent").find(".row:nth-child(" + rowList[i] + ") .betbtn:nth-child(" + (colList[i] + 1) + ")"))
                  }
                  //									//console.log(scrollH+dtH+headerH,offsetY)
                  //									//console.log(domList)

                }
                that.drawLine(domList);
                break;
            }

            window.clearInterval(that.sharkTime);
            //						//$('body').css('overflow', 'auto');
            setTimeout(function () {
              that.sharkTime = "";
            }, 1000)
            return
            //						$('#sharkit').on('click', fs.sharkitFn);
          }
          if (is % 2 == 0) {
            $(_this).css({
              "-ms-transform": "rotate(-30deg)",
              /* IE 9 */
              "-moz-transform": "rotate(-30deg)",
              /* Firefox */
              "-webkit-transform": "rotate(-30deg)",
              /* Safari 和 Chrome */
              "-o-transform": "rotate(-30deg)"
            });
          } else {
            $(_this).css({
              "-ms-transform": "rotate(0deg)",
              /* IE 9 */
              "-moz-transform": "rotate(0deg)",
              /* Firefox */
              "-webkit-transform": "rotate(0deg)",
              /* Safari 和 Chrome */
              "-o-transform": "rotate(0deg)"
            });
          }
          is++;
        }, 100);
      }
    },

    randowX: function (offset, index) {
      return offset * index - offset / 2;
    },
    //画布canvas
    drawLine: function (list) {

      var c = document.getElementById("coverRandow"),
        cxt = c.getContext("2d"),
        sharkXY = $("#sharkit").offset(),
        that = this, count = 0,
        scrollH = $("#mainContent").scrollTop(),
        headerH = that.randowLimit.headerH;
      for (var i = 0; i < 1; i++) {
        if (list[i].length !== 0) {
          count++;
        }
      }
      if (!count) {
        return
      }
      $("body").css("overflow", "hidden");
      $("#coverRandow").css("z-index", 50);
      $("#coverRandow").show();
      c.height = $("body").height();
      cxt.strokeStyle = "#cc1e36";
      cxt.lineWidth = 2;
      for (var i = 0; i < list.length; i++) {
        if (list[i].length != 0) {
          var item = list[i].offset();
          var H = list[i][0].offsetHeight / 2;
          var W = list[i][0].offsetWidth / 2;
          cxt.moveTo(sharkXY.left + 28, sharkXY.top + 34 - headerH);
          cxt.lineTo(item.left + W, item.top + H - headerH);
          cxt.stroke();
        }
      }
      setTimeout(function () {
        list[0].trigger('click');
        $("#coverRandow").hide();
        $("#coverRandow").css("z-index", -1);
        //$("body").css("overflow", "auto");
      }, 600)

    },

    //跟随移动
    moveFollow: function (block) {
      var oW, oH;
      var preHandler = function defaultEvent(e) {
        if (e.cancelable) {
          // 判断默认行为是否已经被禁用
          if (!e.defaultPrevented) {
            e.preventDefault();
          }
        }
      };
      // 绑定touchstart事件
      block.on({
        touchstart: function (e) {
          e.preventDefault();
          var touches = e.touches[0];
          oW = touches.clientX - block[0].offsetLeft;
          oH = touches.clientY - block[0].offsetTop;
          //阻止页面的滑动默认事件
          document.addEventListener("touchmove", preHandler, false);
        },
        touchmove: function (e) {
          if (e.cancelable) {
            // 判断默认行为是否已经被禁用
            if (!e.defaultPrevented) {
              e.preventDefault();
            }
          }
          var touches = e.touches[0];
          var oLeft = touches.clientX - oW;
          var oTop = touches.clientY - oH;
          if (oLeft < 0) {
            oLeft = 0;
          } else if (oLeft > document.documentElement.clientWidth - block[0].offsetWidth) {
            oLeft = document.documentElement.clientWidth - block[0].offsetWidth;
          }
          block.css({
            "left": oLeft + "px",
            "top": oTop + "px"
          });
        },
        touchend: function () {
          document.removeEventListener("touchmove", preHandler, false);
        }
      });
    },
    //底部样式修改
    bottomStyle: function () {
      var that = this,
        playType = that.playType,
        len = that.selectDataList.length;
      //根据数组的长度改变底部文字
      if (len == 0) {
        $('.bet-bottom .btn-confirm').html('请选择比赛结果');
        $('.bet-bottom .btn-confirm').attr('data-index', 0);
        $('.bet-bottom .box-center').addClass('hide');
        $('.bet-bottom .bet-help').removeClass('hide');
        $('.bet-bottom .btn-confirm').removeClass('cNext');
      } else {
        $('.bet-bottom .match-num').html(len);
        $('.bet-bottom .btn-confirm').attr('data-index', 1);
        $('.bet-bottom .btn-confirm').html('选好了，下一步');
        $('.bet-bottom .btn-confirm').addClass('cNext');
        $('.bet-bottom .bet-help').addClass('hide');
        $('.bet-bottom .box-center').removeClass('hide');
      };
    },
    //判断是否左移动或者右边移动
    contentMove: function (content) {
      var startW,
        endW, left, right, that = this,
        playType = that.playType,
        halfW = document.body.clientWidth / 2;
      switch (playType) {
        case 6:
          left = 6, right = 1;
          break;
        case 7:
          left = 4, right = 8;
          break;
        case 12:
          left = 11, right = 12;
          break;
        default:
          left = playType - 1;
          right = playType + 1;
          break;
      }
      $(content).on({
        touchstart: function (e) {
          var touches = e.touches[0];
          startW = touches.clientX;
        },
        touchend: function (e) {
          var touches = e.touches[0];
          endW = e.changedTouches[0].clientX;
          if (startW <= halfW) {
            if (endW - startW > halfW) {
              that.changeLoad(left, 1);
            }
          } else {
            if (startW - endW > halfW) {
              that.changeLoad(right, 1);
            }
          }
        }
      });
    },
    //比较数组中的数，找出最小
    findListMin: function (list) {
      var min = 0;
      if (list != "") {
        for (var i = 0, len = list.length; i < len; i++) {
          if (list[i] != 0) {
            min == 0 && (min = list[i]);
            if (min > list[i]) {
              min = list[i];
            }
          }
        }
      }
      return min;
    },
    //比较数组中的数，找出最大
    findListMax: function (list) {
      var max = 0;
      if (list != "") {
        for (var i = 0, len = list.length; i < len; i++) {
          if (list[i] != 0) {
            max == 0 && (max = list[i]);
            if (max < list[i]) {
              max = list[i];
            }
          }
        }
      }
      return max;
    },
    //找到数组中最小的几个数
    findListTwoMin: function (list, index) {

      var minList = [],
        min = 1;
      list.sort(function (a, b) {
        return a - b;
      });
      for (var j = 0; j < index; j++) {
        minList.push(list[j]);
      }
      for (var j = 0, len = minList.length; j < len; j++) {
        min = min * minList[j];
      }
      return min;
    },
    //串场----计算注数---只算串1
    calculateNum: function (indexList, lenList) {
      var sumNum = 0,
        that = this;
      for (var i = 0, len1 = indexList.length; i < len1; i++) {
        switch (indexList[i]) {
          case 1:
            //单关
            for (var j = 0; j < lenList.length; j++) {
              sumNum += lenList[j];
            }
            break;
          case 2:
            //2串1
            for (var j = 0, len = lenList.length; j < len - 1; j++) {
              var k = j + 1;
              do {
                sumNum += lenList[j] * lenList[k];
                k++;
              } while (k < len);
            }
            break;
          case 3:
            //3串1
            for (var j = 0, len = lenList.length; j < len - 2; j++) {
              var k = j + 1,
                l = j + 2;
              do {
                do {
                  sumNum += lenList[j] * lenList[k] * lenList[l];
                  l++;
                } while (l < len);
                k++ , l = k + 1;
              } while (k < len - 1);
            }
            break;
          case 4:
            //4串1
            for (var j = 0, len = lenList.length; j < len - 3; j++) {
              var k = j + 1,
                l = j + 2,
                m = j + 3;
              do {
                do {
                  do {
                    sumNum += lenList[j] * lenList[k] * lenList[l] * lenList[m];
                    m++;
                  } while (m < len);
                  l++ , m = l + 1;
                } while (l < len - 1);
                k++ , l = k + 1, m = k + 2;
              } while (k < len - 2);
            }
            break;
          case 5:
            //5串1
            for (var j = 0, len = lenList.length; j < len - 4; j++) {
              var k = j + 1,
                l = j + 2,
                m = j + 3,
                n = j + 4;
              do {
                do {
                  do {
                    do {
                      sumNum += lenList[j] * lenList[k] * lenList[l] * lenList[m] * lenList[n];
                      n++;
                    } while (n < len);
                    m++ , n = m + 1;
                  } while (m < len - 1);
                  l++ , m = l + 1, n = l + 2;
                } while (l < len - 2);
                k++ , l = k + 1, m = k + 2, n = k + 3;
              } while (k < len - 3);
            }
            break;
          case 6:
            //6串1--------未测试
            for (var j = 0, len = lenList.length; j < len - 5; j++) {
              var k = j + 1,
                l = j + 2,
                m = j + 3,
                n = j + 4,
                q = j + 5;
              do {
                do {
                  do {
                    do {
                      do {
                        sumNum += lenList[j] * lenList[k] * lenList[l] * lenList[m] * lenList[n] * lenList[q];
                        q++;
                      } while (q < len);
                      n++ , q = n + 1;
                    } while (n < len - 1);
                    m++ , n = m + 1, q = m + 2;
                  } while (m < len - 2);
                  l++ , m = l + 1, n = l + 2, q = l + 3;
                } while (l < len - 3);
                k++ , l = k + 1, m = k + 2, n = k + 3, q = k + 4;
              } while (k < len - 4);
            }
            break;
          case 7:
            //7串1-------------未测试
            for (var j = 0, len = lenList.length; j < len - 6; j++) {
              var k = j + 1,
                l = j + 2,
                m = j + 3,
                n = j + 4,
                q = j + 5,
                w = j + 6;
              do {
                do {
                  do {
                    do {
                      do {
                        do {
                          sumNum += lenList[j] * lenList[k] * lenList[l] * lenList[m] * lenList[n] * lenList[q] * lenList[w];
                          w++;
                        } while (w < len);
                        q++ , w = q + 1;
                      } while (q < len - 1);
                      n++ , q = n + 1, w = n + 2;
                    } while (n < len - 2);
                    m++ , n = m + 1, q = m + 2, w = m + 3;
                  } while (m < len - 3);
                  l++ , m = l + 1, n = l + 2, q = l + 3, w = l + 4;
                } while (l < len - 4);
                k++ , l = k + 1, m = k + 2, n = k + 3, q = k + 4, w = k + 5;
              } while (k < len - 5);
            }
            break;
          case 8:
            //8串1---------未测试
            for (var j = 0, len = lenList.length; j < len - 7; j++) {
              var k = j + 1,
                l = j + 2,
                m = j + 3,
                n = j + 4,
                q = j + 5,
                w = j + 6,
                e = j + 7;
              do {
                do {
                  do {
                    do {
                      do {
                        do {
                          do {
                            sumNum += lenList[j] * lenList[k] * lenList[l] * lenList[m] * lenList[n] * lenList[q] * lenList[w] * lenList[e];
                            e++;
                          } while (e < len);
                          w++ , e = w + 1;
                        } while (w < len - 1);
                        q++ , w = q + 1, e = q + 2;
                      } while (q < len - 2);
                      n++ , q = n + 1, w = n + 2, e = n + 3;
                    } while (n < len - 3);
                    m++ , n = m + 1, q = m + 2, w = m + 3, e = m + 4;
                  } while (m < len - 4);
                  l++ , m = l + 1, n = l + 2, q = l + 3, w = l + 4, e = l + 5;
                } while (l < len - 5);
                k++ , l = k + 1, m = k + 2, n = k + 3, q = k + 4, w = k + 5, e = k + 6;
              } while (k < len - 6);
            }
            break;
          case 9: //9串1---------未测试
            for (var j = 0, len = lenList.length; j < len - 8; j++) {
              var k = j + 1,
                l = j + 2,
                m = j + 3,
                n = j + 4,
                q = j + 5,
                w = j + 6,
                e = j + 7,
                t = j + 8;
              do {
                do {
                  do {
                    do {
                      do {
                        do {
                          do {
                            do {
                              sumNum += lenList[j] * lenList[k] * lenList[l] * lenList[m] * lenList[n] * lenList[q] * lenList[w] * lenList[e] * lenList[t];
                              t++;
                            } while (t < len);
                            e++ , t = e + 1;
                          } while (e < len - 1);
                          w++ , e = w + 1, t = w + 2;
                        } while (w < len - 2);
                        q++ , w = q + 1, e = q + 2, t = q + 3;
                      } while (q < len - 3);
                      n++ , q = n + 1, w = n + 2, e = n + 3, t = n + 4;
                    } while (n < len - 4);
                    m++ , n = m + 1, q = m + 2, w = m + 3, e = m + 4, t = m + 5;
                  } while (m < len - 5);
                  l++ , m = l + 1, n = l + 2, q = l + 3, w = l + 4, e = l + 5, t = l + 6;
                } while (l < len - 6);
                k++ , l = k + 1, m = k + 2, n = k + 3, q = k + 4, w = k + 5, e = k + 6, t = k + 7;
              } while (k < len - 7);
            }
            break;
          case 10: //10串1---------未测试
            for (var j = 0, len = lenList.length; j < len - 9; j++) {
              var k = j + 1,
                l = j + 2,
                m = j + 3,
                n = j + 4,
                q = j + 5,
                w = j + 6,
                e = j + 7,
                t = j + 8,
                z = j + 9;
              do {
                do {
                  do {
                    do {
                      do {
                        do {
                          do {
                            do {
                              do {
                                sumNum += lenList[j] * lenList[k] * lenList[l] * lenList[m] * lenList[n] * lenList[q] * lenList[w] * lenList[e] * lenList[t] * lenList[z];
                                z++;
                              } while (z < len);
                              t++ , z = t + 1;
                            } while (t < len - 1);
                            e++ , t = e + 1, z = e + 2;
                          } while (e < len - 2);
                          w++ , e = w + 1, t = w + 2, z = w + 3;
                        } while (w < len - 3);
                        q++ , w = q + 1, e = q + 2, t = q + 3, z = q + 4;
                      } while (q < len - 4);
                      n++ , q = n + 1, w = n + 2, e = n + 3, t = n + 4, z = n + 5;
                    } while (n < len - 5);
                    m++ , n = m + 1, q = m + 2, w = m + 3, e = m + 4, t = m + 5, z = m + 6;
                  } while (m < len - 6);
                  l++ , m = l + 1, n = l + 2, q = l + 3, w = l + 4, e = l + 5, t = l + 6, z = l + 7;
                } while (l < len - 7);
                k++ , l = k + 1, m = k + 2, n = k + 3, q = k + 4, w = k + 5, e = k + 6, t = k + 7, z = k + 8;
              } while (k < len - 8);
            }
            break;
          case 11: //11串1---------未测试
            for (var j = 0, len = lenList.length; j < len - 10; j++) {
              var k = j + 1,
                l = j + 2,
                m = j + 3,
                n = j + 4,
                q = j + 5,
                w = j + 6,
                e = j + 7,
                t = j + 8,
                z = j + 9,
                x = j + 10;
              do {
                do {
                  do {
                    do {
                      do {
                        do {
                          do {
                            do {
                              do {
                                do {
                                  sumNum += lenList[j] * lenList[k] * lenList[l] * lenList[m] * lenList[n] * lenList[q] * lenList[w] * lenList[e] * lenList[t] * lenList[z] * lenList[x];
                                  x++;
                                } while (x < len);
                                z++ , x = z + 1;
                              } while (z < len - 1);
                              t++ , z = t + 1, x = t + 2;
                            } while (t < len - 2);
                            e++ , t = e + 1, z = e + 2, x = e + 3;
                          } while (e < len - 3);
                          w++ , e = w + 1, t = w + 2, z = w + 3, x = w + 4;
                        } while (w < len - 4);
                        q++ , w = q + 1, e = q + 2, t = q + 3, z = q + 4, x = q + 5;
                      } while (q < len - 5);
                      n++ , q = n + 1, w = n + 2, e = n + 3, t = n + 4, z = n + 5, x = n + 6;
                    } while (n < len - 6);
                    m++ , n = m + 1, q = m + 2, w = m + 3, e = m + 4, t = m + 5, z = m + 6, x = m + 7;
                  } while (m < len - 7);
                  l++ , m = l + 1, n = l + 2, q = l + 3, w = l + 4, e = l + 5, t = l + 6, z = l + 7, x = l + 8;
                } while (l < len - 8);
                k++ , l = k + 1, m = k + 2, n = k + 3, q = k + 4, w = k + 5, e = k + 6, t = k + 7, z = k + 8, x = k + 9;
              } while (k < len - 9);
            }
            break;
          case 12: //12串1---------未测试
            for (var j = 0, len = lenList.length; j < len - 11; j++) {
              var k = j + 1,
                l = j + 2,
                m = j + 3,
                n = j + 4,
                q = j + 5,
                w = j + 6,
                e = j + 7,
                t = j + 8,
                z = j + 9,
                x = j + 10,
                c = j + 11;
              do {
                do {
                  do {
                    do {
                      do {
                        do {
                          do {
                            do {
                              do {
                                do {
                                  do {
                                    sumNum += lenList[j] * lenList[k] * lenList[l] * lenList[m] * lenList[n] * lenList[q] * lenList[w] * lenList[e] * lenList[t] * lenList[z] * lenList[x] * lenList[c];
                                    c++;
                                  } while (c < len);
                                  x++ , c = x + 1;
                                } while (x < len - 1);
                                z++ , x = z + 1, c = z + 2;
                              } while (z < len - 2);
                              t++ , z = t + 1, x = t + 2, c = t + 3;
                            } while (t < len - 3);
                            e++ , t = e + 1, z = e + 2, x = e + 3, c = e + 4;
                          } while (e < len - 4);
                          w++ , e = w + 1, t = w + 2, z = w + 3, x = w + 4, c = w + 5;
                        } while (w < len - 5);
                        q++ , w = q + 1, e = q + 2, t = q + 3, z = q + 4, x = q + 5, c = q + 6;
                      } while (q < len - 6);
                      n++ , q = n + 1, w = n + 2, e = n + 3, t = n + 4, z = n + 5, x = n + 6, c = n + 7;
                    } while (n < len - 7);
                    m++ , n = m + 1, q = m + 2, w = m + 3, e = m + 4, t = m + 5, z = m + 6, x = m + 7, c = m + 8;
                  } while (m < len - 8);
                  l++ , m = l + 1, n = l + 2, q = l + 3, w = l + 4, e = l + 5, t = l + 6, z = l + 7, x = l + 8, c = l + 9;
                } while (l < len - 9);
                k++ , l = k + 1, m = k + 2, n = k + 3, q = k + 4, w = k + 5, e = k + 6, t = k + 7, z = k + 8, x = k + 9, c = k + 10;
              } while (k < len - 10);
            }
            break;
          case 13: //13串1---------未测试
            for (var j = 0, len = lenList.length; j < len - 12; j++) {
              var k = j + 1,
                l = j + 2,
                m = j + 3,
                n = j + 4,
                q = j + 5,
                w = j + 6,
                e = j + 7,
                t = j + 8,
                z = j + 9,
                x = j + 10,
                c = j + 11,
                v = j + 12;
              do {
                do {
                  do {
                    do {
                      do {
                        do {
                          do {
                            do {
                              do {
                                do {
                                  do {
                                    do {
                                      sumNum += lenList[j] * lenList[k] * lenList[l] * lenList[m] * lenList[n] * lenList[q] * lenList[w] * lenList[e] * lenList[t] * lenList[z] * lenList[x] * lenList[c] * lenList[v];
                                      v++;
                                    } while (v < len);
                                    c++ , v = c + 1;
                                  } while (c < len - 1);
                                  x++ , c = x + 1, v = x + 2;
                                } while (x < len - 2);
                                z++ , x = z + 1, c = z + 2, v = z + 3;
                              } while (z < len - 3);
                              t++ , z = t + 1, x = t + 2, c = t + 3, v = t + 4;
                            } while (t < len - 4);
                            e++ , t = e + 1, z = e + 2, x = e + 3, c = e + 4, v = e + 5;
                          } while (e < len - 5);
                          w++ , e = w + 1, t = w + 2, z = w + 3, x = w + 4, c = w + 5, v = w + 6;
                        } while (w < len - 6);
                        q++ , w = q + 1, e = q + 2, t = q + 3, z = q + 4, x = q + 5, c = q + 6, v = q + 7;
                      } while (q < len - 7);
                      n++ , q = n + 1, w = n + 2, e = n + 3, t = n + 4, z = n + 5, x = n + 6, c = n + 7, v = n + 8;
                    } while (n < len - 8);
                    m++ , n = m + 1, q = m + 2, w = m + 3, e = m + 4, t = m + 5, z = m + 6, x = m + 7, c = m + 8, v = m + 9;
                  } while (m < len - 9);
                  l++ , m = l + 1, n = l + 2, q = l + 3, w = l + 4, e = l + 5, t = l + 6, z = l + 7, x = l + 8, c = l + 9, v = l + 10;
                } while (l < len - 10);
                k++ , l = k + 1, m = k + 2, n = k + 3, q = k + 4, w = k + 5, e = k + 6, t = k + 7, z = k + 8, x = k + 9, c = k + 10, v = k + 11;
              } while (k < len - 11);
            }
            break;
          case 14: //14串1---------未测试
            for (var j = 0, len = lenList.length; j < len - 13; j++) {
              var k = j + 1,
                l = j + 2,
                m = j + 3,
                n = j + 4,
                q = j + 5,
                w = j + 6,
                e = j + 7,
                t = j + 8,
                z = j + 9,
                x = j + 10,
                c = j + 11,
                v = j + 12,
                b = j + 13;
              do {
                do {
                  do {
                    do {
                      do {
                        do {
                          do {
                            do {
                              do {
                                do {
                                  do {
                                    do {
                                      do {
                                        sumNum += lenList[j] * lenList[k] * lenList[l] * lenList[m] * lenList[n] * lenList[q] * lenList[w] * lenList[e] * lenList[t] * lenList[z] * lenList[x] * lenList[c] * lenList[v] * lenList[b];
                                        b++;
                                      } while (b < len);
                                      v++ , b = v + 1;
                                    } while (v < len - 1);
                                    c++ , v = c + 1, b = c + 2;
                                  } while (c < len - 2);
                                  x++ , c = x + 1, v = x + 2, b = x + 3;
                                } while (x < len - 3);
                                z++ , x = z + 1, c = z + 2, v = z + 3, b = z + 4;
                              } while (z < len - 4);
                              t++ , z = t + 1, x = t + 2, c = t + 3, v = t + 4, b = t + 5;
                            } while (t < len - 5);
                            e++ , t = e + 1, z = e + 2, x = e + 3, c = e + 4, v = e + 5, b = e + 6;
                          } while (e < len - 6);
                          w++ , e = w + 1, t = w + 2, z = w + 3, x = w + 4, c = w + 5, v = w + 6, b = w + 7;
                        } while (w < len - 7);
                        q++ , w = q + 1, e = q + 2, t = q + 3, z = q + 4, x = q + 5, c = q + 6, v = q + 7, b = q + 8;
                      } while (q < len - 8);
                      n++ , q = n + 1, w = n + 2, e = n + 3, t = n + 4, z = n + 5, x = n + 6, c = n + 7, v = n + 8, b = n + 9;
                    } while (n < len - 9);
                    m++ , n = m + 1, q = m + 2, w = m + 3, e = m + 4, t = m + 5, z = m + 6, x = m + 7, c = m + 8, v = m + 9, b = m + 10;
                  } while (m < len - 10);
                  l++ , m = l + 1, n = l + 2, q = l + 3, w = l + 4, e = l + 5, t = l + 6, z = l + 7, x = l + 8, c = l + 9, v = l + 10, b = l + 11;
                } while (l < len - 11);
                k++ , l = k + 1, m = k + 2, n = k + 3, q = k + 4, w = k + 5, e = k + 6, t = k + 7, z = k + 8, x = k + 9, c = k + 10, v = k + 11, b = k + 12;
              } while (k < len - 12);
            }
            break;
          case 15: //15串1---------未测试
            for (var j = 0, len = lenList.length; j < len - 14; j++) {
              var k = j + 1,
                l = j + 2,
                m = j + 3,
                n = j + 4,
                q = j + 5,
                w = j + 6,
                e = j + 7,
                t = j + 8,
                z = j + 9,
                x = j + 10,
                c = j + 11,
                v = j + 12,
                b = j + 13,
                f = j + 14;
              do {
                do {
                  do {
                    do {
                      do {
                        do {
                          do {
                            do {
                              do {
                                do {
                                  do {
                                    do {
                                      do {
                                        do {
                                          sumNum += lenList[j] * lenList[k] * lenList[l] * lenList[m] * lenList[n] * lenList[q] * lenList[w] * lenList[e] * lenList[t] * lenList[z] * lenList[x] * lenList[c] * lenList[v] * lenList[b] * lenList[f];
                                          f++;
                                        } while (f < len);
                                        b++ , f = b + 1;
                                      } while (b < len - 1);
                                      v++ , b = v + 1, f = v + 2;
                                    } while (v < len - 2);
                                    c++ , v = c + 1, b = c + 2, f = c + 3;
                                  } while (c < len - 3);
                                  x++ , c = x + 1, v = x + 2, b = x + 3, f = x + 4;
                                } while (x < len - 4);
                                z++ , x = z + 1, c = z + 2, v = z + 3, b = z + 4, f = z + 5;
                              } while (z < len - 5);
                              t++ , z = t + 1, x = t + 2, c = t + 3, v = t + 4, b = t + 5, f = t + 6;
                            } while (t < len - 6);
                            e++ , t = e + 1, z = e + 2, x = e + 3, c = e + 4, v = e + 5, b = e + 6, f = e + 7;
                          } while (e < len - 7);
                          w++ , e = w + 1, t = w + 2, z = w + 3, x = w + 4, c = w + 5, v = w + 6, b = w + 7, f = w + 8;
                        } while (w < len - 8);
                        q++ , w = q + 1, e = q + 2, t = q + 3, z = q + 4, x = q + 5, c = q + 6, v = q + 7, b = q + 8, f = q + 9;
                      } while (q < len - 9);
                      n++ , q = n + 1, w = n + 2, e = n + 3, t = n + 4, z = n + 5, x = n + 6, c = n + 7, v = n + 8, b = n + 9, f = n + 10;
                    } while (n < len - 10);
                    m++ , n = m + 1, q = m + 2, w = m + 3, e = m + 4, t = m + 5, z = m + 6, x = m + 7, c = m + 8, v = m + 9, b = m + 10, f = m + 11;
                  } while (m < len - 11);
                  l++ , m = l + 1, n = l + 2, q = l + 3, w = l + 4, e = l + 5, t = l + 6, z = l + 7, x = l + 8, c = l + 9, v = l + 10, b = l + 11, f = l + 12;
                } while (l < len - 12);
                k++ , l = k + 1, m = k + 2, n = k + 3, q = k + 4, w = k + 5, e = k + 6, t = k + 7, z = k + 8, x = k + 9, c = k + 10, v = k + 11, b = k + 12, f = k + 13;
              } while (k < len - 13);
            }
            break;
          default:
            break;
        }
      }
      return sumNum;
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
            $('.goNext .state>span').html("钱包:" + that.coin + that.coinUnit + "(可用)");
            that.tips("投注成功", "", 3);
          } else {
            that.tips(data.msg, "", 3);
          }
        }
      };
      this.base.callAuthApi(obj);
    },
    tips: function (str, urlName, index) {
      var that = this;
      $('#loading_wait').removeClass('show');

      function middleDisplacement(e) {
        var screenW = e.width();
        var screenH = e.height();
        e.css('visibility', 'visible').css('top', '50%').css('left', '50%').css('margin-left', -screenW / 2 + 'px').css('margin-top', -screenH / 2 + 'px').css('display', 'block');
      }
      $('.goNext').addClass('hide');
      $('.bottom-box .btn-confirm').removeClass('hide');
      $('.iDialogLayout').css('display', 'none');
      $('.iDialogWrap').removeClass("heightZIndex");
      //隐藏被选中的元素
      $('#showSelectContent').addClass('hide');
      $('#showSelectContent').removeClass('heightZIndex');
      //$('body').css('overflow', 'auto');
      $('.iDialogWrap').addClass("heightZIndex");
      middleDisplacement($('.bet-confirm'));
      $('.bet-confirm').css('width', '80%');
      $('.bet-confirm div:first').html(str);
      //			that.goLogin = true;
      $('.iDialogLayout').css('display', 'block');
      var timeout = setTimeout(function () {
        $('.goNext .paymentBtn').removeClass('disabled');
        $('.iDialogWrap').css('z-index', '-1');
        $('.iDialogWrap').removeClass('heightZIndex');
        $('.bet-confirm').css('display', 'none');
        $('.iDialogLayout').css('display', 'none');
        clearTimeout(timeout);
        switch (index) {
          case 1:
            that.$router.push({ name: urlName });
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
            //       autoShow: true, //页面loaded事件发生后自动显示，默认为true
            //       aniShow: 'pop-in', //页面显示动画，默认为”slide-in-right“；
            //       duration: '200' //页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
            //     },
            //     createNew: true
            //   })
            // }
            break;
          case 2:
            that.changeLoad(that.playType, 1);
            break;
          case 3:
            that.clearSelectData();
            break;
        }
      }, 1500);
    },
  },
  watch: {
    //选择的比赛场数数组
    selectDataList: function () {
      var that = this,
        len = that.selectDataList.length;
      if (len > 8) {
        len = 8;
      }
      that.bottomStyle();
      $(".goNext .method-wrap .method.active").removeClass('active');
      that.tzType_freeShow = [0, 0, 0, 0, 0, 0, 0, 0];
      that.tzType_free = [len];
      that.tzType_freeShow[len - 1];
    },
    //串数
    tzType_free: function () {
      var that = this,
        html = "",
        len1 = that.tzType_free.length;
      for (var i = 0; i < len1; i++) {
        if (i == 2) {
          html += "...";
          break
        }
        if (i != len1 - 1) {
          if (that.tzType_free[i] == 1) {
            html += "单关+";
          } else {
            html += that.tzType_free[i] + "串1+";
          }
        } else {
          if (that.tzType_free[i] == 1) {
            html += "单关";
          } else {
            html += that.tzType_free[i] + "串1";
          }
        }
      }
      that.tzType_free_html = html;
    },
    //倍数
    multiple: function () {
      var that = this,
        fixedmultipleStyle = parseInt($('.goNext .fixMultiple .active').html());
      //倍数校验
      if (isNaN(that.multiple) || that.multiple < 0 || that.multiple === "") {
        that.multiple = 1;
      } else if (that.multiple > 100000) {
        that.multiple = 100000;
      }
      //样式修正
      if (!isNaN(fixedmultipleStyle) && fixedmultipleStyle != that.multiple) {
        $('.goNext .fixMultiple .active').removeClass('active');
      }
      //奖金计算
      if (that.min.toFixed(3) != that.max.toFixed(3)) {
        that.totalNum = (that.min * 2 * that.multiple * that.odds_percent).toFixed(2) + '~' + (that.max * 2 * that.multiple * that.odds_percent).toFixed(2);
      } else {
        that.totalNum = (that.min * 2 * that.multiple * that.odds_percent).toFixed(2);
      }
    },
    playType: function () {
      var that = this;
      that.playTypeName = that.playTypeNameList[that.playType - 18];
    },
    //单位显示
    coinUnit: function () {
      var that = this;
      if (that.coin !== 0) {
        that.user_state = "钱包:" + that.coin + that.coinUnit + "(可用)";
      }
    },
    noDataListReturn: function () {
      if (this.noDataListReturn) {
        $("body").css({
          overflow: 'hidden'
        })
      } else {
        $("body").css({
          overflow: 'auto'
        })
      }
    },
    $route(to, from) {
      var _this = this;
      if (to.name == "fbsg") {
        if (this.noDataListReturn) {
          $("body").css({overflow: 'hidden'})
        }
        this.pullToRefresh.setNowThis(this);
        _this.startCountWorker();
          if(!localStorage.config){
              this.getSysConfig();
          }
      } else if (from.name == "fbsg") {
        $("body").css({overflow: 'auto'});
        window.clearInterval(_this.countTiming);
        _this.clearSelectData();
        if (!$("#showSelectContent").is(":hidden")){
          $(".goNext .close").trigger("click")
        }
      }
    }
	},
};


