export default {
	// el: '#main',
	name: 'footFundDetails',
	data() {
		return {
			datas: [],
			types: [],
			coinOperateType: '',
			outOfThrity: '',
			startTime: '',
			endTime: '',
			fundDetails: '',
			totalPage: 1, //总页数
			page: 1, //默认请求的页码-默认第1页
			coinUnit: '元',
			mo: '',

      status:'',
		}
	},
	created: function() {
		this.coinUnit = JSON.parse(localStorage.getItem('config')).coinUnit;
		this.getdatasMes();
		//			 $("body").css("padding-top", "3.66rem");

	},

	mounted: function() {
    this.initDom();
		this.clickDate();

		// if(this.status == 1){
    //   $("#showType").val('充值记录');
    // }
    // if(this.status == 2){
    //   $("#showType").val('提现记录');
    // }
		$("#section").css({
			overflow:'scroll',
			height:$("#container").height()-44-$("#protitle").height()-$(".chooseType").height()-10+"px"
		})
	},
	//利用ajax来查询记录列表
	methods: {
    initDom(){
      localStorage.outOfThrity = 0;
      //实现滚动条无法滚动
      this.mo = function (e) {
        e.preventDefault();
      };
      this.mo = function (e) {
        e.preventDefault();
      };

      this.loadMorePage();
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
		/***取消滑动限制***/
		move: function() {
			$('#background_gray').hide();
			document.body.style.overflow = ''; //出现滚动条
			document.removeEventListener("touchmove", this.mo, false);
		},
		/***禁止滑动***/
		stop: function() {
			$('#background_gray').show();
			document.body.style.overflow = 'hidden';
			document.addEventListener("touchmove", this.mo, false); //禁止页面滑动
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
				}
				$("#selectDate").hide();
				$("#date").removeClass("flag");
			});
			$("#selectType li").click(function() {
				_this.move();
				$(this).addClass("choose_yes").removeClass('choose_no').siblings().removeClass("choose_yes").addClass('choose_no');
				$("#selectType").hide();
				$("#type").removeClass("flag");
				var selectType = $(this).text();
				$("#showType").val(selectType);
			});
			$('#background_gray').click(function() {
				_this.move();
				$('#selectType').hide();
				$('#selectDate').hide();
				$("#date").removeClass("flag");
				$("#type").removeClass("flag");
			})
		},
		getdatasMes: function() {
			var _this = this;
			var uname = localStorage.getItem("userName");
      _this.status = this.$route.params.status;
			var data = {
				'coinOperateType': _this.coinOperateType,
				'outOfThrity': _this.outOfThrity,
				'startTime': _this.startTime,
				'endTime': _this.endTime,
				'pageIndex': this.page,
				'pageNum': 15,
				//'pageSize':1,
			};
			if(this.page <= this.totalPage) {
				var obj = {
					type: 'post',
					data: data,
					dataType: 'json',
					// url: '/authApi/bets/getCapitalDetailsList',
					url: '/authApi/bets/getNewCapitalDetailsList',
					success: function(data) {
						if(data.code == 200) {
							_this.totalPage = data.body.pageSize;
							var arr = [];
							arr = data.body.list;
							for(var i = 0; i < arr.length; i++) {
								_this.datas.push(arr[i]);
							}
							$("#section").show();
							$("#noMessage").hide();

							//判断交易类型
							for(var i = 0; i < _this.datas.length; i++) {
								_this.datas[i].amount = parseFloat(_this.datas[i].amount).toFixed(2);
							}
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
		//查看详情
		clickMes: function(index) {
			this.fundDetails = this.datas[index];
			localStorage.setItem('fundDetails', JSON.stringify(this.fundDetails));
			this.$router.push({
				name: 'deposit',
			})
		},
		//点击选择类型
		selectType: function(id) {
			this.coinOperateType = id;
			this.datas = [];
			this.page = 1;
			this.getdatasMes();
		},
		//点击全部时间
		allTime: function() {
			this.startTime = '';
			this.endTime = '';
			this.outOfThrity = 0;
			this.datas = [];
			this.page = 1;
			this.getdatasMes();
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
			this.getdatasMes();
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
			this.getdatasMes();
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
			this.getdatasMes();
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
			this.getdatasMes();
		},
		//点击上月执行
		lastMonth: function() {
			this.startTime = '';
			this.endTime = '';
			this.outOfThrity = 1;
			this.datas = [];
			this.page = 1;
			this.getdatasMes();
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
						var scrollHeight = $("#section").height(); //获取内容高度。
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
					$("#section").scroll(function() {
						toUpdate.loadmore($(this));
					})
				}
			};
			toUpdate.init();
		},
  },
  watch:{
    '$route'(to, from) {
      if (to.name =="footFundDetails"){
        this.selectType('');
        $("#showType").val("全部类型");
        this.initDom();
      } else if (from.name =="footFundDetails"){

        $(window).off("scroll")
      }
    }
  }

}
