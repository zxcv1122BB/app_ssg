// 代理中心
<template>
<div>
    <div id="container">
      <div>

        <header id="header">
           <a class="goBack" href="javascript:void(0)" @click="routerBack"></a>
          <h1>{{$t('代理中心')}}</h1>
        </header>
        <div class="main">
          <div class="topSlide">
            <img class="img_adaptive" src="../../assets/images/agency/proxySlide.png" alt="">
          </div>
          <div class="contentList">
            <ul class="itemList">
              <li @click="redirect('agentIntro')">
                <span @click="redirect('agentIntro')">{{$t('代理说明')}}</span>
                <div data-v-6efe4612="" class="fr"><span data-v-6efe4612="" class="zjRecord fr"><img data-v-6efe4612="" src="static/images/personalCenter/right.png" alt=""></span></div>
              </li>
              <li @click="redirect('agentReport')">
                <span>{{$t('代理报表')}}</span>
               <div data-v-6efe4612="" class="fr"><span data-v-6efe4612="" class="zjRecord fr"><img data-v-6efe4612="" src="static/images/personalCenter/right.png" alt=""></span></div>
              </li>
              <li @click="redirect('lowerReport')">
                <span>{{$t('下级报表')}}</span>
                <div data-v-6efe4612="" class="fr"><span data-v-6efe4612="" class="zjRecord fr"><img data-v-6efe4612="" src="static/images/personalCenter/right.png" alt=""></span></div>
              </li>
              <li @click="redirect('downAccount')">
                <span>{{$t('下级开户')}}</span>
                <div data-v-6efe4612="" class="fr"><span data-v-6efe4612="" class="zjRecord fr"><img data-v-6efe4612="" src="static/images/personalCenter/right.png" alt=""></span></div>
              </li>
              <li @click="redirect('agentMember')">
                <span>{{$t('会员管理')}}</span>
                <div data-v-6efe4612="" class="fr"><span data-v-6efe4612="" class="zjRecord fr"><img data-v-6efe4612="" src="static/images/personalCenter/right.png" alt=""></span></div>
              </li>
              <li @click="redirect('agencyBetDetail')">
                <span>{{$t('投注明细')}}</span>
                <div data-v-6efe4612="" class="fr"><span data-v-6efe4612="" class="zjRecord fr"><img data-v-6efe4612="" src="static/images/personalCenter/right.png" alt=""></span></div>
              </li>
              <li @click="redirect('agencyDealDetail')">
                <span>{{$t('交易明细')}}</span>
                <div data-v-6efe4612="" class="fr"><span data-v-6efe4612="" class="zjRecord fr"><img data-v-6efe4612="" src="static/images/personalCenter/right.png" alt=""></span></div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="../../assets/js/agency/agencyCenter.js"></script>
<!--<style src="../../../style/ng/ssc.css" scoped></style>-->
<style src="../../style/agency/agencyCenter.css" scoped></style>
<style lang="less" scoped>
#container{
  
  background: url(../../assets/images/base/black_bg.png)no-repeat ;
  background-size: 100% 100%;
  .main{
    margin-top: 2.67rem;
    .itemList{
      padding: .5rem 1rem;
      li{
        background: rgba(30, 30, 30, .8);
          color: #fff;
              padding: 0 1rem;
              height: 3.5rem;
          border-bottom: 1px solid #727272;
      }
          
    }
  }
  
}
</style>


