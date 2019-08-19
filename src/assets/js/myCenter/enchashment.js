import Vue from 'vue';
import { KeyBoard } from 'vue-ydui/dist/lib.rem/keyboard';
import { Confirm, Alert, Toast, Notify, Loading } from 'vue-ydui/dist/lib.rem/dialog';
Vue.component(KeyBoard.name, KeyBoard);
var istrue = false;

//数据交互
export default {
	name: 'enchashment',
	data() {
		return {
			config: '', //系统配置
			isTrue: '', //用户配置
			balanceNow: '', //可提现金额
			cash: '',
			coinUnit: '元',
			show2: false,
			webName: '彩票',
			errMsg: '',
			agentCoin: '',
			count:1,
		}
	},
	created: function() {
		this.getdatasMes();
		this.checkPwdBank();
		//		this.drawingStatus();
	},
	mounted: function() {},
	//利用ajax来查询记录列表
	methods: {
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
		allCash: function() {
			var money = $("#balanceNow").html();
			//					$("#cash").val(money);
			this.cash = money;
		},
		done2: function(val) {
			var _this = this;
			//console.log('输入的密码是：' + val + ' - 无序');
			_this.$dialog.loading.open('验证支付密码');
			/* 显示错误信息 */
			var coinPwd = hex_md5(localStorage.getItem("userName") + val);
			if(_this.count!=1){
				return
			}

			setTimeout(() => {
				_this.count=2;
				var getUserInfo = {
					type: "post",
					url: "/authApi/userOper/drawingOper",
					data: {
						"drawingSum": this.cash,
						"coinPassWord": coinPwd,
					},
					success: function(data) {
						_this.$dialog.loading.close();
						_this.count=1;
						if(data.code == 200) {
							this.show2 = false;
							_this.$dialog.alert({
								title: '提示',
								mes: '提交成功！',
								callback: () => {
									_this.$router.push({
										name: 'index',
									})
								}
							});
						} else {
							this.show2 = true;
							this.errMsg = data.msg;
							_this.$refs.keyboardDemo2.$emit('ydui.keyboard.error', data.msg);
						}
					},error:function(){
						_this.count=1;
					}
				}
				_this.base.callAuthApi(getUserInfo);
			}, 2000);
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
						var coin = data.body.COIN
						var fCoin = data.body.FCION
						coin = parseFloat(coin).toFixed(2);
						_this.balanceNow = coin; //计算可取现金额
						_this.agentCoin = data.body.AGENT_COIN
						// $("#balance").html(coin);
						$("#bankName").html(data.body.BANK_NAME);
						var reg = /^(\d{4})(\d*)(\d{4})$/;
						var bankNum = data.body.BANK_ACCOUNT
						bankNum = bankNum.replace(reg, function(a, b, c, d) {
							return b + c.replace(/\d/g, "*") + d;
						});
						$("#bankNum").html(bankNum);
						_this.config = JSON.parse(localStorage.getItem('config'));
						_this.coinUnit = _this.config.coinUnit;
						_this.webName = _this.config.webName;
						if(localStorage.isTrue) {
							_this.isTrue = JSON.parse(localStorage.getItem('isTrue'));
							//console.log(_this.isTrue)
						}
					}
				}
			}
			this.base.callAuthApi(getUserInfo);
		},
		//验证是否已设置资金密码/绑定银行卡
		checkPwdBank: function() {
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
						if(data.body.coinPrivacyStatus) {
							localStorage.coinPrivacyStatus = 0; //已经设置资金密码
						} else {
							localStorage.coinPrivacyStatus = 1; //未设置资金密码
						}
						if(data.body.bankPrivacyStatus) {
							localStorage.bankPrivacyStatus = 0;
						} else {
							localStorage.bankPrivacyStatus = 1;
						}
						_this.isTrue = data.body;
						localStorage.setItem('isTrue', JSON.stringify(_this.isTrue));
					}
				},
				error: function(msg) {
					//console.log(msg);
				}
			};
			this.base.callAuthApi(obj);
		},

		clickEnchash: function() {
			var _this = this;
			if(parseFloat(_this.cash) == 0) {
				_this.$dialog.toast({
					mes: '提款金额不能为0',
					timeout: 1000
				})
				return;
			}
			//银行卡
			if(localStorage.bankPrivacyStatus) {
				//支付密码
				if(localStorage.coinPrivacyStatus) {
					//
					if(_this.isTrue.bankBlacklistStatus == 1) {
						//提款开关
						if(_this.config.drawingCountLimit) {
							//剩余提款次数
							if(parseInt(_this.config.drawingCountLimit) - parseInt(_this.isTrue.withdrawTimes) > 0) {
								if(_this.config.drawingSumStatus == 1) {
									if(parseFloat(_this.cash) <= parseFloat(_this.config.drawingSumUpperLimit) && parseFloat(_this.cash) >= parseFloat(_this.config.drawingSumlowerLimit)) {
										if(parseFloat(_this.agentCoin) != 0 && parseFloat(_this.agentCoin) >= parseFloat(_this.cash)) {
											if(parseFloat(_this.balanceNow) > 0 && parseFloat(_this.balanceNow) >= parseFloat(_this.cash)) {
												istrue = true;
											} else {
												_this.$dialog.toast({
													mes: '余额不足',
													timeout: 1000
												})
												istrue = false;
											}
										} else {
											if(parseFloat(_this.isTrue.betsum) >= parseFloat(_this.isTrue.withdrawNeedSum)) {
												//余额
												if(parseFloat(_this.balanceNow) > 0 && parseFloat(_this.balanceNow) >= parseFloat(_this.cash)) {
													istrue = true;
												} else {
													_this.$dialog.toast({
														mes: '余额不足',
														timeout: 1000
													})
													istrue = false;
												}
											} else if(parseFloat(_this.cash) > parseFloat(_this.agentCoin)) {
												_this.$dialog.toast({
													mes: '提款所需投注量不足',
													timeout: 1000
												})
												istrue = false;
											} else {
												istrue = true;
											}
										}
									} else {
										_this.$dialog.toast({
											mes: '提款范围为:' + _this.config.drawingSumlowerLimit + _this.coinUnit + "-" + _this.config.drawingSumUpperLimit + _this.coinUnit,
											timeout: 1000
										})
										istrue = false;
									}
								} else {
									if(parseFloat(_this.agentCoin) != 0 && parseFloat(_this.agentCoin) >= parseFloat(_this.cash)) {
										if(parseFloat(_this.balanceNow) > 0 && parseFloat(_this.balanceNow) >= parseFloat(_this.cash)) {
											istrue = true;
										} else {
											_this.$dialog.toast({
												mes: '余额不足',
												timeout: 1000
											})
											istrue = false;
										}
									} else {
										if(parseFloat(_this.isTrue.betsum) >= parseFloat(_this.isTrue.withdrawNeedSum)) {
											//余额
											if(parseFloat(_this.balanceNow) > 0 && parseFloat(_this.balanceNow) >= parseFloat(_this.cash)) {
												istrue = true;
											} else {
												_this.$dialog.toast({
													mes: '余额不足',
													timeout: 1000
												})
												istrue = false;
											}
										} else if(parseFloat(_this.cash) > parseFloat(_this.agentCoin)) {
											_this.$dialog.toast({
												mes: '提款所需投注量不足',
												timeout: 1000
											})
											istrue = false;
										} else {
											istrue = true;
										}
									}
								}
							} else {
								_this.$dialog.toast({
									mes: '提款次数已达上限',
									timeout: 1000
								})
								istrue = false;
							}
						} else {
							if(parseFloat(_this.isTrue.betsum) >= parseFloat(_this.isTrue.withdrawNeedSum)) {
								if(parseFloat(_this.balanceNow) > 0 && parseFloat(_this.balanceNow) >= parseFloat(_this.cash)) {
									if(_this.config.drawingSumStatus == 1) {
										if(parseFloat(_this.cash) <= parseFloat(_this.config.drawingSumUpperLimit) && parseFloat(_this.cash) >= parseFloat(_this.config.drawingSumlowerLimit)) {
											istrue = true;
										} else {
											_this.$dialog.toast({
												mes: '提款范围为:' + _this.config.drawingSumlowerLimit + _this.coinUnit + "-" + _this.config.drawingSumUpperLimit + _this.coinUnit,
												timeout: 1000
											})
											istrue = false;
										}
									} else {
										istrue = true;
									}
								} else {
									_this.$dialog.toast({
										mes: '余额不足',
										timeout: 1000
									})
									istrue = false;
								}
							} else {
								_this.$dialog.toast({
									mes: '提款所需投注量不足',
									timeout: 1000
								})
								istrue = false;
							}
						}
					} else {
						_this.$dialog.toast({
							mes: '银行卡已进入黑名单',
							timeout: 1000
						})
						istrue = false;
					}
				} else {
					this.$router.push({
						name: 'moneyPwd',
					})
					istrue = false;
				}
			} else {
				this.$router.push({
					name: 'bindCard',
				})
				istrue = false;
			}
			//				this.clickPan();
		},
		//mui跳转方法
		skip_newUrl: function(index, url, nameId) {
			switch(index) {
				case 0:
					window.location.href = url;
					break;
				case 1:
					var ws = plus.webview.currentWebview();
					plus.webview.close(ws);
					break;
			}
		},
		getNum: function() {
			var obj = this.cash;
			obj = obj.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
			obj = obj.replace(/^\./g, ""); //验证第一个字符是数字
			obj = obj.replace(/\.{2,}/g, "."); //只保留第一个, 清除多余的
			obj = obj.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
			obj = obj.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数
			this.cash = obj;
		},
		clickPan: function(val) {
			/* 打开键盘 */
			var cashCoin = this.cash
			var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
			if(cashCoin == '') {
				this.$dialog.toast({
					mes: '取款金额不能为空',
					timeout: 1000
				});
			} else if(!reg.test(cashCoin)) {
				this.$dialog.toast({
					mes: '请输入数字',
					timeout: 1000
				});
			} else {
				this.clickEnchash();
				if(istrue) {
					this.show2 = true;
				}

			}
		},
	},
	watch: {
		'$route' (to, from) {
			if(to.name == "enchashment") {
				this.show2 = false;
				this.cash = '';
				this.getdatasMes(this.$route.path);
				this.checkPwdBank();
			}
		}
	},
}; //提现操作
