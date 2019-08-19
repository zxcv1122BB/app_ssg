<template>
	<div>
		<div id="container">
			<div id="app">
				<!--头部-->
				<header id="header">
					<a href="javascript:void(0)" class="goBack" @click="routerBack"></a>
					<h1>{{$t('在线客服')}}</h1>
				</header>
				<div class="content">
					<div class="cImg">
						<div class="tit">Line{{$t('官方客服')}}</div>
						<img src="/static/images/L.png" alt="">
						<p class="c_gray">SSG娱乐 Line{{$t('官方客服')}} </p>
					</div>

				</div>
				<!-- <iframe id="a1" name="iframe" frameborder="0" min-height="100%" width="100%" :src="url" scrolling="auto"></iframe> -->
			</div>
		</div>
	</div>
</template>

<script src="../../assets/js/service/onlineService.js"></script>

<style src="../../style/service/customerService.css" scoped></style>
