export default {
	// el: '#app',
	name: 'customerService',
	data() {
		return {
			datas: '',
			wxImg: '',
			qq_Img: '',
		}
	},
	created: function() {
		//  	;
		var customerServiceString = localStorage.getItem("config");
		var _this = this;
		if(customerServiceString == undefined || customerServiceString == null) {
			var obj = {
				type: 'post',
				data: {},
				dataType: 'json',
				url: '/commonAPI/privacy/getSysConfigureResult',
				success: function(data) {
					if(data.code == 200) {
						//console.log(data.body);
						_this.datas = data.body;
						localStorage.setItem("config", JSON.stringify(data.body));
						if(_this.datas.onlineConfigure == "onlineCustomerServiceUrl") {
							localStorage.setItem("onlineCustomerServiceUrl", _this.datas.onlineSys_config1);
						}
						if(_this.datas.weixinConfigure == "weixinOnlineCustomerServiceUrl") {
							_this.wxImg = data.body.weixinSys_config1;
							localStorage.setItem("weixinOnlineCustomerServiceUrl", _this.datas.qqSys_config1);
						}
						if(_this.datas.qqConfigure == "qqOnlineCustomerServiceUrl") {
							_this.qq_Img = data.body.qqSys_config1;
							localStorage.setItem("qqOnlineCustomerServiceUrl", _this.datas.weixinSys_config1);
						}
					}
				},
				error: function(msg) {
					//console.log(msg);
				}
			};
			this.base.callCommonApi(obj);
		} else {
			var customerService = JSON.parse(customerServiceString);
			_this.datas = customerService;
			if(customerService.onlineConfigure == "onlineCustomerServiceUrl") {
				localStorage.setItem("onlineCustomerServiceUrl", customerService.onlineSys_config1);
			}
			if(customerService.weixinConfigure == "weixinOnlineCustomerServiceUrl") {
				_this.wxImg = customerService.weixinSys_config1;
				localStorage.setItem("weixinOnlineCustomerServiceUrl", customerService.weixinSys_config1);
			}
			if(customerService.qqConfigure == "qqOnlineCustomerServiceUrl") {
				_this.qq_Img = customerService.qqSys_config1;
				localStorage.setItem("qqOnlineCustomerServiceUrl", customerService.qqSys_config1);
			}
		}
		//console.log(_this.wxImg);

	},
	mounted: function() {
		var iframeheight = $(window).height();
		$('#a1').height(iframeheight);

		var h = $(window).height() + 'px';
		var w = $(window).width() + 'px';
		$('.wx_mask').css({
			width: w,
			height: h,
			background: "rgba(0, 0, 0, 0.4)",
			position: "fixed",
			top: "0",
			right: "0",
			display: "none"
		})
		$('.qq_mask').css({
			width: w,
			height: h,
			background: "rgba(0, 0, 0, 0.4)",
			position: "fixed",
			top: "0",
			right: "0",
			display: "none"
		})
	},
	methods: {
		//路由跳转返回
		routerBack: function() {
      $('.qq_mask').hide();
      $('.wx_mask').hide();
			if(localStorage.turnPathName && localStorage.turnPathName != "login") {
				// this.$router.push({ name: localStorage.turnPathName });
				this.$router.go(-1)
			} else {
				this.$router.push({
					name: "index"
				});
			}

		},
		onCopy: function(e) {
			mui.toast('复制成功');
		},
		onError: function(e) {
			mui.toast('复制失败');
		},
		//点击在线客服跳转
		onlineCustomerServiceSkip: function(configure) { 
			//console.log(configure);
			if(configure != undefined) {
				localStorage.onlineServiceUrl = configure;
				this.$router.push({
					name: "onlineService"
				})
				// if(localStorage.app_flag == undefined) {
				// 	window.location.href = 'onlineService.html';
				// } else {
				// 	mui.openWindow({
				// 		url: 'onlineService.html',
				// 		id: 'onlineService',
				// 		styles: {
				// 			top: base.getStatusbarHeight() + 'px',
				// 			bottom: 0
				// 		},
				// 		createNew: true,
				// 		show: {
				// 			autoShow: true, //页面loaded事件发生后自动显示，默认为true
				// 			aniShow: 'pop-in', //页面显示动画，默认为”slide-in-right“；
				// 			duration: '200' //页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
				// 		},
				// 	});
				// }
			} else {
				mui.toast('请稍后重试');
			}
		},
		//浏览器点击联系QQ弹出qq对话框
		lianxiqq: function(qqSys_config2) {
			if(localStorage.app_flag == undefined) {
				$("body").append(`<iframe style="display:none;" src="tencent://message/?uin=${qqSys_config2}&Site=&menu=yes"></iframe>`);
			}
		},
		//点击弹出qq二维码
		popQQimg: function() {
			if(this.qq_Img != undefined) {
				$('.qq_mask').show();
			} else {
				mui.toast('请稍后再试');
			}
		},
		//点击关闭qq二维码
		close_qq_mask: function() {
			$('.qq_mask').hide();
		},
		//点击弹出微信二维码
		popWximg: function() {
			if(this.wxImg != undefined) {
				$('.wx_mask').show();
			} else {
				mui.toast('请稍后再试');
			}
		},
		//点击关闭微信二维码
		close_wx_mask: function() {
			$('.wx_mask').hide();
		},
  },
};
//; (function (window) {
//	var h = $(window).height() + 'px';
//	var w = $(window).width() + 'px';
//	$('.wx_mask').css({
//		width: w,
//		height: h,
//		background: "rgba(0, 0, 0, 0.4)",
//		position: "fixed",
//		top: "0",
//		right: "0",
//		display:"none"
//	})
//	$('.qq_mask').css({
//		width: w,
//		height: h,
//		background: "rgba(0, 0, 0, 0.4)",
//		position: "fixed",
//		top: "0",
//		right: "0",
//		display:"none"
//	})
//})(window);
//点击微信客服里弹出
//$(".popWximg").click(function(){
//	$(".wx_mask").toggle();
//})
//$(".wx_mask").click(function(){
//	$(this).toggle();
//})

//点击QQ客服里弹出
//$('.popQQimg').click(function(){
//	$('.qq_mask').toggle();
//})
//$(".qq_mask").click(function(){
//	$(this).toggle();
//})
