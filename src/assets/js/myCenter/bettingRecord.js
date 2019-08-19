export default {
	// el: '#main',
	name: 'bettingRecord',
	data() {
		return {
			datas: [], //记录列表
			types: [],
			type: '',
			outOfThrity: 0,
			startTime: '',
			endTime: '',

			isShow: false, //获取数据条数

			page: 1, //默认请求的页码-默认第1页
			totalPage: 1, //总页数
			coinUnit: '元',
			mo: '',
			status: '',
			gameIdList: [],
			variety: {
				list: [],
				name: [],
			},
		}
	},
	created: function() {
		this.$nextTick(function() {
			this.get_ConfigureResult();
			this.getTypes();
			this.getdatas();
		});

	},

	mounted: function() {
		//实现滚动条无法滚动

		this.initDom();
		this.clickDate();
		var w=$(window).width();
		var h=$(window).height(),
			sh=h-$('#header').height()-$('.sta_nav').height()-$('.tbNav').height();

		$("#section").css({
			height:sh
		});

		$("#selectType").css({
			height:sh+"px"
		})
	},
	//利用ajax来查询记录列表
	methods: { //路由跳转返回
		//			$route(to, from) {
		//				if(to.name == "bettingRecord") {
		//					// this.get_login();
		//					if(from.name == "index") {
		//						this.getdatas();
		//					} else if(localStorage.userName) {
		//						this.getdatas();
		//					}
		//				}
		//			},
		initDom() {
			this.mo = function(e) {
				e.preventDefault();
			};
			this.mo = function(e) {
				e.preventDefault();
			};

			this.loadMorePage();
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
		//获取系统配置
		get_ConfigureResult: function() {
			if(localStorage.config) {
				this.coinUnit = JSON.parse(localStorage.getItem('config')).coinUnit;
				return
			}
			var _this = this,
				privacy = {
					type: "post",
					data: {},
					url: "/commonAPI/privacy/getSysConfigureResult",
					success: function(data) {
						_this.coinUnit = data.body.coinUnit;
						localStorage.setItem("config", JSON.stringify(data.body));
					}
				};
			this.base.callCommonApi(privacy);
		},
		/***取消滑动限制***/
		move: function() {
			var _this = this;
			$('#background_gray').hide();
			document.body.style.overflow = ''; //出现滚动条
			document.removeEventListener("touchmove", _this.mo, false);
		},
		/***禁止滑动***/
		stop: function() {
			$('#background_gray').show();
			document.body.style.overflow = 'hidden';
			document.addEventListener("touchmove", this.mo, false); //禁止页面滑动
		},
		choStatus: function(id) {
			this.status = id;
			this.page = 1;
			this.datas = [];
			this.getdatas();
		},
		clickDate: function() {
			var _this = this;
			$("#date").click(function() {
				$("#selectDate").slideToggle();
				var flag = $(this).hasClass("flag");
				if(flag) {
					$(this).removeClass("flag");
					//					$("#selectDate").hide();
					_this.move();
				} else {
					$(this).addClass("flag");
					//					$("#selectDate").show();
					_this.stop();
				}
				$("#selectType").hide();
				$("#selectStatus").hide();
				$("#type").removeClass("flag");
				return;
			});
			$("#selectDate li").click(function() {
				$("#selectDate").hide();
				_this.move();
				$("#date").removeClass("flag");
				var selectDate = $(this).text();
				$("#showDate").val(selectDate);
			});
			$("#type").click(function() {
				$("#selectType").slideToggle();
				var flag = $(this).hasClass("flag");
				if(flag) {
					_this.move();
					$(this).removeClass("flag");
					//					$("#selectType").hide();
				} else {
					_this.stop();
					$(this).addClass("flag");
					//					$("#selectType").show();
				}
				$("#selectDate").hide();
				$("#selectStatus").hide();
				$("#date").removeClass("flag");
			});
			$("#selectType li:first-child").click(function() {
				_this.move();
				$(this).addClass("choose_yes").removeClass('choose_no').siblings().children('ul').find('li').removeClass("choose_yes").addClass('choose_no');
				$("#selectType").hide();
				$("#type").removeClass("flag");
				var selectType = $(this).children('span').text();
				$("#showType").val(selectType);
//				_this.getdatas();
			});
			$("#selectType li ul li").click(function() {
				_this.move();
				$(this).siblings().removeClass("choose_yes").addClass('choose_no');
				$(this).parents('li').siblings('li:first-child').removeClass("choose_yes").addClass('choose_no');
				$(this).addClass("choose_yes").removeClass('choose_no').parents('li').siblings().children('ul').find('li').removeClass("choose_yes").addClass('choose_no');
				$("#selectType").hide();
				$("#type").removeClass("flag");
				var selectType = $(this).children('i').text();
				$("#showType").val(selectType);
			});
			$("#status").click(function() {
				$("#selectStatus").slideToggle();
				var flag = $(this).hasClass("flag");
				if(flag) {
					$(this).removeClass("flag");
					_this.move();
				} else {
					$(this).addClass("flag");
					//					$("#selectDate").show();
					_this.stop();
				}
				$("#selectType").hide();
				$("#selectDate").hide();
				$("#type").removeClass("flag");
				$("#date").removeClass("flag");
				return;
			});
			$("#selectStatus li").click(function() {
				$("#selectStatus").hide();
				_this.move();
				$("#status").removeClass("flag");
				var selectStatus = $(this).text();
				$("#showStatus").val(selectStatus);
			});
			$('#background_gray').click(function() {
				_this.move();
				$('#selectType').hide();
				$('#selectDate').hide();
				$("#selectStatus").hide();
				$("#date").removeClass("flag");
				$("#type").removeClass("flag");
				$("#status").removeClass("flag");
			})
		},
		getdatas: function() {
			var uname = localStorage.getItem("userName");
			$("#noMessage").hide()
			if(this.page <= this.totalPage) {
				var data = {
					'username': uname,
					'status': this.status,
					'outOfThrity': this.outOfThrity,
					'startTime': this.startTime,
					'endTime': this.endTime,
					'type': this.type,
					'pageIndex': this.page,
					'pageNum': 15,
					//'pageSize':1,
				};
				var _this = this;
				var obj = {
					type: 'post',
					data: data,
					dataType: 'json',
					url: '/authApi/bets/getBettingInfoList',
					success: function(data) {
						if(data.code == 200) {
							_this.$nextTick(() => {
								$("#noMessage").hide();
								$("#section").show();
								_this.totalPage = data.body.pageSize;
								var arr = [];
								arr = data.body.list;
								for(var i = 0; i < arr.length; i++) {
									if(!arr[i].gameUrl) {
										arr[i].gameUrl = 'images/football1.png';
									}
									_this.datas.push(arr[i]);
								}
							})
						} else {
							$("#section").hide();
							$("#noMessage").show();
						}
					},
					error: function(msg) {}
				};
				this.base.callAuthApi(obj);
			} else {
				$(".has-more").html("");
				$(".has-more").append('<span>数据加载完毕</span>');
			}

		},
		skip: function(item) {
			localStorage.setItem("key", item.betId);
			if(item.type < 5) {
				this.$router.push({
					name: 'moreMes',
					params: {
						id: item.betId,
						outOfThrity: this.outOfThrity
					}
				})
			} else {
				this.$router.push({
					name: 'caiMore',
					params: {
						id: item.betId,
						outOfThrity: this.outOfThrity
					}
				})

			}
		},
		getTypes: function() {
			var that = this;
			that.type = '';
			that.datas = [];
			that.page = 1;
			$('#showType').val('所有彩种');
			that.status = this.$route.params.status;
			if(that.status == 0) {
				that.status = '';
				$('#showStatus').val('所有状态');
			} else {
				$('#showStatus').val('已中奖');
			}
			var obj = {
				type: 'post',
				data: {},
				async: false,
				dataType: 'json',
				url: '/authApi/bets/queryGameType',
				success: function(data) {
					if(data.code == 200) {
						that.variety = {
							list: [],
							name: [],
						};
						var gameList = [],
							codeList = [],
							isJC = 0,
							nameList = {
								"ssc": "时时彩",
								"k3": "快三",
								"kl10f": "快乐十分",
								"PK10": "PK拾",
								"hk6": "六合彩",
								"11x5": "11选5",
								"3D": "3D彩",
								"PCDD": "北京28",
								"7xc": "七星彩",
							};
						that.gameIdList = [];
						data.body.map(function(item, index) {
							data.body[index].codeName = "竞技彩";
							if(item.code) {
								data.body[index].codeName = nameList[item.code];
								if(!that.gameIdList[item.code]) {
									that.gameIdList[item.code] = item.gameId;
									codeList.push(item.code);
									gameList.push([item]);
								} else {
									that.gameIdList[item.code] = that.gameIdList[item.code] + ',' + item.gameId;
									gameList[codeList.indexOf(item.code)].push(item);
								}
							} else {
								if(isJC == 0) {
									codeList.unshift("isJC");
									gameList.unshift([item]);
								} else {
									gameList[codeList.indexOf('isJC')].push(item);
								}
							}

						});
						gameList.map(function(item) {
							item.sort(function(a, b) {
								return a.gameId - b.gameId
							})
						});
						//将二维数组转为一维数组
						gameList = [].concat.apply([], gameList);
						data.body = gameList;

						that.types = data.body;

						that.types.map(function(item, index) {
							if(that.variety.name.length == 0) {
								that.variety.list.push([item]);
								that.variety.name.push(item.codeName);
							} else if(that.variety.name.indexOf(item.codeName) != -1) {
								var outIndex = that.variety.name.indexOf(item.codeName);
								that.variety.list[outIndex].push(item);

							} else {
								that.variety.list.push([item]);
								that.variety.name.push(item.codeName);
							}
						});
					}
				},
				error: function(msg) {}
			}
			this.base.callAuthApi(obj);
		},
		//点击选择类型
		selectType: function(gameId,id) {
			this.type = gameId;
			this.datas = [];
			this.page = 1;
			if(id==1){
				this.move();
				$('#'+gameId).siblings().removeClass("choose_yes").addClass('choose_no');
				$('#'+gameId).parents('li').siblings('li:first-child').removeClass("choose_yes").addClass('choose_no');
				$('#'+gameId).addClass("choose_yes").removeClass('choose_no').parents('li').siblings().children('ul').find('li').removeClass("choose_yes").addClass('choose_no');
				$("#selectType").hide();
				$("#type").removeClass("flag");
				var selectType = $('#'+gameId).children('i').text();
				$("#showType").val(selectType);
			}
			this.getdatas();
		},
		//点击全部时间
		allTime: function() {
			this.startTime = '';
			this.endTime = '';
			this.outOfThrity = 0;
			this.datas = [];
			this.page = 1;
			this.getdatas();
		},
		//点击今日执行
		now: function() {
			var dateTime = new Date();
			dateTime.setTime(dateTime.getTime());
			var s2 = dateTime.getFullYear() + "-" + this.getzf(dateTime.getMonth() + 1) + "-" + this.getzf(dateTime.getDate());
			this.startTime = s2 + " " + "00:00:00";
			this.endTime = s2 + " " + "23:59:59";
			this.outOfThrity = 0;
			this.datas = [];
			this.page = 1;
			this.getdatas();
		},
		//点击昨日执行
		yes: function() {
			var dateTime = new Date();
			dateTime.setTime(dateTime.getTime() - 24 * 60 * 60 * 1000);
			var s1 = dateTime.getFullYear() + "-" + this.getzf(dateTime.getMonth() + 1) + "-" + this.getzf(dateTime.getDate());
			this.startTime = s1 + " " + "00:00:00";
			this.endTime = s1 + " " + "23:59:59";
			this.outOfThrity = 0;
			this.datas = [];
			this.page = 1;
			this.getdatas();
		},
		//点击本周执行
		week: function() {
			var dateTime = new Date(),
				st = this.getDateTime(0),
				et = dateTime.getFullYear() + "-" + this.getzf(dateTime.getMonth() + 1) + "-" + this.getzf(dateTime.getDate());
			this.startTime = st + " " + "00:00:00";
			this.endTime = et + " " + "23:59:59";
			this.outOfThrity = 0;
			this.datas = [];
			this.page = 1;
			this.getdatas();
		},
		//点击本月执行
		month: function() {
			var dateTime = new Date(),
				st = this.getDateTime(4),
				et = dateTime.getFullYear() + "-" + this.getzf(dateTime.getMonth() + 1) + "-" + this.getzf(dateTime.getDate());
			this.startTime = st + " " + "00:00:00";
			this.endTime = et + " " + "23:59:59";
			this.outOfThrity = 0;
			this.datas = [];
			this.page = 1;
			this.getdatas();
		},
		//点击上月执行
		lastMonth: function() {
			this.startTime = '';
			this.endTime = '';
			this.outOfThrity = 1;
			this.datas = [];
			this.page = 1;
			this.getdatas();
		},
		//日期设置
		getDateTime: function(index) {
			var now = new Date(); //当前日期
			var nowDayOfWeek = now.getDay(); //今天本周的第几天
			var nowDay = now.getDate(); //当前日
			var nowMonth = now.getMonth(); //当前月
			var nowYear = now.getYear(); //当前年
			nowYear += (nowYear < 2000) ? 1900 : 0; //
			var lastMonthDate = new Date(); //上月日期
			lastMonthDate.setDate(1);
			lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
			var lastYear = lastMonthDate.getYear();
			var lastMonth = lastMonthDate.getMonth();

			//格式化日期：yyyy-MM-dd
			function formatDate(date) {
				var myyear = date.getFullYear();
				var mymonth = date.getMonth() + 1;
				var myweekday = date.getDate();
				if(mymonth < 10) {
					mymonth = "0" + mymonth;
				}
				if(myweekday < 10) {
					myweekday = "0" + myweekday;
				}
				return(myyear + "-" + mymonth + "-" + myweekday);
			}

			//获得某月的天数
			function getMonthDays(myMonth) {
				var monthStartDate = new Date(nowYear, myMonth, 1);
				var monthEndDate = new Date(nowYear, myMonth + 1, 1);
				var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
				return days;
			}

			//获得本季度的开始月份
			function getQuarterStartMonth() {
				var quarterStartMonth = 0;
				if(nowMonth < 3) {
					quarterStartMonth = 0;
				}
				if(2 < nowMonth && nowMonth < 6) {
					quarterStartMonth = 3;
				}
				if(5 < nowMonth && nowMonth < 9) {
					quarterStartMonth = 6;
				}
				if(nowMonth > 8) {
					quarterStartMonth = 9;
				}
				return quarterStartMonth;
			}

			//获得本周的开始日期
			function getWeekStartDate() {
				var weekStartDate = new Date(nowYear, nowMonth, nowDay + 1 - nowDayOfWeek);
				return formatDate(weekStartDate);
			}

			//获得本周的结束日期
			function getWeekEndDate() {
				var weekEndDate = new Date(nowYear, nowMonth, nowDay + (7 - nowDayOfWeek));
				return formatDate(weekEndDate);
			}

			//获得上周的开始日期
			function getLastWeekStartDate() {
				var weekStartDate = new Date(nowYear, nowMonth, nowDay + 1 - nowDayOfWeek - 7);
				return formatDate(weekStartDate);
			}

			//获得上周的结束日期
			function getLastWeekEndDate() {
				var weekEndDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);
				return formatDate(weekEndDate);
			}

			//获得本月的开始日期
			function getMonthStartDate() {
				var monthStartDate = new Date(nowYear, nowMonth, 1);
				return formatDate(monthStartDate);
			}

			//获得本月的结束日期
			function getMonthEndDate() {
				var monthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowMonth));
				return formatDate(monthEndDate);
			}

			//获得上月开始时间
			function getLastMonthStartDate() {
				var lastMonthStartDate = new Date(nowYear, lastMonth, 1);
				return formatDate(lastMonthStartDate);
			}

			//获得上月结束时间
			function getLastMonthEndDate() {
				var lastMonthEndDate = new Date(nowYear, lastMonth, getMonthDays(lastMonth));
				return formatDate(lastMonthEndDate);
			}

			//获得本季度的开始日期
			function getQuarterStartDate() {
				var quarterStartDate = new Date(nowYear, getQuarterStartMonth(), 1);
				return formatDate(quarterStartDate);
			}

			//或的本季度的结束日期
			function getQuarterEndDate() {
				var quarterEndMonth = getQuarterStartMonth() + 2;
				var quarterStartDate = new Date(nowYear, quarterEndMonth,
					getMonthDays(quarterEndMonth));
				return formatDate(quarterStartDate);
			}

			if(index == 0) {
				var k = getWeekStartDate();
				return k
			} else if(index == 1) {
				var k = getWeekEndDate();
				return k
			} else if(index == 2) {
				var k = getLastWeekStartDate();
				return k
			} else if(index == 3) {
				var k = getLastWeekEndDate();
				return k
			} else if(index == 4) {
				var k = getMonthStartDate();
				return k
			} else if(index == 5) {
				var k = getMonthEndDate();
				return k
			} else if(index == 6) {
				var k = getLastMonthStartDate();
				return k
			} else if(index == 7) {
				var k = getLastMonthEndDate();
				return k
			}
		},
		//补0
		getzf: function(num) {
			if(parseInt(num) < 10) {
				num = '0' + num;
			}
			return num;
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
			if(to.name == "bettingRecord") {
				this.$nextTick(function() {
					$(".has-more").html("");
					// this.datas = [];
					// this.page=1;
					//  this.getdatas(this.$route.path)
					$('#noMessage').hide();
//					$("#selectType .all").trigger("click");
					//  this.selectType();
					this.get_ConfigureResult();
					//  this.getdatas();
					this.getTypes();
					this.initDom();
					this.getdatas();
					if(from.name == 'agencyCenter') {
						this.isAgency = 1;
					} else {
						this.isAgency = 0;
					}
				})
			} else if(from.name == "bettingRecord") {
				$(window).off("scroll");
				//$("body").css("overflow", "auto")
//				this.getTypes();
//				if(!$("#selectType").is(":hidden")) {
//					$("#showType").trigger("click");
//					//$("body").css("overflow", "auto")
//				} else if(!$("#selectDate").is(":hidden")) {
//					$("#showDate").trigger("click");
//					//$("body").css("overflow", "auto")
//				}

			}

		}
	},
}
