<template>
  <div>
    <div id="container">
      <div id="main">
        <!-- <header id="header">
            <h1>{{$t('注册')}}</h1>
            <a class="goBack" href="javascript:void (0)"  @click="routerBack"></a>
        </header> -->
        <!-- <p class="tit"></p> -->
        <!--输入框-->
        <div class="head">
                        <img src="../../assets/images/base/logo.png">
                    </div>
                    <div class="area">
					<div class="left">
						<div class="title">{{$t('注册')}}</div>
                        <div class="leftCenter">
                            <div class="mui-input-row btn_bg">
                                <label><i class="mui-icon mui-icon-person"></i></label>
                                <input name="name" type="text" class="mui-input-clear mui-input"  v-model="userName" @keyup="userName=userName.replace(/[^\w\/]/ig,'') " placeholder="设置账户名(5-11个字符)" id="userName" data-input-clear="5"><span class="mui-icon mui-icon-clear mui-hidden"></span>
                            </div>


                            <div class="mui-input-row btn_bg">
                                <label><i class="mui-icon mui-icon-locked"></i></label>
                                <input name="password" type="password" class="mui-input-clear mui-input" v-model="password" placeholder="请输入密码(6-16个字符)" id="passWord" data-input-clear="3"><span class="mui-icon mui-icon-clear mui-hidden"></span>
                            </div>
                            <div class="mui-input-row btn_bg">
                                <label><i class="mui-icon mui-icon-locked"></i></label>
                                <input name="confirm_password" type="password" class="mui-input-clear mui-input"  v-model="password_" placeholder="确认密码"  id="passWordAgain" data-input-clear="4"><span class="mui-icon mui-icon-clear mui-hidden"></span>
                            </div>
                            <div class="mui-input-row btn_bg">
                                <label><i class="mui-icon mui-icon-upload"></i></label>
                                <input type="text" id="code" name="code" placeholder="推广码" v-model="promotionCode"/><span class="mui-icon mui-icon-clear mui-hidden"></span>
                            </div>
                            <div class="mui-input-row btn_bg">
                                <label><i class="mui-icon mui-icon-navigate"></i></label>
                                <input type="text" class="mui-input" placeholder="验证码"   v-model="inputCode" id="inputCode" name="sms_code" style="width: 45%;float: left;">
                                <a id="code" class="mui-btn mui-btn-block mui-btn-primary" style="border-radius: 0 5px 5px 0;width: 35%; font-size: 12px;padding: 0;margin: 0;height: 100%;"><img :src="'data:image/png;base64,'+imgUrl" width="125" height="35" class="img_adaptive" @click="getImgcode()" style="height: 2.5rem;"/></a>
                            </div>


                            <div>
                                <!-- <a  class="mui-btn mui-btn-block mui-btn-primary login_btnbg" style="border-radius: 8px;padding: 8px 0;border: none;" id="btn" @click="clickBtn">登录</a> -->
                                <span class="reg_btnbg"  @click="loginsubmit">{{$t('注册')}}</span>

                            </div>
                        </div>
					</div>


					<div class="right" @click="togoLogin">
						<span class="rlicon"></span>
						<span>{{$t('返回登录')}}</span>
					</div>
				</div>
            <div class="l_close"  @click="routerBack">
                        <img src="../../assets/images/base/close.png" alt="">
                    </div>
                    <!-- <div class="register ">
                        <router-link :to="{ name: 'login'}">
                        <a  class="mui-btn mui-btn-block mui-btn-primary login_btnbg" style="padding: 8px 0;">{{$t('登陆')}}</a>
                    </router-link>
                    </div> -->
        <!-- <div class="regDiv">

            <form id="reg-form" class="mui-input-group" style="background: none;">
                <div class="mui-input-row btn_bg">
                            <label><i class="mui-icon mui-icon-person"></i></label>
                            <input name="name" type="text" class="mui-input-clear mui-input"  v-model="userName" @keyup="userName=userName.replace(/[^\w\/]/ig,'') " placeholder="设置账户名(5-11个字符)" id="userName" data-input-clear="5"><span class="mui-icon mui-icon-clear mui-hidden"></span>
                        </div>


                        <div class="mui-input-row btn_bg">
                            <label><i class="mui-icon mui-icon-locked"></i></label>
                            <input name="password" type="password" class="mui-input-clear mui-input" v-model="password" placeholder="请输入密码(6-16个字符)" id="passWord" data-input-clear="3"><span class="mui-icon mui-icon-clear mui-hidden"></span>
                        </div>
                        <div class="mui-input-row btn_bg">
                            <label><i class="mui-icon mui-icon-locked"></i></label>
                            <input name="confirm_password" type="password" class="mui-input-clear mui-input"  v-model="password_" placeholder="确认密码"  id="passWordAgain" data-input-clear="4"><span class="mui-icon mui-icon-clear mui-hidden"></span>
                        </div>
                         <div class="mui-input-row btn_bg">
                            <label><i class="mui-icon mui-icon-upload"></i></label>
                            <input type="text" id="code" name="code" placeholder="推广码" v-model="promotionCode"/><span class="mui-icon mui-icon-clear mui-hidden"></span>
                        </div>
                        <div class="mui-input-row btn_bg">
                            <label><i class="mui-icon mui-icon-navigate"></i></label>
                            <input type="text" class="mui-input" placeholder="验证码"   v-model="inputCode" id="inputCode" name="sms_code" style="width: 45%;float: left;">
                            <a id="code" class="mui-btn mui-btn-block mui-btn-primary" style="border-radius: 0 5px 5px 0;width: 35%; font-size: 12px;padding: 0;margin: 0;height: 100%;"><img :src="'data:image/png;base64,'+imgUrl" width="125" height="35" class="img_adaptive" @click="getImgcode()"/></a>
                        </div>

                    </form>
                    <div class="mui-content-padded">
                    <input type="button" class="mui-btn mui-btn-block mui-btn-primary reg_btnbg" @click="loginsubmit" value="注册" style="border-bottom: 0;margin:0;color:#fff;padding:.5rem;font-size: 1rem;height:3rem;border: none;border-radius:8px;" id="btn"/>
                </div>
            <div class="phone">

                <div style="clear: both;"></div>
                <div id="prompt"></div>

            </div>
        </div> -->

        <div id="fullbg"></div>
        <div id="success">
            <p><img src="../../assets/images/success.png" style="width: 5rem;"/></p>
            <p>恭喜你！注册成功！<a href="/#/myCenter/login">{{$t('去登陆')}}</a></p>
        </div>

      </div>
    </div>
  </div>
</template>

<script src="../../assets/js/myCenter/register.js"></script>


<style src="../../style/myCenter/register.css" scoped></style>
