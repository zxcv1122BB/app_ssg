<template>
<div>
    <div id="container">
  <div id="main">
		<header id="header">
			<h1>{{$t('赛事详情')}}</h1>
			<a class="goBack" @click="routerBack" href="javascript:;">{{$t('返回')}}</a>
		</header>
		<div v-show="!flag">
			<!--头部-->
			<div class="header" v-cloak>
				<div class="header-left">
					<p>
						<img v-if="datas.homeTeamLogUrl" width="80" height="80" :src="'data:'+datas.homeTeamLogUrl" />
						<img v-else width="80" height="80" src="../../../assets/images/detail/football1.png" />
					</p>
					<p>{{datas.homeTeamName?datas.homeTeamName:'--'}}
						<!--毕尔巴鄂-->
					</p>
					<!-- <p>排名：总12 主7</p> -->
				</div>
				<div class="header-center">
					<p>{{datas.courtScore}}</p>
					<!--<p v-else>-:-</p>-->
					<p v-if="datas.matchResult == 0">{{$t('已结束')}}</p>
					<!--0已结束,1未开始，2进行中，3停赛-->
					<p v-if="datas.matchStatus == 'notstarted'">{{$t('未开赛')}}</p>
					<p v-if="datas.matchStatus == 'inprogress'">{{$t('进行中')}}</p>
					<p v-if="datas.matchStatus == 'finished'">{{$t('结束')}}</p>
					<p v-if="datas.matchStatus == 'cancelled'">{{$t('取消')}}</p>
					<p v-if="datas.matchStatus == 'interrupted'">{{$t('暂停')}}</p>
					<p v-if="datas.matchStatus == 'unknown'">{{$t('未知')}}</p>
					<p v-if="datas.matchStatus == 'deleted'">{{$t('删除')}}</p>
					<p>{{datas.matchDateTime}}</p>
				</div>
				<div class="header-right">
					<p>
						<img v-if="datas.awayTeamLogUrl" :src="'data:'+datas.awayTeamLogUrl" width="80" height="80" />
						<img v-else width="80" height="80" src="../../../assets/images/detail/football2.png" />
					</p>
					<p>{{datas.awayTeamName?datas.awayTeamName:'--'}}
						<!--帕纳辛纳-->
					</p>
					<!-- <p>排名：总5 客3</p> -->
				</div>
			</div>
			<!-- <div class="no_data" v-if="noData">
						{{$t('没有数据')}}
					</div> -->
			<!--主要内容-->
			<!-- <div class="nav" v-else> -->
			<div class="nav" v-cloak>
				<!--导航按钮-->
				<ul class="nav-list clearf">
					<li @click="changeItemTab(1,'inner-ul')">{{$t('赛事')}}</li>
					<li @click="changeItemTab(2,'inner-zhanji')">{{$t('战绩')}}</li>
					<li @click="changeItemTab(3,'inner-jifen')">{{$t('积分')}}</li>
					<li @click="changeItemTab(4,'inner-peilv')">{{$t('赔率')}}</li>
				</ul>
				<!--内容-->
				<div class="inner">
					<!--赛事-->
					<ul class="inner-ul">
						<!--比赛事件-->
						<li>
							<p class="li-top" @click="showMatchItem(1)">
								<span>{{$t('比赛事件')}}</span>
								<img src="../../../assets/images/detail/jiantou2.png" width="30" height="30" />
							</p>
							<div class="li-bottom">
								<p v-if="!matchEventList.length" style="text-align: center;font-size: 1rem;font-weight: bold;">{{$t('暂无数据')}}</p>
								<div class="event_list" v-else>
									<div :key="index" class="event_item" v-for="(item,index) in matchEventList">
										<div class="home">
											<p v-if="item.homePlayerName">
												<span class="team_name">
													{{item.homePlayerName.substr(0,7)}}
												</span>
												<img :src="webUrl+'./static/'+item.i_src" width="16" height="16">
											</p>
										</div>
										<div class="time">{{item.playerTime}}'</div>
										<div class="away">
											<p v-if="item.awayPlayerName">
												<img :src="webUrl+'./static/'+item.i_src" width="16" height="16">
												<span class="team_name">
													{{item.awayPlayerName.substr(0,7)}}
												</span>
											</p>
										</div>
									</div>
								</div>
								<p>
									<img src="../../../assets/images/detail/football1.png" width="16" height="16" />
									<span>{{$t('进球')}}</span>
									<img src="../../../assets/images/detail/card.png" width="16" height="16" />
									<span>{{$t('红黄牌')}}</span>
									<img src="../../../assets/images/detail/huanru.png" width="16" height="16" />
									<span>{{$t('换入')}}</span>
									<img src="../../../assets/images/detail/huanchu.png" width="16" height="16" />
									<span>{{$t('换出')}}</span>
								</p>
							</div>
						</li>
						<!--伤停信息-->
						<li>
							<p class="li-top" @click="showMatchItem(2)">
								<span>{{$t('伤停信息')}}</span>
								<img src="../../../assets/images/detail/jiantou2.png" width="30" height="30" />
							</p>
							<div class="li-bottom">
								<div class="inj_list">
									<p class="pause" v-if="!homeInjury.length&&!awayInjury.length" style="text-align: center;font-size: 1rem;font-weight: bold;">{{$t('暂无数据')}}</p>
									<div class="inj_item" v-else>
										<p class="team_name">{{datas.homeTeamName}}</p>
										<div class="has_data">
											<p class="sub">
												<span>{{$t('号码')}}</span>
												<span>{{$t('姓名')}}</span>
												<span>{{$t('位置')}}</span>
												<span>{{$t('状态')}}</span>
											</p>
											<p :key="index" class="player_info" v-for="(item,index) in homeInjury">
												<!-- <span>{{item.shirtNumber}}</span> -->
												<span>{{item.shirtNumber}}</span>
												<span>{{item.homePlayerName}}</span>
												<span>{{item.postion}}</span>
												<span v-text="item.lineupTypeId==7?'伤病':'停赛'"></span>
												<!-- <img class="derail_switch" src="../../../assets/images/detail/jiantou.png" width="16" height="16" /> -->
											</p>
											<!--受伤球员信息--默认隐藏-->
											<div class="detail">
												<p>{{$t('国际')}}：西班牙 年龄：29</p>
												<p>{{$t('受伤类型')}}：{{$t('大腿肌肉拉伤')}}</p>
												<p>{{$t('出场数据')}}：{{$t('出赛')}}0场，{{$t('首发')}}0场</p>
											</div>
										</div>
										<p class="team_name" style="color:green;">{{datas.awayTeamName}}</p>
										<div class="has_data">
											<p class="sub">
												<span>{{$t('号码')}}</span>
												<span>{{$t('姓名')}}</span>
												<span>{{$t('位置')}}</span>
												<span>{{$t('状态')}}</span>
											</p>
											<p :key="index" class="player_info" v-for="(item,index) in awayInjury">
												<!-- <span>球号</span> -->
												<span>{{item.shirtNumber}}</span>
												<span>{{item.awayPlayerName}}</span>
												<span>{{item.postion}}</span>
												<span v-text="item.lineupTypeId==7?'伤病':'停赛'"></span>
												<!-- <img class="derail_switch" src="../../../assets/images/detail/jiantou.png" width="16" height="16" /> -->
											</p>
											<!--受伤球员信息--默认隐藏-->
											<div class="detail">
												<p>{{$t('国际')}}：西班牙 年龄：29</p>
												<p>{{$t('受伤类型')}}：{{$t('大腿肌肉拉伤')}}</p>
												<p>{{$t('出场数据')}}：{{$t('出赛')}}0场，{{$t('首发')}}0场</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</li>
						<!--阵容-->
						<li>
							<p class="li-top" @click="showMatchItem(3)">
								<span>{{$t('阵容')}}</span>
								<img src="../../../assets/images/detail/jiantou2.png" width="30" height="30" />
							</p>
							<div class="li-bottom">
								<p v-if="!lineupInfoList.length" style="text-align: center;font-size: 1rem;font-weight: bold;">{{$t('暂无阵容数据')}}</p>
								<div v-else class="battle">
									<div class="battle_home">
										<p>{{datas.homeTeamName}}</p>
										<ul>
											<li :key="index" v-for="(item,index) in homeBattle">
												<div class="position">{{item.lineupText}}</div>
												<div class="player_name">{{item.homePlayerName}}</div>
											</li>
										</ul>
									</div>
									<div class="battle_away">
										<p>{{datas.awayTeamName}}</p>
										<ul>
											<li :key="index" v-for="(item,index) in awayBattle">
												<div class="position">{{item.lineupText}}</div>
												<div class="player_name">{{item.awayPlayerName}}</div>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</li>
						<!--技术统计-->
						<li>
							<p class="li-top" @click="showMatchItem(4)">
								<span>{{$t('技术统计')}}</span>
								<img src="../../../assets/images/detail/jiantou2.png" width="30" height="30" />
							</p>
							<div v-if="technologyList == null || technologyList.length<=0" class="li-bottom clearf">
								<div class="tongji-left">
									<p>0</p>
									<p>0</p>
									<p>0</p>
									<p>0</p>
									<p>0</p>
									<p>0</p>
									<p>0</p>
									<p>0</p>
								</div>
								<div class="tongji-center">
									<p>{{$t('控球率')}}</p>
									<p>{{$t('射门')}}</p>
									<p>{{$t('射正')}}</p>
									<p>{{$t('危险进攻')}}</p>
									<p>{{$t('进攻')}}</p>
									<p>{{$t('角球')}}</p>
									<p>{{$t('犯规')}}</p>
									<p>{{$t('黄牌')}}</p>
								</div>
								<div class="tongji-right">
									<p>0</p>
									<p>0</p>
									<p>0</p>
									<p>0</p>
									<p>0</p>
									<p>0</p>
									<p>0</p>
									<p>0</p>
								</div>
							</div>
							<div class="li-bottom clearf" v-else>
								<div class="tongji-left">
									<p :key="index" v-for="(item,index) in technologyList">{{item.homeValue}}</p>
								</div>
								<div class="tongji-center">
									<p :key="index" v-for="(item,index) in technologyList">{{item.oper}}</p>
								</div>
								<div class="tongji-right">
									<p :key="index" v-for="(item,index) in technologyList">{{item.awayValue}}</p>
								</div>
							</div>
						</li>
					</ul>
					<!--战绩-->
					<ul class="inner-zhanji">
						<!--历史交锋-->
						<li>
							<p class="li-top" @click="showMatchItem(1)">
								<span>{{$t('历史交锋')}}</span>
								<img src="../../../assets/images/detail/jiantou2.png" width="30" height="30" />
							</p>
							<div class="li-bottom">
								<p class="zhanji-title" v-if="recentHistoryList.length">
									<span>
										<em class="blackDot"></em>
									</span>近{{recentHistoryList.length}}{{$t('场交战')}},{{datas.homeTeamName}}{{r_win}}{{$t('胜')}}{{r_draw}}平{{r_lose}}负 ; 主场 {{r_hwin}}{{$t('胜')}}{{r_hdraw}}平{{r_hlose}}负</p>
								<p class="zhanji-nav clearf" v-if="recentHistoryList.length">
									<span>{{$t('赛事')}}</span>
									<span>{{$t('日期')}}</span>
									<span>{{$t('主队')}}</span>
									<span>{{$t('比分')}}</span>
									<span>{{$t('客队')}}</span>
									<span>{{$t('胜负')}}</span>
								</p>
								<p v-if="recentHistoryList == null || recentHistoryList.length<=0" style="font-size:1rem;font-weight:bold;">{{$t('暂无历史交锋数据')}}</p>
								<ul class="zhanji-list" v-if="recentHistoryList.length">
									<li  :key="index" v-for="(item,index) in recentHistoryList">
										<span>{{item.leagueName?(item.leagueName).substring(0,5):"-"}}</span>
										<span>{{item.matchDateTime?(item.matchDate).substring(0,10):"-"}}</span>
										<span :class="{'c_win':item.homeTeamName==datas.homeTeamName,'c_lose':item.homeTeamName==datas.awayTeamName}">{{item.homeTeamName?(item.homeTeamName):"-"}}</span>
										<span>{{item.courtScore?(item.courtScore):"-"}}</span>
										<span :class="{'c_win':item.awayTeamName==datas.homeTeamName,'c_lose':item.awayTeamName==datas.awayTeamName}">{{item.awayTeamName?(item.awayTeamName):"-"}}</span>
										<span v-if="item.matchResult == 3" class="c_win">{{$t('胜')}}</span>
										<span v-else-if="item.matchResult == 1" class="c_draw">{{$t('平')}}</span>
										<span v-else-if="item.matchResult == 0" class="c_lose">{{$t('负')}}</span>
										<span v-else>-</span>
									</li>

								</ul>
							</div>
						</li>
						<!--近期战绩-->
						<li>
							<p class="li-top" @click="showMatchItem(2)">
								<span>{{$t('近期战绩')}}</span>
								<img src="../../../assets/images/detail/jiantou2.png" width="30" height="30" />
							</p>
							<div class="li-bottom">
								<p class="zhanji-title" v-if="homeRecentRecordList.length">
									<span>
										<em class="blackDot"></em>
									</span>
									<b style="color:red;">{{$t('主队')}}</b>近{{homeRecentRecordList.length}}{{$t('场交战')}},
									<b style="color:red;margin-left:5px;">{{home_win}}{{$t('胜')}}</b>
									<b style="color:green;margin-left:5px;">{{home_draw}}平</b>
									<b style="color:rgb(45, 45, 177);margin-left:5px;">{{home_lose}}负</b>;
									<b style="color:rgb(197, 24, 33);">{{$t('主场')}}</b>
									<b style="color:red;margin-left:5px;">{{home_home_win}}{{$t('胜')}}</b>
									<b style="color:green;margin-left:5px;">{{home_home_draw}}平</b>
									<b style="color:rgb(45, 45, 177);margin-left:5px;">{{home_home_lose}}负</b>
								</p>
								<p class="zhanji-nav clearf" v-if="homeRecentRecordList.length">
									<span>{{$t('赛事')}}</span>
									<span>{{$t('日期')}}</span>
									<span>{{$t('主队')}}</span>
									<span>{{$t('比分')}}</span>
									<span>{{$t('客队')}}</span>
									<span>{{$t('胜负')}}</span>
								</p>
								<ul class="zhanji-list">
									<li :key="index" v-for="(item,index) in homeRecentRecordList">
										<span>{{item.leagueName?(item.leagueName).substring(0,5):"-"}}</span>
										<span>{{item.matchDate?(item.matchDate):"-"}}</span>
										<span :class="{'c_win':item.homeTeamName==datas.homeTeamName,'c_lose':item.homeTeamName==datas.awayTeamName}">{{item.homeTeamName?(item.homeTeamName):"-"}}</span>
										<span>{{item.courtScore?(item.courtScore):"-"}}</span>
										<span :class="{'c_win':item.awayTeamName==datas.homeTeamName,'c_lose':item.awayTeamName==datas.awayTeamName}">{{item.awayTeamName?(item.awayTeamName):"-"}}</span>
										<span v-if="item.matchResult == 3">{{$t('胜')}}</span>
										<span v-else-if="item.matchResult == 1">{{$t('平')}}</span>
										<span v-else-if="item.matchResult == 0">{{$t('负')}}</span>
										<span v-else>-</span>
									</li>
								</ul>
								<p class="zhanji-title" v-if="awayRecentRecordList.length">
									<span>
										<em class="blackDot"></em>
									</span>
									<b style="color:green;">{{$t('客队')}}</b>近{{awayRecentRecordList.length}}{{$t('场交战')}},
									<b style="color:red;margin-left:5px;">{{away_win}}{{$t('胜')}}</b>
									<b style="color:green;margin-left:5px;">{{away_draw}}平</b>
									<b style="color:rgb(45, 45, 177);margin-left:5px;">{{away_lose}}负</b>;
									<b style="color:rgb(197, 24, 33);">{{$t('主场')}}</b>
									<b style="color:red;margin-left:5px;">{{away_home_win}}{{$t('胜')}}</b>
									<b style="color:green;margin-left:5px;">{{away_home_draw}}平</b>
									<b style="color:rgb(45, 45, 177);margin-left:5px;">{{away_home_lose}}负</b>
								</p>
								<p class="zhanji-nav clearf" v-if="awayRecentRecordList.length">
									<span>{{$t('赛事')}}</span>
									<span>{{$t('日期')}}</span>
									<span>{{$t('主队')}}</span>
									<span>{{$t('比分')}}</span>
									<span>{{$t('客队')}}</span>
									<span>{{$t('胜负')}}</span>
								</p>
								<ul class="zhanji-list">
									<li :key="index" v-for="(item,index) in awayRecentRecordList">
										<span>{{item.leagueName?(item.leagueName).substring(0,5):"-"}}</span>
										<span>{{item.matchDate?(item.matchDate):"-"}}</span>
										<span :class="{'c_win':item.homeTeamName==datas.homeTeamName,'c_lose':item.homeTeamName==datas.awayTeamName}">{{item.homeTeamName?(item.homeTeamName):"-"}}</span>
										<span>{{item.courtScore?(item.courtScore):"-"}}</span>
										<span :class="{'c_win':item.awayTeamName==datas.homeTeamName,'c_lose':item.awayTeamName==datas.awayTeamName}">{{item.awayTeamName?(item.awayTeamName):"-"}}</span>
										<span v-if="item.matchResult == 3">{{$t('胜')}}</span>
										<span v-else-if="item.matchResult == 1">{{$t('平')}}</span>
										<span v-else-if="item.matchResult == 0">{{$t('负')}}</span>
										<span v-else>-</span>
									</li>
								</ul>
								<p v-if="!awayRecentRecordList.length" style="text-align: center;font-size: 1rem;font-weight: bold;">{{$t('暂无近期战绩数据')}}</p>
							</div>
						</li>
						<!--未来三场-->
						<li>
							<p class="li-top" @click="showMatchItem(3)">
								<span>{{$t('未来三场')}}</span>
								<img src="../../../assets/images/detail/jiantou2.png" width="30" height="30" />
							</p>
							<div class="li-bottom">
								<p class="zhanji-title" v-if="homeFutureRecordList.length">
									<span>
										<em class="blackDot"></em>
									</span>{{datas.homeTeamName}}</p>
								<p class="zhanji-nav clearf" v-if="homeFutureRecordList.length">
									<span>{{$t('赛事')}}</span>
									<span>{{$t('日期')}}</span>
									<span style="width: 25%;">{{$t('主队')}}</span>
									<span style="width: 25%;">{{$t('客队')}}</span>
									<span style="width: 10%;">{{$t('相隔')}}</span>
								</p>
								<p v-if="0">{{$t('暂无阵容数据')}}</p>
								<ul class="zhanji-list" v-if="homeFutureRecordList.length">
									<li :key="index" v-for="(item,index) in homeFutureRecordList">
										<span>{{item.leagueName?item.leagueName:'-'}}</span>
										<span>{{item.matchDate?item.matchDate:'-'}}</span>
										<span style="width: 25%;" :class="{'c_win':item.homeTeamName==datas.homeTeamName}">{{item.homeTeamName?item.homeTeamName:'-'}}</span>
										<span style="width: 25%;" :class="{'c_win':item.awayTeamName==datas.homeTeamName}">{{item.awayTeamName?item.awayTeamName:'-'}}</span>
										<span style="width: 10%;">{{item.headway}}天</span>
									</li>
								</ul>
								<p class="zhanji-title" v-if="homeFutureRecordList.length">
									<span>
										<em class="blackDot"></em>
									</span>{{datas.awayTeamName}}</p>
								<p class="zhanji-nav clearf" v-if="homeFutureRecordList.length">
									<span>{{$t('赛事')}}</span>
									<span>{{$t('日期')}}</span>
									<span style="width: 25%;">{{$t('主队')}}</span>
									<span style="width: 25%;">{{$t('客队')}}</span>
									<span style="width: 10%;">{{$t('相隔')}}</span>
								</p>
								<p v-if="0">{{$t('暂无阵容数据')}}</p>
								<ul class="zhanji-list" v-if="homeFutureRecordList.length">
									<li :key="index" v-for="(item,index) in awayFutureRecordList">
										<span>{{item.leagueName?item.leagueName:'-'}}</span>
										<span>{{item.matchDate?item.matchDate:'-'}}</span>
										<span style="width: 25%;" :class="{'c_lose':item.homeTeamName==datas.awayTeamName}">{{item.homeTeamName?item.homeTeamName:'-'}}</span>
										<span style="width: 25%;" :class="{'c_lose':item.awayTeamName==datas.awayTeamName}">{{item.awayTeamName?item.awayTeamName:'-'}}</span>
										<span style="width: 10%;">{{item.headway}}天</span>
									</li>
								</ul>
								<p v-if="!homeFutureRecordList.length" style="text-align: center;font-size: 1rem;font-weight: bold;">{{$t('暂无数据')}}</p>
							</div>
						</li>
					</ul>
					<!--积分-->
					<div class="inner-jifen">
						<p>
							<em class="blackDot"></em> 2017/2018{{$t('赛季')}}{{datas.leagueName}}{{$t('胜积分榜')}}
						</p>
						<p class="clearf">
							<span class="jifen-span1">{{$t('排名')}}</span>
							<span class="jifen-span2">{{$t('球队')}}</span>
							<span class="jifen-span3">{{$t('进球')}}</span>
							<span class="jifen-span4">{{$t('失球')}}</span>
							<span class="jifen-span5">{{$t('胜')}}</span>
							<span class="jifen-span6">{{$t('平')}}</span>
							<span class="jifen-span7">{{$t('负')}}</span>
							<span class="jifen-span8">{{$t('积分')}}</span>
						</p>
						<p v-if="scoreboardList==null || scoreboardList.length<=0" style="text-align: center;font-size: 1rem;font-weight: bold;">{{$t('暂无数据')}}</p>
						<ul class="jifen-ul" v-else>

							<li :key="index" v-for="(item,index) in scoreboardList" :style="item.teamId==datas.homeTeamId?'background:#ff9999;':item.teamId==datas.awayTeamId?'background:#CCFF99;':'background:#ffffcc;'">
								<span>{{index+1}}</span>
								<span>{{item.teamName?(item.teamName):(item.teamEname)}}</span>
								<span>{{item.goalsfor?item.goalsfor:'-'}}</span>
								<span>{{item.goalsagainst?item.goalsagainst:'-'}}</span>
								<span>{{item.wins?item.wins:'-'}}</span>
								<span>{{item.draws?item.draws:'-'}}</span>
								<span>{{item.failures?item.failures:'-'}}</span>
								<span>{{item.points?item.points:'-'}}</span>
							</li>

						</ul>
						<p>
							<span>
								<em class="redDot" style="background-color: #ffffcc;"></em>
								<!-- 欧冠正赛 -->{{$t('无关')}}
							</span>
							<span>
								<em class="redDot" style="background-color: #ff9999;"></em>
								<!-- 欧冠资格赛 -->{{$t('主队')}}
							</span>
							<span>
								<em class="redDot" style="background-color: #CCFF99;"></em>
								<!-- 欧联资格赛 -->{{$t('客队')}}
							</span>
						</p>
					</div>
					<!--赔率-->
					<div class="inner-peilv" v-show="oddsShow">
						<p>
							<a href="javascript:void(0)" :class="{odd_active:odd_tab.pre_eu}" @click="changeOddTab('pre_eu')">{{$t('欧赔')}}</a>
							<a href="javascript:void(0)" :class="{odd_active:odd_tab.pre_ah}" @click="changeOddTab('pre_ah')">{{$t('亚盘')}}</a>
							<a href="javascript:void(0)" :class="{odd_active:odd_tab.pre_ou}" @click="changeOddTab('pre_ou')">{{$t('大小盘')}}</a>
						</p>
						<!--欧赔-->
						<div class="peilv-oupei" v-if="odd_tab.pre_eu">
							<p class="peilv-title clearf">
								<span>{{$t('公司')}}</span>
								<span>{{$t('初始赔率')}}</span>
								<span>{{$t('即时赔率')}}</span>
							</p>
							<ul class="peilv-list">
								<li :key="index" v-for="(item,index) in euro_odd_list" :data-companyId="item.company_id">
									<p>{{item.company_name}}</p>
									<p>
										<span>{{item.first_home_win_odds.substring(0,4)}}</span>
										<span>{{item.first_draw_odds.substring(0,4)}}</span>
										<span>{{item.first_away_win_odds.substring(0,4)}}</span>
									</p>
									<p>
										<span>
											<em style="color: red;font-style: normal;" v-if="item.newest_home_win_odds>item.newest_home_win_odds_old&&item.newest_home_win_odds!=''&&item.newest_home_win_odds_old!=''">↑</em>
											<em style="color: green;font-style: normal;" v-if="item.newest_home_win_odds<item.newest_home_win_odds_old&&item.newest_home_win_odds!=''&&item.newest_home_win_odds_old!=''">↓</em>
											{{item.newest_home_win_odds.substring(0,4)}}
										</span>
										<span>
											<em style="color: red;font-style: normal;" v-if="item.newest_draw_odds>item.newest_draw_odds_old&&item.newest_draw_odds!=''&&item.newest_draw_odds_old!=''">↑</em>
											<em style="color: green;font-style: normal;" v-if="item.newest_draw_odds<item.newest_draw_odds_old&&item.newest_draw_odds!=''&&item.newest_draw_odds_old!=''">↓</em>
											{{item.newest_draw_odds.substring(0,4)}}
										</span>
										<span>
											<em style="color: red;font-style: normal;" v-if="item.newest_away_win_odds>item.newest_away_win_odds_old&&item.newest_away_win_odds!=''&&item.newest_away_win_odds_old!=''">↑</em>
											<em style="color: green;font-style: normal;" v-if="item.newest_away_win_odds<item.newest_away_win_odds_old&&item.newest_away_win_odds!=''&&item.newest_away_win_odds_old!=''">↓</em>
											{{item.newest_away_win_odds.substring(0,4)}}
										</span>
									</p>
								</li>
							</ul>
							<div class="nodata" v-if="!euro_odd_list.length" v-show="!flag">
								{{$t('没有数据')}}
							</div>
						</div>
						<!--亚盘-->
						<div class="peilv-yapan" v-if="odd_tab.pre_ah">
							<p class="peilv-title clearf">
								<span>{{$t('公司')}}</span>
								<span>{{$t('初始盘口')}}</span>
								<span>{{$t('即时盘口')}}</span>
							</p>
							<ul class="peilv-list">
								<li :key="index" v-for="(item,index) in Ah_odd_list" :data-companyId="item.company_id">
									<p>{{item.company_name}}</p>
									<p>
										<span>{{item.first_home_odds}}</span>
										<span>{{item.first_dparam}}</span>
										<span>{{item.first_away_odds}}</span>
									</p>
									<p>
										<span>
											<em style="color: red;font-style: normal;" v-if="item.newest_home_odds>item.first_home_odds&&item.newest_home_odds!=''&&item.newest_home_odds_old!=''">↑</em>
											<em style="color: green;font-style: normal;" v-if="item.newest_home_odds<item.first_home_oddss&&item.newest_home_odds!=''&&item.newest_home_odds_old!=''">↓</em>
											{{item.newest_home_odds.substring(0,4)}}
										</span>
										<span>
											<em style="color: red;font-style: normal;" v-if="item.newest_dparam>item.first_dparams&&item.newest_dparam!=''&&item.first_dparams!=''">↑</em>
											<em style="color: green;font-style: normal;" v-if="item.newest_dparam<item.first_dparams&&item.newest_dparam!=''&&item.first_dparams!=''">↓</em>
											{{item.newest_dparam.substring(0,4)}}
										</span>
										<span>
											<em style="color: red;font-style: normal;" v-if="item.newest_away_odds>item.first_away_odds&&item.newest_away_odds!=''&&item.newest_away_odds_old!=''">↑</em>
											<em style="color: green;font-style: normal;" v-if="item.newest_away_odds<item.first_away_odds&&item.newest_away_odds!=''&&item.newest_away_odds_old!=''">↓</em>
											{{item.newest_away_odds.substring(0,4)}}
										</span>
									</p>
								</li>
							</ul>
							<div class="nodata" v-if="!Ah_odd_list.length" v-show="!flag">
								{{$t('没有数据')}}
							</div>
						</div>
						<!--大小盘-->
						<div class="peilv-daxiaopan" v-if="odd_tab.pre_ou">
							<p class="peilv-title clearf">
								<span>{{$t('公司')}}</span>
								<span>{{$t('初始盘口')}}</span>
								<span>{{$t('即时盘口')}}</span>
							</p>
							<ul class="peilv-list">
								<li :key="index" v-for="(item,index) in Over_Under_list" :data-companyId="item.company_id">
									<p>{{item.company_name}}</p>
									<p>
										<span>{{item.first_over_odds}}</span>
										<span>{{item.first_dparam}}</span>
										<span>{{item.first_under_odds}}</span>
									</p>
									<p>
										<span>
											<em style="color: red;font-style: normal;" v-if="item.newest_over_odds>item.first_over_odds&&item.newest_over_odds!=''&&item.first_over_odds!=''">↑</em>
											<em style="color: green;font-style: normal;" v-if="item.newest_over_odds<item.first_over_odds&&item.newest_over_odds!=''&&item.first_over_odds!=''">↓</em>
											{{item.newest_over_odds.substring(0,4)}}
										</span>
										<span>
											<em style="color: red;font-style: normal;" v-if="item.newest_dparam>item.first_dparam&&item.newest_dparam!=''&&item.first_dparam!=''">↑</em>
											<em style="color: green;font-style: normal;" v-if="item.newest_dparam<item.first_dparam&&item.newest_dparam!=''&&item.first_dparam!=''">↓</em>
											{{item.newest_dparam.substring(0,4)}}
										</span>
										<span>
											<em style="color: red;font-style: normal;" v-if="item.newest_under_odds>item.first_under_odds&&item.newest_under_odds!=''&&item.first_under_odds!=''">↑</em>
											<em style="color: green;font-style: normal;" v-if="item.newest_under_odds<item.first_under_odds&&item.newest_under_odds!=''&&item.first_under_odds!=''">↓</em>
											{{item.newest_under_odds.substring(0,4)}}
										</span>
									</p>
								</li>
							</ul>
							<div class="nodata" v-if="!Over_Under_list.length" v-show="!flag">
								{{$t('没有数据')}}
							</div>
						</div>
					</div>
				</div>
			</div>
			<!--弹出层-->
			<div class="tishi">
				<p></p>
				<a href="javascript:void(0)">{{$t('确定')}}</a>
			</div>
		</div>
		<!-- 加载数据时的遮罩层 -->
		<div class="mask" v-show="flag">
			<p>{{$t('正在加载中')}}，{{$t('请稍后')}}...</p>
		</div>
	</div>
  </div>
  </div>
</template>

<script src="../../../assets/js/sg/detail.js"></script>

<style src="../../../style/sg/detail.css" scoped></style>
