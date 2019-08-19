<template>
  <div>
    <div id="container">
      <div id="depFile">
        <header id="header">
          <a href="javascript:void(0)" class="goBack" @click="routerBack"></a>
          <h1>{{$t('充值')}}</h1>
					<div class="detail" @click="to_rechargeRecord">{{$t('充值明细')}}</div>
        </header>
        <article id="article" v-cloak style="margin-top:54px;">
          <!-- <div class="topNav">
            <div class="mui-row">
              <div class="mui-col-xs-4 mui-col-sm-4 mui-active">{{$t('在线支付')}}<span class="line"></span></div>
              <div class="mui-col-xs-4 mui-col-sm-4">{{$t('银行转账')}}<span class="line"></span></div>
              <div class="mui-col-xs-4 mui-col-sm-4">{{$t('快捷支付')}}<span class="line"></span></div>
							<nav v-cloak v-if="allpayWay.length!=0">
								<span v-bind:key="index"
									v-for="(items,index) in allpayWay"
									@click="clickPayTitle(items.pay_type)"
									
									v-cloak
								>{{items.payType_name}}<span class="line"></span></span>
								
							</nav>
            </div>
          </div> -->
          <section>
						<!-- <p class="con_tit" style="height:48px;">
							<span class="blue"></span>
							<span style="position:absolute;left:0;color: #78d6d5;">{{$t('用户信息')}}</span> 
						</p> -->
						<div class="userInfo clearfix">
							<div class="left">
								<div class="blueBall">
									<span>{{userName?userName.substr(0,2):''}}</span>
								</div>
							</div>
							<div class="right" v-cloak>
								<p>
                <em id="userName">{{userName}}</em>
              </p>
              <p >
                余额：
                <em id="balance">{{balance}}</em>
                {{coinUnit}}
              </p>
							</div>
						</div>
            <!-- <p class="userInfo">
              <span>
                {{$t('账号')}}：
                <em id="userName">{{userName}}</em>
              </span>
              <span v-cloak>
                {{$t('可用余额')}}：
                <em id="balance">{{balance}}</em>
                {{coinUnit}}
              </span>
            </p> -->
            <div class="clear"></div>

            <div class="moneyPart" v-cloak>
              <div class="payNum" v-cloak>
                请输入充值金额：
                <input type="number" pattern="[0-9]*" placeholder="输入金额 (只能输入数字)" id="coin" @keyup="getNum()" style="width:50%;background-color:rgba(0,0,0,0);color:#fff;">
                {{coinUnit}}
              </div>
              <div class="cho_coin" v-if="coinList.length!=0">
                <span class="coin" v-for="item in coinList">
                  <em>{{item}}</em>
                  {{coinUnit}}
                </span>
              </div>
            </div>
            <!-- <div class="choose con_tit" style="color: #78d6d5;"><span class="blue"></span>选择支付方式</div> -->
            <!-- <nav v-cloak v-if="allpayWay.length!=0">
              <span
                v-for="(items,index) in allpayWay"
                @click="clickPayTitle(items.pay_type)"
                class="payTit"
                v-cloak
              >{{items.payType_name}}</span>
            </nav> -->
						<div style="color: #fff;font-size: 1rem;padding: .5rem; margin: 0 15px;"><span>{{$t('请选择充值类型')}}</span></div>
            <div class="navMes" v-cloak>
              <div class="iconImg">
                <div v-if="payWay.length!=0">
                  <ul v-for="(ways,index) in payWay" class="nav" @click="clickNav(ways,index)">
                    <!-- <li class="iconImgs" v-if="ways.pay_type==2||ways.pay_type==3" style="width: 4rem">
                      <img :src="ways.payico_url">
                    </li>
                    <li
                      class="iconImgs"
                      v-else-if="ways.payment_mode==0||ways.payment_mode==1||ways.pay_type==1"
                    >
                      <img :src="'static/'+ ways.payico_url">
                    </li> -->
                    <li class="info" v-if="ways.info" v-cloak>{{ways.info}}<i class="mui-icon mui-icon-forward"></i></li>
                    <li class="info" v-else v-cloak>{{ways.compname}}<i class="mui-icon mui-icon-forward"></i></li>
                    <li
                      class="info"
                      v-if="ways.min_money&&ways.max_money"
                      v-cloak
                    >支付限额:{{ways.min_money}}{{coinUnit}}-{{ways.max_money}}{{coinUnit}}</li>
                  </ul>
                  <!-- <p class="payBtn">
                    <input type="button" value="下一步" @click="clickPay(1)">
                  </p> -->
                </div>
                <div class="navNoMes" v-else>
                  <p>{{$t('暂无数据')}}</p>
                  <p>{{$t('请选择其他支付方式')}}</p>
                </div>
              </div>
              <!--<div class="iconImg" v-else-if="show_index==2">
						<ul v-for="(ways,index) in fastPay" class="nav" @click="clickNav(ways,index)">
							<li v-cloak>{{ways.pay_name}}</li>
							<li class="info" v-cloak>{{ways.info}}</li>
							<li class="info" v-if="ways.min_money&&ways.max_money" v-cloak>支付限额:{{ways.min_money}}{{coinUnit}}-{{ways.max_money}}{{coinUnit}}</li>
						</ul>
						<div class="navNoMes">
							<p>{{$t('暂无数据')}}</p>
							<p>{{$t('请选择其他支付方式')}}</p>
						</div>
						<p class="payBtn"><input type="button" value="下一步" @click="clickPay(2)" /></p>
					</div>
					<div class="iconImg" v-else-if="show_index==3">
						<ul v-for="(ways,index) in blankPay" class="nav" @click="clickNav(ways,index)">
							<li v-cloak>{{ways.bank_name}}</li>
							<li class="info" v-cloak>{{ways.info}}</li>
							<li class="info" v-if="ways.min_money&&ways.max_money" v-cloak>支付限额:{{ways.min_money}}{{coinUnit}}-{{ways.max_money}}{{coinUnit}}</li>
						</ul>
						<div class="navNoMes">
							<p>{{$t('暂无数据')}}</p>
							<p>{{$t('请选择其他支付方式')}}</p>
						</div>
						<p class="payBtn"><input type="button" value="下一步" @click="clickPay(3)" /></p>
              </div>-->
            </div>
          </section>
        </article>
      </div>
    </div>
  </div>
</template>

<script src="../../assets/js/myCenter/depositFile.js"></script>

<style src="../../style/myCenter/centerGlobal.css" scoped></style>
<style lang="less" scoped>
// #depFile #article nav{
// 	background: initial;
// 	height: 100%;
// }
.custome-ba142b #container{
	background: url(../../assets/images/base/black_bg.png);
	background-size: 100% 100%;
}
#depFile #article .moneyPart{
	margin: 0;
	padding: 0;
}
#depFile #article .choose{
	color: #000;
}
#header{
		.detail{
			position:absolute;
			right: 1rem;
			height: 22px;
			top: 11px;
			color: #ccc
		}
	}
#article {
	margin-top: 44px;
	
	.topNav {
		text-align: center;
		height: 3rem;
		line-height: 3rem;
		color: #a1a1a1;
		border-top: 1px solid#808080;
		// filter: progid:DXImageTransform.Microsoft.Gradient(gradientType=0, startColorStr=#15205c, endColorStr=#162362); /*IE 6 7 8*/
		// background: -ms-linear-gradient(top, #15205c, #162362); /* IE 10 */
		// background: -moz-linear-gradient(top, #15205c, #162362); /*火狐*/

		// background: -webkit-gradient(
		// 	linear,
		// 	0% 0%,
		// 	0% 100%,
		// 	from(#15205c),
		// 	to(#162362)
		// ); /* Safari 4-5, Chrome 1-9*/
		// background: -webkit-linear-gradient(
		// 	top,
		// 	#15205c,
		// 	#162362
		// ); /*Safari5.1 Chrome 10+*/
		// background: -o-linear-gradient(top, #15205c, #162362); /*Opera 11.10+*/
		// background: linear-gradient(
		// 	to bottom,
		// 	#15205c,
		// 	#162362
		// ); /* Standard syntax; must be last */
		span{
			display: inline-block;
			width: 33.3%;
			float: left;
			&.chooseYes{
				color: #fff;
				position: relative;
					
				.line{
					background: #fff;
					height: 2px;
					width: 30%;
					display: inline-block;
					position: absolute;
					bottom: 0;
					left: 35%;
				}
			}
		}
		
	}
	section{
		.con_tit{
			// background: #eff2f4;
			color: #000;
			font-weight: 700;
			font-size: 1.1rem;
			text-indent: 1rem;
			line-height: 3rem;
			position: relative;
			.blue{
				// background: #15205c;
				background: #78d6d5;
				width: 1rem;
				height: 1rem;
				display: inline-block;
				position: absolute;
				left: -0.5rem;
				top: 1rem;
				border-radius: 25%;
			}
		}
		.navMes {
			// background: #fff;	
			padding-bottom: 1rem;
			// border-bottom: 1px solid #ddd;
    	// box-shadow: 1px 1px 1px #a0a0a0;
			.payBtn{
				text-align: center;
				margin-top: 1rem;
			}
	    
		}
		.userInfo{
			// background: #fff;
			// border-bottom: 1px dashed #cecece;
			color:#fff;
		}
		// .payNum{
		// 	border-bottom: 1px solid #ddd;
    // 	box-shadow: 1px 1px 1px #a0a0a0;
		// }
	}
	.userInfo{
		    padding: 1rem;
		.left{
			float: left;
		
			.blueBall{
					width: 50px;
				height: 50px;
				background: #78d6d5;
				border-radius: 50%;
				position: relative;
				// text-align: center;
				span{
					position: absolute;
					top: 50%;
					font-size: 30px;
					left: 50%;
				}
			}
			
		}
		.right{
			float: left;
			padding-left:10px;
		}
	}
}

#container #depFile #article .navMes .nav{
	background: none;
	padding: 0;
	margin: 0;
	padding-left: 1rem;
	// border-bottom: 1px solid #cecece;
	.info{
		position:relative;
				padding: 20px 0;
				color: #fff;
		.mui-icon{
			position: absolute;
			right: 1rem;
			font-size: 2rem;
			color: #fff;
			top: 50%;
    	margin-top: -1rem;
		}
	}
}

</style>
