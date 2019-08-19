export default{
	name: "qbhh",
  data() {
    return {
		playType: 25,
        playTypeName:"胜负",
        playTypeNameList:["混合投注","胜负","让分胜负","大小分","胜分差"],
		dealData: [], //存储处理后的数据列表
		tzArea_dataList: [], //展开的胜分差投注数据项
		selectDataList: [], //存儲投注的數據
		nowSfcIndexs: "",
		nowSfcIndex: "",
		sfcTzAreaList: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

		tzType_free: [], //投注类型--自由过关
		tzType_freeList: [], //投注类型--自由过关
		tzType_freeShow: [0, 0, 0, 0, 0, 0, 0, 0], //已选择投注类型对应
		tzType_free_html: "", //投注类型显示--自由过关

		tzType_group: [], //投注类型--组合过关
		tzType_groupList: [], //投注类型--组合过关

		user_state: "游客", //用户状态
		coin: 0, //钱包可用钱数
		singleMaxSum: "", //投注金额上限
		multiple: 1, //倍数
		tz_sumNum: 1, //投注注数
		coinUnit:"元",//金额单位

		minList: [], //每场比赛最小赔率列表
		maxList: [], //每场比赛最大赔率列表
		min: 0, //最小奖金
		max: 0, //最大奖金
		totalNum: 0,

		leagueNameList: [], //联赛名列表
		league_signNumList: [],
		league_indexList: [],

		noDataListReturn: false, //请求数据是否为空
		sharkTime:"",//随机的定时器
		isLoading:"true",//是否正在加载数据
		isRefresh:false,//判断是否刷新了数据
		isSelectDataChange:false,//数据是否被改变

		saveAllDataList:{
			sf:[],
			rf:[],
			dxf:[],
			sfc:[],
			hh:[],
		},//存储上一次数据，用于数据比较刷新
        allDataNameList:{
            sf:["home_win", "home_lose"],
            rf:["letscore_win","letscore_lose"],
            dxf:["big_score", "small_score"],
            sfc:["win1_5", "win6_10", "win11_15", "win16_20", "win21_25", "win26", "lose1_5", "lose6_10", "lose11_15", "lose16_20", "lose21_25", "lose26"],
            hh:["home_win", "home_lose","letscore_win","letscore_lose","big_score", "small_score","win1_5", "win6_10", "win11_15", "win16_20", "win21_25", "win26", "lose1_5", "lose6_10", "lose11_15", "lose16_20", "lose21_25", "lose26"],
        },//对应的字段名

        allLeagueNameList:{
        	sf:[],
          rf:[],
          dxf:[],
          sfc:[],
          hh:[],
        },//对应联赛名筛选
        countTimingNum:20000
      }
	},
	created: function() {
		var savePlayType = parseInt(localStorage.backAim_tz);
		if(savePlayType > 23&&savePlayType < 29) {
			this.playType = savePlayType;
		} else {
			localStorage.backAim_tz = this.playType;
		}
        this.playTypeName=this.playTypeNameList[this.playType-24];
//      this.get_userState();
this.getSysConfig();
		this.load(this.playType);
    this.startCountWorker();
    this.pullToRefresh.setNowThis(this);
	},
	mounted: function() {
		this.initDom();
        $(document).on('click', function(event) {
            if($(".gameplayArea").is(":visible")===true&&!$(event.target).is('.gameplaySelect .btn') && $(event.target).parents('.gameplayArea').length === 0) {
                $('.gameplaySelect .btn').trigger('click');
            }
        });
        this.initFn();
	},
	methods: {
    //路由跳转返回
    routerBack: function () {
      if (localStorage.turnPathName && localStorage.turnPathName != "login"&&!localStorage.userName) {
        // this.$router.push({ name: localStorage.turnPathName });
        this.$router.go(-1)
      } else {
        this.$router.push({ name: "index" });
      }

    },
    pulldownRefresh(_this) {
      _this.changeLoad(_this.playType, 1, 2);
      _this.get_userState(1);
    },
    initFn:function(){
      // if (localStorage.app_flag != undefined) {
      //   var _this=this;
      //   //mui.init({
      //     pullRefresh: {
      //       container: '#pullrefresh', //下拉容器
      //       down: {
      //         style: 'circle', //下拉刷新样式
      //         offset: '50px',
      //         range: '200px', //可选 默认100px,控件可下拉拖拽的范围
      //         callback: pulldownRefresh //刷新后执行的函数
      //       }
      //     }
      //   })

      //   function pulldownRefresh() {
      //     var that=this;
      //     setTimeout(function () {
      //       _this.changeLoad(_this.playType, 1, 2);
      //       _this.get_userState(1);
      //       // this.endPullupToRefresh(false);
      //       mui('#pullrefresh').pullRefresh().endPulldown(false);
      //     }, 1500)
      //   }
      // }
      //摇一摇功能实现
      if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', deviceMotionHandler, false);
      } else {
        _this.tips("您的设备不支持位置感应", "", 0);
      }
      var SHAKE_THRESHOLD = 2500;
      var last_update = 0;
      var x, y, z, last_x, last_y, last_z;
      function deviceMotionHandler(eventData) {
        var acceleration = eventData.accelerationIncludingGravity;
        var curTime = new Date().getTime();
        if ((curTime - last_update) > 100) {

          var diffTime = curTime - last_update;
          last_update = curTime;
          x = acceleration.x;
          y = acceleration.y;
          z = acceleration.z;
          var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;
          if (speed > SHAKE_THRESHOLD) {
            _this.sharkitFn();
          }
          last_x = x;
          last_y = y;
          last_z = z;
        }
      }
    },
        //打开投注选项卡
        openGameplayArea:function(event){
        	if(!$(".selectContent").is(":hidden")){
					return
				}
            if(event!==1){
                event=event.currentTarget;
                if($(event).is('.isOpen')){
                    return
                }
                $(event).addClass('isOpen');
                $(event).toggleClass('openArea');
                $(event).children('.triangle').toggleClass("reversal");
                $(event).parent().find('.gameplayArea').slideToggle();
                if($(event).is('.openArea')){
                	 $('.iDialogWrap').addClass('heightZIndex');
                }else{
                	 $('.iDialogWrap').removeClass('heightZIndex');
                }

                setTimeout(function(){
                    $(event).removeClass('isOpen');
                },500);

            }else{
                $(".gameplaySelect .btn").trigger('click');
            }
        },
		//获取登录状态
    get_userState: function (isRefresh) {
			var that = this,
				userNameMsg = localStorage.userName;


      if ((userNameMsg && that.coin === 0) || (userNameMsg &&isRefresh)) {
				that.isLogin=true;
				var getUserInfo = {
						type: "post",
						url: "/authApi/getCoin",
						async: false,
						data: {
							"username": localStorage.getItem("userName"),
							isWhite:true
						},
						success: function success(data) {
							if(data.code == 200) {
									that.coin = (parseFloat(data.body.coin)).toFixed(2);
								that.user_state = "钱包:" + that.coin + that.coinUnit +"(可用)";
							}
						}
					};

				this.base.callAuthApi(getUserInfo);
			}
		},
		getSysConfig:function(){
			var that=this,
				getSingleMaxSum = {
						type: "post",
						url: "/commonAPI/privacy/getSysConfigureResult",
						data: {},
						success: function(data) {
							if(data.code == 200) {
								if(data.body.coinUnit){
									that.coinUnit=data.body.coinUnit;
								}
								that.singleMaxSum = data.body.singleMaxSum;
								localStorage.config = JSON.stringify(data.body);

							}
						},
					},
					config = localStorage.config ? JSON.parse(localStorage.config) : '';
				 if(!config) {
					this.base.callCommonApi(getSingleMaxSum);
				} else {
					if(config.coinUnit){
						that.coinUnit=config.coinUnit;
					}
					that.singleMaxSum = config.singleMaxSum;
				}
		},
		//页面跳转--返回
      // goback_click:function(){
      //   	if(localStorage.app_flag == undefined) {
      //        this.$router.push({ name: "index" });
			// } else {
			// 	var h = plus.webview.getLaunchWebview(); //获取首页窗口
			// 	localStorage.renovate = 1; //存入变量控制首页刷新
			// 	mui.fire(h, 'refresh'); //传值给首页执行的方法名
			// 	setTimeout(function() { //延迟关闭本窗口，目的是给首页足够的刷新时间做判断是展开哪个页面.
			// 		var ws = plus.webview.currentWebview();
			// 		plus.webview.close(ws);
			// 	}, 500)
			// }
      //   },
		//点击帮助
		togohelp: function() {
      localStorage.singTo = this.$route.name;
      this.$router.push({ name: "sgHelp" });
			// if(localStorage.app_flag == undefined) {
      //   // window.location.href = 'help.html';
      //   localStorage.singTo = this.$route.path;
      //   this.$router.push({ path: "./help" });
			// } else {
			// 	mui.openWindow({
			// 		url: 'help.html',
			// 		id: 'help',
			// 		styles: {
			// 			top: base.getStatusbarHeight() + 'px',
			// 			bottom: 0
			// 		},
			// 		show: {
			// 			autoShow: true, //页面loaded事件发生后自动显示，默认为true
			// 			aniShow: 'slide-in-bottom', //页面显示动画，默认为”slide-in-right“；
			// 			duration: '200' //页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
			// 		},
			// 		createNew: true
			// 	})
			// }
		},
		//获得时间---毫秒数
		getMilliseconds: function(str) {
			str = str.replace(new RegExp("-", "gm"), "/");
			return new Date(str).getTime(); //得到毫秒数
		},
		//获得时间---显示的日期时间
		getDate: function(str) {
			var that = this,
				list = [],
				oDate = new Date(str),
				now = new Date(),
				isNow = true,
				nowDate = new Date(now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate() + ' ' + '12:00:00'),
				weekList = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
				oTime = oDate.getFullYear() + "-" + that.getzf(oDate.getMonth() + 1) + "-" + that.getzf(oDate.getDate()) + " " + weekList[oDate.getDay()]; //最后拼接时间
			oDate.getTime() < nowDate.getTime() && (isNow = false);
			list.isNow = isNow;
			list.oTime = oTime;
			list.headTime = oDate.getFullYear() + "" + that.getzf(oDate.getMonth() + 1) + "" + that.getzf(oDate.getDate());
			return list;
		},
		//补0
		getzf: function(num) {
			if(parseInt(num) < 10) {
				num = '0' + num;
			}
			return num;
		},
		//得到截止时间(比赛时间-10分钟)
		getDeadline: function(millisecond) {
			//			var milli = new Date(millisecond - 600000),
			var milli = new Date(millisecond),
				hour = milli.getHours(),
				minutes = milli.getMinutes(),
				sum = parseInt(hour) * 60 + parseInt(minutes);
			return sum;
		},
		//判断是否为一天的数据
		isOneDay: function(dataTime) {
			var that = this,
				str = dataTime.replace(new RegExp("-", "gm"), "/"),
				oDate = new Date(str),
				weekList = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
				oYear = oDate.getFullYear(),
				oMonth = oDate.getMonth() + 1,
				oDay = oDate.getDate(),
				str = oYear + "/" + oMonth + "/" + oDay + " " + "12:00:00",
				str1,
				tz_startTime = new Date(str).getTime(),
				tz_endTime = "",
				oTime = []; //投注开始时间
			if(oDate.getTime() < tz_startTime) {
				oDate.setDate(oDay - 1); //日期加一天
				oYear = oDate.getFullYear();
				oMonth = oDate.getMonth() + 1;
				oDay = oDate.getDate();
				str = oYear + "/" + oMonth + "/" + oDay + " " + "12:00:00";
				tz_endTime = new Date(str).getTime(); //投注截止时间
				oTime.push(tz_endTime, tz_startTime);
			} else {
				oDate.setDate(oDay + 1); //日期加一天
				oYear = oDate.getFullYear();
				oMonth = oDate.getMonth() + 1;
				oDay = oDate.getDate(),
					str1 = oYear + "/" + oMonth + "/" + oDay + " " + "12:00:00";
				tz_endTime = new Date(str1).getTime(); //投注截止时间
				oTime.push(tz_startTime, tz_endTime);
			}

			return oTime;
		},
		//获得所有联赛名和处理
		getAllMatchName: function(data) {
			var that = this,
				obj = that.dataStore.allMatchNameList,
				obj1 = that.dataStore.allMatchIdList,
				matchIdList = [];
			matchIdList.push(data.match_id);
			if(obj.length == 0) {
				obj.push(data.league_name);
				obj1.push(matchIdList);
			} else {
				for(var i = 0, len = obj.length; i < len; i++) {
					if(obj[i] == data.league_name) {
						obj1[i].push(data.match_id);
						break;
					} else if(i == obj.length - 1) {
						obj.push(data.league_name);
						obj1.push(matchIdList);
						break;
					}
				}
			}
		},
		//清空数据
		clearAllData: function() {
			var dataStore = {
					prevDataList: [], //记录选择的比赛
					itemList: [], //记录每场比赛的让球数
					isHave: false, //判断数组prevDataList是否已有该比赛的选择项
					isSelect: false, //判断数组prevDataList是否已选择该比赛
					indexList: [], //记录串场类型
					selectList: [], //记录每场比赛选择项的数量
					sumNum: 0, //投注的注数
					bzbList: [], //记录5大块的赔率
					minBonus: 0, //最小奖金
					maxBonus: 0, //最大奖金
					tzType: [1], //串场类型
					prevLen: 0, //记录数组是否变化
					matchIdList: [], //机选储存
					isShark: '', //是否在摇动
					goLogin: false, //是否跳到登录页面
					allMatchNameList: [], //储存所有联赛名
					allMatchIdList: [], //联赛相对应的比赛Id
					allMatchIndexList: [], //存储选择了的联赛下标
					minList: [], //储存计算出的最小值的数组
					maxList: [], //储存计算出的最大值的数组
					leagueNum_change: {
						dt_dateTime: [],
						matchNum: []
					}, //存储dt的时间属性和对应的比赛场数
					//页面对照显示
					selectBfNameList: ["1:0", "2:0", "2:1", "3:0", "3:1", "3:2", "4:0", "4:1", "4:2", "5:0", "5:1", "5:2", "胜其他", "0:0", "1:1", "2:2", "3:3", "平其他", "0:1", "0:2", "1:2", "0:3", "1:3", "2:3", "0:4", "1:4", "2:4", "0:5", "1:5", "2:5", "负其他"],
					selectBqcNameList: ["胜胜", "胜平", "胜负", "平胜", "平平", "平负", "负胜", "负平", "负负"],

				},
				all = 0,
				index = 0,
				bzbList = [];
			this.dataStore = {};
			this.dataStore = dataStore,
				this.openAll = "",
				this.all = 0,
				this.index = 0,
				this.bzbList = [];
		},
		//数据截取---长度限制
		dataLenLimit:function(data,playType){
//			var sfList=["home_win", "home_lose"],
//				rfList=["letscore_win","letscore_lose"],
//				dxfList=["big_score", "small_score"],
//				sfcList=["win1_5", "win6_10", "win11_15", "win16_20", "win21_25", "win26", "lose1_5", "lose6_10", "lose11_15", "lose16_20", "lose21_25", "lose26"],
//				hhList=["home_win", "home_lose","letscore_win","letscore_lose","big_score", "small_score","win1_5", "win6_10", "win11_15", "win16_20", "win21_25", "win26", "lose1_5", "lose6_10", "lose11_15", "lose16_20", "lose21_25", "lose26"];
        var that=this,list=that.allDataNameList,typeName="hh";
        	switch (playType){
        		case 24:
        			typeName="hh";
        			break;
        		case 25:
        			typeName="sf";
        			break;
        		case 26:
        			typeName="rf";
        			break;
        		case 27:
        			typeName="dxf";
        			break;
        		case 28:
        			typeName="sfc";
        			break;
        	}
        	list=list[typeName];
        		for(var i = 0, len = data.length; i < len; i++) {
						var item = data[i];
						item.deadline_bet = item.deadline_bet.slice(0, 19);
						item.league_name = item.league_name.replace(/[1-9]*[-][1-9]+/, '').replace(/[1-9]*$/, "");
						item.sessions = item.sessions.slice(item.sessions.length - 3, item.sessions.length);
						item.home_team_name=item.home_team_name.substring(0,5);
						item.away_team_name=item.away_team_name.substring(0,5);

						for(var j=0,len1=list.length;j<len1;j++){
							var obj=list[j];
							if(item[obj]){
								item[obj]=parseFloat(item[obj]).toFixed(2);
								item[obj]==="0.00"&&(item[obj]="");
							}
						}

						if(this.getMilliseconds(item.deadline_bet) < (new Date()).getTime()) {
							data.splice(i, 1);
							len = data.length;
							i--;
						}
					}

		},
		//对加载的数据进行处理
		ddTemp: function(data, playType) {
			var that = this;
			//			//console.log(that);
			that.dataLenLimit(data, playType);
			if(data.length == 0) {
				return []
			}
			//场次排序
			data.sort(function(a, b) {
				return a.sessions - b.sessions;
			});
			var allList = {},
				lightBox = [],
				htmlList = [],
				dataList = [],
				reg = /^[a-zA-Z]/;
			for(var i = 0, len = data.length; i < len; i++) {
				if(data[i].sessions) {
					var checkList = {},
						light = {},
						obj = data[i],
						html = '',
						list = [],
						mdh = that.getMilliseconds(obj.deadline_bet),
						now = new Date(),
						isNowList = "",
						//数据是否过期
						endTimeMinutes = that.getDeadline(mdh);
					obj.hours = Math.floor(endTimeMinutes / 60),
						//显示的小时数
						obj.minutes = that.getzf(Math.floor(endTimeMinutes % 60));
					//显示的分钟数
					//********************************
					//模板设置
					checkList.dateTime = that.isOneDay(obj.deadline_bet);
					isNowList = that.getDate(checkList.dateTime[0]); //校验时间
					//					if(isNowList.isNow) {
					//						that.getAllMatchName(obj);
					checkList.titleDateTime = isNowList.oTime;

					//						that.dataStore.matchIdList.push(obj.match_id);
					list.push(obj);
					checkList.dataList = list;
					if(dataList == null || dataList == '') {
						//							var leagueNum_change = obj.match_id;
						//							that.dataStore.leagueNum_change.dt_dateTime.push(leagueNum_change.replace(reg, "").substring(0, 8));
						dataList.push(checkList);
					} else {
						for(var j = 0, len1 = dataList.length; j < len1; j++) {
							if(dataList[j].dateTime[0] == checkList.dateTime[0]) {
								dataList[j].dataList.push(obj);
								break;
							}
						}
						if(j == dataList.length) {
							//								var leagueNum_change = obj.match_id;
							//								that.dataStore.leagueNum_change.dt_dateTime.push(leagueNum_change.replace(reg, "").substring(0, 8));
							dataList.push(checkList);
						}
					}
					//					}
				}
			}
			//数据时间排序
			dataList.sort(function(a,b){return a.dateTime[0]-b.dateTime[0]});
			//数据比对
			that.comparison_loadDataList(playType,dataList);
//			that.dealData = dataList;
			$('#competition-screen .competition-total').html(data.length);
		},
		//获得所有联赛名和处理
		getAllLeagueName: function(data) {
			var that = this,
				leagueName = data.league_name,
				len1 = that.leagueNameList.length;
			if(len1 == 0) {
				that.leagueNameList.push(leagueName);
				that.league_signNumList.push([data.signNum]);
				that.league_indexList.push(1);
				return 0
			} else {
				for(var i = 0; i < len1; i++) {
					var obj = that.leagueNameList[i];
					if(obj == leagueName) {
						that.league_signNumList[i].push(data.signNum);
						return i;
					} else if(i == len1 - 1) {
						that.league_indexList.push(1);
						that.league_signNumList.push([data.signNum]);
						that.leagueNameList.push(leagueName);
						return len1;
					}
				}
			};

		},
		//加载数据
		load: function(playType) {
			this.isLoading=true;
			var that = this,
				getData = {
					type: "post",
					contentType: "application/json",
					url: "/commonAPI/getMatchInfoByPlayId",
					data: {
						"playTypeId": playType
					},
					dataType: "json",
					success: function(data) {
						that.isLoading=false;
						//console.log(data);
						if(data.code == 200) {
							if(data.body.length > 0) {
								that.ddTemp(data.body, playType);
								if(that.dealData.length == 0) {
									that.noDataListReturn = true;
								}else{
                  that.noDataListReturn = false;
                }
							} else {
								that.noDataListReturn = true;
							}
						} else {
							that.noDataListReturn = true;
						}
						$('.iDialogWrap').removeClass('heightZIndex');
					}
				};
//			that.get_userState();
			this.base.callCommonApi(getData);
		},
		//加载数据比对
        comparison_loadDataList:function(playType,dataList){
			var that=this,list=that.saveAllDataList,typeName="hh",typeNamelist=[],ischange=false;
            switch (playType){
				case 24:
					typeName="hh";
					break;
				case 25:
                    typeName="sf";
					break;
				case 26:
					typeName="rf";
					break;
				case 27:
					typeName="dxf";
					break;
				case 28:
					typeName="sfc";
					break;
			}
            typeNamelist=that.allDataNameList[typeName];
            if(list[typeName].length!==0){
//          	dataList[0].dataList.splice(0,1);
//						that.dealData = list[typeName];
//						去除过期数据
						for(var i=0;i<dataList.length;i++){
							//删除隔天过期数据----可去除（应当不会发生）
							if(dataList[i].titleDateTime!==list[typeName][i].titleDateTime){
                                list[typeName][i].titleDateTime.splice(i,1);i--;
							}else{
								//删除当天更新的过期数据
								for(var j=0;j<dataList[i].dataList.length;j++){
									var obj1=dataList[i].dataList[j],//新数据
										obj2=that.dealData[i].dataList[j];//旧数据
									if(obj1.match_id!==obj2.match_id){
										that.dealData[i].dataList.splice(j,1);
										ischange=true;
										j--;
									}else{
										break;
									}
								}
							}
						}
						//更新新数据
						for(var i=0;i<dataList.length;i++){
							for(var j=0;j<dataList[i].dataList.length;j++){
								var obj=dataList[i].dataList[j];//新数据
								for(var m=0;m<typeNamelist.length;m++){
									var item=obj[typeNamelist[m]];
									if(item){
										that.dealData[i].dataList[j][typeNamelist[m]]=item;
//										m==0&&(that.dealData[i].dataList[j][typeNamelist[m]]="")
										if(!that.isSelectDataChange&&that.dealData[i].dataList[j][typeNamelist[m]]!==item){
											that.isSelectDataChange=true;
										}
									}else{
										that.dealData[i].dataList[j][typeNamelist[m]]="";
									}
								}
							}
						}
						if(ischange){
							that.leagueNameList = [],
							that.league_signNumList = [],
							that.league_indexList = [];
							//给每个数据加标识
							for(var i = 0, len = dataList.length; i < len; i++) {
								for(var j = 0, len1 = dataList[i].dataList.length; j < len1; j++) {
									var obj = dataList[i].dataList[j];
									obj.signNum = i + "" + j;
									obj.leagueIndex = that.getAllLeagueName(obj);
								}
							}
							that.allLeagueNameList[typeName].leagueNameList=that.leagueNameList;
							that.allLeagueNameList[typeName].league_signNumList=that.league_signNumList;
							that.allLeagueNameList[typeName].league_indexList=that.league_indexList;
						}
						list[typeName]=that.dealData;
						if($(".selectContent").is(":hidden")){
              that.checkUpdateSelectData(playType);
						}
					}else{
						that.leagueNameList = [],
						that.league_signNumList = [],
						that.league_indexList = [];
						//给每个数据加标识
						for(var i = 0, len = dataList.length; i < len; i++) {
							for(var j = 0, len1 = dataList[i].dataList.length; j < len1; j++) {
								var obj = dataList[i].dataList[j];
								dataList[i].dataList[j].signNum = i + "" + j;
								dataList[i].dataList[j].leagueIndex = that.getAllLeagueName(obj);
							}
						}

                        that.dealData = dataList;
                        list[typeName]=dataList;
                        that.allLeagueNameList[typeName].leagueNameList=that.leagueNameList;
						that.allLeagueNameList[typeName].league_signNumList=that.league_signNumList;
						that.allLeagueNameList[typeName].league_indexList=that.league_indexList;
					}
		},
		//改变玩法
		changeLoad: function(playType, event,index) {
			var that=this;
			if(this.isLoading){
				return
			}
			if(playType == this.playType&&index!==2) {
				this.openGameplayArea(1);
				return
			}

			if(this.playType !== playType){
				this.dealData=[];
        this.clearData(playType);
				$('.iDialogWrap').addClass('heightZIndex');
				document.documentElement.scrollTop=0;
			}
			var typeName="hh",list=this.saveAllDataList;
			switch (playType){
				case 24:
					typeName="hh";
					break;
				case 25:
                    typeName="sf";
					break;
				case 26:
					typeName="rf";
					break;
				case 27:
					typeName="dxf";
					break;
				case 28:
					typeName="sfc";
					break;
			}
			if(list[typeName].length>0&&playType != that.playType){
				that.dealData = list[typeName];
				that.leagueNameList=that.allLeagueNameList[typeName].leagueNameList;
				that.league_signNumList=that.allLeagueNameList[typeName].league_signNumList;
				that.league_indexList=that.allLeagueNameList[typeName].league_indexList;
			}
			localStorage.backAim_tz = playType;
//			$('.iDialogWrap').addClass('heightZIndex');
			that.load(playType);
			if(this.playType !== playType){
        that.playType = playType;
				this.leagueScreen_selectAll();
			}


			if(that.dealData.length !== 0) {
				that.noDataListReturn=false;
			}
			if(index!==2){
				this.openGameplayArea(1);
			}
//			document.documentElement.scrollTop=0;
		},
		//混合与单关切换
		shift_hh_dg: function(event, index) {
			event = event.currentTarget;
			var that = this;
			$('.goNext .close').trigger('click');
			$(event).parent().children('.active').removeClass('active');
			$(event).addClass('active');
			that.clearData();
			if(index == 1) {
				that.changeLoad(25, 1);
				//				that.setDom_temp(24, 1);
//				$('.bar-tab a.active').removeClass('active');
//				$('.bar-tab a:first').addClass('active');
			} else {
				that.changeLoad(29, 1);
				//				that.setDom_temp(29, 1);
//				$('.bar-tab a.active').removeClass('active');
//				$('.bar-tab a:first').addClass('active');
			}
		},
		//初始化
    initDom: function() {
			var ow = document.documentElement.clientWidth,
				oh = document.documentElement.clientHeight,
				w = document.documentElement.clientWidth,
				h = document.documentElement.clientHeight,
				liLen = $('ul.gametype li').length,
				num = 0,that=this,
				headerH = $('#header').height();
			$('.iDialogWrap').css('width', ow).css('height', oh);
			//	设置bdy的margin-bottom
			$('body').css('margin-bottom', $('.bet-bottom').height()  + 'px');
			//设置点o击下一步弹出框样式
			$('#showSelectContent').css('width', ow).css('height', oh);
//			$('.match-table').css('margin-bottom', '6.66rem');
//			$('.match-table').css('margin-bottom', $('.bet-bottom').height()+'px');
			$('div.selectContent').css('margin-top', $('.header').height() + 'px').css('margin-bottom', $('.goNext').height() + 'px');
			//设置最小高度，匹配左右移动
			$('#mainContent').css("min-height", h - headerH  - $('.bet-bottom').height() + 'px');
			switch(this.playType) {
				case 2:
				case 4:
				case 10:
				case 12:
					$('#sharkit').addClass('hide');
					break;
				default:
					$('#sharkit').removeClass('hide');
					break;
			}

			//初始化画布
			$("#coverRandow").attr("width",$("#mainContent").width());
			$("#coverRandow").attr("height",$("#mainContent").height());

			//记录一个dd投注区的高度
			that.randowLimit={};
			that.randowLimit.ddH=$("#mainContent dl:first dd:first").height();
			//记录头部的高度
			that.randowLimit.headerH=headerH;
			//记录一个dt头部的高度
			that.randowLimit.dtH=$("#mainContent dl:first dt:first").height();

		},
		//**********展开胜分差的投注区域************
		unfold_tzArea: function(indexs, index) {
			var that = this;
			that.tzArea_dataList = that.dealData[indexs].dataList[index];
			that.nowSfcIndexs = indexs;
			that.nowSfcIndex = index;
			that.sfcTzAreaList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
			//			for(var i=0;i<that.sfcTzAreaList.length;i++){
			//				this.$set(that.sfcTzAreaList, i, 0);
			//			}
			//			$(".iDialogMain .game-listBody .col.betbtn.active").removeClass('active');
			for(var i = 0, len = that.selectDataList.length; i < len; i++) {
				var item = that.selectDataList[i];
				if(item.match_id == that.tzArea_dataList.match_id) {
					if(item.sfc) {
						for(var j = 0, len2 = item.sfc.length; j < len2; j++) {
							var obj = item.sfc[j];
							this.$set(that.sfcTzAreaList, obj, 1);
						}
					} else {
						break
					}
				}
			};
			for(var i = 0, len = that.sfcTzAreaList.length; i < len; i++) {
				var item = that.sfcTzAreaList[i];
				if(item == 1) {
					$('#iDialogContent .represent .options-block .col.betbtn[data-index=' + i + ']').addClass('active');
				} else {
					$('#iDialogContent .represent .options-block .col.betbtn[data-index=' + i + ']').removeClass('active');
				}
			}

			that.middleDisplacement($('div.iDialog'));
			$('.iDialogWrap').css('z-index', 10000);
			$('.iDialogLayout').css('display', 'block');
			$('body').css('overflow', "hidden");
		},
		//展开胜分差的投注区域--确认
		confirm_tzArea: function() {
			var sfcNameList = ["主胜1-5", "主胜6-10", "主胜11-15", "主胜16-20", "主胜21-25", "主胜26", "客胜1-5", "客胜6-10", "客胜11-15", "客胜16-20", "客胜21-25", "客胜26"],
				html = "",
				that = this,
				num = 0;
			$('.iDialog').css('display', 'none');
			$('.iDialogLayout').css('display', 'none');
			$('.iDialogWrap').css('z-index', -1);
			$('body').css('overflow', "auto");
			for(var i = 0; i < 12; i++) {
				var item = that.sfcTzAreaList[i];
				if(item == 1) {
					html += sfcNameList[i] + " ";
					num++;
					if(num >= 4) {
						html += "..."
						break
					}
				}
			}
			if(html == "") {
				html = "点击展开胜分差投注选项";
				$('.match-item.represent[data-index=' + that.tzArea_dataList.match_id + '] .betbtn.more-option.ellipsis').html(html);
				$('.match-item.represent[data-index=' + that.tzArea_dataList.match_id + '] .betbtn.more-option.ellipsis').removeClass('active');
			} else {
				$('.match-item.represent[data-index=' + that.tzArea_dataList.match_id + '] .betbtn.more-option.ellipsis').html(html);
				$('.match-item.represent[data-index=' + that.tzArea_dataList.match_id + '] .betbtn.more-option.ellipsis').addClass('active');
			}

		},
		//展开胜分差的投注区域--取消
		cancel_tzArea: function() {
			var that = this,
				html = "点击展开胜分差投注选项";
			$('.iDialog').css('display', 'none');
			$('.iDialogLayout').css('display', 'none');
			$('.iDialogWrap').css('z-index', -1);
			$('body').css('overflow', "auto");
			$('.match-item.represent[data-index=' + that.tzArea_dataList.match_id + '] .betbtn.more-option.ellipsis').html(html);
			$('.match-item.represent[data-index=' + that.tzArea_dataList.match_id + '] .betbtn.more-option.ellipsis').removeClass('active');
			that.sfcTzAreaList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
			for(var i = 0, len = that.selectDataList.length; i < len; i++) {
				var item = that.selectDataList[i];
				if(item.match_id == that.tzArea_dataList.match_id) {
					item.sfc = [];
					item.sfcOdds = [];
				}
			}
			that.clearEmptyData();

		},
		//联赛弹出框
		openLeagueArea: function() {
			if(!$(".selectContent").is(":hidden")){
					return
				}
			var ow = document.documentElement.clientWidth;
			var oh = document.documentElement.clientHeight;
			$('#competition-screen').css('display', 'block').css('width', ow).css('height', oh).css('position', 'fixed').css('top', 0).css('left', 0).css('z-index', 10000);
			this.middleDisplacement($('#competition-screen>.screen-content'));
			$('#competition-screen>.screen-content').css('width', '23rem');
			$('body').css('overflow', "hidden");
		},
		//联赛名点击事件
		leagueScreen_click: function(event, index) {
			event = event.currentTarget;
			$(event).toggleClass('active');
			var that = this;
			if(that.league_indexList[index] == 1) {
				this.$set(that.league_indexList, index, 0);
			} else {
				this.$set(that.league_indexList, index, 1);
			};
			that.countSelectLeague();
		},
		//联赛区域----全选
		leagueScreen_selectAll: function() {
			var that = this,
				len = that.league_indexList.length;
			for(var i = 0; i < len; i++) {
				this.$set(that.league_indexList, i, 1);
			}
			$('.screnn-main .competition-option>li').addClass('active');
			that.countSelectLeague();
		},
		//联赛区域----反选
		leagueScreen_selectReversal: function() {
			var that = this,
				selectbtnList = $('.screnn-main .competition-option>li'),
				len = that.league_indexList.length;
			for(var i = 0; i < len; i++) {
				if(that.league_indexList[i] == 1) {
					this.$set(that.league_indexList, i, 0);
				} else {
					this.$set(that.league_indexList, i, 1);
				}
			};
			for(var i = 0, len = selectbtnList.length; i < len; i++) {
				if(selectbtnList[i].className == '') {
					selectbtnList[i].className = "active";
				} else {
					selectbtnList[i].className = '';
				}
			}
			that.countSelectLeague();
		},
		//计算筛选后比赛数量
		countSelectLeague: function() {
			var that = this,
				selectLeagueNum = 0;
				that.clearSelect_Data();
			//页面头部
			for(var i = 0, len = that.dealData.length; i < len; i++) {
				var obj = that.dealData[i].dataList,
					matchNum = obj.length;
				for(var j = 0, len2 = obj.length; j < len2; j++) {
					var item = obj[j].leagueIndex;
					if(that.league_indexList[item] == 0) {
						matchNum--;
					}
				}
				$('#mainContent .match-divider[data-index=' + i + '] .match-num').html(matchNum + "场");
			}
			//赛事筛选比赛统计
			for(var i = 0, len = that.league_indexList.length; i < len; i++) {
				if(that.league_indexList[i] == 1) {
					selectLeagueNum += that.league_signNumList[i].length;
				}
			}
			$('#competition-screen .competition-total').html(selectLeagueNum);
		},
		//联赛区域----确定
		leagueScreen_confirm: function() {
			$('#competition-screen').css('display', 'none');
			$('body').css('overflow', "auto");
		},
		//跳转到详情页
		skip_detail: function(match_id) {
      var that=this;
			if(match_id) {
        localStorage.setItem("basketMatchId", match_id);
        that.$router.push({ name: "basketDetail" });
				// if(localStorage.app_flag == undefined) {
        //   this.$router.push({ path: "./basketDetail" });
				// 	// mui.openWindow({
				// 	// 	url: '../rx9/basket_detail.html',
				// 	// 	id: 'detail',
				// 	// 	show: {
				// 	// 		autoShow: true, //页面loaded事件发生后自动显示，默认为true
				// 	// 		aniShow: 'pop-in', //页面显示动画，默认为”slide-in-right“；
				// 	// 		duration: '200' //页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
				// 	// 	},
				// 	// 	createNew: true
				// 	// })
				// } else {
				// 	mui.openWindow({
				// 		url: '../rx9/basket_detail.html',
				// 		id: 'detail',
				// 		styles: {
				// 			top: base.getStatusbarHeight() + 'px',
				// 			bottom: 0
				// 		},
				// 		show: {
				// 			autoShow: true, //页面loaded事件发生后自动显示，默认为true
				// 			aniShow: 'pop-in', //页面显示动画，默认为”slide-in-right“；
				// 			duration: '200' //页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
				// 		},
				// 		createNew: true
				// 	})
				// }
				//window.location.href = "../rx9/detail.html";
			} else {
				mui.toast('暂无详情数据', {
					duration: 'long',
					type: 'div'
				})
			}
		},
		//头部dt折叠
		fold_dtHeader: function(event) {
			event = event.currentTarget;
			if($(event).is('.close')) {
				$(event).removeClass('close');
				$(event).children('i.match-foldBtn.arrow-ico').css('transform', 'rotate(45deg)');
				$(event).parents('.match-list').removeClass('hideOneDay');
			} else {
				$(event).addClass('close');
				$(event).children('i.match-foldBtn.arrow-ico').css('transform', 'rotate(-135deg)');
				$(event).parents('.match-list').addClass('hideOneDay');
			}
		},
		//投注项点击
		tzItem_click: function(event, indexs, index, type, num) {
			event = event.currentTarget;
      var that = this, isHave = false;
      if (that.selectDataList && that.selectDataList.length != 0) {
        that.selectDataList.map(function (item) {
          if (that.dealData[indexs].dataList[index].match_id == item.match_id) {
            isHave = true;
          }
        });
      }
			if($(event).is('.unable')){
				return
      } else if (that.selectDataList.length == 15 && !isHave){
				that.tips('一次选择最多不超过15场', '', 0);
				return
			}
			$(event).toggleClass('active');
			if(type == 'sfc') {
				if($(event).is('.active')) {
					this.sfcTzAreaList[num] = 1;
				} else {
					this.sfcTzAreaList[num] = 0;
				}
			}
			var obj = that.dealData[indexs].dataList[index],
				selectItemList = {
					//比赛id
					match_id: obj.match_id,
					signNum: obj.signNum,
					letScore: obj.let_score,
					indexs:indexs,
					index:index,
				},
				nameList = "",
				selectItem = type,
				selectItemOdds = type + "Odds",
				sfNameList = ["home_win", "home_lose"],
				rfNameList = ["letscore_win", "letscore_lose"],
				dxfNameList = ["big_score", "small_score"],
				sfcNameList = ["win1_5", "win6_10", "win11_15", "win16_20", "win21_25", "win26", "lose1_5", "lose6_10", "lose11_15", "lose16_20", "lose21_25", "lose26"];
			switch(type) {
				case 'sf':
					nameList = sfNameList;
					break;
				case 'rf':
					nameList = rfNameList;
					break;
				case 'dxf':
					nameList = dxfNameList;
					break;
				case 'sfc':
					nameList = sfcNameList;
					break;
			};
			selectItemList[selectItem] = [num];
			selectItemList[selectItemOdds] = [parseFloat(obj[nameList[num]])];
			if(that.selectDataList.length == 0) {
				that.selectDataList.push(selectItemList)
			} else {
				for(var i = 0, len = that.selectDataList.length; i < len; i++) {
					var item = that.selectDataList[i];
					if(item.match_id == selectItemList.match_id) {
						if(item[selectItem] && item[selectItem].length != 0) {
							for(var j = 0, len1 = item[selectItem].length; j < len1; j++) {
								var signNum = item[selectItem][j];
								if(signNum == num) {
									item[selectItem].splice(j, 1);
									item[selectItemOdds].splice(j, 1);
									break;
								} else if(j == len1 - 1) {
									item[selectItem].push(num);
									item[selectItemOdds].push(selectItemList[selectItemOdds][0]);
									break;
								}
							}
						} else {
							item[selectItem] = selectItemList[selectItem];
							item[selectItemOdds] = selectItemList[selectItemOdds];
						}
						break;
					} else if(i == len - 1) {
						that.selectDataList.push(selectItemList);
						break;
					}
				}
			}
			that.clearEmptyData();
		},
		//清除为空的数据
		clearEmptyData: function() {
			var that = this;
			for(var i = 0, len = that.selectDataList.length; i < len; i++) {
				var obj = that.selectDataList[i],
					num = 0;
				if(obj.sf) {
					num += obj.sf.length;
				}
				if(obj.rf) {
					num += obj.rf.length;
				}
				if(obj.dxf) {
					num += obj.dxf.length;
				}
				if(obj.sfc) {
					num += obj.sfc.length;
				}
				if(num == 0) {
					that.selectDataList.splice(i, 1);
					if(that.selectDataList.length == 0 || i == len - 1) {
						break;
					}
					i--;
				}
			}
			that.minList = [], //每场比赛最小赔率列表
				that.maxList = [];
		},
		//清空按钮
		clearSelectData: function() {
			var that = this;
			mui.confirm(' ', '清除所选赛事', ['确定', '取消'], function(e) {
					if(e.index == 1) {
						return
					} else {
						that.clearSelect_Data();
					}
				})

		},
		//清空数据
		clearSelect_Data:function(){
			var that=this;
			that.selectDataList = [];
						that.min = 0;
						that.max = 0;
						that.maxList = [];
						that.minList = [];
						$('#mainContent .options-block .betbtn.active').removeClass('active');
						$('.match-item.represent .betbtn.more-option.ellipsis.active').html("点击展开胜分差投注选项");
						$('.match-item.represent .betbtn.more-option.ellipsis.active').removeClass('active');
		},
		//底部按钮
		bottom_click: function() {
			if(this.isLoading){
				return
			}
			var that = this,
				playType = that.playType, //玩法类型
				len = that.selectDataList.length,
				html = "",
				maxLen = len, //限制串数
				lenList = [], //用于统计计算投注金额
        hasSfc = false, typeName = "", typeOddName = "", typeName1 = "", typeOddName1="",
				userNameMsg = localStorage.userName;
				$('.goNext .paymentBtn').addClass('disabled');
				if(!that.isLogin){
					that.get_userState();
				}
//			if(userNameMsg && that.coin === 0) {
//				var getUserInfo = {
//						type: "post",
//						url: "/authApi/AutoLoginGetUserinfoByRedis",
//						async: false,
//						data: {
//							"username": localStorage.getItem("userName")
//						},
//						success: function success(data) {
//							if(data.code == 200) {
//								that.coin = (parseFloat(data.body.COIN) - parseFloat(data.body.FCION)).toFixed(2);
//								that.user_state = "钱包:" + that.coin + that.coinUnit +"(可用)";
//							}
//						}
//					};
//
//				this.base.callAuthApi(getUserInfo);
//			}
			switch (playType){
				case 24:
					typeName="hh";
					break;
				case 25:
                    typeName="sf";
					break;
				case 26:
					typeName="rf";
					break;
				case 27:
					typeName="dxf";
					break;
				case 28:
					typeName="sfc";
					break;
			}
			typeOddName=typeName+"Odds";
			list=that.allDataNameList[typeName];
			for(var i=0;i<len;i++){
				var indexs=that.selectDataList[i].indexs,
						index=that.selectDataList[i].index;
				if(typeName==="hh"){
					var list2=["sf","rf","dxf","sfc"];
					for(var m=0;m<4;m++){
						typeName1=list2[m];
						typeOddName1=list2[m]+"Odds";
						list=that.allDataNameList[typeName1];
						if(that.selectDataList[i][typeName1]){
							for(var j=0,len1=that.selectDataList[i][typeName1].length;j<len1;j++){
								var itemIndex=that.selectDataList[i][typeName1][j];
								that.selectDataList[i][typeOddName1][j]=parseFloat(that.dealData[indexs].dataList[index][list[itemIndex]]);
							}
						}

					}
				}else{
					for(var j=0,len1=that.selectDataList[i][typeName].length;j<len1;j++){
						var itemIndex=that.selectDataList[i][typeName][j];
						that.selectDataList[i][typeOddName][j]=parseFloat(that.dealData[indexs].dataList[index][list[itemIndex]]);
					}
				}

			}
			if(that.isSelectDataChange){
				that.isSelectDataChange=false;
				that.min="";
				that.max="";
				that.minList=[];
				that.maxList=[];
			}
			if(len > 1 || (playType > 28 && len == 1)) {
				$('.goNext').removeClass('hide');
				$('.goNext .box-header').text('已经选择' + len + '场比赛');
				for(var i = 0; i < that.selectDataList.length; i++) {
					var obj = that.selectDataList[i];
					if(obj.sfc) {
						if(obj.sfc.length != 0) {
							hasSfc = true;
						}
					}
				};
				if(hasSfc) {
					maxLen > 4 && (maxLen = 4);
				} else {
					maxLen > 8 && (maxLen = 8);
				}
				if(playType > 28) {
					maxLen = 1;
				}
				if(that.tzType_free.length <= 1) {
					that.tzType_free = [maxLen];
					that.min="";
					that.max="";
					that.maxList=[];
					that.minList=[];
					that.tzType_freeShow[maxLen - 1] = 1;
					$(".method-wrap .method.active").removeClass('active');
					$(".method-wrap .method[data-index="+maxLen+"]").addClass('active');
				}
				that.tzType_freeList = [];
				for(var i = 0; i < maxLen; i++) {
					if(i == 0 && playType > 28) {
						html = "单关";
					} else if(i != 0) {
						html = (i + 1) + "串1";
					}
					if(html != "") {
						that.tzType_freeList.push(html);
					}
				}
				html = "";
				for(var i = 0, len1 = that.tzType_free.length; i < len1; i++) {
					if(i == 2) {
						html += "...";
						break
					}
					if(i != len1 - 1) {
						if(that.tzType_free[i] == 1) {
							html += "单关+";
						} else {
							html += that.tzType_free[i] + "串1+";
						}
					} else {
						if(that.tzType_free[i] == 1) {
							html += "单关";
						} else {
							html += that.tzType_free[i] + "串1";
						}
					}
				}
				that.tzType_free_html = html;
				//弹出已经显示的元素
				var parentId = [],
					firstEle = 0;
				$("#showSelectContent>.selectContent>.selectMain").html('');
				for(var i = 0, len1 = that.selectDataList.length; i < len1; i++) {
					var obj = that.selectDataList[i],
						list = [],
						str1 = obj.signNum.substring(0, 1);
					list.push(obj.signNum);
					if(parentId.length == 0) {
						parentId.push(list);
					} else {
						for(var j = 0, len2 = parentId.length; j < len2; j++) {
							var str2 = parentId[j][0].substring(0, 1);
							if(str1 == str2) {
								parentId[j].push(obj.signNum);
								break;
							} else if(j == len2 - 1) {
								parentId.push(list);
							}
						}
					}
				}
				//投注单顺序调整（从小到大）
				for(var i = 0, len1 = parentId.length; i < len1; i++) {
					var str1 = parentId[i][0].substring(0, 1);
					parentId[i] = parentId[i].sort(function(a, b) {
						return a - b;
					});
					$('#mainContent .match-divider[data-index=' + str1 + ']').clone(true).appendTo("#showSelectContent>.selectContent>.selectMain");
					for(var j = 0, len2 = parentId[i].length; j < len2; j++) {
						$('#mainContent .match-item[data-sign=' + parentId[i][j] + ']').clone(true).appendTo("#showSelectContent>.selectContent>.selectMain");
					}

				}

				$('body').css('overflow', 'hidden');
				$('#showSelectContent').removeClass('hide');
				$('#showSelectContent').addClass('heightZIndex');
			} else {
				if(playType > 28) {
					that.tips("请选择至少一场比赛", "", 0)
				} else {
					that.tips("请选择至少两场比赛", "", 0)
				}
				return
			}

			//计算投注金额
			for(var i = 0, len1 = that.selectDataList.length; i < len1; i++) {
				var item = that.selectDataList[i],
					num = 0;
				if(item.sf) {
					num += item.sf.length;
				}
				if(item.rf) {
					num += item.rf.length;
				}
				if(item.dxf) {
					num += item.dxf.length;
				}
				if(item.sfc) {
					num += item.sfc.length;
				}
				lenList.push(num);
			}
			that.tz_sumNum = that.calculateNum(that.tzType_free, lenList);
			//计算奖金
			if(window.Worker) {
				that.startWorker(that.playType);
			} else {
				that.calculateMinMaxBonus(that.selectDataList, that.tzType_free);
			}
		},
		//自由过关区域--打开
		freeArea_open: function(event) {
			event = event.currentTarget;
			$(event).children('.arrow-ico').toggleClass('reversal');
			$(event).parents('.count').next().slideToggle('hide');
		},
		//关闭按钮
//		close_click: function() {
//			$('.goNext').addClass('hide');
//			$('.bottom-box .btn-confirm').removeClass('hide');
//			$('.iDialogLayout').css('display', 'none');
//			$('.iDialogWrap').removeClass("heightZIndex");
//			//隐藏被选中的元素
//			$('#showSelectContent').addClass('hide');
//			$('#showSelectContent').removeClass('heightZIndex');
//			//$('body').css('overflow', 'auto');
//			$('#loading_wait').removeClass('show');
//		},
		//改变倍数
		changeMultiple: function(event, num) {
			var that = this;
			if(event != 1) {
				event = event.currentTarget;
				$(event).parent().children('.active').removeClass('active');
				$(event).addClass('active');
				that.multiple = parseInt(num);
			} else {
				$('.goNext .fixMultiple .active').removeClass('active');
				if(that.multiple + parseInt(num)!=0){
                    that.multiple = that.multiple + parseInt(num);
				}
			}
		},
		//串场点击
		tzTypeFreeList_click: function(event, item) {
			var that = this,
				num = parseInt(item == "单关" ? 1 : item),
				len = that.tzType_free.length,
				lenList = [];
			if(len == 0) {
				that.tzType_free.push(num)
			} else {
				for(var i = 0; i < len; i++) {
					if(num == that.tzType_free[i]) {
						that.tzType_free.splice(i, 1);
						break;
					} else if(i == len - 1) {
						that.tzType_free.push(num);
						break;
					}
				}
			}
			that.tzType_free.sort(function(a, b) {
				return a - b
			});
			event = event.currentTarget;
			$(event).toggleClass('active');
			//计算投注金额
			for(var i = 0, len1 = that.selectDataList.length; i < len1; i++) {
				var item = that.selectDataList[i],
					num = 0;
				if(item.sf) {
					num += item.sf.length;
				}
				if(item.rf) {
					num += item.rf.length;
				}
				if(item.dxf) {
					num += item.dxf.length;
				}
				if(item.sfc) {
					num += item.sfc.length;
				}
				lenList.push(num);
			}
			that.tz_sumNum = that.calculateNum(that.tzType_free, lenList);
			that.min = 0; //最小奖金
			that.max = 0; //最大奖金
			//计算奖金
			if(window.Worker) {
				that.startWorker(that.playType);
			} else {
				that.calculateMinMaxBonus(that.selectDataList, that.tzType_free);
			}
		},
		//底部右上角关闭按钮
		goNext_close_click:function(){
			$('.goNext').addClass('hide');
			$('.bottom-box .btn-confirm').removeClass('hide');
			$('.iDialogLayout').css('display', 'none');
			$('.iDialogWrap').removeClass("heightZIndex");
			//隐藏被选中的元素
			$('#showSelectContent').addClass('hide');
			$('#showSelectContent').removeClass('heightZIndex');
			//$('body').css('overflow', 'auto');
			$('#loading_wait').removeClass('show');
			//检查更新后的数据是否为空
      this.checkUpdateSelectData(this.playType);
		},
		//检查更新后的数据是否为空---赔率是否为空
    checkUpdateSelectData: function (playType){
			var that = this,list1=["sf","rf","dxf","sfc"],typeName,typeNameOdds;
			if(!that.isRefresh){
				that.isRefresh=false;
				return
			}
			for(var i = 0, len = that.selectDataList.length; i < len; i++) {
				var obj = that.selectDataList[i],
					num = 0,
					list=[],
					indexs=that.selectDataList[i].indexs,
					index=that.selectDataList[i].index;
				for(var m=0;m<list1.length;m++){
					typeName=list1[m],
					typeNameOdds=typeName+"Odds";
					if(obj[typeName]) {
						if(obj[typeName].length==0&&playType==24){
							delete that.selectDataList[i][typeName];
							delete that.selectDataList[i][typeNameOdds];
						}else{
							list=that.allDataNameList[typeName];
							for(var j=0,len1=obj[typeName].length;j<len1;j++){
								var itemIndex=obj[typeName][j];
								var item=that.dealData[indexs].dataList[index][list[itemIndex]];
								if(item==0){
									obj[typeNameOdds].splice(j,1);
									obj[typeName].splice(j,1);
									that.showAreaData_change(that.selectDataList[i],itemIndex,playType);
									j--;
									if(len1==1){
										break;
									}
									len1=len1-1;
								}
							}
							num += obj[typeName].length;
						}
					}
				}
				if(num == 0) {
					that.selectDataList.splice(i, 1);
					if(that.selectDataList.length == 0 || i == len - 1) {
						break;
					}
					i--;
					len=len-1;
				}
			}
			that.isRefresh=false;
		},
		//计算显示投注数据----比分，半全场，混合
    showAreaData_change: function (dataList, index, playType){
      // return
			var html = "",
				that = this,
				sfcNameList = ["主胜1-5", "主胜6-10", "主胜11-15", "主胜16-20", "主胜21-25", "主胜26", "客胜1-5", "客胜6-10", "客胜11-15", "客胜16-20", "客胜21-25", "客胜26"],
				// playType=that.playType,
				len=0,
				typeName="",
				list1="",
				html_noSelect="",
				areaNameList="",
				num = 0;
			switch (playType){
				case 24:
					len=12;
					areaNameList=sfcNameList;
					typeName="sfc";
					html_noSelect="点击展开胜分差投注选项";
					break;
				case 28:
					len=12;
					areaNameList=sfcNameList;
					typeName="sfc";
					html_noSelect="点击展开胜分差投注选项";
					break;
				default:
					return;
					break;
			}
			if(dataList[typeName]){num+=dataList[typeName].length}
			if(num===0) {
				html = "点击展开胜分差投注选项";
				$('.match-item.represent[data-index=' + that.tzArea_dataList.match_id + '] .betbtn.more-option.ellipsis').html(html_noSelect);
				$('.match-item.represent[data-index=' + that.tzArea_dataList.match_id + '] .betbtn.more-option.ellipsis').removeClass('active');
			} else {
				html=areaNameList[index]+" ";
				html_noSelect=$('.match-item.represent[data-index=' + dataList.match_id + '] .betbtn.more-option.ellipsis').html();
				html_noSelect=html_noSelect.replace(html,'');
				$('.match-item.represent[data-index=' + that.tzArea_dataList.match_id + '] .betbtn.more-option.ellipsis').html(html_noSelect);
			}
 		},
		//公用函数进行位置中间位移
		middleDisplacement: function(e) {
			var screenW = e.width();
			var screenH = e.height();
			e.css('visibility', 'visible').css('top', '50%').css('left', '50%').css('margin-left', -screenW / 2 + 'px').css('margin-top', -screenH / 2 + 'px').css('display', 'block');
		},
		//立即付款--点击事件
		payment_click: function(event) {
			event = event.currentTarget;
			var that = this;
			if(that.user_state == "游客") {
				localStorage.loginTo = "../quizzesBasket/qbhh";
				localStorage.backAim_tz = that.playType;
        // that.tips("请先登录", "../loginIn/login.html", 1);
        that.tips("请先登录", "login", 1);
			} else {
				if($(event).is('.disabled') || $(event).is('.isDisabled')) {
					return
				} else {
					$(event).addClass('disabled');
				}
				$('.iDialogWrap').removeClass('heightZIndex').css('z-index', '100000');
//				if(that.singleMaxSum != "") {
					that.get_login();
//				} else {
//					var getSingleMaxSum = {
//						type: "post",
//						url: "/commonAPI/privacy/getSysConfigureResult",
//						data: {},
//						success: function(data) {
//							if(data.code == 200) {
//								that.singleMaxSum = data.body.singleMaxSum;
//								that.get_login();
//							} else {
//								that.tips(data.msg, "", 3);
//							}
//						},
//					};
//					this.base.callCommonApi(getSingleMaxSum);
//				}

			}

		},
		//清除数据
		clearData: function(playType) {
			var that = this;
//			that.dealData = [], //存储处理后的数据列表
				that.tzArea_dataList = [], //展开的胜分差投注数据项
				that.selectDataList = [], //存儲投注的數據
				that.nowSfcIndexs = "",
				that.nowSfcIndex = "",
				that.sfcTzAreaList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

				that.tzType_free = [], //投注类型--自由过关
				that.tzType_freeList = [], //投注类型--自由过关
				that.tzType_freeShow = [0, 0, 0, 0, 0, 0, 0, 0], //已选择投注类型对应
				that.tzType_free_html = "", //投注类型显示--自由过关

				that.tzType_group = [], //投注类型--组合过关
				that.tzType_groupList = [], //投注类型--组合过关

				that.multiple = 1, //倍数
				that.tz_sumNum = 1, //投注注数

				that.minList = [], //每场比赛最小赔率列表
				that.maxList = [], //每场比赛最大赔率列表
				that.min = 0, //最小奖金
				that.max = 0, //最大奖金

//				that.leagueNameList = [],
//				that.league_signNumList = [],
//				that.league_indexList = [],

				that.noDataListReturn = false; //请求数据是否为空
			$('#mainContent .match-item .options-block .col.betbtn.active').removeClass('active');
      $('#competition-screen .competition-option li').addClass('active');
      if(playType==24||playType==28){
        $('#mainContent .match-item .betbtn.more-option.ellipsis').html('点击展开胜分差投注选项');
			  $('#mainContent .match-item .betbtn.more-option.ellipsis.active').removeClass('active');
      }

		},
		//清除投注数据
		clearTzData: function() {
			var that = this;
			that.tzArea_dataList = [], //展开的胜分差投注数据项
				that.selectDataList = [], //存儲投注的數據
				that.nowSfcIndexs = "",
				that.nowSfcIndex = "",
				that.sfcTzAreaList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				that.tzType_free = [], //投注类型--自由过关
				that.tzType_freeList = [], //投注类型--自由过关
				that.tzType_freeShow = [0, 0, 0, 0, 0, 0, 0, 0], //已选择投注类型对应
				that.tzType_free_html = "", //投注类型显示--自由过关

				that.tzType_group = [], //投注类型--组合过关
				that.tzType_groupList = [], //投注类型--组合过关

				that.multiple = 1, //倍数
				that.tz_sumNum = 1, //投注注数

				that.minList = [], //每场比赛最小赔率列表
				that.maxList = [], //每场比赛最大赔率列表
				that.min = 0, //最小奖金
				that.max = 0; //最大奖金
//				that.coin = 0;
			$('#mainContent .match-item .options-block .betbtn.active').removeClass('active');
			// $('#mainContent .match-item .betbtn.more-option.ellipsis').html('点击展开胜分差投注选项');
			// $('#mainContent .match-item .betbtn.more-option.ellipsis.active').removeClass('active');
      $('#competition-screen .competition-option li').addClass('active');
      if (that.playType == 24 || that.playType == 28) {
        $('#mainContent .match-item .betbtn.more-option.ellipsis').html('点击展开胜分差投注选项');
        $('#mainContent .match-item .betbtn.more-option.ellipsis.active').removeClass('active');
      }
		},
		//开始一个时间worker
		startCountWorker: function() {
			var that = this;
			var timing = 8,
        countNum = 0;
			that.countTiming = setInterval(function() {
					// countNum += 1;
					// if(countNum >= timing) {
        // clearInterval(that.countTiming);
            // that.startCountWorker();
        that.countTimingNum-=1000;
        if (that.countTimingNum==0){
          that.isRefresh=true;
          that.changeLoad(that.playType, 1,2);
          that.countTimingNum=20000
        }

//						var isUseTime = setTimeout(function() {
//							location.reload();
//						}, 5000);
//						mui.confirm('是否刷新本页面', '确认框', ['确定', '取消'], function(e) {
//							if(e.index == 0) {
//								location.reload();
//							} else {
//								window.clearTimeout(isUseTime);
//							}
//							//console.log(e.index)
//						});
					// }
				}, 1000);
		},
		//开始一个計算worker
		startWorker: function(playType) {
			var index = 0;
			switch(playType) {
				case 24: //混合和单关
				case 29:
					index = 4;
					break;
				case 25:
				case 30:
					index = 0;
					break;
				case 26:
				case 31:
					index = 1;
					break;
				case 27:
				case 32:
					index = 2;
					break;
				case 28:
				case 33:
					index = 3;
					break;
			}
      var worker = new Worker("./static/js/compute/qb_worker.js"),
				that = this,
				data = {
					dataList: that.selectDataList,
					indexList: that.tzType_free,
					minList: that.minList,
					maxList: that.maxList,
					dataType: index,
					//					isSingle: 0,
				};
			worker.postMessage(JSON.stringify(data));
			worker.onmessage = function(evt) { //接收worker传过来的数据函数
				//console.log(evt.data); //输出worker发送来的数据
				var k = JSON.parse(evt.data);
				that.setMaxMin(k.min, k.max);
				that.maxList = k.maxList;
				that.minList = k.minList;
				worker.terminate();
			}
		},
		//得到最大最小进行计算
		setMaxMin: function(min, max) {
			var that = this,
				html = "";
			if(min.toFixed(2) != max.toFixed(2)) {
				that.totalNum = (min * 2 * that.multiple).toFixed(2) + '~' + (max * 2 * that.multiple).toFixed(2);
				that.min = min;
				that.max = max;
			} else {
				that.totalNum = (min * 2 * that.multiple).toFixed(2);
				that.min = min;
				that.max = max;
			}
			$('.goNext .paymentBtn').removeClass('disabled');
		},
		//摇一摇
//		sharkitFn: function() {
//			if(!$(".selectContent").is(":hidden")){
//					return
//				}
//			if(this.dealData.length >0) {
//				var is = 0,
//					_this = $('#sharkit');
//				$('body').css('overflow', 'hidden');
//				if(this.sharkTime!==""){
//					return
//				}
//				$("#audio_shark")[0].play();
//				this.sharkTime = setInterval(function() {
//					if(is % 2 == 0) {
//						$(_this).css({
//							"-ms-transform": "rotate(-50deg)",
//							/* IE 9 */
//							"-moz-transform": "rotate(-50deg)",
//							/* Firefox */
//							"-webkit-transform": "rotate(-50deg)",
//							/* Safari 和 Chrome */
//							"-o-transform": "rotate(-50deg)"
//						});
//					} else {
//						$(_this).css({
//							"-ms-transform": "rotate(0deg)",
//							/* IE 9 */
//							"-moz-transform": "rotate(0deg)",
//							/* Firefox */
//							"-webkit-transform": "rotate(0deg)",
//							/* Safari 和 Chrome */
//							"-o-transform": "rotate(0deg)"
//						});
//					}
//					is++;
//					if(is > 7) {
//						qb_hh.clearSelect_Data();
//						var dataList = qb_hh.league_signNumList,
//							playType = qb_hh.playType,
//							outIndex = 0, //外层随机下标
//							inIndex = 0, //里层随机下标
//							typeIndex = 0, //混合全部和单关全部区分
//							itemIndex = 0; //触发点击的下标
//						for(var i = 0; i < 2; i++) {
//							//找到随机到的数据
//							var outNowIndex=parseInt(Math.random() * dataList.length),
//								inNowIndex= parseInt(Math.random() * dataList[outIndex].length);
//							if(outNowIndex!==outIndex){
//								outIndex=outNowIndex;
//								inIndex = parseInt(Math.random() * dataList[outIndex].length);
//							}else{
//								outIndex=outNowIndex;
//								do{
//									inNowIndex= parseInt(Math.random() * dataList[outIndex].length)
//								}while(inIndex===inNowIndex)
//								inIndex=inNowIndex;
//							}
//							itemIndex = parseInt(Math.random() * 2+1);
//							if(playType == 24 || playType == 29) {
//								typeIndex = parseInt(Math.random() * 3 + 2);
//								itemIndex=itemIndex+1;
//								$('#mainContent .match-item[data-sign=' + dataList[outIndex][inIndex] + '] .options-block>.row:nth-child(' + typeIndex + ') .col.betbtn:nth-child(' + itemIndex + ')').trigger('click');
//							} else {
//								$('#mainContent .match-item[data-sign=' + dataList[outIndex][inIndex] + '] .betbtn:nth-child(' + itemIndex + ')').trigger('click');
//							}
//
//						}
//						window.clearInterval(qb_hh.sharkTime);
//						//$('body').css('overflow', 'auto');
//						setTimeout(function(){
//							qb_hh.sharkTime="";
//						},1000)
//
////						$('#sharkit').on('click', qb_hh.sharkitFn);
//					}
//				}, 100);
//			}
//		},
		sharkitFn: function() {
			if(!$(".selectContent").is(":hidden")){
					return
				}

			if(this.dealData.length >0) {
        var is = 0,that = this,
					_this = $('#sharkit');
				if(that.sharkTime!==""){
					return
				}
				$("#audio_shark")[0].play();
				$('body').css('overflow', 'hidden');
				that.sharkTime = setInterval(function() {
					$(_this).unbind('click');
					if(is % 2 == 0) {
						$(_this).css({
							"-ms-transform": "rotate(-30deg)",
							/* IE 9 */
							"-moz-transform": "rotate(-30deg)",
							/* Firefox */
							"-webkit-transform": "rotate(-30deg)",
							/* Safari 和 Chrome */
							"-o-transform": "rotate(-30deg)"
						});
					} else {
						$(_this).css({
							"-ms-transform": "rotate(0deg)",
							/* IE 9 */
							"-moz-transform": "rotate(0deg)",
							/* Firefox */
							"-webkit-transform": "rotate(0deg)",
							/* Safari 和 Chrome */
							"-o-transform": "rotate(0deg)"
						});
					}
					is++;
					if(is > 7) {
            that.clearSelect_Data();
						var maxNum=0,len=$("#mainContent dl dd").length;
						if(len==1){
							maxNum=1;
						}else if(len==2){
							maxNum=2;
						}else{
							maxNum=3;
						}
            var playType = that.playType,
							randomNumList={
							//dd的随机下标（1-3）
							dI_f:Math.floor(Math.random() * maxNum+1),//+1使得最小为1,范围(1~3)
							dI_s:Math.floor(Math.random() * maxNum+1),//+1使得最小为1,范围(1~3)

						},
						ddH=$("#mainContent dl:first dd:first")[0].clientHeight,
						dtH=$("#mainContent dl:first dt:first").height(),
						headerH=that.randowLimit.headerH,
						scrollH=$("#mainContent").scrollTop(),
						offsetY,
						list=[],
						domList=[],
						rowList=[Math.floor(Math.random() * 2+1),Math.floor(Math.random() * 2+1)],
						colList=[Math.floor(Math.random() * 2),Math.floor(Math.random() * 2)],
						ele1,ele2;


						if(len>1){
							do{
								randomNumList.dI_s=Math.floor(Math.random() * maxNum+1);
							}while(randomNumList.dI_f==randomNumList.dI_s)
						}

						list=[randomNumList.dI_s,randomNumList.dI_f];
//						//console.log(list);
						switch (playType){
							case 25://胜平负
							case 26://让分胜负
							case 27://大小分
								if(scrollH>dtH){
									dtH=0;
								}
								for(var i=0;i<2;i++){
									offsetY=that.randowX(ddH,list[i])+scrollH+dtH+headerH;
									ele1 = document.elementFromPoint(50, offsetY);
									if($(ele1).is(".match-item.represent")){
										domList.push($(ele1).find(".betbtn:nth-child(" + (colList[i]+1) + ")"))

									}else{
										domList.push($(ele1).parents(".match-item.represent").find(".betbtn:nth-child(" + (colList[i]+1) + ")"))
									}
//									//console.log(scrollH+dtH+headerH,offsetY)
//									//console.log(domList)

								}
								that.drawLine(domList);
								break;
							case 24://混合投注
								if(scrollH>dtH){
									dtH=0;
								}
								rowList=[Math.floor(Math.random() * 3+2),Math.floor(Math.random() * 3+2)];
								for(var i=0;i<2;i++){
									offsetY=that.randowX(ddH,i+1)+scrollH+dtH+headerH;
									ele1 = document.elementFromPoint(50, offsetY);
									if($(ele1).is(".match-item.represent")){
										domList.push($(ele1).find(".row:nth-child(" + rowList[i] + ") .betbtn:nth-child(" + (colList[i]+2) + ")"))

									}else{
										domList.push($(ele1).parents(".match-item.represent").find(".row:nth-child(" + rowList[i] + ") .betbtn:nth-child(" + (colList[i]+2) + ")"))
									}
//									//console.log(scrollH+dtH+headerH,offsetY)
//									//console.log(domList)

								}
								that.drawLine(domList);
								break;
						}


            window.clearInterval(that.sharkTime);
//						//$('body').css('overflow', 'auto');
//						setTimeout(function(){
            that.sharkTime="";
//						},1000)
					}
				}, 100);
			}
		},
		randowX:function(offset,index){
			return offset*index-offset/2;
		},
		//画布canvas
		drawLine:function(list){

			var c=document.getElementById("coverRandow"),
				cxt=c.getContext("2d"),
				sharkXY=$("#sharkit").offset(),
				that=this,count=0,
				scrollH=$("#mainContent").scrollTop(),
				headerH=that.randowLimit.headerH;
				for(var i=0;i<list.length;i++){
					if(list[i].length!==0){
						count++;
					}
				}
				if(!count){
					return
				}
			$("body").css("overflow","hidden");
			$("#coverRandow").css("z-index",50);
			$("#coverRandow").show();
			c.height=$("body").height();
			cxt.strokeStyle="#cc1e36";
			cxt.lineWidth = 2;
			for(var i=0;i<list.length;i++){
				if(list[i].length!=0){
					var item=list[i].offset();
					var H = list[i][0].offsetHeight / 2;
					var W = list[i][0].offsetWidth / 2;
					cxt.moveTo(sharkXY.left+28,sharkXY.top+34-headerH);
					cxt.lineTo(item.left+W,item.top+H-headerH);
					cxt.stroke();
				}
			}
			setTimeout(function(){
				for(var i=0;i<list.length;i++){
	    			list[i].trigger('click');
	    		}
				$("#coverRandow").hide();
				$("#coverRandow").css("z-index",-1);
				$("body").css("overflow","auto");
			},600)

		},
		//底部样式修改
		bottomStyle: function() {
			var that = this,
				playType = that.playType,
				len = that.selectDataList.length;
			//根据数组的长度改变底部文字
			if(len == 0) {
				$('.bet-bottom .btn-confirm').html('请选择比赛结果');
				$('.bet-bottom .btn-confirm').attr('data-index', 0);
				$('.bet-bottom .box-center').addClass('hide');
				$('.bet-bottom .bet-help').removeClass('hide');
				$('.bet-bottom .btn-confirm').removeClass('cNext');
			} else if(len == 1 && playType < 29) {
				$('.bet-bottom .btn-confirm').html('请至少选择2场比赛结果');
				$('.bet-bottom .btn-confirm').attr('data-index', 0);
				$('.bet-bottom .box-center').addClass('hide');
				$('.bet-bottom .bet-help').removeClass('hide');
				$('.bet-bottom .btn-confirm').removeClass('cNext');
			} else {
				$('.bet-bottom .match-num').html(len);
				$('.bet-bottom .btn-confirm').attr('data-index', 1);
				$('.bet-bottom .btn-confirm').html('选好了，下一步');
				$('.bet-bottom .btn-confirm').addClass('cNext');
				$('.bet-bottom .bet-help').addClass('hide');
				$('.bet-bottom .box-center').removeClass('hide');
			};
		},
		//判断是否左移动或者右边移动
		contentMove: function(content) {
			var startW,
				endW, left, right, that = this,
				playType = that.playType,
				halfW = document.body.clientWidth / 2;
			switch(playType) {
				case 6:
					left = 6, right = 1;
					break;
				case 7:
					left = 4, right = 8;
					break;
				case 12:
					left = 11, right = 12;
					break;
				default:
					left = playType - 1;
					right = playType + 1;
					break;
			}
			$(content).on({
				touchstart: function(e) {
					var touches = e.touches[0];
					startW = touches.clientX;
				},
				touchend: function(e) {
					var touches = e.touches[0];
					endW = e.changedTouches[0].clientX;
					if(startW <= halfW) {
						if(endW - startW > halfW) {
							that.changeLoad(left, 1);
						}
					} else {
						if(startW - endW > halfW) {
							that.changeLoad(right, 1);
						}
					}
				}
			});
		},
		//比较数组中的数，找出最小
		findListMin: function(list) {
			var min = 0;
			if(list != "") {
				for(var i = 0, len = list.length; i < len; i++) {
					if(list[i] != 0) {
						min == 0 && (min = list[i]);
						if(min > list[i]) {
							min = list[i];
						}
					}
				}
			}
			return min;
		},
		//比较数组中的数，找出最大
		findListMax: function(list) {
			var max = 0;
			if(list != "") {
				for(var i = 0, len = list.length; i < len; i++) {
					if(list[i] != 0) {
						max == 0 && (max = list[i]);
						if(max < list[i]) {
							max = list[i];
						}
					}
				}
			}
			return max;
		},
		//找到数组中最小的几个数
		findListTwoMin: function(list, index) {

			var minList = [],
				min = 1;
			list.sort(function(a, b) {
				return a - b;
			});
			for(var j = 0; j < index; j++) {
				minList.push(list[j]);
			}
			for(var j = 0, len = minList.length; j < len; j++) {
				min = min * minList[j];
			}
			return min;
		},
		//计算最小最大金额
		calculateMinMaxBonus: function(dataList, indexList) {
			var that = this,
				min = 0,
				max = 0,
				minList = that.minList,
				maxList = that.maxList,
				playType = that.playType,
				html = "";
			if(minList.length == 0) {
				switch(playType) {
					case 0: //胜负
						for(var j = 0, len = dataList.length; j < len; j++) {
							var obj = dataList[j];
							minList.push(that.findListMin(obj.sfOdds));
							maxList.push(that.findListMax(obj.sfOdds));
						}
						break;
					case 1: //让分胜平负
						for(var j = 0, len = dataList.length; j < len; j++) {
							var obj = dataList[j];
							minList.push(that.findListMin(obj.rfOdds));
							maxList.push(that.findListMax(obj.rfOdds));
						}
						break;
					case 2: //大小分
						for(var j = 0, len = dataList.length; j < len; j++) {
							var obj = dataList[j];
							minList.push(that.findListMin(obj.dxfOdds));
							maxList.push(that.findListMax(obj.dxfOdds));
						}
						break;
					case 3: //胜分差
						for(var j = 0, len = dataList.length; j < len; j++) {
							var obj = dataList[j];
							minList.push(that.findListMin(obj.sfcOdds));
							maxList.push(that.findListMax(obj.sfcOdds));
						}
						break;
					case 4: //混合过关
						for(var j = 0, len = dataList.length; j < len; j++) {
							var obj = dataList[j],
								list = [0, 0, 0, 0];
							if(obj.sfc) {
								var homeWinList = [],
									homeIndexList = [],
									awayWinList = [],
									awayIndexList = [],

									//主--下标
									homeIndex_min, homeIndex_max,
									//客--下标
									awayIndex_min, awayIndex_max,
									//主--主胜
									homeWin_min = 0,
									homeWin_max = 0,
									//客--客胜
									awayWin_min = 0,
									awayWin_max = 0,
									letScore = parseInt(obj.letScore),
									maxminlist = [],

									//对照数据
									scoreList = [5, 10, 15, 20, 25, 26, 5, 10, 15, 20, 25, 26];
								for(var m = 0, len1 = obj.sfc.length; m < len1; m++) {
									var item = obj.sfc[m];
									if(item > 5) {
										awayIndexList.push(item);
										awayWinList.push(obj.sfcOdds[m]);
									} else {
										homeIndexList.push(item);
										homeWinList.push(obj.sfcOdds[m]);
									}
								}

								homeWin_min = that.findListMin(homeWinList); //主胜--最小
								homeWin_max = that.findListMax(homeWinList); //主胜--最大
								awayWin_min = that.findListMin(awayWinList); //客胜--最小
								awayWin_max = that.findListMax(awayWinList); //客胜--最大
								for(var m = 0; m < homeIndexList.length; m++) {
									if(homeWinList[m] == homeWin_min) {
										homeIndex_min = m;
									}
									if(homeWinList[m] == homeWin_max) {
										homeIndex_max = m
									}
								}
								for(var m = 0; m < awayIndexList.length; m++) {
									if(awayWinList[m] == awayWin_min) {
										awayIndex_min = m;
									}
									if(awayWinList[m] == awayWin_max) {
										awayIndex_max = m;
									}
								};
								//胜负
								if(obj.sf) {
									for(var m = 0, len1 = obj.sf.length; m < len1; m++) {
										if(obj.sf[m] == 0) {
											homeWin_min += obj.sfOdds[m];
											homeWin_max += obj.sfOdds[m];
										} else {
											awayWin_min += obj.sfOdds[m];
											awayWin_max += obj.sfOdds[m];
										}
									}
								};
								//大小分
								if(obj.dxf) {
									homeWin_min += that.findListMin(obj.dxfOdds);
									homeWin_max += that.findListMax(obj.dxfOdds);
									awayWin_min += that.findListMin(obj.dxfOdds);
									awayWin_max += that.findListMax(obj.dxfOdds);
								};
								//让分
								if(obj.rf) {
									if(letScore > 0) {
										if(letScore < 5) {
											letScore = 0;
										} else if(letScore > 5) {
											letScore = 1;
										} else if(letScore > 10) {
											letScore = 2;
										} else if(letScore > 15) {
											letScore = 3;
										} else if(letScore > 20) {
											letScore = 4;
										} else if(letScore > 25) {
											letScore = 5;
										}
									} else {
										letScore = -letScore;
										if(letScore < 5) {
											letScore = 6;
										} else if(letScore > 5) {
											letScore = 7;
										} else if(letScore > 10) {
											letScore = 8;
										} else if(letScore > 15) {
											letScore = 9;
										} else if(letScore > 20) {
											letScore = 10;
										} else if(letScore > 25) {
											letScore = 11;
										}
									}
									//查看让分下标
									if(homeIndex_min >= letScore) {
										homeWin_min += that.findListMin(obj.rfOdds);
									} else {
										for(var m = 0; m < obj.rf.length; m++) {
											if(obj.rf[m] == 1) {
												homeWin_min += obj.rfOdds[m];
											}
										}
									}
									if(homeIndex_max >= letScore) {
										homeWin_max += that.findListMax(obj.rfOdds);
									} else {
										for(var m = 0; m < obj.rf.length; m++) {
											if(obj.rf[m] == 1) {
												homeWin_max += obj.rfOdds[m];
											}
										}
									}
									if(awayIndex_min >= letScore) {
										awayWin_min += that.findListMin(obj.rfOdds);
									} else {
										for(var m = 0; m < obj.rf.length; m++) {
											if(obj.rf[m] == 0) {
												awayWin_min += obj.rfOdds[m];
											}
										}
									}
									if(awayIndex_max >= letScore) {
										awayWin_max += that.findListMax(obj.rfOdds);
									} else {
										for(var m = 0; m < obj.rf.length; m++) {
											if(obj.rf[m] == 0) {
												awayWin_max += obj.rfOdds[m];
											}
										}
									}
								};
								maxminlist = [homeWin_min, homeWin_max, awayWin_min, awayWin_max];
								minList.push(that.findListMin(maxminlist));
								maxList.push(that.findListMax(maxminlist));
							} else {
								if(obj.sf) {
									list[0] += that.findListMin(obj.sfOdds);
									list[1] += that.findListMax(obj.sfOdds);
								};
								if(obj.rf) {
									list[0] += that.findListMin(obj.rfOdds);
									list[1] += that.findListMax(obj.rfOdds);
								};
								if(obj.dxf) {
									list[0] += that.findListMin(obj.dxfOdds);
									list[1] += that.findListMax(obj.dxfOdds);
								};
								minList.push(list[0]);
								maxList.push(list[1]);
							}
						}
						break;
				}
			}
			for(var i = 0, len4 = indexList.length; i < len4; i++) {
				switch(indexList[i]) {
					case 1:
						for(var m = 0, len1 = that.dataStore.prevDataList.length; m < len1; m++) {
							for(var j = 0, len = maxList.length; j < len; j++) {
								max += maxList[j];
							}
							min = that.findListMin(minList);
						}
						break;
					case 2:
						for(var j = 0, len = maxList.length; j < len - 1; j++) {
							var k = j + 1;
							do {
								max += maxList[j] * maxList[k];
								k++;
							} while (k < len);
						}
						if(min == 0) {
							min += that.findListTwoMin(minList, 2);
						}

						break;
					case 3:
						//3串1
						if(minList.length == 1) {
							max += maxList[0];
							min += minList[0];
						} else {
							for(var j = 0, len = maxList.length; j < len - 2; j++) {
								var k = j + 1,
									l = j + 2;
								do {
									do {
										max += maxList[j] * maxList[k] * maxList[l];
										l++;
									} while (l < len);
									k++, l = k + 1;
								} while (k < len - 1);
							}
							if(min == 0) {
								min += that.findListTwoMin(minList, 3);
							}
						}
						break;
					case 4:
						//4串1
						if(minList.length == 1) {
							max += maxList[0];
							min += minList[0];
						} else {
							for(var j = 0, len = maxList.length; j < len - 3; j++) {
								var k = j + 1,
									l = j + 2,
									m = j + 3;
								do {
									do {
										do {
											max += maxList[j] * maxList[k] * maxList[l] * maxList[m];
											m++;
										} while (m < len);
										l++, m = l + 1;
									} while (l < len - 1);
									k++, l = k + 1, m = k + 2;
								} while (k < len - 2);
							}
							if(min == 0) {
								min += that.findListTwoMin(minList, 4);
							}
						}
						break;
					case 5:
						//5串1
						if(minList.length == 1) {
							max += maxList[0];
							min += minList[0];
						} else {
							for(var j = 0, len = maxList.length; j < len - 4; j++) {
								var k = j + 1,
									l = j + 2,
									m = j + 3,
									n = j + 4;
								do {
									do {
										do {
											do {
												max += maxList[j] * maxList[k] * maxList[l] * maxList[m] * maxList[n];
												n++;
											} while (n < len);
											m++, n = m + 1;
										} while (m < len - 1);
										l++, m = l + 1, n = l + 2;
									} while (l < len - 2);
									k++, l = k + 1, m = k + 2, n = k + 3;
								} while (k < len - 3);
							}
							if(min == 0) {
								min += that.findListTwoMin(minList, 5);
							}
						}
						break;
					case 6:
						//6串1--------未测试
						if(minList.length == 1) {
							max += maxList[0];
							min += minList[0];
						} else {
							for(var j = 0, len = maxList.length; j < len - 5; j++) {
								var k = j + 1,
									l = j + 2,
									m = j + 3,
									n = j + 4,
									q = j + 5;
								do {
									do {
										do {
											do {
												do {
													max += maxList[j] * maxList[k] * maxList[l] * maxList[m] * maxList[n] * maxList[q];
													q++;
												} while (q < len);
												n++, q = n + 1;
											} while (n < len - 1);
											m++, n = m + 1, q = m + 2;
										} while (m < len - 2);
										l++, m = l + 1, n = l + 2, q = l + 3;
									} while (l < len - 3);
									k++, l = k + 1, m = k + 2, n = k + 3, q = k + 4;
								} while (k < len - 4);
							}
							if(min == 0) {
								min += that.findListTwoMin(minList, 6);
							}
						}
						break;
					case 7:
						//7串1-------------未测试
						if(minList.length == 1) {
							max += maxList[0];
							min += minList[0];
						} else {
							for(var j = 0, len = maxList.length; j < len - 6; j++) {
								var k = j + 1,
									l = j + 2,
									m = j + 3,
									n = j + 4,
									q = j + 5,
									w = j + 6;
								do {
									do {
										do {
											do {
												do {
													do {
														max += maxList[j] * maxList[k] * maxList[l] * maxList[m] * maxList[n] * maxList[q] * maxList[w];
														w++;
													} while (w < len);
													q++, w = q + 1;
												} while (q < len - 1);
												n++, q = n + 1, w = n + 2;
											} while (n < len - 2);
											m++, n = m + 1, q = m + 2, w = m + 3;
										} while (m < len - 3);
										l++, m = l + 1, n = l + 2, q = l + 3, w = l + 4;
									} while (l < len - 4);
									k++, l = k + 1, m = k + 2, n = k + 3, q = k + 4, w = k + 5;
								} while (k < len - 5);
							}
							if(min == 0) {
								min += that.findListTwoMin(minList, 7);
							}
						}
						break;
					case 8:
						//8串1---------未测试
						if(minList.length == 1) {
							max += maxList[0];
							min += minList[0];
						} else {
							for(var j = 0, len = maxList.length; j < len - 7; j++) {
								var k = j + 1,
									l = j + 2,
									m = j + 3,
									n = j + 4,
									q = j + 5,
									w = j + 6,
									e = j + 7;
								do {
									do {
										do {
											do {
												do {
													do {
														do {
															max += maxList[j] * maxList[k] * maxList[l] * maxList[m] * maxList[n] * maxList[q] * maxList[w] * maxList[e];
															e++;
														} while (e < len);
														w++, e = w + 1;
													} while (w < len - 1);
													q++, w = q + 1, e = q + 2;
												} while (q < len - 2);
												n++, q = n + 1, w = n + 2, e = n + 3;
											} while (n < len - 3);
											m++, n = m + 1, q = m + 2, w = m + 3, e = m + 4;
										} while (m < len - 4);
										l++, m = l + 1, n = l + 2, q = l + 3, w = l + 4, e = l + 5;
									} while (l < len - 5);
									k++, l = k + 1, m = k + 2, n = k + 3, q = k + 4, w = k + 5, e = k + 6;
								} while (k < len - 6);
							}
							if(min == 0) {
								min += that.findListTwoMin(minList, 8);
							}
						}
						break;
				}
			}
			if(min.toFixed(3) != max.toFixed(3)) {
				html = (min * 2 * parseInt($('.goNext .center input').val())).toFixed(2) + "~" + (max * 2 * parseInt($('.goNext .center input').val())).toFixed(2) + that.coinUnit;
				$('.totalNum').attr('data-index', 2);
				that.dataStore.min = min;
				that.dataStore.max = max;
			} else {
				html = (min * 2 * parseInt($('.goNext .center input').val())).toFixed(2) +  that.coinUnit;
				$('.totalNum').attr('data-index', 1);
				that.dataStore.min = min;
				that.dataStore.max = max;
			}
			$('.totalNum').html(html);
		},
		//串场----计算注数---只算串1
		calculateNum: function(indexList, lenList) {
			var sumNum = 0,
				that = this;
			for(var i = 0, len1 = indexList.length; i < len1; i++) {
				switch(indexList[i]) {
					case 1:
						for(var j = 0, len = lenList.length; j < len; j++) {
							sumNum += lenList[j];
						}
						break;
					case 2:
						//2串1
						for(var j = 0, len = lenList.length; j < len - 1; j++) {
							var k = j + 1;
							do {
								sumNum += lenList[j] * lenList[k];
								k++;
							} while (k < len);
						}
						break;
					case 3:
						//3串1
						for(var j = 0, len = lenList.length; j < len - 2; j++) {
							var k = j + 1,
								l = j + 2;
							do {
								do {
									sumNum += lenList[j] * lenList[k] * lenList[l];
									l++;
								} while (l < len);
								k++, l = k + 1;
							} while (k < len - 1);
						}
						break;
					case 4:
						//4串1
						for(var j = 0, len = lenList.length; j < len - 3; j++) {
							var k = j + 1,
								l = j + 2,
								m = j + 3;
							do {
								do {
									do {
										sumNum += lenList[j] * lenList[k] * lenList[l] * lenList[m];
										m++;
									} while (m < len);
									l++, m = l + 1;
								} while (l < len - 1);
								k++, l = k + 1, m = k + 2;
							} while (k < len - 2);
						}
						break;
					case 5:
						//5串1
						for(var j = 0, len = lenList.length; j < len - 4; j++) {
							var k = j + 1,
								l = j + 2,
								m = j + 3,
								n = j + 4;
							do {
								do {
									do {
										do {
											sumNum += lenList[j] * lenList[k] * lenList[l] * lenList[m] * lenList[n];
											n++;
										} while (n < len);
										m++, n = m + 1;
									} while (m < len - 1);
									l++, m = l + 1, n = l + 2;
								} while (l < len - 2);
								k++, l = k + 1, m = k + 2, n = k + 3;
							} while (k < len - 3);
						}
						break;
					case 6:
						//6串1--------未测试
						for(var j = 0, len = lenList.length; j < len - 5; j++) {
							var k = j + 1,
								l = j + 2,
								m = j + 3,
								n = j + 4,
								q = j + 5;
							do {
								do {
									do {
										do {
											do {
												sumNum += lenList[j] * lenList[k] * lenList[l] * lenList[m] * lenList[n] * lenList[q];
												q++;
											} while (q < len);
											n++, q = n + 1;
										} while (n < len - 1);
										m++, n = m + 1, q = m + 2;
									} while (m < len - 2);
									l++, m = l + 1, n = l + 2, q = l + 3;
								} while (l < len - 3);
								k++, l = k + 1, m = k + 2, n = k + 3, q = k + 4;
							} while (k < len - 4);
						}
						break;
					case 7:
						//7串1-------------未测试
						for(var j = 0, len = lenList.length; j < len - 6; j++) {
							var k = j + 1,
								l = j + 2,
								m = j + 3,
								n = j + 4,
								q = j + 5,
								w = j + 6;
							do {
								do {
									do {
										do {
											do {
												do {
													sumNum += lenList[j] * lenList[k] * lenList[l] * lenList[m] * lenList[n] * lenList[q] * lenList[w];
													w++;
												} while (w < len);
												q++, w = q + 1;
											} while (q < len - 1);
											n++, q = n + 1, w = n + 2;
										} while (n < len - 2);
										m++, n = m + 1, q = m + 2, w = m + 3;
									} while (m < len - 3);
									l++, m = l + 1, n = l + 2, q = l + 3, w = l + 4;
								} while (l < len - 4);
								k++, l = k + 1, m = k + 2, n = k + 3, q = k + 4, w = k + 5;
							} while (k < len - 5);
						}
						break;
					case 8:
						//8串1---------未测试
						for(var j = 0, len = lenList.length; j < len - 7; j++) {
							var k = j + 1,
								l = j + 2,
								m = j + 3,
								n = j + 4,
								q = j + 5,
								w = j + 6,
								e = j + 7;
							do {
								do {
									do {
										do {
											do {
												do {
													do {
														sumNum += lenList[j] * lenList[k] * lenList[l] * lenList[m] * lenList[n] * lenList[q] * lenList[w] * lenList[e];
														e++;
													} while (e < len);
													w++, e = w + 1;
												} while (w < len - 1);
												q++, w = q + 1, e = q + 2;
											} while (q < len - 2);
											n++, q = n + 1, w = n + 2, e = n + 3;
										} while (n < len - 3);
										m++, n = m + 1, q = m + 2, w = m + 3, e = m + 4;
									} while (m < len - 4);
									l++, m = l + 1, n = l + 2, q = l + 3, w = l + 4, e = l + 5;
								} while (l < len - 5);
								k++, l = k + 1, m = k + 2, n = k + 3, q = k + 4, w = k + 5, e = k + 6;
							} while (k < len - 6);
						}
						break;
					default:
						break;
				}
			}
			return sumNum;
		},
		//是否登录
		get_login: function() {
			var that = this,
				test = {};
				test.tzMsg = {
					//投注类型--串场类型
//					tzType: tzType,
					//投注倍数
					tzMultiple: that.multiple,
					//投注金额
					tzMoney: that.tz_sumNum * 2 * that.multiple,
					one_type_id: 4,
					played_group_id: that.playType > 28 ? 15 : 14,
					played_id: that.playType,
					sessions: "",
					expect_bonuses: $('.totalNum').html().replace( that.coinUnit, '').replace('~', '-'),
				};
			if(that.coin < test.tzMsg.tzMoney) {
        // that.tips("余额不足，请先充值", "../loginIn/depositFile.html", 1);
        that.tips("余额不足，请先充值", "depositFile", 1);
				return
			}else  if(that.singleMaxSum&&(that.tz_sumNum * 2 * that.multiple) > parseInt(that.singleMaxSum)) {
				that.tips("投注金额不能超过" + that.singleMaxSum, "", 3);
				return
			} else {
				$('#loading_wait').addClass('active');
				var tzType = [],
					sfList = ["G2", "G1"],
					rfList = ["H2", "H1"],
					dxfList = ["I1", "I2"],
					sfcList = ["J11", "J12", "J13", "J14", "J15", "J16", "J21", "J22", "J23", "J24", "J25", "J26"],
					test_selectItemList = [];
				for(var i = 0, len1 = that.tzType_free.length; i < len1; i++) {
					var str = that.tzType_free[i];
					if(str == 1) {
						tzType.push('1*1');
					} else {
						tzType.push(str + '*1');
					}
				}
				test.tzMsg.tzType=tzType;
				for(var i = 0, len = that.selectDataList.length; i < len; i++) {
					var obj = that.selectDataList[i],
						selectItemList = {
							match_id: obj.match_id,
							fixedFlag: 0
						};
					//胜负
					if(obj.sf) {
						selectItemList.G = [];
						for(var j = 0, len1 = obj.sf.length; j < len1; j++) {
							selectItemList.G.push(sfList[obj.sf[j]]);
						}
						obj.sf.length == 0 && delete selectItemList.G;
					};
					//让分
					if(obj.rf) {
						selectItemList.H = [];
						for(var j = 0, len1 = obj.rf.length; j < len1; j++) {
							selectItemList.H.push(rfList[obj.rf[j]]);
						}
						obj.rf.length == 0 && delete selectItemList.H;
					};
					//大小分
					if(obj.dxf) {
						selectItemList.I = [];
						for(var j = 0, len1 = obj.dxf.length; j < len1; j++) {
							selectItemList.I.push(dxfList[obj.dxf[j]]);
						}
						obj.dxf.length == 0 && delete selectItemList.I;
					};
					if(obj.sfc) {
						selectItemList.J = [];
						for(var j = 0, len1 = obj.sfc.length; j < len1; j++) {
							selectItemList.J.push(sfcList[obj.sfc[j]]);
						}
						obj.sfc.length == 0 && delete selectItemList.J;
					};

					test_selectItemList.push(selectItemList);
				}
				test.selectItemList = test_selectItemList;
				// llll = test;
				var str = {
					tzJson: JSON.stringify(test)
				};
				var obj = {
					type: 'post',
					data: {
						tzJson: (test)
					},
					url: '/authApi/footballBet',
					success: function(data) {
						if(data.code == 200) {
							that.coin=parseFloat(that.coin-test.tzMsg.tzMoney).toFixed(2);
							that.user_state="钱包:" + that.coin + that.coinUnit+"(可用)";
							that.tips("投注成功", "", 3);
						} else {
							that.tips(data.msg, "", 3);
						}
					}
				};
				//console.log(JSON.stringify(test));
				setTimeout(function() {
					$('#loading_wait').css('display', 'none');
          that.base.callAuthApi(obj);
				}, 500);
			}

		},
		//提示弹出框
		tips: function(str, urlName, index) {
			var that = this;
			$('#loading_wait').removeClass('show');

			function middleDisplacement(e) {
				var screenW = e.width();
				var screenH = e.height();
				e.css('visibility', 'visible').css('top', '50%').css('left', '50%').css('margin-left', -screenW / 2 + 'px').css('margin-top', -screenH / 2 + 'px').css('display', 'block');
			}
			$('.goNext').addClass('hide');
			$('.bottom-box .btn-confirm').removeClass('hide');
			$('.iDialogLayout').css('display', 'none');
			$('.iDialogWrap').removeClass("heightZIndex");
			//隐藏被选中的元素
			$('#showSelectContent').addClass('hide');
			$('#showSelectContent').removeClass('heightZIndex');
			//$('body').css('overflow', 'auto');
			$('.iDialogWrap').addClass("heightZIndex");
			middleDisplacement($('.bet-confirm'));
			$('.bet-confirm').css('width', '80%');
			$('.bet-confirm div:first').html(str);
			//			that.dataStore.goLogin = true;
			$('.iDialogLayout').css('display', 'block');
			var timeout = setTimeout(function() {
				$('.goNext .paymentBtn').removeClass('disabled');
				$('.iDialogWrap').css('z-index', '-1');
				$('.iDialogWrap').removeClass('heightZIndex');
				$('.bet-confirm').css('display', 'none');
				$('.iDialogLayout').css('display', 'none');
				clearTimeout(timeout);
				switch(index) {
          case 1:
            that.$router.push({ name: urlName });
						// if(localStorage.app_flag == undefined) {
						// 	window.location.href = url;
						// } else {
						// 	mui.openWindow({
						// 		url: url,
						// 		id: 'url',
						// 		styles: {
						// 			top: base.getStatusbarHeight() + 'px',
						// 			bottom: 0
						// 		},
						// 		show: {
						// 			autoShow: true, //页面loaded事件发生后自动显示，默认为true
						// 			aniShow: 'pop-in', //页面显示动画，默认为”slide-in-right“；
						// 			duration: '200' //页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
						// 		},
						// 		createNew: true
						// 	})
						// }
						break;
					case 2:
						that.changeLoad(that.playType, 1);
						break;
					case 3:
						that.clearTzData();
//						that.get_userState();
						break;
				}
			}, 1500);
		},
	},
	watch: {
		//单位显示
		coinUnit:function(){
			var that=this;
			if(that.coin!==0){
				that.user_state = "钱包:" + that.coin + that.coinUnit +"(可用)";
			}
		},
		//选择的比赛场数数组
		selectDataList: function() {
			var that = this,
				len = that.selectDataList.length;
			if(len > 8) {
				len = 8;
			}
			that.bottomStyle();
			$(".goNext .method-wrap .method.active").removeClass('active');
			that.tzType_freeShow = [0, 0, 0, 0, 0, 0, 0, 0];
			that.tzType_free = [len];
			that.tzType_freeShow[len - 1];
		},
		//倍数
		multiple: function() {
			var that = this,
				fixedmultipleStyle=parseInt($('.goNext .fixMultiple .active').html());
			//倍数校验
			if(isNaN(that.multiple) || that.multiple < 0||that.multiple==="") {
				that.multiple = 1;
			} else if(that.multiple > 100000) {
				that.multiple = 100000;
			}
			//样式修正
			if(!isNaN(fixedmultipleStyle)&&fixedmultipleStyle!=that.multiple){
                $('.goNext .fixMultiple .active').removeClass('active');
			}
			//奖金计算
			if(that.min.toFixed(3) != that.max.toFixed(3)) {
				that.totalNum = (that.min * 2 * that.multiple).toFixed(2) + '~' + (that.max * 2 * that.multiple).toFixed(2);
			} else {
				that.totalNum = (that.min * 2 * that.multiple).toFixed(2);
			}
		},
		//串数
		tzType_free: function() {
			var that = this,
				html = "",
				len1 = that.tzType_free.length;
			for(var i = 0; i < len1; i++) {
				if(i == 2) {
					html += "...";
					break
				}
				if(i != len1 - 1) {
					if(that.tzType_free[i] == 1) {
						html += "单关+";
					} else {
						html += that.tzType_free[i] + "串1+";
					}
				} else {
					if(that.tzType_free[i] == 1) {
						html += "单关";
					} else {
						html += that.tzType_free[i] + "串1";
					}
				}
			}
			that.tzType_free_html = html;
		},
		//玩法切换
		playType: function() {
      var _this=this;
            this.playTypeName=this.playTypeNameList[this.playType-24];
			window.clearInterval(_this.time);
		},
		dealData:function(){
			//console.log(222)
    },
    noDataListReturn: function () {
      if (this.noDataListReturn) {
        $("body").css({
          overflow: 'hidden'
        })
      } else {
        $("body").css({
          overflow: 'auto'
        })
      }
    },
    $route(to, from) {
      var _this = this;
      if (to.name == "qbhh") {
        if (this.noDataListReturn) {
          $("body").css({overflow: 'hidden'})
        }
        this.pullToRefresh.setNowThis(this);
        _this.startCountWorker();
          if(!localStorage.config){
              this.getSysConfig();
          }
      } else if (from.name == "qbhh") {
        $("body").css({
          overflow: 'auto'
        })
        window.clearInterval(_this.countTiming);
        _this.clearTzData();
        if (!$("#showSelectContent").is(":hidden")) {
          $(".goNext .close").trigger("click")
        }
      }
    }
	}
};


