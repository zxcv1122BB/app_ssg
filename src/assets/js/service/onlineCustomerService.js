export default{
    // el: '#app',
    name:"onlineCustomerServiceUrl",
    data(){
      return {
        imgSrc: "../"+sessionStorage.getItem("onlineCustomerServiceUrl"),
        msg:''
      }
    },
    created: function () {
    },
    mounted: function () {
    },
    methods: {
      //路由跳转返回
      routerBack: function () {
        if (localStorage.turnPathName && localStorage.turnPathName != "login") {
          // this.$router.push({ name: localStorage.turnPathName });
          this.$router.go(-1)
        } else {
          this.$router.push({ name: "index" });
        }

      },
    	add:function(){
    		var html = '<p>' + this.msg + '</p>';
    		$('#app').append(html);
    	}
    }
};
