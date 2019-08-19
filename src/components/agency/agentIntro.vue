// 代理说明
<template>
  <div>
    <div id="container">
      <div>
        <header id="header">
           <a class="goBack" href="javascript:void(0)" @click="routerBack"></a>
          <h1>{{$t('代理说明')}}</h1>
        </header>
        <div class="main">
          <div class="topTitle">
            <img class="img_adaptive" src="../../assets/images/agency/agentIntro.jpg" alt="">
          </div>
          <div class="msg">
            <div class="top">
              {{$t('当您能看到这个页面，说明您的账号即是玩家账号也是代理账号，即可以自己投注，也可以发展下级玩家，赚取返点佣金。')}}
            </div>
            <h3 class="red">
              <i class="iconfont1 money">&#xe640;</i>{{$t('如何赚取返点')}}?
            </h3>
            <div>
              <P>
                {{$t('可获得的返点，等于自身返点与下级返点的差值，如自身返点5，下级返点3，你将能获得下级投注金额2%的返点，如下级投注100元，你将会获得2元。')}}
              </P>
              <P>
                {{$t('点击下级开户')}}，{{$t('可查看自身返点')}}，{{$t('也可为下级设置返点')}}。
              </P>
            </div>
            <h3 class="red">
              <i class="iconfont1 user">&#xe617;</i>{{$t('如何为下级开户')}}?
            </h3>
            <div>
                <p>
                  {{$t('点击下级开户，先为您的下级设置返点，设置成功后会生成一条邀请码，将邀请码发送给您的下级注册，注册后他就是您的下级，点击会员管理，就能查看他注册的账号；')}}
                </p>
                <p>
                  {{$t('如果您为下级设置的是代理类型的账号，那么您的下级就能继续发展下级，如果设置的是玩家类型，那么您的下级只能投注，不能再发展下级，也看不到代理中心；')}}
                </p>
            </div>
            <h3 class="red">
              <i class="iconfont1 heart">&#xe60f;</i>{{$t('温馨提示')}}:
            </h3>
            <div>
              <p>
                {{$t('返点不同赔率也不同')}}，{{$t('点击返点赔率表')}}，{{$t('可查看返点赔率')}}；
              </p>
              <p>
                {{$t('返点越低')}}，{{$t('赔率就越低')}}，{{$t('建议为下级设置的返点不要过低')}}；
              </p>
              <p>
                {{$t('可在代理报表')}}、{{$t('投注明细')}}、{{$t('交易明细查看代理的发展情况')}}；
              </p>
              <p>
                {{$t('建议开设的下级也是代理类型')}}，{{$t('无论发展了几级')}}，{{$t('您都能获得返点')}}。
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {

    }
  },
  created(){},
  mounted(){
    $(".msg").css({
      height:$(window).height()-150-$('#header').height()
    })
  },
  methods:{
    routerBack: function () {
      if (localStorage.turnPathName && localStorage.turnPathName != "login") {
        // this.$router.push({ name: localStorage.turnPathName });
        this.$router.go(-1)
      } else {
        this.$router.push({
          name: "index"
        });
      }

    },
  },
  watch:{

  }
}
</script>

<style scoped>
.iconfont1 {
    font-family: "iconfont1" !important;
    font-size: 1.4rem;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
}
  .msg{
    width: 100%;
    background-color: #fff;
    overflow: hidden;
    color: #333;
    padding: 1em .6em;
    line-height: 1.8;
  }
  .msg h3 i{
    margin-right: .5rem;
  }
  .msg h3.red{
    color: red;
    font-size: 1.4rem;
    font-weight: normal;
  }
  .msg p {
    padding-left: 1.7em;
    position: relative;
  }
  .msg p:before {
    content: "";
    position: absolute;
    width: .3em;
    height: .3em;
    background: #b9bcc2;
    border-radius: 50%;
    border: 2px solid #fff;
    box-shadow: 0 0 0 1px #b9bcc2;
    left: .3em;
    top: .6em;
    z-index: 1;
    box-sizing: content-box;
  }
  .msg p:after {
    content: "";
    position: absolute;
    height: 86%;
    height: calc(100% - 1em);
    border-left: 1px dotted #b9bcc2;
    left: .54em;
    top: 1.4em;
  }

</style>
<style lang="less" scoped>
#container{
  height: 100%;

  // background: url(../../assets/images/base/black_bg.png) ;

  // background-size: cover;
  .main{
    margin-top: 2.67rem;
    .msg{
      // background-color: rgba(200,200,200,.6);
      background: url(../../assets/images/base/black_bg.png) no-repeat;
      background-size: 100% 100%;
      overflow: auto;
      color:#fff;
    }
  }

}
</style>


