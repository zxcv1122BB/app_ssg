import { countUtils } from '../../../api/compute/bettingCountUtils';
export default {
    name: "lhc",
    data(){
        return{

            //一级玩法
            oneTypeId:'',
            code:'hk6',
            gameAreaShow: [0,0,0,0],  //玩法区域显示样式

            title: '特码B-特码',
            //展开全部玩法
            switchoverType:false,

            //上一期的期数
            stopBanner:"",

            //投注区对象
            numberArr: [],

            //检测是否点击重复投注
            isHandleBets:false,


            // 近期开奖
            recentPrize:[],
            // 记录用户当前的投注信息
            recentBetInfo:{},
            // 记录用户所有的投注订单信息
            BetsList:[],
            // 总注数和投注所需金额
            totalBets:0,
            totalCoins:0,


            singleminMax: false,

            zodiacRule:JSON.parse(localStorage.config).zodiacRule,


//		玩法区域
            play_area_manner:{
                // 特码B-选码
                tm_xm: {
                    isSel: true,
                    title: '特码-选码',
                    judgeId: 11,
                    code3:'hk6_tm_xm',
                    TextArr:["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49"],
                    Ename:'tm_xm'
                },
                // 特码B-其他
                tm_qt: {
                    isSel: false,
                    title: '特码-其他',
                    judgeId: 12,
                    code3:'hk6_tm_qt',
                    TextArr:["特大","特小","特尾大","特尾小","特单","特双","特大单","特大双","特合大","特合小","特小单","特小双","特合单","特合双","特天肖","特地肖","特前肖","特后肖","特家肖","特野肖"],
                    Ename:'tm_qt'
                },
                // 特码A-选码
                // tmA_xm: {
                //     isSel: false,
                //     title: '特码A-选码',
                //     judgeId: 21,
                //     code3:'hk6_tma_xm',
                //     // TextArr:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49],
                //     TextArr:["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49"],
                //     Ename:'tmA_xm'
                // },
                // 特码A-其他
                // tmA_qt: {
                //     isSel: false,
                //     title: '特码A-其他',
                //     judgeId: 22,
                //     code3:'hk6_tma_qt',
                //     TextArr:["特大","特小","特尾大","特尾小","特单","特双","特大单","特大双","特合大","特合小","特小单","特小双","特合单","特合双","特天肖","特地肖","特前肖","特后肖","特家肖","特野肖"],
                //     Ename:'tmA_qt'
                // },
                // 色波-色波
                sb_sb: {
                    isSel: false,
                    title: '色波-色波',
                    judgeId: 31,
                    code3:'hk6_sb_sb',
                    TextArr:["红波","蓝波","绿波"],
                    number:[
                        ["01","02","07","08","12","13","18","19","23","24","29","30","34","35","40","45","46"],
                        ["03","04","09","10","14","15","20","25","26","31","36","37","41","42","47","48"],
                        ["05","06","11","16","17","21","22","27","28","32","33","38","39","42","44","49"],
                    ],
                    Ename:'sb_sb'
                },
                // 色波-半波
                sb_bb: {
                    isSel: false,
                    title: '色波-半波',
                    judgeId:32,
                    code3:'hk6_sb_bb',
                    TextArr:["红单","红双","红大","红小","蓝单","蓝双","蓝大","蓝小","绿单","绿双","绿大","绿小"],
                    Ename:'sb_bb'
                },
                // 色波-半半波
                sb_bbb: {
                    isSel: false,
                    title: '色波-半半波',
                    judgeId:33,
                    code3:'hk6_sb_bbb',
                    TextArr:["红大单","红大双","红小单","红小双","蓝大单","蓝大双","蓝小单","蓝小双","绿大单","绿大双","绿小单","绿小双"],
                    Ename:'sb_bbb'
                },
                // 特肖-生肖
                tx_sx: {
                    isSel: false,
                    title: '特肖-生肖',
                    judgeId:41,
                    code3:'hk6_tx_sx',
                    TextArr:["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"],
                    Ename:'tx_sx'
                },
                // 合肖-合肖
                tx_hx: {
                    isSel: false,
                    title: '合肖-合肖',
                    judgeId:51,
                    code3:'hk6_hx_hx',
                    TextArr:["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"],
                    Ename:'tx_hx'
                },
                // 头尾数-头尾数
                tws_tws: {
                    isSel: false,
                    title: '头尾数-头尾数',
                    judgeId:61,
                    code3:'hk6_tws_tws',
                    TextArr:["0头","1头","2头","3头","4头","1尾","2尾","3尾","4尾","5尾","6尾","7尾","8尾","9尾","0尾"],
                    Ename:'tws_tws'
                },
                // 正码-选码
                zm_xm: {
                    isSel: false,
                    title: '正码-选码',
                    judgeId: 71,
                    code3:'hk6_zm_xm',
                    // TextArr:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49],
                    TextArr:["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49"],
                    Ename:'zm_xm'
                },
                // 正码-其他
                zm_qt: {
                    isSel: false,
                    title: '正码-其他',
                    judgeId:72,
                    code3:'hk6_zm_qt',
                    TextArr:["总大","总小","总单","总双"],
                    Ename:'zm_qt'
                },
                // 正码特-正一特
                zmt_zt1: {
                    isSel: false,
                    title: '正码特-正一特',
                    judgeId:81,
                    code3:'hk6_zmt_zt1',
                    // TextArr:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49],
                    TextArr:["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49"],
                    Ename:'zmt_zt1'
                },
                // 正码特-正一特大小
                zmt_zt1dx: {
                    isSel: false,
                    title: '正码特-正一特大小',
                    judgeId: 82,
                    code3:'hk6_zmt_zt1dx',
                    TextArr:["正一大","正一小","正一单","正一双","正一合单","正一合双","正一红","正一蓝","正一绿"],
                    Ename:'zmt_zt1dx'
                },
                // 正码特-正二特
                zmt_zt2: {
                    isSel: false,
                    title: '正码特-正二特',
                    judgeId:83,
                    code3:'hk6_zmt_zt2',
                    // TextArr:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49],
                    TextArr:["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49"],
                    Ename:'zmt_zt2'
                },
                // 正码特-正二特大小
                zmt_zt2dx: {
                    isSel: false,
                    title: '正码特-正二特大小',
                    judgeId:84,
                    code3:'hk6_zmt_zt2dx',
                    TextArr:["正二大","正二小","正二单","正二双","正二合单","正二合双","正二红","正二蓝","正二绿"],
                    Ename:'zmt_zt2dx'
                },
                // 正码特-正三特
                zmt_zt3: {
                    isSel: false,
                    title: '正码特-正三特',
                    judgeId:85,
                    code3:'hk6_zmt_zt3',
                    // TextArr:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49],
                    TextArr:["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49"],
                    Ename:'zmt_zt3'
                },
                // 正码特-正三特大小
                zmt_zt3dx: {
                    isSel: false,
                    title: '正码特-正三特大小',
                    judgeId:86,
                    code3:'hk6_zmt_zt3dx',
                    TextArr:["正三大","正三小","正三单","正三双","正三合单","正三合双","正三红","正三蓝","正三绿"],
                    Ename:'zmt_zt3dx'
                },
                // 正码特-正四特
                zmt_zt4: {
                    isSel: false,
                    title: '正码特-正四特',
                    judgeId:87,
                    code3:'hk6_zmt_zt4',
                    // TextArr:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49],
                    TextArr:["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49"],
                    Ename:'zmt_zt4'
                },
                // 正码特-正四特大小
                zmt_zt4dx: {
                    isSel: false,
                    title: '正码特-正四特大小',
                    judgeId:88,
                    code3:'hk6_zmt_zt4dx',
                    TextArr:["正四大","正四小","正四单","正四双","正四合单","正四合双","正四红","正四蓝","正四绿"],
                    Ename:'zmt_zt4dx'
                },
                // 正码特-正五特
                zmt_zt5: {
                    isSel: false,
                    title: '正码特-正五特',
                    judgeId:89,
                    code3:'hk6_zmt_zt5',
                    // TextArr:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49],
                    TextArr:["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49"],
                    Ename:'zmt_zt5'
                },
                // 正码特-正五特大小
                zmt_zt5dx: {
                    isSel: false,
                    title: '正码特-正五特大小',
                    judgeId:810,
                    code3:'hk6_zmt_zt5dx',
                    TextArr:["正五大","正五小","正五单","正五双","正五合单","正五合双","正五红","正五蓝","正五绿"],
                    Ename:'zmt_zt5dx'
                },
                // 正码特-正六特
                zmt_zt6: {
                    isSel: false,
                    title: '正码特-正六特',
                    judgeId:811,
                    code3:'hk6_zmt_zt6',
                    // TextArr:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49],
                    TextArr:["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49"],
                    Ename:'zmt_zt6'
                },
                // 正码特-正六特大小
                zmt_zt6dx: {
                    isSel: false,
                    title: '正码特-正六特大小',
                    judgeId:812,
                    code3:'hk6_zmt_zt6dx',
                    TextArr:["正六大","正六小","正六单","正六双","正六合单","正六合双","正六红","正六蓝","正六绿"],
                    Ename:'zmt_zt6dx'
                },
                // 正码1-6-正码一
                zm16_zm1: {
                    isSel: false,
                    title: '正码1-6-正码一',
                    judgeId:91,
                    code3:'hk6_zm16_zm1',
                    TextArr:["单码","双码","大码","小码","合单","合双","合大","合小","红波","蓝波","绿波","尾大","尾小"],
                    Ename:'zm16_zm1'
                },
                // 正码1-6-正码二
                zm16_zm2: {
                    isSel: false,
                    title: '正码1-6-正码二',
                    judgeId:92,
                    code3:'hk6_zm16_zm2',
                    TextArr:["单码","双码","大码","小码","合单","合双","合大","合小","红波","蓝波","绿波","尾大","尾小"],
                    Ename:'zm16_zm2'
                },
                // 正码1-6-正码三
                zm16_zm3: {
                    isSel: false,
                    title: '正码1-6-正码三',
                    judgeId:93,
                    code3:'hk6_zm16_zm3',
                    TextArr:["单码","双码","大码","小码","合单","合双","合大","合小","红波","蓝波","绿波","尾大","尾小"],
                    Ename:'zm16_zm3'
                },
                // 正码1-6-正码四
                zm16_zm4: {
                    isSel: false,
                    title: '正码1-6-正码四',
                    judgeId:94,
                    code3:'hk6_zm16_zm4',
                    TextArr:["单码","双码","大码","小码","合单","合双","合大","合小","红波","蓝波","绿波","尾大","尾小"],
                    Ename:'zm16_zm4'
                },
                // 正码1-6-正码五
                zm16_zm5: {
                    isSel: false,
                    title: '正码1-6-正码五',
                    judgeId:95,
                    code3:'hk6_zm16_zm5',
                    TextArr:["单码","双码","大码","小码","合单","合双","合大","合小","红波","蓝波","绿波","尾大","尾小"],
                    Ename:'zm16_zm5'
                },
                // 正码1-6-正码六
                zm16_zm6: {
                    isSel: false,
                    title: '正码1-6-正码六',
                    judgeId:96,
                    code3:'hk6_zm16_zm6',
                    TextArr:["单码","双码","大码","小码","合单","合双","合大","合小","红波","蓝波","绿波","尾大","尾小"],
                    Ename:'zm16_zm6'
                },
                // 五行-种类
                wx_zl: {
                    isSel: false,
                    title: '五行-种类',
                    judgeId:101,
                    code3:'hk6_wx_zl',
                    TextArr:["金","木","水","火","土"],
                    number:[
                        ["04","05","18","19","26","27","34","35","48","49"],
                        ["01","08","09","16","17","30","31","38","39","46","47"],
                        ["06","07","14","15","22","23","36","37","44","45"],
                        ["02","03","10","11","24","25","32","33","40","41"],
                        ["12","13","20","21","28","29","42","43"],
                    ],
                    Ename:'wx_zl'
                },
                // 平特一肖尾数-一肖
                ptyxws_x1: {
                    isSel: false,
                    title: '平特一肖尾数-一肖',
                    judgeId:111,
                    code3:'hk6_ptyxws_x1',
                    TextArr:["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"],
                    Ename:'ptyxws_x1'
                },
                // 平特一肖尾数-尾数
                ptyxws_ws: {
                    isSel: false,
                    title: '平特一肖尾数-尾数',
                    judgeId:112,
                    code3:'hk6_ptyxws_ws',
                    TextArr:["0尾","1尾","2尾","3尾","4尾","5尾","6尾","7尾","8尾","9尾"],
                    number:[
                        ["10","20","30","40"],
                        ["01","11","21","31","41"],
                        ["02","12","22","32","42"],
                        ["03","13","23","33","43"],
                        ["04","14","24","34","44"],
                        ["05","15","25","35","45"],
                        ["06","16","26","36","46"],
                        ["07","17","27","37","47"],
                        ["08","18","28","38","48"],
                        ["09","19","19","39","49"],
                    ],
                    Ename:'ptyxws_ws'
                },
                // 正肖-生肖
                zx_sx: {
                    isSel: false,
                    title: ' 正肖-生肖',
                    judgeId:121,
                    code3:'hk6_zx_sx',
                    TextArr:["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"],
                    Ename:'zx_sx'
                },
                // 7色波-种类
                sb7_z1: {
                    isSel: false,
                    title: ' 7色波-种类',
                    judgeId:131,
                    code3:'hk6_sb7_z1',
                    TextArr:["红波","蓝波","绿波","和局"],
                    Ename:'sb7_z1'
                },
                // 总肖-种类
                zox_z1: {
                    isSel: false,
                    title: ' 总肖-种类',
                    judgeId:141,
                    code3:'hk6_zox_z1',
                    TextArr:["2肖","3肖","4肖","5肖","6肖","7肖","总肖单","总肖双"],
                    Ename:'zox_z1'
                },
                // 自选不中-自选不中
                zxbz_zxbz: {
                    isSel: false,
                    title: ' 自选不中-自选不中',
                    judgeId:151,
                    code3:'hk6_zxbz_zxbz',
                    // TextArr:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49],
                    TextArr:["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49"],
                    Ename:'zxbz_zxbz'
                },
                // 连肖连尾-二连肖
                lxlw_lx2: {
                    isSel: false,
                    title: ' 连肖连尾-二连肖',
                    judgeId:161,
                    code3:'hk6_lxlw_lx2',
                    TextArr:["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"],
                    Ename:'lxlw_lx2'
                },
                // 连肖连尾-三连肖
                lxlw_lx3: {
                    isSel: false,
                    title: ' 连肖连尾-三连肖',
                    judgeId:162,
                    code3:'hk6_lxlw_lx3',
                    TextArr:["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"],
                    Ename:'lxlw_lx3'
                },
                // 连肖连尾-四连肖
                lxlw_lx4: {
                    isSel: false,
                    title: ' 连肖连尾-四连肖',
                    judgeId:163,
                    code3:'hk6_lxlw_lx4',
                    TextArr:["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"],
                    Ename:'lxlw_lx4'
                },
                // 连肖连尾-五连肖
                lxlw_lx5: {
                    isSel: false,
                    title: ' 连肖连尾-五连肖',
                    judgeId:164,
                    code3:'hk6_lxlw_lx5',
                    TextArr:["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"],
                    Ename:'lxlw_lx5'
                },
                // 连肖连尾-二连尾
                lxlw_lw2: {
                    isSel: false,
                    title: ' 连肖连尾-二连尾',
                    judgeId:165,
                    code3:'hk6_lxlw_lw2',
                    TextArr:["0尾","1尾","2尾","3尾","4尾","5尾","6尾","7尾","8尾","9尾"],
                    number:[
                        ["10","20","30","40"],
                        ["01","11","21","31","41"],
                        ["02","12","22","32","42"],
                        ["03","13","23","33","43"],
                        ["04","14","24","34","44"],
                        ["05","15","25","35","45"],
                        ["06","16","26","36","46"],
                        ["07","17","27","37","47"],
                        ["08","18","28","38","48"],
                        ["09","19","19","39","49"],
                    ],
                    Ename:'lxlw_lw2'
                },
                // 连肖连尾-三连尾
                lxlw_lw3: {
                    isSel: false,
                    title: ' 连肖连尾-三连尾',
                    judgeId:166,
                    code3:'hk6_lxlw_lw3',
                    TextArr:["0尾","1尾","2尾","3尾","4尾","5尾","6尾","7尾","8尾","9尾"],
                    number:[
                        ["10","20","30","40"],
                        ["01","11","21","31","41"],
                        ["02","12","22","32","42"],
                        ["03","13","23","33","43"],
                        ["04","14","24","34","44"],
                        ["05","15","25","35","45"],
                        ["06","16","26","36","46"],
                        ["07","17","27","37","47"],
                        ["08","18","28","38","48"],
                        ["09","19","19","39","49"],
                    ],
                    Ename:'lxlw_lw3'
                },
                // 连肖连尾-四连尾
                lxlw_lw4: {
                    isSel: false,
                    title: ' 连肖连尾-四连尾',
                    judgeId:167,
                    code3:'hk6_lxlw_lw4',
                    TextArr:["0尾","1尾","2尾","3尾","4尾","5尾","6尾","7尾","8尾","9尾"],
                    number:[
                        ["10","20","30","40"],
                        ["01","11","21","31","41"],
                        ["02","12","22","32","42"],
                        ["03","13","23","33","43"],
                        ["04","14","24","34","44"],
                        ["05","15","25","35","45"],
                        ["06","16","26","36","46"],
                        ["07","17","27","37","47"],
                        ["08","18","28","38","48"],
                        ["09","19","19","39","49"],
                    ],
                    Ename:'lxlw_lw4'
                },
                // 连肖连尾-五连尾
                lxlw_lw5: {
                    isSel: false,
                    title: ' 连肖连尾-五连尾',
                    judgeId:168,
                    code3:'hk6_lxlw_lw5',
                    TextArr:["0尾","1尾","2尾","3尾","4尾","5尾","6尾","7尾","8尾","9尾"],
                    number:[
                        ["10","20","30","40"],
                        ["01","11","21","31","41"],
                        ["02","12","22","32","42"],
                        ["03","13","23","33","43"],
                        ["04","14","24","34","44"],
                        ["05","15","25","35","45"],
                        ["06","16","26","36","46"],
                        ["07","17","27","37","47"],
                        ["08","18","28","38","48"],
                        ["09","19","19","39","49"],
                    ],
                    Ename:'lxlw_lw5'
                },
                // 连码-三中二
                lm_3z2: {
                    isSel: false,
                    title: ' 连码-三中二',
                    judgeId:171,
                    code3:'hk6_lm_3z2',
                    // TextArr:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49],
                    TextArr:["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49"],
                    Ename:'lm_3z2'
                },
                // 连码-三全中
                lm_3qz: {
                    isSel: false,
                    title: ' 连码-三全中',
                    judgeId:172,
                    code3:'hk6_lm_3qz',
                    // TextArr:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49],
                    TextArr:["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49"],
                    Ename:'lm_3qz'
                },
                // 连码-二全中
                lm_2qz: {
                    isSel: false,
                    title: ' 连码-二全中',
                    judgeId:173,
                    code3:'hk6_lm_2qz',
                    // TextArr:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49],
                    TextArr:["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49"],
                    Ename:'lm_2qz'
                },
                // 连码-二中特
                lm_2zt: {
                    isSel: false,
                    title: ' 连码-二中特',
                    judgeId:174,
                    code3:'hk6_lm_2zt',
                    // TextArr:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49],
                    TextArr:["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49"],
                    Ename:'lm_2zt'
                },
                // 连码-特串
                lm_tc: {
                    isSel: false,
                    title: ' 连码-特串',
                    judgeId:175,
                    code3:'hk6_lm_tc',
                    // TextArr:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49],
                    TextArr:["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49"],
                    Ename:'lm_tc'
                },
                // 连码-四全中
                lm_4qz: {
                    isSel: false,
                    title: ' 连码-四全中',
                    judgeId:176,
                    code3:'hk6_lm_4qz',
                    // TextArr:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49],
                    TextArr:["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49"],
                    Ename:'lm_4qz'
                },

            },

            menu:[],

            //当前玩法类型名
            typeNameTitle:"香港六合彩",

            // 当前投注期次及截止日期
            preventBanner:0,

            // 可用余额,单笔最大投注金额
            pack_coin: '--',
//      singleMaxSum:0,
            // 追号期数
            continue_periods:1,
            // 中奖后停止追号
            after_no:false,
            errmsg:'',
            sucmsg:'',

            //时间倒计时
            lastTime:'2018-3-16 14:10:08',
            deadlineTiming:"",
            deadlineStr:"",

            // 目前销售期的期数和最新一期开奖
            recentlyNum:[],
            recentlyColor:'',
            presentNum:'',
            sumNum:'', //开奖号之和

            // 历史开奖
            history:[],

            //是否正在切换玩法
            isChangePlayId:false,

            // 总的注数和投注金额
            bets: 0,
            coin: 0,

            //金额单位
            coinUnit:"元",

            //机选与清空切换延迟
            isDelay:false,

            parentIndex:0, //菜单父类被选中索引
            chlidIndex:0,  //菜单子类选中索引

            isRate: true,  //正方形下的
            three_Rate: false,//特码包三
            isOdds:false,  //圆形底下数字倍率

            // 单注金额
            singleCoins:"",


            // 玩法提示相关
            game_tips:'',
            win_example:'',
            win_explain:'',

            //  总概率   返奖率
            orderOdds:95, //
            orderCount:100,
            rebate:0, //返利
            rebateNum:0,  //滚动条初始值
            maxPrize: 9.8,
            minPrize: [],
            maxReward: 13, //最大返奖率
            sigleminPrize:[],

            TextArr:[],

            present_playId:'',

            //绿波  红波 蓝波  #07bf00  #ff2600   #008fff
            greenNum:["05","06","11","16","17","21","22","27","28","32","33","38","39","43","44","49"],  //绿波
            blueNum:["03","04","09","10","14","15","20","25","26","31","36","37","41","42","47","48"],  //绿波
            redNum:["01","02","07","08","12","13","18","19","23","24","29","30","34","35","40","45","46"],  //绿波

            //2 红色    1蓝色 0绿色
            colorList:[
                2,2,1,1,0, //1-5
                0,2,2,1,1, //6-10
                0,2,2,1,1, //11-15
                0,0,2,2,1,  //16-20
                0,0,2,2,1, //21-25
                1,0,0,2,2, //26-39
                1,0,0,2,2, //31-35
                1,1,0,0,2, //36-40
                1,1,0,0,2, //41-45
                2,1,1,0  // 45-49
            ],



            //特殊号--数组
            special_orderOddsList:[],
            //特殊号--对应单注中奖金额
            special_sum:"",
            special_indexList:[],

            //暂未开售阻止投注
            bet_forbid:false,
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
        }

    },
    created:function(){
      this.changeRoute();
        // this.getBetsType();
        // this.getHistoryBannerInfo();
        // this.getBetsBannerInfo();
        var oBetsList=localStorage.BetsList;

        // if(oBetsList){
        //     this.BetsList=JSON.parse(oBetsList);
        // }
        // this.getSysConfig();

        // localStorage.lottery_id= this.oneTypeId;


      this.pullToRefresh.setNowThis(this);
      //this.isCollect = localStorage.collectGame && JSON.parse(localStorage.collectGame).collectList[this.oneTypeId] ? 1 : 0;

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
      //初始化全局变量
      // this.global_timingStorage[this.$route.name] = {};
      // this.global_timingStorage.nowName=this.$route.name;
    },
    mounted:function(){
        this.initDom();
        mui('.mui-switch')['switch']();
        // var h=$(window).height(),
        // mh=h-$('#header').height()-$('#offCanvasContentScroll>div>div:nth-child(1)').height()-$('#offCanvasContentScroll>div>div:nth-child(3)').height();
        //   $("#mainArea").css({
        //       height:mh
        //   });
        //   $('#mainArea>.mui-row:nth-child(1)').css({
        //   height:mh-15
        //   });
        var h=$(window).height(),
        mh=h-44-$('#offCanvasContentScroll>div>div:nth-child(1)').height()-50;
         $('#mainArea>.mui-row:nth-child(1)').css({
                height:mh-12,
        });
        $("#mainArea").css({
            height:mh+50
          });


    },
    methods:{
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
      pulldownRefresh(_this) {
        _this.get_userState(1);
      },
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
        initDom:function(){
            var _this=this;
            var h = $(window).height() + 'px';
            var w = $(window).width() + 'px';
            $('.mask').css({width: w, height: h, background: "rgba(0, 0, 0, 0.4)",
              position: "fixed", top: "0", right: "0","z-index":11,
            });
            $('.play_menu').css({width: w, height: h,});
            $('.pay').css({width: w, height: h,});
            $('.success').css({width: w, height: h,});
            $('.mask .inner').css({width: "75%", color: "#fff", position: "absolute", top: "30%", left: "12.5%", marginRight: "-50%",});
            $('.mask.setting .inner').css({width: "85%", color: "#fff", position: "absolute", top: "20%", left: "7.5%", marginRight: "-50%",});
            $('.popup').css({
                top: parseInt(h) / 2 - $('.popup').height() / 2 + "px"
            });
            // 点击近期开奖弹出近期开奖列表
            // $(".btn_banner").click(function () {
            //     $(".record").slideToggle();
            //     $(".ico").toggleClass('active');
            // });
            // 点击遮罩隐藏玩法说明弹出层
            $("#lhc").on("click", ".mask.help", function () {
                $(".mask").css({ display: "none" });
                //$("body").css("overflow", "auto");
            });
            // 点击玩法帮助弹出玩法说明界面
            $("#lhc").on("click", ".playTips span", function () {
                $(".mask.help").css({ display: "block" });
                $("body").css("overflow", "hidden");
            });
            $(".play_head").on("click", "li", function () {
                $(this).addClass("active").siblings("li").removeClass("active");
                $(".play_list ul").children("li").css({ display: "none" });
                $(".play_list ul").children("li").eq($(this).index()).css({ display: "block" });
                $(".play_list ul").children("li").eq($(this).index()).find(".sel:first").trigger("click");
                if ($(".play_list ul").children("li").eq($(this).index()).find(".sel").length > 1) {
                    _this.switchoverType=true;
                }
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
            // $(".success.suc .top_head span").click(function () {
            //     $(".success.suc").css({ display: "none" });
            //     $("#mainArea").css({ display: "block" });
            //     $("#header").show();
            // });
            // $(".success.fail .top_head span").click(function () {
            //     $(".success.fail").css({ display: "none" });
            //     $("#mainArea").css({ display: "block" });
            //   $("#header").show();

            // });
            // $(".success.suc .mbt").click(function () {
            //     $(".success").css({ display: "none" });
            //     $("#mainArea").css({ display: "block" });
            //     $("#header").show();
            // });
            // $(".success.fail .mbt").click(function () {
            //     $(".success.fail").css({ display: "none" });
            //     $("#mainArea").css({ display: "block" });
            //   $("#header").show();
            // });
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
            })
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
      //请求计划
    //   getPlanData: function () {
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
    //   gamePlanScoll: function (e) {
    //     var index = this.gamePlanPageIndex - 2,
    //       lisLen = $("#gamePlanList li").height() * 5,
    //       ulLen = $("#gamePlanList").height(),
    //       ulScollTop = $("#gamePlanList").scrollTop() - index * lisLen;
    //     // if ((ulScollTop < (lisLen-ulLen)&&index==0) || (ulScollTop > index * lisLen && ulScollTop < (index * lisLen+5))){
    //     if (ulScollTop > 0.5 && ulScollTop > (lisLen - ulLen)) {
    //       this.gamePlanPageIndex = index + 3;
    //       this.getPlanDataList();
    //     }
    //   },
        // 获取历史开奖数据
        getHistoryBannerInfo:function(){
            var _this=this,colorList=[],
                obj={
                type:"post",
                url:'/commonAPI/hisOpenData',
                data:{
                    one_type_id:_this.oneTypeId,
                    count:20
                },
                success:function(data){
                    if(data.code==200&&data.body&&data.body.length!=0) {
                      if (_this.previousIssue && data.body[0].issue !== _this.previousIssue && _this.previousIssue_tips) {
                        // setTimeout(function () {
                        //   _this.getHistoryBannerInfo();
                        // }, 20000);
                        _this.global_timingStorage.setOption(_this, ["getHistoryBannerInfo"], 10000, 1, _this.oneTypeId);
                      } else {
                        _this.previousIssue = data.body[0].issue;
                        _this.previousIssue_tips = "";
                        if (_this.preventBanner) {
                          //_this.getPlanData();
                        }
                      }
                        _this.history = data.body;
                        // //console.log(_this.history);
                        _this.recentlyNum = data.body[0].luck_number;
                        _this.history.map(function (itemA,indexA) {
                            _this.history[indexA].color = '';
                            colorList = itemA.luck_number.split(/[+ ,]/);
                            colorList.map(function (itemB,indexB) {
                               if(_this.isArrayContainer(_this.greenNum,itemB)){
                                   if(_this.history[indexA].color!=''){
                                       _this.history[indexA].color=_this.history[indexA].color+","+'green';
                                   }else{
                                       _this.history[indexA].color='green';
                                   }
                               }else if(_this.isArrayContainer(_this.blueNum,itemB)){
                                   if(_this.history[indexA].color!=''){
                                       _this.history[indexA].color =_this.history[indexA].color+","+'blue' ;
                                   }else{
                                       _this.history[indexA].color='blue';
                                   }
                                } else if(_this.isArrayContainer(_this.redNum,itemB)){
                                   if(_this.history[indexA].color!=''){
                                       _this.history[indexA].color=_this.history[indexA].color+","+'red';
                                   }else{
                                       _this.history[indexA].color='red';
                                   }

                                }
                            });
                        });

                        _this.recentlyColor = _this.history[0].color;

                        // //console.log(_this.recentlyColor);

                        _this.presentNum = parseInt(data.body[0].issue) + 1;

                    }else {
                        // setTimeout(function () {
                        //     _this.getHistoryBannerInfo();
                        // }, 10000)
                        _this.history = [];
                      _this.global_timingStorage.setOption(_this, ["getHistoryBannerInfo"], 10000, 1, _this.oneTypeId);
                    }
                },
                error:function(res){}
            };
            this.base.callCommonApi(obj);
        },

        //判断某个元素是否存在某个数组中
        isArrayContainer:function(arr, obj) {
            var i = arr.length;
            while (i--) {
                if (arr[i] === obj) {
                    return true;
                }
            }
            return false;
        },

        // 获取当前可投注期次信息
        getBetsBannerInfo:function(){
          if (!this.oneTypeId) {
            return
          }
            var _this = this,
                obj = {
                type: "post",
                url: '/commonAPI/getIssueInfo',
                data: {
                    one_type_id: _this.oneTypeId,
                },
                success: function (data) {
                    if (_this.deadlineTiming){
                        window.clearInterval(_this.deadlineTiming);
                        _this.deadlineTiming="";
                    }
                  _this.bet_forbid = false;
                    if (data.code == 200 && data.body) {
                        if(!data.body.deadline){
                            _this.preventBanner="";
                            _this.deadlineStr="封盘";
                            return
                        }
                        if (data.body.saleStatus == "ON_SALE") {
                            _this.preventBanner = data.body.issue;
                            _this.bet_forbid = false;
                            _this.noSale = false;
                          // if (!_this.nowGamePlan) {
                          //   //_this.getPlanData();
                          // }
                            // setTimeout(function () {
                            //     _this.getHistoryBannerInfo();
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
                          // setTimeout(function () {
                          //   _this.getHistoryBannerInfo();
                          // }, 20000);
                          _this.global_timingStorage.setOption(_this, ["getHistoryBannerInfo"], 10000, 1, _this.oneTypeId);
                          _this.previousIssue_tips = "开奖中...";
                          //_this.getPlanData();
                        } else {
                          // setTimeout(function () {
                          //   _this.getHistoryBannerInfo();
                          // }, 20000);
                          _this.global_timingStorage.setOption(_this, ["getHistoryBannerInfo"], 10000, 1, _this.oneTypeId);
                          _this.previousIssue_tips = "";
                          if (!_this.nowGamePlan) {
                            //_this.getPlanData();
                          }
                        }
                      }
                        // _this.preventBanner=data.body.issue;
                        // _this.lastTime=data.body.deadline;
                        _this.lastTime=_this.getMilliseconds(data.body.deadline);
                        _this.startTime=_this.getMilliseconds(data.body.response_date);
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

                        _this.countdown(_this.lastTime,_this.startTime);
                        _this.deadlineTiming=setInterval(function(){
                            _this.startTime+=1000;
                            _this.countdown(_this.lastTime,_this.startTime);
                        },1000);
                        // setTimeout(function(){_this.getHistoryBannerInfo();},120000);
                    }else if(data.code == 201){
                        // _this.bet_forbid=true;
                        _this.preventBanner="";
                        _this.deadlineStr=data.msg;
                    }
                    else {
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
        getBetsType:function(){
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
                            _this.initializeBetsTypeData(data.body)
                        } else {
                        }
                    },
                    error: function (res) {

                    }
                },
                dataList=localStorage.qryGamePlayInfo?JSON.parse(localStorage.qryGamePlayInfo):"",
                ots=localStorage.qryGamePlayInfoTimestamp?JSON.parse(localStorage.qryGamePlayInfoTimestamp):"",
                nts=localStorage.contrastTimestamp?JSON.parse(localStorage.contrastTimestamp).gameTypeSign:"";

            //比对时间戳，看是否需要更新
          if ((!nts[_this.oneTypeId] && !ots[_this.oneTypeId] && dataList[_this.oneTypeId]) || (dataList != "" && ots != "" && nts != "" && nts != null && ots[_this.oneTypeId] && dataList[_this.oneTypeId] && ots[_this.oneTypeId] == nts[_this.oneTypeId]) && dataList[_this.oneTypeId].length != 0) {
                _this.initializeBetsTypeData(dataList[_this.oneTypeId])
            }else{
                _this.contrastTimestamp();
                this.base.callCommonApi(obj);
            }
        },
        //初始化投注项数据
        initializeBetsTypeData:function(data){
            var _this=this,oneTypeArr=[],dataList;
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
            data.sort(function (a, b) { return a.sort2 - b.sort2});
          _this.gamePlayCode1 = data[0].code1 ? data[0].code1 : '';
            // 第一遍遍历添加一级玩法
            data.map(function(item){
                if(!oneTypeArr.some(function(items){
                    return items==item.name2
                })){
                    oneTypeArr.push(item.name2)
                }
            });
            oneTypeArr.map(function(item){
                _this.menu.push({
                    oneType:item,
                    twoType:[]
                })
            });
            data.map(function(item){
                _this.menu.map(function(items){
                    //如果大玩法相同
                    if (items.oneType == item.name2){
                        var Ename = '';
                        for (var key in _this.play_area_manner) {
                            if (_this.play_area_manner[key].code3 == item.code3) {
                                Ename = _this.play_area_manner[key].Ename;
                                _this.play_area_manner[key].maxPrize = item.max_prize;
                                _this.play_area_manner[key].minPrize = item.min_prize;
                                _this.play_area_manner[key].maxReward = item.max_reward;
                                _this.play_area_manner[key].id3 = item.id3;
                                _this.play_area_manner[key].id2 = item.id2;
                                _this.play_area_manner[key].id1 = item.id1;
                              _this.play_area_manner[key].is_plan = item.is_plan;
                              _this.play_area_manner[key].maxAmount = item.maxAmount;
                              _this.play_area_manner[key].minAmount = item.minAmount;
                            }
                        }
                        items.twoType.push({
                            name:item.name3,
                            Ename: Ename,
                            game_tips: item.game_tips,
                            id3: item.id3,
                            win_explain: item.win_explain,
                            win_example: item.win_example,
                            maxPrize:item.max_prize,
                            minPrize:item.min_prize,
                            maxReward:item.max_reward,
                            sort3:item.sort3
                        })
                    }
                })
            });
            _this.menu.map(function(item){
                item.twoType.sort(function(a,b){return a.sort3-b.sort3})
            });
          _this.setOrderOdds();
            _this.typeNameTitle = data[0].name1;
            _this.title = _this.menu[0]['oneType'] + '-'+_this.menu[0]['twoType'][0]['name'];
            _this.handlePlayType(_this.menu[0]['twoType'][0]['Ename']);
            _this.maxPrize =_this.menu[0]['twoType'][0]['maxPrize'];
            _this.minPrize =_this.menu[0]['twoType'][0]['minPrize'];
            _this.maxReward =_this.menu[0]['twoType'][0]['maxReward'];
            _this.orderOdds=_this.maxPrize;


          //dom树初始化
          $("#gameplayArea .play_head>ul li.active").removeClass("active");
          $("#gameplayArea .play_head>ul li:first").addClass("active");

          $("#gameplayArea .play_list>ul li:first").css({
            display: "block"
          });
          $("#gameplayArea .play_list>ul li:first .type_item .sel:first").removeClass("active");
          $("#gameplayArea .play_list>ul li:first .type_item .sel:first").addClass("active");

        },

      // 固定差值=(最大 最小) (最大返点 * 10)			保留三位小数并舍去三位以后小数
      // 当前 最大 -固定差值 * (最大返点 - 当前返点) * 10)
      // _this.menu，play_area_manner
      setOrderOdds() {
        //重新计算 !this.rebateList
        if (localStorage.szcRebateList) {
          var _this = this, item, code1 = _this.gamePlayCode1,
            rebateList = JSON.parse(localStorage.szcRebateList);
          for (var i in rebateList) {
            if (rebateList[i].code == code1) {
              this.rebateList = rebateList[i]
              break
            }
          }

          //原始数据
          //play_area_manner
          for (var key in _this.play_area_manner) {
            item = _this.play_area_manner[key];
            if (item.maxPrize){
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
        contrastTimestamp:function(){
            var _this=this,timeList,
                obj={
                    type:"post",
                    url:"/commonAPI/privacy/getUpdateStatusSign",
                    data:{
                        isWhite:true
                    },
                    success:function(data){
                        var ulist=[],nlist=[],oDataList,nameList=["sysAdvpictureSign","sysBulletinSign","sysConfigureSign","sysLotterySign"];
                        if(data.body){
                            localStorage.contrastTimestamp=JSON.stringify(data.body);
                            if(localStorage.qryGamePlayInfoTimestamp){
                                timeList=JSON.parse(localStorage.qryGamePlayInfoTimestamp);
                                timeList[_this.oneTypeId]=data.body.gameTypeSign[_this.oneTypeId];
                                localStorage.qryGamePlayInfoTimestamp=JSON.stringify(timeList);
                            }else{
                                timeList={};
                                timeList[_this.oneTypeId]=data.body.gameTypeSign[_this.oneTypeId];
                                localStorage.qryGamePlayInfoTimestamp=JSON.stringify(timeList);
                            }
                        }else{
                            localStorage.contrastTimestamp="";
                            setTimeout(function(){
                                _this.contrastTimestamp();
                            },2000);
                        }
                    },
                };
            this.base.callCommonApi(obj);
        },

        //管理玩法的函数
        handlePlayType: function (typeName,items) {
            var _this = this;
            _this.gameAreaShow=[0,0,0,0];
            _this.numberArr =[];
            _this.isChangePlayId=true;  //切换玩法
            _this.switchoverType=false;  //全部玩法关闭
            // if(!$(".record").is(':visible')){  //关闭近期期数
            //     $(".record").hide();
            //     $(".ico").toggleClass('active');
            // }
            for (var key in _this.play_area_manner) {
                _this.play_area_manner[key].isSel = false;
            }
            _this.preventType = typeName;  //当前玩法名称
            _this.play_area_manner[typeName].isSel = true;  //设置当前玩法
            _this.title = _this.play_area_manner[typeName].title; //设置当前玩法的title
            _this.minPrize = _this.play_area_manner[typeName].minPrize; //获取
            // _this.sigleminPrize = _this.minPrize.split('|');
            _this.TextArr = _this.play_area_manner[typeName].TextArr;
            _this.maxPrize = _this.play_area_manner[typeName].maxPrize;
            _this.sigleminPrize = _this.maxPrize.split('|');
            // _this.sigleminPrize = _this.maxPrize.split('|');
            _this.maxReward = _this.play_area_manner[typeName].maxReward;
            _this.orderOdds = _this.play_area_manner[typeName].maxPrize;
            _this.rebateNum = 0;
            _this.rebate = _this.play_area_manner[typeName].maxReward;
            _this.present_playId=_this.play_area_manner[typeName].judgeId;
          _this.planTypeId = _this.play_area_manner[typeName].id3;
          _this.isPlan = _this.play_area_manner[typeName].is_plan;
          _this.singleMaxMinList = [_this.play_area_manner[typeName]['minAmount'], _this.play_area_manner[typeName]['maxAmount']];
          _this.gamePlanPageIndex = 1;
          _this.showGamePlan = 0;
          _this.gamePlanList = [];
            if(_this.play_area_manner[typeName].number){
                for(var i=0;i<_this.TextArr.length;i++){
                    var obj = {};
                    obj.name = _this.TextArr[i];
                    obj.bet = _this.sigleminPrize[i];
                    obj.num = _this.play_area_manner[typeName].number[i];
                    _this.numberArr.push({ 'name': obj.name, isSel: false,'bet': obj.bet,'num':obj.num })
                }
            }else {
                var obj2 =[];
                for(var i=0;i<_this.TextArr.length;i++){
                    var obj = {};
                    obj.name = _this.TextArr[i];
                    for(var key in _this.zodiacRule){
                        if(obj.name == key){
                          var spa =   _this.zodiacRule[key].replace("\"","").split(",");
                            obj2.push(spa);
                        }
                    }
                    obj.num = obj2[i];
                    obj.bet = _this.sigleminPrize[i];
                    _this.numberArr.push({ 'name': obj.name, isSel: false,'bet': obj.bet, 'num':obj.num})
                }
            }






            //颜色
            _this.numberArr.map(function (item) {
                if(_this.isArrayContainer(_this.greenNum,item.name)){
                    item.color = "green";
                    // item.color = "#07bf00";
                }else if(_this.isArrayContainer(_this.redNum,item.name)){
                    item.color = "red";
                    // item.color = "#ff2600";
                }else if(_this.isArrayContainer(_this.blueNum,item.name)){
                    item.color = "blue";
                }

                // //console.log(item.color);
            });



            var jd = _this.present_playId;


            if(jd == 11||jd==21||jd==71||jd==81||jd==83||jd==85||jd==87||jd==89||jd==811||jd==151||jd==171||jd==172||jd==173||jd==174||jd==175||jd==176){
                _this.gameAreaShow[0] = 1;
            }else if(jd == 12||jd==22||jd==32||jd==33||jd==61||jd==72||jd==82||jd==84||jd==86||jd==88||jd==810||jd==812||jd==91||jd==92||jd==93||jd==94||jd==95||jd==96||jd==131||jd==141){
                _this.gameAreaShow[1] = 1;
            }else if(jd==31||jd==41||jd==51||jd==101||jd==111||jd==112||jd==121||jd==161||jd==162||jd==163||jd==164||jd==165||jd==166||jd==167||jd==168){
                _this.gameAreaShow[2] = 1;
            }
            if(jd==51||jd==151||jd==171||jd==172||jd==173||jd==174||jd==175||jd==176){
                _this.singleminMax = true;
            }else {
                _this.singleminMax = false;
                _this.setSpecialSum();

            }
            _this.clearSelOptions();
            setTimeout(function(){
                _this.isChangePlayId=false;
            },100);
          //请求计划
          if (_this.preventBanner) {
            //_this.getPlanData();
          }
        },

        //页面跳转--返回
        goback_click:function(){
            var that=this;
            if(localStorage.app_flag == undefined) {
                window.location.href = '../index.html';
            } else {
                var h = plus.webview.getLaunchWebview(); //获取首页窗口
                localStorage.renovate = 1; //存入变量控制首页刷新
                mui.fire(h, 'refresh'); //传值给首页执行的方法名
                setTimeout(function() { //延迟关闭本窗口，目的是给首页足够的刷新时间做判断是展开哪个页面.
                    var ws = plus.webview.currentWebview();
                    plus.webview.close(ws);
                }, 500)
            }
        },

        // 获取毫秒数
        getMilliseconds: function (str) {
            str = str.replace(new RegExp("-", "gm"), "/");
            return (new Date(str)).getTime(); //得到毫秒数
        },

        //时间倒计时
        // countdown:function(time){
        countdown:function(lastTime,startTime){
            var _this=this,
                // deadlineT=_this.getMilliseconds(time)-new Date().getTime(),
                deadlineT=lastTime-startTime,
                deadline_hour=_this.getzf(Math.floor(deadlineT / 1000 / 60 / 60 )),
                deadline_minute=_this.getzf(Math.floor(deadlineT / 1000 / 60 % 60)),
                deadline_second=_this.getzf(Math.floor(deadlineT / 1000  % 60));
            if(deadlineT>=0){
                _this.deadlineStr=deadline_hour+":"+deadline_minute+":"+deadline_second;
            }else{
                _this.deadlineStr="正在请求数据...";

                clearInterval(_this.deadlineTiming);
                _this.deadlineTiming="";
                _this.stopBanner=_this.preventBanner;
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
        getzf: function(num) {
            if(parseInt(num) < 10) {
                num = '0' + num;
            }
            return num;
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
        // $(".mask.menu").trigger("click");
        // $(".mask.help").css({ display: "block" });
        // $("body").css("overflow", "hidden");
            var _this=this;
            _this.menu.map(function(item){
                item.twoType.map(function(items){
                    if (items.Ename == _this.preventType) {
                        _this.game_tips = items['game_tips'];
                        _this.win_explain = items['win_explain'];
                        _this.win_example = items['win_example']
                    }
                })
            });
            // mui('#topPopover').popover('toggle');
            // mui('#topPopover_tips').popover('toggle');
            this.showMenu();
      this.closeMenu();
        },

        //全大小单双清--按钮
        multifunctional_btnClick:function(index){
            var _this=this,len = _this.numberArr.length/2;
            switch (index){
                case 0://全
                    _this.numberArr.map(function(item){
                        item.isSel=true;
                    });
                    break;
                case 1://大
                    _this.numberArr.map(function(item,index){
                        if(index>=len){
                            item.isSel=true;
                        }else{
                            item.isSel=false;
                        }
                    });
                    break;
                case 2://小
                    _this.numberArr.map(function(item,index){
                        if(index<len){
                            item.isSel=true;
                        }else{
                            item.isSel=false;
                        }
                    });
                    break;
                case 3://单
                    _this.numberArr.map(function(item,index){
                        if(item.name%2!=0){
                            item.isSel=true;
                        }else{
                            item.isSel=false;
                        }
                    });
                    break;
                case 4://双
                    _this.numberArr.map(function(item,index){
                        if(item.name%2==0){
                            item.isSel=true;
                        }else{
                            item.isSel=false;
                        }
                    });
                    break;
                case 5://清
                    _this.numberArr.map(function(item){
                        item.isSel=false;
                    });
                    break;
            }
        },
        // 点击元素时给元素加上选中的类  可能还要在这里调用自动计算注数的方法
        handleAddClass: function (item,index) {
            var _this = this,jd=_this.present_playId,count=0,tempArr=[];
            switch (jd){
                case 51:
                    item.isSel = !item.isSel;
                    _this.numberArr.map(function (item,index) {
                        if(item.isSel){
                            count = count+1;
                            tempArr.push(index)
                        }
                    });
                    tempArr.splice(tempArr.indexOf(index),1);
                    if(item.isSel){
                        tempArr.push(index);
                    }
                    if(tempArr.length>11){
                        var inIndex = parseInt(Math.random() * (tempArr.length-1));
                        _this.numberArr[tempArr[inIndex]].isSel = false;
                        tempArr.splice(tempArr.indexOf(inIndex),1);
                    }
                    if(count == 2){
                      _this.orderOdds = _this.maxPrize.split("|")[0];
                    }else  if( count == 3){
                      _this.orderOdds = _this.maxPrize.split("|")[1];
                    }else  if(count == 4){
                      _this.orderOdds = _this.maxPrize.split("|")[2];
                    }else  if(count == 5){
                      _this.orderOdds = _this.maxPrize.split("|")[3];
                    }else  if(count == 6){
                      _this.orderOdds = _this.maxPrize.split("|")[4];
                    }else  if(count == 7){
                      _this.orderOdds = _this.maxPrize.split("|")[5];
                    }else  if(count == 8){
                      _this.orderOdds = _this.maxPrize.split("|")[6];
                    } else  if(count == 9){
                      _this.orderOdds = _this.maxPrize.split("|")[7];
                    } else  if(count == 10){
                      _this.orderOdds = _this.maxPrize.split("|")[8];
                    }else  if(count == 11){
                      _this.orderOdds = _this.maxPrize.split("|")[9];
                    }
                    break;
                case 151:
                    item.isSel = !item.isSel;
                    _this.numberArr.map(function (item,index) {
                        if(item.isSel){
                            count = count+1;
                            tempArr.push(index)
                        }
                    });
                    tempArr.splice(tempArr.indexOf(index),1);
                    if(item.isSel){
                        tempArr.push(index);
                    }
                    if(tempArr.length>11){
                        var inIndex = parseInt(Math.random() * (tempArr.length-1));
                        _this.numberArr[tempArr[inIndex]].isSel = false;
                        tempArr.splice(tempArr.indexOf(inIndex),1);
                    }
                    if(count == 6){
                      _this.orderOdds = _this.maxPrize.split("|")[0];
                    }else  if( count == 7){
                      _this.orderOdds = _this.maxPrize.split("|")[1];
                    }else  if(count == 8){
                      _this.orderOdds = _this.maxPrize.split("|")[2];
                    }else  if(count == 9){
                      _this.orderOdds = _this.maxPrize.split("|")[3];
                    }else  if(count == 10){
                      _this.orderOdds = _this.maxPrize.split("|")[4];
                    }else  if(count == 11){
                      _this.orderOdds = _this.maxPrize.split("|")[5];
                    }
                    break;
                case 172:
                case 176:
                    item.isSel = !item.isSel;
                    _this.numberArr.map(function (item,index) {
                        if(item.isSel){
                            tempArr.push(index)
                        }
                    });
                    tempArr.splice(tempArr.indexOf(index),1);
                    if(item.isSel){
                        tempArr.push(index);
                    }
                    if(tempArr.length>10){
                        var inIndex = parseInt(Math.random() * (tempArr.length-1));
                        _this.numberArr[tempArr[inIndex]].isSel = false;
                        tempArr.splice(tempArr.indexOf(inIndex),1);
                    }
                    break;
                case 171:
                case 173:
                case 174:
                case 175:
                    item.isSel = !item.isSel;
                    _this.numberArr.map(function (item,index) {
                        if(item.isSel){
                            tempArr.push(index)
                        }
                    });
                    tempArr.splice(tempArr.indexOf(index),1);
                    if(item.isSel){
                        tempArr.push(index);
                    }
                    if(tempArr.length>7){
                        var inIndex = parseInt(Math.random() * (tempArr.length-1));
                        _this.numberArr[tempArr[inIndex]].isSel = false;
                        tempArr.splice(tempArr.indexOf(inIndex),1);
                    }
                    break;
                default:
                    item.isSel = !item.isSel;
                    break;
            }


        },


        // 清除选中数据项
        clearSelOptions: function () {
            var _this = this;
            _this.numberArr.map(function (item) {  //当前的投注区全为选中
                item.isSel = false;
            });
            _this.bets = 0;  //注数清零
            _this.rebateNum = 0; //进度条初始化
            _this.rebate = _this.maxReward; //返利率初始化
        },


        //机选---清空
        random_or_clear:function(event){
            var _this=this;
            event=event.currentTarget;
            if(_this.isDelay){
                return
            }
            _this.isDelay=true;
            if($(event).is('.clearAllBtn')){  //如果是清空按钮,全部清空,并切换为机选
                _this.clearSelOptions();
                setTimeout(function(){
                    _this.isDelay=false;
                },200)
            }else{                 //如果是机选按钮,全部清空已选项,并切换为清空
                _this.clearSelOptions();
                _this.randomData();
                setTimeout(function(){
                    _this.isDelay=false;
                },200)
            }
        },

        //随机数据
        randomData:function(){
            var _this=this,
                outIndex=parseInt(Math.random()*5), //5以内的随机数
                inIndex=parseInt(Math.random()*10), //10以为的随机数
                outIndexList=[], //随机数索引数组
                id3=_this.present_playId; //当前的三级玩法Id
            switch (id3){  //判断当前玩法Id
                case 51:
                case 161:
                case 165:
                case 173:
                case 174:
                case 175:
                    var rxOutIndex,isHas=false,len=_this.numberArr.length;
                    for(var j=0;j<2;j++){
                        do{
                            isHas=false;
                            rxOutIndex=parseInt(Math.random()*len);
                            for(var i=0;i<outIndexList.length;i++){
                                if(outIndexList[i]==rxOutIndex){
                                    isHas=true
                                }
                            }
                        }while(isHas);
                        outIndexList.push(rxOutIndex)
                    }
                    for(var i=0;i<outIndexList.length;i++){
                        _this.numberArr.map(function(item,index){
                            if(index==outIndexList[i]){
                                item.isSel=true;
                            }
                        });
                    }
                    break;
                case 162://连尾连肖-三连肖
                case 166://连尾连肖-三连尾
                case 171://连尾连肖-三连尾
                case 172://连尾连肖-三连尾
                    var rxOutIndex,isHas=false,len=_this.numberArr.length;
                    for(var j=0;j<3;j++){
                        do{
                            isHas=false;
                            rxOutIndex=parseInt(Math.random()*len);
                            for(var i=0;i<outIndexList.length;i++){
                                if(outIndexList[i]==rxOutIndex){
                                    isHas=true
                                }
                            }
                        }while(isHas);
                        outIndexList.push(rxOutIndex)
                    }
                    for(var i=0;i<outIndexList.length;i++){
                        _this.numberArr.map(function(item,index){
                            if(index==outIndexList[i]){
                                item.isSel=true;
                            }
                        });
                    }
                    break;
                case 163:
                case 167:
                case 176:
                    var rxOutIndex,isHas=false,len=_this.numberArr.length;
                    for(var j=0;j<4;j++){
                        do{
                            isHas=false;
                            rxOutIndex=parseInt(Math.random()*len);
                            for(var i=0;i<outIndexList.length;i++){
                                if(outIndexList[i]==rxOutIndex){
                                    isHas=true
                                }
                            }
                        }while(isHas);
                        outIndexList.push(rxOutIndex)
                    }
                    for(var i=0;i<outIndexList.length;i++){
                        _this.numberArr.map(function(item,index){
                            if(index==outIndexList[i]){
                                item.isSel=true;
                            }
                        });
                    }
                    break;
                case 164:
                case 168:
                    var rxOutIndex,isHas=false,len=_this.numberArr.length;
                    for(var j=0;j<5;j++){
                        do{
                            isHas=false;
                            rxOutIndex=parseInt(Math.random()*len);
                            for(var i=0;i<outIndexList.length;i++){
                                if(outIndexList[i]==rxOutIndex){
                                    isHas=true
                                }
                            }
                        }while(isHas);
                        outIndexList.push(rxOutIndex)
                    }
                    for(var i=0;i<outIndexList.length;i++){
                        _this.numberArr.map(function(item,index){
                            if(index==outIndexList[i]){
                                item.isSel=true;
                            }
                        });
                    }
                    break;
                case 151:
                    var rxOutIndex,isHas=false,len=_this.numberArr.length;
                    for(var j=0;j<6;j++){
                        do{
                            isHas=false;
                            rxOutIndex=parseInt(Math.random()*len);
                            for(var i=0;i<outIndexList.length;i++){
                                if(outIndexList[i]==rxOutIndex){
                                    isHas=true
                                }
                            }
                        }while(isHas);
                        outIndexList.push(rxOutIndex)
                    }
                    for(var i=0;i<outIndexList.length;i++){
                        _this.numberArr.map(function(item,index){
                            if(index==outIndexList[i]){
                                item.isSel=true;
                            }
                        });
                    }
                    break;
                default:
                    var len=_this.numberArr.length; //当前投注区的长度
                    outIndex=parseInt(Math.random()*len); //当前投注区长度范围内随机数
                    _this.numberArr.map(function(item,index){ //遍历
                        if(index==outIndex){ //如果当前的索引 = 随机数,当前数为选中
                            item.isSel=true;
//	        					Vue.set(item,"numArr", [inIndex]);
                        }
                    });
                    break;
            }
        },

        // 将投注信息记录到当前投注信息记录对象中  传递一个用户选择项的数组,一维字符串数组
        handleRecodeInfo:function(seloptArr){
            var _this=this;
            _this.recentBetInfo={};
            _this.recentBetInfo.type = _this.play_area_manner[_this.preventType]["title"];
            _this.recentBetInfo.betsCount = _this.bets;
            _this.recentBetInfo.betsClause = [];
            seloptArr.map(function (item) {
                _this.recentBetInfo.betsClause.push(item);
            })
//          _this.recentBetInfo.betsCoins = _this.bets * _this.singleCoins
        },


        // d记录点击投注的信息
        handleAreaSelNum:function(opt){
            var tempArr=[];
            opt.map(function(item){
                if(item.isSel){
                    tempArr.push(item.name);
                }
            });
            return tempArr;
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
        //num为是否进行位数限制(即:严格所选数位置且可为空),0--0(不限制),1--5(5位)
        //index 多少号
        count_TotalLength:function(index,num,type){
            var rList=[0,0,0,0,0,0],
                strList=["","","","","",""],
                saveList=[],
                count=0,
                _this=this;

            count = _this.totalCountsHandler(_this.numberArr); //个数
            saveList = _this.handleAreaSelNum(_this.numberArr); //元素
            _this.handleRecodeInfo(saveList);

            saveList=[];
            if(index == 1){
                _this.bets = count;
            }else{
                if(num == 0){
                    return -1;
                }
                if(type == 0){
                    if(count>1){
                        _this.bets = 1;
                    }
                }
            }
            if(type==1){
                if(count!==0){
                    _this.setSpecialSum(_this.numberArr);
                }
            }



        },

        //机选按钮--根据参数决定机选注数
        getAppointBets:function(index){
            var _this=this,id3=_this.present_playId;
          if (_this.BetsList.length == 100) {
            mui.toast("已达投注长度上限，请先投注")
            return
          } else if (_this.BetsList.length > 95) {
            index = 100 - _this.BetsList.length
          }
            for(var i=0;i<index;i++){ // 遍历机选的注数
                _this.clearSelOptions(); //清空数据
                _this.randomData(); //
                _this.count_betNumber();
                _this.BetsList.unshift({
                    type: _this.recentBetInfo.type,
                    betsCount: _this.recentBetInfo.betsCount,
                    betsClause: _this.recentBetInfo.betsClause.join(","),
                    betsCoins: _this.singleCoins * _this.recentBetInfo.betsCount,
                    id3:_this.play_area_manner[_this.preventType].id3,
                    id2:_this.play_area_manner[_this.preventType].id2,
                    id1:_this.play_area_manner[_this.preventType].id1,
                    odds:_this.orderOdds,
                    banner: _this.preventBanner,
                    singleCoin: _this.singleCoins,
                    rebate:_this.rebate
                });
                _this.handleBetsCoins();
                _this.clearSelOptions();
            }
            localStorage.hk6BetsList=JSON.stringify(_this.BetsList);
        },



        //计算注数
        count_betNumber:function(){
            var _this=this,
                id3=_this.present_playId,
                count,
                rList=[],
                parameter={},
                // 记录每一个选择区中的数值
                comLen = 0,
                numArr=[];
            switch (id3){
                case 51://合肖-合肖
                    rList=_this.count_TotalLength(0,1,0);// index, num ,type
                    var count =0;
                    _this.numberArr.map(function (item) {
                        if(item.isSel){
                            count = count +1;
                        }
                    });
                    if(count>1){
                        _this.bets = 1;
                    }else {
                        _this.bets = 0;
                    }
                    if(count == 2){
                      _this.orderOdds = _this.maxPrize.split("|")[0];
                    }else  if( count == 3){
                      _this.orderOdds = _this.maxPrize.split("|")[1];
                    }else  if(count == 4){
                      _this.orderOdds = _this.maxPrize.split("|")[2];
                    }else  if(count == 5){
                      _this.orderOdds = _this.maxPrize.split("|")[3];
                    }else  if(count == 6){
                      _this.orderOdds = _this.maxPrize.split("|")[4];
                    }else  if(count == 7){
                      _this.orderOdds = _this.maxPrize.split("|")[5];
                    }else  if(count == 8){
                      _this.orderOdds = _this.maxPrize.split("|")[6];
                    } else  if(count == 9){
                      _this.orderOdds = _this.maxPrize.split("|")[7];
                    } else  if(count == 10){
                      _this.orderOdds = _this.maxPrize.split("|")[8];
                    }else  if(count == 11){
                      _this.orderOdds = _this.maxPrize.split("|")[9];
                    }
                    break;
                case 151: //自选不中-自选不中
                    rList=_this.count_TotalLength(0,0,2);
                    if(rList==-1){
                        var count=0;
                        _this.numberArr.map(function (item) {
                            if(item.isSel){
                                count = count +1;
                            }
                        });
                        if(count>5){
                            _this.bets = 1;
                        }
                        if(count == 6){
                            _this.orderOdds = _this.maxPrize.split("|")[0];
                        }else  if( count == 7){
                            _this.orderOdds = _this.maxPrize.split("|")[1];
                        }else  if(count == 8){
                            _this.orderOdds = _this.maxPrize.split("|")[2];
                        }else  if(count == 9){
                            _this.orderOdds = _this.maxPrize.split("|")[3];
                        }else  if(count == 10){
                            _this.orderOdds = _this.maxPrize.split("|")[4];
                        }else  if(count == 11){
                          _this.orderOdds = _this.maxPrize.split("|")[5];
                        }
                    }else{
                        return

                    }
                    break;
                case 161: //连肖连尾-二连肖
                case 165: //连肖连尾-二连尾
                    rList=_this.count_TotalLength(0,1,1);
                    var count=0;
                    _this.numberArr.map(function (item) {
                        if(item.isSel){
                            count = count +1;
                        }
                    });
                    _this.bets = countUtils.getBcGroupMix_cqssc(count, 2);
                    break;
                case 162: //连肖连尾-三连肖
                case 166: //连肖连尾-三连尾
                    rList=_this.count_TotalLength(0,1,1);
                    var count=0;
                    _this.numberArr.map(function (item) {
                        if(item.isSel){
                            count = count +1;
                        }
                    });
                    _this.bets = countUtils.getBcGroupMix_cqssc(count, 3);
                    break;
                case 163: //连肖连尾-四连肖
                case 167: //连肖连尾-四连尾
                    rList=_this.count_TotalLength(0,1,1);
                    var count=0;
                    _this.numberArr.map(function (item) {
                        if(item.isSel){
                            count = count +1;
                        }
                    });
                    _this.bets = countUtils.getBcGroupMix_cqssc(count, 4);
                    break;
                case 164: //连肖连尾-五连肖
                case 168: //连肖连尾-五连尾
                    rList=_this.count_TotalLength(0,1,1);
                    var count=0;
                    _this.numberArr.map(function (item) {
                        if(item.isSel){
                            count = count +1;
                        }
                    });
                    _this.bets = countUtils.getBcGroupMix_cqssc(count, 5);
                    break;
                case 171: //连码-三中二
                    rList=_this.count_TotalLength(0,0,1);
                    var count=0;
                    _this.numberArr.map(function (item) {
                        if(item.isSel){
                            count = count +1;
                        }
                    });
                    _this.bets = countUtils.getSixGroupDirect(count, 3);
                    break;
                case 172: //连码-三全中
                    rList=_this.count_TotalLength(0,0,1);
                    var count=0;
                    _this.numberArr.map(function (item) {
                        if(item.isSel){
                            count = count +1;
                        }
                    });
                    _this.bets = countUtils.getSixGroupDirect(count, 3);
                    break;
                case 173: //连码-二全中
                case 174: //连码-二中特
                case 175: //连码-特串
                    rList=_this.count_TotalLength(0,0,1);
                    var count=0;
                    _this.numberArr.map(function (item) {
                        if(item.isSel){
                            count = count +1;
                        }
                    });
                    _this.bets = countUtils.getBcGroupMix_cqssc(count, 2);
                    break;
                case 176: //连码-四全中
                    rList=_this.count_TotalLength(0,1,0);
                    var count=0;
                    _this.numberArr.map(function (item) {
                        if(item.isSel){
                            count = count +1;
                        }
                    });
                    _this.bets = countUtils.getBcGroupMix_cqssc(count, 4);
                    break;
                default:
                    rList=_this.count_TotalLength(1,1,1);
                    break;

            }
            _this.recentBetInfo.betsCount = _this.bets; //投注注数
            _this.recentBetInfo.betsCoins = _this.bets * _this.singleCoins //投注金额
//		        //console.log(_this.recentBetInfo.betsCount);
//		        //console.log( _this.recentBetInfo.betsCoins);

        },

        // 统计合计和总注数信息
        handleBetsCoins:function(){
            var _this=this;
            _this.totalBets = 0;
            _this.totalCoins = 0;
            _this.BetsList.map(function(item){
                _this.totalBets+=item.betsCount;
                _this.totalCoins += parseInt(item.betsCoins);
            })
            _this.tempCoins=_this.totalCoins;
            _this.totalCoins=_this.totalCoins*_this.continue_periods;
        },

        // 点击图标删除该条投注
        handleClickDelete:function(index){
            this.BetsList.splice(index,1);
            this.handleBetsCoins();
            localStorage.hk6BetsList=JSON.stringify(this.BetsList);
        },

        // 投注testllll
        handleBets:function(){
            var _this=this,id3=_this.present_playId,btnArray = ['取消', '确认'],stopBanner = '';

            //避免重复投注
            if(_this.isHandleBets){
                return
            }

            if(!_this.totalCoins){
                mui.toast('至少选择一注', { duration: 'long', type: 'div' });
                return
            }
            if(!_this.preventBanner||_this.deadlineStr=="数据获取中..."){
                mui.toast('正在获取当前期数，请稍后。。。', { duration: 'long', type: 'div' });
                return
            }
            if (this.pack_coin < this.totalCoins){
                mui.confirm('钱包金额不足，请先充值', '是否跳到充值', btnArray, function(e) {
                    if(e.index == 1) {
                        _this.$router.push({ name: "depositFile" });

                    } else {
                        return;
                    }
                })
                return;
            }else{
                _this.isHandleBets=true; //重复投注
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
            var str=JSON.parse(JSON.stringify(_this.BetsList));
            str.map(function(item){
                item.banner=_this.preventBanner;
                delete item.type;//删除属性
            });
            this.handleChase();
            var betObjedct = {
                BetsList: str,
                chase: this.continue_periods ? this.continue_periods : 1,
                is: this.after_no ? 1 : 0
            };
                var test = JSON.stringify(betObjedct);
                var obj = {
                    type: 'post',
                    data: {
                        tzJson: (test)
                    },
                    url: '/authApi/digitalBet',
                    success: function (data) {
                        _this.isHandleBets=false;
                        if(data.code==200){

                            // $(".success.suc").css({ display: "block" });
                            // $(".pay").css({display:"none"});
                            _this.sucmsg=data.msg;
                            _this.pack_coin = parseFloat(_this.pack_coin-_this.totalCoins).toFixed(2);
                            _this.user_state = "钱包:" + _this.pack_coin +_this.coinUnit+"元(可用)";
                            _this.BetsList = [];
                            localStorage.hk6BetsList="";

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
                        }
                        else if (data.code == 134) {
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
                                    })
                                    _this.betsBanner = _this.preventBanner;
                                    test = JSON.stringify(betObjedct);
                                    obj.data = { tzJson: (test)};
                                _this.base.callAuthApi(obj);
                                } else {
                                $('#header').show();
                                $('#mainArea').show();
                                    return;
                                }
                            })
                        }
                        else {
                            // $(".success.fail").css({ display: "block" });
                            // $("#header").css({display:"none"});
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
                            obj.data = { tzJson: (test)};
                            _this.stopBanner="";
                        _this.base.callAuthApi(obj);
                        } else {
                            _this.isHandleBets=false;
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


        //订单设置界面取消按钮执行
        handleCancel:function(){
            $(".mask.setting").css({display:"none"});
        },

        //订单设置界面确定按钮
        handleConfirm:function(){
            var _this = this,
            id3=_this.present_playId,
            betsClauseOne,oddOne,
             countSum = _this.singleCoins,
             contrastList = _this.singleMaxMinList,
             tipsStr="(单注)";
          if (id3 == 51 || id3 == 151 || id3 == 161 || id3 == 162 || id3 == 163 || id3 == 164 || id3 == 165 || id3 == 166 || id3 == 167 || id3 == 168 || id3 == 171 || id3 == 172 || id3 == 173 || id3 == 174 || id3 == 175 || id3 == 176) {
            countSum = countSum * _this.bets;
            tipsStr="(总额)"
          }
          if (contrastList) {
            if (parseInt(countSum) < parseInt(contrastList[0])) {
              mui.toast('单笔投注' + tipsStr + '不可小于' + contrastList[0], { duration: 'long', type: 'div' })
              return 1;
            } else if (parseInt(countSum) > parseInt(contrastList[1])) {
              mui.toast('单笔投注' + tipsStr + '不可超过' + contrastList[1], { duration: 'long', type: 'div' })
              return 1;
            }
          }
            if (_this.recentBetInfo.betsCount && _this.singleCoins>0){
              if (_this.BetsList.length != 100) {
                if(id3==51||id3==151||id3==161||id3==162||id3==163||id3==164||id3==165||id3==166||id3==167||id3==168||id3==171||id3==172||id3==173||id3==174||id3==175||id3==176){
                    betsClauseOne = _this.recentBetInfo.betsClause.join(',');
                    oddOne = _this.orderOdds;
                    _this.BetsList.unshift({
                        type: _this.recentBetInfo.type,
                        betsCount: _this.bets,
                        betsClause:betsClauseOne,
                        betsCoins: _this.singleCoins * _this.bets,
                        id3:_this.play_area_manner[_this.preventType].id3,
                        id2:_this.play_area_manner[_this.preventType].id2,
                        id1:_this.play_area_manner[_this.preventType].id1,
                        odds:oddOne,
                        banner: _this.preventBanner,
                        singleCoin: _this.singleCoins,
                        rebate:_this.rebate,
                    });
                }else{
                    for(var i=0;i<_this.bets;i++){
                        betsClauseOne = _this.recentBetInfo.betsClause[i];
                        oddOne = _this.orderOdds.split('|')[i];
                        _this.BetsList.unshift({
                            type: _this.recentBetInfo.type,
                            betsCount: 1,
                            betsClause:betsClauseOne,
                            betsCoins: _this.singleCoins * 1,
                            id3:_this.play_area_manner[_this.preventType].id3,
                            id2:_this.play_area_manner[_this.preventType].id2,
                            id1:_this.play_area_manner[_this.preventType].id1,
                            odds:oddOne,
                            banner: _this.preventBanner,
                            singleCoin: _this.singleCoins,
                            rebate:_this.rebate,
                        });
                    }
                }
              }
            //    else {
            //     mui.toast("已达投注长度上限，请先投注")
            //   }
                $(".mask.setting").css({ display: "none" });
                //$(".inner").css({ display: "none" });
                $(".pay").css({display:"none"});

                // $("#mainArea").css({display:"none"});
                _this.handleBetsCoins();
                _this.clearSelOptions();
                _this.bets = "";
                ////存储localstorage
                localStorage.hk6BetsList=JSON.stringify(_this.BetsList);
                _this.stopBanner="";
                _this.singleCoins="";
                // $("#header").hide();

              _this.handleBets();
            }else{
                mui.toast("请投注");
                return 1;
              }
        },


        // 清除所有订单
        handleClearAll:function(){
            var _this=this;
            this.BetsList=[];
            _this.totalBets = 0;
            _this.totalCoins = 0;
            _this.tempCoins=0;
            _this.handleBetsCoins();
        },

        //获取登录状态
        get_userState: function () {
            var that = this,
                userNameMsg = localStorage.userName;
          // if ((userNameMsg && that.pack_coin == 0) || (userNameMsg &&isRefresh)) {
          if (userNameMsg) {
                // that.isLogin=true;
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
                            that.user_state = "钱包:" + that.pack_coin +that.coinUnit +"(可用)";
                        } else if(data.code==336){
                            localStorage.loginTo = ".."+this.$route.path;
                            that.turnUrl("../../myCenter/login","login");
                        }
                    }
                }
                this.base.callAuthApi(getUserInfo);
            }
        },
        turnUrl: function (url,name) {
            // if (localStorage.app_flag == undefined) {
                this.$router.push({name:name});
                // mui.openWindow({
                //     url: url,
                //     id: 'url',
                //     show: {
                //         autoShow: true, //页面loaded事件发生后自动显示，默认为true
                //         aniShow: 'pop-in', //页面显示动画，默认为”slide-in-right“；
                //         duration: '200' //页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
                //     },
                //     createNew: true
                // })
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
        //获取系统配置
        getSysConfig:function(){
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
                that.coinUnit=config.coinUnit;
            }
        },

        // 投注选择界面点击提交执行
        handleSubmit:function(){
            this.singleCoins = "";
          this.$emit('isShowMaskWrapper', true);
          this.isHandleSubmitClick = true;

            if(this.bets&&!this.bet_forbid){
                // if (!this.isLogin) {
                    // this.get_userState();
                // }
                if (localStorage.userName == undefined) {
                    localStorage.loginTo = ".."+this.$route.path;
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
                    // this.get_userState();
                } else {
                    $(".mask.setting").css({ display: "block" });
                  this.$emit('isShowMaskWrapper', false)
                  this.isHandleSubmitClick = false;
                }
            } else {
              this.$emit('isShowMaskWrapper', false);
              this.isHandleSubmitClick = false;
            }
        },

        //特殊号单注处理
        setSpecialSum:function(list){
            var _this=this,indexList=[],jd = this.present_playId;
            _this.special_orderOddsList=[]; //特殊号玩法的
            var OddsList = [];
            var indexl=-1;
            if(list){
                _this.orderOdds="";
                _this.special_orderOddsList=[];
                list.map(function (item) {
                    indexl+=1;
                    if (item.isSel) {
                        OddsList.push(item.bet); //记录投注的
                        _this.special_orderOddsList.push(item.bet);//记录组
                        indexList.push(indexl);
                    }
                });
                for(var i=0;i<OddsList.length;i++){
                    _this.orderOdds+=OddsList[i]+"|";
                }
                _this.special_indexList = indexList; //赋值索引
                _this.orderOdds=_this.orderOdds.substring(0,_this.orderOdds.length-1); //去掉一个|
                if(jd ==161||jd==162||jd==163||jd==164||jd==165||jd==166||jd==167||jd==168){
                  _this.orderOdds = Math.min.apply(null,_this.orderOdds.split('|'));

                }
                if(indexList.length==1){
                    _this.special_sum=parseFloat(_this.singleCoins*_this.special_orderOddsList[0]).toFixed(2);
                    return
                }
            }else{
                if(jd ==161||jd==162||jd==163||jd==164||jd==165||jd==166||jd==167||jd==168){
                    _this.special_orderOddsList[0]=_this.orderOdds;
                }else{
                    _this.special_orderOddsList=_this.orderOdds.split("|");
                    _this.special_orderOddsList.sort(function(a,b){return a-b});
                }
            }
            if(jd ==161||jd==162||jd==163||jd==164||jd==165||jd==166||jd==167||jd==168){
                _this.special_sum=parseFloat(_this.singleCoins*_this.special_orderOddsList[0]).toFixed(2);
            }else{
                if(_this.special_indexList.length==1){
                    _this.special_sum=parseFloat(_this.singleCoins*_this.special_orderOddsList[0]).toFixed(2);
                    return
                }
                _this.special_sum=parseFloat(_this.singleCoins*_this.special_orderOddsList[0]).toFixed(2)+"~"+parseFloat(_this.singleCoins*_this.special_orderOddsList[_this.special_orderOddsList.length-1]).toFixed(2);

            }


        },


        // 改变返奖率
        changeRebate:function(){
            var _this=this,jd=_this.present_playId,maxList,minList;
            // this.rebate=(this.rebateNum*(this.maxReward/100)).toFixed(1);
            if(jd!==51||jd!==151||jd!==161||jd!==162||jd!==163||jd!==164||jd!==165||jd!==166||jd!==171||jd!==172||jd!==173||jd!==174||jd!==175||jd!==176){
                _this.orderOdds ="";
                // maxList=_this.maxPrize.split("|");

                minList=_this.minPrize.split("|");

                for(var i=0;i<_this.special_indexList.length;i++){ //选中的长度
                    var index= _this.special_indexList[i]; //索引值
                    _this.orderOdds+=minList[list];
                    // _this.orderOdds+=(maxList[index] -((maxList[index] -minList[index])/_this.maxReward*_this.rebate)).toFixed(3);
                    if(i!==_this.special_indexList.length-1)
                        _this.orderOdds+="|";
                }
                _this.setSpecialSum();
                return
            }else{
                // this.orderOdds = (this.maxPrize -((this.maxPrize-this.minPrize)/this.maxReward*this.rebate)).toFixed(3);
                this.orderOdds = _this.minPrize;
            }


        },

        handleCoins:function(){
            var _this = this;
            var jd =  _this.present_playId;
            var num = this.singleCoins;
            if (typeof (num) == "string") {
              num = num.trim().replace(/\D+/g, '')
            }

            if (num && num < 1) {
              num = 1;
            }
            this.singleCoins = num;
            if(jd!==51||jd!==151||jd!==171||jd!==172||jd!==173||jd!==174||jd!==175||jd!==176){
                this.setSpecialSum();

            }
        },

        // //显示menu（走势图...）
        // showMenu:function(){
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
        togoChart: function() {
            // mui('#topPopover').popover('toggle');
            this.closeMenu(1);
            mui.alert("暂无走势图，敬请期待。")
            // //$("body").css("overflow", "auto");
            // localStorage.chartId=this.oneTypeId;
            // if(localStorage.app_flag == undefined) {
            //     this.skip_newUrl(0, 'trend', 'trend','trend');
            // } else {
            //     this.skip_newUrl(1, 'trend', 'trend','trend');
            // }
        },

        //跳转近期开奖
        togoLottery: function() {
            // mui('#topPopover').popover('toggle');
            localStorage.chartId=this.oneTypeId;
            $('body').css('overflow','auto');
            // if(localStorage.app_flag == undefined) {
                // this.skip_newUrl(0, 'award_page', 'award_page', 'award_page');
            // } else {
            //     this.skip_newUrl(1, 'award_page', 'award_page', 'award_page');
            // }
            this.closeMenu(1);
            this.$nextTick(function(){
            this.$router.push({
                name: "award_page",
                params: {
                  "code": 'hk6',
                  "name":this.typeNameTitle
                }
              });
            });
        },

        //跳转购彩记录
        togoRecord: function() {
            // mui('#topPopover').popover('toggle');
            if(!localStorage.userName){
                this.$router.push({name:'login'});
                return;
            }
            localStorage.chartId=this.oneTypeId;
            // if(localStorage.app_flag == undefined) { //app标识
            this.closeMenu(1);
            this.$nextTick(function(){
                this.skip_newUrl(0, '../../myCenter/bettingRecord', 'bettingRecord','bettingRecord','0');
            });
            // } else {
            //     this.skip_newUrl(1, '../../myCenter/bettingRecord', 'bettingRecord','bettingRecord','0');
            // }
        },

        recharge: function () {
          $('#header').css({ display: "block" });
          $("#mainArea").css({ display: "block" });

            this.turnUrl("../../myCenter/depositFile","depositFile");
            // this.turnUrl("../../myCenter/deposit","deposit");
        },

        closePop: function () {
          $('#header').css({ display: "block" });
          $("#mainArea").css({ display: "block" });
            $(".popup").css({ display: "none" });
            $(".menu_list").css({display:"block"});
            $(".mask").css({display: "none"});
        },

        //mui跳转方法
        skip_newUrl: function(index, url, nameId,name,param) {
            switch(index) {
                case 0:
                    // window.location.href = url;
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
      changeRoute:function(to,from){
        if (this.$route.name == 'lhc') {
          this.global_timingStorage.nowName = this.$route.name;
          if (from && to &&((to.name == "lhc" && from.name == "depositFile") || (from.name == "lhc" && to.name == "depositFile"))) {
            $('.mask').css({ 'display': 'none' });
          } else {
              this.clearSelOptions();
              this.handleClearAll();
            $('#header').show();
            $('#mainArea').css('display', 'block');
            $('.pay').css('display', 'none');
          }
          this.previousIssue = "";//上期期号
          this.preventBanner = "";//当前期号
          this.planTypeId = "";//计划三级玩法id参数

          this.continue_periods = 1;// 追号期数
          this.after_no = false;// 中奖后停止追号
          var lastpath = this.$route.params.num, numList = this.szcIdList.gameIdList[this.code].split(',');
          if (!lastpath || numList.indexOf(lastpath) == -1) {
            this.$router.push({ path: '/' })
          } else {
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

        }
      },
      setSingleCoins(val,event){
          this.singleCoins=val;
          event=event.currentTarget;
          $(event).parent().find(".active").removeClass('active');
          $(event).addClass('active');
        }

    },
    watch:{
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
          this.setSpecialSum();
      },
        // 注数变动时投注金额跟随变动
        bets: function (val) {
            this.coin = val * 2;
        },
        // 监听用户选择的项并计算注数
        //投注区域选值监听
        numberArr: {
            deep: true,
            handler: function () {
                var _this = this;
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
        $route(to,from){
          if(to.name=="lhc"){
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
            //   localStorage.indexCoinMsg = "";
            //   // this.get_userState();
            // } else {
            //   this.get_userState();
            // }
            this.changeRoute(to, from);

           // this.isCollect = localStorage.collectGame && JSON.parse(localStorage.collectGame).collectList[this.oneTypeId] ? 1 : 0;
            var _this=this;
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

          } else if (from.name =="lhc"){
            this.changeRoute(to, from);
          }


        }
    },
}
