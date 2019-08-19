//足彩开奖记录js文件
export default{
  // el: '#main',
  name:"jclq",
  data() {
    return {

    datas: [], //记录列表
    //match: '', //保存周几的数据
    //thisDay: '', //保存当前时间
    //week:'',    //星期几
    date: '',
    dateArr: [],
    //控制查询最近多少天的数据
    dateFlag: 7,
     }
  },
  created: function () {
    this.pullToRefresh.setNowThis(this);
  },
  mounted: function () {
    this.initDate();
    this.initDom();
  },
  //利用ajax来查询记录列表
  methods: {
    //路由跳转返回
    routerBack: function () {
      if (localStorage.turnPathName && localStorage.turnPathName != "login") {
        // this.$router.push({ name: localStorage.turnPathName });
        this.$router.go(-1)
      } else {
        this.$router.push({ name: "index" });
      }

    },
    pulldownRefresh: function (_this) {
      _this.getdatas();
    },
    initDom:function(){
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
    },
    //获取开奖记录列表  playtypeid
    getdatas: function () {
      var _this = this;
      //求出昨天的时间
      _this.datas = [];
      var day1 = new Date();
      //day1.setTime(day1.getTime() - 24 * 60 * 60 * 1000);
      // var s1 = day1.getFullYear() + "-" + (day1.getMonth() + 1) + "-" + day1.getDate();
      // s1 = _this.getBeforeDays(s1, 1)
      // s1 = _this.getBeforeDays(s1, -1)
      //计算出当天是星期几
      // var arys1 = new Array();
      // arys1 = s1.split('-'); //日期为输入日期，格式为 2013-3-10
      // var ssdate = new Date(arys1[0], parseInt(arys1[1] - 1), arys1[2]);
      // _this.match = ssdate.getDay();
      // _this.thisDay = s1;
      var s1 = _this.date
      _this.date = s1;
      var data = {
        selectDate: s1,
        source: 2
      };
      var obj = {
        type: 'post',
        data: data,
        dataType: 'json',
        url: '/commonAPI/basketball/getBasketballResult',
        success: function (data) {
          //console.log(data);
          if (data.code == 200) {
            var newArray = [], str = [];

            /***By ZSM */

            var selectDay = [],
              afterOneDay = [],
              afterTwoDay = [],
              afterThreeDay = [],
              beforeOneTime = _this.getBeforeDays(s1, 1),
              afterOneTime = _this.getBeforeDays(s1, -1),
              selectTime = _this.getBeforeDays(afterOneTime, 1),
              afterTwoTime = _this.getBeforeDays(s1, -2),
              afterThreeTime = _this.getBeforeDays(s1, -3),
              selectDate = _this.getWeekDay(selectTime),
              afterOneDate = _this.getWeekDay(afterOneTime),
              afterTwoDate = _this.getWeekDay(afterTwoTime),
              afterThreeDate = _this.getWeekDay(afterThreeTime),
              beforeOneDate = _this.getWeekDay(beforeOneTime)
            //console.log(afterOneTime)
            //console.log(selectTime)
            //console.log(beforeOneTime);

            data.body.map(function (item, index) {
              // 如果比赛时间显示是查询的那一天
              item.letScore = item.letScoreArr.pop();
              //console.log(item.scoreDifferenceOdds)
              item.letScoreResult = item.letScoreResultArr ? item.letScoreResultArr.pop() == 'letscore_lose' ? '负' : '胜' : '-';
              if (item.winScoreResult){
                item.winScoreResult = item.winScoreResult ? item.winScoreResult.indexOf("lose") != -1 ? item.winScoreResult.replace("lose", "主负") : item.winScoreResult.replace("win", "主胜") : '-';
                item.winScoreResult = item.winScoreResult.replace("_", "-")
              }else{
                item.winScoreResult = "-"
              }

              item.bigSmallScoreResult = item.bigSmallScoreResultArr ? item.bigSmallScoreResultArr ? item.bigSmallScoreResultArr.pop() == 'big_score' ? '大分' : '小分' : '-' : '-';
              item.sessions = item.sessions ? item.sessions.substr(1) : '-'
              if (item.matchDate.substr(0, 10) == beforeOneTime) {
                if (_this.checkdate(item.matchDate.substr(11, 8))) {
                  item.gameDate = selectTime + selectDate
                  selectDay.push(item)
                }
              }
              if (item.matchDate.substr(0, 10) == selectTime) {
                // 判断比赛时间是12点之前还是12点之后
                if (_this.checkdate(item.matchDate.substr(11, 8))) {
                  // 就将比赛数据添加到前一天去
                  item.gameDate = afterOneTime + afterOneDate
                  afterOneDay.push(item);
                } else {
                  // 将比赛数据塞到今天的数组中
                  item.gameDate = selectTime + selectDate
                  selectDay.push(item)
                }
              }
              if (item.matchDate.substr(0, 10) == afterOneTime) {
                if (_this.checkdate(item.matchDate.substr(11, 8))) {
                  item.gameDate = afterTwoTime + afterTwoDate
                  afterTwoDay.push(item)
                } else {
                  item.gameDate = afterOneTime + afterOneDate
                  afterOneDay.push(item)
                }
              }
              if (item.matchDate.substr(0, 10) == afterTwoTime) {
                if (_this.checkdate(item.matchDate.substr(11, 8))) {
                  item.gameDate = afterThreeTime + afterThreeDate
                  afterThreeDay.push(item)
                } else {
                  item.gameDate = afterTwoTime + afterTwoDate
                  afterTwoDay.push(item)
                }
              }
              if (item.matchDate.substr(0, 10) == afterThreeTime) {
                if (!_this.checkdate(item.matchDate.substr(11, 8))) {
                  item.gameDate = afterThreeTime + afterThreeDate
                  afterThreeDay.push(item)
                }
              }
            })
            if (selectDay.length) {
              str.push(selectDay.sort(function (a, b) {
                return b.sessions - a.sessions;
              }));
            }
            if (afterOneDay.length) {
              str.push(afterOneDay.sort(function (a, b) {
                return b.sessions - a.sessions;
              }));
            }
            if (afterTwoDay.length) {
              str.push(afterTwoDay.sort(function (a, b) {
                return b.sessions - a.sessions;
              }));
            }
            if (afterThreeDay.length) {
              str.push(afterThreeDay.sort(function (a, b) {
                return b.sessions - a.sessions;
              }));
            }
            //console.log(str);
            _this.datas = str;
            $("#noMessage").hide();
            $("#showMessage").show();
          } else {
            $("#noMessage").show();
            $("#showMessage").hide();
          }
        },
        error: function (msg) {
          //console.log(msg);
        }
      };
      this.base.callCommonApi(obj);
    },

    gettimes: function () {
      var _this = this;
      //求出前十天的值
      var day1 = new Date();
      for (var i = 1; i <= 10; i++) {
        day1.setTime(day1.getTime() - 24 * 60 * 60 * 1000);
        var s1 = day1.getFullYear() + "-" + (day1.getMonth() + 1) + "-" + day1.getDate();
       this.$set(_this.times, i - 1, s1);
      }


    },

    //根据时间筛选当天的数据
    selectByRiQi: function (datetime) {
      //将点击过后的日期控件隐藏
      $(".date-list").hide();
      var _this = this;
      //计算出当天是星期几
      var arys1 = new Array();
      arys1 = datetime.split('-'); //日期为输入日期，格式为 2013-3-10
      var ssdate = new Date(arys1[0], parseInt(arys1[1] - 1), arys1[2]);
      _this.match = ssdate.getDay();
      _this.thisDay = datetime;

      var data = {
        oneTypeId: 1,
        selectDate: datetime
      };
      $.ajax({
        type: 'post',
        data: data,
        dataType: 'json',
        url: 'http://192.168.1.10:8080/ls/football/theLottery',
        success: function (data) {
          //console.log(data);
          _this.datas = data.body;
        },
        error: function (msg) {
          //console.log(msg);
        }
      });
    },
    //点击标题折叠所有场次
    fold: function (index) {
      $('#' + index).siblings().toggle();
      $('#' + index).toggleClass('aa');
      if ($('#' + index).hasClass('aa')) {
        $('#' + index + '>img').css('transform', 'rotate(180deg)');
      } else {
        $('#' + index + '>img').css('transform', 'rotate(0deg)');
      }
    },
    //点击选择之前期次
    odd_period: function () {
      var _this = this;
      _this.datas = [];
      var dd = _this.date;
      var data = {
        selectDate: _this.date,
        source: 2
      };
      var obj = {
        type: 'post',
        data: data,
        dataType: 'json',
        url: '/commonAPI/basketball/getBasketballResult',
        success: function (data) {
          if (data.code == 200) {
            var newArray = [], str = [];

            /***By ZSM */

            var selectDay = [],
              afterOneDay = [],
              afterTwoDay = [],
              afterThreeDay = [],
              beforeOneTime = _this.getBeforeDays(dd, 1),
            afterOneTime = _this.getBeforeDays(dd, -1),
              selectTime = _this.getBeforeDays(afterOneTime, 1),
              afterTwoTime = _this.getBeforeDays(dd, -2),
              afterThreeTime = _this.getBeforeDays(dd, -3),
              selectDate = _this.getWeekDay(selectTime),
              afterOneDate = _this.getWeekDay(afterOneTime),
              afterTwoDate = _this.getWeekDay(afterTwoTime),
              afterThreeDate = _this.getWeekDay(afterThreeTime),
              beforeOneDate = _this.getWeekDay(beforeOneTime)
            //console.log(afterOneTime)
            //console.log(selectTime)

            data.body.map(function (item, index) {
              // 如果比赛时间显示是查询的那一天
              item.letScore = item.letScoreArr.pop();
              if (item.winScoreResult){
                item.winScoreResult = item.winScoreResult.indexOf("lose") != -1 ? item.winScoreResult.replace("lose", "主负") : item.winScoreResult.replace("win", "主胜");
              }else{
                item.winScoreResult="-"
              }

              item.letScoreResult = item.letScoreResultArr ? item.letScoreResultArr.pop() == 'letscore_lose' ? '负' : '胜' : '-';
              item.bigSmallScoreResult = item.bigSmallScoreResultArr ? item.bigSmallScoreResultArr.pop() == 'big_score' ? '大分' : '小分' : '-';
              if (item.matchDate.substr(0, 10) == beforeOneTime) {
                if (_this.checkdate(item.matchDate.substr(11, 8))) {
                  item.gameDate = selectTime + selectDate
                  selectDay.push(item)
                }
              }
              if (item.matchDate.substr(0, 10) == selectTime) {
                // 判断比赛时间是12点之前还是12点之后
                if (_this.checkdate(item.matchDate.substr(11, 8))) {
                  // 就将比赛数据添加到前一天去
                  item.gameDate = afterOneTime + afterOneDate
                  afterOneDay.push(item);
                } else {
                  // 将比赛数据塞到今天的数组中
                  item.gameDate = selectTime + selectDate
                  selectDay.push(item)
                }
              }
              if (item.matchDate.substr(0, 10) == afterOneTime) {
                if (_this.checkdate(item.matchDate.substr(11, 8))) {
                  item.gameDate = afterTwoTime + afterTwoDate
                  afterTwoDay.push(item)
                } else {
                  item.gameDate = afterOneTime + afterOneDate
                  afterOneDay.push(item)
                }
              }
              if (item.matchDate.substr(0, 10) == afterTwoTime) {
                if (_this.checkdate(item.matchDate.substr(11, 8))) {
                  item.gameDate = afterThreeTime + afterThreeDate
                  afterThreeDay.push(item)
                } else {
                  item.gameDate = afterTwoTime + afterTwoDate
                  afterTwoDay.push(item)
                }
              }
              if (item.matchDate.substr(0, 10) == afterThreeTime) {
                if (!_this.checkdate(item.matchDate.substr(11, 8))) {
                  item.gameDate = afterThreeTime + afterThreeDate
                  afterThreeDay.push(item)
                }
              }
            })
            if (selectDay.length) {
              str.push(selectDay.sort(function (a, b) {
                return b.sessions - a.sessions;
              }));
            }
            if (afterOneDay.length) {
              str.push(afterOneDay.sort(function (a, b) {
                return b.sessions - a.sessions;
              }));
            }
            if (afterTwoDay.length) {
              str.push(afterTwoDay.sort(function (a, b) {
                return b.sessions - a.sessions;
              }));
            }
            if (afterThreeDay.length) {
              str.push(afterThreeDay.sort(function (a, b) {
                return b.sessions - a.sessions;
              }));
            }
            _this.datas = str;
            $("#noMessage").hide();
            $("#showMessage").show();
          } else {
            $("#noMessage").show();
            $("#showMessage").hide();
          }
        },
        error: function (msg) {
          //console.log(msg);
        }
      };
      this.base.callCommonApi(obj);

    },
    //根据name跳转路由
    turnRoute: function (routeName){
      this.$router.push({
        name:routeName
      })
    },
    //点击场次跳转
    skip: function (matchId) {
      //联赛名称，比赛日期，主队id，主队名称，客队id，客队名称，总比分
      if (matchId) {
        var _this=this;
        localStorage.basketMatchId=matchId;
        _this.turnRoute("basketDetail");
        // if (localStorage.app_flag == undefined) {

          // window.location.href = '../rx9/basket_detail.html';
        // } else {
        //   mui.openWindow({
        //     url: '../rx9/basket_detail.html',
        //     id: 'basket_detail',
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
      } else {
        mui.toast('暂无数据', { duration: 'long', type: 'div' })
      }
    },
    //点击跳转到竞彩篮球投注页面
    togojclq: function () {
      // if (localStorage.app_flag == undefined) {
        // window.location.href = '../quizzesBasket/qb_hh.html';
        this.turnRoute("qbhh");
      // } else {
      //   mui.openWindow({
      //     url: '../quizzesBasket/qb_hh.html',
      //     id: 'qb_hh',
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
    },
    // 用于将比赛的时间进行分类所属哪一天，今天中午12点到明天中午12点为今天的赛事12:00:00
    // 检测时间的先后顺序
    checkdate: function (time) {
      return time.replace(/\:/g, "") < 120000;
    },
    getBeforeDays: function (currDate, num) {  //num表示天数，接受正负数
      if (!num) {//做num简单验证
        return currDate;
      }
      num = Math.floor(num);
      var symbol = '/';
      if (currDate.indexOf('-') > -1) {
        symbol = '-';
        currDate = currDate.replace(/-/g, '/');
      } else if (currDate.indexOf('.') > -1) {
        symbol = '.';
        currDate = currDate.replace(/\./g, '/');
      }
      //symbol = '-'; //定制输出分隔符
      var myDate = new Date(currDate),
        lw = new Date(Number(myDate) + 1000 * 60 * 60 * 24 * num), //num天数
        lastY = lw.getFullYear(),
        lastM = lw.getMonth() + 1,
        lastD = lw.getDate(),
        startdate = lastY + symbol + (lastM < 10 ? "0" + lastM : lastM) + symbol + (lastD < 10 ? "0" + lastD : lastD);
      return startdate;
    },
    getWeekDay: function (date) {
      date = new Date(date);
      var week;
      if (date.getDay() == 0) week = "星期天"
      if (date.getDay() == 1) week = "星期一"
      if (date.getDay() == 2) week = "星期二"
      if (date.getDay() == 3) week = "星期三"
      if (date.getDay() == 4) week = "星期四"
      if (date.getDay() == 5) week = "星期五"
      if (date.getDay() == 6) week = "星期六"
      return week;
    },
    initDateTool: function () {
      var _this = this;
      var mobileSelect2 = new MobileSelect({
        trigger: '#selectDate',   //触发
        title: '请选择',     //标题
        wheels: [               //数据源
          { data: _this.dateArr }
        ],
        position: [], //初始化定位 打开时默认选中的哪个 如果不填默认为0
        transitionEnd: function (indexArr, data) {
          //console.log(data);
        },
        callback: function (indexArr, data) {
          _this.date = data[0];
          _this.odd_period();
        }
      });
    },
    // 初始化可查询的时间
    initDate: function () {
      var _this = this;
      // var lsDate=localStorage.getItem("BASKET_DATE")
      // for(var i=0;i<this.dateFlag;i++){
      //     _this.dateArr.push(_this.getBeforeDays(lsDate,-i))
      // }
      var obj = {
        type: 'post',
        url: '/commonAPI/basketball/getBasketballDate',
        data: {
          selectDate: _this.fun_date(0)
        },
        success: function (data) {
          //console.log(data);
          if (data.code == 200) {
            data.body.map(function (item) {
              _this.dateArr.push(item.substr(0, 10))
            })
            //console.log(_this.dateArr)
            _this.date = _this.dateArr[0]
            _this.initDateTool();
            _this.getdatas();
          }
        }
      }
      this.base.callCommonApi(obj);
    },
    //获取几天前的日期为某一天
    fun_date: function (day) {
      var date1 = new Date(),
        time1 = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate();//time1表示当前时间
      var date2 = new Date(date1);
      date2.setDate(date1.getDate() + day);
      var time2 = date2.getFullYear() + "-" + (date2.getMonth() >= 10 ? date2.getMonth() + 1 : '0' + (date2.getMonth() + 1)) + "-" + (date2.getDate() >= 10 ? date2.getDate() : '0' + date2.getDate());
      return time2;
    },
  },
  watch: {
    $route(to, from) {
      if (to.name == "jclq") {
        this.pullToRefresh.setNowThis(this);
      }
    }
  }
};
//if (localStorage.app_flag != undefined) {
//  //mui.init({
//      pullRefresh: {
//          container: '#pullrefresh',		//下拉容器
//          down: {
//              style: 'circle',				//下拉刷新样式
//              callback: pulldownRefresh	//刷新后执行的函数
//          }
//      }
//  })
//  function pulldownRefresh() {
//      setTimeout(function () {
//          app.getdatas();
//          mui('#pullrefresh').pullRefresh().endPulldown();
//          //mui.toast("刷新成功");
//      }, 1500);
//  }
//}
