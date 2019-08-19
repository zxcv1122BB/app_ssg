<template>
  <div>
      <div id="container">
        <div>
          <header id="header">
              <h1>{{$t('赛事详情')}}</h1>
              <a class="goBack" @click="routerBack" href="javascript:;">{{$t('返回')}}</a>
          </header>
          <div id="basket" v-cloak>
              <div class="team_info" v-show="!flag" v-cloak v-if="!flag">
                  <div class="away_team">
                      <p class="f_group">
                          <img width="50" height="50" :src="away_team_log">
                      </p>
                      <p class="t_name">{{gameBasicInfo.visiting_name_sc}}(客)</p>
                      <p class="deep">
                          <span>{{$t('排名')}}</span>
                          <span>{{gameBasicInfo.visiting_ranking}}{{gameBasicInfo.visiting_pid}}</span>
                      </p>
                  </div>
                  <div class="match_info">
                      <p class="f_group fb">
                        {{gameBasicInfo.visiting_score?gameBasicInfo.visiting_score.split("|")[0]:''}}<span v-if="gameBasicInfo.visiting_score">{{((!gameBasicInfo.visiting_score&&!gameBasicInfo.home_score)||(gameBasicInfo.visiting_score&&gameBasicInfo.home_score&&!gameBasicInfo.visiting_score.split("|")[0]&&!gameBasicInfo.home_score.split("|")[0]))?'':':'}}</span>{{gameBasicInfo.home_score?gameBasicInfo.home_score.split("|")[0]:''}}
                      </p>
                      <p class="deep">{{gameBasicInfo.match_status}}</p>
                      <p class="deep">{{gameBasicInfo.startdate?gameBasicInfo.startdate:''}}</p>
                  </div>
                  <div class="home_team">
                      <p class="f_group">
                          <img width="50" height="50" :src="home_team_log">
                      </p>
                      <p class="t_name">{{gameBasicInfo.home_name_sc}}(主)</p>
                      <p class="deep">
                          <span>{{$t('排名')}}</span>
                          <span>{{gameBasicInfo.home_ranking}}{{gameBasicInfo.home_pid}}</span>
                      </p>
                  </div>
              </div>
              <div class="basket" v-show="!flag"  v-cloak>
                  <div class="nav_bar">
                      <ul class="clearfix main tab_switch">
                          <li class="active" @click="changToolStatus('nav_bar_toggle','game')">{{$t('赛事')}}</li>
                          <li @click="changToolStatus('nav_bar_toggle','military')">{{$t('战绩')}}</li>
                          <li @click="changToolStatus('nav_bar_toggle','team')">{{$t('球队')}}</li>
                          <li @click="changToolStatus('nav_bar_toggle','odds')">{{$t('赔率')}}</li>
                      </ul>
                  </div>
                  <div class="tab_body">
                      <div class="main inner_box">
                          <div class="tab_item match">
                              <ul class="tab_list">
                                  <!-- 历史交锋 -->
                                  <li class="list_item">
                                      <p class="item-top">
                                          <span>{{$t('比赛事件')}}</span>
                                          <img src="../../../assets/images/jiantou2.png" width="30" height="30" />
                                      </p>
                                      <div>
                                          <table v-if="!gameEmpty">
                                              <thead>
                                                  <tr>
                                                      <th></th>
                                                      <th>{{$t('第一节')}}</th>
                                                      <th>{{$t('第二节')}}</th>
                                                      <th>{{$t('第三节')}}</th>
                                                      <th>{{$t('第四节')}}</th>
                                                      <th>{{$t('加时')}}</th>
                                                      <th>{{$t('总分')}}</th>
                                                  </tr>
                                              </thead>
                                              <tbody>
                                                  <tr>
                                                      <td>{{eventDetails.visiting_name_sc?eventDetails.visiting_name_sc:'0'}}</td>
                                                      <td>{{eventDetails.visiting_section_one_score?eventDetails.visiting_section_one_score:'0'}}</td>
                                                      <td>{{eventDetails.visiting_section_two_score?eventDetails.visiting_section_two_score:'0'}}</td>
                                                      <td>{{eventDetails.visiting_section_three_score?eventDetails.visiting_section_three_score:'0'}}</td>
                                                      <td>{{eventDetails.visiting_section_four_score?eventDetails.visiting_section_four_score:'0'}}</td>
                                                      <td>
                                                          {{eventDetails.visiting_overtime_score?eventDetails.visiting_overtime_score:'0'}}
                                                      </td>
                                                      <td>{{eventDetails.visiting_current_score?eventDetails.visiting_current_score:'0'}}</td>
                                                  </tr>
                                                  <tr>
                                                      <td>{{eventDetails.home_name_sc?eventDetails.home_name_sc:'0'}}</td>
                                                      <td>{{eventDetails.home_section_one_score?eventDetails.home_section_one_score:'0'}}</td>
                                                      <td>{{eventDetails.home_section_two_score?eventDetails.home_section_two_score:'0'}}</td>
                                                      <td>{{eventDetails.home_section_three_score?eventDetails.home_section_three_score:'0'}}</td>
                                                      <td>{{eventDetails.home_section_four_score?eventDetails.home_section_four_score:'0'}}</td>
                                                      <td>
                                                          {{eventDetails.home_overtime_score?eventDetails.home_overtime_score:'0'}}
                                                      </td>
                                                      <td>{{eventDetails.home_current_score?eventDetails.home_current_score:'0'}}</td>
                                                  </tr>
                                              </tbody>
                                          </table>
                                          <p class="noData" v-else>{{$t('暂无数据')}}</p>
                                      </div>
                                  </li>
                                  <!-- 本场球员统计 -->
                                  <li class="list_item">
                                      <p class="item-top">
                                          <span>{{$t('本场球员统计')}}</span>
                                          <img src="../../../assets/images/jiantou2.png" width="30" height="30" />
                                      </p>
                                      <div class="item_body">
                                          <div class="nav_bar player" v-show="!playEmpty">
                                              <ul class="clearfix tab_switch">
                                                  <li class="active">{{gameBasicInfo.visiting_name_sc}}</li>
                                                  <li>{{gameBasicInfo.home_name_sc}}</li>
                                              </ul>
                                          </div>
                                          <div class="tab_body player" v-show="!playEmpty">
                                              <div class="inner_box">
                                                  <div class="tab_item">
                                                      <table>
                                                          <thead>
                                                              <tr>
                                                                  <th>{{$t('球员')}}</th>
                                                                  <th>{{$t('时间')}}</th>
                                                                  <th>{{$t('得分')}}</th>
                                                                  <th>{{$t('篮板')}}</th>
                                                                  <th>{{$t('助攻')}}</th>
                                                                  <th>{{$t('投篮')}}</th>
                                                              </tr>
                                                          </thead>
                                                          <tbody>
                                                              <tr v-for="(item,index) in visiting_play">
                                                                  <td>{{item.name_sc}}</td>
                                                                  <td>{{item.time}}</td>
                                                                  <td>{{item.goal_score}}</td>
                                                                  <td>{{item.total_back_board}}</td>
                                                                  <td>{{item.assists_num}}</td>
                                                                  <td>{{item.shoot}}</td>
                                                              </tr>
                                                          </tbody>
                                                      </table>
                                                  </div>
                                                  <div class="tab_item">
                                                      <table>
                                                          <thead>
                                                              <tr>
                                                                  <th>{{$t('球员')}}</th>
                                                                  <th>{{$t('时间')}}</th>
                                                                  <th>{{$t('得分')}}</th>
                                                                  <th>{{$t('篮板')}}</th>
                                                                  <th>{{$t('助攻')}}</th>
                                                                  <th>{{$t('投篮')}}</th>
                                                              </tr>
                                                          </thead>
                                                          <tbody>
                                                              <tr v-for="(item,index) in home_play">
                                                                  <td>{{item.name_sc}}</td>
                                                                  <td>{{item.time}}</td>
                                                                  <td>{{item.goal_score}}</td>
                                                                  <td>{{item.total_back_board}}</td>
                                                                  <td>{{item.assists_num}}</td>
                                                                  <td>{{item.shoot}}</td>
                                                              </tr>
                                                          </tbody>
                                                      </table>
                                                  </div>
                                              </div>
                                          </div>
                                          <p class="noData" v-show="playEmpty">{{$t('暂无数据')}}</p>
                                      </div>
                                  </li>
                                  <!-- 技术统计 -->
                                  <li class="list_item">
                                      <p class="item-top">
                                          <span>{{$t('技术统计')}}</span>
                                          <img src="../../../assets/images/jiantou2.png" width="30" height="30" />
                                      </p>
                                      <div>
                                          <ul class="tec"  v-show="!tecEmpty">
                                              <li>
                                                  <p>{{visiting_tec.sum_goal_score}}</p>
                                                  <p>{{$t('得分')}}</p>
                                                  <p>{{home_tec.sum_goal_score}}</p>
                                              </li>
                                              <li>
                                                  <p>{{visiting_tec.sum_total_back_board}}</p>
                                                  <p>{{$t('篮板')}}</p>
                                                  <p>{{home_tec.sum_total_back_board}}</p>
                                              </li>
                                              <li>
                                                  <p>{{visiting_tec.sum_assists_num}}</p>
                                                  <p>{{$t('助攻')}}</p>
                                                  <p>{{home_tec.sum_assists_num}}</p>
                                              </li>
                                              <li>
                                                  <p>{{visiting_tec.sum_block_shot}}</p>
                                                  <p>{{$t('盖帽')}}</p>
                                                  <p>{{home_tec.sum_block_shot}}</p>
                                              </li>
                                              <li>
                                                  <p>{{visiting_tec.sum_foul_num}}</p>
                                                  <p>{{$t('犯规')}}</p>
                                                  <p>{{home_tec.sum_foul_num}}</p>
                                              </li>
                                              <li>
                                                  <p>{{visiting_tec.sum_fault_num}}</p>
                                                  <p>{{$t('失误')}}</p>
                                                  <p>{{home_tec.sum_fault_num}}</p>
                                              </li>
                                              <li>
                                                  <p>{{visiting_tec.number_of_hits}}</p>
                                                  <p>{{$t('投篮命中')}}</p>
                                                  <p>{{home_tec.number_of_hits}}</p>
                                              </li>
                                              <li>
                                                  <p>{{visiting_tec.sum_total_hits_rate?visiting_tec.sum_total_hits_rate+'%':''}}</p>
                                                  <p>{{$t('投篮命中率')}}</p>
                                                  <p>{{home_tec.sum_total_hits_rate?home_tec.sum_total_hits_rate+'%':''}}</p>
                                              </li>
                                              <li>
                                                  <p>{{visiting_tec.free_throw}}</p>
                                                  <p>{{$t('罚球命中')}}</p>
                                                  <p>{{home_tec.free_throw}}</p>
                                              </li>
                                              <li>
                                                  <p>{{visiting_tec.sum_fq_hits_rate?visiting_tec.sum_fq_hits_rate+'%':''}}</p>
                                                  <p>{{$t('罚球命中率')}}</p>
                                                  <p>{{home_tec.sum_fq_hits_rate?home_tec.sum_fq_hits_rate+'%':''}}</p>
                                              </li>
                                              <li>
                                                  <p>{{visiting_tec.sum_score3_hits}}</p>
                                                  <p>{{$t('三分命中')}}</p>
                                                  <p>{{home_tec.sum_score3_hits}}</p>
                                              </li>
                                              <li>
                                                  <p>{{visiting_tec.sum_score3_hits_rate?visiting_tec.sum_score3_hits_rate+'%':''}}</p>
                                                  <p>{{$t('三分命中率')}}</p>
                                                  <p>{{home_tec.sum_score3_hits_rate?home_tec.sum_score3_hits_rate+'%':''}}</p>
                                              </li>
                                          </ul>
                                          <p class="noData" v-show="tecEmpty">{{$t('暂无数据')}}</p>
                                      </div>
                                  </li>
                              </ul>
                          </div>
                          <div class="tab_item military">
                              <div class="tab_list">
                                  <div class="list_item ">
                                      <p class="item-top">
                                          <span>{{$t('历史交锋')}}</span>
                                          <img src="../../../assets/images/jiantou2.png" width="30" height="30" />
                                      </p>
                                      <div>
                                          <div v-show="recentHistoryList.length">
                                              <p class="history">
                                              <span class="dot"></span>
                                              <span class="tex">
                                                  <span>{{gameBasicInfo.home_name_sc}}</span>
                                                  <span>{{history_win}}胜{{history_lose}}负，</span>
                                                  <span>{{$t('场均总分')}}{{history_total}}分，{{$t('场均分差')}}{{history_gap}}分</span>
                                              </span>
                                              </p>
                                              <table class="history">
                                                  <thead>
                                                      <tr>
                                                          <th>{{$t('赛事')}}</th>
                                                          <th colspan="2">
                                                              <p class="merge">
                                                                  <span>{{$t('客')}}</span>
                                                                  <span>{{$t('主')}}</span>
                                                              </p>
                                                          </th>
                                                          <th>{{$t('赛果')}}</th>
                                                          <th>{{$t('总分')}}</th>
                                                      </tr>
                                                  </thead>
                                                  <tbody>
                                                      <tr v-for="(item,index) in recentHistoryList">
                                                          <td class="league">
                                                              <p>{{item.matchDate?item.matchDate.substr(0,10):'-'}}</p>
                                                              <p>{{item.leagueName?item.leagueName:'-'}}</p>
                                                          </td>
                                                          <td colspan="2">
                                                              <p class="merge">
                                                                  <span>{{item.awayTeamName}}</span>
                                                                  <span>{{item.awayGoal}}:{{item.homeGoal}}</span>
                                                                  <span>{{item.homeTeamName}}</span>
                                                              </p>
                                                          </td>
                                                          <td :class="item.isWinLost=='负'?'green':'red'">{{item.isWinLost}}</td>
                                                          <td>{{item.scoreSum}}</td>
                                                      </tr>
                                                  </tbody>
                                              </table>
                                          </div>
                                          <p class="noData"  v-show="!recentHistoryList.length">{{$t('暂无数据')}}</p>
                                      </div>
                                  </div>
                                  <div class="list_item">
                                      <div>
                                          <p class="item-top">
                                              <span>{{$t('近期战绩')}}</span>
                                              <img src="../../../assets/images/jiantou2.png" width="30" height="30" />
                                          </p>
                                          <div>
                                              <div v-show="homeRecentlyRecordList.length">
                                                  <p class="history">
                                                      <span class="dot"></span>
                                                      <span class="tex">
                                                          <span>{{gameBasicInfo.home_name_sc}}</span>
                                                          <span>{{home_win}}胜{{home_lose}}负，</span>
                                                          <span>{{$t('场均总分')}}{{home_total}}分，{{$t('场均分差')}}{{home_lose}}分</span>
                                                      </span>
                                                  </p>
                                                  <table>
                                                      <thead>
                                                          <tr>
                                                              <th>{{$t('赛事')}}</th>
                                                              <th colspan="2">
                                                                  <p class="merge">
                                                                      <span>{{$t('客')}}</span>
                                                                      <span>{{$t('主')}}</span>
                                                                  </p>
                                                              </th>
                                                              <th>{{$t('赛果')}}</th>
                                                              <th>{{$t('总分')}}</th>
                                                          </tr>
                                                      </thead>
                                                      <tbody>
                                                          <tr v-for="(item,index) in homeRecentlyRecordList">
                                                              <td class="league">
                                                                  <p>{{item.matchDate?item.matchDate.substr(0,10):'-'}}</p>
                                                                  <p>{{item.leagueName?item.leagueName:'-'}}</p>
                                                              </td>
                                                              <td colspan="2">
                                                                  <p class="merge">
                                                                      <span :class="item.awayTeamName==gameBasicInfo.home_name_sc?'red':''">{{item.awayTeamName}}</span>
                                                                      <span>{{item.awayGoal}}:{{item.homeGoal}}</span>
                                                                      <span :class="item.homeTeamName==gameBasicInfo.home_name_sc?'red':''">{{item.homeTeamName}}</span>
                                                                  </p>
                                                              </td>
                                                              <td :class="item.isWinLost=='负'?'green':'red'">{{item.isWinLost}}</td>
                                                              <td>{{item.scoreSum}}</td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <p class="history">
                                                      <span class="dot"></span>
                                                      <span class="tex">
                                                          <span>{{gameBasicInfo.visiting_name_sc}}</span>
                                                          <span>{{away_win}}胜{{away_lose}}负，</span>
                                                          <span>{{$t('场均总分')}}{{away_total}}分，{{$t('场均分差')}}{{away_gap}}分</span>
                                                      </span>
                                                  </p>
                                                  <table>
                                                      <thead>
                                                          <tr>
                                                              <th>{{$t('赛事')}}</th>
                                                              <th colspan="2">
                                                                  <p class="merge">
                                                                      <span>{{$t('客')}}</span>
                                                                      <span>{{$t('主')}}</span>
                                                                  </p>
                                                              </th>
                                                              <th>{{$t('赛果')}}</th>
                                                              <th>{{$t('总分')}}</th>
                                                          </tr>
                                                      </thead>
                                                      <tbody>
                                                          <tr v-for="(item,index) in visitingRecentlyRecordList">
                                                              <td class="league">
                                                                  <p>{{item.matchDate?item.matchDate.substr(0,10):'-'}}</p>
                                                                  <p>{{item.leagueName?item.leagueName:'-'}}</p>
                                                              </td>
                                                              <td colspan="2">
                                                                  <p class="merge">
                                                                      <span :class="item.awayTeamName==gameBasicInfo.visiting_name_sc?'green':''">{{item.awayTeamName}}</span>
                                                                      <span>{{item.awayGoal}}:{{item.homeGoal}}</span>
                                                                      <span :class="item.homeTeamName==gameBasicInfo.visiting_name_sc?'green':''">{{item.homeTeamName}}</span>
                                                                  </p>
                                                              </td>
                                                              <td :class="item.isWinLost=='负'?'green':'red'">{{item.isWinLost}}</td>
                                                              <td>{{item.scoreSum}}</td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                              </div>
                                              <p class="noData" v-show="!homeRecentlyRecordList.length">{{$t('暂无数据')}}</p>
                                          </div>
                                      </div>
                                  </div>
                                  <!-- <div class="list_item">
                                      <p class="item-top">
                                          <span>{{$t('未来赛事')}}</span>
                                          <img src="../../../assets/images/jiantou2.png" width="30" height="30" />
                                      </p>
                                      <div>
                                          <p class="history">
                                              <span class="dot"></span>
                                              <span class="tex">
                                                  <span>{{$t('鹈鹕')}}</span>
                                              </span>
                                          </p>
                                          <table>
                                              <thead>
                                                  <tr>
                                                      <th>{{$t('赛事')}}</th>
                                                      <th>{{$t('日期')}}</th>
                                                      <th colspan="2">
                                                          <p class="merge">
                                                              <span>{{$t('客')}}</span>
                                                              <span>{{$t('主')}}</span>
                                                          </p>
                                                      </th>
                                                      <th>{{$t('相隔')}}</th>
                                                  </tr>
                                              </thead>
                                              <tbody>
                                                  <tr>
                                                      <td>
                                                          NBA
                                                      </td>
                                                      <td>
                                                          17-03-02
                                                      </td>
                                                      <td colspan="2">
                                                          <p class="merge">
                                                              <span>{{$t('活塞')}}</span>
                                                              <span>VS</span>
                                                              <span>{{$t('鹈鹕')}}</span>
                                                          </p>
                                                      </td>
                                                      <td>3天</td>
                                                  </tr>
                                              </tbody>
                                          </table>
                                          <p class="history">
                                              <span class="dot"></span>
                                              <span class="tex">
                                                  <span>{{$t('鹈鹕')}}</span>
                                              </span>
                                          </p>
                                          <table>
                                              <thead>
                                                  <tr>
                                                      <th>{{$t('赛事')}}</th>
                                                      <th>{{$t('日期')}}</th>
                                                      <th colspan="2">
                                                          <p class="merge">
                                                              <span>{{$t('客')}}</span>
                                                              <span>{{$t('主')}}</span>
                                                          </p>
                                                      </th>
                                                      <th>{{$t('相隔')}}</th>
                                                  </tr>
                                              </thead>
                                              <tbody>
                                                  <tr>
                                                      <td>
                                                          NBA
                                                      </td>
                                                      <td>
                                                          17-03-02
                                                      </td>
                                                      <td colspan="2">
                                                          <p class="merge">
                                                              <span>{{$t('活塞')}}</span>
                                                              <span>VS</span>
                                                              <span>{{$t('鹈鹕')}}</span>
                                                          </p>
                                                      </td>
                                                      <td>3天</td>
                                                  </tr>
                                              </tbody>
                                          </table>
                                      </div>
                                  </div> -->
                              </div>
                          </div>
                          <div class="tab_item team">
                              <div class="tab_list">
                                  <div class="away_home tool">
                                      <ul>
                                          <!--行内块元素 不要格式化这两个li标签 否则会出现间隙 -->
                                          <li :class="home_away_toggle.away?'active':''" @click="changToolStatus('home_away_toggle','away')">{{gameBasicInfo.visiting_name_sc}}</li><li :class="home_away_toggle.home?'active':''" @click="changToolStatus('home_away_toggle','home')">{{gameBasicInfo.home_name_sc}}</li>
                                      </ul>
                                  </div>
                                  <div class="list_item">
                                      <p class="item-top">
                                          <span>{{$t('排名')}}</span>
                                          <img src="../../../assets/images/jiantou2.png" width="30" height="30" />
                                      </p>
                                      <div class="rank" v-if="away_rank.length">
                                          <div class="away_rank" v-if="home_away_toggle.away">
                                              <p class="history">
                                                  <span class="dot"></span>
                                                  <span class="tex">
                                                      <span>{{gameBasicInfo.visiting_name_sc}}</span>
                                                      <span>{{gameBasicInfo.visiting_ranking}}{{gameBasicInfo.visiting_pid}}，</span>
                                                      <span>胜率{{away_rate}}，{{rank_away_win}}胜{{rank_away_lose}}负</span>
                                                  </span>
                                              </p>
                                              <table>
                                                  <thead>
                                                      <tr>
                                                          <th>{{$t('排名')}}</th>
                                                          <th>{{$t('球队')}}</th>
                                                          <th>{{$t('胜')}}</th>
                                                          <th>{{$t('负')}}</th>
                                                          <th>{{$t('胜率')}}</th>
                                                          <th>{{$t('主场战绩')}}</th>
                                                      </tr>
                                                  </thead>
                                                  <tbody>
                                                      <tr v-for="(item,index) in away_rank">
                                                          <td>{{item.pid}}</td>
                                                          <td>{{item.cn_name}}</td>
                                                          <td>{{item.zts!=undefined?item.zts:'-'}}</td>
                                                          <td>{{item.ztf!=undefined?item.ztf:'-'}}</td>
                                                          <td>{{item.ztsl!=undefined?item.ztsl:'-'}}</td>
                                                          <td>{{item.zs!=undefined?item.zs:'-'}}胜{{item.zf!=undefined?item.zf:'-'}}负</td>
                                                      </tr>
                                                  </tbody>
                                              </table>
                                          </div>
                                          <div class="home_rank" v-if="home_away_toggle.home">
                                              <p class="history">
                                                  <span class="dot"></span>
                                                  <span class="tex">
                                                  <span>{{gameBasicInfo.home_name_sc}}</span>
                                                  <span>{{gameBasicInfo.home_ranking}}{{gameBasicInfo.home_pid}}，</span>
                                                      <span>胜率{{home_rate}}，{{rank_home_win}}胜{{rank_home_lose}}负</span>
                                                  </span>
                                              </p>
                                              <table>
                                                  <thead>
                                                      <tr>
                                                          <th>{{$t('排名')}}</th>
                                                          <th>{{$t('球队')}}</th>
                                                          <th>{{$t('胜')}}</th>
                                                          <th>{{$t('负')}}</th>
                                                          <th>{{$t('胜率')}}</th>
                                                          <th>{{$t('主场战绩')}}</th>
                                                      </tr>
                                                  </thead>
                                                  <tbody>
                                                      <tr v-for="(item,index) in home_rank">
                                                          <td>{{item.pid}}</td>
                                                          <td>{{item.cn_name}}</td>
                                                          <td>{{item.zts!=undefined?item.zts:'-'}}</td>
                                                          <td>{{item.ztf!=undefined?item.ztf:'-'}}</td>
                                                          <td>{{item.ztsl!=undefined?item.ztsl:'-'}}</td>
                                                          <td>{{item.zs!=undefined?item.zs:'-'}}胜{{item.zf!=undefined?item.zf:'-'}}负</td>
                                                      </tr>
                                                  </tbody>
                                              </table>
                                          </div>
                                      </div>
                                      <p class="noData" v-else>{{$t('暂无数据')}}</p>
                                  </div>
                                  <!-- <div class="list_item">
                                      <p class="item-top">
                                          <span>{{$t('常规阵容')}}</span>
                                          <img src="../../../assets/images/jiantou2.png" width="30" height="30" />
                                      </p>
                                      <div class="battle">
                                          <table class="away" v-if="home_away_toggle.away">
                                              <thead>
                                                  <tr>
                                                      <th>{{$t('球员')}}</th>
                                                      <th>{{$t('场次')}}</th>
                                                      <th>{{$t('时间')}}</th>
                                                      <th>{{$t('得分')}}</th>
                                                      <th>{{$t('篮板')}}</th>
                                                      <th>{{$t('助攻')}}</th>
                                                  </tr>
                                              </thead>
                                              <tbody>
                                                  <tr v-for="(item,index) in visitingMap">
                                                      <td>{{item.pid}}</td>
                                                      <td>{{item.cn_name}}</td>
                                                      <td>{{item.zts}}</td>
                                                      <td>{{item.ztf}}</td>
                                                      <td>{{item.ztsl}}</td>
                                                      <td>{{item.zs}}</td>
                                                  </tr>
                                              </tbody>
                                          </table>
                                          <table class="home" v-if="home_away_toggle.home">
                                              <thead>
                                                  <tr>
                                                      <th>{{$t('球员')}}</th>
                                                      <th>{{$t('场次')}}</th>
                                                      <th>{{$t('时间')}}</th>
                                                      <th>{{$t('得分')}}</th>
                                                      <th>{{$t('篮板')}}</th>
                                                      <th>{{$t('助攻')}}</th>
                                                  </tr>
                                              </thead>
                                              <tbody>
                                                  <tr>
                                                      <td>{{$t('裤子吗')}}</td>
                                                      <td>22</td>
                                                      <td>30'30"</td>
                                                      <td>10.1</td>
                                                      <td>6.3</td>
                                                      <td>1.8</td>
                                                  </tr>
                                              </tbody>
                                          </table>
                                      </div>
                                  </div> -->
                              </div>
                          </div>
                          <div class="tab_item odds_model">
                              <div class="odds tool">
                                  <ul>
                                      <!--行内块元素 不要格式化这三个li标签 否则会出现间隙 -->
                                      <li :class="odd_type_toggle.sf?'active':''" @click="changToolStatus('odd_type_toggle','sf')">{{$t('胜负')}}</li><li :class="odd_type_toggle.rf?'active':''" @click="changToolStatus('odd_type_toggle','rf')">{{$t('让分胜负')}}</li><li :class="odd_type_toggle.dxf?'active':''" @click="changToolStatus('odd_type_toggle','dxf')">{{$t('大小分')}}</li>
                                  </ul>
                              </div>
                              <table class="sf" v-show="odd_type_toggle.sf">
                                  <thead>
                                      <tr>
                                          <th rowspan="2" width="15%">{{$t('公司')}}</th>
                                          <th colspan="2">{{$t('初始赔率')}}</th>
                                          <th colspan="2">{{$t('即时赔率')}}</th>
                                      </tr>
                                      <tr>
                                          <th>{{$t('客胜')}}</th>
                                          <th>{{$t('主胜')}}</th>
                                          <th>{{$t('客胜')}}</th>
                                          <th>{{$t('主胜')}}</th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                      <tr v-for="(item,index) in sf_store">
                                          <td>{{item.provider_name}}</td>
                                          <td>{{item.first_lost_odds}}</td>
                                          <td>{{item.first_win_odds}}</td>
                                          <td :class="item.win_red_green=='green'?'green':item.win_red_green=='red'?'red':''">{{item.lost_odds}}<b>{{item.win_red_green=='green'?'↓':item.win_red_green=='red'?'↑':''}}</b></td>
                                          <td :class="item.lost_red_green=='green'?'green':item.lost_red_green=='red'?'red':''">{{item.win_odds}}<b>{{item.lost_red_green=='green'?'↓':item.lost_red_green=='red'?'↑':''}}</b></td>
                                      </tr>
                                  </tbody>
                              </table>
                              <table class="rf" v-show="odd_type_toggle.rf">
                                  <thead>
                                      <tr>
                                          <th rowspan="2" width="15%">{{$t('公司')}}</th>
                                          <th colspan="3">{{$t('初始赔率')}}</th>
                                          <th colspan="3">{{$t('即时赔率')}}</th>
                                      </tr>
                                      <tr>
                                          <th>{{$t('主胜')}}</th>
                                          <th>{{$t('主让分')}}</th>
                                          <th>{{$t('客胜')}}</th>
                                          <th>{{$t('主胜')}}</th>
                                          <th>{{$t('主让分')}}</th>
                                          <th>{{$t('客胜')}}</th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                      <tr v-for="(item,index) in rf_store">
                                          <td>{{item.provider_name}}</td>
                                          <td>{{item.first_host_odds}}</td>
                                          <td>{{item.first_vs_odds}}</td>
                                          <td>{{item.first_visit_odds}}</td>
                                          <td :class="item.host_red_green=='green'?'green':item.host_red_green=='red'?'red':''">{{item.host_odds}}<b>{{item.host_red_green=='green'?'↓':item.host_red_green=='red'?'↑':''}}</b></td>
                                          <td :class="item.vs_red_green=='green'?'green':item.vs_red_green=='red'?'red':''">{{item.vs_odds}}<b>{{item.vs_red_green=='green'?'↓':item.vs_red_green=='red'?'↑':''}}</b></td>
                                          <td :class="item.visit_red_green=='green'?'green':item.visit_red_green=='red'?'red':''">{{item.visit_odds}}<b>{{item.visit_red_green=='green'?'↓':item.visit_red_green=='red'?'↑':''}}</b></td>
                                      </tr>
                                  </tbody>
                              </table>
                              <table class="dxf" v-show="odd_type_toggle.dxf">
                                  <thead>
                                      <tr>
                                          <th rowspan="2" width="15%">{{$t('公司')}}</th>
                                          <th colspan="3">{{$t('初始赔率')}}</th>
                                          <th colspan="3">{{$t('即时赔率')}}</th>
                                      </tr>
                                      <tr>
                                          <th>{{$t('大分')}}</th>
                                          <th>{{$t('总分')}}</th>
                                          <th>{{$t('小分')}}</th>
                                          <th>{{$t('大分')}}</th>
                                          <th>{{$t('总分')}}</th>
                                          <th>{{$t('小分')}}</th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                      <tr v-for="(item,index) in ou_store">
                                          <td>{{item.provider_name}}</td>
                                          <td>{{item.first_ou_odds_over}}</td>
                                          <td>{{item.first_ou_odds_vs}}</td>
                                          <td>{{item.first_ou_odds_under}}</td>
                                          <td  :class="item.over_red_green=='green'?'green':item.over_red_green=='red'?'red':''">{{item.ou_odds_over}}<b>{{item.over_red_green=='green'?'↓':item.over_red_green=='red'?'↑':''}}</b></td>
                                          <td  :class="item.vs_red_green=='green'?'green':item.vs_red_green=='red'?'red':''">{{item.ou_odds_vs}}<b>{{item.vs_red_green=='green'?'↓':item.vs_red_green=='red'?'↑':''}}</b></td>
                                          <td  :class="item.under_red_green=='green'?'green':item.under_red_green=='red'?'red':''">{{item.ou_odds_under}}<b>{{item.under_red_green=='green'?'↓':item.under_red_green=='red'?'↑':''}}</b></td>
                                      </tr>
                                  </tbody>
                              </table>
                          </div>
                      </div>
                  </div>
              </div>
              <!-- 加载数据时的遮罩层 -->
              <div class="mask" v-show="flag">
                  <p>{{$t('正在加载中')}}，{{$t('请稍后')}}...</p>
              </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script src="../../../assets/js/sg/basketDetail.js"></script>

<style src="../../../style/sg/basketDetail.css" scoped></style>
