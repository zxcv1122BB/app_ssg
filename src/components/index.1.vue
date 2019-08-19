<template>
  <div class="mui-fullscreen">
     <div id="offCanvasWrapper" class="mui-off-canvas-wrap mui-draggable">
    <aside id="offCanvasSide" class="mui-off-canvas-left">
				<div id="offCanvasSideScroll" class="mui-scroll-wrapper">
					<div class="mui-scroll">
						<div class="title" style="margin-bottom: 35px;color: #007DF6;font-size: 28px;margin-top: 25px;padding-left: 12px;font-weight: 300;">SSG
							彩票</div>
						<ul class="mui-table-view mui-table-view-chevron mui-table-view-inverted">
							<li class="mui-table-view-cell" @tap='skip_newUrl(0, "/myCenter", "")'>
								<a class="mui-navigate-right">

									会员中心
								</a>
							</li>
               <!-- v-if="userType&&userType==1" -->
              <li class="mui-table-view-cell" v-if="userType&&userType==1" @tap='showAgency'>
								<a class="mui-navigate-right">
                  代理中心
								</a>
							</li>
							<li class="mui-table-view-cell" @tap='togodepositFile'>
								<a class="mui-navigate-right">
									在线充值
								</a>
							</li>
							<li class="mui-table-view-cell" @tap="clickEnchash">
								<a class="mui-navigate-right">
									在线取款
								</a>
							</li>
							<li class="mui-table-view-cell" @tap='onlineCustomerServiceSkip(datas.onlineSys_config1)'>
								<a class="mui-navigate-right">
									{{$t('在线客服')}}
								</a>
							</li>
							<li class="mui-table-view-cell"  @tap='act'>
								<a class="mui-navigate-right">
									优惠活动
								</a>
							</li>
							<!-- <li class="mui-table-view-cell">
								<a class="mui-navigate-right" href="aaa.html">
									结果走势
								</a>
							</li> -->
							<li class="mui-table-view-cell"  @tap="togodownload">
								<a class="mui-navigate-right">
									下载 APP
								</a>
							</li>
							<!-- <li class="mui-table-view-cell">
								<a class="mui-navigate-right" href="aaa.html">
									关于我们
								</a>
							</li> -->
						</ul>
					</div>
				</div>
			</aside>

    <!--底部按钮-->
    <div class="mui-inner-wrap">
      <header id="header" v-show="baseIndex!=4">
        <h1 class="header-title" v-cloak><img src="../assets/images/base/logo.png" alt=""></h1>
        <!-- <div class="logo"></div> -->
        <a href="javascript:void(0)" class="header-left" @tap="register">{{$t('注册')}}</a>
        <a href="javascript:void(0)" class="header-right" style="display: none" @tap="login">{{$t('登录')}}</a>
        <!-- <a href="javascript:void(0)" class="username" @tap='baseIndex=4'>{{userName}}</a> -->
        <a href="javascript:void(0)" class="loginOut" v-if="userName" @tap="loginOut">{{$t('退出')}}</a>
      </header>

      <!-- <div class="download-wrap" v-if="appDownloadShow==1&&!app_flag">
        <a class="close" @tap="DownloadShow">×</a>
        <div class="info">
          <div class="logo" v-if="logoPic!=''"><img :src="logoPic"/></div>
          <div class="logo" v-else></div>
          <div>
            <h3>{{webName}}</h3>
            <p>下载手机APP,多重好礼等你拿!</p></div>
        </div>
        <a class="download" @tap="togodownload">
          立即下载
        </a>
      </div> -->

      <div id="container" class="container">
            <!--轮播-->
            <!-- <div class="mui-slider" style="margin-top: 2.67rem;">
                <div class="mui-slider-group mui-slider-loop">
                  <div v-if='imgs.length!=0' class="mui-slider-item mui-slider-item-duplicate">
                    <a href="javascript:void(0)"
                      @tap="click_href(imgs[imgs.length-1].destinationUrl,imgs[imgs.length-1].title)">
                      <img :src="imgs[imgs.length-1].picture_url" :style="nowTitleHeight" :class="{'container':true,'disappear':disappear}"/></a>
                  </div>
                  <div class="mui-slider-item" :key="index" v-for="(img,index) in imgs">
                    <a href="javascript:void(0)" @tap="click_href(img.destinationUrl,img.title)">
                      <img :src="img.picture_url" :style="nowTitleHeight" :class="{'container':true,'disappear':disappear}"/>
                    </a>
                  </div>
                  <div v-if='imgs.length!=0' class="mui-slider-item mui-slider-item-duplicate">
                    <a href="javascript:void(0)" @tap="click_href(imgs[0].destinationUrl,imgs[0].title)"><img
                      :src="imgs[0].picture_url" :style="nowTitleHeight" :class="{'container':true,'disappear':disappear}"/></a>
                  </div>
                </div>
                <div class="mui-slider-indicator">
                  <div class="mui-indicator mui-active"></div>
                  <div :key="index" v-for='(item,index) in imgs' :class="index<imgs.length-1?'mui-indicator':'mui-indicator mHide'"></div>
                </div>
              </div> -->
                  <!--支持循环，需要重复图片节点-->
            <div class="slider" style="margin-top: 2.67rem;z-index: 1;" >
							<ul class="slider-main">
								<li :key="index" v-for='(item,index) in imgs' @tap="click_href(item.destinationUrl,img.title)">
									<img :src="item.picture_url" alt="">
								</li>
								<!-- <li>
									<img src="../assets/images/2.png" alt="">
								</li> -->
							</ul>
						</div>
        <div id="main" :class="baseIndex==2?'deep':''">
          <div id="pullrefresh">



            <div v-if="baseIndex==1" key="one" id="danmu">
              <!-- <div class="changeSkin" @tap="skin_color()"><span >切换主题</span></div> -->

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
                <div v-else @tap='togoannouncement' class="scroll">
                  <marquee v-html="scrollNotice.content" scrolldelay="150">{{scrollNotice.content}}</marquee>
                  <!--<div v-html="scrollNotice?scrollNotice.content:''">{{scrollNotice?scrollNotice.content:''}}</div>-->
                </div>
              </div>
              <div class="dm_content">
                <div class="navList">
                  <ul>
                    <li @tap="showHotArea(9,'走势')"><img src="../assets/images/base/zoushi.png" style="width: 40px;"><span class="exp">{{$t('走势')}}</span></li>
                    <li @tap="togodepositFile"><img src="../assets/images/base/cunkuan.png" style="width: 40px;"><span class="exp">{{$t('充值')}}</span></li>
                    <li @tap="clickEnchash"><img src="../assets/images/base/tikuan.png" style="width: 40px;"><span class="exp">{{$t('提款')}}</span></li>

                    <li @tap='skip_newUrl(0, "/myCenter", "")'>
                        <img src="../assets/images/base/wode.png" style="width: 40px;"><span class="exp" style="color:#fff;">{{$t('我的')}}</span>
                    </li>


                  </ul>
                </div>
                <div id="content" class="">
								<div class="" style="position:  relative;z-index: 1;">
									<div style="width: 90%;margin: 0 auto;">
										<div class="mui-row">
											<div class="mui-col-xs-6 mui-col-sm-6 move" @tap="showHotArea(1,'全部彩种')">
												<img src="../assets/images/base/dipincai.png">
												<div class="font">
													<h2 style="font-size: 15px;font-weight: 300;">{{$t('全部彩种')}}</h2>
													<p class="text">All Lottery</p>
													<p class="add">+</p>
												</div>
											</div>
											<div class="mui-col-xs-6 mui-col-sm-6 move" @tap="showHotArea(2,'热门彩')">
												<img src="../assets/images/base/11xuan5.png">
												<div class="font">
													<h2 style="font-size: 15px;font-weight: 300;">{{$t('热门彩')}}</h2>
													<p class="text">Hot Lottery</p>
													<p class="add">+</p>
												</div>
											</div>
											<div class="mui-col-xs-6 mui-col-sm-6 move" @tap="showHotArea(3,'时时彩')">
												<img src="../assets/images/base/remencai.png">
												<div class="font">
													<h2 style="font-size: 15px;font-weight: 300;">{{$t('时时彩')}}</h2>
													<p class="text">SSC</p>
													<p class="add">+</p>
												</div>
											</div>
											<div class="mui-col-xs-6 mui-col-sm-6 move" @tap="showHotArea(4,'快3')">
												<img src="../assets/images/base/kuai3.png">
												<div class="font">
													<h2 style="font-size: 15px;font-weight: 300;">快3</h2>
													<p class="text">K3</p>
													<p class="add">+</p>
												</div>
											</div>
											<div class="mui-col-xs-6 mui-col-sm-6 move" @tap="showHotArea(5,'11选5')">
												<img src="../assets/images/base/shishicai.png">
												<div class="font">
													<h2 style="font-size: 15px;font-weight: 300;">11选5</h2>
													<p class="text">11X5</p>
													<p class="add">+</p>
												</div>
											</div>
											<div class="mui-col-xs-6 mui-col-sm-6 move" @tap="showHotArea(6,'PCDD')">
												<img src="../assets/images/base/gaopincai.png">
												<div class="font">
													<h2 style="font-size: 15px;font-weight: 300;">PC蛋蛋</h2>
													<p class="text">PCDD</p>
													<p class="add">+</p>
												</div>
											</div>
                      <div class="mui-col-xs-6 mui-col-sm-6 move" @tap="showHotArea(7,'快乐十分')">
												<img src="../assets/images/base/gaopincai.png">
												<div class="font">
													<h2 style="font-size: 15px;font-weight: 300;">{{$t('快乐十分')}}</h2>
													<p class="text">KL10F</p>
													<p class="add">+</p>
												</div>
											</div>
                      <div class="mui-col-xs-6 mui-col-sm-6 move" @tap="showHotArea(8,'六合彩')">
												<img src="../assets/images/base/gaopincai.png">
												<div class="font">
													<h2 style="font-size: 15px;font-weight: 300;">{{$t('六合彩')}}</h2>
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
                <div id="biaoImg" class="biaoFalse" @tap="biaoImg">
                  <img id="biao"
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAABAUlEQVRYR+2XwQ3CMAxFvyeATWADuglskSscmx46AmxAWa+VamSJSFFJq4IUO4fmHClP389OQihkUSEc2ECmldgSUUukbdt93/eVc65b0xBZSuO9PwK4M/PLOXc1AWmapmLmJ4A9M99MQLz3F0kiJGACUtf1g4jOcRlUQUTKYRikFNXUBTWQICUAkfNrqYDEUs51RXaQqZQmICkpVUGWpLQAkXF9WjMpZU9WR8xLE6dQhKwBSNp3HMeOiHaqjqQOk4HGzDLaD2YDLRz86aakxFllnSuD+aW3JLFJIimJTUEEKEgMoDN5ocVlKuLxvPYKiPdlecVvIP8koPbT+xWuGEfe0MPJI6VdVAMAAAAASUVORK5CYII="/>
                </div>
                <div class="chat">
                  <div class="danmuSwitch">
                    <div v-if="!danmuFlag" @tap="danMu(1)" class="open">
                      <i class="iconfont1">&#xe7bf;<span>{{$t('弹幕')}}</span></i>

                    </div>
                    <div v-else @tap="danMu(0)" class="close">
                      <i class="iconfont1">&#xe607;<span>{{$t('弹幕')}}</span></i>

                    </div>
                  </div>
                  <div class="chatMes" @tap="togoChat">
                    <div>
                      <i class="iconfont1">&#xe7e3;</i>
                    </div>
                    <div>{{$t('聊天室')}}</div>
                  </div>
                  <div class="sign" @tap="togoSign">
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
                      @tap='togocontentUrl(item.bet_url,item.gameID,item.pic_url,item.type_name_CN)'>
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
                    <a href="javascript:void(0)" v-else @tap="popPrompt">
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
                    @tap="onlineCustomerServiceSkip(datas.onlineSys_config1)">{{$t('在线客服')}}</a>
                  <a :href="downUrl?downUrl:'javascript:;'" class="c_2b5eb2" @tap="togodownload">下载APP</a>

                </div>
              </div> -->


              <!--底部动态图-->
              <div class="topSwipeWrap fixed_right_bottom topHiPos4 usertype" id="hongbaolaile"
                  @tap='togohongbao'></div>

              <!--底部固定广告-->
              <div id="bottom-guanggao" class="hide" style="display: none;">
                <span class="close" @tap="close_banner"></span>
              </div>
            </div>
            <!-- <div v-else-if="baseIndex==2" key="two">
              <div class="inner">
                <div class="shuzicai_nav" v-show="lottery_caizhong==1">
                  <div class="games">
                    <div class="tabs">
                      <div>
                        <div class="tabItem" @tap="getGameIntro($event)">
                          <img src="../assets/images/qb.png" class="selectImg"/>
                          <p>{{$t('全部')}}</p>
                        </div>
                        <div class="tabItem" v-bind:key="index" v-for="(item,index) in gameKind" @tap="getGameIntro($event,item.code)">
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
                    <span class="iconfont icon-icon-eye-close" v-if="noView" @tap="noView=false"></span>
                    <span class="iconfont icon-icon-eye-open" v-if="!noView" @tap="noView=true"></span>
                  </p>
                  <p class="money-text" v-if="noView">{{$t('恭喜發財')}}</p>
                  <p class="money-text" v-if="!noView">{{coin}}</p>
                  <p class="winorlose" v-if="noView">今日输赢： ***{{coinUnit}}</p>
                  <p class="winorlose" v-if="!noView">今日输赢： {{winLoseCoin}}{{coinUnit}}</p>
                </div>
                <div class="card bg-public-deep-bgColor" @tap='togodepositFile'>
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
                <div class="card bg-public-deep-bgColor" @tap="clickEnchash">
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

                <div class="card bg-public-deep-bgColor" @tap='togoRecharge()' >
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
                <div class="card bg-public-deep-bgColor" @tap='togoPresent()'>
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


                <div class="card bg-public-deep-bgColor" @tap='togofootFundDetails'>
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


                <div class="card bg-public-deep-bgColor" @tap='togoperfectUserInfo'>
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
                        <a class="server" href="javascript:;" @tap='onlineCustomerServiceSkip(datas.onlineSys_config1)'>
                          <i class="icon iconfont icon-kefu"></i></a>
                        <a class="option" href="javascript:;" @tap='togosetting'><i
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
                        <a href="javascript:;" @tap='togodepositFile'>
                          <span class="iconcon iconcon-left"><i class="icon iconfont icon-zhifu"></i></span>
                          <span>{{$t('充值')}}</span>
                        </a>
                        <a href="javascript:;" @tap="clickEnchash">
                          <span class="iconcon iconcon-right"><i
                            class="icon iconfont icon-yunongtongqukuanfuwu"></i></span>
                          <span>{{$t('提现')}}</span>
                        </a>
                      </div>
                    </div>
                    <div class="record card bg-public-deep-bgColor">
                      <div class="title" @tap='togoperfectUserInfo'>
                        <span class="iconcon iconcon-3 bg-theme-color">
                          <i class="icon iconfont icon-morentouxiang"></i></span>
                        <span class="userInfo">{{$t('个人信息')}}</span>
                        <svg type="ios-arrow-right" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            viewBox="0 0 512 512" class="vux-x-icon vux-x-icon-ios-arrow-right arrow-right">
                          <path data-v-e48085d6="" d="M160 115.4L180.7 96 352 256 180.7 416 160 396.7 310.5 256z"></path>
                        </svg>
                      </div>
                      <div class="record-item">
                        <a href="javascript:;" @tap='togochangePwd(1)'><span class="iconcon iconcon-4"><i
                          class="icon iconfont icon-mima"></i></span>{{$t('登录密码')}}</a>
                        <a href="javascript:;" @tap='togochangePwd(2)'><span class="iconcon iconcon-5"><i
                          class="icon iconfont icon-unie604"></i></span>{{$t('资金密码')}}</a>
                        <a href="javascript:;" @tap='togoperfectUserInfo'><span class="iconcon iconcon-6"><i
                          class="icon iconfont icon-xinxi"></i></span>{{$t('账户信息')}}</a>
                        <a href="javascript:;" v-if="userType&&userType==1" @tap='showAgency'>
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
                        <a href="javascript:;" @tap='act'>
                          <span class="iconcon iconcon-6"><i class="icon iconfont1">&#xe634;</i></span>
                          优惠活动
                        </a>
                      </div>

                    </div>
                    <div class="record card bg-public-deep-bgColor">
                      <div class="title" @tap='togomessage'>
                        <span class="iconcon iconcon-3 bg-theme-color"><i
                          class="icon iconfont icon-iconset0337"></i></span>
                        <span class="userInfo">{{$t('我的消息')}}</span>
                        <svg type="ios-arrow-right" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            viewBox="0 0 512 512" class="vux-x-icon vux-x-icon-ios-arrow-right arrow-right">
                          <path data-v-e48085d6="" d="M160 115.4L180.7 96 352 256 180.7 416 160 396.7 310.5 256z"></path>
                        </svg>
                      </div>
                      <div class="title noBorder" @tap='togoannouncement'>
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
                    @tap='togocontentUrl(item.bet_url,item.gameID,item.pic_url,item.show_name)'>
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
                        <span class="phase">当前期号:{{item.issue}}</span>
                        <span class="status" v-if="item.deadlineStr">距离下期:{{item.deadlineStr}}</span>
                        <span class="status" v-else>{{item.msg}}</span>
                      </p>
                    </div>
                  </a>
                  <div class="foot">
                    <a href="javascript:;"
                      @tap='togocontentUrl(item.bet_url,item.gameID,item.pic_url,item.show_name)'><i
                      class="iconfont icon-qipaishi"></i>{{$t('前往投注')}}</a>
                    <a href="javascript:;" @tap="togoSkip(item)"><i
                      class="iconfont icon-shujutu font-important-color"></i>{{$t('开奖数据')}}</a>
                  </div>
                </li>
              </ul>
            </div> -->


          </div>


        </div>
        <!-- 弹出公告 -->
        <div id="popNotice" class="hide" v-cloak>
          <div class="wrap" @tap="hidePopupNotice()"></div>
          <div class="tit">{{$t('系统公告')}}<span class="close iconfont1" @tap="hidePopupNotice()">&#xe605;</span></div>
          <div class="popContent">

            <div class="title">{{popupNotice?popupNotice.title:''}}</div>
            <div class="content" v-html="popupNotice?popupNotice.content:''" style="padding-bottom: 1rem">
              {{popupNotice?popupNotice.content:''}}
            </div>

          </div>
        </div>


      </div>
      <div style="position: fixed;bottom: 0;left: 50%;margin-left: -45px;z-index: 10;">
					<a href="#offCanvasSide" class="mui-action-menu">
						<img src="static/images/gengduo.png" style="width: 90px;margin-bottom: -4px;">
					</a>
				</div>
      <div class="mui-off-canvas-backdrop"></div>
    </div>
    <div id="push" class="box mui-popover mui-popover-action mui-popover-bottom mui-scroll-wrapper">
			<div class="mui-scroll">
				<span class="mui-icon mui-icon-close" style="color: #fff;top: 15px;right: 15px;font-size: 40px;position: absolute;"></span>
				<div class="mui-text-center" style="padding: 30px 0 10px;color: #fff;">
					<h2 style="font-size: 24px;font-weight: 400;">{{hot_title}}</h2>
					<!-- <p style="margin: 0;font-size: 14px;line-height: 24px;font-weight: 300;color: #999;">hello world</p> -->
				</div>
				<ul v-if="hot_index<9" class="mui-table-view mui-table-view-chevron sub">
          <template v-if="hot_index==1">
					<li :key="index" v-for="(item,index) in hotArr" class="mui-table-view-cell mui-media">
						<a class="mui-navigate-right" href="javascript:void(0)"  v-if="item.bet_url!=''" @tap='togocontentUrl(item.bet_url,item.gameID,item.pic_url,item.type_name_CN)'>
							<img class="mui-media-object mui-pull-left"  :src="'static/'+item.pic_url" style="max-width: inherit;">
							<div class="mui-media-body">
								{{item.show_name}}
							</div>
							<div class="mui-media-right">
								<p class="msg">{{$t('距第')}}{{item.issue}}{{$t('期截止')}}</p>
								<div class="time" v-if="item.hour"><span class="hour">{{item.hour}}</span><span class="min">{{item.minute}}</span><span class="sec">{{item.second}}</span>
                 </div>
                      <p v-else>{{item.msg}}</p>
							</div>
						</a>
					</li>
          </template>
          <template v-if="hot_index==2">
          <li :key="index" v-for="(item,index) in hotArr" :class="item.is_hot=='1'?'mui-table-view-cell mui-media':'mHide'">
						<a class="mui-navigate-right" href="javascript:void(0)"  v-if="item.bet_url!=''" @tap='togocontentUrl(item.bet_url,item.gameID,item.pic_url,item.type_name_CN)'>
							<img class="mui-media-object mui-pull-left"  :src="'static/'+item.pic_url" style="max-width: inherit;">
							<div class="mui-media-body">
								{{item.show_name}}
							</div>
							<div class="mui-media-right">
								<p class="msg">{{$t('距第')}}{{item.issue}}{{$t('期截止')}}</p>
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
						<a class="mui-navigate-right" href="javascript:void(0)"  v-if="item.bet_url!=''" @tap='togocontentUrl(item.bet_url,item.gameID,item.pic_url,item.type_name_CN)'>
							<img class="mui-media-object mui-pull-left"  :src="'static/'+item.pic_url" style="max-width: inherit;">
							<div class="mui-media-body">
								{{item.show_name}}
							</div>
							<div class="mui-media-right">
								<p class="msg">{{$t('距第')}}{{item.issue}}{{$t('期截止')}}</p>
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
						<a class="mui-navigate-right" href="javascript:void(0)"  v-if="item.bet_url!=''" @tap='togocontentUrl(item.bet_url,item.gameID,item.pic_url,item.type_name_CN)'>
							<img class="mui-media-object mui-pull-left"  :src="'static/'+item.pic_url" style="max-width: inherit;">
							<div class="mui-media-body">
								{{item.show_name}}
							</div>
							<div class="mui-media-right">
								<p class="msg">{{$t('距第')}}{{item.issue}}{{$t('期截止')}}</p>
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
						<a class="mui-navigate-right" href="javascript:void(0)"  v-if="item.bet_url!=''" @tap='togocontentUrl(item.bet_url,item.gameID,item.pic_url,item.type_name_CN)'>
							<img class="mui-media-object mui-pull-left"  :src="'static/'+item.pic_url" style="max-width: inherit;">
							<div class="mui-media-body">
								{{item.show_name}}
							</div>
							<div class="mui-media-right">
								<p class="msg">{{$t('距第')}}{{item.issue}}{{$t('期截止')}}</p>
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
						<a class="mui-navigate-right" href="javascript:void(0)"  v-if="item.bet_url!=''" @tap='togocontentUrl(item.bet_url,item.gameID,item.pic_url,item.type_name_CN)'>
							<img class="mui-media-object mui-pull-left"  :src="'static/'+item.pic_url" style="max-width: inherit;">
							<div class="mui-media-body">
								{{item.show_name}}
							</div>
							<div class="mui-media-right">
								<p class="msg">{{$t('距第')}}{{item.issue}}{{$t('期截止')}}</p>
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
						<a class="mui-navigate-right" href="javascript:void(0)"  v-if="item.bet_url!=''" @tap='togocontentUrl(item.bet_url,item.gameID,item.pic_url,item.type_name_CN)'>
							<img class="mui-media-object mui-pull-left"  :src="'static/'+item.pic_url" style="max-width: inherit;">
							<div class="mui-media-body">
								{{item.show_name}}
							</div>
							<div class="mui-media-right">
								<p class="msg">{{$t('距第')}}{{item.issue}}{{$t('期截止')}}</p>
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
						<a class="mui-navigate-right" href="javascript:void(0)"  v-if="item.bet_url!=''" @tap='togocontentUrl(item.bet_url,item.gameID,item.pic_url,item.type_name_CN)'>
							<img class="mui-media-object mui-pull-left"  :src="'static/'+item.pic_url" style="max-width: inherit;">
							<div class="mui-media-body">
								{{item.show_name}}
							</div>
							<div class="mui-media-right">
								<p class="msg">{{$t('距第')}}{{item.issue}}{{$t('期截止')}}</p>
								<div class="time" v-if="item.hour">
                        <span class="hour">{{item.hour}}</span><span class="min">{{item.minute}}</span><span class="sec">{{item.second}}</span>
                      </div>
                      <p v-else>{{item.msg}}</p>
							</div>
						</a>
					</li>
          </template>
				</ul>
        <ul  v-else-if="hot_index==9" class="mui-table-view f_panel">
            <li class="mui-table-view-cell mui-collapse mui-active">
              <a class="mui-navigate-right" href="javascript:void(0);">{{$t('热门')}}</a>
              <div class="mui-collapse-content">
                <div :key="index" v-for="(item,index) in hotArr" class="mui-table-view-cell mui-media">
                  <a class="f_panel_block" href="javascript:void(0)"  v-if="item.bet_url!=''" @tap='togoSkip(item)'>
                    <div class="mui-media-body">
                      <p style="margin-bottom: 10px;">{{item.show_name}}</p>
                      <div class="time" v-if="item.hour">
                        <span class="hour">{{item.hour}}</span><span class="min">{{item.minute}}</span><span class="sec">{{item.second}}</span>
                      </div>
                      <p v-else>{{item.msg}}</p>
                    </div>
                    <div class="mui-media-right">
                      <p style="margin-bottom: 10px;" class="msg">第{{item.previousIssue?item.previousIssue:item.issue}}期</p>
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
              <a class="mui-navigate-right" href="javascript:void(0);">{{$t('时时彩')}}</a>
              <div class="mui-collapse-content">
                <div :key="index" v-for="(item,index) in hotArr" :class="item.code=='ssc'?'mui-table-view-cell mui-media':'mHide'">
                  <a class="f_panel_block" href="javascript:void(0)"  v-if="item.bet_url!=''" @tap='togoSkip(item)'>
                    <div class="mui-media-body">
                      <p style="margin-bottom: 10px;">{{item.show_name}}</p>
                      <div class="time" v-if="item.hour">
                        <span class="hour">{{item.hour}}</span><span class="min">{{item.minute}}</span><span class="sec">{{item.second}}</span>
                      </div>
                      <p v-else>{{item.msg}}</p>
                    </div>
                    <div class="mui-media-right">
                      <p style="margin-bottom: 10px;" class="msg">第{{item.previousIssue?item.previousIssue:item.issue}}期</p>
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
                  <a class="f_panel_block" href="javascript:void(0)"  v-if="item.bet_url!=''" @tap='togoSkip(item)'>
                    <div class="mui-media-body">
                      <p style="margin-bottom: 10px;">{{item.show_name}}</p>
                      <div class="time" v-if="item.hour">
                        <span class="hour">{{item.hour}}</span><span class="min">{{item.minute}}</span><span class="sec">{{item.second}}</span>
                      </div>
                      <p v-else>{{item.msg}}</p>
                    </div>
                    <div class="mui-media-right">
                      <p style="margin-bottom: 10px;" class="msg">第{{item.previousIssue?item.previousIssue:item.issue}}期</p>
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
                  <a class="f_panel_block" href="javascript:void(0)"  v-if="item.bet_url!=''" @tap='togoSkip(item)'>
                    <div class="mui-media-body">
                      <p style="margin-bottom: 10px;">{{item.show_name}}</p>
                      <div class="time" v-if="item.hour">
                        <span class="hour">{{item.hour}}</span><span class="min">{{item.minute}}</span><span class="sec">{{item.second}}</span>
                      </div>
                      <p v-else>{{item.msg}}</p>
                    </div>
                    <div class="mui-media-right">
                      <p style="margin-bottom: 10px;" class="msg">第{{item.previousIssue?item.previousIssue:item.issue}}期</p>
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
                <div :key="index" v-for="(item,index) in hotArr" :class="item.code=='PCDD'?'mui-table-view-cell mui-media':''">
                  <a class="f_panel_block" href="javascript:void(0)"  v-if="item.bet_url!=''" @tap='togoSkip(item)'>
                    <div class="mui-media-body">
                      <p style="margin-bottom: 10px;">{{item.show_name}}</p>
                      <div class="time" v-if="item.hour">
                        <span class="hour">{{item.hour}}</span><span class="min">{{item.minute}}</span><span class="sec">{{item.second}}</span>
                      </div>
                      <p v-else>{{item.msg}}</p>
                    </div>
                    <div class="mui-media-right">
                      <p style="margin-bottom: 10px;" class="msg">第{{item.previousIssue?item.previousIssue:item.issue}}期</p>
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
                  <a class="f_panel_block" href="javascript:void(0)"  v-if="item.bet_url!=''" @tap='togoSkip(item)'>
                    <div class="mui-media-body">
                      <p style="margin-bottom: 10px;">{{item.show_name}}</p>
                      <div class="time" v-if="item.hour">
                        <span class="hour">{{item.hour}}</span><span class="min">{{item.minute}}</span><span class="sec">{{item.second}}</span>
                      </div>
                      <p v-else>{{item.msg}}</p>
                    </div>
                    <div class="mui-media-right">
                      <p style="margin-bottom: 10px;" class="msg">第{{item.previousIssue?item.previousIssue:item.issue}}期</p>
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
                  <a class="f_panel_block" href="javascript:void(0)"  v-if="item.bet_url!=''" @tap='togoSkip(item)'>
                    <div class="mui-media-body">
                      <p style="margin-bottom: 10px;">{{item.show_name}}</p>
                      <div class="time" v-if="item.hour">
                        <span class="hour">{{item.hour}}</span><span class="min">{{item.minute}}</span><span class="sec">{{item.second}}</span>
                      </div>
                      <p v-else>{{item.msg}}</p>
                    </div>
                    <div class="mui-media-right">
                      <p style="margin-bottom: 10px;" class="msg">第{{item.previousIssue?item.previousIssue:item.issue}}期</p>
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
					<span class="mui-icon mui-icon-close" style="color: #fff;font-size: 40px;margin-top: 10px;margin-bottom: 15px;"></span>
				</div>
			</div>
			<div class="up" style="position: fixed;right: 10px;bottom: 20px;padding: 10px;border-radius: 50%;background: #fff;z-index: 999;box-shadow: 0 0 3px #eee;">
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
  </div>

</template>

<script src="../assets/js/index.js"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="../style/index.css" scoped></style>
<style lang="less" scoped>
.mHide{
  display: none !important;
}
#pullrefresh{
  height:auto;
}
</style>




