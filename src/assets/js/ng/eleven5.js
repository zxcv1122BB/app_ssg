import {countUtils} from '../../../api/compute/bettingCountUtils';
export default {
    name: "eleven5",
    data(){
        return {
            //一级玩法
            // oneTypeId: localStorage.gameID?parseInt(localStorage.gameID):7,
            oneTypeId: 7,
            code:'11x5',
            typeNameTitle:'广东11选5', //当前玩法一级名称

            // 当前玩法名称
            title: '定位胆-定位胆',
            //右边帮助提示
            right_title: '',
            right_title1: '',
            // 记录当前玩法类型
            preventType: 'three_yard',
            // 当使用common选择区时选择项的个数是不确定的,用一个值记录,确定随机值的范围
            //      comLength: 0,
            // 公共部分选择区域是否显示上面和左边的结构
            right: true,
            top: true,
            // 投注区域显示模块管理
            bet_area_manner: {
                //万位
                myriabit: true,
                //千位
                kilobit: true,
                // 百位
                hundreds: true,
                //十位
                decade: true,
                // 个位
                unit: true,
                // 公共
                common: false,
                //公共1
                common1: false,

                // 特殊号
                special: false,
                // 龙虎
                pred: false,
            },

            //展开全部玩法
            switchoverType: false,

            //全清大小...是否显示
            multifunctionalbtn:true,

            //玩法区域
            play_area_manner: {
                //前三--直选复式
                three_yard_pre_single: {
                    isSel: false,
                    act_area: ['myriabit', 'kilobit', 'hundreds'],
                    number: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"],
                    title: '三码-前三直选复式',
                    judgeId: 118,
                    Ename: "three_yard_pre_single",
                    code3: "11x5_3m_q3zxfs",
                },
                //中三--直选复式
                three_yard_middle_single: {
                    isSel: false,
                    act_area: ['kilobit', 'hundreds', 'decade'],
                    number: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"],
                    title: '三码-中三直选复式',
                    judgeId: 119,
                    Ename: "three_yard_middle_single",
                    code3: "11x5_3m_z3zxfs",
                },
                //后三--直选复式
                three_yard_last_single: {
                    isSel: false,
                    act_area: ['hundreds', 'decade', 'unit'],
                    number: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"],
                    title: '三码-后三直选复式',
                    judgeId: 120,
                    Ename: "three_yard_last_single",
                    code3:"11x5_3m_h3zxfs"
                },
                //前三--组选复式
                three_yard_pre_group: {
                    isSel: false,
                    act_area: ['common'],
                    number: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"],
                    title: '三码-前三组选复式',
                    right_title: ['组选'],
                    judgeId: 121,
                    Ename: "three_yard_pre_group",
                    code3:"11x5_3m_q3zuXfs"
                },
                //中三--组选复式
                three_yard_middle_group: {
                    isSel: false,
                    act_area: ['common'],
                    number: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"],
                    title: '三码-中三组选复式',
                    right_title: ['组选'],
                    judgeId: 122,
                    Ename: "three_yard_middle_group",
                    code3:"11x5_3m_z3zuXfs"
                },
                //后三--组选复式
                three_yard_last_group: {
                    isSel: false,
                    act_area: ['common'],
                    number: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"],
                    title: '三码-后三组选复式',
                    right_title: ['组选'],
                    judgeId: 123,
                    Ename: "three_yard_last_group",
                    code3:"11x5_3m_h3zuXfs"
                },
                //前三--组选胆拖
                three_pre_group_duplex: {
                    isSel: false,
                    act_area: ['common', 'common1'],
                    number: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"],
                    number1: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"],
                    title: '三码-前三组选胆拖',
                    right_title: ["胆码", "拖码"],
                    judgeId: 124,
                    Ename: "three_pre_group_duplex",
                    code3:"11x5_3m_q3zuXdt"
                },
                //中三--组选胆拖
                three_middle_group_duplex: {
                    isSel: false,
                    act_area: ['common', 'common1'],
                    number: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"],
                    number1: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"],
                    title: '三码-中三组选胆拖',
                    right_title: ["胆码", "拖码"],
                    judgeId: 125,
                    Ename: "three_middle_group_duplex",
                    code3:"11x5_3m_z3zuXdt"
                },
                //后三--组选胆拖
                three_last_group_duplex: {
                    isSel: false,
                    act_area: ['common', 'common1'],
                    number: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"],
                    number1: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"],
                    title: '三码-后三组选胆拖',
                    right_title: ["胆码", "拖码"],
                    judgeId: 126,
                    Ename: "three_last_group_duplex",
                    code3:"11x5_3m_h3zuXdt"
                },

                //前二--直选复式
                two_yard_pre_single: {
                    isSel: false,
                    act_area: ['myriabit', 'kilobit'],
                    number: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"],
                    title: '二码-前二直选复式',
                    judgeId: 127,
                    Ename: "two_yard_pre_single",
                    code3:"11x5_2m_q2zxfs"
                },
                //后二--直选复式
                two_yard_last_single: {
                    isSel: false,
                    act_area: ['decade', 'unit'],
                    number: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"],
                    title: '二码-后二直选复式',
                    judgeId: 130,
                    Ename: "two_yard_last_single",
                    code3:"11x5_2m_h2zxfs"
                },
                //前二--组选复式
                two_yard_pre_group: {
                    isSel: false,
                    act_area: ['common'],
                    number: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"],
                    title: '二码-前二组选复式',
                    right_title: ['组选'],
                    judgeId: 128,
                    Ename: "two_yard_pre_group",
                    code3:"11x5_2m_q2zuXfs"
                },
                //后二--组选复式
                two_yard_last_group: {
                    isSel: false,
                    act_area: ['common'],
                    number: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"],
                    title: '二码-后二组选复式',
                    right_title: ['组选'],
                    judgeId: 131,
                    Ename: "two_yard_last_group",
                    code3:"11x5_2m_h2zuXfs"
                },
                //前二--组选胆拖
                two_pre_group_duplex: {
                    isSel: false,
                    act_area: ['common', 'common1'],
                    number: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"],
                    number1: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"],
                    title: '二码-前二组选胆拖',
                    right_title: ["胆码", "拖码"],
                    judgeId: 129,
                    Ename: "two_pre_group_duplex",
                    code3:"11x5_2m_q2zuXdt"
                },
                //后二--组选胆拖
                two_last_group_duplex: {
                    isSel: false,
                    act_area: ['common', 'common1'],
                    number: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"],
                    number1: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"],
                    title: '二码-后二组选胆拖',
                    right_title: ["胆码", "拖码"],
                    judgeId: 132,
                    Ename: "two_last_group_duplex",
                    code3:"11x5_2m_h2zuXdt"
                },

                //不定位--前三位
                noFix_three_yard_pre: {
                    isSel: false,
                    act_area: ['common'],
                    number: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"],
                    title: '不定位-前三位',
                    right_title: ['前三位'],
                    judgeId: 133,
                    Ename: "noFix_three_yard_pre",
                    code3:"11x5_bdw_q3w"
                },
                //不定位--中三位
                noFix_three_yard_middle: {
                    isSel: false,
                    act_area: ['common'],
                    number: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"],
                    title: '不定位-中三位',
                    right_title: ['中三位'],
                    judgeId: 134,
                    Ename: "noFix_three_yard_middle",
                    code3:"11x5_bdw_z3w"
                },
                //不定位--后三位
                noFix_three_yard_last: {
                    isSel: false,
                    act_area: ['common'],
                    number: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"],
                    title: '不定位-后三位',
                    right_title: ['后三位'],
                    judgeId: 135,
                    Ename: "noFix_three_yard_last",
                    code3:"11x5_bdw_h3w"
                },
                // 定位胆
                courage_static: {
                    isSel: true,
                    act_area: ['myriabit', 'kilobit', 'hundreds', 'decade', 'unit'],
                    number: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"],
                    title: '定位胆-定位胆',
                    judgeId: 136,
                    Ename: 'courage_static',
                    code3:"11x5_dwd_dwd"
                },

                //任选复式--任选一中一
                random_yard_one_one: {
                    isSel: false,
                    act_area: ['common'],
                    number: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"],
                    title: '任选复式-任选一中一',
                    right_title: ["一中一"],
                    judgeId: 137,
                    Ename: "random_yard_one_one",
                    code3:"11x5_rxfs_rx1z1"
                },
                //任选复式--任选二中二
                random_yard_two_two: {
                    isSel: false,
                    act_area: ['common'],
                    number: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"],
                    title: '任选复式-任选二中二',
                    right_title: ["二中二"],
                    judgeId: 138,
                    Ename: "random_yard_two_two",
                    code3:"11x5_rxfs_rx2z2"
                },
                //任选复式--任选三中三
                random_yard_three_three: {
                    isSel: false,
                    act_area: ['common'],
                    number: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"],
                    title: '任选复式-任选三中三',
                    right_title: ["三中三"],
                    judgeId: 139,
                    Ename: "random_yard_three_three",
                    code3:"11x5_rxfs_rx3z3"
                },
                //任选复式--任选四中四
                random_yard_four_four: {
                    isSel: false,
                    act_area: ['common'],
                    number: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"],
                    title: '任选复式-任选四中四',
                    right_title: ["四中四"],
                    judgeId: 140,
                    Ename: "random_yard_four_four",
                    code3:"11x5_rxfs_rx4z4"
                },
                //任选复式--任选五中五
                random_yard_five_five: {
                    isSel: false,
                    act_area: ['common'],
                    number: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"],
                    title: '任选复式-任选五中五',
                    right_title: ["五中五"],
                    judgeId: 141,
                    Ename: "random_yard_five_five",
                    code3:"11x5_rxfs_rx5z5"
                },
                //任选复式--任选六中五
                random_yard_six_five: {
                    isSel: false,
                    act_area: ['common'],
                    number: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"],
                    title: '任选复式-任选六中五',
                    right_title: ["六中五"],
                    judgeId: 142,
                    Ename: "random_yard_six_five",
                    code3:"11x5_rxfs_rx6z5"
                },
                //任选复式--任选七中五
                random_yard_seven_five: {
                    isSel: false,
                    act_area: ['common'],
                    number: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"],
                    title: '任选复式-任选七中五',
                    right_title: ["七中五"],
                    judgeId: 143,
                    Ename: "random_yard_seven_five",
                    code3:"11x5_rxfs_rx7z5"
                },
                //任选复式--任选八中五
                random_yard_eight_five: {
                    isSel: false,
                    act_area: ['common'],
                    number: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"],
                    title: '任选复式-任选八中五',
                    right_title: ["八中五"],
                    judgeId: 144,
                    Ename: "random_yard_eight_five",
                    code3:"11x5_rxfs_rx8z5"
                },

                //任选胆拖--任选二中二
                random_duplex_two_two: {
                    isSel: false,
                    act_area: ['common', 'common1'],
                    number: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"],
                    number1: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"],
                    title: '任选胆拖-任选二中二',
                    right_title: ["胆码", "拖码"],
                    judgeId: 145,
                    Ename: "random_duplex_two_two",
                    code3:"11x5_rxdt_rx2z2"
                },
                //任选胆拖--任选三中三
                random_duplex_three_three: {
                    isSel: false,
                    act_area: ['common', 'common1'],
                    number: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"],
                    number1: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"],
                    title: '任选胆拖-任选三中三',
                    right_title: ["胆码", "拖码"],
                    judgeId: 146,
                    Ename: "random_duplex_three_three",
                    code3:"11x5_rxdt_rx3z3"
                },
                //任选胆拖--任选四中四
                random_duplex_four_four: {
                    isSel: false,
                    act_area: ['common', 'common1'],
                    number: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"],
                    number1: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"],
                    title: '任选胆拖-任选四中四',
                    right_title: ["胆码", "拖码"],
                    judgeId: 147,
                    Ename: "random_duplex_four_four",
                    code3:"11x5_rxdt_rx4z4"
                },
                //任选胆拖--任选五中五
                random_duplex_five_five: {
                    isSel: false,
                    act_area: ['common', 'common1'],
                    number: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"],
                    number1: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"],
                    title: '任选胆拖-任选五中五',
                    right_title: ["胆码", "拖码"],
                    judgeId: 148,
                    Ename: "random_duplex_five_five",
                    code3:"11x5_rxdt_rx5z5"
                },
                //任选胆拖--任选六中五
                random_duplex_six_five: {
                    isSel: false,
                    act_area: ['common', 'common1'],
                    number: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"],
                    number1: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"],
                    title: '任选胆拖-任选六中五',
                    right_title: ["胆码", "拖码"],
                    judgeId: 149,
                    Ename: "random_duplex_six_five",
                    code3:"11x5_rxdt_rx6z5"
                },
                //任选胆拖--任选七中五
                random_duplex_seven_five: {
                    isSel: false,
                    act_area: ['common', 'common1'],
                    number: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"],
                    number1: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"],
                    title: '任选胆拖-任选七中五',
                    right_title: ["胆码", "拖码"],
                    judgeId: 150,
                    Ename: "random_duplex_seven_five",
                    code3:"11x5_rxdt_rx7z5"
                },
                //任选胆拖--任选八中五
                random_duplex_eight_five: {
                    isSel: false,
                    act_area: ['common', 'common1'],
                    number: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"],
                    number1: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"],
                    title: '任选胆拖-任选八中五',
                    right_title: ["胆码", "拖码"],
                    judgeId: 151,
                    Ename: "random_duplex_eight_five",
                    code3:"11x5_rxdt_rx8z5"
                },
            },

            // 玩法菜单管理对象    Ename通过从后台获取的数据中的id3与配置对象中的id比对然后获取相应的
            menu: [

            ],

            // common共用区域选值
            numberArr: [],
            // common1共用区域选值
            numberArr1: [],
            //万位选择项管理对象
            myriabit: [],
            //千位选择项管理对象
            kilobit: [],
            //百位选择项管理对象
            hundreds: [],
            //十位选择项管理对象
            decade: [],
            //个位选择项管理对象
            unit: [],

            // 总的注数和投注金额
            bets: 0,
            coin: 0,
            //设置位数和位数目---任选
            position_bets: 0,
            position_count: 2,
            position_maxnum: 2,
            position_list: [0, 0, 0, 0, 0],

            //是否正在切换玩法
            isChangePlayId: false,
            //机选与清空切换延迟
            isDelay: false,

            // 近期开奖
            recentPrize: [],
            // 记录用户当前的投注信息
            recentBetInfo: {},
            // 记录用户所有的投注订单信息
            BetsList: [],
            // 总注数和投注所需金额
            totalBets: 0,
            totalCoins: 0,

            history: [],
            // 目前销售期的期数和最新一期开奖
            recentlyNum: [],
            presentNum: '',
            // 单注金额
            singleCoins: "",

            // 玩法提示相关
            game_tips: '',
            win_example: '',
            win_explain: '',
            // 赔率   总概率   返奖率
            orderOdds: 95,
            orderCount: 100,
            rebate: 0,
            rebateNum: 0,
            maxOdds: 95,
            maxPrize: 9.8,
            minPrize: 8.5,
            maxReward: 13,
            commonNum: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],

            parentIndex: 0,
            chlidIndex: 0,

            present_playId: 49,


            // 当前投注期次及截止日期
            preventBanner: 0,

            // 可用余额,单笔最大投注金额
            pack_coin: '--',
                 singleMaxSum:0,
            // 追号期数
            continue_periods: 1,
            // 中奖后停止追号
            after_no: false,
            errmsg: '',
            sucmsg: '',

            //时间倒计时
            lastTime: '2018-3-16 14:10:08',
            deadlineTiming: "",
            deadlineStr: "",

            //上一期的期数
            stopBanner: "",
            //检测是否点击重复投注
            isHandleBets: false,
            //金额单位
            coinUnit: "元",

            //特殊号--赔率对应数组
            orderOddsList: [],
            //特殊号--对应单注中奖金额
            bonusSum: "",
            oddsIndexList: [],

            //暂未开售阻止投注
            bet_forbid:false,

            loginToUrl:'',

          //上期期数
          previousIssue: "",
          previousIssue_tips: "",
          //收藏
          isCollect: 0,
          //计划
          showGamePlan: 0,
          gamePlanList: [],
          nowGamePlan: "",
          gamePlanPageIndex: 1,
          //三级id
          planTypeId: "",
          //是否有计划(0-无,1-有)
          isPlan: 0,

          //是否能展开
          ableGamePlanScoll: 0,

          userName: localStorage.userName,

          singleMaxMinList:0,
        }
    },
    created: function () {
        // this.getHistoryBannerInfo();
        // this.getBetsBannerInfo();
        // this.getBetsType();
        // this.getSysConfig();
        // localStorage.lottery_id = this.oneTypeId;
        this.changeRoute();
      this.pullToRefresh.setNowThis(this);
      // this.isCollect = localStorage.collectGame && JSON.parse(localStorage.collectGame).collectList[this.oneTypeId] ? 1 : 0;
      //初始化全局变量
      // this.global_timingStorage[this.$route.name] = {};
      // this.global_timingStorage.nowName=this.$route.name;
    //   if (localStorage.userName && localStorage.indexCoinMsg) {
    //     var coinMsg = JSON.parse(localStorage.indexCoinMsg);
    //     this.pack_coin = (parseFloat(coinMsg.coin)).toFixed(2);
    //     this.user_state = "钱包:" + this.pack_coin + this.coinUnit + "(可用)";
    //     localStorage.indexCoinMsg = "";
    //     // this.get_userState();
    //   } else {
    //     this.get_userState();
    //   }
        if(localStorage.userName){
            this.get_userState();
        }
    },
    mounted: function () {
        this.initDom();
        mui('.mui-switch')['switch']();
      // this.downRefresh();
      this.pullToRefresh.setNowThis(this);
    //   var h=$(window).height(),
    //   mh=h-$('#header').height()-$('#offCanvasContentScroll>div>div:nth-child(1)').height()-$('#offCanvasContentScroll>div>div:nth-child(3)').height();
	// 	$("#mainArea").css({
	// 		height:mh
    //     });
    //     $('#mainArea>.mui-row:nth-child(1)').css({
    //     height:mh-15
    //     });
        var h=$(window).height(),
        mh=h-44-$('#offCanvasContentScroll>div>div:nth-child(1)').height()-50;
         $('#mainArea>.mui-row:nth-child(1)').css({
                height:mh-12,
        });
        $("#mainArea").css({
            height:mh+50
          });


    },
    methods: {
        changDN(){
			$('.body').toggleClass('dark');
		},
      //路由跳转返回
      routerBack: function () {
        if (localStorage.turnPathName && localStorage.turnPathName != "login"&&!localStorage.userName) {
          // this.$router.push({ name: localStorage.turnPathName });
          this.$router.go(-1)
        } else {
          this.$router.push({ name: "index" });
        }

      },
      showHis(type){
        if(type==1){
          if($('.hisWrap').is('.hide')){
            $('.record.hide').removeClass('hide');
            $('.hisWrap.hide').removeClass('hide');
            $('#offCanvasContentScroll .num .triangle').addClass('reversal');
          }else{
            $('.record').addClass('hide');
            $('.hisWrap').addClass('hide');
            $('#offCanvasContentScroll .num .triangle').removeClass('reversal');
          }


        }else{
          $('.record').addClass('hide');
          $('.hisWrap').addClass('hide');
          $('#offCanvasContentScroll .num .triangle').removeClass('reversal');
        }
      },
      after_noFn() {
        if (!this.continue_periods || this.continue_periods == 1) {
          $('.after_no .mui-checkbox input').attr("disabled", true);
        } else {
          if (typeof ($(".after_no .mui-checkbox input").attr("disabled")) !== "undefined") {
            $('.after_no .mui-checkbox input').removeAttr("disabled");
            $('.after_no .mui-checkbox input').trigger("click");
          }

        }
      },
      pulldownRefresh(_this){
        _this.get_userState(1);
      },
      //刷新
      downRefresh() {
        if ($(" .refresh").is(".isClick")) {
          return
        }
        $(" .refresh").addClass("isClick");
        this.getHistoryBannerInfo();
        this.get_userState();
        $(" .refresh").css({
          "transition": "transform 1s linear",
          "transform": "rotate(360deg)",
          "opacity": "0.5"
        });
        setTimeout(function () {
          $(" .refresh").css({
            "color": "#f67620"
          });
          $(" .refresh").css({
            "transition": "inherit",
            "transform": "rotate(0deg)",
            "opacity": "1"
          });
          $(" .refresh").removeClass("isClick");
        }, 1000)
      },
    //   downRefresh() {
    //     if ($(".banner_num .refresh").is(".isClick")) {
    //       return
    //     }
    //     $(".banner_num .refresh").addClass("isClick");
    //     this.getHistoryBannerInfo();
    //     $(".banner_num .refresh").css({
    //       "transition": "transform 1s linear",
    //       "transform": "rotate(360deg)",
    //       "opacity": "0.1"
    //     });
    //     setTimeout(function () {
    //       $(".banner_num .refresh").css({
    //         "color": "#f67620"
    //       });
    //       $(".banner_num .refresh").css({
    //         "transition": "inherit",
    //         "transform": "rotate(0deg)",
    //         "opacity": "1"
    //       });
    //       $(".banner_num .refresh").removeClass("isClick");
    //     }, 1000)
    //   },
      //收藏
      collectFn: function () {
        if (this.isCollect == 0) {
          this.isCollect = 1;
        } else {
          this.isCollect = 0;
        }
        var dataList = this.collectGame.set(this.oneTypeId);
        localStorage.collectGame = dataList ? JSON.stringify(dataList) : '';
      },
      //请求计划
    //   getPlanData: function () {
    //       return
    //     var _this = this;
    //     if (!_this.preventBanner || !_this.planTypeId || !_this.oneTypeId || _this.isPlan != 1) {
    //       return
    //     }
    //     var obj = {
    //       type: "post",
    //       data: {
    //         issue:  _this.previousIssue_tips ? _this.previousIssue : _this.preventBanner,
    //         playid: parseInt(_this.planTypeId),
    //         type: parseInt(_this.oneTypeId),
    //       },
    //       url: "/commonAPI/getPlanByTypeAndPlay",
    //       success: function (data) {
    //         if (data.code == 200) {
    //           _this.nowGamePlan = data.body.plan_content;
    //           _this.ableGamePlanScoll = 1;
    //         } else if (data.code == 201) {
    //           _this.nowGamePlan = data.msg;
    //           _this.ableGamePlanScoll = 1;
    //         } else {
    //           _this.ableGamePlanScoll=0;
    //           _this.showGamePlan = 2;
    //         }
    //       },
    //       error: function (msg) {
    //         //console.log(msg)
    //       },
    //     };
    //     this.base.callCommonApi(obj);

    //   },
      //请求计划列表
    //   getPlanDataList: function (index) {
    //     var _this = this;
    //     if (_this.ableGamePlanScoll==0){
    //       return
    //     }
    //     if (index) {
    //       // _this.gamePlanPageIndex=index;
    //       if (_this.showGamePlan == 1) {
    //         $("#gamePlanList").animate({
    //           height: '0'
    //         }, 500, function () {
    //           _this.showGamePlan = 0;
    //         });

    //         return
    //       } else {
    //         _this.showGamePlan = 1;
    //         if (_this.gamePlanList.length != 0) {
    //           $("#gamePlanList").animate({
    //             height: '11rem'
    //           }, 500);
    //           return
    //         }
    //       }
    //     }
    //     var obj = {
    //       type: "post",
    //       data: {
    //         pageNum: 5,
    //         pageIndex: _this.gamePlanPageIndex,
    //         pageSize: 10,
    //         playid: parseInt(_this.planTypeId),
    //         type: parseInt(_this.oneTypeId),
    //       },
    //       url: "/commonAPI/getPlanDate",
    //       success: function (data) {
    //         if (data.code == 200) {

    //           if (index) {
    //             _this.gamePlanList = data.body.list;
    //             $("#gamePlanList").animate({
    //               height: '11rem'
    //             }, 500);
    //           } else {
    //             data.body.list.map(function (item) {
    //               _this.gamePlanList.push(item);
    //             })
    //           }
    //         } else {
    //           //console.log(data);
    //         }
    //       },
    //       error: function (msg) {
    //         //console.log(msg)
    //       },
    //     };
    //     this.base.callCommonApi(obj);
    //   },
      // gamePlanScoll: function (e) {
      //   var index = this.gamePlanPageIndex - 1,
      //     lisLen = $("#gamePlanList li").height() * 5,
      //     ulScollTop = $("#gamePlanList").scrollTop();
      //   if ((ulScollTop < 1 && index == 0) || (ulScollTop > index * lisLen && ulScollTop < (index * lisLen + 1))) {
      //     this.gamePlanPageIndex = index + 2;
      //     this.getPlanDataList();
      //   }
      // },
    //   gamePlanScoll:function(e){
    //   var index = this.gamePlanPageIndex - 2,
    //     lisLen = $("#gamePlanList li").height() * 5,
    //     ulLen = $("#gamePlanList").height(),
    //     ulScollTop = $("#gamePlanList").scrollTop()-index*lisLen;
    //   // if ((ulScollTop < (lisLen-ulLen)&&index==0) || (ulScollTop > index * lisLen && ulScollTop < (index * lisLen+5))){
    //   if (ulScollTop>0.5&&ulScollTop > (lisLen - ulLen)){
    //     this.gamePlanPageIndex = index+3;
    //     this.getPlanDataList();
    //   }
    // },
        initDom:function(){
            var _this=this;
            var h = $(window).height() + 'px';
            var w = $(window).width() + 'px';
            // $('.mask').css({
            //     width: w,
            //     height: h,
            //     background: "rgba(0, 0, 0, 0.4)",
            //     position: "fixed",
            //     top: "0",
            //     right: "0",
            //   "z-index":11,
            // })
            // $('.play_menu').css({
            //     width: w,
            //     height: h,
            // })
            $('.pay').css({
                width: w,
                height: h,
            })
            // $('.success').css({
            //     width: w,
            //     height: h,
            // })
            // $('.mask .inner').css({
            //     width: "75%",
            //     color: "#fff",
            //     position: "absolute",
            //     top: "30%",
            //     left: "12.5%",
            //     marginRight: "-50%",

            // })
            // $('.mask.setting .inner').css({
            //     width: "85%",
            //     color: "#fff",
            //     position: "absolute",
            //     top: "20%",
            //     left: "7.5%",
            //     marginRight: "-50%",
            // })
            $('.popup').css({
                top: parseInt(h) / 2 - $('.popup').height() / 2 + "px"
            })
            // 点击近期开奖弹出近期开奖列表
            // $(".btn_banner").click(function () {
            //     $(".record").slideToggle();
            //     $(".ico").toggleClass('active');
            // })
            // 点击遮罩隐藏玩法说明弹出层
            // $("#ssc").on("click", ".mask.help", function () {
            //     $(".mask").css({ display: "none" });
            //     //$("body").css("overflow", "auto");
            // })
            // 点击玩法帮助弹出玩法说明界面
            $("#ssc").on("click", ".playTips span", function () {
                $(".mask.help").css({ display: "block" });
                $("body").css("overflow", "hidden");
            });
            $(".play_head").on("click", "li", function () {
                $(this).addClass("active").siblings("li").removeClass("active");
                $(".play_list ul").children("li").css({ display: "none" });
                $(".play_list ul").children("li").eq($(this).index()).css({ display: "block" });
                $(".play_list ul").children("li").eq($(this).index()).find(".sel:first").trigger("click");
                if ($(".play_list ul").children("li").eq($(this).index()).find(".sel").length > 1) {
                    _this.switchoverType = true;
                }
                // //console.log(_this.switchoverType);
            });

            // 点击主页面玩法按钮显示玩法选择接卖弄
            $("span.btn").click(function () {
                $(".play_menu").css({ display: "block" })
            });
            // 点击玩法选择界面的关闭按钮关闭玩法选择界面
            	$(".pay .top_head span").click(function () {
            		$(".play_menu").css({ display: "none" });
                $("#mainArea").css({ display: "block" });
            		$("#header").show();
            	});
        //     $(".success.suc .top_head span").click(function () {
        //         $(".success.suc").css({ display: "none" });
        //         $("#mainArea").css({ display: "block" });
        //         $("#header").show();
        //     });
        //     $(".success.fail .top_head span").click(function () {
        //         $(".success.fail").css({ display: "none" });
        //         $("#mainArea").css({ display: "block" });
        //       $("#header").show();

        //     });
        //   $(".success.suc .mbt").click(function () {
        //         $(".success").css({ display: "none" });
        //         $("#mainArea").css({ display: "block" });
        //         $("#header").show();
        //     });
        //     $(".success.fail .mbt").click(function () {
        //         $(".success.fail").css({ display: "none" });
        //         $("#mainArea").css({ display: "block" });
        //     });
            // 点击玩法选择界面的某一个选项时切换到改选项下
            $("#gameplayArea .play_list").on("click", ".sel", function () {
                $("#gameplayArea .play_list .active").removeClass("active");
                $(this).addClass("active");
                //      $(".play_menu").css({ display: "none" })
            });
            // 点击投注单页面关闭按钮关闭投注单
            $(".pay .top_head span").click(function () {
                $(".pay").css({ display: "none" });
                $("#mainArea").css({ display: "block" });
                $("#header").show();
            });
            // 进度条拖拽
            // $(".setting_group .btn").mousedown(function (e) {
            //     var event = event || window.event;
            //     var leftVal = event.clientX - this.offsetLeft;
            //     var that = this;
            //     // 拖动一定写到 down 里面才可以
            //     document.onmousemove = function (event) {
            //         var event = event || window.event;
            //         barleft = event.clientX - leftVal;
            //         if (barleft < 0)
            //             barleft = 0;
            //         else if (barleft > scroll.offsetWidth - bar.offsetWidth)
            //             barleft = scroll.offsetWidth - bar.offsetWidth;
            //         mask.style.width = barleft + 'px';
            //         that.style.left = barleft + "px";
            //     }
            // });
            $(".mask.menu .menu_list").click(function (event) {
                event.stopPropagation();
            })
        },

        // 获取历史开奖数据
        getHistoryBannerInfo: function () {
            var _this = this,
                obj = {
                    type: "post",
                    url: '/commonAPI/hisOpenData',
                    data: {
                        one_type_id: _this.oneTypeId,
                        count: 20,
                        isWhite: true
                    },
                    success: function (data) {
                        if (data.code == 200 && data.body && data.body.length != 0) {
                          if (_this.previousIssue && data.body[0].issue !== _this.previousIssue && _this.previousIssue_tips) {
                            _this.global_timingStorage.setOption(_this, ["getHistoryBannerInfo"], 10000, 1, _this.oneTypeId);

                          } else {
                            _this.previousIssue = data.body[0].issue;
                            _this.previousIssue_tips = "";
                            if (_this.preventBanner) {
                              //_this.getPlanData();
                            }
                          }
                            data.body.map(function (item) {
                                var list = item.luck_number.split(",");
                                item.sum = 0;
                                list.map(function (items) {
                                    item.sum += parseInt(items);
                                });
                                if (item.sum > 10) {
                                    item.size = "大"
                                } else {
                                    item.size = "小"
                                }

                                if (item.sum % 2 == 0) {
                                    item.odd_even = "双"
                                } else {
                                    item.odd_even = "单"
                                }
                            });
                            _this.history = data.body;
                            _this.recentlyNum = data.body[0].luck_number;
                            _this.presentNum = parseInt(data.body[0].issue) + 1
                        } else if(data.code!=200) {
                            _this.history = [];
                          _this.global_timingStorage.setOption(_this, ["getHistoryBannerInfo"], 10000, 1, _this.oneTypeId);
                        }
                    },
                    error: function (res) {}
                };
            this.base.callCommonApi(obj);
        },

        // 获取当前可投注期次信息
        getBetsBannerInfo: function () {
          if (!this.oneTypeId) {
            return
          }
            var _this = this,
                obj = {
                    type: "post",
                    url: '/commonAPI/getIssueInfo',
                    data: {
                        one_type_id: _this.oneTypeId,
                        isWhite: true
                    },
                    success: function (data) {
                        if (_this.deadlineTiming){
                            window.clearInterval(_this.deadlineTiming);
                            _this.deadlineTiming="";
                        }
                      _this.bet_forbid = false;
                        if (data.code == 200 && data.body) {
                            if (!data.body.deadline) {
                                _this.preventBanner = "";
                                _this.deadlineStr = "封盘";
                                return
                            }
                          if (data.body.saleStatus == "ON_SALE") {
                            _this.preventBanner = data.body.issue
                            _this.bet_forbid = false;
                            _this.noSale = false;
                            // if (!_this.nowGamePlan) {
                            //   //_this.getPlanData();
                            // }
                            // setTimeout(function () {
                            //   _this.getHistoryBannerInfo();
                            // }, 120000);
                          } else if (data.body.saleStatus == "NO_SALE") {
                            _this.preventBanner = data.body.issue;
                            _this.bet_forbid = true;
                            _this.noSale = true;
                          }

                          //近期开奖
                          if (_this.previousIssue && _this.previousIssue == data.body.previousIssue) {
                            _this.previousIssue_tips = "";
                            if (!_this.nowGamePlan) {
                              //_this.getPlanData();
                            }
                          } else {
                            _this.previousIssue = data.body.previousIssue;

                            if (data.body.previousIssue) {
                              _this.global_timingStorage.setOption(_this, ["getHistoryBannerInfo"], 10000, 1, _this.oneTypeId);
                              _this.previousIssue_tips = "开奖中...";
                              //_this.getPlanData();
                            } else {
                              _this.global_timingStorage.setOption(_this, ["getHistoryBannerInfo"], 10000, 1, _this.oneTypeId);
                              _this.previousIssue_tips = "";
                              if (!_this.nowGamePlan) {
                                //_this.getPlanData();
                              }
                            }
                          }
                            // _this.preventBanner = data.body.issue;
                            _this.lastTime = _this.getMilliseconds(data.body.deadline);
                            _this.startTime = _this.getMilliseconds(data.body.response_date);

                          //对返回的时间进行判断，看是否符合
                          if (!_this.lastTime || !_this.startTime || _this.lastTime <= _this.startTime) {
                            _this.bet_forbid = true;
                            _this.preventBanner = "";
                            _this.deadlineStr = "暂停销售";
                            if (_this.issueErr) {
                              var issList = _this.issueErr.split(",");
                              if (issList.indexOf(_this.oneTypeId) == -1) {
                                issList.push(_this.oneTypeId)
                              }
                              _this.issueErr = issList.join(",");
                            } else {
                              _this.issueErr = _this.oneTypeId;
                            }

                            return
                          }
                            _this.countdown(_this.lastTime, _this.startTime);
                            _this.deadlineTiming = setInterval(function () {
                                _this.startTime += 1000;
                                _this.countdown(_this.lastTime, _this.startTime);
                            }, 1000);
                            // setTimeout(function () {
                            //     _this.getHistoryBannerInfo();
                            // }, 120000);
                        } else if (data.code == 201) {
                            _this.bet_forbid=true;
                            _this.preventBanner = "";
                            _this.deadlineStr = data.msg;
                        } else {
                          _this.bet_forbid = true;
                            _this.preventBanner = "";
                            // _this.deadlineStr = "数据获取中...";
                            // setTimeout(function () {
                            //     _this.getBetsBannerInfo();
                            // }, 2000)
                             _this.deadlineStr = "暂停销售";

                        }
                    },
                    error: function (res) {
                        setTimeout(function(){
                            _this.getBetsBannerInfo();
                        },5000)
                    }
                };
            this.base.callCommonApi(obj);
        },




        // 获取系统配置投注项
        getBetsType: function () {
          if (!this.oneTypeId) {
            return
          }
            var _this = this,
                obj = {
                    type: "post",
                    url: '/commonAPI/qryGamePlayInfo',
                    data: {
                        one_type_id: _this.oneTypeId
                    },
                    success: function (data) {
                        if (data.code == 200 && data.body) {
                            _this.initializeBetsTypeData(data.body);
                        } else {
                            setTimeout(function () {
                                _this.getBetsType();
                            }, 5000)
                        }
                    },
                    error: function (res) {

                    }
                },
                dataList = localStorage.qryGamePlayInfo ? JSON.parse(localStorage.qryGamePlayInfo) : "",
                ots = localStorage.qryGamePlayInfoTimestamp ? JSON.parse(localStorage.qryGamePlayInfoTimestamp) : "",
                nts = localStorage.contrastTimestamp ? JSON.parse(localStorage.contrastTimestamp).gameTypeSign : "";

            //比对时间戳，看是否需要更新
          if ((!nts[_this.oneTypeId] && !ots[_this.oneTypeId] && dataList[_this.oneTypeId]) || (dataList != "" && ots != "" && nts != "" && nts != null && ots[_this.oneTypeId] && dataList[_this.oneTypeId] && ots[_this.oneTypeId] == nts[_this.oneTypeId]) && dataList[_this.oneTypeId].length != 0) {
                _this.initializeBetsTypeData(dataList[_this.oneTypeId])
            } else {
                _this.contrastTimestamp();
                this.base.callCommonApi(obj);
            }
        },
        //初始化投注项数据
        initializeBetsTypeData: function (data) {
            var _this = this,
                oneTypeArr = [],
                dataList;
          _this.menu = [];
            if (!localStorage.qryGamePlayInfo) {
                dataList = {};
                dataList[_this.oneTypeId] = data;
                localStorage.qryGamePlayInfo = JSON.stringify(dataList);
            }else{
                dataList = JSON.parse(localStorage.qryGamePlayInfo);
                dataList[_this.oneTypeId] = data;
                localStorage.qryGamePlayInfo = JSON.stringify(dataList);
            }
            data.sort(function (a, b) { return a.sort2 - b.sort2 });
          _this.gamePlayCode1 = data[0].code1 ? data[0].code1 : '';
            data.map(function (item) {
                if (!oneTypeArr.some(function (items) {
                    return items == item.name2
                })) {
                    oneTypeArr.push(item.name2)
                }
            });
            oneTypeArr.map(function (item) {
                _this.menu.push({
                    oneType: item,
                    twoType: []
                })
            });
            data.map(function (item) {
                _this.menu.map(function (items) {
                    //如果大玩法相同
                    if (items.oneType == item.name2) {
                        var Ename = '';
                        for (var key in _this.play_area_manner) {
                            if (_this.play_area_manner[key].code3 == item.code3) {
                                Ename = _this.play_area_manner[key].Ename;
                                _this.play_area_manner[key].maxPrize = item.max_prize;
                                _this.play_area_manner[key].minPrize = item.min_prize;
                                _this.play_area_manner[key].maxReward = item.max_reward;
                                _this.play_area_manner[key].id1 = item.id1;
                                _this.play_area_manner[key].id2 = item.id2;
                                _this.play_area_manner[key].id3 = item.id3;
                              _this.play_area_manner[key].is_plan = item.is_plan;
                              _this.play_area_manner[key].maxAmount = item.maxAmount;
                              _this.play_area_manner[key].minAmount = item.minAmount;

                            }
                        }
                        items.twoType.push({
                            name: item.name3,
                            Ename: Ename,
                            game_tips: item.game_tips,
                            id3: item.id3,
                            win_explain: item.win_explain,
                            win_example: item.win_example,
                            maxPrize: item.max_prize,
                            minPrize: item.min_prize,
                          maxReward: item.max_reward,

                          sort3: item.sort3
                        })
                    }
                })
            });
          _this.menu.map(function (item) {
            item.twoType.sort(function (a, b) { return a.sort3 - b.sort3 })
          });
          _this.setOrderOdds();
            _this.typeNameTitle = data[0].name1;
            _this.title = _this.menu[0]['oneType'] + '-' + _this.menu[0]['twoType'][0]['name'];
            _this.handlePlayType(_this.menu[0]['twoType'][0]['Ename']);
            _this.maxPrize = _this.menu[0]['twoType'][0]['maxPrize'];
            _this.minPrize = _this.menu[0]['twoType'][0]['minPrize'];
            _this.maxReward = _this.menu[0]['twoType'][0]['maxReward'];
            _this.orderOdds = _this.maxPrize;

          // _this.singleMaxMinList = [_this.menu[0]['twoType'][0]['minAmount'], _this.menu[0]['twoType'][0]['maxAmount']];

          //dom树初始化
          $("#gameplayArea .play_head>ul li.active").removeClass("active");
          $("#gameplayArea .play_head>ul li:first").addClass("active");

          $("#gameplayArea .play_list>ul li:first").css({
            display: "block"
          });
          $("#gameplayArea .play_list>ul li:first .type_item .sel:first").removeClass("active");
          $("#gameplayArea .play_list>ul li:first .type_item .sel:first").addClass("active");

        },
      // 固定差值=(最大赔率 - 最小赔率) / (最大返点 * 10)			保留三位小数并舍去三位以后小数
      // 当前赔率 = 最大赔率 - (固定差值 * (最大返点 - 当前返点) * 10)
      // _this.menu，play_area_manner
      setOrderOdds() {
        //重新计算赔率&& !this.rebateList
        if (localStorage.szcRebateList) {
          var _this = this, item, code1 = _this.gamePlayCode1,
            rebateList = JSON.parse(localStorage.szcRebateList);
          for (var i in rebateList) {
            if (rebateList[i].code == code1) {
              this.rebateList = rebateList[i]
              break
            }
          }

          //原始数据赔率修改
          //play_area_manner
          for (var key in _this.play_area_manner) {
            item = _this.play_area_manner[key];
            if(item.maxPrize){
              if (item.maxPrize.indexOf('|') != -1) {
                var maxList = item.maxPrize.split('|'), minList = item.minPrize.split('|'), val = "";
                maxList.map(function (items, index) {
                  var val = parseFloat((items - minList[index]) / (_this.rebateList.rebate * 10 + 1)).toFixed(3);
                  maxList[index] = parseFloat(items - (val * (_this.rebateList.rebate - _this.rebateList.nowRebate) * 10)).toFixed(3);
                });
                item.maxPrize = maxList.join("|");
              } else {
                var val = parseFloat((item.maxPrize - item.minPrize) / (_this.rebateList.rebate * 10 + 1)).toFixed(3);
                item.maxPrize = parseFloat(item.maxPrize - (val * (_this.rebateList.rebate - _this.rebateList.nowRebate) * 10)).toFixed(3);
              }
              _this.play_area_manner[key].maxPrize = item.maxPrize;
            }
          }
          //menu
					_this.menu.map(function (outItem) {
							outItem.twoType.map(function (inItem) {
							if (inItem.maxPrize.indexOf('|') != -1) {
											var maxList = inItem.maxPrize.split('|'), minList = inItem.minPrize.split('|'), val = "";
											maxList.map(function (inItems, index) {
											if(_this.rebateList.nowRebate==0){
															maxList[index] = minList[index]
											}else{
															var val = parseFloat((inItems - minList[index]) / (_this.rebateList.rebate * 10 + 1)).toFixed(3);
															maxList[index] = parseFloat(inItems - (val * (_this.rebateList.rebate - _this.rebateList.nowRebate) * 10)).toFixed(3);
											}
											})
											inItem.maxPrize = maxList.join("|");
							} else {
											if(_this.rebateList.nowRebate==0){
											inItem.maxPrize = inItem.minPrize
											}else{
											var val = parseFloat((inItem.maxPrize - inItem.minPrize) / (_this.rebateList.rebate * 10 + 1)).toFixed(3);
											inItem.maxPrize = parseFloat(inItem.maxPrize - (val * (_this.rebateList.rebate - _this.rebateList.nowRebate) * 10)).toFixed(3);
											}
							}
							})
					});

        }

      },
        //获取第一遍加载时的时间戳
        contrastTimestamp: function () {
            var _this = this,
                timeList,
                obj = {
                    type: "post",
                    url: "/commonAPI/privacy/getUpdateStatusSign",
                    data: {
                        isWhite: true
                    },
                    success: function (data) {
                        var ulist = [],
                            nlist = [],
                            oDataList, nameList = ["sysAdvpictureSign", "sysBulletinSign", "sysConfigureSign", "sysLotterySign"];
                        if (data.body) {
                            localStorage.contrastTimestamp = JSON.stringify(data.body);
                            if (localStorage.qryGamePlayInfoTimestamp) {
                                timeList = JSON.parse(localStorage.qryGamePlayInfoTimestamp);
                                timeList[_this.oneTypeId] = data.body.gameTypeSign[_this.oneTypeId];
                                localStorage.qryGamePlayInfoTimestamp = JSON.stringify(timeList);
                            } else {
                                timeList = {};
                                timeList[_this.oneTypeId] = data.body.gameTypeSign[_this.oneTypeId];
                                localStorage.qryGamePlayInfoTimestamp = JSON.stringify(timeList);
                            }
                        } else {
                            localStorage.contrastTimestamp = "";
                            setTimeout(function () {
                                _this.contrastTimestamp();
                            }, 2000);
                        }
                    },
                };
            this.base.callCommonApi(obj);
        },
        //页面跳转--返回
        // goback_click: function () {
        //     if (localStorage.app_flag == undefined) {
        //         this.$router.push({name:'index'});
        //         // window.location.href = '../../../../index.html';
        //     } else {
        //         var h = plus.webview.getLaunchWebview(); //获取首页窗口
        //         localStorage.renovate = 1; //存入变量控制首页刷新
        //         mui.fire(h, 'refresh'); //传值给首页执行的方法名
        //         setTimeout(function () { //延迟关闭本窗口，目的是给首页足够的刷新时间做判断是展开哪个页面.
        //             var ws = plus.webview.currentWebview();
        //             plus.webview.close(ws);
        //         }, 500)
        //     }
        // },

        //点击帮助
        togohelp: function () {
            if (localStorage.app_flag == undefined) {
                window.location.href = 'help.html';
            } else {
                mui.openWindow({
                    url: 'help.html',
                    id: 'help',
                    styles: {
                        top: base.getStatusbarHeight() + 'px',
                        bottom: 0
                    },
                    show: {
                        autoShow: true, //页面loaded事件发生后自动显示，默认为true
                        aniShow: 'slide-in-bottom', //页面显示动画，默认为”slide-in-right“；
                        duration: '200' //页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
                    },
                    createNew: true
                })
            }
        },
        // 获取毫秒数
        getMilliseconds: function (str) {
            str = str.replace(new RegExp("-", "gm"), "/");
            return (new Date(str)).getTime(); //得到毫秒数
        },
        //时间倒计时
        countdown: function (lastTime, startTime) {
            var _this = this,
                deadlineT = lastTime - startTime,
                deadline_hour = _this.getzf(Math.floor(deadlineT / 1000 / 60 / 60)),
                deadline_minute = _this.getzf(Math.floor(deadlineT / 1000 / 60 % 60)),
                deadline_second = _this.getzf(Math.floor(deadlineT / 1000 % 60));
            if (deadlineT >= 0) {
                _this.deadlineStr = deadline_hour + ":" + deadline_minute + ":" + deadline_second;
            } else {
                _this.deadlineStr = "正在请求数据...";

                clearInterval(_this.deadlineTiming);
                _this.deadlineTiming = "";
                _this.stopBanner = _this.preventBanner;
                // _this.getBetsBannerInfo();
              // if (_this.$route.name == _this.global_timingStorage.nowName) {
                // numberGame_countDownList
                // _this.getBetsBannerInfo();
              _this.global_timingStorage.countdown_ending(_this);
              // } else {
              //   _this.global_timingStorage[_this.global_timingStorage.nowName].numberGame_countDownList.push("getBetsBannerInfo");
              // }
            }

        },
        //补0
        getzf: function (num) {
            if (parseInt(num) < 10) {
                num = '0' + num;
            }
            return num;
        },
        //获取登录状态
      get_userState: function (isRefresh) {
            var that = this,
                userNameMsg = localStorage.userName;
        // if ((userNameMsg && that.pack_coin == 0) || (userNameMsg &&isRefresh)) {
        // if (userNameMsg) {
                // that.isLogin = true;
                var getUserInfo = {
                    type: "post",
                    url: "/authApi/getCoinForBet",
                    async: true,
                    data: {
                        "username": localStorage.getItem("userName"),
                        isWhite:true
                    },
                    success: function success(data) {
                        if (data.code == 200) {
                            that.pack_coin = (parseFloat(data.body.coin)).toFixed(2);
                            that.user_state = "钱包:" + that.pack_coin + that.coinUnit + "(可用)";
                        } else if(data.code==336){
                            localStorage.loginTo = that.loginToUrl;
                            that.turnUrl("../../myCenter/login","login");
                        }
                    }
                };
                this.base.callAuthApi(getUserInfo);
            // }
        },
        //获取系统配置
        getSysConfig: function () {
            var that=this,
                getSingleMaxSum = {
                    type: "post",
                    url: "/commonAPI/privacy/getSysConfigureResult",
                    data: {},
                    success: function (data) {
                        if (data.code == 200) {
                            localStorage.config = JSON.stringify(data.body);
                            if(data.body.coinUnit){
                                that.coinUnit=data.body.coinUnit;
                            }
                        }
                    },
                },
                config = localStorage.config ? JSON.parse(localStorage.config) : '';
            if (config == "" || !config.coinUnit) {
                this.base.callCommonApi(getSingleMaxSum);
            } else {
                that.coinUnit = config.coinUnit;
                //                  that.singleMaxSum = config.singleMaxSum;
            }
        },
        //追期数限制
        handleChase: function () {
          var num = this.continue_periods;
          if (typeof(num) == "string") {
            num = num.replace(/\D+/g, '');
          }
          if (num && num < 1) {
            num = 1;
          }
          if (num && num > 10) {
            num = 10;
          }
          this.continue_periods = num;
        },
        // 点击玩法提示显示相应的玩法提示内容
        handleShowRule: function () {
        //   $(".mask.menu").trigger("click");
        //   $(".mask.help").css({ display: "block" });
        //   $("body").css("overflow", "hidden");
        //   $(".mask.help").css({ display: "block" });
        //         $("body").css("overflow", "hidden");
            var _this = this;
            _this.menu.map(function (item) {
                item.twoType.map(function (items) {
                    if (items.Ename == _this.preventType) {
                        _this.game_tips = items['game_tips'];
                        _this.win_explain = items['win_explain'];
                        _this.win_example = items['win_example'];
                    }
                })
            });
            // mui('#topPopover').popover('toggle');
            // mui('#topPopover_tips').popover('toggle');
            this.showMenu();
        this.closeMenu();
        },
        // 投注选择界面点击提交执行
        handleSubmit: function () {
            this.singleCoins = "";
          this.$emit('isShowMaskWrapper', true);
          this.isHandleSubmitClick = true;
            if (this.bets&&!this.bet_forbid) {
                // if (!this.isLogin) {
                    // this.get_userState();
                // }
                if (localStorage.userName == undefined) {
                    localStorage.loginTo = this.loginToUrl;
                    this.turnUrl("../../myCenter/login","login");
                } else if (localStorage.userName && this.pack_coin == 0) {
                    if ($(".popup").css("display") == "none") {
                        $(".popup").css({display: "block"}).addClass('ani')
                    }
                    $(".mask.menu").css({display: "block"});
                    $(".menu_list").css({display: "none"});
                  // this.get_userState();
                  this.$emit('isShowMaskWrapper', false)
                  this.isHandleSubmitClick = false;

                } else {
                  $(".mask.setting").css({display: "block"});
                  this.$emit('isShowMaskWrapper', false)
                  this.isHandleSubmitClick = false;
                }
            }else{
              this.$emit('isShowMaskWrapper', false)
              this.isHandleSubmitClick = false;
            }
        },
        turnUrl: function (url,name) {
            // if (localStorage.app_flag == undefined) {
                this.$router.push({name: name});
            // } else {
            //     mui.openWindow({
            //         url: url,
            //         id: 'url',
            //         styles: {
            //             top: base.getStatusbarHeight() + 'px',
            //             bottom: 0
            //         },
            //         show: {
            //             autoShow: true, //页面loaded事件发生后自动显示，默认为true
            //             aniShow: 'pop-in', //页面显示动画，默认为”slide-in-right“；
            //             duration: '200' //页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
            //         },
            //         createNew: true
            //     })
            // }
        },
        // 改变返奖率
        changeRebate: function () {
            this.rebate = (this.rebateNum * (this.maxReward / 100)).toFixed(3);
            this.orderOdds = (this.maxPrize - ((this.maxPrize - this.minPrize) / this.maxReward * this.rebate)).toFixed(3);
        },
        handleCoins: function () {
          var num = this.singleCoins;
          if (typeof (num) == "string") {
            num = num.trim().replace(/\D+/g, '')
          }

          if (num && num < 1) {
            num = 1;
          }
          this.singleCoins = num;
        },
        //订单设置界面取消按钮执行
        handleCancel: function () {
            var _this = this,
                typeName = _this.preventType;
            //重置进度条
            _this.maxPrize = _this.play_area_manner[typeName].maxPrize;
            _this.minPrize = _this.play_area_manner[typeName].minPrize;
            _this.maxReward = _this.play_area_manner[typeName].maxReward;
            // _this.orderOdds = _this.play_area_manner[typeName].maxPrize;
            _this.rebateNum = 0;
            _this.rebate = 0;
          _this.changeRebate();

            $(".mask.setting").css({
                display: "none"
            });
        },
        //订单设置界面确定按钮
        handleConfirm: function () {
            var _this = this,
                id3 = _this.present_playId,
                typeName = _this.preventType;
          var countSum = _this.singleCoins, contrastList = _this.singleMaxMinList, tipsStr = "(总额)";
            countSum = countSum * _this.bets;

          if (contrastList) {
            if (parseInt(countSum) < parseInt(contrastList[0])) {
              mui.toast('单笔投注' + tipsStr + '不可小于' + contrastList[0], { duration: 'long', type: 'div' })
              return 1;
            } else if (parseInt(countSum) > parseInt(contrastList[1])) {
              mui.toast('单笔投注' + tipsStr + '不可超过' + contrastList[1], { duration: 'long', type: 'div' })
              return 1;
            }
          }
            if (_this.recentBetInfo.betsCount && _this.singleCoins > 0) {
              if (_this.BetsList.length != 100) {
                _this.BetsList.unshift({
                    type: _this.recentBetInfo.type,
                    betsCount: _this.bets,
                    betsClause: _this.recentBetInfo.betsClause.join("|"),
                    betsCoins: _this.singleCoins * _this.bets,
                    id3: _this.play_area_manner[_this.preventType].id3,
                    id2: _this.play_area_manner[_this.preventType].id2,
                    id1: _this.play_area_manner[_this.preventType].id1,
                    odds: _this.orderOdds,
                    banner: _this.preventBanner,
                    singleCoin: _this.singleCoins,
                    rebate: _this.rebate,
                });

              }
            //   else {
            //     mui.toast("已达投注长度上限，请先投注")
            //   }
                //重置进度条
                _this.maxPrize = _this.play_area_manner[typeName].maxPrize;
                _this.minPrize = _this.play_area_manner[typeName].minPrize;
                _this.maxReward = _this.play_area_manner[typeName].maxReward;
                _this.orderOdds = _this.play_area_manner[typeName].maxPrize;
                _this.rebateNum = 0;
                _this.rebate = 0;

                $(".mask.setting").css({display: "none"});
                $(".pay").css({display: "none"});
                // $("#mainArea").css({display: "none"});
                _this.handleBetsCoins();
                _this.clearSelOptions();
                //存储localstorage
                // localStorage.elev5BetsList=JSON.stringify(_this.BetsList);
                _this.stopBanner = "";
                _this.singleCoins = "";
                // $("#header").hide();
              _this.handleBets();
            }else{
                mui.toast("请投注");
                return 1;
              }
        },
        // 清除所有订单
        handleClearAll: function () {
            var _this = this;
            this.BetsList = [];
            _this.totalBets = 0;
            _this.totalCoins = 0;
            _this.tempCoins = 0;
            _this.handleBetsCoins();
        },

        //管理玩法的函数    传递一个玩法名称激活play_area_manner中对应的值,选择某一玩法时初始化某些数据
        handlePlayType: function (typeName) {
            var _this = this,
                nameList = ["myriabit", "kilobit", "hundreds", "decade", "unit"];
            _this.isChangePlayId = true;
            _this.switchoverType = false;
            // if (!$(".record").is(':visible')) {
            //     $(".record").hide();
            //     $(".ico").toggleClass('active');
            // }
            for (var key in _this.play_area_manner) {
                _this.play_area_manner[key].isSel = false;
            }
            _this.preventType = typeName;
            _this.play_area_manner[typeName].isSel = true;
            _this.title = _this.play_area_manner[typeName].title;
            _this.maxPrize = _this.play_area_manner[typeName].maxPrize;
            _this.minPrize = _this.play_area_manner[typeName].minPrize;
            _this.maxReward = _this.play_area_manner[typeName].maxReward;
            _this.orderOdds = _this.play_area_manner[typeName].maxPrize;
            _this.rebateNum = 0;
            _this.rebate = 0;
            _this.present_playId = _this.play_area_manner[typeName].judgeId;
          _this.planTypeId = _this.play_area_manner[typeName].id3;
          _this.isPlan = _this.play_area_manner[typeName].is_plan;
          _this.singleMaxMinList = [_this.play_area_manner[typeName].minAmount, _this.play_area_manner[typeName].maxAmount];

          _this.gamePlanPageIndex = 1;
         _this.showGamePlan =0;
      _this.gamePlanList=[];
            if (this.play_area_manner[typeName].right != undefined) {
                _this.right = this.play_area_manner[typeName].right;
            }
            if (this.play_area_manner[typeName].top != undefined) {
                _this.top = this.play_area_manner[typeName].top;
            }
            if (this.play_area_manner[typeName].right_title != undefined) {
                _this.right_title = this.play_area_manner[typeName].right_title;
            }
            if (this.play_area_manner[typeName].right_title1 != undefined) {
                _this.right_title1 = this.play_area_manner[typeName].right_title1;
            }
            if (this.play_area_manner[typeName].right_title_two != undefined) {
                _this.right_title_two = this.play_area_manner[typeName].right_title_two;
            }
            if (_this.play_area_manner[typeName].number) {
                _this.numberArr = [];
                //              _this.comLength = _this.play_area_manner[typeName].number.length;
                _this.play_area_manner[typeName].number.map(function (item) {
                    _this.numberArr.push({
                        'num': item,
                        isSel: false
                    })
                })
            } else {
                _this.numberArr = [];
            }
            if (_this.play_area_manner[typeName].number1) {
                _this.numberArr1 = [];
                //              _this.comLength = _this.play_area_manner[typeName].number1.length;
                _this.play_area_manner[typeName].number1.map(function (item) {
                    _this.numberArr1.push({
                        'num': item,
                        isSel: false
                    })
                })
            } else {
                _this.numberArr1 = [];
            }

            nameList.map(function (item) {
                _this.initial_value(typeName, item);
            });

            var jd = _this.present_playId;


            if(jd == 124 || jd==125 ||jd==126 || jd==132 || jd==145|| jd==146 || jd==147 || jd==148 || jd==149 || jd==150 || jd==151){
                _this.multifunctionalbtn = false;

            }else {
                _this.multifunctionalbtn =true;
            }
            // 显示要显示的投注区域
            _this.handleAreaShow(_this.play_area_manner[typeName].act_area);
            // 初始化数据
            _this.clearSelOptions();
            //          if(_this.switchoverType){
            //          	_this.switchoverType=false;
            //          }
            setTimeout(function () {
                _this.isChangePlayId = false;
            }, 100);
          //请求计划
          if (_this.preventBanner) {
            //_this.getPlanData();
          }
        },
        //初始化numberArr,myriabit,kilobit,hundreds,decade,unit区域数组选值
        initial_value: function (typeName, items) {
            var _this = this,
                arrList = _this.play_area_manner[typeName].number;
            _this[items] = [];
            arrList.map(function (item) {
                _this[items].push({
                    'num': item,
                    isSel: false
                })
            })
        },
        // 设置bet_area_manner,投注区域要显示的模块
        handleAreaShow: function (arr) {
            var _this = this;
            // 重置
            $(".btn-random span").text("机选")
            for (var key in _this.bet_area_manner) {
                _this.bet_area_manner[key] = false;
            }
            arr.map(function (item) {
                _this.bet_area_manner[item] = true;
            })
        },

        //显示大球(触摸事件)
        showBigSelectBall(event,item,index,type){
        //   if (event && item.isSel != true){
        //         event=event.currentTarget;
        //     $(event).css({
        //       background: 'url("./static/images/ball/anjian_hong.png")',
        //       backgroundSize: "contain",
        //       backgroundRepeat: "no-repeat",

        //       color: "#fff",
        //       border: "none",
        //       width: "4rem",
        //       height: "6rem",
        //       top: "-3.7rem",
        //       left: "1.3rem",
        //       lineHeight: "4rem",
        //       boxShadow: "none",
        //       fontSize: "1.5rem",
        //       paddingRight: ".2rem",
        //     });
        //     }

            this.handleAddClass(item, index, type);
        },
        //隐藏大球(离开事件)
        hideBigSelectBall(event){
            if (event) {
                event = event.currentTarget;
            }
            if(event){
              $(event).attr('style','');
            }
            // setTimeout(function(){
            //     if(event){
            //         $(event)[0].style = "";
            //     }
            // },500)

        },

        // 点击元素时给元素加上选中的类  可能还要在这里调用自动计算注数的方法
        handleAddClass: function (item, index, type) {
            var _this = this,
                id3 = _this.present_playId;
            switch (id3) {
                case 124: //三码-前三胆拖
                case 125: //三码-中三胆拖
                case 126: //三码-后三胆拖
                case 146://任选胆拖-三中三
                    _this.duplexBetsCount(item, 2, index, type);
                    break;

                case 129://二码-前二胆拖
                case 132://二码-后二胆拖
                case 145://任选胆拖-二中二
                    _this.duplexBetsCount(item, 1, index, type);
                    break;

                case 147://任选胆拖-四中四
                    _this.duplexBetsCount(item, 3, index, type);
                    break;
                case 148://任选胆拖-五中五
                    _this.duplexBetsCount(item, 4, index, type);
                    break;
                case 149://任选胆拖-六中五
                    _this.duplexBetsCount(item, 5, index, type);
                    break;
                case 150://任选胆拖-七中五
                    _this.duplexBetsCount(item, 6, index, type);
                    break;
                case 151://任选胆拖-八中五
                    _this.duplexBetsCount(item, 7, index, type);
                    break;

                default:
                    item.isSel = !item.isSel;
                    return;
                    break;
            }

        },
        //胆拖投注计算
        duplexBetsCount: function (item, num, index, type) {
            var listName = ["numberArr", "numberArr1"],
                _this = this,
                count = 0,
                onum;
            _this.numberArr.map(function (item) {
                if (item.isSel) {
                    count++
                }
            });

            if (count == num && type == 0 && !_this.numberArr[index].isSel) {
                for (var i = 0, len = _this.numberArr.length; i < len; i++) {
                    var obj = _this.numberArr[i].isSel;
                    if (obj) {
                        _this.numberArr[i].isSel = false;
                        onum = _this.numberArr[i].num;
                        break;
                    }
                }

            }
            if (type == 1 && _this.numberArr[index].isSel && !_this.numberArr1[index].isSel) {
                _this.numberArr[index].isSel = false;
                _this.numberArr1[index].isSel = true;
            } else if (type == 0 && !_this.numberArr[index].isSel && _this.numberArr1[index].isSel) {
                _this.numberArr1[index].isSel = false;
                _this.numberArr[index].isSel = true;
            } else {
                if (onum != item.num) {
                    item.isSel = !item.isSel;
                }

            }
        },

        // 清楚选中数据项
        clearSelOptions: function () {
          var _this = this, list = ['myriabit', 'kilobit', 'hundreds', 'decade', 'unit', "numberArr",'numberArr1'];
          for (var i in list) {
            if (_this[list[i]]) {
              _this[list[i]].map(function (item) {
                item.isSel = false;
                if (item.numArr) {
                  item.numArr = [];
                }
              })
            }
          }
            // _this.myriabit.map(function (item) {
            //     item.isSel = false;
            // });
            // _this.kilobit.map(function (item) {
            //     item.isSel = false;
            // });
            // _this.hundreds.map(function (item) {
            //     item.isSel = false;
            // });
            // _this.decade.map(function (item) {
            //     item.isSel = false;
            // });
            // _this.unit.map(function (item) {
            //     item.isSel = false;
            // });
            // _this.numberArr.map(function (item) {
            //     item.isSel = false;
            //     if (item.numArr) {
            //         item.numArr = [];
            //     }

            // });
            // _this.numberArr1.map(function (item) {
            //     item.isSel = false;
            //     if (item.numArr) {
            //         item.numArr = [];
            //     }

            // });
            //          _this.comLength = 0;
            _this.bets = 0;
            _this.rebateNum = 0;
            _this.rebate = 0;
            //          $(".btn-random span").text("机选")
        },

        //机选---清空
        random_or_clear: function (event) {
            var _this = this;
            event = event.currentTarget;
            if (_this.isDelay) {
                return
            }
            _this.isDelay = true;
            if ($(event).is('.clearAllBtn')) {
                _this.clearSelOptions();
                setTimeout(function () {
                    _this.isDelay = false;
                }, 200)
            } else {
                _this.clearSelOptions();
                _this.randomData();
                setTimeout(function () {
                    _this.isDelay = false;
                }, 200)
            }
        },
        randomData: function () {
            var _this = this,
                listName = ['myriabit', 'kilobit', 'hundreds', 'decade', 'unit', "numberArr", "numberArr1"],
                len = 0,
                inIndexList = [],
                index,
                times = 1,
                areaList,
                id3 = _this.present_playId;
            switch (id3) {
                //三码
                case 118: //三码-前三直选复式
                    areaList = [1, 1, 1, 0, 0, 0, 0];
                    break;
                case 119: //三码-中三直选复式
                    areaList = [0, 1, 1, 1, 0, 0, 0];
                    break;
                case 120: //三码-后三直选复式
                    areaList = [0, 0, 1, 1, 1, 0, 0];
                    break;
                case 121: //三码-前三组选复式
                case 122: //三码-中三组选复式
                case 123: //三码-后三组选复式
                case 139://任选-三中三
                    areaList = [0, 0, 0, 0, 0, 1, 0];
                    times = 3;
                    break;
                case 124: //三码-前三胆拖
                case 125: //三码-中三胆拖
                case 126: //三码-后三胆拖
                case 146://胆拖-三中三
                    areaList = [0, 0, 0, 0, 0, 1, 1];
                    times = 2;
                    break;
                case 129://前二-组选胆拖
                case 132://后二-组选胆拖
                case 145://胆拖-二中二
                    areaList = [0, 0, 0, 0, 0, 1, 1];
                    break;

                case 140://任选-四中四
                    areaList = [0, 0, 0, 0, 0, 1, 0];
                    times = 4;
                    break;
                case 141://任选-五中五
                    areaList = [0, 0, 0, 0, 0, 1, 0];
                    times = 5;
                    break;
                case 142://任选-六中五
                    areaList = [0, 0, 0, 0, 0, 1, 0];
                    times = 6;
                    break;
                case 143://任选-七中五
                    areaList = [0, 0, 0, 0, 0, 1, 0];
                    times = 7;
                    break;
                case 144://任选-八中五
                    areaList = [0, 0, 0, 0, 0, 1, 0];
                    times = 8;
                    break;
                case 147://胆拖-四中四
                    areaList = [0, 0, 0, 0, 0, 1, 1];
                    times = 3;
                    break;
                case 148://胆拖-五中五
                    areaList = [0, 0, 0, 0, 0, 1, 1];
                    times = 4;
                    break;
                case 149://胆拖-六中五
                    areaList = [0, 0, 0, 0, 0, 1, 1];
                    times = 5;
                    break;
                case 150://胆拖-七中五
                    areaList = [0, 0, 0, 0, 0, 1, 1];
                    times = 6;
                    break;
                case 151://胆拖-八中五
                    areaList = [0, 0, 0, 0, 0, 1, 1];
                    times = 7;
                    break;

                //二码
                case 127://前二-直选复式
                    areaList = [1, 1, 0, 0, 0, 0, 0];
                    break;
                case 130://后二-直选复式
                    areaList = [0, 0, 0, 1, 1, 0, 0];
                    break;
                case 128://前二-组选复式
                case 131://后二-组选复式
                case 138://任选-二中二
                    areaList = [0, 0, 0, 0, 0, 1, 0];
                    times = 2;
                    break;
                case 136://定位胆
                    areaList = [1, 1, 1, 1, 1, 0, 0];
                    break;
                default:
                    areaList = [0, 0, 0, 0, 0, 1, 0];
                    break;
            }
            if (id3 == 136) {
                len = _this[listName[0]].length;
                for (var j = 0; j < len; j++) {
                    inIndexList.push(j);
                }
                _this[listName[parseInt(Math.random() * 5)]][inIndexList[parseInt(Math.random() * inIndexList.length)]].isSel = true;
                return
            }
            for (var i = 0; i < areaList.length; i++) {
                if (areaList[i] == 1) {
                    if (len == 0) {
                        len = _this[listName[i]].length;
                        for (var j = 0; j < len; j++) {
                            inIndexList.push(j);
                        }
                    }
                    if (areaList[6] == 1 && i == 5) {
                        index = parseInt(Math.random() * inIndexList.length);
                        _this[listName[i]][inIndexList[index]].isSel = true;
                        inIndexList.splice(index, 1)
                    } else {
                        for (var m = 0; m < times; m++) {
                            index = parseInt(Math.random() * inIndexList.length);
                            _this[listName[i]][inIndexList[index]].isSel = true;
                            inIndexList.splice(index, 1)
                        }
                    }


                }
            }
        },
      //全大小单双清--按钮
      multifunctional_btnClick: function (type, index) {
        var listName = ["myriabit", "kilobit", "hundreds", "decade", "unit", "numberArr"],
          _this = this,
          len = _this[listName[type]].length / 2;
        switch (index) {
          case 0: //全
            _this[listName[type]].map(function (item) {
              item.isSel = true;
            });
            break;
          case 1: //大
            _this[listName[type]].map(function (item, index) {
              if (index >= len) {
                item.isSel = true;
              } else {
                item.isSel = false;
              }
            });
            break;
          case 2: //小
            _this[listName[type]].map(function (item, index) {
              if (index < len) {
                item.isSel = true;
              } else {
                item.isSel = false;
              }
            });
            break;
          case 3: //单
            _this[listName[type]].map(function (item, index) {
              if (item.num % 2 != 0) {
                item.isSel = true;
              } else {
                item.isSel = false;
              }
            });
            break;
          case 4: //双
            _this[listName[type]].map(function (item, index) {
              if (item.num % 2 == 0) {
                item.isSel = true;
              } else {
                item.isSel = false;
              }
            });
            break;
          case 5: //清
            _this[listName[type]].map(function (item) {
              item.isSel = false;
            });
            break;
        }
      },
        // multifunctional_btnClick: function (indexs, event) {
        //     var _this = this,
        //         event = event.currentTarget,
        //         selList = $(event).parents(".bet_area_item").find(".second li span.sel_num"),
        //         noselList = $(event).parents(".bet_area_item").find(".second li span:not('.sel_num')"),
        //         allLIst = $(event).parents(".bet_area_item").find(".second li span"),
        //         len = allLIst.length / 2;
        //     switch (indexs) {
        //         case 0: //全
        //             noselList.map(function (item, index) {
        //                 $(index).trigger('touchstart');
        //             });
        //             break;
        //         case 1: //大
        //             selList.map(function (item, index) {
        //                 $(index).trigger('touchstart');
        //             });
        //             allLIst.map(function (item, index) {
        //                 if ($(index).attr("data-index") >= len) {
        //                     $(index).trigger('touchstart');
        //                 }
        //             });
        //             break;
        //         case 2: //小
        //             selList.map(function (item, index) {
        //                 $(index).trigger('touchstart');
        //             });
        //             allLIst.map(function (item, index) {
        //                 if ($(index).attr("data-index") < len) {
        //                     $(index).trigger('touchstart');
        //                 }
        //             });
        //             break;
        //         case 3: //单
        //             selList.map(function (item, index) {
        //                 $(index).trigger('touchstart');
        //             });
        //             allLIst.map(function (item, index) {
        //                 if (parseInt($(index).html()) % 2 != 0) {
        //                     $(index).trigger('touchstart');
        //                 }
        //             });
        //             break;
        //         case 4: //双
        //             selList.map(function (item, index) {
        //                 $(index).trigger('touchstart');
        //             });
        //             allLIst.map(function (item, index) {
        //                 if (parseInt($(index).html()) % 2 == 0) {
        //                     $(index).trigger('touchstart');
        //                 }
        //             });
        //             break;
        //         case 5: //清
        //             selList.map(function (item, index) {
        //                 $(index).trigger('touchstart');
        //             });
        //             break;
        //     }
        // },
        //
        selectInput: function (event) {
            event = event.currentTarget;
            if ($(event).find("input").is(':checked')) {
                $(event).find("input").prop("checked", false);
            } else {
                $(event).find("input").prop("checked", true);
            }
            this.positionClk();
        },
        //底下位数checkbox的点击事件
        positionClk: function () {
            var count = 0,
                _this = this;
            var str = "",
                nameList = ["万位", "千位", "百位", "十位", "个位"];

            if (_this.recentBetInfo.betsClause) {
                _this.position_list.map(function (item, index) {
                    if (item == 1) {
                        str += nameList[index] + ",";
                    }
                });
                str = "(" + str.substring(0, str.length - 1) + ")";
                _this.recentBetInfo.betsClause[0] = _this.recentBetInfo.betsClause[0].replace(str, "");
            }

            $("#mainArea .labelList input[type='checkbox']").map(function (item) {
                if ($($("#mainArea .labelList input[type='checkbox']")[item]).is(':checked')) {
                    count++;
                    _this.position_list[item] = 1;
                } else {
                    _this.position_list[item] = 0;
                }
            })
            if (_this.recentBetInfo.betsClause) {
                str = "";
                _this.position_list.map(function (item, index) {
                    if (item == 1) {
                        str += nameList[index] + ",";
                    }
                });
                str = "(" + str.substring(0, str.length - 1) + ")";
                _this.recentBetInfo.betsClause[0] = str + _this.recentBetInfo.betsClause[0];
            }
            _this.position_count = count;
            if (count < _this.position_maxnum) {
                _this.bets = 0;
            } else {
                _this.bets = countUtils.getBcGroupMix_cqssc(count, _this.position_maxnum) * _this.position_bets;
                //      		_this.bets=_this.position_bets;
            }
            //      	var _this=this;
            //      	event=event.currentTarget;
            //      	$(event).find("input").prop("checked","checked");
        },

        // 将投注信息记录到当前投注信息记录对象中  传递一个用户选择项的数组,一维字符串数组
        handleRecodeInfo: function (seloptArr) {
            var _this = this;
            _this.recentBetInfo = {};
            _this.recentBetInfo.type = _this.play_area_manner[_this.preventType]["title"];
            //          _this.recentBetInfo.betsCount = _this.bets;
            _this.recentBetInfo.betsClause = [];
            seloptArr.map(function (item) {
                _this.recentBetInfo.betsClause.push(item);
            })
            //          _this.recentBetInfo.betsCoins = _this.bets * _this.singleCoins
        },

        // 统计某一个选择区中的选中项的值 传递选择区的管理对象
        handleAreaSelNum: function (opt) {
            var tempArr = [];
            opt.map(function (item) {
                if (item.isSel) {
                    tempArr.push(item.num);
                }
            })
            return tempArr;
        },

        //机选按钮--根据参数决定机选注数
        getAppointBets: function (index) {
            var _this = this,
                id3 = _this.present_playId;
          if (_this.BetsList.length == 100) {
            mui.toast("已达投注长度上限，请先投注");
            return
          } else if (_this.BetsList.length > 95) {
            index = 100 - _this.BetsList.length
          }
            for (var i = 0; i < index; i++) {
                _this.clearSelOptions();
                _this.randomData();
                _this.count_betNumber();
                _this.BetsList.unshift({
                    type: _this.recentBetInfo.type,
                    betsCount: _this.recentBetInfo.betsCount,
                    betsClause: _this.recentBetInfo.betsClause.join("|"),
                    betsCoins: _this.singleCoins * _this.recentBetInfo.betsCount,
                    id3: _this.play_area_manner[_this.preventType].id3,
                    id2: _this.play_area_manner[_this.preventType].id2,
                    id1: _this.play_area_manner[_this.preventType].id1,
                    odds: _this.orderOdds,
                    banner: _this.preventBanner,
                    singleCoin: _this.singleCoins,
                    rebate: _this.rebate
                });
                _this.handleBetsCoins();
                _this.clearSelOptions();
            }
            // localStorage.elev5BetsList=JSON.stringify(_this.BetsList);
        },

        // 统计对象中选中的元素个数
        totalCountsHandler: function (opt) {
            var count = 0;
            opt.map(function (item) {
                if (item.isSel) {
                    count++;
                }
            });
            return count;
        },
        //计算数目
        //参数list，依次对应listName,0--不需，1--需要，index为通过计算注数的条件,
        count_TotalLength: function (list, index, type) {
            var listName = ['myriabit', 'kilobit', 'hundreds', 'decade', 'unit', "numberArr", "numberArr1"],
                rList = [0, 0, 0, 0, 0, 0, 0],
                strList = ["", "", "", "", "", "", ""],
                saveList = [],
                count = 0,
                _this = this;
            for (var i = 0; i < list.length; i++) {
                if (list[i] === 1) {
                    rList[i] = _this.totalCountsHandler(_this[listName[i]]);
                    if (rList[i]) {
                        count++;
                        strList[i] = _this.handleAreaSelNum(_this[listName[i]]);
                    }
                }
            }
            _this.bets = 0;
            if (type == 1 && strList[5] < index) {
                _this.isNoSel = true;
                return -1
            }
            if (type == 0 && count < index) {
                return -1;
            } else {
                for (var i = 0; i < 7; i++) {
                    if (list[i] == 1) {
                        if (strList[i]) {
                            saveList.push(strList[i].join(','));
                        } else {
                            saveList.push("")
                        }
                    }
                }
                _this.handleRecodeInfo(saveList);

                return rList;
            }

        },
        //计算注数冠亚和
        count_noRepeat: function (list, num) {
            var listName = ['myriabit', 'kilobit', 'hundreds', 'decade', 'unit', "numberArr", "numberArr1"],
                _this = this,
                contrastList = [],
                countList = [],
                returnCount, numLen = 0,
                secondCountList = [],
                count = 0,
                isNeed = true;
            for (var i = 0, j = 0; i < listName.length; i++) {
                if (list[i] == 1) {
                    countList.push(0);
                    _this[listName[i]].map(function (item, index) {
                        if (item.isSel) {
                            contrastList.push(1);
                            countList[j]++;
                        } else {
                            contrastList.push(0);
                        }
                    })

                    if (countList[i] == 0) {
                        isNeed = false;
                    }
                    if (numLen == 0) {
                        numLen = _this[listName[i]].length;
                    }
                    j++;
                }

            }

            if (!isNeed) {
                return 0;
            } else {
                var second = 0;
                for (var m = 0, len = contrastList.length; m < numLen; m++) {

                    var secondlist = 0;
                    if (contrastList[m] == contrastList[m + numLen] && contrastList[m + numLen] == contrastList[m + 2 * numLen] && contrastList[m] == 1) {
                        second -= 1;
                    }
                    if (contrastList[m] == 1) {
                        for (var j = numLen; j < 2 * numLen; j++) {
                            var k = numLen,
                                secondCount = 0;
                            if (contrastList[j] == 1 && contrastList[j + numLen] !== 1 && j == m + numLen) {
                                secondCount += countList[2];
                            } else if (contrastList[j + numLen] == 1 && contrastList[j] !== 1 && j == m + numLen) {
                                secondCount += countList[1];
                            } else if (((contrastList[j] == contrastList[j + k] || j == m + numLen) && contrastList[j] == 1)) {
                                secondCount++;
                            }
                            secondlist += secondCount;
                            second += secondCount;
                        }
                    }
                    secondCountList.push(secondlist);
                }
                for (var i = 0; i < numLen; i++) {
                    if (contrastList[i]) {
                        var checkList = [],
                            countNumber = 1;
                        for (var j = 0; j < countList.length; j++) {
                            checkList.push(contrastList[j * numLen + i]);
                        }
                        returnCount = _this.isSameNumber(checkList);

                        switch (returnCount[0]) {
                            case 0:
                                if (num == 2) {
                                    for (var m = 1; m < countList.length; m++) {
                                        countNumber *= countList[m];
                                    }

                                } else {
                                    for (var m = 1; m < countList.length; m++) {
                                        countNumber *= countList[m];
                                    }
                                }

                                break;
                            case 1:
                                if (num == 2) {
                                    for (var m = 1; m < countList.length; m++) {
                                        countNumber *= countList[m] - 1;
                                    }
                                } else {
                                    for (var m = 1; m < countList.length; m++) {
                                        countNumber *= countList[m];
                                    }
                                }

                                break;
                            case 2:
                                for (var m = 1; m < countList.length; m++) {
                                    countNumber *= countList[m] - 1;

                                }
                                break;
                        }
                        count += countNumber;
                    }

                };
                if (num == 3) {
                    count -= second
                }
                if (count < 0) {
                    count = 0
                }
                return count;
            }
        },
        isSameNumber: function (list) {
            var count = 0,
                numList = [];
            for (var i = 0; i < list.length - 1; i++) {
                if (list[i] == list[i + 1] && list[i] != 0) {
                    count++;
                    numList.push(i + 1);
                }
            }
            return [count, numList[0]];
        },
        //计算注数
        count_betNumber: function () {
            var _this = this,
                id3 = _this.present_playId,
                count,
                rList = [],
                parameter = {},
                // 记录每一个选择区中的数值
                comLen = 0,
                myriabitLen = 0,
                kilobitLen = 0,
                hundredLen = 0,
                decadeLen = 0,
                unitLen = 0,
                // 记录每一个选择区中的选择项
                myriabitSelOpt = [],
                kilobitSelOpt = [],
                hundredSelOpt = [],
                decadeSelOpt = [],
                unitSelOpt = [],
                numArr = [];
            switch (id3) {
                //三码
                case 118: //三码-前三直选复式
                    rList = _this.count_TotalLength([1, 1, 1, 0, 0, 0, 0], 1, 0, 1);
                    if (rList == -1) {
                        return
                    } else {
                        _this.bets = _this.count_noRepeat([1, 1, 1, 0, 0, 0, 0], 3);
                    }
                    break;
                case 119: //三码-中三直选复式
                    rList = _this.count_TotalLength([0, 1, 1, 1, 0, 0, 0], 1, 0, 1);
                    if (rList == -1) {
                        return
                    } else {
                        _this.bets = _this.count_noRepeat([0, 1, 1, 1, 0, 0, 0], 3);
                    }
                    break;
                case 120: //三码-后三直选复式
                    rList = _this.count_TotalLength([0, 0, 1, 1, 1, 0, 0], 1, 0, 1);
                    if (rList == -1) {
                        return
                    } else {
                        _this.bets = _this.count_noRepeat([0, 0, 1, 1, 1, 0, 0], 3);
                    }
                    break;
                case 121: //三码-前三组选复式
                case 122: //三码-中三组选复式
                case 123: //三码-后三组选复式
                    rList = _this.count_TotalLength([0, 0, 0, 0, 0, 1, 0], 2, 1, 0);
                    if (rList == -1) {
                        return
                    } else {
                        _this.bets = countUtils.getBcGroupMix_cqssc(rList[5], 3);
                    }
                    break;
                case 124: //三码-前三胆拖
                case 125: //三码-中三胆拖
                case 126: //三码-后三胆拖
                    rList = _this.count_TotalLength([0, 0, 0, 0, 0, 1, 1], 1, 1, 0);
                    if (rList == -1) {
                        return
                    } else if (rList[5] == 0 || rList[6] == 0) {
                        return
                    } else {
                        count = 0;
                        _this.numberArr.map(function (item) {
                            if (item.isSel) {
                                count++;
                            }
                        })
                        if (rList[5] == 1) {
                            _this.bets = countUtils.getBcGroupMix_cqssc(rList[6], 2);
                        } else {
                            _this.bets = rList[6];
                        }

                    }
                    break;

                //二码
                case 127://前二-直选复式
                    rList = _this.count_TotalLength([1, 1, 0, 0, 0, 0, 0], 1, 0, 1);
                    if (rList == -1) {
                        return
                    } else {
                        _this.bets = _this.count_noRepeat([1, 1, 0, 0, 0, 0, 0], 2);
                    }
                    break;
                case 128://前二-组选复式
                case 131://后二-组选复式
                    rList = _this.count_TotalLength([0, 0, 0, 0, 0, 1, 0], 2, 1, 0);
                    if (rList == -1) {
                        return
                    } else {
                        _this.bets = countUtils.getBcGroupMix_cqssc(rList[5], 2);
                    }
                    break;
                case 129://前二-组选胆拖
                case 132://后二-组选胆拖
                    rList = _this.count_TotalLength([0, 0, 0, 0, 0, 1, 1], 1, 1, 0);
                    if (rList == -1) {
                        return
                    } else if (rList[5] == 0 || rList[6] == 0) {
                        return
                    } else {
                        count = 0;
                        _this.numberArr.map(function (item) {
                            if (item.isSel) {
                                count++;
                            }
                        })
                        _this.bets = rList[6];
                    }
                    break;
                case 130://后二-直选复式
                    rList = _this.count_TotalLength([0, 0, 0, 1, 1, 0, 0], 1, 0, 1);
                    if (rList == -1) {
                        return
                    } else {
                        _this.bets = _this.count_noRepeat([0, 0, 0, 1, 1, 0, 0], 2);
                    }
                    break;

                //不定位
                case 133://前三位
                case 134://中三位
                case 135://后三位
                    rList = _this.count_TotalLength([0, 0, 0, 0, 0, 1, 0], 1, 0, 1);
                    if (rList == -1) {
                        return
                    } else {
                        rList.map(function (item) {
                            _this.bets += item;
                        })
                    }
                    break;

                //定位胆
                case 136://定位胆
                    rList = _this.count_TotalLength([1, 1, 1, 1, 1, 0, 0], 1, 0, 1);
                    if (rList == -1) {
                        return
                    } else {
                        rList.map(function (item) {
                            _this.bets += item;
                        })
                    }
                    break;

                //任选复式
                case 137://一中一
                    rList = _this.count_TotalLength([0, 0, 0, 0, 0, 1, 0], 1, 0, 1);
                    if (rList == -1) {
                        return
                    } else {
                        rList.map(function (item) {
                            _this.bets += item;
                        })
                    }
                    break;
                case 138://二中二
                    rList = _this.count_TotalLength([0, 0, 0, 0, 0, 1, 0], 2, 1, 0);
                    if (rList == -1) {
                        return
                    } else {
                        _this.bets = countUtils.getBcGroupMix_cqssc(rList[5], 2);
                    }
                    break;
                case 139://三中三
                    rList = _this.count_TotalLength([0, 0, 0, 0, 0, 1, 0], 2, 1, 0);
                    if (rList == -1) {
                        return
                    } else {
                        _this.bets = countUtils.getBcGroupMix_cqssc(rList[5], 3);
                    }
                    break;
                case 140://四中四
                    rList = _this.count_TotalLength([0, 0, 0, 0, 0, 1, 0], 2, 1, 0);
                    if (rList == -1) {
                        return
                    } else {
                        _this.bets = countUtils.getBcGroupMix_cqssc(rList[5], 4);
                    }
                    break;
                case 141://五中五
                    rList = _this.count_TotalLength([0, 0, 0, 0, 0, 1, 0], 2, 1, 0);
                    if (rList == -1) {
                        return
                    } else {
                        _this.bets = countUtils.getBcGroupMix_cqssc(rList[5], 5);
                    }
                    break;
                case 142://六中五
                    rList = _this.count_TotalLength([0, 0, 0, 0, 0, 1, 0], 2, 1, 0);
                    if (rList == -1) {
                        return
                    } else {
                        _this.bets = countUtils.getBcGroupMix_cqssc(rList[5], 6);
                    }
                    break;
                case 143://七中五
                    rList = _this.count_TotalLength([0, 0, 0, 0, 0, 1, 0], 2, 1, 0);
                    if (rList == -1) {
                        return
                    } else {
                        _this.bets = countUtils.getBcGroupMix_cqssc(rList[5], 7);
                    }
                    break;
                case 144://八中五
                    rList = _this.count_TotalLength([0, 0, 0, 0, 0, 1, 0], 2, 1, 0);
                    if (rList == -1) {
                        return
                    } else {
                        _this.bets = countUtils.getBcGroupMix_cqssc(rList[5], 8);
                    }
                    break;
                //任选胆拖
                case 145://二中二
                    rList = _this.count_TotalLength([0, 0, 0, 0, 0, 1, 1], 1, 1, 0);
                    if (rList == -1) {
                        return
                    } else if (rList[5] == 0 || rList[6] == 0) {
                        return
                    } else {
                        count = 0;
                        _this.numberArr.map(function (item) {
                            if (item.isSel) {
                                count++;
                            }
                        })
                        _this.bets = rList[6];
                    }
                    break;
                case 146://三中三
                    rList = _this.count_TotalLength([0, 0, 0, 0, 0, 1, 1], 1, 1, 0);
                    if (rList == -1) {
                        return
                    } else if (rList[5] == 0 || rList[6] == 0) {
                        return
                    } else {
                        count = 0;
                        _this.numberArr.map(function (item) {
                            if (item.isSel) {
                                count++;
                            }
                        })
                        if (rList[5] == 1) {
                            _this.bets = countUtils.getBcGroupMix_cqssc(rList[6], 2);
                        } else {
                            _this.bets = rList[6];
                        }

                    }
                    break;
                case 147://四中四
                    rList = _this.count_TotalLength([0, 0, 0, 0, 0, 1, 1], 1, 1, 0);
                    if (rList == -1) {
                        return
                    } else if (rList[5] == 0 || rList[6] == 0) {
                        return
                    } else {
                        count = 0;
                        _this.numberArr.map(function (item) {
                            if (item.isSel) {
                                count++;
                            }
                        })
                        if (rList[5] == 3) {
                            _this.bets = rList[6];
                        } else {
                            _this.bets = countUtils.getBcGroupMix_cqssc(rList[6], 4 - rList[5]);

                        }

                    }
                    break;
                case 148://五中五
                    rList = _this.count_TotalLength([0, 0, 0, 0, 0, 1, 1], 1, 1, 0);
                    if (rList == -1) {
                        return
                    } else if (rList[5] == 0 || rList[6] == 0) {
                        return
                    } else {
                        count = 0;
                        _this.numberArr.map(function (item) {
                            if (item.isSel) {
                                count++;
                            }
                        })
                        if (rList[5] == 4) {
                            _this.bets = rList[6];
                        } else {
                            _this.bets = countUtils.getBcGroupMix_cqssc(rList[6], 5 - rList[5]);
                        }

                    }
                    break;
                case 149://六中五
                    rList = _this.count_TotalLength([0, 0, 0, 0, 0, 1, 1], 1, 1, 0);
                    if (rList == -1) {
                        return
                    } else if (rList[5] == 0 || rList[6] == 0) {
                        return
                    } else {
                        count = 0;
                        _this.numberArr.map(function (item) {
                            if (item.isSel) {
                                count++;
                            }
                        })
                        if (rList[5] == 5) {
                            _this.bets = rList[6];
                        } else {
                            _this.bets = countUtils.getBcGroupMix_cqssc(rList[6], 6 - rList[5]);
                        }
                    }
                    break;
                case 150://七中五
                    rList = _this.count_TotalLength([0, 0, 0, 0, 0, 1, 1], 1, 1, 0);
                    if (rList == -1) {
                        return
                    } else if (rList[5] == 0 || rList[6] == 0) {
                        return
                    } else {
                        count = 0;
                        _this.numberArr.map(function (item) {
                            if (item.isSel) {
                                count++;
                            }
                        })
                        if (rList[5] == 6) {
                            _this.bets = rList[6];
                        } else {
                            _this.bets = countUtils.getBcGroupMix_cqssc(rList[6], 7 - rList[5]);
                        }

                    }
                    break;
                case 151://八中五
                    rList = _this.count_TotalLength([0, 0, 0, 0, 0, 1, 1], 1, 1, 0);
                    if (rList == -1) {
                        return
                    } else if (rList[5] == 0 || rList[6] == 0) {
                        return
                    } else {
                        count = 0;
                        _this.numberArr.map(function (item) {
                            if (item.isSel) {
                                count++;
                            }
                        })
                        if (rList[5] == 8) {
                            _this.bets = rList[6];
                        } else {
                            _this.bets = countUtils.getBcGroupMix_cqssc(rList[6], 8 - rList[5]);
                        }

                    }
                    break;
                default:
                    break;
            }
            _this.recentBetInfo.betsCount = _this.bets;
            _this.recentBetInfo.betsCoins = _this.bets * _this.singleCoins
        },
        // 统计合计和总注数信息
        handleBetsCoins: function () {
            var _this = this;
            _this.totalBets = 0;
            _this.totalCoins = 0;
            _this.BetsList.map(function (item) {
                _this.totalBets += item.betsCount;
                _this.totalCoins += parseInt(item.betsCoins);
            });
            _this.tempCoins = _this.totalCoins;
            _this.totalCoins = _this.totalCoins * _this.continue_periods;
        },
        // 点击图标删除该条投注
        handleClickDelete: function (index) {
            this.BetsList.splice(index, 1);
            this.handleBetsCoins();
            // localStorage.elev5BetsList=JSON.stringify(this.BetsList);
        },
        // 投注testllll
        handleBets: function () {
            var _this = this,
                id3 = _this.present_playId,
                btnArray = ['取消', '确认'],
                stopBanner = '';

            //避免重复投注
            if (_this.isHandleBets) {
                return
            }
            if(_this.pack_coin==0){
				mui.confirm('钱包金额为零，请先充值','是否跳到充值',  btnArray, function(e) {
					if(e.index == 1) {
						_this.$router.push({ name: "depositFile" });
					} else {
						return;
					}
				})
				return
			}
            if (!_this.totalCoins) {
                mui.toast('至少选择一注', {
                    duration: 'long',
                    type: 'div'
                });
                return
            }
            if (!_this.preventBanner || _this.deadlineStr == "数据获取中...") {
                mui.toast('正在获取当前期数，请稍后。。。', {
                    duration: 'long',
                    type: 'div'
                });
                return
            }
            if (this.pack_coin < this.totalCoins) {
                mui.confirm('钱包金额不足，请先充值', '是否跳到充值', btnArray, function(e) {
                    if(e.index == 1) {
                        _this.$router.push({ name: "depositFile" });

                    } else {
                        return;
                    }
                })
                return;
            } else {
                _this.isHandleBets = true;
                var str = JSON.parse(JSON.stringify(_this.BetsList));
                // _this.sh_betConfirm(1,str);
                this.betConfirm_tips=str;

                //              this.base.callAuthApi(obj);
            }
        },
        sh_betConfirm(num,str){
            if(this.noSale){
                mui.toast('该彩种未开售！');
                return
              }
              if(this.bets==0){
                mui.toast('请至少选择一注');
                return
              }
            if(num==1){
              $('.betConfirm').show();
              this.betConfirm_tips=str;
            }else{
              $('.betConfirm').hide();
            }
          },
          sh_afterBet(type){
            $(".afterBet").hide();
            if(type==2){
              // this.togoRecord();
              this.$nextTick(function(){
                localStorage.chartId = 9;
            // if (localStorage.app_flag == undefined) {
            this.skip_newUrl(0, '../../myCenter/bettingRecord', 'trend', 'bettingRecord', '0');
              });
            }
          },
          btn_betSure(){
            this.sh_betConfirm(2,'');
            var isOk = this.handleConfirm(); 			if (isOk && isOk == 1) { 				return 			}
            var _this = this,
            id3 = _this.present_playId,
            btnArray = ['取消', '确认'],
            stopBanner = '';
            var str = JSON.parse(JSON.stringify(_this.BetsList));
            str.map(function (item) {
                item.banner = _this.preventBanner;
                delete item.type; //删除属性
                if (item.id3 == 107) {
                    item.betsClause = item.betsClause.replace(/[,]/g, "|");
                } else {
                    item.betsClause = item.betsClause.replace(/[(]/g, "").replace(/[)]/g, "|");
                }
            });
            this.handleChase();
            var betObjedct = {
                BetsList: str,
                chase: this.continue_periods ? this.continue_periods : 1,
                is: this.after_no ? 1 : 0
            },test = JSON.stringify(betObjedct),
                obj = {
                    type: 'post',
                    data: {
                        tzJson: (test)
                    },
                    url: '/authApi/digitalBet',
                    success: function (data) {
                        _this.isHandleBets = false;
                        if (data.code == 200) {
                            // $(".success.suc").css({display: "block"});
                            // $(".pay").css({display: "none"});
                            _this.sucmsg = data.msg;
                            _this.pack_coin = parseFloat(_this.pack_coin - _this.totalCoins).toFixed(2);
                            _this.user_state = "钱包:" + _this.pack_coin + _this.coinUnit + "(可用)";
                            _this.BetsList = [];

                            // var html=`<div style="text-align:left;"><p>投注彩种：${_this.typeNameTitle}</p><p>投注玩法：${_this.title}</p><p>投注金额：${_this.totalCoins+_this.coinUnit}</p><p>投注期数：第${_this.preventBanner}期</p></div>`;
                            // mui.confirm(html, data.msg, ['确定'], function(e) {
                            //     if(e.index == 1) {

                            //     } else {
                            //         return;
                            //     }
                            // })
                            $(".afterBet").show();
                            $(".afterBet>.content").css({
                              top:"50%",
                              marginTop:-$(".afterBet>.content").height()/2+"px"
                            });
                        } else if (data.code == 134) {
                            if(data.body.nextBanner){
                                _this.preventBanner=data.body.nextBanner;
                              }
                            mui.confirm(data.msg, '提示', btnArray, function (e) {
                                if (e.index == 1) {
                                    betObjedct.BetsList.map(function (item) {
                                        if (item.banner != _this.preventBanner) {
                                            item.banner = _this.preventBanner
                                        }
                                        delete item.type
                                    });
                                    _this.betsBanner = _this.preventBanner;
                                    test = JSON.stringify(betObjedct);
                                    obj.data = {
                                        tzJson: (test)
                                    };
                                  _this.base.callAuthApi(obj);
                                } else {
                                    _this.BetsList = [];
                                    return;
                                }
                            })
                        } else {
                            // $(".success.fail").css({display: "block"});
                            // _this.errmsg = data.msg
                            _this.BetsList=[];
                            var html=`<div style="text-align:left;">${data.msg}</div>`;
                            mui.confirm(html,'投注失败' , ['确定'], function(e) {
                                if(e.index == 1) {

                                } else {
                                    return;
                                }
                            })
                        }
                    }
                };

            if (_this.stopBanner) {
                mui.confirm('第' + _this.stopBanner + '期已停止投注,是否投注到最新一期', '提示', btnArray, function (e) {
                    if (e.index == 1) {
                        betObjedct.BetsList.map(function (item) {
                            if (item.banner != _this.preventBanner) {
                                item.banner = _this.preventBanner
                            }
                            delete item.type
                        });
                        _this.betsBanner = _this.preventBanner;
                        test = JSON.stringify(betObjedct);
                        obj.data = {
                            tzJson: (test)
                        };
                        _this.stopBanner = "";
                      _this.base.callAuthApi(obj);
                    } else {
                        _this.isHandleBets = false;
                        $('#header').show();
                        $('#mainArea').show();

                        return;
                    }
                })
            } else {
                _this.betsBanner = _this.preventBanner;
                _this.base.callAuthApi(obj);
            }
          },
          btn_betCancel(){
            this.sh_betConfirm(2,'');
            this.BetsList = [];
            this.isHandleBets = false;
          },
        // //显示menu（走势图...）
        // showMenu: function () {
        //     $(".mask.menu").slideToggle();
        //     $('.menu_list').css('display','block');
        //     $("body").css("overflow", "hidden");
        // },
        // //关闭menu（走势图...）
        // closeMenu: function () {
        //     if ($(".popup").is(":hidden")) {
        //         //$("body").css("overflow", "auto");
        //         $(".mask.menu").fadeToggle();
        //     }
        // },
    showMenu: function () {
        if($(".topPopover_wrap").is(":hidden")){
          $("#topPopover").addClass("mui-active");
          $(".topPopover_wrap").show();
          $("#topPopover_tips").removeClass("mui-active");
        }else{
          $("#topPopover").removeClass("mui-active");
          $(".topPopover_wrap").hide();
        }

      },
        closeMenu: function (type) {
            if(type){
              $("#topPopover").removeClass("mui-active");
              $("#topPopover_tips").removeClass("mui-active");
              $(".topPopover_wrap").hide();
              return
            }
            if($(".topPopover_wrap").is(":hidden")){
              $("#topPopover_tips").addClass("mui-active");
              $(".topPopover_wrap").show();
              $("#topPopover").removeClass("mui-active");
            }else{
              $("#topPopover_tips").removeClass("mui-active");
              $(".topPopover_wrap").hide();
            }
          },
        //跳转走势图
        togoChart: function () {
            localStorage.chartId = this.oneTypeId;
            this.closeMenu(1);

            this.$nextTick(function(){

                this.skip_newUrl(0, 'trend', 'trend', 'trend');
            });
        },
        //跳转近期开奖
        togoLottery: function () {
            // mui('#topPopover').popover('toggle');
            localStorage.chartId = this.oneTypeId;
            // if (localStorage.app_flag == undefined) {
                // this.skip_newUrl(0, 'award_page', 'award_page', 'award_page');
            // } else {
            //     this.skip_newUrl(1, 'award_pagel', 'award_page', 'award_page');
            // }
            this.closeMenu(1);
            this.$nextTick(function(){
                this.$router.push({
                    name: "award_page",
                    params: {
                    "code": '11x5',
                    "name":this.typeNameTitle
                    }
                })
            });
        },
        //跳转购彩记录
        togoRecord: function () {
            // mui('#topPopover').popover('toggle');
        	if(!localStorage.userName){
        		this.$router.push({name:'login'});
        		return;
        	}
            localStorage.chartId = this.oneTypeId;
          // if (localStorage.app_flag == undefined) {
            this.closeMenu(1);
            this.$nextTick(function(){
            this.skip_newUrl(0, '../../myCenter/bettingRecord', 'trend', 'bettingRecord', '0');
            });
          // } else {
          //   this.skip_newUrl(1, '../../myCenter/bettingRecord', 'trend', 'bettingRecord', '0');
          // }
        },
        //
        recharge: function () {
          $('#header').css({ display: "block" });
          $("#mainArea").css({ display: "block" });
            // if(localStorage.userName){
        		 this.turnUrl("../../myCenter/depositFile","depositFile");
        	// }else{
        		// this.$router.push({ name: 'index' });
        	// }
        },
        closePop: function () {
          $('#header').css({ display: "block" });
          $("#mainArea").css({ display: "block" });
            $(".popup").css({display: "none"});
            $(".menu_list").css({display: "block"});
            $(".mask").css({display: "none"});
        },
        //mui跳转方法
      skip_newUrl: function (index, url, nameId, name, param) {
        //$("body").css("overflow", "auto");
            switch (index) {
                case 0:
                    // window.location.href = url;
                    // this.$router.push({name:name});
                if (param) {
                  this.$router.push({ name: name, params: { status: param } });

                } else {
                  this.$router.push({ name: name });

                }
                    break;
                case 1:
                    mui.openWindow({
                        url: url,
                        id: nameId,
                        styles: {
                            top: base.getStatusbarHeight() + 'px',
                            bottom: 0
                        },
                        createNew: true,
                        show: {
                            autoShow: true, //页面loaded事件发生后自动显示，默认为true
                            aniShow: 'pop-in', //页面显示动画，默认为”slide-in-right“；
                            duration: '200' //页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
                        },
                    });
                    break;
            }
        },
        changeRoute:function (to,from) {
            if(this.$route.name =='eleven5'){
                if (from && to && ((to.name == "eleven5" && from.name == "depositFile") || (from.name == "eleven5" && to.name == "depositFile"))) {
                    $('.mask.menu').css('display', 'none');
                } else {
                    this.clearSelOptions();
                    this.handleClearAll();
                    $('#header').show();
                    // $('.mask.menu').css('display','block');
                    $('#mainArea').css('display', 'block');
                    $('.pay').css('display', 'none');
                }

              this.previousIssue="";//上期期号
              this.preventBanner="";//当前期号
              this.planTypeId="";//计划三级玩法id参数

              this.continue_periods= 1;// 追号期数
              this.after_no= false;// 中奖后停止追号

              var lastpath = this.$route.params.num, numList = this.szcIdList.gameIdList[this.code].split(',');
              if (!lastpath||numList.indexOf(lastpath)==-1){
                this.$router.push({ path: '/' })
              }else{
                if (this.oneTypeId == lastpath) {
                  //判断是否切换了账号
                  var _this = this;
                  if (localStorage.qryGamePlayInfoTimestamp) {
                    var gameTimestamp = JSON.parse(localStorage.qryGamePlayInfoTimestamp);
                    // if (!gameTimestamp[this.oneTypeId]) {
                      this.oneTypeId = "";
                      setTimeout(function () {
                        _this.oneTypeId = lastpath;
                      }, 10)
                    // }
                  } else {
                    this.oneTypeId = "";
                    setTimeout(function () {
                      _this.oneTypeId = lastpath;
                    }, 10)
                  }
                } else {
                  this.oneTypeId = lastpath;
                  this.loginToUrl = ".." + this.$route.path;
                }
              }
              if (this.oneTypeId) {
                this.isCollect = localStorage.collectGame && JSON.parse(localStorage.collectGame).collectList[this.oneTypeId] ? 1 : 0;
              }
            }
        },
        setSingleCoins(val,event){
            this.singleCoins=val;
            event=event.currentTarget;
            $(event).parent().find(".active").removeClass('active');
            $(event).addClass('active');
          }
    },
    watch: {
        switchoverType(){
            if(!$('.topPopover_wrap').is(':hidden')){
              this.closeMenu(1);
            }
          },
      singleCoins:function(val){
        this.handleCoins();
        if(val!=10&&val!=50&&val!=100&&val!=200&&val!=500&&val!=1000&&val!=5000&&val!=10000&&val!=50000){
            $(".betConfirm .coinList .active").removeClass('active');
          }
        //   this.setSpecialSum();
      },
        //追期数
        continue_periods: function (val) {
            if (val != 0) {
                this.totalCoins = val * this.tempCoins;
            } else {
                this.totalCoins = this.tempCoins;
            }
          if (this.after_no && this.continue_periods) {
            $('.after_no .mui-checkbox input').trigger("click");
          }
        },
        // 注数变动时投注金额跟随变动
        bets: function (val) {
            this.coin = val * 2;
        },


        //万位选择项管理对象
        myriabit: {
            deep: true,
            handler: function () {
                var _this = this;
                if (_this.isChangePlayId) {
                    return
                }
                _this.count_betNumber();
            }
        },
        //千位选择项管理对象
        kilobit: {
            deep: true,
            handler: function () {
                var _this = this;
                if (_this.isChangePlayId) {
                    return
                }
                _this.count_betNumber();
            }
        },
        //百位选择项管理对象
        hundreds: {
            deep: true,
            handler: function () {
                var _this = this;
                if (_this.isChangePlayId) {
                    return
                }
                _this.count_betNumber();
            }
        },
        //十位选择项管理对象
        decade: {
            deep: true,
            handler: function () {
                var _this = this;
                if (_this.isChangePlayId) {
                    return
                }
                _this.count_betNumber();
            }
        },
        //个位选择项管理对象
        unit: {
            deep: true,
            handler: function () {
                var _this = this;
                if (_this.isChangePlayId) {
                    return
                }
                _this.count_betNumber();
            }
        },

        // 监听用户选择的项并计算注数
        //common共用区域选值
        numberArr: {
            deep: true,
            handler: function () {
                var _this = this;
                if (_this.isChangePlayId) {
                    return
                }
                _this.count_betNumber();
            }
        },
        // 监听用户选择的项并计算注数
        //common1共用区域选值
        numberArr1: {
            deep: true,
            handler: function () {
                var _this = this;
                if (_this.isChangePlayId) {
                    return
                }
                _this.count_betNumber();
            }
        },
        oneTypeId:function () {

            this.getHistoryBannerInfo();
            this.getBetsBannerInfo();
            this.getBetsType();
            this.getSysConfig();
            localStorage.lottery_id = this.oneTypeId;
          // $(".play_head li:first-child").trigger("click");
          $(".play_head li").removeClass("active");
          $(".play_head li:first-child").addClass("active");
          $(".play_list ul").children("li").css({ display: "none" });
          $(".play_list ul").children("li").eq(0).css({ display: "block" });
          $(".play_list ul").children("li").eq(0).find(".sel:first").addClass("active");
          if (this.oneTypeId) {
            this.isCollect = localStorage.collectGame && JSON.parse(localStorage.collectGame).collectList[this.oneTypeId] ? 1 : 0;
          }

        },
        $route(to,from) {
        	if (to.name =="eleven5"){
            this.getBetsType();
            this.userName = localStorage.userName;
            if(this.userName){
                this.get_userState();
              }
            this.pullToRefresh.setNowThis(this);
	            $('.popup').hide();
                if(!localStorage.config){
                    this.getSysConfig();
                }
            // if (localStorage.userName && localStorage.indexCoinMsg) {
            //   var coinMsg = JSON.parse(localStorage.indexCoinMsg);
            //   this.pack_coin = (parseFloat(coinMsg.coin)).toFixed(2);
            //   this.user_state = "钱包:" + this.pack_coin + this.coinUnit + "(可用)";
            //   localStorage.indexCoinMsg="";
            //   // this.get_userState();
            // } else {
            //   this.get_userState();
            // }



            this.changeRoute(to, from);
            var _this = this;
          //  this.isCollect = localStorage.collectGame && JSON.parse(localStorage.collectGame).collectList[this.oneTypeId] ? 1 : 0;
            //当返回的时间出错时
            if (_this.issueErr) {
              var issList = _this.issueErr.split(","), issIndex = issList.indexOf(_this.oneTypeId);
              if (issIndex != -1) {
                issList.splice(issIndex, 1);
                if (issList.length == 0) {
                  _this.issueErr = "";
                } else {
                  _this.issueErr = issList.join(",");
                }

                _this.getBetsBannerInfo();
              }
            }

            this.$nextTick(function(){
                if($("#topPopover").css("display")==='block'){
                  $("#topPopover").css("display",'none');
                }
              })
          } else if (from.name == "eleven5"){
            this.changeRoute(to, from);
          }



        	// $('#header').show();
        	// $('#mainArea').css('display','block');
        	// $('.pay').css('display','none');
        }
    },
}
