export default{
	name:'userSign',
	data(){
		return{
			rewardModel:[],    //奖励
			signStatus:[],    //是否签到
			extraReward:[],    //额外奖励
			coinUnit:'',
			status:0,
		}
	},
	created:function(){
		this.getuserSign();
		this.coinUnit = JSON.parse(localStorage.getItem('config')).coinUnit;
	},
	mounted: function() {
		var _this = this;
		_this.userSign();
	},
	methods:{
		routerBack: function () {
          if (localStorage.turnPathName && localStorage.turnPathName!="login"){
            // this.$router.push({ name: localStorage.turnPathName });
            this.$router.go(-1)
          }else{
            this.$router.push({ name: "index" });
          }

        },
		getuserSign:function(){
			var _this = this;
            var obj = {
                type: 'post',
                data: {
                	detail:1,
                },
//              async:false,
                dataType: 'json',
                url: '/authApi/sign/getSignInfo',
                success: function (data) {
                    if (data.code == 200) {
                    	var extraReward;
                    	_this.userSign = data.body;
                    	_this.rewardModel = _this.userSign.rewardModel.split(',');
                    	if(_this.userSign.extraReward){
                    		extraReward = _this.userSign.extraReward.split(',');
	                    	for(var i=0;i<extraReward.length;i++){
	                    		_this.extraReward.push(extraReward[i].split(':'));
	                    	}
                    	}
                    	if(_this.userSign.signStatus){
                    		_this.signStatus = _this.userSign.signStatus.split(',');
                    	}else{
                    		for(var i=0;i<_this.userSign.signCycle;i++){
                    			_this.signStatus.push(0);
                    		}
                    	}
                    	var date = new Date();
                    	var year = date.getFullYear();
                    	var month = date.getMonth()+1;
                    	var days = date.getDate();
                    	if((month+'').length<2){
                    		month = '0'+month;
                    	}
                    	if((days+'').length<2){
                    		days = '0'+days;
                    	}
                    	var newDate=year+'-'+month+'-'+days;
                    	var lastDate = /\d{4}-\d{1,2}-\d{1,2}/g.exec(_this.userSign.lastSignTime);
                    	if(newDate==lastDate){
                    		_this.status = 1;
                    	}else{
                    		_this.status = 0;
                    	}

                    }
                },
                error: function (msg) {
                    //console.log(msg);
                }
            }
            this.base.callAuthApi(obj);
		},
		//签到
		userSign:function(){
			var _this = this;
			$("#signBtn").click(function(){
				if(_this.status==1){
					return;
				}
	            var obj = {
	                type: 'post',
	                data: {
	                	signId:_this.userSign.signId,
	                },
	//              async:false,
	                dataType: 'json',
	                url: '/authApi/sign/userSign',
	                success: function (data) {
	                    if (data.code == 200) {
	                    	mui.toast('签到成功',1000);
	                    	_this.status=1;
	                    	for(var i=0;i<_this.signStatus.length;i++){
	                    		if(_this.signStatus[i]==1){
	                    			if(_this.signStatus[i+1]==0){
	                    				_this.signStatus[i+1] = 1;
	                    				return;
	                    			}
	                    		}else{
	                    			_this.signStatus[i] = 1;
	                    			return;
	                    		}
	                    	}
	                    }else{
	                    	mui.toast(data.msg,1000);
	                    }
	                },
	                error: function (msg) {
	                    //console.log(msg);
	                }
	            }
	            _this.base.callAuthApi(obj);
			})
		}
	},
	watch: {
	   '$route' (to, from) {
       if (to.name =="userSign"){
			this.getuserSign();
			this.rewardModel=[];    //奖励
			this.signStatus=[];    //是否签到
			this.extraReward=[];
       }

	   }
	 },
}
