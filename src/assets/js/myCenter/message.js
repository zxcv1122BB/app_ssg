//数据交互
export default {
	name: 'message',
	data() {
		return {
			datas: [], //记录列表
			mesContent: '', //消息

		}
	},
	created: function() {
		this.getdatasMes();
	},
	mounted: function() {
		//mui.init();
		this.getMui()
	},
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
		getMui: function() {
			//侧滑点击删除
			$('#OA_task_1').on('tap', '.mui-btn-red', function(event) {
        var elem = this;
        if(elem){
          var li = elem.parentNode.parentNode;
          setTimeout(function () {
            li.parentNode.removeChild(li);
          }, 100);
        }

			});

			//侧滑点击标为已读
			$('#OA_task_1').on('tap', '.mui-btn-green', function(event) {
        var elem = this;
        if(elem){
          var li = elem.parentNode.parentNode;
          setTimeout(function () {
            mui.swipeoutClose(li);
          }, 0);
        }

			});
		},
		getdatasMes: function() { //查看短消息列表
			var _this = this;
			var uname = localStorage.getItem("userName");
			var data = {
				'username': uname
			};
			var obj = {
				type: 'post',
				data: data,
				dataType: 'json',
				url: '/authApi/msg/getUserMessage',
				success: function(data) {
					if(data.code == 200) {
						//取到后台传递多来的Body
						_this.datas = data.body;
						$("#section").show();
						$("#noMessage").hide();
					} else {
						$("#section").hide();
						$("#noMessage").show();
					}
				},
				error: function(msg) {
					//console.log(msg);
				}
			}
			this.base.callAuthApi(obj);
		},
		clickMessage: function(id, index) {
			var _this = this;
			_this.getdatasMes();
			_this.mesContent = _this.datas[index];
			_this.changeStatus(id, index);
			localStorage.setItem('mesContent', JSON.stringify(_this.mesContent));
			_this.$router.push({
				name: 'mesContent',
			})
			//			if(localStorage.app_flag==undefined){
			//				window.location.href="mesContent.html";
			//			}else{
			//				mui.openWindow({
			//					url: 'mesContent.html',
			//	                id:'mesContent',
			//	                styles:{
			//	      				top:base.getStatusbarHeight()+'px',
			//	      				bottom:0
			//	   				},
			//	                show:{
			//	      				autoShow:true,//页面loaded事件发生后自动显示，默认为true
			//	      				aniShow:'pop-in',//页面显示动画，默认为”slide-in-right“；
			//	      				duration:'200'//页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
			//	    			},
			//	                createNew:true
			//				})
			//			}
		},
		changeStatus: function(id, index) { //点击查看短消息内容改变读取状态
			var _this = this;
			var uname = localStorage.getItem("userName");
			var nowReadStatus = _this.datas[index].readStatus;
			if(nowReadStatus && nowReadStatus == 1) {
				var obj = {
					type: 'post',
					async: false,
					data: {
						'messageId': id,
						'username': uname
					},
					dataType: 'json',
					url: '/authApi/msg/updateUserMessageStatus',
					success: function(data) {
						if(data.code == 200) {
							_this.datas[index].readStatus = 0;
						} else {
							//console.log("修改失败")
						}

					},
					error: function(msg) {
						//console.log(msg);
					},

				}
				this.base.callAuthApi(obj);
			}

		},
		delectMessage: function(id, index, readStatus) { //删除消息
			var _this = this;
			var obj = {
				type: 'post',
				data: {
					'id': id,
					'readStatus': readStatus + '',
				},
				dataType: 'json',
				url: '/authApi/msg/deleteMessageByid',
				success: function(data) {
					if(data.code == 200) {
						//console.log("删除成功")
						mui.toast('删除成功')
						_this.datas.length = _this.datas.length - 1;
						if(_this.datas.length == 0) {
							$("#section").hide();
							$("#noMessage").show();
						}
					} else {
						//console.log("删除失败")
					}
				},
				error: function(msg) {
					//console.log(msg);
				},

			}
			this.base.callAuthApi(obj);

		},
	},
	watch: {
    '$route'(to, from) {
			if(to.name == "message") {
        this.datas = [], //记录列表
        this.mesContent = ''; //消息
        this.getdatasMes();
        this.getMui();
      }
		}
	},
};
