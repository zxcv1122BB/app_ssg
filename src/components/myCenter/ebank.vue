<template>
 <div>
 	<div id="container">
	<div id="ebank">
	<header id="header">
	    <a class="goBack" href="javascript:void(0)" @click="routerBack"></a>
	    <h1>{{$t('银行转账')}}</h1>
	</header>

	<article id="article" v-cloak>
			<section>
				<div class="wxMes" v-cloak>
					<p>{{$t('人工网银转账')}}</p>
					<div>
						<p v-cloak><span>银行：</span>{{payConditions.bank_name}}</p>
						<p id="aaa" v-cloak>
							<span>收款人：</span>
							{{payConditions.account_name}}

              <span type="button"
                    v-clipboard:copy="payConditions.account_name"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onError" class="copy" style="color: white;">{{$t('复制')}}</span>
							<!--<a @click="copyTxt($event,payConditions.account_name)">{{$t('复制')}}</a>-->
							<!--<a onclick="" class="copy1" data-clipboard-action="copy" :data-clipboard-text="payConditions.account_name" style="color: blue;">{{$t('复制')}}</a>-->
						</p>
						<p id="bbb" v-cloak>
							<span>{{$t('账号')}}：</span>
							{{payConditions.bank_account}}
							<!--<a @click="copyTxt($event,payConditions.bank_account)">{{$t('复制')}}</a>-->
							<!--<a onclick="" class="copy2" data-clipboard-action="copy" :data-clipboard-text="payConditions.bank_account" style="color: blue;">{{$t('复制')}}</a>-->
							<span type="button"
						     v-clipboard:copy="payConditions.bank_account"
						     v-clipboard:success="onCopy"
						     v-clipboard:error="onError" class="copy" style="color: white;">{{$t('复制')}}</span>
						</p>
						<div v-cloak>{{payConditions.info}}</div>
					</div>
				</div>
			</section>
			<section>
				<div class="payMes">
					<span id="payMesTit">{{$t('充值信息')}}</span>
					<p v-cloak>充值订单号：{{orderNum}}</p>
					<p>{{$t('充值金额')}}：<input type="text"  v-model="money" disabled="disabled"/></p>
					<p>真实姓名：<input type="text"  v-model="wxName"/></p>
				</div>
				<p class="payBtn"><input type="button" value="下一步"  @click="clickSure(2)"/></p>
			</section>
	</article>
	</div>
	</div>
 </div>
</template>
<script src="../../assets/js/myCenter/ebank.js"></script>
<style src="../../style/myCenter/centerGlobal.css" scoped></style>
