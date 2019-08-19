<template>
	<div>
		<div id="container">
			<div id="mesContent">
				<header id="header">
					<a href="javascript:void(0)" class="goBack" @click="routerBack"></a>
					<h1>{{$t('短消息内容')}}</h1>
				</header>
				<article id="article">
					<section>
						<div class="mesContent">
							<div>{{title}}</div>
							<div v-cloak>{{contents}} </div>
						</div>
					</section>
				</article>
			</div>
		</div>
	</div>
</template>

<script src="../../assets/js/myCenter/mesContent.js"></script>

<style src="../../style/myCenter/centerGlobal.css" scoped></style>