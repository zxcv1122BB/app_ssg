export default{
    // el: '#app',
    name:"qqCustomerService",
    data(){
      return {
        imgSrc: "../"+sessionStorage.getItem("qqOnlineCustomerServiceUrl"),
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
