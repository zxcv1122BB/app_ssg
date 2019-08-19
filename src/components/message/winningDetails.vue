<template>
<div>
  <div id="container">
<div id="Winning">
	    <header id="header">
		    <a href="javascript:void(0)" class="goBack"  @click="routerBack"></a>
		    <h1>{{$t('中奖记录')}}</h1>
		</header>
	    <div class="title">
	        <p>{{$t('用户名')}}</p><!--
	        --><p>{{$t('中奖金额')}}</p><!--
	        --><p>{{$t('彩种类')}}</p>
	    </div>
	    <div class="inner">
	        <ul>
	            <li v-for='(item,index) in thelotterys' class="list clearf">
	                <p>
	                    <img src="../../assets/images/jiangpai.png"/>
	                    <span v-cloak>{{item.user_name}}</span>
	                </p>
	                <p v-cloak v-if="item.type !=2 ">{{$t('喜中')}}{{item.bonus}}{{coinUnit}}</p>
	                <p v-cloak v-else>{{$t('喜中')}}{{item.action_date_result}}</p>
	                <p v-cloak>{{$t('购买')}}{{item.type_name}}</p>
	            </li>
	        </ul>

	    </div>
	</div>
  </div>
</div>

</template>

<script>

//数据交互
export default {
//		el: '#main',
		name: 'winningDetails',
	data() {
		return{
			thelotterys:[],
        	coinUnit:"元"
		}

	},
	created: function() {
        if (localStorage.config) {
            this.config = JSON.parse(localStorage.getItem('config'));
            this.coinUnit = this.config.coinUnit;
        }
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
            this.$router.push({ name: index });
          }

        },
		getdatasMes: function() {
      var _this = this;
      if(localStorage.index_winningRecord){
        var dataList=JSON.parse(localStorage.index_winningRecord).body;
        for (var i = 0; i <dataList.length; i++) {
                            //substr(0,5)
                            dataList[i].user_name = dataList[i].user_name.substr(0, 2) + "***";
                        }
                        _this.thelotterys =dataList;
        return
      }
            var thelottery = {
                type: 'post',
                data: {},
                url: '/commonAPI/selectWinningRecord',
                success: function (data) {
                    //thelotterySpit
                    //将用户名的后两位加密
                    if (data.code == 200) {
                        for (var i = 0; i < data.body.length; i++) {
                            //substr(0,5)
                            data.body[i].user_name = data.body[i].user_name.substr(0, 2) + "***";
                        }
                        _this.thelotterys = data.body;
                    }
                }
            };
            this.base.callCommonApi(thelottery);
//			var _this = this;
//			_this.thelotterys=JSON.parse(sessionStorage.getItem('thelotterys'));
//			//console.log(_this.thelotterys)
		},
	}
};
</script>

<style scoped>
	body{
	padding-top: 6.66rem!important;
}

.title{
	position: fixed;
    width: 100%;
    top: 3.66rem;
    background-color: #EEEEEE;
    z-index: 999;
}
.title>p{
	display: inline-block;
    text-align: center;
    line-height: 3rem;
    height: 3rem;
    color: #676767;
}
.title>p:first-child{
	width: 20%;
}
.title>p:nth-child(2){
	width: 40%;
}
.title>p:last-child{
	width: 40%;
}
/*头部结束*/

/*内容*/
.inner{
  margin-top: 3rem;
}
.list{
	border-bottom: 1px solid #CCCCCC;
}

.list>p{
	float: left;
	color: #333;
	line-height: 2rem;
	height: 2rem;
	text-align: center;
}
.list>p:first-child{
	width: 20%;
	position: relative;
	text-align: left;
	padding-left: 4%;
	box-sizing: border-box;
}
.list>p:first-child>img{
	position: absolute;
	margin: auto;
	top: 0;
	bottom: 0;
}
.list>p:first-child>span{
	position: absolute;
	left: 45%;
}
.list>p:nth-child(2){
	width: 45%;
	white-space:nowrap;
	text-overflow:ellipsis;
	overflow:hidden;
	color: red;
}
.list>p:last-child(1){
	width: 40%;
}
.list>p:last-child(3){
	width: 30%;
}


/*内容结束*/
</style>
