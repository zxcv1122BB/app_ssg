onmessage = function (evt) {
  var d = JSON.parse(evt.data), //通过evt.data获得发送来的数据
    e = workerFn.calculateMinMaxBonus(d.dataList, d.indexList, d.minList, d.maxList, d.dataType);
  postMessage(JSON.stringify(e)); //将获取到的数据发送会主线程
}
var workerFn = {
  //比较数组中的数，找出最小
  findListMin: function (list) {
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
  findListMax: function (list) {
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
  findListTwoMin: function (list, index) {

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
  calculateMinMaxBonus: function (dataList, indexList, minList, maxList, playType) {
    var that = this,
      min = 0,
      max = 0,
      html = "",
      result = {
        min: 0,
        max: 0,
        maxList: [],
        minList: [],
      };
    if (minList.length == 0) {
      switch (playType) {
        case 0: //胜负
          for (var j = 0, len = dataList.length; j < len; j++) {
            var obj = dataList[j];
            minList.push(that.findListMin(obj.sfOdds));
            maxList.push(that.findListMax(obj.sfOdds));
          }
          break;
        case 1: //让分胜平负
          for (var j = 0, len = dataList.length; j < len; j++) {
            var obj = dataList[j];
            minList.push(that.findListMin(obj.rfOdds));
            maxList.push(that.findListMax(obj.rfOdds));
          }
          break;
        case 2: //大小分
          for (var j = 0, len = dataList.length; j < len; j++) {
            var obj = dataList[j];
            minList.push(that.findListMin(obj.dxfOdds));
            maxList.push(that.findListMax(obj.dxfOdds));
          }
          break;
        case 3: //胜分差
          for (var j = 0, len = dataList.length; j < len; j++) {
            var obj = dataList[j];
            minList.push(that.findListMin(obj.sfcOdds));
            maxList.push(that.findListMax(obj.sfcOdds));
          }
          break;
        case 4: //混合过关
          for (var j = 0, len = dataList.length; j < len; j++) {
            var obj = dataList[j],
              list = [0, 0, 0, 0];
            if (obj.sfc) {
              var homeWinList = [],
                homeIndexList = [],
                awayWinList = [],
                awayIndexList = [],

                //主--下标
                homeIndex_min, homeIndex_max,
                //客--下标
                awayIndex_min, awayIndex_max,
                //主--主胜
                homeWin_min = 0,
                homeWin_max = 0,
                //客--客胜
                awayWin_min = 0,
                awayWin_max = 0,
                letScore = parseInt(obj.letScore),
                maxminlist = [],

                //对照数据
                scoreList = [5, 10, 15, 20, 25, 26, 5, 10, 15, 20, 25, 26];
              for (var m = 0, len1 = obj.sfc.length; m < len1; m++) {
                var item = obj.sfc[m];
                if (item > 5) {
                  awayIndexList.push(item);
                  awayWinList.push(obj.sfcOdds[m]);
                } else {
                  homeIndexList.push(item);
                  homeWinList.push(obj.sfcOdds[m]);
                }
              }

              homeWin_min = that.findListMin(homeWinList); //主胜--最小
              homeWin_max = that.findListMax(homeWinList); //主胜--最大
              awayWin_min = that.findListMin(awayWinList); //客胜--最小
              awayWin_max = that.findListMax(awayWinList); //客胜--最大
              for (var m = 0; m < homeIndexList.length; m++) {
                if (homeWinList[m] == homeWin_min) {
                  homeIndex_min = m;
                }
                if (homeWinList[m] == homeWin_max) {
                  homeIndex_max = m
                }
              }
              for (var m = 0; m < awayIndexList.length; m++) {
                if (awayWinList[m] == awayWin_min) {
                  awayIndex_min = m;
                }
                if (awayWinList[m] == awayWin_max) {
                  awayIndex_max = m;
                }
              };
              //胜负
              if (obj.sf) {
                for (var m = 0, len1 = obj.sf.length; m < len1; m++) {
                  if (obj.sf[m] == 0) {
                    homeWin_min += obj.sfOdds[m];
                    homeWin_max += obj.sfOdds[m];
                  } else {
                    awayWin_min += obj.sfOdds[m];
                    awayWin_max += obj.sfOdds[m];
                  }
                }
              };
              //大小分
              if (obj.dxf) {
                homeWin_min += that.findListMin(obj.dxfOdds);
                homeWin_max += that.findListMax(obj.dxfOdds);
                awayWin_min += that.findListMin(obj.dxfOdds);
                awayWin_max += that.findListMax(obj.dxfOdds);
              };
              //让分
              if (obj.rf) {
                if (letScore > 0) {
                  if (letScore < 5) {
                    letScore = 0;
                  } else if (letScore > 5) {
                    letScore = 1;
                  } else if (letScore > 10) {
                    letScore = 2;
                  } else if (letScore > 15) {
                    letScore = 3;
                  } else if (letScore > 20) {
                    letScore = 4;
                  } else if (letScore > 25) {
                    letScore = 5;
                  }
                } else {
                  letScore = -letScore;
                  if (letScore < 5) {
                    letScore = 6;
                  } else if (letScore > 5) {
                    letScore = 7;
                  } else if (letScore > 10) {
                    letScore = 8;
                  } else if (letScore > 15) {
                    letScore = 9;
                  } else if (letScore > 20) {
                    letScore = 10;
                  } else if (letScore > 25) {
                    letScore = 11;
                  }
                }
                //查看让分下标
                if (homeIndex_min >= letScore) {
                  homeWin_min += that.findListMin(obj.rfOdds);
                } else {
                  for (var m = 0; m < obj.rf.length; m++) {
                    if (obj.rf[m] == 1) {
                      homeWin_min += obj.rfOdds[m];
                    }
                  }
                }
                if (homeIndex_max >= letScore) {
                  homeWin_max += that.findListMax(obj.rfOdds);
                } else {
                  for (var m = 0; m < obj.rf.length; m++) {
                    if (obj.rf[m] == 1) {
                      homeWin_max += obj.rfOdds[m];
                    }
                  }
                }
                if (awayIndex_min >= letScore) {
                  awayWin_min += that.findListMin(obj.rfOdds);
                } else {
                  for (var m = 0; m < obj.rf.length; m++) {
                    if (obj.rf[m] == 0) {
                      awayWin_min += obj.rfOdds[m];
                    }
                  }
                }
                if (awayIndex_max >= letScore) {
                  awayWin_max += that.findListMax(obj.rfOdds);
                } else {
                  for (var m = 0; m < obj.rf.length; m++) {
                    if (obj.rf[m] == 0) {
                      awayWin_max += obj.rfOdds[m];
                    }
                  }
                }
              };
              maxminlist = [homeWin_min, homeWin_max, awayWin_min, awayWin_max];
              minList.push(that.findListMin(maxminlist));
              maxList.push(that.findListMax(maxminlist));
            } else {
              if (obj.sf) {
                list[0] += that.findListMin(obj.sfOdds);
                list[1] += that.findListMax(obj.sfOdds);
              };
              if (obj.rf) {
                list[0] += that.findListMin(obj.rfOdds);
                list[1] += that.findListMax(obj.rfOdds);
              };
              if (obj.dxf) {
                list[0] += that.findListMin(obj.dxfOdds);
                list[1] += that.findListMax(obj.dxfOdds);
              };
              minList.push(list[0]);
              maxList.push(list[1]);
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
    return result
  },
  //串场----计算注数---只算串1
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
  },
};
