export default {
	data() {
		return {
			timeList: ['今天', '昨天', '近七天','本月','上月'],
			timeC: '',
			datas: [],
			page: 1, //默认请求的页码-默认第1页
			totalPage: 1, //总页数
			coinUnit: '',
			indexArr: '',
            datamore:[],
		}
	},
	created() {
		this.getdatas();
		this.$nextTick(() => {
			this.initDateTool();
		})
	},
	mounted() {
		this.loadMorePage();

		$(".tabList").css({
			height:$("#container").height()-44-$(".col3TableTitle").height()-$("#mainTit").height()+"px",
			overflow:'scroll'
		})
	},
	methods: {
		getdatas() {
			var _this = this,
				dateType;
			_this.coinUnit = JSON.parse(localStorage.getItem('config')).coinUnit;
			if(_this.indexArr === "") {
				_this.timeC = _this.timeList[2];
			}
			if(_this.indexArr == 2 || _this.indexArr === "") {
				dateType = '';
			} else if(_this.indexArr<2){
        dateType = parseInt(_this.indexArr)+1;
      }else{
        dateType = parseInt(_this.indexArr);
      }
			$("#noMessage").hide()
			if(this.page <= this.totalPage) {
				var data = {
					'pageIndex': this.page,
					'pageNum': 15,
					'dateType': dateType,
					'nextAgentName': ''
				};
				var _this = this;
				var obj = {
					type: 'post',
					data: data,
					dataType: 'json',
					url: '/authApi/proxy/getNextProxyReportInfo',
					success: function(data) {
						if(data.code == 200) {
							$("#noMessage").hide()
							$("#section").show();
							_this.$nextTick(() => {
								_this.totalPage = data.body.pageSize;
								var arr = [];
								arr = data.body.list;
								for(var i = 0; i < arr.length; i++) {
//									arr[i].profit = parseInt(arr[i].betAmount - arr[i].bonusAmount);
//									arr[i].profit = _this.changeTwoDecimal_f(arr[i].profit);
									_this.datas.push(arr[i]);
								}
							})
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
		},
		changeTwoDecimal_f(x) {　
			var f_x = parseFloat(x);　　
			if(isNaN(f_x))　　 {　　　　
				return 0;　　
			}　　
			var f_x = Math.round(x * 100) / 100;　　
			var s_x = f_x.toString();　　
			var pos_decimal = s_x.indexOf('.');　　
			if(pos_decimal < 0)　　 {　　　　
				pos_decimal = s_x.length;　　
				s_x += '.';　　
			}　　
			while(s_x.length <= pos_decimal + 2)　　 {　　　　
				s_x += '0';　　
			}　　
			return s_x;
		},
		initDateTool: function() {
			var _this = this;
			var mobileSelect2 = new MobileSelect({
				trigger: '#timeC', //触发
				title: '请选择', //标题
				wheels: [{
					data: _this.timeList
				}],
				cancelBtnText: '　',
				position: [2],
				transitionEnd: function(indexArr, data) {},
				callback: function(indexArr, data) {
					_this.timeC = _this.timeList[indexArr]
					_this.datas = [];
					_this.indexArr = indexArr[0];
					_this.getdatas()
				},
			});
		},
		//跳转页面
		redirect: function(pathName) {
			this.$router.push({
				name: pathName
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
					_this.getdatas();
				},

				init: function() {
					// $(window).scroll(function() {
					// 	toUpdate.loadmore($(this));
					// })
					$('.tabList').scroll(function() {
						toUpdate.loadmore($(this));
					})
				}
			};
			toUpdate.init();
		},
		// 查看列表详情
        details: function (item) {
			// console.log(item);
			var _this = this;
			_this.datamore  = item;
			console.log(_this.datamore);
			$('.popover').show();
        },
        closepop:function () {
            $('.popover').hide();
			
        }
	},
	watch: {
		'$route' (to, from) {
			if(to.name == "lowerReport") {
				this.$nextTick(() => {
					this.datas = [];
					this.loadMorePage();
					$(".has-more").html("");
					this.page = 1;
					$('#noMessage').hide();
					this.getdatas();
				})

			} else if(from.name == "lowerReport") {

			}

		}
	}
}
