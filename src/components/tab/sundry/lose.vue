<template>
  <div>
    <div id="container">
      <div>
        <img src="../../../assets/images/bg_lose.jpg" class="img-responsive"/>
		    <span id="tipsContent" v-cloak>{{tips}}</span>
      </div>
    </div>
  </div>
</template>
		<script>
    export default {
      name:"lose",
      data(){
        return {
          tips:""
        }
      },
      created(){},
      mounted(){
        this.initData();
      },
      methods:{
        initData(){
        var tips=localStorage.tipsContent,tipsContent=$("#tipsContent")[0];
          if(tips){
            if(tips.length>=10){
              var html="";
              for(var i=0;i<tips.length;i+=10){
                html+=tips.substring(i,10+i)+'<br>';
              }
              tipsContent.innerHTML=html;
              if(tips.length<=20){
                tipsContent.style.bottom="40%"
              }else if(tips.length<=30){
                tipsContent.style.bottom="37%"
              }else if(tips.length<=40){
                tipsContent.style.bottom="34%"
              }else if(tips.length<=50){
                tipsContent.style.bottom="30%"
              }else if(tips.length<=60){
                tipsContent.style.bottom="27%"
              }else{
                tipsContent.style.bottom="24%"
              }
            }else{
              tipsContent.innerHTML=tips;tipsContent.style.bottom="44%";
            }
          }else{
            tipsContent.style.bottom="44%"
            tipsContent.innerHTML="未知原因";
          }
        },
      }
    }

		</script>
		<style scoped>
    #container {
    margin-top: 0;
}
			body{position:relative;}
			.img-responsive {
			  display: inline-block;
			  height: auto;
			  max-width: 100%;
			}
			#tipsContent{
				position:absolute;
				left:28%;
				bottom:35%;
				font-size: 1.3rem;
				color:#fff;
			}
		</style>


