<template>
    <div>
        <div id="container">
            <div id="setting">
                <header id="header">
                    <a href="javascript:void(0)" class="goBack" @click="routerBack"></a>
                    <h1>{{$t('个人设置')}}</h1>
                </header>
                <article id="article">
                    <section id="section" style="display: block;">
                        <div class="hang"><span>{{$t('声音效果')}}</span>
                            <span><!-- 简洁模式开关打开状态 -->
								<div class="mui-switch mui-switch-mini mui-active" id="node" @click="clickNode">
								  <div class="mui-switch-handle"></div>
								</div>
							</span>
                        </div>
                        <div class="hang"><span>{{$t('摇一摇机选')}}</span>
                            <span>
				        <div class="mui-switch mui-switch-mini mui-active" id="yao" @click="clickYao">
							  	<div class="mui-switch-handle"></div>
								</div>
							</span>
                        </div>
                        <div id="sel_font" class="hang clearfix">
                            <span>{{$t('设置字体大小')}}</span>
                            <div class="select_size">
                                <select  v-model="sizes">
                                    <option value="1"  style="font-size: 1rem">{{$t('小')}}</option>
                                    <option value="2" style="font-size: 1.1rem">{{$t('中')}}</option>
                                    <option value="3" style="font-size: 1.2rem">{{$t('大')}}</option>
                                </select>

                            </div>
                        </div>
                        <!--<div id="skin" class="hang clearfix" style="text-align: left;">-->
                          <!--<span>设置皮肤颜色</span>-->
                          <!--<div class="select_skin">-->
                                <!--<select  v-model="skin_color">-->
                                    <!--<option value="1" >红</option>-->
                                    <!--<option value="2" >蓝</option>-->
                                    <!--<option value="3" >绿</option>-->
                                <!--</select>-->

                            <!--</div>-->
                        <!--</div>-->
                        <div class="hang" style="overflow: hidden; display: none;" id="version" @click="checkVersion">
                            <p style="float: left;width: 30%;">{{$t('检查更新')}}</p>
                            <p style="float: right;width: 70%;text-align: right;">
                                <img class="version_img" src="../../assets/images/new.png"
                                     style="display: inline-block;vertical-align: middle;"/>
                                <i v-cloak>{{version}}</i>
                            </p>
                        </div>
                        <div @click="clearStorage" class="hang" id="clear"><span>{{$t('清除缓存')}}</span><span></span></div>

                        <div class="logOut" @click="loginOut">
                          <a href="javascript:;">
                            <span style="text-align: center">{{$t('退出登录')}}</span>
                          </a>

                        </div>


                    </section>

                </article>
            </div>
        </div>
    </div>
</template>

<script src="../../assets/js/myCenter/setting.js"></script>

<style src="../../style/myCenter/centerGlobal.css" scoped></style>
