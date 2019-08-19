<template>
	<div>
		<div id="container">
			<div id="userSign">
				<header id="header">
					<a href="javascript:void(0)"  class="goBack" @click="routerBack"></a>
					<h1>{{$t('签到')}}</h1>
				</header>
				<article id="article">
					<section id="section" style="display: block;">
						<div v-cloak>
							<input type="button" v-if="status==0" value="签到" id="signBtn" class="signBtn" />
							<input v-else type="button" value="已签到" style="background: #999;" class="signBtn" />
						</div>
						<ul id="signDays">
							<li v-for="(obj,index) in rewardModel">
								<span v-if="signStatus[index]==0"><img src="../../assets/images/sign.png"/></span>
								<span v-else><img src="../../assets/images/sign_yes.png"/></span>
								<div>奖励{{obj}}{{coinUnit}}</div>
							</li>
						</ul>
						<div class="clear" style="color: red;padding-top: 2rem;">*注:当连续签到中断后，则回到初始签到状态重新累计连续签到天数；</div>
						<div class="extraReward" v-if="extraReward.length!=0" v-cloak>
							<h4>额外奖励:</h4>
							<p v-for="(obj,index) in extraReward">{{$t('签到')}}<span>{{obj[0]}}</span>天，奖励<span>{{obj[1]}}</span>{{coinUnit}}</p>
						</div>
					</section>

				</article>
			</div>
		</div>
	</div>
</template>

<script src="../../assets/js/myCenter/userSign.js"></script>

<style src="../../style/myCenter/centerGlobal.css" scoped></style>