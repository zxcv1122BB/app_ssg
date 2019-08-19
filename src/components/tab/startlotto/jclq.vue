<template>
  <div>
    <div id="container">
      <div id="main">
        <!--顶部-->
        <header id="header">
            <h1>{{$t('竞彩篮球')}}</h1>
            <a @click="routerBack" class="goBack" href="javascript:void(0)">{{$t('返回')}}</a>
            <!-- <img src="images/date.png" width="20" height="20" />
            <a id="selectDate">日期</a> -->
        </header>
        <div class="selTool" v-cloak>
            <p class="sel_item">
                <!-- <span id="selectDate">{{date}}</span> -->
                <span id="selectDate">
                    {{date}}
                </span>
                <span class="bage" v-show="date"></span>
            </p>
        </div>

        <!--列表内容 {{thisDay}}-->
        <div class="inner" v-cloak>
            <div style="color: #999999;" id="noMessage">
                <img src="../../../assets/images/background.png" height="200rem" />
                <p>{{$t('暂无数据')}}</p>
            </div>
            <div id="pullrefresh">
                <ul class="mui-table-view mui-table-view-chevron">
                    <li>
                        <div v-for="(it,index) in datas" id="showMessage">
                            <p class="inner-date match-divider" @click="fold(index)" :id="index" v-cloak>
                                {{it[0].gameDate}} {{it.length}}{{$t('场比赛已开奖')}}
                                <i class="match-foldBtn arrow-ico"></i>
                            </p>
                            <div class="inner-div">
                                <ul class="inner-list">
                                    <li v-for="item in it" @click="skip(item.matchId)">
                                        <!--上边部分-->
                                        <div class="li-top clearf">
                                            <div class="li-top-left">
                                                <p v-cloak>{{item.leagueName}}</p>
                                                <p>
                                                    <span v-cloak>{{item.sessions}}</span>
                                                    <span v-cloak>{{item.matchDate.substr(11,5)}}</span>
                                                </p>
                                            </div>
                                            <div class="li-top-right">
                                                <div v-cloak>{{item.awayTeamName}}</div>
                                                <div>
                                                    <p style="font-size: 1.2rem;" v-cloak>
                                                        <span style="color:red" v-if="item.matchResult==1">{{item.courtScore}}</span>
                                                        <span style="color:green" v-else>{{item.courtScore}}</span>
                                                    </p>
                                                    <p style="color:#999;font-size:0.6rem;">{{$t('总分')}}{{item.totalScore}}
                                                        <span>{{$t('分差')}}{{item.scoreDifference}}</span>
                                                    </p>
                                                </div>
                                                <div v-cloak>{{item.homeTeamName}}</div>
                                            </div>
                                        </div>
                                        <!--下边部分-->
                                        <div class="li-bottom clearf">
                                            <!--胜负-->
                                            <div>
                                                <p v-cloak>{{item.matchResult!=undefined?item.matchResult==1?'胜':'负':'-'}}</p>
                                                <p v-cloak>{{item.matchOdds!=undefined?item.matchOdds:'--'}}</p>
                                            </div>
                                            <!--让分胜负-->
                                            <div>
                                                <p v-cloak>({{item.letScore}}){{item.letScoreResult!=undefined?item.letScoreResult:'-'}}</p>
                                                <p v-cloak>{{item.letScoreOdds?item.letScoreOdds:'--'}}</p>
                                            </div>
                                            <!--大小分-->
                                            <div>
                                                <p v-cloak>{{item.bigSmallScoreResult!=undefined?item.bigSmallScoreResult:'-'}}</p>
                                                <p v-cloak>{{item.bigSmallOdds!=undefined?item.bigSmallOdds:'--'}}</p>
                                            </div>
                                            <!--胜分差-->
                                            <div>
                                                <p v-cloak>{{item.winScoreResult!=undefined?item.winScoreResult.replace("_", "-"):'-'}}</p>
                                                <p v-cloak>{{item.scoreDifferenceOdds!=undefined?item.scoreDifferenceOdds:'--'}}</p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="box">
                <input type="text" id="input3" style="display: none;" />
                <div class="jsbox"></div>
            </div>
            <!--底部按钮-->
            <div class="footer">
                <a href="javascript:void(0)" @click="togojclq">{{$t('投注竞彩篮球')}}</a>
            </div>
        </div>
    </div>
    </div>
  </div>
</template>

<script src="../../../assets/js/startlotto/jclq.js"></script>

<style src="../../../style/common/shijian.css" scoped></style>

<style src="../../../style/startlotto/jclq.css" scoped></style>
