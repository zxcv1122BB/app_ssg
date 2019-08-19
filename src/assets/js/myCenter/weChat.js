	//数据交互
export default{
	name:'weChat',
	data() {
		return{
			payConditions: [], //获取支付时的参数
			payDatas: '', //支付返回的结果
			src: '',
			errorMsg: '',
			coinUnit:'元',
			ordernumber:'',
			paymoney:'',
			pay_url:'',
			payError:'',
			paySet:false,
			payName:'',
		}
	},
	created: function() {
    	this.coinUnit = JSON.parse(localStorage.getItem('config')).coinUnit;
		this.payConditions = JSON.parse(localStorage.getItem("numArr"));
		this.payName = this.payConditions.compname;
		// this.clickPay();


	},
	mounted:function(){
		this.initData();
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
		//查询数据
		clickPay: function() {
			var _this = this;
			var getUserInfo = {
				type: "post",
				async: false,
				url: "/authApi/playOnline",
				data: {
					paymoney: _this.payConditions.money,
					method: _this.payConditions.methname,
					goodsname: 'hhh',
					banktype: _this.payConditions.type_id,
				},
				success: function(data) {
					if(data.status == 1) {
						_this.payDatas = data;
						// console.log(_this.payDatas)
						if(_this.payConditions.type_id == "WEIXIN") {
							_this.src = _this.payDatas.data.r6_qrcode;
						} else {
							window.location.href = _this.payDatas.qrurl;
						}
					} else {
						_this.errorMsg = data.error;
						$(".payError").show();
						$(".paySuccess").hide();
					}

				}
			}
			this.base.callAuthApi(getUserInfo);
		},
		clickSure: function() {
			var _this = this;
			_this.clickPaySure();
			if(_this.state == 1) {
				mui.toast("订单提交成功",1000)
				setTimeout(function() {
//					if(localStorage. == undefined) {
//						_this.skip_newUrl(0, '../index.html', 'index');
//					} else {
//						_this.skip_newUrl(1, '../index.html', 'index');
//					}
					this.$router.push({
				          name: 'index',
				        })
				}, 1000)
			} else if(_this.state == 0) {
				mui.alert('充值失败！', function() {
//					if(localStorage.app_flag == undefined) {
//						_this.skip_newUrl(0, '../index.html', 'index');
//					} else {
//						_this.skip_newUrl(1, '../index.html', 'index');
//					}
					this.$router.push({
				          name: 'index',
				        })
				});
			} else if(_this.state == 2) {
				mui.alert("待付款！");
				// mui.alert('待付款！', function() {
//					if(localStorage.app_flag == undefined) {
//						_this.skip_newUrl(0, '../index.html', 'index');
//					} else {
//						_this.skip_newUrl(1, '../index.html', 'index');
//					}
					// this.$router.push({
				    //       name: 'index',
				    //     })
				// });
			}
		},
		//查询数据
		clickPaySure: function() {
			var _this = this;
			var getUserInfo = {
				type: "post",
				async: false,
				url: "/authApi/queryPaystate",
				data: {
					orderid: _this.ordernumber,
				},
				success: function(data) {
					//console.log(data)
					_this.state = data.state;
				}
			}
			this.base.callAuthApi(getUserInfo);
		},



		initData:function(){
			$('#qrCode').find('canvas').remove();
			var _this = this;
			var obj = {
				type: "post",
				async: false,
				url: "/authApi/newPayQuick",
				data: {
					account_name:localStorage.userName,
					method: _this.payConditions.methname,
					payment_mode:_this.payConditions.payment_mode,
					paymoney: _this.payConditions.money,
				},
				success: function(data) {
					if(data.code==200){
            if (data.redirect) {
              let newWin = window.open('', '_blank');
              newWin.document.write(data.redirect);
            }
						_this.paySet = true;
						_this.ordernumber = data.ordernumber;
						_this.paymoney = data.paymoney;
						_this.pay_url	 = data.pay_url;
						// jQuery('#qrCode').qrcode({
						// 	render: "canvas", // 渲染方式有table方式和canvas方式
						// 	width: 120, //默认宽度
						// 	height: 120, //默认高度
						// 	text: _this.pay_url, //二维码内容
						// 	typeNumber: -1, //计算模式一般默认为-1
						// 	correctLevel: 0, //二维码纠错级别
						// 	background: "#ffffff", //背景颜色
						// 	foreground: "#000000" //二维码颜色
						// });
						_this.info=data.info;

					}else{
						_this.ordernumber = data.ordernumber;
						_this.paymoney = data.paymoney;
						_this.payError = data.info;
						_this.paySet = false;
						// mui.toast(data.info);
					}
				}
			}
			// this.base.callAuthApi(getUserInfo);
			this.base.callAuthApi(obj);



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

	watch:{
		$route(to,from){
			if(to.name=='weChat'){
				this.payConditions = JSON.parse(localStorage.getItem("numArr"));
				this.payName = this.payConditions.compname;
				this.initData();
			}
		}
	}

};
