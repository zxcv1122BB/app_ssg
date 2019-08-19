<template>
 <div>
 	<div id="container">
	<div id="ebank">
		<header id="header">
				<a class="goBack" href="javascript:void(0)"  @click="routerBack"></a>
				<h1 v-cloak>{{payConditions?payConditions.show_page:'转账'}}</h1>
			</header>

		<article id="article" v-cloak>

			<section>
				<div class="wxMes clearfix" v-cloak>
					<p><img :src="'static/'+payConditions.payico_url" style="height: 2rem;"/></p>
					<div>
						<p id="aaa" v-cloak>
							<span>{{$t('姓名')}}：</span>
							{{payConditions.account_name}}
              <span type="button"
                    v-clipboard:copy="payConditions.account_name"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onError" class="copy" style="color: white;">{{$t('复制')}}</span>
						</p>
						<p id="bbb" v-cloak>
							<span>{{$t('账号')}}：</span>
							{{payConditions.bank_account}}
							<span type="button"
						     v-clipboard:copy="payConditions.bank_account"
						     v-clipboard:success="onCopy"
						     v-clipboard:error="onError" class="copy" style="color: white;">{{$t('复制')}}</span>
						</p>
						<div v-cloak>{{payConditions.info}}</div>
						<div class="codeBtn" @click="popCode">{{$t('弹出收款二维码')}}</div>
					</div>
				</div>
				<p><img :src='payConditions.QRcode' style="width: 100%;"/></p>
			</section>
			<section>
				<div class="payMes">
					<span id="payMesTit">{{$t('充值信息')}}</span>
					<p v-cloak>充值订单号：{{orderNum}}</p>
					<p id="money">{{$t('充值金额')}}：<input type="text" v-model="money" disabled="disabled" /></p>
					<p v-cloak>{{payConditions.pay_name?payConditions.pay_name:''}}姓名：<input type="text" v-model="wxName" /></p>
				</div>
				<p class="payBtn" style="margin-left:7.5%;margin-top: .5rem;"><input type="button" value="下一步" @click="clickSure(1)" /></p>
			</section>
			<div class="iDialogWrap">
				<div class="iDialog" style="display: none;">
					<div id="iDialogContent" class="iDialogContent">
						<div class="iDialogBody">
							<div class="iDialogMain">
								<img style="width: 20rem;height: 20rem;" :src="payConditions?payConditions.QPcode_url:'../../assets/images/codewx.png'" />
								<span class="close" @click="close_popCode($event)"></span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="iDialogLayout" style="display:none ;"></div>

		</article>
	</div>
	</div>
 </div>
</template>
<script src="../../assets/js/myCenter/payWay.js"></script>

<style src="../../style/myCenter/centerGlobal.css" scoped></style>
