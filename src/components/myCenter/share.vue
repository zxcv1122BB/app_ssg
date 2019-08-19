<template>
  <div>
    <div id="container">
	<div id="moreMes">
		<header id="header">
		    <a href="javascript:void(0)"  class="goBack" @click="routerBack"></a>
		    <h1>{{$t('分享好友')}}</h1>
		</header>
		<article id="article">
			<section>
				<div class="headerTit">
					我的推广码<span type="button"
						     v-clipboard:copy="isTrue.promotionCode"
						     v-clipboard:success="onCopy"
						     v-clipboard:error="onError" class="copy">{{$t('复制')}}</span>
				</div>
				<div  class="procode" v-cloak >
					<span v-if='isTrue.promotionCode'>{{isTrue.promotionCode}}</span>
					<span v-else>{{$t('当前为试玩账号')}}</span>
				</div>
				<share :con-fig="config" data-sites="qzone, qq, weibo,wechat,douban"  :data-url=promotionUrl :data-title=webName :data-description=description ></share>
			</section>
		</article>
	</div>
	</div>
 </div>
</template>

<script src="../../assets/js/myCenter/share.js"></script>

<style src="../../style/myCenter/centerGlobal.css" scoped></style>
<style>
	.social-share{
		margin-left: 5rem;
	}
</style>
