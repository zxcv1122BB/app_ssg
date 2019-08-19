/**
 * Created by ASUS on 2017/10/9.
 */
export default{
  // el: '#main',
  name:"sfc_rxnine",
  data(){
    return {
    datas: [],       //数据
    bannerNumber: '',//场次编号
    qi: '',          //期次

    period: [],      //存放期次的数组
    prize_store: {
      sfc_prize: {},
      rxj_prize: {}
    },  //存放奖金的对象
    coinUnit: "元"
   }
  },
  created: function () {
    this.$nextTick(function () {
      if (localStorage.config) {
        this.config = JSON.parse(localStorage.getItem('config'));
        this.coinUnit = this.config.coinUnit;
      }
      this.getdatas();
      this.getperiod();

    })
  },
  methods: {
    //路由跳转返回
    routerBack: function () {
      if (localStorage.turnPathName && localStorage.turnPathName != "login") {
        // this.$router.push({ name: localStorage.turnPathName });
        this.$router.go(-1)
      } else {
        this.$router.push({ name: "index" });
      }

    },
    //获取数据
    getdatas: function () {
      var _this = this;
      if (localStorage.getItem("sfcBanner")) {
        //console.log(localStorage.getItem("sfcGame"))
        _this.datas = JSON.parse(localStorage.getItem("sfcGame"));
        _this.qi = _this.datas[0].qi;
      }
    },
    //查询期号
    getperiod: function () {
      var _this = this;
      _this.period = JSON.parse(localStorage.getItem("sfcBanner"));
      if(!_this.period){
        _this.datas = [];
        // _this.qi = _this.bannerNumber;
        $("#noMessage").show();
        $("#showMessage").hide();
        return
      }
      _this.bannerNumber = _this.period[0];
      _this.getPrizeInfo();
      _this.get();
    },
    //点击弹出选择期次
    get: function () {
      var _this = this;
      new MobileSelect({
        trigger: '#trigger3',   //触发
        title: '请选择期次',     //标题
        wheels: [               //数据源
          { data: this.period }
        ],
        position: [], //初始化定位 打开时默认选中的哪个 如果不填默认为0
        transitionEnd: function (indexArr, data) {
          //console.log(data);
        },
        callback: function (indexArr, data) {
          //console.log(data);
          _this.bannerNumber = data[0];
          _this.get1();
        }
      });
    },
    //点击选择之前期次确定按钮执行
    get1: function () {
      var _this = this;
      var data1 = {
        oneTypeId: 2,
        bannerNumber: this.bannerNumber,
        limitKey: 1
      };
      //console.log(data1);
      var obj = {
        type: 'post',
        data: data1,
        dataType: 'json',
        url: '/commonAPI/football/selectSFC',
        success: function (data) {
          //console.log(data);
          if (data.code == 200) {
            _this.datas = data.body.info;
            _this.qi = data.body.info[0].qi;
            $("#noMessage").hide();
            $("#showMessage").show();
            _this.getPrizeInfo();
          } else {
            _this.datas = [];
            _this.qi = _this.bannerNumber;
            $("#noMessage").show();
            $("#showMessage").hide();
          }
        },
        error: function (msg) {
          //console.log(msg);
        }
      };
      this.base.callCommonApi(obj);
    },
    //
    getPrizeInfo: function () {
      var _this = this;
      var data = {
        banner: this.bannerNumber
        // banner: 17177
      };
      //console.log(this.bannerNumber)
      var obj = {
        type: 'post',
        data: data,
        dataType: 'json',
        url: '/commonAPI/systranprize/selectSfcRxj',
        success: function (data) {
          if (data.code == 200) {
            if (data.body.length != 0) {
              data.body.map(function (item) {
                if (item.play_type_id == "14") {
                  _this.prize_store.sfc_prize = item;
                } else {
                  _this.prize_store.rxj_prize = item;
                }
              })
            }
          }
        },
        error: function (msg) {
          //console.log(msg);
        }
      };
      this.base.callCommonApi(obj);
    },
  }
};
