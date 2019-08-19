export default {
    name: 'activity',
    data() {
    	return{
    		imgs: [],	     //图片数组
	        page:1,          //请求的页码
	        totalPage: 1,    //总页数
	        nodata:false,
            topChange: 0,  //0活动  1活动详情
            details:[],    //活动详情内容
    	}
    },
    created: function () {
        //mui.init();
        this.getdatas();
    },
    mounted:function(){
    	this.loadMorePage();
    },
    methods: {
      //路由跳转返回
        routerBack: function () {
          if (localStorage.turnPathName && localStorage.turnPathName!="login"){
            // this.$router.push({ name: localStorage.turnPathName });
            this.$router.go(-1)
          }else{
            this.$router.push({ name: "index" });
          }

        },
        detailOpen:function(index){
            var _this = this;
            _this.topChange = 1;
            _this.details = _this.imgs[index];
            // console.log(_this.details);

        },
        detailClose:function(){
            var _this = this;
            _this.topChange = 0;

        },

        //请求数据
        getdatas:function () { 
            var _this = this;
            var data = {
                pageIndex:parseInt(this.page),
                pageNum:10
            };
            if (this.page <= this.totalPage){
                var obj = {
                    type: "post",
                    data:data,
                    dataType:'json',
                    url: "/commonAPI/activity/selectBySysActivity",
                    success: function (data) {
                        if (data.code == 200 && data.body!=undefined){
                            _this.totalPage = data.body.pageSize;
                            _this.imgs = [];
                            var arr = [];
                            arr = data.body.list;
                            for (var i = 0; i < arr.length; i++) {
                                _this.imgs.push(arr[i]);
                            }
                        }else{
                            _this.nodata=true;
                        }
                    },
                    error:function (msg) {
                        //console.log(msg);
                    }
                };
                this.base.callCommonApi(obj);
            }else {
                $(".has-more").html("");
                if(this.page!=1&&this.imgs.length>0){
                  $(".has-more").append('<span>数据加载完毕</span>');
                }
                
            }
        },
        // //点击展开大图片
        // show_pic: function (id) {
        //     $('#' + id + ' .hide').toggle();
        // },
        loadMorePage: function() {
				var finished = 0,
					_this = this;
				var toUpdate = {

					loadmore: function(obj) {
						if(finished == 0) {
							var scrollTop = $(obj).scrollTop(); //获取滚动条高度。
							var windowHeight = $(obj).height(); //获取window的高度。
							var scrollHeight = $(document).height(); //获取内容高度。
							if(scrollTop + windowHeight - scrollHeight > -10) { //当滚动条高度+window高度-内空高度0,则进入
								finished = 1; //次数=1.
								setTimeout(function() { //半秒后执行此方法.
									_this.page += 1;
									toUpdate.wipeUpdate();
									finished = 0; //次数变成0.
								}, 200);
							}
						}
					},

					wipeUpdate: function() {
						$(".has-more").html("");
						$(".has-more").append('<img src="static/images/wait.gif" width="15" height="15" /><span>正在努力加载中...</span>');
						_this.getdatas();
					},

					init: function() {
						$(window).scroll(function() {
							toUpdate.loadmore($(this));
						})
					}
				};
				toUpdate.init();
			},
    },
    watch: {
      // $route(to, from) {  
      //   var _this = this;
      //   if (to.name == "activity") { 
      //     _this.getdatas();
      //   }
      // },
    }

};
