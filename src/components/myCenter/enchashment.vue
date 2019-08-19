<template>
 <div>
 	<div id="container">
	<div id="enchash">
		<header id="header"> 	
			<a href="javascript:void(0)" class="goBack" @click="routerBack"></a>
			<h1>{{$t('提现')}}</h1>
		</header>
		<article id="article" v-cloak>
			<section>
				<p style="color:#fff" v-cloak>{{$t('可用余额')}}：<em>{{balanceNow}}</em>{{coinUnit}}</p>
				<p style="color:#fff" v-cloak>返点金额：<em>{{agentCoin}}</em>{{coinUnit}}</p>
				<div class="bankMes">
					<ul>
						<li>{{$t('银行名称')}}：<span id="bankName"></span> </li>
						<li>{{$t('银行卡号')}}：<span id="bankNum"></span> </li>
					</ul>
				</div>
				<div class="hint">
					<div>提示信息：</div>
					<div v-if="config.onlineCSStatus==1">每天的取款处理时间为：<span v-cloak>{{config.onlineCSStartTime}}至{{config.onlineCSEndTime}}</span>;</div>
					<div>取款1-3分钟内到帐。（如遇高峰期，可能需要延迟到5-10分钟内到帐）</div>
					<div><span v-if="config.drawingSumlowerLimit" v-cloak>{{$t('用户每次最小提现')}}<span v-cloak>{{config.drawingSumlowerLimit}}</span>{{coinUnit}}，</span><span v-if="config.drawingSumUpperLimit" v-cloak>{{$t('最大提现')}}<span v-cloak>{{config.drawingSumUpperLimit}}</span>{{coinUnit}}</span>
					</div>
					<div>{{$t('今日')}}<em v-if="config.drawingCountLimit">{{$t('可取款')}}<span v-cloak>{{config.drawingCountLimit}}</span>次，</em>{{$t('已取款')}}<span v-cloak>{{isTrue.withdrawTimes}}</span>{{$t('次')}}</div>
				</div>
				<div> 
					<p v-cloak>提款需达投注量：<em v-cloak>{{isTrue.withdrawNeedSum}}</em>{{coinUnit}}</p>
					<p v-cloak>已达投注量：<em v-cloak>{{isTrue.betsum}}</em>{{coinUnit}}</p>
				</div>
				<form>
					<p><input  type="number" pattern="[0-9]*" placeholder="请输入提现金额（只能输入数字）" @keyup="getNum()" v-model="cash"  style="    background-color: gainsboro;    margin-top: 10px;"/></p>
					<p style="margin-top: 0.1rem;margin: 1rem 0rem;color:#fff" v-cloak>可提现金额：<em id="balanceNow" v-cloak>{{balanceNow}}</em>{{coinUnit}}
						<a id="allCash" @click="allCash">{{$t('全部提现')}}</a>
					</p>
					<p class="prompt"></p>
					<yd-button size="large" type="primary" @click.native="clickPan">{{$t('确认提现')}}</yd-button>

					<yd-keyboard v-model="show2" :callback="done2" :title=webName disorder ref="keyboardDemo2"></yd-keyboard>

					<!--<p><input type="button" value="确认" class="btnSure"/></p>-->
				</form>
			</section>
		</article>
	</div>
	</div>
 </div>
</template>

<script src="../../assets/js/myCenter/enchashment.js"></script>

<style src="../../style/myCenter/centerGlobal.css" scoped></style>
<style scoped>
	#enchash .yd-keyboard {
		height: 20rem;
	}

	#enchash .yd-keyboard-numbers>li>a {
		height: 2.8rem;
		font-size: 1.2rem;
	}

	#enchash .yd-keyboard-password li {
		height: 2.5rem;
	}

  #enchash 	.yd-keyboard-head {
		height: 2.5rem;
	}

	#enchash .yd-keyboard-head strong {
		font-size: 1.2rem;
	}

	#enchash .yd-keyboard-error,
	#enchash .yd-keyboard-title {
		height: 1.5rem;
		line-height: 1.5rem;
	}

	#enchash .yd-keyboard-error {
		font-size: .8rem;
	}

	#enchash .yd-btn-primary {
		width: 90%;
		border: 0;
		/* background: #ba142b; */
		color: white;
		height: 2.8rem;
		margin-left: 5%;
	}
	#enchash .yd-keyboard-numbers>li:last-child>a:last-child:after{
		font-size: 1.2rem;
	}
	.custome-ba142b #container{
		/* background: url(../../assets/images/base/black_bg.png);
		background-size: 100% 100%; */
		    background: url(../../assets/images/base/black_bg.png) no-repeat;
    background-size: 100% 100%;
		/* height: 100%; */
	}
	#enchash #article .hint,#enchash #article .bankMes,#enchash #article div{
		margin: 0;background-color: gainsboro;
	}
	#enchash #article .bankMes{
		margin-top: 1rem;
	}
	#enchash #article form input[type=text]{
		border-radius: 0;
	}
</style>
