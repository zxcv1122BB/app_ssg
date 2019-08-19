<template>
 <div>
 	<div id="container">
	<div id="deposit1">
		<header id="header">
		    <a class="goBack" href="javascript:void(0)"  @click="routerBack"></a>
		    <h1>{{$t('账变详情')}}</h1>
		</header>
		<article id="article">
			<section v-cloak>
				<div>
					<p>交易时间：<span v-cloak>{{fundDetails.sourceTime}}</span></p>
					<p>交易类型：<span v-cloak>
						{{fundDetails.coinOperate}}
						<span v-if="fundDetails.coinOperate=='充值'" style="font-size: 1rem;color: gray;" v-cloak>({{fundDetails.state==1?'未处理':(fundDetails.state==2?'处理中':(fundDetails.state==3?'充值成功':(fundDetails.state==4?'充值失败':'--')))}})</span>
	            		<span v-else-if="fundDetails.coinOperate=='提现'" style="font-size: 1rem;color: gray;" v-cloak>({{fundDetails.state==1?'未处理':(fundDetails.state==2?'处理中':(fundDetails.state==3?'提现成功':(fundDetails.state==4?'提现失败':'--')))}})</span>
					</span></p>
				</div>
				<div>
					<p>交易金额：<span style="color: forestgreen;"  v-if="fundDetails.coinOperate=='提现'||fundDetails.coinOperate=='投注'||fundDetails.coinOperate=='人工扣除'||fundDetails.coinOperate=='开奖回滚'" v-cloak>-{{fundDetails.amount}}{{coinUnit}}</span>
	            	<span style="color: #f05618;"  v-else v-cloak>{{fundDetails.amount}}{{coinUnit}}</span></p>
					<p>
						订单号：<span v-if="fundDetails.orderId" v-cloak>{{fundDetails.orderId}}</span>
						<span v-else>-</span>

					</p>
				</div>
				<div v-if="fundDetails.info">
					备注：<span v-cloak>{{fundDetails.info}}</span>
				</div>
			</section>

		</article>
	</div>
	</div>
 </div>
</template>

<script src="../../assets/js/myCenter/deposit.js"></script>

<style src="../../style/myCenter/centerGlobal.css" scoped></style>
