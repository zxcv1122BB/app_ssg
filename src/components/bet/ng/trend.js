

//数据交互
export default {
  name: 'trend',
  data() {
    return {
      Alltitle: ["基本走势", "定位胆", "特码", "和值走势"],
      title: "基本走势", //选择
      datas: [], //数据
      mes: [],
      chartId: localStorage.chartId, //彩票类型
      arr: [], //长度
      preventBanner: '', //最新期数
      courtDown: '', //最新期倒计时
      lastTime: '',	//开奖时间
      deadlineTiming: '',//清除定时用
      luck_number: [],//历史开奖
      canvas_num: [],
      issue: [],//
      numIndex: 1,
      clickIndex: 1,
      classId:1,

      trendNum:{
        ssc:-1
      }

    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.chartId = localStorage.chartId;
      vm.getdatas(1, 0, 0);
      vm.selectType(0, 1, 0);
      vm.initDom();
      vm.getBetsBannerInfo();

    });
  },
  created: function () {
    // this.getdatas(1, 0, 0);
  },
  mounted: function () {
    // this.selectType(0,1, 0);
    this.initDom();
    // this.getBetsBannerInfo();

    // this.canvas();
    $("#article0").css({
      height:$("#container").height()-$(".fixed_bottom").height() + "px"
    })
    $("#article1").css({
      height:$("#container").height()- $("#header").height()-$(".fixed_bottom").height() + "px"
    })


    this.init_trendNum();
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
    init_trendNum(){
      if( this.szcIdList){
        var ssc_nl = this.szcIdList.gameIdList['ssc'].split(',');
        // ssc_nl
        if(ssc_nl.indexOf(this.chartId)!=-1||ssc_nl.indexOf(parseInt(this.chartId))!=-1){
          this.trendNum.ssc=1;
          this.$set(this.trendNum,'ssc',1);
        }else{
          this.trendNum.ssc=-1;
          this.$set(this.trendNum,'ssc',-1);
        }
      }else{
        this.trendNum.ssc=-1;
        this.$set(this.trendNum,'ssc',-1);
      }
    },
    goback_click: function () {
      this.$router.back(-1);
    },

    canvasFn: function () {

      var h = $('#testtd').height();
      var w = $('#testtd').width();
      var c = document.getElementById("myCanvas");
      c.width = w - 20;
      c.height = h + 20;
      var table1 = document.getElementById("testtd");
      var TRS = table1.getElementsByTagName("tr");
      var cxt2 = c.getContext("2d");
      //	c.height = c.height;
      $('.dingweiDan td').removeClass('guessYes');
      if(this.classId==1){
      	cxt2.strokeStyle = "#d71a20"; //颜色
      }else if(this.classId==2){
      	cxt2.strokeStyle = "#0000fa"; //颜色
      }else if(this.classId==3){
      	cxt2.strokeStyle = "#ca4e97"; //颜色
      }else if(this.classId==4){
      	cxt2.strokeStyle = "#df7f4a"; //颜色
      }else if(this.classId==5){
      	cxt2.strokeStyle = "#96c832"; //颜色
      }

      // cxt2.fillStyle = "#FF0000";
      // cxt.fillRect(0, 0, 150, 75);
      var icount = 0; //计数

      var countNum = []; //出现次数
      var missMax = []; //最大遗漏

      var avg = []; //平均遗漏
      var avgMax = []; //平均*最大遗漏
      var TDS = [];


      var lineOut = []; //最大*连出
      var lineOutMax = []; //最大连出
      // alert()
      for (var i = 0; i < TRS.length; i++) {
        TDS = TRS[i].getElementsByTagName("td");
        for (var j = 0; j < TDS.length; j++) {

          //初始化
          if (countNum[j] == undefined) {
            countNum[j] = 0;
          }
          if (missMax[j] == undefined) {
            missMax[j] = 0;
          }
          if (avg[j] == undefined) {
            avg[j] = 0;
          }
          if (avgMax[j] == undefined) {
            avgMax[j] = 0;
          }
          if (lineOut[j] == undefined) {
            lineOut[j] = 0;
          }
          if (lineOutMax[j] == undefined) {
            lineOutMax[j] = 0;
          }
          //平均最大遗漏
          if (parseInt(TDS[j].innerHTML) > parseInt(avgMax[j])) {
            avgMax[j] = TDS[j].innerHTML;
          }

          //计算最大遗漏
          if (parseInt(TDS[j].innerHTML) > parseInt(missMax[j])) {
            missMax[j] = TDS[j].innerHTML;
          }



          //画线
          if (TDS[j].innerHTML == '0') {

            // console.log(this.canvas_num[i]);

            //				//console.log(TDS[j].innerHTML)
            if (localStorage.chartId == 8 || localStorage.chartId == 7 || localStorage.chartId == 16 || localStorage.chartId == 17 || localStorage.chartId == 18 || localStorage.chartId == 15) {
              $('#testtd tr').eq(i).children('td').eq(this.canvas_num[i]).addClass('guessYes'+this.classId);
              $('#testtd tr').eq(i).children('td').eq(this.canvas_num[i]).text(this.canvas_num[i]);
            } else if ( localStorage.chartId == 5 || localStorage.chartId == 19 || localStorage.chartId == 6 || localStorage.chartId == 13 || localStorage.chartId == 14 || localStorage.chartId == 12 || localStorage.chartId == 38) {
              $('#testtd tr').eq(i).children('td').eq(this.canvas_num[i]).next('td').addClass('guessYes'+this.classId);
              $('#testtd tr').eq(i).children('td').eq(this.canvas_num[i]).next('td').text(this.canvas_num[i]);
            } else if (localStorage.chartId == 9||localStorage.chartId == 40||localStorage.chartId == 41) {
              $('#testtd tr').eq(i).children('td').eq(this.canvas_num[i]).next('td').next('td').addClass('guessYes'+this.classId);
              $('#testtd tr').eq(i).children('td').eq(this.canvas_num[i]).next('td').next('td').text(this.canvas_num[i]);
            } else if (localStorage.chartId == 11 || (localStorage.chartId >= 20 && localStorage.chartId <= 25)) {
              $('#testtd tr').eq(i).children('td').eq(this.canvas_num[i] - 1).addClass('guessYes'+this.classId);
              $('#testtd tr').eq(i).children('td').eq(this.canvas_num[i] - 1).text(this.canvas_num[i]);
            }else if( localStorage.chartId >= 42){
              $('#testtd tr').eq(i).children('td').eq(this.canvas_num[i]).next('td').addClass('guessYes'+this.classId);
              $('#testtd tr').eq(i).children('td').eq(this.canvas_num[i]).next('td').text(this.canvas_num[i]);
            
            }
            var He = TDS[j].offsetHeight / 2;
            var We = TDS[j].offsetWidth / 2;
            if (icount == 0) {
              cxt2.moveTo(TDS[j].offsetLeft + We, TDS[j].offsetTop + He);
            } else {
              cxt2.lineTo(TDS[j].offsetLeft + We, TDS[j].offsetTop + He);
            }
            icount = icount + 1;
            countNum[j] = countNum[j] + 1; //计算出现次数

            //计算平均遗漏
            avg[j] = parseInt(avg[j]) + parseInt(avgMax[j]);
            avgMax[j] = 0;

            //计算连出
            lineOut[j] = lineOutMax[j] + 1;
          } else {
            lineOutMax[j] = 0;
          }
          if (i == TRS.length - 1) {
            avg[j] = parseInt(avg[j]) + parseInt(avgMax[j]);
          }

        }
        cxt2.stroke();
      }
      //	//console.log(lineOut);

      //统计
      for (var i = 1; i < TDS.length; i++) {
        if (localStorage.chartId == 9 || localStorage.chartId == 11 ||localStorage.chartId == 40||localStorage.chartId == 41|| (localStorage.chartId >= 20 && localStorage.chartId <= 25)) {
          $('#count' + this.numIndex).children('td').eq(i).html(countNum[i + 1]);
          $('#avg' + this.numIndex).children('td').eq(i).html(parseInt(avg[i + 1] / (countNum[i] + 2)));
          $('#missMax' + this.numIndex).children('td').eq(i).html(missMax[i + 1]);
          $('#lineOut' + this.numIndex).children('td').eq(i).html(lineOut[i + 1]);
        } else {
          $('#count' + this.numIndex).children('td').eq(i).html(countNum[i]);
          $('#avg' + this.numIndex).children('td').eq(i).html(parseInt(avg[i] / (countNum[i] + 1)));
          $('#missMax' + this.numIndex).children('td').eq(i).html(missMax[i]);
          $('#lineOut' + this.numIndex).children('td').eq(i).html(lineOut[i]);
        }
      }
    },
    initDom: function () {
      var h = $(window).height() + 'px';
      var w = $(window).width() + 'px';
      $('.mask').css({ width: w, height: h, background: "rgba(0, 0, 0, 0.4)", position: "fixed", top: "0", left: "0", });
      $('.play_menu').css({ width: w, height: h, top: "2.88rem", left: "0", });
      var flag;
      // 点击遮罩隐藏玩法说明弹出层
      $("body").on("click", ".mask.help", function () {
        $(".mask").css({ display: "none" });
      });
      // 点击玩法帮助弹出玩法说明界面
      $("body").on("click", ".help_btn span", function () {
        $(".mask.help").css({ display: "block" });
      });
      // 点击玩法按钮
      $('.play_head li').removeClass("active").siblings('li:first-child').addClass('active');
      $(".play_head li").click(function () {
        $(this).addClass("active").siblings("li").removeClass("active");
        $(".play_menu").css({ display: "none" });
        flag = false;
      });
      $('.play_menu').click(function () {
        $(".play_menu").css({ display: "none" });
        flag = false;
      });
      //
      $("span.btn").click(function () {
        if (!flag) {
          $(".play_menu").css({ display: "block" });
          flag = true;
        } else {
          $(".play_menu").css({ display: "none" });
          flag = false;
        }

      });
    },
    //数据加载
    getdatas: function (index, num, title) {
      var _this = this;
      _this.selectType(num, index, title);
      var avg = []; //平均遗漏数
      if(index<6){
      	_this.classId = index;
      }else{
      	_this.classId = index-5;
      }
      _this.canvas_num.length = 0;
      _this.issue.length = 0;
      _this.numIndex = num;
      _this.datas = [];
      _this.mes = [];
      var obj = {
        type: 'post',
        data: {
          one_type_id: _this.chartId,
          count: 30
        },
        dataType: 'json',
        url: '/commonAPI/hisOpenData',
        success: function (data) {
          if (data.code == 200) {

            _this.datas = data.body;
            _this.arr = [];
            if (_this.chartId == 9||_this.chartId == 40||_this.chartId == 41) {
              _this.arr = new Array(28);
              $("#article1 .dingweiDan").css("width", "200%");
            } else if (_this.chartId == 11 || (_this.chartId >= 20 && _this.chartId <= 25)) {
              _this.arr = new Array(16);
              $("#article1 .dingweiDan").css("width", "200%");
            } else {
              _this.arr = new Array(10);
              $("#article1 .dingweiDan").css("width", "150%");
            }
            if (_this.chartId == 7 || _this.chartId == 16 || _this.chartId == 17 || _this.chartId == 18) {
              _this.arr = new Array(11);
              $("#article0 .dingweiDan").css("width", "150%");
            }
            // if (_this.chartId == 8 || _this.chartId == 15) {
            //   $('.dingweiDan').css('margin-bottom', '7.5rem');
            // } else {
            //   $('.dingweiDan').css('margin-bottom', '5.2rem');
            // }
            for (var i = 0; i < _this.datas.length; i++) {
              //							//console.log(_this.datas[i].data_str)
              if (_this.datas[i].dwd) {
                _this.mes = _this.datas[i].dwd.split('#', index); //个、十、百位
              }
              _this.luck_number = _this.datas[i].luck_number.split(',', index); //个、十、百位中奖号码
              var all_luckNum = _this.datas[i].luck_number.split(','); //所有中奖号码
              //北京28
              if (_this.chartId == 9||_this.chartId == 40||_this.chartId == 41) {
                _this.datas[i].bjluckNum = 0;
                _this.datas[i].bjluck = all_luckNum.join("+");
                for (var b = 0; b < all_luckNum.length; b++) {
                  _this.datas[i].bjluckNum = parseInt(_this.datas[i].bjluckNum) + parseInt(all_luckNum[b]);
                }
                var bjluckNum = _this.datas[i].bjluckNum
              }
              var nary = all_luckNum;
              var biao = 0;
              _this.datas[i].total = 0; //中奖号码和值
              for (var x = 0; x < all_luckNum.length; x++) {
                //计算和值
                _this.datas[i].total = _this.datas[i].total + parseInt(all_luckNum[x]);
              }
              //计算跨度
              _this.datas[i].difference = parseInt(Math.max.apply(null, all_luckNum)) - parseInt(Math.min.apply(null, all_luckNum));
              var x = 0;
              //计算基本走势
              if (num == 0) {
                if (biao == 0) {
                  if (_this.chartId == 5 || _this.chartId == 19||_this.chartId==38) {
                    if (nary[x] == nary[x + 1] && nary[x + 1] == nary[x + 2]) {
                      _this.datas[i].shape = '豹子';
                    } else if (nary[x] == nary[x + 1] || nary[x + 1] == nary[x + 2] || nary[x] == nary[x + 2]) {
                      _this.datas[i].shape = '组三';
                    } else {
                      _this.datas[i].shape = '组六';
                    }
                  // } else if (_this.chartId == 6 || _this.chartId == 13 || _this.chartId == 14) {
                  }else if(_this.trendNum.ssc==1){
                    if (nary[x] == nary[x + 1] && nary[x + 1] == nary[x + 2]) {
                      _this.datas[i].shape = '豹子';
                    } else if (nary[x] == nary[x + 1] || nary[x + 1] == nary[x + 2] || nary[x] == nary[x + 2]) {
                      _this.datas[i].shape = '组三';
                    } else if (nary[x] != nary[x + 1] && nary[x + 1] != nary[x + 2] && nary[x] != nary[x + 2]) {
                      _this.datas[i].shape = '组六';
                    }
                    if (nary[x + 1] == nary[x + 2] && nary[x + 2] == nary[x + 3]) {
                      _this.datas[i].shape1 = '豹子';
                    } else if (nary[x + 1] == nary[x + 2] || nary[x + 2] == nary[x + 3] || nary[x + 1] == nary[x + 3]) {
                      _this.datas[i].shape1 = '组三';
                    } else if (nary[x + 1] != nary[x + 2] && nary[x + 2] != nary[x + 3] && nary[x + 1] != nary[x + 3]) {
                      _this.datas[i].shape1 = '组六';
                    }
                    if (nary[x + 2] == nary[x + 3] && nary[x + 3] == nary[x + 4]) {
                      _this.datas[i].shape2 = '豹子';
                    } else if (nary[x + 2] == nary[x + 3] || nary[x + 3] == nary[x + 4] || nary[x + 2] == nary[x + 4]) {
                      _this.datas[i].shape2 = '组三';
                    } else if (nary[x + 2] != nary[x + 3] && nary[x + 3] != nary[x + 4] && nary[x + 2] != nary[x + 4]) {
                      _this.datas[i].shape2 = '组六';
                    }
                  } else if (_this.chartId == 8 || _this.chartId == 15) {
                    _this.datas[i].shape = parseInt(nary[x]) + parseInt(nary[x + 1]);
                  } else if (_this.chartId == 9||_this.chartId == 40||_this.chartId == 41) {
                    //判断大小
                    if (_this.datas[i].bjluckNum <= 5) {
                      _this.datas[i].shape = '极小'
                    } else if (_this.datas[i].bjluckNum <= 13) {
                      _this.datas[i].shape = '小'
                    } else if (_this.datas[i].bjluckNum <= 22) {
                      _this.datas[i].shape = '大'
                    } else if (_this.datas[i].bjluckNum <= 27) {
                      _this.datas[i].shape = '极大'
                    }
                    if (_this.datas[i].bjluckNum <= 5) {
                      _this.datas[i].shape = '极小'
                    }
                    //判断单双
                    var b = _this.datas[i].bjluckNum % 2;
                    if (b == 0) {
                      _this.datas[i].shape = _this.datas[i].shape + "双";
                    } else if (b == 1) {
                      _this.datas[i].shape = _this.datas[i].shape + "单";
                    }
                    //判断波色
                    var a = _this.datas[i].bjluckNum;
                    if (a == 1 || a == 4 || a == 7 || a == 10 || a == 16 || a == 19 || a == 22 || a == 25) {
                      _this.datas[i].shape1 = "绿波";
                    } else if (a == 2 || a == 5 || a == 8 || a == 11 || a == 17 || a == 20 || a == 23 || a == 26) {
                      _this.datas[i].shape1 = "蓝波";
                    } else if (a == 3 || a == 6 || a == 9 || a == 12 || a == 15 || a == 18 || a == 21 || a == 24) {
                      _this.datas[i].shape1 = "红波";
                    } else if (a == 0 || a == 13 || a == 14 || a == 27) {
                      _this.datas[i].shape1 = "灰波";
                    }
                  } else if (_this.chartId == 11 || (_this.chartId >= 20 && _this.chartId <= 25)) {
                    if (nary[x] == nary[x + 1] && nary[x + 1] == nary[x + 2]) {
                      _this.datas[i].shape = '三同号';
                    } else if (nary[x] == nary[x + 1] || nary[x + 1] == nary[x + 2] || nary[x] == nary[x + 2]) {
                      _this.datas[i].shape = '二同号';
                    } else if (nary[x] == (nary[x + 1] - 1) && nary[x + 1] == (nary[x + 2] - 1)) {
                      _this.datas[i].shape = '三连号';
                    } else if (nary[x] != nary[x + 1] && nary[x + 1] != nary[x + 2] && nary[x] != nary[x + 2]) {
                      _this.datas[i].shape = '三不同号';
                    }
                  } else if (_this.chartId == 7 || _this.chartId == 16 || _this.chartId == 17 || _this.chartId == 18) {
                    if (_this.datas[i].total == 30) {
                      _this.datas[i].shape = "和"
                    } else if (_this.datas[i].total < 30) {
                      _this.datas[i].shape = "小"
                    } else if (_this.datas[i].total > 30) {
                      _this.datas[i].shape = "大"
                    }
                    var b = _this.datas[i].total % 2;
                    if (b == 0) {
                      _this.datas[i].shape1 = "双";
                    } else if (b == 1) {
                      _this.datas[i].shape1 = "单";
                    }
                    if (nary[x] > nary[x + 4]) {
                      _this.datas[i].shape2 = "龙";
                    } else if (nary[x] < nary[x + 4]) {
                      _this.datas[i].shape2 = "虎";
                    }
                    var left;
                    left = [parseInt(nary[x]), parseInt(nary[x + 1]), parseInt(nary[x + 2])]
                    left = left.sort();
                    if (left[x] + 1 == left[x + 1] && left[x + 1] + 1 == left[x + 2]) {
                      _this.datas[i].thr_left = "顺子";
                    } else if (left[x] + 1 == left[x + 1] || left[x + 1] + 1 == left[x + 2]) {
                      _this.datas[i].thr_left = "半顺";
                    } else if (left[x] + 1 != left[x + 1] && left[x + 1] + 1 != left[x + 2]) {
                      _this.datas[i].thr_left = "杂六";
                    }
                    left = [parseInt(nary[x + 1]), parseInt(nary[x + 2]), parseInt(nary[x + 3])]
                    left = left.sort();
                    if (left[x] + 1 == left[x + 1] && left[x + 1] + 1 == left[x + 2]) {
                      _this.datas[i].thr_center = "顺子";
                    } else if (left[x] + 1 == left[x + 1] || left[x + 1] + 1 == left[x + 2]) {
                      _this.datas[i].thr_center = "半顺";
                    } else if (left[x] + 1 != left[x + 1] && left[x + 1] + 1 != left[x + 2]) {
                      _this.datas[i].thr_center = "杂六";
                    }
                    left = [parseInt(nary[x + 2]), parseInt(nary[x + 3]), parseInt(nary[x + 4])]
                    left = left.sort();
                    if (left[x] + 1 == left[x + 1] && left[x + 1] + 1 == left[x + 2]) {
                      _this.datas[i].thr_right = "顺子";
                    } else if (left[x] + 1 == left[x + 1] || left[x + 1] + 1 == left[x + 2]) {
                      _this.datas[i].thr_right = "半顺";
                    } else if (left[x] + 1 != left[x + 1] && left[x + 1] + 1 != left[x + 2]) {
                      _this.datas[i].thr_right = "杂六";
                    }
                  }
                  biao = 1;
                }
              }
              for (var j = 0; j < _this.mes.length; j++) {
                _this.datas[i].num = _this.mes[j].split('|');
              }
              if (_this.chartId == 9||_this.chartId == 40||_this.chartId == 41) {
                _this.canvas_num.push(bjluckNum);
              } else if (_this.chartId == 11 || (_this.chartId >= 20 && _this.chartId <= 25)) {
                var totals = _this.datas[i].total;
                _this.canvas_num.push(totals);
              } else {
                _this.canvas_num.push(_this.luck_number[index - 1]); //个、十、百位中奖号码放入一个数组
              }
              _this.issue.push(_this.datas[i].issue);
            }
          } else {
            return false
          }
        },
        error: function (msg) {
          //console.log(msg);
        }
      }
      this.base.callCommonApi(obj);
    },
    // 获取当前可投注期次信息
    getBetsBannerInfo: function () {
      var _this = this,
        obj = {
          type: 'post',
          // type:'post',
          url: '/commonAPI/getIssueInfo',
          data: {
            one_type_id: _this.chartId
          },
          success: function (data) {
            if (_this.deadlineTiming) {
              window.clearInterval(_this.deadlineTiming);
              _this.deadlineTiming = "";
            }
            if (data.code == 200 && data.body) {
              //                      //console.log(data.body);
              _this.preventBanner = data.body.issue;
              _this.lastTime = _this.getMilliseconds(data.body.deadline);
              _this.startTime = _this.getMilliseconds(data.body.response_date);
              _this.setTimeFn(_this.lastTime, _this.startTime);
              _this.deadlineTiming = setInterval(function () {
                _this.startTime += 1000;
                _this.setTimeFn(_this.lastTime, _this.startTime);
              }, 1000)
            } else if (data.code == 201) {
              _this.courtDown = data.msg;
            }
          },
          error: function (res) {

          }
        };
      this.base.callCommonApi(obj);
    },
    // 获取毫秒数
    getMilliseconds: function (str) {
      str = str.replace(new RegExp("-", "gm"), "/");
      return (new Date(str)).getTime(); //得到毫秒数
    },
    // 获取倒计时字符串
    getDownTime: function (time, index) {
      var d = Math.floor(time / 1000 / 60 / 60 / 24);
      var h = Math.floor(time / 1000 / 60 / 60 % 24);
      var m = Math.floor(time / 1000 / 60 % 60);
      var s = Math.floor(time / 1000 % 60);
      var str = (h > 9 ? h : '0' + h) + ":" + (m > 9 ? m : '0' + m) + ":" + (s > 9 ? s : '0' + s);
      return str;
    },
    //倒计时及相关业务逻辑
    setTimeFn: function (lastTime, startTime) {
      var _this = this,
        deadlineT = lastTime - startTime,
        deadline_hour = _this.getzf(Math.floor(deadlineT / 1000 / 60 / 60 % 24)),
        deadline_minute = _this.getzf(Math.floor(deadlineT / 1000 / 60 % 60)),
        deadline_second = _this.getzf(Math.floor(deadlineT / 1000 % 60));
      if (deadlineT >= 0) {
        _this.courtDown = deadline_hour + ":" + deadline_minute + ":" + deadline_second;
      } else {
        _this.courtDown = "正在请求数据...";
        clearInterval(_this.deadlineTiming);
        _this.deadlineTiming = "";
        _this.getBetsBannerInfo();
      }
    },
    selectType: function (num, index, title) {
      var _this = this;
      _this.title = _this.Alltitle[title];
      $('#article' + num).show().siblings('article').hide(); //切换大模块
      //样式初始化
      $('.fixed_bottom td').removeClass('chooseYes');
      $('#choose1' + num).addClass('chooseYes');
      $('td').removeClass('chooseYes');
      $('#choose' + index + num).addClass('chooseYes');
      _this.clickIndex = index;
    },
    //补0
    getzf: function (num) {
      if (parseInt(num) < 10) {
        num = '0' + num;
      }
      return num;
    },
  },
  //	updated: function() {
  //		this.$nextTick(function() {
  //			if(numIndex == 1) {
  //				canvas();
  //			}
  //		})
  //	}
  watch: {
    datas: function () {
      var _this = this;
      this.$nextTick(function () {
        if (this.numIndex == 1) {
          _this.canvasFn();
        }
      })
    }
  },
};


