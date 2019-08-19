/**
 * Created by ASUS on 2017/9/30.
 */
export default{
  // el: '#main',
  name:"zqdc",
  data(){
    return {
    datas: [],               //列表数据
    bannerNumber: '',        //场次编号
    selDate: '',
    period: [],              //存放期次的数组
    dateArr: [],
    noData: false,
    isFirstLoad: true,
    dateTool: null,           //日期插件指针
    dataOnload: false
    }
  },
  created: function () {
    this.$nextTick(function () {
      // this.getperiod(this.getdatas);
      this.getperiod(this.getBannerDate);
    })
    this.pullToRefresh.setNowThis(this);
  },
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
    //获取数据
    getdatas: function () {
      var _this = this;
      var data = {
        oneTypeId: 3,
        bannerNumber: this.bannerNumber,
        shaiDate: this.selDate
      };
      _this.datas = [];
      var obj = {
        type: 'post',
        data: data,
        dataType: 'json',
        url: '/commonAPI/football/queryOpenRewardForDC',
        success: function (data) {
          _this.dataOnload = true;
          if (data.code == 200) {
            var newArray = [], str = [];

            // 先便利返回的数据看返回的数据中有那些日期的比赛

            var dateArr = [];
            data.body.map(function (item) {
              if (item.matchDate) {
                if (!dateArr.some(function (items) {
                  return items == item.matchDate.substr(0, 10);
                })) {
                  dateArr.push(item.matchDate.substr(0, 10));
                }
              }
            })
            dateArr.unshift(_this.getBeforeDays(dateArr[0], 1));
            dateArr.push(_this.getBeforeDays(dateArr[dateArr.length - 1], - 1))
            var tempArr = [];
            dateArr.map(function (item) {
              if (tempArr.indexOf(item) == -1) {
                tempArr.push(item);
              }
            })
            dateArr = tempArr;
            // //console.log(dateArr)
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
                      // items.totalOdds = items[items.total_goal_result].toFixed(2);
                      // //console.log(items.totalOdds);
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
            //console.log(_this.datas);
            $("#noMessage").hide();
            $("#pullrefresh").show();
          } else {
            _this.datas = [];
            $("#noMessage").show();
            $("#pullrefresh").hide();
          }
        },
        error: function (msg) {
          _this.dataOnload = true;
          _this.noData = true;
          //console.log(msg);
        }
      };
      this.base.callCommonApi(obj);
    },
    //查询期号
    getperiod: function (callback) {
      var _this = this;
      if (localStorage.getItem("dcQiArr")) {
        _this.period = JSON.parse(localStorage.getItem("dcQiArr"));
        //console.log(_this.period)
        _this.bannerNumber = _this.period[0];
      } else {
      _this.dateArr = 0;
        _this.noData = true;
        _this.dataOnload = true;
        return
      }
      if (callback) {
        callback();
      }
    },
    //点击选择弹出
    get: function () {
      var _this = this;
      //console.log("期次选择")
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
          _this.bannerNumber = data[0];
          _this.getBannerDate();
        }
      });
    },
    initDateTool: function () {
      var _this = this;
      var mobileSelect2 = new MobileSelect({
        trigger: '#trigger2',   //触发
        title: '请选择',     //标题
        wheels: [               //数据源
          { data: _this.dateArr }
        ],
        position: [], //初始化定位 打开时默认选中的哪个 如果不填默认为0
        transitionEnd: function (indexArr, data) {
          //console.log(data);
        },
        callback: function (indexArr, data) {
          _this.selDate = data[0];
          _this.getdatas();
        }
      });
    },
    //点击选择之前期次确定按钮执行
    // get1: function () {
    //     var _this = this;
    //     var data1 = {
    //         oneTypeId: 3,
    //         bannerNumber: this.bannerNumber,
    //         shaiDate:this.selDate
    //     };
    //     var obj = {
    //         type: 'post',
    //         data: data1,
    //         dataType: 'json',
    //         url: '/commonAPI/football/queryOpenRewardForDC',
    //         success: function (data) {
    //             //console.log(data);
    //             if (data.code == 200) {
    //                 var newArray = [], str = [];

    //                 /***By ZSM */
    //                 // 先便利返回的数据看返回的数据中有那些日期的比赛

    //                 var dateArr = [];
    //                 data.body.map(function (item) {
    //                     if(item.matchDate){
    //                         if (!dateArr.some(function (items) {
    //                             return items == item.matchDate.substr(0, 10)
    //                         })) {
    //                             dateArr.push(item.matchDate.substr(0, 10));
    //                         }
    //                     }
    //                 })
    //                 dateArr.unshift(_this.getBeforeDays(dateArr[0], 1));
    //                 dateArr.push(_this.getBeforeDays(dateArr[dateArr.length - 1],- 1))
    //                 // 然后便利时间数组，每一次都循环整个返回的数据列表，判断该场比赛是否属于当前日期的比赛
    //                 dateArr.map(function (item) {
    //                     // 存储属于今日的比赛，目前遍历的这一天，当前遍历日期的前一天
    //                     var tempArr = [],
    //                         presentDay = item,
    //                         beforeDay = _this.getBeforeDays(item, 1);
    //                     data.body.map(function (items) {
    //                         //某一日的比赛数据为今日10点以后到明日10点以前
    //                         if(items.matchDate){
    //                             if (items.matchDate.substr(0, 10) == presentDay) {
    //                                 if (!_this.checkdate(items.matchDate.substr(11, 8))) {
    //                                     items.gameDate = presentDay;
    //                                     tempArr.push(items);
    //                                 }
    //                             } else if (items.matchDate.substr(0, 10) == beforeDay) {
    //                                 if (_this.checkdate(items.matchDate.substr(11, 8))) {
    //                                     items.gameDate = presentDay;
    //                                     tempArr.push(items);
    //                                 }
    //                             }
    //                         }
    //                     })
    //                     if (tempArr.length) {
    //                         tempArr.sort(function (a, b) {
    //                             return b.sessions - a.sessions;
    //                         });
    //                         str.push(tempArr.map(function (item) {
    //                             return item;
    //                         }));
    //                     }
    //                 })
    //                 _this.datas = str;
    //             	$("#noMessage").hide();
    //                 $("#pullrefresh").show();
    //             } else {
    //                 _this.datas = [];
    //                 $("#noMessage").show();
    //                 $("#pullrefresh").hide();
    //             }
    //         },
    //         error: function (msg) {
    //             //console.log(msg);
    //         }
    //     };
    //     this.base.callCommonApi(obj);
    // },
    //点击展开多少场比赛
    fold: function (index) {
      $('#' + index).siblings().toggle();
      $('#' + index).toggleClass('aa');
      if ($('#' + index).hasClass('aa')) {
        $('#' + index + '>i').css('transform', 'rotate(-135deg)');
      } else {
        $('#' + index + '>i').css('transform', 'rotate(45deg)');
      }
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
      localStorage.obj = obj;
      //          if (courtScore) {
      //              localStorage.setItem("footScore", courtScore);
      //              localStorage.setItem("footHome", homeName);
      //              localStorage.setItem("footAway", awayName);
      //              localStorage.setItem("courtScore", courtScore);
      //          }
      if (eventId) {
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
      // //console.log(currDate);
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
    //点击跳转到足球单场投注页面
    togozqdc: function () {
      this.turnRoute("fbsg");
      // if (localStorage.app_flag == undefined) {
      //   window.location.href = '../footbalSingle/footbalSingle.html';
      // } else {
      //   mui.openWindow({
      //     url: '../footbalSingle/footbalSingle.html',
      //     id: 'footbalSingle',
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
    // 获取期次下的日期数据
    getBannerDate: function () {
      var _this = this;
      _this.dateArr = [];
      _this.datas = [];
      _this.selDate = "";
      var obj = {
        type: 'post',
        url: '/commonAPI/football/getDateByBannerNumber',
        data: {
          oneTypeId: 3,
          bannerNumber: _this.bannerNumber,
        },
        success: function (data) {
          //console.log(data);
          if (data.code == 200 && data.body && data.body.length) {
            data.body.map(function (item) {
              //console.log(item)
              _this.dateArr.push(item.substr(0, 10))
            })
            _this.dateArr.reverse();
            _this.selDate = _this.dateArr[0];
            //粗暴的移除DOM重新创建一个新的
            $(".mobileSelect").remove();
            _this.get();
            _this.initDateTool();
            _this.getdatas();
            _this.noData = false;
          } else {
            _this.bannerNumber="";
            _this.dateArr = 0;
            _this.noData = true;
            _this.dataOnload = true;
          }
        },
        error: function (res) {
          //console.log(res);
          _this.noData = true;
          _this.dataOnload = true;
        }
      }
      this.base.callCommonApi(obj);
    }
  },
  watch: {
    $route(to, from) {
      if (to.name == "zqdc") {
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
//			mui('#pullrefresh').pullRefresh().endPulldown();
//			//mui.toast("刷新成功");
//		}, 1500);
//	}
//}
