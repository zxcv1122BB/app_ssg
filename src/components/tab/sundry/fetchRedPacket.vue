<template>
  <div>
    <div id="container">
      <div>
        <!--<p class="hb_title">-->
            <!--今日红包-->
            <!--<span class="hb_aa"></span>-->
        <!--</p>-->
        <!--头部-->
        <header id="header">
            <h1>{{$t('今日红包')}}</h1>
            <a class="goBack" @click="routerBack" href="javascript:void(0)">{{$t('返回')}}</a>
        </header>
        <div class="hb_inner">
            <ul id="hb_list">
                <!--<li class="hb_for">-->
                    <!--<div class="hb_left">-->
                        <!--<img src="image/HBuilder.png" width="110" height="110"/>-->
                    <!--</div>-->
                    <!--<div class="hb_center">-->
                        <!--<p>dffgfdg</p>-->
                        <!--<p>gfgf</p>-->
                        <!--<p>gfgfg</p>-->
                    <!--</div>-->
                    <!--<div class="hb_right">-->
                        <!--<a class="hb_btn">{{$t('未开始')}}</a>-->
                    <!--</div>-->
                <!--</li>-->

                <!-- <li class="hb_for" v-if="hb_case==1">
                  <div class="hb_left">
                    <img src="static/images/hb.png" width="110" height="110" />
                  </div>
                  <div class="hb_center" v-cloak>
                    <p>{{(hbList[list.i].redPacketTitle)?hbList[list.i].redPacketTitle:""}}</p>
                    <p>{{$t('总额')}}：{{(hbList[list.i].redPacketMoney)?hbList[list.i].redPacketMoney:"-"+coinUnit}}</p>
                  <p >{{$t('已开抢')}}</p>
                  </div>
                  <div class="hb_right">
                  <a :class="['hb_btn','item' + list.i]" href="javascript:void(0);" @click="hbModel(list.redPacketKey,list.userName,list.i)">{{$t('抢红包')}}</a>
                  </div>
                </li> -->
                <li class="hb_for" v-for="(item,index) in hbList">
                  <div v-if="item.isEnd==0">
                    <div class="hb_left">
                      <img src="static/images/hb.png" width="110" height="110" />
                    </div>
                    <div class="hb_center">
                      <p>{{(item.redPacketTitle) ? item.redPacketTitle : ""}}</p>
                      <p>{{$t('总额')}}：{{(item.redPacketMoney) ? item.redPacketMoney : "-"}}${{coinUnit}}</p>
                    <p >{{$t('已结束')}}</p>
                    </div>
                    <div class="hb_right">
                    <a :class="['hb_btn','disable','item' + index]" href="javascript:void(0);">{{$t('已结束')}}</a>
                    </div>
                  </div>
                  <div v-if="item.isEnd==1">
                    <div class="hb_left">
                      <img src="static/images/hb.png" width="110" height="110" />
                    </div>
                    <div class="hb_center" v-cloak>
                      <p>{{(item.redPacketTitle)?item.redPacketTitle:""}}</p>
                      <p>{{$t('总额')}}：{{(item.redPacketMoney)?item.redPacketMoney:"-"+coinUnit}}</p>
                    <p >{{$t('已开抢')}}</p>
                    </div>
                    <div class="hb_right">
                    <a :class="['hb_btn','item' +index]" href="javascript:void(0);" @click="hbModel(item.redPacketKey,userName,index)">{{$t('抢红包')}}</a>
                    </div>
                  </div>

                  <div v-if="item.isEnd==2">
						       		<div class="hb_left">
						       			<img src="static/images/hb.png" width="110" height="110" />
						       		</div>
						       		<div class="hb_center">
						       			<p>{{(item.redPacketTitle)?item.redPacketTitle:"-"}}</p>
						       			<p>{{$t('总额')}}：{{(item.redPacketMoney)?item.redPacketMoney:"-"}}{{coinUnit}}</p>
						       		<p :id="(item.redPacketKey)?item.redPacketKey:'-'">{{obj.getRTime}}</p>
						       		</div>
						       		<div class="hb_right">
						       		<a class="hb_btn">{{$t('即将开始')}}</a>
						       		</div>
                  </div>
                  <div v-if="item.isEnd==3">
                    <div class="hb_left">
                      <img src="static/images/hb.png" width="110" height="110" />
                    </div>
                    <div class="hb_center">
                      <p>{{(obj.redPacketTitle)?obj.redPacketTitle:'-'}}</p>
                      <p>{{$t('总额')}}：{{(obj.redPacketMoney)?obj.redPacketMoney:'-'}}{{coinUnit}}</p>
                    <p :id="(item.redPacketKey)?item.redPacketKey:'-'">{{obj.getRTime}}</p>
                    </div>
                    <div class="hb_right">
                    <a class="hb_btn disable">{{$t('未开始')}}</a>
                    </div>
                  </div>
                </li>
            </ul>
        </div>
      </div>

    </div>
  </div>
</template>

<script>


export default {
  name:"fetchRedPacket",
  data(){
    return{
      hbList:[],
      list:{
        redPacketKey:"",
        userName:"",
        i:""
      }
    }
  },
  created:function(){
    // if(localStorage.getItem("hongbaoList")){
    //   this.hbList = JSON.parse(localStorage.getItem("hongbaoList"))
    // }
    if(localStorage.userName){
      this.userName=localStorage.userName;
    }
  },
  mounted:function(){


     this.initDom();
     this.hongbaoList();
  },
  methods:{
    //路由跳转返回
		routerBack: function() {
			if(localStorage.turnPathName && localStorage.turnPathName != "login") {
				// this.$router.push({ name: localStorage.turnPathName });
				this.$router.go(-1)
			} else {
				this.$router.push({
					name: "index"
				});
			}

		},
    getMilliseconds:function(str){
      str = str.replace(new RegExp("-","gm"),"/");
      return (new Date(str)).getTime(); //得到毫秒数
    },
     getRTime:function(time,id){
		  var d=Math.floor(time/1000/60/60/24);
		  var h=Math.floor(time/1000/60/60%24);
		  var m=Math.floor(time/1000/60%60);
		  var s=Math.floor(time/1000%60);
		  var str="倒计时："+d+"天 "+h+"时 "+m+"分 "+s+"秒 "
		  return str;
	 },//得到倒计时字符串
    initDom:function(){
      // $(function() {
        // mess.hongbaoList();
        var _this=this;
        // mess.init();
        $(".back").click(function () {
          history.back(1);
        })
        _this.hongbaoList()
        _this.hbTime=window.setInterval(function(){
              _this.hongbaoList()
            },10000)

    },
    //抢红包的点击事件
    hbModel:function (redPacketKey,userName,index) {
      if(!localStorage.getItem("hongbaoList")){
        return;
      }
       var hbList = JSON.parse(localStorage.getItem("hongbaoList")),_this=this;
      var customerServiceString = localStorage.getItem("config");
      var coinUnit='元';
      if(customerServiceString) {
        var customerService = JSON.parse(customerServiceString);
        coinUnit=customerService.coinUnit;
      }
      var _this=this,
      fetchHB= {
          //加载
          methods: function() {
            var str={
                timeStamp: '',
                redPacketKey:redPacketKey,
                userName:userName
            };
            var cl = '.item' + index;
            if($(cl).text()=='已抢'){
              return;
            }
            hbList[index].isGot = true;
            //console.log(cl);
            $(cl).text("已抢")
            hbList.splice(index,1);
            if(hbList.length==0){
              localStorage.hongbaoList="";
            }else{
              localStorage.hongbaoList=JSON.stringify(hbList);
            }

            //console.log($(cl).text());
            var fetch_hb = {
                type: 'post',
                url: '/authApi/activity/fetchRedPacket',
                data: str,
                dataType: 'json',
                success: function(data) {
                  //console.log(data)
                  var strHB='';
                  if(data.code==200){
    //								strHB+='<div id="hbxq" ><div class="hb_money">'+(((data.body)?data.body:"-")+coinUnit)+'</div></div>';
                    strHB+=((data.body)?data.body:"-")+coinUnit;
    //									`<div id="hbxq" >
    //										<div class="hb_money">
    //												${(data.body)?data.body:"-"}${coinUnit}
    //										</div>
    //									</div>
    //										`;
                  }else{
    //								strHB+='<div id="hbxq" ><div class="hb_money">'+(data.msg?data.msg:'-')+'</div></div>';
                    strHB+=data.msg?data.msg:'-';
    //									`<div id="hbxq" >
    //										<div class="hb_money">
    //												${data.msg?data.msg:'-'}
    //										</div>
    //									</div>
    //									`;
                  }
                  //点击抢红包，加载模态框得到相应结果
                  mui.alert(strHB, '红包详情', function() {

                  });
                  /*layui.use(['layer'],function () {
                    var layer = layui.layer,
                    $ = layui.jquery;
                    layer.open({
                      title:"红包详情",
                      type:1,
                      area: ['200px', '300px'],
                      content:strHB
                    });
                  });*/
                },
                error: function(e) {
                  //console.log(e)
                }
            };
            _this.base.callAuthApi(fetch_hb);
          },
      };
      fetchHB.methods()
    },
    hongbaoList:function(){
      if(!localStorage.getItem("hongbaoList")){
        return
      }
      var _this=this;
      _this.hbList = JSON.parse(localStorage.getItem("hongbaoList"));
				//获取币种
				var customerServiceString = localStorage.getItem("config");
				var coinUnit='元';
				if(customerServiceString) {
					var customerService = JSON.parse(customerServiceString);
					coinUnit=customerService.coinUnit;
				}
				//获取红包列表
				// var hbList=JSON.parse(localStorage.getItem("hongbaoList"));
				var html=""
				for(var i = 0; i <_this.hbList.length; i++) {
					var obj =_this.hbList[i];
					var isEnd=_this.getMilliseconds(obj.endTime)-new Date().getTime()
					//判断是否超出结束时间
					if(isEnd<0){
						var redPacketKey = obj.redPacketKey;
						var userName = localStorage.getItem("userName");
						// html += `
						// 	<li class="hb_for">
						// 		<div class="hb_left">
						// 			<img src="./static/images/hb.png" width="110" height="110" />
						// 		</div>
						// 		<div class="hb_center">
						// 			<p>${(obj.redPacketTitle) ? obj.redPacketTitle : ""}</p>
						// 			<p>总额：${(obj.redPacketMoney) ? obj.redPacketMoney : "-"}${coinUnit}</p>
						// 		<p >{{$t('已结束')}}</p>
						// 		</div>
						// 		<div class="hb_right">
						// 		<a class="hb_btn disable ${'item' + i}" href="javascript:void(0);">{{$t('已结束')}}</a>
						// 		</div>
						// 	</li>
            // 	`;
            obj.isEnd=0;
						continue;
					}
					var time=_this.getMilliseconds(obj.startTime)-new Date().getTime()
					//判断是否开始
					if(time<=0){
						var redPacketKey=obj.redPacketKey;
						var userName=localStorage.getItem("userName");
						var cl = '.item' + i;
						if (obj.isGot) {
							//console.log("1111");
							continue;
						}
						// html += `
						// 	<li class="hb_for">
						// 		<div class="hb_left">
						// 			<img src="./static/images/hb.png" width="110" height="110" />
						// 		</div>
						// 		<div class="hb_center">
						// 			<p>${(obj.redPacketTitle)?obj.redPacketTitle:""}</p>
						// 			<p>总额：${(obj.redPacketMoney)?obj.redPacketMoney:"-"}${coinUnit}</p>
						// 		<p >{{$t('已开抢')}}</p>
						// 		</div>
						// 		<div class="hb_right">
						// 		<a class="hb_btn ${'item' + i}" href="javascript:void(0);" @click="hbModel(${redPacketKey},${userName},${i})">{{$t('抢红包')}}</a>
						// 		</div>
						// 	</li>
              // `;
              _this.list={
                redPacketKey:redPacketKey,
                userName:userName,
                i:i
              }
              // _this.hb_case=1;
               obj.isEnd=1;
              // return
					}else if(time>0&&time<=600000){
						var id=obj.redPacketKey;
						obj.getRTime=_this.getRTime(time,id);
						// html += `
						// 	<li class="hb_for">
						// 		<div class="hb_left">
						// 			<img src="./static/images/hb.png" width="110" height="110" />
						// 		</div>
						// 		<div class="hb_center">
						// 			<p>${(obj.redPacketTitle)?obj.redPacketTitle:"-"}</p>
						// 			<p>总额：${(obj.redPacketMoney)?obj.redPacketMoney:"-"}${coinUnit}</p>
						// 		<p id="${(obj.redPacketKey)?obj.redPacketKey:"-"}">${	_this.getRTime(time,id)}</p>
						// 		</div>
						// 		<div class="hb_right">
						// 		<a class="hb_btn">{{$t('即将开始')}}</a>
						// 		</div>
						// 	</li>
            //   `;
               obj.isEnd=2;

					}else{
						var id=obj.redPacketKey;
						obj.getRTime=_this.getRTime(time,id);
						// html += `
						// <li class="hb_for">
						// 	<div class="hb_left">
						// 		<img src="./static/images/hb.png" width="110" height="110" />
						// 	</div>
						// 	<div class="hb_center">
						// 		<p>${(obj.redPacketTitle)?obj.redPacketTitle:"-"}</p>
						// 		<p>总额：${(obj.redPacketMoney)?obj.redPacketMoney:"-"}${coinUnit}</p>
						// 	<p id="${(obj.redPacketKey)?obj.redPacketKey:"-"}">${	_this.getRTime(time,id)}</p>
						// 	</div>
						// 	<div class="hb_right">
						// 	<a class="hb_btn disable">{{$t('未开始')}}</a>
						// 	</div>
						// </li>
            // `;
             obj.isEnd=3;
					}

        }
        //console.log(_this.hbList);
        // $('#hb_list').html(html);
        setTimeout(() => {
          _this.hbList.map(function(item,index){
            if(item.isEnd==1){
              var cl=".item"+index;
              $(cl).text("抢红包")
            }
          })
        }, 10);
      },

  },
  watch:{
    $route(to,from){
      if(to.name=="fetchRedPacket"){
       var _this=this;
         _this.hbTime=window.setInterval(function(){
          _this.hongbaoList()
        },10000)
      }else if(from.name=="fetchRedPacket"){
        var _this=this;
        if(_this.hbTime){
          clearInterval(_this.hbTime);
          _this.hbTime="";
        }
      }
    }
  }

}
</script>

<style scoped>
body{
	padding-top: 3.66rem;
}
.hb_inner {
	padding: 10px 12px;
	box-sizing: border-box;
	color: white;
}

.hb_for {
	overflow: hidden;
	background-color: orange;
	border:5px solid #F8F8FF;
}

.hb_left {
	float: left;
	width: 30%;
	padding: 13.5px 10px;
	box-sizing: border-box;
}

.hb_left>img {
	width: 100%;
	/*float: left;
	width: 25%;
	padding: 10px 4px;
	box-sizing: border-box;*/
}

.hb_center {
	float: left;
	width: 40%;
	padding: 1rem 0;
}

.hb_center>p {
	line-height: 35px;
	text-align: left;
}

.hb_right {
	float: left;
	width: 30%;
	padding: 50px 0;
	box-sizing: border-box;
}

.hb_btn {
	display: inline-block;
	background-color: orange;
	padding: 10px 20px;
	border-radius: 8px;
	background-color: red;
	color: white;
}
#hbxq {
      	height:100%;
		text-align: center;
		box-sizing: border-box;
		padding: 15px;
		/*background-color: red;*/
		position: relative;
}
.hb_head {
			text-align: center;
			padding: 15px;
			background-color: red;
			position: relative;
}
.hb_money {
	padding: 20px 12px;
	font-size: 1.5rem
}
.disable{
	background-color: gray;
}
</style>


