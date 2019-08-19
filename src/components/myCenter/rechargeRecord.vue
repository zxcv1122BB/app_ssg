<template>
  <div>
    <div id="container">
      <div id="footFD">
        <header id="header">
          <a href="javascript:void(0)" class="goBack" @click="routerBack"></a>
          <h1>{{$t('充值记录')}}</h1>
        </header>
        <article id="article">
          <!--<div id="protitle">交易明细非即时显示，可能有5-10分钟的延迟，如果您没有发现您当前的交易数据，请稍等片刻。</div>-->
          <div class="chooseTime">
            <div id="date" style="position: relative;">
              <input id="showDate" class="show" type="text" style="" readonly="" value="近7天"/>
              <div class="jian"><img src="../../assets/images/jiantou.png"/></div>
            </div>
            <ul id="selectDate" class="select" style="top: 5.8rem;">
              <li @click="allTime()">近7天</li>
              <li @click="now()">{{$t('今天')}}</li>
              <li @click="yes()">{{$t('昨天')}}</li>
              <li @click="week()">{{$t('本周')}}</li>
              <li @click="lastMonth()">7天前</li>
            </ul>
          </div>
          <div class="chooseType">
            <div id="type" style="position: relative;">
              <input id="showType" class="show" type="text" style="" readonly="" value="全部状态"/>
              <div class="jian"><img src="../../assets/images/jiantou.png"/></div>
            </div>
            <ul id="selectType" class="selectType" style="top: 5.8rem;">
              <li @click="selectType('');" class="choose_yes">{{$t('全部状态')}}</li>
              <li @click="selectType(1);" class="choose_no">{{$t('待处理')}}</li>
              <li @click="selectType(2);" class="choose_no">{{$t('处理中')}}</li>
              <li @click="selectType(3);" class="choose_no">{{$t('成功到账')}}</li>
              <li @click="selectType(4);" class="choose_no">{{$t('充值失败')}}</li>
            </ul>
          </div>
          <section id="section">
            <div v-for="(item,index) in datas" class="isclick" @click="clickMes(index)">
              <span style="display: none;height: 0;" v-cloak>{{item.orderId}}</span>
              <span v-cloak>{{item.applyTime}}</span>
              <span v-cloak>
					<span style="color: #f05618;"  v-cloak>{{item.amount}}{{coinUnit}}</span>
                					<span style="font-size: 1rem;color: gray;" v-cloak>({{item.state==1?'未处理':(item.state==2?'处理中':(item.state==3?'成功到账':(item.state==4?'充值失败':'--')))}})</span>

					</span>
            </div>

            <!--加载更多-->
            <div class="has-more" style="text-align: center;line-height: 40px;color: #fff;">
            </div>

          </section>
          <div id="background_gray">

          </div>
          <div id="noMessage">
            <img src="../../assets/images/background.png" height="200rem"/>
            <p>{{$t('暂无数据')}}</p>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script src="../../assets/js/myCenter/rechargeRecord.js"></script>

<style src="../../style/myCenter/centerGlobal.css" scoped></style>
