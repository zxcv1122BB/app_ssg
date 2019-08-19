<template>
  <div>
    <div id="container">
      <div>
         <header id="header">
           <a class="goBack" href="javascript:void(0)" @click="routerBack"></a>
          <h1>{{$t('返点赔率表')}}</h1>
          <div class="rightTitle" @click="openGameNameMenu" v-cloak>
            <span>{{showName}}</span>
            <!-- <i class="iconfont">&#xe61a;</i> -->
            <i class="mui-icon mui-icon-arrowdown" style="top: .1rem;"></i>
          </div>
        </header>
        <div class="main">
          <div class="slideLeft">
            <ul>
              <li><i>{{$t('玩法')}}</i><span></span><em >{{$t('返点')}}</em></li>
              <li v-for="item in gameItemList">{{item}}</li>
            </ul>
          </div>
          <div class="slideRight">
            <div>
              <ul v-for="items in rebateItemList">
                <li v-for="item in items">{{item}}</li>
              </ul>
            </div>

          </div>

          <div class="popups">
            <div class="content">
              <div><span v-for="(item,index) in allGameID" @click="getBetsType(item)">{{item.show_name}}</span>
              </div>
              <div class="cancel" @click="closeGameNameMenu">{{$t('取消')}}</div>
            </div>
            <div class="wrapper" @click="closeGameNameMenu"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:"",
  data(){
    return {
      //所有可用id和名称
      allGameID:"",
      //根据code区分
      codeGameID:"",
      //三级id
      oneTypeId:"",
      //赔率列表
      rebateItemList:"",
      //三级玩法名称列表
      gameItemList:"",
      //一级玩法名称
      showName:"",
      //当前玩法对应的code
      code:"",
    }
  },
  created(){

    this.initData();
  },
  mounted(){
    $(".slideLeft li:first-child:before").css({
      borderBottomWidth:document.documentElement.clientWidth*0.3+"px"
    });
     $(".slideLeft li:first-child:after").css({
      borderBottomWidth:document.documentElement.clientWidth*0.3+"px"
    });
    $("#container .main").css({
      height:$(".child-view").height() - 44 +"px"
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
    //初始化第一个数据
    initData(){
      //获取所有的数字彩id
      var _this=this,list=JSON.parse(localStorage.index_sysLottery),gameIDList=[];
      list.map(function(item){
        if(item.code){
          gameIDList.push({
            code:item.code,
            gameID:item.gameID,
            show_name:item.show_name
          })
        }
      })
      //所有id和名称存储
      _this.allGameID=gameIDList;
      //初始化第一个对象数据
      _this.getBetsType(gameIDList[0]);
    },
    //获取三级玩法表
    getBetsType:function(objList){

      this.closeGameNameMenu();
      //保存当前选中的玩法id,显示中文名称,code
      this.oneTypeId=objList.gameID;
      this.showName=objList.show_name;
      this.code=objList.code;

            var _this = this,
                obj = {
                    type: "post",
                    // type: 'post',
                    url: '/commonAPI/qryGamePlayInfo',
                    data: {
                        one_type_id: _this.oneTypeId
                    },
                    success: function (data) {
                        if (data.code == 200 && data.body) {
                            // //console.log(data.body)
                          _this.initializeBetsTypeData(data.body)
                        } else {
                        }
                    },
                    error: function (res) {

                    }
                },
                dataList=localStorage.qryGamePlayInfo?JSON.parse(localStorage.qryGamePlayInfo):"",
                ots=localStorage.qryGamePlayInfoTimestamp?JSON.parse(localStorage.qryGamePlayInfoTimestamp):"",
                nts=localStorage.contrastTimestamp?JSON.parse(localStorage.contrastTimestamp).gameTypeSign:"";

            //比对时间戳，看是否需要更新
            if ((!nts[_this.oneTypeId]&&!ots[_this.oneTypeId]&&dataList[_this.oneTypeId])||(dataList != "" && ots != "" && nts != "" && nts != null && ots[_this.oneTypeId] && dataList[_this.oneTypeId] && ots[_this.oneTypeId] == nts[_this.oneTypeId])) {
                _this.initializeBetsTypeData(dataList[_this.oneTypeId])
            }else{
                _this.contrastTimestamp();
                this.base.callCommonApi(obj);
            }
        },
         //获取第一遍加载时的时间戳
        contrastTimestamp:function(){
            var _this=this,timeList,
                obj={
                    type:"post",
                    url:"/commonAPI/privacy/getUpdateStatusSign",
                    data:{
                        isWhite:true
                    },
                    success:function(data){
                        var ulist=[],nlist=[],oDataList,nameList=["sysAdvpictureSign","sysBulletinSign","sysConfigureSign","sysLotterySign"];
                        if(data.body){
                            localStorage.contrastTimestamp=JSON.stringify(data.body);
                            if(localStorage.qryGamePlayInfoTimestamp){
                                timeList=JSON.parse(localStorage.qryGamePlayInfoTimestamp);
                                timeList[_this.oneTypeId]=data.body.gameTypeSign[_this.oneTypeId];
                                localStorage.qryGamePlayInfoTimestamp=JSON.stringify(timeList);
                            }else{
                                timeList={};
                                timeList[_this.oneTypeId]=data.body.gameTypeSign[_this.oneTypeId];
                                localStorage.qryGamePlayInfoTimestamp=JSON.stringify(timeList);
                            }
                        }else{
                            localStorage.contrastTimestamp="";
                            setTimeout(function(){
                                _this.contrastTimestamp();
                            },2000);
                        }
                    },
                };
            this.base.callCommonApi(obj);
        },
        //初始化投注项数据
        initializeBetsTypeData:function(data){
          //gameItemList  rebateItemList
          var _this=this,
              gameNameList=[],rebateNameList=[],
              code1 = _this.code,
              middleVal="",
              objList=[],
              rebateList,backRebate,
              rebateList1 = JSON.parse(localStorage.szcRebateList);
            for (var i in rebateList1) {
              if (rebateList1[i].code == code1) {
                rebateList = rebateList1[i]
                break
              }
            }
            // 计算从最大返点到0.1
          do{
            objList=[rebateList.nowRebate];
            data.map(function(item){
              if (item.max_prize.indexOf('|') != -1) {
                var maxList = item.max_prize.split('|'), minList = item.min_prize.split('|'), val = "";
                maxList.map(function (items, index) {
                  //三级玩法名
                  if(rebateNameList.length==0){
                  gameNameList.push(item.name2+"-"+item.name3+"-"+index);
                 }
                  middleVal = parseFloat((items - minList[index]) / (rebateList.rebate*10+1)).toFixed(3);
                  backRebate = parseFloat(items - (middleVal * (rebateList.rebate - rebateList.nowRebate)*10)).toFixed(3);
                  objList.push(backRebate);
                })
              } else {
                //三级玩法名
                if(rebateNameList.length==0){
                  gameNameList.push(item.name2+"-"+item.name3);
                }
                middleVal = parseFloat((item.max_prize - item.min_prize) / (rebateList.rebate * 10+1)).toFixed(3);
                backRebate = parseFloat(item.max_prize - (middleVal * (rebateList.rebate - rebateList.nowRebate) * 10)).toFixed(3);
                  //显示的赔率表
                  // rebateNameList.push([])
                objList.push(backRebate);
              }
            })
            rebateNameList.push(objList);
            rebateList.nowRebate=parseFloat(rebateList.nowRebate-0.1).toFixed(1);

          }while(rebateList.nowRebate!=0)
          //添加返点为0的赔率
          objList=[rebateList.nowRebate];
            data.map(function(item){
              if (item.max_prize.indexOf('|') != -1) {
                var maxList = item.max_prize.split('|'), minList = item.min_prize.split('|'), val = "";
                minList.map(function (items, index) {
                  backRebate = parseFloat(items).toFixed(3);
                  objList.push(backRebate);
                })
              } else {
                backRebate = parseFloat(item.min_prize).toFixed(3);
                objList.push(backRebate);
              }
            })
            rebateNameList.push(objList);
            rebateList.nowRebate=parseFloat(rebateList.nowRebate-0.1).toFixed(1);
          //赋值数据到对象数据中
          _this.gameItemList=gameNameList;
          _this.rebateItemList=rebateNameList;
          //动态设置大小
          this.$nextTick(function(){
            $(".slideRight>div").css({
              width:5*rebateNameList.length+"rem"
            });
          })
         


        },
        //玩法名称点击切换
        turnGameName(index){
          var _this=this,item=_this.allGameID[index];
          _this.getBetsType(item);
        },
        //打开玩法名称菜单
        openGameNameMenu(){
          $(".popups").show();
        },
        //关闭玩法名称菜单
        closeGameNameMenu(){
          $(".popups").hide();
        },

  },
  watch:{

  }
}
</script>


<style scoped>
#container{
  margin-top: 44px;
}
#container .main{
  height:calc(100% - 44px);
  overflow: scroll;
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 18px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
.rightTitle{
  color: #fff;
  position: absolute;
  top: .9rem;
  right: 1rem;
}
.rightTitle span{
  font-size: .8rem;
}
.rightTitle i{
  width: .5rem;
  height: .5rem;
  display: inline-block;
  position: relative;
  top: .2rem
}
.slideLeft{
  width: 29%;
  background: #fff;
  text-align: center;
  box-shadow: 0.5em 0 0.5em #d5d5d5;
  line-height: 2rem;
  font-size: .95rem;
   float: left;
   box-sizing: border-box;
   position: relative;
   z-index: 10;
}
.slideLeft li:first-child:before {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    border-bottom: 2.6em solid #dedede;
    border-right: 8rem solid transparent;
    content: "";
    z-index: 1;
}
.slideLeft li:first-child:after {
    position: absolute;
    left: 0;
    right: 1px;
    top: 1px;
    top: .5px;
    bottom: 0;
    border-bottom: 2.6em solid #eee;
    border-right: 8rem solid transparent;
    content: "";
    z-index: 1;
}
.main ul li{
      overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.main ul li:first-child {
    position: relative;
    height: 2.6em;
    line-height: 2.6em;
    overflow: hidden;
}
.slideLeft li:first-child i {
    position: absolute;
    left: 15px;
    bottom: -6px;
    z-index: 2;
}
.slideLeft li:first-child em {
    position: absolute;
    right: 15px;
    top: -6px;
    z-index: 2;
}
.slideRight{
  background: #fff;
  text-align: center;
  box-shadow: 0.5em 0 0.5em #d5d5d5;
  line-height: 2rem;
  font-size: .95rem;
  float: left;
  max-width: 70%;
  box-sizing: border-box;
  overflow-x: scroll;
  /* margin-left: 1rem; */
}
.slideRight ul{
  float: left;
      width: 5rem;
    border-right: 1px solid #888;
    box-sizing: border-box;
}
.main ul li:nth-child(odd){
  background: #eee;
}
/* 名称列表 */
.popups{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  z-index: 202;
  display: none;
}
.popups .content{
  position: absolute;
  bottom: 0;
  background: #efeef4;
  z-index: 203;

}
.popups .content>div{
  background: #fff;
  padding: .5rem;
}
.popups .wrapper{
  background: #000;
  opacity: .5;
  z-index: 202;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
}
.popups .content div span{
  display: inline-block;
  width: 19%;
  text-align: center;
  overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    line-height: 2rem;
    border: 1px solid #dddddd;
    box-sizing: border-box;
    margin-right: 1%
}
.popups .content .cancel{
  background: #fff;
  margin-top: .8rem;
  text-align: center;
  line-height: 1.8rem;
  font-size: 1.2rem
}
</style>


