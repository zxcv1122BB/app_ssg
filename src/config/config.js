exports.install = function (Vue, options) {
  //设置收藏
  Vue.prototype.collectGame = {
      collectList: {},
      idList: [],
      set: function (val) {
        val = parseInt(val);

        if (this.idList.length == 0) {
          this.idList.push(val);
          this.collectList[val] = 1;
          this.success();
        } else {
          var index = this.idList.indexOf(val)
          if (index !== -1) {
            this.idList.splice(index, 1);
            delete this.collectList[val];
            this.failure();
          } else {
            this.idList.push(val);
            this.collectList[val] = 1;
            this.success();
          }
        }
        if (this.idList.length == 0) {
          return ""
        } else {
          return {
            idList: this.idList,
            collectList: this.collectList
          }
        }
      },
      success: function () {

        $("#collectTips").html("收藏成功");
        $("#collectTips").show();
        setTimeout(function () {
          $("#collectTips").hide();
        }, 1500)
      },
      failure: function () {

        $("#collectTips").html("已取消");
        $("#collectTips").show();
        setTimeout(function () {
          $("#collectTips").hide();
        }, 1500)
      }
    },
    //字体大小和样式设置
    Vue.prototype.baseCss = {
      isChange: false,
      size: 2,
      style_this: '',
      styleNum: 1,
      styleColor: '#ba142b',
      style_colorList: ['#ba142b', '#14b2ba', '#16d212'],
      setSize: function (num) {
        this.size = num;
      },
      setStyleColor: function (num) {
        this.styleNum = num;
        this.styleColor = this.style_colorList[num - 1];
        this.style_this.setThemeStyle(1);
      },
    },
    Vue.prototype.szcIdList = {
      gameIdList: "",
      setGameIdList: function (list) {
        this.gameIdList = list;
      }
    },

    Vue.prototype.webUrl = "",
    //下拉刷新
    Vue.prototype.pullToRefresh = {
      nowThis: "",
      dom: '',
      setDom: function (that) {
        this.dom = that;
      },
      setNowThis: function (that) {
        this.nowThis = that;
      }
    },
    //定时计算
    Vue.prototype.global_timingStorage = {

      numberGame_countDownList: [],
      numberGame_countDownList_playId: [],
      numberGame_countDownList_this: [],
      //当前路由名字
      nowName: "",
      nowPlayId: "",
      // 创建定时对象
      createdObject: function (name, nowThis, playId) {
        this[name] = {};
        this[name][playId] = {
          //定时器对象
          data: [],
          // 当前vue对象
          nowThis: nowThis,
          //要执行的定时的函数
          dataFn: [],
          executeList: [],
          //手动输入的当前路由的排序，防止重复调用
          sortNumList: [],
          //比对进出入时间，判断是否进行定时的执行
          intervalList: [],
          timeList: [],
          //数字彩倒计时结束时调用
          // numberGame_countDownList:[],
        }
      },
      // 初始化定时队象(当前vue对象,执行的函数数组,时间间隔,手动定时标识)
      setOption: function (nowThis, executeList, interval, sortNum, playId) {

        // 触发初始化的路由名
        const name = nowThis.$route.name;
        // //console.log(playId)
        // interval = 1000;
        // 对当前路由和触发初始化的路由名进行判断
        if (!name) {
          return
        } else if (!this.nowName) {
          this.nowName = name;
        } else if (this.nowName != name) {
          this.nowName = name;
          return
        }

        if (!this[name]) {
          this.createdObject(name, nowThis, playId);
        } else if (sortNum && this[name][playId] && this[name][playId].sortNumList.indexOf(sortNum) != -1) {
          this.clearTiming(name, "", playId);
          this.restartTiming(name, "", playId);
          return
        }
        const fn = this.setTimeFn();
        const numberTiming = fn(nowThis, executeList, interval);
        // const numberTiming = this.setTimeFn(nowThis, type, interval );
        if (!this[name][playId]) {
          this[name][playId] = {
            data: [],
            nowThis: nowThis,
            dataFn: [],
            executeList: [],
            sortNumList: [],
            intervalList: [],
            timeList: [],
          }
        }
        this[name][playId].sortNumList.push(sortNum)
        this[name][playId].data.push(numberTiming)
        this[name][playId].dataFn.push(fn)
        this[name][playId].executeList.push(executeList)
        this[name][playId].intervalList.push(interval)
        this[name][playId].timeList.push((new Date()).getTime())
      },
      //设置定时器
      setTimeFn: function () {
        return function (nowThis, executeList, interval) {
          const s = setTimeout(function () {
            executeList.map(function (item) {
              nowThis[item]();
            })
            // for(var i in executeList) {
            //   nowThis[executeList[i]];
            // }
          }, interval)
          return s;
        }
      },
      //找到三级id
      findPlayId: function (name, path) {
        var playId = 0;
        switch (name) {
          case 'bj28':
            playId = 9;
            break;
          case 'lhc':
            playId = 31;
          case 'qxc':
            playId = 12;
            break;
          default:
            playId = path ? path.split("/") : path;
            playId = playId[playId.length - 1];
            break;
        }
        // //console.log(playId)
        return playId;
      },
      // 清除定时
      clearTiming: function (name, path, playId) {
        if (!this[name]) {
          return
        } else if (path) {
          playId = this.findPlayId(name, path);
        }
        if (!this[name][playId]) {
          return
        }
        for (var i = 0; i < this[name][playId].data.length; i++) {
          window.clearTimeout(this[name][playId].data[i]);
          this[name][playId].data[i] = 0;
        }
      },

      // 重启定时
      restartTiming: function (name, path, playId) {
        if (path) {
          playId = this.findPlayId(name, path);
        }

        var obj = this[name] ? this[name][playId] : "";
        if (obj) {
          const nowTime = (new Date()).getTime();
          for (var i = 0; i < obj.data.length; i++) {
            if (nowTime - obj.timeList[i] < obj.intervalList[i]) {
              obj.data[i] = obj.dataFn[i](obj.nowThis, obj.executeList[i], nowTime - obj.timeList[i]);
            } else {
              obj.data[i] = obj.dataFn[i](obj.nowThis, obj.executeList[i], obj.intervalList[i]);
            }
          }
        }

        var playIdList = this.numberGame_countDownList_playId,
          playId_index = playIdList.indexOf(playId);
        if (playIdList.length != 0 && playId_index !== -1) {
          this.numberGame_countDownList_this[playId_index][this.numberGame_countDownList[playId_index]]();
          this.numberGame_countDownList.splice(playId_index, 1);
          this.numberGame_countDownList_playId.splice(playId_index, 1);
          this.numberGame_countDownList_this.splice(playId_index, 1);
        }
        // if (this[name].numberGame_countDownList.length>0){
        //   for (var i in this[name].numberGame_countDownList) {
        //     this[name].nowThis[this[name].numberGame_countDownList[i]]();
        //   }
        //   this[name].numberGame_countDownList = [];
        // }

      },

      // 数字彩时间倒计时结束
      countdown_ending: function (_this) {
        if (Vue.prototype.pullToRefresh && _this.$route.name == Vue.prototype.pullToRefresh.nowThis.$route.name) {
          _this.getBetsBannerInfo();
        } else {
          _this.global_timingStorage.numberGame_countDownList.push("getBetsBannerInfo");
          _this.global_timingStorage.numberGame_countDownList_playId.push(_this.oneTypeId);
          _this.global_timingStorage.numberGame_countDownList_this.push(_this);
        }
      },
    }
  // Vue.prototype.base5=Vue,
  //   Vue.prototype.websock="",
  // Vue.prototype.setWebsock=function(name){
  //   Vue.prototype.websock = name;
  //   //console.log(Vue.prototype.websock)
  // },

  //请求设置
  Vue.prototype.base = {
      // BASE_IP:'mqd188.com/lsapi',
      // BASE_IP:'ssgcp.net/lsapi',
      BASE_IP: 'ssg168.net/lsapi1',
      BASE_URL: "https://",
      WS_URL: "ws://",
      // 加密ajax,加token
      websock: "",
      userMess: [],
      privateMess: [],
      chatStatus: '',
      onMess: '',
      clearId: 0,
      initData: function initData() {
        this.BASE_URL += this.BASE_IP;
        // this.WS_URL += "mqd188.com/ws";
        // this.WS_URL += "ssgcp.net/ws";
        this.WS_URL += "ssg168.net/ws";
      },
      message: '',
      callAuthApi: function callAuthApi(options) {
        var html = '<div class="loading_wait" style="display:none;position: fixed;background-color: rgba(0, 0, 0, 0.7);color: white;width: 130px;height: 70px;z-index: 99999;line-height: 70px;text-align: center;border-radius: 10px;top: 0;bottom: 0;margin: 300px auto;left: 0;right: 0;">加载中...</div>';
        if ($('.loading_wait').length == 0) {
          $('body').append(html);
        }
        if (options.data.isWhite) {
          delete options.data.isWhite;
        } else {
          // $('.loading_wait').show();
        }
        //		$('.loading_wait').show();

        options.data.timeStamp = new Date().getTime();

        options.data.lang = localStorage.getItem('lang') || 'tr';

        // alert(JSON.stringify(options.data));

        var self = this,
          userName = localStorage.getItem("userName"),
          isBanLoad = localStorage.getItem("isBanLoad");
        // self.BASE_URL = "https://" + this.BASE_IP;
        // self.WS_URL = "ws://" + this.BASE_IP;
        if (localStorage.coerceLogout === 1) {
          return;
        }
        if (userName == null || userName == undefined) {
          $('.loading_wait').hide();

          if (Vue.prototype.pullToRefresh.nowThis) {
            Vue.prototype.pullToRefresh.nowThis.$router.push({
              name: "login"
            });
          } else {
            window.location.href = "./#/loginIn/login";
          }
          return;
        }
        if (isBanLoad != "" && isBanLoad != undefined) {
          self.visitOften();
          return;
        }

        if (!$.isEmptyObject(options.data)) {

          options.data = objKeySort(options.data);

          // console.log(options.data);

          var str = '',
            strValue = '';
          // var regEx = "[`~!@#$%^&*()\\-+={}':;,\"\'\\[\\].<>/?￥%…（）_+|【】‘；：”“’。，、？\\s]";
          for (var j in options.data) {
            if (options.data[j] == undefined || options.data[j] == 'undefined') {
              options.data[j] = '';
            }
            if (options.data[j] !== '') {
              strValue = JSON.stringify(options.data[j]);
              //strValue = strValue.replace(/{/g, "").replace(/"/g, "").replace(/\[/g, "").replace(/:/g, "").replace(/,/g, "").replace(/}/g, "").replace(/]/g, "").replace(/\|/g, "").replace(/\./g, "").replace(/_/g, "").replace(/-/g, "").replace(/\\/g, "").replace(/\s+/g, "");
               strValue = strValue.replace(/[`~!$%^&()\-+={}':;,"'\[\]\/\//\\.<>?￥%…（）_+|【】‘；：”“’。，、？\s]/g,"");
              str = (str + j + "=" + strValue + "&");
            } else {
              str = (str + j + "=" + "&");
            }
          }
          str = str.substring(0, str.length - 1);
          // str= str.replace(regEx);
          // str = str.replace(/-/g,"").replace(/:/g,"").replace(/\s+/g,"");

          // str = str.replace(/{/g,"").replace(/"/g,"").replace(/\[/g,"").replace(/:/g,"").replace(/,/g,"").replace(/}/g,"").replace(/]/g,"").replace(/\|/g,"").replace(/\./g,"").replace(/_/g,"").replace(/-/g,"").replace(/\s+/g,"");

          // console.log(str+"{"+localStorage.userName+"}");
          options.data.sign = md5(str + "{" + localStorage.userName + "}").toUpperCase();
          // console.log(options.data.sign);

        }
        var l = this.BASE_URL,
          p = options;

        function reload() {
          $.ajax({

            "type": p.type,

            //"async": p.async ? p.async : false,
            "async": p.async != undefined ? p.async : true,

            "url": l + p.url,

            // "data": {
            //
            // 	"RSA_data": encryptData(p.data)
            //
            // },
            "data": p.data,
            //请求头部添加
            // "headers": {
            //   isApp: 1,
            //   // Referer: "https://198.44.243.23:8899/"
            // },
            "xhrFields": {

              withCredentials: true

            },

            "beforeSend": function beforeSend(request) {
              if (this.url.indexOf("/api/login") != -1) {
                request.setRequestHeader("UUID", localStorage.getItem("uuid"));
              }
              request.setRequestHeader("X-Authorization", localStorage.getItem("access_token")), request.setRequestHeader("X-Requested-With", "XMLHttpRequest")
            },

            "complete": function complete(xhr) {
              if (xhr.readyState == 4 && xhr.status == 200) {
                if (p.success) {
                  var _this = this;
                  if (!xhr.responseJSON) {
                    xhr.responseJSON = JSON.parse(xhr.responseText);
                  }
                  //表示token过期,需要重新刷新token
                  if (xhr.responseJSON.code != null && xhr.responseJSON.code == "900") {
                    self.refreshToken(p);
                  } else if (xhr.responseJSON.code != null && xhr.responseJSON.code == "901") {
                    //访问频繁
                    self.visitOften(xhr.responseJSON.msg);
                    return;
                  } else if (xhr.responseJSON.code != null && xhr.responseJSON.code == "600") {
                    localStorage.clear();
                    //系统维护
                    self.showPopup(xhr.responseJSON.msg, xhr.responseJSON.body);

                  } else if (xhr.responseJSON.code != null && xhr.responseJSON.code == "321") {
                    localStorage.clear();
                    if (Vue.prototype.pullToRefresh.nowThis) {
                      Vue.prototype.pullToRefresh.nowThis.$router.push({
                        name: "login"
                      });
                    } else {
                      window.location.href = "./#/loginIn/login";
                    }
                  } else if (xhr.responseJSON.code != null && xhr.responseJSON.code == "601") {
                    if (localStorage.isAlert) {
                      return;
                    }
                    localStorage.clear();
                    localStorage.isAlert = setTimeout(function () {

                      if (localStorage.app_flag) {
                        mui.toast("你已经在其他地方登陆!确定,请重新登陆!");
                      } else {
                        alert("你已经在其他地方登陆!确定,请重新登陆!");
                      }
                      localStorage.isAlert = "";
                      // window.location.href = "./#/loginIn/login";
                      if (Vue.prototype.pullToRefresh.nowThis) {
                        Vue.prototype.pullToRefresh.nowThis.$router.push({
                          name: "login"
                        });
                      } else {
                        window.location.href = "./#/loginIn/login";
                      }
                    }, 500);
                  } else if (xhr.responseJSON.code != null && xhr.responseJSON.code == "602") {
                    if (localStorage.isAlert) {
                      return;
                    }
                    localStorage.clear();
                    localStorage.isAlert = setTimeout(function () {
                      if (localStorage.app_flag) {
                        mui.toast("你已经被强制下线了!确定,请重新登陆!");
                      } else {
                        alert("你已经被强制下线了!确定,请重新登陆!");
                      }
                      localStorage.isAlert = "";
                      // window.location.href = "./#/loginIn/login";
                      if (Vue.prototype.pullToRefresh.nowThis) {
                        Vue.prototype.pullToRefresh.nowThis.$router.push({
                          name: "login"
                        });
                      } else {
                        window.location.href = "./#/loginIn/login";
                      }
                    }, 500);
                  } else if (xhr.responseJSON.code != null && xhr.responseJSON.code == "603") {
                    //ip被拉黑
                    console.info(xhr.responseJSON);
                  } else if (xhr.responseJSON.code != null && xhr.responseJSON.code == "503") {
                    p.error.call();
                  } else {
                    //调用回调函数
                    p.success.call(this, xhr.responseJSON, xhr);
                  }
                }
                setTimeout(function () {
                  $('.loading_wait').hide();
                }, 500);
              } else {
				// p.error.call();
				setTimeout(function(){
					reload()
				},5000)
                setTimeout(function () {
                  $('.loading_wait').hide();
                }, 500);
              }
            }
          });
        }
        // console.log(options.data);
        return reload()
      },
      //不加密ajax（目前用于检验验证码是否正确）

      callCommonApi: function callCommonApi(options) {
        var html = '<div class="loading_wait" style="display:none;position: fixed;background-color: rgba(0, 0, 0, 0.7);color: white;width: 130px;height: 70px;z-index: 99999;line-height: 70px;text-align: center;border-radius: 10px;top: 0;bottom: 0;margin: 300px auto;left: 0;right: 0;">加载中...</div>';
        if ($('.loading_wait').length == 0) {
          $('body').append(html);
        }
        $('#loading').hide();


        if (options.url == "/commonAPI/getMatchInfoByPlayId" || options.data.isWhite) {
          delete options.data.isWhite;
        } else {
          // $('.loading_wait').show();
        }

        options.data.timeStamp = new Date().getTime();
        options.data.lang = localStorage.getItem('lang') || 'tr';

        var self = this;
		// self.BASE_URL = "https://" + this.BASE_IP;
		var l = this.BASE_URL,
          p = options;

        function reload1() {
			$.ajax({

				"type": p.type,

				"async": p.async != undefined ? p.async : true,

				"url": l + p.url,

				"data": p.data,

				"xhrFields": { //跨域

				  withCredentials: true

				},
				//请求头部添加
				// "headers": {
				//   isApp: 1,
				//   // Referer: "https://m.jc163.cc/"
				// },
				"complete": function complete(xhr) {
				  //请求完成时调用的方法

				  if (xhr.readyState == 4 && xhr.status == 200) {
					//请求成功时
					if (!xhr.responseJSON) {
					  xhr.responseJSON = JSON.parse(xhr.responseText);
					}

					if (xhr.responseJSON.code != null && xhr.responseJSON.code == 600) {
					  localStorage.clear();
					  self.showPopup(xhr.responseJSON.msg, xhr.responseJSON.body);

					  return;
					} else if (xhr.responseJSON.code != null && xhr.responseJSON.code == "901") {
					  //访问频繁
					  self.visitOften(xhr.responseJSON.msg);
					  return;
					} else if (xhr.responseJSON.code != null && xhr.responseJSON.code == "321") {
					  localStorage.clear();
					  if (Vue.prototype.pullToRefresh.nowThis) {
						Vue.prototype.pullToRefresh.nowThis.$router.push({
						  name: "login"
						});
					  } else {
						window.location.href = "./#/loginIn/login";
					  }
					} else if (xhr.responseJSON.code != null && xhr.responseJSON.code == "603") {
					  //ip被拉黑
					  console.info(xhr.responseJSON);
					  return;
					} else if (xhr.responseJSON.code != null && xhr.responseJSON.code == "503") {
					  p.error.call();
					  return
					}
					if (p.success) {

					  p.success.call(this, xhr.responseJSON, xhr);
					}
					setTimeout(function () {
					  $('.loading_wait').hide();
					}, 500);
				  } else {
					//请求失败时
          setTimeout(function(){
            reload1()
          },5000)
					p.error.call();
					setTimeout(function () {
					  $('.loading_wait').hide();
					}, 500);
				  }
				}

			  });
		}
        return reload1()
      },

      //token失效后,利用refreshtoken重新获取token

      refreshToken: function refreshToken(options) {
        var self = this;
        // self.BASE_URL = "https://" + this.BASE_IP;
        $.ajax({

          contentType: "application/json; charset=utf-8",

          beforeSend: function beforeSend(request) {

            request.setRequestHeader("X-Authorization", localStorage.getItem("refreshToken")), request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
          },

          type: "post",

          url: this.BASE_URL + "/api/auth/token",

          data: {},
          //请求头部添加
          // "headers": {
          //   isApp: 1,
          //   // Referer: "https://m.jc163.cc/"
          // },
          success: function success(data) {

            console.info("refreshToken:" + data);
            if (data.code != null && data.code == "600") {
              localStorage.clear();
              self.showPopup(data.msg, data.body);

              return;
            }
            var head = "Bearer ";

            localStorage.access_token = head + data.token;

            if (data.code == 332 || data.code == 900 || data.code == 336) {

              //表示refreshToken也过期,需要重新登陆
              console.info("跳转到登陆页面");
              localStorage.clear();
            } else {

              self.callAuthApi(options);
            }
          }

        });
      },

      //自动登录
      callAuthApiNoEcrypt: function callAuthApiNoEcrypt(options) {

        options.data.timeStamp = new Date().getTime();

        if (!$.isEmptyObject(options.data)) {

          options.data = objKeySort(options.data);

          // console.log(options.data);

          var str = '';
          // var regEx = "[`~!@#$%^&*()\\-+={}':;,\"\'\\[\\].<>/?￥%…（）_+|【】‘；：”“’。，、？\\s]";
          for (var j in options.data) {
            if (options.data[j] == undefined || options.data[j] == 'undefined') {
              options.data[j] = '';
            }
            if (options.data[j] !== '') {
              str = (str + j + "=" + options.data[j] + "&");
            } else {
              str = (str + j + "=" + "&");
            }
          }
          str = str.substring(0, str.length - 1);
          str = str.replace(/{/g, "").replace(/"/g, "").replace(/\[/g, "").replace(/:/g, "").replace(/,/g, "").replace(/}/g, "").replace(/]/g, "").replace(/\|/g, "").replace(/\./g, "").replace(/_/g, "").replace(/-/g, "").replace(/\s+/g, "");
          // str= str.replace(regEx);
          // str = str.replace(/-/g,"").replace(/:/g,"").replace(/\s+/g,"");
          // str = str.replace(/{/g,"").replace(/"/g,"").replace(/\[/g,"").replace(/:/g,"").replace(/,/g,"").replace(/}/g,"").replace(/]/g,"").replace(/\|/g,"").replace(/' '/g,"").replace(/\./g,"").replace(/_/g,"").replace(/-/g,"");

          // console.log(str);


          options.data.sign = md5(str + "{" + localStorage.userName + "}").toUpperCase();

        }

        // alert(JSON.stringify(options.data));



        var self = this;

        // self.BASE_URL = "https://" + this.BASE_IP;
        // self.WS_URL = "ws://" + this.BASE_IP;
        return $.ajax({

          "type": options.type,

          "async": options.async ? options.async : false,

          "url": this.BASE_URL + options.url,

          "data": options.data,

          "xhrFields": {

            withCredentials: true

          },
          //请求头部添加
          // "headers": {
          //  isApp:1,
          // },

          "beforeSend": function beforeSend(request) {

            request.setRequestHeader("X-Authorization", localStorage.getItem("access_token")), request.setRequestHeader("X-Requested-With", "XMLHttpRequest"), request.setRequestHeader("UUID", localStorage.getItem("uuid"));
          },

          "complete": function complete(xhr) {
            //						self.initWebSocket();
            if (xhr.readyState == 4 && xhr.status == 200) {
              if (!xhr.responseJSON) {
                xhr.responseJSON = JSON.parse(xhr.responseText);
              }
              if (xhr.responseJSON.code != null && xhr.responseJSON.code == "600") {
                localStorage.clear();
                self.showPopup(xhr.responseJSON.msg, xhr.responseJSON.body);

                return;
              } else if (xhr.responseJSON.code != null && xhr.responseJSON.code == "901") {
                //访问频繁
                self.visitOften(xhr.responseJSON.msg);
                return;
              }
              if (options.success) {

                //表示token过期,需要重新刷新token

                if (xhr.responseJSON.code != null && xhr.responseJSON.code == "900") {

                  self.refreshToken(options);
                } else {

                  //调用回调函数
                  // localStorage.gameRebatesList = xhr.responseJSON.body.data;
                  options.success.call(this, xhr.responseJSON, xhr);
                }
              }
            } else {

              options.error.call();
            }
          }
        });
      },
      threadPoxi: function threadPoxi() {
        // 实际调用的方法
        //参数
        var agentData = "ok";
        //				var _this = this;
        //				if(!this.websock) {
        //					if(localStorage.ip) {
        //						var username = localStorage.userName;
        //						_this.websock = new WebSocket(_this.WS_URL + "?username=" + username + "&channel=" + browserType.initMethod(name).channel + "&device=" + browserType.initMethod(name).device + "&ip=" + localStorage.ip);
        //						_this.websock.onopen = function(evt) {
        //							//console.log("Connection open ...");
        //						};
        //						_this.websock.onmessage = _this.websocketonmessage;
        //						_this.websock.onclose = _this.websocketclose;
        //					} else {
        //						return;
        //					}
        //				}
        //若是ws开启状态
        if (!localStorage.userName || localStorage.userName == undefined || localStorage.userName == '') {
          return;
        }
        if (this.websock.readyState === this.websock.OPEN && this.websock.readyState != undefined) {
          this.websocketsend(agentData);
        }
        // 若是 正在开启状态，则等待300毫秒
        else if (this.websock.readyState === this.websock.CONNECTING && this.websock.readyState != undefined) {
          var that = this; //保存当前对象this
          setTimeout(function () {
            that.websocketsend(agentData);
          }, 300);
        }
        // 若未开启 ，则等待500毫秒
        else {
          if (Vue.prototype.base.onMess == '008900') {
            return;
          }
          var _that = this; //保存当前对象this
          setTimeout(function () {
            _that.initWebSocket();
            _that.websocketsend(agentData);
          }, 500);
        }
      },
      initWebSocket: function initWebSocket(that) {
        // return
        if (!localStorage.userName) {
          return;
        }
        if (this.websock.readyState === this.websock.OPEN && this.websock.readyState) {
          return;
        }
        //初始化weosocket
        var _this = this;
        var ip = '',
          username,
          token,
          userType;
        //获取ip地址
        $.getScript('https://pv.sohu.com/cityjson?ie=utf-8', function () {
          ip = returnCitySN["cip"];
          username = localStorage.userName;
          token = localStorage.access_token.split(' ')[1];
          if (localStorage.userType == 2) {
            userType = 0;
          } else if (localStorage.userType == 3) {
            userType = 2;
          } else if (localStorage.userType == 1) {
            userType = 1;
          }
          _this.websock = new WebSocket(_this.WS_URL + "?username=" + username + "&channel=" + browserType.initMethod(name).channel + "&device=" + browserType.initMethod(name).device + "&ip=" + ip + '&userType=' + userType + '&token=' + token);
          _this.websock.onopen = function (evt) {
            //console.log("Connection open ...");
          };
          _this.websock.onmessage = _this.websocketonmessage;
          _this.websock.onclose = _this.websocketclose;
        });
      },
      websocketonmessage: function websocketonmessage(e) {
        //数据接收
        var onMess;
        onMess = $.parseJSON(e.data);
        Vue.prototype.base.onMess = onMess.code + '' + onMess.messType;
        //命令
        if (onMess.messType == '900') {
          if (onMess.code == '002') {
            localStorage.clear();
            if (localStorage.app_flag) {
              mui.toast("您已被强制下线");
            } else {
              alert('您已被强制下线');
            }
            // window.location.href = "./#/loginIn/login";
            if (Vue.prototype.pullToRefresh.nowThis) {
              Vue.prototype.pullToRefresh.nowThis.$router.push({
                name: "login"
              });
            } else {
              window.location.href = "./#/loginIn/login";
            }
          } else if (onMess.code == '003' || onMess.code == '004' || onMess.code == '005' || onMess.code == '006') {
            Vue.prototype.base.userMess.push({
              userType: '0', //消息类型
              uName: onMess.userName, //会员名
              mess: onMess.mess, //消息内容
              uTime: onMess.time //发送时间
            });
          } else if (onMess.code == '007') {
            localStorage.clear();
            if (localStorage.app_flag) {
              mui.toast("您已在其他设备登录");
            } else {
              alert('您已在其他设备登录');
            }
            // window.location.href = "./#/loginIn/login";
            if (Vue.prototype.pullToRefresh.nowThis) {
              Vue.prototype.pullToRefresh.nowThis.$router.push({
                name: "login"
              });
            } else {
              window.location.href = "./#/loginIn/login";
            }
          } else if (onMess.code == '008') {
            mui.toast('你已在其他地方登录');
            var mask = mui.createMask(function () {
              mui.toast('你已在其他地方登录');
              return false;
            }); //callback为用户点击蒙版时自动执行的回调；
            mask.show(); //显示遮罩
          }
        }

        //系统消息
        if (onMess.messType == '200') {
          if (onMess.code == '003') { //解除禁言
            Vue.prototype.base.chatStatus = 0;
          } else if (onMess.code == '004') { //禁言用户
            Vue.prototype.base.chatStatus = 1;
          } else if (onMess.code == '005') { //全体禁言
            Vue.prototype.base.chatStatus = 2;
          } else if (onMess.code == '006') { //取消全体禁言
            Vue.prototype.base.chatStatus = 3;
          }
          Vue.prototype.base.userMess.push({
            userType: '0',
            uName: onMess.userName,
            mess: onMess.mess,
            uTime: onMess.time,
          });
        }
        //用户消息
        if (onMess.messType == '100') {
          if (onMess.code == '001') {
            if (onMess.userName == localStorage.userName) {
              Vue.prototype.base.userMess.push({
                userType: '1',
                uName: onMess.userName,
                mess: onMess.mess,
                uTime: onMess.time.split(' ')[1],
                messType: 0,
              });
            } else {
              Vue.prototype.base.userMess.push({
                userType: '2',
                uName: onMess.userName,
                mess: onMess.mess,
                uTime: onMess.time.split(' ')[1],
                messType: 0,
              });
            }
          } else if (onMess.code == '002') {
            if (onMess.userName == localStorage.userName) {
              Vue.prototype.base.privateMess.push({
                userType: '1',
                uName: onMess.userName,
                mess: onMess.mess,
                uTime: onMess.time.split(' ')[1],
                messType: 1,
                toUserName: onMess.toUserName
              });
            } else {
              Vue.prototype.base.privateMess.push({
                userType: '2',
                uName: onMess.userName,
                mess: onMess.mess,
                uTime: onMess.time.split(' ')[1],
                messType: 1,
                toUserName: onMess.toUserName
              });
            }
          }
        }

      },
      websocketsend: function websocketsend(agentData) {
        var _this = this;
        //数据发送
        //  setInterval(function(){_this.websock.send('ok2')},1000*50);
      },
      websocketclose: function websocketclose(e) {
        //关闭
        if (localStorage.userName && localStorage.access_token) {
          var _this = this;
          Vue.prototype.base.threadPoxi();
          return;
        }
        //				Vue.prototype.base.threadPoxi();
        //console.log("connection closed");
      },
      //心跳包
      // heartbeat: function(name) {
      // 	$.jheartbeat.set({
      // 			url: base.BASE_URL+ "/commonAPI/onlineHeartbeat",
      // 			delay: 3000 * 10, // 定时器的周期
      // 			div_id: "test_div", // 添加弹框
      // 			data: browserType.initMethod(name)
      // 		},
      // 		function() { //回调函数// Callback Function
      // 		});
      // },
      //系统维护展示弹框
      showPopup: function showPopup(title, msg) {
        if (localStorage.tipsContent) {
          return
        }

        localStorage.isTransfer = 1;
        localStorage.tipsContent = msg;

        window.location.href = "/#/lose";
      },
      //访问频繁
      visitOften: function visitOften(msg) {
        var ow = document.documentElement.clientWidth,
          oh = document.documentElement.clientHeight,
          num = 4,
          html = '<div id="visit_wait_wrap" style="width:' + ow + 'px;height:' + oh + 'px;position: fixed;top: 0;bottom: 0;left: 0;right: 0;background-color: rgba(2, 2, 2, 0.5);;z-index:99999;"></div><div id="visit_wait" style="display:none;position: fixed;background-color: #fff;width: 20rem;height: 3rem;z-index: 100000;line-height: 3rem;text-align: center;border-radius: 1.5rem;top: 0;bottom: 0;margin: 300px auto;left: 0;right: 0;">加载中...</div>';
        $('.loading_wait').hide();
        if ($('body').css('overflow') != 'hidden') {
          $('body').append(html);
          $('body').css('overflow', 'hidden');
        }
        $('#visit_wait').show();
        html = "访问太过频繁，4s后自动刷新当前页";
        $('#visit_wait').html(html);
        var timer = setInterval(function () {
          num--;
          html = "访问太过频繁，" + num + "s后自动刷新当前页";
          $('#visit_wait').html(html);
          if (num == 0) {
            clearInterval(timer);
            //$('body').css('overflow', 'auto');
            location.reload();
            //				$('#visit_wait').hide();
            //				$('#visit_wait_wrap').hide();
          }
        }, 1000);
      },

      //系统顶部状态栏高度
      getStatusbarHeight: function getStatusbarHeight() {
        return plus.navigator.getStatusbarHeight();
      }
    },

    // $.jheartbeat = {
    // 	options: {
    // 		url: "heartbeat_default.asp",
    // 		delay: 60000,
    // 		div_id: "test_div",
    // 		data: {}
    // 	},

    // 	beatfunction: function beatfunction() {},

    // 	timeoutobj: {
    // 		id: -1
    // 	},

    // 	set: function set(options, onbeatfunction) {
    // 		if(this.timeoutobj.id > -1) {
    // 			clearTimeout(this.timeoutobj);
    // 		}
    // 		if(options) {
    // 			$.extend(this.options, options); //将2个json进行合并
    // 		}
    // 		if(onbeatfunction) {
    // 			this.beatfunction = onbeatfunction;
    // 		}

    // 		// Add the HeartBeatDIV to the page
    // 		$("body").append("<div id=\"" + this.options.div_id + "\" style=\"display: none;\"></div>");

    // 		var userName = localStorage.getItem("userName");

    // 		if(userName == null || userName == undefined) {
    // 			window.clearInterval(this.timeoutobj.id);
    // 			return;
    // 		}
    // 		this.timeoutobj.id = setInterval("$.jheartbeat.beat();", this.options.delay);
    // 	},

    // 	beat: function beat() {
    // 		$.ajax({
    // 			url: this.options.url,
    // 			dataType: "json",
    // 			"xhrFields": { //跨域
    // 				withCredentials: true
    // 			},
    // 			type: "POST",
    // 			data: this.options.data,
    // 			error: function error(e) {
    // 				$('#' + $.jheartbeat.options.div_id).append("Error Requesting Data");
    // 			},
    // 			success: function success(data) {
    // 				if(data.code != null && data.code == 291) {
    // 					window.clearInterval($.jheartbeat.timeoutobj.id);
    //           localStorage.clear();
    //           if (localStorage.app_flag) {
    //             mui.toast("您已被强制下线;请重新登陆!");
    //           } else {
    //             alert("您已被强制下线;请重新登陆!");
    //           }
    // 					window.reload();
    // 				}
    // 			}
    // 		});
    // 	}
    // },
    //数字彩注数计算
    Vue.prototype.countUtils = {
      // 三码、前二码、后二码直选复式     an=n1*n2*...
      getDirectCount: function (obj) {
        var pre = 1;
        for (var key in obj) {
          pre *= obj[key];
        }
        return pre;
      },
      // 三码、二码直选和值   type 类型  2 二码  3 三码  max 每一位最高选几
      getThreeSum: function (type, max, num) {
        var count = 0;
        for (var k = 0; k < max; k++) {
          for (var i = 0; i < max; i++) {
            if (type == 2) {
              if (num == (k + i)) {
                count++;
              }
            } else {
              for (var j = 0; j < max; j++) {
                if (num == k + i + j) {
                  count++
                }
              }
            }
          }
        }
        return count;
      },
      //三码组三（至少2项）   count 选择项的总项数   min 最少选择多少项才开始计算   2/6/12/20/30/42/56
      getThreeGrounpDirect: function (count, min) {
        if (count >= min) {
          return count * (count - 1);
        } else {
          return 0;
        }
      },
      // 三码组六(至少3项)  1/4/10/20/35/56/84/120 参数同上  n(n+1)(n+2)/6
      getSixGroupDirect: function (count, min) {
        if (count >= min) {
          count = count - (min - 1)
          return count * (count + 1) * (count + 2) / 6;
        } else {
          return 0;
        }
      },
      // 后二码/前二码组选复式（至少2项） 1/3/6/10/15
      getBcGroupMix: function (count, min) {
        if (count >= min) {
          count = count - 1;
          return count * (count + 1) / 2;
        } else {
          return 0;
        }
      },
      // 计算组三和值的组数    有且只有两位数字相同的
      getGroupThree: function (num, max) {
        var count = 0;
        for (var i = 0; i < max; i++) {
          for (var j = i + 1; j < max; j++) {
            if (i + j + j == num || i + i + j == num) {
              count++
            }
          }
        }
        return count;
      },
      // 计算组六的和值
      getGroupSix: function (num) {
        var numArr = [];
        var count = 0;
        for (var i = 0; i < 10; i++) {
          for (var j = i + 1; j < 10; j++) {
            for (var k = j + 1; k < 10; k++) {
              if (i != j && j != k && k != i) {
                if (i + j + k == num) {
                  count++
                }
              }
            }
          }
        }
        return count
      },

      // 后二码/前二码组选复式（至少2项） 1/3/6/10/15
      getBcGroupMix_cqssc: function (count, min) {
        var n = 1;
        for (var i = 1; i < count + 1; i++) {
          n *= i;
        }
        for (var i = 1; i < min + 1; i++) {
          n /= i;
        }
        for (var i = 1; i < (count - min) + 1; i++) {
          n /= i;
        }
        if (count >= min) {
          //          count=count-1;
          //          return count*(count+1)/min;
          return n;
        } else {
          return 0;
        }
      },
      // 三码、二码直选跨度   type 类型  2 二码  3 三码  max 每一位最高选几
      getTwoThreeSpacing: function (type, max, num) {
        var count = 0,
          n1, n2, n3, list = [];
        for (var k = 0; k < max; k++) {
          n1 = k;
          for (var i = 0; i < max; i++) {
            n2 = i;
            if (type == 2) {
              if (num == Math.abs(k - i)) {
                count++;
              }
            } else {
              for (var j = 0; j < max; j++) {
                n3 = j;
                list = [n1, n2, n3];
                list.sort(function (a, b) {
                  return b - a
                });
                if (num == list[0] - list[2]) {
                  count++
                }
              }
            }
          }
        }
        return count;
      },

      // 三码、二码组选和值   type 类型  2 二码  3 三码  max 每一位最高选几,index--0为组三，1--组六
      getThreeGroupSum: function (type, max, num, index) {
        var count = 0,
          olist = [],
          list = [],
          str;
        for (var k = 0; k < max; k++) {
          for (var i = 0; i < max; i++) {
            if (type == 2) {
              if (num == k + i && !(k == i)) {
                list = [k, i];
                list.sort(function (a, b) {
                  return a - b
                })
                str = list.join(",");
                if (olist.length == 0) {
                  olist.push(str);
                  count++
                } else {
                  for (var m = 0, len4 = olist.length; m < len4; m++) {
                    if (olist[m] == str) {
                      break;
                    } else if (m == olist.length - 1) {
                      olist.push(str);
                      count++
                    }
                  }
                };

              }

            } else {
              if (index == 0) { //组三
                for (var j = 0; j < max; j++) {
                  if ((num == k + i + j) && !(k == i && i == j) && (k == i || k == j || i == j)) {
                    countNumber(k, i, j);

                  }
                }
              } else if (index == 1) { //组六
                for (var j = 0; j < max; j++) {
                  if (num == k + i + j && (k != i && i != j && k != j)) {
                    countNumber(k, i, j);
                  }
                }
              } else {
                for (var j = 0; j < max; j++) {
                  if (num == k + i + j && !(k == i && i == j)) {
                    countNumber(k, i, j);
                  }
                }
              }

              function countNumber(k, i, j) {
                list = [k, i, j];
                list.sort(function (a, b) {
                  return a - b
                })
                str = list.join(",");
                if (olist.length == 0) {
                  olist.push(str);
                  count++
                } else {
                  for (var m = 0, len4 = olist.length; m < len4; m++) {
                    if (olist[m] == str) {
                      break;
                    } else if (m == olist.length - 1) {
                      olist.push(str);
                      count++
                    }
                  }
                };
              }
            };

          }
        }
        return count;
      },
      //任选二，任选三，任选4的直选复式
      calculateNum: function (indexList, lenList) {
        var sumNum = 0,
          that = this;
        for (var i = 0, len1 = indexList.length; i < len1; i++) {
          switch (indexList[i]) {
            case 1:
              for (var j = 0, len = lenList.length; j < len; j++) {
                sumNum += lenList[j];
              }
              break;
            case 2:
              //2串1
              for (var j = 0, len = lenList.length; j < len - 1; j++) {
                var k = j + 1;
                do {
                  sumNum += lenList[j] * lenList[k];
                  k++;
                } while (k < len);
              }
              break;
            case 3:
              //3串1
              for (var j = 0, len = lenList.length; j < len - 2; j++) {
                var k = j + 1,
                  l = j + 2;
                do {
                  do {
                    sumNum += lenList[j] * lenList[k] * lenList[l];
                    l++;
                  } while (l < len);
                  k++, l = k + 1;
                } while (k < len - 1);
              }
              break;
            case 4:
              //4串1
              for (var j = 0, len = lenList.length; j < len - 3; j++) {
                var k = j + 1,
                  l = j + 2,
                  m = j + 3;
                do {
                  do {
                    do {
                      sumNum += lenList[j] * lenList[k] * lenList[l] * lenList[m];
                      m++;
                    } while (m < len);
                    l++, m = l + 1;
                  } while (l < len - 1);
                  k++, l = k + 1, m = k + 2;
                } while (k < len - 2);
              }
              break;
          }
        }
        return sumNum;
      },
    }

}
