
//下级代理
<template>
  <div>
    <div id="container">
      <div>
        <header id="header">
          <a class="goBack" href="javascript:void(0)" @click="routerBack"></a>
          <div class="list">
            <span :class="[topStatus==0?'active':'']" @click="topStatus=0">{{$t('下级开户')}}</span>
            <span @click="topStatus=1" :class="[topStatus==1?'active':'']">{{$t('邀请码')}}</span>
          </div>
        </header>
        <div class="main">
          <template v-if="topStatus==0">
            <div class="top">
              <div class="list-item">
                <span>{{$t('开户类型')}}</span>
                <div class="user-label" @click="userType=1">
                  <span class="iconfont1">{{userType==1?'&#xe71e;':'&#xe71f;'}}</span>{{$t('代理类型')}}
                </div>
                <div class="user-label" @click="userType=2">
                  <span class="iconfont1">{{userType==2?'&#xe71e;':'&#xe71f;'}}</span>{{$t('玩家类型')}}
                </div>
                <!-- <input class="user-input" type="radio" value="1" @click="userType=1" id="radio1"><label class="user-label" for="radio1"><span class="iconfont">&#xe71f;</span><span class="iconfont checked hide">&#xe71e;</span>{{$t('代理类型')}}</label> -->
                <!-- <input class="user-input" type="radio" value="2" @click="userType=2" id="radio2"><label class="user-label" for="radio2"><span class="iconfont">&#xe71f;</span><span class="iconfont checked hide">&#xe71e;</span>{{$t('玩家类型')}}</label> -->
              </div>
              <div class="list-item">
                <span>{{$t('请为下级设置返点')}}，</span>
                <span class="red" @click="skipTo('agencyRebateList')">{{$t('点击查看返点赔率表')}}</span>
              </div>
            </div>
            <div class="content" :style="kh_con?'height:'+kh_con+'px;overflow:scroll;':''">
              <div v-if="item.nowRebate" class="list-item" v-for="(item,index) in nameRebatesList">
                <span class="fl">{{item.codeName}}</span>
                <input type="number" :placeholder="$t('自身返点')+item.nowRebate+', ' + $t('可设置返点') + '0.0-'+item.nowRebate" v-model="modelRebatesList[index]" @blur="checkRebatesBlur(index)">
              </div>
              <!-- <div class="list-item">
                <span class="fl">{{$t('时时彩')}}</span>
                <input type="text" placeholder="请输入些什么">
              </div>
              <div class="list-item">
                <span class="fl">快3</span>
                <input type="text" placeholder="请输入些什么">
              </div>
              <div class="list-item">
                <span class="fl">11选5</span>
                <input type="text" placeholder="请输入些什么">
              </div>
              <div class="list-item">
                <span class="fl">福彩3D</span>
                <input type="text" placeholder="请输入些什么">
              </div> -->
              <!-- <div class="list-item">
                <span class="fl">排列3</span>
                <input type="text" placeholder="请输入些什么">
              </div>
              <div class="list-item">
                <span class="fl">北京快乐8</span>
                <input type="text" placeholder="请输入些什么">
              </div> -->
              <!-- <div class="list-item">
                <span class="fl">pk10</span>
                <input type="text" placeholder="请输入些什么">
              </div>
              <div class="list-item">
                  <span class="fl">{{$t('六合彩')}}</span>
                  <input type="text" placeholder="请输入些什么">
                </div> -->
              <div class="btn">
                <span @click="creadtedCode">{{$t('生成邀请码')}}</span>
              </div>


            </div>
          </template>
          <template v-if="topStatus==1">
            <div class="top">
             <div class="list-item">
                <span>{{$t('开户类型')}}</span>
                <div class="user-label" @click="userType=1">
                  <span class="iconfont1">{{userType==1?'&#xe71e;':'&#xe71f;'}}</span>{{$t('代理类型')}}
                </div>
                <div class="user-label" @click="userType=2">
                  <span class="iconfont1">{{userType==2?'&#xe71e;':'&#xe71f;'}}</span>{{$t('玩家类型')}}
                </div>
              </div>
            </div>
            <div class="scollContent">
              <div class="title">
                <span>{{$t('邀请码')}}</span><span>{{$t('生成时间')}}</span><span>{{$t('状态')}}</span>
              </div>
              <div class="scollList">
                <div v-for="(item,index) in downList">
                  <span v-clipboard:copy="item.invitateCode" v-clipboard:success="onCopy" v-clipboard:error="onError"  style="color: rgb(51, 136, 255);">{{item.invitateCode}}</span><span @click="showPopover(index)">{{item.createDate}}</span><span @click="showPopover(index)">{{$t('注册') + "("+item.regNum+")"}}</span>
                  <div class="downUrl">
                    <span>{{$t('短连接')}}:</span><span v-clipboard:copy="item.shortUrl" v-clipboard:success="onCopy" v-clipboard:error="onError" style="color: rgb(51, 136, 255);">{{item.shortUrl}}</span><span>{{$t('注册链接')}}:</span><span v-clipboard:copy="item.invitateUrl" v-clipboard:success="onCopy" v-clipboard:error="onError" style="color: rgb(51, 136, 255);">{{item.invitateUrl}}</span>
                  </div>
                </div>
                <div class="loading" @click="loadList">{{loading.msg}}</div>
              </div>
            </div>
          </template>

        </div>


      </div>
      <div id="wrap">
        <div>{{$t('正在生成中')}}...</div>
      </div>
      <div class="popover">
        <div class="blackBg" @click="closePopover"></div>
        <div class="moreLayer">
          <ul>
            <li @click="showItemRebateList">{{$t('查看返点')}}</li>
            <li @click="delItemRebate">{{$t('删除邀请码')}}</li>
          </ul>
          <div class="cancel" @click="closePopover">{{$t('取消')}}</div>
        </div>
        <div class="itemRebateList">
          <div class="title">
            {{$t('返点详情')}}
            <span class="close" @click="closePopover">X</span>
          </div>
          <ul>
            <li v-for="item in itemRebateList">
              <span>{{item[0]}}</span><span>{{item[1]}}</span>
            </li>
          </ul>
        </div>
      </div>

    </div>
  </div>
</template>

<script src="../../assets/js/agency/downAccount.js"></script>
<!--<style src="../../../style/ng/ssc.css" scoped></style>-->
<style src="../../style/agency/downAccount.css" scoped></style>
<style lang="less" scoped>
#container{
  background: url(../../assets/images/base/black_bg.png)no-repeat ;
  background-size: 100% 100%;
  .main{
    margin-top: 44px;
    color: #fff;
  }

}
</style>
