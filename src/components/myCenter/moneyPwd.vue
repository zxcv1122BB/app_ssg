<template>
 <div>
 	<div id="container" style="">
	<div id="monPwd">
		<header id="header">
			<a href="javascript:void(0)"  class="goBack" @click="routerBack"></a>
			<h1>{{$t('设置资金密码')}}</h1>
		</header>
		<article id="article">
			<form action="">
				<section>
					<p class="huiTi"></p>
					<div>
						<p><span style="color:#fff;">{{$t('资金密码')}}</span><input type="password" pattern="[0-9]*" placeholder="请输入6位数字" v-model="password1" id="password1" />
						</p>
						<p><span style="color:#fff;">{{$t('确认密码')}}</span><input type="password" pattern="[0-9]*" placeholder="请确认资金密码" v-model="password2" id="password2" />
						</p>
					</div>

					<p id="prompt"></p>
					<P><input type="button" value="确认" class="btnSure" @click="updateMoneyPwd(password1,password2);" /></P>
				</section>
			</form>
		</article>
	</div>
	</div>
 </div>
</template>

<script src="../../assets/js/myCenter/moneyPwd.js"></script>

<style src="../../style/myCenter/centerGlobal.css" scoped></style>
<style scoped>
.custome-ba142b	#container{
		background: url(../../assets/images/base/black_bg.png)no-repeat;
		background-size: 100% 100%;
	}
</style>

