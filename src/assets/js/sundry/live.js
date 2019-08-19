/**
 * Created by ASUS on 2017/10/10.
 */
export default{
  // el: '#main',
  name:"live",
  data(){
   return {
    datas: [], //列表数据
    league: [], //联赛筛选
    count: '', //绑定有多少场比赛

    state: 1, //状态默认为1：未结束。0：已结束
    param: '', //获取数据要传的日期参数或足球单场期号或胜负彩期次
    oneTypeId: 1, //获取数据要传的玩法参数，默认为1：竞彩足球。3：足球单场。     1级的是2：胜负彩，3级的是14

    wanfa: '竞彩足球', //显示选择的玩法

    today: '', //显示选择的日期
    day: '', //当天日期
    day1: '', //前1天日期
    day2: '', //前2天日期
    day3: '', //前3天日期
    day4: '', //前4天日期

    qihao: [], //足球单场期号数组
    qici: [], //胜负彩期号数组

    select_league: [], //提交所选择的进行筛选
    odd_league: [], //记录所有的联赛id

    //赛事筛选
    allMatchNameList: [], //储存所有联赛名
    allMatchIdList: [], //联赛相对应的比赛Id
    allMatchIndexList: [], //存储选择了的联赛下标
    league_num: 0, //选择的比赛数量
    selBasket: false,//用于标记当前查询的是篮球的比赛数据
    loadding: true,//数据是否处于加载状态中

    //现在的日期时间
    nowDateTime:"",
     month:"",
     weekList:[],
     dayList:[],
     selectDateIndex:7,
     isShowTimeArea:false,
   }
  },
  created: function () {
    this.$nextTick(function () {
      this.gettoday(); //获取5天日期
      this.getdatas(); //获取列表数据
      this.getqihao(); //获取足球单场期号
      this.getqici(); //获取胜负彩期次
      //this.getleague();   //获取联赛列表

    });
    this.pullToRefresh.setNowThis(this);
  },
  mounted:function(){
    this.initDom();
    this.countDateTime(new Date());
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
    getzf: function (num) {
      if (parseInt(num) < 10) {
        num = '0' + num;
      }
      return num;
    },
    countDateTime: function (dateTime){
      var _this=this,
          weekList = ["日", "一", "二", "三", "四", "五", "六"],
          index = dateTime.getDay();
      if (_this.selectDateIndex==7){
        _this.nowDateTime = "今日 周" + weekList[index];
        if (_this.weekList.length!=0){
          return
        }
        _this.month = (dateTime.getMonth() + 1) + "月";
        weekList.map(function (item, indexs) {
          if (index <= indexs) {
            _this.weekList.push(item)
          }
        })
        weekList.map(function (item, indexs) {
          if (index > indexs) {
            _this.weekList.push(item)
          }
        })
      }else{
        _this.nowDateTime = _this.getzf(dateTime.getMonth()+1) + "-" + _this.getzf(dateTime.getDate()) +" 周" + weekList[index];
      }



      this.getDateTime();

      // //console.log(_this.weekList)
    },
    getDateTime(){
      var date ="",list=[7,6,5,4,3,2,1,0,-1],weekList=[],_this=this;
      _this.dayList=[];
      list.map(function(item){
        date = new Date();
        date.setTime(date.getTime() - 24 * 60 * 60 * 1000 * item);
        if(item==0){
          _this.dayList.push("今")
        }else{
          _this.dayList.push(date.getDate() < 10 ? "0"+date.getDate(): date.getDate());
        }
      })
      // =weekList;
      // //console.log(weekList);
    },
    showTimeArea(){
      this.isShowTimeArea=true;
      var _this=this;
      setTimeout(function () {
        if (_this.oneTypeId==3){
          $(".alert-datetime").animate({
            width: "245%"
          }).animate({
            height: "12rem"
          })
        }else{
          $(".alert-datetime").animate({
            width: "140%"
          }).animate({
            height: "12rem"
          })
        }

      },50)
    },
    hideTimeArea(){
      var _this=this;
      $(".alert-datetime").animate({
        height: "2rem"
      }).animate({
        width: "100%"
      })
      setTimeout(function(){
        _this.isShowTimeArea = false;
      },1000)

    },
    selectDate:function(index,num){
      var list = [7, 6, 5, 4, 3, 2, 1, 0, -1];
      var date = new Date();

      if(num==0){
        date.setTime(date.getTime() - 24 * 60 * 60 * 1000 * list[index]);
        this.hideTimeArea();
        this.selectDateIndex = index;
      }else{
        if ((this.selectDateIndex + index) >= 9 || (this.selectDateIndex + index) <=-1){
          return
        }
        date.setTime(date.getTime() - 24 * 60 * 60 * 1000 * list[this.selectDateIndex+index]);
        this.selectDateIndex = this.selectDateIndex + index;
      }

      var m = date.getMonth() + 1;
      if (m < 10) m = '0' + m;
      var d = date.getDate();
      if (d < 10) d = '0' + d;
      this.day = date.getFullYear() + '-' + m + '-' + d;

      this.param = this.day;
      this.today = this.day;
      this.getdatas();

      this.countDateTime(date)

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
      //     _this.allMatchNameList = [];
      //     _this.allMatchIdList = [];
      //     _this.allMatchIndexList = [];
      //     setTimeout(function () {
      //       _this.getdatas();
      //       mui('#pullrefresh').pullRefresh().endPulldown();
      //       //mui.toast("刷新成功");
      //     }, 1500);
      //   }
      // }
    },
    //获取当天日期
    gettoday: function () {
      var date = new Date();
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      if (m < 10) m = '0' + m;
      var d = date.getDate();
      if (d < 10) d = '0' + d;
      this.day = y + '-' + m + '-' + d;
      this.today = this.day;
      this.param = this.day;
      //console.log(this.today);
      // 前1天:
      var date1 = new Date();
      date1.setTime(date1.getTime() - 24 * 60 * 60 * 1000);
      var m1 = date1.getMonth() + 1;
      if (m1 < 10) m1 = '0' + m1;
      var d1 = date1.getDate();
      if (d1 < 10) d1 = '0' + d1;
      this.day1 = date1.getFullYear() + '-' + m1 + '-' + d1;
      // 前2天:
      var date2 = new Date();
      date2.setTime(date2.getTime() - 24 * 60 * 60 * 1000 * 2);
      var m2 = date2.getMonth() + 1;
      if (m2 < 10) m2 = '0' + m2;
      var d2 = date2.getDate();
      if (d2 < 10) d2 = '0' + d2;
      this.day2 = date2.getFullYear() + '-' + m2 + '-' + d2;
      // 前3天:
      var date3 = new Date();
      date3.setTime(date3.getTime() - 24 * 60 * 60 * 1000 * 3);
      var m3 = date3.getMonth() + 1;
      if (m3 < 10) m3 = '0' + m3;
      var d3 = date3.getDate();
      if (d3 < 10) d3 = '0' + d3;
      this.day3 = date3.getFullYear() + '-' + m3 + '-' + d3;
      // 前4天:
      var date4 = new Date();
      date4.setTime(date4.getTime() - 24 * 60 * 60 * 1000 * 4);
      var m4 = date4.getMonth() + 1;
      if (m4 < 10) m4 = '0' + m4;
      var d4 = date4.getDate();
      if (d4 < 10) d4 = '0' + d4;
      this.day4 = date4.getFullYear() + '-' + m4 + '-' + d4;
    },
    //获得时间---毫秒数
    getMilliseconds: function (str) {
      str = str.substring(0, str.length - 2).replace(new RegExp("-", "gm"), "/");
      return new Date(str).getTime(); //得到毫秒数
    },
    //获取比赛信息
    getdatas: function () {
      var _this = this;
      _this.datas = [];
      _this.loadding = true;
      var data = {
        oneTypeId: this.oneTypeId,
        param: this.param,
        state: this.state,
        source: 2
      };
      var urlPath = '';
      if (this.oneTypeId == 4) {
        data = {
          selectDate: this.getBeforeDays(this.param, -1),
          source: 2,
          matchStatus: this.state
        }
        urlPath = '/commonAPI/basketballZB/getBasketLiveScore';
        _this.selBasket = true;
      } else {
        _this.selBasket = false;
        urlPath = '/commonAPI/scoreZB/selectByMatchInfo';
      }
      var obj = {
        type: 'post',
        data: data,
        dataType: 'json',
        url: urlPath,
        success: function (data) {
          //console.log(data);
          _this.loadding = false;
          if (data.code == 200) {
            if (data.body.length != 0) {
              _this.count = data.body.length;
            }
            var newArray = [], str = [];

            /***By ZSM */
            if (_this.oneTypeId == 1) {
              var selectDay = [],
                afterOneDay = [],
                afterTwoDay = [],
                afterThreeDay = [],
                beforeOneTime = _this.getBeforeDays(_this.param, 1),
                afterOneTime = _this.getBeforeDays(_this.param, -1),
                selectTime = _this.getBeforeDays(afterOneTime, 1),
                afterTwoTime = _this.getBeforeDays(_this.param, -2),
                afterThreeTime = _this.getBeforeDays(_this.param, -3),
                selectDate = _this.getWeekDay(selectTime),
                beforeOneDate = _this.getWeekDay(beforeOneTime),
                afterOneDate = _this.getWeekDay(afterOneTime),
                afterTwoDate = _this.getWeekDay(afterTwoTime),
              afterThreeDate = _this.getWeekDay(afterThreeTime)
              data.body.map(function (item, index) {
                //console.log(item.match_date)
                if (item.match_date) {
                  if (item.match_date.substr(0, 10) == beforeOneTime) {
                    // 判断比赛时间是12点之前还是12点之后
                    if (_this.checkdate(item.match_date.substr(11, 8))) {
                      // 就将比赛数据添加到前一天去
                      item.gameDate = selectTime + selectDate
                      selectDay.push(item);
                    }
                  }
                  // 如果比赛时间显示是查询的那一天
                  if (item.match_date.substr(0, 10) == selectTime) {
                    // 判断比赛时间是12点之前还是12点之后
                    if (_this.checkdate(item.match_date.substr(11, 8))) {
                      // 就将比赛数据添加到前一天去
                      item.gameDate = afterOneTime + afterOneDate
                      afterOneDay.push(item);
                    } else {
                      // 将比赛数据塞到今天的数组中
                      item.gameDate = selectTime + selectDate
                      selectDay.push(item)
                    }
                  }
                  if (item.match_date.substr(0, 10) == afterOneTime) {
                    if (_this.checkdate(item.match_date.substr(11, 8))) {
                      item.gameDate = afterTwoTime + afterTwoDate
                      afterTwoDay.push(item)
                    } else {
                      item.gameDate = afterOneTime + afterOneDate
                      afterOneDay.push(item)
                    }
                  }
                  if (item.match_date.substr(0, 10) == afterTwoTime) {
                    if (_this.checkdate(item.match_date.substr(11, 8))) {
                      item.gameDate = afterThreeTime + afterThreeDate
                      afterThreeDay.push(item)
                    } else {
                      item.gameDate = afterTwoTime + afterTwoDate
                      afterTwoDay.push(item)
                    }
                  }
                  if (item.match_date.substr(0, 10) == afterThreeTime) {
                    if (_this.checkdate(item.match_date.substr(11, 8))) {

                    } else {
                      item.gameDate = afterThreeTime + afterThreeDate
                      afterThreeDay.push(item)
                    }
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

            } else if (_this.oneTypeId == 3) {
              var dateArr = [];
              data.body.map(function (item) {
                if (item.match_date) {
                  if (!dateArr.some(function (items) {
                    return items == item.match_date.substr(0, 10)
                  })) {
                    dateArr.push(item.match_date.substr(0, 10));
                  }
                }
              })
              if (dateArr.length) {
                dateArr.push(_this.getBeforeDays(dateArr[dateArr.length - 1], 1));
                dateArr.unshift(_this.getBeforeDays(dateArr[0], -1));
              }
              //console.log(dateArr);
              // 然后便利时间数组，每一次都循环整个返回的数据列表，判断该场比赛是否属于当前日期的比赛
              dateArr.map(function (item) {
                // 存储属于今日的比赛，目前遍历的这一天，当前遍历日期的前一天
                var tempArr = [],
                  presentDay = item,
                  beforeDay = _this.getBeforeDays(item, 1);
                data.body.map(function (items) {
                  //某一日的比赛数据为今日10点以后到明日10点以前
                  if (items.match_date) {
                    switch (items.court_score) {
                      case 'win_other':
                        items.court_score = '胜其他'
                        break;
                      case 'draw_other':
                        items.court_score = '平其他'
                        break;
                      case 'lose_other':
                        items.court_score = '负其他'
                        break;

                      default:
                        break;
                    }
                    if (items.match_date.substr(0, 10) == presentDay) {
                      if (!_this.checkdate(items.match_date.substr(11, 8))) {
                        items.gameDate = presentDay + _this.getWeekDay(presentDay);
                        tempArr.push(items);
                      }
                    } else if (items.match_date.substr(0, 10) == beforeDay) {
                      if (_this.checkdate(items.match_date.substr(11, 8))) {
                        items.gameDate = presentDay + _this.getWeekDay(presentDay);
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
            } else {
              data.body.sort(function (a, b) {
                var date1 = _this.getMilliseconds(a.match_date),
                  date2 = _this.getMilliseconds(b.match_date);
                return date1 - date2;
              });
              for (var i = 0; i < data.body.length; i++) {
                //console.log(_this.selBasket);
                if (_this.selBasket) {
                  data.body[i].sessions = data.body[i].sessions ? data.body[i].sessions.substr(1) : '-';
                }
                for (var j = 0; j < newArray.length; j++) {
                  if (j == newArray.length - 1 && newArray[j] != data.body[i].match_date.substr(0, 10)) {
                    newArray.push(data.body[i].match_date.substr(0, 10));
                    var list = [];
                    list.push(data.body[i]);
                    str.push(list);
                    break;
                  } else if (newArray[j] == data.body[i].match_date.substr(0, 10)) {
                    var list = str[j];
                    list.push(data.body[i]);
                    str[j] = list;
                    break;
                  }
                }
                if (newArray.length == 0) {
                  newArray.push(data.body[0].match_date.substr(0, 10));
                  var list = [];
                  list.push(data.body[i]);
                  str.push(list);
                }
              }
              for (var i = 0; i < str.length; i++) {
                //场次排序
                str[i].sort(function (a, b) {
                  return a.sessions - b.sessions;
                });
              }
            }
            // //console.log(str);
            _this.datas = str;
            _this.league_num=0;
            $('.competition-option li').addClass('active');
            _this.allMatchNameList = [];
            _this.allMatchIdList = [];
            _this.allMatchIndexList = [];
            for (var i = 0; i < str.length; i++) {
              _this.cumsum += str[i].length;
              for (var j = 0; j < str[i].length; j++) {
                _this.getAllMatchName(str[i][j]);
              }
            }
            for (var i = 0; i < _this.allMatchNameList.length; i++) {
              _this.allMatchIndexList.push(i);
            }
            for (var i = 0, len = _this.allMatchIdList.length; i < len; i++) {
              _this.league_num += _this.allMatchIdList[i].length;
            }
            //console.log(_this.allMatchIdList);
            _this.datas = str;
            _this.getleague();
          }
        },
        error: function (msg) {
          _this.loadding = false;
          //console.log(msg);
        }
      };
      this.base.callCommonApi(obj);
    },
    //获取足球单场期号
    getqihao: function () {
      var _this = this;
      var data = {
        one_type_id: 3,
        source: 2
      };
      var obj = {
        type: 'post',
        data: data,
        dataType: 'json',
        url: '/commonAPI/scoreZB/selectBannerNumberList',
        success: function (data) {
          //console.log(data);
          if (data.code == 200) {
            _this.qihao = data.body;
          }
        },
        error: function (msg) {
          //console.log(msg);
        }
      };
      this.base.callCommonApi(obj);
    },
    //获取胜负彩期次
    getqici: function () {
      var _this = this;
      var data = {
        one_type_id: 2,
        play_type_id: 14,
        source: 2,
      };
      var obj = {
        type: 'post',
        data: data,
        dataType: 'json',
        url: '/commonAPI/scoreZB/selectBannerNumberList',
        success: function (data) {
          //console.log(data);
          if (data.code == 200) {
            _this.qici = data.body;
          }
        },
        error: function (msg) {
          //console.log(msg);
        }
      };
      this.base.callCommonApi(obj);
    },
    //获取联赛筛选
    getleague: function () {
      var _this = this;
      var data = {
        oneTypeId: this.oneTypeId,
        param: this.param,
        source: 2
      };
      var obj = {
        type: 'post',
        data: data,
        dataType: 'json',
        url: '/commonAPI/scoreZB/selectByLeagueName',
        success: function (data) {
          //console.log(data);
          if (data.code == 200) {
            _this.league = data.body;
            _this.select_league = [];
            for (var i = 0; i < data.body.length; i++) {
              _this.select_league.push(data.body[i].league_Id);
              //$('#'+data.body[i].league_Id).addClass('cc dd');
            }
            //_this.odd_league = _this.select_league;
            setTimeout(function () {
              _this.changeLeague();
            }, 1)
          }
        },
        error: function (msg) {
          //console.log(msg);
        }
      };
      this.base.callCommonApi(obj);
    },
    //联赛筛选插入样式
    changeLeague: function () {
      for (var i = 0; i < this.select_league.length; i++) {
        $('#' + this.select_league[i]).addClass('cc dd');
      }
    },
    //赛事筛选---获得所有联赛名和处理
    getAllMatchName: function (data) {
      var that = this,
        obj = that.allMatchNameList,
        obj1 = that.allMatchIdList,
        matchIdList = [];
      matchIdList.push(data.match_id);
      if (obj.length == 0) {
        obj.push(data.league_name);
        obj1.push(matchIdList);
        data.leagueIndex = 0;
      } else {
        for (var i = 0; i < obj.length; i++) {
          if (obj[i] == data.league_name) {
            obj1[i].push(data.match_id);
            data.leagueIndex = i;
            break;
          } else if (i == obj.length - 1) {
            obj.push(data.league_name);
            obj1.push(matchIdList);
            data.leagueIndex = i + 1;
            break;
          }
        }
      }
    },
    //赛事筛选---点击弹出选择赛事
    pop_game: function () {
      $('.zhezhao').show();
      $('.selectGame').show();
      $('body').css('overflow', "hidden");
    },
    //赛事筛选---点击选择赛事框取消按钮
    esc: function () {
      $('body').css('overflow', "auto");
      $('.zhezhao').hide();
      $('.selectGame').hide();
    },
    //赛事筛选---点击选择赛事框确定按钮
    enter: function () {
      $('body').css('overflow', "auto");
      this.esc();
    },
    //赛事筛选---点击筛选赛事全选
    checkAll: function (event) {
      event = event.currentTarget;
      var _this = this, obj = _this.allMatchIndexList;
      _this.league_num = 0;
      for (var i = 0; i < obj.length; i++) {
        if (obj[i] == -1) {
         _this.$set(obj, i, i);
        }
      }
      for (var i = 0, len = _this.allMatchIdList.length; i < len; i++) {
        _this.league_num += _this.allMatchIdList[i].length;
      }
      $(event).parent().next().children('li').addClass('active');
    },
    //赛事筛选---点击筛选赛事反选
    inverse: function (event) {
      event = event.currentTarget;
      var _this = this,
        selectbtnList = $(event).parent().next().children('li'),
        obj = _this.allMatchIndexList,
        obj1 = _this.allMatchIdList;
      _this.league_num = 0;
      for (var i = 0; i < obj.length; i++) {
        if (obj[i] != -1) {
         _this.$set(obj, i, -1);
        } else {
         _this.$set(obj, i, i);
          _this.league_num += obj1[i].length;
        }
      }
      for (var i = 0; i < selectbtnList.length; i++) {
        if (selectbtnList[i].className == '') {
          selectbtnList[i].className = "active";
        } else {
          selectbtnList[i].className = '';
        }
      }
    },
    //赛事筛选---点击筛选赛事仅五大联赛按钮
    onlyFive: function (event) {
      event = event.currentTarget;
      var _this = this,
        selectbtnList = $(event).parent().next().children('li'),
        obj = _this.allMatchIndexList,
        obj1 = _this.allMatchIdList;
      _this.league_num = 0;
      for (var i = 0; i < selectbtnList.length; i++) {
        var txt = selectbtnList[i].innerHTML;
        if (txt == '英超' || txt == '法甲' || txt == '西甲' || txt == '意甲' || txt == '德甲') {
          selectbtnList[i].className = "active";
         _this.$set(obj, i, i);
          _this.league_num += obj1[i].length;
        } else {
          selectbtnList[i].className = "";
         _this.$set(obj, i, -1);
        }
      }
    },
    //赛事筛选---点击筛选某个赛事
    competition_option_fn: function (event, index) {
      event = event.currentTarget;
      var _this = this, obj = _this.allMatchIndexList, obj1 = _this.allMatchIdList;
      if (!$(event).is('.active')) {
        $(event).addClass('active');
       _this.$set(obj, index, index);
        _this.league_num += obj1[index].length;
      } else {
        $(event).removeClass('active');
        for (var i = 0; i < obj.length; i++) {
          if (obj[i] == index) {
           _this.$set(obj, i, -1);
            _this.league_num -= obj1[i].length;
            break;
          }
        }
      }
    },
    //点击弹出选择玩法
    pop_wanfa: function () {
      $('.wanfa').toggleClass('aa');
      if ($('.wanfa').hasClass('aa')) {
        $('.wanfa>img').css('transform', 'rotate(180deg)');
      } else {
        $('.wanfa>img').css('transform', 'rotate(0deg)');
      }
      $('.zhezhao').show();
      $('.wanfa-ul').show();
    },
    //点击玩法执行
    select_wanfa: function (wan) {
      if (wan == 'wan1') {
        $('.time-ul').hide();
        $('.dcqici-ul').hide();
        $('.sfcqici-ul').hide();
        $('#wan1').addClass('acitve').siblings().removeClass('acitve');
        this.wanfa = '竞彩足球';
        this.today = this.day;
        $('#d').addClass('acitve').siblings().removeClass('acitve');
        this.oneTypeId = 1;
        this.param = this.day;
        this.league_num = 0;
        this.getdatas();
      } else if (wan == 'wan2') {
        $('.time-ul').hide();
        $('.dcqici-ul').hide();
        $('.sfcqici-ul').hide();
        $('#wan2').addClass('acitve').siblings().removeClass('acitve');
        this.wanfa = '足球单场';
        this.datas = [];
        this.today = this.qihao[0];
        $('#zqdc' + this.qihao[0]).addClass('acitve').siblings().removeClass('acitve');
        this.oneTypeId = 3;
        this.param = this.qihao[0];
        this.league_num = 0;
        if (this.qihao.length != 0) {
          this.getdatas();
        }
      } else if (wan == 'wan3') {
        $('.time-ul').hide();
        $('.dcqici-ul').hide();
        $('.sfcqici-ul').hide();
        $('#wan3').addClass('acitve').siblings().removeClass('acitve');
        this.wanfa = '胜负彩';
        this.datas = [];
        this.today = this.qici[0];
        $('#sfc' + this.qici[0]).addClass('acitve').siblings().removeClass('acitve');
        this.oneTypeId = 2;
        this.param = this.qici[0];
        this.league_num = 0;
        if (this.qici.length != 0) {
          this.getdatas();
        }
      } else if (wan == 'wan4') {
        $('.time-ul').hide();
        $('.dcqici-ul').hide();
        $('.sfcqici-ul').hide();
        $('#wan4').addClass('acitve').siblings().removeClass('acitve');
        this.wanfa = '竞彩篮球';
        this.today = this.day;
        $('#d').addClass('acitve').siblings().removeClass('acitve');
        this.oneTypeId = 4;
        this.param = this.day;
        this.league_num = 0;
        this.getdatas();
      }
      this.countDateTime(new Date());
      $("#header .active").removeClass('active');
      $('#'+wan).addClass('active');
      $('.wanfa>img').css('transform', 'rotate(0deg)');
      $('.zhezhao').hide();
      $('.wanfa-ul').hide();
    },
    //点击弹出选择时间
    pop_time: function () {
      $('.time').toggleClass('aa');
      if ($('.time').hasClass('aa')) {
        $('.time>img').css('transform', 'rotate(180deg)');
      } else {
        $('.time>img').css('transform', 'rotate(0deg)');
      }
      $('.zhezhao').show();
      if (this.oneTypeId == 1 || this.oneTypeId == 4) {
        $('.time-ul').show();
      } else if (this.oneTypeId == 3) {
        $('.dcqici-ul').show();
      } else {
        $('.sfcqici-ul').show();
      }
    },
    //点击时间执行
    select_time: function (dd) {
      if (dd == 'd') {
        this.param = this.day;
        this.today = this.day;
        $('#d').addClass('acitve').siblings().removeClass('acitve');
        this.getdatas();
      } else if (dd == 'd1') {
        this.param = this.day1;
        this.today = this.day1;
        $('#d1').addClass('acitve').siblings().removeClass('acitve');
        this.getdatas();
      } else if (dd == 'd2') {
        this.param = this.day2;
        this.today = this.day2;
        $('#d2').addClass('acitve').siblings().removeClass('acitve');
        this.getdatas();
      } else if (dd == 'd3') {
        this.param = this.day3;
        this.today = this.day3;
        $('#d3').addClass('acitve').siblings().removeClass('acitve');
        this.getdatas();
      } else if (dd == 'd4') {
        this.param = this.day4;
        this.today = this.day4;
        $('#d4').addClass('acitve').siblings().removeClass('acitve');
        this.getdatas();
      }
      //$('.time').toggleClass('aa');
      $('.time>img').css('transform', 'rotate(0deg)');
      $('.zhezhao').hide();
      $('.time-ul').hide();
    },
    //点击足球单场期号执行
    select_qihao: function (qihao) {
      $('#zqdc' + qihao).addClass('acitve').siblings().removeClass('acitve');
      this.param = qihao;
      this.today = qihao;
      this.getdatas();
      $('.dcqici-ul').hide();
      $('.zhezhao').hide();
    },
    //点击胜负彩期次执行
    select_qici: function (qici) {
      $('#sfc' + qici).addClass('acitve').siblings().removeClass('acitve');
      this.param = qici;
      this.today = qici;
      this.getdatas();
      $('.sfcqici-ul').hide();
      $('.zhezhao').hide();
    },
    //点击未结束执行
    noend: function () {
      $('.isEnd>a:first-child').css('border-bottom', '1px solid #d91d37').siblings().css('border-bottom', 'none');
      this.state = 1;
      this.getdatas();
    },
    //点击已结束执行
    end: function () {
      $('.isEnd>a:last-child').css('border-bottom', '1px solid #d91d37').siblings().css('border-bottom', 'none');
      this.state = 0;
      this.getdatas();
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
    //点击场次跳转
    skip: function (event_id, matchId, courtScore, item) {
      var dataset = {
        id: event_id,
        away: item.away_team_name,
        //					awayId:awayId,
        home: item.home_team_name,
        //					homeId:homeId,
        courtScore: item.courtScore
      }
      localStorage.setItem("datasetList", JSON.stringify(dataset));
      if (event_id) {
        //				localStorage.setItem("eventId", event_id);
        //				if(courtScore){
        //					localStorage.setItem("courtScore", courtScore)
        //				}
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
      } else if (matchId) {
        localStorage.setItem("basketMatchId", matchId)
        this.$router.push({ name: "basketDetail" });
        // window.location.href = '../rx9/basket_detail.html';
      }
      else {
        mui.toast('暂无数据', { duration: 'long', type: 'div' })
      }
    },
    //点击遮罩层所有弹出层隐藏
    escZ: function () {
      if ($('.wanfa').hasClass('aa')) {
        $('.wanfa').removeClass('aa');
        $('.wanfa>img').css('transform', 'rotate(0deg)');
      }
      if ($('.time').hasClass('aa')) {
        $('.time').removeClass('aa');
        $('.time>img').css('transform', 'rotate(0deg)');
      }
      $('.wanfa-ul').hide();
      $('.time-ul').hide();
      $('.dcqici-ul').hide();
      $('.sfcqici-ul').hide();
      $('.selectGame').hide();
      $('.zhezhao').hide();
    },
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
  },
  watch: {
    $route(to, from) {
      if (to.name == "live") {
        this.pullToRefresh.setNowThis(this);
      }
    }
  }
};


