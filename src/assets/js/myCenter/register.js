export default {
	// el: '#main',
	name: 'register',
	data() {
		return {
			promotionCode: "", //推广码
			promotFlag: false,
			imgUrl: '', //验证码图片路径

			userName: '', //帐号
			password: '', //密码
			password_: '', //再次密码
			inputCode: '', //验证码
			flag: false, //验证码对错
			passwordLevel: '', //密码等级
			registerFlag: '',
			isRegiterClick:false,
		}
	},
	created: function() {
		this.getpromotionCode();
		this.getImgcode();
		//mui.init();
	},

	mounted: function() {
		// $(".leftCenter").css({
		// 	marginTop:-$(".leftCenter").height()/2+"px"
		// })
	},
	//利用ajax来查询记录列表
	methods: {
		//路由跳转返回
		routerBack: function() {
			this.$router.push({ name: 'index' });
				// this.$router.go(-1)
			

		},
		togoLogin(){
			this.$router.push({ name: 'login' });
		},
		//获取验证码和点击获取验证码
		getImgcode: function() {
			var _this = this;
			var obj = {
				type: 'get',
				data: {},
				dataType: 'json',
				url: '/commonAPI/imageCode',
				success: function(data) {
					if(data.code == 200) {
						if(data.body != undefined) {
							localStorage.imageCodeKey = data.body.imageCodeKey;
							_this.imgUrl = data.body.imageString;
						}
					}
				},
				error: function(msg) {}
			};
			this.base.callCommonApi(obj);
		},
		//从localStorage拿推广码和注册类型
		getpromotionCode: function() {
			var _this = this;
			if(!localStorage.getItem("promotionCode")) {
				_this.promotionCode = "";
				_this.promotFlag = false;
			} else {
				_this.promotionCode = localStorage.promotionCode;
				if(_this.promotionCode.indexOf("#")!=0){
					_this.promotionCode=_this.promotionCode.replace(/#/g,'');
					localStorage.promotionCode=_this.promotionCode;
				}
				_this.promotFlag = true;
			}

		},
		//检测两次密码是否输入一致--没用到
		checkPwd: function() {
			var passWord = $("#passWord").val();
			var passWordAgain = $("#passWordAgain").val();
			if(passWord == passWordAgain) {
				$("#passWordAgain").css('background-color', '#fff');
				$('#prompt').html("");
				$(".btn").removeAttr("disabled");
        $(".btn").css("background-color", this.baseCss.styleColor)
			} else {
				// $('#prompt').html("两次密码不一样");
				mui.toast("两次密码不一样")
				return false;
			}
		},
		//离开input检测事件--没用到
		register: function() {
			var imageCode = $("#inputCode").val();
			var userName = $("#userName").val();
			var passWord = $("#passWord").val();
			var passWordAgain = $("#passWordAgain").val();
			var code = $('#code').val();
			var reg = /^(?!(?:\d+|[a-zA-Z]+)$)[\da-zA-Z]{5,11}$/;
			var reg2 = /^[0-9a-zA-Z!@#$%^&*,.]{6,16}$/;
			if(userName == '') {
				$("#userName").css('background-color', 'peachpuff');
				//$('#userName').focus();
				// $('#prompt').html('账户名不能为空');
				mui.toast("账户名不能为空")
				this.registerFlag = false;
				return;
			}
			// $("#userName").css('background-color', 'white');
			$('#prompt').html('');
			if(!reg.test(userName)) {
				// $("#userName").css('background-color', 'peachpuff');
				//$('#userName').focus();
				// $('#prompt').html('账户名为5-11个字母与数字的组合');
				mui.toast("账户名为5-11个字母与数字的组合")
				this.registerFlag = false;
				return;
			}
			// $("#userName").css('background-color', 'white');
			$('#prompt').html('');
			if(passWord == '' || passWord.trim().length === 0) {
				// $("#passWord").css('background-color', 'peachpuff');
				// $('#prompt').html('请输入密码');
				mui.toast("请输入密码")
				this.registerFlag = false;
				return;
			}
			// $("#passWord").css('background-color', 'white');
			$('#prompt').html('');
			if(!reg2.test(passWord)) {
				// $("#passWord").css('background-color', 'peachpuff');
				// $('#prompt').html('密码格式为6-16个字符');
				mui.toast("密码格式为6-16个字符")
				this.registerFlag = false;
				return;
			} else {
				// $("#passWord").css('background-color', '#fff');
				$('#prompt').html("");
				if(passWordAgain == '') {
					// $('#passWordAgain').css('background-color', 'peachpuff');
					// $('#prompt').html("请确认登陆密码");
					mui.toast("请确认登陆密码")
					this.registerFlag = false;
					return;
				} else if(passWord != passWordAgain) {
					// $('#passWordAgain').css('background-color', 'peachpuff');
					// $('#prompt').html("两次密码不一样");
					mui.toast("两次密码不一样")
					this.registerFlag = false;
					return;
				} else {
					// $("#passWordAgain").css('background-color', 'peachpuff');
					$('#prompt').html("");
					if(code == ''){
						// $('#code').css('background-color', 'peachpuff');
						// $('#prompt').html('推广码不能为空！');
						mui.toast("推广码不能为空！")
						this.registerFlag = false;
						return;
					} else {
						// $("#code").css('background-color', 'peachpuff');
						$('#prompt').html("")
						this.registerFlag = true;
					}
					if(imageCode == '') {
						// $('#inputCode').css('background-color', 'peachpuff');
						// $('#prompt').html('验证码不能为空！');
						mui.toast("验证码不能为空！")
						this.registerFlag = false;
						return;
					} else {
						// $("#inputCode").css('background-color', '#fff');
						$('#prompt').html("")
						this.registerFlag = true;
					}
				}
			}
		},
		//点击注册
		loginsubmit: function() {
			if(this.userName == '' || this.userName.trim() == '') {
				// $('#prompt').css('color', 'red');
				// $('#prompt').html('账户名不能为空');
				mui.toast("账户名不能为空")
				return;
			}
			if(this.userName.trim().length < 5 || this.userName.trim().length > 11) {
				// $('#prompt').css('color', 'red');
				// $('#prompt').html('账户名长度为5-11位字符');
				mui.toast("账户名长度为5-11位字符")
				return;
			}
			if(1) {
				var a = /[\u4e00-\u9fa5]/;
				var b = this.userName.match(a);
				if(b) {
					// $('#prompt').css('color', 'red');
					// $('#prompt').html('格式错误，不能包含中文!');
					mui.toast("格式错误，不能包含中文!")
					return;
				}
			}
			if(this.password == '' || this.password.trim() == '') {
				// $('#prompt').css('color', 'red');
				// $('#prompt').html('密码不能为空');
				mui.toast("密码不能为空")
				return;
			}
			if(this.password.length < 6 || this.password.trim().length > 16) {
				// $('#prompt').css('color', 'red');
				// $('#prompt').html('密码长度为6-16位');
				mui.toast("密码长度为6-16位")
				return;
			}
			if(this.password_ != this.password) {
				// $('#prompt').css('color', 'red');
				// $('#prompt').html('两次密码输入不一致');
				mui.toast("两次密码输入不一致")
				return;
			}
			if(this.inputCode == '') {
				// $('#prompt').css('color', 'red');
				// $('#prompt').html('验证码不能为空');
				mui.toast("验证码不能为空")
				return;
			}
			this.register();
			if(!this.promotionCode){
				return 
			}

			$("#btn").attr("disabled", "disabled");
			$("#btn").css("background", "gray");
			if(!this.registerFlag) {
				$("#btn").removeAttr("disabled", "disabled");
        $("#btn").css("background", this.baseCss.styleColor);
				return;
			}
			var _this = this;
			var uuid = localStorage.imageCodeKey;
			var middle = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
			var top = /^(?!([a-zA-Z\d]*|[\d!@#\$%_\.]*|[a-zA-Z!@#\$%_\.]*)$)[a-zA-Z\d!@#\$%_\.]{6,16}/;
			if(top.test(_this.password)) {
				_this.passwordLevel = 3;
			} else if(middle.test(_this.password)) {
				_this.passwordLevel = 2;
			} else {
				_this.passwordLevel = 1;
			}
			var md5 = hex_md5(_this.userName + _this.password);
			var passWordAgain = hex_md5(_this.userName + _this.password_);

			//获取注册入口的方式
			var chanel = 0;
			if(navigator.userAgent.indexOf("lsApp") != -1) {
				chanel = 3;
			} else if(navigator.userAgent.indexOf("Windows") != -1) {
				chanel = 1;
			} else if(navigator.userAgent.indexOf("Android") || navigator.userAgent.indexOf("iPhone")) {
				chanel = 2;
			}
			if(_this.isRegiterClick){
				return
			}
			_this.isRegiterClick=true;
			// if(!_this.promotionCode){
			// 	mui.toast("推广码为必填！");
			// 	return
			// }
			var datas = {
				userName: _this.userName,
				password: md5,
				uuid: uuid,
				imageCode: _this.inputCode,
				rePassword: passWordAgain,
				chanel: chanel,
				passwordLevel: _this.passwordLevel,
				promotionCode: _this.promotionCode,
			};
			var obj = {
				type: 'post',
				data: datas,
				async: false,
				dataType: 'json',
				url: '/commonAPI/register',
				success: function(data) {
					_this.isRegiterClick=false;
					if(data.code == 200) {
						localStorage.ifClose = 0;
						localStorage.userName = _this.userName;
						// localStorage.modulus = data.body.publicKeyMap.modulus;
			            // localStorage.exponent = data.body.publicKeyMap.exponent;
            // localStorage.userType =  data.body.userType;
            localStorage.userType_ =  data.body.userType;

            localStorage.gameRebatesList = data.body.data;
			            if (localStorage.uuid){
			              localStorage.removeItem("uuid");
			            }
						//存储访问的token
						var head = "Bearer ";
						localStorage.access_token = head + data.body.token;
						//存储刷新的token
						localStorage.refreshToken = head + data.body.refreshToken;
						_this.base.clearId=1;
            			_this.base.initWebSocket();
						_this.$router.push({
							name: "index"
						});
						// 	if(localStorage.app_flag == undefined) {
						//     window.location.href = "../index.html";
						//   } else {
						//     mui.toast(data.msg);
						//   var h = plus.webview.getLaunchWebview(); //获取首页窗口
						//   localStorage.renovate = 1; //存入变量控制首页刷新
						//   mui.fire(h, 'refresh'); //传值给首页执行的方法名
						//               setTimeout(function() { //延迟关闭本窗口，目的是给首页足够的刷新时间做判断是展开哪个页面.
						//                 var ws = plus.webview.currentWebview();
						//   plus.webview.close(ws);
						// }, 500)
						// }
					} else {
						// $('#prompt').html(data.msg);
						mui.toast(data.msg)
						$("#btn").removeAttr("disabled", "disabled");
            			$("#btn").css("background", _this.baseCss.styleColor);
						_this.getImgcode();
					}
				},
				error: function(msg) {
					_this.isRegiterClick=false;
					$("#btn").removeAttr("disabled", "disabled");
         			$("#btn").css("background", _this.baseCss.styleColor);
				}
			};
			this.base.callCommonApi(obj);
		},
	},
	watch: {
	   '$route' (to, from) {
       if (to.name =="register"){
       	this.getImgcode();
       }
	   }
	 },
}
