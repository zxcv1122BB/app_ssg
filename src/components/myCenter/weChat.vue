<template>
  <div>
    <div id="container">
      <div id="weChat">
        <header id="header">
          <a href="javascript:void(0)"  class="goBack" @click="routerBack"></a>
          <h1>{{$t('充值')}}</h1>
        </header>
        <article id="article" v-cloak>
            <section class="paySuccess">
              <div style="color: #78d6d5;">
                <p>　 订单号：<span v-cloak>{{ordernumber}}</span>
                  <span type="button"
                      v-clipboard:copy="ordernumber"
                      v-clipboard:success="onCopy"
                      v-clipboard:error="onError" class="copy" style="color: white;">{{$t('复制')}}</span></p>
                <div class="money" ><p>　 {{$t('充值金额')}}：<span v-cloak>{{paymoney}}{{coinUnit}}</span></p></div>
                <div class="qrCode" v-show="paySet==true" style="position: absolute;width: 90%;left: 5%;">
                  <!-- <div id="qrCode"></div> -->
                  <div style="text-align:left;" v-if="payConditions.payment_mode==5">
                    <p style="padding:0;">　{{$t('付款码')}}：<span v-cloak style="color:#e4393c;">{{info.account}}</span>
                    <span type="button"
                      v-clipboard:copy="info.account"
                      v-clipboard:success="onCopy"
                      v-clipboard:error="onError" class="copy" style="color: white;">{{$t('复制')}}</span></p>
                      <p style="padding:0;font-size:.8rem;">　(請保存支付代碼，於兩小時內至附近超商輸入代碼繳費)</p>
                  </div>
                  <div v-else-if="payConditions.payment_mode==6" style="padding:0;">
                    <div style="text-align:left;">
                      <p style="padding:0;">　{{$t('账号')}}：<span v-cloak style="color:#e4393c;">{{info.account}}</span>
                      <span type="button"
                        v-clipboard:copy="info.account"
                        v-clipboard:success="onCopy"
                        v-clipboard:error="onError" class="copy" style="color: white;">{{$t('复制')}}</span></p>
                        <p style="padding:0;">　{{info.accountName}}
                          <span type="button"
                        v-clipboard:copy="info.accountName"
                        v-clipboard:success="onCopy"
                        v-clipboard:error="onError" class="copy" style="color: white;">{{$t('复制')}}</span>
                        </p>
                        <p style="padding:0;">　{{info.bank}}
                          <span type="button"
                        v-clipboard:copy="info.bank"
                        v-clipboard:success="onCopy"
                        v-clipboard:error="onError" class="copy" style="color: white;">{{$t('复制')}}</span>
                        </p>
                    </div>
                  </div>
                  <!--<div id="qrCode"><img src="img/er.png"/></div>-->
                  <!-- <p style="padding:0;font-size:.8rem;">　(請保存支付代碼，於兩小時內至附近超商輸入代碼繳費)</p> -->
                  <!-- <p>截图保存二维码,</p>
                  <p>并打开{{payName}}扫一扫完成支付。</p> -->
                </div>
                <div id="error" v-if="paySet==false" style="text-align:center">{{payError}}</div>
              </div>
              <p style="position:absolute;bottom:2%;width:100%;"  class="payBtn" v-if="paySet==true"><input type="button" value="已完成支付"  @click="clickSure()"/></p>
              
            </section>
            <section>
              <div class="payError" v-cloak>
                <h2>{{$t('支付失败')}}!</h2>
                <font v-if="errorMsg" color="red" v-cloak>{{$t('原因')}}：{{errorMsg}}</font>
                <p>{{$t('请联系客服')}},</p>
                <p>{{$t('或者稍后再试')}}。</p>
              </div>
            </section>
        </article>
      </div>
    </div>
  </div>
</template>

<script src="../../assets/js/myCenter/weChat.js"></script>

<style src="../../style/myCenter/centerGlobal.css" scoped></style>
