//数据交互
export default {
	name: 'depositFile',
	data() {
		return {
			time: '', //当前时间
			allpayWay: [], //获得所有支付方式
			payWay: [], //当前选择支付方式
			fastPay: [], //快捷支付
			blankPay: [], //银行支付
			typeid: '', //支付类型
			money: '', //充值金额
			iconSrc: '', //图片路径
			show_index: 1,
			//		orderNum: '', //订单号
			chanel: '',
			num: 0,
			ways: [], //支付方式
			coinUnit: '元',
			userName: localStorage.userName?localStorage.userName:'',
			balance: '',

			hideList: [], //比对支付方式查看是否显示

	  coinList:[],
			
//			choPayId:0,

		}
	},
	created: function() {
		var _this = this;
		if(localStorage.userType == 2) {
			mui.alert('试玩账号无法充值', function() {
				_this.$router.go(-1);
			})
		}
		this.getChanel();
		if(localStorage.getItem('config')){
      _this.coinUnit = JSON.parse(localStorage.getItem('config')).coinUnit;
    }
		// this.coinUnit = JSON.parse(localStorage.getItem('config')).coinUnit;
		//		this.userName = localStorage.userName;
		// this.num = Math.floor(Math.random() * 8 + 1); //随机生成小数

		this.drawingStatus();
		this.getPayWay();
		this.getMoney();



	},
	mounted: function() {
		this.changePayWay();
		this.getdatasMes();

		$(".blueBall span").css({
			marginLeft:-$(".blueBall span").width()/2+"px",
			marginTop:-$(".blueBall span").height()/2+"px"
		})
		
	},
	//利用ajax来查询记录列表
	methods: {
		to_rechargeRecord(){
			this.$router.push({ name: 'rechargeRecord'});
		},

	  getMoney: function(){
	    var _this = this;
      if(localStorage.config&&JSON.parse(localStorage.config).UserDepositOption){
        if(JSON.parse(localStorage.config).UserDepositOption!=null){
          _this.coinList = JSON.parse(localStorage.config).UserDepositOption.split(",");
        }else{
          _this.coinList = [];
        }
      }else{
        _this.coinList = [];
      }
    },

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
		getChanel: function() {
			var chanel = 0;
			if(navigator.userAgent.indexOf("lsApp") != -1) {
				chanel = 3;
			} else if(navigator.userAgent.indexOf("Windows") != -1) {
				chanel = 1;
			} else if(navigator.userAgent.indexOf("Android") || navigator.userAgent.indexOf("iPhone")) {
				chanel = 2;
			}
			this.chanel  =  chanel;
		},
		//查询数据
		getdatasMes: function() {
			var _this = this;
			var getUserInfo = {
				type: "post",
				url: "/authApi/AutoLoginGetUserinfoByRedis",
				data: {
					"username": localStorage.getItem("userName")
				},
				success: function(data) {
					if(data.code == 200) {
						var coin = data.body.COIN;
						var fCoin = data.body.FCION;
						if(coin == "") {
							coin = "0.00";
						} else {
							coin = parseFloat(coin - fCoin).toFixed(2);
						}
						_this.userName = data.body.USER_NAME;
						_this.balance = coin;
					}
				}
			}
			this.base.callAuthApi(getUserInfo);
		},
		//查询数据
		getPayWay: function() {
			var _this = this;
			var getUserInfo = {
				type: "post",
				async: false,
				url: "/authApi/selectPaytypeList",
				data: {
					//					typeid: 0,
					paymodel: _this.chanel,
				},
				success: function(data) {
					if(data.code == 200) {
						_this.allpayWay = data.body;
						_this.clickPayTitle();
					}
				}
			}
			this.base.callAuthApi(getUserInfo);
		},
		clickPayTitle: function(id) {
			var _this = this;
			if(!id) {
				id = _this.allpayWay[0].pay_type;
			}
			if(id == 3) {
//				_this.show_index = 2;
				_this.clickFastPay(id);
			} else if(id == 2) {
//				_this.show_index = 3;
				_this.clickBlankPay(id);
			} else if(id==1) {
//				_this.show_index = 1;
				_this.clickPayWay(id);
			}
		},
		//查询数据
		clickPayWay: function(id) {
			var _this = this,
			getUserInfo = {
				type: "post",
				async: false,
				url: "/authApi/selectPaytypeList",
				data: {
					payType: id,
					paymodel: this.chanel,
				},
				success: function(data) {
					if(data.code == 200) {
						$(".navNoMes").hide();
						_this.payWay = data.body;
						if(!_this.payWay && _this.payWay.length <= 0) {
							$(".navNoMes").show();
						}
						// _this.clickNav(_this.payWay[0], 0);
					}
				}
			}
			this.base.callAuthApi(getUserInfo);
		},
		//查询数据
		clickFastPay: function(id) {
			var _this = this;
			var getUserInfo = {
				type: "post",
				async: false,
				url: "/authApi/selectPayQuick",
				data: {
					payType: id,
					paymodel: _this.chanel,
				},
				success: function(data) {
					if(data.code == 200) {
						$(".navNoMes").hide();
						_this.payWay = data.body;
						if(!_this.payWay || _this.payWay.length <= 0) {
							$(".navNoMes").show();
						} 
						// else {
						// 	_this.clickNav(_this.payWay[0], 0);
						// }
					}
				}
			}
			this.base.callAuthApi(getUserInfo);
		},
		//查询数据
		clickBlankPay: function(id) {
			var _this = this;
			var getUserInfo = {
				type: "post",
				async: false,
				url: "/authApi/selectPayBlank",
				data: {
					payType: id,
					paymodel: _this.chanel,
				},
				success: function(data) {
          if (data.code == 200 && data.body) {
//						if(data.body.length == 0 && index) {
//							_this.$set(_this.hideList, index, 1);
//						}
//						$(".navNoMes").hide();
						_this.payWay = data.body;
//						if(!_this.payWay || _this.payWay.length <= 0) {
//							$(".navNoMes").show();
//						}
						// _this.clickNav(_this.payWay[0], 0);
					}
				}
			}
			this.base.callAuthApi(getUserInfo);
		},
		//		//获取订单号
		//		getOrderNum: function() {
		//			var _this = this;
		//			var getUserInfo = {
		//				type: "post",
		//				async: false,
		//				url: "/authApi/generateOrderId",
		//				data: {},
		//				success: function(data) {
		//					if(data.code == 200) {
		//						_this.orderNum = data.body;
		//					}
		//				}
		//			}
		//			this.base.callAuthApi(getUserInfo);
		//		},
		clickNav: function(ways, index) {
			$(".nav").eq(index).addClass('navYes').siblings().removeClass('navYes');
			this.ways = ways;
			this.clickPay(1);
		},
		clickPay: function() {
			var _this = this;
			//判断是否输入要充值的金额
			_this.money = $("#coin").val();
			if(_this.money == "") {
				mui.toast("请输入要充值的金额", 2000);
				return;
			}
			if(_this.ways.max_money && _this.ways.min_money) {
				if(parseFloat(_this.ways.max_money) < parseFloat(_this.money) || parseFloat(_this.ways.min_money) > parseFloat(_this.money)) {
					mui.toast("不在充值范围内", 2000);
					return;
				}
			}
			//			_this.getOrderNum();
			_this.ways.money = _this.money;
			//			_this.ways.orderNum = _this.orderNum;
			localStorage.setItem('numArr', JSON.stringify(_this.ways, _this.money));
			var id = this.ways.pay_type;
			// console.log(id)
			if(id == 1) {
				this.$router.push({
					name: 'weChat',
				})
			} else if(id == 2) {
				this.$router.push({
					name: 'ebank',
				})
			} else {
				this.$router.push({
					name: 'company',
				})
			}
		},
		//判断是否能充值
		drawingStatus: function() {
			var _this = this;
			var uname = localStorage.getItem("userName");
			var obj = {
				type: 'post',
				data: {
					"username": uname,
				},
				dataType: 'json',
				url: '/authApi/privacy/getPrivacyStatus',
				success: function(data) {
					if(data.code == 200) {
						if(localStorage.prepaidWithdrawalsStatus == 1) {
							_this.getTime();
							var startTime = localStorage.prepaidWithdrawalsStartTime;
							var endTime = localStorage.prepaidWithdrawalsEndTime;
							startTime = startTime.split(":");
							endTime = endTime.split(":");
							startTime = parseInt(startTime.join(""))
							endTime = parseInt(endTime.join(""))
							time = time.split(":");
							time = parseInt(time.join(""))
							if(time > startTime && time < endTime) {} else {
								$("#prompt").html("充值时间为" + startTime + "-" + endTime)
							}
						}
					}
				},
				error: function(msg) {
					//console.log(msg);
				}
			}
			this.base.callAuthApi(obj);
		},
		//获取当前时间
		getTime: function() {
			var date = new Date();
			var hour = date.getHours();
			var minute = date.getMinutes();
			var second = date.getSeconds();
			if(hour < 10) {
				hour = "0" + hour;
			}
			if(minute < 10) {
				minute = "0" + minute;
			}
			if(second < 10) {
				second = "0" + second;
			}
			time = hour + ":" + minute + ":" + second;
		},
		changePayWay: function() {
			//支付方式切换
			$('nav span').click(function() {
				$(this).addClass('chooseYes').siblings().removeClass('chooseYes');
			});
			$("nav span").eq(0).click();
			//充值金额选中
			$(".coin").each(function() {
				$(this).click(function() {
					$(".coin").removeClass('choose_money');
					var inputDate = $(this).children().html();
					$("#coin").val(inputDate)
					$(this).addClass('choose_money');
				})
			});
			$('.cho_coin .coin').eq(1).click();
			setTimeout(function() {
				$('.nav').eq(0).click();
			}, 1);
		},
		getNum: function() {
			var obj = $("#coin").val();
			obj = obj.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
			obj = obj.replace(/^\./g, ""); //验证第一个字符是数字
			obj = obj.replace(/\.{2,}/g, "."); //只保留第一个, 清除多余的
			obj = obj.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
			obj = obj.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数
			$("#coin").val(obj);
			$(".coin").removeClass('choose_money');
		}
	},
	watch: {
		'$route' (to, from) {
			if(to.name == "depositFile") {
				// this.changePayWay();
				this.coinUnit = JSON.parse(localStorage.getItem('config')).coinUnit;
				// this.num = Math.floor(Math.random() * 8 + 1); //随机生成小数
				this.getdatasMes();
				this.drawingStatus();
				this.getPayWay();
				this.getMoney();
				var _this = this;
				if(localStorage.userType == 2) {
					mui.alert('试玩账号无法充值', function() {
						_this.$router.go(-1);
					})
				}
			}
		}
	},
};
