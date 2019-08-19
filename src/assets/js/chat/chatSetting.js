export default {
	name: 'chatSetting',
	data() {
		return {
			allDays: [],
			allHour: [],
			allMin: [],
			chooseTime: '',
			timeOfBan: 10,
		}
	},
	created: function() {
		this.initData();
	},
	mounted: function() {
			this.initDateTool();
	},
	methods: {
		initData: function() {
			for(var i = 0; i <= 29; i++) {
				this.allDays.push(i + '天')
			}
			for(var i = 0; i <= 23; i++) {
				this.allHour.push(i + '小时')
			}
			for(var i = 0; i <= 59; i++) {
				this.allMin.push(i + '分钟')
			}
		},
		initDateTool: function() {
			var _this = this,
				choose;
			document.querySelector('.mui-table-view.mui-table-view-radio').addEventListener('selected', function(e) {
				choose = e.detail.el.outerText.trim();
				if(choose != '自定义') {
					_this.chooseTime = '';
				}
				if(choose == '10分钟') {
					_this.timeOfBan = 10;
				} else if(choose == '1小时') {
					_this.timeOfBan = 1 * 60;
				} else if(choose == '12小时') {
					_this.timeOfBan = 12 * 60;
				} else if(choose == '1天') {
					_this.timeOfBan = 24 * 60;
				}
			});
			var mobileSelect2 = new MobileSelect({
				trigger: '#custom', //触发
				title: '请选择', //标题
				wheels: [{
						data: _this.allDays
					},
					{
						data: _this.allHour
					},
					{
						data: _this.allMin
					}
					// {data:_this.allDays},
					// {data:_this.allHours},
					// {data:_this.allMin}
				],
				cancelBtnText: '　',
				position: [1, 2, 0],
				transitionEnd: function(indexArr, data) {
					_this.chooseTime = "　(" + data[0] + data[1] + data[2] + ")";
					_this.timeOfBan = (parseInt(data[0]) * 24 * 60) + (parseInt(data[1]) * 60) + (parseInt(data[2]));
					if(parseInt(data[0]) == 0 && parseInt(data[1]) == 0 && parseInt(data[2]) == 0) {
						mobileSelect2.locatePosition(2, 1);
					}
				},
				callback: function(indexArr, data) {
					_this.chooseTime = "　(" + data[0] + data[1] + data[2] + ")";
					_this.timeOfBan = (parseInt(data[0]) * 24 * 60) + (parseInt(data[1]) * 60) + (parseInt(data[2]));
					mobileSelect2.position = [indexArr];
				},
			});

			$('.cancel').click(function() {
				_this.chooseTime = "　(1天2时0分)";
				_this.timeOfBan = (parseInt(1 * 24 * 60) + parseInt(2 * 60) + parseInt(0));
			})
			$('.grayLayer').click(function() {
				_this.chooseTime = "　(1天2时0分)";
				_this.timeOfBan = (parseInt(1 * 24 * 60) + parseInt(2 * 60) + parseInt(0));
			})
		},
		sure: function(id) {
			var arr, _this = this,
				uName = _this.$route.params.id;
			if(uName == 0) {
				arr = JSON.stringify({
					'messType': '900',
					'code': '003',
					'mess': '全体禁言',
					'ForbiddenTime': _this.timeOfBan.toString(),
					'userName': localStorage.userName
				});
				mui.toast('全体禁言成功');
			} else {
				arr = JSON.stringify({
					'messType': '900',
					'code': '004',
					'mess': '某用户禁言',
					'ForbiddenTime': _this.timeOfBan.toString(),
					'userName': uName
				});
				mui.toast('禁言成功');
			}
			_this.base.websock.send(arr);
			setTimeout(function() {
				_this.$router.go(-1);
			}, 500)
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
		'$route' (to, from) {
			if(to.name == "chatSetting") {
				this.$nextTick(() => {
					this.initDateTool();
				})
				this.chooseTime = '';
			} else if(from.name == "chatSetting") {}

		}
	},
};
