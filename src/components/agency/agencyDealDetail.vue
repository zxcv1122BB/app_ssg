//交易明细
<template>
<div>
  <div id="container">
    <div>
        <header id="header">
           <a class="goBack" href="javascript:void(0)" @click="routerBack"></a>
          <h1>{{$t('交易明细')}}</h1>
          <a href="javascript:void(0)" id="timeC">{{timeC}}</a>
        </header>
        <div class="main">

          <div class="searchArea">
            <div class="searchBtn" v-show="status==0">
						<div class="searchCon"><input type="text" v-model="lowerUserName" :placeholder='$t("下级交易查询")' class="user-input proxySearch"></div>
						<a id="submitBtn" @click="searchDownData()">
							<div class="submitTouch"><i class="iconfont1">&#xe62b;</i></div>
						</a>
					</div>
          <div class="searchBtn" v-show="status!=0">
            <div class="coin">{{$t('金额范围')}}:<input v-model="lowerCoin" type="number" style=" padding: 0;text-align: center;text-indent:0;" :placeholder='$t("金额")'/>-<input v-model="upperCoin" type="number" :placeholder='$t("金额")' style=" padding: 0;text-align: center;text-indent:0;"/>
            </div>
            <div v-show="status==1" class="searchCon2" style="background:initial">
                <select v-model="rcState" style="background: #2a2a2a;color: #fff;">
              <option value="">{{$t('全部')}}</option>
              <option value="1">{{$t('待处理')}}</option>
              <option value="2">{{$t('处理中')}}</option>
              <option value="3">{{$t('充值成功')}}</option>
              <option value="4">{{$t('充值失败')}}</option>
            </select><i style="position: absolute;right: 1rem;font-size: 1rem;color: red;top: 1.2rem;">▼</i>
            </div>
            <div v-show="status==2" class="searchCon2" style="background:initial">
                <select v-model="psState" style="background: #2a2a2a;color: #fff;">
                <option value="">{{$t('全部')}}</option>
                <option value="1">{{$t('待处理')}}</option>
                <option value="2">{{$t('处理中')}}</option>
                <option value="3">{{$t('提现成功')}}</option>
                <option value="4">{{$t('提现失败')}}</option>
              </select><i style="position: absolute;right: 1rem;font-size: 1rem;color: red;top: 1.2rem;">▼</i>
            </div>

          </div>
          <div  class="searchBtn" v-show="status!=0" style="height:3rem;">
             <div><input style="text-indent: .5rem;" type="text" v-model="lowerUserName" :placeholder='$t("下级交易查询")' class="user-input proxySearch"></div>
            <a id="submitBtn2" @click="searchDownData2()">
              <div class="submitTouch"><i class="iconfont1">&#xe62b;</i></div>
            </a>
          </div>
          </div>
          <div class="topNav"><span :class="status==0?'active':''" @click="changeStatus(0)">{{$t('所有类型')}}</span><span :class="status==2?'active':''" @click="changeRecharge(2)">{{$t('提现记录')}}</span><span :class="status==1?'active':''" @click="changeRecharge(1)">{{$t('充值记录')}}</span>
              <!--<select>-->
                <!--<option>成功</option>-->
                <!--<option>失败</option>-->
              <!--</select>-->
            <!--</span>-->
          </div>
          <div class="showRecordData" v-if="status==0">
            <ul v-if="recordData.lenght!==0">
              <li v-for="(item, index) in recordData" :key="index">
                <div class="grey"><span class="betName">{{item.user_name?item.user_name:$t('沙发客')}}</span><span class="bonus">{{item.amount+coinUnit}}</span></div>
                <div class="grey">{{item.sourceTime?item.sourceTime:''}}</div>
                <div class="betResult" :style="item.status==1?'top:.6rem':''">
                  <div class="red" v-if="item.status==1">{{item.bonus}}</div>
                  <div :class="status==1?'red':''" v-if="status==1">
                    {{item.coinOperate?item.coinOperate:$t('其他')}}
                    ({{item.state==1?$t('未处理'):(item.state==2?$t('处理中'):(item.state==3?$t('充值成功'):(item.state==4?$t('充值失败'):'--')))}})
                  </div>
                  <div :class="status==2?'red':''" v-else-if="status==2">
                    {{item.coinOperate?item.coinOperate:$t('其他')}}
                    ({{item.state==1?$t('未处理'):(item.state==2?$t('处理中'):(item.state==3?$t('提现成功'):(item.state==4?$t('提现失败'):'--')))}})
                  </div>
                  <div :class="status==0?'red':''" v-else="status==0">
                    {{item.coinOperate?item.coinOperate:$t('其他')}}
                  </div>
                </div>
              </li>
            </ul>
            <div v-if="noMes!==1&&recordData.length!=0" class="loadTips" @click="showRecordData('')">{{isLoadOver==0?$t('点击加载更多'):$t('已加载全部数据')}}</div>
            <div v-if="noMes==1" class="fullPageMsg" id="noMessage">
              <div class="fullPageIcon iconfont1">&#xe66b;</div>
              <p>{{$t('暂无记录')}}</p>
						</div>

          </div>

          <div class="showRecordData" v-if="status!=0">
            <ul v-if="rcData.lenght!==0">
              <li v-for="item in rcData">
                <div class="grey"><span class="betName">{{item.user_name?item.user_name:$t('沙发客')}}</span><span class="bonus">{{item.amount+coinUnit}}</span></div>
                <div class="grey">{{item.apply_time?item.apply_time:''}}</div>
                <div class="betResult">
                  <div :class="qryType==1?'red':''" v-if="qryType==1">
                    {{item.state==1?$t('未处理'):(item.state==2?$t('处理中'):(item.state==3?$t('充值成功'):(item.state==4?$t('充值失败'):'--')))}}
                  </div>
                  <div :class="qryType==2?'red':''" v-else-if="qryType==2">
                    {{item.state==1?$t('未处理'):(item.state==2?$t('处理中'):(item.state==3?$t('提现成功'):(item.state==4?$t('提现失败'):'--')))}}
                  </div>
                </div>
              </li>
            </ul>
            <div v-if="noMes2!==1&&rcData.length!=0" class="loadTips" @click="getdatas2(status)">{{isLoadOver2==0?$t('点击加载更多'):$t('已加载全部数据')}}</div>
            <div v-if="noMes2==1" class="fullPageMsg" id="noMessage2">
              <div class="fullPageIcon iconfont1">&#xe66b;</div>
              <p>{{$t('暂无记录')}}</p>
            </div>

          </div>
        </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name:'agencyDealDetail',
  data(){
    return {
      //时间触发器
      timeList: ['今天', '昨天', '近七天'],
      timeC: '',
      indexArr:"",
      //记录数据
      recordData:[],
      rcData:[],
      //旧参数记录
      oldParam:"",
      //下级名称
      lowerUserName:"",
      //数据参数
      pageIndex:1,//页数
      pageIndex2:1,//页数
      status:"",//导航参数-(全部0-已中奖1-未中奖2-等待开奖3)
      //是否有数据
      noMes:0,
      noMes2:0,
      //是否还有数据可以加载
      isLoadOver:0,
      isLoadOver2:0,
      //金额单位
      coinUnit:"元",
      psState:'',
      rcState:'',
      qryType:'',
      state:'',

      lowerCoin:'', //金额范围
      upperCoin:'', //金额范围

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
		})
  },
  mounted(){
    $(".showRecordData").css({
      height:$("#container").height()-$(".topNav").height()-$(".searchBtn").height()-44+"px",
      overflow:'scroll'
    })
  },
  methods:{
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
				title: '请选择', //标题
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
        if(index||index===0){
          this.oldParam="";
        }
        this.showRecordData(index);
    },
    //加载交易数据
    showRecordData(index){

      if(this.isLoadOver==1){
        return
      }
      var _this=this,
      param={
        username:localStorage.userName,
        lowerUserName:_this.lowerUserName,
        coinOperateType:_this.status==0?"":_this.status,
        startTime:"",
        endTime:"",
        pageIndex:_this.pageIndex,
        pageNum:10
      },obj,nowTime;

      console.log(param);

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
    obj={
        type:"post",
        data:param,
        url:"/authApi/qryAgentCapitalInfo",
        success:function(data){
          if(data.code==200){

            if(data.body.pageSize==_this.pageIndex){
              _this.isLoadOver=1;
            }else{
              _this.isLoadOver=0;
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
    // getTimeParam(index){
    //
    //   if(!index&&index!=0){
    //     index=2;
    //   }
    //   var nowDate=new Date(),obj={
    //     hour:nowDate.getHours(),
    //     minutes:nowDate.getMinutes(),
    //     seconds:nowDate.getSeconds(),
    //     now:nowDate.toLocaleDateString(),
    //     last:(new Date(nowDate.getTime()-86400000)).toLocaleDateString(),
    //     sevenAgo:(new Date(nowDate.getTime()-86400000*7)).toLocaleDateString(),
    //   };
    //   switch(index){
    //
    //     case 0://今天
    //       return {
    //         start:new Date(obj.now+" 00:00:00").getTime(),
    //         end:new Date(obj.now +" "+
    //         (obj.hour<10?"0"+obj.hour:obj.hour)+":"+
    //         (obj.minutes<10?"0"+obj.minutes:obj.minutes)+":"+
    //         (obj.seconds<10?"0"+obj.seconds:obj.seconds)).getTime(),
    //       }
    //       break;
    //     case 1://昨天
    //       return {
    //         start:new Date(obj.last+" 00:00:00").getTime(),
    //         end:new Date(obj.last+" 23:59:59").getTime(),
    //       }
    //       break;
    //     case 2://近七天
    //       return {
    //         start:new Date(obj.sevenAgo+" 00:00:00").getTime(),
    //         end:new Date(obj.now +" "+
    //         (obj.hour<10?"0"+obj.hour:obj.hour)+":"+
    //         (obj.minutes<10?"0"+obj.minutes:obj.minutes)+":"+
    //         (obj.seconds<10?"0"+obj.seconds:obj.seconds)).getTime(),
    //       }
    //       break;
    //   }
    // },
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
      } else  if(index == 8){
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
      // this.oldParam="";
      // this.lowerUserName="";
      this.isLoadOver=0;
      this.noMes=0;
    },
    //改变导航状态status
    changeStatus(index){
      var _this=this;
      _this.status=index;
      this.$nextTick(function(){
          $(".showRecordData").css({
          height:$("#container").height()-$(".topNav").height()-$(".searchArea").height()-44+"px",
          overflow:'scroll'
        })

      })
      _this.clearParamData();
      _this.getdatas();
    },
    searchDownData(){
      var _this=this;
      _this.status=0;
      _this.clearParamData();
      _this.getdatas();

    },
    searchDownData2(){
      var _this=this;
      _this.isLoadOver2=0;
      _this.noMes2=0;
      _this.getdatas2( _this.status);

    },


    changeRecharge:function(index){
      var _this = this;
      if(_this.status!=index){
        _this.isLoadOver2=0;
        _this.noMes2=0;
        this.$nextTick(function(){
          setTimeout(function(){
            $(".showRecordData").css({
              height:$("#container").height()-$(".topNav").height()-$(".searchArea").height()-44+"px",
              overflow:'scroll'
            })
          },50);
        })
        _this.getdatas2(index);

      }else {
        return
      }
    },

    getdatas2:function (index) {
      var _this =this;
      if(_this.isLoadOver2==1){
        return
      }
      _this.status = index;
      _this.qryType = index;
      _this.pageIndex2 = 1;
      _this.rcData = [];


      if(index==1){
        _this.state = _this.rcState;
      }else {
        _this.state = _this.psState;
      }

      var param={
        startTime:"",
        endTime:"",
        pageIndex:_this.pageIndex2,
        pageNum:10,
        state:_this.state,
        qryType:_this.qryType,
        username:localStorage.userName,
        lowerUserName:_this.lowerUserName,
        lowerCoin: _this.lowerCoin,
        upperCoin: _this.upperCoin,
      },nowTime;

      console.log(param);

      if(_this.oldParam){
        param.startTime=_this.oldParam.startTime;
        param.endTime=_this.oldParam.endTime;

      }else{
        nowTime=this.getTimeParam(index);
        param.startTime=nowTime.start;
        param.endTime=nowTime.end;
        _this.oldParam=param;
      }



      var obj={
        type:"post",
        data:param,
        url:"/authApi/qryAgentDepositOrWithDraw",
        success:function(data){
          if(data.code==200){

            if(data.body.pageSize==_this.pageIndex2){
              _this.isLoadOver2=1;
            }else{
              _this.isLoadOver2=0;
            }
            if(_this.pageIndex2<data.body.pageSize){

              if(data.body.list.length==0){
                _this.noMes2=1;
              }else{
                _this.pageIndex2++;
              }
              _this.rcData=data.body.list;
            }else{
              data.body.list.map(function(item){
                _this.rcData.push(item);
              })
            }
          }else{
            _this.noMes2=1;
          }

        }
      };
      this.base.callAuthApi(obj);

    },
  },
  watch:{

    psState:function () {

      this.isLoadOver2=0;
      this.noMes2=0;

      this.getdatas2(2);

    },
    rcState:function () {

      this.isLoadOver2=0;
      this.noMes2=0;

      this.getdatas2(1);

    },

    lowerCoin:function(){

      var num = this.lowerCoin;
      if (typeof (num) == "string") {
        num = num.replace(/\D+/g, '')
      }

      if (num && num < 1) {
        num = 1;
      }
      this.lowerCoin = num;


    },

    upperCoin:function(){
      var num = this.upperCoin;
      if (typeof (num) == "string") {
        num = num.replace(/\D+/g, '')
      }

      if (num && num < 1) {
        num = 1;
      }
      this.upperCoin = num;

    },

    //路由监控
    $route(to,from){
      if(to.name=="agencyDealDetail"){
        this.lowerUserName="";
        this.changeStatus(0)
      }
    }
  },
}
</script>
<style src="../../style/common/shijian.css" scoped></style>
<style scoped>

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
    overflow: hidden;
}
.searchCon, .submitTouch {
    height: 2.5rem;
    border-radius: .2em;
}
.searchCon {
    width: -ms-calc(100% - 1.2em);
    width: calc(100% - 1.2em);
    /* background: #fff; */
    background: #2a2a2a;
    margin: .6em;
}
.searchCon2 {
  width: 50%;
  /* background: #fff; */
  background: #2a2a2a;
  margin: .6em .6rem .6rem 0;
  float: right;
}
.coin{
  display: inline-block;
  /*background: #fff;*/
  margin:.6rem 0 .6rem .6rem;
  color: #fff;
}
.coin input{
  width: 3.2rem;
  height: 2.8rem;
  border: 0;
  /* background: #fff; */
  text-indent: .3rem;
  background: #424242;
  color: #fff;
  /*display: inline-block;*/
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
    display: block;
    float: left;
    border: none;
    border-right: none;
    -webkit-appearance: none;
    padding: 0;
    background: #2a2a2a;
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
    background: #b12a00;
    display: block;
    float: left;
    text-align: center;
    height: 1.5rem;
    line-height: 1.4rem;
}
.topNav{
      /* background: #f5f5f5; */
    line-height: 2rem;
    background: #8c8c8c;
  color: #fff;
}
/* .topNav span:first-child{
  width: 25%;

} */
.topNav>span{
      display: inline-block;
    /* width: 37%; */
    width:33%;
    text-align: center;
    line-height: 2.5rem;
  position: relative;
  /*right: -.5rem;*/
}
.topNav span select{
  display: inline-block;
  width: 4.6rem;
  text-align: center;
  line-height: 1.8rem;
  font-size: .9rem;
  /*margin-left: .1rem;*/
  border-radius: .2rem;
  /*z-index: 1;*/
  /*background: transparent;*/
  /*background: transparent;*/
  background: #424242;

}

/*.topNav>span:not(:first-child):after{*/
  /*content: '▼';*/
 /*position: absolute;*/
  /*right: .4rem;*/
  /*font-size: .4rem;*/
  /*display: inline-block;*/
  /*line-height: 1rem;*/
  /*margin-top: .7rem;*/
  /*!*z-index: -1;*!*/
/*}*/
.topNav span.active{
  border-bottom:.1rem solid #b12a00;
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
  color: #fff;
}
.betResult .red{
  color: #b12a00;
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
</style>
<style lang="less" scoped>
#container{
  height: 100%;
  background: url(../../assets/images/base/black_bg.png)no-repeat ;
  background-size: 100% 100%;
  .main{
    margin-top: 44px;
   .topNav span select{
     margin: 0;
     padding: 0;
     text-align: center;
   }
   #submitBtn2{
     top: .7rem;
   }
  }

}
</style>



