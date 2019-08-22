<template>
    <div>
        <div id="container">
            <div id="main" v-if="topChange==0">
                <!--头部-->
                <header id="header">
                    <h1>{{$t("promotions")}}</h1>
                    <a class="goBack" href="javascript:void(0)" @click="routerBack()"></a>
                </header>
                <!--列表内容-->
                <div class="inner">
                    <ul class="inner-ul" v-if="!nodata">
                        <li class="list" v-for="(item,index) in imgs" :id="item.id">
                            <a href="javascript:;" @click="detailOpen(index)">
                            <div class="list-pic">
                                <p>
                                    <img :src="item.titleUrl" height="60"/>
                                </p>

                                    <div class="detail">
                                        {{$t("seeDetails")}}
                                        <i class="iconfont1 right">&#xe62b;</i>

                                    </div>
                            </div>
                            </a>


                        </li>
                    </ul>
                    <div class="noMessage" v-else>
                        <img width="100%" src="../../assets/images/background.png" alt="" srcset="">
                    </div>
                    <!--加载更多-->
                    <div class="has-more"
                         style="text-align: center;line-height: 40px; #666;height: .6rem"></div>
                </div>
            </div>
            <div id="main" v-if="topChange==1">
                <header id="header">
                    <h1>{{$t("detailsOfTheEvent")}}</h1>
                    <a class="goBack" href="javascript:void(0)" @click="detailClose()">{{$t("back")}}</a>
                </header>
                <div>
                    <h1 class="title">{{details.title}}</h1>
                    <div class="contents">
                        <img :src="details.contentUrl" />
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script src="../../assets/js/myCenter/activity.js"></script>

<style scoped>

    @font-face {
        font-family: 'iconfont1';
        /*src: url('fonts/iconfont.eot');*/
        src: url('../../style/fonts/iconfont.woff') format('woff');
        /*url('fonts/iconfont.eot?#iefix') format('embedded-opentype'),*/
        /*url('fonts/iconfont.ttf') format('truetype'),*/
        /*url('fonts/iconfont.svg#iconfont') format('svg');*/
    }

    .iconfont1 {
        font-family: "iconfont1" !important;
        font-size: 18px;
        font-style: normal;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;
    }
    .right { float: right ;}
    .contents { margin-top: 5px; }
    /* .inner{
        margin-top: 44px;
    } */
    .inner-ul {
        padding: 0.5rem;
    }

    .inner-ul li{
        margin-top: 1rem;
    }
    /*内容列表*/
    .icon-yuanquan2 {
        width: 5px;
        height: 6px;
        border: 2px #df060d solid;
        -webkit-border-radius: 5px;
        display: inline-block
    }

    /*.inner {*/
        /*background-color: #F6F2F2;*/
    /*}*/

    .title {
        margin-top: 10px;
        text-align: center;
        font-weight: 700;
        font-size: 1.3rem;
        line-height: 1.3rem;
    }

    .list {
        /*padding:5px;*/
        /*box-sizing: border-box;*/
        padding: .1rem .15rem;
        margin: .15rem;
        border: .01rem solid #ddd;
        background: #fff;
        color: #666;
        border-radius: .04rem;
    }

    .list-title {
        line-height: 30px;
        color: #666666;
    }

    .list-pic  {
        padding: .15rem;
    }

    .list-pic  p{
        height: 8rem;
        padding: 0.5rem;
    }
    .list-pic p img{
        width: 100%;
        height: 100%;

    }

    .contents img {
        width: 100%;
        height: 100%;

    }

    .detail {
        padding: 0.5rem;
        border-top: 0.01rem solid #ddd;
    }

    .hide {
        display: none;
    }

    .noMessage {
        margin: 19%;
        text-align: center;
        color: #3F3F3F;
        line-height: 1rem;
        font-size: 1rem;
    }
    .custome-ba142b #container{
		background: url(../../assets/images/base/black_bg.png);
		background-size: 100% 100%;
		/* height: 100%; */
	}

</style>
