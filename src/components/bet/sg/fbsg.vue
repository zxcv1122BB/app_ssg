<template>
  <div>
    <div id="container">
    <div id="fs" class="footbalSingle ">
			<article id="mainArea">
				<header id="header">
					<div class="gameplaySelect" v-cloak>
						<span>{{$t('玩法')}}</span><span class="btn" @click="openGameplayArea($event)" v-cloak>{{playTypeName}}<em class="triangle"></em></span>
						<ul class="gameplayArea clearfix" style="display: none">
							<li @click="changeLoad(18,$event)" data-index="18">{{$t('胜平负')}}</li>
							<li @click="changeLoad(19,$event)" data-index="19">{{$t('上下单双')}}</li>
							<li @click="changeLoad(20,$event)" data-index="20">{{$t('总进球')}}</li>
							<li @click="changeLoad(22,$event)" data-index="22">{{$t('比分')}}</li>
						</ul>
					</div>
					<!--<h1>足球单场</h1>-->
					<a class="goBack" href="javascript:void(0)" @click="routerBack"></a>
					<span class="league-filter-ico" @click="openLeagueArea"></span>
					<a href="javascript:void(0)" @click="togohelp" class="question-ico"></a>
				</header>
				<section class="match-table">
					<div id="pullrefresh">
						<ul class="mui-table-view mui-table-view-chevron">
							<li>
								<div class="content">

									<div :class="playType==18?'spf':playType==19?'sxds':playType==20?'zjq':playType==22?'bf':'bqc'" id="mainContent">
										<!--无数据时提示-->
										<div class="noMsg" v-if="noDataListReturn" v-cloak><img class="icon" src="../../../assets/images/bg_noMsg_white.png"><p>{{$t('当前投注没有比赛')}}</p><p>{{$t('您可以到其他投注区查看')}}</p></div>
										<!--主体内容-->
										<dl :key="indexs" :class="indexs==0?'match-list':'match-list hideOneDay'" v-for="(item,indexs) in dealData" v-cloak>
												<!--<dt :class="indexs==0?'match-divider':'match-divider close'" :data-index="indexs"><!--// :data-index="item.dateTime[0]"-->
												<!--<span class='match-date'>{{item.titleDateTime}}</span><em class='match-num'>{{item.dataList.length < 10 ? '&nbsp;&nbsp;' + item.dataList.length : item.dataList.length + '场'}}</em><span>{{$t('比赛可投')}}</span><i class="match-foldBtn arrow-ico"></i>
												</dt>
												<dd  v-if="league_indexList[obj.leagueIndex]==1" :class="playType==22?'match-item match-item-01 represent':'match-item represent'" v-for="(obj,index) in item.dataList" :data-sign="obj.signNum" :data-index="obj.match_id" :data-type="index">
												<div class="league-nd-time">
													<span class="row league-name">{{obj.league_name}}</span>
													<span class="row league-num">{{obj.sessions ? obj.sessions.length > 3 ? String(obj.sessions).substr(-3) : obj.sessions : ""}}</span>
													<span class="row league-time">{{obj.hours + ':' + obj.minutes + ' 截止'}}</span>
													<span class="detail" :data-id="obj.event_id" :data-away="obj.away_team_name" :data-home="obj.home_team_name" :data-index='index'></span>
												</div>-->
										<!--胜平负-->
										<template v-if="playType==18">
											<dt :class="indexs==0?'match-divider':'match-divider close'" :data-index="indexs"><!--// :data-index="item.dateTime[0]"-->
												<span class='match-date'>{{item.titleDateTime}}</span><em class='match-num'>{{item.dataList.length < 10 ? '&nbsp;&nbsp;' + item.dataList.length : item.dataList.length + '场'}}</em><span>{{$t('比赛可投')}}</span><i class="match-foldBtn arrow-ico"></i>
												</dt>
												<dd :key="index"  v-if="league_indexList[obj.leagueIndex]==1" :class="playType==22?'match-item match-item-01 represent':'match-item represent'" v-for="(obj,index) in item.dataList" :data-sign="obj.signNum" :data-index="obj.match_id" :data-type="index">
												<div class="league-nd-time">
													<span class="row league-name">{{obj.league_name}}</span>
													<span class="row league-num">{{obj.sessions ? obj.sessions.length > 3 ? String(obj.sessions).substr(-3) : obj.sessions : ""}}</span>
													<span class="row league-time">{{obj.hours + ':' + obj.minutes + ' 截止'}}</span>
													<span class="detail" :data-id="obj.event_id" :data-away="obj.away_team_name" :data-home="obj.home_team_name" :data-away-id="obj.away_team_id" :data-home-id="obj.home_team_id" :data-index='index'></span>
												</div>
											<!--<dd class="match-item represent"  v-for="(obj,index) in item.dataList" :data-sign="obj.signNum" :data-index="obj.match_id" :data-type="index">
												<div class="league-nd-time"><span class="row league-name">
													 {{obj.league_name}}</span><span class="row league-num">{{obj.sessions}}</span><span class="row league-time">{{obj.hours+ ':' + obj.minutes+"截止"}}</span><span class="detail" :data-id='obj.event_id' :data-away="obj.away_team_name" :data-home="obj.home_team_name" :data-index='index'></span></div>-->
													 <div class="options-block spf-options "><span :class="parseInt(obj.letball_number) == 0 ? 'col rqCol' : parseInt(obj.letbtzArea_dataList_number) > 0 ? 'col rqCol c_e24949' : 'col rqCol fuRq'" :data-index="obj.letball_number">{{$t('让')}}<br>{{$t('球')}}<br>{{obj.letball_number > 0 ? "+" + obj.letball_number : obj.letball_number}}</span>

												<!--<div class="options-block spf-options">-->
												<!--胜平负-->
												<template v-if='obj.letball_number==0'>
													<span class="col betbtn" data-index="0" data-gametype="spf" :data-sp="obj.home_win ? obj.home_win : '0.00'" @click="tzItem_click($event,indexs,index,'spf_rqspf',0)"><span class="row hostteam" :data-index="obj.home_team_id">{{obj.home_team_name}}</span><span class="row betinfo">{{$t('主胜')}}{{obj.home_win ? obj.home_win : "0.00"}}</span></span><span class="col betbtn" data-index="1" data-gametype="spf" :data-sp="obj.home_draw ? obj.home_draw : '0.00'" @click="tzItem_click($event,indexs,index,'spf_rqspf',1)"><span class="row vs">VS</span><span class="row betinfo">平{{obj.home_draw ? obj.home_draw : "0.00"}}</span></span><span class="col betbtn" data-index="2" data-gametype="spf" :data-sp="obj.home_lose ? obj.home_lose : '0.00'" @click="tzItem_click($event,indexs,index,'spf_rqspf',2)"><span class="row guestteam" :data-index="obj.away_team_id">{{obj.away_team_name}}</span><span class="row betinfo">{{$t('客胜')}}{{obj.home_lose ? obj.home_lose : "0.00"}}</span></span>
												</template>
												<!--让球胜平负-->
												<template v-else>
													<span class="col betbtn" data-index="0" data-gametype="spf" :data-sp="obj.letball_win ? obj.letball_win : '0.00'" @click="tzItem_click($event,indexs,index,'spf_rqspf',3)"><span class="row hostteam" :data-index="obj.home_team_id">{{obj.home_team_name}}</span><span class="row betinfo">{{$t('主胜')}}{{obj.letball_win ? obj.letball_win : "0.00"}}</span></span><span class="col betbtn" data-index="1" data-gametype="spf" :data-sp="obj.letball_draw ? obj.letball_draw : '0.00'" @click="tzItem_click($event,indexs,index,'spf_rqspf',4)"><span class="row vs">VS</span><span class="row betinfo">平{{obj.letball_draw ? obj.letball_draw : "0.00"}}</span></span><span class="col betbtn" data-index="2" data-gametype="spf" :data-sp="obj.letball_lose ? obj.letball_lose : '0.00'" @click="tzItem_click($event,indexs,index,'spf_rqspf',5)"><span class="row guestteam" :data-index="obj.away_team_id">{{obj.away_team_name}}</span><span class="row betinfo">{{$t('客胜')}}{{obj.letball_lose ? obj.letball_lose : "0.00"}}</span></span>
													<!--<span class="col betbtn" data-index="0" data-gametype="spf" :data-sp="obj.home_win ? obj.home_win : '0.00'"><span class="row hostteam" :data-index="obj.home_team_id">{{obj.home_team_name}}</span><span class="row betinfo">{{$t('主胜')}}{{obj.home_win ? obj.home_win : "0.00"}}</span></span><span class="col betbtn" data-index="1" data-gametype="spf" :data-sp="obj.home_draw ? obj.home_draw : '0.00'"><span class="row vs">VS</span><span class="row betinfo">平{{obj.home_draw ? obj.home_draw : "0.00"}}</span></span><span class="col betbtn" data-index="2" data-gametype="spf" :data-sp="obj.home_lose ? obj.home_lose : '0.00'"><span class="row guestteam" :data-index="obj.away_team_id">{{obj.away_team_name}}</span><span class="row betinfo">{{$t('客胜')}}{{obj.home_lose ? obj.home_lose : "0.00"}}</span></span>-->
												</template>
												</div>
												</dd>
										</template>
										<!--上下单双-->
										<template v-if="playType==19">
											<dt :class="indexs==0?'match-divider':'match-divider close'" :data-index="indexs"><!--// :data-index="item.dateTime[0]"-->
												<span class='match-date'>{{item.titleDateTime}}</span><em class='match-num'>{{item.dataList.length < 10 ? '&nbsp;&nbsp;' + item.dataList.length : item.dataList.length + '场'}}</em><span>{{$t('比赛可投')}}</span><i class="match-foldBtn arrow-ico"></i>
												</dt>
												<dd :key="index"  v-if="league_indexList[obj.leagueIndex]==1" :class="playType==22?'match-item match-item-01 represent':'match-item represent'" v-for="(obj,index) in item.dataList" :data-sign="obj.signNum" :data-index="obj.match_id" :data-type="index">
												<div class="league-nd-time">
													<span class="row league-name">{{obj.league_name}}</span>
													<span class="row league-num">{{obj.sessions ? obj.sessions.length > 3 ? String(obj.sessions).substr(-3) : obj.sessions : ""}}</span>
													<span class="row league-time">{{obj.hours + ':' + obj.minutes + ' 截止'}}</span>
													<span class="detail" :data-id="obj.event_id" :data-away="obj.away_team_name" :data-home="obj.home_team_name" :data-away-id="obj.away_team_id" :data-home-id="obj.home_team_id" :data-index='index'></span>
												</div>
											<!--<dl :class="indexs==0?'match-list':'match-list hideOneDay'" v-for="(item,indexs) in dealData">
												<dt :class="indexs==0?'match-divider':'match-divider close'" :data-index="item.dateTime[0]">
												<span class='match-date'>{{item.titleDateTime}}</span><em class='match-num'>{{item.dataList.length < 10 ? '&nbsp;&nbsp;' + item.dataList.length : item.dataList.length + '场'}}</em><span>{{$t('比赛可投')}}</span><i class="match-foldBtn arrow-ico"></i>
												</dt>-->
											<!--<dd class="match-item represent" v-for="(obj,index) in item.dataList" :data-sign="obj.signNum" :data-index="obj.match_id" :data-type="index">-->
												<!--<div class="league-nd-time">
													<span class="row league-name">{{obj.league_name}}</span>
													<span class="row league-num">{{obj.sessions ? obj.sessions.length > 3 ? String(obj.sessions).substr(-3) : obj.sessions : ""}}</span>
													<span class="row league-time">{{obj.hours + ':' + obj.minutes + ' 截止'}}</span>
													<span class="detail" :data-id="obj.event_id" :data-away="obj.away_team_name" :data-home="obj.home_team_name" :data-index='index'></span>
												</div>-->
													<div class="options-block sxds-options">
														<div class="game-title">
															<span class="col hostteam" :data-index="obj.home_team_id"><i>{{obj.home_team_name ? obj.home_team_name : ""}}</i></span><span class="col vs">VS</span><span class="col guestteam" :data-index="obj.away_team_id"><i>{{obj.away_team_name ? obj.away_team_name : ""}}</i></span>
														</div>
														<div class="game-area">
															<span class="row"><span class="col betbtn" data-index="0" data-gametype="sxds" :data-sp="obj.up_odd ? obj.up_odd : '0.00'" @click="tzItem_click($event,indexs,index,'sxds',0)">上单&nbsp;&nbsp;{{obj.up_odd ? obj.up_odd : "0.00"}}</span><span class="col betbtn" data-index="1" data-gametype="sxds" :data-sp="obj.up_even ? obj.up_even : '0.00'" @click="tzItem_click($event,indexs,index,'sxds',1)">上双&nbsp;&nbsp;{{obj.up_even ? obj.up_even : "0.00"}}</span></span>
															<span class="row"><span class="col betbtn" data-index="2" data-gametype="sxds" :data-sp="obj.down_odd ? obj.down_odd : '0.00'" @click="tzItem_click($event,indexs,index,'sxds',2)">下单&nbsp;&nbsp;{{obj.down_odd ? obj.down_odd : "0.00"}}</span><span class="col betbtn" data-index="3" data-gametype="sxds" :data-sp="obj.down_even ? obj.down_even : '0.00'" @click="tzItem_click($event,indexs,index,'sxds',3)">下双&nbsp;&nbsp;{{obj.down_even ? obj.down_even : "0.00"}}</span></span>
														</div>
													</div>
											</dd>
											<!--</dl>-->
										</template>
										<!--总进球-->
										<template v-if="playType==20">
											<dt :class="indexs==0?'match-divider':'match-divider close'" :data-index="indexs"><!--// :data-index="item.dateTime[0]"-->
												<span class='match-date'>{{item.titleDateTime}}</span><em class='match-num'>{{item.dataList.length < 10 ? '&nbsp;&nbsp;' + item.dataList.length : item.dataList.length + '场'}}</em><span>{{$t('比赛可投')}}</span><i class="match-foldBtn arrow-ico"></i>
												</dt>
												<dd :key="index" v-if="league_indexList[obj.leagueIndex]==1" :class="playType==22?'match-item match-item-01 represent':'match-item represent'" v-for="(obj,index) in item.dataList" :data-sign="obj.signNum" :data-index="obj.match_id" :data-type="index">
												<div class="league-nd-time">
													<span class="row league-name">{{obj.league_name}}</span>
													<span class="row league-num">{{obj.sessions ? obj.sessions.length > 3 ? String(obj.sessions).substr(-3) : obj.sessions : ""}}</span>
													<span class="row league-time">{{obj.hours + ':' + obj.minutes + ' 截止'}}</span>
													<span class="detail" :data-id="obj.event_id" :data-away="obj.away_team_name" :data-home="obj.home_team_name" :data-away-id="obj.away_team_id" :data-home-id="obj.home_team_id" :data-index='index'></span>
												</div>
											<!--<dd class="match-item represent" v-for="(obj,index) in item.dataList" :data-sign="obj.signNum" :data-index="obj.match_id" :data-type="index">
												<div class="league-nd-time">
													<span class="row league-name">{{obj.league_name}}</span>
													<span class="row league-num">{{obj.sessions ? obj.sessions.length > 3 ? String(obj.sessions).substr(-3) : obj.sessions : ""}}</span>
													<span class="row league-time">{{obj.hours + ':' + obj.minutes + ' 截止'}}</span>
													<span class="detail" :data-id="obj.event_id" :data-away="obj.away_team_name" :data-home="obj.home_team_name" :data-index='index'></span>
												</div>-->
													<div class="options-block zjq-options">
														<div class="game-title">
															<span class="col hostteam" :data-index="obj.home_team_id"><i>{{obj.home_team_name ? obj.home_team_name : ""}}</i></span><span class="col vs">VS</span><span class="col guestteam" :data-index="obj.away_team_id"><i>{{obj.away_team_name ? obj.away_team_name : ""}}</i></span>
														</div>
															<div class="game-area">
																<span class="row">
																	<span class="col betbtn" data-index="0" data-gametype="zjq" :data-sp="obj.total_goal0 ? obj.total_goal0 : '0.00'" @click="tzItem_click($event,indexs,index,'zjq',0)">0&nbsp;&nbsp;{{obj.total_goal0 ? obj.total_goal0 : "0.00"}}</span><span class="col betbtn" data-index="1" data-gametype="zjq" :data-sp="obj.total_goal1 ? obj.total_goal1 : '0.00'" @click="tzItem_click($event,indexs,index,'zjq',1)">1&nbsp;&nbsp; {{obj.total_goal1 ? obj.total_goal1 : "0.00"}}</span><span class="col betbtn" data-index="2" data-gametype="zjq" :data-sp="obj.total_goal2 ? obj.total_goal2 : '0.00'" @click="tzItem_click($event,indexs,index,'zjq',2)">2&nbsp;&nbsp; {{obj.total_goal2 ? obj.total_goal2 : "0.00"}}</span><span class="col betbtn" data-index="3" data-gametype="zjq" :data-sp="obj.total_goal3 ? obj.total_goal3 : '0.00'" @click="tzItem_click($event,indexs,index,'zjq',3)">3&nbsp;&nbsp;{{obj.total_goal3 ? obj.total_goal3 : "0.00"}}</span>
																</span>
																<span class="row">
																	<span class="col betbtn" data-index="4" data-gametype="zjq" :data-sp="obj.total_goal4 ? obj.total_goal4 : '0.00'" @click="tzItem_click($event,indexs,index,'zjq',4)">4&nbsp;&nbsp;{{obj.total_goal4 ? obj.total_goal4 : "0.00"}}</span><span class="col betbtn" data-index="5" data-gametype="zjq" :data-sp="obj.total_goal5 ? obj.total_goal5 : '0.00'" @click="tzItem_click($event,indexs,index,'zjq',5)">5&nbsp;&nbsp; {{obj.total_goal5 ? obj.total_goal5 : "0.00"}}</span><span class="col betbtn" data-index="6" data-gametype="zjq" :data-sp="obj.total_goal6 ? obj.total_goal6 : '0.00'" @click="tzItem_click($event,indexs,index,'zjq',6)">6&nbsp;&nbsp; {{obj.total_goal6 ? obj.total_goal6 : "0.00"}}</span><span class="col betbtn" data-index="7" data-gametype="zjq" :data-sp="obj.more_than6 ? obj.more_than6 : '0.00'" @click="tzItem_click($event,indexs,index,'zjq',7)">6+&nbsp;&nbsp;{{obj.more_than6 ? obj.more_than6 : "0.00"}}</span>
																</span>
															</div>
													</div>
												</dd>
										</template>
										<!--比分-->
										<template v-if="playType==22">
											<dt :class="indexs==0?'match-divider':'match-divider close'" :data-index="indexs"><!--// :data-index="item.dateTime[0]"-->
												<span class='match-date'>{{item.titleDateTime}}</span><em class='match-num'>{{item.dataList.length < 10 ? '&nbsp;&nbsp;' + item.dataList.length : item.dataList.length + '场'}}</em><span>{{$t('比赛可投')}}</span><i class="match-foldBtn arrow-ico"></i>
												</dt>
												<dd :key="index" v-if="league_indexList[obj.leagueIndex]==1" :class="playType==22?'match-item match-item-01 represent':'match-item represent'" v-for="(obj,index) in item.dataList" :data-sign="obj.signNum" :data-index="obj.match_id" :data-type="index">
												<div class="league-nd-time">
													<span class="row league-name">{{obj.league_name}}</span>
													<span class="row league-num">{{obj.sessions ? obj.sessions.length > 3 ? String(obj.sessions).substr(-3) : obj.sessions : ""}}</span>
													<span class="row league-time">{{obj.hours + ':' + obj.minutes + ' 截止'}}</span>
													<span class="detail" :data-id="obj.event_id" :data-away="obj.away_team_name" :data-home="obj.home_team_name" :data-away-id="obj.away_team_id" :data-home-id="obj.home_team_id" :data-index='index'></span>
												</div>
											<!--<dd class="match-item match-item-01 represent" data-index="' + obj.match_id + '" data-type="' + i + '">
												<div class="league-nd-time">
													<span class="row league-name">' + obj.league_name + '</span><span class="row league-num">' + (obj.sessions ? obj.sessions.length > 3 ? String(obj.sessions).substr(-3) : obj.sessions : "") + '</span><span class="row league-time">' + hours + ':' + minutes + ' \u622A\u6B62</span><span class="detail" data-id=' + obj.event_id + '"' + ' data-away="' + obj.away_team_name + '"' + 'data-home="' + obj.home_team_name + '"'+' data-index=' + i + '></span></div>-->
													<div class="options-block bqc-options">
														<span class="game-title row"><span class="col hostteam"  :data-index="obj.home_team_id"><i>{{obj.home_team_name ? obj.home_team_name : ""}}</i></span><span class="col vs">VS</span><span class="col guestteam"  :data-index="obj.away_team_id"><i>{{obj.away_team_name ? obj.away_team_name : ""}}</i></span></span><span class="betbtn more-option ellipsis" :data-index="index" @click="unfold_tzArea(indexs,index)">{{$t('展开比分投注项')}}</span>
													</div>
													</dd>
										</template>
										<!-- </dd> -->
										</dl>
									</div>
								</div>
							</li>
						</ul>
					</div>

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
									<span class="screen-five" @click="leagueScreen_selectFive">{{$t('仅五大联赛')}}</span>
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
				<section class="bet-bottom">
					<div class="bottom-box">
						<span class="bet-help"><i></i>{{$t('开奖结果不含加时赛及点球结果')}}</span>
						<span class="box-center hide">{{$t('已选择')}} <em class="match-num">0</em> {{$t('场比赛')}}<span class="btn-cancel"><i class="trash_icon"></i>{{$t('清空')}}</span></span>
						<span class="btn-confirm" @click="bottom_click">{{$t('请选择比赛结果')}}</span>
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
								<span>
								<i class="gameplay">{{tzType_free_html}}</i>
								<i class="arrow-ico"></i>
							</span>
								<div class="multiple">
									<span>{{$t('买')}}</span><span class="inputBox">
									<span class="minus"  @click="changeMultiple(1,'-1')"></span><span class="center"><input type="number" id="multipleNum" value="1" v-model="multiple"/>
									</span><span class="add"  @click="changeMultiple(1,'+1')"></span>
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
							<p class="state"><span v-cloak>{{user_state}}</span></p>
							<p class="fixMultiple"><span @click="changeMultiple($event,'+10')">10倍</span><span @click="changeMultiple($event,'+20')">20倍</span><span @click="changeMultiple($event,'+50')">50倍</span><span @click="changeMultiple($event,'+100')">100倍</span></p>
							<p class="sum">{{$t('预计奖金')}}
								<span class="totalNum" data-index="1">{{totalNum+coinUnit}}</span>
							</p>
							<div class="paymentBtn">
								<span>
								{{$t('立即付款')}}
								<i class="payNum" v-cloak>{{tz_sumNum*2*multiple}}</i>{{coinUnit}}
							</span>
							</div>
						</div>
						<div class="bet-agree">
							<i></i><span>{{$t('我已阅读并同意')}}</span>
							<span @click="togorule">《{{$t('委托投注规则')}}》</span>
						</div>
					</div>
				</section>
				<div class="iDialogWrap">
			<div class="iDialog" style="display:none ;" v-if="playType==22">
				<div class="iDialogContent" id="iDialogContent">
					<div class="iDialogBody">
						<div class="iDialogMain represent" :data-type="(tzArea_dataList==0)?'':tzArea_dataList.play_type_id" :data-index="(tzArea_dataList==0)?'':tzArea_dataList.match_id" :data-select="index">
							<span class="game-title row">
							<span class="col hostteam" v-cloak>{{(tzArea_dataList==0)?'':tzArea_dataList.home_team_name}}</span>
							<span class="col vs">VS</span>
							<span class="col guestteam" v-cloak>{{(tzArea_dataList==0)?'':tzArea_dataList.away_team_name}}</span>
							</span>
							<dl class="bf-block bf-block-s">
								<dt class="data-inf">{{$t('胜')}}</dt>
								<dd class="options-block">
									<span class="row">
									<span @click="tzItem_click($event,nowSfcIndexs,nowSfcIndex,'bf',0)" class="col betbtn" data-index="0" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.win10">
											<span v-cloak class="row fen">1:0</span><span class="row betinfo">{{(tzArea_dataList==0)?'':tzArea_dataList.win10}}</span>
									</span>
									<span @click="tzItem_click($event,nowSfcIndexs,nowSfcIndex,'bf',1)" class="col betbtn" data-index="1" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.win20">
											<span v-cloak class="row fen">2:0</span><span class="row betinfo">{{(tzArea_dataList==0)?'':tzArea_dataList.win20}}</span>
									</span>
									<span @click="tzItem_click($event,nowSfcIndexs,nowSfcIndex,'bf',2)" class="col betbtn" data-index="2" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.win21">
											<span v-cloak class="row fen">2:1</span><span class="row betinfo">{{(tzArea_dataList==0)?'':tzArea_dataList.win21}}</span>
									</span>
									<span @click="tzItem_click($event,nowSfcIndexs,nowSfcIndex,'bf',3)" class="col betbtn" data-index="3" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.win30">
											<span v-cloak class="row fen">3:0</span><span class="row betinfo">{{(tzArea_dataList==0)?'':tzArea_dataList.win30}}</span>
									</span>
									<span @click="tzItem_click($event,nowSfcIndexs,nowSfcIndex,'bf',4)" class="col betbtn" data-index="4" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.win31">
											<span v-cloak class="row fen">3:1</span><span class="row betinfo">{{(tzArea_dataList==0)?'':tzArea_dataList.win31}}</span>
									</span>
									<span @click="tzItem_click($event,nowSfcIndexs,nowSfcIndex,'bf',5)" class="col betbtn" data-index="5" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.win32">
											<span v-cloak class="row fen">3:2</span><span class="row betinfo">{{(tzArea_dataList==0)?'':tzArea_dataList.win32}}</span>
									</span>

									</span>
									<span class="row">
									<span @click="tzItem_click($event,nowSfcIndexs,nowSfcIndex,'bf',6)" class="col betbtn" data-index="6" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.win40">
											<span v-cloak class="row fen">4:0</span><span class="row betinfo">{{(tzArea_dataList==0)?'':tzArea_dataList.win40}}</span>
									</span>
									<span @click="tzItem_click($event,nowSfcIndexs,nowSfcIndex,'bf',7)" class="col betbtn" data-index="7" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.win41">
										<span v-cloak class="row fen">4:1</span><span class="row betinfo">{{(tzArea_dataList==0)?'':tzArea_dataList.win41}}</span>
									</span>
									<span @click="tzItem_click($event,nowSfcIndexs,nowSfcIndex,'bf',8)" class="col betbtn" data-index="8" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.win42">
										<span v-cloak class="row fen">4:2</span><span class="row betinfo">{{(tzArea_dataList==0)?'':tzArea_dataList.win42}}</span>
									</span>
									<span @click="tzItem_click($event,nowSfcIndexs,nowSfcIndex,'bf',12)" class="col betbtn" data-index="12" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':(tzArea_dataList==0)?'':tzArea_dataList.win_other">
										<span v-cloak class="row fen">{{$t('胜其他')}}</span><span class="row betinfo">{{(tzArea_dataList.win_other)?(tzArea_dataList.win_other):"0.00"}}</span>
									</span>
									</span>
								</dd>
							</dl>
							<dl class="bf-block bf-block-p">
								<dt class="data-inf">{{$t('平')}}</dt>
								<dd class="options-block">
									<span class="row">
									<span @click="tzItem_click($event,nowSfcIndexs,nowSfcIndex,'bf',13)" class="col betbtn" data-index="13" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.draw00">
										<span v-cloak class="row fen">0:0</span><span class="row betinfo">{{(tzArea_dataList==0)?'':tzArea_dataList.draw00}}</span>
									</span>
									<span @click="tzItem_click($event,nowSfcIndexs,nowSfcIndex,'bf',14)" class="col betbtn" data-index="14" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.draw11">
										<span v-cloak class="row fen">1:1</span><span class="row betinfo">{{(tzArea_dataList==0)?'':tzArea_dataList.draw11}}</span>
									</span>
									<span @click="tzItem_click($event,nowSfcIndexs,nowSfcIndex,'bf',15)" class="col betbtn" data-index="15" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.draw22">
										<span v-cloak class="row fen">2:2</span><span class="row betinfo">{{(tzArea_dataList==0)?'':tzArea_dataList.draw22}}</span>
									</span>
									<span @click="tzItem_click($event,nowSfcIndexs,nowSfcIndex,'bf',16)" class="col betbtn" data-index="16" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.draw33">
										<span v-cloak class="row fen">3:3</span><span class="row betinfo">{{(tzArea_dataList==0)?'':tzArea_dataList.draw33}}</span>
									</span>
									<span @click="tzItem_click($event,nowSfcIndexs,nowSfcIndex,'bf',17)" class="col betbtn" data-index="17" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.draw_other">
										<span v-cloak class="row fen">{{$t('平其他')}}</span><span class="row betinfo">{{(tzArea_dataList==0)?'':tzArea_dataList.draw_other}}</span>
									</span>
									</span>
								</dd>
							</dl>
							<dl class="bf-block bf-block-f">
								<dt class="data-inf">{{$t('负')}}</dt>
								<dd class="options-block">
									<span class="row">
									<span @click="tzItem_click($event,nowSfcIndexs,nowSfcIndex,'bf',18)" class="col betbtn" data-index="18" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.lose01">
										<span v-cloak class="row fen">0:1</span><span class="row betinfo">{{(tzArea_dataList==0)?'':tzArea_dataList.lose01}}</span>
									</span>
									<span @click="tzItem_click($event,nowSfcIndexs,nowSfcIndex,'bf',19)" class="col betbtn" data-index="19" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.lose02">
										<span v-cloak class="row fen">0:2</span><span class="row betinfo">{{(tzArea_dataList==0)?'':tzArea_dataList.lose02}}</span>
									</span>
									<span @click="tzItem_click($event,nowSfcIndexs,nowSfcIndex,'bf',20)" class="col betbtn" data-index="20" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.lose12">
										<span v-cloak class="row fen">1:2</span><span class="row betinfo">{{(tzArea_dataList==0)?'':tzArea_dataList.lose12}}</span>
									</span>
									<span @click="tzItem_click($event,nowSfcIndexs,nowSfcIndex,'bf',21)" class="col betbtn" data-index="21" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.lose03">
										<span v-cloak class="row fen">0:3</span><span class="row betinfo">{{(tzArea_dataList==0)?'':tzArea_dataList.lose03}}</span>
									</span>
									<span @click="tzItem_click($event,nowSfcIndexs,nowSfcIndex,'bf',22)" class="col betbtn" data-index="22" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.lose13">
										<span v-cloak class="row fen">1:3</span><span class="row betinfo">{{(tzArea_dataList==0)?'':tzArea_dataList.lose13}}</span>
									</span>
									<span @click="tzItem_click($event,nowSfcIndexs,nowSfcIndex,'bf',23)" class="col betbtn" data-index="23" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.lose23">
										<span v-cloak class="row fen">2:3</span><span class="row betinfo">{{(tzArea_dataList==0)?'':tzArea_dataList.lose23}}</span>
									</span>

									</span>
									<span class="row">
									<span @click="tzItem_click($event,nowSfcIndexs,nowSfcIndex,'bf',24)" class="col betbtn" data-index="24" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.lose04">
										<span v-cloak class="row fen">0:4</span><span class="row betinfo">{{(tzArea_dataList==0)?'':tzArea_dataList.lose04}}</span>
									</span>
									<span @click="tzItem_click($event,nowSfcIndexs,nowSfcIndex,'bf',25)" class="col betbtn" data-index="25" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.lose14">
										<span v-cloak class="row fen">1:4</span><span class="row betinfo">{{(tzArea_dataList==0)?'':tzArea_dataList.lose14}}</span>
									</span>
									<span @click="tzItem_click($event,nowSfcIndexs,nowSfcIndex,'bf',26)" class="col betbtn" data-index="26" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.lose24">
										<span v-cloak class="row fen">2:4</span><span class="row betinfo">{{(tzArea_dataList==0)?'':tzArea_dataList.lose24}}</span>
									</span>
									<span @click="tzItem_click($event,nowSfcIndexs,nowSfcIndex,'bf',30)" class="col betbtn" data-index="30" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.lose_other">
										<span v-cloak class="row fen">{{$t('负其他')}}</span><span class="row betinfo">{{(tzArea_dataList==0)?'':tzArea_dataList.lose_other}}</span>
									</span>
									</span>
								</dd>
							</dl>
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
			<div class="iDialogLayout" style="display:none ;"></div>
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
					<a class="goback close">
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
			<div id='sharkit' @click="sharkitFn" v-show="playType!==22"></div>
			<audio class="hide" id="audio_shark" src="./static/res/shark_voice.mp3"  preload="auto"></audio>
			<div id="loading_wait"></div>
			<div class="canvasWrap">
				<canvas id="coverRandow" width="" height=""></canvas>
			</div>
		</div>

    </div>
  </div>
</template>

<script src="../../../assets/js/sg/fbsg.js"></script>

<style src="../../../style/sg/fbsg.css" scoped></style>
