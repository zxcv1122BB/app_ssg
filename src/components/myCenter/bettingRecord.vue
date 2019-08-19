<template>
 <div>
 	<div id="container">
	<div id="betRecord">
		<header id="header">
			<a href="javascript:void(0)" class="goBack" @click="routerBack"></a>
			<h1 v-if="status==1">{{$t('中奖记录')}}</h1>
			<h1 v-else>{{$t("bettingRecord")}}</h1>
		</header>
		<router-view v-if="!$route.meta.keepAlive">
		</router-view>
		<article id="article" class="content">
      <!-- <div class="downQuery" v-if="isAgency==1">
        <input type="text">
        <span>></span>
      </div> -->
	  		<div class="sta_nav">
				  <ul class="mui-row clearfix">
					<li @click="choStatus('')" :class="status===''?'active':''">{{$t('全部')}}<span class="line"></span></li>
					<li @click="choStatus(0)" :class="status===0?'active':''">{{$t('未中奖')}}<span class="line"></span></li>
					<li @click="choStatus(1);" :class="status==1?'active':''">{{$t('已中奖')}}<span class="line"></span></li>
					<li @click="choStatus(2);" :class="status==2?'active':''">{{$t('已撤单')}}<span class="line"></span></li>
					<li @click="choStatus(3);" :class="status==3?'active':''">{{$t('未开奖')}}<span class="line"></span></li>
				  </ul>
			</div>
			<div class="mui-row tbNav clearfix">
				<div class="chooseTime">
					<div id="date"  style="position: relative;">
						<input id="showDate" class="show" type="text" style="" readonly="" value="近7天" />
						<!-- <div class="jian"><img src="../../assets/images/jiantou.png" /></div> -->
					</div>
					<ul id="selectDate" class="select" style="">
						<li @click="allTime()">近7天</li>
						<li @click="now();">{{$t('今天')}}</li>
						<li @click="yes();">{{$t('昨天')}}</li>
						<li @click="week();">{{$t('本周')}}</li>
						<!--<li @click="month();">本月</li>-->
						<li @click="lastMonth();">7天前</li>
					</ul>
				</div>
				<div class="chooseType">
					<div id="type" style="position: relative;">
						<input id="showType" class="show" type="text" style="" readonly="" value="所有彩种" />
						<!-- <div class="jian"><img src="../../assets/images/jiantou.png" /></div> -->
					</div>
					<ul id="selectType" class="selectType" style=" overflow:scroll; height:25rem;">
						<li @click="selectType('');" class="choose_yes all"><span class="gameName" style="font-size: 16px;">{{$t('所有彩种')}}</span></li>
						<li v-for="(item,index) in variety.name">
							<span>{{item}}</span>
							<ul>
								<li v-for="(it,index2) in variety.list[index]" @click="selectType(it.gameId,1)" :key="index2" :id="it.gameId" class="choose_no">
									<i>{{it.gameName}}</i>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</div>

			<!-- <div class="chooseStatus">
				<div id="status"  style="position: relative;">
					<input id="showStatus" class="show" type="text" style="" readonly="" value="所有状态" />
					<div class="jian"><img src="../../assets/images/jiantou.png" /></div>
				</div>
				<ul id="selectStatus" class="selects" style="">
					<li @click="choStatus('')" class="active">{{$t('所有状态')}}<span class="line"></span></li>
					<li @click="choStatus(0)">{{$t('未中奖')}}<span class="line"></span></li>
					<li @click="choStatus(1);">{{$t('已中奖')}}<span class="line"></span></li>
					<li @click="choStatus(2);">{{$t('已撤单')}}<span class="line"></span></li>
					<li @click="choStatus(3);">{{$t('未开奖')}}<span class="line"></span></li>
				</ul>
			</div> -->
			<section id="section" style="overflow: auto;">
				<div>
					<div v-for="(item,index) in datas" :key="index" :class="item.isCal==1&&item.status==1?'suc isclick':'fal isclick'" v-cloak @click='skip(item)'>
						<ul>
							<li><span style="font-size:1.2rem;">{{item.gameName}}</span></li>
							<li><span style="color:rgb(172, 172, 172);margin-right:1.5rem;font-size:.9rem;">{{item.playedName+"-"+item.groupName}}</span><span class="coin">¥{{item.amount}}</span></li>
							<li><span style="color:rgb(172, 172, 172);font-size:.9rem;" v-cloak>{{item.actionTime}}</span></li>
						</ul>
						<!-- <ul>
							<li v-cloak class="img"><img :src="'static/'+item.gameUrl" /><span style="margin-left: 1.8rem;">{{item.gameName}}</span></li>
							<li><span v-cloak>{{item.actionTime}}</span></li>
						</ul> -->
						<div :class="item.isCal==1&&item.status==1?'sbtn btn_suc':'sbtn btn_fal'"></div>
						<ul>
							<!-- <li v-cloak>{{$t('投注金额')}}：<span v-cloak>{{item.amount}}</span>{{coinUnit}}</li> -->
							<li style="margin-top: 2rem;">
								<span v-if="item.isCal==1&&item.status==1" class="coin">+¥{{item.bonus}}</span>
								<!-- <span v-if="item.isCal==1&&item.status==1" class="coin">+¥{{item.bonus}}<em v-if="item.type!=2">{{coinUnit}}</em></span> -->
								<span v-else-if="item.isCal==0"  style="color: #000;position: absolute;width: 4rem;font-size: .7rem;top: .15rem;right: 0;" v-cloak>{{item.status==2?"已撤单":"未开奖"}}</span>
								<span v-else-if="item.isCal==2" style="color: #000;position: absolute;width: 4rem;font-size: .6rem;top: .2rem;right: 0;">{{$t('开奖失败')}}</span>
								<span v-else-if="item.status==0" style="color: green;position: absolute;width: 4rem;font-size: .7rem;top: .15rem;right: 0;">{{$t('未中奖')}}</span>
								<span v-else style="color: #000;position: absolute;width: 4rem;font-size: .7rem;top: .15rem;right: 0;" v-cloak>{{item.status==2?"已撤单":"成功"}}</span>
							</li>
						</ul>
					</div>
					<div class="has-more" style="text-align: center;line-height: 40px;color: #fff;"></div>

				</div>

				<!-- <div v-for="(item,index) in datas" :key="index" class="isclick" v-cloak @click='skip(item)'>
					<ul>
						<li v-cloak class="img"><img :src="'static/'+item.gameUrl" /><span style="margin-left: 1.8rem;">{{item.gameName}}</span></li>
						<li><span v-cloak>{{item.actionTime}}</span></li>
					</ul>
					<ul>
						<li v-cloak>{{$t('投注金额')}}：<span v-cloak>{{item.amount}}</span>{{coinUnit}}</li>
						<li>
							<span v-if="item.isCal==1&&item.status==1" v-cloak style="color: red;">{{item.bonus}}<em v-if="item.type!=2">{{coinUnit}}</em></span>
							<span v-else-if="item.isCal==0" v-cloak>{{item.status==2?"已撤单":"未开奖"}}</span>
							<span v-else-if="item.isCal==2">{{$t('开奖失败')}}</span>
							<span v-else-if="item.status==0" style="color: green;">{{$t('未中奖')}}</span>
							<span v-else v-cloak>{{item.status==2?"已撤单":"成功"}}</span>
						</li>
					</ul>
				</div> -->

				<!--加载更多-->

			</section>
			<div id="background_gray">

			</div>
			<div id="noMessage">
				<img src="../../assets/images/background.png" height="200rem" />
				<p>{{$t('暂无数据')}}</p>
			</div>
		</article>
	</div>
	</div>
 </div>
</template>

<script src="../../assets/js/myCenter/bettingRecord.js"></script>

<style src="../../style/myCenter/centerGlobal.css" scoped></style>

<style lang="less" scoped>
.custome-ba142b #container{
	background: url(../../assets/images/base/black_bg.png)no-repeat ;
  background-size: 100% 100%;
}
#background_gray{
	top: 2.67rem;
}
#header{
	border-bottom: 1px solid#808080;
}
#betRecord #article section div ul:nth-of-type(2){
	background: initial;
}
#betRecord #article section{
	    padding: 0.5rem;
    margin: 0;
	// background: url(../../assets/images/base/black_bg.png) ;
	// background-size: cover;
	background: url(../../assets/images/base/black_bg.png) no-repeat;
    background-size: 100% 100%;
    width: 100%;
}
#betRecord #article section .isclick{
	border-radius: .5rem;
	margin-bottom: .5rem;
	padding: .5rem;
	height: 6.2rem;
	color: #fff;
	border-bottom-width: 0;
	box-shadow: 0 1px 2px #000;
	position: relative;
}
#betRecord #article section .isclick.suc{
	background: url(../../assets/images/base/bg_sbet_03.png) repeat-x;
}
#betRecord #article section .isclick.fal{
	background: url(../../assets/images/base/bg_fbet_07.png) repeat-x;

}
#betRecord #article section div ul li{
	line-height: initial;
	margin: .2rem 0;
	margin-left: .5rem;
}
#article{
	.sta_nav{
		filter: progid:DXImageTransform.Microsoft.Gradient(gradientType=0, startColorStr=#000000, endColorStr=#575956); /*IE 6 7 8*/
		background: -ms-linear-gradient(top, #000000,#575956); /* IE 10 */
		background: -moz-linear-gradient(top, #000000,#575956); /*火狐*/

		background: -webkit-gradient(
			linear,
			0% 0%,
			0% 100%,
			from(#000000),
			to(#575956)
		); /* Safari 4-5, Chrome 1-9*/
		background: -webkit-linear-gradient(
			top,
			#000000,
			#575956
		); /*Safari5.1 Chrome 10+*/
		// background: -o-linear-gradient(top, #15205c, #162362); /*Opera 11.10+*/
		background: linear-gradient(
			to bottom,
			#000000,
			#575956
		);
		background:  -o-linear-gradient(
			to bottom,
			#000000,
			#575956
		); /* Standard syntax; must be last */
		color: #a1a1a1;

		height: 3rem;
		line-height: 3rem;
		.mui-row{
			li{
				width: 20%;
				float: left;
				text-align: center;
				position: relative;
				&.active{
					color: #fff;

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
	}
	.tbNav{
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
		filter: progid:DXImageTransform.Microsoft.Gradient(gradientType=0, startColorStr=#000000, endColorStr=#575956); /*IE 6 7 8*/
		background: -ms-linear-gradient(top, #000000,#575956); /* IE 10 */
		background: -moz-linear-gradient(top, #000000,#575956); /*火狐*/

		background: -webkit-gradient(
			linear,
			0% 0%,
			0% 100%,
			from(#000000),
			to(#575956)
		); /* Safari 4-5, Chrome 1-9*/
		background: -webkit-linear-gradient(
			top,
			#000000,
			#575956
		); /*Safari5.1 Chrome 10+*/
		// background: -o-linear-gradient(top, #15205c, #162362); /*Opera 11.10+*/
		background: linear-gradient(
			to bottom,
			#000000,
			#575956
		);
		background:  -o-linear-gradient(
			to bottom,
			#000000,
			#575956
		); /* Standard syntax; must be last */
		// color: #a1a1a1;
		border-top: 1px solid#808080;

		.chooseTime{
			width: 50%;
			text-align: center;
			float: left;
			box-sizing: border-box;
			border-right: 1px solid #808080;
			position: relative;
			.select{
				top: 3rem;
				width: 100%;
				left: 0;
				background: #50504f;
				li{
					color:#fff;
				}
			}
		}
		.chooseType{
			width: 50%;
			text-align: center;
			float: left;

			// position: relative;
			.selectType{
				top: 8.5rem;
				background: #50504f;
				li{
					color: #fff;
				}
			}
		}
		.choose_yes{
			background: #78d6d5;
		}
		input{
			border: none;
			text-align: center;
			background: initial;
			color: #fff;
			width: 100%;
		}
	}
	#section{
		.coin{
			color: #f4a15e;
		}
		.sbtn{
			display: inline-block;
			position: absolute;
			right: -1%;
			top: 0;
			background: #000;
			width: 4rem;
			height: 2rem;
			&.btn_suc{
				background: url(../../assets/images/base/btn_suc_03.png) no-repeat;
				background-size: contain;
			}
			&.btn_fal{
				background: url(../../assets/images/base/btn_fal_06.png) no-repeat;
				background-size: contain;
			}
		}
	}
}
</style>

