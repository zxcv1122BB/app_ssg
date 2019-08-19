"use strict";

onmessage = function onmessage(evt) {
  var d = JSON.parse(evt.data),

    //通过evt.data获得发送来的数据
    e = workerFn.calculateMinMaxBonus(d.dataList, d.indexList, d.minList, d.maxList, d.dataType);
  postMessage(JSON.stringify(e)); //将获取到的数据发送会主线程
};
var workerFn = {
  //比较数组中的数，找出最小
  findListMin: function findListMin(list) {
    var min = 0;
    if (list != "") {
      for (var i = 0, len = list.length; i < len; i++) {
        if (list[i] != 0) {
          min == 0 && (min = list[i]);
          if (min > list[i]) {
            min = list[i];
          }
        }
      }
    }
    return min;
  },
  //比较数组中的数，找出最大
  findListMax: function findListMax(list) {
    var max = 0;
    if (list != "") {
      for (var i = 0, len = list.length; i < len; i++) {
        if (list[i] != 0) {
          max == 0 && (max = list[i]);
          if (max < list[i]) {
            max = list[i];
          }
        }
      }
    }
    return max;
  },
  //找到数组中最小的几个数
  findListTwoMin: function findListTwoMin(list, index) {

    var minList = [],
      min = 1;
    list.sort(function (a, b) {
      return a - b;
    });
    for (var j = 0; j < index; j++) {
      minList.push(list[j]);
    }
    for (var j = 0, len = minList.length; j < len; j++) {
      min = min * minList[j];
    }
    return min;
  },
  //计算最大最小值
  calculateMinMaxBonus: function calculateMinMaxBonus(dataList, indexList, minList, maxList, playType) {
    var that = this,
      min = 0,
      max = 0,
      html = "",
      result = {
        min: 0,
        max: 0,
        maxList: [],
        minList: []
      };
    if (minList.length == 0) {
      switch (playType) {
        case 0:
          //胜平负
          for (var j = 0, len = dataList.length; j < len; j++) {
            var obj = dataList[j];
            var firstMinList = [],
              firstMaxList = [];
            for (var k = 0, len1 = obj.spf.length; k < len1; k++) {
              firstMinList.push(obj.spfOdds[k]);
              firstMaxList.push(obj.spfOdds[k]);
            }
            minList.push(that.findListMin(firstMinList));
            maxList.push(that.findListMax(firstMaxList));
          }
          break;
        case 1:
          //让球胜平负
          for (var j = 0, len = dataList.length; j < len; j++) {
            var obj = dataList[j];
            if (obj.rqspf != "") {
              minList.push(that.findListMin(obj.rqspfOdds));
              maxList.push(that.findListMax(obj.rqspfOdds));
            }
          }
          break;
        case 2:
          //让球胜平负和胜平负
          for (var j = 0, len = dataList.length; j < len; j++) {
            var obj = dataList[j];
            obj.selectRQ = [], obj.selectRQOdds = [], obj.selectBrq = [], obj.selectBrqOdds = [];
            for (var l = 0; l < obj.spf_rqspf.length; l++) {
              var item = obj.spf_rqspf[l],
                itemOdds = obj.spf_rqspfOdds[l];
              if (item < 3) {
                obj.selectBrq.push(item);
                obj.selectBrqOdds.push(itemOdds);
              } else {
                obj.selectRQ.push(item - 3);
                obj.selectRQOdds.push(itemOdds);
              }
            }
            if (obj.selectRQ.length == 0) {
              obj.selectRQ = "", obj.selectRQOdds = "";
            }
            if (obj.selectBrq.length == 0) {
              obj.selectBrq = "", obj.selectBrqOdds = "";
            }
            if (obj.selectRQ == "" && obj.selectBrq != "") {
              var firstMinList = [],
                firstMaxList = [];
              for (var k = 0, len2 = obj.selectBrq.length; k < len2; k++) {
                switch (parseInt(obj.selectBrq[k])) {
                  case 0:
                    var firstMin = 0,
                      checkAddList = [];
                    firstMin = obj.selectBrqOdds[k];
                    firstMinList.push(firstMin);
                    firstMaxList.push(obj.selectBrqOdds[k]);
                    break;
                  case 1:
                    var firstMin = 0,
                      checkAddList = [];
                    firstMin = obj.selectBrqOdds[k];
                    firstMinList.push(firstMin);
                    firstMaxList.push(obj.selectBrqOdds[k]);
                    break;
                  case 2:
                    var firstMin = 0,
                      checkAddList = [];
                    firstMin = obj.selectBrqOdds[k];
                    firstMinList.push(firstMin);
                    firstMaxList.push(obj.selectBrqOdds[k]);
                    break;
                  default:
                    break;
                }
              }
              minList.push(that.findListMin(firstMinList));
              maxList.push(that.findListMax(firstMaxList));
            } else {
              var allList = [0, 0, 0, 0, 0, 0],
                firstMinList = [0, 0, 0, 0, 0, 0, 0],
                firstMaxList = [0, 0, 0, 0, 0, 0, 0];
              for (var k = 0, len2 = obj.selectBrq.length; k < len2; k++) {
                allList[obj.selectBrq[k]] = obj.selectBrqOdds[k];
                firstMinList[obj.selectBrq[k]] = obj.selectBrqOdds[k];
                firstMaxList[obj.selectBrq[k]] = obj.selectBrqOdds[k];
              }
              for (var k = 0, len2 = obj.selectRQ.length; k < len2; k++) {
                allList[obj.selectRQ[k] + 3] = obj.selectRQOdds[k];
                firstMaxList[obj.selectRQ[k] + 3] = obj.selectRQOdds[k];
                firstMinList[obj.selectRQ[k] + 3] = obj.selectRQOdds[k];
              }
              if (obj.rqNum == -1) {
                if (allList[0] != 0) {
                  if (allList[3] != 0) {
                    firstMaxList[0] = allList[0] + allList[3];
                    firstMaxList[3] = allList[3] + allList[0];
                    firstMinList[3] = allList[3] + allList[0];
                  }
                  if (allList[4] != 0) {
                    firstMinList[4] = allList[4] + allList[0];
                    firstMaxList[4] = allList[4] + allList[0];
                    if (firstMaxList[0] < allList[0] + allList[4]) {
                      firstMaxList[0] = allList[0] + allList[4];
                    }
                  }
                  if (allList[3] != 0 && allList[4] != 0) {
                    if (allList[3] + allList[0] > allList[4] + allList[0]) {
                      firstMinList[0] = allList[0] + allList[4];
                    } else {
                      firstMinList[0] = allList[0] + allList[3];
                    }
                  }
                }
                if (allList[1] != 0 && allList[5] != 0) {
                  firstMinList[1] = allList[1] + allList[5];
                  firstMaxList[1] = allList[1] + allList[5];
                  if (allList[2] != 0) {
                    //平
                    firstMinList[5] = allList[1] + allList[5];
                    firstMaxList[5] = allList[1] + allList[5];
                    //负
                    firstMinList[6] = allList[2] + allList[5];
                    firstMaxList[6] = allList[2] + allList[5];
                  }
                }
                if (allList[2] != 0 && allList[5] != 0) {
                  firstMinList[2] = allList[2] + allList[5];
                  firstMaxList[2] = allList[2] + allList[5];
                }
                minList.push(that.findListMin(firstMinList));
                maxList.push(that.findListMax(firstMaxList));
              } else if (obj.rqNum == 1) {
                if (allList[0] != 0) {
                  if (allList[3] != 0) {
                    firstMaxList[0] = allList[3] + allList[0];
                    firstMinList[0] = allList[3] + allList[0];
                    firstMaxList[3] = allList[3] + allList[0];
                    firstMinList[3] = allList[3] + allList[0];
                  }
                }
                if (allList[1] != 0) {
                  if (allList[3] != 0) {
                    firstMaxList[1] = allList[3] + allList[1];
                    firstMinList[1] = allList[3] + allList[1];
                    firstMaxList[6] = allList[3] + allList[1];
                    firstMinList[6] = allList[3] + allList[1];
                  }
                }
                if (allList[2] != 0) {
                  if (allList[4] != 0) {
                    firstMaxList[2] = allList[4] + allList[2];
                    firstMinList[2] = allList[4] + allList[2];
                    firstMaxList[4] = allList[4] + allList[2];
                    firstMinList[4] = allList[4] + allList[2];
                  }
                  if (allList[5] != 0) {
                    if (allList[4] + allList[2] > allList[5] + allList[2]) {
                      firstMaxList[2] = allList[4] + allList[2];
                      firstMinList[2] = allList[5] + allList[2];
                    } else {
                      firstMaxList[2] = allList[5] + allList[2];
                      firstMinList[2] = allList[4] + allList[2];
                    }
                    firstMaxList[5] = allList[5] + allList[2];
                    firstMinList[5] = allList[5] + allList[2];
                  }
                }
                minList.push(that.findListMin(firstMinList));
                maxList.push(that.findListMax(firstMaxList));
              } else if (parseInt(obj.rqNum) <= -2) {
                if (allList[0] != 0) {
                  if (allList[3] != 0) {
                    firstMaxList[0] = allList[3] + allList[0];
                    firstMinList[0] = allList[3] + allList[0];
                    firstMaxList[3] = allList[3] + allList[0];
                    firstMinList[3] = allList[3] + allList[0];
                  }
                  if (allList[4] != 0) {
                    if (allList[3] + allList[0] > allList[4] + allList[0]) {
                      firstMinList[0] = allList[4] + allList[0];
                    } else {
                      firstMaxList[0] = allList[4] + allList[0];
                    }
                    firstMaxList[4] = allList[4] + allList[0];
                    firstMinList[4] = allList[4] + allList[0];
                  }
                  if (allList[5] != 0) {
                    if (allList[5] + allList[0] > firstMaxList[0]) {
                      firstMaxList[0] = allList[5] + allList[0];
                    }
                    if (allList[5] + allList[0] < firstMinList[0]) {
                      firstMinList[0] = allList[5] + allList[0];
                    }
                  }
                }
                if (allList[5] != 0) {
                  if (allList[1] != 0) {
                    firstMaxList[1] = allList[5] + allList[1];
                    firstMinList[1] = allList[5] + allList[1];
                  }
                  if (allList[2] != 0) {
                    firstMaxList[2] = allList[5] + allList[2];
                    firstMinList[2] = allList[5] + allList[2];
                  }
                  if (allList[0] != 0) {
                    firstMaxList[5] = allList[5] + allList[0];
                    firstMinList[5] = allList[5] + allList[0];
                  }
                }
                minList.push(that.findListMin(firstMinList));
                maxList.push(that.findListMax(firstMaxList));
              } else if (parseInt(obj.rqNum) >= 2) {
                if (allList[3] != 0) {
                  if (allList[0] != 0) {
                    firstMaxList[0] = allList[3] + allList[0];
                    firstMinList[0] = allList[3] + allList[0];
                  }
                  if (allList[1] != 0) {
                    firstMaxList[1] = allList[3] + allList[1];
                    firstMinList[1] = allList[3] + allList[1];
                  }
                  if (allList[2] != 0) {
                    firstMaxList[3] = allList[3] + allList[2];
                    firstMinList[3] = allList[3] + allList[2];
                  }
                }
                if (allList[2] != 0) {
                  if (allList[4] != 0) {
                    firstMaxList[4] = allList[4] + allList[2];
                    firstMinList[4] = allList[4] + allList[2];
                  }
                  if (allList[5] != 0) {
                    firstMaxList[5] = allList[5] + allList[2];
                    firstMinList[5] = allList[5] + allList[2];
                  }
                }
                minList.push(that.findListMin(firstMinList));
                maxList.push(that.findListMax(firstMaxList));
              }
            }
          }
          break;
        case 3:
          //比分
          for (var j = 0, len = dataList.length; j < len; j++) {
            var obj = dataList[j];
            if (obj.bf != '') {
              var firstMinList = [],
                firstMaxList = [],
                list = that.calculateBZBMinMax(obj);
              firstMaxList.push(list.bfWinMax, list.bfDrawMax, list.bfLoseMax);
              firstMinList.push(list.bfWinMin, list.bfDrawMin, list.bfLoseMin);
              minList.push(that.findListMin(firstMinList));
              maxList.push(that.findListMax(firstMaxList));
            }
          }
          break;
        case 4:
          //总进球
          for (var j = 0, len = dataList.length; j < len; j++) {
            var obj = dataList[j];
            if (obj.zjq != '') {
              var firstMinList = [],
                firstMaxList = [];
              var list = that.calculateBZBMinMax(obj);
              firstMaxList.push(list.zjqMax, list.zjqDrawMax);
              firstMinList.push(list.zjqMin, list.zjqDrawMin);
              minList.push(that.findListMin(firstMinList));
              maxList.push(that.findListMax(firstMaxList));
            }
          }
          break;
        case 5:
          //半全场
          for (var j = 0, len = dataList.length; j < len; j++) {
            var obj = dataList[j];
            if (obj.bqc != '') {
              var firstMinList = [],
                firstMaxList = [],
                list = that.calculateBZBMinMax(obj);
              firstMaxList.push(list.bqcWinMax, list.bqcDrawMax, list.bqcLoseMax);
              firstMinList.push(list.bqcWinMin, list.bqcDrawMin, list.bqcLoseMin);
              minList.push(that.findListMin(firstMinList));
              maxList.push(that.findListMax(firstMaxList));
            }
          }
          break;
        //单关和混合
        default:
          for (var j = 0, len1 = dataList.length; j < len1; j++) {
            var obj = dataList[j];
            obj.selectRQ = [], obj.selectRQOdds = [], obj.selectBrq = [], obj.selectBrqOdds = [];
            if (obj.spf_rqspf) {
              for (var l = 0; l < obj.spf_rqspf.length; l++) {
                var item = obj.spf_rqspf[l],
                  itemOdds = obj.spf_rqspfOdds[l];
                if (item < 3) {
                  obj.selectBrq.push(item);
                  obj.selectBrqOdds.push(itemOdds);
                } else {
                  obj.selectRQ.push(item - 3);
                  obj.selectRQOdds.push(itemOdds);
                }
              }
            }
            if (!obj.bf) {
              obj.bf = "";
            }
            if (!obj.zjq) {
              obj.zjq = "";
            }
            if (!obj.bqc) {
              obj.bqc = "";
            }

            if (obj.selectRQ.length == 0) {
              obj.selectRQ = "", obj.selectRQOdds = "";
            }
            if (obj.selectBrq.length == 0) {
              obj.selectBrq = "", obj.selectBrqOdds = "";
            }
            if (obj.selectRQ == "" && obj.selectBrq == "") {
              obj.rqNum = 0;
            }
            if (obj.selectRQ == "" && obj.selectBrq != "") {
              var firstMinList = [],
                firstMaxList = [];
              for (var k = 0, len2 = obj.selectBrq.length; k < len2; k++) {
                switch (parseInt(obj.selectBrq[k])) {
                  case 0:
                    var bfList = [],
                      zjqList = [],
                      bqcList = [],
                      firstMin = 0,
                      checkAddList = [];
                    for (var m = 0, len3 = obj.bf.length; m < len3; m++) {
                      if (obj.bf[m] <= 12) {
                        bfList.push(obj.bfOdds[m]);
                        firstMin++;
                      }
                    }
                    checkAddList.push(firstMin);
                    firstMin = 0;
                    for (var m = 0, len3 = obj.zjq.length; m < len3; m++) {
                      if (0 < obj.zjq[m] <= 7) {
                        zjqList.push(obj.zjqOdds[m]);
                        firstMin++;
                      }
                    }
                    checkAddList.push(firstMin);
                    firstMin = 0;
                    for (var m = 0, len3 = obj.bqc.length; m < len3; m++) {
                      if (obj.bqc[m] == 0 || obj.bqc[m] == 3 || obj.bqc[m] == 6) {
                        bqcList.push(obj.bqcOdds[m]);
                        firstMin++;
                      }
                    }
                    checkAddList.push(firstMin);
                    firstMin = 0;
                    firstMin = obj.selectBrqOdds[k];
                    checkAddList.length > 0 && checkAddList[0] == 13 && (firstMin += that.findListMin(bfList));
                    checkAddList.length > 0 && checkAddList[1] == 7 && (firstMin += that.findListMin(zjqList));
                    checkAddList.length > 0 && checkAddList[2] == 3 && (firstMin += that.findListMin(bqcList));
                    firstMinList.push(firstMin);
                    firstMaxList.push(obj.selectBrqOdds[k] + that.findListMax(bfList) + that.findListMax(zjqList) + that.findListMax(bqcList));
                    break;
                  case 1:
                    var bfList = [],
                      zjqList = [],
                      bqcList = [],
                      firstMin = 0,
                      checkAddList = [];
                    for (var m = 0, len3 = obj.bf.length; m < len3; m++) {
                      if (12 < obj.bf[m] <= 17) {
                        bfList.push(obj.bfOdds[m]);
                        firstMin++;
                      }
                    }
                    checkAddList.push(firstMin);
                    firstMin = 0;
                    for (var m = 0, len3 = obj.zjq.length; m < len3; m++) {
                      if (obj.zjq[m] == 0 || obj.zjq[m] == 2 || obj.zjq[m] == 4 || obj.zjq[m] == 6 || obj.zjq[m] == 7) {
                        zjqList.push(obj.zjqOdds[m]);
                        firstMin++;
                      }
                    }
                    checkAddList.push(firstMin);
                    firstMin = 0;
                    for (var m = 0, len3 = obj.bqc.length; m < len3; m++) {
                      if (obj.bqc[m] == 1 || obj.bqc[m] == 4 || obj.bqc[m] == 7) {
                        bqcList.push(obj.bqcOdds[m]);
                        firstMin++;
                      }
                    }
                    checkAddList.push(firstMin);
                    firstMin = 0;
                    firstMin = obj.selectBrqOdds[k];
                    checkAddList.length > 0 && checkAddList[0] == 5 && (firstMin += that.findListMin(bfList));
                    checkAddList.length > 0 && checkAddList[1] == 5 && (firstMin += that.findListMin(zjqList));
                    checkAddList.length > 0 && checkAddList[2] == 3 && (firstMin += that.findListMin(bqcList));
                    firstMinList.push(firstMin);
                    firstMaxList.push(obj.selectBrqOdds[k] + that.findListMax(bfList) + that.findListMax(zjqList) + that.findListMax(bqcList));
                    break;
                  case 2:
                    var bfList = [],
                      zjqList = [],
                      bqcList = [],
                      firstMin = 0,
                      checkAddList = [];
                    for (var m = 0, len3 = obj.bf.length; m < len3; m++) {
                      if (17 < obj.bf[m] <= 31) {
                        bfList.push(obj.bfOdds[m]);
                        firstMin++;
                      }
                    }
                    checkAddList.push(firstMin);
                    firstMin = 0;
                    for (var m = 0, len3 = obj.zjq.length; m < len3; m++) {
                      if (0 < obj.zjq[m] <= 7) {
                        zjqList.push(obj.zjqOdds[m]);
                        firstMin++;
                      }
                    }
                    checkAddList.push(firstMin);
                    firstMin = 0;
                    for (var m = 0, len3 = obj.bqc.length; m < len3; m++) {
                      if (obj.bqc[m] == 2 || obj.bqc[m] == 5 || obj.bqc[m] == 8) {
                        bqcList.push(obj.bqcOdds[m]);
                        firstMin++;
                      }
                    }
                    checkAddList.push(firstMin);
                    firstMin = 0;
                    firstMin = obj.selectBrqOdds[k];
                    checkAddList.length > 0 && checkAddList[0] == 13 && (firstMin += that.findListMin(bfList));
                    checkAddList.length > 0 && checkAddList[1] == 7 && (firstMin += that.findListMin(zjqList));
                    checkAddList.length > 0 && checkAddList[2] == 3 && (firstMin += that.findListMin(bqcList));
                    firstMinList.push(firstMin);
                    firstMaxList.push(obj.selectBrqOdds[k] + that.findListMax(bfList) + that.findListMax(zjqList) + that.findListMax(bqcList));
                    break;
                  default:
                    break;
                }
              }
              minList.push(that.findListMin(firstMinList));
              maxList.push(that.findListMax(firstMaxList));
            } else {
              var allList = [0, 0, 0, 0, 0, 0],
                firstMinList = [0, 0, 0, 0, 0, 0, 0],
                firstMaxList = [0, 0, 0, 0, 0, 0, 0];
              for (var k = 0, len2 = obj.selectBrq.length; k < len2; k++) {
                allList[obj.selectBrq[k]] = obj.selectBrqOdds[k];
                firstMinList[obj.selectBrq[k]] = obj.selectBrqOdds[k];
                firstMaxList[obj.selectBrq[k]] = obj.selectBrqOdds[k];
              }
              for (var k = 0, len2 = obj.selectRQ.length; k < len2; k++) {
                allList[obj.selectRQ[k] + 3] = obj.selectRQOdds[k];
                firstMaxList[obj.selectRQ[k] + 3] = obj.selectRQOdds[k];
                firstMinList[obj.selectRQ[k] + 3] = obj.selectRQOdds[k];
              }
              if (obj.rqNum == -1) {
                if (allList[0] != 0) {
                  if (allList[3] != 0) {
                    firstMaxList[0] = allList[0] + allList[3];
                    firstMaxList[3] = allList[3] + allList[0];
                    firstMinList[3] = allList[3] + allList[0];
                  }
                  if (allList[4] != 0) {
                    firstMinList[4] = allList[4] + allList[0];
                    firstMaxList[4] = allList[4] + allList[0];
                    if (firstMaxList[0] < allList[0] + allList[4]) {
                      firstMaxList[0] = allList[0] + allList[4];
                    }
                  }
                  if (allList[3] != 0 && allList[4] != 0) {
                    if (allList[3] + allList[0] > allList[4] + allList[0]) {
                      firstMinList[0] = allList[0] + allList[4];
                    } else {
                      firstMinList[0] = allList[0] + allList[3];
                    }
                  }
                }
                if (allList[1] != 0 && allList[5] != 0) {
                  firstMinList[1] = allList[1] + allList[5];
                  firstMaxList[1] = allList[1] + allList[5];
                  if (allList[2] != 0) {
                    //平
                    firstMinList[5] = allList[1] + allList[5];
                    firstMaxList[5] = allList[1] + allList[5];
                    //负
                    firstMinList[6] = allList[2] + allList[5];
                    firstMaxList[6] = allList[2] + allList[5];
                  }
                }
                if (allList[2] != 0 && allList[5] != 0) {
                  firstMinList[2] = allList[2] + allList[5];
                  firstMaxList[2] = allList[2] + allList[5];
                }
                var list = that.calculateBZBMinMax(obj, 1);
                //最大
                firstMaxList[0] += list.bfWinMax + list.zjqMax + list.bqcWinMax;
                firstMaxList[1] += list.bfDrawMax + list.zjqDrawMax + list.bqcDrawMax;
                firstMaxList[2] += list.bfLoseMax + list.zjqMax + list.bqcLoseMax;
                firstMaxList[3] += list.bfWinMax + list.zjqMax + list.bqcWinMax;
                firstMaxList[4] += list.bfWinMax + list.zjqMax + list.bqcWinMax;
                firstMaxList[5] += list.bfDrawMax + list.zjqDrawMax + list.bqcDrawMax;
                firstMaxList[6] += list.bfLoseMax + list.zjqMax + list.bqcLoseMax;
                //最小
                firstMinList[0] += list.bfWinMin + list.zjqMin + list.bqcWinMin;
                firstMinList[1] += list.bfDrawMin + list.zjqDrawMin + list.bqcDrawMax;
                firstMinList[2] += list.bfLoseMin + list.zjqMin + list.bqcLoseMin;
                firstMinList[3] += list.bfWinMin + list.zjqMin + list.bqcWinMin;
                firstMinList[4] += list.bfWinMin + list.zjqMin + list.bqcWinMin;
                firstMinList[5] += list.bfDrawMin + list.zjqDrawMin + list.bqcDrawMin;
                firstMinList[6] += list.bfLoseMin + list.zjqMin + list.bqcLoseMin;
                minList.push(that.findListMin(firstMinList));
                maxList.push(that.findListMax(firstMaxList));
              } else if (obj.rqNum == 1) {
                if (allList[0] != 0) {
                  if (allList[3] != 0) {
                    firstMaxList[0] = allList[3] + allList[0];
                    firstMinList[0] = allList[3] + allList[0];
                    firstMaxList[3] = allList[3] + allList[0];
                    firstMinList[3] = allList[3] + allList[0];
                  }
                }
                if (allList[1] != 0) {
                  if (allList[3] != 0) {
                    firstMaxList[1] = allList[3] + allList[1];
                    firstMinList[1] = allList[3] + allList[1];
                    firstMaxList[6] = allList[3] + allList[1];
                    firstMinList[6] = allList[3] + allList[1];
                  }
                }
                if (allList[2] != 0) {
                  if (allList[4] != 0) {
                    firstMaxList[2] = allList[4] + allList[2];
                    firstMinList[2] = allList[4] + allList[2];
                    firstMaxList[4] = allList[4] + allList[2];
                    firstMinList[4] = allList[4] + allList[2];
                  }
                  if (allList[5] != 0) {
                    if (allList[4] + allList[2] > allList[5] + allList[2]) {
                      firstMaxList[2] = allList[4] + allList[2];
                      firstMinList[2] = allList[5] + allList[2];
                    } else {
                      firstMaxList[2] = allList[5] + allList[2];
                      firstMinList[2] = allList[4] + allList[2];
                    }
                    firstMaxList[5] = allList[5] + allList[2];
                    firstMinList[5] = allList[5] + allList[2];
                  }
                }
                var list = that.calculateBZBMinMax(obj, 1);
                //最大
                firstMaxList[0] += list.bfWinMax + list.zjqMax + list.bqcWinMax;
                firstMaxList[1] += list.bfDrawMax + list.zjqDrawMax + list.bqcDrawMax;
                firstMaxList[2] += list.bfLoseMax + list.zjqMax + list.bqcLoseMax;
                firstMaxList[3] += list.bfWinMax + list.zjqMax + list.bqcWinMax;
                firstMaxList[4] += list.bfLoseMax + list.zjqMax + list.bqcLoseMax;
                firstMaxList[5] += list.bfLoseMax + list.zjqMax + list.bqcLoseMax;
                firstMaxList[6] += list.bfDrawMax + list.zjqDrawMax + list.bqcDrawMax;
                //最小
                firstMinList[0] += list.bfWinMin + list.zjqMin + list.bqcWinMin;
                firstMinList[1] += list.bfDrawMin + list.zjqDrawMin + list.bqcDrawMax;
                firstMinList[2] += list.bfLoseMin + list.zjqMin + list.bqcLoseMin;
                firstMinList[3] += list.bfWinMin + list.zjqMin + list.bqcWinMin;
                firstMinList[4] += list.bfLoseMin + list.zjqMin + list.bqcLoseMin;
                firstMinList[5] += list.bfLoseMin + list.zjqMin + list.bqcLoseMin;
                firstMinList[6] += list.bfDrawMin + list.zjqDrawMin + list.bqcDrawMin;
                minList.push(that.findListMin(firstMinList));
                maxList.push(that.findListMax(firstMaxList));
              } else if (parseInt(obj.rqNum) <= -2) {
                if (allList[0] != 0) {
                  if (allList[3] != 0) {
                    firstMaxList[0] = allList[3] + allList[0];
                    firstMinList[0] = allList[3] + allList[0];
                    firstMaxList[3] = allList[3] + allList[0];
                    firstMinList[3] = allList[3] + allList[0];
                  }
                  if (allList[4] != 0) {
                    if (allList[3] + allList[0] > allList[4] + allList[0]) {
                      firstMinList[0] = allList[4] + allList[0];
                    } else {
                      firstMaxList[0] = allList[4] + allList[0];
                    }
                    firstMaxList[4] = allList[4] + allList[0];
                    firstMinList[4] = allList[4] + allList[0];
                  }
                  if (allList[5] != 0) {
                    if (allList[5] + allList[0] > firstMaxList[0]) {
                      firstMaxList[0] = allList[5] + allList[0];
                    }
                    if (allList[5] + allList[0] < firstMinList[0]) {
                      firstMinList[0] = allList[5] + allList[0];
                    }
                  }
                }
                if (allList[5] != 0) {
                  if (allList[1] != 0) {
                    firstMaxList[1] = allList[5] + allList[1];
                    firstMinList[1] = allList[5] + allList[1];
                  }
                  if (allList[2] != 0) {
                    firstMaxList[2] = allList[5] + allList[2];
                    firstMinList[2] = allList[5] + allList[2];
                  }
                  if (allList[0] != 0) {
                    firstMaxList[5] = allList[5] + allList[0];
                    firstMinList[5] = allList[5] + allList[0];
                  }
                }
                var list = that.calculateBZBMinMax(obj, 1);
                //最大
                firstMaxList[0] += list.bfWinMax + list.zjqMax + list.bqcWinMax;
                firstMaxList[1] += list.bfDrawMax + list.zjqDrawMax + list.bqcDrawMax;
                firstMaxList[2] += list.bfLoseMax + list.zjqMax + list.bqcLoseMax;
                firstMaxList[3] += list.bfWinMax + list.zjqMax + list.bqcWinMax;
                firstMaxList[4] += list.bfWinMax + list.zjqMax + list.bqcWinMax;
                firstMaxList[5] += list.bfWinMax + list.zjqMax + list.bqcWinMax;
                //最小
                firstMinList[0] += list.bfWinMin + list.zjqMin + list.bqcWinMin;
                firstMinList[1] += list.bfDrawMin + list.zjqDrawMin + list.bqcDrawMax;
                firstMinList[2] += list.bfLoseMin + list.zjqMin + list.bqcLoseMin;
                firstMinList[3] += list.bfWinMin + list.zjqMin + list.bqcWinMin;
                firstMinList[4] += list.bfWinMin + list.zjqMin + list.bqcWinMin;
                firstMinList[5] += list.bfWinMin + list.zjqMin + list.bqcWinMin;
                minList.push(that.findListMin(firstMinList));
                maxList.push(that.findListMax(firstMaxList));
              } else if (parseInt(obj.rqNum) >= 2) {
                if (allList[3] != 0) {
                  if (allList[0] != 0) {
                    firstMaxList[0] = allList[3] + allList[0];
                    firstMinList[0] = allList[3] + allList[0];
                  }
                  if (allList[1] != 0) {
                    firstMaxList[1] = allList[3] + allList[1];
                    firstMinList[1] = allList[3] + allList[1];
                  }
                  if (allList[2] != 0) {
                    firstMaxList[3] = allList[3] + allList[2];
                    firstMinList[3] = allList[3] + allList[2];
                  }
                }
                if (allList[2] != 0) {
                  if (allList[4] != 0) {
                    firstMaxList[4] = allList[4] + allList[2];
                    firstMinList[4] = allList[4] + allList[2];
                  }
                  if (allList[5] != 0) {
                    firstMaxList[5] = allList[5] + allList[2];
                    firstMinList[5] = allList[5] + allList[2];
                  }
                }
                var list = that.calculateBZBMinMax(obj, 1);
                //最大
                firstMaxList[0] += list.bfWinMax + list.zjqMax + list.bqcWinMax;
                firstMaxList[1] += list.bfDrawMax + list.zjqDrawMax + list.bqcDrawMax;
                firstMaxList[2] += list.bfLoseMax + list.zjqMax + list.bqcLoseMax;
                firstMaxList[3] += list.bfLoseMax + list.zjqMax + list.bqcLoseMax;
                firstMaxList[4] += list.bfLoseMax + list.zjqMax + list.bqcLoseMax;
                firstMaxList[5] += list.bfLoseMax + list.zjqMax + list.bqcLoseMax;
                //最小
                firstMinList[0] += list.bfWinMin + list.zjqMin + list.bqcWinMin;
                firstMinList[1] += list.bfDrawMin + list.zjqDrawMin + list.bqcDrawMin;
                firstMinList[2] += list.bfLoseMin + list.zjqMin + list.bqcLoseMin;
                firstMinList[3] += list.bfLoseMin + list.zjqMin + list.bqcLoseMin;
                firstMinList[4] += list.bfLoseMin + list.zjqMin + list.bqcLoseMin;
                firstMinList[5] += list.bfLoseMin + list.zjqMin + list.bqcLoseMin;
                minList.push(that.findListMin(firstMinList));
                maxList.push(that.findListMax(firstMaxList));
              } else {
                var list = that.calculateBZBMinMax(obj, 0);
                switch (list.winTimes) {
                  case 0:
                    firstMinList.push(list.bfWinMin, list.zjqMin, list.bqcWinMin);
                    break;
                  case 1:
                    firstMinList.push(list.bfWinMin + list.zjqMin, list.bqcWinMin);
                    break;
                  case 2:
                    firstMinList.push(list.bfWinMin + list.bqcWinMin, list.zjqMin);
                    break;
                  case 3:
                    firstMinList.push(list.zjqMin + list.bqcWinMin, list.bfWinMin);
                    break;
                  case 4:
                    firstMinList.push(list.bfWinMin + list.zjqMin + list.bqcWinMin);
                    break;
                }
                switch (list.loseTimes) {
                  case 0:
                    firstMinList.push(list.bfLoseMin, list.zjqMin, list.bqcLoseMin);
                    break;
                  case 1:
                    firstMinList.push(list.bfLoseMin + list.zjqMin, list.bqcLoseMin);
                    break;
                  case 2:
                    firstMinList.push(list.bfLoseMin + list.bqcLoseMin, list.zjqMin);
                    break;
                  case 3:
                    firstMinList.push(list.zjqMin + list.bqcLoseMin, list.bfLoseMin);
                    break;
                  case 4:
                    firstMinList.push(list.bfLoseMin + list.zjqMin + list.bqcLoseMin);
                    break;
                }
                switch (list.drawTimes) {
                  case 0:
                    firstMinList.push(list.bfDrawMin, list.zjqDrawMin, list.bqcDrawMin);
                    break;
                  case 1:
                    firstMinList.push(list.bfDrawMin + list.zjqDrawMin, list.bqcDrawMin);
                    break;
                  case 2:
                    firstMinList.push(list.bfDrawMin + list.bqcDrawMin, list.zjqDrawMin);
                    break;
                  case 3:
                    firstMinList.push(list.zjqDrawMin + list.bqcDrawMin, list.bfDrawMin);
                    break;
                  case 4:
                    firstMinList.push(list.bfDrawMin + list.zjqDrawMin + list.bqcDrawMin);
                    break;
                }
                firstMaxList.push(list.bfWinMax + list.zjqMax + list.bqcWinMax);
                firstMaxList.push(list.bfDrawMax + list.zjqDrawMax + list.bqcDrawMax);
                firstMaxList.push(list.bfLoseMax + list.zjqMax + list.bqcLoseMax);
                minList.push(that.findListMin(firstMinList));
                maxList.push(that.findListMax(firstMaxList));
              }
            }
          }
          break;
      }
    }
    for (var i = 0, len4 = indexList.length; i < len4; i++) {
      switch (indexList[i]) {
        case 1:
          for (var m = 0, len = maxList.length; m < len; m++) {
            max += maxList[m];
          }
          min = that.findListMin(minList);
          break;
        case 2:
          for (var j = 0, len = maxList.length; j < len - 1; j++) {
            var k = j + 1;
            do {
              max += maxList[j] * maxList[k];
              k++;
            } while (k < len);
          }
          if (min == 0) {
            min += that.findListTwoMin(minList, 2);
          }
          break;
        case 3:
          //3串1
          if (minList.length == 1) {
            max += maxList[0];
            min += minList[0];
          } else {
            for (var j = 0, len = maxList.length; j < len - 2; j++) {
              var k = j + 1,
                l = j + 2;
              do {
                do {
                  max += maxList[j] * maxList[k] * maxList[l];
                  l++;
                } while (l < len);
                k++ , l = k + 1;
              } while (k < len - 1);
            }
            if (min == 0) {
              min += that.findListTwoMin(minList, 3);
            }
          }
          break;
        case 4:
          //4串1
          if (minList.length == 1) {
            max += maxList[0];
            min += minList[0];
          } else {
            for (var j = 0, len = maxList.length; j < len - 3; j++) {
              var k = j + 1,
                l = j + 2,
                m = j + 3;
              do {
                do {
                  do {
                    max += maxList[j] * maxList[k] * maxList[l] * maxList[m];
                    m++;
                  } while (m < len);
                  l++ , m = l + 1;
                } while (l < len - 1);
                k++ , l = k + 1, m = k + 2;
              } while (k < len - 2);
            }
            if (min == 0) {
              min += that.findListTwoMin(minList, 4);
            }
          }
          break;
        case 5:
          //5串1
          if (minList.length == 1) {
            max += maxList[0];
            min += minList[0];
          } else {
            for (var j = 0, len = maxList.length; j < len - 4; j++) {
              var k = j + 1,
                l = j + 2,
                m = j + 3,
                n = j + 4;
              do {
                do {
                  do {
                    do {
                      max += maxList[j] * maxList[k] * maxList[l] * maxList[m] * maxList[n];
                      n++;
                    } while (n < len);
                    m++ , n = m + 1;
                  } while (m < len - 1);
                  l++ , m = l + 1, n = l + 2;
                } while (l < len - 2);
                k++ , l = k + 1, m = k + 2, n = k + 3;
              } while (k < len - 3);
            }
            if (min == 0) {
              min += that.findListTwoMin(minList, 5);
            }
          }
          break;
        case 6:
          //6串1--------未测试
          if (minList.length == 1) {
            max += maxList[0];
            min += minList[0];
          } else {
            for (var j = 0, len = maxList.length; j < len - 5; j++) {
              var k = j + 1,
                l = j + 2,
                m = j + 3,
                n = j + 4,
                q = j + 5;
              do {
                do {
                  do {
                    do {
                      do {
                        max += maxList[j] * maxList[k] * maxList[l] * maxList[m] * maxList[n] * maxList[q];
                        q++;
                      } while (q < len);
                      n++ , q = n + 1;
                    } while (n < len - 1);
                    m++ , n = m + 1, q = m + 2;
                  } while (m < len - 2);
                  l++ , m = l + 1, n = l + 2, q = l + 3;
                } while (l < len - 3);
                k++ , l = k + 1, m = k + 2, n = k + 3, q = k + 4;
              } while (k < len - 4);
            }
            if (min == 0) {
              min += that.findListTwoMin(minList, 6);
            }
          }
          break;
        case 7:
          //7串1-------------未测试
          if (minList.length == 1) {
            max += maxList[0];
            min += minList[0];
          } else {
            for (var j = 0, len = maxList.length; j < len - 6; j++) {
              var k = j + 1,
                l = j + 2,
                m = j + 3,
                n = j + 4,
                q = j + 5,
                w = j + 6;
              do {
                do {
                  do {
                    do {
                      do {
                        do {
                          max += maxList[j] * maxList[k] * maxList[l] * maxList[m] * maxList[n] * maxList[q] * maxList[w];
                          w++;
                        } while (w < len);
                        q++ , w = q + 1;
                      } while (q < len - 1);
                      n++ , q = n + 1, w = n + 2;
                    } while (n < len - 2);
                    m++ , n = m + 1, q = m + 2, w = m + 3;
                  } while (m < len - 3);
                  l++ , m = l + 1, n = l + 2, q = l + 3, w = l + 4;
                } while (l < len - 4);
                k++ , l = k + 1, m = k + 2, n = k + 3, q = k + 4, w = k + 5;
              } while (k < len - 5);
            }
            if (min == 0) {
              min += that.findListTwoMin(minList, 7);
            }
          }
          break;
        case 8:
          //8串1---------未测试
          if (minList.length == 1) {
            max += maxList[0];
            min += minList[0];
          } else {
            for (var j = 0, len = maxList.length; j < len - 7; j++) {
              var k = j + 1,
                l = j + 2,
                m = j + 3,
                n = j + 4,
                q = j + 5,
                w = j + 6,
                e = j + 7;
              do {
                do {
                  do {
                    do {
                      do {
                        do {
                          do {
                            max += maxList[j] * maxList[k] * maxList[l] * maxList[m] * maxList[n] * maxList[q] * maxList[w] * maxList[e];
                            e++;
                          } while (e < len);
                          w++ , e = w + 1;
                        } while (w < len - 1);
                        q++ , w = q + 1, e = q + 2;
                      } while (q < len - 2);
                      n++ , q = n + 1, w = n + 2, e = n + 3;
                    } while (n < len - 3);
                    m++ , n = m + 1, q = m + 2, w = m + 3, e = m + 4;
                  } while (m < len - 4);
                  l++ , m = l + 1, n = l + 2, q = l + 3, w = l + 4, e = l + 5;
                } while (l < len - 5);
                k++ , l = k + 1, m = k + 2, n = k + 3, q = k + 4, w = k + 5, e = k + 6;
              } while (k < len - 6);
            }
            if (min == 0) {
              min += that.findListTwoMin(minList, 8);
            }
          }
          break;
      }
    }
    result.min = min, result.max = max, result.maxList = maxList, result.minList = minList;
    return result;
  },
  //计算比分，总进球，半全场最大最小
  calculateBZBMinMax: function calculateBZBMinMax(obj, index) {
    var bfWinList = [],
      bfLoseList = [],
      bfDrawList = [],
      zjqList = [],
      zjqDraw = [],
      that = this,
      bqcWinList = [],
      bqcLoseList = [],
      bqcDrawList = [],
      bfWinTimes = 0,
      bfLoseTimes = 0,
      bfDrawTimes = 0,
      zjqWinLoseTimes = 0,
      zjqDrawTimes = 0,
      bqcWinTimes = 0,
      bqcLoseTimes = 0,
      bqcDrawTimes = 0,
      list = {
        bfWinMax: 0,
        bfLoseMax: 0,
        bfDrawMax: 0,
        bfWinMin: 0,
        bfLoseMin: 0,
        bfDrawMin: 0,
        zjqMax: 0,
        zjqDrawMax: 0,
        zjqMin: 0,
        zjqDrawMin: 0,
        bqcWinMax: 0,
        bqcLoseMax: 0,
        bqcDrawMax: 0,
        bqcWinMin: 0,
        bqcLoseMin: 0,
        bqcDrawMin: 0
      };
    if (obj.bf) {

      for (var m = 0, len = obj.bf.length; m < len; m++) {
        if (obj.bf[m] <= 12) {
          bfWinList.push(obj.bfOdds[m]);
          bfWinTimes++;
          continue;
        }
        if (12 < obj.bf[m] && obj.bf[m] <= 17) {
          bfDrawList.push(obj.bfOdds[m]);
          bfDrawTimes++; continue;
        }
        if (18 < obj.bf[m] && obj.bf[m] <= 31) {
          bfLoseList.push(obj.bfOdds[m]);
          bfLoseTimes++; continue;
        }
      }
      list.bfWinMax = that.findListMax(bfWinList);
      list.bfLoseMax = that.findListMax(bfLoseList);
      list.bfDrawMax = that.findListMax(bfDrawList);
      list.bfWinMin = that.findListMin(bfWinList);
      list.bfLoseMin = that.findListMin(bfLoseList);
      list.bfDrawMin = that.findListMin(bfDrawList);
    }
    if (obj.zjq) {

      for (var m = 0, len = obj.zjq.length; m < len; m++) {
        if (obj.zjq[m] == 0 || obj.zjq[m] == 2 || obj.zjq[m] == 4 || obj.zjq[m] == 6 || obj.zjq[m] == 7) {
          zjqDraw.push(obj.zjqOdds[m]);
          zjqDrawTimes++;
        }
        if (0 < obj.zjq[m] && obj.zjq[m] <= 7) {
          zjqList.push(obj.zjqOdds[m]);
          zjqWinLoseTimes++; continue;
        }
      }
      list.zjqMax = that.findListMax(zjqList);
      list.zjqMin = that.findListMin(zjqList);
      list.zjqDrawMax = that.findListMax(zjqDraw);
      list.zjqDrawMin = that.findListMin(zjqDraw);
    }
    if (obj.bqc) {

      for (var m = 0, len = obj.bqc.length; m < len; m++) {
        if (obj.bqc[m] == 0 || obj.bqc[m] == 3 || obj.bqc[m] == 6) {
          bqcWinList.push(obj.bqcOdds[m]);
          bqcWinTimes++;
        }
        if (obj.bqc[m] == 1 || obj.bqc[m] == 4 || obj.bqc[m] == 7) {
          bqcLoseList.push(obj.bqcOdds[m]);
          bqcLoseTimes++;
        }
        if (obj.bqc[m] == 2 || obj.bqc[m] == 5 || obj.bqc[m] == 8) {
          bqcDrawList.push(obj.bqcOdds[m]);
          bqcDrawTimes++;
        }
      }
      list.bqcWinMax = that.findListMax(bqcWinList);
      list.bqcDrawMax = that.findListMax(bqcDrawList);
      list.bqcLoseMax = that.findListMax(bqcLoseList);
      list.bqcWinMin = that.findListMin(bqcWinList);
      list.bqcLoseMin = that.findListMin(bqcLoseList);
      list.bqcDrawMin = that.findListMin(bqcDrawList);
    }

    if (index == 1) {
      bfWinTimes != 13 && (list.bfWinMin = 0);
      bfLoseTimes != 13 && (list.bfLoseMin = 0);
      bfDrawTimes != 5 && (list.bfDrawMin = 0);
      zjqWinLoseTimes != 7 && (list.zjqMin = 0);
      zjqDrawTimes != 5 && (list.zjqDrawMin = 0);
      bqcWinTimes != 3 && (list.bqcWinMin = 0);
      bqcLoseTimes != 3 && (list.bqcLoseMin = 0);
      bqcDrawTimes != 3 && (list.bqcDrawMin = 0);
    } else {
      list.winTimes = 0;
      list.loseTimes = 0;
      list.drawTimes = 0;
      bfWinTimes == 13 && zjqWinLoseTimes == 7 && (list.winTimes = 1);
      bfWinTimes == 13 && bqcWinTimes == 7 && (list.winTimes = 2);
      zjqWinLoseTimes == 13 && bqcWinTimes == 7 && (list.winTimes = 3);
      bfWinTimes == 13 && zjqWinLoseTimes == 7 && bqcWinTimes == 3 && (list.winTimes = 4);
      bfLoseTimes == 13 && zjqWinLoseTimes == 7 && (list.loseTimes = 1);
      bfLoseTimes == 13 && bqcLoseTimes == 7 && (list.loseTimes = 2);
      zjqWinLoseTimes == 13 && bqcLoseTimes == 7 && (list.loseTimes = 3);
      bfLoseTimes == 13 && zjqWinLoseTimes == 7 && bqcLoseTimes == 3 && (list.loseTimes = 4);
      bfDrawTimes == 5 && zjqDrawTimes == 5 && (list.drawTimes = 1);
      bfDrawTimes == 5 && bqcDrawTimes == 3 && (list.drawTimes = 2);
      bqcDrawTimes == 3 && zjqDrawTimes == 5 && (list.drawTimes = 3);
      bfDrawTimes == 5 && zjqDrawTimes == 5 && bqcDrawTimes == 3 && (list.drawTimes = 4);
    }

    return list;
  },
  //串场----计算注数---只算串1
  calculateNum: function calculateNum(indexList, lenList) {
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
              k++ , l = k + 1;
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
                l++ , m = l + 1;
              } while (l < len - 1);
              k++ , l = k + 1, m = k + 2;
            } while (k < len - 2);
          }
          break;
        case 5:
          //5串1
          for (var j = 0, len = lenList.length; j < len - 4; j++) {
            var k = j + 1,
              l = j + 2,
              m = j + 3,
              n = j + 4;
            do {
              do {
                do {
                  do {
                    sumNum += lenList[j] * lenList[k] * lenList[l] * lenList[m] * lenList[n];
                    n++;
                  } while (n < len);
                  m++ , n = m + 1;
                } while (m < len - 1);
                l++ , m = l + 1, n = l + 2;
              } while (l < len - 2);
              k++ , l = k + 1, m = k + 2, n = k + 3;
            } while (k < len - 3);
          }
          break;
        case 6:
          //6串1--------未测试
          for (var j = 0, len = lenList.length; j < len - 5; j++) {
            var k = j + 1,
              l = j + 2,
              m = j + 3,
              n = j + 4,
              q = j + 5;
            do {
              do {
                do {
                  do {
                    do {
                      sumNum += lenList[j] * lenList[k] * lenList[l] * lenList[m] * lenList[n] * lenList[q];
                      q++;
                    } while (q < len);
                    n++ , q = n + 1;
                  } while (n < len - 1);
                  m++ , n = m + 1, q = m + 2;
                } while (m < len - 2);
                l++ , m = l + 1, n = l + 2, q = l + 3;
              } while (l < len - 3);
              k++ , l = k + 1, m = k + 2, n = k + 3, q = k + 4;
            } while (k < len - 4);
          }
          break;
        case 7:
          //7串1-------------未测试
          for (var j = 0, len = lenList.length; j < len - 6; j++) {
            var k = j + 1,
              l = j + 2,
              m = j + 3,
              n = j + 4,
              q = j + 5,
              w = j + 6;
            do {
              do {
                do {
                  do {
                    do {
                      do {
                        sumNum += lenList[j] * lenList[k] * lenList[l] * lenList[m] * lenList[n] * lenList[q] * lenList[w];
                        w++;
                      } while (w < len);
                      q++ , w = q + 1;
                    } while (q < len - 1);
                    n++ , q = n + 1, w = n + 2;
                  } while (n < len - 2);
                  m++ , n = m + 1, q = m + 2, w = m + 3;
                } while (m < len - 3);
                l++ , m = l + 1, n = l + 2, q = l + 3, w = l + 4;
              } while (l < len - 4);
              k++ , l = k + 1, m = k + 2, n = k + 3, q = k + 4, w = k + 5;
            } while (k < len - 5);
          }
          break;
        case 8:
          //8串1---------未测试
          for (var j = 0, len = lenList.length; j < len - 7; j++) {
            var k = j + 1,
              l = j + 2,
              m = j + 3,
              n = j + 4,
              q = j + 5,
              w = j + 6,
              e = j + 7;
            do {
              do {
                do {
                  do {
                    do {
                      do {
                        do {
                          sumNum += lenList[j] * lenList[k] * lenList[l] * lenList[m] * lenList[n] * lenList[q] * lenList[w] * lenList[e];
                          e++;
                        } while (e < len);
                        w++ , e = w + 1;
                      } while (w < len - 1);
                      q++ , w = q + 1, e = q + 2;
                    } while (q < len - 2);
                    n++ , q = n + 1, w = n + 2, e = n + 3;
                  } while (n < len - 3);
                  m++ , n = m + 1, q = m + 2, w = m + 3, e = m + 4;
                } while (m < len - 4);
                l++ , m = l + 1, n = l + 2, q = l + 3, w = l + 4, e = l + 5;
              } while (l < len - 5);
              k++ , l = k + 1, m = k + 2, n = k + 3, q = k + 4, w = k + 5, e = k + 6;
            } while (k < len - 6);
          }
          break;
        default:
          break;
      }
    }
    return sumNum;
  }
};
