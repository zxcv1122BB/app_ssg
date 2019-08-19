export default {
	// el: '#main',
	name: 'ticketFetails',
	data() {
		return {
			ticketDetailsList: [],
			ticketDetailsStr: [],
			typeId: '',
			page: 1, //默认请求的页码-默认第1页
			totalPage: 1, //总页数
		}
	},
	created: function() {
		this.getdatasMes();
	},
	mounted: function() {
		this.loadMorePage();
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
		getdatasMes: function() {
			var _this = this;
//			$("#ticDetails").show();
			$("#noMessage").hide();
			_this.typeId = _this.$route.params.typeId;
			_this.betId = _this.$route.params.id;
			if(_this.typeId == 0) {
				if(this.page <= this.totalPage) {
					var data = {
						'betId': _this.betId,
						'pageIndex': this.page,
						'pageNum': 15,
						//'pageSize':1,
					};
					var _this = this;
					var obj = {
						type: 'post',
						data: data,
						dataType: 'json',
						url: '/authApi/bets/getTicketDetailsList',
						success: function(data) {
							//console.log(data);
							if(data.code == 200) {
								// $("#noMessage").hide()
								// $("#section").show();
								_this.totalPage = data.body.pageSize;
								var arr = [];
								arr = data.body.list;
								for(var i = 0; i < arr.length; i++) {
									_this.ticketDetailsList.push(arr[i]);
								}
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
					};
					this.base.callAuthApi(obj);
				} else {
					$(".has-more").html("");
					$(".has-more").append('<span>数据加载完毕</span>');
				}
			} else if(_this.typeId == 2) {
				_this.ticketDetailsStr = JSON.parse(localStorage.getItem('ticketDetailsStr'));
			} else {
				$("#ticDetails").hide();
				$("#noMessage").show();
			}
		},
		loadMorePage: function() {
			var finished = 0,
				_this = this;
			var toUpdate = {

				loadmore: function(obj) {
					if(finished == 0) {
						var scrollTop = $(obj).scrollTop(); //获取滚动条高度。
						var windowHeight = $(obj).height(); //获取window的高度。
						var scrollHeight = $(document).height(); //获取内容高度。
						if(scrollTop + windowHeight - scrollHeight > -10) { //当滚动条高度+window高度-内空高度0,则进入
							finished = 1; //次数=1.
							setTimeout(function() { //半秒后执行此方法.
								_this.page += 1;
								toUpdate.wipeUpdate();
								finished = 0; //次数变成0.
							}, 200);
						}
					}
				},

				wipeUpdate: function() {
					$(".has-more").html("");
					$(".has-more").append('<img src="static/images/wait.gif" width="15" height="15" /><span>正在努力加载中...</span>');
					_this.getdatasMes();
				},

				init: function() {
					$(window).scroll(function() {
						toUpdate.loadmore($(this));
					})
				}
			};
			toUpdate.init();
		},
	},
	watch: {
		'$route' (to, from) {
			if(to.name == "ticketDetails") {
				$(".has-more").html("");
				this.loadMorePage();
				this.getdatasMes();
				this.page = 1;
				this.ticketDetailsList = [];
				this.ticketDetailsStr = [];
			} else if(from.name == "ticketDetails") {
				//				this.getdatasMes();
			}
		}
	},
};