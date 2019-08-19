export default {
	name: 'chat',
	data() {
		return {
			userMess: [], //聊天室、系统消息
			privateMess: [], //所有私聊
			userPrivate: [], //用户私聊
			allPrivate: [], //显示信息
			onlineNum: 0,
			chatStatus: 0,
			id: '',
			//			uName: '所有人',
			uName: this.$route.params.chatName,
			privateChat: [],
			onlineUser: [],
			onlineAdmin: [],
			userType: 0,
		}
	},
	created: function() {
		this.$nextTick(() => {
			this.getOnlineNum();
			if(this.base.clearId == 1) {
				this.userPrivate = [];
				this.base.clearId = 0;
			}
		})
	},
	mounted: function() {
		this.getdatas();
	},
	methods: {
		getOnlineNum: function() {
			var _this = this;
			var obj = {
				type: "post",
				data: {},
				dataType: "json",
				url: "/commonAPI/getUserOnlineSum",
				success: function(data) {
					if(data.code == 200) {
						_this.onlineNum = $.parseJSON(data.body).userNum;
						if(!document.getElementById("messageEditor")) {
							return;
						}
						if(_this.id == 0) {
							if(_this.base.chatStatus == "") {
								_this.base.chatStatus = $.parseJSON(data.body).ForbiddenFlag;
							}
							if(localStorage.chatAdmin != 1) {
								if(_this.base.chatStatus == 1 || _this.base.chatStatus == 2) {
									document.getElementById("messageEditor").contentEditable = false;
									document.getElementById("messageEditor").innerHTML = '您已被禁言';
								} else if(_this.base.chatStatus == 0 || _this.base.chatStatus == 3) {
									document.getElementById("messageEditor").contentEditable = true;
									document.getElementById("messageEditor").innerHTML = '';
								}
							} else {
								document.getElementById("messageEditor").contentEditable = true;
								document.getElementById("messageEditor").innerHTML = '';
							}
						} else {
							document.getElementById("messageEditor").contentEditable = true;
							document.getElementById("messageEditor").innerHTML = '';
						}
					}
				},
				error: function(msg) {}
			};
			this.base.callCommonApi(obj);
		},
		getdatas: function() {
			var _this = this;
			_this.userType = localStorage.chatAdmin;
			_this.uName = _this.$route.params.chatName;
			localStorage.chatName = _this.uName;
			if(_this.uName != '0') {
				_this.id = 1
			} else {
				_this.id = 0;
			}
			this.userMess = this.base.userMess;
			this.privateMess = this.base.privateMess;

			$('#messageEditor').click(function() {
				$('#face').slideUp();
			})
			$('#publicChat ul').children().first().clone(true).appendTo('ul');
			setInterval(function() {
				$('#publicChat ul li:first-of-type').remove();
			}, 3000)
			//			$(document).keydown(function(event) {
			//				if(event.keyCode == 13) {
			//					_this.sendMessage();
			//				}
			//			});
			this.chatStatus = this.base.chatStatus;
		},
		routerBack: function() {
			if(localStorage.turnPathName && localStorage.turnPathName != "login") {
				// this.$router.push({ name: localStorage.turnPathName });
				this.$router.go(-1)
			} else {
				this.$router.push({
					name: "index"
				});
			}

		},
		sendMessage: function() {
			var sendMes, reg
			sendMes = $('#messageEditor').html();
			for(var i = 1; i <= 55; i++) {
				reg = new RegExp('<img src="./static/images/chat/faces1/' + i + '.gif">', "g")
				sendMes = sendMes.replace(reg, '/' + i+'&')
			}
// 			var str=''+sendMes.replace(/["]/g,'\'')+'';
//      	sendMes = str.replace(/[<img src="./static/images/chat/]+/ig, "").replace(/faces1/g, "").replace(/f1/g, "").replace(/1f/g, "1").replace(/f/g, "").replace(/[.>]/ig, "&").replace(/[']/ig, "/").replace(/\/&/g, "&").replace(/&\//g, "/").replace(/([&]*$)/g, "")
			if(sendMes == '') {
				mui.toast('发送信息不能为空');
				return;
			} else if(sendMes.length > 150) {
				mui.toast('信息不能超过150个字符');
				return;
			} else {
				if(this.id == 0) {
					var arr = JSON.stringify({
						'messType': '100',
						'code': '001',
						'mess': sendMes,
						'userName': localStorage.userName
					});
				} else {
					var arr = JSON.stringify({
						'messType': '100',
						'code': '002',
						'mess': sendMes,
						'userName': localStorage.userName,
						'toUserName': this.uName,
					});
				}
				this.base.websock.send(arr);
			}
			$('#messageEditor').text('');
			$("div#face").hide();
		},
		make_face: function() {
			if(this.id == 0) {
				if(localStorage.chatAdmin != 1) {
					if(this.base.chatStatus == 1 || this.base.chatStatus == 2) {
						$("div#face").slideUp();
						return;
					}
				}
			}
			$("div#face").slideToggle(); //显示表情容器
			if($("div#face>img").length == 0) { //动态生成表情，如果现在没有表情则生成
				for(var i = 1; i <= 55; i++) { //根据表情文件数量决定循环次数，这里为50个表情
					$("div#face").append('<img src="./static/images/chat/faces1/' + i + '.gif">'); //为表情容器里添加IMG标签，并赋予src值，路径为表情文件所在路径
				}
			}
		}, // 选择表情并插入到输入框
		choice_face: function(e) {
			if(e.target.nodeName == "IMG") {
				var choice = e.target;
				var cEle = choice.cloneNode(true); //深度复制，复制节点下面所有的子节点 ，直接将整个表情的IMG标签复制，并添加到发布框的<p></p>里面
				$("div#messageEditor").append(cEle);
			}
		},
		replace_em: function(str) {
			str = str.replace(/\</g, '&lt;');
			str = str.replace(/\>/g, '&gt;');
			str = str.replace(/[\r\n]/g, "");
			//			str = str.replace(/\[em_([0-9]*)\]/g,'<img src="arclist/$1.gif" border="0" />');
			return str;
		},
		togoChatUser: function() {
			this.$router.push({
				path: '/chat/chatUser'
			});
		},
		getPrivate: function() {
			this.uName = this.$route.params.chatName;
			var userPrivate = [];
			for(var i in this.base.privateMess) {
				if(this.uName == this.base.privateMess[i].toUserName || this.base.privateMess[i].uName == this.uName) {
					userPrivate.push(this.base.privateMess[i]);
				}
			}
			this.allPrivate[this.uName] = userPrivate;
			this.userPrivate = this.allPrivate[this.uName];
		},
    clearMes:function () {
		  var _this = this;
		  // _this.userMess = [];
      // alert(_this.userMess.length);
      for(var i=0;i<_this.userMess.length;i++){
        $('#publicChat #content').find('.item').eq(i).css('display','none');
      }
    }
    
	},
	watch: {
		'userMess': function() {
			this.$nextTick(() => {
				var reg;
				if(this.userMess.length != 0) {
					if(this.userMess[this.userMess.length - 1].userType != 0) {
						var str1 = this.userMess[this.userMess.length - 1].mess.indexOf('&');
						var str =this.userMess[this.userMess.length - 1].mess.split('&');
						for(var i = 1; i <= 55; i++) {
							reg = new RegExp('/' + i +'&', "g")
							this.userMess[this.userMess.length - 1].mess = this.userMess[this.userMess.length - 1].mess.replace(reg, '<img src="./static/images/chat/faces1/' + i + '.gif">')
						}
					}
				}
				if(!document.getElementById("messageEditor")) {
					return;
				}
				var scrollHeight = $('#publicChat').prop("scrollHeight");
				$('#publicChat').scrollTop(scrollHeight, 200);
				if(this.id == 0) {
					if(localStorage.chatAdmin != 1) {
						if(this.base.chatStatus == 1 || this.base.chatStatus == 2) {
							document.getElementById("messageEditor").contentEditable = false;
							document.getElementById("messageEditor").innerHTML = '您已被禁言';
						} else if(this.base.chatStatus == 0 || this.base.chatStatus == 3) {
							document.getElementById("messageEditor").contentEditable = true;
							document.getElementById("messageEditor").innerHTML = '';
						}
					}
				}
			})
		},
		'privateMess': function() {
			this.$nextTick(() => {
				var reg;
				if(this.privateMess.length != 0) {
					if(this.privateMess[this.privateMess.length - 1].userType != 0) {
						for(var i = 1; i <= 55; i++) {
							reg = new RegExp('/' + i +'&', "g")
							this.privateMess[this.privateMess.length - 1].mess = this.privateMess[this.privateMess.length - 1].mess.replace(reg, '<img src="./static/images/chat/faces1/' + i + '.gif">')
						}
					}
				}
				var scrollHeight = $('#publicChat').prop("scrollHeight");
				$('#publicChat').scrollTop(scrollHeight, 200);
				this.getPrivate();
			})
		},
		'$route' (to, from) {
			if(to.name == "chat") {
				//				this.id = this.$route.params.id;
				//				this.uName = '所有人';
				//				$('#priChat').attr('checked', false);
				var scrollHeight = $('#publicChat').prop("scrollHeight");
				$('#publicChat').scrollTop(scrollHeight, 200);
				this.onlineAdmin = [];
				this.onlineUser = [];
				this.$nextTick(() => {
					this.getdatas();
					this.getOnlineNum();
				})
				this.getPrivate();
			} else if(from.name=="chat"){
				$('.history-hr-wrap').hide();
			}
		}
	},
};
