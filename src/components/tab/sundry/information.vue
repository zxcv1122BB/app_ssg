<template>
  <div>
    <div id="container">
        <div>
          <!--页头资讯栏-->
    <header class="header">
        <section  class="header-information">
            <a href="javascript:;">{{$t('购彩')}}</a>
            <h1>{{$t('彩票资讯')}}</h1>
            <a href="javascript:;">{{$t('开奖公告')}}</a>
        </section>
    </header>
    <!--滚动导航条-->
    <nav>
        <div class="swiper-container swiper-container-horizontal swiper-container-free-mode  nav-content">
            <ul class="swiper-wrapper">
                <li class="swiper-slide swiper-slide-active">
                    <a href="javascript:;" class="headline">{{$t('头条')}}</a>
                </li>
                <li class="swiper-slide swiper-slide-next" >
                    <a href="javascript:;">{{$t('行业')}}</a>
                </li>
                <li class="swiper-slide swiper-slide-next" >
                    <a href="javascript:;">{{$t('动态')}}</a>
                </li>
                <li class="swiper-slide swiper-slide-next" >
                    <a href="javascript:;">{{$t('双色球')}}</a>
                </li>
                <li class="swiper-slide swiper-slide-next" >
                    <a href="javascript:;">{{$t('大乐透')}}</a>
                </li>
                <li class="swiper-slide swiper-slide-next" >
                    <a href="javascript:;">{{$t('竞技彩')}}</a>
                </li>
                <li class="swiper-slide swiper-slide-next" >
                    <a href="javascript:;">{{$t('篮彩')}}</a>
                </li>
                <li class="swiper-slide swiper-slide-next" >
                    <a href="javascript:;">{{$t('彩市新闻')}}</a>
                </li>
                <li class="swiper-slide swiper-slide-next" >
                    <a href="javascript:;">{{$t('易眼金睛')}}</a>
                </li>
                <li class="swiper-slide swiper-slide-next" >
                    <a href="javascript:;">{{$t('福彩其他')}}</a>
                </li>
                <li class="swiper-slide swiper-slide-next" >
                    <a href="javascript:;">{{$t('体彩其他')}}</a>
                </li>
                <li class="swiper-slide swiper-slide-next" >
                    <a href="javascript:;">{{$t('胜负彩')}}</a>
                </li>
                <li class="swiper-slide swiper-slide-next" >
                    <a href="javascript:;">{{$t('国际足球')}}</a>
                </li>
                <li class="swiper-slide swiper-slide-next" >
                    <a href="javascript:;">{{$t('中国足球')}}</a>
                </li>
                <li class="swiper-slide swiper-slide-next" >
                    <a href="javascript:;">NBA</a>
                </li>
                <li class="swiper-slide swiper-slide-next" >
                    <a href="javascript:;">CBA</a>
                </li>
                <li class="swiper-slide swiper-slide-next" >
                    <a href="javascript:;">{{$t('滚动')}}</a>
                </li>

            </ul>
        </div>
        <!--导航按钮-->
        <span class="open-button  open-color">
            <i class="belowBefault below"></i>
        </span>
    </nav>
    <!--导航按钮-展开内容-->
    <div class="open-box">
        <!--我的频道-->
        <div class="channel">
            <div class="channel-box">
                <div class="channel-title-box ">
                    <p>{{$t('我的频道')}}</p>
                    <span class="sprt-delete">{{$t('排序删除')}}</span>
                    <span class="open-button">
                        <i class="belowUp belowBefault"></i>
                    </span>
                </div>
            </div>
            <!--频道内容-->
            <div class="channel-content">
                <ul>
                    <li class="item Sc" data-id="" >{{$t('头条')}}</li>
                    <li class="item" data-id="">{{$t('行业')}}</li>
                    <li class="item" data-id="">{{$t('动态')}}</li>
                    <li class="item" data-id="">{{$t('双色球')}}</li>
                    <li class="item" data-id="">{{$t('大乐透')}}</li>
                    <li class="item" data-id="">{{$t('竞技彩')}}</li>
                    <li class="item" data-id="">{{$t('篮彩')}}</li>
                    <li class="item" data-id="">{{$t('滚动')}}</li>
                    <li class="item" data-id="">{{$t('易眼金睛')}}</li>
                    <li class="item" data-id="">{{$t('福彩其他')}}</li>
                    <li class="item" data-id="">{{$t('体彩其他')}}</li>
                    <li class="item" data-id="">{{$t('胜负彩')}}</li>
                    <li class="item" data-id="">{{$t('国际足球')}}</li>
                    <li class="item" data-id="">{{$t('中国足球')}}</li>
                    <li class="item" data-id="">NBA</li>
                    <li class="item" data-id="">CBA</li>
                    <li class="item" data-id=""> 彩市新闻</li>
                </ul>
            </div>
        </div>
        <!--添加频道-->
        <div class="add-channel">
            <p class="add">{{$t('需要添加的频道')}}</p>
            <div class="channel-content">
                <ul>
                    <li class="item" data-id="" >11选5</li>
                    <li class="item" data-id="">{{$t('时时彩')}}</li>
                    <li class="item" data-id="">快3</li>
                    <li class="item" data-id="">快乐8</li>
                    <li class="item" data-id="">{{$t('快乐彩')}}</li>
                    <li class="item" data-id="">{{$t('快乐扑克')}}</li>
                    <li class="item" data-id="">{{$t('快乐十分')}}</li>
                </ul>
            </div>
        </div>
    </div>
    <!--轮播-->
    <article>
        <div class="swiper-container swiper-container-horizontal lottery-Carousel">
            <ul class="swiper-wrapper">
                <li class="swiper-slide swiper-slide-active">
                    <a href="javascript:;">
                        <img src="http://pimg1.126.net/caipiao_info/images/headFigure/zxWapIndex/1503883393812_1.jpg">
                    </a>
                </li>
                <li class="swiper-slide swiper-slide-next">
                    <a href="javascript:;">
                        <img src="http://pimg1.126.net/caipiao_info/images/headFigure/zxWapIndex/1503883393812_1.jpg">
                    </a>
                </li>
                <li class="swiper-slide">
                    <a href="javascript:;">
                        <img src="http://pimg1.126.net/caipiao_info/images/headFigure/zxWapIndex/1503883393812_1.jpg">
                    </a>
                </li>
                <li class="swiper-slide">
                    <a href="javascript:;">
                        <img src="http://pimg1.126.net/caipiao_info/images/headFigure/zxWapIndex/1503883393812_1.jpg">
                    </a>
                </li>
                <li class="swiper-slide">
                    <a href="javascript:;">
                        <img src="http://pimg1.126.net/caipiao_info/images/headFigure/zxWapIndex/1503883393812_1.jpg">
                    </a>
                </li>
                <li class="swiper-slide">
                    <a href="javascript:;">
                        <img src="http://pimg1.126.net/caipiao_info/images/headFigure/zxWapIndex/1503883393812_1.jpg">
                    </a>
                </li>
                <li class="swiper-slide">
                    <a href="javascript:;">
                        <img src="http://pimg1.126.net/caipiao_info/images/headFigure/zxWapIndex/1503883393812_1.jpg">
                    </a>
                </li>
                <li class="swiper-slide">
                    <a href="javascript:;">
                        <img src="http://pimg1.126.net/caipiao_info/images/headFigure/zxWapIndex/1503883393812_1.jpg">
                    </a>
                </li>
                <li class="swiper-slide">
                    <a href="javascript:;">
                        <img src="http://pimg1.126.net/caipiao_info/images/headFigure/zxWapIndex/1503883393812_1.jpg">
                    </a>
                </li>
                <li class="swiper-slide">
                    <a href="javascript:;">
                        <img src="http://pimg1.126.net/caipiao_info/images/headFigure/zxWapIndex/1503883393812_1.jpg">
                    </a>
                </li>
            </ul>
        </div>
    </article>
    <!--app链接-->
    <div class="main cutting-line">
        <ul>
            <li class="newsItem">
                <a href="javascript:;" class="newslink app-link">
                    <span class="newslink-span-first">
                       <img src="http://img6.cache.netease.com/sports/2015/1/9/201501091046302b56a.jpg">
                    </span>
                    <span class="newslink-span-second">
                        <span class="app-link-text">{{$t('老是不中奖')}}，叫教你100%中奖方法</span>
                        <p class="app-link-ptext">{{$t('不中奖不要钱')}},{{$t('点击查看')}}</p>
                        <i class="generalize">{{$t('推广')}}</i>
                    </span>
                </a>
            </li>
        </ul>
    </div>
    <!--彩市头条-->
    <div class="main cutting-line">
        <!--彩市头条标题-->
        <div class="market-headline">
            <h2>
                {{$t('彩市头条')}}
                <a class="more" href="javascript:;">更多
                    <i class="arrow"></i>
                </a>
            </h2>
        </div>
       <!-- 新闻条目-->
        <ul class="newsBox">
            <li class="newsItem">
                <a href="javascript:;" class="newslink na-commonality">
                    <span class="newslink-span-first">
                       <img src="http://img6.cache.netease.com/sports/2015/1/9/201501091046302b56a.jpg">
                    </span>
                    <span class="newslink-span-second">
                        <h3>{{$t('昨夜大乐透开头奖再空开')}}</h3>
                        <p class="Pleft">8月28日，{{$t('体彩大乐透')}} 第17100期开奖，{{$t('头奖未中出')}}，二</p>
                        <i class="time">07:36</i>
                    </span>
                </a>
            </li>
            <li class="newsItem">
                <a href="javascript:;" class="newslink na-commonality">
                    <span class="newslink-span-first">
                       <img src="http://img6.cache.netease.com/sports/2015/1/9/201501091046302b56a.jpg">
                    </span>
                    <span class="newslink-span-second">
                        <h3>双色球100期头奖16注624万</h3>
                        <p class="Pleft">8月27日晚，{{$t('中国福利彩票双色球游戏进行第')}}2017100期开</p>
                        <i class="generalize">{{$t('推广')}}</i>
                    </span>
                </a>
            </li>
        </ul>
    </div>
    <!--网易独家-->
    <div class="main cutting-line">
        <div class="market-headline">
            <h2>
                {{$t('网易独家')}}
            </h2>
        </div>
        <div>
            <div class="swiper-container swiper-container-horizontal swiper-container-free-mode  exclusive-content">
                <ul class="swiper-wrapper">
                    <li class="swiper-slide swiper-slide-active">
                        <a href="javascript:;" class="exclusive">
                            <img src="http://pimg1.126.net/caipiao_info/images/headFigure/caipiaodashi/1431938826782_1.png">
                            <span>{{$t('足彩大富翁')}}</span>
                        </a>
                    </li>
                    <li class="swiper-slide swiper-slide-next" >
                        <a href="javascript:;" class="exclusive">
                            <img src="http://pimg1.126.net/caipiao_info/images/headFigure/caipiaodashi/1431938826782_1.png">
                            <span>{{$t('足彩大富翁')}}</span>
                        </a>
                    </li>
                    <li class="swiper-slide swiper-slide-next" >
                        <a href="javascript:;" class="exclusive">
                            <img src="http://pimg1.126.net/caipiao_info/images/headFigure/caipiaodashi/1431938826782_1.png">
                            <span>{{$t('足彩大富翁')}}</span>
                        </a>
                    </li>
                    <li class="swiper-slide swiper-slide-next" >
                        <a href="javascript:;" class="exclusive">
                            <img src="http://pimg1.126.net/caipiao_info/images/headFigure/caipiaodashi/1431938826782_1.png">
                            <span>{{$t('足彩大富翁')}}</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <!--网易原创-->
    <div class="main cutting-line">
        <div class="market-headline">
            <h2>
                {{$t('网易原创')}}
            </h2>
        </div>
        <div>
            <div class="swiper-container swiper-container-horizontal swiper-container-free-mode  exclusive-content original-content">
                <ul class="swiper-wrapper">
                    <li class="swiper-slide swiper-slide-active">
                        <a href="javascript:;" class="exclusive">
                            <img src="http://pimg1.126.net/caipiao_info/images/headFigure/caipiaodashi/1432023013725_1.png">
                            <span>{{$t('辉哥说彩')}}</span>
                        </a>
                    </li>
                    <li class="swiper-slide swiper-slide-next" >
                        <a href="javascript:;" class="exclusive">
                            <img src="http://pimg1.126.net/caipiao_info/images/headFigure/caipiaodashi/1432023013725_1.png">
                            <span>{{$t('辉哥说彩')}}</span>
                        </a>
                    </li>
                    <li class="swiper-slide swiper-slide-next" >
                        <a href="javascript:;" class="exclusive">
                            <img src="http://pimg1.126.net/caipiao_info/images/headFigure/caipiaodashi/1432023013725_1.png">
                            <span>{{$t('辉哥说彩')}}</span>
                        </a>
                    </li>
                    <li class="swiper-slide swiper-slide-next" >
                        <a href="javascript:;" class="exclusive">
                            <img src="http://pimg1.126.net/caipiao_info/images/headFigure/caipiaodashi/1432023013725_1.png">
                            <span>{{$t('辉哥说彩')}}</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <!--网易专家-->
    <div  class="main cutting-line">
        <div class="market-headline">
            <h2>
                {{$t('网易专家')}}
                <a class="more" href="javascript:;">{{$t('全部')}}
                    <i class="arrow"></i>
                </a>
            </h2>
        </div>
        <div>
            <div class="swiper-container swiper-container-horizontal swiper-container-free-mode  exclusive-content original-content">
                <ul class="swiper-wrapper">
                    <li class="swiper-slide swiper-slide-active">
                        <a href="javascript:;" class="exclusive">
                            <img src="http://pimg1.126.net/caipiao_info/images/headFigure/caipiaodashi/1441608213427_1.jpg">
                            <span>{{$t('永春彩盘')}}</span>
                        </a>
                    </li>
                    <li class="swiper-slide swiper-slide-next" >
                        <a href="javascript:;" class="exclusive">
                            <img src="http://pimg1.126.net/caipiao_info/images/headFigure/caipiaodashi/1441608213427_1.jpg">
                            <span>{{$t('永春彩盘')}}</span>
                        </a>
                    </li>
                    <li class="swiper-slide swiper-slide-next" >
                        <a href="javascript:;" class="exclusive">
                            <img src="http://pimg1.126.net/caipiao_info/images/headFigure/caipiaodashi/1441608213427_1.jpg">
                            <span>{{$t('永春彩盘')}}</span>
                        </a>
                    </li>
                    <li class="swiper-slide swiper-slide-next" >
                        <a href="javascript:;" class="exclusive">
                            <img src="http://pimg1.126.net/caipiao_info/images/headFigure/caipiaodashi/1441608213427_1.jpg">
                            <span>{{$t('永春彩盘')}}</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <!--尾部-->
    <footer>
        <div class="footer-friendlink">
            <ul>
                <li>
                    <a href="javascript:;">{{$t('资讯首页')}}</a>
                </li>
                <li>
                    <a href="javascript:;">{{$t('双色球')}}</a>
                </li>
                <li>
                    <a href="javascript:;">{{$t('大乐透')}}</a>
                </li>
                <li>
                    <a href="javascript:;">{{$t('竞技场')}}</a>
                </li>
                <li>
                    <a href="javascript:;">{{$t('易眼金睛')}}</a>
                </li>
                <li>
                    <a href="javascript:;">{{$t('彩市新闻')}}</a>
                </li>
                <li>
                    <a href="javascript:;">{{$t('福彩其他')}}</a>
                </li>
                <li>
                    <a href="javascript:;">{{$t('体彩其他')}}</a>
                </li>
                <li>
                    <a href="javascript:;">{{$t('胜负彩')}}</a>
                </li>
                <li>
                    <a href="javascript:;">{{$t('篮彩')}}</a>
                </li>
            </ul>
            <p class="copye">{{$t('公司版权所有')}} ©2011-2017</p>
        </div>
    </footer>
    <!--返回顶部-->
    <span class="goTop"><i></i></span>
        </div>
    </div>
  </div>
</template>

<script src="../../../assets/js/sundry/information.js"></script>

<style src="../../../style/sundry/information.css" scoped></style>
