<template>
 <div>
 	<div id="container">
	<div id="changePwd">
		<header id="header">
			<a href="javascript:void(0)" class="goBack" @click="routerBack"></a>
			<h1>{{$t('修改密码')}}</h1>
		</header>
		<article id="article">
			<nav>
				<span class="clickYes">{{$t('修改登录密码')}}</span>
				<span @click="changeCoinPwd" style="color: #9e9e9e;">{{$t('修改资金密码')}}</span>
			</nav>
				<section class="section">
					<form action="">
						<div class="dShow">
							<div><span>{{$t('原密码')}}　　</span><input type="password"   required  placeholder="请输入当前登录密码" id="oldPwd" @blur="checkOldPwd" /></div>
							<div><span>{{$t('新密码')}}　　</span><input type="password"  required  placeholder="请输入6-16个字符新密码"  id="pwd1"/></div>
							<div><span>{{$t('确认新密码')}}</span><input type="password"  required  placeholder="请再次输入新密码" id="pwd2" @blur="validate()"/></div>
						</div>
						<div id="tishi"></div>
						<input type="button"  class="subtn" value="确认修改" @click="updatePwd" id="changeOldPwd"/>
					</form>
					<form action="">
						<div class="dShow">
							<div style="position:relative"><span>{{$t('原密码')}}　　</span><input type="password"  v-model="password1" :style="isSh_password1==1?'opacity: 0;left: 30%;':'left: 30%;'"  required  placeholder="请输入原资金密码" />
								<input id="oldCoinPwd" @blur="checkOldCoinPwd" type='number'  :style="isSh_password1==2?'position: absolute;left: 30%;;z-index: 10;opacity:0;background: rgba(0, 0, 0, 0);width:65%;color:#fff;':'color:#fff;position: absolute;left: 30%;;z-index: 10;background: rgba(0, 0, 0, 0);width:65%;    border: 0;'" pattern="[0-9]*"  @touchstart="isSh_password1=1"  v-model="password1" maxlength="6" onkeyup="value=value.replace(/[^\d\.]/g,'');" oninput="if(value.length>6)value=value.slice(0,6)"  placeholder="请输入原资金密码"/>
							</div>
							<div style="position:relative"><span>{{$t('新密码')}}　　</span><input type="password" v-model="password2" :style="isSh_password2==1?'opacity: 0;left: 30%;':'left: 30%;'" required  placeholder="请输入6个数字新密码" />
								<input id="pwd3" type='number'  :style="isSh_password2==2?'position: absolute;left: 30%;;z-index: 10;opacity:0;background: rgba(0, 0, 0, 0);width:65%;color:#fff;':'color:#fff;position: absolute;left: 30%;;z-index: 10;background: rgba(0, 0, 0, 0);width:65%;    border: 0;'" pattern="[0-9]*"  @touchstart="isSh_password2=1" @blur="isSh_password2=2" v-model="password2" maxlength="6" onkeyup="value=value.replace(/[^\d\.]/g,'');" oninput="if(value.length>6)value=value.slice(0,6)"  placeholder="请输入6个数字新密码"/>
							</div>
							<div style="position:relative"><span>{{$t('确认新密码')}}</span><input type="password"  v-model="password3" :style="isSh_password3==1?'opacity: 0;left: 30%;':'left: 30%;'" required  placeholder="请再次输入新密码"/>
								<input id="pwd4" @blur="validate2" type='number'  :style="isSh_password3==2?'position: absolute;left: 30%;;z-index: 10;opacity:0;background: rgba(0, 0, 0, 0);width:65%;color:#fff;':'color:#fff;position: absolute;left: 30%;;z-index: 10;    background: rgba(0, 0, 0, 0);width:65%;    border: 0;'" pattern="[0-9]*"  @touchstart="isSh_password3=1"  v-model="password3" maxlength="6" onkeyup="value=value.replace(/[^\d\.]/g,'');" oninput="if(value.length>6)value=value.slice(0,6)"  placeholder="请再次输入新密码"/>
							</div>
						</div>
						<div id="prompt"></div>
						<input type="button"  class="subtn" value="确认修改" @click="updateCoinPwd" id="changeOldCoinPwd"/>
					</form>
				</section>
		</article>
	</div>
	</div>
 </div>
</template>

<script src="../../assets/js/myCenter/changePwd.js"></script>

<style src="../../style/myCenter/centerGlobal.css" scoped></style>


<style lang="less" scoped>
.custome-ba142b #container{
	background: url(../../assets/images/base/black_bg.png)no-repeat ;
  background-size: 100% 100%;
		height: 100%;
	}
	#container .subtn{
		    height: 3rem;
    text-align: center;
    margin-left: 10%;
	}
	 #container #changePwd #article nav{
    background: rgba(0, 0, 0, 0);
	}
	.clickYes{
		    color: #fff;
    	border-bottom: 1px solid #fff;
	}
	#changePwd #article section .dShow{
		padding: 1rem;background: rgba(0, 0, 0, 0);
	}
	#changePwd .section span{
		color: #fff;
		
	}
	#changePwd #article section input[type=password] {
		width: 65%;
		color: #ffff;
		    background: rgba(0, 0, 0, 0)
	}
</style>

