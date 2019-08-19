<template>
<div>
  <div id="container">
<div id="main" style="margin-top: 2.667rem;">
	    <header id="header">
	        <h1>{{$t('公告')}}</h1>
	        <a class="goBack" @click="routerBack" href="javascript:void(0)"></a>
	    </header>
	    <div class="wrap">
	        <div class="bull-line"></div>
	        <div class="bull-box" v-for="item in contents">
	            <div class="bulletin-left">
	                <div class="bull-icon"></div>
	            </div>
	            <div class="bulletin-right">
	                <span class="san-icon"></span>
	                <h3 v-cloak>{{item.title}}</h3>
	                <p class="bull-txt" v-cloak v-html="item.content">{{item.content}}</p>
	                <p class="bull-bot">[{{$t('系统公告')}}] <span v-cloak>{{item.create_date}}</span></p>
	            </div>
	        </div>
	        <!--加载更多-->
	        <div class="has-more" style="text-align: center;line-height: 40px;color: #666;"></div>
	    </div>
	</div>
  </div>
</div>

</template>

<script>
	export default {
//		el: '#main',
		name: 'announcement',
		data(){
			return{
				contents: [],		//获取公告数组
		        page:1,             //请求的页码
		        totalPage: 1,       //总页数
			}
		},
		created: function() {
	        this.getdatas();
    },

		mounted: function() {

        this.initScroll();

		},
		methods:{
      //路由跳转返回
        routerBack: function () {
          if (localStorage.turnPathName && localStorage.turnPathName!="login"){
            // this.$router.push({ name: localStorage.turnPathName });
            this.$router.go(-1)
          }else{
            this.$router.push({ name: index });
          }

        },
        initScroll:function(){
          var finished = 0;
            var _this=this,toUpdate = {

            loadmore:function(obj) {
                if (finished == 0) {
                    var scrollTop = $(obj).scrollTop(); //获取滚动条高度。
                    var windowHeight = $(obj).height(); //获取window的高度。
                    var scrollHeight = $(document).height(); //获取内容高度。
                    if (scrollTop + windowHeight - scrollHeight > -10) { //当滚动条高度+window高度-内空高度0,则进入
                        finished = 1; //次数=1.
                        setTimeout(function () { //半秒后执行此方法.
                            app.page += 1;
                            toUpdate.wipeUpdate();
                            finished = 0; //次数变成0.
                        }, 200);
                    }
                }
            },

            wipeUpdate: function () {
                $(".has-more").html("");
                $(".has-more").append('<img src="./static/images/wait.gif" width="15" height="15" /><span>正在努力加载中...</span>');
                _this.getdatas();
            },

            init:function() {
                $(window).scroll(function () {
                    toUpdate.loadmore($(this));
                })
            }
        };
			toUpdate.init();       //初始化上拉加载更多
        },
			//获取数据
			getdatas:function () {
	            var _this = this;
	            var data = {
	                pageIndex:parseInt(this.page),
	                pageNum:10,
	                pageSize:10
				};
	            if (this.page <= this.totalPage){
                if(data.pageIndex==1&&localStorage.index_sysBulletin){
                  var dataLList=JSON.parse(localStorage.index_sysBulletin);
                    _this.totalPage = dataLList.pageSize;
                    this.page++;
	                            var arr = [];
                              arr = dataLList.list;
                              _this.contents=[];
	                            for(var i = 0;i<arr.length;i++){
	                                _this.contents.push(arr[i]);
                              }
                              return
                }
	                var obj = {
	                    type: "post",
	                    data:data,
	                    dataType:'json',
	                    url: "/commonAPI/bulletin/selectBySysBulletin",
	                    success: function(data) {
	                        if(data.code==200){
	                            _this.totalPage = data.body.pageSize;
	                            var arr = [];
	                            arr = data.body.list;
	                            for(var i = 0;i<arr.length;i++){
	                                _this.contents.push(arr[i]);
	                            }
	                        }
	                    }
	                };
	                this.base.callCommonApi(obj);
	            }else {
	                $(".has-more").html("");
	                $(".has-more").append('<span>数据加载完毕</span>');
	            }
	            $(".bull-line").height($('.wrap').height());
	        }
    },
    watch:{
      $route(to,from){
        if(to.name=="announcement"){
          this.initScroll();
        }else if(from.name=="announcement"){
          $ (window).unbind ('scroll');
        }
      }
    }
	};




</script>

<style scoped>
	body {
	background-color: #F6F2F2;
}
#container{
	background: url(../../assets/images/base/black_bg.png)no-repeat ;
    background-size: 100% 100%;
}
/*顶部样式开始*/
img{
  width: 100% !important;
}
.wrap {
	height: 100%;
	min-height: 100%;
	overflow: auto !important;
	padding-bottom: 15px;
	background-size: cover;
}

.bull-line {
	background: #ddd;
	width: 2px;
	left: 8%;
    position: absolute;
    top: 0;

	/*margin-top:46px;*/
    padding: 0;
    border: none;
    outline: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
}

.bull-box {
	margin: 0;
    padding: 0;
    border: none;
    outline: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
	position: relative;
	box-sizing: border-box;
}

.bull-icon {
	background: url(../../assets/images/new_icon.png) no-repeat center;
	background-size: 15px 16px;
	border: 2px solid #ddd;
	border-radius: 50%;
	padding: 15px!important;
	position: absolute;
	left: 8%;
	top: 5px;
	margin-left: -16px;
}

.bulletin-right {
	border: 1px solid #e7e7e7;
	box-shadow: 1px 2px 1px #e7e7e7;
	width: 73%;
	/* background: #fff; */
	position: relative;
	left: 18%;
	font-size: 80%;
	margin-top: 20px;
	border-radius: 3px;
	padding: 10px;
	color: #333;
}

.bulletin-right h3 {
	color: #ec2929;
    font-size: 16px;
    font-family:Arial;
}

.san-icon {
	background: url(../../assets/images/san_icon.png) no-repeat;
	background-size: 12px 19px;
	width: 12px;
	height: 19px;
	position: absolute;
	left: -12px;
	top: 10px;
}

.bull-txt {
	margin: 5px 0
}


.bull-bot {
	border-top: 1px solid #ddd;
	color: #999;
	text-indent: 1em;
	padding-top: 5px;
}
</style>
