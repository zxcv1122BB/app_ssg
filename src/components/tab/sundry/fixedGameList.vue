<template>
    <div id="fixedGameList" style="display: none">
      <div class="rightTitle" @click="showFixedGameList()">
        {{$t('更多彩种')}}
      </div>
      <div style="disPlay:none" class="hiddenClick" @click="getFixedGameList()"></div>
      <div class="rightGameList">
        <div v-if="fixedGameList">
          <div class="gameType0">
            <div class="title">{{$t('竞技彩')}}</div>
            <span :name="item.show_name" :class="item.bet_url==bet_url?'active':''" v-for="item in fixedGameList[0]" @click="clickSzcTurn($event,item.bet_url,item.gameID,item.pic_url)">{{item.show_name}}</span>
          </div>
          <div class="gameType1">
            <div class="title">{{$t('低频彩')}}</div>
            <span :name="item.show_name" :class="item.bet_url==bet_url?'active':''" v-for="item in fixedGameList[1]" @click="clickSzcTurn($event,item.bet_url,item.gameID,item.pic_url)">{{item.show_name}}</span>
          </div>
          <div class="gameType2">
            <div class="title">{{$t('高频彩')}}</div>
            <span :name="item.show_name" v-for="item in fixedGameList[2]" @click="clickSzcTurn($event,item.bet_url,item.gameID,item.pic_url)">{{item.show_name}}</span>
          </div>
        </div>
      </div>
      <div class="wrapper" @click="closeFixedGameList"></div>
    </div>
</template>

<script>
export default {
  data(){
    return {
      fixedGameList:'',
      bet_url:localStorage.lottery_url?localStorage.lottery_url:"",
      text:"",
    }
  },
  mounted(){
    this.initData();
  },
  methods:{
    //初始化数据
    initData(){
      // //console.log($("header").html())
    },
    //显示
    showFixedGameList(){
      if(!localStorage.index_sysLottery){
        return
      }

      $(".wrapper").show();
        $('.rightGameList').show();
        $("body").css("overflow","hidden");
    },
    getFixedGameList(){
      if(!this.fixedGameList){
        var gameList = JSON.parse(localStorage.index_sysLottery),gameObjList={0:[],1:[],2:[]};
        gameList.map(function(item){
          if(item.game_type==0){
            gameObjList[0].push({
              bet_url:item.bet_url,
              show_name: item.show_name,
              pic_url:item.pic_url
            })
          }else if(item.game_type==1){
            gameObjList[1].push({
              bet_url: item.bet_url,
              show_name: item.show_name,
              pic_url:item.pic_url
            })
          }else{
            gameObjList[2].push({
              bet_url: item.bet_url,
              show_name: item.show_name,
              pic_url:item.pic_url
            })
          }
        });
        this.fixedGameList=gameObjList;
        // console.log(this.fixedGameList)
      }
    },
    //关闭
    closeFixedGameList(){
     $(".wrapper").hide();
      $('.rightGameList').hide();
      $("body").css("overflow","auto");
    },
    //点击跳转
    clickSzcTurn(event,contentUrl, gameID, imgUrl){
      if(event){
        event=event.currentTarget;
        $("#fixedGameList .rightGameList span.active").removeClass("active");
        $(event).addClass("active");
      }
      this.closeFixedGameList();
      localStorage.lottery_img = imgUrl; //开奖页面用到图片url
			localStorage.lottery_url = contentUrl; //开奖页面用到投注页面url
			localStorage.gameID = gameID;
			//
			var dealUrl = contentUrl.replace("_", "").replace(".html", "").replace("?", "/");
			if(dealUrl.indexOf("qf_hh") !== -1) {
				localStorage.backAim_tz = 1;
				var _this = this;
				setTimeout(function() {
					_this.skip_newUrl(0, dealUrl, "");
				}, 100);
			} else if(dealUrl.indexOf("qf_dg") !== -1) {
				localStorage.backAim_tz = 8;
				var _this = this;
				setTimeout(function() {
					_this.skip_newUrl(0, dealUrl, "");
				}, 100);
			} else if(dealUrl.indexOf("qb_hh") !== -1) {
				localStorage.backAim_tz = 25;
				var _this = this;
				setTimeout(function() {
					_this.skip_newUrl(0, dealUrl, "");
				}, 100);
			} else if(dealUrl.indexOf("qb_dg") !== -1) {
				localStorage.backAim_tz = 30;
				var _this = this;
				setTimeout(function() {
					_this.skip_newUrl(0, dealUrl, "");
				}, 100);
			} else {
				this.skip_newUrl(0, dealUrl, "");
			}
    },
    //跳转方法
		skip_newUrl: function(index, url, nameId) {
      //子页面中要往上返回两级
      url="../../"+url;
			this.$router.push({
				path: url
			});

		},
  },
  watch:{
text(val){
  //console.log(val)
}
  }
}
</script>


<style>
#fixedGameList .rightTitle {
  display: none;
  position: fixed;
  right: 0;
  bottom: 32%;
  width: 1.4rem;
  font-size: .9rem;
  /* background: #980000; */
  color: #fff;
  padding: .2rem;
  border-top-left-radius: .2rem;
  border-bottom-left-radius: .2rem;
}

#fixedGameList .rightGameList {
  position: fixed;
  top: 10%;
  z-index: 204;
  left: 40%;
  opacity: 1;
  background: #fff;
  max-height: 80%;
  padding: .5rem;
  display: none;
  z-index: 9999;
}

#fixedGameList .wrapper {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  background: #000;
  opacity: .5;
  z-index: 203;
  display: none;
  z-index: 9998;
}

.rightGameList>div span {
  display: inline-block;
  padding: .2rem;
}

.rightGameList {
  top: 10%;
  max-height: 30rem;
  overflow: scroll;
}

/* .gameType0,
.gameType1,
.gameType2 {
  padding: .5rem;
  padding-left: 1rem;
} */

.gameType0>div,
.gameType1>div,
.gameType2>div {
  margin-bottom: .5rem;
}

.gameType0>span {
  display: inline-block;
  padding: .2rem;
  font-size: .9rem;
  border: 1px solid #ddd;
  color: #999;
  width: 48%;
  text-align: center;
  margin-right: 1%;
  font-weight: 700;
}

.gameType1>span,
.gameType2>span {
  display: inline-block;
  padding: .2rem;
  border: 1px solid #ddd;
  color: #999;
  font-size: .9rem;
  width: 48%;
  margin-right: 1%;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 700;
}

.rightGameList div span.active{
  /* background: #ba142b; */
  color:#fff;
}

</style>

