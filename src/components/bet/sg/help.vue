<template>
<div>
    <div id="container">
  <div>
    <div v-if="signNum==1" class="docBody clearfix">
        <header id="header">
            <h1>{{$t('玩法说明')}}</h1>
            <!-- <a class="goBack mui-action-back">返回</a> -->
            <a class="goBack" href="javascript:void(0)" @click="routerBack"></a>
        </header>
        <ul class="helpList">
            <li>
              <h1>一、{{$t('竞猜赛果为每场比赛在全场')}}（{{$t('含加时赛')}}）{{$t('的比赛结果')}}</h1>
            </li>
            <li>
                <h1>二、{{$t('截止时间')}}：</h1>
                <p>{{$t('赛前或官方截止前')}}2分58秒（{{$t('全网最晚')}}）</p>
            </li>
            <li>
                <h1>三、{{$t('玩法规则')}}：</h1>
                <dl>
                    <dt>1. 选场次</dt>
                    <dd>
                        <p>{{$t('单关场次')}}：{{$t('选择每场比赛结果')}}，{{$t('猜中即可中奖')}}</p>
                        <p>{{$t('过关场次')}}：{{$t('需最低猜中过关场次数')}}，{{$t('才可中奖')}}，{{$t('如选择')}}2串1，{{$t('则最低猜中')}}2{{$t('场可以中奖')}}</p>
                    </dd>
                </dl>
                <dl>
                    <dt>2. {{$t('选过关方式')}}</dt>
                    <dd>
                        <p>{{$t('过关方式代表了您会将已选的几场比赛组合成多少注')}}。</p>
                        <p>
                            {{$t('如选择了')}}3{{$t('场比赛')}}，{{$t('选择过关方式为单关')}}，则3{{$t('场比赛中每一场组成')}}1注，共产生3注。{{$t('如选择了')}}3{{$t('场比赛')}}，{{$t('选择过关方式为')}}2串1（2代表3场中任意2场比赛；1代表1注），则3{{$t('场比赛')}}会任意2场自由组成1注，共产生3注。</p>
                    </dd>
                </dl>
            </li>
            <li>
                <h1>四、{{$t('奖项设置')}}：</h1>
                <p>{{$t('竞彩篮球是固定奖金')}}，{{$t('竞指数直接决定您投注本结果将获得的奖金')}}。如买了1注2元的3串1，{{$t('下注时三个结果的指数分别为')}}1.8、3.2、4.8，那么如果三个结果全部正确，您将获得的奖金为2x1.8x3.2x4.8=55.30元，以此类推。</p>
            </li>
        </ul>
    </div>
    <div v-if="signNum==2" class="docBody clearfix">
      <header id="header">
          <h1>{{$t('玩法说明')}}</h1>
          <!-- <a class="goBack mui-action-back">返回</a> -->
          <a class="goBack" href="javascript:void(0)" @click="routerBack"></a>
      </header>
      <ul class="helpList">
          <li>
            <h1>一、{{$t('竞猜赛果为每场比赛在全场')}}（{{$t('含加时赛')}}）{{$t('的比赛结果')}}</h1>
          </li>
          <li>
              <h1>二、{{$t('截止时间')}}：</h1>
              <p>{{$t('赛前或官方截止前')}}2分58秒（{{$t('全网最晚')}}）</p>
          </li>
          <li>
              <h1>三、{{$t('玩法规则')}}：</h1>
              <dl>
                  <dt>1. 选场次</dt>
                  <dd>
                      <p>{{$t('单关场次')}}：{{$t('选择每场比赛结果')}}，{{$t('猜中即可中奖')}}</p>
                      <p>{{$t('过关场次')}}：{{$t('需最低猜中过关场次数')}}，{{$t('才可中奖')}}，{{$t('如选择')}}2串1，{{$t('则最低猜中')}}2{{$t('场可以中奖')}}</p>
                  </dd>
              </dl>
              <dl>
                  <dt>2. {{$t('选过关方式')}}</dt>
                  <dd>
                      <p>{{$t('过关方式代表了您会将已选的几场比赛组合成多少注')}}。</p>
                      <p>
                          {{$t('如选择了')}}3{{$t('场比赛')}}，{{$t('选择过关方式为单关')}}，则3{{$t('场比赛中每一场组成')}}1注，共产生3注。{{$t('如选择了')}}3{{$t('场比赛')}}，{{$t('选择过关方式为')}}2串1（2代表3场中任意2场比赛；1代表1注），则3{{$t('场比赛')}}会任意2场自由组成1注，共产生3注。</p>
                  </dd>
              </dl>
          </li>
          <li>
              <h1>四、{{$t('奖项设置')}}：</h1>
              <p>{{$t('竞彩篮球是固定奖金')}}，{{$t('竞指数直接决定您投注本结果将获得的奖金')}}。如买了1注2元的3串1，{{$t('下注时三个结果的指数分别为')}}1.8、3.2、4.8，那么如果三个结果全部正确，您将获得的奖金为2x1.8x3.2x4.8=55.30元，以此类推。</p>
          </li>
      </ul>
    </div>
    <div v-if="signNum==3" id="main">
        <!--顶部-->
        <header id="header">
          <h1>{{$t('玩法说明')}}</h1>
          <!-- <a class="goBack mui-action-back">返回</a> -->
          <a class="goBack" href="javascript:void(0)" @click="routerBack"></a>
        </header>
        <!--说明介绍-->
        <div class="inner">
          <ul class="inner-list">
            <li>
              <h1>一、{{$t('投注方式')}}:</h1>
              <h2>竟猜14{{$t('场比赛')}}90{{$t('分钟内')}}({{$t('含伤停补时')}}){{$t('中的胜平负结果')}},3{{$t('为胜')}},1为平,0{{$t('为负')}}</h2>
              <p>{{$t('单式投注')}}:对14{{$t('场比赛各选')}}1{{$t('含种比赛结果')}}</p>
              <p>{{$t('复式投注')}}:对14{{$t('场比赛中某一场或几场比赛选择')}}2{{$t('种或以上结果')}}</p>
            </li>
            <li>
              <h1>二、{{$t('玩法设奖')}}：</h1>
              <p>{{$t('一等奖')}}:{{$t('当期高等奖奖金的')}}70%{{$t('当与奖池奖金之和除以中奖注数')}}</p>
              <p>{{$t('一等奖')}}:{{$t('当期高等奖奖金的')}}30%{{$t('除以中奖注数')}};{{$t('单注奖金封顶')}}500万元</p>
            </li>
            <li>
              <h1>三、{{$t('中奖条件')}}：</h1>
              <p>{{$t('一等奖')}}:14{{$t('场比赛胜平负结果全中')}}</p>
              <p>{{$t('一等奖')}}:{{$t('中任意')}}13{{$t('场比赛胜平负结果')}}</p>
            </li>
          </ul>
        </div>
    </div>
    <div v-if="signNum==4" id="main">
			<!--顶部-->
			<header id="header">
				<h1>{{$t('玩法说明')}}</h1>
				<!-- <a class="goBack mui-action-back">返回</a> -->
        <a class="goBack" href="javascript:void(0)" @click="routerBack"></a>
			</header>
			<!--说明介绍-->
			<div class="inner">
				<ul class="inner-list">
					<li>
						<h1>一、{{$t('投注方式')}}:</h1>
						<h2>竟猜14{{$t('场比赛中任意')}}9{{$t('场比赛')}}90{{$t('分钟内')}}({{$t('含伤停补时')}}){{$t('中的胜平负结果')}},3{{$t('为胜')}},1为平,0{{$t('为负')}}</h2>
						<p>{{$t('单式投注')}}:对9{{$t('场比赛各选')}}1{{$t('含种比赛结果')}}</p>
						<p>{{$t('复式投注')}}:对9{{$t('场比赛中某一场或几场比赛选择')}}2{{$t('种或以上结果')}},{{$t('或者选择')}}9{{$t('场以上比赛')}}</p>
					</li>
					<li>
						<h1>二、{{$t('玩法设奖')}}：</h1>
						<p>{{$t('一等奖')}}：{{$t('当期奖金总额的')}}100%{{$t('当与奖池奖金之和除以中奖注数')}};{{$t('单注奖金封顶')}}500万元</p>
					</li>
					<li>
						<h1>三、{{$t('中奖条件')}}：</h1>
						<p>{{$t('一等奖')}}：9{{$t('场比赛胜平负结果全中')}}</p>
					</li>
				</ul>
			</div>
		</div>

  <div v-if="signNum==5" class="docBody clearfix">
			<header id="header">
				<h1>{{$t('玩法说明')}}</h1>
				<a class="goBack" href="javascript:void(0)" @click="routerBack"></a>
			</header>
			<ul class="helpList">
					<li>
						<h1>一、{{$t('竞猜赛果为每场比赛在全场')}}90分钟（{{$t('含伤停补时')}}）{{$t('的比赛结果')}}</h1>
					</li>
					<li>
						<h1>二、{{$t('截止时间')}}：</h1>
						<p>{{$t('赛前或官方截止前')}}10分钟</p>
					</li>
					<li>
						<h1>三、{{$t('玩法规则')}}：</h1>
						<dl>
							<dt>1. 选场次</dt>
							<dd>
								<p>{{$t('选择任意一场即可提交投注')}}；</p>
							</dd>
						</dl>
						<dl>
							<dt>2. {{$t('选过关方式')}}</dt>
							<dd>
								<p>{{$t('过关方式代表了您会将已选的几场比赛组合成多少注')}}，{{$t('如选择了')}}3{{$t('场比赛')}}，{{$t('选择过关方式为')}}2串1（2代表3场中任意2场比赛；1代表1注），则3{{$t('场比赛')}}会任意2场自由组成1注，共产生3注</p>
							</dd>
						</dl>
					</li>
					<li>
						<h1>四、{{$t('奖项设置')}}：</h1>
						<p>{{$t('足球单场竞猜开奖SP值型彩票')}}，{{$t('足球每场比赛根据投注情况计算出一个开奖')}}SP值（SP）。</p>
						<p>开奖SP值（SP）＝{{$t('每场总投注金额')}}/{{$t('中奖彩票的总投金额')}}</p>
						<p>{{$t('单场投注奖金')}}＝2元×{{$t('单场开奖')}}SP值×65％</p>
						<p>{{$t('过关投注奖金')}}＝2元×{{$t('所选场次的单场开奖')}}SP{{$t('值连乘')}}×65％。{{$t('必须全部正确竞猜出每个单场比赛为中奖')}}，{{$t('任意一场竞猜错误不中奖')}}。</p>
					</li>
				</ul>
</div>


  </div>
  </div>
  </div>
</template>

<script>
export default{
  name:"sgHelp",
  data(){
    return{
      signNum:1,
      toPath:"",
    }
  },
  created:function(){
    if(localStorage.singTo){
      this.changRoute(localStorage.singTo);
    }

  },
  methods:{
    changRoute:function(pathName){
      var _this=this,index=1;
      switch(pathName){
        case 'qfhh':
          index=1;
          break;
        case 'qfdg':
          index=1;
          break;
        case 'qbhh':
          index=2;
          break;
        case 'qbdg':
          index=2;
          break;
        case 'sfc':
          index=3;
          break;
        case 'rxnine':
          index=4;
          break;
        case 'fbsg':
          index=5;
          break;
      }
      _this.signNum=index;
    },
    goback_click:function(){
      var _this=this;
      this.$router.push({ path: _this.toPath });
    },
    //路由跳转返回
    routerBack: function () {
      if (localStorage.turnPathName && localStorage.turnPathName != "login") {
        // this.$router.push({ name: localStorage.turnPathName });
        this.$router.go(-1)
      } else {
        this.$router.push({ name: "index" });
      }

    },
  },
  watch:{
    $route(to, from) {
      if(to.name=="sgHelp"){
        this.changRoute(from.name);
      }

    }
  }
}
</script>

<style src="../../../style/sg/help.css" scoped></style>
