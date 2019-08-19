<template>
  <div>
    <div id="container">
<div id="main">
    <!--顶部-->
    <header id="header">
        <h1>{{$t('足球单场')}}</h1>
        <a class="goBack" @click="routerBack" href="javascript:void(0)">{{$t('返回')}}</a>
        <!-- <img src="images/date.png" width="20" height="20"/> -->
        <!-- <a id="trigger2">期次</a> -->
    </header>

	<!--列表内容 {{thisDay}}-->
    <div class="inner">
        <div class="selTool clearf">
            <p class="sel_item clearf" v-cloak v-if="bannerNumber">
                <span class="banner_switch" id="trigger1">
                    {{bannerNumber}}期
                </span>
                <span class="bage"></span>
                <span id="trigger2">{{selDate}}</span>
                <span class="bage" v-if="dateArr.length"></span>
            </p>
            <!-- <ul class="banner_list clearf">
                <li>10087</li>
                <li>10088</li>
                <li>10089</li>
            </ul> -->
        </div>
        <img v-cloak v-if="noData&&dataOnload" width="100%" src="../../../assets/images/background.png" alt="" srcset="">
        <!--列表内容-->
        <div id="pullrefresh">
        	<ul class="mui-table-view mui-table-view-chevron">
        		<li>
        			<div v-for="(it,index) in datas">
			            <!-- <p class="inner-date divider match-divider" @click="fold(index)" :id="index" v-cloak>
			                	第{{it[0].bannerNumber}}期 {{it[0].gameDate}} {{it.length}}{{$t('场比赛已开奖')}}
                            <i class="match-foldBtn arrow-ico"></i>
			            </p> -->
			            <div class="inner-div">
			                <ul class="inner-list">
			                    <li v-for="item in it"
			                        @click="skip(item.leagueName,item.matchDate,item.shifen,item.homeTeam.teamId,item.homeTeam.teamName,item.awayTeam.teamId,item.awayTeam.teamName,item.courtScore,item.eventId)">
			                        <!--上边部分-->
			                        <div class="li-top clearf">
			                            <div class="li-top-left">
			                                <p v-cloak>{{item.leagueName}}</p>
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
			                                <p v-cloak>({{item.letballNumber}}){{item.rqspf}}</p>
			                                <p v-cloak>{{item.letballNumber?item.rspfP:item.spfP}}</p>
			                            </div>
			                            <!--让球胜平负-->
			                            <div>
			                                <p v-cloak>
                                                <span style="color:red" v-if="item.spf=='胜'">{{item.courtScore}}</span>
                                                <span style="color:blue" v-if="item.spf=='平'">{{item.courtScore}}</span>
                                                <span style="color:green" v-if="item.spf=='负'">{{item.courtScore}}</span>
                                            </p>
			                                <p v-cloak>{{item.dcqbifen!=undefined?item.dcqbifen:'--'}}</p>
			                            </div>
                                        <!--总比分-->
                                        <div>
                                            <p></p>
                                            <p></p>
                                        </div>
			                            <div>
			                                <p v-cloak>{{item.totalCount}}球</p>
			                                <p v-cloak>{{item.totalCountP!=undefined?item.totalCountP:'--'}}</p>
			                            </div>
			                            <!-- 两队进球数相加
			                            <div>
			                                <p v-cloak>{{item.banquanchang}}</p>
			                                <p v-cloak>{{item.dcbanquanchangP?item.dcbanquanchangP:'--'}}</p>
			                            </div> -->
			                            <!--半全场-->
			                            <div>
			                                <p v-cloak>{{item.sxds}}</p>
			                                <!-- <p v-cloak>{{item.upDownResult}}</p> -->
			                                <p v-cloak>{{item.sxdsP!=undefined?item.sxdsP:'--'}}</p>
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
    <!--底部动态图-->
    <!--<div class="gifPic">-->
        <!--<img src="images/1469442553354_1.png"/>-->
    <!--</div>-->
    <!--底部按钮-->
    <div class="footer">
        <a href="javascript:void(0)" @click='togozqdc'>{{$t('投注足球单场')}}</a>
    </div>
</div>

    </div>
  </div>
</template>

<script src="../../../assets/js/startlotto/zqdc.js"></script>

<style src="../../../style/startlotto/zqdc.css" scoped></style>
