export default {
	name: 'rcdetail',
	data() {
		return {
      rcDetails: '',
			coinUnit: '元',
		}
	},
	created: function() {
		this.coinUnit = JSON.parse(localStorage.getItem('config')).coinUnit;
		this.getdatasMes();
	},

	//利用ajax来查询记录列表
	methods: {
		//路由跳转返回
		routerBack: function() {
			if(localStorage.turnPathName && localStorage.turnPathName != "login") {
				// this.$router.push({ name: localStorage.turnPathName });
				this.$router.go(-1)
			} else {
        this.$router.push({ name: "index" });
			}

		},
		getdatasMes: function() {
			this.rcDetails = JSON.parse(localStorage.getItem('rechargeDetails'));
			// console.log(rcDetails);
		},
	},
	watch: {
		'$route' (to, from) {
      if(to.name=="rcdetail"){
        	this.getdatasMes()
      }
		}
	},
};
