<template>
<div>
    <div id="container">
    <div id="ssc">
        <!--页面头部-->
        <header id="header">
            <template v-if="!switchoverType">
                <div class="gameplaySelect" v-cloak>
                    <span>{{$t('玩法')}}</span>
                    <span class="btn" @click="switchoverType=true" v-cloak>{{title}}
                	<em class="triangle"></em>
                </span>
                </div>
                <a class="goBack" href="javascript:void(0)" @click="routerBack"></a>
                <!--<span class="league-filter-ico" @click="openLeagueArea"></span>-->
                <a href="javascript:void(0)" @click="togohelp" class="question-ico"></a>
                <!--<span v-if="userName" class="iconfont collect" @touchstart="collectFn">{{(isCollect==1?'&#xe60d;':'&#xe7ce;')}}</span>-->
                <span class="menu" @click="showMenu"><img src="../../../assets/images/menu.png" alt="" srcset=""></span>
            </template>
            <template v-else>
                <h1>{{$t('全部玩法')}}</h1>
                <a href="javascript:;" @click="switchoverType=false" class="closeBtn"></a>
            </template>
        </header>
        <!--走势图-->
        <div class="mask menu" @click="closeMenu">
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
        </div>
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
        <div id="mainArea" v-show="!switchoverType">
            <!--时间倒计时-->
            <div class="info-wrapper clearfix">
                <div class="info-top clearfix">
                    <div class="countdown">

                        <template v-if="preventBanner!=0">
                            <p v-if="!isNaN(preventBanner)">{{$t('距离')}} <em class="red" v-cloak>{{preventBanner}}</em>期 <span>{{noSale?'开售':'截止'}}</span></p>
                            <p v-else>{{preventBanner}}</p>
                            <div class="time">
                                <span v-cloak>{{deadlineStr}}</span>
                            </div>
                        </template>

                        <template v-else>
                            <span class="noBanner red">{{deadlineStr}}</span>
                        </template>
                    </div>
                    <div class="recent">
                        <p class="btn_banner" v-if="!previousIssue">
                            {{$t('近期开奖')}}
                            <b class="ico"></b>
                        </p>
                        <p class="btn_banner" v-if="previousIssue">
                            第<span  class="red">{{previousIssue}}</span>{{$t('期开奖')}}
                            <b class="ico" style="right: 1.6rem;"></b>
                        </p>
                        <p class="banner_num">
                          <span class="red" style="font-size: 1.2rem;line-height:2.5rem;" v-if="previousIssue_tips">{{$t('开奖中')}}...</span>
                            <span class="red" v-else-if="recentlyNum.length==0" style="font-size: 1.5rem;">{{$t('数据获取中')}}...</span>
                            <span v-else class="r_bage" v-for="item in recentlyNum" v-cloak>{{item}}</span>
                            <span class="refresh" @click="downRefresh()" v-show="previousIssue_tips||recentlyNum.length==0"></span>
                        </p>
                    </div>
                </div>
                <div class="record">
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
            <!--主要区域-->
            <div class="main">
               <!-- <div class="playTips" v-cloak>
                        <span @click="handleShowRule">{{$t('玩法提示')}}</span>
                    </div> -->
                    <div class="gamePlan" v-cloak>
                  <span class="presentPlan" v-show="showGamePlan!==2&&isPlan==1" @click="getPlanDataList(1)">
                    <b>{{$t('计划')}}:</b>{{nowGamePlan}}
                     <i class="down"  v-show="showGamePlan!=1">↓</i>
                    <i class="up"  v-show="showGamePlan==1">↑</i>

                  </span>

             <ul id="gamePlanList" class="animated" @touchmove="gamePlanScoll" @scroll="gamePlanScoll" v-show="showGamePlan==1">
                    <!--<li class="down">↓</li>-->
                    <li  v-for="item in gamePlanList" :class="item.plan_content.indexOf('中')!==-1?'green':item.plan_content.indexOf('挂')!==-1?'red':''">{{item.plan_content}}</li>
                  </ul>
          </div>
                <div class="common">
                    <dl class="num1 clearfix bet_area_item bet_area1" v-if="bet_area_manner.kilobit" v-cloak>
                        <dt>{{$t('千位')}}</dt>
                        <dd class="first">
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
                        <dd class="second">
                            <div>
                                <ul>
                                    <li v-for="(item,index) in kilobit">
                                        <span :class="{'sel_num':item.isSel}" @touchstart="showBigSelectBall($event,item,index,0)" @touchend="hideBigSelectBall($event)" @touchcancel="hideBigSelectBall($event)"  :data-index="index"  v-cloak>{{item.num}}</span>
                                    </li>
                                </ul>
                            </div>
                        </dd>
                    </dl>
                    <dl class="num2 clearfix bet_area_item bet_area1" v-if="bet_area_manner.hundreds" v-cloak>
                        <dt>{{$t('百位')}}</dt>
                        <dd class="first">
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
                        <dd class="second">
                            <div>
                                <ul>
                                    <li v-for="(item,index) in hundreds">
                                        <span :class="{'sel_num':item.isSel}" @touchstart="showBigSelectBall($event,item,index,1)" @touchend="hideBigSelectBall($event)" @touchcancel="hideBigSelectBall($event)"  :data-index="index" v-cloak>{{item.num}}</span>
                                    </li>
                                </ul>
                            </div>
                        </dd>
                    </dl>
                    <dl class="num3 clearfix bet_area_item bet_area1" v-if="bet_area_manner.decade" v-cloak>
                        <dt>{{$t('十位')}}</dt>
                        <dd class="first">
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
                        <dd class="second">
                            <div>
                                <ul>
                                    <li v-for="(item,index) in decade">
                                        <span :class="{'sel_num':item.isSel}" @touchstart="showBigSelectBall($event,item,index,2)" @touchend="hideBigSelectBall($event)" @touchcancel="hideBigSelectBall($event)"  :data-index="index" v-cloak>{{item.num}}</span>
                                    </li>
                                </ul>
                            </div>
                        </dd>
                    </dl>
                    <dl class="num4 clearfix bet_area_item bet_area1" v-if="bet_area_manner.unit" v-cloak>
                        <dt>{{$t('个位')}}</dt>
                        <dd class="first">
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
                        <dd class="second">
                            <div>
                                <ul>
                                    <li v-for="(item,index) in unit">
                                        <span :class="{'sel_num':item.isSel}"  @touchstart="showBigSelectBall($event,item,index,3)" @touchend="hideBigSelectBall($event)" @touchcancel="hideBigSelectBall($event)"  :data-index="index" v-cloak>{{item.num}}</span>
                                    </li>
                                </ul>
                            </div>
                        </dd>
                    </dl>
                    <dl class="num5 clearfix bet_area_item bet_area1" v-if="bet_area_manner.common" v-cloak>
                        <dt>{{right_title}}</dt>
                        <dd class="first">
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
                        <dd class="second">
                            <div>
                                <ul>
                                    <li v-for="(item,index) in numberArr">
                                        <span :class="{'sel_num':item.isSel}" @touchstart="showBigSelectBall($event,item,index,4)" @touchend="hideBigSelectBall($event)" @touchcancel="hideBigSelectBall($event)"  :data-index="index"  v-cloak>{{item.num}}</span>
                                    </li>
                                </ul>
                            </div>
                        </dd>
                    </dl>
                </div>

                <!--<div class="maskContent">-->
                <div class="mask help">
                    <div class="inner">
                        <header>{{$t('玩法提示')}}</header>
                        <div class="content">
                            <p class="help-title">
                                <i class="iconfont" style="font-size: 1.8rem">&#xe611;</i>
                                <span>{{$t('玩法提示')}}</span>
                            </p>
                            <p>{{game_tips}}</p>
                            <p class="help-title">
                                <i class="iconfont">&#xe637;</i>
                                <span>{{$t('中奖说明')}}</span>
                            </p>
                            <p>{{win_explain}}</p>
                            <p class="help-title">
                                <i class="iconfont">&#xe6a4;</i>
                                <span>{{$t('范例')}}</span>
                            </p>
                            <p>{{win_example}}</p>
                        </div>
                    </div>
                </div>
                <!--<div class="wrap"></div>
         </div>-->
                <div class="mask setting">
                    <div class="inner">
                        <div class="setting_head">{{$t('注单设定')}}</div>
                        <ul class="odd">
                            <li>{{$t('赔率')}}:
                                <span class="red">{{orderOdds}}</span>
                            </li>
                            <!-- <li>返利:
                                <span class="red">{{rebate}}%</span>
                            </li> -->
                        </ul>
                        <!-- <div class="setting_group">
                            <div class="mui-input-row mui-input-range">
                                <input type="range" min="0" max="100" v-model="rebateNum" @input="changeRebate">
                            </div>
                        </div> -->
                        <div class="bet_detail">
                            <ul>
                                <li>
                                    <label>
                                        {{$t('单注金额')}}
                                        <input type="number" pattern="[0-9]*" v-model="singleCoins" @keyup="handleCoins" maxlength="6">
                                    </label>
                                    <span>{{coinUnit}}</span>
                                </li>
                                <li>
                                    {{$t('注数')}}:
                                    <span class="bl">{{bets}}</span>注
                                </li>
                                <li>
                                    {{$t('总额')}}:
                                    <span class="bl">{{bets*singleCoins}}</span>{{coinUnit}}
                                </li>
                                <li>
                                    {{$t('若中奖')}},{{$t('单注最高中')}}:
                                    <span class="bl">{{parseFloat(singleCoins*orderOdds).toFixed(2)}}</span>{{coinUnit}}
                                </li>
                            </ul>
                        </div>
                        <ul class="btn_group">
                            <li class="cancel" @click="handleCancel">{{$t('取消')}}</li>
                            <li class="confirm" @click="handleConfirm">{{$t('确定')}}</li>
                        </ul>
                    </div>
                </div>

                <!--提示-->
                <div class="info">
                    <p v-cloak><em class="red">{{bets}}</em>注
                      <!--<em>{{bets*2}}</em>-->
                      <!--{{coinUnit}}-->
                      <em>{{"(钱包:"+pack_coin+")"}}</em></p>
                    <span :class="bets===0?'random':'random clearAllBtn'" @click="random_or_clear($event)" v-cloak>{{bets===0?"机选":"清空"}}</span>
                    <span :class="['btn',bets===0||bet_forbid?'unable':'']" @click="handleSubmit">{{$t('确定')}}</span>
                </div>
            </div>
        </div>

        <!-- 支付界面 -->
        <div class="pay" style="display: none">
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
                        	<!--{{item.odds}}倍-->
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
        </div>

        <!-- 投注成功 -->
        <div class="success suc">
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
                <p>{{$t('当前投注期数')}}：第{{preventBanner}}期</p>
            </div>
            <button type="button" class="mbt mui-btn mui-btn-danger">{{$t('确认')}}</button>
        </div>
        <!-- 投注失败 -->
        <div class="success fail">
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
        </div>

    </div>
    </div>
  </div>
</template>
<script src="../../../assets/js/ng/qxc.js"></script>
<style src="../../../style/ng/xync.css" scoped></style>
