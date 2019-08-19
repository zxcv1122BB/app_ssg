<template>
 <div>
 	<div id="container">
	<div id="app">
    <!--头部-->
    <header id="header">
        <h1>{{$t('客户服务')}}</h1>
        <a class="goBack" href="javascript:void(0)" @click="routerBack"></a>
    </header>
    <ul class="service">
    	<li class="qq" >
            <div class="lbox">
                <img src="../../assets/images/customer_qq.png" alt="">
            </div>
            <div class="rbox">
                <p class="text_t">{{$t('请添加')}}QQ{{$t('客服')}}</p>
                <!--<p style="color: #FFFFFF;" class="popQQimg">{{$t('点击扫码')}}</p>-->
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
                <!--<p style="color: #FFFFFF;" class="popWximg">{{$t('点击扫码')}}</p>-->
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

<script src="../../assets/js/myCenter/customerService.js"></script>

<style scoped>
.service {}

html,
body {
    width: 100%;
    height: 100%;
    background: rgb(252, 236, 239);
}

.service li {
    width: 94%;
    height: 10rem;
    margin: 0.5rem auto;
    border-radius: 10px;
    display: flex;
}

.service .tel {
    background: #ff811b;
}

.service .wx {
    background: #58a81c;
}

.service .qq {
    background: #488bc7;
}

.lbox {
    width: 40%;
    position: relative;
}

.lbox img {
    position: absolute;
    margin: auto;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
}

.rbox {
    flex: 1;
}

.text_t,
.text_b {
    line-height: 5rem;
    color: white;
    /* text-align: center; */
    text-shadow: 10px 5px 5px #666;
}

.text_t {
    font-size: 1.8rem;
}

.text_b {
    font-size: 1.2rem;
}

.copy,.copy2 {
    border: 1px dotted #ddd;
    font-size: .8rem;
    padding: 0 .3rem;
    background: #BA12F4;
    color: #fff;
    box-shadow: 1px 1px 1px #8d8b8b;
    margin-left: 0.5rem;
    cursor: pointer;
    display: inline-block;
    height: 1.5rem;
    line-height: 1.5rem;
}

.wxImg {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    margin: auto;
    width: 100%;
    height: 15rem;
    text-align: center;
}

.wxImg img {
    width: 15rem;
    height: 15rem;
}

.qq_Img {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    margin: auto;
    width: 100%;
    height: 15rem;
    text-align: center;
}

.qq_Img img {
    width: 15rem;
    height: 15rem;
}
</style>
