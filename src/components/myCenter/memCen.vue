<template>
  <div>
    <div id="container">
      <div class="topContent">
        <header id="header" class="mui-bar mui-bar-nav">
          <a class="goBack" href="javascript:void(0)" @click="routerBack"></a>
          <!-- <p>个人中心</p> -->
          <p>{{ $t("personCenter") }}</p>
        </header>
        <div class="userInfo">
          <div class="mui-row">
            <div class="mui-col-xs-2 hp">
              <div class="ball"></div>
              <img src alt>
              <span
                style="position:  absolute;top: 1.75rem;left: .25rem;font-size: 5rem;background: initial;"
                class="iconcon iconcon-3 bg-theme-color"
              >
                <i style="font-size: 4.5rem;" class="icon iconfont icon-morentouxiang"></i>
              </span>
            </div>
            <div class="mui-col-xs-10 um" v-cloak>
              <div class="user">{{userName}}</div>
              <div class="coinInfo">
                <span>{{ $t("accountBalance") }}：</span>
                {{coin}} {{coinUnit}}
                <!-- <span>今日盈亏：</span>0 -->
              </div>
            </div>
          </div>
          <div class="de_wi">
            <div class="mui-row">
              <div class="mui-col-xs-6">
                <router-link :to="{ name: 'depositFile'}">
                  <img src="../../assets/images/base/cen/de_06.png" alt>
                  <p>{{ $t("recharge") }}</p>
                </router-link>
              </div>
              <div class="mui-col-xs-6" @click="clickEnchash">
                <img src="../../assets/images/base/cen/de_03.png" alt>
                <p>{{ $t("withDrawal") }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="botContent">
        <div class="cenArea">
          <ul>
            <li @click="togoperfectUserInfo">
              <i class="mui-icon mui-icon-person"></i>
              <span>{{ $t("personalInformation") }}</span>
              <i class="mui-icon mui-icon-forward"></i>
            </li>
            <li @click="turnUrl('bettingRecord',{ status: 0 })">
              <!-- <router-link :to="{ name: 'bettingRecord', params:{ status: 0 }}"> -->
              <span class="mui-icon iconcon iconcon-5">
                <i class="icon iconfont1">&#xe755;</i>
              </span>{{ $t("bettingRecord") }}
              <i class="mui-icon mui-icon-forward"></i>
              <!-- </router-link> -->
            </li>
            <li @click="turnUrl('footFundDetails',{ status: 0 })">
              <!-- <router-link :to="{ name: 'bettingRecord', params:{ status: 0 }}"> -->
              <span class="mui-icon iconcon iconcon-5">
                <i class="icon iconfont1">&#xe755;</i>
              </span>{{ $t("accountChangeRecord") }}
              <i class="mui-icon mui-icon-forward"></i>
              <!-- </router-link> -->
            </li>
            <li @click="turnUrl('changePwd','')">
              <!-- <router-link :to="{ name: 'changePwd'}"> -->
              <span class="mui-icon iconcon iconcon-6">
                <i style="font-size:1.4rem" class="icon iconfont icon-mima"></i>
              </span>{{ $t("changePassword") }}
              <i class="mui-icon mui-icon-forward"></i>
              <!-- </router-link> -->
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "menCen",
  data() {
    return {
      coin: "0.00",
      userName: "",
      coinUnit: '元'
    };
  },
  created() {
    this.changeCoinPwd();
    if(localStorage.getItem('config')){
      this.coinUnit = JSON.parse(localStorage.getItem('config')).coinUnit;
    }
  },
  mounted() {
    this.initData();
    this.getCoin();
    console.log(this.$i18n.locale, '---------', this.$i18n.t('message.personCenter'));
  },
  methods: {
    //路由跳转返回
    routerBack: function() {
      this.$router.push({
        name: "index"
      });
    },
    turnUrl(name, param) {
      if (param) {
        this.$router.push({
          name: name,
          params: param
        });
      } else {
        this.$router.push({
          name: name
        });
      }
    },
    initData() {
      var h = $(window).height();
      var w = $(window).width(),
        th = (w / 750) * 425;
      $("#container .topContent").css({
        height: th + "px"
      });
      $("#container .botContent").css({
        height: h - th * 0.83 + "px",
        top: th * 0.83
      });
      this.userName = localStorage.userName;
    },
    getCoin() {
      var _this = this,
        getUserInfo = {
          type: "post",
          url: "/authApi/getCoin",
          data: {
            username: localStorage.getItem("userName"),
            isWhite: true
          },
          success: function success(data) {
            if (data.code == 200) {
              //   localStorage.indexCoinMsg = JSON.stringify(data.body);
              var coin = data.body.coin,
                fCoin = data.body.FCION,
                agentCoin = data.body.AGENT_COIN;

              _this.unfinishCoin = data.body.unfinish_coin;
              _this.winLoseCoin = data.body.today_winAndLose_coin;
              if (coin == "") {
                _this.coin = "0.00";
              } else {
                _this.coin = parseFloat(coin).toFixed(2);
              }
              if (fCoin == "") {
                _this.fCoin = "0.00";
              } else {
                _this.fCoin = parseFloat(fCoin).toFixed(2);
              }
              //返点金额
              if (agentCoin == "") {
                _this.agentCoin = "0.00";
              } else {
                _this.agentCoin = parseFloat(agentCoin).toFixed(2);
              }
              _this.usable_coin = _this.coin;
            }
          }
        };
      this.base.callAuthApi(getUserInfo);
    },
    //验证是否已设置资金密码/绑定银行卡
    changeCoinPwd: function() {
      var _this = this,
        uname = localStorage.getItem("userName"),
        obj = {
          type: "post",
          data: {
            username: uname
          },
          dataType: "json",
          url: "/authApi/privacy/getPrivacyStatus",
          success: function(data) {
            if (data.code == 200) {
              localStorage.userType_ = data.body.userType;
              _this.isTrue = data.body;
              _this.userType = data.body.userType;
              if (localStorage.userType != 2) {
                if (_this.isTrue.perfectMarker == 1) {
                  $("#isUserInfo").hide();
                } else {
                  $("#isUserInfo").show();
                }
                if (localStorage.config) {
                  _this.config = JSON.parse(localStorage.getItem("config"));
                  _this.coinUnit = _this.config.coinUnit;
                  //
                }
              }
              localStorage.bankPrivacyStatus = _this.isTrue.bankPrivacyStatus;
              localStorage.coinPrivacyStatus = _this.isTrue.coinPrivacyStatus;
              localStorage.setItem("isTrue", JSON.stringify(_this.isTrue));
            }
          },
          error: function(msg) {
            //console.log(msg);
          }
        };
      this.base.callAuthApi(obj);
    },
    //点击取款
    clickEnchash: function() {
      var _this = this;
      if (_this.isTrue.perfectMarker == 1) {
        //完善
        if (_this.isTrue.bankPrivacyStatus) {
          //是否绑定银行卡
          if (_this.isTrue.coinPrivacyStatus) {
            //资金密码
            _this.skip_newUrl(0, "myCenter/enchashment", "enchashment");
          } else {
            if (localStorage.app_flag == undefined) {
              localStorage.urlid = 1;
              _this.skip_newUrl(0, "myCenter/moneyPwd", "moneyPwd");
            } else {
              _this.skip_newUrl(1, "myCenter/moneyPwd", "moneyPwd");
            }
          }
        } else {
          _this.skip_newUrl(0, "myCenter/bindCard", "bindCard");
        }
      } else {
        mui.confirm("请先完善个人信息", " ", ["取消", "确定"], function(e) {
          if (e.index == 1) {
            _this.skip_newUrl(0, "myCenter/userPerfectInfo", "userPerfectInfo");
          }
        });
      }
    },
    //点击个人信息
    togoperfectUserInfo: function() {
      this.skip_newUrl(0, "myCenter/userPerfectInfo", "perfectUserInfo");
    },
    //mui跳转方法
    skip_newUrl: function(index, url, nameId, parma) {
      if (parma) {
        this.$router.push({ path: url, params: { type: parma } });
      } else {
        this.$router.push({ path: url });
      }
    }
  },
  watch:{
    $route(to, from) {
      if(to.name=="memCen"){

        this.getCoin();
        this.userName = localStorage.userName;
      }
    }
  }
};
</script>


<style lang="less" scoped>
@font-face {
  font-family: "iconfont1";
  src: url("../../style/fonts/iconfont.woff") format("woff");
}

.iconfont1 {
  font-family: "iconfont1" !important;
  font-size: 18px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
#container {
  .topContent {
    background: url(../../assets\images\base/black_bg.png) no-repeat;
    background-size: 100% 100%;
    width: 100%;
    position: relative;
    z-index: 100;
    #header {
      background: none;
      box-shadow: none;
      height: 44px;
      position: relative;
      p {
        line-height: 44px;
        height: 44px;
        color: #fff;
        text-align: center;
        width: 50%;
        margin-left: 25%;
        font-size: 1.2rem;
        font-weight: 700;
      }
      .goBack {
        top: 25%;
        height: 50%;
      }
    }
    .userInfo {
      position: absolute;
      bottom: 10%;
      left: 10%;
      width: 100%;
      .hp {
        // width: 20%;
        .ball {
          display: inline-block;
          width: 5rem;
          height: 5rem;
          border-radius: 50%;
          background: #a4d1cd;
        }
      }
      .um {
        padding-left: 2rem;
        position: relative;
        top: 0.5rem;
        .user {
          font-size: 1.5rem;
          line-height: 2rem;
          color: #fff;
          margin-bottom: 0.5rem;
        }
        .coinInfo {
          color: #fff;
          span {
            color: #a1a1a1;
          }
        }
      }
      .de_wi {
        position: absolute;
        bottom: -50%;
        color: #000;
        width: 80%;
        // background: #b4b4b7;
        background: rgba(255, 255, 255, 0.8);
        height: 4.5rem;
        border-radius: 0.5rem;
        text-align: center;
        padding: 0.5rem;
        top: 6rem;

        img {
          width: 20%;
          height: 100%;
          vertical-align: bottom;
          margin-top: 0.5rem;
          margin-bottom: 0.2rem;
        }
      }
    }
  }
  .botContent {
    background: url(../../assets\images\base/black_bg.png) no-repeat;
    background-size: 100% 100%;
    position: absolute;
    width: 100%;
    margin: 0 auto;
    margin-top: 1rem;
    .cenArea {
      position: relative;
      top: 20%;
      left: 5%;
      width: 90%;
      border-radius: 0.5rem;
      background: rgba(38, 42, 56, 0.6);
      color: #fff;
      li {
        line-height: 3rem;
        height: 3rem;
        padding-left: 2rem;
        border-bottom: 1px solid #8a8a8a;
        a {
          color: #fff;
        }
        .mui-icon:first-child {
          float: left;
          line-height: 3rem;
          margin-right: 0.5rem;
        }
        .iconcon {
          /*width: 1.8rem;*/
         width:24px;
          height: 1.8rem;
          border-radius: 50%;
          display: inline-block;
          color: #fff;
          text-align: center;
        }
      }
      li:last-child {
        border-bottom-width: 0;
      }
      .mui-icon-forward {
        font-size: 1.2rem;
        float: right;
        margin-right: 2rem;
        line-height: 3rem;
      }
    }
  }
}
</style>


