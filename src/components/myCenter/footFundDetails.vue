<template>
 <div>
 	<div id="container">
	<div id="footFD">
		<header id="header">
			<a href="javascript:void(0)"  class="goBack" @click="routerBack"></a>
			<!--<h1 v-if="status ==1">充值记录</h1>-->
			<!--<h1 v-else-if="status ==2">提现记录</h1>-->
			<!--<h1 v-else>{{$t('账变记录')}}</h1>-->
			<h1>{{$t('账变记录')}}</h1>
		</header>
		<article id="article">
			<div id="protitle">交易明细非即时显示，可能有5-10分钟的延迟，如果您没有发现您当前的交易数据，请稍等片刻。</div>
			<div class="chooseTime">
				<div id="date" style="position: relative;">
					<input id="showDate" class="show" type="text" style="" readonly="" value="近7天" />
					<div class="jian"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAnUlEQVRIS+3U2w3CMBBE0Tsl0AEdUQKkMtIRlEAngywBiohj7wop4sP+9eNIs7sWOyztYDCQVMojrt/isn0HbpKm1EuA7Rk4STos765qYvsCXIE5A72AMzBJKthnVQufhVpAkTa7Kwr1gCZSNntQBOgiLSgKhJAalAHCyBf0AI61Ltpq+dS3sqjRqk1bM5VCssP5Pj+QVHIjrv+L6wm8wFAaBC/AKQAAAABJRU5ErkJggg==" /></div>
				</div>
				<ul id="selectDate" class="select" style="top: 9rem;">
					<li @click="allTime()">近7天</li>
					<li @click="now();">{{$t('今天')}}</li>
					<li @click="yes();">{{$t('昨天')}}</li>
					<li @click="week();">{{$t('本周')}}</li>
					<li @click="lastMonth();">7天前</li>
				</ul>
			</div>
			<div class="chooseType">
				<div id="type"  style="position: relative;">
					<input id="showType" class="show" type="text" style="" readonly="" value="全部类型" />
					<div class="jian"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAnUlEQVRIS+3U2w3CMBBE0Tsl0AEdUQKkMtIRlEAngywBiohj7wop4sP+9eNIs7sWOyztYDCQVMojrt/isn0HbpKm1EuA7Rk4STos765qYvsCXIE5A72AMzBJKthnVQufhVpAkTa7Kwr1gCZSNntQBOgiLSgKhJAalAHCyBf0AI61Ltpq+dS3sqjRqk1bM5VCssP5Pj+QVHIjrv+L6wm8wFAaBC/AKQAAAABJRU5ErkJggg==" /></div>
				</div>
				<ul id="selectType" class="selectType" style="top: 9rem;">
					<li @click="selectType('');" class="choose_yes">{{$t('全部类型')}}</li>
					<li @click="selectType(1);" class="choose_no">{{$t('充值')}}</li>
					<li @click="selectType(2);" class="choose_no">{{$t('提现')}}</li>
					<li @click="selectType(3);" class="choose_no">{{$t('投注')}}</li>
					<li @click="selectType(4);" class="choose_no">{{$t('派奖')}}</li>
					<li @click="selectType(5);" class="choose_no">{{$t('赠送')}}</li>
					<li @click="selectType(6);" class="choose_no">{{$t('其他')}}</li>
				</ul>
			</div>
			<section id="section">
				<div v-for="(item,index) in datas" class="isclick" @click="clickMes(index)">
					<span style="display: none;height: 0;" v-cloak>{{item.orderId}}</span>
					<span v-cloak>{{item.applyTime}}</span>
					<span v-cloak>{{item.coinOperate}}<i class="mui-icon mui-icon-forward"></i></span>
					<span v-cloak>
            	<span style="color: forestgreen;"  v-if="item.coinOperate=='提现'||item.coinOperate=='投注'||item.coinOperate=='人工扣除'||item.coinOperate=='开奖回滚'" v-cloak>-{{item.amount}}{{coinUnit}}</span>
					<span style="color: #f05618;" v-else v-cloak>{{item.amount}}{{coinUnit}}</span>
					<span v-if="item.coinOperate=='充值'" style="font-size: 1rem;color: gray;" v-cloak>({{item.state==1?'未处理':(item.state==2?'处理中':(item.state==3?'充值成功':(item.state==4?'充值失败':'--')))}})</span>
					<span v-else-if="item.coinOperate=='提现'" style="font-size: 1rem;color: gray;" v-cloak>({{item.state==1?'未处理':(item.state==2?'处理中':(item.state==3?'提现成功':(item.state==4?'提现失败':'--')))}})</span>
					</span>
				</div>

				<!--加载更多-->
				<div class="has-more" style="text-align: center;line-height: 40px;color: #fff;">
				</div>

			</section>
			<div id="background_gray">

			</div>
			<div id="noMessage">
				<img src="../../assets/images/background.png" height="200rem" />
				<p>{{$t('暂无数据')}}</p>
			</div>
		</article>
	</div>
	</div>
 </div>
</template>

<script src="../../assets/js/myCenter/footFundDetails.js"></script>

<style src="../../style/myCenter/centerGlobal.css" scoped></style>

<style lang="less" scoped>
#footFD #article #section div span:nth-of-type(3){
	background-image: none;
}
#footFD {
	#article {
		#section{
			background: #424242;
			color: #fff;
		}
		#showDate,#selectDate{
			// text-align: center;
			color: #fff;
		}
		.show{
			    color: #fff;
			    background: linear-gradient(to bottom, #000000, #575956);
		}
		.select,#selectType{
			background: #50504f;
			    
			li{
				color: #fff;
			}
		}
	}
    
}
</style>

