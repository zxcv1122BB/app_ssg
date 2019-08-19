<template>
<div>
    <div id="container">
    <div id="ssc">
                <header id="header" class="mui-bar mui-bar-nav">
                    <template v-if="!switchoverType">
                        <a class="goBack" href="javascript:void(0)" @click="routerBack"></a>
                        <!-- <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a> -->
                        <!-- <a class="mui-title" href="#middlePopover">重庆时时彩<i class="mui-icon mui-icon-arrowdown"></i></a> -->
                        <div class="gameplaySelect" v-cloak>
                                <span></span><span class="btn" @click="switchoverType=true" v-cloak>{{title}}<span class="arrow-down" style="position:relative;right:0;top:50%;margin-top:0px;"></span></span>
                            </div>
                        <!-- <span>[{{pack_coin+coinUnit}}]</span> -->
                        <span v-if="userName" :class="isCollect==1?'iconfont collect1':'iconfont collect'" @touchstart="collectFn"></span>
                        <a class="mui-action-menu mui-icon mui-icon-bars mui-pull-right"  href="javascript:void(0)" @click="showMenu"></a>
                    </template>
                    <template  v-else>
						<h1>{{$t('全部玩法')}}</h1>
						<a href="javascript:;" @click="switchoverType=false" class="closeBtn"></a>
					</template>
                </header>
                <div class="topPopover_wrap">
                    <div class="wrap" @click="closeMenu(1)"></div>
                <div id="topPopover" class="mui-popover">
                    <div class="mui-popover-arrow"></div>
                    <div class="mui-scroll-wrapper">
                        <div class="mui-scroll">
                            <ul class="mui-table-view">
                                <li @click="togoChart()"><a href="javascript:;"><img src="../../../assets/images/trend.png" alt="" srcset="">{{$t('走势图')}}</a></li>
                                <li @click="togoLottery()"><a href="javascript:;"><img src="../../../assets/images/prize.png" alt="" srcset="">{{$t('近期开奖')}}</a></li>
                                <li @click="togoRecord()"><a href="javascript:;"><img src="../../../assets/images/record.png" alt="" srcset="">{{$t('购彩记录')}}</a></li>
                                <li @click="handleShowRule()"><a href="javascript:;"><img src="../../../assets/images/gameTips.png" alt="" srcset="">{{$t('玩法提示')}}</a></li>
                                
                            </ul>
                        </div>
                    </div>
                </div>
                 <div id="topPopover_tips" class="mui-popover">
                     <div class="mui-scroll-wrapper">
                        <div class="mui-scroll">
                            <div class="inner">
                                <div class="content">
                                    <p class="help-title">
                                        <span style="color: #78d6d5;font-size:1.1rem;">1.{{$t('玩法提示')}}</span>
                                    </p>
                                    <p>{{game_tips}}</p>
                                    <p class="help-title">
                                        <span style="color: #78d6d5;font-size:1.1rem;">2.{{$t('中奖说明')}}</span>
                                    </p>
                                    <p>{{win_explain}}</p>
                                    <p class="help-title">
                                        <span style="color: #78d6d5;font-size:1.1rem;">3.{{$t('范例')}}</span>
                                    </p>
                                    <p>{{win_example}}</p>
                                </div>
                            </div>
                         </div>
                     </div>
                 </div>
                 </div>
        <!--走势图-->
        <!-- <div class="mask menu" @click="closeMenu">
            <div class="menu_list">
                <span class="bage"></span>
                <ul>
                    <li @click="togoChart()"><a href="javascript:;"><img src="../../../assets/images/trend.png" alt="" srcset="">{{$t('走势图')}}</a></li>
                    <li @click="togoLottery()"><a href="javascript:;"><img src="../../../assets/images/prize.png" alt="" srcset="">{{$t('近期开奖')}}</a></li>
                        <li @click="togoRecord()"><a href="javascript:;"><img src="../../../assets/images/record.png" alt="" srcset="">{{$t('购彩记录')}}</a></li>
                    <li @click="handleShowRule()"><a href="javascript:;"><img src="../../../assets/images/gameTips.png" alt="" srcset="">{{$t('玩法提示')}}</a></li>
                </ul>
            </div>
        </div> -->
        <div id="gameplayArea"  v-show="switchoverType">
            <div class="play_head" v-cloak>
                <ul>
                    <li v-for="(item,index) in menu" :class="parentIndex==index?'active':''" @click="parentIndex=index;title=item.oneType">
                        <span class="sel">{{item.oneType}}</span>
                    </li>
                </ul>
            </div>
            <div class="play_list" v-cloak>
                <ul>
                    <li v-for="(item,index) in menu" v-show="parentIndex==index">
                        <div>
                            <p class="type_item">
                                <span class="sel" v-for="(items,indexs) in item.twoType" @click="handlePlayType(items.Ename)"  :class="index==0&&indexs==0?'active':''" >{{items.name}}</span>
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div id="offCanvasContentScroll" class="mui-content mui-scroll-wrapper">
                    <div class="mui-scroll" style="height: calc(100% - 44px) !important;">
                        <div style="padding: 0 15px" class="background_nk3">
                            <ul class="mui-row" style="padding: 5px 0;">
                                <li style="line-height: 30px;color: #fff;font-size: 1rem;float:left;">
                                    {{previousIssue}}期
                                    <!-- <button class="mui-btn" style="padding: 2px 7px;font-size: 13px;background: #8b8feb;border: none;margin-left: 10px;margin-top: 5px;">结果走势</button> -->
                                    <img  class="refresh" src="../../../assets/images/base/refresh.png"  @click="downRefresh()"  style="height: 20px;margin-top:4px;vertical-align: top;">
                                </li>
                                <li style="line-height: 30px;color: #fff;font-size: 1rem;float:left;margin-left:8px;">
                                    <span>[{{pack_coin+coinUnit}}]</span>
                                </li>
                                <li style="padding-left: 10px;margin-top: 4px;float:right;" @toggle="changDN">
                                    <div id="change" class="mui-switch">
                                        <div class="mui-switch-handle"></div>
                                    </div>
                                </li>
                            </ul>
                             <div class="hisWrap hide" @click="showHis(2)"></div>
                            <div class="num " @click="showHis(1)">
                                <!-- <span class="red" style="font-size: 1.2rem;color:red;" v-if="previousIssue_tips">{{$t('开奖中')}}...</span> -->
                                <div v-if="previousIssue_tips" >
                                    <span style="font-size:1.2rem;color:red;height: 25px;display: inline-block;position:relative;top:-.2rem;">{{$t('开奖数据获取中')}}</span>  <img  style="animation:rotating 1.2s linear infinite;width:25px;" src="../../../assets/images/base/n_refresh.png" alt="">
                                </div>
                                <span v-else-if="!recentlyNum||recentlyNum.length==0" class="red">{{$t('数据获取中')}}...</span>
                                <template v-else>
                                <span v-bind:key="index" v-for="(item,index) in recentlyNum.split(',')" :class="'dice dice-'+item"></span>
                                </template>
                                <!-- <span>1</span>
                                <span>2</span>
                                <span>3</span>
                                <span>4</span>
                                <span>4</span> -->
                                <em class="triangle"></em>
                                <!-- 最近期数 -->
                                <div class="record hide fast3">
                                    <div style="overflow:auto;" v-cloak>
                                        <p class="record_title">
                                            <span>{{$t('期数')}}</span>
                                            <span>{{$t('开奖号码')}}</span>
                                            <span>{{$t('和值')}}</span>
                                            <span>{{$t('大小')}}</span>
                                            <span>{{$t('单双')}}</span>
                                        </p>
                                        <ul>
                                            <li v-for="(item,index) in history">
                                                <p class="hodeCri">{{item.issue.substring(4,item.issue.length)}}期</p>
                                                <p class="item_num">
                                                    <span :class="['dice','dice-'+it]"  v-for="it in item.luck_number.split(',')"></span>
                                                    &nbsp;{{item.luck_number.replace(/[,]/g,"")}}
                                                </p>
                                                <p>{{item.sum}}</p>
                                                <p>{{item.size}}</p>
                                                <p>{{item.odd_even}}</p>
                                            </li>
                                        </ul>
                                    </div>
                                   
                                </div>
                            </div>
                            <div class="mui-row" style="padding: 10px 0 7px;">
                                <div class="mui-col-xs-7 mui-col-sm-7" style="line-height: 20px;color: #fff;font-size: 1rem;">
                                    {{'距'+preventBanner+(noSale?'期开售':'期截止')}}
                                </div>
                                <!-- <div class="mui-col-xs-4 mui-col-sm-4">
                                    <span class="msg" style="font-size: 16px;font-weight: 300;">{{$t('封盘')}}</span>
                                    <span class="time">
                                        <span class="hour">22</span>
                                        <span class="min">22</span>
                                    </span>
                                </div> -->
                                <div class="mui-col-xs-5 mui-col-sm-5" style="padding-left:10px;">
                                    <!-- <span class="msg" style="font-size: 16px;font-weight: 300;color:#ddd;">开奖</span> -->
                                   <span class="time1" v-if="deadlineStr.indexOf(':')!=-1">
                                        <span :style="index==0?'letter-spacing: 7px;margin-left: 4px;':'letter-spacing: 7px;margin-left: 7px;'" :key="index" v-for="(it,index) in deadlineStr.split(':')">{{it}}</span>
                                       
                                    </span>
                                    <span class="time" v-else><span>{{deadlineStr}}</span></span>
                                </div>
                                <!-- <div class="mui-col-xs-2 mui-col-sm-2" style="color:rgb(221, 221, 221);text-align:right">
                                    <span class="bl">{{bets}}</span>注
                                </div> -->

                                
                            </div>
                        </div>
                        <div class="body" id="mainArea">
                            <div class="mui-row" style="overflow: auto;height: calc(100% - 70px);background: rgb(203, 212, 222);">
                                <!-- <div class="mui-col-xs-3 mui-col-sm-3">
                                    <div id="segmentedControls" class="mui-segmented-control mui-segmented-control-inverted mui-segmented-control-vertical">
                                        <a class="mui-control-item mui-active" data-index="0" href="#content1"  v-show="bet_area_manner.myriabit" v-cloak>{{right_title_two}}</a>
                                        <a class="mui-control-item" data-index="1" href="#content2"  v-show="bet_area_manner.kilobit" v-cloak>{{$t('千位')}}</a>
                                        <a class="mui-control-item" data-index="2" href="#content3"  v-show="bet_area_manner.hundreds" v-cloak>{{$t('百位')}}</a>
                                        <a class="mui-control-item" data-index="3" href="#content4"  v-show="bet_area_manner.decade" v-cloak>{{$t('十位')}}</a>
                                        <a class="mui-control-item" data-index="4" href="#content5"  v-show="bet_area_manner.unit" v-cloak>{{$t('个位')}}</a>
                                        <a class="mui-control-item" data-index="5" href="#content6"  v-show="bet_area_manner.common" v-cloak>{{right_title}}</a>
                                        <a class="mui-control-item" data-index="6" href="#content7"  v-show="bet_area_manner.special" v-cloak>{{right_title}}</a>
                                        <a class="mui-control-item" data-index="7" href="#content8"  v-show="bet_area_manner.pred" v-cloak>{{right_title}}</a>
                                    </div>
                                </div> -->
                                <!-- <div class="mui-col-xs-3 mui-col-sm-3">
                                    <div id="segmentedControls" class="mui-segmented-control mui-segmented-control-inverted mui-segmented-control-vertical">
                                        <a class="mui-control-item mui-active" data-index="0" href="#content1">第 1 球</a><a class="mui-control-item" data-index="1" href="#content2">第 2 球</a><a class="mui-control-item" data-index="2" href="#content3">第 3 球</a><a class="mui-control-item" data-index="3" href="#content4">第 4 球</a><a class="mui-control-item" data-index="4" href="#content5">第 5 球</a><a class="mui-control-item" data-index="5" href="#content6">第 6 球</a><a class="mui-control-item" data-index="6" href="#content7">第 7 球</a><a class="mui-control-item" data-index="7" href="#content8">第 8 球</a><a class="mui-control-item" data-index="8" href="#content9">第 9 球</a><a class="mui-control-item" data-index="9" href="#content10">第 10 球</a><a class="mui-control-item" data-index="10" href="#content11">第 11 球</a><a class="mui-control-item" data-index="11" href="#content12">第 12 球</a><a class="mui-control-item" data-index="12" href="#content13">第 13 球</a><a class="mui-control-item" data-index="13" href="#content14">第 14 球</a><a class="mui-control-item" data-index="14" href="#content15">第 15 球</a></div>
                                </div>
                                <div id="segmentedControlContents" class="mui-col-xs-9 mui-col-sm-9"><div id="content1" class="mui-control-content right"><h2>第1球</h2><div class="content"><div class="content-item mui-active"><p>1</p><span>8.21</span></div><div class="content-item "><p>2</p><span>8.21</span></div><div class="content-item "><p>3</p><span>8.21</span></div><div class="content-item "><p>4</p><span>8.21</span></div><div class="content-item "><p>5</p><span>8.21</span></div><div class="content-item "><p>6</p><span>8.21</span></div><div class="content-item "><p>7</p><span>8.21</span></div><div class="content-item "><p>8</p><span>8.21</span></div><div class="content-item "><p>9</p><span>8.21</span></div><div class="content-item "><p>10</p><span>8.21</span></div><div class="content-item "><p>11</p><span>8.21</span></div><div class="content-item "><p>12</p><span>8.21</span></div><div class="content-item "><p>13</p><span>8.21</span></div><div class="content-item "><p>14</p><span>8.21</span></div><div class="content-item "><p>15</p><span>8.21</span></div><div class="content-item "><p>16</p><span>8.21</span></div><div class="content-item "><p>17</p><span>8.21</span></div><div class="content-item "><p>18</p><span>8.21</span></div><div class="content-item "><p>19</p><span>8.21</span></div><div class="content-item "><p>20</p><span>8.21</span></div></div></div><div id="content2" class="mui-control-content right"><h2>第2球</h2><div class="content"><div class="content-item mui-active"><p>1</p><span>8.21</span></div><div class="content-item "><p>2</p><span>8.21</span></div><div class="content-item "><p>3</p><span>8.21</span></div><div class="content-item "><p>4</p><span>8.21</span></div><div class="content-item "><p>5</p><span>8.21</span></div><div class="content-item "><p>6</p><span>8.21</span></div><div class="content-item "><p>7</p><span>8.21</span></div><div class="content-item "><p>8</p><span>8.21</span></div><div class="content-item "><p>9</p><span>8.21</span></div><div class="content-item "><p>10</p><span>8.21</span></div><div class="content-item "><p>11</p><span>8.21</span></div><div class="content-item "><p>12</p><span>8.21</span></div><div class="content-item "><p>13</p><span>8.21</span></div><div class="content-item "><p>14</p><span>8.21</span></div><div class="content-item "><p>15</p><span>8.21</span></div><div class="content-item "><p>16</p><span>8.21</span></div><div class="content-item "><p>17</p><span>8.21</span></div><div class="content-item "><p>18</p><span>8.21</span></div><div class="content-item "><p>19</p><span>8.21</span></div><div class="content-item "><p>20</p><span>8.21</span></div></div></div><div id="content3" class="mui-control-content right"><h2>第3球</h2><div class="content"><div class="content-item mui-active"><p>1</p><span>8.21</span></div><div class="content-item "><p>2</p><span>8.21</span></div><div class="content-item "><p>3</p><span>8.21</span></div><div class="content-item "><p>4</p><span>8.21</span></div><div class="content-item "><p>5</p><span>8.21</span></div><div class="content-item "><p>6</p><span>8.21</span></div><div class="content-item "><p>7</p><span>8.21</span></div><div class="content-item "><p>8</p><span>8.21</span></div><div class="content-item "><p>9</p><span>8.21</span></div><div class="content-item "><p>10</p><span>8.21</span></div><div class="content-item "><p>11</p><span>8.21</span></div><div class="content-item "><p>12</p><span>8.21</span></div><div class="content-item "><p>13</p><span>8.21</span></div><div class="content-item "><p>14</p><span>8.21</span></div><div class="content-item "><p>15</p><span>8.21</span></div><div class="content-item "><p>16</p><span>8.21</span></div><div class="content-item "><p>17</p><span>8.21</span></div><div class="content-item "><p>18</p><span>8.21</span></div><div class="content-item "><p>19</p><span>8.21</span></div><div class="content-item "><p>20</p><span>8.21</span></div></div></div><div id="content4" class="mui-control-content right"><h2>第4球</h2><div class="content"><div class="content-item mui-active"><p>1</p><span>8.21</span></div><div class="content-item "><p>2</p><span>8.21</span></div><div class="content-item "><p>3</p><span>8.21</span></div><div class="content-item "><p>4</p><span>8.21</span></div><div class="content-item "><p>5</p><span>8.21</span></div><div class="content-item "><p>6</p><span>8.21</span></div><div class="content-item "><p>7</p><span>8.21</span></div><div class="content-item "><p>8</p><span>8.21</span></div><div class="content-item "><p>9</p><span>8.21</span></div><div class="content-item "><p>10</p><span>8.21</span></div><div class="content-item "><p>11</p><span>8.21</span></div><div class="content-item "><p>12</p><span>8.21</span></div><div class="content-item "><p>13</p><span>8.21</span></div><div class="content-item "><p>14</p><span>8.21</span></div><div class="content-item "><p>15</p><span>8.21</span></div><div class="content-item "><p>16</p><span>8.21</span></div><div class="content-item "><p>17</p><span>8.21</span></div><div class="content-item "><p>18</p><span>8.21</span></div><div class="content-item "><p>19</p><span>8.21</span></div><div class="content-item "><p>20</p><span>8.21</span></div></div></div><div id="content5" class="mui-control-content right"><h2>第5球</h2><div class="content"><div class="content-item mui-active"><p>1</p><span>8.21</span></div><div class="content-item "><p>2</p><span>8.21</span></div><div class="content-item "><p>3</p><span>8.21</span></div><div class="content-item "><p>4</p><span>8.21</span></div><div class="content-item "><p>5</p><span>8.21</span></div><div class="content-item "><p>6</p><span>8.21</span></div><div class="content-item "><p>7</p><span>8.21</span></div><div class="content-item "><p>8</p><span>8.21</span></div><div class="content-item "><p>9</p><span>8.21</span></div><div class="content-item "><p>10</p><span>8.21</span></div><div class="content-item "><p>11</p><span>8.21</span></div><div class="content-item "><p>12</p><span>8.21</span></div><div class="content-item "><p>13</p><span>8.21</span></div><div class="content-item "><p>14</p><span>8.21</span></div><div class="content-item "><p>15</p><span>8.21</span></div><div class="content-item "><p>16</p><span>8.21</span></div><div class="content-item "><p>17</p><span>8.21</span></div><div class="content-item "><p>18</p><span>8.21</span></div><div class="content-item "><p>19</p><span>8.21</span></div><div class="content-item "><p>20</p><span>8.21</span></div></div></div><div id="content6" class="mui-control-content right"><h2>第6球</h2><div class="content"><div class="content-item mui-active"><p>1</p><span>8.21</span></div><div class="content-item "><p>2</p><span>8.21</span></div><div class="content-item "><p>3</p><span>8.21</span></div><div class="content-item "><p>4</p><span>8.21</span></div><div class="content-item "><p>5</p><span>8.21</span></div><div class="content-item "><p>6</p><span>8.21</span></div><div class="content-item "><p>7</p><span>8.21</span></div><div class="content-item "><p>8</p><span>8.21</span></div><div class="content-item "><p>9</p><span>8.21</span></div><div class="content-item "><p>10</p><span>8.21</span></div><div class="content-item "><p>11</p><span>8.21</span></div><div class="content-item "><p>12</p><span>8.21</span></div><div class="content-item "><p>13</p><span>8.21</span></div><div class="content-item "><p>14</p><span>8.21</span></div><div class="content-item "><p>15</p><span>8.21</span></div><div class="content-item "><p>16</p><span>8.21</span></div><div class="content-item "><p>17</p><span>8.21</span></div><div class="content-item "><p>18</p><span>8.21</span></div><div class="content-item "><p>19</p><span>8.21</span></div><div class="content-item "><p>20</p><span>8.21</span></div></div></div><div id="content7" class="mui-control-content right"><h2>第7球</h2><div class="content"><div class="content-item mui-active"><p>1</p><span>8.21</span></div><div class="content-item "><p>2</p><span>8.21</span></div><div class="content-item "><p>3</p><span>8.21</span></div><div class="content-item "><p>4</p><span>8.21</span></div><div class="content-item "><p>5</p><span>8.21</span></div><div class="content-item "><p>6</p><span>8.21</span></div><div class="content-item "><p>7</p><span>8.21</span></div><div class="content-item "><p>8</p><span>8.21</span></div><div class="content-item "><p>9</p><span>8.21</span></div><div class="content-item "><p>10</p><span>8.21</span></div><div class="content-item "><p>11</p><span>8.21</span></div><div class="content-item "><p>12</p><span>8.21</span></div><div class="content-item "><p>13</p><span>8.21</span></div><div class="content-item "><p>14</p><span>8.21</span></div><div class="content-item "><p>15</p><span>8.21</span></div><div class="content-item "><p>16</p><span>8.21</span></div><div class="content-item "><p>17</p><span>8.21</span></div><div class="content-item "><p>18</p><span>8.21</span></div><div class="content-item "><p>19</p><span>8.21</span></div><div class="content-item "><p>20</p><span>8.21</span></div></div></div><div id="content8" class="mui-control-content right"><h2>第8球</h2><div class="content"><div class="content-item mui-active"><p>1</p><span>8.21</span></div><div class="content-item "><p>2</p><span>8.21</span></div><div class="content-item "><p>3</p><span>8.21</span></div><div class="content-item "><p>4</p><span>8.21</span></div><div class="content-item "><p>5</p><span>8.21</span></div><div class="content-item "><p>6</p><span>8.21</span></div><div class="content-item "><p>7</p><span>8.21</span></div><div class="content-item "><p>8</p><span>8.21</span></div><div class="content-item "><p>9</p><span>8.21</span></div><div class="content-item "><p>10</p><span>8.21</span></div><div class="content-item "><p>11</p><span>8.21</span></div><div class="content-item "><p>12</p><span>8.21</span></div><div class="content-item "><p>13</p><span>8.21</span></div><div class="content-item "><p>14</p><span>8.21</span></div><div class="content-item "><p>15</p><span>8.21</span></div><div class="content-item "><p>16</p><span>8.21</span></div><div class="content-item "><p>17</p><span>8.21</span></div><div class="content-item "><p>18</p><span>8.21</span></div><div class="content-item "><p>19</p><span>8.21</span></div><div class="content-item "><p>20</p><span>8.21</span></div></div></div><div id="content9" class="mui-control-content right"><h2>第9球</h2><div class="content"><div class="content-item mui-active"><p>1</p><span>8.21</span></div><div class="content-item "><p>2</p><span>8.21</span></div><div class="content-item "><p>3</p><span>8.21</span></div><div class="content-item "><p>4</p><span>8.21</span></div><div class="content-item "><p>5</p><span>8.21</span></div><div class="content-item "><p>6</p><span>8.21</span></div><div class="content-item "><p>7</p><span>8.21</span></div><div class="content-item "><p>8</p><span>8.21</span></div><div class="content-item "><p>9</p><span>8.21</span></div><div class="content-item "><p>10</p><span>8.21</span></div><div class="content-item "><p>11</p><span>8.21</span></div><div class="content-item "><p>12</p><span>8.21</span></div><div class="content-item "><p>13</p><span>8.21</span></div><div class="content-item "><p>14</p><span>8.21</span></div><div class="content-item "><p>15</p><span>8.21</span></div><div class="content-item "><p>16</p><span>8.21</span></div><div class="content-item "><p>17</p><span>8.21</span></div><div class="content-item "><p>18</p><span>8.21</span></div><div class="content-item "><p>19</p><span>8.21</span></div><div class="content-item "><p>20</p><span>8.21</span></div></div></div><div id="content10" class="mui-control-content right"><h2>第10球</h2><div class="content"><div class="content-item mui-active"><p>1</p><span>8.21</span></div><div class="content-item "><p>2</p><span>8.21</span></div><div class="content-item "><p>3</p><span>8.21</span></div><div class="content-item "><p>4</p><span>8.21</span></div><div class="content-item "><p>5</p><span>8.21</span></div><div class="content-item "><p>6</p><span>8.21</span></div><div class="content-item "><p>7</p><span>8.21</span></div><div class="content-item "><p>8</p><span>8.21</span></div><div class="content-item "><p>9</p><span>8.21</span></div><div class="content-item "><p>10</p><span>8.21</span></div><div class="content-item "><p>11</p><span>8.21</span></div><div class="content-item "><p>12</p><span>8.21</span></div><div class="content-item "><p>13</p><span>8.21</span></div><div class="content-item "><p>14</p><span>8.21</span></div><div class="content-item "><p>15</p><span>8.21</span></div><div class="content-item "><p>16</p><span>8.21</span></div><div class="content-item "><p>17</p><span>8.21</span></div><div class="content-item "><p>18</p><span>8.21</span></div><div class="content-item "><p>19</p><span>8.21</span></div><div class="content-item "><p>20</p><span>8.21</span></div></div></div><div id="content11" class="mui-control-content right"><h2>第11球</h2><div class="content"><div class="content-item mui-active"><p>1</p><span>8.21</span></div><div class="content-item "><p>2</p><span>8.21</span></div><div class="content-item "><p>3</p><span>8.21</span></div><div class="content-item "><p>4</p><span>8.21</span></div><div class="content-item "><p>5</p><span>8.21</span></div><div class="content-item "><p>6</p><span>8.21</span></div><div class="content-item "><p>7</p><span>8.21</span></div><div class="content-item "><p>8</p><span>8.21</span></div><div class="content-item "><p>9</p><span>8.21</span></div><div class="content-item "><p>10</p><span>8.21</span></div><div class="content-item "><p>11</p><span>8.21</span></div><div class="content-item "><p>12</p><span>8.21</span></div><div class="content-item "><p>13</p><span>8.21</span></div><div class="content-item "><p>14</p><span>8.21</span></div><div class="content-item "><p>15</p><span>8.21</span></div><div class="content-item "><p>16</p><span>8.21</span></div><div class="content-item "><p>17</p><span>8.21</span></div><div class="content-item "><p>18</p><span>8.21</span></div><div class="content-item "><p>19</p><span>8.21</span></div><div class="content-item "><p>20</p><span>8.21</span></div></div></div><div id="content12" class="mui-control-content right"><h2>第12球</h2><div class="content"><div class="content-item mui-active"><p>1</p><span>8.21</span></div><div class="content-item "><p>2</p><span>8.21</span></div><div class="content-item "><p>3</p><span>8.21</span></div><div class="content-item "><p>4</p><span>8.21</span></div><div class="content-item "><p>5</p><span>8.21</span></div><div class="content-item "><p>6</p><span>8.21</span></div><div class="content-item "><p>7</p><span>8.21</span></div><div class="content-item "><p>8</p><span>8.21</span></div><div class="content-item "><p>9</p><span>8.21</span></div><div class="content-item "><p>10</p><span>8.21</span></div><div class="content-item "><p>11</p><span>8.21</span></div><div class="content-item "><p>12</p><span>8.21</span></div><div class="content-item "><p>13</p><span>8.21</span></div><div class="content-item "><p>14</p><span>8.21</span></div><div class="content-item "><p>15</p><span>8.21</span></div><div class="content-item "><p>16</p><span>8.21</span></div><div class="content-item "><p>17</p><span>8.21</span></div><div class="content-item "><p>18</p><span>8.21</span></div><div class="content-item "><p>19</p><span>8.21</span></div><div class="content-item "><p>20</p><span>8.21</span></div></div></div><div id="content13" class="mui-control-content right"><h2>第13球</h2><div class="content"><div class="content-item mui-active"><p>1</p><span>8.21</span></div><div class="content-item "><p>2</p><span>8.21</span></div><div class="content-item "><p>3</p><span>8.21</span></div><div class="content-item "><p>4</p><span>8.21</span></div><div class="content-item "><p>5</p><span>8.21</span></div><div class="content-item "><p>6</p><span>8.21</span></div><div class="content-item "><p>7</p><span>8.21</span></div><div class="content-item "><p>8</p><span>8.21</span></div><div class="content-item "><p>9</p><span>8.21</span></div><div class="content-item "><p>10</p><span>8.21</span></div><div class="content-item "><p>11</p><span>8.21</span></div><div class="content-item "><p>12</p><span>8.21</span></div><div class="content-item "><p>13</p><span>8.21</span></div><div class="content-item "><p>14</p><span>8.21</span></div><div class="content-item "><p>15</p><span>8.21</span></div><div class="content-item "><p>16</p><span>8.21</span></div><div class="content-item "><p>17</p><span>8.21</span></div><div class="content-item "><p>18</p><span>8.21</span></div><div class="content-item "><p>19</p><span>8.21</span></div><div class="content-item "><p>20</p><span>8.21</span></div></div></div><div id="content14" class="mui-control-content right"><h2>第14球</h2><div class="content"><div class="content-item mui-active"><p>1</p><span>8.21</span></div><div class="content-item "><p>2</p><span>8.21</span></div><div class="content-item "><p>3</p><span>8.21</span></div><div class="content-item "><p>4</p><span>8.21</span></div><div class="content-item "><p>5</p><span>8.21</span></div><div class="content-item "><p>6</p><span>8.21</span></div><div class="content-item "><p>7</p><span>8.21</span></div><div class="content-item "><p>8</p><span>8.21</span></div><div class="content-item "><p>9</p><span>8.21</span></div><div class="content-item "><p>10</p><span>8.21</span></div><div class="content-item "><p>11</p><span>8.21</span></div><div class="content-item "><p>12</p><span>8.21</span></div><div class="content-item "><p>13</p><span>8.21</span></div><div class="content-item "><p>14</p><span>8.21</span></div><div class="content-item "><p>15</p><span>8.21</span></div><div class="content-item "><p>16</p><span>8.21</span></div><div class="content-item "><p>17</p><span>8.21</span></div><div class="content-item "><p>18</p><span>8.21</span></div><div class="content-item "><p>19</p><span>8.21</span></div><div class="content-item "><p>20</p><span>8.21</span></div></div></div><div id="content15" class="mui-control-content right"><h2>第15球</h2><div class="content"><div class="content-item mui-active"><p>1</p><span>8.21</span></div><div class="content-item "><p>2</p><span>8.21</span></div><div class="content-item "><p>3</p><span>8.21</span></div><div class="content-item "><p>4</p><span>8.21</span></div><div class="content-item "><p>5</p><span>8.21</span></div><div class="content-item "><p>6</p><span>8.21</span></div><div class="content-item "><p>7</p><span>8.21</span></div><div class="content-item "><p>8</p><span>8.21</span></div><div class="content-item "><p>9</p><span>8.21</span></div><div class="content-item "><p>10</p><span>8.21</span></div><div class="content-item "><p>11</p><span>8.21</span></div><div class="content-item "><p>12</p><span>8.21</span></div><div class="content-item "><p>13</p><span>8.21</span></div><div class="content-item "><p>14</p><span>8.21</span></div><div class="content-item "><p>15</p><span>8.21</span></div><div class="content-item "><p>16</p><span>8.21</span></div><div class="content-item "><p>17</p><span>8.21</span></div><div class="content-item "><p>18</p><span>8.21</span></div><div class="content-item "><p>19</p><span>8.21</span></div><div class="content-item "><p>20</p><span>8.21</span></div></div></div></div> -->
                                 <div id="segmentedControlContents" class="mui-col-xs-12 mui-col-sm-12">
                                    <!-- <div id="content1" class="mui-control-content right"><h2>第1球</h2><div class="content"><div class="content-item mui-active"><p>1</p><span>8.21</span></div><div class="content-item "><p>2</p><span>8.21</span></div><div class="content-item "><p>3</p><span>8.21</span></div><div class="content-item "><p>4</p><span>8.21</span></div><div class="content-item "><p>5</p><span>8.21</span></div><div class="content-item "><p>6</p><span>8.21</span></div><div class="content-item "><p>7</p><span>8.21</span></div><div class="content-item "><p>8</p><span>8.21</span></div><div class="content-item "><p>9</p><span>8.21</span></div><div class="content-item "><p>10</p><span>8.21</span></div><div class="content-item "><p>11</p><span>8.21</span></div><div class="content-item "><p>12</p><span>8.21</span></div><div class="content-item "><p>13</p><span>8.21</span></div><div class="content-item "><p>14</p><span>8.21</span></div><div class="content-item "><p>15</p><span>8.21</span></div><div class="content-item "><p>16</p><span>8.21</span></div><div class="content-item "><p>17</p><span>8.21</span></div><div class="content-item "><p>18</p><span>8.21</span></div><div class="content-item "><p>19</p><span>8.21</span></div><div class="content-item "><p>20</p><span>8.21</span></div></div></div>
                                    <div id="content2" class="mui-control-content right"><h2>第1球</h2><div class="content"><div class="content-item mui-active"><p>1</p><span>8.21</span></div><div class="content-item "><p>2</p><span>8.21</span></div><div class="content-item "><p>3</p><span>8.21</span></div><div class="content-item "><p>4</p><span>8.21</span></div><div class="content-item "><p>5</p><span>8.21</span></div><div class="content-item "><p>6</p><span>8.21</span></div><div class="content-item "><p>7</p><span>8.21</span></div><div class="content-item "><p>8</p><span>8.21</span></div><div class="content-item "><p>9</p><span>8.21</span></div><div class="content-item "><p>10</p><span>8.21</span></div><div class="content-item "><p>11</p><span>8.21</span></div><div class="content-item "><p>12</p><span>8.21</span></div><div class="content-item "><p>13</p><span>8.21</span></div><div class="content-item "><p>14</p><span>8.21</span></div><div class="content-item "><p>15</p><span>8.21</span></div><div class="content-item "><p>16</p><span>8.21</span></div><div class="content-item "><p>17</p><span>8.21</span></div><div class="content-item "><p>18</p><span>8.21</span></div><div class="content-item "><p>19</p><span>8.21</span></div><div class="content-item "><p>20</p><span>8.21</span></div></div></div>
                                    <div id="content3" class="mui-control-content right"><h2>第1球</h2><div class="content"><div class="content-item mui-active"><p>1</p><span>8.21</span></div><div class="content-item "><p>2</p><span>8.21</span></div><div class="content-item "><p>3</p><span>8.21</span></div><div class="content-item "><p>4</p><span>8.21</span></div><div class="content-item "><p>5</p><span>8.21</span></div><div class="content-item "><p>6</p><span>8.21</span></div><div class="content-item "><p>7</p><span>8.21</span></div><div class="content-item "><p>8</p><span>8.21</span></div><div class="content-item "><p>9</p><span>8.21</span></div><div class="content-item "><p>10</p><span>8.21</span></div><div class="content-item "><p>11</p><span>8.21</span></div><div class="content-item "><p>12</p><span>8.21</span></div><div class="content-item "><p>13</p><span>8.21</span></div><div class="content-item "><p>14</p><span>8.21</span></div><div class="content-item "><p>15</p><span>8.21</span></div><div class="content-item "><p>16</p><span>8.21</span></div><div class="content-item "><p>17</p><span>8.21</span></div><div class="content-item "><p>18</p><span>8.21</span></div><div class="content-item "><p>19</p><span>8.21</span></div><div class="content-item "><p>20</p><span>8.21</span></div></div></div>
                                    <div id="content4" class="mui-control-content right"><h2>第1球</h2><div class="content"><div class="content-item mui-active"><p>1</p><span>8.21</span></div><div class="content-item "><p>2</p><span>8.21</span></div><div class="content-item "><p>3</p><span>8.21</span></div><div class="content-item "><p>4</p><span>8.21</span></div><div class="content-item "><p>5</p><span>8.21</span></div><div class="content-item "><p>6</p><span>8.21</span></div><div class="content-item "><p>7</p><span>8.21</span></div><div class="content-item "><p>8</p><span>8.21</span></div><div class="content-item "><p>9</p><span>8.21</span></div><div class="content-item "><p>10</p><span>8.21</span></div><div class="content-item "><p>11</p><span>8.21</span></div><div class="content-item "><p>12</p><span>8.21</span></div><div class="content-item "><p>13</p><span>8.21</span></div><div class="content-item "><p>14</p><span>8.21</span></div><div class="content-item "><p>15</p><span>8.21</span></div><div class="content-item "><p>16</p><span>8.21</span></div><div class="content-item "><p>17</p><span>8.21</span></div><div class="content-item "><p>18</p><span>8.21</span></div><div class="content-item "><p>19</p><span>8.21</span></div><div class="content-item "><p>20</p><span>8.21</span></div></div></div>
                                    <div id="content5" class="mui-control-content right"><h2>第1球</h2><div class="content"><div class="content-item mui-active"><p>1</p><span>8.21</span></div><div class="content-item "><p>2</p><span>8.21</span></div><div class="content-item "><p>3</p><span>8.21</span></div><div class="content-item "><p>4</p><span>8.21</span></div><div class="content-item "><p>5</p><span>8.21</span></div><div class="content-item "><p>6</p><span>8.21</span></div><div class="content-item "><p>7</p><span>8.21</span></div><div class="content-item "><p>8</p><span>8.21</span></div><div class="content-item "><p>9</p><span>8.21</span></div><div class="content-item "><p>10</p><span>8.21</span></div><div class="content-item "><p>11</p><span>8.21</span></div><div class="content-item "><p>12</p><span>8.21</span></div><div class="content-item "><p>13</p><span>8.21</span></div><div class="content-item "><p>14</p><span>8.21</span></div><div class="content-item "><p>15</p><span>8.21</span></div><div class="content-item "><p>16</p><span>8.21</span></div><div class="content-item "><p>17</p><span>8.21</span></div><div class="content-item "><p>18</p><span>8.21</span></div><div class="content-item "><p>19</p><span>8.21</span></div><div class="content-item "><p>20</p><span>8.21</span></div></div></div> -->
                                   
                                    
                                    <div id="content6" class="mui-control-content right second"  v-show="bet_area_manner.common"><h2>{{right_title}}</h2><div class="content"><div class="content-item"  :key="index" v-for="(item,index) in numberArr">
                                        <p><span :class="{'sel_num':item.isSel}"   @click="handleAddClass(item)">{{item.num}}</span></p>
                                        </div></div></div>
                                     <div id="content6" class="mui-control-content right second"  v-show="bet_area_manner.common1"><h2>{{right_title1}}</h2><div class="content"><div class="content-item"  :key="index" v-for="(item,index) in numberArr1">
                                        <p><span :class="{'sel_num':item.isSel}"   @click="handleAddClass(item)">{{item.num}}</span></p>
                                        </div></div></div>
                                    <div id="content7" class="mui-control-content right second"  v-show="bet_area_manner.special"><h2>{{right_title}}</h2><div class="content"><div class="content-item square"  :key="index" v-for="(item,index) in numberArr">
                                        <p><span :class="{'sel_num':item.isSel}"   @click="handleAddClass(item)">{{item.num}}</span></p>
                                        </div></div></div>
                                    
                                    <div class="labelList" v-show="false" v-cloak>
                                        <span @click="selectInput($event)"><input @click.stop="positionClk" value="0" type="checkbox">{{$t('万位')}}</span>
                                        <span @click="selectInput($event)"><input @click.stop="positionClk" value="1" type="checkbox">{{$t('千位')}}</span>
                                        <span @click="selectInput($event)"><input @click.stop="positionClk" type="checkbox">{{$t('百位')}}</span>
                                        <span @click="selectInput($event)"><input @click.stop="positionClk" type="checkbox" checked="">{{$t('十位')}}</span>
                                        <span @click="selectInput($event)"><input @click.stop="positionClk" type="checkbox" checked="">{{$t('个位')}}</span>
                                    </div>
                                </div>
                                <!-- <div class="common">
                                    <dl class="num5 clearfix bet_area_item bet_area1" v-if="bet_area_manner.myriabit" v-cloak>
                                        <dt  v-cloak>{{right_title_two}}</dt>
                                        <dd class="first" v-show="present_playId!=89&&present_playId!=90&&present_playId!=91&&present_playId!=92" v-cloak>
                                            <div class="titleBtn">
                                                <ul>
                                                    <li @click="multifunctional_btnClick(0,0)">{{$t('全')}}</li>
                                                    <li @click="multifunctional_btnClick(0,1)">{{$t('大')}}</li>
                                                    <li @click="multifunctional_btnClick(0,2)">{{$t('小')}}</li>
                                                    <li @click="multifunctional_btnClick(0,3)">{{$t('单')}}</li>
                                                    <li @click="multifunctional_btnClick(0,4)">{{$t('双')}}</li>
                                                    <li @click="multifunctional_btnClick(0,5)">{{$t('清')}}</li>
                                                </ul>
                                            </div>
                                        </dd>
                                        <dd class="second" :style="present_playId!=89&&present_playId!=90&&present_playId!=91&&present_playId!=92?'':'margin-top: 0;'">
                                            <div>
                                                <ul>
                                                    <li :key="index" v-for="(item,index) in myriabit">
                                                        <span :class="{'sel_num':item.isSel}"   @click="handleAddClass(item)">{{item.num}}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </dd>
                                    </dl>
                                    <dl class="num4 clearfix bet_area_item bet_area1" v-if="bet_area_manner.kilobit" v-cloak>
                                        <dt>{{$t('千位')}}</dt>
                                        <dd class="first" v-show="present_playId!=89&&present_playId!=90&&present_playId!=91&&present_playId!=92" v-cloak>
                                            <div class="titleBtn">
                                                <ul>
                                                    <li @click="multifunctional_btnClick(1,0)">{{$t('全')}}</li>
                                                    <li @click="multifunctional_btnClick(1,1)">{{$t('大')}}</li>
                                                    <li @click="multifunctional_btnClick(1,2)">{{$t('小')}}</li>
                                                    <li @click="multifunctional_btnClick(1,3)">{{$t('单')}}</li>
                                                    <li @click="multifunctional_btnClick(1,4)">{{$t('双')}}</li>
                                                    <li @click="multifunctional_btnClick(1,5)">{{$t('清')}}</li>
                                                </ul>
                                            </div>
                                        </dd>
                                        <dd class="second" :style="present_playId!=89&&present_playId!=90&&present_playId!=91&&present_playId!=92?'':'margin-top: 0;'">
                                            <div>
                                                <ul>
                                                    <li :key="index" v-for="(item,index) in kilobit">
                                                        <span :class="{'sel_num':item.isSel}"   @click="handleAddClass(item)"  v-cloak>{{item.num}}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </dd>
                                    </dl>
                                    <dl class="num3 clearfix bet_area_item bet_area1" v-if="bet_area_manner.hundreds" v-cloak>
                                        <dt>{{$t('百位')}}</dt>
                                        <dd class="first" v-show="present_playId!=89&&present_playId!=90&&present_playId!=91&&present_playId!=92" v-cloak>
                                            <div class="titleBtn">
                                                <ul>
                                                    <li @click="multifunctional_btnClick(2,0)">{{$t('全')}}</li>
                                                    <li @click="multifunctional_btnClick(2,1)">{{$t('大')}}</li>
                                                    <li @click="multifunctional_btnClick(2,2)">{{$t('小')}}</li>
                                                    <li @click="multifunctional_btnClick(2,3)">{{$t('单')}}</li>
                                                    <li @click="multifunctional_btnClick(2,4)">{{$t('双')}}</li>
                                                    <li @click="multifunctional_btnClick(2,5)">{{$t('清')}}</li>
                                                </ul>
                                            </div>
                                        </dd>
                                        <dd class="second" :style="present_playId!=89&&present_playId!=90&&present_playId!=91&&present_playId!=92?'':'margin-top: 0;'">
                                            <div>
                                                <ul>
                                                    <li :key="index" v-for="(item,index) in hundreds">
                                                        <span :class="{'sel_num':item.isSel}"   @click="handleAddClass(item)"  v-cloak>{{item.num}}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </dd>
                                    </dl>
                                    <dl class="num2 clearfix bet_area_item bet_area1" v-if="bet_area_manner.decade" v-cloak>
                                        <dt>{{$t('十位')}}</dt>
                                        <dd class="first" v-show="present_playId!=89&&present_playId!=90&&present_playId!=91&&present_playId!=92" v-cloak>
                                            <div class="titleBtn">
                                                <ul>
                                                    <li @click="multifunctional_btnClick(3,0)">{{$t('全')}}</li>
                                                    <li @click="multifunctional_btnClick(3,1)">{{$t('大')}}</li>
                                                    <li @click="multifunctional_btnClick(3,2)">{{$t('小')}}</li>
                                                    <li @click="multifunctional_btnClick(3,3)">{{$t('单')}}</li>
                                                    <li @click="multifunctional_btnClick(3,4)">{{$t('双')}}</li>
                                                    <li @click="multifunctional_btnClick(3,5)">{{$t('清')}}</li>
                                                </ul>
                                            </div>
                                        </dd>
                                        <dd class="second" :style="present_playId!=89&&present_playId!=90&&present_playId!=91&&present_playId!=92?'':'margin-top: 0;'">
                                            <div>
                                                <ul>
                                                    <li :key="index" v-for="(item,index) in decade">
                                                        <span :class="{'sel_num':item.isSel}"   @click="handleAddClass(item)"  v-cloak>{{item.num}}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </dd>
                                    </dl>
                                    <dl class="num1 clearfix bet_area_item bet_area1" v-if="bet_area_manner.unit" v-cloak>
                                        <dt>{{$t('个位')}}</dt>
                                        <dd class="first" v-show="present_playId!=89&&present_playId!=90&&present_playId!=91&&present_playId!=92" v-cloak>
                                            <div class="titleBtn">
                                                <ul>
                                                    <li @click="multifunctional_btnClick(4,0)">{{$t('全')}}</li>
                                                    <li @click="multifunctional_btnClick(4,1)">{{$t('大')}}</li>
                                                    <li @click="multifunctional_btnClick(4,2)">{{$t('小')}}</li>
                                                    <li @click="multifunctional_btnClick(4,3)">{{$t('单')}}</li>
                                                    <li @click="multifunctional_btnClick(4,4)">{{$t('双')}}</li>
                                                    <li @click="multifunctional_btnClick(4,5)">{{$t('清')}}</li>
                                                </ul>
                                            </div>
                                        </dd>
                                        <dd class="second" :style="present_playId!=89&&present_playId!=90&&present_playId!=91&&present_playId!=92?'':'margin-top: 0;'">
                                            <div>
                                                <ul>
                                                    <li :key="index" v-for="(item,index) in unit">
                                                        <span :class="{'sel_num':item.isSel}"   @click="handleAddClass(item)" v-cloak>{{item.num}}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </dd>
                                    </dl>

                                    <dl class="bet_area_item bet_area0 clearfix" v-if="bet_area_manner.common" v-cloak>
                                        <dt v-cloak>{{right_title}}</dt>
                                        <dd class="first"  v-show="present_playId!=114&&present_playId!=115&&present_playId!=116&&present_playId!=117&&present_playId!=77">
                                            <div class="titleBtn">
                                                <ul>
                                                    <li @click="multifunctional_btnClick(5,0)">{{$t('全')}}</li>
                                                    <li @click="multifunctional_btnClick(5,1)">{{$t('大')}}</li>
                                                    <li @click="multifunctional_btnClick(5,2)">{{$t('小')}}</li>
                                                    <li @click="multifunctional_btnClick(5,3)">{{$t('单')}}</li>
                                                    <li @click="multifunctional_btnClick(5,4)">{{$t('双')}}</li>
                                                    <li @click="multifunctional_btnClick(5,5)">{{$t('清')}}</li>
                                                </ul>
                                            </div>
                                        </dd>
                                        <dd class="second" :style="present_playId!=114&&present_playId!=115&&present_playId!=116&&present_playId!=117&&present_playId!=77?'':'margin-top: 0;'">
                                            <div>
                                                <ul>
                                                    <li :key="index" v-for="(item,index) in numberArr">
                                                        <span :class="{'sel_num':item.isSel}"   @click="handleAddClass(item)" v-cloak>{{item.num}}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </dd>
                                    </dl>
                                    <dl class="bet_area_item bet_area_special clearfix" v-if="bet_area_manner.special" v-cloak>
                                        <dt v-cloak>{{right_title}}</dt>
                                        <dd class="second">
                                            <div>
                                                <ul>
                                                    <li :key="index" v-for="(item,index) in numberArr">
                                                        <span :class="{'sel_num':item.isSel}"   @click="handleAddClass(item)" v-cloak>{{item.num}}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </dd>
                                    </dl>

                                    <dl class="bet_area_item bet_area_pred clearfix" v-if="bet_area_manner.pred">
                                        <dt v-cloak>{{right_title}}</dt>
                                        <dd class="second">
                                            <div>
                                                <ul>
                                                    <template v-for="(item,index) in numberArr">
                                                        <li  class="lg_place" @click="handleAddClass(item,0)"><span :class="{'sel_num':item.isSel}" v-cloak>{{item.num[0]}}</span></li>
                                                        <li  class="vs"><span>vs</span></li>
                                                        <li class="lg_place" @click="handleAddClass(item,1)"><span :class="{'sel_num':item.isSel0}" v-cloak>{{item.num[1]}}</span></li>
                                                    </template>

                                                </ul>
                                            </div>
                                        </dd>
                                    </dl>
                                    <div class="labelList" v-show="false" v-cloak>
                                        <span @click="selectInput($event)"><input @click.stop="positionClk" value="0" type="checkbox">{{$t('万位')}}</span>
                                        <span @click="selectInput($event)"><input @click.stop="positionClk" value="1" type="checkbox">{{$t('千位')}}</span>
                                        <span @click="selectInput($event)"><input @click.stop="positionClk" type="checkbox">{{$t('百位')}}</span>
                                        <span @click="selectInput($event)"><input @click.stop="positionClk" type="checkbox" checked="">{{$t('十位')}}</span>
                                        <span @click="selectInput($event)"><input @click.stop="positionClk" type="checkbox" checked="">{{$t('个位')}}</span>
                                    </div>
                                </div> -->
                            </div>
                        </div>

                        <!-- <div class="mui-text-right" style="position: absolute;bottom: 0;left: 0;width: 100%;padding: 5px 10px;padding-bottom: 15px;">
                            <div class="mui-row">
                                <div class="mui-col-xs-12 mui-col-sm-12">
                                        <input  pattern="[0-9]*" type="number" class="mui-input mui-input-clear"  v-model="singleCoins" @keyup="handleCoins"  placeholder="请输入金额" style="background-color: #485381;color: #eee;font-size: 16px;font-weight: 300;border: 1px solid #717590;padding: 6px 15px;margin-top: 3px;height: auto !important;margin-bottom:5px;">
                                    </div>
                            </div>
                            <div class="mui-row "> -->
                        <div class="mui-row mui-text-right" style="position: absolute;bottom: 0;left: 0;width: 100%;padding: 5px 10px;">
                            <!-- <div class="mui-col-xs-6 mui-col-sm-6">
                                <form class="mui-input-group" style="background: none;border-radius: 10px;overflow: hidden;">
                                    <div class="mui-input-row">
                                        <input  pattern="[0-9]*" type="number" class="mui-input mui-input-clear"  v-model="singleCoins" @keyup="handleCoins"  placeholder="请输入金额" style="color: #eee;font-size: 16px;font-weight: 300;border: 1px solid #717590;border-radius: 7px;padding: 6px 15px;margin-top: 3px;height: auto !important;">
                                    </div>
                                </form>
                            </div>
                            <div class="mui-col-xs-2 mui-col-sm-2">
                                    <button class="mui-btn bot_betBtn"  @click="handleConfirm"><span>{{$t('下注')}}</span></button>
                                </div>
                                <div class="mui-col-xs-2 mui-col-sm-2">
                                    <button class="mui-btn random bot_ran" @click="random_or_clear($event)" v-cloak><span>{{$t('机选')}}</span></button>
                                </div>
                                <div class="mui-col-xs-2 mui-col-sm-2">
                                    <button class="mui-btn random clearAllBtn bot_clear" @click="random_or_clear($event)" v-cloak><span>{{$t('清空')}}</span></button>
                                </div> -->
                                <div class="mui-col-xs-3 mui-col-sm-3" style="color:rgb(221, 221, 221);text-align:center;">
                                    <span class="bl" style="position: absolute;top: 50%;margin-top: -0.5rem;width: 100%;left: 0;text-align: center;">{{bets}}注</span>
                                </div>
                                <div class="mui-col-xs-3 mui-col-sm-3">
                                    
                                    <button class="mui-btn bot_betBtn"  @click="sh_betConfirm(1,'')"><span>{{$t('下注')}}</span></button>
                                    <!-- <button class="mui-btn bot_betBtn"  @click="handleConfirm"><span>{{$t('下注')}}</span></button> -->
                                </div>
                                <div class="mui-col-xs-3 mui-col-sm-3">
                                    <button class="mui-btn random bot_ran" @click="random_or_clear($event)" v-cloak><span>{{$t('机选')}}</span></button>
                                </div>
                                <div class="mui-col-xs-3 mui-col-sm-3">
                                    <button class="mui-btn random clearAllBtn bot_clear" @click="random_or_clear($event)" v-cloak><span>{{$t('清空')}}</span></button>
                                </div>
                            <!-- <div class="mui-col-xs-2 mui-col-sm-2">
                                <button class="mui-btn" style="background: #3ea7a5;border: none;margin-left: 10px;margin-top: 5px;color: #fff;padding: 6px 16px;"  @click="handleConfirm">{{$t('下注')}}</button>
                            </div>
                            <div class="mui-col-xs-4 mui-col-sm-4">
                                <button class="mui-btn random" style="background: rgb(229, 160, 80);border: none;margin-top: 5px;color: rgb(255, 255, 255);width: 40%;float: left;box-sizing: border-box;margin-left: 15%;margin-right: 5%;" @click="random_or_clear($event)" v-cloak>{{$t('机选')}}</button>
                                <button class="mui-btn random clearAllBtn" style="background: #8b8feb;border: none;margin-top: 5px;color: rgb(255, 255, 255);width: 40%;float: left;box-sizing: border-box;" @click="random_or_clear($event)" v-cloak>{{$t('清空')}}</button>
                            </div> -->
                                <!-- <div class="mui-col-xs-6 mui-col-sm-6" style="color: #fff;text-align: left;font-size: 16px;margin-top: 3px;height: auto !important;padding: 6px 15px;">
                                    <span>钱包:[{{pack_coin+coinUnit}}]</span>
                                </div>
                                <div class="mui-col-xs-2 mui-col-sm-2">
                                    <button class="mui-btn" style="background: #3ea7a5;border: none;margin-right: 10px;margin-top: 5px;color: #fff;padding: 6px 16px;"  @click="handleConfirm">{{$t('下注')}}</button>
                                </div>
                                <div class="mui-col-xs-2 mui-col-sm-2">
                                    <button class="mui-btn random" style="background: rgb(229, 160, 80);border: none;margin-right: 10px;margin-top: 5px;color: rgb(255, 255, 255);padding: 6px 16px;" @click="random_or_clear($event)" v-cloak>{{$t('机选')}}</button>
                                </div>
                                <div class="mui-col-xs-2 mui-col-sm-2">
                                    <button class="mui-btn random clearAllBtn" style="background: rgb(139, 143, 235);box-sizing: border-box;border: none;margin-right: 10px;margin-top: 5px;color: rgb(255, 255, 255);padding: 6px 16px;" @click="random_or_clear($event)" v-cloak>{{$t('清空')}}</button>
                                </div> -->
                            </div>
                        </div>
                    </div>
                </div>

        <!-- 支付界面 -->
        <!-- <div class="pay" style="display: none">
            <div class="top_head">
                <h1>{{$t('投注单')}}</h1>
                <span @click="clearSelOptions">{{$t('关闭')}}</span>
            </div>
            <p class="last_time">
                第<span>{{preventBanner}}</span>{{$t('期投注截止时间')}}:
                <span>{{deadlineStr}}</span>
            </p>
            <ul class="random">
                <li @click="getAppointBets(1)"><i class="add"></i>{{$t('机选一注')}}</li>
                <li @click="getAppointBets(5)"><i class="add"></i>{{$t('机选五注')}}</li>
            </ul>
            <div class="list-header"></div>
            <div class="bets_list">
                <div class="bets_item line" v-for="(item,index) in BetsList">
                    <div class="bets_type">
                        {{item.type.replace(/[-]+[\u4e00-\u9fa5]*/g,"")}}<span>{{"("+item.type.replace(/[\u4e00-\u9fa5]*[-]+/g,"")+")"}} 共<em class="red">{{item.betsCount}}</em>注，共<em class="red">{{item.betsCoins}}</em>{{coinUnit}}
                        	 倍</span>
                    </div>
                    <div class="bets_info">
                        {{item.betsClause}}
                    </div>
                    <span class="close" @click="handleClickDelete(index)">
                        <img src="../../../assets/images/close.png" alt="" srcset="">
                    </span>
                </div>
                <div class="btns_item line" v-if="BetsList.length==0"></div>
                <div class="list-footer"></div>
            </div>

            <div class="after_no">
               <div :class="['mui-input-row mui-checkbox mui-left ',{'gray':continue_periods==1}]">
                    <label>{{$t('中奖后停止追号')}}</label>
                    <input :disabled="!continue_periods||continue_periods==1" name="checkbox1" v-model="after_no" type="checkbox">
                </div>
                <p class="total">
                    <label for="">{{$t('追')}}<input type="text" v-model="continue_periods" placeholder="1" @keyup="handleChase" maxlength="2" @blur="!continue_periods?continue_periods=1:continue_periods=continue_periods">{{$t('期')}}</label>
                </p>
            </div>
            <div class="bets_footer">
                <ul>
                    <li>
                        <span class="clear" @click="handleClearAll">{{$t('清空')}}</span>
                    </li>
                    <li>
                        <div>
                            <p v-cloak>{{$t('合计')}}
                                <span class="red">{{totalCoins}}</span>{{coinUnit}}</p>
                            <p v-cloak>{{$t('可用余额')}}
                                <span class="red">{{pack_coin}}</span>{{coinUnit}}</p>
                        </div>
                    </li>
                    <li>
                        <span class="btn_bets" @click="handleBets">{{$t('投注')}}</span>
                    </li>
                </ul>
            </div>
        </div> -->

        <!-- 投注成功 -->
        <!-- <div class="success suc">
            <div class="top_head">
                <h1>{{$t('投注')}}</h1>
                <span>{{$t('关闭')}}</span>
            </div>
            <div class="icon">
                <img src="../../../assets/images/success.png" alt="" srcset="">
            </div>
            <div class="msg">
                <h3>{{$t('投注成功')}},{{$t('预祝您中奖')}}</h3>
                <p>{{$t('当前投注彩种')}}：{{typeNameTitle}}</p>
                <p>{{$t('当前投注期数')}}：{{preventBanner}}期</p>
            </div>
            <button type="button" class="mbt mui-btn mui-btn-danger">{{$t('确认')}}</button>
        </div> -->
        <!-- 投注失败 -->
        <!-- <div class="success fail">
            <div class="top_head">
                <h1>{{$t('投注')}}</h1>
                <span>{{$t('关闭')}}</span>
            </div>
            <div class="icon">
                <img src="../../../assets/images/fail.png" alt="" srcset="">
            </div>
            <h3>{{errmsg}}</h3>
            <button type="button" class="mbt mui-btn mui-btn-danger">{{$t('返回')}}</button>
        </div> -->
        <div class="popup">
            <div class="body">
                <div class="go_service">
                    <p>{{$t('余额不足')}},{{$t('请前往充值')}}</p>
                </div>
            </div>
            <div class="footer">
                <a href="javascript:;" class="yes" @click='recharge'>{{$t('火速前往')}}</a>
                <a href="javascript:;" class="no" @click='closePop'>{{$t('残忍拒绝')}}</a>
            </div>
        </div>

        <!-- <div class="betConfirm" style="display:none">
            <div class="wrap"></div>
            <div class="content">
                <div class="title">{{$t('投注信息')}}</div>
                <div class="btnInfo">
                    <div :key="index" v-for="(it,index) in betConfirm_tips">
                        <p>类型：{{typeNameTitle}}({{it.type}})</p>
                        <p>{{$t('赔率')}}：{{it.odds}} , {{$t('投注金额')}}：{{it.betsCoins}}</p>
                        <p>{{$t('投注项')}}：{{it.betsClause}}</p>
                    </div>
                </div>
                <div class="btnList">
                    <div class="btn btn_sure" @click="btn_betSure">{{$t('确定')}}</div><div class="btn btn_cancel" @click="btn_betCancel">{{$t('取消')}}</div>
                </div>
                
            </div>
        </div> -->
        <div class="betConfirm" style="display:none">
            <div class="wrap"></div>
            <div class="content">
                <div class="title">{{$t('注单设定')}}</div>
                
                <div class="btnInfo">
                    <div class="coin clearfix">
                        <div class="clearfix">{{$t('单注金额')}}  <input pattern="[0-9]*" type="number" class="mui-input mui-input-clear"  v-model="singleCoins" @keyup="handleCoins"> 元
                        </div>
                         <div class="coinList">
                            <span @click="setSingleCoins(10,$event)">10</span>
                            <span @click="setSingleCoins(50,$event)" style="margin:5px 5%;">50</span>
                            <span @click="setSingleCoins(100,$event)">100</span>
                            <span @click="setSingleCoins(200,$event)">200</span>
                            <span @click="setSingleCoins(500,$event)" style="margin:5px 5%;">500</span>
                            <span @click="setSingleCoins(1000,$event)">1000</span>
                            <span @click="setSingleCoins(5000,$event)">5000</span>
                            <span @click="setSingleCoins(10000,$event)" style="margin:5px 5%;">10000</span>
                            <span @click="setSingleCoins(50000,$event)">50000</span>
                        </div> 
                    </div>
                     <div class="bet_detail">
                            <ul>
                                <li>{{$t('注数')}}:<span class="bl">{{bets}}</span>{{$t('注')}}</li>
                                <li>{{$t('总额')}}:<span class="bl">{{bets*singleCoins}}</span>{{coinUnit}}</li>
                                <li>{{$t('若中奖')}},{{$t('单注最高中')}}:
                                    <span class="bl" style="color:green">
									{{present_playId==177?bonusSum:parseFloat(singleCoins*orderOdds).toFixed(2)}}
								</span>
                                    {{coinUnit}}
                                </li>
                            </ul>
                        </div>
                </div>
                <div class="btnList">
                    <div class="btn btn_sure" @click="btn_betSure">{{$t('确定')}}</div><div class="btn btn_cancel" @click="btn_betCancel">{{$t('取消')}}</div>
                </div>
                
            </div>
        </div>

        <div class="afterBet" style="display:none">
            <div class="wrap"></div>
            <div class="content">
                <div class="title">{{$t('投注详情')}}</div>
                
                <div class="btnInfo">
                    <div style="text-align:left;">
                        <p>{{$t('投注彩种')}}：{{typeNameTitle}}</p>
                        <p>{{$t('投注玩法')}}：{{title}}</p>
                        <p>{{$t('投注金额')}}：{{totalCoins+coinUnit}}</p>
                        <p>{{$t('投注期数')}}：第{{preventBanner}}期</p>
                    </div>
                 <div :key="index" v-for="(it,index) in betConfirm_tips">
                        <p>{{$t('投注项')}}：{{it.betsClause}}</p>
                    </div>
                    </div>
                <div class="btnList">
                    <div class="btn btn_sure" @click="sh_afterBet(1)">{{$t('返回投注')}}</div><div class="btn btn_cancel"  @click="sh_afterBet(2)">{{$t('投注详情')}}</div>
                </div>
            </div>
        </div>



    </div>
    </div>
  </div>
</template>
<script src="../../../assets/js/ng/k3.js"></script>
<style src="../../../style/ng/ssc.css" scoped></style>


<style lang="less" scoped>
// #topPopover{
//     background: url(../../../assets/images/base/black_bg.png)no-repeat ;
//   background-size: 100% 100%;   
// }
// .mui-popover .mui-popover-arrow:after{
//     background: #666;
// }
// .mui-scroll-wrapper a{
//     color:#666;
// }
.time1 {
  background: url(../../../assets/images/base/trend2_03.png);
  background-size: 100% 100%;
  font-size: 16px;
  color: #fff;
  text-align: left;
  width: 110px;
  background-repeat: no-repeat;
  /* margin: 0 auto; */
  float: right;
}
// .betConfirm{
//         position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     .wrap{
//             position: absolute;
//         top: 0;
//         left: 0;
//         width: 100%;
//         height: 100%;
//         z-index: 2001;
//         background: rgba(0,0,0,.6);
//     }
//     .content{
//             background: #fff;
//         width: 100%;
//         /* height: 100%; */
//         z-index: 2100;
//         position: absolute;
//         width: 80%;
//         left: 10%;
//         top: 50%;
//         height: 14rem;
//         margin-top: -7rem;
//         padding: 0;
//         // text-indent: 1rem;
        
//         .title{
//             line-height: 2rem;
//             background: #312b73;
//             text-align: center;
//             color: #fff;

//         }
//         .btnInfo{
//             // padding-left: 1rem;
//             height: 10rem;
//             overflow-y: auto;
//             background-color: #3ea7a5;
//             >div{
//                 padding: .2rem .5rem .2rem 1rem;
//                 // background-color: #3ea7a5;
//                 // line-height: 1rem;
//                     color: #fff;
//                     border-bottom: 1px solid #ddd;
//                 // &:nth-of-type(n){
//                 //     background: #312b73;
//                 //     color: #fff;
//                 // }
//                 // &:nth-of-type(2n){
//                 //     background-color: #fff;
//                 //     color: #000;
//                 // }
//             }
//         }
//         .btnList{
//             .btn{
//                 width: 50%;
//                 float: left;
//                 text-align: center;
//                 height: 2rem;
//                 line-height: 2rem;
//                     // border-top: 1px solid #ddd;
//                 &.btn_sure{
                    
//                     color: #fff;
//                     background-color: #312b73; 
//                 }
//                 &.btn_cancel{
//                     //  background: #cbd4de;
//                     background: #fff;
//                      color: #000;
//                 }
//             }
//         }
//     }
// }
    input.mui-input.mui-input-clear::-webkit-input-placeholder {
       color: #aab2bd;
   }
     .hisWrap{
       top: 110px;
   }
   .record{
       top: 50px;
   }
   .record ul li{
       height: 35px;
   }
   .gameplaySelect .btn{
       line-height: 32px;
       height: 32px;
       border:0;
   }
   .time1 {
    font-family: arial;
    position: relative;
    span:nth-child(2){
            position: absolute;
            left: 35px;
            margin: 0;
        }
    span:nth-child(3){
            position: absolute;
            right: -3.5px;
        }
    }
    .topPopover_wrap{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
        display: none;
        .wrap{
            position: absolute;
            bottom:  0;
            left: 0;
            width: 100%;
            height: calc(100% - 44px);
            z-index: 2001;
            background: rgba(0,0,0,.6);
        
        }
        #topPopover{
                z-index: 2002;
    right: 10px;
    top: 44px;
        .mui-popover-arrow{
                right: 0;
            left: auto;
        }
        }
        #topPopover_tips{
                z-index: 2002;
        }
}
.afterBet{
      position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    .wrap{
            position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 2001;
        background: rgba(0,0,0,.6);
    }
    .content{
        background: #fefefe;
        width: 100%;
        /* height: 100%; */
        z-index: 2100;
        position: absolute;
        width: 80%;
        left: 10%;
        // top: 50%;
        // height: 14rem;
        // margin-top: -7rem;
        top: 15%;
        max-height: 70%;
        
        padding: 0;
        border-radius: 10px;
        // text-indent: 1rem;
        
        .title{
            line-height: 3rem;
            // background: #312b73;
            text-align: center;
            // color: #fff;
            color:#000;
            height: 3rem;
            font-weight: 700;
            border-bottom: 1px solid #dbdbdb;

        }
        .btnInfo{
            // padding-left: 1rem;
            // height: 10rem;
            overflow: scroll;
            max-height: 300px;
            // background-color: #3ea7a5;
            
            >div{
                padding: .2rem 1rem .2rem 1rem;
                // background-color: #3ea7a5;
                // line-height: 1rem;
                    // color: #fff;
                    border-bottom: 1px solid #ddd;
                // &:nth-of-type(n){
                //     background: #312b73;
                //     color: #fff;
                // }
                // &:nth-of-type(2n){
                //     background-color: #fff;
                //     color: #000;
                // }
            }
        }
        .btnList{
            .btn{
                width: 50%;
                float: left;
                text-align: center;
                height: 2.5rem;
                line-height: 2.5rem;
                    // border-top: 1px solid #ddd;
                &.btn_sure{
                    
                    // color: #fff;
                    // background-color: #312b73;
                    border-right: 1px solid #dbdbdb;
                    box-sizing: border-box; 
                        // background: #3ea7a5;
                    // color: #fff;
                    border-bottom-left-radius: 8px;
                }
                &.btn_cancel{
                    //  background: #cbd4de;
                    // background: #fff;
                     color: #000;
                }
            }
        }
    }
}
.betConfirm{
        position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    .wrap{
            position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 2001;
        background: rgba(0,0,0,.6);
    }
    .content{
            background: #fefefe;
        width: 100%;
        /* height: 100%; */
        z-index: 2100;
        position: absolute;
        width: 80%;
        left: 10%;
        // top: 50%;
        // height: 14rem;
        // margin-top: -7rem;
        top: 15%;
        max-height: 70%;
        
        padding: 0;
        border-radius: 10px;
        // text-indent: 1rem;
        
        .title{
            line-height: 3rem;
            // background: #312b73;
            text-align: center;
            // color: #fff;
            color:#000;
            height: 3rem;
            font-weight: 700;
            border-bottom: 1px solid #dbdbdb;

        }
        .btnInfo{
            // padding-left: 1rem;
            // height: 10rem;
            overflow-y: auto;
            // background-color: #3ea7a5;
            .coin{
                input{
                    border: none;
                    width: 60px;
                    text-align: center;
                    border-bottom: 1px solid #895853;
                        padding-left: 0;
                    padding-right: 0;
                    // text-decoration: underline;
                    // color: red;
                }
                .coinList{
                    span{
                        display: inline-block;
                        width: 30%;
                        // margin-right: 3.3%;
                        float: left;
                        line-height: 2rem;
                        background: #ededed;
                        margin: 5px 0;
                        text-align: center;
                        color: #838383;
                        &.active{
                            background: #3ea7a5;
                            color: #fff;
                        }
                    }
                }
            }
            >div{
                padding: .2rem 1rem .2rem 1rem;
                // background-color: #3ea7a5;
                // line-height: 1rem;
                    // color: #fff;
                    border-bottom: 1px solid #ddd;
                // &:nth-of-type(n){
                //     background: #312b73;
                //     color: #fff;
                // }
                // &:nth-of-type(2n){
                //     background-color: #fff;
                //     color: #000;
                // }
            }
        }
        .btnList{
            .btn{
                width: 50%;
                float: left;
                text-align: center;
                height: 2.5rem;
                line-height: 2.5rem;
                    // border-top: 1px solid #ddd;
                &.btn_sure{
                    
                    // color: #fff;
                    // background-color: #312b73;
                    border-right: 1px solid #dbdbdb;
                    box-sizing: border-box; 
                        background: #3ea7a5;
                    color: #fff;
                    border-bottom-left-radius: 8px;
                }
                &.btn_cancel{
                    //  background: #cbd4de;
                    // background: #fff;
                     color: #000;
                }
            }
        }
    }
}
</style>



