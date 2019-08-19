//vue实例
import { Loading } from 'element-ui';
export default {
	// el: '#main',
	name: 'login',
	data() {
		return {
      onlineUrl:'',

		}
	},
	created: function() {
		//mui.init();
		// this.getKeyPair();
		this.get_ConfigureResult();

	},

	mounted: function() {
		if(localStorage.userName) {
			$("#loginPhone").val(localStorage.userName);
		} else {
			$("#loginPhone").val('');
		}

		$(".leftCenter").css({
			marginTop:-$(".leftCenter").height()/2+"px"
		})
	},
	//利用ajax来查询记录列表
	methods: {
		//路由跳转返回
		routerBack: function() {
			// if (localStorage.turnPathName && localStorage.turnPathName!="login"){
			// this.$router.push({ name: localStorage.turnPathName });
			// if(){

			// }else{
			localStorage.baseIndex == 4 ? localStorage.baseIndex = 1 : "";
			//			this.$router.go(-1)
			this.$router.push({
				name: "index"
			});
			// }

			// }else{
			//   this.$router.push({ name: "index" });
			// }

		},
		setRmPwd(event){
			event=event.currentTarget;
			if($(event).find('.rp_icon').is('.active')){
				$(event).find('.rp_icon').removeClass('active')
			}else{
				$(event).find('.rp_icon').addClass('active')
			}
			
		},
		// getKeyPair: function() {
		// 	if(localStorage.uuidTime) {
		// 		var nowDate = new Date().getTime();
		// 		if((nowDate - localStorage.uuidTime) < 3600000) {
		// 			return
		// 		}
		// 	}
		// 	//获取加密参数的参数
		// 	var options_keyPair = {
		// 		type: "post",
		// 		url: "/keyPair",
		// 		data: {
		// 			// "username": loginPhone
		// 		},
		// 		success: function(data) {
		// 			localStorage.modulus = data.modulus;
		// 			localStorage.exponent = data.exponent;
		// 			localStorage.uuid = data.uuid;
		// 			localStorage.uuidTime = new Date().getTime();
		// 			// this.base.callAuthApi(options_login);
		// 		},
		// 		error: function(msg) {
		// 			mui.toast('登录异常，请稍后重试');
		// 			$("#fullbg").css({
		// 				display: "none"
		// 			});
		// 			localStorage.clear();
		// 		}
		// 	};
		// 	//获取加密参数
		// 	this.base.callCommonApi(options_keyPair);
		// },
		//免费试玩
		registerFree: function() {
			//获取加密参数的参数
			//			mui.confirm('1.每个试玩账号初始金额为2000RMB，不允许充值.'+
			//				'2.每个IP每天仅允许有3个试玩账号；'
			//				+'3.每个试玩账号从注册开始，有效时间为72小时，超过时间系统自动回收；'
			//				+'4.试玩账号仅供玩家熟悉游戏，不允许充值和提款；'
			//				+'5.试玩账号不享有参加优惠活动的权利；'
			//				+'6.试玩账号的赔率仅供参考，可能与正式账号赔率不相符；'
			//				+'7.其他未说明事项以本公司解释为准；', '提示', function(e) {
			//				if(e.index == 1) {
			//获取注册入口的方式
			var chanel = 0;
			if(navigator.userAgent.indexOf("lsApp") != -1) {
				chanel = 3;
			} else if(navigator.userAgent.indexOf("Windows") != -1) {
				chanel = 1;
			} else if(navigator.userAgent.indexOf("Android") || navigator.userAgent.indexOf("iPhone")) {
				chanel = 2;
			}
			var _this = this;
			var options_keyPair = {
				type: "post",
				url: "/commonAPI/trialUserRegister",
				data: {
					chanel: chanel,
				},
				success: function(data) {
					if(data.code == 200) {
						localStorage.ifClose = 0;
						localStorage.userName = data.body.userName;
						// localStorage.modulus = data.body.publicKeyMap.modulus;
						// localStorage.exponent = data.body.publicKeyMap.exponent;
						if(localStorage.uuid) {
							localStorage.removeItem("uuid");
						}
						//存储访问的token
						var head = "Bearer ";
						localStorage.access_token = head + data.body.token;
						//存储刷新的token
						localStorage.refreshToken = head + data.body.refreshToken;
						localStorage.chatAdmin = data.body.chatAdmin;
						_this.base.clearId=1;
						_this.base.initWebSocket();
						_this.$router.push({
							name: "index"
						});
					} else {
						mui.toast(data.msg);
					}
				},
				error: function(msg) {
					mui.toast('登录异常，请稍后重试');
					$("#fullbg").css({
						display: "none"
					});
					localStorage.clear();
				}
			};
			//获取加密参数
			_this.base.callCommonApi(options_keyPair);
			//				} else {
			//					return;
			//				}
			//			})
		},
		//点击登录
		clickBtn: function() {
			var _this = this;
			var loginPhone = $("#loginPhone").val().trim(),
				loginPassword = $("#loginPassword").val().trim();
			if(loginPhone.trim() == '' || loginPassword.trim() == '') {
				mui.toast('账户名或密码不能为空');
				return;
			}
			if(loginPhone.length < 5) {
				mui.toast('账户名长度至少为5位');
				return;
			}
			if(loginPassword.length < 6) {
				mui.toast('密码长度至少为6位');
				return;
			}
			if(/[\u4e00-\u9fa5]/.test(loginPhone)) {
				mui.toast('账户名为字母和数字的组合');
				return;
			}
			var regEn = /[`~!@#$%^&*()+<>?:"{},.\/;'[\]]/im,
				regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
			if(regEn.test(loginPhone) || regCn.test(loginPhone)) {
				mui.toast('名称不能包含特殊字符');
				return;
			}
			var loginPassword = hex_md5(loginPhone + loginPassword);
			localStorage.userName = loginPhone;
			// let opt = {
			// 		body: true,
			// 		text: 'Loading...'
			// 	},
				// unique;
			// if(!unique) unique = Loading.service(opt);
			// $(".el-loading-mask.is-fullscreen").show();
			// _this.showBg();
			// 获取加密参数的参数
			// var options_keyPair = {
			// 	type: "post",
			// 	url: "/keyPair",
			// 	data: {
			// 		"username": loginPhone
			// 	},
			// 	success: function(data) {
			// 		localStorage.modulus = data.modulus;
			// 		localStorage.exponent = data.exponent;
			// 		localStorage.uuid = data.uuid;
			// 		this.base.callAuthApi(options_login);
			// 	},
			// 	error:function(msg){
			// 		mui.toast('登录异常，请稍后重试');
			// 		$("#fullbg").css({
			// 			display: "none"
			// 		});
			// 		localStorage.clear();
			// 	}
			// };
			//登陆成功后,返回token,refreshToken并存储的参数
			this.$nextTick(() => {
				var options_login = {
					type: "post",
					async: false,
					url: "/api/login",
					data: {
						"username": loginPhone,
						"password": loginPassword
					},
					success: function(data) {
						//存储访问的token
						var head = "Bearer ";
						localStorage.access_token = head + data.token;
						//存储刷新的token
						localStorage.refreshToken = head + data.refreshToken;
						//登陆成功后的后续操作
						if(data.code == 200) {
							mui.toast('登录成功');
							//存储登录成功的用户名
							localStorage.ifClose = 0;
              localStorage.userName = loginPhone;
              localStorage.userType_ = data.userType;
							if(data.chatAdmin==0){
								localStorage.userType = 1;
							}else{
								localStorage.userType = 3;
							}
							localStorage.removeItem("uuid");
				            localStorage.removeItem("uuidTime");
				            localStorage.gameRebatesList=data.data;

							var biaoshi = localStorage.loginTo;
							localStorage.coinMsg = JSON.stringify({
								coin: data.coin,
								fcoin: data.FCION
							});
							//登陆成功后,跳转到个人中心页面
							localStorage.baseIndex = 4;
							$("#fullbg").hide();
							_this.base.clearId=1;
							_this.base.initWebSocket();

							//						//console.log(data.token,browserType.initMethod(name).channel,browserType.initMethod(name).device,ip)
							// if(typeof(biaoshi) == 'undefined') {
              if (!biaoshi) {
								//                 window.location.href = '../index.html';
								_this.$router.push({
									name: 'index'
								})
								// unique.close();
								//								_this.togoIndex()
								// } else {
								// 	var h = plus.webview.getLaunchWebview(); //获取首页窗口
								// 	localStorage.renovate = 1; //存入变量控制首页刷新
								// 	mui.fire(h, 'refresh'); //传值给首页执行的方法名
								// 	setTimeout(function() { //延迟关闭本窗口，目的是给首页足够的刷新时间做判断是展开哪个页面.
								// 		var ws = plus.webview.currentWebview();
								// 		plus.webview.close(ws);
								// 	}, 400)
								// }
							} else { //如果是从选择赛事点击付款跳过来的则跳回原页面
								// if(localStorage.app_flag == undefined) {
                localStorage.loginTo="";
								_this.$router.push({
									path: biaoshi
								})
								// unique.close();
								// } else {
								// 	var ws = plus.webview.currentWebview();
								// 	plus.webview.close(ws);
								// }
							}
						} else {
							mui.toast(data.msg);
							localStorage.removeItem('userName');
							$("#fullbg").css({
								display: "none"
							});
							// unique.close();
						}
					}
				};
				//获取加密参数
				// this.base.callCommonApi(options_keyPair);
				_this.base.callCommonApi(options_login);
			})
		},
		//显示灰色 jQuery 遮罩层
		showBg: function() {
			var bh = $("body").height();
			var bw = $("body").width();
			$("#fullbg").css({
				display: "block"
			});
		},
		clearUser(){
			$("#loginPhone").val('');
		},
		//点击注册
		togoRegister: function() {
			this.$router.push({
				name: 'register',
			})
			//			if(localStorage.app_flag == undefined) {
			//				this.skip_newUrl(0, 'myCenter/register', 'register');
			//			} else {
			//				this.skip_newUrl(1, 'register', 'register');
			//			}
		},
		/*togoRegisterFree: function() {
			this.$router.push({
				name: 'registerFree',
			})
			//			if(localStorage.app_flag == undefined) {
			//				this.skip_newUrl(0, 'myCenter/register', 'register');
			//			} else {
			//				this.skip_newUrl(1, 'register', 'register');
			//			}
		},*/

    //获取系统配置
    get_ConfigureResult: function() {
      var _this = this,
        privacy = {
          type: "post",
          data: {},
          url: "/commonAPI/privacy/getSysConfigureResult",
          success: function(data) {
            _this.config = data.body;

            _this.onlineUrl = _this.config.onlineSys_config1;



            localStorage.setItem("config", JSON.stringify(data.body));
          }
        };
      this.base.callCommonApi(privacy);
    },

		//点击联系客服
		togokefu: function(configure) {
      if(configure){
        localStorage.onlineServiceUrl = configure;
        this.$router.push({ name: "onlineService" });
      }else{
        mui.toast('请稍后重试');
      }
		},
		//点击返回首页
		togoIndex: function() {
			this.$router.push({
				name: 'index',
			})
		},
		//点击忘记密码
		forget: function() {
			if($(".popup").css("display") == "none") {
				$(".popup").css({
					display: "block"
				}).addClass('ani')
			} else {
				return;
			}
			$(".mask").css({
				display: "block"
			});
		},
		//点击忘记密码-火速前往
		togoyes: function() {
			$(".popup").css({
				display: "none"
			}).removeClass('ani');
			$(".mask").css({
				display: "none"
			});
			this.$router.push({
				name: 'customerService',
			})
			//			if(localStorage.app_flag == undefined) {
			//				this.skip_newUrl(0, '../service/customerService.html', 'customerService');
			//			} else {
			//				this.skip_newUrl(1, '../service/customerService.html', 'customerService');
			//			}
		},
		//点击忘记密码-拒绝
		togono: function() {
			$(".popup").css({
				display: "none"
			});
			$(".mask").css({
				display: "none"
			});
		},
		//mui跳转方法
		// skip_newUrl: function(index, url, nameId) {
		// 	switch(index) {
		// 		case 0:
		// 			this.$router.push({
		// 				path: url
		// 			})
		// 			// window.location.href = url;
		// 			break;
		// 		case 1:
		// 			mui.openWindow({
		// 				url: url,
		// 				id: nameId,
		// 				styles: {
		// 					top: base.getStatusbarHeight() + 'px',
		// 					bottom: 0
		// 				},
		// 				show: {
		// 					autoShow: true, //页面loaded事件发生后自动显示，默认为true
		// 					aniShow: 'pop-in', //页面显示动画，默认为”slide-in-right“；
		// 					duration: '200' //页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
		// 				},
		// 				createNew: true
		// 			});
		// 			break;
		// 	}
		// },
	},
	watch: {
		$route(to, from) {
			if(to.name == "login") {
				// this.getKeyPair();
			}
		}
	}
}
