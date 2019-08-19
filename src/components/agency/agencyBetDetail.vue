//投注明细
<template>
<div>
  <div id="container">
    <div>
        <header id="header">
           <a class="goBack" href="javascript:void(0)" @click="routerBack"></a>
          <h1>{{$t('投注明细')}}</h1>
          <a href="javascript:void(0)" id="timeC">{{timeC}}</a>
        </header>
        <div class="main">
          <div class="searchBtn">
            <div class="chooseType">
              <div id="type" style="position: relative;">
                <input id="showType" class="show" type="text" style="" readonly="" :value="$t('所有彩种')" />
                <div class="jian"><img src="../../assets/images/jiantou.png" /></div>
              </div>
              <ul id="selectType" class="selectType" style=" overflow:scroll; height:30rem;">
                <li @click="selectType('')" class="choose_yes all">
                  <span class="gameName" style="font-size: 16px;">{{$t('所有彩种')}}</span></li>
                <li v-for="(item,index) in variety.name">
                  <span>{{item}}</span>
                  <ul>
                    <li v-for="(it,index2) in variety.list[index]" @click="selectType(it.gameId,1)" :key="index2" :id="it.gameId" class="choose_no">
                      <i>{{it.gameName}}</i>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
						<div class="searchCon">

              <input type="text" v-model="lowerUserName" :placeholder="$t('下级投注查询')" class="user-input proxySearch" />
            </div>
						<a id="submitBtn" @click="searchDownData()">
							<div class="submitTouch"><i class="iconfont1">&#xe62b;</i></div>
						</a>
					</div>
          <div class="topNav"><span :class="status==0?'active':''" @click="changeStatus(0)">{{$t('全部')}}</span><span :class="status==1?'active':''" @click="changeStatus(1)">{{$t('未中奖')}}</span><span :class="status==2?'active':''" @click="changeStatus(2)">{{$t('已中奖')}}</span><span :class="status==3?'active':''" @click="changeStatus(3)">{{$t('已撤单')}}</span><span :class="status==4?'active':''" @click="changeStatus(4)">{{$t('未开奖')}}</span></div>
          <div class="showRecordData">
            <ul v-if="recordData.lenght!==0">
              <li v-for="item in recordData" @click="skip(item)">
                <div class="grey"><span class="betName">{{item.userName?item.userName:$t('沙发客')}}</span><span class="bonus">{{item.amount+coinUnit}}</span></div>
                <div class="grey">{{item.actionTime?item.actionTime:''}}</div>
                <div class="betResult" :style="item.status==1?'top:.6rem':''">
                  <div class="red" v-if="item.status==1">{{item.bonus}}</div>
                  <div :class="item.status==1?'red':item.status==0?'green':''">{{item.status==0?$t('未中奖'):item.status==1?$t('已中奖'):item.status==2?$t('已撤单'):$t('未开奖')}}</div>
                </div>
              </li>
            </ul>
            <div v-if="noMes!==1&&recordData.length!=0" class="loadTips" @click="showRecordData('')">{{isLoadOver==0?$t('点击加载更多'):$t('已加载全部数据')}}</div>
            <div v-if="noMes==1" class="fullPageMsg" id="noMessage">
              <div class="fullPageIcon iconfont1">&#xe66b;</div>
              <p>{{$t('暂无记录')}}</p>
						</div>

            <div id="background_gray">

            </div>

          </div>
        </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name:'agencyBetDetail',
  data(){
    return {
      //时间触发器
      timeList: ['今天', '昨天', '近七天'],
      timeC: '',
      indexArr:"",
      //记录数据
      recordData:[],
      //旧参数记录
      oldParam:"",
      //下级名称
      lowerUserName:"",
      //数据参数
      pageIndex:1,//页数
      status:"",//导航参数-(全部0-已中奖1-未中奖2-等待开奖3)
      //是否有数据
      noMes:0,
      //是否还有数据可以加载
      isLoadOver:0,
      coinUnit:"元",

      datas:[],
      page:'',
      type:'',

      gameIdList: [],
      variety: {
        list: [],
        name: [],
      },
    }
  },
  created(){

  //获取单位
  var config=JSON.parse(localStorage.config);
  this.coinUnit=config.coinUnit?config.coinUnit:"元";
    // this.showRecordData();
    this.getdatas();
    this.$nextTick(() => {
			this.initDateTool();
      this.getTypes();
      // this.clickDate();
		})
  },
  mounted(){
    this.clickDate();
    $(".showRecordData").css({
      height:$("#container").height()-$(".topNav").height()-$(".searchBtn").height()-44+"px",
      overflow:'scroll'
    })
  },
  methods:{
    clickDate: function() {
      var _this = this;
      $("#date").click(function() {
        $("#selectDate").slideToggle();
        var flag = $(this).hasClass("flag");
        if(flag) {
          $(this).removeClass("flag");
          //					$("#selectDate").hide();
          _this.move();
        } else {
          $(this).addClass("flag");
          //					$("#selectDate").show();
          _this.stop();
        }
        $("#selectType").hide();
        $("#selectStatus").hide();
        $("#type").removeClass("flag");
        return;
      });
      $("#selectDate li").click(function() {
        $("#selectDate").hide();
        _this.move();
        $("#date").removeClass("flag");
        var selectDate = $(this).text();
        $("#showDate").val(selectDate);
      });
      $("#type").click(function() {
        $("#selectType").slideToggle();
        var flag = $(this).hasClass("flag");
        if(flag) {
          _this.move();
          $(this).removeClass("flag");
          //					$("#selectType").hide();
        } else {
          _this.stop();
          $(this).addClass("flag");
          //					$("#selectType").show();
        }
        $("#selectDate").hide();
        $("#selectStatus").hide();
        $("#date").removeClass("flag");
      });
      $("#selectType li:first-child").click(function() {
        _this.move();
        $(this).addClass("choose_yes").removeClass('choose_no').siblings().children('ul').find('li').removeClass("choose_yes").addClass('choose_no');
        $("#selectType").hide();
        $("#type").removeClass("flag");
        var selectType = $(this).children('span').text();
        $("#showType").val(selectType);
//				_this.getdatas();
      });
      $("#selectType li ul li").click(function() {
        _this.move();
        $(this).siblings().removeClass("choose_yes").addClass('choose_no');
        $(this).parents('li').siblings('li:first-child').removeClass("choose_yes").addClass('choose_no');
        $(this).addClass("choose_yes").removeClass('choose_no').parents('li').siblings().children('ul').find('li').removeClass("choose_yes").addClass('choose_no');
        $("#selectType").hide();
        $("#type").removeClass("flag");
        var selectType = $(this).children('i').text();
        $("#showType").val(selectType);
      });
      $("#status").click(function() {
        $("#selectStatus").slideToggle();
        var flag = $(this).hasClass("flag");
        if(flag) {
          $(this).removeClass("flag");
          _this.move();
        } else {
          $(this).addClass("flag");
          //					$("#selectDate").show();
          _this.stop();
        }
        $("#selectType").hide();
        $("#selectDate").hide();
        $("#type").removeClass("flag");
        $("#date").removeClass("flag");
        return;
      });
      $("#selectStatus li").click(function() {
        $("#selectStatus").hide();
        _this.move();
        $("#status").removeClass("flag");
        var selectStatus = $(this).text();
        $("#showStatus").val(selectStatus);
      });
      $('#background_gray').click(function() {
        _this.move();
        $('#selectType').hide();
        $('#selectDate').hide();
        $("#selectStatus").hide();
        $("#date").removeClass("flag");
        $("#type").removeClass("flag");
        $("#status").removeClass("flag");
      })
    },


    /***禁止滑动***/
    stop: function() {
      $('#background_gray').show();
      document.body.style.overflow = 'hidden';
      document.addEventListener("touchmove", this.mo, false); //禁止页面滑动
    },

    /***取消滑动限制***/
    move: function() {
      var _this = this;
      $('#background_gray').hide();
      document.body.style.overflow = ''; //出现滚动条
      document.removeEventListener("touchmove", _this.mo, false);
    },

    routerBack: function () {
      if (localStorage.turnPathName && localStorage.turnPathName != "login") {
        // this.$router.push({ name: localStorage.turnPathName });
        this.$router.go(-1)
      } else {
        this.$router.push({
          name: "index"
        });
      }
    },
    //初始化加载时间触发器
    initDateTool: function() {
			var _this = this;
			var mobileSelect2 = new MobileSelect({
				trigger: '#timeC', //触发
				title: this.$t('请选择'), //标题
				wheels: [{
					data: _this.timeList
				}],
				cancelBtnText: '　',
				position: [2],
				transitionEnd: function(indexArr, data) {
				},
				callback: function(indexArr, data) {
          _this.timeC = _this.timeList[indexArr[0]];
          _this.clearParamData();
					_this.getdatas(indexArr[0])
				},
			});
    },
    //加载数据
    getdatas:function(index){
      var _this=this;
      if(_this.timeC === "") {
          _this.timeC = _this.timeList[2];
        }
        this.showRecordData(index);
    },
    //加载投注数据
    showRecordData(index){
      if(this.isLoadOver==1){
        return
      }
      var _this=this,
      param={
        username:localStorage.userName,
        lowerUserName:_this.lowerUserName,
        status:_this.status==0?"":_this.status-1,
        startTime:"",
        endTime:"",
        pageIndex:_this.pageIndex,
        pageNum:10,
        type: _this.type,
      },obj,nowTime;





    if(_this.oldParam){
      param.startTime=_this.oldParam.startTime;
      param.endTime=_this.oldParam.endTime;
      // param.pageIndex=_this.oldParam.pageIndex;

    }else{
      nowTime=this.getTimeParam(index);
      param.startTime=nowTime.start;
      param.endTime=nowTime.end;
      // param.pageIndex=_this.pageIndex;
      _this.oldParam=param;
    }

    console.log(param);
    obj={
        type:"post",
        data:param,
        url:"/authApi/qryAgentBetInfo",
        success:function(data){
          if(data.code==200){

            if(data.body.pageSize==_this.pageIndex){
              _this.isLoadOver=1;
            }else{
              _this.isLoadOver=0;
            }
            if(data.body.pageSize==0&&data.body.list.length==0){
              _this.noMes=1;
            }
            if(_this.pageIndex<=data.body.pageSize){
              if(data.body.list.length==0){
                _this.noMes=1;
              }else{
                _this.pageIndex++;
              }
              data.body.list.map(function(item){
                _this.recordData.push(item);
              })
            }
          }else{
            _this.noMes=1;
          }
        }
      };
      this.base.callAuthApi(obj);
    },
    //获取时间
    getTimeParam(index){

      if(!index&&index!=0){
        index=2;
      }
      var nowDate=new Date(),obj={
        hour:nowDate.getHours(),
        minutes:nowDate.getMinutes(),
        seconds:nowDate.getSeconds(),
        now:nowDate.toLocaleDateString(),
        last:(new Date(nowDate.getTime()-86400000)).toLocaleDateString(),
        sevenAgo:(new Date(nowDate.getTime()-86400000*7)).toLocaleDateString(),
      };

      switch(index){

        case 0://今天
          nowDate.setTime(nowDate.getTime());
          var s2 = nowDate.getFullYear() + "-" + this.getzf(nowDate.getMonth() + 1) + "-" + this.getzf(nowDate.getDate());
          // return {
          //   start:new Date(obj.now+" 00:00:00").getTime(),
          //   end:new Date(obj.now +" "+
          //   (obj.hour<10?"0"+obj.hour:obj.hour)+":"+
          //   (obj.minutes<10?"0"+obj.minutes:obj.minutes)+":"+
          //   (obj.seconds<10?"0"+obj.seconds:obj.seconds)).getTime(),
          // }
          return {
            start:s2 +" "+ "00:00:00",
            end: s2 + " " + "23:59:59",
          }

          break;
        case 1://昨天
          nowDate.setTime(nowDate.getTime() - 24 * 60 * 60 * 1000);
          var s1 = nowDate.getFullYear() + "-" + this.getzf(nowDate.getMonth() + 1) + "-" + this.getzf(nowDate.getDate());
          return {
            start:s1 +" "+ "00:00:00",
            end: s1 + " " + "23:59:59",
          }
          // return {
          //   start:new Date(obj.last+" 00:00:00").getTime(),
          //   end:new Date(obj.last+" 23:59:59").getTime(),
          // }
          break;
        case 2://近七天
         var st = this.getDateTime(8);
          var  et = nowDate.getFullYear() + "-" + this.getzf(nowDate.getMonth() + 1) + "-" + this.getzf(nowDate.getDate());
          return {
            start:st +" "+ "00:00:00",
            end: et + " " + "23:59:59",
          }
          // return {
          //   start:new Date(obj.sevenAgo+" 00:00:00").getTime(),
          //   end:new Date(obj.now +" "+
          //   (obj.hour<10?"0"+obj.hour:obj.hour)+":"+
          //   (obj.minutes<10?"0"+obj.minutes:obj.minutes)+":"+
          //   (obj.seconds<10?"0"+obj.seconds:obj.seconds)).getTime(),
          // }
          break;
      }
    },
    //日期设置
    getDateTime: function(index) {
      var now = new Date(); //当前日期
      var nowDayOfWeek = now.getDay(); //今天本周的第几天
      var nowDay = now.getDate(); //当前日
      var nowMonth = now.getMonth(); //当前月
      var nowYear = now.getYear(); //当前年
      nowYear += (nowYear < 2000) ? 1900 : 0; //
      var lastMonthDate = new Date(); //上月日期
      lastMonthDate.setDate(1);
      lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
      var lastYear = lastMonthDate.getYear();
      var lastMonth = lastMonthDate.getMonth();

      //格式化日期：yyyy-MM-dd
      function formatDate(date) {
        var myyear = date.getFullYear();
        var mymonth = date.getMonth() + 1;
        var myweekday = date.getDate();
        if(mymonth < 10) {
          mymonth = "0" + mymonth;
        }
        if(myweekday < 10) {
          myweekday = "0" + myweekday;
        }
        return(myyear + "-" + mymonth + "-" + myweekday);
      }

      //获得某月的天数
      function getMonthDays(myMonth) {
        var monthStartDate = new Date(nowYear, myMonth, 1);
        var monthEndDate = new Date(nowYear, myMonth + 1, 1);
        var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
        return days;
      }

      //获得本季度的开始月份
      function getQuarterStartMonth() {
        var quarterStartMonth = 0;
        if(nowMonth < 3) {
          quarterStartMonth = 0;
        }
        if(2 < nowMonth && nowMonth < 6) {
          quarterStartMonth = 3;
        }
        if(5 < nowMonth && nowMonth < 9) {
          quarterStartMonth = 6;
        }
        if(nowMonth > 8) {
          quarterStartMonth = 9;
        }
        return quarterStartMonth;
      }

      //获得本周的开始日期
      function getWeekStartDate() {
        var weekStartDate = new Date(nowYear, nowMonth, nowDay + 1 - nowDayOfWeek);
        return formatDate(weekStartDate);
      }

      //获得本周的结束日期
      function getWeekEndDate() {
        var weekEndDate = new Date(nowYear, nowMonth, nowDay + (7 - nowDayOfWeek));
        return formatDate(weekEndDate);
      }

      //获得上周的开始日期
      function getLastWeekStartDate() {
        var weekStartDate = new Date(nowYear, nowMonth, nowDay + 1 - nowDayOfWeek - 7);
        return formatDate(weekStartDate);
      }

      //获得上周的结束日期
      function getLastWeekEndDate() {
        var weekEndDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);
        return formatDate(weekEndDate);
      }

      //获得本月的开始日期
      function getMonthStartDate() {
        var monthStartDate = new Date(nowYear, nowMonth, 1);
        return formatDate(monthStartDate);
      }

      //获得本月的结束日期
      function getMonthEndDate() {
        var monthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowMonth));
        return formatDate(monthEndDate);
      }

      //获得上月开始时间
      function getLastMonthStartDate() {
        var lastMonthStartDate = new Date(nowYear, lastMonth, 1);
        return formatDate(lastMonthStartDate);
      }

      //获得上月结束时间
      function getLastMonthEndDate() {
        var lastMonthEndDate = new Date(nowYear, lastMonth, getMonthDays(lastMonth));
        return formatDate(lastMonthEndDate);
      }

      //获得本季度的开始日期
      function getQuarterStartDate() {
        var quarterStartDate = new Date(nowYear, getQuarterStartMonth(), 1);
        return formatDate(quarterStartDate);
      }

      //或的本季度的结束日期
      function getQuarterEndDate() {
        var quarterEndMonth = getQuarterStartMonth() + 2;
        var quarterStartDate = new Date(nowYear, quarterEndMonth,
          getMonthDays(quarterEndMonth));
        return formatDate(quarterStartDate);
      }

      function getDay(day){
        var today = new Date();

        var targetday_milliseconds=today.getTime() + 1000*60*60*24*day;

        today.setTime(targetday_milliseconds); //注意，这行是关键代码

        var tYear = today.getFullYear();
        var tMonth = today.getMonth();
        var tDate = today.getDate();
        tMonth = doHandleMonth(tMonth + 1);
        tDate = doHandleMonth(tDate);
        return tYear+"-"+tMonth+"-"+tDate;
      }

      function doHandleMonth(month) {
        var m = month;
        if (month.toString().length == 1) {
          m = "0" + month;
        }
        return m;
      }



      if(index == 0) {
        var k = getWeekStartDate();
        return k
      } else if(index == 1) {
        var k = getWeekEndDate();
        return k
      } else if(index == 2) {
        var k = getLastWeekStartDate();
        return k
      } else if(index == 3) {
        var k = getLastWeekEndDate();
        return k
      } else if(index == 4) {
        var k = getMonthStartDate();
        return k
      } else if(index == 5) {
        var k = getMonthEndDate();
        return k
      } else if(index == 6) {
        var k = getLastMonthStartDate();
        return k
      } else if(index == 7) {
        var k = getLastMonthEndDate();
        return k
      }else if(index == 8){
        var k = getDay(-7);
        return k;
      }
    },
    //补0
    getzf: function(num) {
      if(parseInt(num) < 10) {
        num = '0' + num;
      }
      return num;
    },
    //清空参数数据
    clearParamData(){
      this.pageIndex=1;
      this.recordData=[];
      this.oldParam="";
      // this.lowerUserName="";
      this.isLoadOver=0;
      this.noMes=0;
    },
    //改变导航状态status
    changeStatus(index){
      var _this=this;
      _this.status=index;
      _this.clearParamData();
      _this.getdatas();
    },
    searchDownData(){
      var _this=this;
      _this.status=0;
      _this.clearParamData();
      // _this.lowerUserName=name;
      _this.getdatas();

    },
    //跳转进入详情
    skip: function(item) {
      localStorage.setItem("key", item.betId);
			if(item.type < 5) {
				this.$router.push({
					name: 'moreMes',
					params: {
						id: item.betId,
            outOfThrity: this.outOfThrity,
            uid:item.userId,
					}
				})
			} else {
				this.$router.push({
					name: 'caiMore',
					params: {
						id: item.betId,
            outOfThrity: this.outOfThrity,
            uid:item.userId,
					}
				})

      }
    },

    getTypes: function() {
      var that = this;
      that.type = '';
      that.datas = [];
      that.page = 1;
      $('#showType').val(this.$t('所有彩种'));
      var obj = {
        type: 'post',
        data: {},
        async: false,
        dataType: 'json',
        url: '/authApi/bets/queryGameType',
        success: function(data) {
          if(data.code == 200) {
            that.variety = {
              list: [],
              name: [],
            };
            var gameList = [],
              codeList = [],
              isJC = 0,
              nameList = {
                "ssc": that.$t("时时彩"),
                "k3": that.$t("快三"),
                "kl10f": that.$t("快乐十分"),
                "PK10": that.$t("PK拾"),
                "hk6": that.$t("六合彩"),
                "11x5": that.$t("11选5"),
                "3D": that.$t("3D彩"),
                "PCDD": that.$t("北京28"),
                "7xc": that.$t("七星彩"),
              };
            that.gameIdList = [];
            data.body.map(function(item, index) {
              data.body[index].codeName = that.$t("竞技彩");
              if(item.code) {
                data.body[index].codeName = nameList[item.code];
                if(!that.gameIdList[item.code]) {
                  that.gameIdList[item.code] = item.gameId;
                  codeList.push(item.code);
                  gameList.push([item]);
                } else {
                  that.gameIdList[item.code] = that.gameIdList[item.code] + ',' + item.gameId;
                  gameList[codeList.indexOf(item.code)].push(item);
                }
              } else {
                if(isJC == 0) {
                  codeList.unshift("isJC");
                  gameList.unshift([item]);
                } else {
                  gameList[codeList.indexOf('isJC')].push(item);
                }
              }

            });
            gameList.map(function(item) {
              item.sort(function(a, b) {
                return a.gameId - b.gameId
              })
            });
            //将二维数组转为一维数组
            gameList = [].concat.apply([], gameList);
            data.body = gameList;

            that.types = data.body;

            that.types.map(function(item, index) {
              if(that.variety.name.length == 0) {
                that.variety.list.push([item]);
                that.variety.name.push(item.codeName);
              } else if(that.variety.name.indexOf(item.codeName) != -1) {
                var outIndex = that.variety.name.indexOf(item.codeName);
                that.variety.list[outIndex].push(item);

              } else {
                that.variety.list.push([item]);
                that.variety.name.push(item.codeName);
              }
            });
          }
        },
        error: function(msg) {}
      }
      this.base.callAuthApi(obj);
    },

    //点击选择类型
    selectType: function(gameId,id) {
      this.type = gameId;
      this.datas = [];
      this.page = 1;
      this.pageIndex = 1;
      this.recordData =[];
      this.noMes = 0;
      if(id==1){
        this.move();
        $('#'+gameId).siblings().removeClass("choose_yes").addClass('choose_no');
        $('#'+gameId).parents('li').siblings('li:first-child').removeClass("choose_yes").addClass('choose_no');
        $('#'+gameId).addClass("choose_yes").removeClass('choose_no').parents('li').siblings().children('ul').find('li').removeClass("choose_yes").addClass('choose_no');
        $("#selectType").hide();
        $("#type").removeClass("flag");
        var selectType = $('#'+gameId).children('i').text();
        $("#showType").val(selectType);
      }
      this.getdatas();
    },


  },
  watch:{
    //路由监控
    $route(to,from){
      if(to.name=="agencyBetDetail"){
        this.lowerUserName="";
        this.changeStatus(0);
      }
    }
  },
}
</script>
<style src="../../style/common/shijian.css" scoped></style>
<style scoped>


  .chooseType {
    display: inline-block;
    width: 40%;
  }

  .selectType {
    position: absolute;
    /* background: white; */
    background: #50504f;
    /*font-size: 1.1rem;*/
    /*width: 26.7rem;*/
    width: 100%;
    height: 20rem;
    top: 3.2rem;
    left: 0;
    display: none;
    /* border: 1px solid #D2E4E8; */
    border: 1px solid #fff;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    z-index: 9999;
  }

  #selectType li{
    float: left;
    display: inline-block;
    /* color: gray; */
    margin: 0.2rem 0.1rem;
    text-align: center;
    height: auto;
    line-height: 2rem;
    width: 99%;
    border-radius: 4px;
    position: relative;
  }
  #selectType li.choose_yes{
    background:#78d6d5;
    color: #fff;
  }
  #selectType li:not(:first-child) span{
    display: inline-block;
    width: 98%;
    font-size: 14px;
    color: #ccc;
    text-align: left;
  }
  #selectType li span:before{

  }
  #selectType li span:after{

  }
  #selectType li ul{
    display: block;
    min-height: 50px;
    clear: both;
  }
  #selectType li ul li{
    float: left;
    display: inline-block;
    /* color: gray; */
    color: #fff;
    margin: 0.2rem 0.1rem;
    text-align: center;
    height: 2rem;
    line-height: 2rem;
    width: 32.4%;
    border-radius: 4px;
    position: relative;
    border:1px solid #fff;
  }

  #selectType .choose_yes:after{
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    width: 1rem;
    height: 1rem;
    background:  url(../../assets/images/choose_yes.png) no-repeat 100% 100%;
  }


  .show {
    position: relative;
    padding: 0.6rem;
    width: 92%;
    border-radius: 5px;
    /* border: 1px solid #D3D3D3; */
    margin-top: 0.7rem;
    font-size: 1.1rem;
    margin-left: 0.4rem;
    /*color: gray;*/
    margin-bottom: 0.5rem;
    /* background: #fff; */
        background: #2a2a2a;
        border: 1px solid #797676;
  }

  .jian {
    position: absolute;
    top: 1.1rem;
    right:.8rem;
  }

#timeC{
	position: absolute;
	right: 1rem;
    top: 1rem;
    color: white;
    padding-right: 1.8rem;
    font-size: 1.1rem;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAnUlEQVRIS+3U2w3CMBBE0Tsl0AEdUQKkMtIRlEAngywBiohj7wop4sP+9eNIs7sWOyztYDCQVMojrt/isn0HbpKm1EuA7Rk4STos765qYvsCXIE5A72AMzBJKthnVQufhVpAkTa7Kwr1gCZSNntQBOgiLSgKhJAalAHCyBf0AI61Ltpq+dS3sqjRqk1bM5VCssP5Pj+QVHIjrv+L6wm8wFAaBC/AKQAAAABJRU5ErkJggg==) right center no-repeat;
}
.searchBtn {
    /* background: #efeef4!important; */
    background: #565855!important;
    width: 100%;
    position: relative;
    height: 4rem;
    /*overflow: hidden;*/
}
.searchCon, .submitTouch {
    height: 2.5rem;
    border-radius: .2em;
}
.searchCon {
    /*width: -ms-calc(60% - 1.2em);*/
    /*width: calc(60% - 1.2em);*/
  float: right;
  display: inline-block;
    width: 56%;
    /* background: #fff; */
    background: #2a2a2a;
    margin: .7rem .6rem .6rem 0;
  right: 10%;

}
.searchBtn a {
    position: absolute;
    right: 1rem;
    top: 1.1rem;
    display: block;
}
.proxySearch {
    width: 90%;
    width: -ms-calc(100% - 1em);
    width: calc(100% - 1em);
    text-align: left;
    margin: .3rem .5rem;
    border-radius: .2rem;
    height: 2.2rem;
    font-size: 1rem;
    margin-right: 0;
    /* color: #999; */
    color:#fff;
        background: #2a2a2a;
    display: block;
    float: left;
    border: none;
    border-right: none;
    -webkit-appearance: none;
    padding: 0;
}
.iconfont1 {
    font-style: normal;
    font-family: iconfont1;
    font-size: inherit;
    color: inherit;
}
.searchCon, .submitTouch {
    height: 2.5rem;
    border-radius: .2rem;
}
.searchBtn a i {
    font-size: 1rem;
}
.submitTouch {
    color: #fff;
    background: #dc3b40;
    display: block;
    float: left;
    text-align: center;
    height: 1.5rem;
    line-height: 1.4rem;
}
.topNav{
      /* background: #f5f5f5; */
      background: #8c8c8c;
    line-height: 2rem;
    color: #fff;
}
.topNav span{
  display: inline-block;
  width: 20%;
  text-align: center;
  line-height: 2.5rem;
}
.topNav span.active{
  /* border-bottom:.1rem solid #dc3b40;
  color: #dc3b40; */
      border-bottom: .1rem solid #b12a00;
    color: #b12a00;
}
.showRecordData{
  /* background: #fff; */
  background: #424242;
}
.fullPageMsg {
    text-align: center;
    position: absolute;
    -webkit-transform: translateY(100%);
    transform: translateY(100%);
    width: 100%;
    color: #989898;
}
.fullPageMsg .fullPageIcon {
    font-size: 7rem;
    line-height: 7rem;
}
.fullPageMsg p {
    font-size: 1rem;
}

/* 中心列表 */
.showRecordData ul{
  margin-left: 1rem;
}
.showRecordData li{
  position: relative;
  height: 4rem;
  padding:.5rem;
  border-bottom: 1px solid #ddd;

}
.showRecordData li .grey{
  color: #989898;
}
.showRecordData li>div{
  margin-bottom:.4rem;
}
.showRecordData li .betName{
  margin-right: .5rem;
  /* color: #000; */
  color:#fff;
}
.betResult .red{
  color: red;
}
.betResult .green{
  color: green;
}
.betResult{
  position: absolute;
  right: 2rem;
  top: 1.3rem;
}
.loadTips{
  text-align: center;
  line-height: 2.5rem;
  /* background: #f7f7f7; */
  background: #8c8c8c;
  color: #fff;
}

  #background_gray{
    position: absolute;
    display: none;
    top: 6.5rem;
    z-index: 99;
    background: black;
    opacity: 0.3;
    width: 100%;
    height: 100%;
    overflow:hidden;
  }
</style>
<style lang="less" scoped>
#container{
  height: 100%;
  background: url(../../assets/images/base/black_bg.png)no-repeat ;
  background-size: 100% 100%;
  .main{
    margin-top: 44px;
   .list-item{
    //  background: rgba(255, 255, 255, .6)
   }
  }

}
</style>



