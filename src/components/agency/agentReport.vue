//代理报表
<template>
	<div>
		<div id="container">
			<div>
				<header id="header">
					<a class="goBack" href="javascript:void(0)" @click="routerBack"></a>
					<h1>{{$t('代理报表')}}</h1>
					<a href="javascript:void(0)" id="timeC">{{timeC}}</a>
				</header>
				<div class="main clearfix">
					<div id="mainTit">{{$t('代理报表非即时统计，可能有5-10分钟的延迟，请稍等片刻')}}</div>
					<div class="searchBtn">
						<div class="searchCon"><input type="text" :placeholder="$t('下级报表查询')" class="user-input proxySearch" v-model="lowerAgent"></div>
						<a id="submitBtn" @click="getdatas()">
							<div class="submitTouch"><i class="iconfont1">&#xe62b;</i></div>
						</a>
					</div>
					<ul class="PLSdetail fix">
						<li><span>{{datas.betAmount}}</span>{{$t('投注金额')}}</li>
						<li><span>{{datas.bonusAmount}}</span>{{$t('中奖金额')}}</li>
						<li><span>{{datas.betRebate}}</span>{{$t('投注返利')}}</li>
						<li><span>{{datas.activeAmount}}</span>{{$t('活动礼金')}}</li>
						<li><span>{{datas.teamAgentRebate}}</span>{{$t('团队返点')}}</li>
						<li><span>{{datas.teamProfit}}</span>{{$t('团队盈利')}}</li>
						<li><span>{{datas.cashinAmount}}</span>{{$t('充值金额')}}</li>
						<li><span>{{datas.cashoutAmount}}</span>{{$t('提现金额')}}</li>
						<li><span>{{datas.firstCashinMoneyCount}}</span>{{$t('首充人数')}}</li>
						<li><span>{{datas.registerUserCount}}</span>{{$t('注册人数')}}</li>
						<li><span>{{datas.betCount}}</span>{{$t('投注人数')}}</li>
						<li><span>{{datas.downAgentCount}}</span>{{$t('下级人数')}}</li>
						<li><span>{{datas.teamBalance}}</span>{{$t('团队余额')}}</li>
						<li><span>{{datas.currentAgentRebate}}</span>{{$t('代理返点')}}</li>
					</ul>
					<div style="clear: both;"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script src="../../assets/js/agency/agentReport.js"></script>
<style src="../../style/common/shijian.css" scoped></style>
<!--<style src="../../../style/ng/ssc.css" scoped></style>-->
<style src="../../style/agency/agentReport.css" scoped></style>
<style lang="less" scoped>
#container{
  height: 100%;
  background: url(../../assets/images/base/black_bg.png)no-repeat ;
  background-size: 100% 100%;
  .main{
    margin-top: 44px;
    #mainTit{
		color: #ddd;
		    text-indent: .3rem;
	}
	// .PLSdetail{
	// 	background-color: rgba(255,255,255,.9);
	// }
	.searchBtn{
		background: initial !important;
	}
		.PLSdetail{
			background: url(../../assets/images/base/black_bg.png) no-repeat;
			background-size: 100% 100%;
			color: #fff;
			overflow: scroll;
			li{
				    padding: .5rem 0;
				span{
					line-height: 2rem;
				}
			}
		}
  }

}
</style>
