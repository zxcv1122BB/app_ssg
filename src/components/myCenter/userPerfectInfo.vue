<template>
  <div>
    <div id="container">
	<div id="identity">
		<header id="header">
			<a href="javascript:void(0)"  class="goBack" @click="routerBack"></a>
			<h1>{{$t('完善个人信息')}}</h1>
		</header>
		<div id="mainBody">

			<ul class="infoForm" v-for="(item,index) in userInfoList" v-cloak v-if="item.is_show == 1">
				<li><label>
					<!--<p style="display: none;">
						<span :id=item.is_check></span>
						<span :id=item.is_input></span>
						<span :id=item.is_only></span>
					</p>-->
					<b v-if="item.is_input == 1" v-cloak><i style="color: red;">*</i>{{item.attr_name}}</b><b v-if="item.is_input == 0" v-cloak>{{item.attr_name}} </b>
					<em>
						<input v-if="perfectMarker && item.attr_name_en == 'NAME'" disabled="true" @change="onChange_validate(item,index)" type="text" v-model="item.attr_value" :id=item.attr_name_en :placeholder=item.intro_info  />
						<input v-else @change="onChange_validate(item,index)" type="text" v-model="item.attr_value" :id=item.attr_name_en :placeholder=item.intro_info  />
					</em></label></li>
				<div v-if="item.msgTipsFlag" v-cloak>{{item.msgTipsMsg}}</div>
			</ul>
			<!-- <ul class="infoForm" v-if="!bankPrivacyStatus">
				<li style="color: red;">{{$t('请完善您的收款信息')}}</li>
			</ul> -->
			<ul class="infoForm" v-cloak>
				<li><label>
					<b><i style="color: red;">*</i>{{$t('银行名称')}}</b>
					<em @click="openBankArea(1)">
						<!-- <input v-if="bankPrivacyStatus" disabled="true" type="text" placeholder="请输入开户银行" id="bankName" v-model="bankName"/>
						<input v-else type="text" @change="bankName_validate()" placeholder="请输入开户银行" id="bankName" v-model="bankName"/> -->
						<input disabled="true" type="text" @change="bankName_validate()" placeholder="请输入开户银行" id="bankName" v-model="bankName"/>
					
					</em></label></li>
				<div v-if="bankNameTipsFlag" v-cloak>{{bankNameTipsMsg}}</div>
			</ul>
			<!-- <ul class="infoForm" v-cloak>
				<li><label>
					<b><i style="color: red;">*</i>{{$t('银行卡号')}}</b>
					<em>
						<input v-if="bankPrivacyStatus" disabled="true" type="text" placeholder="请输入银行卡号" id="bankAccount" v-model="bankAccount" />
						<input v-else type="text" @change="bankAccount_validate()" placeholder="请输入银行卡号" id="bankAccount" v-model="bankAccount" />
					</em></label></li>
				<div v-if="bankAccountTipsFlag" v-cloak>{{bankAccountTipsMsg}}</div>
			</ul> -->
			<!-- <ul class="infoForm" v-cloak>
				<li><label>
					<b><i style="color: red;">*</i>{{$t('银行卡号')}}</b>
					<em>
						<input v-if="bankPrivacyStatus" disabled="true" type="text" placeholder="请输入银行卡号" id="bankAccount" v-model="bankAccount" />
						<input v-else type="text" @change="bankAccount_validate()" placeholder="请输入银行卡号" id="bankAccount" v-model="bankAccount" />
					</em></label></li>
				<div v-if="bankAccountTipsFlag" v-cloak>{{bankAccountTipsMsg}}</div>
			</ul> -->
			<ul class="infoForm" v-cloak>
				<li><label>
					<b><i style="color: red;">*</i>{{$t('开户分行')}}</b>
					<em>
						
						<!-- <input v-if="bankPrivacyStatus" disabled="true" type="text" placeholder="请输入省市区(县)" id="bankAddress" v-model="bankAddress" />
						<input v-else type="text" @change="bankAddress_validate()" placeholder="请输入省市区(县)" id="bankAddress" v-model="bankAddress" /> -->
							<input type="text" @change="bankAddress_validate()" placeholder="请输入省市区(县)" id="bankAddress" v-model="bankAddress" />
					
					</em>
				</label></li>
				<div v-if="bankAddressTipsFlag" v-cloak>{{bankAddressTipsMsg}}</div>
			</ul>
						<ul class="infoForm" v-cloak>
				<li><label>
					<b><i style="color: red;">*</i>{{$t('银行卡号')}}</b>
					<em>
						<!-- <input v-if="bankPrivacyStatus" disabled="true" type="text" placeholder="请输入银行卡号" id="bankAccount" v-model="bankAccount" />
						<input v-else type="text" @change="bankAccount_validate()" placeholder="请输入银行卡号" id="bankAccount" v-model="bankAccount" /> -->
						<input type="text" @change="bankAccount_validate()" placeholder="请输入银行卡号" id="bankAccount" v-model="bankAccount" />
					
					</em></label></li>
				<div v-if="bankAccountTipsFlag" v-cloak>{{bankAccountTipsMsg}}</div>
			</ul>
			<!-- <ul class="infoForm" v-cloak style="position:absolute;top:0;right:2000px;height:30px;overflow:hidden;">
				<li><label>
					<b><i style="color: red;">*</i>{{$t('开户分行')}}</b>
					<em>
						
						<input v-if="bankPrivacyStatus" disabled="true" type="text" placeholder="请输入开户行地址" id="bankAddress" v-model="bankAddress" />
						<input v-else type="text" @change="bankAddress_validate()" placeholder="请输入开户行地址" id="bankAddress" v-model="bankAddress" />
					</em>
				</label></li>
				<div v-if="bankAddressTipsFlag" v-cloak>{{bankAddressTipsMsg}}</div>
			</ul> -->
			<!-- <ul class="infoForm" v-if="!coinPrivacyStatus || coinPrivacyStatus == 0">
				<li style="color: red;">{{$t('请完善您的资金密码')}}</li>
			</ul> -->
			<!-- <ul style="position:absolute;top:0;right:2000px;height:30px;overflow:hidden;" class="infoForm" v-cloak v-if="!coinPrivacyStatus || coinPrivacyStatus == 0">
				<li><label>
					<b><i style="color: red;">*</i>{{$t('资金密码')}}</b>
					<em>
						<input type='number' val='' style='z-index=10' />
						<input v-if="!coinPrivacyStatus && coinPrivacyStatus == 1" disabled="true" type="password" placeholder="请输入6位数字" v-model="password1" id="password1"/>
						<input v-else type="password" placeholder="请输入6位数字" onkeyup="this.value=this.value.replace(/[^\d]/g,'') " onafterpaste="this.value=this.value.replace(/[^\d]/g,'') " maxlength="6" v-model="password1" id="password1"/>
					</em></label></li>
				<div v-if="password1TipsFlag" v-cloak>{{password1TipsMsg}}</div>
			</ul> -->
				<ul class="infoForm" v-cloak v-if="!coinPrivacyStatus || coinPrivacyStatus == 0">
					<li><label>
						<b><i style="color: red;">*</i>{{$t('资金密码')}}</b>
						<em style="position:relative">
							<input type='number'  :style="isSh_password1==2?'position: absolute;right: 0;z-index: 10;opacity:0;':'position: absolute;right: 0;z-index: 10;'" pattern="[0-9]*"  @touchstart="isSh_password1=1" @blur="isSh_password1=2" v-model="password1" maxlength="6" onkeyup="value=value.replace(/[^\d\.]/g,'');" oninput="if(value.length>6)value=value.slice(0,6)"  placeholder="请输入6位数字"/>
							<input v-if="!coinPrivacyStatus && coinPrivacyStatus == 1" :style="isSh_password1==1?'opacity: 0;':''" pattern="[0-9]*" disabled="true" type="password" placeholder="请输入6位数字" v-model="password1" id="password1"/>
							<input v-else type="password" :style="isSh_password1==1?'opacity: 0;':''" placeholder="请输入6位数字" onkeyup="this.value=this.value.replace(/[^\d]/g,'') " onafterpaste="this.value=this.value.replace(/[^\d]/g,'') " maxlength="6" v-model="password1" id="password1"/>
							
							<!-- <input v-if="!coinPrivacyStatus && coinPrivacyStatus == 1" disabled="true" type="password" placeholder="请输入6位数字" v-model="password1" id="password1"/>
							<input v-else type="password" placeholder="请输入6位数字" onkeyup="this.value=this.value.replace(/[^\d]/g,'') " onafterpaste="this.value=this.value.replace(/[^\d]/g,'') " maxlength="6" v-model="password1" id="password1"/> -->
						</em></label></li>
					<div v-if="password1TipsFlag" v-cloak>{{password1TipsMsg}}</div>
				</ul>
			<ul class="infoForm" v-cloak v-if="!coinPrivacyStatus || coinPrivacyStatus == 0">
				<li><label>
					<b><i style="color: red;">*</i>{{$t('确认密码')}}</b>
					<em style="position:relative">
						<input type='number'  :style="isSh_password2==2?'position: absolute;right: 0;z-index: 10;opacity:0;':'position: absolute;right: 0;z-index: 10;'" pattern="[0-9]*"  @touchstart="isSh_password2=1" @blur="isSh_password2=2" v-model="password2" maxlength="6" onkeyup="value=value.replace(/[^\d\.]/g,'');" oninput="if(value.length>6)value=value.slice(0,6)"  placeholder="请输入6位数字"/>
							
						<input v-if="!coinPrivacyStatus && coinPrivacyStatus == 1" :style="isSh_password2==1?'opacity: 0;':''" disabled="true" type="password" placeholder="请确认资金密码" v-model="password2" id="password2"/>
						<input v-else type="password" @change="password_validate()" :style="isSh_password2==1?'opacity: 0;':''" onkeyup="this.value=this.value.replace(/[^\d]/g,'') " onafterpaste="this.value=this.value.replace(/[^\d]/g,'') " maxlength="6" placeholder="请确认资金密码" v-model="password2" id="password2"/>
					</em></label></li>
				<div v-if="password2TipsFlag" v-cloak>{{password2TipsMsg}}</div>
			</ul>
			<div class="subBtn" @click="submit_validate">
				<a>{{$t('提交')}}</a>
			</div>
		</div>

		


	</div>

	<div id="bankArea">
			<div class="wrap"></div>
			<div class="bankArea">
				<div class="title">
					<span class="close" v-on:click="openBankArea(0)">X</span>
					<span>{{$t('银行名称')}}</span>
				</div>
				<div class="content">
						<div class="seachArea">
							<input type="text" placeholder="请输入银行名称关键字" v-model="bN_keyword">

						</div>
						<div class="bankList" v-if="bankArea_data">
							<div v-for="(item,index) in bankArea_data" v-bind:key="index">
									<div class="tit" v-if="bN_keyword?item.dataStr.indexOf(bN_keyword)!=-1?1:0:1"><span>{{item.letter}}</span></div>
									<div class="con">
										<p @click="sel_bankName(its)" v-for="(its,inds) in item.data" v-if="bN_keyword?its.indexOf(bN_keyword)!=-1?1:0:1">{{its}}</p>
									</div>
							</div>
						</div>
				</div>	
			</div>
		</div>


	</div>
 </div>
</template>

<script src="../../assets/js/myCenter/userPerfectInfo.js"></script>

<style scoped>
#identity {
    position: relative;
    height: 100%;
    overflow: scroll;
}
#container{
	background: url(../../assets/images/base/black_bg.png)no-repeat ;
  background-size: 100% 100%;
	height:100%;
}
#identity #header{
	position: fixed;
	top: 0;
	left: 0;
	z-index:9999;
}
#identity #mainBody{
	/* background: #fff; */
	font-size:1.1rem;
	/* color:#ba142b; */
	margin:2rem 1rem 1rem 1rem;
	border-radius: 5px;
	padding: 0.2rem;
	/* background: white; */
}
.infoForm{
	margin:1rem .8rem 0;
	position: relative;
}
.infoForm li{
	display: block;
	/*border:1px solid #ccc;*/
	border-bottom:0;
	/* background-color:#fff; */
	color:#666;
	/* padding:0.4rem; */
	margin-bottom: 1.2rem;
}
.infoForm li label {
	display:table;
	width:100%;
}
.infoForm li b{
	display:table-cell;
	width:6rem;
	font-size:1.1rem;
	height:1.5rem;
	line-height: 1.5rem;
	padding-right:.5rem;
	color:#999	;
}
.infoForm li label em{
	display: table-cell;
	font-size:1.5rem;
	height:1.5rem;
	line-height: 1.5rem;
}
.infoForm li label input{
	display:table-cell;
	width:100%;
	vertical-align: middle;
	font-size:1.1rem;
	border:0;
	outline:none;
	background: rgba(0, 0, 0, 0);
	margin-bottom:0px;
	color: #fff;
}
.infoForm li:nth-child(3){
	border-bottom:1px solid #ccc;
}
.infoForm li:last-child{
	margin-top:1rem;
	border-bottom:1px solid #ccc;
}
.infoForm>div{
	font-size: 1rem;
    color: red;
    position: absolute;
    bottom: -.5rem;
    left: 6rem;
    height: 10px;
    margin-top: 1rem;
}
.errBox {
    height: 3rem;
    line-height: 3rem;
    /* color: #ba142b; */
    text-align: center;
}
.subBtn>a{
    display: block;
    font-size: 1.2rem;
    margin: .83rem;
    line-height: 3.25rem;
    /* background-color: #ba142b; */
    -webkit-border-radius: .5rem;
    border-radius: .5rem;
    cursor: pointer;
    color: #fff;
    text-align: center;
}

#identity #mainBody{
	margin-top: 3.67rem;
}


/* 银行名称区域 */
#bankArea{
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
		    left: 100%;
    transition: all .5s ease;
}
#bankArea.show{
	left: 0;
}
#bankArea .wrap{
	    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.5);
    z-index: 10000;
		display:none;
}
#bankArea .wrap.show{
	display:block;
}
#bankArea .bankArea{
	    color: #000;
    position: absolute;
    top: 50px;
    background: #fff;
    left: 5%;
    width: 90%;
    height: calc(100% - 100px);
    overflow: hidden;
    z-index: 10001;
		border-radius:10px;
}
#bankArea .bankArea .title{
	text-align:center;
	padding:10px;
	position:relative;
	background:#78d6d5;
	color:#f5f5f5;
}
#bankArea .bankArea .title .close{
	position:absolute;
	left:10px;
}
#bankArea .bankArea .seachArea{
	padding:10px;
	height:50px;
}
#bankArea .bankArea .seachArea input{
	height:30px;
	border-radius:10px;
}
#bankArea .bankArea .tit{
	background:#ddd;
	padding:5px 0;
	padding-left:10px;
}
#bankArea .bankArea .con p{
	padding:5px 0;
	margin-left:20px;
	border-bottom:1px solid #ddd;
	width:calc(100% - 40px);
}
#bankArea .bankArea .con p:last-child{
	border-bottom-width:0;
}
#bankArea .bankArea .content{
	height:100%;
}
#bankArea .bankArea .bankList{
	    height: calc(100% - 100px);
    overflow: scroll;
}
</style>
