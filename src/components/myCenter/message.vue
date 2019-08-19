<template>
 <div>
 	<div id="container">
	<div id="message">
		<header id="header">
			<a href="javascript:void(0)"  class="goBack" @click="routerBack"></a>
			<h1>{{$t('短消息内容')}}</h1>
		</header>
		<article id="article">
			<section id="section">
				<ul id="OA_task_1" class="mui-table-view">
					<li class="mui-table-view-cell" v-for="(item,index) in datas" :id="item.id" :readStatus="item.readStatus" :index="index">
						<div class="mui-slider-right mui-disabled">
							<a class="mui-btn mui-btn-green" @click="changeStatus(item.id,index)" v-if="item.readStatus==1">{{$t('标为已读')}}</a>
							<a class="mui-btn mui-btn-yellow" @click="clickMessage(item.id,index)" v-else>{{$t('查看内容')}}</a>
							<a class="mui-btn mui-btn-red" @click="delectMessage(item.id,index,item.readStatus)">{{$t('删除')}}</a>
						</div>
						<div class="mui-slider-handle" @click="clickMessage(item.id,index)" id="showMes" style="position: relative;">
							<span class="mesShu"></span>
							<span class="mesBiao mesBiaoYes" v-if="item.readStatus==1"></span>
							<span class="mesBiao mesBiaoNo" v-else-if="item.readStatus==0"></span>
							<span class="content" v-cloak>{{item.title}}</span>
							<span class="mesTime">{{item.sendDate.slice(0,10)}}</span>
						</div>
					</li>
				</ul>
			</section>
		</article>
		<div id="noMessage">
			<img src="../../assets/images/background.png" height="200rem" />
			<p>{{$t('暂无消息')}}</p>
		</div>
	</div>
	</div>
 </div>
</template>

<script src="../../assets/js/myCenter/message.js"></script>

<style src="../../style/myCenter/centerGlobal.css" scoped></style>
<style>
	#message .mui-table-view-cell:after{
		left: 40px;
	}
</style>