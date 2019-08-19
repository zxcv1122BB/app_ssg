<template>
  <div>
    <div id="container">
		<div id="main">
			<!--顶部-->
			<div id="header">
				<!-- <h1 class="title">比分直播</h1> -->
        <ul><li class="active" id="wan1" @click="select_wanfa('wan1')"><a href="javascript:;">{{$t('竞足')}}</a></li><li id="wan4" @click="select_wanfa('wan4')"><a  href="javascript:;">{{$t('竞篮')}}</a></li><li id="wan2" @click="select_wanfa('wan2')"><a href="javascript:;">{{$t('单场')}}</a></li>
        </ul>
				<a class="goBack" href="javascript:void(0)" @click="routerBack"></a>
			</div>
			<!--tab选项-->
			<div class="tab clearf">
       <!--选择日期或期次-->
       <div class="filterTime" v-if="oneTypeId!==3" :style="oneTypeId==3?'width:40%':''">
         <div :class="{'prev-day':true,'no-day':selectDateIndex==0}" @click="selectDate(-1,1)">
           <span></span>
         </div>
         <div class="today" @click="showTimeArea">
           <span :style="oneTypeId==3?'left: 5%;':''"></span> {{nowDateTime}}
         </div>
         <div :class="{'next-day':true,'no-day':selectDateIndex==8}" @click="selectDate(1,1)">
            <span></span>
         </div>
          <div class="alert-datetime" v-if="isShowTimeArea">
            <div class="title">
              <span></span> {{month}}
            </div>
            <div class="week-tit">
              <ul>
                <li v-for="(item,index) in weekList">{{item}}</li>
              </ul>
            </div>
            <div>
              <ul>
                <li :class="selectDateIndex==index?'cur':''" v-for="(item,index) in dayList" @click="selectDate(index,0)">{{item}}</li>
              </ul>
            </div>
          </div>
          <div class="layer" @click="hideTimeArea" v-if="isShowTimeArea"></div>
       </div>

       <div class="filter-league" @click="pop_game" :style="oneTypeId==3?'float:right;':''" v-if="oneTypeId!=4">
					<!-- <p>{{$t('筛选')}}</p> -->
          <span></span> 筛选
					<!-- <img src="../../../assets/images/jiantou3.png" width="18" height="18" /> -->
				</div>
				<!--选择玩法-->
				<div class="wanfa" style="display:none">
					<p @click="pop_wanfa" v-cloak>{{wanfa}}</p>
					<img @click="pop_wanfa" src="../../../assets/images/jiantou3.png" width="18" height="18" />
					<ul class="wanfa-ul">
						<li id="wan1" @click="select_wanfa('wan1')" class="bb">{{$t('竞彩足球')}}</li>
						<li id="wan2" @click="select_wanfa('wan2')">{{$t('足球单场')}}</li>
						<!-- <li id="wan3" @click="select_wanfa('wan3')">{{$t('胜负彩')}}</li> -->
						<li id="wan4" @click="select_wanfa('wan4')">{{$t('竞彩篮球')}}</li>
					</ul>
				</div>
				<!--选择日期或期次-->

				<!--选择赛事-->
				<!-- <div class="game" style="display:none" @click="pop_game" v-if="oneTypeId!=4">
					<p>{{$t('赛事筛选')}}</p>
					<img src="../../../assets/images/jiantou3.png" width="18" height="18" />
				</div> -->
			</div>
	    <div class="time" v-if="oneTypeId==3">
					<p @click="pop_time" v-cloak>{{today}}</p>
					<img @click="pop_time" src="../../../assets/images/jiantou3.png" width="18" height="18" />

					<!--足球单场期次-默认隐藏-->
					<ul class="dcqici-ul">
						<li v-for="item in qihao" :id="'zqdc'+item" @click="select_qihao(item)" v-cloak>{{item}}</li>
					</ul>

				</div>
			<!--选择是否结束-->
			<div class="isEnd clearf">
				<a href="javascript:void (0)" @click="noend">{{$t('未结束')}}</a>
				<a href="javascript:void (0)" @click="end">{{$t('已结束')}}</a>
			</div>

			<!--列表内容-->
			<div class="inner" id="pullrefresh">
				<ul class="mui-table-view mui-table-view-chevron">
					<li :class="!loadding&&!datas.length?'nodata':''">
						<div v-for="(it,index) in datas">
							<p class="inner-date" @click="fold(index)" :id="index" v-cloak v-if="oneTypeId==1||oneTypeId==3">
								{{it[0].gameDate}}
								<!-- {{it[0].match_date.substr(0,10)}} 星期{{new Date(it[0].match_date.substr(0,10).split('-')[0],parseInt(it[0].match_date.substr(0,10).split('-')[1]-1),it[0].match_date.substr(0,10).split('-')[2]).getDay()==0?'日':(new Date(it[0].match_date.substr(0,10).split('-')[0],parseInt(it[0].match_date.substr(0,10).split('-')[1]-1),it[0].match_date.substr(0,10).split('-')[2]).getDay()==1?'一':(new Date(it[0].match_date.substr(0,10).split('-')[0],parseInt(it[0].match_date.substr(0,10).split('-')[1]-1),it[0].match_date.substr(0,10).split('-')[2]).getDay()==2?'二':(new Date(it[0].match_date.substr(0,10).split('-')[0],parseInt(it[0].match_date.substr(0,10).split('-')[1]-1),it[0].match_date.substr(0,10).split('-')[2]).getDay()==3?'三':(new Date(it[0].match_date.substr(0,10).split('-')[0],parseInt(it[0].match_date.substr(0,10).split('-')[1]-1),it[0].match_date.substr(0,10).split('-')[2]).getDay()==4?'四':(new Date(it[0].match_date.substr(0,10).split('-')[0],parseInt(it[0].match_date.substr(0,10).split('-')[1]-1),it[0].match_date.substr(0,10).split('-')[2]).getDay()==5?'五':(new Date(it[0].match_date.substr(0,10).split('-')[0],parseInt(it[0].match_date.substr(0,10).split('-')[1]-1),it[0].match_date.substr(0,10).split('-')[2]).getDay()==6?'六':''))))))}} -->
								<img src="../../../assets/images/jiantou2.png" width="20" height="20" />
							</p>
							<p class="inner-date" @click="fold(index)" :id="index" v-cloak v-else>
								{{it[0].match_date.substr(0,10)}} 星期{{new Date(it[0].match_date.substr(0,10).split('-')[0],parseInt(it[0].match_date.substr(0,10).split('-')[1]-1),it[0].match_date.substr(0,10).split('-')[2]).getDay()==0?'日':(new Date(it[0].match_date.substr(0,10).split('-')[0],parseInt(it[0].match_date.substr(0,10).split('-')[1]-1),it[0].match_date.substr(0,10).split('-')[2]).getDay()==1?'一':(new Date(it[0].match_date.substr(0,10).split('-')[0],parseInt(it[0].match_date.substr(0,10).split('-')[1]-1),it[0].match_date.substr(0,10).split('-')[2]).getDay()==2?'二':(new Date(it[0].match_date.substr(0,10).split('-')[0],parseInt(it[0].match_date.substr(0,10).split('-')[1]-1),it[0].match_date.substr(0,10).split('-')[2]).getDay()==3?'三':(new Date(it[0].match_date.substr(0,10).split('-')[0],parseInt(it[0].match_date.substr(0,10).split('-')[1]-1),it[0].match_date.substr(0,10).split('-')[2]).getDay()==4?'四':(new Date(it[0].match_date.substr(0,10).split('-')[0],parseInt(it[0].match_date.substr(0,10).split('-')[1]-1),it[0].match_date.substr(0,10).split('-')[2]).getDay()==5?'五':(new Date(it[0].match_date.substr(0,10).split('-')[0],parseInt(it[0].match_date.substr(0,10).split('-')[1]-1),it[0].match_date.substr(0,10).split('-')[2]).getDay()==6?'六':''))))))}}
								<img src="../../../assets/images/jiantou2.png" width="20" height="20" />
							</p>
							<div class="inner-div">
								<ul class="inner-list">
									<li :data-index="item.leagueIndex" class="clearf" @click="skip(item.event_id,item.matchId,item.court_score,item)" v-for="item in it" v-if="allMatchIndexList[item.leagueIndex]!=-1">
										<p class="list-time" v-cloak>周{{new Date(it[0].match_date.substr(0,10).split('-')[0],parseInt(it[0].match_date.substr(0,10).split('-')[1]-1),it[0].match_date.substr(0,10).split('-')[2]).getDay()==0?'日':(new Date(it[0].match_date.substr(0,10).split('-')[0],parseInt(it[0].match_date.substr(0,10).split('-')[1]-1),it[0].match_date.substr(0,10).split('-')[2]).getDay()==1?'一':(new Date(it[0].match_date.substr(0,10).split('-')[0],parseInt(it[0].match_date.substr(0,10).split('-')[1]-1),it[0].match_date.substr(0,10).split('-')[2]).getDay()==2?'二':(new Date(it[0].match_date.substr(0,10).split('-')[0],parseInt(it[0].match_date.substr(0,10).split('-')[1]-1),it[0].match_date.substr(0,10).split('-')[2]).getDay()==3?'三':(new Date(it[0].match_date.substr(0,10).split('-')[0],parseInt(it[0].match_date.substr(0,10).split('-')[1]-1),it[0].match_date.substr(0,10).split('-')[2]).getDay()==4?'四':(new Date(it[0].match_date.substr(0,10).split('-')[0],parseInt(it[0].match_date.substr(0,10).split('-')[1]-1),it[0].match_date.substr(0,10).split('-')[2]).getDay()==5?'五':(new Date(it[0].match_date.substr(0,10).split('-')[0],parseInt(it[0].match_date.substr(0,10).split('-')[1]-1),it[0].match_date.substr(0,10).split('-')[2]).getDay()==6?'六':''))))))}} {{item.sessions}} {{item.league_name}} {{item.match_date.substr(11,5)}}</p>
										<div class="gamename clearf">
											<p v-cloak v-if="selBasket">{{item.awayTeamName}}</p>
											<p v-cloak v-else>{{item.home_team_name}}</p>
											<p v-cloak v-if="selBasket" :class="item.matchStatus=='0'?'c_f38f11':'c_999'">
												<span v-if="item.matchStatus==0">{{item.awayTotalScore}}:{{item.homeTotalScore}}</span>
                        <span v-else-if="item.statusName&&item.awayTotalScore&&item.homeTotalScore">{{item.awayTotalScore}}:{{item.homeTotalScore}}</span>
												<span v-else>VS</span>
											</p>
											<p v-cloak v-else :class="item.match_status==0?'c_f38f11':'c_999'">{{item.match_status==0?item.court_score:"VS"}}</p>
											<p v-cloak v-if="selBasket">{{item.homeTeamName}}</p>
											<p v-cloak v-else>{{item.away_team_name}}</p>
										</div>
                    <p :class="item.matchStatus==0?'state c_f38f11':'state'" v-cloak>{{item.statusName?item.statusName:''}}</p>
										<!-- <p :class="item.matchStatus==0?'state c_f38f11':'state'" v-cloak>{{item.matchStatus==0?'已结束':(item.matchStatus==1?'未开始':(item.matchStatus==2?'半场':(item.matchStatus==6?'进行中':'')))}}</p> -->
										<p :class="item.match_status==0?'state c_f38f11':'state'" v-cloak>{{item.match_status==0?'已结束':(item.match_status==1?'未开始':(item.match_status==2?'进行中':(item.match_status==3?'停赛':'')))}}</p>
										<span>></span>
									</li>
								</ul>
							</div>
						</div>
						<img class="no-data" v-show="!loadding&&!datas.length" src="../../../assets/images/background.png" alt="" v-cloak>
					</li>
				</ul>
			</div>

			<!--赛事筛选弹出层-->
			<div class="selectGame">
				<p class="game-title">{{$t('赛事选择')}}</p>
				<div class="table-div screen-content">
					<div class="screnn-main">
						<div class="filter-tab">
							<span class="screen-all" @click="checkAll($event)">{{$t('全选')}}</span>
							<span class="screen-reverse" @click="inverse($event)">{{$t('反选')}}</span>
							<span class="screen-five" @click="onlyFive($event)">{{$t('仅五大联赛')}}</span>
						</div>
						<ul class="competition-option">
							<li class="active" v-for="(item,index) of allMatchNameList" @click="competition_option_fn($event,index)" v-cloak>{{item}}</li>
						</ul>
					</div>
				</div>
				<div>
					<ul class="list-ul clearf">
						<li v-for="item in league" :id="item.league_Id" v-model="select_league" @click="select(item.league_Id)" v-cloak>{{item.league_name}}</li>
					</ul>
				</div>
				<p>{{$t('共')}}<span style="color: red;" v-cloak>{{league_num}}</span>{{$t('场比赛')}}</p>
				<div class="btn">
					<a href="javascript:void (0)" @click="esc">{{$t('取消')}}</a>
					<a href="javascript:void (0)" @click="enter" style="background-color: #D91D36;color: white;">{{$t('确定')}}</a>
				</div>
			</div>
			<!--遮罩层-->
			<div class="zhezhao" @click="escZ"></div>
		</div>

    </div>
  </div>
</template>

<script src="../../../assets/js/sundry/live.js"></script>

<style src="../../../style/sundry/live.css" scoped></style>
