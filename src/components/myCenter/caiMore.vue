<template>
  <div>
    <div id="container">
      <div id="caiMore">
        <header id="header" class="header">
          <a href="javascript:void(0)" class="goBack" @click="routerBack"></a>
          <h1>{{$t('投注详情')}}</h1>
          <a class="cancle" @click="cancleOrd($event)" v-if="nowStatus==0&&ordStatus!=2">{{$t('撤单')}}</a>
          <a class="ref" @click="ref($event)" v-if="nowStatus==0">刷新
            <!--<img style="vertical-align: middle;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAACDUlEQVRIS93VTaiVVRTG8d+jA0GlQROVBglKN8giHIRgCIaSYINmUpQQQbfCCBJEnMh1VGKoIIlcHNggoUngJCiI6ANzaB820EEUiAlCRIMoZcmW98Lp3vN2zoGLiGv4vnuv/95rPevZcRcid4Hh3oBU1RPYjufxNG7iN1zC5zib5Pr/VaT3JlW1HIfxJv7Bp/gOP2I9HsMWrMbeJKf7QEMhVfUgvsU6nMB7SX4flqSqtmEWP+HFJH/OX7cAUlXt2wU8gueSfDNKHFW1El/iRpJnx4HswVFsTPLDKMDc/6pqZbuMfUlODu77z02qahmu4lSSA+MCBkBv4yDWDpZtGOSt1ockf08Cqaoj+LgTyDtJzsztX7Q5qap3OyX+2kSQZNeiQ1rCqvoQLzfhJNk0FFJVF/EzXkhSk5SrgyzBR22GkjzeBzmPdoLZJK9NChlrGKvqLJ7EQ/ggyf7FAM1X1+5uRnbilSTTk0CqagXeaDmS3Oor1wP4BYeSHJsE0PXkOF7CqiTNSO/EMFt5HU2OU31+1eNhT3UGOpNkpnfiBya3Oe6q5rJJ/hp1o6rainOdQ7c9/44DaWVrUpzCdJIvek6/Bs1+Wh++xzNJ/hhpkIMLqupVvI9r+Kqz8yvYgM3YgaWdWA4kae/OghhpK1XVytYsoln4o3i4S/w1PsFnSdpb0hsjIaP6Mc7/+wdyGz0XqxpYz83mAAAAAElFTkSuQmCC"/>-->
          </a>
          <div :class="datas.isCal==1&&datas.status==1?'bsetMsg suc':'bsetMsg fal'">
            <div class="bet clearfix">
              <img :src="datas.gameUrl?'static/'+datas.gameUrl:''"/>
              
              <div>
                <p>第{{datas.actionIssue}}期</p>
                <p>盈亏 <span class="coin">{{!datas.openNo?'--':parseFloat(datas.bonus)>parseFloat(datas.amount)?"+¥"+(parseFloat(datas.bonus)-parseFloat(datas.amount)).toFixed(2):"-¥"+(parseFloat(datas.amount)-parseFloat(datas.bonus)).toFixed(2)}}</span></p>
              </div>
              <div :class="datas.isCal==1&&datas.status==1?'bicon suc':'bicon fal'">
                <span v-if="!(datas.isCal==1&&datas.status==1)">
                  {{!datas.openNo?'未开奖':datas.isCal==0?datas.status==2?'已撤单':'未中奖':datas.status==2?'已撤单':'未中奖'}}
                </span>
              </div>
            </div>
            <div class="num">
              <span class="gray">{{$t('开奖号码')}}</span>
              <div style="color: #37a29f;" v-if="datas.openNo">
                        <!-- <template v-if="item.code=='k3'">
                          <i :key="index" v-for='(it,index) in datas.openNo.split(",")'
                            :class="it?('dice '+'dice-'+it):''"></i>
                        </template>
                        <template v-else-if="item.code=='PCDD'">
                          <span :key="index" v-for='(it,index) in datas.openNo.split(",")'
                                :class="[it=='+'||it=='='?'':'ball',bj28CL[it]]" v-cloak>{{it}}</span>
                        </template>
                        <template v-else-if="item.code=='hk6'">
                          <span :key="index" v-for='(it,index) in datas.openNo.replace("+",",").split(",")'
                                :class="[it=='='?'':'ball',lhcCL[it-1]]" v-cloak>{{it}}</span>
                        </template>
                        <template v-else-if="item.gameID==8||item.gameID==15||item.gameID==34||item.gameID==39">
                          <span :key="index" v-for='(it,index) in datas.openNo.split(",")'
                                :class="it?('square '+'square-'+it):''" v-cloak></span>
                        </template>
                        <template v-else> -->
                          <!--<span v-if="item.gameID == 9" :key="index" v-for='(it,index) in item.arr'  :class="[it=='+'||it=='='?'':'ball',bj28CL[it]]"  v-cloak>{{it}}</span>-->
                          <!--<span v-else-if="item.gameID==31" :key="index" v-for='(it,index) in item.arr'  :class="[it=='='?'':'ball',lhcCL[it-1]]"  v-cloak>{{it}}</span>-->
                          <!--<span v-else :key="index" v-for='(it,index) in item.arr' :class="it=='='?'':'ball'"  v-cloak>{{it}}</span>-->
                          <span :key="index" v-for='(it,index) in datas.openNoList' :class="it=='='||it=='+'||datas.openNo.lenght>10?'':'ball'" v-cloak>{{it}}</span>
                        <!-- </template> -->
                <!-- {{datas.openNo}} -->
              </div>
              <div style="color: #37a29f;" v-else>
                  {{$t('未开奖')}}
              </div>
            </div>
            
          </div>
        </header>
        <div class="content" id="content">
          <div class="bsetInfo">
            <ul>
              <li>
                <p class="gray">{{$t('投注号码')}}</p>
                <p class="num">{{datas.actionData}}</p>
              </li>
              <li class="mui-row">
                <div class="mui-col-xs-6">
                  <p class="gray">{{$t('玩法')}}</p>
                  <p>{{"["+datas.groupName+"-"+datas.playedName+"]"}}</p>
                </div>
                <div class="mui-col-xs-6">
                  <p class="gray">{{$t('赔率')}}</p>
                  <p>{{datas.betOdds}}倍</p>
                </div>
              </li>
              <li>
                <p class="gray">{{$t('投注金额')}}</p>
                <p>{{datas.amount}}{{coinUnit}}</p>
              </li>
              <li>
                <p class="gray">{{$t('投注时间')}}</p>
                <p>{{datas.actionTime}}</p>
                <p>{{$t('注单单号')}}<span id="aaa">{{datas.orderId}}</span>
                  <span type="button"
                        v-clipboard:copy="datas.orderId"
                        v-clipboard:success="onCopy"
                        v-clipboard:error="onError" class="copy">{{$t('复制')}}</span></p>
              </li>
            </ul>
          </div>
        </div>
        <!-- <article id="article" v-cloak>
          <div id="backg"></div>
          <section :class="datas.status==0?'lose':datas.status==1?'win':''" id="section" v-cloak>
            <div id="caiTitle">
              <ul>
                <li><img :src="datas.gameUrl?'static/'+datas.gameUrl:''"/></li>
                <li>
                  <h3>{{datas.gameName}}</h3></li>
                <li style="color: gray;font-size: 1rem;">第{{datas.actionIssue}}期</li>
                <li style="font-size: 1.2rem;" v-if="datas.isCal==0">
                  <span v-if="datas.status==2" style="color: gray;">{{$t('该订单已撤销')}}</span>
                  <span v-else style="color: red;">{{$t('未开奖')}}...</span>
                </li>
                <li style="color: gray;font-size: 1.3rem;" v-else-if="datas.isCal==1">
                  {{datas.status==0?"没有中奖再接再厉":(datas.status==2?"该订单已撤销":"")}}
                </li>
              </ul>
            </div>
            <div id="caiMes">
              <ul style="border-bottom: 1px #E3E3E3 solid;padding-bottom:.8rem;margin-bottom: .8rem;">
                <li>{{$t('注单单号')}}<span id="aaa">{{datas.orderId}}</span>
                  <span type="button"
                        v-clipboard:copy="datas.orderId"
                        v-clipboard:success="onCopy"
                        v-clipboard:error="onError" class="copy">{{$t('复制')}}</span>
                </li>
                <li>{{$t('玩法名称')}}<span>{{datas.groupName}}<em v-if="datas.playedName">-{{datas.playedName}}</em></span></li>
                <li>{{$t('出票状态')}}<span>{{datas.ticketStatus==1?'出票成功':(datas.ticketStatus==0?'出票中':'')}}</span></li>
                <li>{{$t('投注金额')}}<span>{{datas.amount}}{{coinUnit}}</span></li>
                <li v-if="datas.status==1">{{$t('中奖金额')}}<span style="color: red;">{{datas.bonus}}</span>{{coinUnit}}</li>
                <li v-if='datas.isCal==0&&datas.expect_open'>{{$t('预计开奖时间')}}<span>{{datas.expect_open}}</span></li>
              </ul>
              <p>{{$t('投注详情')}}</p>
              <ul>
                <li><em style="float: left;">{{$t('投注号码')}}</em><span
                  style="color: #333;width:5rem;word-wrap: break-word; word-break: normal; ">{{datas.actionData}}</span>
                </li>
                <li v-if="datas.isCal==1">{{$t('开奖号码')}}<span>{{datas.openNo}}</span></li>
                <li>{{$t('投注时间')}}<span>{{datas.actionTime}}</span></li>
                <li>{{$t('投注赔率')}}<span>{{datas.betOdds}}倍</span></li>
              </ul>
            </div>
          </section>
          <p class="footer">
            <a href="javascript:void(0)" @click='togoCai()'>{{$t('去购彩')}}</a>
          </p>
        </article> -->
      </div>
    </div>
  </div>
</template>

<script src="../../assets/js/myCenter/caiMore.js"></script>

<style scoped>
  body {
    background: white;
  }

  [v-cloak] {
    display: none;
  }

  /*底部按钮样式*/
  .footer {
    position: fixed;
    bottom: 0;
    padding: .5rem 0;
    box-sizing: border-box;
    background-color: black;
    width: 100%;
    z-index: 9999;
  }

  .footer > a {
    /* background-color: #d91d37; */
    display: block;
    width: 80%;
    margin: 0 auto;
    color: white;
    text-align: center;
    border-radius: 4px;
    padding: .9rem 0;
    box-sizing: border-box;
    font-size: 1.3rem;
  }

  /*彩票投注详情*/
  #caiMore .ref {
    color: white;
    position: absolute;
    right: .5rem;
    top: .6rem;
    border:1px solid #fff;
    padding: .05rem .5rem;
    border-radius: .3rem;
    font-size: .8rem;
  }

  #caiMore .cancle {
    color: white;
    position: absolute;
    right: 4rem;
    top: .6rem;
    border:1px solid #fff;
    padding: .05rem .5rem;
    border-radius: .3rem;
    font-size: .8rem;
  }

  #caiMore article #backg {
    height: 8.8rem;
    width: 100%;
    /* background-color: #ba142b; */
    border-radius: 40%;
    position: absolute;
    left: 0%;
    top: 0.1rem;
    margin-left: -3rem;
    padding: 0;
    margin: 0;
  }

  #caiMore article section {
    z-index: 9;
    position: absolute;
    top: 4.5rem;
    width: 100%;
    line-height: 2rem;
  }

  #caiMore article #caiTitle {
    text-align: center;
  }

  #caiMore article #caiTitle img {
    width: 4rem;
    height: 4rem;
    margin-bottom: 1rem;
  }

  #caiMore article #caiMes {
    margin-top: 1rem;
    margin-left: 2rem;
    line-height: 1.8rem;
    font-size: 1.1rem;
  }

  #caiMore article #caiMes p {
    font-size: 1.2rem;
    color: #999;
  }

  #caiMore article #caiMes span {
    margin-left: 1rem;
  }

  #caiMore #btn {
    /* background: #ba142b; */
    position: absolute;
    bottom: 0;
    border: 0;
    width: 100%;
    text-align: center;
    height: 3rem;
    color: white;
  }

  .win {
    background: url(../../assets/images/winPrize.png) no-repeat 107% 70%;
    background-size: 8rem;
  }

  .lose {
    background: url(../../assets/images/losePrize.png) no-repeat 107% 70%;
    background-size: 8rem;
  }

  li .copy {
    border: 1px dotted #ddd;
    font-size: .8rem;
    padding: .1rem .3rem;
    background: #ba142b;
    color: #fff;
    box-shadow: 1px 1px 1px #8d8b8b;
    margin-right: 0;
    cursor: pointer;
  }

</style>
<style lang="less" scoped>
.custome-ba142b #container{
  background: initial;
}

  #container{
    #header{
      background: url(../../assets/images/base/detail/bet_det_bgT_01.png) no-repeat;
      background-size: cover;
      position: relative;
      z-index: 700;
      .goBack{
        top: 0;
        height: 2.66rem;
      }
      .bsetMsg{
        width: 90%;
          height: 10rem;
          position: absolute;
          top: 35%;
          left: 5%;
        &.fal{
          background: url(../../assets/images/base/bet_det_fal_03.png) no-repeat;
          background-size: contain;
        }
         &.wait{
          background: url(../../assets/images/base/bet_det_wait_03.jpg) no-repeat;
          background-size: contain;
        }
        &.suc{
          background: url(../../assets/images/base/bet_det_suc_03.jpg) no-repeat;
          background-size: contain;
        }
        .bet{
          padding: .5rem;
          img{
            width: 3rem;
            height: 3rem;
            float: left;
            vertical-align: bottom;
          }
          >div{
            float: left;
            margin-left: 1rem;
            // margin-top: .25rem;
            color: #fff;
            line-height: 1.5rem;
            .coin{
              color: #f4a151;
            }
            &.bicon{
              position: absolute;
              right: 1%;
              top: 0;
              width: 4rem;
              height: 2rem;
              margin: 0;
              &.suc{
                  background: url(../../assets/images/base/btn_suc_03.png) no-repeat;
                    background-size: contain;
              }
              &.fal{
                background: url(../../assets/images/base/btn_fal_06.png) no-repeat;
                background-size: contain;
                span{
                  position: absolute;
                  right: .2rem;
                  top: .15rem;
                  font-size: 0.7rem;
                  color: #707070;
                  line-height: 1rem;
                }
              }
            }
          }
        }
        .num{
          position: absolute;
          left: 5%;
          .gray{
            color: #b7baea;
            float: left;
            margin-right: .5rem;
            font-size: .8rem
          }
          >div{
            float: left;
            .ball{
              background: url(../../assets/images/base/ssc_ball.png);
              display: inline-block;
              // width: 30px;
              // height: 30px;
              
              // line-height: 30px;
              // font-size: 16px;
              width: 2rem;
              height: 2rem;
              
              line-height: 2rem;
              font-size: 1.2rem;
              text-align: center;
              background-size: contain;
              color: #1a1a1a;
              font-weight: 700;
            }
          }
        }
        
          
      }
    }
    .content{
      background: url(../../assets/images/base/detail/bet_det_bgB_02.png) no-repeat;
      background-size: cover;
      position: absolute;
      width: 100%;
      z-index: 800;
      .bsetInfo{
        position: absolute;
        top: 15%;
        // background: #fff;
        width: 92%;
        left: 3%;
        box-sizing: border-box;
        padding: 1rem;
        line-height: 2rem;
        background: #353836;
        color: #fff;
        li{
          border-bottom: 1px dotted #ddd;
          .num{
            color: #37a29f;
          }
        }
        .gray{
          color: #a1a1a1;
        }
      }
    }
  }
</style>
