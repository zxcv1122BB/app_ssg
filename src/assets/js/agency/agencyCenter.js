export default{
  data(){
    return{

    }
  },
  created(){},
  mountend(){},
  methods:{
    //跳转页面
    redirect:function(pathName,params){
      if(params!=undefined){
        this.$router.push({
          name: pathName,
          params: {
            status: params
          }
        });
      }else{
        this.$router.push({ name: pathName });
      }


    },
    routerBack: function () {
      if (localStorage.turnPathName && localStorage.turnPathName != "login") {
        // this.$router.push({ name: localStorage.turnPathName });
        this.$router.go(-1)
      } else {
        this.$router.push({
          name: "index"
        });
      }

    },
  },
  watch:{

  }
}
