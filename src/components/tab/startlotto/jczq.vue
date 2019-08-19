<template>
  <div>
    <div id="container">
      <div id="main" v-cloak>
    <!--顶部-->
    <header id="header">
        <h1>{{$t('竞彩足球')}}</h1>
        <a class="goBack"  @click="routerBack" href="javascript:void(0)">{{$t('返回')}}</a>
        <!-- <a id="selectDate">日期</a> -->
        <!-- <img src="images/date.png" width="20" height="20" />
        <a id="trigger1">期次</a> -->
    </header>
    <div class="selTool">
       <p class="sel_item" v-cloak>
            <span id="trigger1">{{selDate}}</span><span class="bage" v-show="selDate"></span>
       </p>
    </div>
    <!--列表内容 {{thisDay}}-->
    <div class="inner">
        <div style="color: #999999;" id="noMessage">
        	<img src="../../../assets/images/background.png" height="200rem"/>
        	<p>{{$t('暂无数据')}}</p>
        </div>
        <div id="pullrefresh">
        	<ul class="mui-table-view mui-table-view-chevron">
				<li>
					<div v-for="(it,index) in datas" id="showMessage">
			            <!-- <p class="inner-date match-divider" @click="fold(index)" :id="index" v-cloak>
			                {{it[0].gameDate}}
			                {{it.length}}{{$t('场比赛已开奖')}}
                            <i class="match-foldBtn arrow-ico"></i>
			            </p> -->
			            <div class="inner-div">
			                <ul class="inner-list">
			                    <li v-for="item in it" @click="skip(item.leagueName,item.matchDate,item.shifen,item.homeTeam.teamId,item.homeTeam.teamName,item.awayTeam.teamId,item.awayTeam.teamName,item.courtScore,item.eventId)">
			                        <!--上边部分-->
			                        <div class="li-top clearf">
			                            <div class="li-top-left">
			                                <p v-cloak>{{item.leagueName}}</p>
			                                <!--<p>-->
			                                    <!--<span v-cloak>{{item.sessions}}</span>-->
			                                    <!--<span v-cloak>{{item.matchDate.substr(11,5)}}</span>-->
			                                <!--</p>-->
			                                <p v-cloak>{{item.sessions}}</p>
			                                <p v-cloak>{{item.matchDate.substr(11,5)}}</p>
			                            </div>
			                            <div class="li-top-right">
			                                <div v-cloak>{{item.homeTeam.teamName.substr(0,4)}}</div>
			                                <div>
			                                    <p style="font-size: 1.2rem;" v-cloak>
                                                    <span style="color:red" v-if="item.spf=='胜'">{{item.courtScore}}</span>
                                                    <span style="color:blue" v-if="item.spf=='平'">{{item.courtScore}}</span>
                                                    <span style="color:green" v-if="item.spf=='负'">{{item.courtScore}}</span>
                                                </p>
			                                    <p style="color: #CCCCCC;" v-cloak>半{{item.halfCourtScore}}</p>
			                                </div>
			                                <div v-cloak>{{item.awayTeam.teamName.substr(0,4)}}</div>
			                            </div>
			                        </div>
			                        <!--下边部分-->
			                        <div class="li-bottom clearf">
			                            <!--胜平负-->
			                            <div>
			                                <p v-cloak>{{item.spf}}</p>
			                                <p v-cloak>{{item.spfP!=undefined?item.spfP:'--'}}</p>
			                            </div>
			                            <!--让球胜平负-->
			                            <div>
			                                <p v-cloak>({{item.letballNumber}}){{item.rqspf}}</p>
			                                <p v-cloak>{{item.rspfP!=undefined?item.rspfP:'--'}}</p>
			                            </div>
			                            <!--总比分-->
			                            <div>
			                                <p v-cloak>
                                                <span style="color:red" v-if="item.spf=='胜'">{{item.courtScore}}</span>
                                                <span style="color:blue" v-if="item.spf=='平'">{{item.courtScore}}</span>
                                                <span style="color:green" v-if="item.spf=='负'">{{item.courtScore}}</span>
                                            </p>
			                                <p v-cloak>{{item.qbifen?item.qbifen:'--'}}</p>
			                            </div>
			                            <!--两队进球数相加-->
			                            <div>
			                                <p v-cloak>{{item.totalCount}}球</p>
			                                <p v-cloak>{{item.totalCountP!=undefined?item.totalCountP:'--'}}</p>
			                            </div>
			                            <!--半全场-->
			                            <div>
			                                <p v-cloak>{{item.banquanchang}}</p>
			                                <p v-cloak>{{item.banquanchangP!=undefined?item.banquanchangP:'--'}}</p>
			                            </div>
			                        </div>
			                        <span>></span>
			                    </li>
			                </ul>
			            </div>
        			</div>
				</li>
        	</ul>
        </div>

    </div>
    <div class="box">
        <input type="text" id="input3" style="display: none;"/>
        <div class="jsbox"></div>
    </div>
    <!--底部动态图-->
    <!--<div class="gifPic">-->
        <!--<img src="images/1469442553354_1.png"/>-->
    <!--</div>-->
    <!--底部按钮-->
    <div class="footer">
        <a href="javascript:void(0)" @click='togozczq'>{{$t('投注竞彩足球')}}</a>
    </div>
</div>
    </div>
  </div>
</template>


<script src="../../../assets/js/startlotto/jczq.js"></script>

<style src="../../../style/startlotto/jczq.css" scoped></style>
