export default{
    // el: '#app',
    name:"weixinOnlineCustomerService",
    data(){
      return {
        imgSrc: "../"+localStorage.getItem("weixinOnlineCustomerServiceUrl"),
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
    }
};
