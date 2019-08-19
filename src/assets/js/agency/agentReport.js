export default {
	data() {
		return {
			timeList: ['今天', '昨天', '近七天','本月','上月'],
			timeC: '',
			datas: [],
			lowerAgent:'',
			coinUnit:'',
		}
	},
	created() {
		this.getdatas();
		this.$nextTick(() => {
			this.initDateTool();
		})
	},
	mounted() {
		var ph='',h=document.body.clientHeight;
		ph=h-44-$("#mainTit").height()*2-$(".searchBtn").height();
		console.log(ph);
		$(".PLSdetail").css({
			height:ph+"px"
		});
		
	},
	methods: {
		getdatas(indexArr) {
			var _this = this,dateType;
			_this.coinUnit = JSON.parse(localStorage.getItem('config')).coinUnit;
			if(indexArr==undefined) {
				_this.timeC = _this.timeList[2];
			}
			if(indexArr==2||indexArr==undefined){
				dateType = '';
			}else if(indexArr<2){
				dateType = parseInt(indexArr)+1;
			}else{
        dateType = parseInt(indexArr);
      }
			var obj = {
				type: "post",
				url: "/authApi/proxy/getProxyCenterReportInfo",
				data: {
					dateType: dateType,
					nextAgentName:_this.lowerAgent
				},
				success: function(data) {
					if(data.code == 200) {
						_this.datas = data.body;
					}else{
						mui.toast('找不到该下级代理')
					}
				},
				error: function(msg) {
					//console.log(msg)
				},
			};
			this.base.callAuthApi(obj);
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
				transitionEnd: function(indexArr, data) {
				},
				callback: function(indexArr, data) {
					_this.timeC = _this.timeList[indexArr]
					_this.getdatas(indexArr[0])
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
	},
	watch: {
		'$route' (to, from) {
			if(to.name == "agentReport") {
        this.datas=[];
				this.$nextTick(() => {
					this.lowerAgent = '';
					this.getdatas();
				})

			} else if(from.name == "agentReport") {

			}

		}
	}
}
