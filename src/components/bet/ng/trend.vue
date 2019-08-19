<template>
    <div>
        <div id="container">
            <header id="header">
                <div class="gameplaySelect">
                    <span></span>
                    <span class="btn" v-cloak>
                    {{title}}
                    <em class="triangle"></em>
                </span>
                </div>
                <!--<h1>足球单场</h1>-->
                <a class="goBack " href="javascript:void(0)" @click="routerBack"></a>
                <!-- <span class="menu">菜单</span> -->
            </header>
            <div id="article">

                <article id="article0">
                    <table class="dingweiDan" v-cloak>
                        <thead>
                        <tr>
                            <th>{{$t('期数')}}</th>
                            <th>{{$t('开奖号码')}}</th>
                            <th v-if="chartId==5||chartId==38||chartId==11||(chartId>=20&&chartId<=25)||chartId==19">{{$t('和值')}}</th>
                            <th v-if="chartId==5||chartId==38||chartId==11||(chartId>=20&&chartId<=25)||chartId==19">{{$t('跨度')}}</th>
                            <th v-if="chartId==5||chartId==38||chartId==11||(chartId>=20&&chartId<=25)||chartId==19">{{$t('形态')}}</th>
                            <th v-if="chartId==7||chartId==16||chartId==17||chartId==18" colspan="3">{{$t('总和')}}</th>
                            <th v-if="chartId==7||chartId==16||chartId==17||chartId==18">{{$t('龙虎')}}</th>
                            <!-- <th v-if="chartId==6||chartId==7||chartId==13||chartId==14||chartId==16||chartId==17||chartId==18">
                                前三
                            </th>
                            <th v-if="chartId==6||chartId==7||chartId==13||chartId==14||chartId==16||chartId==17||chartId==18">
                                中三
                            </th>
                            <th v-if="chartId==6||chartId==7||chartId==13||chartId==14||chartId==16||chartId==17||chartId==18">
                                后三
                            </th> -->
                            <template v-if="trendNum.ssc==1">
                                <th>{{$t('前三')}}</th>
                                <th>{{$t('中三')}}</th>
                                <th>{{$t('后三')}}</th>
                            </template>
                            <th v-if="chartId==8||chartId==15">{{$t('冠亚和')}}</th>
                            <th v-if="chartId==9||chartId==40||chartId==41">{{$t('大小单双')}}</th>
                            <th v-if="chartId==9||chartId==40||chartId==41">{{$t('色波')}}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr :key="index" v-for="(item,index) in datas" v-cloak>
                            <td>{{item.issue}}</td>
                            <td v-if="chartId==9||chartId==40||chartId==41">{{item.bjluck}}={{item.bjluckNum}}</td>
                            <td v-if="chartId!=9&&chartId!=40&&chartId!=41">{{item.luck_number}}</td>
                            <td v-if="chartId==5||chartId==38||chartId==11||(chartId>=20&&chartId<=25)||chartId==7||chartId==16||chartId==17||chartId==18||chartId==19">
                                {{item.total}}
                            </td>
                            <td v-if="chartId==5||chartId==38||chartId==11||(chartId>=20&&chartId<=25)||chartId==19">
                                {{item.difference}}
                            </td>
                            <td v-if="chartId!=12">{{item.shape}}</td>

                            <!-- <td v-if="chartId==6||chartId==13||chartId==14||chartId==9||chartId==7||chartId==16||chartId==17||chartId==18||chartId==40||chartId==41">
                                {{item.shape1}}
                            </td>
                            <td v-if="chartId==6||chartId==13||chartId==14||chartId==7||chartId==16||chartId==17||chartId==18">
                                {{item.shape2}}
                            </td> -->
                            <template v-if="trendNum.ssc==1">
                                <td>{{item.shape1}}</td>
                                <td>{{item.shape2}}</td>
                            </template>
                            <td v-if="chartId==7||chartId==16||chartId==17||chartId==18">{{item.thr_left}}</td>
                            <td v-if="chartId==7||chartId==16||chartId==17||chartId==18">{{item.thr_center}}</td>
                            <td v-if="chartId==7||chartId==16||chartId==17||chartId==18">{{item.thr_right}}</td>
                        </tr>
                        </tbody>
                    </table>
                    <!-- <div class="fixed_bottom" >
                        <p class="time" v-if="preventBanner!=0">距{{preventBanner}}期截止：<span>{{courtDown}}</span></p>
                        <p class="time"  v-else>距投注截止时间：<span>{{courtDown}}</span></p>
                    </div> -->
                </article>
                <article id="article1">
                    <form id="form" runat="server">
                        <div style=" top:0;left:0px; position:absolute; ">
                            <table class="dingweiDan">
                                <thead>
                                <th>{{$t('期数')}}</th>
                                <th v-if="chartId==9||chartId==40||chartId==41">{{$t('特码')}}</th>
                                <th v-if="chartId==11||(chartId>=20&&chartId<=25)">{{$t('和值')}}</th>
                                <th :key="index" v-for="(obj,index) in arr">
                                    <span v-if="chartId==8||chartId==7||chartId==15||chartId==16||chartId==17||chartId==18">{{index+1}}</span>
                                    <span v-else-if="chartId==11||(chartId>=20&&chartId<=25)">{{index+3}}</span>
                                    <span v-else>{{index}}</span>
                                </th>
                                </thead>
                                <tbody id="testtd">
                                <tr :key="index" v-for="(item,index) in datas" v-cloak>
                                    <td>{{item.issue}}</td>
                                    <td v-if="chartId==9||chartId==40||chartId==41">{{item.bjluckNum}}</td>
                                    <td v-if="chartId==11||(chartId>=20&&chartId<=25)">{{item.total}}</td>
                                    <td :key="indexs" v-for="(items,indexs) in datas[index].num">{{items}}</td>
                                </tr>
                                </tbody>
                                <tbody id="total">
                                <tr id="count1">
                                    <td v-if="chartId==9||chartId==11||chartId==40||chartId==41||(chartId>=20&&chartId<=25)" colspan="2">{{$t('出现次数')}}</td>
                                    <td v-else>{{$t('出现次数')}}</td>
                                    <td :key="index" v-for="(obj,index) in arr"></td>
                                </tr>
                                <tr id="avg1">
                                    <td v-if="chartId==9||chartId==11||chartId==40||chartId==41||(chartId>=20&&chartId<=25)" colspan="2">{{$t('平均遗漏')}}</td>
                                    <td v-else>{{$t('平均遗漏')}}</td>
                                    <td :key="index" v-for="(obj,index) in arr"></td>
                                </tr>
                                <tr id="missMax1">
                                    <td v-if="chartId==9||chartId==11||chartId==40||chartId==41||(chartId>=20&&chartId<=25)" colspan="2">{{$t('最大遗漏')}}</td>
                                    <td v-else>{{$t('最大遗漏')}}</td>
                                    <td :key="index" v-for="(obj,index) in arr"></td>
                                </tr>
                                <tr id="lineOut1">
                                    <td v-if="chartId==9||chartId==11||chartId==40||chartId==41||(chartId>=20&&chartId<=25)" colspan="2">{{$t('最大连出')}}</td>
                                    <td v-else>{{$t('最大连出')}}</td>
                                    <td :key="index" v-for="(obj,index) in arr"></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                        <!-- <canvas id="myCanvas"></canvas> -->
                    </form>
                    <!-- <canvas id="myCanvas" style="position:absolute; top:3.66rem; left:0;"></canvas> -->
                    <canvas id="myCanvas" style="position:relative;"></canvas>
                </article>
                <!-- 玩法菜单 -->
                <div class="mask play_menu">
                    <div class="play_head" >
                        <ul>
                            <li class="active">
                                <span class="sel" @click="getdatas(1,0,0)">{{$t('基本走势')}}</span>
                            </li>
                            <li v-if="chartId==9||chartId==40||chartId==41">
                                <span class="sel" @click="getdatas(1,1,2)">{{$t('特码')}}</span>
                            </li>
                            <li v-else-if="chartId==11||(chartId>=20&&chartId<=25)">
                                <span class="sel" @click="getdatas(1,1,3)">{{$t('和值走势')}}</span>
                            </li>
                            <li v-else>
                                <span class="sel" @click="getdatas(1,1,1)">{{$t('定位胆')}}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="fixed_bottom">
                <table v-if="numIndex == 1">
                    <tr v-if="chartId==5||chartId==19||chartId==38">
                        <td @click="getdatas(1,1,1)" id="choose11">{{$t('百位')}}</td>
                        <td @click="getdatas(2,1,1)" id="choose21">{{$t('十位')}}</td>
                        <td @click="getdatas(3,1,1)" id="choose31">{{$t('个位')}}</td>
                    </tr>
                    <tr v-if="chartId==6||chartId==13||chartId==14">
                        <td @click="getdatas(1,1,1)" id="choose11">{{$t('万位')}}</td>
                        <td @click="getdatas(2,1,1)" id="choose21">{{$t('千位')}}</td>
                        <td @click="getdatas(3,1,1)" id="choose31">{{$t('百位')}}</td>
                        <td @click="getdatas(4,1,1)" id="choose41">{{$t('十位')}}</td>
                        <td @click="getdatas(5,1,1)" id="choose51">{{$t('个位')}}</td>
                    </tr>
                    <tr v-if="chartId==8||chartId==7||chartId==15||chartId==16||chartId==17||chartId==18">
                        <td @click="getdatas(1,1,1)" id="choose11">{{$t('第一位')}}</td>
                        <td @click="getdatas(2,1,1)" id="choose21">{{$t('第二位')}}</td>
                        <td @click="getdatas(3,1,1)" id="choose31">{{$t('第三位')}}</td>
                        <td @click="getdatas(4,1,1)" id="choose41">{{$t('第四位')}}</td>
                        <td @click="getdatas(5,1,1)" id="choose51">{{$t('第五位')}}</td>
                    </tr>
                    <tr v-if="chartId==8||chartId==15">
                        <td @click="getdatas(6,1,1)" id="choose61">{{$t('第六位')}}</td>
                        <td @click="getdatas(7,1,1)" id="choose71">{{$t('第七位')}}</td>
                        <td @click="getdatas(8,1,1)" id="choose81">{{$t('第八位')}}</td>
                        <td @click="getdatas(9,1,1)" id="choose91">{{$t('第九位')}}</td>
                        <td @click="getdatas(10,1,1)" id="choose101">{{$t('第十位')}}</td>
                    </tr>
                    <tr v-if="chartId==12">
                        <td @click="getdatas(1,1,1)" id="choose11">{{$t('第一位')}}</td>
                        <td @click="getdatas(2,1,1)" id="choose21">{{$t('第二位')}}</td>
                        <td @click="getdatas(3,1,1)" id="choose31">{{$t('第三位')}}</td>
                        <td @click="getdatas(4,1,1)" id="choose41">{{$t('第四位')}}</td>
                    </tr>
                    <!--<tr v-if="chartId==12">
                        <td @click="getdatas(5,1,1)" id="choose51">{{$t('第五位')}}</td>
                        <td @click="getdatas(6,1,1)" id="choose61">{{$t('第六位')}}</td>
                        <td @click="getdatas(7,1,1)" id="choose71">{{$t('第七位')}}</td>
                    </tr>-->
                </table>
                <p class="time" v-if="preventBanner!=0">距{{preventBanner}}期截止：<span>{{courtDown}}</span></p>
                <p class="time" v-else>距投注截止时间：<span>{{courtDown}}</span></p>
            </div>
        </div>
    </div>
</template>

<script src="../../../assets/js/ng/trend.js"></script>

<style src="../../../style/ng/threed.css" scoped></style>
<style src="../../../style/ng/trend.css" scoped></style>
