<template>
  <div>
    <div id="container">
        <div id="app">
    <!--头部-->
    <header id="header">
			<a href="javascript:void(0)" class="goBack"  @click="routerBack"></a>
			<h1>{{$t('客户服务')}}</h1>
		</header>
    <ul class="service">
    	<li class="qq" >
            <div class="lbox">
                <img src="../../assets/images/customer_qq.png" alt="">
            </div>
            <div class="rbox">
                <p class="text_t">{{$t('请添加')}}QQ{{$t('客服')}}</p>
                <p style="color: #FFFFFF;" @click="popQQimg">{{$t('点击扫码')}}</p>
                <p class="text_b" style="line-height: 2rem;">
                	<span id="aaa" @click="lianxiqq(datas.qqSys_config2)" v-cloak>QQ: {{datas.qqSys_config2}}</span>
                	<span type="button"
							     v-clipboard:copy="datas.qqSys_config2"
							     v-clipboard:success="onCopy"
							     v-clipboard:error="onError" class="copy">{{$t('复制')}}</span>
                </p>
            </div>
        </li>
    	<li class="wx">
            <div class="lbox">
                <img src="../../assets/images/customer_wx.png" alt="">
            </div>
            <div class="rbox">
                <p class="text_t">{{$t('请添加微信在线')}}</p>
                <p style="color: #FFFFFF;" @click="popWximg">{{$t('点击扫码')}}</p>
              	<p class="text_b" style="line-height: 2rem;">
                	<span id="bbb" v-cloak >{{$t('微信')}}:{{datas.weixinSys_config2}}</span>
                	<span type="button"
							     v-clipboard:copy="datas.weixinSys_config2"
							     v-clipboard:success="onCopy"
							     v-clipboard:error="onError" class="copy">{{$t('复制')}}</span>
              	</p>
            </div>
        </li>
    	<li class="tel" >
            <div class="lbox">
                <img src="../../assets/images/customer.png" alt="">
            </div>
            <div class="rbox">
                <p class="text_t">{{$t('在线客服')}}</p>
                <p class="text_b"  >
                	<span @click="onlineCustomerServiceSkip(datas.onlineSys_config1)">{{$t('联系客服')}}</span>
                </p>
            </div>
        </li>
    </ul>
    <!--qq二维码-->
    <div class="qq_mask" @click="close_qq_mask">
        <div class="qq_Img">
            <img :src="qq_Img" alt="" srcset="" width="100px" height="100px">
        </div>
    </div>
    <!--微信二维码-->
    <div class="wx_mask" @click="close_wx_mask">
        <div class="wxImg">
            <img :src="wxImg" alt="" srcset="" width="100px" height="100px">
        </div>
    </div>

</div>
    </div>
  </div>
</template>

<script src="../../assets/js/service/customerService.js"></script>

<style src="../../style/service/customerService.css" scoped></style>
