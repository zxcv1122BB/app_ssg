//数据交互
	export default {
		// el: '#main',
		name: 'moneyPwd',
		data() {
			return{
				phoneNumber: '',
				password1: '',
				password2: '',
			}
		},
		created: function() {
			// if(localStorage.bankPrivacyStatus == "true" && localStorage.coinPrivacyStatus == "true") {
			// 	this.$router.push({ name: '/',})
			// } else if(localStorage.bankPrivacyStatus == "false" && localStorage.coinPrivacyStatus == "true") {
			// 	if(localStorage.urlid == 1) {
			// 		this.$router.push({name: 'bindCard',})
			// 	} else {
			// 		this.$router.push({name: '/',})
			// 	}
			// }
		},

		//利用ajax来查询记录列表
		methods: {
      //路由跳转返回
        routerBack: function () {
          if (localStorage.turnPathName && localStorage.turnPathName!="login"&&localStorage.coinPrivacyStatus==false){
            // this.$router.push({ name: localStorage.turnPathName });
            this.$router.go(-1)
          }else{
            this.$router.push({ name: "index" });
          }

        },
			//设置资金密码
			updateMoneyPwd: function(password1, password2) {
				$("#prompt").html("");
				var _this = this;
				var username = localStorage.getItem("userName");
				var password1Pattern = /^\d{6}$/; //资金密码
				if(password1 == "") {
					$("#prompt").html("资金密码不能为空！");
					$("#password1").css('background-color', 'peachpuff');
					return;
				} else if(!password1Pattern.test(password1)) {
					$("#prompt").html("资金密码为6位数字！");
					$("#password1").css('background-color', 'peachpuff');
					return;
				} else {
					$("#password1").css('background-color', 'white');
					if(password2 == "") {
						$("#prompt").html("请确认资金密码！");
						$("#password2").css('background-color', 'peachpuff');
						return;
					} else {
						$("#password2").css('background-color', 'white');
						if(password1 != password2) {
							$("#prompt").html("两次输入密码不一致！");
							$("#password2").css('background-color', 'peachpuff');
							return;
						} else {
							$("#password2").css('background-color', 'white');
						}
					}
				}
				var passWord = hex_md5(username + password1);
				var passWordAgain = hex_md5(username + password2);
				var obj = {
					type: 'post',
					data: {
						"username": username,
						"privacyStatus": 2,
						"password1": passWord,
						"password2": passWordAgain,
					},
					dataType: 'json',
					url: '/authApi/privacy/bindPrivacy',
					success: function(data) {
						if(data.code == 200) {
							mui.toast("设置成功！");
							localStorage.coinPrivacyStatus = "true";
							if(localStorage.urlid == 1) {
								_this.$router.push({name: 'enchashment',})
							} else if(localStorage.urlid == 2) {
								_this.$router.push({name: 'changePwd',})
							}else{
								_this.$router.push({name: 'index',})
							}
						} else {
							//console.log(data);
						}
					},
					error: function(msg) {
						//console.log(msg);
					}
				};
				this.base.callAuthApi(obj);
			},
		}
	};
