//数据交互
export default {
  name: "index",
  data(){
    return{
      fullName: '',
      bankAccount: '',
      bankName: '',
      bankAddress: '',
    }
  },

  created: function() {

  },

  //利用ajax来查询记录列表
  methods: {
    //路由跳转返回
    routerBack: function () {
      if (localStorage.turnPathName && localStorage.turnPathName != "login"&&!localStorage.userName) {
        // this.$router.push({ name: localStorage.turnPathName });
        this.$router.go(-1)
      } else {
        this.$router.push({ name: "index" });
      }

    },

    //绑定银行卡
    updateBank: function(fullName, bankAccount, bankName, bankAddress) {
      $("#prompt").html("");
      var _this = this;
      var uname = localStorage.getItem("userName");
      var fullNamePattern = /^[\u4e00-\u9fa5]*$/; //只能输入中文
      var bankAccountPattern = /\d{16}|\d{19}/; //银行卡号
      var bankNamePattern = /^[\u4e00-\u9fa5]*$/; //银行名字
      if(fullName == "") {
        $("#prompt").html("姓名不能为空！");
        $("#fullName").css('background-color', 'peachpuff');
        return;
      } else if(!fullNamePattern.test(fullName)) {
        $("#prompt").html("请输入中文姓名！");
        $("#fullName").css('background-color', 'peachpuff');
        return;
      } else {
        $("#fullName").css('background-color', 'white');
        if(bankAccount == "") {
          $("#prompt").html("银行卡号不能为空！");
          $("#bankAccount").css('background-color', 'peachpuff');
          return;
        } else if(!bankAccountPattern.test(bankAccount)) {
          $("#prompt").html("请输入正确的银行卡号！");
          $("#bankAccount").css('background-color', 'peachpuff');
          return;
        } else {
          $("#bankAccount").css('background-color', 'white');
          if(bankName == "") {
            $("#prompt").html("银行名字不能为空！");
            $("#bankName").css('background-color', 'peachpuff');
            return;
          } else if(!bankNamePattern.test(bankName)) {
            $("#prompt").html("请输入正确的银行名字！");
            $("#bankAccount").css('background-color', 'peachpuff');
            return;
          } else {
            $("#bankName").css('background-color', 'white');
            if(bankAddress == "") {
              $("#prompt").html("开户地址不能为空！");
              $("#bankAddress").css('background-color', 'peachpuff');
              return;
            } else {
              $("#bankAddress").css('background-color', 'white');
            }
          }
        }
      }
      var obj = {
        type: 'post',
        data: {
          "username": uname,
          "privacyStatus": 1,
          "fullName": fullName,
          "bankAccount": bankAccount,
          "bankName": bankName,
          "bankAddress": bankAddress
        },
        dataType: 'json',
        url: '/authApi/privacy/bindPrivacy',
        success: function(data) {
          if(data.code == 200) {
            console.log("设置成功！");
            localStorage.urlid = 1;
            localStorage.bankPrivacyStatus = "true";
            if(localStorage.coinPrivacyStatus == "false") {
              if(localStorage.app_flag == undefined) {
                mui.openWindow({
                  url: 'moneyPwd.html',
                  id: 'moneyPwd',
                  show: {
                    autoShow: true, //页面loaded事件发生后自动显示，默认为true
                    aniShow: 'pop-in', //页面显示动画，默认为”slide-in-right“；
                    duration: '200' //页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
                  },
                  createNew: true
                })
              } else {
                mui.openWindow({
                  url: 'moneyPwd.html',
                  id: 'moneyPwd',
                  styles: {
                    top: base.getStatusbarHeight() + 'px'
                  },
                  show: {
                    autoShow: true, //页面loaded事件发生后自动显示，默认为true
                    aniShow: 'pop-in', //页面显示动画，默认为”slide-in-right“；
                    duration: '200' //页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
                  },
                  createNew: true
                })
              }
            } else {
              if(localStorage.app_flag == undefined) {
                mui.openWindow({
                  url: 'enchashment.html',
                  id: 'enchashment',
                  show: {
                    autoShow: true, //页面loaded事件发生后自动显示，默认为true
                    aniShow: 'pop-in', //页面显示动画，默认为”slide-in-right“；
                    duration: '200' //页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
                  },
                  createNew: true
                })
              } else {
                mui.openWindow({
                  url: 'enchashment.html',
                  id: 'enchashment',
                  styles: {
                    top: base.getStatusbarHeight() + 'px'
                  },
                  show: {
                    autoShow: true, //页面loaded事件发生后自动显示，默认为true
                    aniShow: 'pop-in', //页面显示动画，默认为”slide-in-right“；
                    duration: '200' //页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
                  },
                  createNew: true
                })
              }
            }

          }
        },
        error: function(msg) {
          console.log(msg);
        }
      };
      this.base.callAuthApi(obj);
    },
  }

}
