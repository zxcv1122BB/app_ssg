<template>
 <div>
 	<div id="container">
	<div id="moreMes">
		<header id="header">
	    <a href="javascript:void(0)"  class="goBack" @click="routerBack"></a>
	    <h1>{{$t('投注详情')}}</h1>
	</header>
	<article id="article"  v-cloak>
		<section>
			<div class="headerTit">{{$t('订单详情')}}</div>
			<div class="section">
				<ul  >
					<!--<li>订单号：<span  > {{mes.orderId}}</span><span class="copy" @click="copyTxt($event,mes.orderId)">{{$t('复制')}}</span></li>-->
					<li>订单号：<span id="aaa"  > {{mes.orderId}}</span>
						<span type="button"
						     v-clipboard:copy="mes.orderId"
						     v-clipboard:success="onCopy"
						     v-clipboard:error="onError" class="copy">{{$t('复制')}}</span>
					</li>
					<li>彩种：<span  >{{mes.gameName}}<span v-if="mes.type==2"  >-{{mes.groupName}}</span></span></li>
					<li v-if="!mes.show">玩法：<span  >{{mes.betType}}</span></li>
					<li>出票状态：<span class="changeCol"  >{{mes.ticketStatus==1?'出票成功':'出票中'}}</span></li>
					<li>{{$t('投注金额')}}：<span  >{{mes.amount}}{{coinUnit}}</span></li>
					<li v-if="mes.type!=2">{{$t('预计奖金')}}：<span  >{{mes.expectBonuses}}{{coinUnit}}</span></li>
					<li>{{$t('中奖金额')}}：
						<span v-if="mes.isCal==1">
							<span v-if="mes.status==1" class="changeCol">{{mes.bonus}}<span v-if="mes.type!=2"  >{{coinUnit}}</span></span>
							<span v-else-if="mes.status==0" style="color: green;">{{$t('未中奖')}}</span>
							<span v-else>{{mes.status==0?"未中奖":(mes.status==2?"撤单":"成功")}}</span>
						</span>
						<span v-else-if="mes.isCal==2">{{$t('开奖失败')}}</span>
						<span v-else v-cloak>{{mes.status==2?"撤单":"未开奖"}}</span>
					</li>
					<li v-if="mes.show">期号：<span>{{mes.actionNo}}</span></li>
				</ul>
			</div>
		</section>
		<section>
			<div class="headerTit" v-if="mess">{{$t('投注详情')}}<span style="font-size: 0.8rem;">(点击省略号查看更多)</span></div>
			<div class="section sectul" v-for="(item,index) in mess">
				<ul  >
					<li  ><span  >{{item.matchDate}}({{item.matchSessions}})</span> <span  >{{item.homeTeamName}} vs {{item.awayTeamName}}</span><span v-if="item.guts==1" class="isDan">{{$t('胆')}}</span><span v-if="item.matchStatus==0" class="overMatch">{{$t('已结束')}}</span></li>
					<li v-if="item.guessList&&item.guessList.length>0" class="macthMes" @click="clickMore(index,1)" isClick="1"  >
						竞猜<em v-if="item.quizSign">({{item.quizSign}})</em>：<span v-for="gus in item.guessList"  >
								<span  class="guessYes" v-if="gus.quizResults==1"  >{{gus.quizName}}{{gus.letScore}}<span v-if="!mes.show&&gus.odds"  >({{gus.odds}})</span></span>
								<span  v-else  >{{gus.quizName}}{{gus.letScore}}<span v-if="!mes.show&&gus.odds"  >({{gus.odds}})</span></span>
							</span>
					</li>
					<li v-else>竞猜：暂无</li>
					<li v-if="item.resultList&&item.resultList.length>0" class="macthMes" @click="clickMore(index,2)" isClick="1"  >
						彩果<em v-if="item.quizSign">({{item.quizSign}})</em>：<span v-for="res in item.resultList"  >
							<span  class="guessYes" v-if="res.quizResults==1"  >{{res.quizName}}{{res.letScore}}</span>
							<span  v-else  >{{res.quizName}}{{res.letScore}}</span>
						</span>
					</li>
					<li v-else>彩果：暂无</li>
					<li v-if="!mes.show">
						比分：<span   v-if="item.courtScore!=null">{{item.courtScore}}</span>
							<span v-else>{{$t('暂无')}}</span>

					</li>
				</ul>
			</div>
		</section>
		<section v-if="finePrizeListFlag">
			<div class="headerTit">{{$t('中奖详情')}}</div>
			<div class="section">
				<ul>

				</ul>
				<ul>
					<li><strong  >奖金总计:<font color="red"  > <span></span>{{mes.bonus}}</font>{{coinUnit}}</strong></li>
					<li class="avg" v-for="(item,index) in finePrizeList"  >
						{{item.seriesName}}:
						<em v-for="items in finePrizeList[index].list"  >([{{items.matchDate}}{{items.matchSessions}}]{{items.odds}})x</em>
						2{{coinUnit}}x{{item.times}}倍<span v-if="mes.type == 3"  >x{{returnAwardRate}}%</span>={{item.total}}{{coinUnit}}
					</li>
				</ul>
			</div>
		</section>
		<a href="javascript:void(0)" @click='togotickDet'><div class="ticket">{{$t('出票明细')}}<span><img src="../../assets/images/img_right.gif"/></span></div></a>
	</article>
	</div>
	</div>
 </div>
</template>

<script src="../../assets/js/myCenter/moreMes.js"></script>

<style src="../../style/myCenter/centerGlobal.css" scoped></style>
