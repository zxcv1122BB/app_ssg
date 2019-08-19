<template>
  <div>
    <div id="container">
	<div id="ticDetails">
		<header id="header">
			<a href="javascript:void(0)"  class="goBack" @click="routerBack"></a>
			<h1>{{$t('出票明细')}}</h1>
		</header>
		<article id="article">
			<section id="ticketDetailsStr" v-if="typeId == 2">
				<ul>
					<li v-for="item in ticketDetailsStr" v-cloak>
						{{item}}
					</li>
				</ul>
			</section>
			<section id="ticDetails" v-else>
				<table>
					<thead>
						<tr>
							<th>{{$t('过关')}}</th>
							<th>{{$t('倍数')}}</th>
							<th>{{$t('票面信息')}}</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item,index) in ticketDetailsList">
							<td v-cloak>{{item.seriesName}}</td>
							<td v-cloak>{{item.times}}倍</td>
							<td v-cloak>
								<span v-for="items in ticketDetailsList[index].list" v-cloak class="list">
									<em class="fenge">/</em>{{items.matchDate}}<span v-if="items.matchSessions!=null" v-cloak>({{items.matchSessions}})</span>
								<span v-if="items.quizOptions!=null" v-cloak>:[{{items.quizOptions}}<span v-if="items.odds!=null" v-cloak>={{items.odds}}</span>]</span>
								</span>
							</td>
						</tr>
					</tbody>

				</table>
				<!--加载更多-->
				<div class="has-more" style="text-align: center;line-height: 40px;background-color: #f5f4f4;color: #666;"></div>
			</section>
			<div id="noMessage">
				<img src="../../assets/images/background.png" height="200rem" />
				<p>{{$t('暂无数据')}}</p>
			</div>
		</article>
	</div>
	</div>
 </div>
</template>

<script src="../../assets/js/myCenter/ticketDetails.js"></script>

<style src="../../style/myCenter/centerGlobal.css" scoped></style>
