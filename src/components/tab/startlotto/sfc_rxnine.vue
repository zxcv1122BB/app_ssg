<template>
  <div>
    <div id="container">
<div id="main">
    <!--顶部-->
    <header id="header">
        <h1>{{$t('胜负彩')}}/{{$t('任选九')}}</h1>
        <a class="goBack" @click="routerBack" href="javascript:void(0)">{{$t('返回')}}</a>
        <!-- <img id="trigger3" src="images/date1.png" style="right: 1rem;" width="20" height="20"/> -->
    </header>
    <!--比分与球队-->
    <div class="selTool" v-show="period">
        <p class="sel_item">
            <span id="trigger3" v-cloak>{{qi}}期</span>
            <span class="bage" v-show="period"></span>
        </p>
    </div>
    <div class="inner">
    	<div v-if="datas.length==0" style="color: #999999;" id="noMessage">
    		<img src="../../../assets/images/background.png" height="200rem"/>
        	<p>{{$t('暂无数据')}}</p>
        </div>
        <div v-else id="showMessage">
        	<!-- <p class="p1">
	            <span v-cloak >第{{qi}}期</span>
	        </p> -->
            <table style="width: 100%;margin: 10px 0;" v-cloak>
                <tbody>
                <tr>
                    <td v-for="item in datas" style="text-align: center;width: 7.14%;"><span v-cloak style="background-color: #24b724;color: white;display: inline-block;width: 80%;margin: 0 auto;padding: 3px 0;box-sizing: border-box;">{{item.spf}}</span></td>
                </tr>
                </tbody>
            </table>
            <table border="1" cellpadding="0" cellspacing="0" style="width: 100%;">
                <tbody>
                <tr style="min-height: 150px;">
                    <td style="text-align: center;width: 7.14%;vertical-align: top;padding: 5px;" v-for="item in datas" v-cloak>{{item.homeTeamName.replace(/\s/g,'')}}</td>
                </tr>
                <tr style="min-height: 150px;">
                    <td style="text-align: center;width: 7.14%;vertical-align: top;padding: 5px;" v-for="item in datas" v-cloak>{{item.awayTeamName.replace(/\s/g,'')}}</td>
                </tr>
                </tbody>
            </table>
            <div class="bouns" v-cloak v-if="prize_store.sfc_prize.first_prize_number">
		        <table class="prize">
		            <thead>
		                <tr>
		                    <th>{{$t('奖项')}}</th>
		                    <th>{{$t('中奖注数')}}</th>
		                    <th>{{$t('每注金额')}}({{coinUnit}})</th>
		                </tr>
		            </thead>
		            <tbody>
		                <tr style="background:#f4f4f4;">
		                    <td>{{$t('一等奖')}}</td>
		                    <td v-text="prize_store.sfc_prize.first_prize_number===null?'-':prize_store.sfc_prize.first_prize_number"></td>
		                    <td style="color:red;" v-text="prize_store.sfc_prize.first_prize_bonus===null?'-':prize_store.sfc_prize.first_prize_bonus"></td>
		                </tr>
		                <tr>
		                    <td>{{$t('二等奖')}}</td>
		                    <td v-text="prize_store.sfc_prize.second_prize_number===null?'-':prize_store.sfc_prize.second_prize_number"></td>
		                    <td style="color:red;" v-text="prize_store.sfc_prize.second_prize_bonus===null?'-':prize_store.sfc_prize.second_prize_bonus"></td>
		                </tr>
		                <!-- <tr style="background:#f4f4f4;">
		                    <td>{{$t('任选九')}}</td>
		                    <td v-text="prize_store.rxj_prize.first_prize_number===null?'-':prize_store.rxj_prize.first_prize_number"></td>
		                    <td style="color:red;" v-text="prize_store.rxj_prize.first_prize_bonus===null?'-':prize_store.rxj_prize.first_prize_bonus"></td>
		                </tr> -->
		            </tbody>
		        </table>
		    </div>
        </div>
    </div>

</div>

    </div>
  </div>
</template>
<script src="../../../assets/js/startlotto/sfc_rxnine.js"></script>

<style src="../../../style/startlotto/sfc_rxnine.css" scoped></style>
