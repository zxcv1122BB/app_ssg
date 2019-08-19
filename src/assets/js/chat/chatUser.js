export default {
	name: 'chatUser',
	data() {
		return {
			dataMes: [],
			onlineUser: [], //会员
			onlineAdmin: [], //管理员
			onlineFree: [], //游客
			allUser: [], //所有用户
			allSearch: [],
			searchUser: [], //搜索用户
			forbiddent: 0,
			status: 0,
			userType: 0,
			page:"1",
			isLoadPage:0,
		}
	},
	created: function() {
		this.getOnline(); //获取在线人数
	},
	mounted: function() {
		this.search();
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
			//pageNum：字符串格式
			var dataObj={
				"pageNum":""+_this.page+"",
			};
			console.log(dataObj);
			var obj = {
				type: "post",
				data: dataObj,
				//              async:false,
				dataType: "json",
				url: "/commonAPI/getUserOnline",
				success: function(data) {
					if(data.code == 200) {
						
						var allUser = $.parseJSON(data.body);
						_this.status = _this.base.chatStatus;
						_this.userType = localStorage.userType;
						for(var i in allUser) {
							if(allUser[i].userType == 0) {
								_this.onlineFree.push({
									name: i,
									ForbiddentFlag: allUser[i].ForbiddentFlag
								});
							} else if(allUser[i].userType == 1) {
								_this.onlineUser.push({
									name: i,
									ForbiddentFlag: allUser[i].ForbiddentFlag
								});
							} else if(allUser[i].userType == 2) {
								_this.onlineAdmin.push({
									name: i,
									ForbiddentFlag: allUser[i].ForbiddentFlag
								});
							}
							_this.allUser.push({
								name: i,
								ForbiddentFlag: allUser[i].ForbiddentFlag,
								userType: allUser[i].userType
							});
						}
						
					}else if(_this.page!=1){
						_this.page-=1;
					}
					//提示
					$(".has-more").html("点击加载");
					//防止重复触发
					_this.isLoadPage=0;
				},
				error: function(msg) {
					//console.log(msg);
				}
			};
			this.base.callCommonApi(obj);
		},
		search: function() {
			var _this = this;
			$('#search input[type=search]').click(function() {
				$('#search').addClass('fixedSearch');
				$('.background_gray').slideDown();
				$('#search a').show();
			});
			$('#search a').click(function() {
				$('#search').removeClass('fixedSearch');
				$('.background_gray').slideUp();
				$('#search a').hide();
				$('#search input[type=search]').val('');
				_this.searchUser = '';
				_this.allSearch = [];
			});
		},
		chatSetting: function(id, item ,index) {
			if(localStorage.userType != 3 || item.name == localStorage.userName) {
				return;
			}
			if(item.name == localStorage.userName) {
				return;
			}
			var arr = [];
			if(id == 0) {
				arr = JSON.stringify({
					'messType': '900',
					'code': '005',
					'mess': '取消全体禁言',
//					'ForbiddenTime': '',
					'userName': localStorage.userName
				});
				this.base.websock.send(arr);
				this.status = 3;
				mui.toast('全体解除禁言成功');
				return;
			} else if(id == 1) {
				arr = JSON.stringify({
					'messType': '900',
					'code': '006',
					'mess': '取消某用户禁言',
					'userName': item.name
				});
				this.base.websock.send(arr);
				this.onlineUser[index].ForbiddentFlag=0;
				mui.toast('解除禁言成功');
				return;
			}
			var uName=0;
			if(item==0){
				uName = 0;
			}else{
				uName = item.name
				
			}

			this.$router.push({
				name: 'chatSetting',
				params: {
					id: uName
				}
			})
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
		'searchUser': function() {
			var _this = this;
			_this.allSearch = [];
			if(this.searchUser == '') {
				return;
			}
			_this.allUser.map(function(item) {    
				if(item.name.search(_this.searchUser) != -1) {     
					_this.allSearch.push(item);    
				}
			});
		},
		'$route' (to, from) {
			if(to.name == "chatUser") {
				this.page="1";
				this.onlineUser=[];
				this.getOnline();
				this.allUser = [];
				this.onlineFree = [];
				this.onlineAdmin = [];
				this.onlineUser = [];
				$('.background_gray').slideUp();
				$('#search').removeClass('fixedSearch');
				$('#search a').hide();
				this.searchUser = '';
				this.allSearch = [];
				$('#search input[type=search]').val('');
			}
		}
	},
};
