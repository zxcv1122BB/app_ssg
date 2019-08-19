<template>
 <div>
 	<div id="container">
	<div id="deposit1">
		<header id="header">
		    <a class="goBack" href="javascript:void(0)"  @click="routerBack"></a>
		    <h1>{{$t('充值详情')}}</h1>
		</header>
		<article id="article">
			<section v-cloak>
				<div>
					<p>交易时间：<span v-cloak>{{rcDetails.applyTime}}</span></p>
					<p>交易类型：<span v-cloak>
            {{rcDetails.tradeType==1?'在线充值':(rcDetails.tradeType==2?'快速入款':(rcDetails.tradeType==3?'一般充值':'--'))}}
						<span style="font-size: 1rem;color: gray;" v-cloak>

              ({{rcDetails.state==1?'未处理':(rcDetails.state==2?'处理中':(rcDetails.state==3?'成功到账':(rcDetails.state==4?'充值失败':'--')))}})</span>
					</span></p>
				</div>
				<div>
					<p>交易金额：<span style="color: #f05618;"  v-cloak>{{rcDetails.amount}}{{coinUnit}}</span></p>
					<p>
						订单号：<span v-if="rcDetails.orderId" v-cloak>{{rcDetails.orderId}}</span>
						<span v-else>-</span>
					</p>
				</div>
				<div v-if="rcDetails.info">
					备注：<span v-cloak>{{rcDetails.info}}</span>
				</div>
			</section>

		</article>
	</div>
	</div>
 </div>
</template>

<script src="../../assets/js/myCenter/rcdetail.js"></script>

<style src="../../style/myCenter/centerGlobal.css" scoped></style>
