<template>
<div>
    <div id="container">
  <div>
    <div id="main">
			<!--顶部-->
			<header id="header">
				<h1>{{$t('任选九')}}</h1>
				<a class="goBack" href="javascript:void(0)" @click="routerBack"></a>
				<a class="wenhao" href="javascript:void(0)" @click='togohelp'>?</a>
			</header>
			<!--期数与截止时间-->
			<div class="time clearf" v-if="!isNoMsg" v-cloak>
				<p class="time-left">第{{banner_number}}期</p>
				<p class="time-right">{{$t('距截止')}}:{{endTime}}</p>
			</div>
			<!--赛事战绩-->
			<div class="saishi" v-if="!isNoMsg">
				<span>赛事/截止</span>
				<span>{{$t('主胜')}}(3)</span>
				<span>平局(1)</span>
				<span>{{$t('客胜')}}(0)</span>
			</div>

			<!--内容列表-->
			<div class="inner" id="pullrefresh">
        <div v-if="isNoMsg" class='noMsg'><img class='icon' src='static/images/bg_noMsg_white.png'/><p>{{$t('当前投注没有比赛')}}</p><p>{{$t('您可以到其他投注区查看')}}</p></div>
				<ul :class="isNoMsg?'':'inner-ul mui-table-view mui-table-view-chevron'">
					<li :key="index" class="inner-li" v-for='(item,index) in datas' :id="item.id" :data-index="item.match_id">
						<!--上半部分-->
						<div class="li-top">
							<!--左边-->
							<div class="top-left" v-cloak>
								<p>{{item.sessions}}</p>
								<p>{{item.league_name?item.league_name.substring(0,3):''}}</p>
								<span class="detail" data-index="0" @click="detail(item.event_id,item.home_team_name,item.away_team_name,item.home_team_id,item.away_team_id)"></span>
							</div>
							<!--右边-->
							<div class="top-right">
								<div :class="(item.winNum==1)?'selected right-1':'right-1'" :data-sp="item.win" data-index="0" @click="selectItem(0,index,item.match_id,$event)" v-cloak>
									{{item.home_team_name}}
									<p>{{$t('主胜')}}(3)</p>
								</div>
								<div :class="(item.drawNum==1)?'selected right-2':'right-2'" :data-sp="item.draw" data-index="1" @click="selectItem(1,index,item.match_id,$event)" v-cloak>
									VS
									<p>平(1)</p>
								</div>
								<div :class="(item.loseNum==1)?'selected right-3':'right-3'" :data-sp="item.lose" data-index="2" @click="selectItem(2,index,item.match_id,$event)" v-cloak>
									{{item.away_team_name}}
									<p>{{$t('客胜')}}(0)</p>
								</div>
							</div>
						</div>
					</li>
				</ul>
			</div>
			<!--点击下一步后要显示的-->
			<div class="inner-hide">
				<div class="quitEdit" @click="quitEdit()">
					<p>{{$t('退出编辑')}}</p>
				</div>
				<ul>
					<li :key="index" class="inner-hide-li" v-for="(item,index) in datas" v-if="item.isShow==1" :id="item.id">
						<div>
							<span>{{item.sessions}}</span>
							<span>{{item.home_team_name}} VS {{item.away_team_name}}</span>
						</div>
						<div>
							<span style="border-right: none;" :class="(item.winNum==1)?'selected':''" @click="selectItem(0,index,item.match_id,$event)">3</span>
							<span style="border-right: none;" :class="(item.drawNum==1)?'selected':''" @click="selectItem(1,index,item.match_id,$event)">1</span>
							<span :class="(item.loseNum==1)?'selected':''" @click="selectItem(2,index,item.match_id,$event)">0</span>
						</div>
					</li>
				</ul>
			</div>
			<!--遮罩层-->
			<div class="zhezhao"></div>
			<!--弹出层-->
			<div class="tishi">
				<p class="prompt">{{$t('确定要清空所有选项')}}？</p>
				<p class="tanchu clearf">
					<a href="javascript:void(0)" @click='esc'>{{$t('取消')}}</a>
					<a href="javascript:void(0)" @click='confirm'>{{$t('确定')}}</a>
				</p>
			</div>
			<!--底部按钮-->
			<div class="btn">
				<p class="btn-p1"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAEG0lEQVRoQ+2aT2oUQRTG33cCkwuouYAm2yAkXkDjCTQnUFeCCEkQwZ16AuMJoifQLMSl0QuoG8GVEXdunvzG10NN90xPdXXPwIAFQ0imu+p978/3/lRkK7604vLboADcfcfMNs1sLfmJjr4mn0+SzoZSXC8A7o6gN83sjpntJkKdThGQZ6/G38/N7J2ZHUt60wdMEQB3v2xmd0NwBEOI1wglCW3PXO6OhQALaADx/CF7SAJYp9UZgLsfmNk9s5H7PedTcjBShiIQ/nYAuS8JRWSvbABx2En49lEfwevSxd4oA3c8NjOAZFkjC4C7Y3KE/4bphwzCFIy77wWAL2Z2PQfEXADujq++NLNXuE7Optn2n/JgWAM3uhQgWhmrFUBo/i3CSwLIUlawGywFiI02pc0EEGyB8LDD0oSvNJSA8DZ3mgogXkZ4vt9dtNvMMmsoscoXMF9jzQIAtfECwhdnTXe/AT1K+lzqe0kMEtSAmVgNABFEsMCRJIAUrWAUmOuPmV2U9KNoo3/5YhQPkjZyAMDDaJ5sW7zc/amZPYgNpmovd/NEqfuSkG+8JizQ9mDuYUkQPjKzx/H7NUnvu+6RPu/uCL5Tt0IdAH5/KIn6ptdy96EBUEN9NLOtNC7rAPD90yFoc2gAaNPdKfxeSxoz0hhA4j63uhZU00y1IACjeil1oxRAVTKsD8H7CwJArQSzkZ1HZXsKAMrck4Sv9V4LAgAzVoXeKCekACig1iSlnVUxkEUAiDigtKDcxp0mAICIjqo4edVob1AWSuiZyoBAHsmZWmBVAEzI+R/ArCBZYAyQzCjxGy608kEMIpLEVjH1JC+6+0MzexJ/2pb0oe++0af8jAanQaNDJ7JtM6Mp+m5mVyT9HgBAayKrksQgpURfYWeUJ3A/yXZc6teLOdIzuWDpPXAOYHcnCxPAzWIushxfHEhaz9mw7ZnoZxlUMaDi0NaR47zzkglJazlduVGj85l3QP37KH0Zi7B6j2WioWl0itN64qmdTxcACVtUrzFSLy4Ss1vKcKPKCn2bemqWapz+IvXbLsoImWAzSuhGn942VmF8TjNeNFYJK0AG5/VGvAuAzmOVQExPTKJonYp1EaTk2WQ6SAzlD7YCBD4LiBNJ+yUC9HknnQ62xU/ucJeroKWBSISHzjeLhruV9hIf7HTxUKr95CKFKdzc0ebc+4GaO5EJyRFFgT0PVIwjuYvgIiVrqJwFIKFXSm6okcoVasy6BsoQHHp8Rp3T9SIlG0DiUtXkGoaiuCoGEu7CpSF0i9a5AVrMJV+qxTiYQ6G2C3HFysFM9XKuWbkQ532YDsFRCo16Z4t2tkANCPkCs/OhcKtWY46f3N7zzK8KdFeN192xF4ApBRwzpXn/anA2JAkMCmBesC7i+5UH8BeqWCtP4QhLLAAAAABJRU5ErkJggg==" width="20" height="20" /> 猜对9场比赛结果，即可中得最高500万奖金</p>
				<p class="btn-p2">
					<span>{{$t('已选择')}}1场，还差2场</span>
					<span>
						<i class="trash_icon"></i>
						<span @click='clearSelect'>{{$t('清空')}}</span>
					</span>
				</p>
				<a href="javascript:void(0)" @click="sub">{{$t('请选择全部比赛结果')}}</a>
			</div>
			<!--底部按钮第二套,点击下一步则显示-->
			<div class="btn2 goNext">
				<div class="btn2-top clearf">
					<p class="top-1">
						<span>{{$t('买')}}</span>
						<input type="number" v-model="multiple" value="1" id="multipleNum" @keyup="multipleNum_limit($event)" @input="multipleNum_change($event)" @propertychange="multipleNum_change($event)" />
						<span>{{$t('倍')}}</span>
					</p>
					<p class="top-2">
						<span>1注,</span>
						<span>共2{{coinUnit}}</span>
					</p>
					<p class="fixMultiple"><span @click="fix_multiple_change($event,10)">10倍</span><span @click="fix_multiple_change($event,20)">20倍</span><span @click="fix_multiple_change($event,50)">50倍</span><span @click="fix_multiple_change($event,100)">100倍</span></p>
					<p class="state"><span>{{state}}<em>{{state=="游客"?"":"(可用)"}}</em></span></p>
				</div>
				<div class="btn2-bottom">
					<a href="javascript:void (0)" @click="payment($event)">{{$t('立即付款')}}</a>
					<p>
						{{$t('我已阅读并同意')}}
						<a href="javascript:void (0)" @click="togorule">《{{$t('委托投注规则')}}》</a>
					</p>
				</div>
			</div>
			<div id='sharkit' @click='isShark && sharkitFn($event)'></div>
			<audio class="hide" id="audio_shark" src="./static/res/shark_voice.mp3"  preload="auto"></audio>

			<!--底下按钮对应的弹出框-->
			<div class="iDialogLayout" v-if="iftipsContent||isSelecting" v-cloak></div>
			<div class="bet-confirm" v-if="iftipsContent" v-cloak>
				<div>{{tipsContent}}</div>
				<div>
					<a href="javascript:;">{{$t('确定')}}</a>
				</div>
			</div>
		</div>
		<div id="loading_wait"></div>
  </div>
  </div>
  </div>
</template>

<script src="../../../assets/js/sg/rxnine.js"></script>

<style src="../../../style/sg/rxnine.css" scoped></style>
