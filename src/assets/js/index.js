export default {
  name: "index",
  data() {
    return {
      userName: localStorage.userName ? localStorage.userName:'',
      app_flag: "",

      promotionUrl: 'javascript:;', //pc端地址

      baseIndex: '',
      imgs: [], //轮播图数组
      contents: [], //首页公告
      popupNotice:"",//弹出公告
      scrollNotice:'',//滚动公告
      scrollNoticeTime:{
        time:"",
        maxWidth:"",
      },//滚动公告定时器
      thelotterys: [], //最近开奖记录
      thelotterySpit: [], //最近开奖记录
      getColoredLeafConfigureList: [], //彩种显示列表
      isShowLang: false,
      variety: {
        "0": {
          list: [],
          name: [],
        },
        "1": {
          list: [],
          name: [],
        },
        "2": {
          list: [],
          name: [],
        },
        show: 2,
      }, //彩种显示列表1.0
      hot: [],
      high: [],
      low: [],
      config: [],
//      baseIndex: 1,

      lottery_caizhong: 1, //开奖页面默认竞技彩0，1为数字彩
      shuzicai_width: "", //数字彩div的宽度
      digitalColor_classify: [], //数字彩分类
      digitalColor_list: [], //数字彩列表
      select_species: 0, //防止每次点击都去请求当前彩种的变量
      isHava: [], //确定有数据的彩种

      time: "", //竞彩足球日期
      zhudui: "", //竞彩足球主队
      kedui: "", //竞彩足球客队
      rang: "", //主队让球
      bf: "", //比分

      homeName: "", //足球单场主场名称
      awayName: "", //足球单场客场名称
      rang_1: "", //主队让球
      dcQi: "", //足球单场期次
      score: "", //足球单场比分

      qi: "", //胜负彩期次
      num1: [], //胜负彩号码
      zqdcFlag: false,
      jczqFlag: false,
      sfcFlag: false,
      // 存储单场的期号,单场比赛数据
      dcQiArr: [],

      matchDate: "", //竞彩篮球日期
      host: "", //竞彩篮球主队
      guest: "", //竞彩篮球客队
      matchScore: "", //比分
      jclqFlag: false,

      numMes: "",
      coinUnit: "元", //余额单位
      singleMaxSum: "", //限额
      isTrue: "",
      time_: "", //控制时间的变量
      jiange: 1000 * 60, //间隔多久调一次新消息的数据-默认为60秒

      isScroll: false, //是否加载完后滚动
      headTit: "", //系统配置里的头部标题
      downUrl: "", //下载链接地址---安卓版/ios
      downUrl_img: "", //下载链接地址_图片---安卓版/ios

      hot_matchList: {
        jz_spf: [],
        jl_sf: []
      }, //热门赛事获取的数据
      hot_match_page: 0, //热门赛事数据对应页数
      hot_bannerNumber: "", //热门赛事单场胜平负对应期数
      hotTzItemMsg: {
        hotTzOddsList: [],
        tzItemNum: 0, //已选的项目
        forecast_amount: 0.0, //预测奖金
        multiple: 5
      }, //热门赛事投注信息
      usable_coin: 0, //钱包金额
      p_flag: false, //开奖数据是否加载完
      jczq_flag: false, //竞彩足球是否加载完
      jclq_flag: false, //竞彩篮球是否加载完
      zqdc_flag: false, //足球单场是否加载完
      rxj_flag: false, //足球单场是否加载完

      odds_percent: 0.65, //单场赔率百分比

      //热门赛事定时器
      hotTimes: "",

      //时时彩一级玩法id
      sscTypeId: 6,
      ssc_oddsList: "",
      ssc_deadlineTime: "",
      ssc_preventBanner: "",
      ssc_playName: "",
      ssc_rNumList: "",
      ssc_tzDataList: "",

      fCoin: '', //冻结金额
      coin: '', //可用余额
      agentCoin:'',//返点金额

      //      onMess:this.base.onMess,

      //首页跳注册的广告
      index_banner: "",

      isUseWebSocket: "",
      // index_banner: "",

      proCode: '',

      s0: '',
      s1: '',
      s2: '',
      s3: '',
      s4: '',

      bj28CL: [
        'gray', 'green', 'blue', 'red', 'green', 'blue',
        'red', 'green', 'blue', 'red', 'green',
        'blue', 'red', 'gray', 'gray', 'red',
        'gray', 'blue', 'red', 'green', 'blue',
        'red', 'green', 'blue', 'red', 'green',
        'blue', 'gray'
      ],
      lhcCL: [
        'red', 'red', 'blue', 'blue', 'green', //1
        'green', 'red', 'red', 'blue', 'blue', //2
        'green', 'red', 'red', 'blue', 'blue', //3
        'green', 'green', 'red', 'red', 'blue', //4
        'green', 'green', 'red', 'red', 'blue', //5
        'blue', 'green', 'green', 'red', 'red', //6
        'blue', 'green', 'green', 'red', 'red', //7
        'blue', 'blue', 'green', 'green', 'red', //8
        'blue', 'blue', 'green', 'green', 'red', //9
        'red', 'blue', 'blue', 'green' //10
      ],
      allMess: [], //弹幕
      danmuFlag: false,

      //刷新的函数
      refreshFn: "",
      //收藏
      collectContrastIdList:[],
      isCollectOpen:0,
      //类型
      userType:localStorage.userType_?localStorage.userType_:'',
      // collectGame: localStorage.collectGame,

      collectGameNum: 0,//收藏玩法数量

      collectCodeName:[],//收藏中对应的codeName


      gameKind:[],  //玩法分类
      gameIntro:[], // 玩法

      hotArr: [], //首页热门彩种
      gamesArr: [], //首页全部彩种

      deadlineStr:[], //倒计时
      deadlineStr2:[], //倒计时
      IdList: [],

      OnlineSum:'',
      unfinishCoin: 0.00,
      winLoseCoin: 0.00,
      noView:true,

      datas:'',


      color: 1,

      appDownloadShow: 1,

      logoPic:'',

      webName:'',


      //存储定时器
      timer_hotList:[],  //首页热门彩种定时器
      timer_hotName:[],   //首页热门彩种名称
      timer_gameList:[],   //游戏大厅定时器
      timer_gameName:[],   //游戏大厅玩法名称


      hot_index:1,
      hot_title:'全部彩种',


      scrAct:'',


      //收藏
      collect_idList:'',


      //走势收藏
      collect_Trend:'',


      leftWrap:{
        sx:'',
        sy:'',

        maxX:'',
        cStyle:'',
        wStyle:''
      },

      modTime:''

    }
  },
  created: function () {
      this.baseIndex = 1;
    //      localStorage.config = "";
    // localStorage.baseIndex ? (this.baseIndex = parseInt(localStorage.baseIndex)) : (this.baseIndex = 1);
    // this.loadData();

    this.base.threadPoxi();

    this.pullToRefresh.setNowThis(this);
    self.automaticallyAdjustsScrollViewInsets = "NO";
    //获取最大返点
    this.getGameRebatesList();
    //初始化收藏玩法数量
    this.collectGameNum = this.collectGame.idList.length;
    this.initData();
    //this.getGameKind();
    // this.getGameIntro();
    // this.getDigitalInfo();
    // this.getUserOnlineSum();
    this.userName=localStorage.userName;
  },
  mounted: function() {
    // $('.mui-inner-wrap').on('drag',function(event){
    //  event.stopPropagation()
    // })
    var _this = this;

    if(this.baseIndex == 1||this.baseIndex == 2||this.baseIndex == 3) {
      // $("#container").css("margin-top", "2.67rem");
      $("#main").css("padding-bottom", $(".public_btn").height());
      if(
        this.thelotterys.length > 4 &&
        this.isScroll &&
        this.thelotterys.length != 0

      ) {
        this.noticeScroll();
      }
      _this.runDanmu();
    }else {
      this.getCoin()
    }
    // if(localStorage.userName){
    //   $('.header-right').hide();
    //   $('.header-left').hide();
    //   $('.username').show();
    //   $('.loginOut').show();
    // }else{
    //   $('.header-right').show();
    //   $('.header-left').show();
    //   $('.username').hide();
    //   $('.loginOut').hide();

    // }

    if(_this.msgTime) {
      window.clearInterval(_this.msgTime);
      _this.msgTime = "";
    }
    _this.msgTime = setInterval(function() {
      _this.scrollFn('-3rem', _this.msgTime)
    }, 3000);

    // console.log($('.public_btn').height());
    var pth = $('.public_btn').height() + 'px';
    $('.download-wrap').css('bottom',pth);

    //3个页面下拉刷新功能
    if(localStorage.app_flag != undefined) {
      // //mui.init({
      //  pullRefresh: {
      //    container: "#pullrefresh", //下拉容器
      //    down: {
      //      style: "circle", //下拉刷新样式
      //      offset: "0px",
      //      range: "200px",
      //      callback: function() {
      //         if (_this.pullToRefresh.nowThis.pulldownRefresh) {
      //           _this.pullToRefresh.nowThis.pulldownRefresh(_this.pullToRefresh.nowThis);
      //         }
      //         if (!_this.pullToRefresh.dom) {
      //           _this.pullToRefresh.setDom(mui('#pullrefresh').pullRefresh());
      //
      //         }
      //         setTimeout(function () {
      //           _this.pullToRefresh.dom.endPulldownToRefresh(false);
      //         }, 1000)
      //       }
      //    }
      //  }
      // });

      // window.addEventListener("refresh", function(e) {
      //  if(localStorage.renovate == 1) {
      //    localStorage.renovate = 0;
      //    window.location.reload();
      //  }
      // });

      //获取设备唯一标识号uuid
      if(window.plus) {
        localStorage.device_uuid = plus.device.uuid;
      }
    }

    //初始化
    var h = document.documentElement.clientHeight;
    $(".allPlayArea .inner-list").css("height", h - $(".allPlayArea .topTitle").height());
    $("#popNotice").css({top: h/2- $("#popNotice").height()/2});

    // $('.tabs').find('.tabItem').click(function () {
    //   alert($(this));
    //   $(this).find(".selectImg").css("opacity",1);
    //   $(".tabItem").siblings(".tabItem").find('.selectImg').css("opacity",0.2);
    //   // this.getGameIntro();
    // })
    var width=window.screen.width,paddW=width/10*.13333,nowWidth= width-paddW*2;
    this.nowTitleHeight="height:"+nowWidth*0.43+"px";
    // console.log(this.nowTitleHeight)

    // $("#danmu").css({
    //  height:window.screen.height-nowWidth*0.43-paddW*9
    // })
    this.leftWrap.maxX=width*.7;
    if(localStorage.appDownloadShow == 2){
      _this.appDownloadShow = false;
    }else {
      _this.appDownloadShow = true;

    }

    // setTimeout(function(){
      //mui.init();
      // mui('#offCanvasSideScroll').scroll();
      // mui('#push').scroll();
      // mui('#content').scroll();




      $('#push .mui-icon-close').on('click', function() {
        mui('#push').popover('hide');
      });


      var _this=this;
      $('#content .move:nth-child(1)').css({
        height:200
      });
      // $("#container").on('scroll',function(){
      //  var  h=$("#container").scrollTop(),h1=200,h2=100;
      //  // console.log(h);
      //  if(h>220){
      //    // if(h<200){

      //    // } else
      //    if(h<300){
      //      _this.scrAct=1;
      //      if(h1>100){
      //        h1-=h-200;
      //        h1<100?h1=100:'';
      //        $('#content .move:nth-child(1)').css({
      //          height:h1
      //        });
      //      }
      //      if(h2>200||h2==100){
      //        h2+=h-200;
      //        h2>200?h2=200:'';
      //        $('#content .move:nth-child(2)').css({
      //          height:h2
      //        });
      //      }
      //      // if(h-224<100){
      //      //  var h1=h-224+100;
      //      //  $('#content .move.active').css({
      //      //    height:h1
      //      //  });
      //      // }
      //    }else if(h<400){
      //      _this.scrAct=2;
      //      if(h1>100){
      //        h1-=h-300;
      //        h1<100?h1=100:'';
      //        $('#content .move:nth-child(2)').css({
      //          height:h1
      //        });
      //      }
      //      if(h2>200||h2==100){
      //        h2+=h-300;
      //        h2>200?h2=200:'';
      //        $('#content .move:nth-child(3)').css({
      //          height:h2
      //        });
      //      }
      //        // $('#content .move.active').css({
      //        //  height:h1
      //        // });
      //      // if(h-224<250){
      //      //  var h1=h-224;
      //      //  $('#content .move.active').css({
      //      //    height:h1
      //      //  });
      //      // }
      //    }else if(h<500){
      //      _this.scrAct=3;
      //      // if(h-224<350){
      //      //  var h1=h-224;
      //      //  $('#content .move.active').css({
      //      //    height:h1
      //      //  });
      //      // }
      //      if(h1>100){
      //        h1-=h-400;
      //        h1<100?h1=100:'';
      //        $('#content .move:nth-child(3)').css({
      //          height:h1
      //        });
      //      }
      //      if(h2>200||h2==100){
      //        h2+=h-400;
      //        h2>200?h2=200:'';
      //        $('#content .move:nth-child(4)').css({
      //          height:h2
      //        });
      //      }
      //    }else if(h<600){
      //      _this.scrAct=4;
      //      // if(h-224<450){
      //      //  var h1=h-224;
      //      //  $('#content .move.active').css({
      //      //    height:h1
      //      //  });
      //      // }
      //      if(h1>100){
      //        h1-=h-500;
      //        h1<100?h1=100:'';
      //        $('#content .move:nth-child(4)').css({
      //          height:h1
      //        });
      //      }
      //      if(h2>200||h2==100){
      //        h2+=h-500;
      //        h2>200?h2=200:'';
      //        $('#content .move:nth-child(5)').css({
      //          height:h2
      //        });
      //      }
      //    }else if(h<700){
      //      _this.scrAct=5;
      //      // if(h-224<550){
      //      //  var h1=h-224;
      //      //  $('#content .move.active').css({
      //      //    height:h1
      //      //  });
      //      // }
      //      if(h1>100){
      //        h1-=h-600;
      //        h1<100?h1=100:'';
      //        $('#content .move:nth-child(5)').css({
      //          height:h1
      //        });
      //      }
      //      if(h2>200||h2==100){
      //        h2+=h-600;
      //        h2>200?h2=200:'';
      //        $('#content .move:nth-child(6)').css({
      //          height:h2
      //        });
      //      }
      //    }else if(h<800){
      //      _this.scrAct=6;
      //      // if(h-224<650){
      //      //  var h1=h-224;
      //      //  $('#content .move.active').css({
      //      //    height:h1
      //      //  });
      //      // }
      //      if(h1>100){
      //        h1-=h-700;
      //        h1<100?h1=100:'';
      //        $('#content .move:nth-child(6)').css({
      //          height:h1
      //        });
      //      }
      //      if(h2>200||h2==100){
      //        h2+=h-700;
      //        h2>200?h2=200:'';
      //        $('#content .move:nth-child(7)').css({
      //          height:h2
      //        });
      //      }
      //    }else if(h<900){
      //      _this.scrAct=7;
      //      // if(h-224<750){
      //      //  var h1=h-224;
      //      //  $('#content .move.active').css({
      //      //    height:h1
      //      //  });
      //      // }
      //      if(h1>100){
      //        h1-=h-800;
      //        h1<100?h1=100:'';
      //        $('#content .move:nth-child(7)').css({
      //          height:h1
      //        });
      //      }
      //      if(h2>200||h2==100){
      //        h2+=h-800;
      //        h2>200?h2=200:'';
      //        $('#content .move:nth-child(8)').css({
      //          height:h2
      //        });
      //      }
      //    }
      //    // else if(h<1000){
      //    //  _this.scrAct=8;
      //    //  // if(h-224<850){
      //    //  //  var h1=h-224;
      //    //  //  $('#content .move.active').css({
      //    //  //    height:h1
      //    //  //  });
      //    //  // }
      //    //  if(h1>100){
      //    //    h1-=h-900;
      //    //    h1<100?h1=100:'';
      //    //    $('#content .move:nth-child(8)').css({
      //    //      height:h1
      //    //    });
      //    //  }
      //    //  if(h2>200||h2==100){
      //    //    h2+=h-900;
      //    //    h2>200?h2=200:'';
      //    //    $('#content .move:nth-child(9)').css({
      //    //      height:h2
      //    //    });
      //    //  }
      //    // }else{
      //    //  $('#content .move:nth-child(9)').css({
      //    //    height:200
      //    //  });
      //    // }
      //  }else{
      //    _this.scrAct='';
      //  }
      // });
  // },3000)

      // },3000)

      this.scrollA();
      //获取预览图片路径
      // var getObjectURL = function(file){
      //  var url = null ;
      //  if (window.createObjectURL!=undefined) { // basic
      //    url = window.createObjectURL(file) ;
      //  }else if (window.URL!=undefined) { // mozilla(firefox)
      //    url = window.URL.createObjectURL(file) ;
      //  } else if (window.webkitURL!=undefined) { // webkit or chrome
      //    url = window.webkitURL.createObjectURL(file) ;
      //  }
      //  return url ;
      // }
      // document.getElementById('file').addEventListener('change', function () {
      //  QRCode.decode(getObjectURL(this.files[0]));
      //  QRCode.callback = function(e){
      //    jQuery('#qrCode').qrcode({
      //      render: "canvas", // 渲染方式有table方式和canvas方式
      //      width: 120, //默认宽度
      //      height: 120, //默认高度
      //      text: e, //二维码内容
      //      typeNumber: -1, //计算模式一般默认为-1
      //      correctLevel: 0, //二维码纠错级别
      //      background: "#ffffff", //背景颜色
      //      foreground: "#000000" //二维码颜色
      //    });
      //  }
      // });



      //初始化收藏
      //设置收藏
      if(localStorage.collectGame){
        _this.collect_idList="";
        var list=JSON.parse(localStorage.collectGame);
        if(list.collectList){
          _this.collect_idList=list.collectList;
          _this.$set(_this.collect_idList,list.collectList)
        }
      }

      $("#canvasSide").addClass("mui-transitioning");


      //初始化走势收藏
      if(localStorage.collectTrend){

        var ctObj=JSON.parse(localStorage.collectTrend),ci,isEmpty=true;
        for(ci in ctObj){
          if(ctObj[ci]==1){
            isEmpty=false;
            break;
          }
        }
        if(isEmpty){
          ctObj=''
        }
        this.collect_Trend=ctObj;
      }else{
        this.collectList='';
      }
    },

  methods: {
    checkWord (key) {
      this.isShowLang = true;
      this.$i18n.locale = key;
      localStorage.setItem('lang', key);
    },
    touchs_css(event){
      // event.preventDefault();
      var touch = event.targetTouches[0];
      //滑动起点的坐标
      this.leftWrap.sx = touch.pageX;
    },
    touchm_css(event){
      var touch = event.targetTouches[0];
      //手势滑动时，手势坐标不断变化，取最后一点的坐标为最终的终点坐标
      // endX = touch.pageX;
      if( $("#canvasWrapper").is(".mui-active")){
        if(this.leftWrap.sx-touch.pageX>50){
          this.popArea(2);
        }
      }else{
        this.popArea(2);
      }


    },
    hideCanvasSideScroll () {
      $("#canvasWrapper>div:nth-child(2)").css({
        "transform": "translate3d(0, 0px, 0px)"
      });
      $("#canvasWrapper").removeClass("mui-active");
      $("#canvasSide").removeClass(" mui-active");
    },
    popArea(type){
      if(type==1){
        $("#canvasWrapper>div:nth-child(2)").css({
          "transform": "translate3d("+$("#canvasSide").width()+"px, 0px, 0px)"
        });
        // $("#aWrap").show();
        // $("mui-off-canvas-left mui-transitioning mui-active")
        $("#canvasWrapper").addClass("mui-active")

        $("#canvasSide").css({
          "visibility": "initial"
        })



        $("#canvasSide").addClass("mui-active");
      }else{
        this.hideCanvasSideScroll();
        // $("#aWrap").hide();
      }


    },
    scrollA(){
      // return
    //  function stopTouchendPropagationAfterScroll(){
    //    var locked = false;

    //    window.addEventListener('touchmove', function(ev){
    //        locked || (locked = true, window.addEventListener('touchend', stopTouchendPropagation, true));
    //    }, true);
    //    function stopTouchendPropagation(ev){
    //        ev.stopPropagation();
    //        window.removeEventListener('touchend', stopTouchendPropagation, true);
    //        locked = false;
    //    }
    // }
    // stopTouchendPropagationAfterScroll();
    //2-------------
    // window.addEventListener("touchstart", function (event) {
    //  event.preventDefault();});
    this.startPos = "";
    var _this=this;
      var startPos,_this=this,startTop;
      var infoObj = document.getElementById("container");
      var event1 = new Event('touchstart');
      function start(event) {
        // alert(3)
        // event.preventDefault();
        // 获取该元素相对于父级元素的top值（父级元素需要有position，当前元素position:relative）
        startTop = this.offsetTop;
        //touches是屏幕上所有的touch，取第一个
        var touchstart = event.targetTouches[0];
        // console.log(startTop )
        //取触点的初始
        _this.startPos = {
            x: touchstart.pageX,
            y: touchstart.pageY,
        };
        if(_this.isAB){
          _this.isAB=0;
          _this.startPos.y-=parseInt($("#container>div")[0].style.top);
        }
        _this.isArea=0;
        var event1 = new Event('touchstart');
        infoObj.addEventListener('touchmove',end,false);　　
          // infoObj.addEventListener('touchcancel', function (event) {

          //  _this.isAB=1;
          //    infoObj.removeEventListener('touchstart', start, false);　　
          //    infoObj.removeEventListener('touchmove', end, false);　　
          //    infoObj.removeEventListener('touchcancel', this, false);
          //    infoObj.dispatchEvent(event1);
          //    infoObj.addEventListener("touchstart",start);
          //    infoObj.addEventListener('touchmove', end, false);　　
          // });
          // $("#container").on('click',function(){})
          $("#container").on('touchcancel touchend', function (event) {
            _this.isAB=1;
              infoObj.removeEventListener('touchstart', start, false);　　
              infoObj.removeEventListener('touchmove', end, false);　　
                infoObj.dispatchEvent(event1);
                infoObj.addEventListener("touchstart",start);
              infoObj.addEventListener('touchmove', end, false);　
          });
      }
      function end(event) {
        // alert(2)
        // console.log(2)
        // 这句视情况而定，是为了屏蔽原生的touch滚动事件，而我的项目里没有这个，尴尬
        event.preventDefault();
        var touchmove = event.targetTouches[0],tim=new Date().getTime();　
        // start(event)
        // if(_this.isAB){
        //  _this.isAB=0;
        //  if(_this.isArea){
        //    startPos.y+=_this.isArea;
        //  }
        //  console.log(_this.isArea)
        //  // startPos.y-=parseInt($("#container>div")[0].style.top);
        //  startPos.y-=parseInt($("#container>div")[0].style.top);
        //  _this.isArea=parseInt($("#container>div")[0].style.top);
        //  console.log($("#container>div")[0].style.top,touchmove.pageY , startPos.y)

        // }

        // 偏移量
        // startPos.y-=parseInt($("#container>div")[0].style.top);
        var offsetPos = {
            x: touchmove.pageX - _this.startPos.x,
            y: touchmove.pageY - _this.startPos.y
        };　　

        // console.log(touchmove.pageY);
        var  h;
        // 重新定位需要的目标top值
        var endTop = startTop + offsetPos.y;
        // 需要判断滚动到顶和到底的情况
        // if (endTop < 10 && endTop > this.parentElement.offsetHeight - this.offsetHeight) {
        //    this.style.top = endTop + 'px';
        //    h=endTop;
        // } else if (endTop >= 10) {
        //    this.style.top = '0px';
        // } else {
            // this.style.top = '-536px';
            // if($("#container>div")[0].style.top){
            //  endTop += $("#container>div")[0].style.top
            //  $("#container>div")[0].style.top =endTop+ (this.parentElement.offsetHeight - this.offsetHeight - 10) + 'px';
            //  h=-endTop;
            // }else{
              var ch=endTop+ (this.parentElement.offsetHeight - this.offsetHeight - 10);
                ch>10?ch=0:'';
                ch<-800?ch=-800:'';
                $("#container>div")[0].style.top =ch + 'px';
                h=-endTop;


              // console.log(h)
            // }

        // }

        var h1=200,h2=100;
        // console.log(startTop + offsetPos.y,this.parentElement.offsetHeight - this.offsetHeight)
        if(h>220){
          if(h<300){
            // if(h1>100){
            //  h1-=h-200;
            //  h1<100?h1=100:'';
            //  $('#content .move:nth-child(1)').css({
            //    height:h1
            //  });
            // }
            if(h2>200||h2==100){
              h1-=h-200;
              h1<100?h1=100:'';
              // console.log(h);
              $('#content .move:nth-child(2)').css({
                top:h1
              });
            }
          }else if(h<400){
            h1=300;
            if(h2>200||h2==100){
              h1-=h-300;
              h1<200?h1=200:'';
              $('#content .move:nth-child(3)').css({
                top:h1
              });
            }
          }else if(h<500){
            h1=400;
            if(h2>200||h2==100){
              h1-=h-400;
              h1<300?h1=300:'';
              $('#content .move:nth-child(4)').css({
                top:h1
              });
            }
          }else if(h<600){
            h1=500;
            if(h2>200||h2==100){
              h1-=h-500;
              h1<400?h1=400:'';
              $('#content .move:nth-child(5)').css({
                top:h1
              });
            }
          }else if(h<700){
            h1=600;
            if(h2>200||h2==100){
              h1-=h-600;
              h1<500?h1=500:'';
              $('#content .move:nth-child(6)').css({
                top:h1
              });
            }
          }else if(h<800){
            h1=700;

            if(h2>200||h2==100){
              h1-=h-700;
              h1<600?h1=600:'';
              $('#content .move:nth-child(7)').css({
                top:h1
              });
            }
          }else if(h<900){
            h1=800;
            if(h2>200||h2==100){
              h1-=h-800;
              h1<700?h1=700:'';
              $('#content .move:nth-child(8)').css({
                top:h1
              });
            }
          }
          // else if(h<1000){
          //  h1=900;
          //  if(h2>200||h2==100){
          //    h1-=h-900;
          //    h1<800?h1=800:'';
          //    $('#content .move:nth-child(9)').css({
          //      top:h1
          //    });
          //  }
          // }
        }else{
        }

    }
      infoObj.addEventListener("touchstart",start)

    },
    turnTrend(){

    },
    showHotArea(index,tit,type){
      // $("#push>div:nth-child(3)")[0].scrollTop=0;
      if(type){
        $("#push>div:nth-child(3)")[0].scrollTop=0;
        return
      }
        this.hot_index=index;
        this.hot_title=tit;
      // $('.move').on('click', function() {
        $('#push').addClass('mui-active');
        $("#push>div:nth-child(3)")[0].scrollTop=0;
        // $("#push").show();
        // setTimeout(function(){
          // mui('#push').scroll().scrollTo(0, 0, 300);
        // },300)
      // });
    },

    DownloadShow:function(){
      var _this = this;
      localStorage.appDownloadShow = 2;
      _this.appDownloadShow = false;

    },


    sortNum: function(property){
      return function(a,b){
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
      }
    },




    //时间倒计时
    countdown: function (lastTime,startTime,index,id) {
      var _this = this,
        deadlineT = lastTime - startTime,
        deadline_hour = _this.getzf(Math.floor(deadlineT / 1000 / 60 / 60)),
        deadline_minute = _this.getzf(Math.floor(deadlineT / 1000 / 60 % 60)),
        deadline_second = _this.getzf(Math.floor(deadlineT / 1000 % 60));
      if(deadlineT >= 0){
        _this.deadlineStr = deadline_hour + ":" + deadline_minute + ":" + deadline_second;
        // _this.hotArr[index].deadlineStr = _this.deadlineStr;

        _this.$set(_this.hotArr[index],'hour',deadline_hour);
        _this.$set(_this.hotArr[index],'minute',deadline_minute);
        _this.$set(_this.hotArr[index],'second',deadline_second);

        _this.$set(_this.hotArr[index],'deadlineStr',deadline_hour + ":" + deadline_minute + ":" + deadline_second);
        // _this.hotArr[index].deadlineStr = _this.deadlineStr;
      }else{
        // window.clearInterval(_this.hotArr[index].deadlineTiming);
        window.clearInterval(_this.timer_hotList[_this.timer_hotName.indexOf(index)]);
        _this.deadlineStr= '开奖中';
        _this.hotArr[index].deadlineStr = _this.deadlineStr;

        // _this.hotArr[index].deadlineTiming = '';
        var ids = id;
        _this.getDigitalInfo(ids);
      }

    },

    //时间倒计时
    countdown1: function (lastTime,startTime,index,id) {
      var _this = this,
        deadlineT = lastTime - startTime,
        deadline_hour = _this.getzf(Math.floor(deadlineT / 1000 / 60 / 60)),
        deadline_minute = _this.getzf(Math.floor(deadlineT / 1000 / 60 % 60)),
        deadline_second = _this.getzf(Math.floor(deadlineT / 1000 % 60));
      if(deadlineT >= 0){
        _this.deadlineStr2 = deadline_hour + ":" + deadline_minute + ":" + deadline_second;
        // _this.gameIntro[index].deadlineStr = _this.deadlineStr;
        _this.$set(_this.gameIntro[index],'deadlineStr',deadline_hour + ":" + deadline_minute + ":" + deadline_second);
        // _this.hotArr[index].deadlineStr = _this.deadlineStr;
      }else{
        // window.clearInterval(_this.gameIntro[index].deadlineTiming);
        window.clearInterval(_this.timer_gameList[_this.timer_gameName.indexOf(index)]);
        _this.deadlineStr2= '开奖中';
        _this.gameIntro[index].deadlineStr = _this.deadlineStr2;
        var ids = id;
        _this.getDigitalInfo2(ids);
      }

    },

    //首页热门彩种
    getDigitalInfo2: function(id) {
      var _this = this,obj2={},
        obj = {
          type: "post",
          url: '/commonAPI/getDigitalInfo',
          data: {
            one_type_id:id,
          },
          success: function(data) {
            if(data.code == 200 &&data.body.length!=0){
              data.body =  data.body.sort(_this.sortNum('sort'));
              if(data.body.length == 1){

                var indexA = _this.gameIntro.map(function(e) { return e.gameID; }).indexOf(id);
                // window.clearInterval(_this.gameIntro[indexA].deadlineTiming);
                // _this.gameIntro[indexA].deadlineTiming="";
                if(_this.timer_gameName.indexOf(indexA)!=-1){
                  window.clearInterval(_this.timer_gameList[_this.timer_gameName.indexOf(indexA)]);
                }
                if(indexA!=-1){
                  Vue.set(_this.gameIntro,indexA,data.body[0]);
                }
                if(_this.gameIntro[indexA].code =="PCDD"&&_this.gameIntro[indexA].luck_number){
                  var sum2 = _this.gameIntro[indexA].luck_number.split(',');
                  var num2 = sum2[0] +",+," + sum2[1] +",+,"+ sum2[2] +",=,";
                  _this.gameIntro[indexA].luck_number=num2+(parseInt(sum2[0])+parseInt(sum2[1])+parseInt(sum2[2]));
                }

                if(_this.gameIntro[indexA].code =="hk6"&&_this.gameIntro[indexA].luck_number){
                  var sum2 = _this.gameIntro[indexA].luck_number.replace('+',",").split(',');
                  var num2 = sum2[0]+"," +sum2[1]+"," +sum2[2]+"," +sum2[3]+"," +sum2[4]+"," +sum2[5]+",=,"+sum2[6];
                  _this.gameIntro[indexA].luck_number=num2;

                }

                _this.gameIntro[indexA].lastTime = _this.getMilliseconds( _this.gameIntro[indexA].deadline);
                _this.gameIntro[indexA].startTime = _this.getMilliseconds( _this.gameIntro[indexA].response_date);
                _this.gameIntro[indexA].gameID =  _this.gameIntro[indexA].gameID;
                // if(_this.gameIntro[indexA].deadlineTiming){
                //            timer_hotList:[],
      // timer_hotName:[],
      // timer_gameList:[],
      // timer_gameName:[],
                // }
                if(_this.gameIntro[indexA].lastTime>_this.gameIntro[indexA].startTime){

                  _this.countdown1( _this.gameIntro[indexA].lastTime,_this.gameIntro[indexA].startTime,indexA,_this.gameIntro[indexA].gameID);
                  _this.gameIntro[indexA].deadlineTiming = indexA;
                  _this.timer_gameList[_this.timer_gameName.indexOf(indexA)]=setInterval(function () {
                    _this.gameIntro[indexA].startTime+=1000;
                    _this.countdown1( _this.gameIntro[indexA].lastTime,_this.gameIntro[indexA].startTime,indexA,_this.gameIntro[indexA].gameID);
                  }, 1000);
                }

              }
            }else{
              // setTimeout(function(){
              //  _this.getDigitalInfo(id);
              // },5000);
            }
          },
          error:function(){
            // setTimeout(function(){
            //  _this.getDigitalInfo(id);
            // },5000);
          },
        };
      this.base.callCommonApi(obj);

    },

    // getGameKind:function(){
    //   var _this = this;
    //   var obj = {
    //     type: "post",
    //     data: {},
    //     dataType: "json",
    //     url: "/commonAPI/qreAppDigitalGameKind",
    //     success: function(data) {
    //       if(data.code == 200) {
    //         _this.gameKind = data.body;
    //       }
    //     }
    //   };
    //   this.base.callCommonApi(obj);

    // },

    // getGameIntro:function(event,a){
    //   if(event){
    //     event = event.currentTarget;
    //     $(event).find("img").addClass('selectImg');
    //     $(event).siblings().find('img').removeClass('selectImg');
    //   }
    //   var _this = this;
    //   // _this.gameIntro.map(function (item,index) {
    //   //   window.clearInterval(_this.gameIntro[index].deadlineTiming);
    //   // });
    //   // _this.gameIntro = [];
    //   if(!a){ a = "" }
    //   var obj = {
    //     type: "post",
    //     data: {
    //       kindCode: a
    //     },
    //     dataType: "json",
    //     url: "/commonAPI/qryAppDigitalGameIntroByKindCode",
    //     success: function(data) {
    //       if(data.code == 200) {
    //        _this.gameIntro = data.body.sort(_this.sortNum('sort'));
    //        //            timer_hotList:[],
    //  // timer_hotName:[],
    //  // timer_gameList:[],
    //  // timer_gameName:[],
    //        for(var i in _this.timer_gameList){
    //          window.clearInterval(_this.timer_gameList[i]);
    //        }
    //        _this.timer_gameList=[];
    //        _this.timer_gameName=[];
    //         _this.gameIntro.map(function (item,index) {
    //          _this.gameIntro[index].deadlineStr="";
    //          item.deadlineStr="";
    //           if(item.code =="PCDD"){
    //             var sum = item.luck_number.split(',');
    //             var num = sum[0] +",+," + sum[1] +",+,"+ sum[2] +",=,";
    //             item.luck_number=num+(parseInt(sum[0])+parseInt(sum[1])+parseInt(sum[2]));
    //           }

    //           if(item.code =="hk6"){
    //             var sum = item.luck_number.replace('+',",").split(',');
    //             var num = sum[0]+"," +sum[1]+"," +sum[2]+"," +sum[3]+"," +sum[4]+"," +sum[5]+",=,"+sum[6];
    //             item.luck_number=num;

    //           }
    //          // if(_this.gameIntro[index].deadlineTiming){
    //           //     window.clearInterval(_this.gameIntro[index].deadlineTiming);
    //           //     _this.gameIntro[index].deadlineTiming="";
    //           //   }
    //           if(item.deadline){
    //            _this.timer_gameName.push(index);
    //             item.lastTime = _this.getMilliseconds(item.deadline) ; //结束时间
    //             item.startTime = _this.getMilliseconds(item.response_date); //开始时间
    //             _this.countdown1(item.lastTime,item.startTime,index,item.gameID);
    //             // if(item.deadlineTiming){
    //             //   window.clearInterval(item.deadlineTiming);
    //             //   item.deadlineTiming="";
    //             // }
    //            _this.gameIntro[index].deadlineTiming=index;
    //            _this.timer_gameList[_this.timer_gameName.indexOf(index)]="";
    //            _this.timer_gameList[_this.timer_gameName.indexOf(index)]= setInterval(function () {
    //               item.startTime+=1000;
    //               _this.countdown1(item.lastTime,item.startTime,index,item.gameID);
    //             }, 1000);
    //           }
    //         });
    //       }
    //     }

    //   };
    //   this.base.callCommonApi(obj);

    // },
    //设置皮肤颜色
    // skin_color: function (){
    //   var _this = this;
    //   if(_this.color == 1){
    //     _this.color = 2
    //   }else{
    //     _this.color = 1
    //   }
    //   // alert(_this.color);
    //   localStorage.skin_color = _this.color;
    //   this.baseCss.setStyleColor(parseInt(_this.color));
    // },


    //首页热门彩种
    getDigitalInfo: function(id) {
      var _this = this,obj2={},
        obj = {
          type: "post",
          url: '/commonAPI/getDigitalInfo',
          data: {
            one_type_id:id,
          },
          success: function(data) {
            if(data.code == 200 &&data.body.length!=0){
              data.body =  data.body.sort(_this.sortNum('sort'));
              if(data.body.length == 1){
                data.body.map(function (item,index) {
                  item.deadlineStr="";
                  item.hour="";
                  item.minute="";
                  item.second="";
                  item.luckList="";
                  if(item.luck_number){
                    item.luckList=item.luck_number.split(/[+ ,]/);
                  }else{
                    item.luckList="开奖中...";
                  }
                });

                // var indexA = _this.IdList.indexOf(id);
                var indexA = _this.hotArr.map(function(e) { return e.gameID; }).indexOf(id);

                window.clearInterval(_this.timer_hotList[_this.timer_hotName.indexOf(indexA)]);
                _this.hotArr[indexA].deadlineTiming="";
                if(indexA!=-1){
                  Vue.set(_this.hotArr,indexA,data.body[0]);
                }
                _this.hotArr[indexA].lastTime = _this.getMilliseconds( _this.hotArr[indexA].deadline);
                _this.hotArr[indexA].startTime = _this.getMilliseconds( _this.hotArr[indexA].response_date);
                _this.hotArr[indexA].gameID =  _this.hotArr[indexA].gameID;
                // if(_this.hotArr[indexA].deadlineTiming){
      //            timer_hotList:[],
      // timer_hotName:[],
      // timer_gameList:[],
      // timer_gameName:[],
                // }
                if(_this.hotArr[indexA].lastTime>_this.hotArr[indexA].startTime){
                  _this.countdown( _this.hotArr[indexA].lastTime,_this.hotArr[indexA].startTime,indexA,_this.hotArr[indexA].gameID);
                  _this.hotArr[indexA].deadlineTiming = indexA;
                  _this.timer_hotList[_this.timer_hotName.indexOf(indexA)]=setInterval(function () {
                    _this.hotArr[indexA].startTime+=1000;
                    _this.countdown( _this.hotArr[indexA].lastTime,_this.hotArr[indexA].startTime,indexA,_this.hotArr[indexA].gameID);
                  }, 1000);
                }

              }else {
                data.body.map(function (item,index) {
                  item.deadlineStr="";
                  item.hour="";
                  item.minute="";
                  item.second="";
                  item.luckList="";
                  if(item.luck_number){
                    item.luckList=item.luck_number.split(/[+ ,]/);
                  }else{
                    item.luckList="开奖中...";
                  }

                  if(item.gameID >=5&&item.gameID!=99) {
                    _this.hotArr.push(item);
                  }
                });
                window.all_TBet=_this.hotArr;
                //初始化定时器
                for(var i in _this.timer_hotList){
                  window.clearInterval(_this.timer_hotList[i]);
                };
                _this.timer_hotName=[];
                _this.timer_hotList=[];

                _this.hotArr.map(function (item,index) {
                  // window.clearInterval(_this.hotArr[index].deadlineTiming);
                  //  _this.hotArr[index].deadlineTiming="";
                  if(item.deadline){
                    item.lastTime = _this.getMilliseconds(item.deadline) ; //结束时间
                    item.startTime = _this.getMilliseconds(item.response_date); //开始时间

                    //定时器
                    _this.timer_hotName.push(index);

                    // if(_this.hotArr[index].deadlineTiming){

                    // }
                    _this.countdown(item.lastTime,item.startTime,index,item.gameID);
                    _this.hotArr[index].deadlineTiming=index;
                    _this.timer_hotList[_this.timer_hotName.indexOf(index)] = setInterval(function () {
                      item.startTime+=1000;
                      _this.countdown(item.lastTime,item.startTime,index,item.gameID);
                    }, 1000);
                  }
                });
              }
            }
            if(_this.OnlineSum!=''&&_this.hotArr.length!=0){
              _this.hotArr.map(function (item,index) {
                if(index<2){
                  var Min = parseInt(_this.OnlineSum/3 - (_this.OnlineSum/(_this.hotArr.length))/(_this.hotArr.length)*(index+1));
                  var Max = parseInt(_this.OnlineSum/3 - (_this.OnlineSum/(_this.hotArr.length))/(_this.hotArr.length)*(index));
                }else{
                  var Min = parseInt(_this.OnlineSum/(_this.hotArr.length) - (_this.OnlineSum/(_this.hotArr.length))/(_this.hotArr.length)*(index+1));
                  var Max = parseInt(_this.OnlineSum/(_this.hotArr.length) - (_this.OnlineSum/(_this.hotArr.length))/(_this.hotArr.length)*(index));
                }
                var num  = _this.RandomNum(Min,Max);
                item.num = num;
              });
            }

          }
        };
      this.base.callCommonApi(obj);

    },

    //获取在线人数
    // getUserOnlineSum:function(){
    //   var _this = this;
    //   var obj = {
    //     type: "post",
    //     data: {},
    //     dataType: "json",
    //     url: "/commonAPI/getUserOnlineSum",
    //     success: function(data) {
    //       if(data.code == 200) {
    //         _this.OnlineSum = JSON.parse(data.body).userNum;
    //       }
    //       if(_this.hotArr.length!==0&&_this.OnlineSum!=''){
    //         _this.hotArr.map(function (item,index) {
    //           if(index<2){
    //             var Min = parseInt(_this.OnlineSum/3 - (_this.OnlineSum/(_this.hotArr.length))/(_this.hotArr.length)*(index+1));
    //             var Max = parseInt(_this.OnlineSum/3 - (_this.OnlineSum/(_this.hotArr.length))/(_this.hotArr.length)*(index));
    //           }else{
    //             var Min = parseInt(_this.OnlineSum/(_this.hotArr.length) - (_this.OnlineSum/(_this.hotArr.length))/(_this.hotArr.length)*(index+1));
    //             var Max = parseInt(_this.OnlineSum/(_this.hotArr.length) - (_this.OnlineSum/(_this.hotArr.length))/(_this.hotArr.length)*(index));
    //           }
    //           var num  = _this.RandomNum(Min,Max);
    //           item.num = num;
    //         });


    //       }
    //     }

    //   };
    //   this.base.callCommonApi(obj);

    // },


    RandomNum:function(min,max){
      var range = max-min;
      var rand = Math.random();
      var num = min + Math.round(rand * range);
      return num;

      },


    pulldownRefresh: function(_this) {
      // if(_this.baseIndex == 1) {
      //  _this.contents = [];
      // }
      // setTimeout(function() {
      //  if(_this.baseIndex == 1) {
      //    // _this.getCoin();
      //    _this.get_hongbao();
      //    _this.contrastTimestamp();
      //  } else if(_this.baseIndex == 2) {
      //  } else {
      //    _this.setMyCenterMsg();
      //  }
      // }, 1500);
    },

    //路由跳转返回
    routerBack: function() {

      if(localStorage.turnPathName && localStorage.turnPathName != "login") {
        this.$router.go(-1)
      } else {
        this.$router.push({
          name: "index"
        });
      }

    },

    //获取玩法返点列表
    getGameRebatesList() {

      if(!localStorage.userName){
        return
      }
      if (localStorage.szcRebateList && this.ssc_oddsList) {
        var inItem = _this.ssc_oddsList[_this.sscTypeId],
          rebateList = JSON.parse(localStorage.szcRebateList);
        for (var i in rebateList) {
          if (rebateList[i].code == inItem['code']) {
            rebateList = rebateList[i]
            break
          }
        }


        var val = parseFloat((item.maxPrize - item.minPrize) / (rebateList.rebate * 10 + 1)).toFixed(3);
        _this.ssc_oddsList.odds = parseFloat(inItem.max_prize - (val * (rebateList.rebate - rebateList.nowRebate)*10)).toFixed(3);
        // _this.$set(_this.ssc_oddsList, "odds", _this.ssc_oddsList.odds)
        if (_this.BetsList) {
          _this.BetsList.odds = _this.ssc_oddsList.odds;
        }
        return
      }
      // ssc#8.0@k3#8.5@11x5#7.5@3D#7.5@PK10#8.0@hk6#10.0
      if (localStorage.gameRebatesList){
        var strList = localStorage.gameRebatesList, objList = {}, _this = this;
        strList = strList.split("@");
        strList.map(function (item) {
          var list = item.split("#");
          objList[list[0]] = list[1];
        })
      }


      var _this = this,
        obj = {
          type: "post",
          url: "/authApi/proxy/getRebateConfigList",
          data: {

          },
          success: function (data) {
            if (data.code == 200) {
              // _this.maxRebatesList=data.body;
              data.body.map(function (item) {
                item.nowRebate = objList[item.code];
              })
              if (_this.ssc_oddsList){
                var inItem = _this.ssc_oddsList[_this.sscTypeId],
                  rebateList = data.body;
                for (var i in rebateList) {
                  if (rebateList[i].code == inItem['code']) {
                    rebateList = rebateList[i]
                    break
                  }
                }
                var val = parseFloat((inItem.max_prize - inItem.min_prize) / (rebateList.rebate*10+1)).toFixed(3),list;
                _this.ssc_oddsList.odds = parseFloat(inItem.max_prize - (val * (rebateList.rebate - rebateList.nowRebate)*10)).toFixed(3);
                //此处数据对象不更新，采取下策
                list = _this.ssc_oddsList;
                _this.ssc_oddsList="";
                _this.ssc_oddsList = list;
                if (_this.BetsList) {
                  _this.BetsList.odds = _this.ssc_oddsList.odds;
                }
              }

              // _this.nameRebatesList = data.body;
              localStorage.szcRebateList=JSON.stringify(data.body);
            } else {

            }
          },
          error: function (msg) {
            //console.log(msg)
          },
        };
      this.base.callAuthApi(obj);
    },
    //显示代理中心
    showAgency:function(){
      if(!localStorage.userName){
        this.$router.push({name:"login"});
        return
      }
      this.$router.push({name:"agencyCenter"});
    },
    //显示收藏夹
    // showCollectGame:function(){
    //   if (this.getColoredLeafConfigureList.length == 0) {
    //     return;
    //   } else if (this.collectGame.idList.length==0){
    //     mui.toast("暂无收藏")
    //     return
    //   }
    //   this.isCollectOpen=1;
    //   this.isCollectTitleShow = [];
    //   var list = this.collectGame.idList,_this=this,_gameList=[];
    //   _this.collectCodeName=[];
    //   list.map(function(item){
    //     var index = _this.collectContrastIdList.indexOf(item);
    //     if (index!==-1){
    //       _this.getColoredLeafConfigureList[index].isCollect=1;
    //       _this.collectCodeName.push(_this.getColoredLeafConfigureList[index].codeName);
    //     }else{
    //       _this.getColoredLeafConfigureList[index].isCollect = 0;
    //     }
    //   });

    //   document.documentElement.scrollTop = 0;
    //   $(window).css("-webkit-overflow-scrolling", "auto");
    //   $(window).scrollTop(0);
    //   $(window).css("-webkit-overflow-scrolling", "touch");
    //   // $(window).scrollTop(0);
    //   $(".allPlayArea").slideDown();
    //   $("#pullrefresh").hide();
    //   $(".public_btn").hide();
    // },
    //弹幕内容赋值
    runDanmu: function() {
      this.allMess = this.base.userMess;
    },

    //发送弹幕
    getDanmu: function(userMess, uName) {
      var $p;
      $p = $('<p class="danmu">' + userMess + '</p>'); //创建一个p元素，弹幕的文字加在p元素上
      var x = 0;
      var h = (Math.random() * 100) + 200;
      var num = Math.random() * 0.5; //num用于控制弹幕速度为随机
      //控制颜色随机
      var r = parseInt(Math.random() * (255 + 1));
      var g = parseInt(Math.random() * (255 + 1));
      var b = parseInt(Math.random() * (255 + 1));
      var timer = setInterval(function() {
        //此条件判断语句用控制每次打开弹幕时弹幕都是从最右边开始出现
        if($('#danmu').css("display") !== "none") {
          x += num > 0.5 ? num : num + 0.5;
        } else {
          x = 0;
        }
        $p.css({
          "white-space": "nowrap",
          "font-weight": "bold",
          "font-size": "1.1rem",
          "position": "absolute",
          "top": h,
          "color": "rgb(" + r + "," + g + "," + b + ")",
          "left": 500 - x,
          'z-index': 99,
          //          'border': '2px solid #E3E3E3',

        });
        $('#danmu').append($p);
        if(parseInt($p.css("left")) < -parseInt($p.width())) {
          $p.remove();
          timer = null;
        }
      }, 1);
    },
    //打开侧栏
    biaoImg: function() {
      if($('#biaoImg').is('.biaoFalse')) {
        $('#biaoImg').addClass('biaoTrue').removeClass('biaoFalse');
        $('.chat').animate({
          width: '5.5rem'
        }, 100);
        $('#biaoImg').animate({
          right: '4.9rem'
        }, 100);
      } else {
        $('.chat').animate({
          width: 0
        }, 100);
        $('#biaoImg').addClass('biaoFalse').removeClass('biaoTrue');
        $('#biaoImg').animate({
          right: '-.5rem'
        }, 100);
      }
    },

    danMu: function(type) {
      if(type == 0) {
        this.danmuFlag = false;
        $('.danmu').hide();
      } else {
        this.danmuFlag = true;
        $('.danmu').show();
      }
    },
    initData() {
      //判断是什么设备登录
      if(!localStorage.promotionCode) {
        var url = window.parent.location.href;
        // console.log(url)
        if(url != "") {
          if(url.split("?")[1]){
            localStorage.promotionCode = url.split("?")[1].replace(/#/,'').replace(/\//,''); //截取？后的注册码
          }
          if(localStorage.promotionCode=='undefined'){
            localStorage.removeItem('promotionCode');
          }
        }
      }
      var chanel = 0;

      if(window.plus){
        chanel = 3;
        localStorage.app_flag = true;
        this.app_flag=1;
        // alert("app_flag"+this.app_flag);
      }else{
        document.addEventListener('plusready', function(){
          chanel = 3;
          localStorage.app_flag = true;
          this.app_flag=1;
        });
      }
      // localStorage.app_flag = false;
      if(navigator.userAgent.indexOf("lsApp") != -1) {
        chanel = 3;
        localStorage.app_flag = true;
        localStorage.versionNumber_flag = true;
        this.app_flag=1;
      } else if(navigator.userAgent.indexOf("Windows") != -1) {
        chanel = 1;
        this.app_flag = "";
      }
      // if (!localStorage.isTransfer && !localStorage.app_flag && !localStorage.tipsContent) {
      //  this.$router.push({
      //    name: 'transfer'
      //  })
      // }/commonAPI/getResource/v1.1
      if(localStorage.config) {
        var config = JSON.parse(localStorage.config),
          url = window.parent.location.search;
        this.datas = config;
        if(!sessionStorage.isIndex) {
          sessionStorage.isIndex = config.wapSkipShowStatus;
        }
        if(!localStorage.promotionCode){
                if(url != "") {
                  var code = url.split("?").join(""); //截取？后的注册码
                  localStorage.promotionCode = code.substring(0, code.length); //截取推广码
                }
              }
        if(chanel != 3) {
          var url = window.parent.location.search;
        }
      } else {
        var _this=this,isIndex = {
          type: "post",
          data: {},
          url: '/commonAPI/privacy/getSysConfigureResult',
          success: function(data) {
            if(data.code == 200) {
              if(!sessionStorage.isIndex) {
                sessionStorage.isIndex = data.body.wapSkipShowStatus;
              }

              _this.datas = data.body;
              if(_this.datas.onlineConfigure == "onlineCustomerServiceUrl") {
                localStorage.setItem("onlineCustomerServiceUrl", _this.datas.onlineSys_config1);
              }

              _this.logoPic = _this.datas.wapPageLogoConfigure;
              // _this.logoPic = "/static/images/download.png";

              //首页title
              if(data.body.webName) {
                if(_this.baseIndex==1){
                  _this.headTit = data.body.webName;
                  _this.webName = data.body.webName;
                }
                $("head title").html(_this.headTit);

              }

              if(chanel != 3) {
                var url = window.parent.location.search;
              } else {
                localStorage.app_flag = true;
                // __this.app_flag = true;
                localStorage.versionNumber_flag = true;
              }
              localStorage.setItem('config', JSON.stringify(data.body));
              if(!localStorage.promotionCode){
                var url = window.parent.location.search;
                if(url != "") {
                  var code = url.split("?").join(""); //截取？后的注册码
                  localStorage.promotionCode = code.substring(0, code.length); //截取推广码
                }
              }
            }
          }
        };
      }
    },
    loadData: function() {
      var _this = this;
        this.contrastTimestamp();
      switch(this.baseIndex) {
        case 1:
          this.get_login();
          // this.getuserSign();
          // this.get_hongbao();
          if(this.time_) {
            clearInterval(this.time_);
          }
          window.clearInterval(this.s0);
          window.clearInterval(this.s1);
          window.clearInterval(this.s2);
          window.clearInterval(this.s3);
          window.clearInterval(this.s4);
          break;
        case 2:
          this.get_login();
          this.getDigitalColor();
          if(this.time_) {
            clearInterval(this.time_);
          }
          break;
        case 3:
        if(localStorage.userName) {
          localStorage.removeItem("pwd");
          this.changeCoinPwd(); //验证是否已设置资金密码/绑定银行卡
          this.getMessage(); //获取个人中心新消息
          if(this.time_){
            clearInterval(this.time_)
          }
          this.time_ = setInterval(function() {
            // var _this = this;
            var uname = localStorage.getItem("userName");
            var obj = {
              type: "post",
              data: {
                username: uname
              },
              dataType: "json",
              url: "/authApi/msg/getUserMessageNum",
              success: function(data) {
                if(data.code == 200) {
                  _this.numMes = data.body;
                }
              },
              error: function(msg) {
                //console.log(msg);
              }
            };
            _this.base.callAuthApi(obj);
          }, parseInt(this.jiange));
          this.setMyCenterMsg();
          window.clearInterval(this.s0);
          window.clearInterval(this.s1);
          window.clearInterval(this.s2);
          window.clearInterval(this.s3);
          window.clearInterval(this.s4);
          if (!localStorage.szcRebateList){
            this.getGameRebatesList();
          }

        }
        break;
        case 4:
          if(localStorage.userName) {
            localStorage.removeItem("pwd");
            this.changeCoinPwd(); //验证是否已设置资金密码/绑定银行卡
            this.getMessage(); //获取个人中心新消息
            if(this.time_){
              clearInterval(this.time_)
            }
            this.time_ = setInterval(function() {
              // var _this = this;
              var uname = localStorage.getItem("userName");
              var obj = {
                type: "post",
                data: {
                  username: uname
                },
                dataType: "json",
                url: "/authApi/msg/getUserMessageNum",
                success: function(data) {
                  if(data.code == 200) {
                    _this.numMes = data.body;
                  }
                },
                error: function(msg) {
                  //console.log(msg);
                }
              };
              _this.base.callAuthApi(obj);
            }, parseInt(this.jiange));
            this.setMyCenterMsg();
            window.clearInterval(this.s0);
            window.clearInterval(this.s1);
            window.clearInterval(this.s2);
            window.clearInterval(this.s3);
            window.clearInterval(this.s4);
            if (!localStorage.szcRebateList){
              this.getGameRebatesList();
            }

          }
          break;


      }

    },
    //获取余额
    getCoin: function() {
      return
      if(!localStorage.userName) {
        $(".header-left").show();
        $(".header-right").show();
        return
      }
      this.userName = localStorage.userName;
      var _this = this,
        getUserInfo = {
          type: "post",
          url: "/authApi/getCoin",
          data: {
            "username": localStorage.getItem("userName"),
            isWhite: true
          },
          success: function success(data) {
            if(data.code == 200) {
              localStorage.indexCoinMsg=JSON.stringify(data.body);
              var coin = data.body.coin,
              fCoin = data.body.FCION,
              agentCoin= data.body.AGENT_COIN;

              _this.unfinishCoin = data.body.unfinish_coin;
              _this.winLoseCoin = data.body.today_winAndLose_coin;

              if(coin == "") {
                _this.coin = "0.00";
              } else {
                _this.coin = parseFloat(coin).toFixed(2);
              }
              if(fCoin == "") {
                _this.fCoin = "0.00";
              } else {
                _this.fCoin = parseFloat(fCoin).toFixed(2);
              }
              //返点金额
              if (agentCoin == "") {
                _this.agentCoin = "0.00";
              } else {
                _this.agentCoin = parseFloat(agentCoin).toFixed(2);
              }
              _this.usable_coin = _this.coin;
              $(".header-left").hide();
              $(".header-right").hide();
            }
            // else {
            //  $(".header-left").show();
            //  $(".header-right").show();
            //  localStorage.clear();
            // }
          }
        };

      this.base.callAuthApi(getUserInfo);
    },
    //首页的色黄之
    //通过token去查用户是否登录过,若登录过,将展示用户信息(同时控制顶部登录注册按钮是否显示)
    get_login: function() {
      var _this = this;
      if(_this.isUseWebSocket) {
        _this.getCoin();
        return
      }
      if(localStorage.userName != undefined && localStorage.access_token) {
        var options_autoLogin = {
          type: "post",
          url: "/authApi/AutoLoginGetUserinfoByRedis",
          data: {},
          success: function(data) {
            if(data.code == 200) {
              var coin = data.body.COIN,
              fCoin = data.body.FCION,
              agentCoin = data.body.AGENT_COIN;
              if(coin == "") {
                _this.coin = "0.00";
              } else {
                _this.coin = parseFloat(coin).toFixed(2);
              }
              if(fCoin == "") {
                _this.fCoin = "0.00";
              } else {
                _this.fCoin = parseFloat(fCoin).toFixed(2);
              }
              //返点金额
              if (agentCoin == "") {
                _this.agentCoin = "0.00";
              } else {
                _this.agentCoin = parseFloat(agentCoin).toFixed(2);
              }
              _this.usable_coin = _this.coin;
              // $(".header-left").hide();
              // $(".header-right").hide();
            } else {
              // $(".header-left").show();
              // $(".header-right").show();
              // $('.username').hide();
              // $('.loginOut').hide();
              localStorage.clear();
            }
          }
        };
        this.base.callAuthApiNoEcrypt(options_autoLogin);
      } else {
        // $(".header-left").show();
        // $(".header-right").show();
        // $('.username').hide();
        // $('.loginOut').hide();
        // localStorage.clear();
      }
    },
    //获取轮播图片
    get_pic: function() {
      var _this = this,
        advpicture = {
          type: "post",
          data: {},
          url: "/commonAPI/advpicture/selectBySysAdvpicture",
          success: function(data) {
            if(data.code == 200) {
              _this.imgs = data.body;
              localStorage.index_sysAdvpicture = JSON.stringify(data.body);
              if(data.body.length!==0){
                // setTimeout(function () {
                  _this.init_pic();
                // }, 50);
              }

            }
          }
        };
      this.base.callCommonApi(advpicture);
    },
    //初始化轮播插件
    init_pic: function() {
      var _this=this;
      $(function(){
        // var gallery = mui(".mui-slider");
        // gallery.slider({
        //  interval: 1500
        // });  //自动轮播周期，若为0则不自动播放，默认为0；
        _this.slider = new osSlider({ //开始创建效果
          pNode: '.slider', //容器的选择器 必填
          cNode: '.slider-main li', //轮播体的选择器 必填
          speed: 3000, //速度 默认3000 可不填写
          height: 130, //高度
          autoPlay: true //是否自动播放 默认true 可不填写
        });
      });

    },
    //点击轮播图片跳转
    click_href: function(destinationUrl, title) {
      localStorage.pictureTitle = title;
      if(destinationUrl != "") {
        this.skip_newUrl(0, destinationUrl, "destinationUrl", "destinationUrl");

      }
    },
    //获取公告
    get_msg: function() {
      if (this.contents.length != 0 && localStorage.index_sysBulletin) {
        return;
      }
      var _this = this,
        data = {
          pageIndex: 1,
          pageNum: 10,
          pageSize: 10
        },
        bulletin = {
          type: "get",
          data: data,
          dataType: "json",
          url: "/commonAPI/bulletin/selectBySysBulletin",
          success: function(data) {
            if(data.code == 200) {
              localStorage.index_sysBulletin = JSON.stringify(data.body);
              if(data.body.list.length>0){
                _this.scrollNotice="";
              }
              for(var i = 0; i < data.body.list.length; i++) {
                var obj = data.body.list[i];
                if (!_this.popupNotice && obj.contentCss==1){
                  _this.popupNotice = obj;
                  _this.showPopupNotice();
                }
                if (!_this.scrollNotice&&obj.content.indexOf("img")==-1){
                  _this.scrollNotice=obj;
                }
              }
              if (!_this.scrollNotice && data.body.list.length>0){
                _this.scrollNotice = data.body.list[0];
              }
              _this.contents = data.body.list;
              if (_this.scrollNotice){
                _this.initScrollNotice();
                // _this.setScrollNotice();
              }

            }
          }
        };
      this.base.callCommonApi(bulletin);
    },
    //显示弹出公告
    showPopupNotice(){
      var _this=this;
      if (!_this.popupNotice){
        return
      }
      // $("body").css({overflow:"hidden"});
      _this.$nextTick(function(){
          $("#popNotice").removeClass("hide");
          $("#popNotice").css({
            width: "100%"
          });
      });
    },
    //隐藏弹出公告
    hidePopupNotice() {
      var _this = this;
      // $("body").css({
      //   overflow: "auto"
      // })
      $("#popNotice").css({
        width: "0"
      });
      $("#popNotice").css({
        top: -$("#popNotice").height / 2
      });
      setTimeout(function(){
        $("#popNotice").addClass("hide");
      },200)
    },
    //初始化滚动公告
    initScrollNotice(){
      var _this = this;
      _this.scrollNotice = JSON.parse(JSON.stringify(_this.scrollNotice));
      _this.scrollNotice.content = _this.scrollNotice.content.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, "");

      var  w = document.documentElement.clientWidth, selfW = _this.scrollNotice.content.length * parseInt(window.getComputedStyle(document.documentElement)["fontSize"]);


      _this.scrollNoticeTime.maxWidth = selfW;
      _this.scrollNoticeTime.nowLeft = w;
      _this.scrollNoticeTime.addLen = w/12;


    },
    //滚动公告
    setScrollNotice(){
      var _this=this;
      if(_this.scrollNoticeTime.time){
        window.clearInterval(_this.scrollNoticeTime.time);
        _this.scrollNoticeTime.time="";
      }
      _this.scrollNoticeTime.time=setInterval(function(){
        var l = _this.scrollNoticeTime.nowLeft - _this.scrollNoticeTime.addLen;
        $('.msg .scroll>div').css({
          "left": l,
          "display":"block",
        });
        _this.scrollNoticeTime.nowLeft=l;
        if (-_this.scrollNoticeTime.nowLeft >= _this.scrollNoticeTime.maxWidth){
          _this.scrollNoticeTime.nowLeft = _this.scrollNoticeTime.addLen*12;
          $('.msg .scroll>div').css({
            // "transition": "0s",
            "display":"none",
            left: _this.scrollNoticeTime.addLen * 12
          })

        }
      },1000)
    },
    stopScrollNotice: function stopScrollNotice() {
      var _this = this;
      if (_this.scrollNoticeTime.time) {
        window.clearInterval(_this.scrollNoticeTime.time);
        _this.scrollNoticeTime.time = "";
      }
    },
    ////查询当前会员是否有红包（废）
    // get_hongbao: function() {
    //  if(localStorage.userType == 2) {
    //    return;
    //  }
    //  if(!localStorage.userName) {
    //    $('#allActivity').hide();
    //    return;
    //  }
    //  $('#allActivity').show();
    //  var _this = this,
    //    select_byName = {
    //      type: "post",
    //      url: "/authApi/activity/isExistRedPacket",
    //      data: {
    //        userName: localStorage.getItem("userName")
    //      },
    //      dataType: "json",
    //      success: function(data) {
    //        if(data.body != "") {
    //          $(".fixed_right_bottom").css({
    //            zIndex: "99999",
    //            position: "fixed",
    //            right: 0,
    //            bottom: "5rem"
    //          });
    //          var html = "";
    //          html +=
    //            "<div><div class='topSwipeItem'><a href='javascript:void(0)'><img src='" + _this.webUrl + "./static/images/hongbao.gif' style='width: 5.16667rem;'></a></div></div>";
    //          $("#hongbaolaile").html(html);
    //          localStorage.setItem("hongbaoList", JSON.stringify(data.body));
    //        }
    //      },
    //      error: function(e) {
    //        //console.log(e);
    //      }
    //    };
    //  if(
    //    localStorage.getItem("userName") != null &&
    //    localStorage.getItem("userName") != ""
    //  ) {
    //    this.base.callAuthApi(select_byName);
    //  }
    // },
    //点击红包
    // togohongbao: function() {
    //  if(!localStorage.getItem("hongbaoList")) {
    //    mui.toast("暂无红包");
    //    return
    //  }
    //  this.skip_newUrl(0, "/tab/fetchRedPacket", "fetchRedPacket");
    // },
    //获取中奖名单数据
    // getThelottery: function() {
    //  var _this = this,
    //    thelottery = {
    //      type: "post",
    //      data: {},
    //      url: "/commonAPI/selectWinningRecord",
    //      success: function(data) {
    //        //thelotterySpit
    //        //将用户名的后两位加密
    //        if(data.code == 200) {
    //          for(var i = 0; i < data.body.length; i++) {
    //            //substr(0,5)
    //            data.body[i].user_name =
    //              data.body[i].user_name.substr(0, 2) + "***";
    //          }
    //          data.nowTime = nowTime;
    //          localStorage.index_winningRecord = JSON.stringify(data);
    //          _this.getThelotteryFn(data.body);
    //        }
    //      }
    //    },
    //    nowTime = new Date().getTime(),
    //    oldData = localStorage.index_winningRecord ?
    //    JSON.parse(localStorage.index_winningRecord) :
    //    "";
    //  if(this.thelotterys.length != 0) {
    //    return;
    //  } else if(oldData) {
    //    if(nowTime - oldData.nowTime < 300000) {
    //      _this.getThelotteryFn(oldData.body);
    //    } else {
    //      this.base.callCommonApi(thelottery);
    //    }
    //  } else {
    //    this.base.callCommonApi(thelottery);
    //  }
    // },
    // getThelotteryFn: function(data) {
    //  var _this = this;
    //  _this.thelotterys = data;
    //  if(data.length > 4 && $("#colee_bottom").length != 0) {
    //    $("#colee_bottom").css("height", "10rem");
    //    $("#colee_bottom")[0].scrollTop = colee_bottom.scrollHeight;
    //    localStorage.isScroll = 1;
    //    if(_this.thelotterys.length > 4 && $("#colee_bottom")) {
    //      _this.noticeScroll();
    //      return;
    //    }
    //  }
    //  if(data.length > 4) {
    //    var forceTime = setInterval(function() {
    //      if(_this.baseIndex != 1) {
    //        window.clearInterval(forceTime);
    //      }
    //      if($("#colee_bottom")) {
    //        _this.noticeScroll();
    //        window.clearInterval(forceTime);
    //      }
    //    }, 1000);
    //  }
    // },
    //点击中奖榜
    // getDetails: function() {
    //  var _this = this,
    //    thelotterys = _this.thelotterys;
    //  sessionStorage.setItem("thelotterys", JSON.stringify(thelotterys));
    //  // if(this.app_fiag == undefined) {
    //  this.skip_newUrl(
    //    0,
    //    "message/winningDetails",
    //    "winningDetails"
    //  );
    // },
    //关闭底部固定广告
    // close_banner: function() {
    //  //关闭底下弹出广告
    //  $("#bottom-guanggao").addClass("hide");
    // },
    //关闭下载app图片一栏
    // closeDownloadPic: function() {
    //  $(".downloadPic").slideUp();
    // },
    //点击下载app
    // start_app: function() {
    //  if(localStorage.config != undefined) {
    //    var con = JSON.stringify(config);
    //    con = JSON.parse(con);
    //    window.location.href = con.androidEditionDownloadUrl;
    //  }
    // },

    compareNum: function(property) {
      return function(a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
      };
    },

    //彩种显示
    getTzType: function() {
      if (this.getColoredLeafConfigureList.length != 0 && localStorage.index_sysLottery) {
        return;
      }
      var that = this,
        tzTypeList = {
          type: "post",
          data: {
            source_type: 1
          },
          url: "/commonAPI/qryAllGame1Info",
          success: function(data) {
            if(data.code == 200) {
              for(var i = 0; i < data.body.length; i++) {
                if(!data.body[i].show_type == 1 || !data.body[i].show_type == 3) {
                  data.body.splice(i, 1);
                  i--;
                }
              }
              var gameList = [], codeList = [], isJC = 0,
              nameList={
                "ssc":"时时彩",
                "k3": "快三",
                "kl10f": "快乐十分",
                "PK10": "pk拾",
                "hk6": "六合彩",
                "11x5": "11选5",
                "3D": "3D彩",
                "PCDD": "北京28",
                "7xc": "七星彩",
              };
              that.getColoredLeafConfigureList = [];
              that.variety = {
                0: {
                  list: [],
                  name: [],
                },
                1: {
                  list: [],
                  name: [],
                },
                2: {
                  list: [],
                  name: [],
                },
                show: 2
              }
              var gameIdListObj = {};
              data.body.map(function (item,index) {
                data.body[index].codeName = "竞技彩";
                if (item.code) {
                  data.body[index].codeName=nameList[item.code];
                  if (!gameIdListObj[item.code]) {
                    gameIdListObj[item.code] = item.gameID;
                    codeList.push(item.code);
                    gameList.push([item]);
                  } else {
                    gameIdListObj[item.code] = gameIdListObj[item.code] + ',' + item.gameID;
                    gameList[codeList.indexOf(item.code)].push(item);
                  }
                } else {
                  if (isJC == 0) {
                    codeList.unshift("isJC")
                    gameList.unshift([item]);
                  } else {
                    gameList[codeList.indexOf('isJC')].push(item);
                  }
                }

              });


              if (!that.szcIdList.gameIdList){
                that.szcIdList.setGameIdList(gameIdListObj);
              }
              gameList.map(function (item) {
                item.sort(function (a, b) {
                  return a.gameID - b.gameID
                })
              })
              //将二维数组转为一维数组
              gameList = [].concat.apply([], gameList);
              data.body = gameList;
              localStorage.index_sysLottery = JSON.stringify(data.body);

              // $("#fixedGameList .hiddenClick").trigger("click");
              data.body.map(function(item) {

                if(item.is_hot == 1) {
                  that.hot.push(item);
                }

                that.getColoredLeafConfigureList.push(item);
              });
              that.variety = {
                0: {
                  list: [],
                  name: [],
                },
                1: {
                  list: [],
                  name: [],
                },
                2: {
                  list: [],
                  name: [],
                },
                show: 2
              }
              // that.hot = that.hot.sort(that.compareNum('sort'));
              // that.getColoredLeafConfigureList = that.getColoredLeafConfigureList.sort(that.compareNum('sort'));
              if(that.hot.length % 2 == 0) {
                that.hot.splice(-1, 1);
              }
              that.thanGameType = [];
              that.getColoredLeafConfigureList.map(function(item) {
                item.isCollect = 0;
                that.collectContrastIdList.push(parseInt(item.gameID));
                that.thanGameType.push(item.game_type);
                if(item.game_type == 0) {
                  that.setVarietyItem(0,item);
                  // that.variety[0].push(item);
                } else if(item.game_type == 1) {
                  that.setVarietyItem(1,item);
                  // that.variety[1].push(item);
                } else {
                  that.setVarietyItem(2, item);
                  // that.variety[2].push(item);
                }
              })

              //console.log(that.hot);

            }
          },
        };
      this.base.callCommonApi(tzTypeList);
    },
    setVarietyItem(index,item){
      var _this=this;
      if (_this.variety[index].name.length==0){
        _this.variety[index].list.push([item]);
        _this.variety[index].name.push(item.codeName);
      } else if (_this.variety[index].name.indexOf(item.codeName)!=-1){
        var outIndex = _this.variety[index].name.indexOf(item.codeName);
        _this.variety[index].list[outIndex].push(item);
      }else{
        _this.variety[index].list.push([item]);
        _this.variety[index].name.push(item.codeName);
      }
    },
    //点击首页
    // href1: function(event) {

    //  if(this.baseIndex == 1) {
    //    return
    //  } else {
    //    this.baseIndex = 1;
    //  }
    //   this.headTit = localStorage.webName;
    //  event = event.currentTarget;
    //  // $(event).css({
    //  //  transform: "rotateY(-180deg)"
    //  // });
    //  // setTimeout(function() {
    //  //  $(event).css({
    //  //    transform: "rotateY(-0deg)"
    //  //  });
    //  // }, 300)
    //  if(localStorage.app_flag != undefined) {
    //    $("#main")
    //      // .css("position", "relative")
    //      .css("top", "0");
    //    $("#header").css("top", "0");
    //  }
    // },
    // href2: function(event) {
    //   var _this = this;
    //  if(this.baseIndex == 2) {
    //    return
    //  } else {
    //    this.baseIndex = 2;
    //  }
    //  _this.headTit = "游戏大厅";
    //  event = event.currentTarget;
    //  // $(event).css({
    //  //  transform: "rotateY(-180deg)"
    //  // });
    //  // setTimeout(function() {
    //  //  $(event).css({
    //  //    transform: "rotateY(-0deg)"
    //  //  });
    //  // }, 300)
    //  if(localStorage.app_flag != undefined) {
    //    $("#main")
    //      // .css("position", "relative")
    //      .css("top", "0");
    //    $("#header").css("top", "0");
    //  }
    // },
    // //点击个人中心判断
    // href3: function(event) {
    //  if(this.baseIndex == 3) {
    //    return
    //  }
    //   this.headTit = "我的账户";
    //  if(localStorage.userName != undefined) {
    //    this.baseIndex = 3;
    //    $('.header-right').hide();
    //    // event = event.currentTarget;
    //    // $(event).css({
    //    //  transform: "rotateY(-180deg)"
    //    // });
    //    // setTimeout(function() {
    //    //  $(event).css({
    //    //    transform: "rotateY(-0deg)"
    //    //  });
    //    // }, 300);
    //    // $("#main").css("top", "0");
    //    // $("#header").css("top", "0");
    //  } else {
    //    this.skip_newUrl(0, "/loginIn/login", "login");
    //  }
    // },
    // href4: function(event) {
    //   if(this.baseIndex == 4) {
    //     return
    //   }

    //   if(localStorage.userName != undefined) {
    //     this.baseIndex = 4;
    //     // event = event.currentTarget;
    //     // $(event).css({
    //     //   transform: "rotateY(-180deg)"
    //     // });
    //     // setTimeout(function() {
    //     //   $(event).css({
    //     //     transform: "rotateY(-0deg)"
    //     //   });
    //     // }, 300);
    //     // $("#main").css("top", "0");
    //     // $("#header").css("top", "0");
    //   } else {
    //     this.skip_newUrl(0, "/loginIn/login", "login");
    //   }
    // },
    //点击返回热门彩种的url为空时弹出提示
    popPrompt: function() {
      mui.toast("近期上线，敬请期待！");
    },
    //点击优惠活动
    act: function() {
      this.skip_newUrl(0, "myCenter/activity", "activity", "activity");
    },
    //点击顶部登录
    login: function() {
      // if(this.app_fiag == undefined) {
      this.$router.push({
        name: "login"
      });
      // } else {
      //  this.skip_newUrl(1, "/loginIn/login", "login");
      // }
    },
    //点击顶部注册
    register: function() {
      this.$router.push({name: "register" });
    },
    //点击领红包
    togofetchRedPacket: function() {
      // if(localStorage.userType == 2) {
      //  mui.toast('当前为试玩账号');
      //  return;
      // }
      if(!localStorage.userName) {
        this.$router.push({
          name: 'login'
        });
        return
      }
      if(!localStorage.hongbaoList) {
        mui.toast("暂无红包")
        return
      }
      if(localStorage.userName != undefined) {
        // if(localStorage.app_flag == undefined) {
        this.skip_newUrl(0, "tab/fetchRedPacket", "fetchRedPacket");
        // } else {
        //  this.skip_newUrl(1, 'fetchRedPacket.html', 'fetchRedPacket');
        // }
      } else {
        // if(localStorage.app_flag == undefined) {
        this.skip_newUrl(0, '/loginIn/login', 'login');
        // } else {
        //  this.skip_newUrl(1, 'loginIn/login', 'login');
        // }
      }
    },
    //点击比分
    togolive: function() {
      // if(localStorage.app_flag == undefined) {
      this.skip_newUrl(0, 'tab/live', 'live');
      // } else {
      //  this.skip_newUrl(1, 'tab/live', 'live');
      // }
    },
    //点击客服
    // togocustomerService: function() {
      // if(localStorage.app_flag == undefined) {
      // this.skip_newUrl(0, 'service/customerService', 'customerService');
      // } else {
      //  this.skip_newUrl(1, 'service/customerService', 'customerService');
      // }
    // },

    //点击在线客服跳转
    onlineCustomerServiceSkip: function(configure) {
      if(!localStorage.userName) {
        this.$router.push({
          name: 'login'
        });
        return
      }
    //   if(configure != undefined) {
    //     localStorage.onlineServiceUrl = configure;
        this.$router.push({
          name: "onlineService"
        })
    //   } else {
    //     mui.toast('请稍后重试');
    //   }
    },

    togolottery: function() {
      if(localStorage.userName != undefined) {
        // if (localStorage.app_flag == undefined) {
        this.skip_newUrl(0, 'myCenter/activity', 'activity');
        // } else {
        //   this.skip_newUrl(1, 'myCenter/activity', 'activity');
        // }
      } else {
        // if (localStorage.app_flag == undefined) {
        this.skip_newUrl(0, '/loginIn/login', 'login');
        // } else {
        //   this.skip_newUrl(1, 'loginIn/login', 'login');
        // }
      }
      // this.baseIndex = 2;
    },

    //点击充值充值
    togodepositFile: function() {

      if(localStorage.userName) {
        this.skip_newUrl(0, "myCenter/depositFile", "depositFile");
      } else {
        this.skip_newUrl(0, "/loginIn/login", "login");
      }
    },
    //点击资金明细
    togoFundDetails: function() {
      if(localStorage.userName) {
        this.skip_newUrl(0, "myCenter/fundDetails", "fundDetails");
      } else {
        this.skip_newUrl(0, "/loginIn/login", "login");
      }
    },
    //点击公告
    togoannouncement: function() {
      // if(this.app_fiag == undefined) {
      this.skip_newUrl(0, "message/announcement", "announcement");
      // } else {
      //  this.skip_newUrl(1, "announcement.html", "announcement");
      // }
    },
    //点击进入投注页面
    togocontentUrl: function (contentUrl, gameID, imgUrl, showName) {
      if(!localStorage.userName){
        this.$router.push({
          name:"login"
        });
        return
      }
      // $("#fixedGameList span.active").removeClass("active");
      // $("#fixedGameList span[name=" + showName + "]").addClass("active");
      localStorage.lottery_img = imgUrl; //开奖页面用到图片url
      localStorage.lottery_url = contentUrl; //开奖页面用到投注页面url
      localStorage.gameID = gameID;
      var dealUrl = contentUrl.replace("_", "").replace(".html", "").replace("?", "/");
      this.skip_newUrl(0, dealUrl, "");
    },
    //开奖页面--***************************************************************/
    //获取所有一级玩法
    getDigitalColor: function() {
      var _this = this;
      $("#1").addClass("tab_li_active");
      var data = {};
      var obj = {
        type: "post",
        data: data,
        dataType: "json",
        url: "/commonAPI/qryDigitalGameIntro",
        success: function(data) {
          if(_this.s4 != '') {
            window.clearInterval(_this.s4);
          }
          if(data.code == 200 && data.body.length != 0) {
            for(var i = 0; i < data.body.length; i++) {
              if(data.body[i].luck_number) {
                if(data.body[i].gameID == 9) {
                  data.body[i].luck_number = data.body[i].luck_number.replace(/,/g, ",+,");
                  var arr1 = data.body[i].luck_number.split(",");
                  var sum = parseInt(arr1[0]) + parseInt(arr1[2]) + parseInt(arr1[4]);
                  arr1.push("=");
                  arr1.push(sum);
                  data.body[i].arr = arr1;
                } else {
                  data.body[i].luck_number = data.body[i].luck_number.replace("+", ",=,");
                  var arr = data.body[i].luck_number.split(",");
                  data.body[i].arr = arr;
                }
              } else {
                data.body[i].arr = [];
              }

              if(!data.body[i].issue) {
                data.body.splice(i, 1);
                i--;
              }
            }
            _this.digitalColor_list = {
              hot: [],
              high: [],
              low: []
            };
            data.body.map(function(item) {
              //热门
              if(item.is_hot) {
                _this.digitalColor_list.hot.push(item);
              }
              //高频
              if(item.game_type == 2 || item.game_type == 3) {
                _this.digitalColor_list.high.push(item);
              } else if(item.game_type == 1) {
                //低频
                _this.digitalColor_list.low.push(item);
              }
            });
            _this.isHava = _this.digitalColor_list.hot;
            _this.showDigitalColor(1);

            _this.s4 = setInterval(function() {
              _this.getDigitalColor();
            }, 20000);
          }else if (data.code==201){
            if(_this.s4 != '') {
              window.clearInterval(_this.s4);
            }
          }

        },
        error: function(msg) {
          console.log(msg);
          setTimeout(function(){
              _this.getDigitalColor();
          },5000)
        }
      };
      this.base.callCommonApi(obj);
    },
    //点击分类切换玩法
    showDigitalColor: function(kind_id) {
      var _this = this;
      //        this.isHava = [];
      if(kind_id == 1) {
        _this.isHava = _this.digitalColor_list.hot;
        $(".shuzicai_ul li").removeClass("tab_li_active");
        $("#1").addClass("tab_li_active");
        for(var i = 0; i < this.digitalColor_list.length; i++) {
          if(this.digitalColor_list[i].is_hot == 1) {
            this.isHava.push(this.digitalColor_list[i]);
          }
        }
      } else if(kind_id == 2) {
        _this.isHava = _this.digitalColor_list.high;
        $(".shuzicai_ul li").removeClass("tab_li_active");
        $("#" + kind_id).addClass("tab_li_active");
        for(var i = 0; i < this.digitalColor_list.length; i++) {
          if(this.digitalColor_list[i].kind_id == kind_id) {
            this.isHava.push(this.digitalColor_list[i]);
          }
        }
      } else if(kind_id == 3) {
        _this.isHava = _this.digitalColor_list.low;
        $(".shuzicai_ul li").removeClass("tab_li_active");
        $("#" + kind_id).addClass("tab_li_active");
        for(var i = 0; i < this.digitalColor_list.length; i++) {
          if(this.digitalColor_list[i].kind_id == kind_id) {
            this.isHava.push(this.digitalColor_list[i]);
          }
        }
      }
    },
    //数字彩点击跳转
    togoSkip: function(item) {
      localStorage.lottery_img = item.pic_url; //开奖页面用到图片url
      localStorage.lottery_url = item.bet_url; //开奖页面用到投注页面url
      localStorage.chartId = item.gameID; //一级玩法id
      var dealUrl = item.forward_url.replace(".html", "");
      if(item.code) {
        this.$router.push({
          path: dealUrl,
          name: "award_page",
          params: {
            "code": item.code,
            "name": item.show_name
          }
        })
      } else {
        this.skip_newUrl(0, dealUrl, "url");
      }

      // if(this.app_fiag == undefined) {
      //  this.skip_newUrl(0, item.forward_url, "url");
      // } else {
      //  this.skip_newUrl(1, item.forward_url, "url");
      // }
    },
    //检查开奖信息是否都加载完毕
    checkPrizeStatius: function() {
      if(
        this.jclq_flag &&
        this.jczq_flag &&
        this.zqdc_flag &&
        this.rxj_flag
      ) {
        this.p_flag = true;
      }
    },
    //竞技彩部份
    //点击竞彩足球
    togojczq: function() {
      if(!this.jczqFlag) {
        mui.toast("暂无数据");
        return;
      }
      // if(this.app_fiag == undefined) {
      this.skip_newUrl(0, "tab/jczq", "jczq");
      // } else {
      //  this.skip_newUrl(1, "tab/jczq.html", "jczq");
      // }
    },
    //点击足球单场
    togozqdc: function() {
      if(!this.zqdcFlag) {
        mui.toast("暂无数据");
        return;
      }
      // if(this.app_fiag == undefined) {
      this.skip_newUrl(0, "tab/zqdc", "zqdc");
      // } else {
      //  this.skip_newUrl(1, "tab/zqdc.html", "zqdc");
      // }
    },
    //点击胜负彩/任选九
    togosfc_rx9: function() {
      if(!this.sfcFlag) {
        mui.toast("暂无数据");
        return;
      }
      // if(this.app_fiag == undefined) {
      this.skip_newUrl(0, "tab/sfc_rx9", "sfc_rxnine");
      // } else {
      //  this.skip_newUrl(1, "tab/sfc_rx9.html", "sfc_rxnine");
      // }
    },
    //点击竞猜篮球
    togojclq: function() {
      if(!this.jclqFlag) {
        mui.toast("暂无数据");
        return;
      }
      // if(this.app_fiag == undefined) {
      this.skip_newUrl(0, "tab/jclq", "jclq");
      // } else {
      //  this.skip_newUrl(1, "tab/jclq.html", "jclq");
      // }
    },
    checkdate: function(time) {
      return time.replace(/\:/g, "") < 120000;
    },
    getBeforeDays: function(currDate, num) {
      //num表示天数，接受正负数
      if(!num) {
        //做num简单验证
        return currDate;
      }
      num = Math.floor(num);
      var symbol = "/";
      if(currDate.indexOf("-") > -1) {
        symbol = "-";
        currDate = currDate.replace(/-/g, "/");
      } else if(currDate.indexOf(".") > -1) {
        symbol = ".";
        currDate = currDate.replace(/\./g, "/");
      }
      //symbol = '-'; //定制输出分隔符
      var myDate = new Date(currDate),
        lw = new Date(Number(myDate) + 1000 * 60 * 60 * 24 * num), //num天数
        lastY = lw.getFullYear(),
        lastM = lw.getMonth() + 1,
        lastD = lw.getDate(),
        startdate =
        lastY +
        symbol +
        (lastM < 10 ? "0" + lastM : lastM) +
        symbol +
        (lastD < 10 ? "0" + lastD : lastD);
      return startdate;
    },

    //我的(个人中心和登录页面)--***************************************************************/
    getMessage: function() {
      var _this = this,
        uname = localStorage.getItem("userName"),
        obj = {
          type: "post",
          data: {
            username: uname
          },
          dataType: "json",
          url: "/authApi/msg/getUserMessageNum",
          success: function(data) {
            if(data.code == 200) {
              _this.numMes = data.body;
            }
          },
          error: function(msg) {
            //console.log(msg);
          }
        };
      this.base.callAuthApi(obj);
    },
    //验证是否已设置资金密码/绑定银行卡
    changeCoinPwd: function() {
      var _this = this,
        uname = localStorage.getItem("userName"),
        obj = {
          type: "post",
          data: {
            username: uname
          },
          dataType: "json",
          url: "/authApi/privacy/getPrivacyStatus",
          success: function(data) {
            if(data.code == 200) {
              localStorage.userType_ = data.body.userType;
              _this.isTrue = data.body;
              _this.userType = data.body.userType;
              if(localStorage.userType != 2) {
                if(_this.isTrue.perfectMarker == 1) {
                  $("#isUserInfo").hide();
                } else {
                  $("#isUserInfo").show();
                }
                if(localStorage.config) {
                  _this.config = JSON.parse(localStorage.getItem("config"));
                  _this.coinUnit = _this.config.coinUnit;
//                  if(_this.proCode) {
//                    localStorage.promotionUrl = _this.proCode.shortenUrl;
//                  } else {
//                    var promotionUrl = _this.config.promotionUrl;
//                    if(promotionUrl != "" || promotionUrl != undefined) {
//                      localStorage.promotionUrl =
//                        promotionUrl +
//                        "/?" +
//                        _this.isTrue.promotionCode;
//                    }
//                  }
                }
              }
              localStorage.bankPrivacyStatus = _this.isTrue.bankPrivacyStatus;
              localStorage.coinPrivacyStatus = _this.isTrue.coinPrivacyStatus;
              localStorage.setItem("isTrue", JSON.stringify(_this.isTrue));
            }
          },
          error: function(msg) {
            //console.log(msg);
          }
        };
      this.base.callAuthApi(obj);
    },

    //点击取款
    clickEnchash: function() {
      if(localStorage.userType_ == 6){
        mui.toast('测试账号无法提现');
        return;
      }
      if(!localStorage.userName){
        this.$router.push({
          name:'login'
        });
        return
      }
      var _this = this;
      if(localStorage.isTrue&&!_this.isTrue){
        _this.isTrue=JSON.parse(localStorage.isTrue);
      }
      if(_this.isTrue.perfectMarker == 1) { //完善
        if(_this.isTrue.bankPrivacyStatus) {  //是否绑定银行卡
          if(_this.isTrue.coinPrivacyStatus) { //资金密码
            _this.skip_newUrl(0, "myCenter/enchashment", "enchashment");
          } else {
            if(localStorage.app_flag == undefined) {
              localStorage.urlid = 1;
              _this.skip_newUrl(0, "myCenter/moneyPwd", "moneyPwd");
            } else {
              _this.skip_newUrl(1, "myCenter/moneyPwd", "moneyPwd");
            }
          }
        } else {
          _this.skip_newUrl(0, "myCenter/bindCard", "bindCard");
        }
      } else {
        // mui.confirm("请先完善个人信息", function(e) {
        //  if (e.index == 1) {
        //    _this.skip_newUrl(0, "myCenter/userPerfectInfo", "userPerfectInfo");
        //  }
        // });
        mui.confirm("请先完善个人信息", "提示", ["取消", "确定"], function(e) {
          if (e.index == 1) {
            _this.skip_newUrl(0, "myCenter/userPerfectInfo", "userPerfectInfo");
          }
          // return false;
        });
      }
    },
    //查询是否有签到活动(废)
    // getuserSign: function() {
    //   if(!localStorage.userName){
    //     return
    //   }
    //  if(localStorage.userType == 2) {
    //    return;
    //  }
    //  var _this = this;
    //  var obj = {
    //    type: "post",
    //    data: {},
    //    //              async:false,
    //    dataType: "json",
    //    url: "/authApi/sign/getSignInfo",
    //    success: function(data) {
    //      if(data.code == 200) {
    //        if(data.body.signStatus == 1) {
    //          $(".sign").show();
    //        } else {
    //          $(".sign").hide();
    //        }
    //      } else {
    //        $(".sign").hide();
    //      }
    //    },
    //    error: function(msg) {
    //      //console.log(msg);
    //    }
    //  };
    //  this.base.callAuthApi(obj);
    // },
    //获取系统配置
    get_ConfigureResult: function() {
      //        if(localStorage.config) {
      //          this.config = JSON.parse(localStorage.config);
      //          this.headTit = this.config.webName;
      //          var ua = navigator.userAgent.toLowerCase();
      //                if(/iphone|ipad|ipod/.test(ua)) {
      ////                  this.downUrl = this.config.iosEditionDownloadUrl;
      //                  this.downUrl ="itms-services://?action=download-manifest&url=http://23.234.12.119:1085/commonAPI/plist";
      //                } else if(/android/.test(ua)) {
      //                  this.downUrl = this.config.androidEditionDownloadUrl;
      //                } else {
      //                  this.downUrl = this.config.androidEditionDownloadUrl;
      //                }
      //          this.promotionUrl=this.config.promotionUrl;
      //          $('head title').html(this.headTit);
      //          return;
      //        }
      var _this = this,
        privacy = {
          type: "post",
          data: {},
          url: "/commonAPI/privacy/getSysConfigureResult",
          success: function(data) {
            _this.config = data.body;
            //金额单位
            if(data.body.coinUnit) {
              _this.coinUnit = data.body.coinUnit;
            }
            //限制金额大小
            _this.singleMaxSum = data.body.singleMaxSum;

            _this.logoPic = data.body.wapPageLogoConfigure;
            // _this.logoPic = "/static/images/download.png";


            //首页title
            if(data.body.webName) {
              _this.headTit = data.body.webName;
              _this.webName  = data.body.webName;
              $("head title").html(_this.headTit);
            }

            //首页广告（跳注册）
            if(data.body.registerActivityUrl) {
              _this.index_banner = data.body.registerActivityUrl
            }
            //app下载链接设置

            _this.downUrl_img = data.body.appDownloadingActivitiesUrl;
            var ua = navigator.userAgent.toLowerCase();
            if(/iphone|ipad|ipod/.test(ua)) {
              //                  _this.downUrl = data.body.iosEditionDownloadUrl;
              _this.downUrl =
                "itms-services://?action=download-manifest&url=http://23.234.12.119:1085/commonAPI/plist";
            } else if(/android/.test(ua)) {
              _this.downUrl = data.body.androidEditionDownloadUrl;
            } else {
              _this.downUrl = data.body.androidEditionDownloadUrl;
            }
            _this.promotionUrl = data.body.promotionUrl;
            //单场赔率百分比
            if(data.body.northReturnAwardRate) {
              _this.odds_percent =
                parseFloat(data.body.northReturnAwardRate) > 1 ?
                parseFloat(data.body.northReturnAwardRate) / 100 :
                parseFloat(data.body.northReturnAwardRate);
            }

            //对比当前版本与最，如果不同则提示用户是否更新
            if(localStorage.app_flag != undefined) {
              var version = plus.runtime.version;
              if(
                version != data.body.appCurrentVersion
              ) {
                localStorage.versionNewCode = 1;
                var upr;
                // var ua2 = navigator.userAgent.toLowerCase();
                // if(!data.body.iosEditionDownloadUrl&&(/iphone|ipad|ipod/.test(ua2))){
                //   return
                // }else if(!data.body.androidEditionDownloadUrl&&(/android/.test(ua2))){
                //   return
                // }
                // 更新应用资源
                function installWgt(path){
                  plus.nativeUI.showWaiting("资源更新中，请勿关闭app...");
                  plus.runtime.install(path,{},function(){
                      plus.nativeUI.closeWaiting();
                      plus.nativeUI.alert("应用资源更新完成！",function(){
                          plus.runtime.restart();
                      });
                  },function(e){
                      plus.nativeUI.closeWaiting();
                      plus.nativeUI.alert("资源更新失败["+e.code+"]："+e.message);
                  });
                  }


                  // 下载wgt文件
                  var wgtUrl="http://ssgcp.net/lsapi/commonAPI/getResource/v"+data.body.appCurrentVersion;
                  function downWgt(){
                    plus.nativeUI.showWaiting("下载wgt文件...");
                    plus.downloader.createDownload( wgtUrl, {filename:"_doc/update/"}, function(d,status){
                        if ( status == 200 ) {
                            console.log("下载wgt成功："+d.filename);
                            installWgt(d.filename); // 安装wgt包
                        } else {
                            console.log("下载wgt失败！");
                            plus.nativeUI.alert("下载wgt失败！");
                        }
                        plus.nativeUI.closeWaiting();
                    }).start();
                  }
                  downWgt();
                // plus.nativeUI.confirm(
                //  "有新版本发布了，是否更新？",
                //  function(e) {
                //    upr = e.index == 0 ? "Y" : "N";
                //    if(upr == "Y") {
                //      var ua2 = navigator.userAgent.toLowerCase();
                //      if(/iphone|ipad|ipod/.test(ua2)) {
                //        var ios_url = data.body.iosEditionDownloadUrl;
                //        plus.runtime.launchApplication({
                //            action: ios_url
                //          },
                //          function(e) {
                //            alert(e.message);
                //          }
                //        );
                //      } else if(/android/.test(ua2)) {
                //        var wt = plus.nativeUI.showWaiting(
                //          "下载更新中，请勿关闭"
                //        );
                //        var and_url = data.body.androidEditionDownloadUrl;
                //        var dtask = plus.downloader.createDownload(
                //          and_url, {},
                //          function(d, status) {
                //            if(status == 200) {
                //              var path = d.filename;
                //              plus.runtime.install(path);
                //            } else {
                //              mui.alert("下载失败");
                //              plus.nativeUI.closeWaiting();
                //            }
                //          }
                //        );
                //        dtask.start();
                //      }
                //    } else {
                //      //点击取消
                //    }
                //  },
                //  data.body.webName, ["确认", "取消"]
                // );
              } else {
                //mui.alert('当前版本最新');
              }
            }

            localStorage.setItem("config", JSON.stringify(data.body));
          }
        };
      this.base.callCommonApi(privacy);
    },

    //点击消息
    togomessage: function() {
      // if(localStorage.app_flag  == undefined) {
      this.skip_newUrl(0, "myCenter/message", "message");
      // } else {
      //  this.skip_newUrl(1, "myCenter/message.html", "message");
      // }
    },
    //点击咨询
    // togocustomerService: function() {
    //  // if(this.app_fiag == undefined) {
    //  this.skip_newUrl(
    //    0,
    //    "service/customerService",
    //    "customerService2"
    //  );
    //  // } else {
    //  //  this.skip_newUrl(
    //  //    1,
    //  //    "service/customerService.html",
    //  //    "customerService2"
    //  //  );
    //  // }
    // },
    //点击中奖记录
    togowinningRecord: function() {
      this.$router.push({
        name: bettingRecord,
        params: {
          status: 1
        }
      });
      //      if(this.app_fiag == undefined) {
      //        this.skip_newUrl(0, "myCenter/bettingRecord", "bettingRecord");
      //      } else {
      //        this.skip_newUrl(1, "myCenter/bettingRecord.html", "bettingRecord");
      //      }
    },
    //点击投注记录
    togobettingRecord: function() {
      this.$router.push({
        name: bettingRecord,
        params: {
          status: 0
        }
      });
      //      if(this.app_fiag == undefined) {
      //        this.skip_newUrl(0, "myCenter/bettingRecord", "bettingRecord");
      //      } else {
      //        this.skip_newUrl(1, "myCenter/bettingRecord.html", "bettingRecord");
      //      }
    },
    //点击账变记录
    togofootFundDetails: function(str) {
      // if(this.app_fiag == undefined) {

      this.$router.push({ name: 'footFundDetails', params: { status: str }});


      // } else {
      //  this.skip_newUrl(
      //    1,
      //    "myCenter/footFundDetails.html",
      //    "footFundDetails"
      //  );
      // }
    },


    //点击充值记录
    togoRecharge: function() {
      this.$router.push({ name: 'rechargeRecord'});
    },
    //提款
    togoPresent: function() {
      this.$router.push({ name: 'presentRecord'});
    },

    //点击优惠卷兑换
    togocoupon: function() {
      this.skip_newUrl(0, "myCenter/coupon", "coupon");
    },
    //点击个人信息
    togoperfectUserInfo: function() {
      this.skip_newUrl(
        0,
        "myCenter/userPerfectInfo",
        "perfectUserInfo"
      );
    },
    //点击历史报表
    togoReport: function() {
      this.skip_newUrl(
        0,
        "agency/agentReport",
        "agentReport"
      );
    },
    //点击修改密码
    togochangePwd: function(a) {
      var _this = this;
      if(a==2){
        if(_this.isTrue.coinPrivacyStatus) { //资金密码
          this.$router.push({ name: 'changePwd', params: { status: a }});
        } else {
          if(localStorage.app_flag == undefined) {
            localStorage.urlid = 1;
            _this.skip_newUrl(0, "myCenter/moneyPwd", "moneyPwd");
          } else {
            _this.skip_newUrl(1, "myCenter/moneyPwd", "moneyPwd");
          }
        }

      }else{
        this.$router.push({ name: 'changePwd', params: { status: a }});
      }



    },
    //点击个人设置
    togosetting: function() {
      // if(this.app_fiag == undefined) {
      this.skip_newUrl(0, "myCenter/setting", "setting");
      // } else {
      //  this.skip_newUrl(1, "myCenter/setting.html", "setting");
      // }
    },
    //点击app下载
    togodownload: function() {
      // if(this.app_fiag == undefined) {
      this.skip_newUrl(0, "transfer", "transfer");
      // } else {
      //  this.skip_newUrl(1, "transfer.html", "transfer");
      // }
    },
    //点击查看推广码
    togoshare: function() {
      // if(this.app_fiag == undefined) {
      this.skip_newUrl(0, "myCenter/share", "share");
      // } else {
      //  this.skip_newUrl(1, "myCenter/share.html", "share");
      // }
    },
    //用户签到
    togoSign: function() {
      // if(localStorage.userType == 2) {
      //  mui.toast('当前为试玩账号');
      //  return;
      // }
      // if(this.app_fiag == undefined) {
      this.skip_newUrl(0, "mycenter/userSign", "userSign");
      // } else {
      //  this.skip_newUrl(1, "mycenter/userSign.html", "userSign");
      // }
    },
    togoChat: function() {
      if(!this.base.websock) {
        mui.toast('请先登录');
        return;
      }
      this.skip_newUrl(0, "chat/wChat", "wChat");
    },
    //mui跳转方法
    skip_newUrl: function(index, url, nameId,parma) {
      if(!localStorage.userName&&url!="transfer"){
        this.$router.push({name:"login"});
        return
      }
      if(parma){
        this.$router.push({ path: url,params:{ type : parma }});
      }else {
        this.$router.push({ path: url});
      }
    },
    //退出登录
    loginOut: function() {
      var _this = this;
        //清除localStorage
        var loginout = {
          type: "post",
          url: "/authApi/loginout",
          data: {
            userName: localStorage.getItem("userName")
          },
          success: function(data) {
            if(data.code == 200) {
              // $('.loginOut').hide();
              // $('.username').hide();
              // $(".header-left").show();
              // $(".header-right").show();
              // _this.$set.userName = "";
              _this.userName="";
              var userName=localStorage.userName;
              mui.toast("退出成功");
              window.clearInterval(_this.time_);
              clearInterval(_this.MyMar2);
              // localStorage.isIndex = 2;
              if(localStorage.app_flag != undefined) {
                var arr = [];
                arr = JSON.stringify({
                  messType: '900',
                  userName: userName,
                  code: '001'
                });
                if(_this.base.websock.readyState===1){
                  _this.base.websock.send(arr);
                }
                localStorage.clear();
                _this.baseIndex = 1;
                localStorage.device_uuid = plus.device.uuid;
              } else {
                _this.baseIndex = 1;
                var arr = [];
                arr = JSON.stringify({
                  messType: '900',
                  userName: userName,
                  code: '001'
                });
                if(_this.base.websock.readyState===1){
                  _this.base.websock.send(arr);
                }
                localStorage.clear();

              }
              // localStorage.userName="";
              //            _this.$router.push({name:'index'})
            } else {
              localStorage.clear();
            }
            _this.initData();
          }
        };
        if(localStorage.isOnHeartBeat == 1) {
          var waitHeartBeatEnd = setInterval(function() {
            if(localStorage.isOnHeartBeat != 1) {
              clearInterval(waitHeartBeatEnd);
              _this.base.callAuthApi(loginout);
            }
          }, 1000);
        } else {
          _this.base.callAuthApi(loginout);
        }
    },
    //个人中心信息设置
    setMyCenterMsg: function() {
      return
      localStorage.typeId = 1; //初始化
      var _this = this;
      if(localStorage.coinMsg) {
        var coinMsg = JSON.parse(localStorage.coinMsg),
        coin = coinMsg.coin,
        fCoin = coinMsg.fcoin,
        agentCoin = coinMsg.AGENT_COIN;
        if(coin == "") {
          _this.coin = "0.00";
        } else {
          _this.coin = parseFloat(coin).toFixed(2);
        }
        if(fCoin == "") {
          _this.fCoin = "0.00";
        } else {
          _this.fCoin = parseFloat(fCoin).toFixed(2);
        }
        //返点金额
        if (agentCoin == "") {
          _this.agentCoin = "0.00";
        } else {
          _this.agentCoin = parseFloat(agentCoin).toFixed(2);
        }
        _this.usable_coin = _this.coin;
        $(".header-left").hide();
        $(".header-right").hide();
        _this.isUseWebSocket = true;
        localStorage.removeItem("coinMsg");
        return
      }
      if(!_this.isUseWebSocket) {
        var getUserInfo = {
          type: "post",
          url: "/authApi/AutoLoginGetUserinfoByRedis",
          data: {
            username: localStorage.getItem("userName")
          },
          success: function(data) {
            if(data.code == 200) {
              _this.isUseWebSocket = true;
              var coin = data.body.COIN,
                  fCoin = data.body.FCION;
              if(coin == "") {
                _this.coin = "0.00";
              } else {
                _this.coin = parseFloat(coin).toFixed(2);
              }
              if(_this.fCoin == "") {
                _this.fCoin = "0.00";
              } else {
                _this.fCoin = parseFloat(fCoin).toFixed(2);
              }
            }
          }
        };
        this.base.callAuthApiNoEcrypt(getUserInfo);

      } else {
        var getUserInfo = {
          type: "post",
          url: "/authApi/getCoin",
          data: {
            "username": localStorage.getItem("userName"),
            isWhite: true
          },
          success: function success(data) {
            if(data.code == 200) {
              localStorage.indexCoinMsg = JSON.stringify(data.body);
              var coin = data.body.coin,
              fCoin = data.body.FCION,
              agentCoin = data.body.AGENT_COIN;

              _this.unfinishCoin = data.body.unfinish_coin;
              _this.winLoseCoin = data.body.today_winAndLose_coin;
              if(coin == "") {
                _this.coin = "0.00";
              } else {
                _this.coin = parseFloat(coin).toFixed(2);
              }
              if(fCoin == "") {
                _this.fCoin = "0.00";
              } else {
                _this.fCoin = parseFloat(fCoin).toFixed(2);
              }
              //返点金额
              if (agentCoin == "") {
                _this.agentCoin = "0.00";
              } else {
                _this.agentCoin = parseFloat(agentCoin).toFixed(2);
              }
              _this.usable_coin = _this.coin;
            }
          }
        };
        this.base.callAuthApi(getUserInfo);
      }

      //点击刷新
      var num = 0;
      $("#refresh").click(function() {
        //获取加密参数的参数
        var getUserInfo = {
          type: "post",
          url: "/authApi/getCoin",
          data: {
            "username": localStorage.getItem("userName"),
            isWhite: true
          },
          success: function success(data) {
            localStorage.indexCoinMsg = JSON.stringify(data.body);
            if(data.code == 200) {
              if(num > 3) {
                layer.msg("歇一会再点");
              } else {
                var coin = data.body.coin,
                fCoin = data.body.FCION,
                agentCoin = data.body.AGENT_COIN;
                if(coin == "") {
                  _this.coin = "0.00";
                } else {
                  _this.coin = parseFloat(coin).toFixed(2);
                }
                if(fCoin == "") {
                  _this.fCoin = "0.00";
                } else {
                  _this.fCoin = parseFloat(fCoin).toFixed(2);
                }
                //返点金额
                if (agentCoin == "") {
                  _this.agentCoin = "0.00";
                } else {
                  _this.agentCoin = parseFloat(agentCoin).toFixed(2);
                }
                _this.usable_coin = _this.coin;
              }
              setTimeout(function() {
                num = 0;
              }, 5000);
              num++;
              return num;
            }
          }
        };

        _this.base.callAuthApi(getUserInfo);
      });
    },

    //全部彩种区域
    //显示所有彩种
    showAllPlayArea: function() {
      if(this.getColoredLeafConfigureList.length == 0) {
        return;
      }
      document.documentElement.scrollTop = 0;
      $(window).css("-webkit-overflow-scrolling", "auto");
      $(window).scrollTop(0);
      $(window).css("-webkit-overflow-scrolling", "touch");
      $(".allPlayArea").slideDown();
      $("#pullrefresh").hide();
      $(".public_btn").hide();
    },
    //对应关闭
    closeAllPlayArea: function() {

      $(".allPlayArea").slideToggle();
      $("#pullrefresh").show();
      $(".public_btn").show();
      // //$("body").css("overflow", "auto");
      var _this=this;
      setTimeout(function(){
        _this.isCollectOpen = 0;
      },500)

    },

    contrastTimestamp: function() {
      var _this = this,
        obj = {
          type: "post",
          url: "/commonAPI/privacy/getUpdateStatusSign",
          data: {
            isWhite: true
          },
          success: function(data) {
            var ulist = [],
              nlist = [],
              oDataList,
              cacheNameList = [
                "index_sysAdvpicture",
                "index_sysBulletin",
                "config",
                "index_sysLottery"
              ],
              nameList = [
                "sysAdvpictureSign",
                "sysBulletinSign",
                "sysConfigureSign",
                "sysLotterySign"
              ];
              // data.body="";
            if(data.body) {
              if(localStorage.contrastTimestamp) {
                oDataList = JSON.parse(localStorage.contrastTimestamp);
                for(var i = 0; i < 4; i++) {
                  var oData = oDataList[nameList[i]],
                    nData = data.body[nameList[i]],
                    dataList = localStorage[cacheNameList[i]];
                  if((oData == null || !oData) && dataList) {
                    if(nData == null || !nData) {
                      nlist.push(i);
                    } else {
                      ulist.push(i);
                    }
                  } else {
                    if(nData == null || !nData) {
                      ulist.push(i);
                    } else {
                      if(nData == oData && dataList) {
                        nlist.push(i);
                      } else {
                        ulist.push(i);
                      }
                    }
                  }
                }
                localStorage.contrastTimestamp = JSON.stringify(data.body);
                if(ulist.length > 0) {
                  _this.updateData(ulist);
                }
                if(nlist.length > 0) {
                  _this.noUpdateData(nlist);
                }
              } else {
                _this.updateData([0, 1, 2, 3]);
                localStorage.contrastTimestamp = JSON.stringify(data.body);
              }
            } else {
              _this.updateData([0, 1, 2, 3]);
            }
          }
        };
      this.base.callCommonApi(obj);
    },
    //不更新数据
    noUpdateData: function(list) {
      var _this = this,
        dataList;
      for(var k = 0, len = list.length; k < len; k++) {
        switch(list[k]) {
          case 0: //轮播
            dataList = JSON.parse(localStorage.index_sysAdvpicture);
            _this.imgs = dataList;
            if (dataList.length !== 0) {
              // setTimeout(function () {
                _this.init_pic();
              // }, 50);
            }

            break;
          case 1: //公告
            dataList = JSON.parse(localStorage.index_sysBulletin);
            if (dataList.list.length > 0) {
              _this.scrollNotice ="";
            }
            for(var i = 0; i < dataList.list.length; i++) {
              var obj = dataList.list[i];
              if (!_this.popupNotice && obj.contentCss == 1) {
                _this.popupNotice = obj;
                _this.showPopupNotice();
              }
              if (!_this.scrollNotice && obj.content.indexOf("img") == -1) {
                _this.scrollNotice = obj;
              }
            }
            if (!_this.scrollNotice && dataList.list.length > 0) {
              _this.scrollNotice = dataList.list[0];
            }
            if (_this.scrollNotice) {
              _this.initScrollNotice();
              // _this.setScrollNotice();
            }
            _this.contents = dataList.list;
            break;
          case 2: //系统配置
            dataList = JSON.parse(localStorage.config);
            //金额单位
            if(dataList.coinUnit) {
              _this.coinUnit = dataList.coinUnit;
            }
            //限制金额大小
            _this.singleMaxSum = dataList.singleMaxSum;

            _this.logoPic = dataList.wapPageLogoConfigure;


            // _this.logoPic = "/static/images/download.png";

            _this.webName  = dataList.webName;



            if(_this.baseIndex==1){
              _this.headTit = dataList.webName;
            }

            // //首页title
            // if(dataList.webName) {
            //   _this.headTit = dataList.webName;
            //   $("head title").html(_this.headTit);
            // }

            //首页广告（跳注册）
            if(dataList.registerActivityUrl) {
              _this.index_banner = dataList.registerActivityUrl;
            }

            //app下载链接设置
            _this.downUrl_img = dataList.appDownloadingActivitiesUrl;
            var ua = navigator.userAgent.toLowerCase();
            if(/iphone|ipad|ipod/.test(ua)) {
              //                  _this.downUrl = dataList.iosEditionDownloadUrl;
              _this.downUrl =
                "itms-services://?action=download-manifest&url=http://23.234.12.119:1085/commonAPI/plist";
            } else if(/android/.test(ua)) {
              _this.downUrl = dataList.androidEditionDownloadUrl;
            } else {
              _this.downUrl = dataList.androidEditionDownloadUrl;
            }
            _this.promotionUrl = dataList.promotionUrl;
            //单场赔率百分比
            if(dataList.northReturnAwardRate) {
              _this.odds_percent =
                parseFloat(dataList.northReturnAwardRate) > 1 ?
                parseFloat(dataList.northReturnAwardRate) / 100 :
                parseFloat(dataList.northReturnAwardRate);
            }

            break;
          case 3: //开奖记录
            dataList = JSON.parse(localStorage.index_sysLottery);
            // $("#fixedGameList .hiddenClick").trigger("click");
            _this.hot = [];
            _this.getColoredLeafConfigureList = [];
            dataList.map(function(item) {
              if(item.is_hot == 1) {
                _this.hot.push(item);
              }
              _this.getColoredLeafConfigureList.push(item);

            });
            var gameIdListObj = {};
            dataList.map(function(item) {
              if(item.code) {
                if(!gameIdListObj[item.code]) {
                  gameIdListObj[item.code] = item.gameID;
                } else {
                  gameIdListObj[item.code] = gameIdListObj[item.code] + ',' + item.gameID;
                }
              }

            });

            if (!_this.szcIdList.gameIdList) {
              _this.szcIdList.setGameIdList(gameIdListObj);
            }

            if(_this.hot.length % 2 == 0) {
              _this.hot.splice(-1, 1);
            }
            // _this.hot = _this.hot.sort(_this.compareNum('sort'));
            // _this.getColoredLeafConfigureList = _this.getColoredLeafConfigureList.sort(_this.compareNum('sort'));
            _this.variety = {
              0: {
                list:[],
                name:[],
              },
              1: {
                list: [],
                name: [],
              },
              2: {
                list: [],
                name: [],
              },
              show: 2
            }

            _this.thanGameType = [];
            _this.getColoredLeafConfigureList.map(function(item) {
              item.isCollect = 0;
              _this.collectContrastIdList.push(parseInt(item.gameID));
              _this.thanGameType.push(item.game_type);
              if(item.game_type == 0) {
                _this.setVarietyItem(0, item);
                // _this.variety[0].push(item);
              } else if(item.game_type == 1) {
                // _this.variety[1].push(item);
                _this.setVarietyItem(1, item);
              } else {
                // _this.variety[2].push(item);
                _this.setVarietyItem(2,item);
              }
            })

            break;
        }
      }
    },
    //更新数据
    updateData: function(list) {
      var _this = this;
      for(var i = 0, len = list.length; i < len; i++) {
        switch(list[i]) {
          case 0: //轮播
            _this.get_pic();
            break;
          case 1: //公告
            _this.get_msg();
            break;
          case 2: //系统配置
            _this.get_ConfigureResult();
            break;
          case 3: //获取彩种
            _this.getTzType();
            break;
        }
      }
    },
    //首页消息公告
    scrollFn: function(height, time) {
      var ul = $(".scrollContent"),
        liFirst = ul.find('li:first'),
        win_ul = $(".win_scrollContent"),
        win_liFirst = win_ul.find('li:first');
      if(this.thelotterys.length != 0) {
        $(".win_scrollContent").animate({
          top: height
        }, 500).animate({
          "top": 0
        }, 0, function() {
          var clone = win_liFirst.clone();
          $(".win_scrollContent").append(clone);
          win_liFirst.remove();
          $(".win_scrollContent").finish();
        })
      }

    },
    //获得毫秒数
    getMilliseconds: function(str) {
      str = str.replace(new RegExp("-", "gm"), "/");
      return(new Date(str)).getTime(); //得到毫秒数
    },

    //补0
    getzf: function (num) {
      if (parseInt(num) < 10) {
        num = '0' + num;
      }
      return num;
    },


  },
  watch: {
    baseIndex: function () {
      var _this = this;
      window.scrollTo(0, 0);
      if(localStorage.baseIndex) {
        localStorage.baseIndex = this.baseIndex;
      }
      if(this.baseIndex ==1) {
        this.imgs.slice(0, 1);
        // _this.hotArr.map(function (item,index) {
        //  window.clearInterval(_this.hotArr[index].deadlineTiming);
        // });

        // console.log(_this.hotArr);
      }

      // if(this.baseIndex== 2){
      //   _this.gameIntro.map(function (item,index) {
      //     window.clearInterval(_this.gameIntro[index].deadlineTiming);
      //   });
        // console.log(_this.gameIntro);


      // }
      if(this.baseIndex == 1){
        if(localStorage.webName){
          _this.headTit = localStorage.webName;

        }
      //  timer_hotList:[],
      // timer_hotName:[],
      // timer_gameList:[],
      // timer_gameName:[],
        for(var i in _this.timer_hotList){
          window.clearInterval(_this.timer_hotList[i]);
        }
        _this.hotArr=[];
        _this.getDigitalInfo();
        if(localStorage.userName){
          $('.header-right').hide();
          $('.header-left').hide();
        }
      }

      if(this.baseIndex == 2){
        _this.headTit = "游戏大厅";
        for(var i in _this.timer_gameList){
          window.clearInterval(_this.timer_gameList[i]);
        }
        _this.gameIntro=[];
        //_this.getGameKind();
        _this.getGameIntro();
        if(localStorage.userName){
          $('.header-right').hide();
          $('.header-left').hide();
        }
      }

      if(this.baseIndex == 3){
        _this.headTit = "我的账户";
        if(localStorage.userName){
          $('.header-right').hide();
          $('.header-left').hide();
        }
      }
      clearInterval(this.MyMar2);
      setTimeout(function() {
        _this.loadData();
        if(
          _this.baseIndex == 1 &&
          $("#colee_bottom")[0] &&
          _this.thelotterys.length != 0
        ) {
          _this.noticeScroll();
        }
      }, 50);

    },
    allMess: function() {
      if(!this.danmuFlag) {
        return;
      }
      if(this.base.userMess.length != 0) {
        this.getDanmu(this.allMess[this.base.userMess.length - 1].mess, this.allMess[this.base.userMess.length - 1].uName);
      }
    },
    thelotterys: function() {
      if(this.thelotterys.length == 0) {
        window.clearInterval(this.MyMar2);
        location.reload();
      } else if(this.baseIndex == 1 && $("#colee_bottom")[0] && this.thelotterys.length != 0) {
        this.noticeScroll();
      }
    },
    usable_coin: function() {
      var coin = this.usable_coin;
      this.coin = coin;
    },
    $route(to, from) {
      var _this = this;

      //主界面和侧滑菜单界面均支持区域滚动；
      // setTimeout(function(){
        //


      if(to.name == "index") {
        if(_this.slider){
          _this.slider.isPause=true;
        }
        this.userName=localStorage.userName;
        // $('.mui-slider').show();
        $('.changeSkin').show();
        if(this.app_flag==""){
          $('.download-wrap').show();
        }
        $('.public_btn').show();

        // this.setScrollNotice();
        this.contrastTimestamp();
        _this.disappear = false;

        //更新收藏玩法数量
        this.collectGameNum = this.collectGame.idList.length;

        this.userName=localStorage.userName;
        $('.chat').animate({
          width: 0
        }, 100);
        $('#biaoImg').addClass('biaoFalse').removeClass('biaoTrue');
        $('#biaoImg').animate({
          right: '-.5rem'
        }, 100);
        if(localStorage.userName) {
          $('#allActivity').show()
        } else {
          $('#allActivity').hide();
        }
        this.pullToRefresh.setNowThis(this);
        // //$("body").css("overflow", "auto");
        // if(localStorage.userName && localStorage.access_token) {
        //   $(".username").show();
        //   $(".loginOut").show();
        //  this.getCoin();
        // } else {
        //  this.$set.userName = "";
        //  this.baseIndex = 1;
        //  $(".header-left").show();
        //  $(".header-right").show();
        // }

        //定时器处理
        if(_this.msgTime) {
          window.clearInterval(_this.msgTime);
          _this.msgTime = "";
        }
        _this.msgTime = setInterval(function() {
          _this.scrollFn('-3rem', _this.msgTime)
        }, 3000);
        //样式处理

        if((localStorage.baseIndex == 4 || localStorage.baseIndex == 3 || localStorage.baseIndex == 2 )) {
          this.$set.baseIndex = localStorage.baseIndex;
        }
        if(localStorage.baseIndex == 4) {
          if(this.baseIndex == 4) {
            this.getCoin();
            this.getMessage();

          }
        }



        if(from.name == "userPerfectInfo") {
          this.changeCoinPwd()
        }

        //设置页面返回时样式问题处理
        if(from.name == "setting") {
          _this.baseIndex = 1;
          // $(".container").css("margin-top", "2.67rem");

        }

        //收藏设置
        // if (localStorage.collectGame) {
        //   this.collectGame = JSON.parse(localStorage.collectGame);
        //   var list = this.collectGame.idList;
        //   _this.getColoredLeafConfigureList.map(function (item) {
        //     item.isCollect = 0;
        //   });
        //   for (var i = 0; i < _this.variety[1].list.length;i++){
        //     _this.variety[1].list[i].map(function (item) {
        //       item.isCollect = 0;
        //     })
        //   }
        //   for (var i = 0; i < _this.variety[2].list.length; i++) {
        //     _this.variety[2].list[i].map(function (item) {
        //       item.isCollect = 0;
        //     })
        //   }
        //   if (list.length !== 0) {
        //     list.map(function (item) {
        //       var index = _this.collectContrastIdList.indexOf(item);
        //       var thanIndex = _this.thanGameType[index] == 3 ? 2 : _this.thanGameType[index], countNum = 0;
        //       for (var i = 0; i < (index + 1); i++) {
        //         if (thanIndex == 2) {
        //           if (_this.thanGameType[i] == thanIndex || _this.thanGameType[i] == 3) {
        //             countNum++;
        //           }
        //         } else {
        //           if (_this.thanGameType[i] == thanIndex) {
        //             countNum++;
        //           }
        //         }

        //       }
        //       if (index !== -1) {
        //         _this.getColoredLeafConfigureList[index].isCollect = 1;

        //       } else {

        //         _this.getColoredLeafConfigureList[index].isCollect = 0;

        //       }
        //     })

        //   }
        // } else if (_this.isCollectOpen == 1 && !$('.allPlayArea').is(':hidden')) {
        //   _this.closeAllPlayArea();
        //   _this.isCollectOpen = 0;
        //   _this.getColoredLeafConfigureList.map(function (item) {
        //     item.isCollect = 0;
        //   })
        //   for (var i = 0; i < _this.variety[1].list.length; i++) {
        //     _this.variety[1].list[i].map(function (item) {
        //       item.isCollect = 0;
        //     })
        //   }
        //   for (var i = 0; i < _this.variety[2].list.length; i++) {
        //     _this.variety[2].list[i].map(function (item) {
        //       item.isCollect = 0;
        //     })
        //   }
        //   _this.collectGame.idList = [];
        // }


        //从登陆注册页面返回时，调用获取返点接口和会员类型
        if (from.name == "login" || from.name =="register"){
          _this.baseIndex=1;
          if(localStorage.config){
            _this.headTit = JSON.parse(localStorage.config).webName;
          }


          _this.getGameRebatesList();
          _this.userType=localStorage.userType_;
          // _this.contrastTimestamp();
        }
        //设置收藏
        if(localStorage.collectGame){
          _this.collect_idList="";
          var list=JSON.parse(localStorage.collectGame);
          if(list.collectList){
            _this.collect_idList=list.collectList;
            _this.$set(_this.collect_idList,list.collectList)
          }
        }


        //
        // //设置会员管理的更多彩种
        // if (this.baseIndex == 3) {
        //   $("#fixedGameList").show();
        // } else {
        //   $("#fixedGameList").hide();
        // }

        //走势收藏
        if(localStorage.collectTrend){

          var ctObj=JSON.parse(localStorage.collectTrend),ci,isEmpty=true;
          for(ci in ctObj){
            if(ctObj[ci]==1){
              isEmpty=false;
              break;
            }
          }
          if(isEmpty){
            ctObj=''
          }
          this.collect_Trend=ctObj;
        }else{
          this.collectList='';
        }

      } else if(from.name == "index") {
        // var gallery = mui(".mui-slider");
        // gallery.slider({
        //  interval: 0 //自动轮播周期，若为0则不自动播放，默认为0；
        // });
        // $('.mui-slider').hide();
        if(_this.slider){
          _this.slider.isPause=true;
        }
        $('.changeSkin').hide();
        $('.download-wrap').hide();
        $('.public_btn').hide();
        _this.disappear = true;
        this.stopScrollNotice();
        const list = [_this.msgTime, _this.s0, _this.s1, _this.s2, _this.s3,_this.time_]
        for(var i in list) {
          if(list[i]) {
            window.clearInterval(list[i]);
          }
        }
        //重设滚动条
        $('.msg .scroll>div').css({
          "left": "100%"
        });
        _this.userType=localStorage.userType_;

      }

    },
    userName:function(val){
      // console.log(val)
    },

  },

};

//mui退出
mui.back = function() {
  mui.confirm("退出应用？", "退出提示", ["是的", "取消"], function(e) {
    if(e.index == 0) {
      plus.runtime.quit();
    }
    return false;
  });
};
$(function() {
  var immersed = 0;
  var ms = /Html5Plus\/.+\s\(.*(Immersed\/(\d+\.?\d*).*)\)/gi.exec(
    navigator.userAgent
  );
  if(ms && ms.length >= 3) {
    // 当前环境为沉浸式状态栏模式
    immersed = parseFloat(ms[2]); // 获取状态栏的高度
  }
});
