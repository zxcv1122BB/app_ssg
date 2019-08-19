export default {
	name: 'psdetail',
	data() {
		return {
      psDetails: '',
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
			this.psDetails = JSON.parse(localStorage.getItem('presentDetails'));
			// console.log(this.psDetails);
		},
	},
	watch: {
		'$route' (to, from) {
      if(to.name=="psdetail"){
        	this.getdatasMes()
      }

		}
	},
};
