export default{
  // el:'#app',
  name:"onlineService",
  data(){
    return{
      url:'',
      iframeheight:'',
    }
	},
	created:function(){
		// var a = JSON.stringify(localStorage.onlineServiceUrl);
		// this.url = JSON.parse(a);
		//mui.init();
	},
	mounted: function () {
//      var iframeheight = $(window).height();
//      $('#a1').height(iframeheight);

//		var iframeheight = window.screen.height;
//		document.getElementById('a1').height = iframeheight;

//		var iframeheight = window.screen.height;
    this.iframeheight = document.documentElement.clientHeight;
    var _this=this;
		if(localStorage.app_flag == undefined){
			document.getElementById('a1').height = this.iframeheight+'px';
		}else{
			setTimeout(function(){
				_this.setHeight();
			},500)
		}
    },
	methods:{
    //路由跳转返回
    routerBack: function () {
      if (localStorage.turnPathName && localStorage.turnPathName != "login") {
        // this.$router.push({ name: localStorage.turnPathName });
        this.$router.go(-1)
      } else {
        this.$router.push({ name: "index" });
      }

    },
		setHeight:function(){
			var getStatusbarHeight = plus.navigator.getStatusbarHeight();
			var headerHeight = document.getElementById('header').offsetHeight;
			document.getElementById('a1').height = this.iframeheight-getStatusbarHeight-headerHeight+'px';
		}
	}
}
