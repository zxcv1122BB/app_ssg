//代理报表
<template>
	<div>
		<div id="container">
			<div>
				<header id="header">
					<a class="goBack" href="javascript:void(0)" @click="routerBack"></a>
					<h1>{{$t('下级报表')}}</h1>
					<a href="javascript:void(0)" id="timeC">{{timeC}}</a>
				</header>
				<div class="main">

					<table class="col3Table col3TableTitle" style="top:2.67rem">
						<tbody>
							<tr>
								<th>{{$t('账号')}}</th>
								<th>{{$t('类型')}}</th>
								<th>{{$t('投注人数')}}</th>
								<th>{{$t('盈利')}}</th>
							</tr>
						</tbody>
					</table>
          <div id="mainTit">{{$t('下级报表非即时统计，可能有5-10分钟的延迟，请稍等片刻')}}</div>
		  <div class="tabList">
			<table class="ajaxContent col3Table col3TableCon">
						<tbody id="section">
							<tr v-for="(item,index) in datas" @click="details(item)" v-bind:key="index">
								<td class="blue">{{item.user_name}}</td>
								<td>{{item.level}}{{$t('级')}}{{item.user_type==1?$t('代理'):$t('玩家')}}</td>
								<td>{{item.betCount}}</td>
								<td>{{item.profit}}{{coinUnit}}</td>
							</tr>
							<!--加载更多-->
							<tr>
								<td colspan="4" class="has-more" style="text-align: center;line-height: 40px;background-color: #8c8c8c;color: #fff;"></td>
							</tr>
						</tbody>
						<div class="fullPageMsg" id="noMessage">
							<div class="fullPageIcon iconfont1">&#xe66b;</div>
							<p>{{$t('暂无记录')}}</p>
						</div>
					</table>
		  </div>
					<table class="ajaxContent col3Table col3TableCon">
						<tbody id="section">
							<tr v-for="(item,index) in datas" @click="details(item)" v-bind:key="index">
								<td class="blue">{{item.user_name}}</td>
								<td>{{item.level}}{{$t('级')}}{{item.user_type==1?$t('代理'):$t('玩家')}}</td>
								<td>{{item.betCount}}</td>
								<td>{{item.profit}}{{coinUnit}}</td>
							</tr>
							<!--加载更多-->
							<tr>
								<td colspan="4" class="has-more" style="text-align: center;line-height: 40px;background-color: #8c8c8c;color: #fff;"></td>
							</tr>
						</tbody>
						<div class="fullPageMsg" id="noMessage">
							<div class="fullPageIcon iconfont1">&#xe66b;</div>
							<p>{{$t('暂无记录')}}</p>
						</div>
					</table>

				</div>
				<div class="popover">
					<div class="popover_content">
						<ul>
							<li>
								<span>{{$t('更多信息')}}</span>
								<i class="iconfont" style="float: right;font-size: 24px;"  @click="closepop()">&#xe605;</i>
							</li>
							<li>
								<span>{{$t('账号')}}</span>: <i class="blue">{{datamore.user_name}}</i>

							</li>
							<li>
								<span>{{$t('类型')}}</span>: <i>{{datamore.level}}级{{datamore.user_type==1?$t('代理'):$t('玩家')}}</i>
							</li>
							<li>
								<span>{{$t('投注金额')}}</span>: <i>{{datamore.betAmount}}</i>
							</li>
							<li>
								<span>{{$t('中奖金额')}}</span>: <i>{{datamore.bonusAmount}}</i>

							</li>
							<li>
								<span>{{$t('投注返利')}}</span>: <i>{{datamore.betRebate }}</i>

							</li>
							<li>
								<span>{{$t('返点金额')}}</span>: <i>{{datamore.rebateAmount}}</i>

							</li>
							<li>
								<span>{{$t('活动礼金')}}</span>: <i>{{datamore.activeAmount}}</i>

							</li>
							<li>
								<span>{{$t('投注人数')}}</span>: <i>{{datamore.betCount}}</i>

							</li>
							<li>
								<span>{{$t('盈利')}}</span>: <i>{{datamore.profit}}</i>
							</li>
						</ul>
					</div>

				</div>
			</div>
		</div>
	</div>
</template>

<script src="../../assets/js/agency/lowerReport.js"></script>
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
	.col3TableTitle{
		    position: initial;
	}
	.col3TableCon{
		margin-top: 0;
	}
  }

}
</style>
