//会员管理
<template>
  <div>
    <div id="container">
      <div>
         <header id="header">
           <a class="goBack" href="javascript:void(0)" @click="routerBack"></a>
          <h1>{{$t('会员管理')}}</h1>
          </header>
          <div class="main">
            <div class="contentList">
              <dl>
                <dt class="title"><span>{{$t('账号')}}</span><span>{{$t('类型')}}</span><span>{{$t('登录时间')}}</span><span>{{$t('下级人数')}}</span></dt>
                <dd class="memberList" v-for="item in nowloadList" @click="showPopover(item)"><span class="blue">{{item.userName}}</span><span>{{item.showName}}</span><span>{{item.lastLoginTime?item.lastLoginTime.substring(0,10):''}}</span><span>{{item.regNum}}</span>
                </dd>
                <dd class="loading" @click="loadMemberList">{{loading.msg}}</dd>
              </dl>
            </div>

          </div>
        <div class="popover">
          <div class="blackBg" @click="closePopover"></div>
          <div class="moreLayer">
            <ul>
              <li v-for="(item,index) in downMsgList" :class="index==0?'blue':''" @click="downMsgListFn(index)">{{item}}</li>
              <!-- <li @click="showItemRebateList">{{$t('查看返点')}}</li> -->
            </ul>
            <div class="cancel" @click="closePopover">{{$t('取消')}}</div>
          </div>
          <div class="itemRebateList">
            <div class="title">
              {{$t('返点详情')}}
              <span class="close" @click="closePopover">X</span>
            </div>
            <ul>
              <li v-for="item in itemRebateList">
                <span>{{item[0]}}</span><span>{{item[1]}}</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:"agentMember",
  data(){
    return {
      pageIndex:0,
      userType:localStorage.userType_?localStorage.userType_:2,

      downPageIndex:1,

      nowloadList:[],

      // userTypeList:[1],
      allLoadList:{

      },

      loading:{
        isLoading:0,
        msg:"加载中..."
      },
      downMsgList:[],

      //计算往下几级
      downNum:0,
      //记录级数
      // userTypeList:[1],
      nowUserType:"1级",

      //级数数据记录
      gradeList:{
        1:{

        }
      },
      //参数uid
      pramUid:'',
      //上级参数uid
      prevPramUid:'',
      //子返点列表
      itemRebateList:[],
    }
  },
  created(){
    this.loadMemberList();
  },
  mounted(){},
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

    loadMemberList(index){
      //

      var paramData={},
          _this=this;

      if(index==0){//下级
        _this.clearData();
        paramData={
          uid:_this.downParam.uid,
          pageIndex:  _this.downPageIndex,
	        pageNum:10
        };
        // _this.userTypeList[_this.downNum]=_this.downNum+1;
        _this.nowUserType=(_this.downNum+1)+"级",
        _this.downNum++;
        if(_this.pramUid){
          _this.prevPramUid=_this.pramUid;
          _this.pramUid="";
        }
        _this.pramUid=paramData.uid;
        if(_this.gradeList[_this.downNum]&&_this.gradeList[_this.downNum][_this.pramUid]&&_this.gradeList[_this.downNum][_this.pramUid].dataList){
          _this.upDataBack(_this.downNum);
          return
        }

      }else if(index==1){//上级

        // paramData={
        //   uid:_this.upParam.uid,
        //   pageIndex:  _this.downPageIndex,
	      //   pageNum:10
        // };
        // _this.userTypeList[_this.downNum]=_this.downNum+1;
        _this.clearData();
        _this.nowUserType=(_this.downNum-1)+"级",
        _this.downNum--;

        _this.upDataBack(_this.downNum);
        return
      }else{
        paramData={
          pageIndex:  _this.downPageIndex,
	        pageNum:10
        };
      }
      if (this.loading.isLoading ==1){
        return;
      }
      //级数增加
      if(_this.downNum==0){
        _this.downNum=1;
      }else if(_this.downNum!=1){
        paramData.uid= _this.pramUid;
      }
      _this.loading.msg = _this.$t("加载中") + "...";
      var obj={
        type:"post",
        url:"/authApi/proxy/queryInvitateUserList",
        data:paramData,
        success:function(data){
          if(data.code==200){
            if( _this.downPageIndex==1){
              _this.nowloadList=data.body.list;
            }else{
              data.body.list.map(function(item){
                _this.nowloadList.push(item);
              })
            }
            if (data.body.list&&data.body.list.length < 10 || data.body.pageSize == _this.pageIndex) {
              _this.loading.isLoading = 1;
              _this.loading.msg = _this.$t("已显示全部数据");
            } else {
              _this.loading.isLoading = 0;
              _this.loading.msg = _this.$t("点击加载更多");
              _this.downPageIndex++;
            }
            var list=JSON.parse(JSON.stringify(_this.nowloadList)),
                  loadList=JSON.parse(JSON.stringify(_this.loading));
            if(_this.downNum==1){

              _this.gradeList[1].dataList=list;
              _this.gradeList[1].msgList={
                loading:loadList,
                downPageIndex:_this.downPageIndex
              }
            }else{
              if(!_this.gradeList[_this.downNum]){
                _this.gradeList[_this.downNum]={};
              }
              if(!_this.gradeList[_this.downNum][_this.pramUid]){
                _this.gradeList[_this.downNum][_this.pramUid]={};
              }

              _this.gradeList[_this.downNum][_this.pramUid].dataList=list;

              _this.gradeList[_this.downNum][_this.pramUid].msgList={
                loading:loadList,
                downPageIndex:_this.downPageIndex
              }
              if(_this.prevPramUid){
               _this.gradeList[_this.downNum][_this.pramUid].prevPramUid=_this.prevPramUid;
              }
            }
          }else{
            _this.loading.isLoading = 1;
            _this.loading.msg = data.msg;
          }
        },
        error:function(msg){
          //console.log(msg)
        },
      };
      this.base.callAuthApi(obj);
    },
    //返回上层数据
    upDataBack(index){
      var _this=this;
      if(index==1){
        _this.nowloadList= _this.gradeList[index].dataList;
        _this.loading= _this.gradeList[index].msgList.loading;
        _this.downPageIndex= _this.gradeList[index].msgList.downPageIndex;
      }else{
        _this.nowloadList= _this.gradeList[index][_this.pramUid].dataList;
        _this.loading= _this.gradeList[index][_this.pramUid].msgList.loading;
        _this.downPageIndex= _this.gradeList[index][_this.pramUid].msgList.downPageIndex;
      }

      //console.log(index);
    },
    //清除数据
    clearData(){
      var _this=this;
        _this.downPageIndex=1;

       _this.loading.isLoading = 0;
      _this.loading.msg = _this.$t("点击加载更多");
    },

    //查看下级
    checkDownGrade(){
      var _this=this;
    },
    //弹出框
    showPopover:function(list){
      var _this=this,
        str = list.data,
        szcList=JSON.parse(localStorage.szcRebateList);

      str=str.split("@");
      str.map(function(item,index){
        str[index] = item.split("#");
        for(var i in szcList){
          if(szcList[i].code==str[index][0]){
            str[index][0] = szcList[i].code_name;
            break;
          }
        }
      })
      _this.itemRebateList=str;

      _this.downMsgList=[];

      _this.downMsgList.push(list.userName);
      _this.downMsgList.push(_this.$t("查看返点"));
      if(list.regNum!=0){
        _this.downMsgList.push(_this.$t("查看下级"));

        _this.downParam=list;


      }else if(_this.downNum!=1){
        _this.downMsgList.push(_this.$t("查看上级"));

        _this.upParam=list;
      }

      $(".popover").show();
      //console.log(_this.downMsgList)
    },
    //关闭
    closePopover(){
     $(".popover").hide();
      $(".moreLayer").show();
      $(".itemRebateList").hide();
    },
    //点击
    downMsgListFn(index){

      if(index==0){
        return
      }
      var _this=this;
      if(_this.downMsgList[index]==_this.$t("查看上级")){
        index=3;
      }
      switch(index){
        //会员名点击
        case 0:
          break;
        //返点点击
        case 1:
          $(".moreLayer").hide();
          $(".itemRebateList").show();
          break;
        //下级点击
        case 2:
          _this.loadMemberList(0);
          _this.closePopover();
          break;
        //上级点击
        case 3:
          _this.loadMemberList(1);
           _this.closePopover();
          break;
      }
    },

  },
  watch:{
    $route(to,from){
      if(to.name=="agentMember"){
       Object.assign(this.$data, this.$options.data())
        this.loadMemberList();
      }
    }
  }
}
</script>
<style scoped>
  .contentList .title{
    line-height: 2.5rem;
    /* background: #f3f3f3; */
    background: #8c8c8c;
    color:#fff;
    text-align: center;
  }
  .contentList .memberList{
    line-height: 2.5rem;
    border: 1px solid #f3f3f3;

  }
  .contentList .title span,.contentList .memberList span{
    display: inline-block;
    width: 25%;
  }
  .contentList dd{
    /* background: #fff; */
    background: #424242;
    text-align: center;
    color: #fff;
}
  .contentList dd span.blue{
     color: #3e8eff;
  }
  .contentList .loading{
    line-height: 3rem;
    font-size: 1.1rem;
    border-top: 1px solid #efeff4;
  }


/* //底部弹出框 */

.popover {
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  display: none;
  z-index: 202;
}

.blackBg {
  width: 100%;
  height: 100%;
  background: #000;
  position: fixed;
  top: 0;
  opacity: .5;
  z-index: 201;
}

.moreLayer {
  background: #ddd;
  z-index: 202;
  position: relative;
  font-size: 1.2rem;
}

.moreLayer ul {
  background: #fff;
  color: #000;
}

.moreLayer ul li {
  line-height: 2.5rem;
  border-bottom: 1px solid #ddd;
  background: #424242;
  color: #fff;
}

.moreLayer ul li.blue{
  color: #3e8eff;

}

.moreLayer .cancel {
  line-height: 2.5rem;
  border-bottom: 1px solid #ddd;
  /* background: #fff; */
  background: #424242;
  color: #fff;
  margin-top: .5rem;
}

.itemRebateList {
  display: none;
  /* background: #fff; */
  background: #424242;
  color: #fff;
  z-index: 202;
  position: relative;
  text-indent: .5rem;
}

.itemRebateList .title {
  line-height: 4rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.itemRebateList .title .close{
  position: absolute;
  right: 1rem;
}
.itemRebateList ul li {
  line-height: 3rem;
  border-bottom: 1px solid #ddd;
  text-align: left;
}

.itemRebateList ul li span {
  display: inline-block;
  width: 45%;
}

</style>
<style lang="less" scoped>
#container{
  height: 100%;
  background: url(../../assets/images/base/black_bg.png)no-repeat ;
  background-size: 100% 100%;
  .main{
    margin-top: 2.67rem;
   .list-item{
    //  background: rgba(255, 255, 255, .6)
   }
  }

}
</style>





