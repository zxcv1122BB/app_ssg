function clear() {
	localStorage.clear();
	sessionStorage.clear();
}

export default {
	name: 'setting',
	data() {
		return {
			version: '', //当前app版本号
      sizes: localStorage.sizes?localStorage.sizes:'2',
      skin_color: localStorage.skin_color ? localStorage.skin_color : '1',
		}
	},
	created: function() {
		var _this = this;
		setTimeout(function() {
			_this.get_version();
		}, 100);
		this.getStatus();

	},
	mounted: function() {
		//mui.init();
		//		this.getStatus();
	},
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
		//获取版本
		get_version: function() {
			var config = JSON.parse(localStorage.config);
			if(localStorage.app_flag != undefined) {
				$('#version').show();
				var versionCode = plus.runtime.version; //获取当前app版本号
				this.version = '当前版本:' + versionCode;
				// alert(config.appCurrentVersion);
				// alert(versionCode);

				if(versionCode != config.appCurrentVersion) {
					$('.version_img').show();
				} else {
					$('.version_img').hide();
				}
			}
		},
		getStatus: function() {
			//判断开关状态
			if(localStorage.nodeClick == 0) {
				$('#node').removeClass('mui-active');
			} else {
				$('#node').addClass('mui-active');
			}
			if(localStorage.yaoClick == 0) {
				$('#yao').removeClass('mui-active');
			} else {
				$('#yao').addClass('mui-active');
			}
			//				mui("#node").switch().toggle();
			//				mui("#yao").switch().toggle();
			//				var node = document.getElementById("node");
			//				if(localStorage.nodeClick == 0) {
			//					node.classList.add('mui-active');
			//				} else {
			//					node.classList.remove('mui-active');
			//				}
			//				var yao = document.getElementById("yao");
			//				if(localStorage.yaoClick == 0) {
			//					yao.classList.add('mui-active');
			//				} else {
			//					yao.classList.remove('mui-active');
			//				}
			//				document.getElementById("node").addEventListener("toggle", function(event) {
			//					if(event.detail.isActive) {
			//						localStorage.nodeClick = 0;
			//					} else {
			//						localStorage.nodeClick = 1;
			//					}
			//				})
			//				document.getElementById("yao").addEventListener("toggle", function(event) {
			//					if(event.detail.isActive) {
			//						localStorage.yaoClick = 0;
			//					} else {
			//						localStorage.yaoClick = 1;
			//					}
			//				})
		},
		clickNode: function() {
			if($('#node').hasClass('mui-active')) {
				$('#node').removeClass('mui-active');
				localStorage.nodeClick = 0;
			} else {
				$('#node').addClass('mui-active');
				localStorage.nodeClick = 1;
			}
		},
		clickYao: function() {
			if($('#yao').hasClass('mui-active')) {
				$('#yao').removeClass('mui-active');
				localStorage.yaoClick = 0;
			} else {
				$('#yao').addClass('mui-active');
				localStorage.yaoClick = 1;
			}
		},
		//点击清除缓存执行
		clearStorage: function() {
      var _this = this, btnArray = ['取消', '确认'];

			mui.confirm('确认要清除缓存吗',"", btnArray, function(e) {
				// var _this = this;
				if(e.index == 1) {
					clear();
					_this.base.websock.close();
					_this.$router.push({
						name: "index"
					});
					// if(localStorage.app_flag == undefined) {
					// 	window.location.href = "../index.html";
					// } else {
					// 	mui.openWindow({
					// 		url: "index.html",
					// 		id: "index",
					// 		styles: {
					// 			top: base.getStatusbarHeight() + 'px',
					// 			bottom: 0
					// 		},
					// 		show: {
					// 			autoShow: true, //页面loaded事件发生后自动显示，默认为true
					// 			aniShow: 'pop-in', //页面显示动画，默认为”slide-in-right“；
					// 			duration: '200' //页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
					// 		},
					// 		createNew: true
					// 	});
					// }
				} else {

				}
			})

		},
		//点击更新版本号执行
		checkVersion: function() {
			var versionCode2 = plus.runtime.version; //获取当前app版本号
			var config2 = JSON.parse(localStorage.config);
			if(versionCode2 != config2.appCurrentVersion) {
				var upr;
				plus.nativeUI.confirm('有新版本发布了，是否更新？', function(e) {
					upr = (e.index == 1) ? 'Y' : 'N';
					if(upr == 'Y') {
						var ua2 = navigator.userAgent.toLowerCase();
						if(/iphone|ipad|ipod/.test(ua2)) {
							var ios_url = config2.iosEditionDownloadUrl;
							plus.runtime.launchApplication({
								action: ios_url
							}, function(e) {
								alert(e.message);
							})
						} else if(/android/.test(ua2)) {
							var wt = plus.nativeUI.showWaiting('下载更新中，请勿关闭');
							var and_url = config2.androidEditionDownloadUrl;
							var dtask = plus.downloader.createDownload(and_url, {}, function(d, status) {
								if(status == 200) {
									var path = d.filename;
									plus.runtime.install(path);
								} else {
									mui.alert('下载失败');
									plus.nativeUI.closeWaiting();
								}
							});
							dtask.start();
						}
					} else { //点击取消
					  console.log('取消更新');
					}
				}, config2.webName, ['取消', '确认']);
			} else {
				mui.toast('已经是最新版本');
			}
    },

    //退出登录
    loginOut: function() {
      var _this = this;
      var loginout = {
        type: "post",
        url: "/authApi/loginout",
        data: {
          userName: localStorage.getItem("userName")
        },
        success: function(data) {
          if(data.code == 200) {
            mui.toast("退出成功");
            localStorage.clear();
            _this.$router.push({ name: "index"});
          }
        }
      };
      _this.base.callAuthApi(loginout);
    },

	},
	watch: {
    //设置皮肤颜色
    skin_color: function (newValue){
      localStorage.skin_color = newValue;
      this.baseCss.setStyleColor(newValue);
    },
		//设置字体大小
		sizes: function(newValue) {
      this.baseCss.setSize(newValue);
      // this.setSize();
      var a = this.baseCss.size;
      var links = $('head>link#link_new');
      links.remove();
      if (a != undefined) {
        if (a == 1) {
          var new_link = '<link rel="stylesheet" type="text/css" id="link_new" href="static/css/base.css"/>';
          $('head').append(new_link);
        } else if (a == 2) {
          var new_link = '<link rel="stylesheet" type="text/css" id="link_new" href="static/css/base2.css"/>';
          $('head').append(new_link);
        } else if (a == 3) {
          var new_link = '<link rel="stylesheet" type="text/css" id="link_new" href="static/css/base3.css"/>';
          $('head').append(new_link);
        }
          localStorage.sizes = newValue;
      }else{
        var new_link = '<link rel="stylesheet" type="text/css" id="link_new" href="static/css/base2.css"/>';
          $('head').append(new_link);
          localStorage.sizes = 2;

	  }

			// var links = $('head>link#link_new');
			// links.remove();
			//			if(newValue == 1) {
			//				var new_link = '<link rel="stylesheet" type="text/css" id="link_new" href="../public/css/base.css"/>';
			//				$('head').append(new_link);
			//			} else if(newValue == 2) {
			//				var new_link = '<link rel="stylesheet" type="text/css" id="link_new" href="../public/css/base2.css"/>';
			//				$('head').append(new_link);
			//			} else if(newValue == 3) {
			//				var new_link = '<link rel="stylesheet" type="text/css" id="link_new" href="../public/css/base3.css"/>';
			//				$('head').append(new_link);
			//			}
			// if(localStorage.app_flag != undefined) {
			// 	var h = plus.webview.getLaunchWebview(); //获取首页窗口
			// 	localStorage.renovate = 1; //存入变量控制首页刷新
			// 	mui.fire(h, 'refresh'); //传值给首页执行的方法名
			// }
		},
		'$route' (to, from) {
			if(to.name == "setting") {
				this.getStatus();
				if(localStorage.sizes == 'undefined'){
                    // localStorage.sizes = 2;
					this.sizes =2;
                    // this.baseCss.setSize(2)
				}
                // //console.log(localStorage.sizes);
			}

		}
	}
}
