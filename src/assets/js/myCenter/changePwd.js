//数据交互
export default {
		// el: '#main',
	name: 'changePwd',
	data() {
		return{
			passwordLevel: '', //会员等级
			flag: '',

			password1:'',
			password2:'',
			password3:'',
			isSh_password1:1,
			isSh_password2:1,
			isSh_password3:1
		}
	},
	created: function() {



	},
	mounted:function(){
		this.changeSpan();
    var num = this.$route.params.status;
		// alert(num);
		num?'':num=1;
    $('#article span:nth-child('+num+')').click();
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
		//验证是否已设置资金密码
		changeCoinPwd: function() {
			if(localStorage.coinPrivacyStatus=="false") {
				localStorage.urlid = 2;
				this.$router.push({name: 'moneyPwd',})
			}
		},
		validate:function () {

			var pwd1 = $("#pwd1").val();
			var pwd2 = $("#pwd2").val();

			if(pwd1 != pwd2) {
				$("#tishi").html("两次密码不相同");
				$("#pwd2").css('background-color', 'peachpuff');
				$("#changeOldPwd").attr("disabled", "disabled");
				return;
			} else {
				$("#tishi").html(" ");
				// $("#pwd2").css('background-color', '#fff');
				$("#changeOldPwd").removeAttr("disabled");
			}

		},
		validate2:function () {
			this.isSh_password3=2;
			var pwd3 = $("#pwd3").val();
			var pwd4 = $("#pwd4").val();
			if(pwd3 != pwd4) {
				$("#prompt").html("两次密码不相同");
				$("#pwd4").css('background-color', 'peachpuff');
				$("#changeOldCoinPwd").attr("disabled", "disabled");
				return;
			} else {
				$("#prompt").html(" ");
				// $("#pwd4").css('background-color', '#fff');
				$("#changeOldCoinPwd").removeAttr("disabled");
			}

		},
		//验证原登陆密码是否正确
		checkOldPwd: function() {
			var _this = this;
			var oldPwd = $("#oldPwd").val();
			var uname = localStorage.getItem("userName");
			var md5 = hex_md5(uname + oldPwd);
			var obj = {
				type: 'post',
				data: {
					"userName": uname,
					"oldPassword": md5,
				},
				dataType: 'json',
				url: '/authApi/isPassword',
				success: function(data) {
					if(data.code == 200) {
						$("#tishi").html(" ");
						// $("#oldPwd").css('background-color', '#fff');
					} else if(data.code == 338) {
						$("#oldPwd").css('background-color', 'peachpuff');
						// $('#oldPwd').focus();
						$("#tishi").html("原密码错误");
						return;
					}
				},
				error: function(msg) {
					//console.log(msg);
				}
			}
			this.base.callAuthApi(obj);
		},

		//验证原资金密码是否正确
		checkOldCoinPwd: function() {
			this.isSh_password1=2;
			var _this = this;
			var oldCoinPwd = $("#oldCoinPwd").val();
			var uname = localStorage.getItem("userName");
			var md52 = hex_md5(uname + oldCoinPwd);
			var obj = {
				type: 'post',
				data: {
					"userName": uname,
					"oldCoinPssword": md52,
				},
				dataType: 'json',
				url: '/authApi/isPassword',
				success: function(data) {
					if(data.code == 200) {
						$("#prompt").html(" ");
						// $("#oldCoinPwd").css('background-color', '#fff');
					} else if(data.code == 338) {
						$("#oldCoinPwd").css('background-color', 'peachpuff');
						// $('#oldCoinPwd').focus();
						$("#prompt").html("原取款密码错误");
						return;
					}
				},
				error: function(msg) {
					//console.log(msg);
				}
			}
			this.base.callAuthApi(obj);
		},

		//修改登陆密码
		updatePwd: function() {
			var _this = this;
			var pwd1 = $("#pwd1").val();
			var oldPwd = $("#oldPwd").val();
			var uname = localStorage.getItem("userName");

			var md5 = hex_md5(uname + pwd1);
			var md52 = hex_md5(uname + oldPwd);
			var reg = /^[0-9a-zA-Z!@#$%^&*,.]{6,16}$/
			if(oldPwd == '') {
				$("#oldPwd").css('background-color', 'peachpuff');
				// $('#oldPwd').focus();
				$('#tishi').html('原密码不能为空！');
				return;
			} else {
				// $("#oldPwd").css('background-color', '#fff');
				if(pwd1 == '') {
					$('#pwd1').css('background-color', 'peachpuff');
					// $('#pwd1').focus();
					$('#tishi').html('密码不能为空！');
					return;
				} else if(!reg.test(pwd1)) {
					$("#pwd1").css('background-color', 'peachpuff');
					// $('#pwd1').focus();
					$('#tishi').html('密码格式为6-16个字符！');
					return;
				} else {
					// $("#pwd1").css('background-color', '#fff');
				}
			}
			var middle = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
			var top = /^(?!([a-zA-Z\d]*|[\d!@#\$%_\.]*|[a-zA-Z!@#\$%_\.]*)$)[a-zA-Z\d!@#\$%_\.]{6,16}/;
			if(top.test(pwd1)) {
				_this.passwordLevel = 3;
			} else if(middle.test(pwd1)) {
				_this.passwordLevel = 2;
			} else {
				_this.passwordLevel = 1;
			}
			var obj = {
				type: 'post',
				data: {
					"userName": uname,
					"oldPassword": md52,
					"password": md5,
					'passwordLevel': _this.passwordLevel,
				},
				dataType: 'json',
				url: '/authApi/updatePassword',
				success: function(data) {
					if(data.code == 200) {
						//取到后台传递多来的Body下面的List
						$("#changeOldPwd")[0].type = "subimt";
						$("#tishi").html(" ");
			            localStorage.clear();
			            $("#pwd1")[0].value = "";
			            $("#pwd2")[0].value = "";
			            $("#oldPwd")[0].value="";
			            _this.turnUrl("login");
					} else if(data.code == 339) {
						$("#tishi").html("密码修改失败！");
					}
				},
				error: function(msg) {
					//console.log(msg);
				}
			}
			this.base.callAuthApi(obj);
		},

		//修改资金密码
		updateCoinPwd: function() {
			var _this = this;
			var pwd3 = $("#pwd3").val();
			var oldCoinPwd = $("#oldCoinPwd").val();
			var uname = localStorage.getItem("userName");
			var md5 = hex_md5(uname + pwd3);
			var md52 = hex_md5(uname + oldCoinPwd);
			var reg = /^\d{6}$/
			if(oldCoinPwd == '') {
				$("#oldCoinPwd").css('background-color', 'peachpuff');
				// $('#oldCoinPwd').focus();
				$('#prompt').html('原取款密码不能为空！');
				$('#prompt').show();
				return;
			} else {
				// $("#oldCoinPwd").css('background-color', '#fff');
				if(pwd3 == '') {
					$('#pwd3').css('background-color', 'peachpuff');
					// $('#pwd3').focus();
					$('#prompt').html('登陆密码不能为空！');
					$('#prompt').show();
					return;
				} else if(!reg.test(pwd3)) {
					$("#pwd3").css('background-color', 'peachpuff');
					// $('#pwd3').focus();
					$('#prompt').html('取款密码格式为6个数字！');
					$('#prompt').show();
					return;
				} else {
					// $("#pwd3").css('background-color', '#fff');
				}
			}

			var obj = {
				type: 'post',
				data: {
					"userName": uname,
					"oldCoinPssword": md52,
					"coinPssword": md5,
				},
				dataType: 'json',
				url: '/authApi/updatePassword',
				success: function(data) {
					if(data.code == 200) {
						mui.toast(data.msg);
						//取到后台传递多来的Body下面的List
						$("#changeOldCoinPwd")[0].type = "subimt";
			            localStorage.baseIndex = 3;
			            _this.turnUrl("index");
						// if(localStorage.==undefined){
						// 	window.location.href = '../index.html';
			      //   	}else{
			      //   		mui.openWindow({
				    //             url: '../index.html',
				    //             id:'index',
				    //             styles:{
				    //   				top:base.getStatusbarHeight()+'px',
				    //   				bottom:0
				    //   			},
				    //             show:{
				    //   				autoShow:true,//页面loaded事件发生后自动显示，默认为true
				    //   				aniShow:'pop-in',//页面显示动画，默认为”slide-in-right“；
				    //   				duration:'200'//页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
				    // 			},
				    //             createNew:true
			      //       	})
			      //   	}
					} else if(data.code == 339) {
						$("#prompt").html("取款密码修改失败！");
					}
				},
				error: function(msg) {
					//console.log(msg);
				}
			}
			this.base.callAuthApi(obj);
		},
		changeSpan:function(){
			$('nav span').click(function() {
				$(".dShow").children().children("input[type=password]").val("");
				// $(".dShow").children().children("input[type=password]").css("background-color", "#fff");
				$("#tishi").html("");
				$("#prompt").html("");
				var index = $(this).index();
				$("form").eq(index).show().siblings().hide();
				$(this).addClass('clickYes').siblings().removeClass('clickYes');
			});
	    },
	    turnUrl: function (urlName) {
	      this.$router.push({ name: urlName });
	    },


	},
	watch: {
	   '$route' (to, from) {
       if (to.name =="changePwd"){
         var num = this.$route.params.status;
				 // alert(num);
				 num?'':num=1;
         	$('#article span:nth-child('+num+')').click();
         	$("#prompt").html("");
       }

	   }
	 },
};
