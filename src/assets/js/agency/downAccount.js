//下级开户
export default{
  name:"downAccount",
  data(){
    return {
      //头部切换
      topStatus:0,
      pageIndex:1,

      //2为会员，1为代理
      userType:1,
      //玩法最大返点列表
      // maxRebatesList:[],
      nameRebatesList:[],

      modelRebatesList:[],

      //下拉加载列表
      downList:[],
      loading:{
        isLoading:0,
        msg:"加载中"
      },

      //子返点列表
      itemRebateList:[],
      //子id
      invitateId:"",

      kh_con:''
    }
  },
  created(){
    // if(localStorage.gameRebatesList){
      this.getGameRebatesList();
    // }


  },
  mounted(){
    this.kh_con=$("#container").height()-$("#header").height()-$(".main>.top").height();
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
    onCopy: function (e) {
      mui.toast('复制成功');
    },
    onError: function (e) {
      mui.toast('复制失败');
    },
    //页面跳转
    skipTo(name){

      this.$router.push({
        name:name
      })
    },
    //获取玩法返点列表
    getGameRebatesList() {
      if (localStorage.szcRebateList){
        var _this=this;
        _this.nameRebatesList = JSON.parse(localStorage.szcRebateList);
        _this.modelRebatesList=[];
        _this.nameRebatesList.map(function (item) {
          _this.modelRebatesList.push(item.nowRebate);
        })
        return
      }
      // ssc#8.0@k3#8.5@11x5#7.5@3D#7.5@PK10#8.0@hk6#10.0
      var strList = localStorage.gameRebatesList,obj={},_this=this;
      strList=strList.split("@");
      strList.map(function(item){
        var list=item.split("#");
        obj[list[0]] = list[1];
      })
      // _this.maxRebatesList = obj;
      var _this = this,
        obj = {
          type: "post",
          url: "/authApi/proxy/getRebateConfigList",
          data: {

          },
          success: function (data) {
            if (data.code == 200) {
              // _this.maxRebatesList=data.body;
              data.body.map(function(item){
                // item.rebate=_this.maxRebatesList[item.code];
                _this.modelRebatesList.push("");
              })
              _this.nameRebatesList=data.body;
            } else {

            }
          },
          error: function (msg) {
            //console.log(msg)
          },
        };
      this.base.callAuthApi(obj);
    },
    //生成邀请码
    creadtedCode(){
      // userType(2为会员 1为代理)
      // data(彩种返点拼接字符串 eg: ssc#8.0@k3#8.5@11x5#7.5@3D#7.5@PK10#8.0@hk6#10.0)
      var check=this.checkRebatesFn();
      if (check.check==1){
        return
      }
      $("#wrap").show();
      var _this = this,
        obj = {
          type: "post",
          url: "/authApi/proxy/addInvitateInfo",
          data: {
            userType: _this.userType,
            data: check.str
          },
          success: function (data) {
            $("#wrap").hide();
            if (data.code == 200) {
              _this.modelRebatesList.map(function(item,index){
                // item="";
                _this.$set(_this.modelRebatesList,index,"");
              })
              _this.clearLoadingData();
              mui.toast("已成功生成！")
              // //console.log(data);
            } else {

            }
          },
          error: function (msg) {
            //console.log(msg)
          },
        };
      this.base.callAuthApi(obj);
    },
    //检查生成邀请码的参数-blur事件
    checkRebatesBlur(index){
      var _this = this, text1 = _this.modelRebatesList[index],
        text2 = parseFloat(_this.nameRebatesList[index].nowRebate);
      if (isNaN(text1)) {
        mui.toast(_this.nameRebatesList[index].codeName ? _this.nameRebatesList[index].codeName + "--返点设置不正确" : _this.nameRebatesList[0].codeName + "--返点设置不正确")
        _this.$set(_this.modelRebatesList, index, "");
      } else if (text1 < 0) {
        mui.toast(_this.nameRebatesList[index].codeName + "返点要大于0.0")
        _this.$set(_this.modelRebatesList, index, "0.0");
      } else if (text1 > text2) {
        mui.toast(_this.nameRebatesList[index].codeName + "返点要小于" + text2.toFixed(2));
        _this.$set(_this.modelRebatesList, index, text2.toFixed(2));
      }else{
        text1=parseFloat(text1).toFixed(1);
        _this.$set(_this.modelRebatesList, index, text1);
      }

    },
    //检查生成邀请码的参数
    checkRebatesFn(){
       // data(彩种返点拼接字符串 eg: ssc#8.0@k3#8.5@11x5#7.5@3D#7.5@PK10#8.0@hk6#10.0)
      var _this=this,check=0,isNoContinue=0,str="";
      _this.modelRebatesList.map(function(item,index){
        var text1=parseFloat(item),
          text2 = parseFloat(_this.nameRebatesList[index].nowRebate);

        if (isNoContinue==0){
          if(str){
            str += "@" + _this.nameRebatesList[index].code + "#" + item;
          }else{
            str += _this.nameRebatesList[index].code + "#" + item;
          }

          if (isNaN(text1)) {
            mui.toast(_this.nameRebatesList[index].codeName ? _this.nameRebatesList[index].codeName + "--返点设置不正确" : _this.nameRebatesList[0].codeName+"--返点设置不正确")
            _this.$set(_this.modelRebatesList, index, "");
            isNoContinue =1;
            check = 1;
          } else if (text1 < 0) {
            mui.toast(_this.nameRebatesList[index].codeName + "返点要大于0.0")
            _this.$set(_this.modelRebatesList, index, "");
            isNoContinue = 1;
            check = 1;
          } else if (text1 > text2) {
            mui.toast(_this.nameRebatesList[index].codeName + "返点要小于" + text2.toFixed(2));
            _this.$set(_this.modelRebatesList, index, "");
            isNoContinue = 1;
            check = 1;
          }
        }

      })
      return {
        "check":check,
        "str":str
      };
    },
    //清空数据
    clearLoadingData(){
      var _this=this;
      _this.loading.isLoading = 0;
      _this.loading.msg = "点击加载更多";
      _this.pageIndex = 1;
      _this.downList = [];
    },
    //邀请码加载数据
    loadList(){
      if (this.loading.isLoading ==1){
        return;
      }
      var _this=this,
      obj={
        type:"post",
        url:"/authApi/proxy/queryInvitateInfo",
        data:{
          userType: _this.userType,
          pageIndex:  _this.pageIndex,
	        pageNum:10
        },
        success:function(data){
          if(data.code==200){

            if (_this.downList.length==0){
              _this.downList=data.body.list;

            }else{
              data.body.list.map(function(item){
                _this.downList.push(item);
              })

            }
            if (data.body.list && data.body.list.length < 10 || data.body.pageSize == _this.pageIndex || data.body.pageSize==0) {
              _this.loading.isLoading = 1;
              _this.loading.msg = "已显示全部数据";
            } else {
              _this.loading.isLoading = 0;
              _this.loading.msg = "点击加载更多";
              _this.pageIndex++;
            }
            // //console.log(data);
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
    //弹出框
    showPopover:function(index){
      // $(".popover").css({
      //   zIndex:202
      // });
      $(".popover").show();
      var _this=this,
        str = _this.downList[index].data;

      str=str.split("@");

      str.map(function(item,index){
        str[index] = item.split("#");
        for(var i in _this.nameRebatesList){
          if(_this.nameRebatesList[i].code==str[index][0]){
            str[index][0] = _this.nameRebatesList[i].codeName;
            break;
          }
        }
      });

      _this.itemRebateList=str;
      _this.invitateId = _this.downList[index].invitateId;
    },
    //关闭
    closePopover:function(){
      // $(".popover").css({
      //   zIndex: 200
      // });
      $(".popover").hide();
      $(".moreLayer").show();
      $(".itemRebateList").hide();
    },
    showItemRebateList(){
      $(".moreLayer").hide();
      $(".itemRebateList").show();
    },
    delItemRebate(){
      // //console.log(this.invitateId)
      var _this = this,
        obj = {
          type: "post",
          url: "/authApi/proxy/removeInvitateInfo",
          data: {
            invitateId: _this.invitateId
          },
          success: function (data) {
            if (data.code == 200) {
              _this.closePopover();
              _this.clearLoadingData();
              _this.loadList();
              mui.toast("删除成功");
            }
          },
          error: function (msg) {
            //console.log(msg)
          },
        };
      this.base.callAuthApi(obj);
    },
  },
  watch:{
    topStatus(val){
      if (val == 1 && this.downList.length==0){
        this.loadList();
      }
    },
    userType(val){
      if(this.topStatus==1){
        this.clearLoadingData();
        this.loadList();
      }
      // //console.log(val)
    },
    $route(to,from){
      if(to.name=="downAccount"){
        var _this=this;
        _this.topStatus = 0;
        _this.modelRebatesList.map(function (item, index) {
          // item="";
          _this.$set(_this.modelRebatesList, index, "");
        });
        // if (localStorage.loginOut&&localStorage.loginOut==1){
          // localStorage.loginOut=0;
        _this.getGameRebatesList();
        _this.loadList();
        // }
      }

    }
  },
}
