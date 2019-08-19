<template>
    <div>
        <div id="container">

      <header id="header">
        <h1>App下载</h1>
        <!-- <a class="goBack" @click="$router.push({ path: '/' })">返回</a> -->
        <a class="goBack" href="javascript:void(0)" @click="routerBack"></a>
      </header>
            <div class="wrap" id="content">
                <div v-if="logoPic==''" class="logo">
                    <!--<span>彩票网</span>-->
                </div>
                <div v-else class="logo">
                    <!-- <img :src="logoPic" /> -->
                    <img src="../../../assets/images/base/logo.png" alt="" style="width: 70%;">
                </div>
                <div class="btn">
                    <a class="go-btn go-btn1" :href="containerWapUrl">{{$t('继续访问')}}WAP{{$t('手机端')}}</a>
                </div>
                <p class="tit">{{$t('温馨提示')}}：WAP{{$t('手机端直接点击链接按钮访问')}}</p>
                <div class="wap-text">{{$t('推荐您使用手机')}}APP{{$t('购彩')}},{{$t('请选择下载')}} <i class="fa fa-download"></i></div>
                <div class="btn min-btn">
                    <a :href="androidUrl" class="android"><i class="fa fa-android"></i><span>Android{{$t('下载')}}</span></a>
                </div>
                <div class="btn min-btn">
                    <a :href="iPhoneUrl" class="ios"><i class="fa fa-apple"></i><span>App Store{{$t('下载')}}</span></a>
                </div>
                <!--<div class="btn">-->
                    <!--<a href="https://www.jc163.cc" class="go-btn">返回PC端</a>-->
                <!--</div>-->
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        // el: '#content',
        name: "transfer",
        data() {
            return {
                containerWapUrl: "",
                androidUrl: "",
                iPhoneUrl: "",
                logoPic: '',
                //containerPcUrl:'',
            }
        },
        created: function() {
                var url = window.parent.location.href;
                if(url != ""&&url.indexOf("?")!=-1) {
                    var str=url.split("?")[1];
                    if(str.indexOf("/")!=-1){
                        localStorage.promotionCode = str.split("/")[0];
                    }else{
                        localStorage.promotionCode = str;
                    }

                    if(localStorage.promotionCode=='undefined'){
                        localStorage.removeItem('promotionCode');
                    }
                    if(localStorage.promotionCode){
                        this.$router.push({name:"register"});
                    }
                }

            localStorage.isTransfer = 1;
            var tuiguan_codeurl = location.search;
            var _this = this;
            var sendRequest = {
                type: "post",
                url: "/commonAPI/privacy/getSysConfigureResult",
                data: {},
                success: function(data) {
                    //console.log(data);
                    if(data.code == 200) {
                        _this.androidUrl = data.body.androidEditionDownloadUrl;
                        _this.iPhoneUrl = data.body.iosEditionDownloadUrl;
                        //_this.containerPcUrl = data.body.promotionUrl;
                        if(parseInt(data.body.wapSkipShowStatus) == 1) {
                            _this.containerWapUrl = "index.html" + tuiguan_codeurl;
                        } else {
                            _this.containerWapUrl = "#";
                        }
                        localStorage.setItem('config', JSON.stringify(data.body));
                        if(data.body.wapPageLogoConfigure == undefined) {
                            _this.logoPic = '';
                        } else {
                            _this.logoPic = data.body.wapPageLogoConfigure;
                        }
                    }
                },
            };
            this.base.callCommonApi(sendRequest);
        },
        methods: {
      routerBack: function() {
        // if (localStorage.turnPathName && localStorage.turnPathName!="login"){
        // this.$router.push({ name: localStorage.turnPathName });
        // if(){

        // }else{
        localStorage.baseIndex == 4 ? localStorage.baseIndex = 1 : "";
        //          this.$router.go(-1)
        this.$router.push({
          name: "index"
        });
        // }

        // }else{
        //   this.$router.push({ name: "index" });
        // }

      },
    },
    }
</script>

<style scoped>
    /*-- 清除原属性 --*/

    html,
    body,
    div,
    p {
        box-sizing: border-box;
    }

    html,
    body {
        height: 100%;
    }

    html,
    body,
    div,
    span,
    applet,
    object,
    iframe,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    blockquote,
    pre,
    a,
    abbr,
    acronym,
    address,
    big,
    cite,
    code,
    del,
    dfn,
    em,
    img,
    ins,
    kbd,
    q,
    s,
    samp,
    small,
    strike,
    strong,
    sub,
    sup,
    tt,
    var,
    b,
    u,
    i,
    center,
    dl,
    dt,
    dd,
    ol,
    ul,
    li,
    fieldset,
    form,
    label,
    legend,
    table,
    caption,
    tbody,
    tfoot,
    thead,
    tr,
    th,
    td,
    article,
    aside,
    canvas,
    details,
    figcaption,
    figure,
    footer,
    header,
    hgroup,
    menu,
    nav,
    section,
    summary,
    time,
    mark,
    audio,
    video,
    input {
        margin: 0;
        padding: 0;
        border: none;
        outline: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
    }

    html,
    body,
    form,
    fieldset,
    p,
    div,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        -webkit-text-size-adjust: none;
    }

    article,
    aside,
    details,
    figcaption,
    figure,
    footer,
    header,
    hgroup,
    menu,
    nav,
    section {
        display: block;
    }

    body {
        font-family: 'Helvetica Neue', Arial, "Hiragino Sans GB", 'Microsoft YaHei', sans-serif;
        -webkit-touch-callout: none;
        -webkit-text-size-adjust: none;
        -moz-text-size-adjust: none;
        -ms-text-size-adjust: none;
        -o-text-size-adjust: none;
        text-size-adjust: none
    }

    a {
        color: #666;
        text-decoration: none;
    }

    a:hover {
        /*color: #666;*/
        text-decoration: none;
    }

  .goBack {
    /* background: url('../../../assets/images/left.png') no-repeat .875rem center;
    color: #fff;
    position: absolute;font-size: 1rem;
    line-height: 2.67rem;
    left: 0; */
    padding-left: 2.5rem;
    background-size: .8rem;
  }

    img {
        max-width: 100%;
    }

    .wrap {
        height: 100%;
        overflow: auto;
        color: #999;
        padding: 2em;
    }

    .logo {
        margin: 28px auto 18px;
        text-align: center;
        font-size: 2.5rem;
        color: #E4393C;
        font-family: cursive;
        font-weight: 700;
        min-height: 4rem;
    }

    .btn {
        width: 239px;
        margin: 0 auto;
    }

    .btn a {
        display: block;
    }

    .go-btn {
        background: #e59f4d;
        text-align: center;
        border-radius: 27px;
        color: #fff;
        padding: 10px;
    }

    .go-btn1 {
        fong-size: 15%;
        padding: 15px;
    }

    .tit {
        font-size: 80%;
        text-align: center;
        margin: 20px 0 40px;
    }

    .wap-text {
        text-align: center;
        font-size: 80%;
        padding-bottom: 10px;
    }

    .min-btn {
        margin-bottom: 2em;
    }

    .min-btn .fa {
        font-size: 2em;
    }

    .min-btn span {
        font-size: 1.4em;
        margin-left: 0.5em;
    }

    .android {
        border: 2px solid #fff;
        text-align: center;
        border-radius: 27px;
        color: #fff;
        padding: 10px;
        background: #e59f4d;
    }

    .ios {
        border: 2px solid #fff;
        text-align: center;
        border-radius: 27px;
        color: #fff;
        padding: 10px;
        background: #242e77;
    }

    .wap-foot {
        position: fixed;
        bottom: 0px;
        width: 100%;
        text-align: center;
        background: #fff;
        line-height: 3.5em;
    }
    .custome-ba142b #container{
        background: url(../../../assets/images/base/black_bg.png);
        background-size: 100% 100%;
        height: 100%;
    }
    .custome-ba142b .tit, .custome-ba142b .wap-text, .custome-ba142b .varietyList li a .content .title{
        color: #fff;
    }
    .wrap{
        margin-top: 2.67rem;
    }
</style>
