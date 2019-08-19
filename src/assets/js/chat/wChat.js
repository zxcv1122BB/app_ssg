export default {
	name: 'wChat',
	data() {
		return {
			chatList: [],
			onlineUser: [],
			onlineAdmin: [],
			userType: 0,
			onMess: this.base.privateMess,
			id: 0,
			page:"1",
			isLoadPage:0,
		}
	},
	created: function() {
		this.$nextTick(() => {
			this.getOnline();
			//			this.chatList.push({
			//				chatName: '公共聊天室'
			//			})
		})
	},
	mounted: function() {
		this.clickSliup();
		this.loadMorePage();
	},
	methods: {
		clickLoad:function(){
			var _this=this;
			if(_this.isLoadPage==0){
				_this.page = parseInt(_this.page)+1;
				$(".has-more").html("");
				$(".has-more").append('<img src="static/images/wait.gif" width="15" height="15" /><span>正在努力加载中...</span>');
				_this.getOnline();
			}
		},
		loadMorePage: function() {
			var finished = 0,
				_this = this;
			var toUpdate = {

				loadmore: function(obj) {
					if(_this.isLoadPage==1){
						return
					}
					if(finished == 0) {
						var scrollTop = $(obj).scrollTop(); //获取滚动条高度。
						var windowHeight = $(obj).height(); //获取window的高度。
						var scrollHeight = $(document).height(); //获取内容高度。

						if(scrollTop + windowHeight - scrollHeight-$("#header").height() > -10) { //当滚动条高度+window高度-内空高度0,则进入
							finished = 1; //次数=1.
							setTimeout(function() { //半秒后执行此方法.
								_this.page = parseInt(_this.page)+1;
								toUpdate.wipeUpdate();
								finished = 0; //次数变成0.
							}, 200);
						}
					}
				},

				wipeUpdate: function() {
					$(".has-more").html("");
					$(".has-more").append('<img src="static/images/wait.gif" width="15" height="15" /><span>正在努力加载中...</span>');
					_this.getOnline();
				},

				init: function() {
					$(window).scroll(function() {
						toUpdate.loadmore($(this));
					})
				}
			};
			toUpdate.init();
		},
		getOnline: function() {
			var _this = this;
			if(_this.isLoadPage==1){
				return
			}
			//反正重复触发
			_this.isLoadPage=1;
			_this.onMess = _this.base.privateMess;
			var obj = {
				type: "post",
				data: {
					"pageNum":""+_this.page+"",
				},
				dataType: "json",
				url: "/commonAPI/getUserOnline",
				success: function(data) {
					if(data.code == 200) {
						var onlineUser = $.parseJSON(data.body);
						_this.userType = localStorage.userType;
						for(var i in onlineUser) {
							if(onlineUser[i].userType == 1) {
								_this.onlineUser.push({
									name: i
								});
							} else if(onlineUser[i].userType == 2) {
								_this.onlineAdmin.push({
									name: i
								});
							}
						}
						
					}else if(_this.page!=1){
						_this.page-=1;
					}

					//提示
					$(".has-more").html("点击加载");
					//防止重复触发
					_this.isLoadPage=0;
				},
				error: function(msg) {}
			};
			this.base.callCommonApi(obj);
		},
		clickSliup: function() {
			$('#wChat').click(function() {
				$('#mores').slideUp();
			})
		},
		getMore: function() {
			$('#mores').slideToggle();
			$('.background_gray').slideUp();
		},
		togoChat: function(chatName, index) {
			if(this.id != 1) {
				if(chatName != 0) {
					this.chatList[index].id = 1;
				}
				this.$router.push({
					name: 'chat',
					params: {
						chatName: chatName
					}
				})
			} else {
				this.id = 0;
			}
		},
		togoPrivate: function() {
			var _this = this;
			if(_this.userType == 2) {
				mui.toast('试玩用户无法私聊');
				return;
			}
			if(_this.userType == 1) {
				if(_this.onlineAdmin.length == 0) {
					mui.toast('当前没有在线的管理员');
					$('#mores').hide();
					$(this).slideUp();
					return;
				}
			} else if(_this.userType == 3) {
				if(_this.onlineUser.length == 0) {
					mui.toast('当前没有在线的会员');
					$('#mores').hide();
					$(this).slideUp();
					return;
				}
			}
			$(".background_gray").slideToggle();
//			(function() {
//				if($(this).is(":visible")) {} else {
//
//				}
//			});
			//			$('.background_gray').slideToggle();
		},
		delectChat: function(index) {
			this.chatList.splice(index, 1);
			mui.toast('删除成功');
			this.id = 1;
		},
		//		togoCommon:function(){
		//			
		//		},  
		privateChat: function(name) {
			if(name == localStorage.userName) {
				return;
			}
			var chatList = [];
			this.chatList.map(function(item) {   
				chatList.push(item.chatName);
			});
			if(chatList.indexOf(name) == -1) {
				this.chatList.push({
					chatName: name,
					id: 1
				})
			} else {
				mui.toast('该私聊已存在')
			}
			$('.background_gray').slideUp();
			$('#mores').slideUp();
		},
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
	},
	watch: {
		'onMess': function() {
			var _this = this;
			var chatList = [];
			_this.chatList.map(function(item) {   
				chatList.push(item.chatName);
			});
			if(_this.base.privateMess.length != 0) {
				for(var i = 0; i < _this.base.privateMess.length; i++) {
					if(_this.base.privateMess[i].uName != localStorage.userName) {
						if(chatList.indexOf(_this.base.privateMess[i].uName) == -1) {
							this.chatList.push({
								chatName: _this.base.privateMess[i].uName,
								id: 0
							})
						} else {
							for(var x in _this.chatList) {
								if(_this.chatList[x].chatName == _this.base.privateMess[i].uName) {
									_this.chatList[x].id = 0;
								}
								if(_this.chatList[x].chatName == localStorage.chatName) {
									_this.chatList[x].id = 1;
									localStorage.chatName = '';
								}
							}
						}
					}
				}
			}
		},
		'$route' (to, from) {
			if(to.name == "wChat") {
				this.page="1";
				this.onlineUser=[];
				this.$nextTick(() => {
					this.getOnline();
					$('#mores').slideUp();
					$('.background_gray').slideUp();
					this.chatList = [];
					this.onlineAdmin = [];
					this.onlineUser = [];
					var str = JSON.parse(localStorage.chatList);
					this.chatList = str;
				})
			} else if(from.name == "wChat") {
				$('#mores').slideUp();
				$('.background_gray').slideUp();
				localStorage.chatList = JSON.stringify(this.chatList)

			}
		}
	},
};