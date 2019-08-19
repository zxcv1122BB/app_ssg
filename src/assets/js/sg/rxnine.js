export default{
  name: 'rxnine',
  data(){
    return{
      all_count: 3, //总场数
      select_count: 0, //已选的场数
      flag: true, //判断是否显示
      btn_inner: '请选择全部比赛结果', //按钮的内容
      flag_btn: false, //按钮是否显示
      session: 0, //期数
      prevDataList: [], //定义一个存放对象的数组。
      multiple: 1, //投注倍数
      showDatas: [], //点击下一步显示的数组
      datas: [], //存储接收数据
      banner_number: 0, //期数
      endTime: "0天0时", //截止日期
      isActive: false,
      result: {},
      matchIdList: [], //储存march_Id
      isShark: true, //判断是否点击

      iftipsContent: false,
      tipsContent: '',
      isSelecting: false,
      isAble: false,

      state: '游客',
      coin: "", //钱包可用钱数
      singleMaxSum: "", //投注金额上限
      coinUnit: "元",//金额单位
      sharkTime: "",//摇一摇定时器
      isNoMsg:"",//无比赛记录
      countTimingNum: 20000,
    }
  },
  created: function () {
    this.loadData();
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

      if ((userNameMsg && that.coin == 0) || (userNameMsg &&isRefresh)) {
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
    startCountWorker: function () {
      var that = this;
      var timing = 4,
        countNum = 0;
        that.countTiming = setInterval(function () {
          // countNum += 1;
          // if (countNum >= timing) {
          that.countTimingNum-=1000;
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
    //       plus.webview.close(ws);
    //     }, 500)
    //   }
    // },
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
      this.$router.push({ name: "sgHelp" });
      // if (localStorage.app_flag == undefined) {
      //   // window.location.href = 'help-rx9.html';
      //   localStorage.singTo = this.$route.path;
      //   this.$router.push({ path: "./help" });
      // } else {
      //   mui.openWindow({
      //     url: 'help-rx9.html',
      //     id: 'helprx9',
      //     styles: {
      //       top: base.getStatusbarHeight() + 'px',
      //       bottom: 0
      //     },
      //     show: {
      //       autoShow: true,//页面loaded事件发生后自动显示，默认为true
      //       aniShow: 'slide-in-bottom',//页面显示动画，默认为”slide-in-right“；
      //       duration: '200'//页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
      //     },
      //     createNew: true
      //   })
      // }
    },
    //加载数据
    loadData: function () {
      var _this = this;
      var getData = {
        type: "post",
        contentType: "application/json",
        url: "/commonAPI/getMatchInfoByPlayId",
        data: {
          "playTypeId": 15
        },
        dataType: "json",
        success: function (data) {
          //console.log(data);
          var list = [],
            sessionsList = [],
            obj;
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
            var ableIndex = "";
            data.body.map(function (item, index) {
              // sessionsList.push(item);
              for (var key in data.body[index]) {
                sessionsList.push(key);
              }
              if (item[sessionsList[index]].length >= 14) {
                ableIndex = index;
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
      //console.log(data[0].deadline_bet.substr(0, 19).replace(new RegExp("-", "gm"), "/"))
      var now = (new Date()).getTime(),
        isrepeat = true,
        matchTime = (new Date(data[0].deadline_bet.substr(0, 19).replace(new RegExp("-", "gm"), "/"))).getTime();
      if (matchTime > now) {
        _this.session = data[0].banner_number;
        for (var i = 0; i < 14; i++) {
          var obj = data[i],
            obj1 = {
              selectItemList: []
            };
          obj1.match_id = obj.match_id;
          _this.matchIdList.push(obj.match_id);
          obj.win = '0.00';
          obj.draw = '0.00';
          obj.lose = '0.00';
          obj.isShow = 0;
          obj.winNum = 0;
          obj.drawNum = 0;
          obj.loseNum = 0;
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
      // var html = "";
      // html = "<div class='noMsg'><img class='icon' src='../static/images/bg_noMsg_white.png'/><p>当前投注没有比赛</p><p>您可以到其他投注区查看</p></div>";
      // $('.inner').html(html);
      this.isNoMsg=true;
      $('body').css({
        "margin-bottom": 0,
        "overflow": 'hidden'
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
      //			//console.log(num, index, matchId);
      var timer = (new Date()).valueOf();
      var that = this,
        flag = true,
        aa = {},
        e = event.currentTarget,
        len2 = that.prevDataList[index].selectItemList.length;
      if ($(e).is('.selected')) {
        $(e).removeClass("selected");
        (num == 0) && (that.datas[index].winNum = 0);
        (num == 1) && (that.datas[index].drawNum = 0);
        (num == 2) && (that.datas[index].loseNum = 0);
        (that.datas[index].winNum == 0 && that.datas[index].drawNum == 0 && that.datas[index].loseNum == 0) && (that.datas[index].isShow = 0);
      } else {
        $(e).addClass("selected");
        (num == 0) && (that.datas[index].winNum = 1);
        (num == 1) && (that.datas[index].drawNum = 1);
        (num == 2) && (that.datas[index].loseNum = 1);
        that.datas[index].isShow = 1;
      }
      //			//console.log($(e).parent().find('div'));
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
      that.isAble = 0;
      for (var i = 0, len = that.prevDataList.length; i < len; i++) {
        if (that.prevDataList[i].selectItemList.length != 0) {
          that.isAble++;
        }
      }
      if (that.isAble == 0) {
        $('.btn-p1').css('display', 'block');
        $('.btn-p2').css('display', 'none');
      } else {
        var bb = 9 - that.isAble;
        $('.btn-p2>span:first-child').html('已选择' + that.isAble + '场,' + '还差' + bb + '场');
        $('.btn-p1').css('display', 'none');
        $('.btn-p2').css('display', 'block');
      }
      if (that.isAble >= 9) {
        that.tzNum = that.tzNum_count(that.prevDataList);
        var html = "<span>" + that.tzNum + " 注,</span><span>共 " + (that.tzNum * 2 * that.multiple) + that.coinUnit + "</span>";
        $('.btn2 .top-2').html(html);
        $('.btn>a').html('选好了，下一步');
        $('.btn-p2>span:first-child').html('已选择' + that.isAble + '场,' + that.tzNum + ' 注, 共 ' + (that.tzNum * 2 * that.multiple) + that.coinUnit);
      } else {
        var html = "<span>0注,</span><span>共0" + that.coinUnit + "</span>";
        $('.btn2 .top-2').html(html);
        $('.btn>a').html('请选择全部比赛结果');
      }
      var timer2 = (new Date()).valueOf();
      //			//console.log('结果：' + event.data, '时间:' + timer2, '用时：' + (timer2 - timer));
      //			//console.log(that.prevDataList);
      //			//console.log(that.datas)
    },
    //点击提交按钮执行
    sub: function () {
      if (this.isAble >= 9) {
        var that = this;
        if (!that.isLogin) {
          that.get_userState();
        }

        $('#sharkit').hide();
        $('body').css("padding-top", "6.6rem");
        $('#loading_wait').addClass('show');
        var html = "<span>" + this.tzNum + "注,</span><span>共" + (this.tzNum * 2 * this.multiple) + that.coinUnit + "</span>";
        $('.btn2 .top-2').html(html);
        $('.saishi').hide();
        $('.inner').hide();
        $('.inner-hide').show();
        $('.btn').hide();
        $('.btn2').show();
        $('#main').css('margin-bottom', '3rem');
        //查看状态
        //				if(userNameMsg) {
        //					var getUserInfo = {
        //						type: "post",
        //						url: "/authApi/AutoLoginGetUserinfoByRedis",
        //						data: {
        //							"username": localStorage.getItem("userName")
        //						},
        //						success: function success(data) {
        //							if(data.code == 200) {
        //								that.state = "钱包:" + (parseFloat(data.body.COIN) - parseFloat(data.body.FCION)).toFixed(2) + that.coinUnit;
        //							}
        //						}
        //					};
        //					this.base.callAuthApi(getUserInfo);
        //				} else {
        //					that.state = "游客";
        //				}
      } else {
        this.tips("投注项未满9项，请继续投注", "", 1);
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
    //		//点击清空按钮执行
    //		clearSelect: function() {
    //			$('.tishi').show();
    //			$('.zhezhao').show();
    //		},
    //点击清空框里面的取消执行
    esc: function () {
      $('.tishi').hide();
      $('.zhezhao').hide();
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
    //点击详细信息跳转
    detail: function (event_id, home, away, homeId, awayId) {
      if (event_id) {
        //				localStorage.setItem("eventId", event_id);
        //				localStorage.setItem("footHome", home);
        //				localStorage.setItem("footAway", away);
        var dataset = {
          id: event_id,
          away: away,
          awayId: awayId,
          home: home,
          homeId: homeId,
        }
        localStorage.setItem("datasetList", JSON.stringify(dataset));
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
    //投注注数计算
    tzNum_count: function (dataList) {
      var tzNum = 1,
        lenList = [],
        sumNum = 0;
      for (var i = 0; i < dataList.length; i++) {
        lenList.push(dataList[i].selectItemList.length);
      }
      //console.log(lenList);
      for (var j = 0; j < lenList.length - 8; j++) {
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
                      } while (t < lenList.length)
                      e++ , t = e + 1;
                    } while (e < lenList.length - 1)
                    w++ , e = w + 1, t = w + 2;
                  } while (w < lenList.length - 2)
                  q++ , w = q + 1, e = q + 2, t = q + 3;
                } while (q < lenList.length - 3)
                n++ , q = n + 1, w = n + 2, e = n + 3, t = n + 4;
              } while (n < lenList.length - 4)
              m++ , n = m + 1, q = m + 2, w = m + 3, e = m + 4, t = m + 5;
            } while (m < lenList.length - 5)
            l++ , m = l + 1, n = l + 2, q = l + 3, w = l + 4, e = l + 5, t = l + 6;
          } while (l < lenList.length - 6)
          k++ , l = k + 1, m = k + 2, n = k + 3, q = k + 4, w = k + 5, e = k + 6, t = k + 7;
        } while (k < lenList.length - 7)

      }
      return sumNum;
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

      var html = "<span>" + this.tzNum + "注,</span><span>共" + (this.tzNum * 2 * this.multiple) + "元</span>";
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
      var userNameMsg = localStorage.userName,
        _this = this,
        json1 = {
          tzMsg: {
            "tzType": "9*1",
            "tzMultiple": _this.multiple,
            "tzMoney": _this.tzNum * 2 * _this.multiple,
            "one_type_id": 2,
            "played_group_id": 5,
            "played_id": 15,
            "banner_number": _this.session,
            "expect_bonuses": "",
          },
          selectItemList: []
        };
      if (this.isAble < 9) {
        this.tips("投注项未满9项，请继续投注", "", 1);
        return
      } else if (!userNameMsg) {
        localStorage.loginTo = "../rx9/rx9";
        // _this.tips("请先登录", "../loginIn/login.html", 2);
        _this.tips("请先登录", "login", 2);
        return
      } else if (_this.coin < json1.tzMsg.tzMoney) {
        // _this.tips("余额不足，请先充值", "../loginIn/depositFile.html", 2);
        _this.tips("余额不足，请先充值", "depositFile", 2);
        return
      } else if (_this.singleMaxSum && json1.tzMsg.tzMoney > parseInt(_this.singleMaxSum)) {
        _this.tips("投注金额不能超过" + _this.singleMaxSum, "", 1);
        return
      } else {
        event = event.currentTarget;
        if ($(event).is('.disabled')) {
          return
        }
        $(event).addClass('disabled');
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
          if (selectItem.X.length != 0) {
            json1.selectItemList.push(selectItem);
          }
        }
        //console.log(json1);
        //				var userNameMsg = localStorage.userName;
        setTimeout(function () {
          //					if(userNameMsg) {
          _this.get_login(json1);
          //					} else {
          //						localStorage.loginTo = "../rx9/rx9.html";
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
          i++;
          if (i > 7) {
            $(".inner .inner-li .li-top .top-right>div.selected").trigger("click");
            var max = _this.matchIdList.length,
              list = [],
              contentList = [];
            for (var j = 0; j < 9; j++) {
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
            for (var j = 0; j < 9; j++) {
              $(".inner .inner-li[data-index=" + _this.matchIdList[contentList[j]] + "] .li-top .top-right>div[data-index=" + list[j] + "]").trigger("click");
            }
            window.clearInterval(_this.sharkTime);
            setTimeout(function () {
              _this.sharkTime = "";
            }, 1000)
            _this.isShark = true;
          }
        }, 100);
      }
    },
    //是否登录
    get_login: function (test) {
      var that = this;
      var obj = {
        type: 'post',
        data: {
          tzJson: JSON.stringify(test)
        },
        //								url: 'http://192.168.1.10:1080/ls/commonAPI/footballBet',
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
        //				$('#loading_wait').removeClass('show');
        clearTimeout(timeout);
        if (index == 2) {
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
      $('.btn-p2>span:first-child').html('已选择' + that.isAble + '场,' + that.tzNum + ' 注, 共 ' + (that.tzNum * 2 * that.multiple) + that.coinUnit);
    },
    //单位显示
    coinUnit: function () {
      var that = this;
      if (that.coin !== "") {
        that.user_state = "钱包:" + that.coin + that.coinUnit + "(可用)";
      }
    },
    $route(to, from) {
      var _this = this;
      if (to.name == "rxnine") {
        if (this.isNoMsg) {
          $("body").css({
            overflow: 'hidden'
          })
        }
        this.pullToRefresh.setNowThis(this);
        _this.startCountWorker();
          if(!localStorage.config){
              this.getSysConfig();
          }
      } else if (from.name == "rxnine") {
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



