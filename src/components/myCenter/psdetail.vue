<template>
 <div>
 	<div id="container">
	<div id="deposit1">
		<header id="header">
		    <a class="goBack" href="javascript:void(0)"  @click="routerBack"></a>
		    <h1>{{$t('提款详情')}}</h1>
		</header>
		<article id="article">
			<section v-cloak>
				<div>
					<p>交易时间：<span v-cloak>{{psDetails.applyTime}}</span></p>
					<p>交易类型：<span v-cloak>提款
	            		<span style="font-size: 1rem;color: gray;" v-cloak>({{psDetails.state==1?'未处理':(psDetails.state==2?'处理中':(psDetails.state==3?'提现成功':(psDetails.state==4?'提现失败':'--')))}})</span>
					</span></p>
				</div>
				<div>
					<p>交易金额:
	            	<span style="color: #f05618;"  v-cloak>{{psDetails.amount}}{{coinUnit}}</span></p>
					<p>
						订单号：<span v-if="psDetails.orderId" v-cloak>{{psDetails.orderId}}</span>
						<span v-else>-</span>

					</p>
				</div>
				<div v-if="psDetails.info">
					备注：<span v-cloak>{{psDetails.info}}</span>
				</div>
			</section>

		</article>
	</div>
	</div>
 </div>
</template>

<script src="../../assets/js/myCenter/psdetail.js"></script>

<style src="../../style/myCenter/centerGlobal.css" scoped></style>
