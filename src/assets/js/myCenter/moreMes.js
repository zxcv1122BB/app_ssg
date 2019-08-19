	//数据交互
export default {
		// el: '#main',
	name: 'moreMes',
	data() {
		return{
			mes: '',
			mess: [], //记录列表
			finePrizeList: [],   //中间明细
			finePrizeListFlag: false,
			total: 1, //每场奖金
			config:'',   //系统配置
			coinUnit:'元',
			returnAwardRate:'',//返奖率
			betId:'',
			typeId:'',

		}
	},
	created: function() {
    	this.coinUnit = JSON.parse(localStorage.getItem('config')).coinUnit;
		this.getdatasMes();
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
		onCopy: function (e) {
		      mui.toast('复制成功');
		    },
		    onError: function (e) {
		      mui.toast('复制失败');
		    },
		//数据加载
		getdatasMes: function() {
      var params={
        'betId': this.$route.params.id,
        'outOfThrity': this.$route.params.outOfThrity,
      };
      this.betId = this.$route.params.id;
      if (this.$route.params.uid){
        params.uid = this.$route.params.uid;
      }
			var _this = this;
			var obj = {
				type: 'post',
				data: params,
				dataType: 'json',
				url: '/authApi/bets/queryBettingInfo',
				success: function(data) {
					//console.log(data);
					if(data.code == 200) {
						_this.config = JSON.parse(localStorage.getItem('config'));
						//取到后台传递多来的Body
						_this.mes = data.body;
//						//console.log(_this.mes)
						_this.mess = data.body.list;
						//中奖明细
						_this.finePrizeList = data.body.finePrizeList;
						_this.returnAwardRate = _this.mes.returnAwardRate;
						//console.log(_this.finePrizeList)
						if(_this.finePrizeList) {
							_this.finePrizeListFlag = true;
							if(_this.mes.type == 2){
								_this.finePrizeListFlag = false;
							}
//							if(!_this.config.northReturnAwardRate){
//								_this.northReturnAwardRate = 65;
//							}else{
//								_this.northReturnAwardRate = _this.config.northReturnAwardRate;
//							}
//							_this.mes.returnAwardRate = _this.mes.returnAwardRate/100;
							for(var i = 0; i < _this.finePrizeList.length ; i++){
								_this.total = 1;
								for(var j = 0; j < _this.finePrizeList[i].list.length ;j++){
									if(_this.finePrizeList[i].list[j].odds){
										_this.total *= parseFloat(_this.finePrizeList[i].list[j].odds);
//										//console.log(_this.finePrizeList[i].list[j].odds)
									}
								}
//								//console.log(_this.total)
								_this.total= _this.total * 2 * parseFloat(_this.finePrizeList[i].times);
								//北单返奖率
								if(_this.mes.type == 3){
									_this.total = _this.total * (_this.returnAwardRate/100);
								}
								_this.finePrizeList[i].total = parseFloat(_this.total).toFixed(4);
							}

						}else{
							_this.finePrizeListFlag = false;
						}
						if(_this.mes.type == 2){
							if(_this.mes.ticketDetailsStr){
								localStorage.setItem('ticketDetailsStr', JSON.stringify(_this.mes.ticketDetailsStr));
								_this.typeId = 2;
							}
						}else{
							//出票明细
							_this.typeId = 0;
							if(_this.mes.ticketDetailsList){
//								localStorage.setItem('ticketDetailsList', JSON.stringify(_this.mes.ticketDetailsList.list));
							}
						}
						if(_this.mess) {
							for(var i = 0; i < _this.mess.length; i++) {
								if(_this.mess[i].matchResult == 0) {
									_this.mess[i].matchResult = "负"
								} else if(_this.mess[i].matchResult == 1) {
									_this.mess[i].matchResult = "平"
								} else if(_this.mess[i].matchResult == 3) {
									_this.mess[i].matchResult = "胜"
								}
							}
						}
//						//console.log(_this.finePrizeList)
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
		clickMore:function(index,id){
			if($("div ul").eq(index+1).children("li").eq(id).attr("isClick")==1){
				$("div ul").eq(index+1).children("li").eq(id).removeClass("macthMes");
				$("div ul").eq(index+1).children("li").eq(id).addClass("shenMes");
				$("div ul").eq(index+1).children("li").eq(id).attr("isClick","0");
			}else{
				$("div ul").eq(index+1).children("li").eq(id).addClass("macthMes");
				$("div ul").eq(index+1).children("li").eq(id).removeClass("shenMes");
				$("div ul").eq(index+1).children("li").eq(id).attr("isClick","1");
			}

		},
        //点击出票明细
        togotickDet:function(){
        	this.$router.push({
					name: 'ticketDetails',
					params: {
						id: this.betId,
						typeId:this.typeId,
					}
				})
        }
	},
	watch: {
	   '$route' (to, from) {
       if(to.name=="moreMes"){

         this.getdatasMes(this.$route.path)
       }
	   }
	 },
};
