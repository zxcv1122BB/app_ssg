<template>
<div>
    <div id="container">
  <div class="markHL hhtz" id="hhtz">
    <div id="qfhh">
      <noscript>{{$t('请开启浏览器的')}}javascript{{$t('的功能')}}，{{$t('或使用支持')}}javascript{{$t('的浏览器访问')}}</noscript>
          <article id="mainArea">
            <!--页面头部-->
            <header id="header">
              <div class="gameplaySelect" v-cloak>
                <span>{{$t('玩法')}}</span><span class="btn" @click="openGameplayArea($event)">{{playTypeName}}<em class="triangle"></em></span>
                <ul class="gameplayArea clearfix" style="display: none">
                  <li @click="changeLoad(2,$event)" data-index="2">{{$t('比分')}}</li>
                  <li @click="changeLoad(3,$event)" data-index="3">{{$t('总进球')}}</li>
                  <li @click="changeLoad(4,$event)" data-index="4">{{$t('半全场')}}</li>
                  <li @click="changeLoad(1,$event)" data-index="1">{{$t('胜平负')}}</li>
                  <li @click="changeLoad(6,$event)" data-index="6" style="width: 10rem;">{{$t('混合投注')}}</li>
                </ul>
              </div>
              <a class="goBack" href="javascript:void(0)" @click="routerBack"></a>
              <span class="league-filter-ico" @click="openLeagueArea"></span>
              <a href="javascript:void(0)" @click="togohelp" class="question-ico"></a>
            </header>
            <!--主要内容-->
            <section class="match-table">

              <div id="pullrefresh_qfhh">
                <ul class="mui-table-view mui-table-view-chevron">
                  <li>
                    <div class="content">
                      <div id='mainContent' :class="playType==9?'rqspf':''" v-cloak>
                        <!--主体内容-->
                        <!--无数据时提示-->
                        <div class="noMsg" v-if="noDataListReturn" v-cloak><img v-cloak class="icon" src="../../../assets/images/bg_noMsg_white.png"><p v-cloak>{{$t('当前投注没有比赛')}}</p><p v-cloak>{{$t('您可以到其他投注区查看')}}</p></div>
                        <!--主体内容-->
                        <dl :class="indexs==0?'match-list':'match-list hideOneDay'" :key="indexs" v-for="(item,indexs) in dealData" v-cloak>
                          <template v-if="playType==1">
                            <dt :class="indexs==0?'match-divider':'match-divider close'" :data-index="indexs"><!--// :data-index="item.dateTime[0]"-->
                            <span class='match-date'>{{item.titleDateTime}}</span><em class='match-num'>{{item.dataList.length &lt; 10 ? '&nbsp;&nbsp;' + item.dataList.length : item.dataList.length + '场'}}</em><span>{{$t('比赛可投')}}</span><i class="match-foldBtn arrow-ico"></i>
                            </dt>
                            <dd  v-if="league_indexList[obj.leagueIndex]==1" class="match-item represent spf" :key="index" v-for="(obj,index) in item.dataList" :data-sign="obj.signNum" :data-index="obj.match_id" :data-type="index">
                            <div class="league-nd-time">
                              <span class="row league-name">{{obj.league_name}}</span>
                              <span class="row league-num">{{obj.sessions ? obj.sessions.length > 3 ? String(obj.sessions).substr(-3) : obj.sessions : ""}}</span>
                              <span class="row league-time">{{obj.hours + ':' + obj.minutes + ' 截止'}}</span>
                              <span class="detail" :data-id="obj.event_id" :data-away="obj.away_team_name" :data-home="obj.home_team_name" :data-away-id="obj.away_team_id" :data-home-id="obj.home_team_id"  :data-index='index'></span>
                            </div>
                                  <div class="match-content mixall-block">
                                    <div class="game-title" :data-index="obj.league_id">
                                      <span class="col rqtitle">{{$t('让球')}}</span><span class="col hostteam"><i :data-index="obj.home_team_id">{{obj.home_team_name}}</i></span><span class="col vs">VS</span><span class="col guestteam"><i :data-index="obj.away_team_id">{{obj.away_team_name}}</i></span>
                                    </div>
                                  <div class="game-area">
                                      <template v-if="(!obj.home_win && !obj.home_draw && !obj.home_lose) || (parseInt(obj.home_win) ===0 && parseInt(obj.home_draw) ===0 && parseInt(obj.home_lose) ===0)">
                                        <span class="row nonsupport" data-index="0"><span class="col game-type">0</span>{{$t('暂不支持')}}</span>
                                      </template>
                                      <template v-else>
                                        <span class="row" data-index="0"><span class="col game-type">0</span><span :class="obj.home_win ? 'col betbtn' : 'col unable'" data-index='0' data-gametype="spf" :data-sp="obj.home_win" @click="tzItem_click($event,indexs,index,'spf_rqspf',0)">{{$t('主胜')}}{{obj.home_win ? obj.home_win : "0.00"}}</span><span :class="obj.home_draw ? 'col betbtn' : 'col unable'" data-index='1' data-gametype="spf" :data-sp="obj.home_draw" @click="tzItem_click($event,indexs,index,'spf_rqspf',1)">平{{obj.home_draw ? obj.home_draw : "0.00"}}</span><span :class="obj.home_lose ? 'col betbtn' : 'col unable'" data-index='2' data-gametype="spf" :data-sp="obj.home_lose" @click="tzItem_click($event,indexs,index,'spf_rqspf',2)">主负{{obj.home_lose ? obj.home_lose : "0.00"}}</span></span>
                                      </template>
                                      <template v-if="(!obj.letball_win && !obj.letball_draw && !obj.letball_lose) || (parseInt(obj.letball_win) === 0 && parseInt(obj.letball_draw) ===0 && parseInt(obj.letball_lose) ===0)">
                                        <span class="row nonsupport" data-index="1"><span class="col game-type">{{obj.letball_number}}</span>{{$t('暂不支持')}}</span>
                                      </template>
                                      <template v-else>
                                        <span class="row" data-index="1"><span :class="parseInt(obj.letball_number) > 0 ? 'col game-type c_e24949' : 'col game-type'">{{obj.letball_number > 0 ? "+" + obj.letball_number : obj.letball_number}}</span><span :class="obj.letball_win ? 'col betbtn' : 'col unable'" data-index='0' data-gametype="spf" :data-sp="obj.letball_win" @click="tzItem_click($event,indexs,index,'spf_rqspf',3)">{{$t('主胜')}}{{obj.letball_win ? obj.letball_win : "0.00"}}</span><span :class="obj.letball_draw ? 'col betbtn' : 'col unable'" data-index='1' data-gametype="spf" :data-sp="obj.letball_draw" @click="tzItem_click($event,indexs,index,'spf_rqspf',4)">平 {{obj.letball_draw ? obj.letball_draw : "0.00"}}</span><span :class="obj.letball_lose ? 'col betbtn' : 'col unable'" data-index='2' data-gametype="spf" :data-sp="obj.letball_lose" @click="tzItem_click($event,indexs,index,'spf_rqspf',5)">主负{{obj.letball_lose ? obj.letball_lose : "0.00"}}</span></span>
                                      </template>
                                      </div>
                                </div>
                              </dd>
                          </template>
                          <template v-if="playType==2">
                            <dt :class="indexs==0?'match-divider':'match-divider close'" :data-index="indexs"><!--// :data-index="item.dateTime[0]"-->
                              <span class='match-date'>{{item.titleDateTime}}</span><em class='match-num'>{{item.dataList.length &lt; 10 ? '&nbsp;&nbsp;' + item.dataList.length : item.dataList.length + '场'}}</em><span>{{$t('比赛可投')}}</span><i class="match-foldBtn arrow-ico"></i>
                            </dt>
                            <dd  v-if="league_indexList[obj.leagueIndex]==1" :key="index" class="match-item  match-item-01  represent" v-for="(obj,index) in item.dataList" :data-sign="obj.signNum" :data-index="obj.match_id" :data-type="index">
                              <div class="league-nd-time">
                                <span class="row league-name">{{obj.league_name}}</span>
                                <span class="row league-num">{{obj.sessions ? obj.sessions.length > 3 ? String(obj.sessions).substr(-3) : obj.sessions : ""}}</span>
                                <span class="row league-time">{{obj.hours + ':' + obj.minutes + ' 截止'}}</span>
                                <span class="detail" :data-id="obj.event_id" :data-away="obj.away_team_name" :data-home="obj.home_team_name" :data-away-id="obj.away_team_id" :data-home-id="obj.home_team_id"  :data-index='index'></span>
                              </div>
                              <div class="options-block bf-options">
                                <span class="game-title row">
                                  <span class="col hostteam" :data-index="obj.home_team_id">{{obj.home_team_name}}</span><span class="col vs">VS</span><span class="col guestteam" :data-index="obj.away_team_id">{{obj.away_team_name}}</span>
                                </span>
                                <span class="betbtn more-option ellipsis"  :data-index='index' @click="unfold_tzArea(indexs,index)">{{$t('展开比分投注项')}}</span>
                              </div>
                            </dd>
                          </template>
                          <template v-if="playType==3">
                            <dt :class="indexs==0?'match-divider':'match-divider close'" :data-index="indexs"><!--// :data-index="item.dateTime[0]"-->
                              <span class='match-date'>{{item.titleDateTime}}</span><em class='match-num'>{{item.dataList.length &lt; 10 ? '&nbsp;&nbsp;' + item.dataList.length : item.dataList.length + '场'}}</em><span>{{$t('比赛可投')}}</span><i class="match-foldBtn arrow-ico"></i>
                            </dt>
                            <dd  v-if="league_indexList[obj.leagueIndex]==1" :key="index" class="match-item  match-item-01  represent" v-for="(obj,index) in item.dataList" :data-sign="obj.signNum" :data-index="obj.match_id" :data-type="index">
                              <div class="league-nd-time">
                                <span class="row league-name">{{obj.league_name}}</span>
                                <span class="row league-num">{{obj.sessions ? obj.sessions.length > 3 ? String(obj.sessions).substr(-3) : obj.sessions : ""}}</span>
                                <span class="row league-time">{{obj.hours + ':' + obj.minutes + ' 截止'}}</span>
                                <span class="detail" :data-id="obj.event_id" :data-away="obj.away_team_name" :data-home="obj.home_team_name" :data-away-id="obj.away_team_id" :data-home-id="obj.home_team_id"  :data-index='index'></span>
                              </div>
                              <div class="options-block zjq-options">
                                <span class="game-title row"><span class="col hostteam" :data-index="obj.home_team_id">{{obj.home_team_name}}</span><span class="col vs">VS</span><span class="col guestteam" :data-index="obj.away_team_id">{{obj.away_team_name}}</span></span>
                                <div class="game-area markHL-row-yellow"><span class="row"><span :class="obj.total_goal0 ? 'col betbtn' : 'col unable'" data-index="0" data-gametype="zjq" :data-sp="obj.total_goal0 ? obj.total_goal0 : '0.00'" @click="tzItem_click($event,indexs,index,'zjq',0)"><span class="row fen">0</span><span class="row betinfo">{{obj.total_goal0 ? obj.total_goal0 : "0.00"}}</span></span><span :class="obj.total_goal1 ? 'col betbtn' : 'col unable'" data-index="1" data-gametype="zjq" :data-sp="obj.total_goal1 ? obj.total_goal1 : '0.00'" @click="tzItem_click($event,indexs,index,'zjq',1)"><span class="row fen">1</span><span class="row betinfo">{{obj.total_goal1 ? obj.total_goal1 : "0.00"}}</span></span><span :class="obj.total_goal2 ? 'col betbtn' : 'col unable'" data-index="2" data-gametype="zjq" :data-sp="obj.total_goal2 ? obj.total_goal2 : '0.00'" @click="tzItem_click($event,indexs,index,'zjq',2)"><span class="row fen">2</span><span class="row betinfo">{{obj.total_goal2 ? obj.total_goal2 : "0.00"}}</span></span><span :class="obj.total_goal3 ? 'col betbtn' : 'col unable'" data-index="3" data-gametype="zjq" :data-sp="obj.total_goal3 ? obj.total_goal3 : '0.00'" @click="tzItem_click($event,indexs,index,'zjq',3)"><span class="row fen">3</span><span class="row betinfo">{{obj.total_goal3 ? obj.total_goal3 : "0.00"}}</span></span></span><span class="row"><span :class="obj.total_goal4 ? 'col betbtn' : 'col unable'" data-index="4" data-gametype="zjq" :data-sp="obj.total_goal4 ? obj.total_goal4 : '0.00'" @click="tzItem_click($event,indexs,index,'zjq',4)"><span class="row fen">4</span><span class="row betinfo">{{obj.total_goal4 ? obj.total_goal4 : "0.00"}}</span></span><span :class="obj.total_goal5 ? 'col betbtn' : 'col unable'" data-index="5" data-gametype="zjq" :data-sp="obj.total_goal5 ? obj.total_goal5 : '0.00'" @click="tzItem_click($event,indexs,index,'zjq',5)"><span class="row fen">5</span><span class="row betinfo">{{obj.total_goal5 ? obj.total_goal5 : "0.00"}}</span></span><span :class="obj.total_goal6 ? 'col betbtn' : 'col unable'" data-index="6" data-gametype="zjq" :data-sp="obj.total_goal6 ? obj.total_goal6 : '0.00'" @click="tzItem_click($event,indexs,index,'zjq',6)"><span class="row fen">6</span><span class="row betinfo">{{obj.total_goal6 ? obj.total_goal6 : "0.00"}}</span></span><span :class="obj.more_than6 ? 'col betbtn' : 'col unable'" data-index="7" data-gametype="zjq" :data-sp="obj.more_than6 ? obj.more_than6 : '0.00'" @click="tzItem_click($event,indexs,index,'zjq',7)"><span class="row fen">6+</span><span class="row betinfo">&nbsp;{{obj.more_than6 ? obj.more_than6 : "0.00"}}</span></span></span>
                                </div>
                              </div>
                            </dd>
                          </template>
                          <template v-if="playType==4">
                            <dt :class="indexs==0?'match-divider':'match-divider close'" :data-index="indexs"><!--// :data-index="item.dateTime[0]"-->
                            <span class='match-date'>{{item.titleDateTime}}</span><em class='match-num'>{{item.dataList.length &lt; 10 ? '&nbsp;&nbsp;' + item.dataList.length : item.dataList.length + '场'}}</em><span>{{$t('比赛可投')}}</span><i class="match-foldBtn arrow-ico"></i>
                            </dt>
                            <dd  v-if="league_indexList[obj.leagueIndex]==1" :key="index" class="match-item  match-item-01  represent" v-for="(obj,index) in item.dataList" :data-sign="obj.signNum" :data-index="obj.match_id" :data-type="index">
                            <div class="league-nd-time">
                              <span class="row league-name">{{obj.league_name}}</span>
                              <span class="row league-num">{{obj.sessions ? obj.sessions.length > 3 ? String(obj.sessions).substr(-3) : obj.sessions : ""}}</span>
                              <span class="row league-time">{{obj.hours + ':' + obj.minutes + ' 截止'}}</span>
                              <span class="detail" :data-id="obj.event_id" :data-away="obj.away_team_name" :data-home="obj.home_team_name" :data-away-id="obj.away_team_id" :data-home-id="obj.home_team_id"  :data-index='index'></span>
                            </div>
                            <div class="options-block bqc-options">
                              <span class="game-title row">
                                <span class="col hostteam" :data-index="obj.home_team_id">{{obj.home_team_name}}</span><span class="col vs">VS</span><span class="col guestteam" :data-index="obj.away_team_id">{{obj.away_team_name}}</span>
                              </span>
                              <span class="betbtn more-option ellipsis markHL-row-yellow"   :data-index='index' @click="unfold_tzArea(indexs,index)">{{$t('点击选择半全场结果的组合')}}</span>
                            </div>
                            </dd>
                          </template>
                          <template v-if="playType==6">
                            <dt :class="indexs==0?'match-divider':'match-divider close'" :data-index="indexs"><!--// :data-index="item.dateTime[0]"-->
                            <span class='match-date'>{{item.titleDateTime}}</span><em class='match-num'>{{item.dataList.length &lt; 10 ? '&nbsp;&nbsp;' + item.dataList.length : item.dataList.length + '场'}}</em><span>{{$t('比赛可投')}}</span><i class="match-foldBtn arrow-ico"></i>
                            </dt>
                            <dd  v-if="league_indexList[obj.leagueIndex]==1" class="match-item represent" :key="index" v-for="(obj,index) in item.dataList" :data-sign="obj.signNum" :data-index="obj.match_id" :data-type="index">
                            <div class="league-nd-time">
                              <span class="row league-name">{{obj.league_name}}</span>
                              <span class="row league-num">{{obj.sessions ? obj.sessions.length > 3 ? String(obj.sessions).substr(-3) : obj.sessions : ""}}</span>
                              <span class="row league-time">{{obj.hours + ':' + obj.minutes + ' 截止'}}</span>
                              <span class="detail" :data-id="obj.event_id" :data-away="obj.away_team_name" :data-home="obj.home_team_name" :data-away-id="obj.away_team_id" :data-home-id="obj.home_team_id"  :data-index='index'></span>
                            </div>

                            <div class="match-content mixall-block">
                                    <div class="game-title" :data-index="obj.league_id">
                                      <span class="col rqtitle">{{$t('让球')}}</span><span class="col hostteam"><i :data-index="obj.home_team_id">{{obj.home_team_name}}</i></span><span class="col vs">VS</span><span class="col guestteam"><i :data-index="obj.away_team_id">{{obj.away_team_name}}</i></span>
                                    </div>
                                    <template v-if="obj.home_win || obj.home_draw || obj.home_lose || obj.letball_win || obj.letball_draw || obj.letball_lose">
                                    <div class="game-area">
                                        <template v-if="(!obj.home_win && !obj.home_draw && !obj.home_lose) || (parseInt(obj.home_win) ===0 && parseInt(obj.home_draw) ===0 && parseInt(obj.home_lose) ===0)">
                                          <span class="row nonsupport" data-index="0"><span class="col game-type">0</span><span>{{$t('暂不支持')}}</span></span>
                                        </template>
                                        <template v-else>
                                          <span class="row" data-index="0"><span class="col game-type">0</span><span :class="obj.home_win ? 'col betbtn' : 'col unable'" data-index='0' data-gametype="spf" :data-sp="obj.home_win" @click="tzItem_click($event,indexs,index,'spf_rqspf',0)">{{$t('主胜')}}{{obj.home_win ? obj.home_win : "0.00"}}</span><span :class="obj.home_draw ? 'col betbtn' : 'col unable'" data-index='1' data-gametype="spf" :data-sp="obj.home_draw" @click="tzItem_click($event,indexs,index,'spf_rqspf',1)">平{{obj.home_draw ? obj.home_draw : "0.00"}}</span><span :class="obj.home_lose ? 'col betbtn' : 'col unable'" data-index='2' data-gametype="spf" :data-sp="obj.home_lose" @click="tzItem_click($event,indexs,index,'spf_rqspf',2)">主负{{obj.home_lose ? obj.home_lose : "0.00"}}</span></span>
                                        </template>
                                        <template v-if="(!obj.letball_win && !obj.letball_draw && !obj.letball_lose) || (parseInt(obj.letball_win) === 0 && parseInt(obj.letball_draw) ===0 && parseInt(obj.letball_lose) ===0)">
                                          <span class="row nonsupport" data-index="1"><span class="col game-type">{{obj.letball_number}}</span>{{$t('暂不支持')}}</span>
                                        </template>
                                        <template v-else>
                                          <span class="row" data-index="1"><span :class="parseInt(obj.letball_number) > 0 ? 'col game-type c_e24949' : 'col game-type'">{{obj.letball_number > 0 ? "+" + obj.letball_number : obj.letball_number}}</span><span :class="obj.letball_win ? 'col betbtn' : 'col unable'" data-index='0' data-gametype="spf" data-sp="obj.letball_win" @click="tzItem_click($event,indexs,index,'spf_rqspf',3)">{{$t('主胜')}}{{obj.letball_win ? obj.letball_win : "0.00"}}</span><span :class="obj.letball_draw ? 'col betbtn' : 'col unable'" data-index='1' data-gametype="spf" :data-sp="obj.letball_draw" @click="tzItem_click($event,indexs,index,'spf_rqspf',4)">平 {{obj.letball_draw ? obj.letball_draw : "0.00"}}</span><span :class="obj.letball_lose ? 'col betbtn' : 'col unable'" data-index='2' data-gametype="spf" :data-sp="obj.letball_lose" @click="tzItem_click($event,indexs,index,'spf_rqspf',5)">主负{{obj.letball_lose ? obj.letball_lose : "0.00"}}</span></span>
                                        </template>
                                  </div>
                                  <div class="game-more betbtn" :data-index='index' @click="unfold_tzArea(indexs,index)">
                                    <span class="row more-option ellipsis">{{$t('展开')}}<br>{{$t('全部')}}</span>
                                  </div>
                                </template>
                                <template v-else>
                                      <div class="game-more betbtn nonspf" @click="unfold_tzArea(indexs,index)" :data-index='index'>
                                        <span class="row more-option ellipsis">{{$t('展开全部')}}</span>
                                      </div>
                                  </template>
                                  </div>
                              </dd>
                          </template>
                        </dl>

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
                      <span class="screen-tzArea_dataList" @click="leagueScreen_selectAll">{{$t('全选')}}</span>
                      <span class="screen-reverse" @click="leagueScreen_selectReversal">{{$t('反选')}}</span>
                      <span class="screen-five" @click="leagueScreen_selectFive">{{$t('仅五大联赛')}}</span>
                    </div>
                    <ul class="competition-option">
                      <li class="active" v-for="(item,index) of leagueNameList" :key="index" :data-index="index" @click="leagueScreen_click($event,index)">{{item}}</li>
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
                <span class="box-center hide">{{$t('已选择')}} <em class="match-num">0</em> {{$t('场比赛')}}<span class="btn-cancel" @click="clearDataBtn_click"><i class="trash_icon"></i>{{$t('清空')}}</span></span>
                <span class="btn-confirm" data-index="0" @click="bottom_click($event)">{{$t('请选择比赛结果')}}</span>
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
                    <span class="gametype">
                    <i class="gameplay">{{tzType_free_html}}</i>
                    <i class="arrow-ico"></i>
                  </span><!--<div class="switchBtn" style="position: relative;display: inline;"><span class="switchover disabled" style="display: none;" @click="switchover_tzType($event)">多</span><span class="switchover" @click="switchover_tzType($event)">单</span></div>-->
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
                      <span :class="(tzType_freeShow[parseInt(item=='单关'?1:item)-1]==1)?'method active':'method'" :key="index" :data-index="parseInt(item=='单关'?1:item)" v-for="(item,index) of tzType_freeList" @click="tzTypeFreeList_click($event,item)">{{item}}<i class="isSelect"></i></span>
                    </div>
                    <span class='tip'>{{$t('串的场次越多')}}，{{$t('奖金越高')}}，{{$t('但中奖难度也越大哦')}}</span>
                  </div>
                  <p class="state"><span>{{user_state}}</span></p>
                  <p class="fixMultiple"><span @click="changeMultiple($event,'+10')">10倍</span><span @click="changeMultiple($event,'+20')">20倍</span><span @click="changeMultiple($event,'+50')">50倍</span><span @click="changeMultiple($event,'+100')">100倍</span></p>
                  <p class="sum">{{$t('预计奖金')}}
                    <span class="totalNum" data-index="1">{{totalNum+coinUnit}}</span>
                  </p>
                  <div class="paymentBtn">
                    <span>
                    {{$t('立即付款')}}
                    <i class="payNum">{{tz_sumNum*2*multiple}}</i>{{coinUnit}}
                  </span>
                  </div>
                </div>
                <div class="bet-agree">
                  <i></i><span>{{$t('我已阅读并同意')}}</span>
                  <span @click="togorule">《{{$t('委托投注规则')}}》</span>
                </div>
              </div>
            </section>
            <!--展开全部的按钮对应的弹出框-->
            <div class="iDialogWrap">
              <div class="iDialog" style="display: none;">
                <div id="iDialogContent" class="iDialogContent">
                  <div class="iDialogBody">
                    <div class="iDialogMain represent"  :data-type="(tzArea_dataList==0)?'':tzArea_dataList.play_type_id" :data-index="(tzArea_dataList==0)?'':tzArea_dataList.match_id" :data-select="index">
                      <span class="game-title row">
                      <span class="col hostteam">{{(tzArea_dataList==0)?'':tzArea_dataList.home_team_name}}</span>
                      <span class="col vs">VS</span>
                      <span class="col guestteam">{{(tzArea_dataList==0)?'':tzArea_dataList.away_team_name}}</span>
                      </span>
                      <template v-if="playType==6||playType==7">
                      <div class="game-listBody">
                        <div class="represent" :data-type="(tzArea_dataList==0)?'':tzArea_dataList.play_type_id" :data-index="(tzArea_dataList==0)?'':tzArea_dataList.match_id" :data-select="index">
                          <dl class="bf-block-all">
                            <dt class="data-inf">{{$t('比分')}}</dt>
                            <dd class="options-block">
                              <span class="row">
                              <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bf',0)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.win10?'col betbtn ':'col unable'))" data-index="0" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.win10">
                              <span class="row fen">1:0</span><span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.win10?tzArea_dataList.win10:'暂不支持')}}</span>
                              </span>
                              <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bf',1)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.win20?'col betbtn ':'col unable'))" data-index="1" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.win20">
                              <span class="row fen">2:0</span><span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.win20?tzArea_dataList.win20:'暂不支持')}}</span>
                              </span>
                              <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bf',2)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.win21?'col betbtn ':'col unable'))" data-index="2" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.win21">
                              <span class="row fen">2:1</span><span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.win21?tzArea_dataList.win21:'暂不支持')}}</span>
                              </span>
                              <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bf',3)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.win30?'col betbtn ':'col unable'))" data-index="3" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.win30">
                              <span class="row fen">3:0</span><span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.win30?tzArea_dataList.win30:'暂不支持')}}</span>
                              </span>
                              <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bf',4)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.win31?'col betbtn ':'col unable'))" data-index="4" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.win31">
                              <span class="row fen">3:1</span><span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.win31?tzArea_dataList.win31:'暂不支持')}}</span>
                              </span>
                              <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bf',5)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.win32?'col betbtn ':'col unable'))" data-index="5" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.win32">
                              <span class="row fen">3:2</span><span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.win32?tzArea_dataList.win32:'暂不支持')}}</span>
                              </span>
                              <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bf',6)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.win40?'col betbtn ':'col unable'))" data-index="6" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.win40">
                              <span class="row fen">4:0</span><span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.win40?tzArea_dataList.win40:'暂不支持')}}</span>
                              </span>
                              </span>
                              <span class="row">
                              <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bf',7)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.win41?'col betbtn ':'col unable'))" data-index="7" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.win41">
                              <span class="row fen">4:1</span><span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.win41?tzArea_dataList.win41:'暂不支持')}}</span>
                              </span>
                              <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bf',8)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.win42?'col betbtn ':'col unable'))" data-index="8" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.win42">
                              <span class="row fen">4:2</span><span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.win42?tzArea_dataList.win42:'暂不支持')}}</span>
                              </span>
                              <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bf',9)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.win50?'col betbtn ':'col unable'))" data-index="9" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.win50">
                              <span class="row fen">5:0</span><span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.win50?tzArea_dataList.win50:'暂不支持')}}</span>
                              </span>
                              <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bf',10)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.win51?'col betbtn ':'col unable'))" data-index="10" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.win51">
                              <span class="row fen">5:1</span><span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.win51?tzArea_dataList.win51:'暂不支持')}}</span>
                              </span>
                              <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bf',11)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.win52?'col betbtn ':'col unable'))" data-index="11" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.win52">
                              <span class="row fen">5:2</span><span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.win52?tzArea_dataList.win52:'暂不支持')}}</span>
                              </span>
                              <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bf',12)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.win_other?'col betbtn ':'col unable'))" data-index="12" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':(tzArea_dataList==0)?'':tzArea_dataList.win_other">
                              <span class="row fen">{{$t('胜其他')}}</span><span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.win_other?tzArea_dataList.win_other:'暂不支持')}}</span>
                              </span>
                              </span>
                              <span class="row">
                              <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bf',13)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.draw00?'col betbtn ':'col unable'))" data-index="13" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.draw00">
                              <span class="row fen">0:0</span><span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.draw00?tzArea_dataList.draw00:'暂不支持')}}</span>
                              </span>
                              <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bf',14)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.draw11?'col betbtn ':'col unable'))" data-index="14" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.draw11">
                              <span class="row fen">1:1</span><span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.draw11?tzArea_dataList.draw11:'暂不支持')}}</span>
                              </span>
                              <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bf',15)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.draw22?'col betbtn ':'col unable'))" data-index="15" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.draw22">
                              <span class="row fen">2:2</span><span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.draw22?tzArea_dataList.draw22:'暂不支持')}}</span>
                              </span>
                              <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bf',16)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.draw33?'col betbtn ':'col unable'))" data-index="16" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.draw33">
                              <span class="row fen">3:3</span><span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.draw33?tzArea_dataList.draw33:'暂不支持')}}</span>
                              </span>
                              <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bf',17)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.draw_other?'col betbtn ':'col unable'))" data-index="17" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.draw_other">
                              <span class="row fen">{{$t('平其他')}}</span><span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.draw_other?tzArea_dataList.draw_other:'暂不支持')}}</span>
                              </span>
                              </span>
                              <span class="row">
                              <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bf',18)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.lose01?'col betbtn ':'col unable'))" data-index="18" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.lose01">
                              <span class="row fen">0:1</span><span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.lose01?tzArea_dataList.lose01:'暂不支持')}}</span>
                              </span>
                              <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bf',19)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.lose02?'col betbtn ':'col unable'))" data-index="19" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.lose02">
                              <span class="row fen">0:2</span><span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.lose02?tzArea_dataList.lose02:'暂不支持')}}</span>
                              </span>
                              <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bf',20)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.lose12?'col betbtn ':'col unable'))" data-index="20" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.lose12">
                              <span class="row fen">1:2</span><span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.lose12?tzArea_dataList.lose12:'暂不支持')}}</span>
                              </span>
                              <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bf',21)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.lose03?'col betbtn ':'col unable'))" data-index="21" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.lose03">
                              <span class="row fen">0:3</span><span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.lose03?tzArea_dataList.lose03:'暂不支持')}}</span>
                              </span>
                              <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bf',22)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.lose13?'col betbtn ':'col unable'))" data-index="22" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.lose13">
                              <span class="row fen">1:3</span><span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.lose13?tzArea_dataList.lose13:'暂不支持')}}</span>
                              </span>
                              <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bf',23)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.lose23?'col betbtn ':'col unable'))" data-index="23" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.lose23">
                              <span class="row fen">2:3</span><span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.lose23?tzArea_dataList.lose23:'暂不支持')}}</span>
                              </span>
                              <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bf',24)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.lose04?'col betbtn ':'col unable'))" data-index="24" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.lose04">
                              <span class="row fen">0:4</span><span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.lose04?tzArea_dataList.lose04:'暂不支持')}}</span>
                              </span>
                              </span>
                              <span class="row">
                              <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bf',25)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.lose14?'col betbtn ':'col unable'))" data-index="25" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.lose14">
                              <span class="row fen">1:4</span><span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.lose14?tzArea_dataList.lose14:'暂不支持')}}</span>
                              </span>
                              <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bf',26)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.lose24?'col betbtn ':'col unable'))" data-index="26" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.lose24">
                              <span class="row fen">2:4</span><span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.lose24?tzArea_dataList.lose24:'暂不支持')}}</span>
                              </span>
                              <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bf',27)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.lose05?'col betbtn ':'col unable'))" data-index="27" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.lose05">
                              <span class="row fen">0:5</span><span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.lose05?tzArea_dataList.lose05:'暂不支持')}}</span>
                              </span>
                              <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bf',28)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.lose15?'col betbtn ':'col unable'))" data-index="28" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.lose15">
                              <span class="row fen">1:5</span><span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.lose15?tzArea_dataList.lose15:'暂不支持')}}</span>
                              </span>
                              <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bf',29)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.lose25?'col betbtn ':'col unable'))" data-index="29" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.lose25">
                              <span class="row fen">2:5</span><span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.lose25?tzArea_dataList.lose25:'暂不支持')}}</span>
                              </span>
                              <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bf',30)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.lose_other?'col betbtn ':'col unable'))" data-index="30" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.lose_other">
                               <span class="row fen">{{$t('负其他')}}</span><span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.lose_other?tzArea_dataList.lose_other:'暂不支持')}}</span>
                              </span>
                              </span>
                            </dd>
                          </dl>
                          <dl class="zjq-block"> <dt class="data-inf">{{$t('总进球')}}</dt>
                            <dd class="options-block">
                              <span class="row">
                              <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'zjq',31)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.total_goal0?'col betbtn ':'col unable'))" data-index="31" data-gametype="zjq" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.total_goal0">
                              <span class="row fen">0球</span><span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.total_goal0?tzArea_dataList.total_goal0:'暂不支持')}}</span>
                              </span>
                              <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'zjq',32)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.total_goal1?'col betbtn ':'col unable'))" data-index="32" data-gametype="zjq" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.total_goal1">
                              <span class="row fen">1球</span><span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.total_goal1?tzArea_dataList.total_goal1:'暂不支持')}}</span>
                              </span>
                              <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'zjq',33)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.total_goal2?'col betbtn ':'col unable'))" data-index="33" data-gametype="zjq" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.total_goal2">
                              <span class="row fen">2球</span><span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.total_goal2?tzArea_dataList.total_goal2:'暂不支持')}}</span>
                              </span>
                              <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'zjq',34)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.total_goal3?'col betbtn ':'col unable'))" data-index="34" data-gametype="zjq" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.total_goal3">
                              <span class="row fen">3球</span><span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.total_goal3?tzArea_dataList.total_goal3:'暂不支持')}}</span>
                              </span>
                              </span>
                              <span class="row">
                              <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'zjq',35)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.total_goal4?'col betbtn ':'col unable'))" data-index="35" data-gametype="zjq" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.total_goal4">
                              <span class="row fen">4球</span><span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.total_goal4?tzArea_dataList.total_goal4:'暂不支持')}}</span>
                              </span>
                              <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'zjq',36)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.total_goal5?'col betbtn ':'col unable'))" data-index="36" data-gametype="zjq" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.total_goal5">
                              <span class="row fen">5球</span><span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.total_goal5?tzArea_dataList.total_goal5:'暂不支持')}}</span>
                              </span>
                              <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'zjq',37)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.total_goal6?'col betbtn ':'col unable'))" data-index="37" data-gametype="zjq" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.total_goal6">
                              <span class="row fen">6球</span><span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.total_goal6?tzArea_dataList.total_goal6:'暂不支持')}}</span>
                              </span>
                              <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'zjq',38)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.more_than6?'col betbtn ':'col unable'))" data-index="38" data-gametype="zjq" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.more_than6">
                              <span class="row fen">6+球</span><span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.more_than6?tzArea_dataList.more_than6:'暂不支持')}}</span>
                              </span>
                              </span>
                            </dd>
                          </dl>
                          <dl class="bqc-block"> <dt class="data-inf">{{$t('半全场')}}</dt>
                            <dd class="options-block">
                              <span class="row">
                              <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bqc',39)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.win_win?'col betbtn ':'col unable'))" data-index="39" data-gametype="bqc" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.win_win">
                              <span class="row fen">{{$t('胜胜')}}</span>
                              <span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.win_win?tzArea_dataList.win_win:'暂不支持')}}</span>
                              </span>
                              <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bqc',40)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.win_draw?'col betbtn ':'col unable'))" data-index="40" data-gametype="bqc" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.win_draw">
                              <span class="row fen">{{$t('胜平')}}</span>
                              <span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.win_draw?tzArea_dataList.win_draw:'暂不支持')}}</span>
                              </span>
                              <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bqc',41)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.win_lose?'col betbtn ':'col unable'))" data-index="41" data-gametype="bqc" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.win_lose">
                              <span class="row fen">{{$t('胜负')}}</span>
                              <span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.win_lose?tzArea_dataList.win_lose:'暂不支持')}}</span>
                              </span>
                              </span>
                              <span class="row">
                              <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bqc',42)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.draw_win?'col betbtn ':'col unable'))" data-index="42" data-gametype="bqc" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.draw_win">
                              <span class="row fen">{{$t('平胜')}}</span>
                              <span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.draw_win?tzArea_dataList.draw_win:'暂不支持')}}</span>
                              </span>
                              <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bqc',43)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.draw_draw?'col betbtn ':'col unable'))" data-index="43" data-gametype="bqc" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.draw_draw">
                              <span class="row fen">{{$t('平平')}}</span>
                              <span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.draw_draw?tzArea_dataList.draw_draw:'暂不支持')}}</span>
                              </span>
                              <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bqc',44)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.draw_lose?'col betbtn ':'col unable'))" data-index="44" data-gametype="bqc" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.draw_lose">
                              <span class="row fen">{{$t('平负')}}</span>
                              <span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.draw_lose?tzArea_dataList.draw_lose:'暂不支持')}}</span>
                              </span>
                              </span>
                              <span class="row">
                              <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bqc',45)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.lose_win?'col betbtn ':'col unable'))" data-index="45" data-gametype="bqc" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.lose_win">
                              <span class="row fen">{{$t('负胜')}}</span>
                              <span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.lose_win?tzArea_dataList.lose_draw:'暂不支持')}}</span>
                              </span>
                              <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bqc',46)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.lose_draw?'col betbtn ':'col unable'))" data-index="46" data-gametype="bqc" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.lose_draw">
                              <span class="row fen">{{$t('负平')}}</span>
                              <span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.lose_draw?tzArea_dataList.lose_draw:'暂不支持')}}</span>
                              </span>
                              <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bqc',47)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.lose_lose?'col betbtn ':'col unable'))" data-index="47" data-gametype="bqc" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.lose_lose">
                              <span class="row fen">{{$t('负负')}}</span>
                              <span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.lose_lose?tzArea_dataList.lose_lose:'暂不支持')}}</span>
                              </span>
                              </span>
                            </dd>
                          </dl>
                        </div>
                      </div>
                      </template>
                      <template v-if="playType==2||playType==10">
                        <dl class="bf-block bf-block-s">
                        <dt class="data-inf">{{$t('胜')}}</dt>
                        <dd class="options-block">
                          <span class="row">
                          <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bf',0)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.win10?'col betbtn ':'col unable'))" data-index="0" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.win10">
                          <span class="row fen">1:0</span><span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.win10?tzArea_dataList.win10:'暂不支持')}}</span>
                          </span>
                          <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bf',1)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.win20?'col betbtn ':'col unable'))" data-index="1" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.win20">
                          <span class="row fen">2:0</span><span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.win20?tzArea_dataList.win20:'暂不支持')}}</span>
                          </span>
                          <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bf',2)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.win21?'col betbtn ':'col unable'))" data-index="2" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.win21">
                          <span class="row fen">2:1</span><span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.win21?tzArea_dataList.win21:'暂不支持')}}</span>
                          </span>
                          <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bf',3)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.win30?'col betbtn ':'col unable'))" data-index="3" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.win30">
                          <span class="row fen">3:0</span><span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.win30?tzArea_dataList.win30:'暂不支持')}}</span>
                          </span>
                          <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bf',4)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.win31?'col betbtn ':'col unable'))" data-index="4" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.win31">
                          <span class="row fen">3:1</span><span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.win31?tzArea_dataList.win31:'暂不支持')}}</span>
                          </span>
                          <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bf',5)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.win32?'col betbtn ':'col unable'))" data-index="5" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.win32">
                          <span class="row fen">3:2</span><span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.win32?tzArea_dataList.win32:'暂不支持')}}</span>
                          </span>
                          <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bf',6)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.win40?'col betbtn ':'col unable'))" data-index="6" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.win40">
                          <span class="row fen">4:0</span><span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.win40?tzArea_dataList.win40:'暂不支持')}}</span>
                          </span>
                          </span>
                          <span class="row">
                          <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bf',7)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.win41?'col betbtn ':'col unable'))" data-index="7" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.win41">
                          <span class="row fen">4:1</span><span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.win41?tzArea_dataList.win41:'暂不支持')}}</span>
                          </span>
                          <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bf',8)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.win42?'col betbtn ':'col unable'))" data-index="8" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.win42">
                          <span class="row fen">4:2</span><span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.win42?tzArea_dataList.win42:'暂不支持')}}</span>
                          </span>
                          <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bf',9)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.win50?'col betbtn ':'col unable'))" data-index="9" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.win50">
                          <span class="row fen">5:0</span><span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.win50?tzArea_dataList.win50:'暂不支持')}}</span>
                          </span>
                          <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bf',10)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.win51?'col betbtn ':'col unable'))" data-index="10" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.win51">
                          <span class="row fen">5:1</span><span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.win51?tzArea_dataList.win51:'暂不支持')}}</span>
                          </span>
                          <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bf',11)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.win52?'col betbtn ':'col unable'))" data-index="11" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.win52">
                          <span class="row fen">5:2</span><span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.win52?tzArea_dataList.win52:'暂不支持')}}</span>
                          </span>
                          <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bf',12)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.win_other?'col betbtn ':'col unable'))" data-index="12" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.win_other">
                          <span class="row fen">{{$t('胜其他')}}</span><span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.win_other?tzArea_dataList.win_other:'暂不支持')}}</span>
                          </span>
                          </span>
                        </dd>
                      </dl>
                      <dl class="bf-block bf-block-p" data-matchcode="201708244001">
                        <dt class="data-inf">{{$t('平')}}</dt>
                        <dd class="options-block">
                          <span class="row">
                          <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bf',13)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.draw00?'col betbtn ':'col unable'))" data-index="13" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.draw00">
                          <span class="row fen">0:0</span><span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.draw00?tzArea_dataList.draw00:'暂不支持')}}</span>
                          </span>
                          <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bf',14)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.draw11?'col betbtn ':'col unable'))" data-index="14" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.draw11">
                          <span class="row fen">1:1</span><span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.draw11?tzArea_dataList.draw11:'暂不支持')}}</span>
                          </span>
                          <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bf',15)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.draw22?'col betbtn ':'col unable'))" data-index="15" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.draw22">
                          <span class="row fen">2:2</span><span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.draw22?tzArea_dataList.draw22:'暂不支持')}}</span>
                          </span>
                          <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bf',16)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.draw33?'col betbtn ':'col unable'))" data-index="16" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.draw33">
                          <span class="row fen">3:3</span><span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.draw33?tzArea_dataList.draw33:'暂不支持')}}</span>
                          </span>
                          <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bf',17)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.draw_other?'col betbtn ':'col unable'))" data-index="17" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.draw_other">
                          <span class="row fen">{{$t('平其他')}}</span><span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.draw_other?tzArea_dataList.draw_other:'暂不支持')}}</span>
                          </span>
                          </span>
                        </dd>
                      </dl>
                      <dl class="bf-block bf-block-f" data-matchcode="201708244001">
                        <dt class="data-inf">{{$t('负')}}</dt>
                        <dd class="options-block">
                          <span class="row">
                          <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bf',18)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.lose01?'col betbtn ':'col unable'))" data-index="18" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.lose01">
                          <span class="row fen">0:1</span><span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.lose01?tzArea_dataList.lose01:'暂不支持')}}</span>
                          </span>
                          <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bf',19)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.lose02?'col betbtn ':'col unable'))" data-index="19" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.lose02">
                          <span class="row fen">0:2</span><span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.lose02?tzArea_dataList.lose02:'暂不支持')}}</span>
                          </span>
                          <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bf',20)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.lose12?'col betbtn ':'col unable'))" data-index="20" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.lose12">
                          <span class="row fen">1:2</span><span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.lose12?tzArea_dataList.lose12:'暂不支持')}}</span>
                          </span>
                          <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bf',21)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.lose03?'col betbtn ':'col unable'))" data-index="21" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.lose03">
                          <span class="row fen">0:3</span><span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.lose03?tzArea_dataList.lose03:'暂不支持')}}</span>
                          </span>
                          <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bf',22)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.lose13?'col betbtn ':'col unable'))" data-index="22" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.lose13">
                          <span class="row fen">1:3</span><span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.lose13?tzArea_dataList.lose13:'暂不支持')}}</span>
                          </span>
                          <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bf',23)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.lose23?'col betbtn ':'col unable'))" data-index="23" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.lose23">
                          <span class="row fen">2:3</span><span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.lose23?tzArea_dataList.lose23:'暂不支持')}}</span>
                          </span>
                          <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bf',24)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.lose04?'col betbtn ':'col unable'))" data-index="24" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.lose04">
                          <span class="row fen">0:4</span><span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.lose04?tzArea_dataList.lose04:'暂不支持')}}</span>
                          </span>
                          </span>
                          <span class="row">
                          <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bf',25)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.lose14?'col betbtn ':'col unable'))" data-index="25" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.lose14">
                          <span class="row fen">1:4</span><span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.lose14?tzArea_dataList.lose14:'暂不支持')}}</span>
                          </span>
                          <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bf',26)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.lose24?'col betbtn ':'col unable'))" data-index="26" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.lose24">
                          <span class="row fen">2:4</span><span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.lose24?tzArea_dataList.lose24:'暂不支持')}}</span>
                          </span>
                          <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bf',27)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.lose05?'col betbtn ':'col unable'))" data-index="27" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.lose05">
                          <span class="row fen">0:5</span><span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.lose05?tzArea_dataList.lose05:'暂不支持')}}</span>
                          </span>
                          <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bf',28)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.lose15?'col betbtn ':'col unable'))" data-index="28" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.lose15">
                          <span class="row fen">1:5</span><span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.lose15?tzArea_dataList.lose15:'暂不支持')}}</span>
                          </span>
                          <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bf',29)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.lose25?'col betbtn ':'col unable'))" data-index="29" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.lose25">
                          <span class="row fen">2:5</span><span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.lose25?tzArea_dataList.lose25:'暂不支持')}}</span>
                          </span>
                          <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bf',30)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.lose_other?'col betbtn ':'col unable'))" data-index="30" data-gametype="bf" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.lose_other">
                          <span class="row fen">{{$t('负其他')}}</span><span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.lose_other?tzArea_dataList.lose_other:'暂不支持')}}</span>
                          </span>
                          </span>
                        </dd>
                      </dl>
                      </template>
                      <template v-if="playType==4||playType==12">
                        <dl class="bqc-block markHL-block-yellow">
                        <dt class="data-inf">{{$t('半全场')}}</dt>
                        <dd class="options-block">
                          <span class="row">
                          <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bqc',0)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.win_win?'col betbtn ':'col unable'))" data-index="0" data-gametype="bqc" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.win_win">
                            <span class="row fen">{{$t('胜胜')}}</span>
                            <span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.win_win?tzArea_dataList.win_win:'暂不支持')}}</span>
                          </span>
                          <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bqc',1)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.win_draw?'col betbtn ':'col unable'))" data-index="1" data-gametype="bqc" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.win_draw">
                            <span class="row fen">{{$t('胜平')}}</span>
                            <span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.win_draw?tzArea_dataList.win_draw:'暂不支持')}}</span>
                          </span>
                          <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bqc',2)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.win_lose?'col betbtn ':'col unable'))" data-index="2" data-gametype="bqc" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.win_lose">
                            <span class="row fen">{{$t('胜负')}}</span>
                            <span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.win_lose?tzArea_dataList.win_lose:'暂不支持')}}</span>
                          </span>
                          </span>
                          <span class="row">
                          <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bqc',3)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.draw_win?'col betbtn ':'col unable'))" data-index="3" data-gametype="bqc" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.draw_win">
                            <span class="row fen">{{$t('平胜')}}</span>
                            <span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.draw_win?tzArea_dataList.draw_win:'暂不支持')}}</span>
                          </span>
                          <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bqc',4)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.draw_draw?'col betbtn ':'col unable'))" data-index="4" data-gametype="bqc" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.draw_draw">
                            <span class="row fen">{{$t('平平')}}</span>
                            <span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.draw_draw?tzArea_dataList.draw_draw:'暂不支持')}}</span>
                          </span>
                          <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bqc',5)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.draw_lose?'col betbtn ':'col unable'))" data-index="5" data-gametype="bqc" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.draw_lose">
                            <span class="row fen">{{$t('平负')}}</span>
                            <span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.draw_lose?tzArea_dataList.draw_lose:'暂不支持')}}</span>
                          </span>
                          </span>
                          <span class="row">
                          <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bqc',6)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.lose_win?'col betbtn ':'col unable'))" data-index="6" data-gametype="bqc" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.lose_win">
                            <span class="row fen">{{$t('负胜')}}</span>
                            <span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.lose_win?tzArea_dataList.lose_win:'暂不支持')}}</span>
                          </span>
                          <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bqc',7)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.lose_draw?'col betbtn ':'col unable'))" data-index="7" data-gametype="bqc" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.lose_draw">
                            <span class="row fen">{{$t('负平')}}</span>
                            <span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.lose_draw?tzArea_dataList.lose_draw:'暂不支持')}}</span>
                          </span>
                          <span @click="tzItem_click($event,nowAreaIndexs,nowAreaIndex,'bqc',8)" :class="(tzArea_dataList==0?'col unable':(tzArea_dataList.lose_lose?'col betbtn ':'col unable'))" data-index="8" data-gametype="bqc" :data-sp="(tzArea_dataList==0)?'':tzArea_dataList.lose_lose">
                            <span class="row fen">{{$t('负负')}}</span>
                            <span class="row betinfo">{{(tzArea_dataList==0)?'':(tzArea_dataList.lose_lose?tzArea_dataList.lose_lose:'暂不支持')}}</span>
                          </span>
                          </span>
                        </dd>
                      </dl>

                      </template>
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
              <div class="selectMain"></div>
            </div>
          </div>
          <div v-show="playType==1||playType==3||playType==6" id='sharkit' @click="sharkitFn"></div>
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

<script src="../../../assets/js/sg/qfhh.js"></script>


<style src="../../../style/sg/qf.css" scoped></style>


