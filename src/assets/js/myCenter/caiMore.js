	//数据交互
export default {
    name: 'caiMore',
	data() {
		return{
			datas: [],
			coinUnit:'元',
			nowStatus:0,
      ordStatus:'',//订单状态
		}
	},
	created: function() {
    	this.coinUnit = JSON.parse(localStorage.getItem('config')).coinUnit;

  },
  mounted:function(){
		this.getdatasMes();
		this.initData();
  },

	//利用ajax来查询记录列表
	methods: {
    //路由跳转返回
        routerBack: function () {
          if (localStorage.turnPathName && localStorage.turnPathName!="login"){
            // this.$router.push({ name: localStorage.turnPathName });
            this.$router.go(-1)
          }else{
            this.$router.push({ name: "index" });
          }

				},
				initData(){
					var h=$(window).height(),
					w=$(window).width();
					$("#caiMore>.header").css({
						height:h*0.278
					});
					$("#content").css({
						height:h*0.741,
						top:h*(0.278-0.019)
					});
				},
		onCopy: function (e) {
		      mui.toast('复制成功');
		    },
		    onError: function (e) {
		      mui.toast('复制失败');
		    },
		//数据加载
		getdatasMes: function() {
	      var params = {
	        'betId': this.$route.params.id,
	        'outOfThrity': this.$route.params.outOfThrity,
	      };
	      this.betId = this.$route.params.id;
	      if (this.$route.params.uid) {
	        params.uid = this.$route.params.uid;
	      }
			var _this = this,opList,opObj;
			var obj = {
				type: 'post',
				data: params,
				dataType: 'json',
				url: '/authApi/bets/getNumbersLotteryDetails',
				success: function(data) {
					//console.log(data);
					if(data.code == 200) {
						if(data.body.openNo){
							if(data.body.openNo.indexOf("+")!=-1){
								opList=data.body.openNo.replace("+",",").replace("=",",").split(",");
								// opList.push("+")
								opObj=opList[opList.length-1];
								opList[opList.length-1]="+";
								opList.push(opObj);
							}else if(data.body.openNo.indexOf("=")!=-1){
								opList=data.body.openNo.replace("+",",").replace("=",",").split(",");
								opObj=opList[opList.length-1];
								opList[opList.length-1]="=";
								opList.push(opObj);
							}
							else{
								opList=data.body.openNo.split(",")
							}
							data.body.openNoList=opList;
							
						}
						_this.datas = data.body;
						_this.nowStatus = data.body.isCal;
						_this.ordStatus = data.body.status;
						
						for(var i =0 ;i<_this.datas.length ;i++){
							_this.datas[i].betOdds = (data.body[i].betOdds).toFixed(3);
						}
					} else {
						return false
					}
				},
				error: function(msg) {
					//console.log(msg);
				}
			}
			this.base.callAuthApi(obj);
		},
		ref: function(event) {
			var that = this;
			event = event.currentTarget;
			if($(event).is(".isClick")) {
				return;
			}
			$(event).addClass("isClick");
			$(event).css({
				"color": "#ddd"
			});
			$(event).find("img").css({
				"transition": "transform 1s linear",
				"transform": "rotate(360deg)",
				"opacity": "0.6"
			});
			setTimeout(function() {
				$(event).css({
					"color": "white"
				});
				$(event).find("img").css({
					"transition": "inherit",
					"transform": "rotate(0deg)",
					"opacity": "1"
				});
				$(event).removeClass("isClick");
			}, 1000);
			this.getdatasMes();
		},

    cancleOrd:function(event){
      var that = this;
      event = event.currentTarget;
      var params = {
        'betId': this.$route.params.id,
      };
      // this.betId = this.$route.params.id;
      var obj = {
        type: 'post',
        data: params,
        dataType: 'json',
        url: '/authApi/bets/cancelTheOrder',
        success: function(data) {
          // layer.msg(data.msg);
        if(data.code == 200){
          mui.toast(data.msg);
          that.datas.status = 2;
          that.ordStatus = 2;
          // setTimeout(function () {
          //   that.getdatasMes();
          // },1000)

        }else{
          mui.toast(data.msg);
        }
        },
        error: function(msg) {
          //console.log(msg);
        }
      }
      this.base.callAuthApi(obj);

    },
		togoCai:function(){

			var betUrlArr = JSON.parse(localStorage.getItem('index_sysLottery'));
			var betUrl = '',betId = '',_this = this;

			for(var i=0;i<betUrlArr.length;i++){
				if(betUrlArr[i].gameName === this.datas.gameName){

          $("#fixedGameList span.active").removeClass("active");
          $("#fixedGameList span[name=" + betUrlArr[i].show_name + "]").addClass("active");

					betUrl = "/"+betUrlArr[i].bet_url.replace("_", "").replace(".html", "").replace("?", "/");
					_this.$router.push({
						path:betUrl
					});
				}
			}

		}
	},
	watch: {
	   '$route' (to, from) {
       if (to.name =="caiMore"){
         	this.getdatasMes(this.$route.path)
       }

	   }
	 },
};
