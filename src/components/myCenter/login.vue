<template>
  <div>
    <div id="container">
  		<div id="main">
			<!--顶部-->
			<!-- <header id="header">
				<h1>{{$t('登录')}}</h1>
         <a class="goBack" href="javascript:void(0)" @click="routerBack"></a>
			</header> -->
			<!--登录框-->
			<div class="loginDiv">
				<div class="head">
					<img src="../../assets/images/base/logo.png">
				</div>
				<div class="area">
					<div class="left">
						<div class="title">{{$t('登录')}}</div>
						<div class="leftCenter">
							<div class="mui-input-row btn_bg" style="margin-bottom: 10px;">
								<label><i class="mui-icon mui-icon-person"></i></label>
								<input name="phone" type="text" class="mui-input-clear mui-input" id="loginPhone"  placeholder="账户名"
							onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" data-input-clear="1"><span class="mui-icon mui-icon-clear mui-hidden"></span>
							<img src="../../assets/images/base/close_01.png" @click="clearUser" class="input_close" alt="">
							</div>
							<div class="mui-input-row btn_bg">
								<label><i class="mui-icon mui-icon-locked"></i></label>
								<input name="password" id="loginPassword" type="password" placeholder="密码"
							onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" class="mui-input-clear mui-input" data-input-clear="2"><span class="mui-icon mui-icon-clear mui-hidden"></span>
							</div>

							<div class="link-area clearfix">
								<!-- <a href="javascript:void(0)" class="mui-btn" @click="togoIndex">返回首页</a> -->
								<a href="javascript:void(0)" class="mui-btn btn_bg"  @click="setRmPwd($event)" style="padding-left:10px;"><span class="rp_icon"></span>{{$t('记住密码')}}</a>
								<a href="javascript:void(0)" class="mui-btn btn_bg"  @click="togokefu(onlineUrl)">忘记密码？</a>
								<!-- <a href="javaScript:void(0)" class="mui-btn" @click='forget' >忘记密码？</a> -->
								<!-- <a href="/index/login/re_pwd" class="mui-btn" >忘记密码?</a>
								<a href="/index/login/reg" class="mui-btn" >实名注册</a> -->
							</div>
							<div>
								<!-- <a  class="mui-btn mui-btn-block mui-btn-primary login_btnbg" style="border-radius: 8px;padding: 8px 0;border: none;" id="btn" @click="clickBtn">{{$t('登录')}}</a> -->
								<span class="loginBtn" @click="clickBtn">{{$t('登录')}}</span>
							</div>
						</div>


					</div>
					<div class="right" @click="togoRegister">
						<span class="rlicon"></span>
						<span>{{$t('注册新用户')}}</span>
					</div>
				</div>

				<div class="l_close"  @click="routerBack">
					<img src="../../assets/images/base/close.png" alt="">
				</div>

				<!-- <p>
					<span id="user">
						<img src="../../assets/images/user.gif" />
					</span>
					<input id="loginPhone" type="text" placeholder="请输入账户名"
					onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;"/></p>
				<p> -->
					<!-- <span id="pwd">
						<img src="../../assets/images/pwd.gif"/>
					</span>
					<input /></p> -->
				<div class="prompt"> </div>

				<!--<a class="loginBtn" style="background-color: white;color: #383838;" @click="registerFree">免费试玩</a>-->



			</div>
			<div id="fullbg"></div>
			<div class="popup">
				<div class="body">
					<div class="go_service">
						<p>{{$t('联系客服修改密码')}}</p>
					</div>
				</div>
				<div class="footer">
					<a href="javascript:;" class="yes" @click='togoyes'>{{$t('火速前往')}}</a>
					<a href="javascript:;" class="no" @click='togono'>{{$t('残忍拒绝')}}</a>
				</div>
			</div>
			<div class="mask"></div>
		</div>
 		</div>
 	</div>
</template>

<script src="../../assets/js/myCenter/login.js"></script>

<style src="../../style/myCenter/login.css" scoped></style>
