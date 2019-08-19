//数据交互
export default {
		name:'company',
	data() {
		return {
			payConditions: [], //获取支付时的参数
			payBlankDatas: [],
			payDatas: '', //支付返回的结果
			wxName: '',
			money: '',
			orderNum: '',
		}
	},
	created: function() {
		this.initData();
	},
	mounted: function() {
		this.initialize();
	},
	//利用ajax来查询记录列表
	methods: {
		initData: function() {
			this.payConditions = JSON.parse(localStorage.getItem("numArr"));
			this.money = this.payConditions.money;
			this.getOrderNum();
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
		onCopy: function(e) {
			mui.toast('复制成功');
		},
		onError: function(e) {
			mui.toast('复制失败');
		},
		//获取订单号
		getOrderNum: function() {
			var _this = this;
			var getUserInfo = {
				type: "post",
				async: false,
				url: "/authApi/generateOrderId",
				data: {},
				success: function(data) {
					if(data.code == 200) {
						_this.orderNum = data.body;
					}
				}
			}
			this.base.callAuthApi(getUserInfo);
		},
		clickSure: function(id) {
			var _this = this;
			var reg = /^[\u4e00-\u9fa5]*$/; //只能输入中文
			if(!_this.wxName) {
				mui.toast('请输入姓名');
				return;
			}
			if(id == 1) {
				_this.clickFastPay();
			}
			if(_this.state == 1) {
				mui.toast("订单提交成功", 1000)
				setTimeout(function() {
					//					if(localStorage.app_flag == undefined) {
					//						_this.skip_newUrl(0, '../index.html', 'index');
					//					} else {
					//						_this.skip_newUrl(1, '../index.html', 'index');
					//					}
					_this.$router.push({
						name: 'index',
					})
				}, 1000)
			} else if(_this.state == 0) {
				mui.alert('充值失败！', function() {
					_this.$router.push({
						name: 'index',
					})
					//					if(localStorage.app_flag == undefined) {
					//						_this.skip_newUrl(0, '../index.html', 'index');
					//					} else {
					//						_this.skip_newUrl(1, '../index.html', 'index');
					//					}
				});
			}
		},
		//快速入款支付
		clickFastPay: function() {
			var _this = this;
//			if(_this.payConditions.pay_name == "支付宝") {
//				_this.payConditions.banktype = "ALIPAY";
//			} else if(_this.payConditions.pay_name == "微信") {
//				_this.payConditions.banktype = "WEIXIN";
//			} else {
//				_this.payConditions.banktype = "QQ";
//			}
			var getUserInfo = {
				type: "post",
				async: false,
				url: "/authApi/PayQuick",
				data: {
//					payid: _this.payConditions.id,
					paymoney: _this.payConditions.money,
					method: "payQuick",
//					banktype: _this.payConditions.banktype,
					ordernumber: _this.orderNum,
					account_name: _this.wxName,
					payment_mode:_this.payConditions.payment_mode
//					accountName: _this.payConditions.pay_name,
				},
				success: function(data) {
					_this.state = 0;
					if(data.code == 200) {
						_this.payDatas = data;
						_this.state = data.status;
						mui.toast(data.msg);
						_this.$router.push({name: "index"});
						////console.log(_this.payDatas)
					} else if(data.code == 703) {
						mui.toast("请勿重复提交订单");
					}

				}
			}
			this.base.callAuthApi(getUserInfo);
		},
		//公用函数进行位置中间位移
		middleDisplacement: function(e) {
			var screenW = e.width();
			var screenH = e.height();
			e.css('visibility', 'visible').css('top', '50%').css('left', '50%').css('margin-left', -screenW / 2 + 'px').css('margin-top', -screenH / 2 + 'px').css('display', 'block');
		},
		//弹出二维码
		popCode: function() {
			$('body').css('overflow', 'hidden');
			this.middleDisplacement($('div.iDialog'));
			$('.iDialogLayout').addClass('highZindex');
			$('.iDialogLayout').show();
			$('.iDialogWrap').css('z-index', 100);
			$('.iDialog').show();
		},
		//关闭弹出二维码
		close_popCode: function(event) {
			//$('body').css('overflow', 'auto');
			$('.iDialogWrap').css('z-index', -1);
			event = event.currentTarget;
			$(event).parents('.iDialog').hide();
			$('.iDialogLayout').removeClass('highZindex');
			$('.iDialogLayout').hide();
		},
		//初始化
		initialize: function() {
			var ow = document.documentElement.clientWidth,
				oh = document.documentElement.clientHeight;
			$('.iDialogWrap').css('width', ow).css('height', oh);
		},
		//查询数据
		//		clickPaySure: function() {
		//			var _this = this;
		//			var getUserInfo = {
		//				type: "post",
		//				async: false,
		//				url: "/authApi/queryPaystate",
		//				data: {
		//					orderid: _this.payDatas.ordernumber,
		//				},
		//				success: function(data) {
		//					////console.log(data)
		//					_this.state = data.status;
		//				}
		//			}
		//			this.base.callAuthApi(getUserInfo);
		//		},
		//复制粘贴
		copyTxt: function(event, copyContent) {
			event = event.currentTarget;
			// 动态创建 input 元素
			var aux = document.createElement("input");

			// 获得需要复制的内容
			aux.setAttribute("value", copyContent);

			// 添加到 DOM 元素中
			document.body.appendChild(aux);

			// 执行选中
			// 注意: 只有 input 和 textarea 可以执行 select() 方法.
			aux.select();

			// 获得选中的内容
			var content = window.getSelection().toString();

			// 执行复制命令
			document.execCommand("copy");

			// 将 input 元素移除
			document.body.removeChild(aux);
			$(event).toggleClass('bgCol');

			mui.toast('复制成功')
		},
		//mui跳转方法
		//		skip_newUrl: function(index, url, nameId) {
		//			switch(index) {
		//				case 0:
		//					window.location.href = url;
		//					break;
		//				case 1:
		//					mui.openWindow({
		//						url: url,
		//						id: nameId,
		//						styles: {
		//							top: base.getStatusbarHeight() + 'px',
		//							bottom: 0
		//						},
		//						show: {
		//							autoShow: true, //页面loaded事件发生后自动显示，默认为true
		//							aniShow: 'pop-in', //页面显示动画，默认为”slide-in-right“；
		//							duration: '200' //页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
		//						},
		//						createNew: true
		//					});
		//					break;
		//			}
		//		},

	},
	watch: {
		payConditions: function() {
			////console.log(this.payConditions);
		},
		$route(to, from) {
			if(to.name == 'company') {
				this.initData();

			}
		}
	}
};