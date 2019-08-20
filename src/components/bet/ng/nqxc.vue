<template>
<div>
    <div id="container">
    <div id="ssc">
        <!--页面头部-->
                <header id="header" class="mui-bar mui-bar-nav" style="background: #232328;">
                    <template v-if="!switchoverType">
                        <a class="goBack" href="javascript:void(0)" @click="routerBack"></a>
                        <!-- <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a> -->
                        <!-- <a class="mui-title" href="#middlePopover">重庆时时彩<i class="mui-icon mui-icon-arrowdown"></i></a> -->
                        <div class="gameplaySelect" v-cloak>
                                <span>{{$t('玩法')}}</span><span class="btn" @click="switchoverType=true" v-cloak>{{title}}<em class="triangle"></em></span>
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

                <div id="gameplayArea"  v-show="switchoverType">
                    <div class="play_head" v-cloak>
                        <ul>
                            <li :key="index" v-for="(item,index) in menu" :class="parentIndex==index?'active':''" @click="parentIndex=index;title=item.oneType">
                                <span class="sel" v-cloak>{{item.oneType}}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="play_list" v-cloak>
                        <ul>
                            <li :key="index" v-for="(item,index) in menu" v-show="parentIndex==index">
                                <div>
                                    <p class="type_item">
                                        <span :key="indexs" class="sel" v-for="(items,indexs) in item.twoType" @click="handlePlayType(items.Ename)"  :class="index==0&&indexs==0?'active':''" >{{items.name}}</span>
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
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
                    <li @click="togoChart()">
                        <a href="javascript:;"><img src="../../../assets/images/trend.png" alt="" srcset="">{{$t('走势图')}}</a>
                    </li>
                    <li @click="togoLottery()">
                        <a href="javascript:;"><img src="../../../assets/images/prize.png" alt="" srcset="">{{$t('近期开奖')}}</a>
                    </li>
                     <li @click="togoRecord()"><a href="javascript:;"><img src="../../../assets/images/record.png" alt="" srcset="">{{$t('购彩记录')}}</a></li>
                  <li @click="handleShowRule()"><a href="javascript:;"><img src="../../../assets/images/gameTips.png" alt="" srcset="">{{$t('玩法提示')}}</a></li>
                </ul>
            </div>
        </div> -->
        <div id="gameplayArea" v-show="switchoverType">
            <div class="play_head">
                <ul>
                    <li v-for="(item,index) in menu" :class="parentIndex==index?'active':''" @click="parentIndex=index;title=item.oneType">
                        <span class="sel" v-cloak>{{item.oneType}}</span>
                    </li>
                </ul>
            </div>
            <div class="play_list">
                <ul>
                    <li v-for="(item,index) in menu" v-show="parentIndex==index">
                        <div>
                            <p class="type_item">
                                <span class="sel" v-for="(items,indexs) in item.twoType" @click="handlePlayType(items.Ename)" :class="index==0&&indexs==0?'active':''" v-cloak>{{items.name}}</span>
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
                <div id="offCanvasContentScroll" class="mui-content mui-scroll-wrapper">
                    <div class="mui-scroll" style="height: calc(100% - 44px) !important;">
                        <div style="padding: 0 15px">
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
                            <div class="num" @click="showHis(1)">
                                 <!-- <span class="red" style="font-size: 1.2rem;" v-if="previousIssue_tips">{{$t('开奖中')}}...</span> -->
                                <div v-if="previousIssue_tips" >
                                    <span style="font-size:1.2rem;color:red;height: 25px;display: inline-block;position:relative;top:-.2rem;">{{$t('正在开奖...')}}</span>  <img  style="animation:rotating 1.2s linear infinite;width:25px;" src="../../../assets/images/base/n_refresh.png" alt="">
                                </div>
                                <span class="red" v-else-if="recentlyNum.length==0" style="font-size: 1.5rem;">{{$t('数据获取中')}}...</span>
                                <template v-else>
                                <span class="ball" v-for="item in recentlyNum" v-cloak>{{item}}</span>
                                </template>
                                <em class="triangle"></em>
                                <div class="record hide" v-cloak>
                                    <div style="overflow:auto">
                                        <div>
                                            <span class="issue">{{$t('期数')}}</span>
                                            <span class="prize" style="margin-left: 2rem;">{{$t('开奖号码')}}</span>
                                        </div>
                                        <ul>
                                            <li v-for="item in history">
                                                    <span class="qici" v-cloak>
                                                {{item.issue}}期
                                            </span>
                                                <span class="number">
                                                <span class="ball" v-for="it in item.luck_number" v-cloak>{{it}}</span>
                                                    </span>
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
                                 <div id="segmentedControlContents" class="mui-col-xs-12 mui-col-sm-12">
                                    <div id="content1" class="mui-control-content right second"  v-show="bet_area_manner.myriabit"><h2>{{$t('第一位')}}</h2><div class="content"><div class="content-item"  :key="index" v-for="(item,index) in myriabit">
                                        <p><span :class="{'sel_num':item.isSel}"   @click="handleAddClass(item)">{{item.num}}</span></p>
                                        </div></div></div>
                                    <div id="content2" class="mui-control-content right second"  v-show="bet_area_manner.kilobit"><h2>{{$t('千位')}}</h2><div class="content"><div class="content-item"  :key="index" v-for="(item,index) in kilobit">
                                        <p><span :class="{'sel_num':item.isSel}"   @click="handleAddClass(item)">{{item.num}}</span></p>
                                        </div></div></div>
                                    <div id="content3" class="mui-control-content right second"  v-show="bet_area_manner.hundreds"><h2>{{$t('百位')}}</h2><div class="content"><div class="content-item"  :key="index" v-for="(item,index) in hundreds">
                                        <p><span :class="{'sel_num':item.isSel}"   @click="handleAddClass(item)">{{item.num}}</span></p>
                                        </div></div></div>
                                    <div id="content4" class="mui-control-content right second"  v-show="bet_area_manner.decade"><h2>{{$t('十位')}}</h2><div class="content"><div class="content-item"  :key="index" v-for="(item,index) in decade">
                                        <p><span :class="{'sel_num':item.isSel}"   @click="handleAddClass(item)">{{item.num}}</span></p>
                                        </div></div></div>
                                    <div id="content5" class="mui-control-content right second"  v-show="bet_area_manner.unit"><h2>{{$t('个位')}}</h2><div class="content"><div class="content-item"  :key="index" v-for="(item,index) in unit">
                                        <p><span :class="{'sel_num':item.isSel}"   @click="handleAddClass(item)">{{item.num}}</span></p>
                                        </div></div></div>
                                    <div id="content6" class="mui-control-content right second"  v-show="bet_area_manner.common"><h2>{{right_title}}</h2><div class="content"><div class="content-item"  :key="index" v-for="(item,index) in numberArr">
                                        <p><span :class="{'sel_num':item.isSel}"   @click="handleAddClass(item)">{{item.num}}</span></p>
                                        </div></div></div>
                                </div>
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
                        </span>
                    </div>
                    <div class="bets_info">
                        {{item.betsClause.replace(/[_]*/g,"")}}
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
        </div>
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
        </div> -->

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
									{{parseFloat(singleCoins*orderOdds).toFixed(2)}}
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
<script src="../../../assets/js/ng/qxc.js"></script>
<style src="../../../style/ng/xync.css" scoped></style>



<style lang="less" scoped>
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
   #offCanvasContentScroll .num span.ball{
    //    vertical-align: bottom;
        vertical-align: middle;
        font-family: Arial;
            padding-top: 2.5px;
            line-height: 1;
   }
   .record ul li{
       height: 35px;
   }
   .gameplaySelect .btn{
       line-height: 32px;
       height: 32px;
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



