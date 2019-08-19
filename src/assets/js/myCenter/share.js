//数据交互
export default{
	name:'share1',
	data() {
		return{
			isTrue:[],
			config:[],
			promotionUrl:'',
			webName:'',
			description:'',
		}
	},
	created: function() {
		this.getdatas();
	},
	methods: {
    //路由跳转返回
        routerBack: function () {
          if (localStorage.turnPathName && localStorage.turnPathName!="login"){
            // this.$router.push({ name: localStorage.turnPathName });
            this.$router.go(-1)
          }else{
            this.$router.push({ name: "index" });
          }

        },
		onCopy: function (e) {
		      mui.toast('复制成功');
		    },
		    onError: function (e) {
		      mui.toast('复制失败');
		    },
		getdatas:function(){
			this.isTrue = JSON.parse(localStorage.getItem('isTrue'));
			this.config = JSON.parse(localStorage.getItem('config'));
			this.promotionUrl = localStorage.promotionUrl;
			this.webName = "欢迎来到"+this.config.webName
			this.description =  "我的推广码是:" + this.isTrue.promotionCode + ",我的推广链接" + this.promotionUrl
		}
	}
};
