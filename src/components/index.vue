<template>
  <div class="mui-fullscreen" @click="isShowLang = false">
     <div id="canvasWrapper" class="mui-off-canvas-wrap mui-draggable">
    <aside id="canvasSide" class="mui-off-canvas-left mui-transitioning">
      <!-- popArea(2); -->
				<div id="canvasSideScroll" class="mui-scroll-wrapper" @touchstart="touchs_css($event)"  @touchmove="touchm_css($event)" @touchend="touchm_css($event)">
					<div class="mui-scroll">
						<div class="title" style="margin-bottom: 35px;color: #007DF6;font-size: 28px;margin-top: 25px;padding-left: 12px;font-weight: 300;">SSG
							彩票</div>
						<ul class="mui-table-view-chevron mui-table-view-inverted">
							<li class="mui-table-view-cell" @click='skip_newUrl(0, "/myCenter", "")'>
								<a class="mui-navigate-right">

									会员中心
								</a>
							</li>
               <!-- v-if="userType&&userType==1" -->
              <li class="mui-table-view-cell" v-if="userType&&userType==1" @click='showAgency'>
								<a class="mui-navigate-right">
                  代理中心
								</a>
							</li>
							<li class="mui-table-view-cell" @click='togodepositFile'>
								<a class="mui-navigate-right">
									在线充值
								</a>
							</li>
							<li class="mui-table-view-cell" @click="clickEnchash">
								<a class="mui-navigate-right">
									在线取款
								</a>
							</li>
							<li class="mui-table-view-cell" @click='onlineCustomerServiceSkip(datas.onlineSys_config1)'>
								<a class="mui-navigate-right">
									{{$t('在线客服')}}
								</a>
							</li>
							<li class="mui-table-view-cell"  @click='act'>
								<a class="mui-navigate-right">
									优惠活动
								</a>
							</li>
							<!-- <li class="mui-table-view-cell">
								<a class="mui-navigate-right" href="aaa.html">
									结果走势
								</a>
							</li> -->
              <li class="mui-table-view-cell"  @click="togodownload">
                <a class="mui-navigate-right">
                  下载 APP
                </a>
              </li>
              <li class="mui-table-view-cell">
                <a class="mui-navigate-right" href="http://ssg97.webnode.tw/">
                  {{$t('合营简介')}}
                </a>
              </li>
							<!-- <li class="mui-table-view-cell">
								<a class="mui-navigate-right" href="aaa.html">
									关于我们
								</a>
							</li> -->
						</ul>
					</div>
          <!-- <div class="leftBtn">
            <span   @click="popArea(2);">
              <img src="../assets/images/base/close.png" width="16" alt="">
            </span>
          </div> -->
				</div>
			</aside>

    <!--底部按钮-->
    <div class="content-wrap  mui-transitioning" @click="hideCanvasSideScroll" :style="wStyle">
      <header id="header" v-show="baseIndex!=4" style="background-color:#242329;">
        <h1 class="header-title" v-cloak><img src="../assets/images/base/logo.png" alt=""></h1>
        <!-- <div class="logo"></div> -->
        <a href="javascript:void(0)" class="header-left" v-show="!userName" @click="register" style="display: inherit;">{{$t('注册')}}</a>
        <a href="javascript:void(0)" class="header-right" v-show="!userName" @click="login">{{$t('登录')}}</a>
        <!-- <a href="javascript:void(0)" class="username" @click='baseIndex=4'>{{userName}}</a> -->
        <a href="javascript:void(0)" class="loginOut" v-if="userName" @click="loginOut">{{$t('退出')}}</a>
      </header>

      <div class="download-wrap" v-if="appDownloadShow==1&&!app_flag">
        <a class="close" @click="DownloadShow">×</a>
        <div class="info" @click="togodownload">
            <div class="logo" style="width:100%;height:100%;" v-if="logoPic!=''"><img :src="logoPic"/></div>
            <div class="logo" v-else></div>
        </div>
          <!-- <div>
            <h3>{{webName}}</h3>
            <p>下载手机APP,多重好礼等你拿!</p></div>
        </div>
        <a class="download" @click="togodownload">
          立即下载
        </a> -->
      </div>

      <div id="container" class="container">
            <!--轮播-->
            <!-- <div class="mui-slider" style="margin-top: 2.67rem;">
                <div class="mui-slider-group mui-slider-loop">
                  <div v-if='imgs.length!=0' class="mui-slider-item mui-slider-item-duplicate">
                    <a href="javascript:void(0)"
                      @click="click_href(imgs[imgs.length-1].destinationUrl,imgs[imgs.length-1].title)">
                      <img :src="imgs[imgs.length-1].picture_url" :style="nowTitleHeight" :class="{'container':true,'disappear':disappear}"/></a>
                  </div>
                  <div class="mui-slider-item" :key="index" v-for="(img,index) in imgs">
                    <a href="javascript:void(0)" @click="click_href(img.destinationUrl,img.title)">
                      <img :src="img.picture_url" :style="nowTitleHeight" :class="{'container':true,'disappear':disappear}"/>
                    </a>
                  </div>
                  <div v-if='imgs.length!=0' class="mui-slider-item mui-slider-item-duplicate">
                    <a href="javascript:void(0)" @click="click_href(imgs[0].destinationUrl,imgs[0].title)"><img
                      :src="imgs[0].picture_url" :style="nowTitleHeight" :class="{'container':true,'disappear':disappear}"/></a>
                  </div>
                </div>
                <div class="mui-slider-indicator">
                  <div class="mui-indicator mui-active"></div>
                  <div :key="index" v-for='(item,index) in imgs' :class="index<imgs.length-1?'mui-indicator':'mui-indicator mHide'"></div>
                </div>
              </div> -->
            <div style="position:relative;top:0">
              <div class="navList">
                  <ul>
                    <li @click="showHotArea(9,'走势')"><span class="exp">{{$t('走势')}}</span></li>
                    <li @click="togodepositFile"><span class="exp">{{$t('充值')}}</span></li>
                    <li @click="clickEnchash"><span class="exp">{{$t('提款')}}</span></li>
                    <li @click='skip_newUrl(0, "/myCenter", "")'>
                      <span class="exp">{{$t('我的')}}</span>
                    </li>
                    <li>
                      <div>
                        <span class="exp lang" @click.stop="checkWord($i18n.locale === 'cn' ? 'tr' : 'cn')" :data-key="$i18n.locale">{{$t('word')}}</span>
                        <!-- <div class="check-word" v-if="isShowLang">
                          <span @click.stop="checkWord('cn')">简体</span>
                          <span @click.stop="checkWord('tr')">繁体</span>
                        </div> -->
                      </div>
                    </li>
                    <li>
                      <a href="https://www.iqiyi.com/" class="exp"><i class='video-icon'></i>{{$t('影音')}}</a>
                    </li>


                  </ul>
                </div>
                  <!--支持循环，需要重复图片节点-->
            <div class="slider" style="z-index: 1;" >
							<ul class="slider-main">
								<li :key="index" v-for='(item,index) in imgs' @click="click_href(item.destinationUrl,item.title)">
									<img :src="item.picture_url" alt="">
								</li>
							</ul>
						</div>
        <div id="main" :class="baseIndex==2?'deep':''">
          <div id="pullrefresh">



            <div v-if="baseIndex==1" key="one" id="danmu">
              <!-- <div class="changeSkin" @click="skin_color()"><span >切换主题</span></div> -->

              <!--滚动信息条-->
              <div class="msg">
                <i class="iconfont icon-gonggao laba"></i>
                <div v-if='contents.length==0' class="scroll">
                  <ul class="scrollContent">
                    <li :key="index" v-for='(item,index) in contents'>
                      <a href="javascript:void(0)" v-cloak>{{item.title}}</a>
                    </li>
                  </ul>
                </div>
                <div v-else @click='togoannouncement' class="scroll">
                  <marquee v-html="scrollNotice.content" scrolldelay="150">{{scrollNotice.content}}</marquee>
                  <!--<div v-html="scrollNotice?scrollNotice.content:''">{{scrollNotice?scrollNotice.content:''}}</div>-->
                </div>
              </div>
              <div class="dm_content">
                <!-- <div class="navList">
                  <ul>
                    <li @click="showHotArea(9,'走势')"><img src="../assets/images/base/zoushi.png" style="width: 40px;"><span class="exp">{{$t('走势')}}</span></li>
                    <li @click="togodepositFile"><img src="../assets/images/base/cunkuan.png" style="width: 40px;"><span class="exp">{{$t('充值')}}</span></li>
                    <li @click="clickEnchash"><img src="../assets/images/base/tikuan.png" style="width: 40px;"><span class="exp">{{$t('提款')}}</span></li>

                    <li @click='skip_newUrl(0, "/myCenter", "")'>
                        <img src="../assets/images/base/wode.png" style="width: 40px;"><span class="exp" style="color:#fff;">{{$t('我的')}}</span>
                    </li>


                  </ul>
                </div> -->
                <div id="content" class="s_scroll">
								<div class="" style="position:  relative;z-index: 1;">
									<div style="width: 100%;margin: 0 auto;">
										<div class="mui-row" style="position:relative;height:1500px;">
											<div :class="['mui-col-xs-12 mui-col-sm-12 move',scrAct==1?'active':'']" @click="showHotArea(1,'全部彩种')">
												<img src="../assets/images/base/lot_bg1.png">
												<div class="font">
													<h2 style="font-size: 1.5rem;font-weight: 300;">{{$t('全部彩种')}}</h2>
													<p class="text">All Lottery</p>
													<p class="add">+</p>
												</div>
											</div>
                      <div :class="['mui-col-xs-12 mui-col-sm-12 move',scrAct==19?'active':'']" @click="showHotArea(19,'收藏')">
												<img src="../assets/images/base/lot_bg9.png">
												<div class="font">
													<h2 style="font-size: 1.5rem;font-weight: 300;">{{$t('已收藏')}}</h2>
													<p class="text">All Collect</p>
													<p class="add">+</p>
												</div>
											</div>
											<div :class="['mui-col-xs-12 mui-col-sm-12 move',scrAct==2?'active':'']" @click="showHotArea(2,'热门彩')">
												<img src="../assets/images/base/lot_bg2.png">
												<div class="font">
													<h2 style="font-size: 1.5rem;font-weight: 300;">{{$t('热门彩')}}</h2>
													<p class="text">Hot Lottery</p>
													<p class="add">+</p>
												</div>
											</div>
											<div :class="['mui-col-xs-12 mui-col-sm-12 move',scrAct==3?'active':'']" @click="showHotArea(3,'时时彩')">
												<img src="../assets/images/base/lot_bg3.png">
												<div class="font">
													<h2 style="font-size: 1.5rem;font-weight: 300;">{{$t('时时彩')}}</h2>
													<p class="text">SSC</p>
													<p class="add">+</p>
												</div>
											</div>
											<div :class="['mui-col-xs-12 mui-col-sm-12 move',scrAct==4?'active':'']" @click="showHotArea(4,'快3')">
												<img src="../assets/images/base/lot_bg4.png">
												<div class="font">
													<h2 style="font-size: 1.5rem;font-weight: 300;">快3</h2>
													<p class="text">K3</p>
													<p class="add">+</p>
												</div>
											</div>
											<div :class="['mui-col-xs-12 mui-col-sm-12 move',scrAct==5?'active':'']" @click="showHotArea(5,'11选5')">
												<img src="../assets/images/base/lot_bg5.png">
												<div class="font">
													<h2 style="font-size: 1.5rem;font-weight: 300;">11选5</h2>
													<p class="text">11X5</p>
													<p class="add">+</p>
												</div>
											</div>
											<div :class="['mui-col-xs-12 mui-col-sm-12 move',scrAct==6?'active':'']" @click="showHotArea(6,'PCDD')">
												<img src="../assets/images/base/lot_bg6.png">
												<div class="font">
													<h2 style="font-size: 1.5rem;font-weight: 300;">PC蛋蛋</h2>
													<p class="text">PCDD</p>
													<p class="add">+</p>
												</div>
											</div>
                      <div :class="['mui-col-xs-12 mui-col-sm-12 move',scrAct==7?'active':'']" @click="showHotArea(7,'快乐十分')">
												<img src="../assets/images/base/lot_bg7.png">
												<div class="font">
													<h2 style="font-size: 1.5rem;font-weight: 300;">{{$t('快乐十分')}}</h2>
													<p class="text">KL10F</p>
													<p class="add">+</p>
												</div>
											</div>
                      <div :class="['mui-col-xs-12 mui-col-sm-12 move',scrAct==8?'active':'']" @click="showHotArea(8,'六合彩')">
												<img src="../assets/images/base/lot_bg8.png">
												<div class="font">
													<h2 style="font-size: 1.5rem;font-weight: 300;">{{$t('六合彩')}}</h2>
													<p class="text">LHC</p>
													<p class="add">+</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
              </div>


              <!-- <div id="allActivity">
                <div id="biaoImg" class="biaoFalse" @click="biaoImg">
                  <img id="biao"
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAABAUlEQVRYR+2XwQ3CMAxFvyeATWADuglskSscmx46AmxAWa+VamSJSFFJq4IUO4fmHClP389OQihkUSEc2ECmldgSUUukbdt93/eVc65b0xBZSuO9PwK4M/PLOXc1AWmapmLmJ4A9M99MQLz3F0kiJGACUtf1g4jOcRlUQUTKYRikFNXUBTWQICUAkfNrqYDEUs51RXaQqZQmICkpVUGWpLQAkXF9WjMpZU9WR8xLE6dQhKwBSNp3HMeOiHaqjqQOk4HGzDLaD2YDLRz86aakxFllnSuD+aW3JLFJIimJTUEEKEgMoDN5ocVlKuLxvPYKiPdlecVvIP8koPbT+xWuGEfe0MPJI6VdVAMAAAAASUVORK5CYII="/>
                </div>
                <div class="chat">
                  <div class="danmuSwitch">
                    <div v-if="!danmuFlag" @click="danMu(1)" class="open">
                      <i class="iconfont1">&#xe7bf;<span>{{$t('弹幕')}}</span></i>

                    </div>
                    <div v-else @click="danMu(0)" class="close">
                      <i class="iconfont1">&#xe607;<span>{{$t('弹幕')}}</span></i>

                    </div>
                  </div>
                  <div class="chatMes" @click="togoChat">
                    <div>
                      <i class="iconfont1">&#xe7e3;</i>
                    </div>
                    <div>{{$t('聊天室')}}</div>
                  </div>
                  <div class="sign" @click="togoSign">
                    <div>
                      <i class="iconfont1">&#xe60e;</i>
                    </div>
                    <div>{{$t('签到')}}</div>
                  </div>
                </div>
              </div> -->

              <div class="varietyList clearfix" style="display:none">
                <ul class="" v-cloak>
                  <li :key="index" v-for="(item,index) in hotArr">
                    <a href="javascript:void(0)" v-if="item.bet_url!=''"
                      @click='togocontentUrl(item.bet_url,item.gameID,item.pic_url,item.type_name_CN)'>
                      <div class="logo">
                        <img :src="'static/'+item.pic_url" width="50" height="50"/>
                      </div>
                      <div class="content">
                        <p v-cloak class="title">{{item.show_name}}</p>
                        <p class="timeName">{{item.deadlineStr?'距离封盘：'+item.deadlineStr:item.msg?item.msg:'距离封盘：--:--:--'}}</p>
                        <!-- <p class="timeName" v-else-if="item.msg">{{item.msg}}</p>
                        <p class="timeName" v-else-if="item.msg">{{item.msg}}</p> -->
                        <p class="time">活跃人数：{{item.num}}</p>
                      </div>
                    </a>
                    <a href="javascript:void(0)" v-else @click="popPrompt">
                      <img :src="item.pic_url" width="50" height="50"/>
                      <p v-cloak>{{item.show_name}}</p>
                    </a>
                  </li>
                </ul>
              </div>
              <!--底部链接导航-->
              <!-- <div class="bottom_nav" v-if="app_flag!=1">
                <div>
                  <a href="javascript:void(0)" class="c_2b5eb2"
                    @click="onlineCustomerServiceSkip(datas.onlineSys_config1)">{{$t('在线客服')}}</a>
                  <a :href="downUrl?downUrl:'javascript:;'" class="c_2b5eb2" @click="togodownload">下载APP</a>

                </div>
              </div> -->


              <!--底部动态图-->
              <!-- <div class="topSwipeWrap fixed_right_bottom topHiPos4 usertype" id="hongbaolaile"
                  @click='togohongbao'></div> -->

              <!--底部固定广告-->
              <!-- <div id="bottom-guanggao" class="hide" style="display: none;">
                <span class="close" @click="close_banner"></span>
              </div> -->
            </div>
            <!-- <div v-else-if="baseIndex==2" key="two">
              <div class="inner">
                <div class="shuzicai_nav" v-show="lottery_caizhong==1">
                  <div class="games">
                    <div class="tabs">
                      <div>
                        <div class="tabItem" @click="getGameIntro($event)">
                          <img src="../assets/images/qb.png" class="selectImg"/>
                          <p>{{$t('全部')}}</p>
                        </div>
                        <div class="tabItem" v-bind:key="index" v-for="(item,index) in gameKind" @click="getGameIntro($event,item.code)">
                          <img :src="'static/' + item.picUrl"/>
                          <p>{{item.name}}</p>
                        </div>


                      </div>

                    </div>

                  </div>
                </div>

              </div>
            </div> -->
            <!-- <div v-else-if="baseIndex==3" key="three">
              <div class="inner">
                <div class="money bg-theme-color">
                  <p class="money-title">
                    账户余额(RMB:{{coinUnit}})
                    <span class="iconfont icon-icon-eye-close" v-if="noView" @click="noView=false"></span>
                    <span class="iconfont icon-icon-eye-open" v-if="!noView" @click="noView=true"></span>
                  </p>
                  <p class="money-text" v-if="noView">{{$t('恭喜發財')}}</p>
                  <p class="money-text" v-if="!noView">{{coin}}</p>
                  <p class="winorlose" v-if="noView">今日输赢： ***{{coinUnit}}</p>
                  <p class="winorlose" v-if="!noView">今日输赢： {{winLoseCoin}}{{coinUnit}}</p>
                </div>
                <div class="card bg-public-deep-bgColor" @click='togodepositFile'>
                  <div class="card-content">
                    <div class="card-content-inner">
                      <span class="iconfont icon-zhifu"></span>
                      <span class="text">{{$t('充值')}}</span>
                      <svg data-v-0106caec="" data-v-4e994cc4="" type="ios-arrow-right" xmlns="http://www.w3.org/2000/svg"
                          width="24" height="24" viewBox="0 0 512 512" class="vux-x-icon vux-x-icon-ios-arrow-right">
                        <path data-v-0106caec="" data-v-4e994cc4=""
                              d="M160 115.4L180.7 96 352 256 180.7 416 160 396.7 310.5 256z"></path>
                      </svg>
                      <p>支持网银支付/支付宝/{{$t('微信')}}/QQ等支付方式</p>
                    </div>
                  </div>
                </div>
                <div class="card bg-public-deep-bgColor" @click="clickEnchash">
                  <div class="card-content">
                    <div class="card-content-inner">
                      <span class=" iconfont icon-yunongtongqukuanfuwu"></span>
                      <span class="text">{{$t('提现')}}</span>
                      <svg type="ios-arrow-right" xmlns="http://www.w3.org/2000/svg"
                          width="24" height="24" viewBox="0 0 512 512" class="vux-x-icon vux-x-icon-ios-arrow-right">
                        <path d="M160 115.4L180.7 96 352 256 180.7 416 160 396.7 310.5 256z"></path>
                      </svg>
                      <p>提现到银行卡，极速到账</p>
                    </div>
                  </div>
                </div>

                <div class="card bg-public-deep-bgColor" @click='togoRecharge()' >
                <div class="card-content">
                <div class="card-content-inner">
                <span class="iconfont1" style="font-size: 1.8rem;position: relative;top:1.8rem;color: #e04e3b">&#xe606;</span>
                <span class="text">{{$t('充值记录')}}</span>
                <svg  type="ios-arrow-right" xmlns="http://www.w3.org/2000/svg"
                width="24" height="24" viewBox="0 0 512 512" class="vux-x-icon vux-x-icon-ios-arrow-right">
                <path d="M160 115.4L180.7 96 352 256 180.7 416 160 396.7 310.5 256z"></path>
                </svg>
                <p>{{$t('查询账户充值金额记录')}}</p>
                </div>
                </div>
                </div>
                <div class="card bg-public-deep-bgColor" @click='togoPresent()'>
                <div class="card-content">
                <div class="card-content-inner">
                <span class="iconfont1" style="font-size: 1.5rem;position: relative;top:1.8rem;color: #9932cc;">&#xe60b;</span>
                <span class="text">{{$t('提现记录')}}</span>
                <svg  type="ios-arrow-right" xmlns="http://www.w3.org/2000/svg"
                width="24" height="24" viewBox="0 0 512 512" class="vux-x-icon vux-x-icon-ios-arrow-right">
                <path d="M160 115.4L180.7 96 352 256 180.7 416 160 396.7 310.5 256z"></path>
                </svg>
                <p>{{$t('查询账户取款金额记录')}}</p>
                </div>
                </div>
                </div>


                <div class="card bg-public-deep-bgColor" @click='togofootFundDetails'>
                  <div class="card-content">
                    <div class="card-content-inner">
                      <span class="iconfont icon-zhangdan"></span>
                      <span class="text">{{$t('账变记录')}}</span>
                      <svg type="ios-arrow-right" xmlns="http://www.w3.org/2000/svg"
                          width="24" height="24" viewBox="0 0 512 512" class="vux-x-icon vux-x-icon-ios-arrow-right">
                        <path d="M160 115.4L180.7 96 352 256 180.7 416 160 396.7 310.5 256z"></path>
                      </svg>
                      <p>查询账户金额变动，包括红包、充值、提现等</p>
                    </div>
                  </div>
                </div>


                <div class="card bg-public-deep-bgColor" @click='togoperfectUserInfo'>
                  <div class="card-content">
                    <div class="card-content-inner">
                      <span class="iconfont icon-iconset0291"></span>
                      <span class="text">{{$t('我的银行卡')}}</span>
                      <svg type="ios-arrow-right" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                          viewBox="0 0 512 512" class="vux-x-icon vux-x-icon-ios-arrow-right">
                        <path d="M160 115.4L180.7 96 352 256 180.7 416 160 396.7 310.5 256z"></path>
                      </svg>
                      <p>{{$t('查看当前绑定的银行卡')}}</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <div v-else-if="baseIndex==4" key="four" v-cloak>
              <div class="ucenter bg-ucBody-bgColor">
                <div class="userinfo">
                  <div class="userhead">
                    <div class="info">
                      <div class="avatar">
                        <img src="../assets/images/txm.png"/>
                        <span id="userName">{{userName}}</span>
                      </div>
                      <div class="setting">
                        <a class="server" href="javascript:;" @click='onlineCustomerServiceSkip(datas.onlineSys_config1)'>
                          <i class="icon iconfont icon-kefu"></i></a>
                        <a class="option" href="javascript:;" @click='togosetting'><i
                          class="icon iconfont icon-shezhi"></i></a>
                      </div>
                    </div>
                  </div>
                  <div class="bodybg bg-theme-color"></div>
                  <div class="content">
                    <div class="card whiteBgColor">
                      <div class="balance">
                        <div>
                          <p class="font-theme-color">{{coin}}</p>
                          <span>{{$t('可用余额')}}</span>
                        </div>
                        <div>
                          <p class="font-theme-color">{{unfinishCoin}}</p>
                          <span>{{$t('未结金额')}}</span>
                        </div>
                      </div>
                      <div class="pay">
                        <a href="javascript:;" @click='togodepositFile'>
                          <span class="iconcon iconcon-left"><i class="icon iconfont icon-zhifu"></i></span>
                          <span>{{$t('充值')}}</span>
                        </a>
                        <a href="javascript:;" @click="clickEnchash">
                          <span class="iconcon iconcon-right"><i
                            class="icon iconfont icon-yunongtongqukuanfuwu"></i></span>
                          <span>{{$t('提现')}}</span>
                        </a>
                      </div>
                    </div>
                    <div class="record card bg-public-deep-bgColor">
                      <div class="title" @click='togoperfectUserInfo'>
                        <span class="iconcon iconcon-3 bg-theme-color">
                          <i class="icon iconfont icon-morentouxiang"></i></span>
                        <span class="userInfo">{{$t('个人信息')}}</span>
                        <svg type="ios-arrow-right" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            viewBox="0 0 512 512" class="vux-x-icon vux-x-icon-ios-arrow-right arrow-right">
                          <path data-v-e48085d6="" d="M160 115.4L180.7 96 352 256 180.7 416 160 396.7 310.5 256z"></path>
                        </svg>
                      </div>
                      <div class="record-item">
                        <a href="javascript:;" @click='togochangePwd(1)'><span class="iconcon iconcon-4"><i
                          class="icon iconfont icon-mima"></i></span>{{$t('登录密码')}}</a>
                        <a href="javascript:;" @click='togochangePwd(2)'><span class="iconcon iconcon-5"><i
                          class="icon iconfont icon-unie604"></i></span>{{$t('资金密码')}}</a>
                        <a href="javascript:;" @click='togoperfectUserInfo'><span class="iconcon iconcon-6"><i
                          class="icon iconfont icon-xinxi"></i></span>{{$t('账户信息')}}</a>
                        <a href="javascript:;" v-if="userType&&userType==1" @click='showAgency'>
                          <span class="iconcon iconcon-6"><i class="icon iconfont1">&#xe65a;</i></span>
                          代理中心</a>
                      </div>
                      <div class="record-item">
                        <router-link :to="{ name: 'bettingRecord', params:{ status: 1 }}">
                          <span class="iconcon iconcon-4"><i class="icon iconfont1">&#xe61f;</i></span>中奖记录
                        </router-link>
                        <router-link :to="{ name: 'bettingRecord', params:{ status: 0 }}">
                          <span class="iconcon iconcon-5"><i class="icon iconfont1">&#xe755;</i></span>投注记录
                        </router-link>
                        <a href="javascript:;" @click='act'>
                          <span class="iconcon iconcon-6"><i class="icon iconfont1">&#xe634;</i></span>
                          优惠活动
                        </a>
                      </div>

                    </div>
                    <div class="record card bg-public-deep-bgColor">
                      <div class="title" @click='togomessage'>
                        <span class="iconcon iconcon-3 bg-theme-color"><i
                          class="icon iconfont icon-iconset0337"></i></span>
                        <span class="userInfo">{{$t('我的消息')}}</span>
                        <svg type="ios-arrow-right" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            viewBox="0 0 512 512" class="vux-x-icon vux-x-icon-ios-arrow-right arrow-right">
                          <path data-v-e48085d6="" d="M160 115.4L180.7 96 352 256 180.7 416 160 396.7 310.5 256z"></path>
                        </svg>
                      </div>
                      <div class="title noBorder" @click='togoannouncement'>
                        <span class="iconcon iconcon-3 bg-theme-color"><i class="icon iconfont icon-gonggao"></i></span>
                        <span class="userInfo">{{$t('全站公告')}}</span>
                        <svg type="ios-arrow-right" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            viewBox="0 0 512 512" class="vux-x-icon vux-x-icon-ios-arrow-right arrow-right">
                          <path data-v-e48085d6="" d="M160 115.4L180.7 96 352 256 180.7 416 160 396.7 310.5 256z"></path>
                        </svg>
                      </div>
                    </div>

                  </div>
                </div>
              </div>


            </div> -->

            <!--数字彩列表内容-->
            <!-- <div v-show="lottery_caizhong==1&&baseIndex==2" style="padding-top: 4.5rem;" v-cloak>
              <ul class="digitalColor_ul">
                <li :key="index" v-for="(item,index) in gameIntro">
                  <a href="javascript:void(0)"
                    @click='togocontentUrl(item.bet_url,item.gameID,item.pic_url,item.show_name)'>
                    <div class="digitalColor_li-left">
                      <img :src="'static/'+item.pic_url"/>
                    </div>
                    <div class="digitalColor_li-right">
                      <p>
                        <span v-cloak>{{item.show_name}}</span>
                        <span class="mui-icon mui-icon-arrowright"></span>
                      </p>

                      <p>
                        <template v-if="item.code=='k3'">
                          <i :key="index" v-for='(it,index) in item.luck_number.split(",")'
                            :class="it?('dice '+'dice-'+it):''"></i>
                        </template>
                        <template v-else-if="item.code=='PCDD'">
                          <span :key="index" v-for='(it,index) in item.luck_number.split(",")'
                                :class="[it=='+'||it=='='?'':'ball',bj28CL[it]]" v-cloak>{{it}}</span>
                        </template>
                        <template v-else-if="item.code=='hk6'">
                          <span :key="index" v-for='(it,index) in item.luck_number.replace("+",",").split(",")'
                                :class="[it=='='?'':'ball',lhcCL[it-1]]" v-cloak>{{it}}</span>
                        </template>
                        <template v-else-if="item.gameID==8||item.gameID==15||item.gameID==34||item.gameID==39">
                          <span :key="index" v-for='(it,index) in item.luck_number.split(",")'
                                :class="it?('square '+'square-'+it):''" v-cloak></span>
                        </template>
                        <template v-else>
                          <span :key="index" v-for='(it,index) in item.luck_number.split(",")' :class="it=='='?'':'ball'"
                                v-cloak>{{it}}</span>
                        </template>
                      </p>
                      <p>
                        <span class="phase">当前期号:{{item.new_issue}}</span>
                        <span class="status" v-if="item.deadlineStr">距离下期:{{item.deadlineStr}}</span>
                        <span class="status" v-else>{{item.msg}}</span>
                      </p>
                    </div>
                  </a>
                  <div class="foot">
                    <a href="javascript:;"
                      @click='togocontentUrl(item.bet_url,item.gameID,item.pic_url,item.show_name)'><i
                      class="iconfont icon-qipaishi"></i>{{$t('前往投注')}}</a>
                    <a href="javascript:;" @click="togoSkip(item)"><i
                      class="iconfont icon-shujutu font-important-color"></i>{{$t('开奖数据')}}</a>
                  </div>
                </li>
              </ul>
            </div> -->


          </div>


        </div>
        <!-- 弹出公告 -->
        <div id="popNotice" class="hide " v-cloak>
          <div class="wrap" @click="hidePopupNotice()"></div>
          <div class="tit">{{$t('系统公告')}}<span class="close iconfont1" @click="hidePopupNotice()">&#xe605;</span></div>
          <div class="popContent">

            <div class="title">{{popupNotice?popupNotice.title:''}}</div>
            <div class="content" v-html="popupNotice?popupNotice.content:''" style="padding-bottom: 1rem">
              {{popupNotice?popupNotice.content:''}}
            </div>

          </div>
        </div>
            </div>


      </div>
      <div style="position: fixed;bottom: 0;left: 50%;margin-left: -45px;z-index: 10;">
					<!-- <a href="#canvasSide" class="mui-action-menu">
						<img src="static/images/gengduo.png" style="width: 90px;margin-bottom: -4px;">
					</a> -->
          <a @click.stop="popArea(1)" class="mui-action-menu">
						<img src="static/images/gengduo.png" style="width: 90px;margin-bottom: -4px;">
					</a>
				</div>
        <!-- @click="popArea(2)"  -->
      <div class="mui-off-canvas-backdrop" @touchmove="popArea(2);"></div>
    </div>
    <div id="push" class=" box mui-popover mui-popover-action mui-popover-bottom mui-scroll-wrapper" style="touch-action: pan-y">
      <span class="mui-icon btn-close mui-icon-close"></span>
          <!-- <span class="mui-icon mui-icon-close" style="color: #fff;top: 15px;right: 15px;font-size: 40px;position: absolute;"></span> -->
          <div class="mui-text-center" style="padding: 30px 0 10px;color: #fff;">
            <h2 style="font-size: 24px;font-weight: 400;">{{hot_title}}</h2>
            <!-- <p style="margin: 0;font-size: 14px;line-height: 24px;font-weight: 300;color: #999;">hello world</p> -->
          </div>
			<div style="overflow:scroll;height:calc(100% - 70px)" class="s_scroll">
          <div class=" mui-scroll">

          <ul v-if="hot_index<9||hot_index==19" class=" mui-table-view mui-table-view-chevron sub">

            <template v-if="hot_index==1">
            <li :key="index" v-for="(item,index) in hotArr" class="mui-table-view-cell mui-media">
              <a class="mui-navigate-right" href="javascript:void(0)"  v-if="item.bet_url!=''" @click='togocontentUrl(item.bet_url,item.gameID,item.pic_url,item.type_name_CN)'>
                <img class="mui-media-object mui-pull-left"  :src="'static/'+item.pic_url" style="max-width: inherit;">
                <div class="mui-media-body">
                  {{item.show_name}}
                </div>
                <div class="mui-media-right">
                  <p class="msg">{{$t('距第')}}{{item.new_issue}}{{$t('期截止')}}</p>
                  <div class="time" v-if="item.hour"><span class="hour">{{item.hour}}</span><span class="min">{{item.minute}}</span><span class="sec">{{item.second}}</span>
                  </div>
                        <p v-else>{{item.msg}}</p>
                </div>
              </a>
            </li>
            </template>
            <template v-if="hot_index==2">
            <li :key="index" v-for="(item,index) in hotArr" :class="item.is_hot=='1'?'mui-table-view-cell mui-media':'mHide'">
              <a class="mui-navigate-right" href="javascript:void(0)"  v-if="item.bet_url!=''" @click='togocontentUrl(item.bet_url,item.gameID,item.pic_url,item.type_name_CN)'>
                <img class="mui-media-object mui-pull-left"  :src="'static/'+item.pic_url" style="max-width: inherit;">
                <div class="mui-media-body">
                  {{item.show_name}}
                </div>
                <div class="mui-media-right">
                  <p class="msg">{{$t('距第')}}{{item.new_issue}}{{$t('期截止')}}</p>
                  <div class="time" v-if="item.hour">
                          <span class="hour">{{item.hour}}</span><span class="min">{{item.minute}}</span><span class="sec">{{item.second}}</span>
                  </div>
                        <p v-else>{{item.msg}}</p>
                </div>
              </a>
            </li>
            </template>
            <template v-if="hot_index==3">
            <li :key="index" v-for="(item,index) in hotArr" :class="item.code=='ssc'?'mui-table-view-cell mui-media':'mHide'">
              <a class="mui-navigate-right" href="javascript:void(0)"  v-if="item.bet_url!=''" @click='togocontentUrl(item.bet_url,item.gameID,item.pic_url,item.type_name_CN)'>
                <img class="mui-media-object mui-pull-left"  :src="'static/'+item.pic_url" style="max-width: inherit;">
                <div class="mui-media-body">
                  {{item.show_name}}
                </div>
                <div class="mui-media-right">
                  <p class="msg">{{$t('距第')}}{{item.new_issue}}{{$t('期截止')}}</p>
                  <div class="time" v-if="item.hour">
                          <span class="hour">{{item.hour}}</span><span class="min">{{item.minute}}</span><span class="sec">{{item.second}}</span>
                        </div>
                        <p v-else>{{item.msg}}</p>
                </div>
              </a>
            </li>
            </template>
            <template v-if="hot_index==4">
            <li :key="index" v-for="(item,index) in hotArr" :class="item.code=='k3'?'mui-table-view-cell mui-media':'mHide'">
              <a class="mui-navigate-right" href="javascript:void(0)"  v-if="item.bet_url!=''" @click='togocontentUrl(item.bet_url,item.gameID,item.pic_url,item.type_name_CN)'>
                <img class="mui-media-object mui-pull-left"  :src="'static/'+item.pic_url" style="max-width: inherit;">
                <div class="mui-media-body">
                  {{item.show_name}}
                </div>
                <div class="mui-media-right">
                  <p class="msg">{{$t('距第')}}{{item.new_issue}}{{$t('期截止')}}</p>
                  <div class="time" v-if="item.hour">
                          <span class="hour">{{item.hour}}</span><span class="min">{{item.minute}}</span><span class="sec">{{item.second}}</span>
                        </div>
                        <p v-else>{{item.msg}}</p>
                </div>
              </a>
            </li>
            </template>
            <template v-if="hot_index==5">
            <li :key="index" v-for="(item,index) in hotArr" :class="item.code=='11x5'?'mui-table-view-cell mui-media':'mHide'">
              <a class="mui-navigate-right" href="javascript:void(0)"  v-if="item.bet_url!=''" @click='togocontentUrl(item.bet_url,item.gameID,item.pic_url,item.type_name_CN)'>
                <img class="mui-media-object mui-pull-left"  :src="'static/'+item.pic_url" style="max-width: inherit;">
                <div class="mui-media-body">
                  {{item.show_name}}
                </div>
                <div class="mui-media-right">
                  <p class="msg">{{$t('距第')}}{{item.new_issue}}{{$t('期截止')}}</p>
                  <div class="time" v-if="item.hour">
                          <span class="hour">{{item.hour}}</span><span class="min">{{item.minute}}</span><span class="sec">{{item.second}}</span>
                        </div>
                        <p v-else>{{item.msg}}</p>
                </div>
              </a>
            </li>
            </template>
            <template v-if="hot_index==6">
            <li :key="index" v-for="(item,index) in hotArr" :class="item.code=='PCDD'?'mui-table-view-cell mui-media':'mHide'">
              <a class="mui-navigate-right" href="javascript:void(0)"  v-if="item.bet_url!=''" @click='togocontentUrl(item.bet_url,item.gameID,item.pic_url,item.type_name_CN)'>
                <img class="mui-media-object mui-pull-left"  :src="'static/'+item.pic_url" style="max-width: inherit;">
                <div class="mui-media-body">
                  {{item.show_name}}
                </div>
                <div class="mui-media-right">
                  <p class="msg">{{$t('距第')}}{{item.new_issue}}{{$t('期截止')}}</p>
                  <div class="time" v-if="item.hour">
                          <span class="hour">{{item.hour}}</span><span class="min">{{item.minute}}</span><span class="sec">{{item.second}}</span>
                        </div>
                        <p v-else>{{item.msg}}</p>
                </div>
              </a>
            </li>
            </template>
            <template v-if="hot_index==7">
            <li :key="index" v-for="(item,index) in hotArr" :class="item.code=='kl10f'?'mui-table-view-cell mui-media':'mHide'">
              <a class="mui-navigate-right" href="javascript:void(0)"  v-if="item.bet_url!=''" @click='togocontentUrl(item.bet_url,item.gameID,item.pic_url,item.type_name_CN)'>
                <img class="mui-media-object mui-pull-left"  :src="'static/'+item.pic_url" style="max-width: inherit;">
                <div class="mui-media-body">
                  {{item.show_name}}
                </div>
                <div class="mui-media-right">
                  <p class="msg">{{$t('距第')}}{{item.new_issue}}{{$t('期截止')}}</p>
                  <div class="time" v-if="item.hour">
                          <span class="hour">{{item.hour}}</span><span class="min">{{item.minute}}</span><span class="sec">{{item.second}}</span>
                        </div>
                        <p v-else>{{item.msg}}</p>
                </div>
              </a>
            </li>
            </template>
            <template v-if="hot_index==8">
            <li :key="index" v-for="(item,index) in hotArr" :class="item.code=='hk6'?'mui-table-view-cell mui-media':'mHide'">
              <a class="mui-navigate-right" href="javascript:void(0)"  v-if="item.bet_url!=''" @click='togocontentUrl(item.bet_url,item.gameID,item.pic_url,item.type_name_CN)'>
                <img class="mui-media-object mui-pull-left"  :src="'static/'+item.pic_url" style="max-width: inherit;">
                <div class="mui-media-body">
                  {{item.show_name}}
                </div>
                <div class="mui-media-right">
                  <p class="msg">{{$t('距第')}}{{item.new_issue}}{{$t('期截止')}}</p>
                  <div class="time" v-if="item.hour">
                          <span class="hour">{{item.hour}}</span><span class="min">{{item.minute}}</span><span class="sec">{{item.second}}</span>
                        </div>
                        <p v-else>{{item.msg}}</p>
                </div>
              </a>
            </li>
            </template>
            <template v-if="hot_index==19">
            <li :key="index" v-for="(item,index) in hotArr" :class="collect_idList[item.gameID]==1?'mui-table-view-cell mui-media':'mHide'">
              <a class="mui-navigate-right" href="javascript:void(0)"  v-if="item.bet_url!=''" @click='togocontentUrl(item.bet_url,item.gameID,item.pic_url,item.type_name_CN)'>
                <img class="mui-media-object mui-pull-left"  :src="'static/'+item.pic_url" style="max-width: inherit;">
                <div class="mui-media-body">
                  {{item.show_name}}
                </div>
                <div class="mui-media-right">
                  <p class="msg">{{$t('距第')}}{{item.new_issue}}{{$t('期截止')}}</p>
                  <div class="time" v-if="item.hour">
                          <span class="hour">{{item.hour}}</span><span class="min">{{item.minute}}</span><span class="sec">{{item.second}}</span>
                        </div>
                        <p v-else>{{item.msg}}</p>
                </div>
              </a>
            </li>
            </template>
          </ul>
          <ul  v-if="hot_index==9" class=" mui-table-view f_panel">

              <li class="mui-table-view-cell mui-collapse mui-active">
                <a class="mui-navigate-right" href="javascript:void(0);">{{$t('热门')}}</a>
                <div class="mui-collapse-content">
                  <div :key="index" v-for="(item,index) in hotArr" class="mui-table-view-cell mui-media" v-if="item.is_hot==1">
                    <a class="f_panel_block" href="javascript:void(0)"  v-if="item.bet_url!=''" @click='togoSkip(item)'>
                      <div class="mui-media-body">
                        <p style="margin-bottom: 10px;">{{item.show_name}}</p>
                        <div class="time" v-if="item.hour">
                          <span class="hour">{{item.hour}}</span><span class="min">{{item.minute}}</span><span class="sec">{{item.second}}</span>
                        </div>
                        <p v-else>{{item.msg}}</p>
                      </div>
                      <div class="mui-media-right">
                        <p style="margin-bottom: 10px;" class="msg">第{{item.issue?item.issue:'--'}}期</p>
                        <p v-if="typeof(item.luckList)=='string'">{{item.luckList}}</p>
                        <p :class="'ball_'+item.code" v-else>
                          <span :class="item.code=='k3'?'dice dice-'+it:item.code=='PK10'?'square '+'square-'+it:item.code=='hk6'?'ball '+lhcCL[it-1]:item.code=='PCDD'?'ball '+bj28CL[it]:''" v-bind:key="ins" v-for="(it,ins) in item.luckList">{{item.code=='k3'||item.code=='PK10'?'':it}}</span>
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
              </li>
               <li class="mui-table-view-cell mui-collapse">
                <a class="mui-navigate-right" href="javascript:void(0);">{{$t('收藏')}}</a>
                <div v-if="collect_Trend" class="mui-collapse-content">
                  <div :key="index" v-for="(item,index) in hotArr" class="mui-table-view-cell mui-media" v-if="collect_Trend[item.gameID]==1">
                    <a class="f_panel_block" href="javascript:void(0)"  v-if="item.bet_url!=''" @click='togoSkip(item)'>
                      <div class="mui-media-body">
                        <p style="margin-bottom: 10px;">{{item.show_name}}</p>
                        <div class="time" v-if="item.hour">
                          <span class="hour">{{item.hour}}</span><span class="min">{{item.minute}}</span><span class="sec">{{item.second}}</span>
                        </div>
                        <p v-else>{{item.msg}}</p>
                      </div>
                      <div class="mui-media-right">
                        <p style="margin-bottom: 10px;" class="msg">第{{item.issue?item.issue:'--'}}期</p>
                        <p v-if="typeof(item.luckList)=='string'">{{item.luckList}}</p>
                        <p :class="'ball_'+item.code" v-else>
                          <span :class="item.code=='k3'?'dice dice-'+it:item.code=='PK10'?'square '+'square-'+it:item.code=='hk6'?'ball '+lhcCL[it-1]:item.code=='PCDD'?'ball '+bj28CL[it]:''" v-bind:key="ins" v-for="(it,ins) in item.luckList">{{item.code=='k3'||item.code=='PK10'?'':it}}</span>
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
                <div class="mui-collapse-content" v-else>
                  <div>{{$t('无收藏')}}</div>
                </div>
              </li>
              <li class="mui-table-view-cell mui-collapse">
                <a class="mui-navigate-right" href="javascript:void(0);">{{$t('时时彩')}}</a>
                <div class="mui-collapse-content">
                  <div :key="index" v-for="(item,index) in hotArr" :class="item.code=='ssc'?'mui-table-view-cell mui-media':'mHide'">
                    <a class="f_panel_block" href="javascript:void(0)"  v-if="item.bet_url!=''" @click='togoSkip(item)'>
                      <div class="mui-media-body">
                        <p style="margin-bottom: 10px;">{{item.show_name}}</p>
                        <div class="time" v-if="item.hour">
                          <span class="hour">{{item.hour}}</span><span class="min">{{item.minute}}</span><span class="sec">{{item.second}}</span>
                        </div>
                        <p v-else>{{item.msg}}</p>
                      </div>
                      <div class="mui-media-right">
                        <p style="margin-bottom: 10px;" class="msg">第{{item.issue?item.issue:'--'}}期</p>
                        <p v-if="typeof(item.luckList)=='string'">{{item.luckList}}</p>
                        <p :class="'ball_'+item.code" v-else>
                          <span :class="item.code=='k3'?'dice dice-'+it:item.code=='PK10'?'square '+'square-'+it:item.code=='hk6'?'ball '+lhcCL[it-1]:item.code=='PCDD'?'ball '+bj28CL[it]:''" v-bind:key="ins" v-for="(it,ins) in item.luckList">{{item.code=='k3'||item.code=='PK10'?'':it}}</span>
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
              </li>
              <li class="mui-table-view-cell mui-collapse">
                <a class="mui-navigate-right" href="javascript:void(0);">快3</a>
                <div class="mui-collapse-content">
                  <div :key="index" v-for="(item,index) in hotArr" :class="item.code=='k3'?'mui-table-view-cell mui-media':'mHide'">
                    <a class="f_panel_block" href="javascript:void(0)"  v-if="item.bet_url!=''" @click='togoSkip(item)'>
                      <div class="mui-media-body">
                        <p style="margin-bottom: 10px;">{{item.show_name}}</p>
                        <div class="time" v-if="item.hour">
                          <span class="hour">{{item.hour}}</span><span class="min">{{item.minute}}</span><span class="sec">{{item.second}}</span>
                        </div>
                        <p v-else>{{item.msg}}</p>
                      </div>
                      <div class="mui-media-right">
                        <p style="margin-bottom: 10px;" class="msg">第{{item.issue?item.issue:'--'}}期</p>
                        <p v-if="typeof(item.luckList)=='string'">{{item.luckList}}</p>
                        <p :class="'ball_'+item.code" v-else>
                          <span :class="item.code=='k3'?'dice dice-'+it:item.code=='PK10'?'square '+'square-'+it:item.code=='hk6'?'ball '+lhcCL[it-1]:item.code=='PCDD'?'ball '+bj28CL[it]:''" v-bind:key="ins" v-for="(it,ins) in item.luckList">{{item.code=='k3'||item.code=='PK10'?'':it}}</span>
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
              </li>
              <li class="mui-table-view-cell mui-collapse">
                <a class="mui-navigate-right" href="javascript:void(0);">11选5</a>
                <div class="mui-collapse-content">
                  <div :key="index"  v-for="(item,index) in hotArr" :class="item.code=='11x5'?'mui-table-view-cell mui-media':'mHide'">
                    <a class="f_panel_block" href="javascript:void(0)"  v-if="item.bet_url!=''" @click='togoSkip(item)'>
                      <div class="mui-media-body">
                        <p style="margin-bottom: 10px;">{{item.show_name}}</p>
                        <div class="time" v-if="item.hour">
                          <span class="hour">{{item.hour}}</span><span class="min">{{item.minute}}</span><span class="sec">{{item.second}}</span>
                        </div>
                        <p v-else>{{item.msg}}</p>
                      </div>
                      <div class="mui-media-right">
                        <p style="margin-bottom: 10px;" class="msg">第{{item.issue?item.issue:'--'}}期</p>
                        <p v-if="typeof(item.luckList)=='string'">{{item.luckList}}</p>
                        <p :class="'ball_'+item.code" v-else>
                          <span :class="item.code=='k3'?'dice dice-'+it:item.code=='PK10'?'square '+'square-'+it:item.code=='hk6'?'ball '+lhcCL[it-1]:item.code=='PCDD'?'ball '+bj28CL[it]:''" v-bind:key="ins" v-for="(it,ins) in item.luckList">{{item.code=='k3'||item.code=='PK10'?'':it}}</span>
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
              </li>
              <li class="mui-table-view-cell mui-collapse">
                <a class="mui-navigate-right" href="javascript:void(0);">PC蛋蛋</a>
                <div class="mui-collapse-content">
                  <div :key="index" v-for="(item,index) in hotArr" :class="item.code=='PCDD'?'mui-table-view-cell mui-media':'mHide'">
                    <a class="f_panel_block" href="javascript:void(0)"  v-if="item.bet_url!=''" @click='togoSkip(item)'>
                      <div class="mui-media-body">
                        <p style="margin-bottom: 10px;">{{item.show_name}}</p>
                        <div class="time" v-if="item.hour">
                          <span class="hour">{{item.hour}}</span><span class="min">{{item.minute}}</span><span class="sec">{{item.second}}</span>
                        </div>
                        <p v-else>{{item.msg}}</p>
                      </div>
                      <div class="mui-media-right">
                        <p style="margin-bottom: 10px;" class="msg">第{{item.issue?item.issue:'--'}}期</p>
                        <p v-if="typeof(item.luckList)=='string'">{{item.luckList}}</p>
                        <p :class="'ball_'+item.code" v-else>
                          <span :class="item.code=='k3'?'dice dice-'+it:item.code=='PK10'?'square '+'square-'+it:item.code=='hk6'?'ball '+lhcCL[it-1]:item.code=='PCDD'?'ball '+bj28CL[it]:''" v-bind:key="ins" v-for="(it,ins) in item.luckList">{{item.code=='k3'||item.code=='PK10'?'':it}}</span>
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
              </li>
              <li class="mui-table-view-cell mui-collapse">
                <a class="mui-navigate-right" href="javascript:void(0);">{{$t('快乐十分')}}</a>
                <div class="mui-collapse-content">
                  <div :key="index"  v-for="(item,index) in hotArr" :class="item.code=='kl10f'?'mui-table-view-cell mui-media':'mHide'">
                    <a class="f_panel_block" href="javascript:void(0)"  v-if="item.bet_url!=''" @click='togoSkip(item)'>
                      <div class="mui-media-body">
                        <p style="margin-bottom: 10px;">{{item.show_name}}</p>
                        <div class="time" v-if="item.hour">
                          <span class="hour">{{item.hour}}</span><span class="min">{{item.minute}}</span><span class="sec">{{item.second}}</span>
                        </div>
                        <p v-else>{{item.msg}}</p>
                      </div>
                      <div class="mui-media-right">
                        <p style="margin-bottom: 10px;" class="msg">第{{item.issue?item.issue:'--'}}期</p>
                        <p v-if="typeof(item.luckList)=='string'">{{item.luckList}}</p>
                        <p :class="'ball_'+item.code" v-else>
                          <span :class="item.code=='k3'?'dice dice-'+it:item.code=='PK10'?'square '+'square-'+it:item.code=='hk6'?'ball '+lhcCL[it-1]:item.code=='PCDD'?'ball '+bj28CL[it]:''" v-bind:key="ins" v-for="(it,ins) in item.luckList">{{item.code=='k3'||item.code=='PK10'?'':it}}</span>
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
              </li>
              <li class="mui-table-view-cell mui-collapse">
                <a class="mui-navigate-right" href="javascript:void(0);">{{$t('六合彩')}}</a>
                <div class="mui-collapse-content">
                  <div :key="index" v-for="(item,index) in hotArr" :class="item.code=='hk6'?'mui-table-view-cell mui-media':'mHide'">
                    <a class="f_panel_block" href="javascript:void(0)"  v-if="item.bet_url!=''" @click='togoSkip(item)'>
                      <div class="mui-media-body">
                        <p style="margin-bottom: 10px;">{{item.show_name}}</p>
                        <div class="time" v-if="item.hour">
                          <span class="hour">{{item.hour}}</span><span class="min">{{item.minute}}</span><span class="sec">{{item.second}}</span>
                        </div>
                        <p v-else>{{item.msg}}</p>
                      </div>
                      <div class="mui-media-right">
                        <p style="margin-bottom: 10px;" class="msg">第{{item.issue?item.issue:'--'}}期</p>
                        <p v-if="typeof(item.luckList)=='string'">{{item.luckList}}</p>
                        <p :class="'ball_'+item.code" v-else>
                          <span :class="item.code=='k3'?'dice dice-'+it:item.code=='PK10'?'square '+'square-'+it:item.code=='hk6'?'ball '+lhcCL[it-1]:item.code=='PCDD'?'ball '+bj28CL[it]:''" v-bind:key="ins" v-for="(it,ins) in item.luckList">{{item.code=='k3'||item.code=='PK10'?'':it}}</span>
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
              </li>
          </ul>
          <div class="mui-text-center">
            <span class="mui-icon btn-close mui-icon-close"></span>
            <!-- <span class="mui-icon mui-icon-close" style="color: #fff;font-size: 40px;margin-top: 10px;margin-bottom: 15px;"></span> -->
          </div>
        </div>
      </div>
			<div class="up" @touchstart="showHotArea('','',1)" style="position: fixed;right: 10px;bottom: 20px;padding: 10px;border-radius: 50%;background: #fff;z-index: 1000;box-shadow: 0 0 3px #eee;">
				<span class="mui-icon mui-icon-arrowup"></span>
			</div>
		</div>
    <!-- <div class="public_btn clearf">
      <div class="item">
        <a href="javascript:void(0)" @touchstart="href1($event)" :class="baseIndex==1?'active':''">
          <p>
            <i class="iconfont icon-home "></i>
          </p>
          <p>{{$t('首页')}}</p>
        </a>
      </div>
      <div class="item">
        <a href="javascript:void(0)" @touchstart="href2($event)" :class="baseIndex==2?'active':''">
          <p>
            <i class="iconfont icon-iconfontyouxihudong"></i>
          </p>
          <p>{{$t('游戏大厅')}}</p>
        </a>
      </div>
      <div class="item">
        <a href="javascript:void(0)" @touchstart="href3($event)" :class="baseIndex==3?'active':''">
          <p>
            <i class="iconfont icon-zhuanxiangzijin"></i>
          </p>
          <p>{{$t('账户')}}</p>
        </a>
      </div>
      <div class="item">
        <a href="javascript:void(0)" @touchstart="href4($event)" :class="baseIndex==4?'active':''">
          <p>
            <i class="iconfont icon-zhanghu1"></i>
          </p>
          <p>{{$t('个人中心')}}</p>
        </a>
      </div>
    </div> -->


    <!--<div id="container" :class="{'container':true,'disappear':disappear}" >-->


  </div>
  <div id="aWrap" @click="popArea(2)"></div>
  <!-- <input type="file" id="file">
  <div id="qrCode"></div> -->
  </div>

</template>

<script src="../assets/js/index.js"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="../style/index.css" scoped></style>
<style lang="less" scoped>
#aWrap{
  position: absolute;
    z-index: 998;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: block;
    -webkit-transition: background 350ms cubic-bezier(.165, .84, .44, 1);
    transition: background 350ms cubic-bezier(.165, .84, .44, 1);
    background: rgba(0, 0, 0, .4);
    -webkit-box-shadow: -4px 0 4px rgba(0, 0, 0, .5), 4px 0 4px rgba(0, 0, 0, .5);
    box-shadow: -4px 0 4px rgba(0, 0, 0, .5), 4px 0 4px rgba(0, 0, 0, .5);
    -webkit-tap-highlight-color: transparent;
    display: none;
}
.mui-inner-wrap #header{
  background: -webkit-linear-gradient(top,black,#575956);
}
.mHide{
  display: none !important;
}
#pullrefresh{
  height:auto;
  .msg{
        height: 2.5rem;
    line-height: 2.5rem;
    .scroll{
          height: 2.5rem;
      line-height: 2.5rem;
    }
    .laba[data-v-6efe4612] {
        position: relative;
        top: .2rem;
    }
  }
}

#push{
  opacity: 1;
  background-color: rgba(0,0,0,.6);
  .btn-close{
    background-image: url(../assets/images/base/trend_03.png);
    width: 50px;
    height: 50px;
    position: absolute;
    right: 0;
    top: 0;
    background-size: contain;
    z-index: 10;
    &:before{
      content:'';
    }
  }
  .mui-text-center{
    position: relative;
    height: 70px;
    .btn-close{
      left: 50%;
      margin-left: -25px;
      bottom: -65px;
      top: 10px;
    }
  }

  .f_panel{
    background-color: initial;
    margin: 0;
    >.mui-table-view-cell{
      background: -webkit-linear-gradient(left, #303941 , #575956);
      background: -o-linear-gradient(left, #303941 , #575956); /* Opera 11.1 - 12.0 */
      background: -moz-linear-gradient(left, #303941 , #575956); /* Firefox 3.6 - 15 */
      background: linear-gradient(left, #303941 , #575956); /* 标准的语法 */
      margin-bottom: 5px;
      .mui-collapse-content{
        // background-color: #35373a;
        background:rgba(0, 0, 0, 0);
        .mui-table-view-cell{
          background:rgba(0, 0, 0, 0);
          margin-bottom: 10px;
          border-radius: 12px;
          border: 1px solid #242427;
            box-shadow: 1px 1px 1px #242427;
        }
      }
    }
  }


  // .time{
  //   background: initial;
  //   >span{
  //     background-image: url(../assets/images/base/trend_06.png);
  //     background-size: contain;
  //     background-repeat: no-repeat;
  //         height: 40px;
  //     width: 45px;
  //     padding-top: 7px;
  //     /* line-height: 1.5rem; */
  //     letter-spacing: 12px;
  //     position: initial;
  //     top: initial;
  //     display: inline-block;
  //     padding-left: 5px;
  //     font-size: 20px;

  //   }
  // }
}

#canvasSideScroll{
  height: 100%;
  .leftBtn{
      margin: 0 auto;
      text-align: center;
      position: absolute;
      bottom: 1.5rem;
      z-index: 1;
      left: 50%;
      margin-left: -1.5rem;
    span{
          display: inline-block;
      padding: .5rem .7rem;
      background: #5d5d5d;
      border-radius: 50%;
      img{
            width: 1.2rem;
        vertical-align: middle;
      }
    }
  }

}

.content-wrap{
  position: relative; width: 100%; height: 100%; z-index: 1;
}
</style>




