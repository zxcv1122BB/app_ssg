
export default{
	name: 'detail',
  data() {
    return {
		datas: [],
		recentHistoryList: [],//近十场历史战绩列表
		homeRecentRecordList: [],//主队近期战绩信息列表
		awayRecentRecordList: [],//客队近期战绩信息列表
		homeFutureRecordList: [],//主队未来三场战绩列表
		awayFutureRecordList: [],//客队未来三场战绩列表
		matchEventList: [],//比赛事件列表
		injuryInfoList: [],//伤停信息列表
		lineupInfoList: [],//阵容信息列表
		technologyList: [],//技术统计列表
		scoreboardList: [],//积分榜列表
		// 分为主客队的伤停信息列表数组
		homeInjury: [],//主队伤停信息
		awayInjury: [],//客队伤停信息
		//分为主客队的阵容信息
		homeBattle: [],
		awayBattle: [],
		eventId: '',
		homeTeamId: '',
		awayTeamId: '',
		groupId: '',
		matchStatus: '',//0已结束 1未开始 2半场 3取消 4弃赛/中断 5延期 6进行中
		// 历史交锋主队胜平负
		r_win: 0,
		r_draw: 0,
		r_lose: 0,
		// 历史交锋主队主场
		r_hwin: 0,
		r_hdraw: 0,
		r_hlose: 0,
		crruentClass: '',
		flag: true,
		noData: false,
		home_win: 0,
		away_win: 0,
		home_draw: 0,
		away_draw: 0,
		home_lose: 0,
		away_lose: 0,
		home_home_win: 0,
		away_home_win: 0,
		home_home_draw: 0,
		away_home_draw: 0,
		home_home_lose: 0,
		away_home_lose: 0,
		peilv_manager: '0',
		// 欧赔数据列表
		euro_odd_list: [],
		// 亚赔数据列表
		Ah_odd_list: [],
		// 大小盘数据列表
		Over_Under_list: [],
		Ah_is_loading: true,
		Ou_is_loading: true,
		Eu_is_loading: true,
		// pre_eu:true,
		// pre_ah:false,
		// pre_ou:false,
		odd_tab: {
			pre_eu: true,
			pre_ah: false,
			pre_ou: false,
		},
		// 判断数据是否在加载防止重复加载
		scoreFlag:true,
		oddsFlag:true,
		AhFlag:true,
		OuFlag:true,
		baseFlag:true,
		recentFlag:true,
    oddsShow:false,
    }
	},
	created: function () {
    this.initData();
	},
	mounted: function () {
    this.initDom();
	},
  methods: {
    initData:function(){
      Object.assign(this.$data, this.$options.data())
      var _this = this, dataList;
      setTimeout(function () {
        _this.loadData();
      }, 10);
      if (localStorage.datasetList) {
        dataList = JSON.parse(localStorage.datasetList)
        //			_this.datas.courtScore=localStorage.getItem("footScore")

        _this.datas.homeTeamName = dataList.home;
        _this.datas.awayTeamName = dataList.away;
        _this.homeTeamId = dataList.homeId;
        _this.awayTeamId = dataList.awayId;
        _this.eventId = dataList.id;
        if (!dataList.courtScore) {
          _this.datas.courtScore = dataList.courtScore;
        }
      }
    },
    //路由跳转返回
    routerBack: function () {
      if (localStorage.turnPathName && localStorage.turnPathName != "login") {
        // this.$router.push({ name: localStorage.turnPathName });
        this.$router.go(-1)
      } else {
        this.$router.push({ name: "index" });
      }

    },
    initDom:function(){
      var h = $(window).height() + 'px';
      var w = $(window).width() + 'px';
      $('.mask').css({
        width: w,
        height: h,
        background: "rgba(0, 0, 0, 0.4)",
        position: "fixed",
        top: "0",
        right: "0",
      })
      $('.mask p').css({
        textAlign: "center",
        color: "#fff",
        position: "absolute",
        top: "50%",
        left: "50%",
        marginRight: "-50%",
      })
      $(".derail_switch").click(function () {
        var showStr = $(this).parent().siblings(".detail").css("display")
        if (showStr === "none") {
          $(this).parent().siblings(".detail").css({ display: "block" })
        } else {
          $(this).parent().siblings(".detail").css({ display: "none" })
        }
      })
      $(".inner").on("click", ".li-top", function () {
        $(this).next(".li-bottom").stop().slideToggle('slow')
      })
    },
    goback_click:function(){
      //console.log(this.$router)
    },
    //加载数据 加载赛事主客队基本信息
    loadData: function () {
      var _this = this;
      var eventId = _this.eventId;
      //			localStorage.removeItem("eventId");
      if (eventId && $.trim(eventId) != '') {
        var getData = {
          type: "post",
          contentType: "application/json",
          url: "/commonAPI/detail/queryLotteryMatchDetail",
          data: { 'eventId': eventId },
          dataType: "json",
          success: function (data) {
            //console.log(data);
            if (data.code == 201) {
              //							_this.noData = true;
              _this.flag = false;
            }
            if (data.code == 200 && data.body) {
              var dataList = JSON.parse(localStorage.datasetList);
              _this.datas = data.body;
              //							_this.datas.courtScore=localStorage.getItem("courtScore");
              //							localStorage.removeItem("courtScore")

              if (!_this.datas.homeTeamName && dataList.home) {
                _this.datas.homeTeamName = dataList.home;
              }
              if (!_this.datas.awayTeamName && dataList.away) {
                _this.datas.awayTeamName = dataList.away;
              }
              if (!_this.datas.courtScore && dataList.courtScore) {
                _this.datas.courtScore = dataList.courtScore;
              }


              var list = ["eventId", "homeTeamId", "awayTeamId", "groupId"];
              list.map(function (item) {
                if (data.body[item]) {
                  _this[item] = data.body[item];
                }
              })
              //							_this.eventId = data.body.eventId;
              //							_this.homeTeamId = data.body.homeTeamId;
              //							_this.awayTeamId = data.body.awayTeamId;
              //							_this.groupId = data.body.groupId;
              _this.matchStatusSwitch(data.body.matchStatus);
              // if (data.body.matchStatus == 1) {//在该比赛开始时默认加载战绩列表，并展示战绩列表
              //_this.loadRecordData();
              setTimeout(function () {
                _this.changeItemTab(1, 'inner-ul');
              }, 10);
              // _this.changeItemTab(2, 'inner-zhanji');
              // } else {
              // 	_this.changeItemTab(2, 'inner-zhanji');
              // }
            } else {
              setTimeout(function () {
                _this.changeItemTab(1, 'inner-ul');
              }, 10);
            }
          },
          error: function (res) {
          }
        };
        this.base.callCommonApi(getData);
      } else {
        //				_this.noData = true;
        _this.flag = false;
        //console.log('比赛参数不存在');
      }
    },
    /**加载战绩列表*/
    loadRecordData: function () {
      //console.log("加载战绩信息")
      var _this = this;
      _this.recentFlag = false;
      if (_this.homeTeamId && _this.awayTeamId && $.trim(_this.homeTeamId) != '' && $.trim(_this.awayTeamId) != '') {
        var getData = {
          type: "post",
          contentType: "application/json",
          url: "/commonAPI/detail/getMatchRecordList/" + _this.homeTeamId + "/" + _this.awayTeamId,
          data: {},
          dataType: "json",
          success: function (data) {
            //console.log(data);
            _this.flag = false;
            if (data.code == 200 && data.body) {
              _this.recentHistoryList = data.body.recentHistoryList;//近十场历史战绩列表
              _this.recentHistoryList.map(function (item) {
                _this.getShortName(item);
                switch (item.matchResult) {
                  case 3:
                    _this.r_win++;
                    if (item.homeTeamName == _this.datas.homeTeamName) {
                      _this.r_hwin++;
                    }
                    break;
                  case 1:
                    _this.r_draw++;
                    if (item.homeTeamName == _this.datas.homeTeamName) {
                      _this.r_hdraw++;
                    }
                    break;
                  case 0:
                    _this.r_lose++;
                    if (item.homeTeamName == _this.datas.homeTeamName) {
                      _this.r_hlose++;
                    }
                    break;

                  default:
                    break;
                }
              })
              _this.homeRecentRecordList = data.body.homeRecentRecordList;//主队近期战绩信息列表
              _this.homeRecentRecordList.map(function (item) {
                _this.getShortName(item);
                switch (item.matchResult) {
                  case 3:
                    _this.home_win++;
                    if (item.homeTeamName == _this.datas.homeTeamName) {
                      _this.home_home_win++;
                    }
                    break;
                  case 1:
                    _this.home_draw++;
                    if (item.homeTeamName == _this.datas.homeTeamName) {
                      _this.home_home_draw++;
                    }
                    break;
                  case 0:
                    _this.home_lose++;
                    if (item.homeTeamName == _this.datas.homeTeamName) {
                      _this.home_home_lose++;
                    }
                    break;

                  default:
                    break;
                }
              })
              _this.awayRecentRecordList = data.body.awayRecentRecordList;//客队近期战绩信息列表
              _this.awayRecentRecordList.map(function (item) {
                _this.getShortName(item);
                switch (item.matchResult) {
                  case 3:
                    _this.away_win++;
                    if (item.homeTeamName == _this.datas.awayTeamName) {
                      _this.away_home_win++;
                    }
                    break;
                  case 1:
                    _this.away_draw++;
                    if (item.homeTeamName == _this.datas.awayTeamName) {
                      _this.away_home_draw++;
                    }
                    break;
                  case 0:
                    _this.away_lose++;
                    if (item.homeTeamName == _this.datas.awayTeamName) {
                      _this.away_home_lose++;
                    }
                    break;

                  default:
                    break;
                }
              })
              _this.homeFutureRecordList = data.body.homeFutureRecordList;//主队未来三场战绩列表
              _this.homeFutureRecordList.map(function (item) {
                _this.getShortName(item);
              })
              _this.awayFutureRecordList = data.body.awayFutureRecordList;//客队未来三场战绩列表
              _this.awayFutureRecordList.map(function (item) {
                _this.getShortName(item);
              })
            }
          }
        };
        this.base.callCommonApi(getData);
      } else {
        //console.log('比赛参数不存在');
      }
    },
    /**加载赛事信息列表*/
    loadEventData: function () {
      var _this = this;
      // _this.flag = true;
      _this.baseFlag = false;
      if (_this.eventId && $.trim(_this.eventId) != '') {
        var getData = {
          type: "post",
          contentType: "application/json",
          url: "/commonAPI/detail/getLotteryMatchList/" + _this.eventId,
          data: {},
          dataType: "json",
          success: function (data) {
            //console.log(data);
            _this.flag = false;
            if (data.code == 200 && data.body) {
              _this.matchEventList = data.body.matchEventList;//比赛事件列表
              _this.matchEventList.map(item => {
                if (item.awayPlayerName) {
                  if (item.awayPlayerName.indexOf('·') != -1) {
                    item.awayPlayerName = item.awayPlayerName.split('·')[0]
                  }
                  if (item.awayPlayerName.indexOf('-') != -1) {
                    item.awayPlayerName = item.awayPlayerName.split('-')[0]
                  }
                }
                if (item.homePlayerName) {
                  if (item.homePlayerName.indexOf('·') != -1) {
                    item.homePlayerName = item.homePlayerName.split('·')[0]
                  }
                  if (item.homePlayerName.indexOf('-') != -1) {
                    item.homePlayerName = item.homePlayerName.split('-')[0]
                  }
                }
                switch (item.incident) {
                  case 2:
                    item.i_src = "images/card.png"
                    break;
                  case 1:
                    item.i_src = "images/football1.png"
                    break;
                  case 3:
                    item.i_src = "images/huanru.png"
                    break;
                  case 4:
                    item.i_src = "images/huanchu.png"
                    break;

                  default:
                    break;
                }
              })
              _this.lineupInfoList = data.body.lineupInfoList;//阵容信息列表
              _this.technologyList = data.body.matchTechnologyList;//技术统计列表
              _this.matchEventList = _this.matchEventList.reverse();
              //
              _this.lineupInfoList.map(item => {
                if (item.homePlayerName) {
                  if (item.homePlayerName.indexOf('·') != -1) {
                    item.homePlayerName = item.homePlayerName.split('·')[0]
                  }
                  if (item.homePlayerName.indexOf('-') != -1) {
                    item.homePlayerName = item.homePlayerName.split('-')[0]
                  }
                }
                if (item.awayPlayerName) {
                  if (item.awayPlayerName.indexOf('·') != -1) {
                    item.awayPlayerName = item.awayPlayerName.split('·')[0]
                  }
                  if (item.awayPlayerName.indexOf('-') != -1) {
                    item.awayPlayerName = item.awayPlayerName.split('-')[0]
                  }
                }
                if (item.homePlayerName) {
                  if (item.lineupTypeId == 7 || item.lineupTypeId == 8) {
                    // if (item.lineupTypeId == 4 || item.lineupTypeId == 5){
                    _this.homeInjury.push(item);
                  } else {
                    _this.homeBattle.push(item);
                  }
                }
                if (item.awayPlayerName) {
                  if (item.lineupTypeId == 7 || item.lineupTypeId == 8) {
                    // if (item.lineupTypeId == 4 || item.lineupTypeId == 5) {
                    _this.awayInjury.push(item);
                  } else {
                    _this.awayBattle.push(item);
                  }
                }
              })
              setTimeout(function () {
                if (_this.recentFlag) {
                  _this.loadRecordData();
                }
                if (_this.scoreFlag) {
                  _this.loadScoreboardData();
                }
              }, 120);
            }
          },
          error: function (res) {
            //console.log("加载信息出错")
            _this.flag = false;
          }
        };
        this.base.callCommonApi(getData);
      } else {
        //console.log('赛事参数不存在');
        _this.flag = false;
      }
    },
    /**加载积分榜信息列表*/
    loadScoreboardData: function () {
      var _this = this;
      // _this.groupId=850784;//测试数据
      _this.scoreFlag = false;
      if (_this.groupId && $.trim(_this.groupId) != '') {
        //console.log("加载积分绑信息列表")
        var getData = {
          type: "post",
          contentType: "application/json",
          url: "/commonAPI/detail/getMatchEventScoreboard/" + _this.groupId,
          data: {},
          dataType: "json",
          success: function (data) {
            _this.flag = false;
            //console.log(data);
            if (data.code == 200 && data.body) {
              _this.scoreboardList = data.body;//积分榜列表
              _this.scoreboardList.map(item => {
                if (item.teamName.length > 5) {
                  item.teamName = item.teamName.substring(0, 4) + '...'
                }
              })
            }
          }
        };
        this.base.callCommonApi(getData);
      } else {
        //console.log('赛事参数不存在');
      }
    },
    /**切换栏目页面触发事件样式及调用接口*/
    changeItemTab: function (index, className) {
      var _this = this;
      $(".nav-list>li:nth-child(" + index + ")").css('border-bottom', '2px solid darkred').siblings().css('border-bottom', 'none');
      $('.' + className).show().siblings().hide();
      if (_this.noData) {
        return;
      }
      if (_this.crruentClass != '.' + className) {
        _this.crruentClass = '.' + className;
        //console.log(_this.crruentClass);
        if (index === 1 && _this.lineupInfoList.length <= 0 && (_this.injuryInfoList.length <= 0 || _this.homeBattle.length <= 0) && _this.baseFlag) {//赛事模块
          setTimeout(function () {
            _this.loadEventData();
          }, 30);
        } else if (index === 2 && (_this.homeRecentRecordList.length <= 0 || _this.awayRecentRecordList.length <= 0) && _this.recentFlag) {//战绩模块
          _this.flag = true;
          setTimeout(function () {
            _this.loadRecordData();
          }, 50);
        } else if (index === 3 && _this.scoreFlag) {//积分模块
          _this.flag = true;
          setTimeout(function () {
            _this.loadScoreboardData();
          }, 50);
        } else if (index === 4 && _this.oddsFlag) {
          if (_this.Eu_is_loading) {
            _this.Eu_is_loading = false;
            _this.is_onload = true;
            _this.flag = true;
            setTimeout(function () {
              _this.getEuropeOddsList();
            }, 50);
          }
        }
      }
    },
    /**点击赛事列表栏目*/
    showMatchItem: function (index) {
      var _this = this;
      if (_this.crruentClass) {
        var obj = $(_this.crruentClass + ">li:nth-child(" + index + ")>p:nth-child(1)");
        // obj.siblings().stop().slideToggle('slow');
        obj.children("img").toggleClass("imgRotate");
      }
    },
    getMatchResult: function (teamId, list) {
      var wins = 0, draws = 0, failurs = 0, hwins = 0, hdraws = 0, hfailurs = 0;
      if (list && list.length > 0) {
        for (var i in list) {
          if (list.matchResult == 3) {
            if (teamId == list[i].homeTeamId) {
              wins += 1;
              hwins += 1;
            } else if (teamId == list[i].awayTeamId) {
              failurs += 1;
            }
          } else if (list.matchResult == 1) {
            if (teamId == list[i].homeTeamId) {
              draws += 1;
            }
            hdraws += 1;
          } else if (list.matchResult == 0) {
            if (teamId == list[i].homeTeamId) {
              hfailurs++;
              failurs++;
            } else if (teamId == list[i].awayTeamId) {
              wins++;
            }
          }
        }
      }
      var arr = new Array(2);
      arr[0] = wins + '胜 ' + draws + '平 ' + failurs + '负';
      arr[1] = hwins + '胜 ' + hdraws + '平 ' + hfailurs + '负';
      return arr;
    },
    matchStatusSwitch: function (info) {
      if (info) {
        var _this = this;
        //0已结束 1未开始 2半场 3取消 4弃赛/中断 5延期 6进行中
        switch (info) {
          case 0:
            _this.matchStatus = '已结束';
            break;
          case 1:
            _this.matchStatus = '未开始';
            break;
          case 2:
            _this.matchStatus = '半场';
            break;
          case 3:
            _this.matchStatus = '取消';
            break;
          case 4:
            _this.matchStatus = '弃赛';
            break;
          case 5:
            _this.matchStatus = '延期';
            break;
          case 6:
            _this.matchStatus = '进行中';
            break;
          default:
            _this.matchStatus = '进行中';
            break;
        }
      }
    },
    handleBack: function () {
      localStorage.removeItem("eventId");
      history.back(-1);
    },
    // 获取欧赔赔率列表
    getEuropeOddsList: function () {
      var _this = this;
      _this.oddsFlag = false;
      var data = {
        eventId: _this.eventId
      }
      var obj = {
        type: 'post',
        data: data,
        url: '/bettingoffer/getEuropeListByEventId',
        success: function (data) {
          _this.flag = false;
          //console.log(data);
          if (data.code == 200) {
            _this.euro_odd_list = data.body
          }
          setTimeout(function () {
            if (_this.AhFlag) {
              _this.getAhOddList();
            }
            if (_this.OuFlag) {
              _this.getOverUnderOddList();
            }
          }, 120);
        },
        error: function (res) {
          //console.log(res);
          _this.flag = false;
        }
      }
      this.base.callCommonApi(obj)
    },
    // 获取亚盘赔率相关数据
    getAhOddList: function () {
      var _this = this;
      _this.AhFlag = false;
      var data = {
        eventId: _this.eventId
      }
      var obj = {
        type: 'post',
        data: data,
        url: '/bettingoffer/getAhListByEventId',
        success: function (data) {
          //console.log(data)
          _this.flag = false;
          if (data.code == 200) {
            _this.Ah_odd_list = data.body
            //console.log(_this.Ah_odd_list)
          } else {
            //console.log(data.msg)
          }
        },
        error: function (res) {
          _this.flag = false;
          //console.log(res);
        }
      }
      this.base.callCommonApi(obj)
    },
    //获取大小盘相关数据
    getOverUnderOddList: function () {
      var _this = this;
      _this.OuFlag = false;
      var data = {
        eventId: _this.eventId
      }
      var obj = {
        type: 'post',
        data: data,
        url: '/bettingoffer/getOverUnderListByEventId',
        success: function (data) {
          _this.flag = false;
          if (data.code == 200) {
            _this.Over_Under_list = data.body
          } else {
            //console.log(data.msg)
          }
        },
        error: function (res) {
          //console.log(res);
          _this.flag = false;
        }
      }
      this.base.callCommonApi(obj)
    },
    // 缩写足球联赛
    getShortName: function (item) {
      if (item.leagueName) {
        if (item.leagueName.indexOf("足球") != -1 && item.leagueName.indexOf("级联赛") != -1) {
          item.leagueName = item.leagueName[0] + item.leagueName[item.leagueName.indexOf("级联赛") - 1]
          return;
        }
        if (item.leagueName.indexOf("联赛杯") != -1) {
          item.leagueName = item.leagueName[0] + "联杯";
          return;
        }
        if (item.leagueName.indexOf("冠军联赛") != -1) {
          item.leagueName = item.leagueName[0] + "冠";
          return;
        }
        if (item.leagueName.indexOf("锦标赛") != -1) {
          item.leagueName = item.leagueName[0] + "锦";
          return;
        }
      } else {
        item.leagueName = '未知'
      }
    },
    changeOddTab: function (key) {
      var _this = this;
      for (var keys in this.odd_tab) {
        this.odd_tab[keys] = false;
      }
      this.odd_tab[key] = true;
      switch (key) {
        case 'pre_eu':
          localStorage.setItem('odds_type', 'euro');
          break;
        case 'pre_ah':
          localStorage.setItem('odds_type', 'ah');
          if (this.Ah_is_loading && this.AhFlag) {
            this.Ah_is_loading = false;
            this.flag = true;
            setTimeout(function () {
              _this.getAhOddList();
            }, 50);
          }
          break;
        case 'pre_ou':
          localStorage.setItem('odds_type', 'over_down');
          if (this.Ou_is_loading && this.OuFlag) {
            this.Ou_is_loading = false;
            this.flag = true;
            this.is_onload = true; setTimeout(function () {
              _this.getOverUnderOddList();
            }, 50);
          }
        default:
          break;
      }
    }
  },

	watch: {
		// 当赔率模块的选项卡切换时请求对应的数据
		peilv_manager: function (val) {
			var _this = this;
			switch (val) {
				case 0:
					this.pre_eu = true;
					this.pre_ah = false;
					this.pre_ou = false;
					localStorage.setItem('odds_type', 'euro');
					break;
				case 1:
					this.pre_eu = false;
					this.pre_ah = true;
					this.pre_ou = false;
					//console.log(this.pre_ah)
					localStorage.setItem('odds_type', 'ah');
					if (this.Ah_is_loading) {
						this.Ah_is_loading = false;
						this.flag = true;
						setTimeout(function () {
							_this.getAhOddList();
						}, 50);
					}
					break;
				case 2:
					this.pre_eu = false;
					this.pre_ah = false;
					this.pre_ou = true;
					localStorage.setItem('odds_type', 'over_down');
					if (this.Ou_is_loading) {
						this.Ou_is_loading = false;
						this.flag = true;
						this.is_onload = true; setTimeout(function () {
							_this.getOverUnderOddList();
						}, 50);
					}
				default:
					break;
			}
    },
    $route(to, from) {
      if(to.name=="detail"){
        this.initData()
      }
    }
	}
};
