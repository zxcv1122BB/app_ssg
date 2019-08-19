<template>
<div>
    <div id="container">
<div class="markHL hhtz" id="hhtz">
  	<div id="qbhh">
			<noscript>{{$t('请开启浏览器的')}}javascript{{$t('的功能')}}，{{$t('或使用支持')}}javascript{{$t('的浏览器访问')}}</noscript>
			<article id="mainArea">
				<!--页面头部-->
				<header id="header">
					<div class="gameplaySelect" v-cloak>
						<span>{{$t('玩法')}}</span><span class="btn" @click="openGameplayArea($event)">{{playTypeName}}<em class="triangle"></em></span>
						<ul class="gameplayArea clearfix" style="display: none">
							<li @click="changeLoad(25,$event)" data-index="25">{{$t('胜负')}}</li>
							<li @click="changeLoad(26,$event)" data-index="26">{{$t('让分胜负')}}</li>
							<li @click="changeLoad(27,$event)" data-index="27">{{$t('大小分')}}</li>
							<li @click="changeLoad(28,$event)" data-index="28">{{$t('胜分差')}}</li>
							<li @click="changeLoad(24,$event)" data-index="24" style="width: 10rem;">{{$t('混合投注')}}</li>
						</ul>
					</div>
					<a class="goBack" @click="routerBack" href="javascript:void(0)">{{$t('返回')}}</a>
					<span class="league-filter-ico" @click="openLeagueArea"></span>
					<a href="javascript:void(0)" class="question-ico" @click="togohelp"></a>
				</header>
				<!--主要内容-->
				<section class="match-table">
					<div id="pullrefresh">
						<ul class="mui-table-view mui-table-view-chevron">
							<li>
								<div class="content">
									<div id='mainContent'>
										<div class="noMsg" v-if="noDataListReturn" v-cloak><img class="icon" src="../../../assets/images/bg_noMsg_bask.png"><p>{{$t('当前投注没有比赛')}}</p><p>{{$t('您可以到其他投注区查看')}}</p></div>
										<!--主体内容-->
										<template v-for="(items,indexs) of dealData">


										<dl v-if="playType==24" class="match-list">
											<dt class="match-divider" @click="fold_dtHeader($event)" :data-index="indexs"><span class="match-date">{{items.titleDateTime}}</span><em class="match-num">{{items.dataList.length}}场</em><span>{{$t('比赛可投')}}</span><i class="match-foldBtn arrow-ico"></i></dt>
											<dd :key="index" v-if="league_indexList[item.leagueIndex]==1" class="match-item represent" :data-index="item.match_id" :data-sign="item.signNum" v-for="(item,index) of items.dataList">
												<div class="league-nd-time jchh_league-nd-time"><span class="row league-name">{{item.league_name}}</span><span class="row league-num">{{item.sessions}}</span><span class="row league-time">{{item.hours}}:{{item.minutes}}截止</span><span class="detail" @click="skip_detail(item.match_id)"></span></div>
												<div class="options-block jchh-options">
													<span class="game-title row">
														<span class="col guestteam" :data-index="item.away_team_id">
														    <em>{{item.away_team_name}}</em>
													    </span>
														<span class="col vs">VS</span><span class="col hostteam" :data-index="item.home_team_id">
			    											<em>{{item.home_team_name}}</em>
														</span>
												   </span>
												    <span v-if="item.home_win||item.home_lose" style="margin-bottom: .1rem;" class="row"><span class="col game-type c_23c6b1">{{$t('猜胜负')}}</span><span :class="item.home_lose?'col betbtn':'col betbtn unable'" @click="tzItem_click($event,indexs,index,'sf',1)"><span class="row">{{$t('客胜')}}</span><i class="row betinfo">{{item.home_lose?item.home_lose:"0.00"}}</i></span><span :class="item.home_win?'col betbtn':'col betbtn unable'" @click="tzItem_click($event,indexs,index,'sf',0)"><span class="row">{{$t('{{$t('主胜')}}')}}</span><i class="row betinfo">{{item.home_win?item.home_win:"0.00"}}</i></span></span>
												    <!--<span v-else style="margin-bottom: .1rem;" class="row"><span class="col game-type c_23c6b1">{{$t('猜胜负')}}</span><span class="nonsupport">暂不支持</span></span>-->
												    <span v-if="item.letscore_win||item.letscore_lose" style="margin-bottom: .1rem;" class="row"><span class="col game-type c_1fc65e">{{$t('猜让分')}}</span><span :class="item.letscore_win?'col betbtn':'col betbtn unable'" @click="tzItem_click($event,indexs,index,'rf',1)"><span class="row">{{$t('让客胜')}}</span><i class="row betinfo">{{item.letscore_lose?item.letscore_lose:"0.00"}}</i></span><span :class="item.letscore_win?'col betbtn':'col betbtn unable'" @click="tzItem_click($event,indexs,index,'rf',0)"><span class="row">{{$t('让主胜')}}<b :class="item.let_score>0?'rq red':'rq green'">{{item.let_score>0?'+'+item.let_score:item.let_score}}</b></span><i class="row betinfo">{{item.letscore_win?item.letscore_win:"0.00"}}</i></span></span>
												    <!--<span v-else style="margin-bottom: .1rem;" class="row"><span class="col game-type c_1fc65e">{{$t('猜让分')}}</span><span class="nonsupport">暂不支持</span></span>-->
												    <span v-if="item.big_score||item.small_score" class="row"><span class="col game-type c_7ac91c">{{$t('猜总分')}}</span><span :class="item.big_score?'col betbtn':'col betbtn unable'" @click="tzItem_click($event,indexs,index,'dxf',0)"><span class="row score">大于{{item.expect_total_score}}分</span><i class="betinfo">{{item.big_score?item.big_score:"0.00"}}</i></span><span :class="item.small_score?'col betbtn':'col betbtn unable'" @click="tzItem_click($event,indexs,index,'dxf',1)"><span class="row score">小于{{item.expect_total_score}}分</span><i class="betinfo">{{item.small_score?item.small_score:"0.00"}}</i></span>
												    <!--<span v-else class="row"><span class="col game-type c_7ac91c">{{$t('猜总分')}}</span><span class="nonsupport">暂不支持</span></span>-->
												    </span>
												    <span class="betbtn more-option ellipsis" @click="unfold_tzArea(indexs,index)">{{$t('点击展开胜分差投注选项')}}</span>
												</div>
											</dd>
										</dl>
										<dl v-if="playType==25" class="match-list">
											<dt class="match-divider" @click="fold_dtHeader($event)" :data-index="indexs"><span class="match-date">{{items.titleDateTime}}</span><em class="match-num">&nbsp;&nbsp;{{items.dataList.length}}场</em><span>{{$t('比赛可投')}}</span><i class="match-foldBtn arrow-ico"></i></dt>
											<dd :key="index" v-if="league_indexList[item.leagueIndex]==1" class="match-item  match-item-01  represent" :data-index="item.match_id" :data-sign="item.signNum" v-for="(item,index) of items.dataList">
												<div class="league-nd-time"><span class="row league-name">{{item.league_name}}</span><span class="row league-num">{{item.sessions}}</span><span class="row league-time">{{item.hours}}:{{item.minutes}}截止</span><span class="detail" @click="skip_detail(item.match_id)"></span></div>
												<div class="options-block jcsf-options">
													<span :class="item.home_lose?'col betbtn':'col betbtn unable'" :data-index="item.away_team_id" @click="tzItem_click($event,indexs,index,'sf',1)">
													    <em>{{item.away_team_name}}</em>
														<i>({{$t('客胜')}}){{item.home_lose?item.home_lose:"0.00"}}</i>
												    </span><span :class="item.home_win?'col betbtn':'col betbtn unable'" :data-index="item.home_team_id" @click="tzItem_click($event,indexs,index,'sf',0)">
		    											<em>{{item.home_team_name}}</em>
														<i>({{$t('主胜')}}){{item.home_win?item.home_win:"0.00"}}</i>
													</span>
												</div>
											</dd>
										</dl>
										<dl v-if="playType==26" class="match-list">
											<dt class="match-divider" @click="fold_dtHeader($event)" :data-index="indexs"><span class="match-date">{{items.titleDateTime}}</span><em class="match-num">&nbsp;&nbsp;{{items.dataList.length}}场</em><span>{{$t('比赛可投')}}</span><i class="match-foldBtn arrow-ico"></i></dt>
											<dd :key="index" v-if="league_indexList[item.leagueIndex]==1" class="match-item  match-item-01  represent" :data-index="item.match_id" :data-sign="item.signNum" v-for="(item,index) of items.dataList">
												<div class="league-nd-time"><span class="row league-name">{{item.league_name}}</span><span class="row league-num">{{item.sessions}}</span><span class="row league-time">{{item.hours}}:{{item.minutes}}截止</span><span class="detail" @click="skip_detail(item.match_id)"></span></div>
												<div class="options-block jcsf-options">
													<span :class="item.letscore_lose?'col betbtn':'col betbtn unable'" :data-index="item.away_team_id" @click="tzItem_click($event,indexs,index,'rf',1)">
													    <em>{{item.away_team_name}}</em>
														<i>({{$t('客胜')}}){{item.letscore_lose?item.letscore_lose:"0.00"}}</i>
												    </span><span :class="item.letscore_win?'col betbtn':'col betbtn unable'" :data-index="item.home_team_id" @click="tzItem_click($event,indexs,index,'rf',0)">
		    											<em>{{item.home_team_name}}<b :class="item.let_score>0?'rq red':'rq green'">{{item.let_score>0?'+'+item.let_score:item.let_score}}</b></em>
														<i>({{$t('主胜')}}){{item.letscore_win?item.letscore_win:"0.00"}}</i>
													</span>
												</div>
											</dd>
										</dl>
										<dl v-if="playType==27" class="match-list">
											<dt class="match-divider" @click="fold_dtHeader($event)" :data-index="indexs"><span class="match-date">{{items.titleDateTime}}</span><em class="match-num">&nbsp;&nbsp;{{items.dataList.length}}场</em><span>{{$t('比赛可投')}}</span><i class="match-foldBtn arrow-ico"></i></dt>
											<dd :key="index" v-if="league_indexList[item.leagueIndex]==1" class="match-item represent" :data-index="item.match_id" :data-sign="item.signNum" v-for="(item,index) of items.dataList">
												<div class="league-nd-time"><span class="row league-name">{{item.league_name}}</span><span class="row league-num">{{item.sessions}}</span><span class="row league-time">{{item.hours}}:{{item.minutes}}截止</span><span class="detail" @click="skip_detail(item.match_id)"></span></div>
												<div class="options-block jcdxf-options">
													<span class="game-title row">
														<span class="col guestteam" :data-index="item.away_team_id">
														    <em>{{item.away_team_name}}</em>
													    </span><span class="col vs">VS</span><span class="col hostteam" :data-index="item.home_team_id">
			    											<em>{{item.home_team_name}}</em>
														</span>
												    </span>
												    <span class="row dxf"><span :class="item.big_score?'betbtn':'betbtn unable'" @click="tzItem_click($event,indexs,index,'dxf',0)"><span class="row score">大于{{item.expect_total_score}}分</span><i>{{item.big_score?item.big_score:"0.00"}}</i></span><span :class="item.small_score?'betbtn':'betbtn unable'" @click="tzItem_click($event,indexs,index,'dxf',1)"><span class="row score">小于{{item.expect_total_score}}分</span><i>{{item.small_score?item.small_score:"0.00"}}</i></span>
												    </span>
												</div>
											</dd>
										</dl>
										<dl v-if="playType==28" class="match-list">
											<dt class="match-divider" @click="fold_dtHeader($event)" :data-index="indexs"><span class="match-date">{{items.titleDateTime}}</span><em class="match-num">&nbsp;&nbsp;{{items.dataList.length}}场</em><span>{{$t('比赛可投')}}</span><i class="match-foldBtn arrow-ico"></i></dt>
											<dd :key="index" v-if="league_indexList[item.leagueIndex]==1" class="match-item match-item-01 represent" :data-index="item.match_id" :data-sign="item.signNum" v-for="(item,index) of items.dataList">
												<div class="league-nd-time"><span class="row league-name">{{item.league_name}}</span><span class="row league-num">{{item.sessions}}</span><span class="row league-time">{{item.hours}}:{{item.minutes}}截止</span><span class="detail" @click="skip_detail(item.match_id)"></span></div>
												<div class="options-block jcsfc-options">
													<span class="game-title row"><span class="col guestteam" :data-index="item.away_team_id">{{item.away_team_name}}</span><span class="col vs">VS</span><span class="col hostteam" :data-index="item.home_team_id">{{item.home_team_name}}</span></span>
													<span class="betbtn more-option ellipsis" @click="unfold_tzArea(indexs,index)" :data-index="item.match_id">{{$t('点击展开胜分差投注选项')}}</span>
												</div>
											</dd>
										</dl>

										</template>
									</div>
								</div>
							</li>
						</ul>
					</div>


					<!--赛事筛选按钮的弹出框-->
					<div id="competition-screen" style="display: none;">
						<div class="screen-content">
							<h1>{{$t('赛事赛选')}}
								<span class="total">共
									<em class="competition-total">0</em>
								{{$t('场比赛')}}
								</span>
							</h1>
							<div class="screnn-main">
								<div class="filter-tab">
									<span class="screen-all" @click="leagueScreen_selectAll">{{$t('全选')}}</span>
									<span class="screen-reverse" @click="leagueScreen_selectReversal">{{$t('反选')}}</span>
								</div>
								<ul class="competition-option">
									<li :key="index" class="active" v-for="(item,index) of leagueNameList" :data-index="index" @click="leagueScreen_click($event,index)">{{item}}</li>
								</ul>
							</div>
							<a href="javascript:void(0)" class="screen-btnSure" @click="leagueScreen_confirm">
								<span>{{$t('确定')}}</span>
							</a>
						</div>
						<div class="screen-wrap"></div>
					</div>
				</section>
				<!--固定在底下的按钮-->
				<section class="bet-bottom">
					<div class="bottom-box">
						<span class="bet-help"><i></i>{{$t('开奖结果不含加时赛及点球结果')}}</span>
						<span class="box-center hide">{{$t('已选择')}} <em class="match-num">0</em> {{$t('场比赛')}}<span class="btn-cancel" @click="clearSelectData"><i class="trash_icon"></i>{{$t('清空')}}</span></span>
						<span class="btn-confirm" data-index="0" @click="bottom_click()">{{$t('请选择比赛结果')}}</span>
					</div>
				</section>
				<!--点击选好了下一步的弹出框-->
				<section class="goNext hide">
					<div class="bottom-box">
						<p class="box-header">
							{{$t('已经选择')}}2{{$t('场比赛')}}
						</p>
						<i class="close" @click="goNext_close_click"></i>
						<div class="box-method">
							<div class="count">
								<span @click="freeArea_open($event)">
									<i class="gameplay">{{tzType_free_html}}</i>
									<i class="arrow-ico"></i>
								</span>
								<div class="multiple">
									<span>{{$t('买')}}</span><span class="inputBox">
									<span class="minus" @click="changeMultiple(1,'-1')"></span><span class="center"><input id="multipleNum" type="number" v-model="multiple"/>
									</span><span class="add" @click="changeMultiple(1,'+1')"></span>
									<span>{{$t('倍')}}</span>
									</span>
								</div>
							</div>
							<div class="methods hide">
								<div class="method-wrap">
									<span :key="index" :class="(tzType_freeShow[parseInt(item=='单关'?1:item)-1]==1)?'method active':'method'" :data-index="parseInt(item=='单关'?1:item)" v-for="(item,index) of tzType_freeList" @click="tzTypeFreeList_click($event,item)">{{item}}<i class="isSelect"></i></span>
								</div>
								<span class='tip'>{{$t('串的场次越多')}}，{{$t('奖金越高')}}，{{$t('但中奖难度也越大哦')}}</span>
							</div>
							<p class="state"><span>{{user_state}}</span></p>
							<p class="fixMultiple"><span @click="changeMultiple($event,'+10')">10倍</span><span @click="changeMultiple($event,'+20')">20倍</span><span @click="changeMultiple($event,'+50')">50倍</span><span @click="changeMultiple($event,'+100')">100倍</span></p>
							<p class="sum">{{$t('预计奖金')}}
								<span class="totalNum" data-index="1">{{totalNum}}{{coinUnit}}</span>
							</p>
							<div class="paymentBtn" @click="payment_click($event)">
								<span>
								{{$t('立即付款')}}
								<i class="payNum">{{tz_sumNum*2*multiple}}</i>{{coinUnit}}
							</span>
							</div>
						</div>
						<div class="bet-agree">
							<i></i><span>{{$t('我已阅读并同意')}}</span>
							<span>《{{$t('委托投注规则')}}》</span>
						</div>
					</div>
				</section>
				<!--展开全部的按钮对应的弹出框-->
				<div class="iDialogWrap">
					<div class="iDialog" style="display: none;">
						<div id="iDialogContent" class="iDialogContent">
							<div class="iDialogBody">
								<div class="iDialogMain">
								<span class="game-title row"><span class="col guestteam">{{tzArea_dataList.away_team_name}}(客)</span><span class="col vs">VS</span><span class="col hostteam">{{tzArea_dataList.home_team_name}}(主)</span></span>
								<div class="game-listBody">
									<div data-select="0" class="represent">
										<dl>
											<dt class="data-inf">{{$t('客')}}<br>{{$t('胜')}}</dt>
											<dd class="options-block">
												<span class="row">
													<span :class="tzArea_dataList.lose1_5?'col betbtn':'col betbtn unable'" data-index="6" @click="tzItem_click($event,nowSfcIndexs,nowSfcIndex,'sfc',6)"><span class="row fen">1-5分</span><span class="row betinfo">{{tzArea_dataList.lose1_5?tzArea_dataList.lose1_5:"0.00"}}</span></span>
													<span :class="tzArea_dataList.lose6_10?'col betbtn':'col betbtn unable'" data-index="7" @click="tzItem_click($event,nowSfcIndexs,nowSfcIndex,'sfc',7)"><span class="row fen">6-10分</span><span class="row betinfo">{{tzArea_dataList.lose6_10?tzArea_dataList.lose6_10:"0.00"}}</span></span>
													<span :class="tzArea_dataList.lose11_15?'col betbtn':'col betbtn unable'" data-index="8" @click="tzItem_click($event,nowSfcIndexs,nowSfcIndex,'sfc',8)"><span class="row fen">11-15分</span><span class="row betinfo">{{tzArea_dataList.lose11_15?tzArea_dataList.lose11_15:"0.00"}}</span></span>
												</span><span class="row">
													<span :class="tzArea_dataList.lose16_20?'col betbtn':'col betbtn unable'" data-index="9" @click="tzItem_click($event,nowSfcIndexs,nowSfcIndex,'sfc',9)"><span class="row fen">16-20分</span><span class="row betinfo">{{tzArea_dataList.lose16_20?tzArea_dataList.lose16_20:"0.00"}}</span></span>
													<span :class="tzArea_dataList.lose21_25?'col betbtn':'col betbtn unable'" data-index="10" @click="tzItem_click($event,nowSfcIndexs,nowSfcIndex,'sfc',10)"><span class="row fen">21-25分</span><span class="row betinfo">{{tzArea_dataList.lose21_25?tzArea_dataList.lose21_25:"0.00"}}</span></span>
													<span :class="tzArea_dataList.lose26?'col betbtn':'col betbtn unable'" data-index="11" @click="tzItem_click($event,nowSfcIndexs,nowSfcIndex,'sfc',11)"><span class="row fen">26分以上</span><span class="row betinfo">{{tzArea_dataList.lose26?tzArea_dataList.lose26:"0.00"}}</span></span>
												</span>
											</dd>
										</dl>
										<dl>
											<dt class="data-inf">{{$t('主')}}<br>{{$t('胜')}}</dt>
											<dd class="options-block">
												<span class="row">
													<span :class="tzArea_dataList.win1_5?'col betbtn':'col betbtn unable'" data-index="0" @click="tzItem_click($event,nowSfcIndexs,nowSfcIndex,'sfc',0)"><span class="row fen">1-5分</span><span class="row betinfo">{{tzArea_dataList.win1_5?tzArea_dataList.win1_5:"0.00"}}</span></span>
													<span :class="tzArea_dataList.win6_10?'col betbtn':'col betbtn unable'" data-index="1" @click="tzItem_click($event,nowSfcIndexs,nowSfcIndex,'sfc',1)"><span class="row fen">6-10分</span><span class="row betinfo">{{tzArea_dataList.win6_10?tzArea_dataList.win6_10:"0.00"}}</span></span>
													<span :class="tzArea_dataList.win11_15?'col betbtn':'col betbtn unable'" data-index="2" @click="tzItem_click($event,nowSfcIndexs,nowSfcIndex,'sfc',2)"><span class="row fen">11-15分</span><span class="row betinfo">{{tzArea_dataList.win11_15?tzArea_dataList.win11_15:"0.00"}}</span></span>
												</span><span class="row">
													<span :class="tzArea_dataList.win16_20?'col betbtn':'col betbtn unable'" data-index="3" @click="tzItem_click($event,nowSfcIndexs,nowSfcIndex,'sfc',3)"><span class="row fen">16-20分</span><span class="row betinfo">{{tzArea_dataList.win16_20?tzArea_dataList.win16_20:"0.00"}}</span></span>
													<span :class="tzArea_dataList.win21_25?'col betbtn':'col betbtn unable'" data-index="4" @click="tzItem_click($event,nowSfcIndexs,nowSfcIndex,'sfc',4)"><span class="row fen">21-25分</span><span class="row betinfo">{{tzArea_dataList.win21_25?tzArea_dataList.win21_25:"0.00"}}</span></span>
													<span :class="tzArea_dataList.win26?'col betbtn':'col betbtn unable'" data-index="5" @click="tzItem_click($event,nowSfcIndexs,nowSfcIndex,'sfc',5)"><span class="row fen">26分以上</span><span class="row betinfo">{{tzArea_dataList.win26?tzArea_dataList.win26:"0.00"}}</span></span>
												</span>
											</dd>
										</dl>
									</div>
								</div>
								<div class="confirmBox">
									<em class="cancel" @click="cancel_tzArea()">{{$t('取消')}}</em>
									<em class="confirm" @click="confirm_tzArea()">{{$t('确定')}}</em>
								</div>
							</div>
						</div>
						</div>
					</div>
					<div class="iDialogLayout" style="display:none ;"></div>
				</div>
			</article>

			<!--底下按钮对应的弹出框-->
			<div class="bet-confirm" style="display:none ;">
				<div></div>
				<div>
					<a href="javascript:void(0)">{{$t('确定')}}</a>
				</div>
			</div>
			<!--立即付款的弹出框-->
			<div id="payMsgContent" class="lowHeight"></div>
			<div id="showSelectContent" class="hide">
				<!--页面头部-->
				<header class="header">
					<h1>{{$t('确认投注')}}</h1>
					<a class="goback close" href="javascript:void(0)">
						{{$t('返回')}}
					</a>
				</header>
				<div class="selectContent">
					<div>
						<p>{{$t('投注单')}}</p>
					</div>
					<div class="selectMain">

					</div>
				</div>
			</div>
			<div id='sharkit' @click="sharkitFn" :class="(playType==28||playType==33)?'hide':''"></div>
			<audio class="hide" id="audio_shark" src="./static/res/shark_voice.mp3"  preload="auto"></audio>
			<div id="loading_wait"></div>

			<div class="canvasWrap">
				<canvas id="coverRandow" width="" height=""></canvas>
			</div>
		</div>
</div>
</div>
  </div>
</template>

<script src="../../../assets/js/sg/qbhh.js"></script>

<style src="../../../style/sg/qb.css" scoped></style>
