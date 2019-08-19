export default{
  name: "basketDetail",
    data(){
      return {
      // 主客队球队信息切换
      home_away_toggle: {
        home: true,
        away: false
      },
      // 赔率信息切换
      odd_type_toggle: {
        sf: true,
        rf: false,
        dxf: false
      },
      // 导航栏切换
      nav_bar_toggle: {
        game: true,
        military: false,
        team: false,
        odds: false,
      },
      military_loading: true,
      team_loading: true,
      odds_loading: true,
      // 赛事基本信息
      gameBasicInfo: {},
      gameEmpty: true,
      // 主客队球员技术统计
      home_play: [],
      visiting_play: [],
      playEmpty: true,
      // 主客队技术统计
      home_tec: {},
      visiting_tec: {},
      tecEmpty: true,
      // 主客队排名
      home_rank: [],
      away_rank: [],
      // 主客队常规阵容
      homeMap: [],
      visitingMap: [],
      // 主客队战绩
      home_grade: {},
      visiting_grade: {},
      match_id: '',
      // 胜负,让分胜负,大小分赔率数组
      sf_store: [],
      rf_store: [],
      ou_store: [],
      sf_loading: false,
      rf_loading: false,
      ou_loading: false,
      flag: true,
      // 主客队ID
      homeId: '',
      awayId: '',
      // 战绩相关数据
      homeRecentlyRecordList: [],
      visitingRecentlyRecordList: [],
      recentHistoryList: [],
      history_win: 0,
      history_lose: 0,
      history_total: 0,
      history_gap: 0,
      home_win: 0,
      home_lose: 0,
      home_total: 0,
      home_gap: 0,
      away_win: 0,
      away_lose: 0,
      away_total: 0,
      away_gap: 0,
      // 主客队排名胜率
      home_rate: 1,
      away_rate: 1,
      rank_home_win: 0,
      rank_home_lose: 0,
      rank_away_win: 0,
      rank_away_lose: 0,
      away_team_log: 'static/images/basket.png',
      home_team_log: 'static/images/basket.png',
      eventDetails:"",
    }
  },
  created:function(){
    this.initData();
  },
  mounted:function(){
    this.initDom();
  },
  methods: {
    initData:function(){
      Object.assign(this.$data, this.$options.data())
      var _this = this;
      this.match_id = localStorage.getItem("basketMatchId");
      localStorage.removeItem("basketMatchId");
      _this.getBasketballMatchData();
      setTimeout(function () {
        _this.getGameInfo();
      }, 50);
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
      $(".main.tab_switch li").click(function () {
        $(this).addClass("active").siblings("li").removeClass("active");
        $(".main.inner_box").animate({ left: -($(this).index() * $(".tab_body").width()) })
      })
      $(".player .tab_switch li").click(function () {
        $(this).addClass("active").siblings("li").removeClass("active");
        $(".player .inner_box").animate({ left: -($(this).index() * $(".tab_body").width()) })
      })
      $(".item-top").on("click", function () {
        $(this).next().stop().slideToggle();
        $(this).find("img").toggleClass("rote");
      })
      $(".goBack").on("click", function () {
        localStorage.removeItem("matchId");
      })
    },
    //获取篮球主客队的信息
    getBasketballMatchData: function () {
      var _this = this,
        obj = {
          url: "/commonAPI/basketball/getBasketballMatchData",
          type: 'post',
          data: {
            match_id: _this.match_id,
            //                  isWhite:"true"
            // match_id: '661795'
          },
          success: function (data) {
            if (data.code == 200) {
              _this.gameBasicInfo = data.body || {}
              if (JSON.stringify(_this.gameBasicInfo) == "{}") {

              } else {
                _this.gameEmpty = false;
                if (_this.gameBasicInfo.away_team_log && _this.gameBasicInfo.home_team_log) {
                  _this.away_team_log = _this.gameBasicInfo.away_team_log;
                  _this.home_team_log = _this.gameBasicInfo.home_team_log;
                }
                var tempflag = _this.gameBasicInfo.startdate.substr(6, 11).split("-")[0]
                if (tempflag < 10) {
                  _this.gameBasicInfo.startdate = _this.gameBasicInfo.startdate.substr(6, 10)
                } else {
                  _this.gameBasicInfo.startdate = _this.gameBasicInfo.startdate.substr(6, 11)
                }
                _this.homeId = _this.gameBasicInfo.home_id;
                _this.awayId = _this.gameBasicInfo.visiting_id;
                _this.getTeamRank();
                _this.getTeamRcord();

              }
            }
          },
        }

      this.base.callCommonApi(obj);
    },
    //改变工具栏的切换状态,篮球主客队信息和赔率信息切换
    changToolStatus: function (tool, keys) {
      for (var key in this[tool]) {
        this[tool][key] = false;
      }
      this[tool][keys] = true;
    },
    // 主接口查询基本赛事数据
    getGameInfo: function () {
      var _this = this;
      var obj = {
        url: '/commonAPI/basketball/selectBasketballMatchData',
        type: 'post',
        data: {
          match_id: _this.match_id
          // match_id: '661795'
        },
        success: function (data) {
          if (data.code == 200) {
            _this.flag = false;
            _this.eventDetails = data.body.eventDetails || {}
            if (JSON.stringify(_this.eventDetails) == "{}") {

            } else {
              var detailsList = ["home_overtime_one_score", "home_overtime_two_score", "home_overtime_three_score", "home_overtime_four_score"];
              _this.eventDetails.home_overtime_score = 0;
              detailsList.map(function (item) {
                if (_this.eventDetails[item]) {
                  _this.eventDetails.home_overtime_score += parseFloat(_this.eventDetails[item]);
                }
              })

              detailsList = ["visiting_overtime_one_score", "visiting_overtime_two_score", "visiting_overtime_three_score", "visiting_overtime_four_score"];
              _this.eventDetails.visiting_overtime_score = 0;
              detailsList.map(function (item) {
                if (_this.eventDetails[item]) {
                  _this.eventDetails.visiting_overtime_score += parseFloat(_this.eventDetails[item]);
                }
              })

            }
            //                          _this.gameEmpty=false;
            //                          if (_this.gameBasicInfo.away_team_log && _this.gameBasicInfo.home_team_log){
            //                              _this.away_team_log = _this.gameBasicInfo.away_team_log;
            //                              _this.home_team_log = _this.gameBasicInfo.home_team_log;
            //                          }
            //                          _this.gameBasicInfo.home_overtime_score = 0 - _this.gameBasicInfo.home_overtime_one_score ? _this.gameBasicInfo.home_overtime_one_score : 0;
            //                          _this.gameBasicInfo.home_overtime_score = _this.gameBasicInfo.home_overtime_score - _this.gameBasicInfo.home_overtime_two_score ? _this.gameBasicInfo.home_overtime_two_score : 0;
            //                          _this.gameBasicInfo.home_overtime_score = _this.gameBasicInfo.home_overtime_score - _this.gameBasicInfo.home_overtime_three_score ? _this.gameBasicInfo.home_overtime_three_score : 0;
            //                          _this.gameBasicInfo.home_overtime_score = _this.gameBasicInfo.home_overtime_score - _this.gameBasicInfo.home_overtime_four_score ? _this.gameBasicInfo.home_overtime_four_score : 0;
            //                          _this.gameBasicInfo.home_overtime_score = 0 - _this.gameBasicInfo.home_overtime_score;
            //                          _this.gameBasicInfo.visiting_overtime_score = 0 - _this.gameBasicInfo.visiting_overtime_one_score ? _this.gameBasicInfo.visiting_overtime_one_score : 0;
            //                          _this.gameBasicInfo.visiting_overtime_score = _this.gameBasicInfo.visiting_overtime_score - _this.gameBasicInfo.visiting_overtime_two_score ? _this.gameBasicInfo.visiting_overtime_two_score : 0;
            //                          _this.gameBasicInfo.visiting_overtime_score = _this.gameBasicInfo.visiting_overtime_score - _this.gameBasicInfo.visiting_overtime_three_score ? _this.gameBasicInfo.visiting_overtime_three_score : 0;
            //                          _this.gameBasicInfo.visiting_overtime_score = _this.gameBasicInfo.visiting_overtime_score - _this.gameBasicInfo.visiting_overtime_four_score ? _this.gameBasicInfo.visiting_overtime_four_score : 0;
            //                          _this.gameBasicInfo.visiting_overtime_score = 0 - _this.gameBasicInfo.visiting_overtime_score;
            //                          var tempflag = _this.gameBasicInfo.startdate.substr(6, 11).split("-")[0]
            //                          if (tempflag < 10) {
            //                              _this.gameBasicInfo.startdate = _this.gameBasicInfo.startdate.substr(6, 10)
            //                          }else{
            //                              _this.gameBasicInfo.startdate = _this.gameBasicInfo.startdate.substr(6, 11)
            //                          }
            //                          _this.homeId = _this.gameBasicInfo.home_id;
            //                          _this.awayId = _this.gameBasicInfo.visiting_id;
            //                          _this.getTeamRank();
            //                          _this.getTeamRcord();
            //
            //                      }
            _this.home_play = data.body.home_play || [];
            _this.visiting_play = data.body.visiting_play || []
            if (_this.home_play.length && _this.visiting_play.length) {
              _this.playEmpty = false;
            }
            _this.home_tec = data.body.homeTechnicalStatistics || {};
            _this.visiting_tec = data.body.visitingTechnicalStatistics || {};
            if (!(JSON.stringify(_this.home_tec) == "{}") && !(JSON.stringify(_this.visiting_tec) == "{}")) {
              _this.tecEmpty = false;
            }
          } else {
            _this.flag = false;
          }
        },
        error: function (res) {

        }
      }
      this.base.callCommonApi(obj);
    },
    // 获取主客队的排名信息
    getTeamRank: function () {
      var _this = this;
      var obj = {
        url: '/commonAPI/basketball/selectBasketballTeam',
        type: 'post',
        data: {
          // matchId: '661795'
          matchId: _this.match_id
        },
        success: function (data) {
          if (data.code == 200) {
            _this.flag = false;
            _this.home_rank = data.body.homeIntegralList || [];
            _this.home_rank.map(function (item) {
              if (item.cn_name == _this.gameBasicInfo.home_name_sc) {
                _this.home_rate = item.ztsl || "0%";
                _this.rank_home_win = item.zts || 0;
                _this.rank_home_lose = item.ztf || 0;
              }
            })
            _this.away_rank = data.body.visitingIntegralList || [];
            _this.away_rank.map(function (item) {
              if (item.cn_name == _this.gameBasicInfo.visiting_name_sc) {
                _this.away_rate = item.ztsl || "0%";
                _this.rank_away_win = item.zts || 0;
                _this.rank_away_lose = item.ztf || 0;
              }
            })
            _this.homeMap = data.body.homeMap || [];
            _this.visitingMap = data.body.visitingMap || [];
          } else {
            _this.flag = false;
          }
        },
        error: function (res) {

        }
      }
      this.base.callCommonApi(obj);
    },
    // 获取篮球的赔率信息
    getBasketOddDatas: function (type, ele, eventId) {
      var _this = this;
      var obj = {
        url: '/commonAPI/basketball/' + type,
        type: 'post',
        data: {
          eventId: eventId
        },
        success: function (data) {
          if (data.code == 200) {
            _this[ele] = data.body;
            //console.log(_this[ele]);
            _this.flag = false;
          } else {
            _this.flag = false;
          }
        },
        error: function (res) {

        }
      }
      this.base.callCommonApi(obj);
    },
    // 获取球队战绩
    // 获取球队战绩
    getTeamRcord: function () {
      var _this = this;
      _this.homeId = 14029;
      _this.awayId = 14056;
      var homeTotal = 0, awayTotal = 0,
        gameTotal = 0, index = 0;
      var obj = {
        // url: '/commonAPI/detail/getBasketballMatchRecordList/' + 14029 + '/' + 14056,
        url: '/commonAPI/detail/getBasketballMatchRecordList/' + _this.gameBasicInfo.home_id + '/' + _this.gameBasicInfo.visiting_id,
        type: 'post',
        data: {
        },
        success: function (data) {
          // _this.gameBasicInfo.visiting_name_sc ='莫斯科中央陆军'
          // _this.gameBasicInfo.home_name_sc ='埃菲斯阿纳多卢'
          if (data.code == 200) {
            _this.flag = false;
            _this.homeRecentlyRecordList = data.body.homeRecentRecordList || [];

            _this.homeRecentlyRecordList.map(function (item) {
              if (_this.gameBasicInfo.home_id == item.homeTeamId) {
                if (item.matchResult == 0) {
                  _this.home_lose++
                  item.isWinLost = "负"
                } else {
                  _this.home_win++
                  item.isWinLost = "胜"
                }
              } else {
                if (item.matchResult == 0) {
                  _this.home_win++
                  item.isWinLost = "胜"
                } else {
                  _this.home_lose++
                  item.isWinLost = "负"
                }
              }
              if (item.matchResult == 0) {
                homeTotal += item.awayGoal;
                awayTotal += item.homeGoal;
                gameTotal += item.scoreSum;
                index++;
              } else {
                homeTotal += item.homeGoal;
                awayTotal += item.awayGoal;
                gameTotal += item.scoreSum;
                index++;
              }
            })
            _this.home_total = (gameTotal / index).toFixed(2);
            _this.home_gap = ((homeTotal - awayTotal) / index).toFixed(2);
            homeTotal = 0;
            awayTotal = 0;
            gameTotal = 0;
            index = 0;
            _this.visitingRecentlyRecordList = data.body.awayRecentRecordList || [];
            _this.visitingRecentlyRecordList.map(function (item) {
              if (_this.gameBasicInfo.home_id == item.homeTeamId) {
                if (item.matchResult == 0) {
                  _this.away_lose++
                  item.isWinLost = "负"
                } else {
                  _this.away_win++
                  item.isWinLost = "胜"
                }

              } else {
                if (item.matchResult == 0) {
                  _this.away_win++
                  item.isWinLost = "胜"
                } else {
                  _this.away_lose++
                  item.isWinLost = "负"
                }
              }
              if (item.matchResult == 0) {
                homeTotal += item.awayGoal;
                awayTotal += item.homeGoal;
                gameTotal += item.scoreSum;
                index++;
              } else {
                homeTotal += item.homeGoal;
                awayTotal += item.awayGoal;
                gameTotal += item.scoreSum;
                index++;
              }
            })
            _this.away_total = (gameTotal / index).toFixed(2);
            _this.away_gap = ((homeTotal - awayTotal) / index).toFixed(2);
            homeTotal = 0;
            awayTotal = 0;
            gameTotal = 0;
            index = 0;
            _this.recentHistoryList = data.body.recentHistoryList || [];
            _this.recentHistoryList.map(function (item) {
              if (_this.gameBasicInfo.home_id == item.homeTeamId) {
                if (item.matchResult == 0) {
                  _this.history_lose++
                  item.isWinLost = "负"
                } else {
                  _this.history_win++
                  item.isWinLost = "胜"
                }

              } else {
                if (item.matchResult == 0) {
                  _this.history_win++
                  item.isWinLost = "胜"
                } else {
                  _this.history_lose++
                  item.isWinLost = "负"
                }
              }
              if (item.matchResult == 0) {
                homeTotal += item.awayGoal;
                awayTotal += item.homeGoal;
                gameTotal += item.scoreSum;
                index++;
              } else {
                homeTotal += item.homeGoal;
                awayTotal += item.awayGoal;
                gameTotal += item.scoreSum;
                index++;
              }
            })
            _this.history_total = (gameTotal / index).toFixed(2);
            _this.history_gap = ((homeTotal - awayTotal) / index).toFixed(2);
          } else {
            _this.flag = false;
          }
        },
        error: function (res) {

        }
      }
      this.base.callCommonApi(obj);
    }
  },
  watch: {
    odd_type_toggle: {
      deep: true,
      handler: function () {
        var _this = this;
        // for (var key in this.odd_type_toggle){
        //     if(this.odd_type_toggle[key]){
        //         switch (key) {
        //             case 'sf':
        //                 break;
        //             case 'rf':
        //                 if(!_this.sf_loading){
        //                     _this.sf_loading=true;
        //                     this.flag = true;
        //                     setTimeout(function () {
        //                         // _this.getBasketOddDatas('findEventAnOddsInfo', 'rf_store', _this.match_id);
        //                     }, 30);
        //                 }
        //                 break;
        //             case 'dxf':
        //                 if(!_this.ou_loading){
        //                     _this.ou_loading=true;
        //                     this.flag = true;
        //                     setTimeout(function () {
        //                         // _this.getBasketOddDatas('findEventOuOddsInfo', 'ou_store', _this.match_id)
        //                     }, 30);
        //                 }
        //                 break;
        //             default:
        //                 break;
        //         }
        //     }
        // }
      }
    },
    nav_bar_toggle: {
      deep: true,
      handler: function () {
        var _this = this;
        for (var key in this.nav_bar_toggle) {
          if (this.nav_bar_toggle[key]) {
            switch (key) {
              case 'game':
                break;
              case 'military':
                if (_this.odds_loading) {
                  setTimeout(function () {
                    // _this.odds_loading = false;
                    // _this.flag = true;
                    setTimeout(function () {
                      // _this.getTeamRcord();
                    }, 50);
                  }, 30);
                }
                break;
              case 'team':
                if (_this.team_loading) {
                  setTimeout(function () {
                    // _this.team_loading = false;
                    // _this.flag = true;
                    setTimeout(function () {
                      // _this.getTeamRank();
                    }, 50);
                  }, 30);
                }
                break;
              case 'odds':
                if (_this.odds_loading) {
                  setTimeout(function () {
                    _this.odds_loading = false;
                    _this.flag = true;
                    setTimeout(function () {
                      _this.getBasketOddDatas('findEventEpOddsInfo', 'sf_store', _this.match_id);
                      _this.getBasketOddDatas('findEventAnOddsInfo', 'rf_store', _this.match_id);
                      _this.getBasketOddDatas('findEventOuOddsInfo', 'ou_store', _this.match_id)
                    }, 50);
                  }, 30);
                }
                break;
              default:
                break;
            }
          }
        }
      }
    },
    $route(to,from){
      if(to.name=="basketDetail"){
        this.initData();
      }
    }
  }
}
