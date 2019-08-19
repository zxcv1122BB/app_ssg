//足彩开奖记录js文件
export default{
  // el: '#main',
  name:"jczq",
  data(){
    return{
    datas: [], //记录列表
    // 存储日期
    period: [],
    // 当前选择日期
    selDate: '',
    }
  },
  created: function () {
    this.$nextTick(function () {
      this.initDateArr();
    })
    this.pullToRefresh.setNowThis(this);
  },
  mounted: function () {
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
      var day1 = new Date();
      //day1.setTime(day1.getTime() - 24 * 60 * 60 * 1000);
      var s1 = day1.getFullYear() + "-" + (day1.getMonth() + 1) + "-" + day1.getDate();
      s1 = _this.fun_date(-1);
      _this.selDate = s1
      var data = {
        oneTypeId: 1,
        shaiDate: s1,
        source: 2
      };
      var obj = {
        type: 'post',
        data: data,
        dataType: 'json',
        url: '/commonAPI/football/theLottery',
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
              afterTwoDate = _this.getWeekDay(afterTwoTime)
            afterThreeDate = _this.getWeekDay(afterThreeTime)

            //console.log(beforeOneTime)
            data.body.map(function (item, index) {
              // 如果比赛时间显示是查询的那一天
              if (item.matchDate.substr == beforeOneTime) {
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
                if (_this.checkdate(item.matchDate.substr(11, 8))) {

                } else {
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
            $("#pullrefresh").show();
          } else {
            $("#noMessage").show();
            $("#pullrefresh").hide();
          }
        },
        error: function (msg) {
          //console.log(msg);
        }
      };
      this.base.callCommonApi(obj);
    },

    //点击标题折叠所有场次
    fold: function (index) {
      $('#' + index).siblings().toggle();
      $('#' + index).toggleClass('aa');
      if ($('#' + index).hasClass('aa')) {
        $('#' + index + '>i').css('transform', 'rotate(-135deg)');
      } else {
        $('#' + index + '>i').css('transform', 'rotate(45deg)');
      }
    },
    //点击选择之前期次
    odd_period: function () {
      // var dd = $('#input3').val();
      var dd = this.selDate;
      //console.log(dd);
      var data = {
        oneTypeId: 1,
        shaiDate: dd,
        source: 2
      };
      //console.log(data)
      var _this = this;
      var obj = {
        type: 'post',
        data: data,
        dataType: 'json',
        url: '/commonAPI/football/theLottery',
        success: function (data) {
          //console.log(data);
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
              afterThreeDate = _this.getWeekDay(afterThreeTime);
              // //console.log(beforeOneTime)
            data.body.map(function (item, index) {
              // 如果比赛时间显示是查询的那一天
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
                if (_this.checkdate(item.matchDate.substr(11, 8))) {

                } else {
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
            $("#pullrefresh").show();
          } else {
            _this.datas = [];
            $("#noMessage").show();
            $("#pullrefresh").hide();
          }
        },
        error: function (msg) {
          //console.log(msg);
        }
      };
      this.base.callCommonApi(obj);
    },
    //根据name跳转路由
    turnRoute: function (routeName) {
      this.$router.push({
        name: routeName
      })
    },
    //点击场次跳转
    skip: function (leagueName, matchDate, shifen, homeId, homeName, awayId, awayName, courtScore, eventId) {
      //联赛名称，比赛日期，比赛时间，主队id，主队名称，客队id，客队名称，总比分
      var obj = {
        leagueName: leagueName,
        matchDate: matchDate,
        shifen: shifen,
        homeId: homeId,
        homeName: homeName,
        awayId: awayId,
        awayName: awayName,
        courtScore: courtScore
      };
      //          //console.log(courtScore + homeName+awayName)
      //          if (courtScore) {
      //              localStorage.setItem("courtScore", courtScore)
      //          }
      localStorage.obj = obj;
      if (eventId) {
        //              localStorage.setItem("footScore", courtScore);
        //              localStorage.setItem("footHome", homeName);
        //              localStorage.setItem("footAway", awayName);
        //              localStorage.setItem("eventId", eventId);
        var dataset = {
          id: eventId,
          away: awayName,
          awayId: awayId,
          home: homeName,
          homeId: homeId,
          courtScore: courtScore
        }
        localStorage.setItem("datasetList", JSON.stringify(dataset));
        this.turnRoute("detail");
        // if (localStorage.app_flag == undefined) {
          // window.location.href = '../rx9/detail.html';
          // this.turnRoute("detail");
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
        //window.location.href = '../rx9/detail.html';
      } else {
        mui.toast('暂无数据', { duration: 'long', type: 'div' })
      }
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
    //点击跳转到竞彩足球投注页面
    togozczq: function () {
       this.turnRoute("qfhh");
      // if (localStorage.app_flag == undefined) {
        // window.location.href = '../quizzesFootbal/qf_hh.html';

      // } else {
      //   mui.openWindow({
      //     url: '../quizzesFootbal/qf_hh.html',
      //     id: 'qfhh',
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

    // 页面改动相关JS
    //点击选择弹出,初始化数据
    get: function () {
      var _this = this;
      var mobileSelect1 = new MobileSelect({
        trigger: '#trigger1',   //触发
        title: '请选择期次',     //标题
        wheels: [               //数据源
          { data: _this.period }
        ],
        position: [], //初始化定位 打开时默认选中的哪个 如果不填默认为0
        transitionEnd: function (indexArr, data) {
          //console.log(data);
        },
        callback: function (indexArr, data) {
          _this.selDate = data[0];
          //console.log(data);
          _this.datas = [];
          _this.odd_period()
        }
      });
    },
    //点击选择之前期次确定按钮执行
    get1: function () {
      var _this = this;
      var data1 = {
        oneTypeId: 3,
        bannerNumber: this.bannerNumber
      };
      var obj = {
        type: 'post',
        data: data1,
        dataType: 'json',
        url: '/commonAPI/football/queryOpenRewardForDC',
        success: function (data) {
          //console.log(data);
          if (data.code == 200) {
            var newArray = [], str = [];

            /***By ZSM */
            // 先便利返回的数据看返回的数据中有那些日期的比赛

            var dateArr = [];
            data.body.map(function (item) {
              if (item.matchDate) {
                if (!dateArr.some(function (items) {
                  return items == item.matchDate.substr(0, 10)
                })) {
                  dateArr.push(item.matchDate.substr(0, 10));
                }
              }
            })
            dateArr.unshift(_this.getBeforeDays(dateArr[0], 1));
            dateArr.push(_this.getBeforeDays(dateArr[dateArr.length - 1], - 1))
            // 然后便利时间数组，每一次都循环整个返回的数据列表，判断该场比赛是否属于当前日期的比赛
            dateArr.map(function (item) {
              // 存储属于今日的比赛，目前遍历的这一天，当前遍历日期的前一天
              var tempArr = [],
                presentDay = item,
                beforeDay = _this.getBeforeDays(item, 1);
              data.body.map(function (items) {
                //某一日的比赛数据为今日10点以后到明日10点以前
                if (items.matchDate) {
                  if (items.matchDate.substr(0, 10) == presentDay) {
                    if (!_this.checkdate(items.matchDate.substr(11, 8))) {
                      items.gameDate = presentDay;
                      tempArr.push(items);
                    }
                  } else if (items.matchDate.substr(0, 10) == beforeDay) {
                    if (_this.checkdate(items.matchDate.substr(11, 8))) {
                      items.gameDate = presentDay;
                      tempArr.push(items);
                    }
                  }
                }
              })
              if (tempArr.length) {
                tempArr.sort(function (a, b) {
                  return b.sessions - a.sessions;
                });
                str.push(tempArr.map(function (item) {
                  return item;
                }));
              }
            })
            _this.datas = str;
            $("#noMessage").hide();
            $("#pullrefresh").show();
          } else {
            _this.datas = [];
            $("#noMessage").show();
            $("#pullrefresh").hide();
          }
        },
        error: function (msg) {
          //console.log(msg);
        }
      };
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
    // 初始化时间
    initDateArr: function () {
      var _this = this;
      var lsDate = localStorage.getItem("FOOT_DATE")

      // var today=this.fun_date(0)
      // for(var i =0 ;i<7;i++){
      //     _this.period.push(_this.getBeforeDays(lsDate,-i))
      // }

      var obj = {
        type: 'post',
        url: '/commonAPI/football/getLotteryDate',
        data: {
          selectDate: _this.fun_date(0),
          oneTypeId: 1
        },
        success: function (data) {
          //console.log(data);
          if (data.code == 200) {
            data.body.map(function (item) {
              _this.period.push(item.substr(0, 10))
            })
            //console.log(_this.period)
            _this.selDate = _this.period[0];
            _this.odd_period()
            _this.get();
          }
        }
      }
      this.base.callCommonApi(obj);
      // _this.selDate=_this.period[0];
      // _this.odd_period()
      // _this.get();
    }
  },
  watch: {
    $route(to, from) {
      if (to.name == "jczq") {
        this.pullToRefresh.setNowThis(this);
      }
    }
  }
};

//if(localStorage.app_flag!=undefined){
//	//mui.init({
//		pullRefresh: {
//			container: '#pullrefresh',		//下拉容器
//			down: {
//				style:'circle',				//下拉刷新样式
//				callback: pulldownRefresh	//刷新后执行的函数
//			}
//		}
//	})
//	function pulldownRefresh() {
//		setTimeout(function() {
//			app.getdatas();
//          mui('#pullrefresh').pullRefresh().endPulldown();
//			// mui.toast("刷新成功");
//		}, 1500);
//	}
//}

// $("#trigger1").on("click",function () {
//     $(".mobileSelect").addClass("mobileSelect-show");
// })
