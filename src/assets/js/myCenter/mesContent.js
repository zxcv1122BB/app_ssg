	//数据交互
export default{
	name:'mesContent',
	data() {
		return{
			mesContent:'',   //消息
			title:'',
			contents:'',
		}
	},
	created: function() {
		this.getdatasMes();
	},


	//利用ajax来查询记录列表
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
		getdatasMes: function() {  //查看短消息列表
			var _this = this;
			_this.mesContent = JSON.parse(localStorage.getItem('mesContent'));
			_this.title = _this.mesContent.title;
			_this.contents = _this.mesContent.contents;

		},
	},
	watch: {
	   '$route' (to, from) {
       if(to.name=="mesContent"){
	      this.getdatasMes(this.$route.path)
       }
	   }
	 },
};
