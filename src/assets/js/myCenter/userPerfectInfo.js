import Vue from 'vue'
export default {
	// el: '#main',
	name: 'userPerfectInfo',
	data() {
		return {
			userInfoList: [],
			selectuserInfoList: [],
			isOnly_Result: 1,
			coinPrivacyStatus: 0, //资金密码是否完善标记
			bankPrivacyStatus: 0, //银行卡完善标记
			isInputFlag: false,
			isOnlyFlag: false,
			isCheckFlag: false, //定义单个校验标志位
			totalIsInputFlag: 0,
			totalIsOnlyFlag: 0,
			totalIsCheckFlag: 0, //定义submit校验总标志位
			bankNameTipsFlag: false,
			bankAccountTipsFlag: false,
			bankAddressTipsFlag: false,
			password1TipsFlag: false,
			password2TipsFlag: false, //新添银行及取款校验标志位
			bankNameTipsMsg: '',
			bankAccountTipsMsg: '',
			bankAddressTipsMsg: '',
			password1TipsMsg: '',
			password2TipsMsg: '', //新添银行信息
			bankName: '',
			bankAccount: '',
			bankAddress: '',
			password1: '',
			password2: '',
			perfectMarker: 0, //个人完善信息标记


			isSh_password1:1,
			isSh_password2:1,


			//银行名称相关
			bankArea_list:[],
			bankArea_data:'',
			bN_keyword:'',
			bankID:''
		}
	},

	created: function() {
		this.initDom();
		//			var result = that.userInfoList;
	},
	mounted(){
		// setTimeout(function(){
		// 	let aa = $("#bankAddress")
		// 	aa.css("background-color","red	")
		// 	console.log(aa)
		// },5000)
	},
	methods: {
		initDom: function() {
			var that = this;
			var select = {
				type: "POST",
				data: {},
				async: false,
				dataType: 'json',
				url: "/authApi/queryUserData",
				success: function(data) {
					if(data.code == 200) {
						that.selectuserInfoList = data.body;
						that.bankName = that.selectuserInfoList.bankName;
						that.bankAccount = that.selectuserInfoList.bankAccount;
						that.bankAddress = that.selectuserInfoList.bankAddress;
						that.phoneNum = that.selectuserInfoList.PHONE_NUMBER;
						that.coinPrivacyStatus = that.selectuserInfoList.coinPrivacyStatus;
						that.bankPrivacyStatus = that.selectuserInfoList.bankPrivacyStatus;

						if(data.body.bankType){
							var list=[];
							data.body.bankType.map(function(item){
								list.push(item.itemName)
							})
							var resault = that.pySegSort(list);
							
							that.bankArea_list=list;
							that.bankArea_data=resault;
							console.log(resault)
						}else{

						}
					}
				}
			};
			this.base.callAuthApi(select);
			var localInfo = JSON.parse(localStorage.getItem('isTrue'));
			if(!localInfo) {
				obj = {
					type: "post",
					async: false,
					data: {},
					dataType: "json",
					url: "/authApi/privacy/getPrivacyStatus",
					success: function(data) {
						//console.log(data);
						if(data.code == 200) {
							localInfo = data.body;
						}
					},
					error: function(msg) {
						//console.log(msg);
					}
				};
				this.base.callAuthApi(obj);
			}

			that.$nextTick(() => {
			  if(localInfo){
          that.perfectMarker = localInfo.perfectMarker;
        }

			})

			var obj = {
				type: "POST",
				data: {
					"register_type": 1
				},
				async: false,
				dataType: 'json',
				url: "/commonAPI/querySysRegisterOptionByTypeId",
				success: function(data) {
					that.userInfoList = data.body;
					//console.log(that.userInfoList);
				}

			};

			this.base.callCommonApi(obj);
			if(that.userInfoList.length > 0) {
				for(var i in that.userInfoList) {
					that.userInfoList[i]['attr_value'] = that.selectuserInfoList[that.userInfoList[i].attr_name_en];
				}
			}
		},
		//路由跳转返回
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
		isOnly_validate: function(paramKey, paramValue) {
			var that = this;
			var obj = {
				type: "POST",
				async: false,
				data: {
					"type": paramKey,
					"value": paramValue
				},
				url: "/authApi/privacy/isOnlyValidate",
				success: function(response) {
					that.isOnly_Result = response.body;
				},
				error: function(msg) {
					//console.log("isOnly_validate : error");
					//console.log(msg);
				}
			};
			this.base.callAuthApi(obj);
		},
		/*验证银行名称必须为中文*/
		bankName_validate: function() {
			var that = this;
			that.bankNameTipsFlag = false;
			var bankNamePattern = /^[\u4e00-\u9fa5]*$/; //银行名字
			if(bankNamePattern.test(that.bankName)) {
				return true;
			}
			that.bankNameTipsFlag = true;
			that.bankNameTipsMsg = "银行名称请输入中文";
			return false;
		},
		/*校验银行账号必须为12到*/
		bankAccount_validate: function() {
			var that = this;
			that.bankAccountTipsFlag = false;
			/*var bankAccountPattern = /\d{13}|\d{21}/; //银行卡号
			if(bankAccountPattern.test(that.bankAccount)){
				return true;
			}*/
			if(!that.bankAccount || $.trim(that.bankAccount) == '') {
				that.bankAccountTipsFlag = true;
				that.bankAccountTipsMsg = '请输入银行卡卡号';
				return false;
			}
			return true;
		},
		/*校验银行地址不为空*/
		bankAddress_validate: function() {
			var that = this;
			that.bankAddressTipsFlag = false;
			/*var bankAccountPattern = /\d{13}|\d{21}/; //银行卡号
			if(bankAccountPattern.test(that.bankAccount)){
				return true;
			}*/
			if(!that.bankAddress || $.trim(that.bankAddress) == '') {
				that.bankAddressTipsFlag = true;
				that.bankAddressTipsMsg = '请输入银行绑定地址';
				return false;
			}
			return true;
		},
		/*校验两次密码是否输入一致*/
		password_validate: function() {
			var that = this;
			if(that.password1 === that.password2) {
				return true;
			}
			that.password1TipsFlag = true;
			that.password1TipsMsg = '两次密码请输入一致';
			return false;
		},
		NickNameLength_validate: function(item, index) {
			var that = this;
			var indexValue = $("#" + item.attr_name_en).val();
			if(item.is_check == 1) {
				if(indexValue.trim().length > 0 && indexValue.trim().length <= 30) {
					that.isCheckFlag = true;
					Vue.set(that.userInfoList[index], "msgTipsFlag", false);
					Vue.set(that.userInfoList[index], "isCheckFlag", true);
				} else {
					if(item.is_input == 0 && indexValue == '') {
						that.isCheckFlag = true;
						Vue.set(that.userInfoList[index], "msgTipsFlag", false);
						Vue.set(that.userInfoList[index], "isCheckFlag", true);
					} else {
						Vue.set(that.userInfoList[index], "msgTipsMsg", "请输入1-30位昵称");
						Vue.set(that.userInfoList[index], "isCheckFlag", false);
						Vue.set(that.userInfoList[index], "msgTipsFlag", true);
						that.isCheckFlag = false;
					}
				}
			} else {
				that.isCheckFlag = true;
				Vue.set(that.userInfoList[index], "msgTipsFlag", false);
				Vue.set(that.userInfoList[index], "isCheckFlag", true);
			}
			return that.isCheckFlag;
		},
		RealName_validate: function(item, index) {
			var that = this;
			var reg = /^[\u4e00-\u9fa5]+$/; //中文校验
			var indexValue = $("#" + item.attr_name_en).val();
			if(item.is_check == 1) {
				if(indexValue.length > 0 && indexValue.length <= 30 && reg.test(indexValue)) {
					that.isCheckFlag = true;
					Vue.set(that.userInfoList[index], "msgTipsFlag", false);
					Vue.set(that.userInfoList[index], "isCheckFlag", true);
				} else {
					if(item.is_input == 0 && indexValue == '') {
						that.isCheckFlag = true;
						Vue.set(that.userInfoList[index], "msgTipsFlag", false);
						Vue.set(that.userInfoList[index], "isCheckFlag", true);
					} else {
						Vue.set(that.userInfoList[index], "msgTipsMsg", "请输入中文");
						Vue.set(that.userInfoList[index], "isCheckFlag", false);
						Vue.set(that.userInfoList[index], "msgTipsFlag", true);
						that.isCheckFlag = false;
					}
				}
			} else {
				that.isCheckFlag = true;
				Vue.set(that.userInfoList[index], "msgTipsFlag", false);
				Vue.set(that.userInfoList[index], "isCheckFlag", true);
			}
			return that.isCheckFlag;
		},
		email_validate: function(item, index) {
			var that = this;
			var reg = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/; //邮箱校验
			var indexValue = $("#" + item.attr_name_en).val();
			if(item.is_check == 1) {
				if(reg.test(indexValue)) {
					that.isCheckFlag = true;
					Vue.set(that.userInfoList[index], "msgTipsFlag", false);
					Vue.set(that.userInfoList[index], "isCheckFlag", true);
				} else {
					if(item.is_input == 0 && indexValue == '') {
						that.isCheckFlag = true;
						Vue.set(that.userInfoList[index], "msgTipsFlag", false);
						Vue.set(that.userInfoList[index], "isCheckFlag", true);
					} else {
						Vue.set(that.userInfoList[index], "msgTipsMsg", "请输入正确格式的邮箱");
						Vue.set(that.userInfoList[index], "isCheckFlag", false);
						Vue.set(that.userInfoList[index], "msgTipsFlag", true);
						that.isCheckFlag = false;
					}
				}
			} else {
				that.isCheckFlag = true;
				Vue.set(that.userInfoList[index], "msgTipsFlag", false);
				Vue.set(that.userInfoList[index], "isCheckFlag", true);
			}
			return that.isCheckFlag;
		},
		PhoneNumber_validate: function(item, index) {
			var that = this;
			/*var a =item.attr_name_en;*/
			// var reg = /^1[34578]\d{9}$/;
			var reg=/^09\d{8}$/;
			var indexValue = $("#" + item.attr_name_en).val();
			if(item.is_check == 1) {
				if(reg.test(indexValue)) {
					that.isCheckFlag = true;
					Vue.set(that.userInfoList[index], "msgTipsFlag", false);
					Vue.set(that.userInfoList[index], "isCheckFlag", true);
				} else {
					if(item.is_input == 0 && indexValue == '') {
						that.isCheckFlag = true;
						Vue.set(that.userInfoList[index], "msgTipsFlag", false);
						Vue.set(that.userInfoList[index], "isCheckFlag", true);
					} else {
						Vue.set(that.userInfoList[index], "msgTipsMsg", "请输入10位且09开头正确的手机号");
						Vue.set(that.userInfoList[index], "isCheckFlag", false);
						Vue.set(that.userInfoList[index], "msgTipsFlag", true);
						that.isCheckFlag = false;
					}
				}
			} else {
				that.isCheckFlag = true;
				Vue.set(that.userInfoList[index], "msgTipsFlag", false);
				Vue.set(that.userInfoList[index], "isCheckFlag", true);
			}
			return that.isCheckFlag;
		},
		WeChat_validate: function(item, index) {
			var that = this;
			/*var a =item.attr_name_en;*/
			var reg = /^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/;
			var indexValue = $("#" + item.attr_name_en).val();
			if(item.is_check == 1) {
				if(reg.test(indexValue)) {
					that.isCheckFlag = true;
					Vue.set(that.userInfoList[index], "msgTipsFlag", false);
					Vue.set(that.userInfoList[index], "isCheckFlag", true);
				} else {
					if(item.is_input == 0 && indexValue == '') {
						that.isCheckFlag = true;
						Vue.set(that.userInfoList[index], "msgTipsFlag", false);
						Vue.set(that.userInfoList[index], "isCheckFlag", true);
					} else {
						Vue.set(that.userInfoList[index], "msgTipsMsg", "请输入5-20位正确的微信号");
						Vue.set(that.userInfoList[index], "isCheckFlag", false);
						Vue.set(that.userInfoList[index], "msgTipsFlag", true);
						that.isCheckFlag = false;
					}
				}
			} else {
				that.isCheckFlag = true;
				Vue.set(that.userInfoList[index], "msgTipsFlag", false);
				Vue.set(that.userInfoList[index], "isCheckFlag", true);
			}
			return that.isCheckFlag;
		},
		QQ_validate: function(item, index) {
			var that = this;
			/*var a =item.attr_name_en;*/
			var reg = /[1-9]([0-9]{5,16})/;
			var indexValue = $("#" + item.attr_name_en).val();
			if(item.is_check == 1) {
				if(reg.test(indexValue)) {
					that.isCheckFlag = true;
					Vue.set(that.userInfoList[index], "msgTipsFlag", false);
					Vue.set(that.userInfoList[index], "isCheckFlag", true);
				} else {
					if(item.is_input == 0 && indexValue == '') {
						that.isCheckFlag = true;
						Vue.set(that.userInfoList[index], "msgTipsFlag", false);
						Vue.set(that.userInfoList[index], "isCheckFlag", true);
					} else {
						Vue.set(that.userInfoList[index], "msgTipsMsg", "请输入5-11位数字正确的QQ号");
						Vue.set(that.userInfoList[index], "isCheckFlag", false);
						Vue.set(that.userInfoList[index], "msgTipsFlag", true);
						that.isCheckFlag = false;
					}
				}
			} else {
				that.isCheckFlag = true;
				Vue.set(that.userInfoList[index], "msgTipsFlag", false);
				Vue.set(that.userInfoList[index], "isCheckFlag", true);
			}
			return that.isCheckFlag;
		},

		isInput_validate: function(item, index) {
			var that = this;
			//is_input 必须输入
			// is_check 必须校验
			//  is_only  是否唯一
			//  attr_name_en
			if(item.is_input == 1) {
				if($("#" + item.attr_name_en).val().trim().length > 0) {
					console.info($("#" + item.attr_name_en).val())
					Vue.set(that.userInfoList[index], "isInputFlag", true);
					Vue.set(that.userInfoList[index], "msgTipsFlag", false);
					that.isInputFlag = true;
				} else {
					Vue.set(that.userInfoList[index], "isInputFlag", false);
					Vue.set(that.userInfoList[index], "msgTipsMsg", that.userInfoList[index].attr_name + "必须输入。");
					Vue.set(that.userInfoList[index], "msgTipsFlag", true);
					that.isInputFlag = false;
				}
			} else {
				Vue.set(that.userInfoList[index], "isInputFlag", true);
				Vue.set(that.userInfoList[index], "msgTipsFlag", false);
				that.isInputFlag = true;
			}
			return that.isInputFlag;
		},
		isCheck_validate: function(item, index) {
			switch(item.attr_name_en) {
				case "NICK_NAME":
					return this.NickNameLength_validate(item, index);
					break;
				case "NAME":
					return this.RealName_validate(item, index);
					break;
				case "EMAIL":
					return this.email_validate(item, index);
					break;
				case "WEIXIN":
					return this.WeChat_validate(item, index);
					break;
				case "PHONE_NUMBER":
					return this.PhoneNumber_validate(item, index);
					break;
				case "QQ":
					return this.QQ_validate(item, index);
					break;
				case "LINE":
					this.isCheckFlag = true;
					Vue.set(this.userInfoList[index], "msgTipsFlag", false);
					Vue.set(this.userInfoList[index], "isCheckFlag", true);
					return true
					// return this.LINE_validate(item, index);
					break;
				default:
					// 	this.isCheckFlag = true;
					// 	Vue.set(this.userInfoList[index], "msgTipsFlag", false);
					// 	Vue.set(this.userInfoList[index], "isCheckFlag", true);
					// return true;
					return false;
					break;
			}
		},
		isOnly_validate: function(item, index) {
			var that = this;
			//console.log("isOnly_validate接收到的参数是："+item+"|||"+index);
			var test = $("#" + item.attr_name_en).val();
			var obj = {
				type: "POST",
				async: false,
				data: {
					"type": item.attr_name_en,
					"value": $("#" + item.attr_name_en).val()
				},
				url: "/authApi/privacy/isOnlyValidate",
				success: function(response) {
					that.isOnly_Result = response.body;
					if(that.perfectMarker == 1) {
						if(item.attr_name_en == "PHONE_NUMBER" && that.phoneNum == $("#PHONE_NUMBER").val()) {
							response.body = 0;
						}
					}
					if(item.is_only == 1) {
						if(response.body == 0) {
							Vue.set(that.userInfoList[index], "isOnlyFlag", true);
							Vue.set(that.userInfoList[index], "msgTipsFlag", false);
							that.isOnlyFlag = true;
						} else {
							Vue.set(that.userInfoList[index], "isOnlyFlag", false);
							Vue.set(that.userInfoList[index], "msgTipsMsg", that.userInfoList[index].attr_name + "已被绑定");
							Vue.set(that.userInfoList[index], "msgTipsFlag", true);
							that.isOnlyFlag = false;
						}
					} else {
						Vue.set(that.userInfoList[index], "isOnlyFlag", true);
						Vue.set(that.userInfoList[index], "msgTipsFlag", false);
						that.isOnlyFlag = true;
					}
				},
				error: function(msg) {
					Vue.set(that.userInfoList[index], "isOnlyFlag", false);
					Vue.set(that.userInfoList[index], "msgTipsMsg", that.userInfoList[index].attr_name + "校验失败");
					Vue.set(that.userInfoList[index], "msgTipsFlag", true);
					that.isOnlyFlag = false;
				}
			};
			this.base.callAuthApi(obj);
			return that.isOnlyFlag;
		},

		onChange_validate: function(item, index) {
			var that = this;
			var input = that.isInput_validate(item, index);
			if(!input) {
				return false;
			}
			var check = that.isCheck_validate(item, index);
			if(!check) {
				return false;
			}

			if(item.is_only && item.is_only == 1 &&
				item.attr_name_en != 'NICK_NAME' && item.attr_name_en != 'NAME') {
				var only = that.isOnly_validate(item, index);
				if(!that.isOnlyFlag) {
					return false;
				}
			} else {
				Vue.set(that.userInfoList[index], "isOnlyFlag", true);
			}
		},

		submit_validate: function() {
			var that = this;
			//console.log(that.userInfoList);

			var perfectFlag = true;
			if(!that.coinPrivacyStatus) {
				that.password1TipsFlag = false;
				that.password2TipsFlag = false;
				if(!that.password1 || $.trim(that.password1) == '') {
					that.password1TipsFlag = true;
					that.password1TipsMsg = '请输入密码';
					perfectFlag = false;
				} else if(!that.password2 || $.trim(that.password2) == '') {
					that.password2TipsFlag = true;
					that.password2TipsMsg = '请输入密码';
					perfectFlag = false;
				} else if(!that.password_validate()) {
					perfectFlag = false;
				}
			}
			if(!that.bankPrivacyStatus) {
				that.bankNameTipsFlag = false;
				that.bankAccountTipsFlag = false;
				that.bankAddressTipsFlag = false;
				if(!that.bankAccount || $.trim(that.bankAccount) == '') {
					that.bankAccountTipsFlag = true;
					that.bankAccountTipsMsg = '请输入银行卡号';
					perfectFlag = false;
				} else if(!that.bankName || $.trim(that.bankName) == '') {
					that.bankNameTipsFlag = true;
					that.bankNameTipsMsg = "请输入银行名称";
					perfectFlag = false;
				} else if(!that.bankAddress || $.trim(that.bankAddress) == '') {
					that.bankAddressTipsFlag = true;
					that.bankAddressTipsMsg = '请输入地址';
					perfectFlag = false;
				} //else if(!that.bankName_validate()) {
					//perfectFlag = false;
				//}
			}
			for(var i = 0; i < that.userInfoList.length; i++) {
				that.onChange_validate(that.userInfoList[i], i);
			}
			that.totalIsInputFlag = 0;
			that.totalIsCheckFlag = 0;
			that.totalIsOnlyFlag = 0;
			var trueNumber = 0;
			for(var i = 0; i < that.userInfoList.length; i++) {
				if(that.userInfoList[i].is_show == 1) {
					if(that.userInfoList[i].isInputFlag) {
						that.totalIsInputFlag += 1;
					}
					if(that.userInfoList[i].isCheckFlag) {
						that.totalIsCheckFlag += 1;
					}
					if(that.userInfoList[i].isOnlyFlag) {
						that.totalIsOnlyFlag += 1;
					}
					trueNumber += 1;
				}
			}
			if(perfectFlag && that.totalIsInputFlag == trueNumber && that.totalIsCheckFlag == trueNumber && that.totalIsOnlyFlag == trueNumber) {
				var username = localStorage.getItem("userName");
				var obj = {
					type: "POST",
					data: {
						"NICK_NAME": $("#NICK_NAME").val(),
						"NAME": $("#NAME").val(),
						// "EMAIL": $("#EMAIL").val(),
						"PHONE_NUMBER": $("#PHONE_NUMBER").val(),
						"QQ": $("#QQ").val(),
						"LINE": $("#LINE").val(),
						"WEIXIN": $("#WEIXIN").val(),
						'bankName': that.bankName,
						'bankID':that.bankID,


						'bankAccount': that.bankAccount,
						'bankAddress': that.bankAddress,
						'password1': hex_md5(username + that.password1),
						'password2': hex_md5(username + that.password2),
						'coinPrivacyStatus': that.coinPrivacyStatus,
						'bankPrivacyStatus': that.bankPrivacyStatus,
						'perfectMarker': that.perfectMarker
					},
					dataType: 'json',
					url: "/authApi/userPerfectInfo",
					success: function(response) {
						//console.log("保存成功" + response.body);
						localStorage.isUserInfo = 0;
						localStorage.baseIndex = 3;
						that.$router.push({
							name: "index"
						});
					}
				};
				this.base.callAuthApi(obj);
			} else {
				mui.toast("校验不通过");
			}
		},
		//字母排序
		pySegSort(arr,empty) {
			if(!String.prototype.localeCompare)
				return null;
			 
			var letters = "*abcdefghjklmnopqrstwxyz".split('');
			var zh = "阿八嚓哒妸发旮哈讥咔垃痳拏噢妑七呥扨它穵夕丫帀".split('');
			 
			var segs = [];
			var curr;
			$.each(letters, function(i){
				curr = {letter: this, data:[],dataStr:''};
				$.each(arr, function() {
					if((!zh[i-1] || zh[i-1].localeCompare(this,"zh") <= 0) && this.localeCompare(zh[i],"zh") == -1) {
						curr.data.push(this);
						curr.dataStr+=this;
					}
				});
				if(empty || curr.data.length) {
					segs.push(curr);
					curr.data.sort(function(a,b){
						return a.localeCompare(b,"zh");
					});
				}
			});
			return segs;
		},
		//打开银行选单
		openBankArea(type){
			if(type==1){
				$("#bankArea").addClass("show");
				setTimeout(function(){
					$("#bankArea .wrap").addClass("show");
				},500)
				// var resault = data_letter_sort(list, 'py');
			}else{
				$("#bankArea .wrap").removeClass("show");
				$("#bankArea").removeClass("show");
			}
		},
		//点击选择
		sel_bankName(name){
			this.bankName=name;
			var index=this.bankArea_list.indexOf(name);
			if(index!=-1){
				this.bankID=this.selectuserInfoList.bankType[index].itemID;
				
			}else{
				mui.toast("接口异常，请刷新重试!");
			}
			this.openBankArea(0);
			
		}
	},
	watch: {
		$route(to, from) {
			if(to.name == "userPerfectInfo") {
				Object.assign(this.$data, this.$options.data())
				this.initDom();
			}
		}
	}
};
