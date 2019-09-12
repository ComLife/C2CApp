import React, { memo, useEffect, useState } from 'react';
import { View } from 'react-native';
import styles from './styles';
import Colors from '../../../../const/colors';
import LeftHeader from './middle-components/left-header';
import LeftMiddle from './middle-components/left-middle';
import LeftSchedule from './middle-components/left-schedule';
import LeftBottom from './middle-components/left-bottom';
import RightHeader from './middle-components/right-header';
import RightMiddle from './middle-components/right-middle';
import RightBottom from './middle-components/right-bottom';
import Imgs from '../../../../const/image-set';
import { addition, division, formatNumberBase, multiplication, sub, toNumber } from '../../../../utils/digital';
import { sendWrapper } from '../../../../utils/websocket-util';
import WebSocket from '../../../../services/websocket';

interface Props {
  buy: []; //买 数据  绿色
  sell: []; //卖 数据  红色
  isBuy: boolean; //是否选择的买入
  baseBalanceData: string; //基础货币={props.baseBalaneData}
  paymentBalanceData: string; //计价货币
  twoInputValue: string;
  setTwoInputValue: any;
  dealPanel: boolean;
  setDealPanel: any;
  oneInputValue: string;
  setOneInputValue: any;
  initPriceText: string;
  setInitPriceText: any;
  baseCurrency: string;
  paymentCurrency: string;
  openDeal: any;
  userInfo: any;
  isBlur: any;
  setIsBlur: any;
  eventY: string;
  valuationMin: number;
  basicsMin: number;
  newestPrice: string;
  status: number;
  one: boolean;
  setOne: any;
  currencyRate: string;
}

const MidComponent = memo((props: Props) => {
  const {
    buy,
    sell,
    isBuy,
    baseBalanceData,
    paymentBalanceData,
    twoInputValue,
    setTwoInputValue,
    oneInputValue,
    setOneInputValue,
    initPriceText,
    setInitPriceText,
    baseCurrency,
    paymentCurrency,
    openDeal,
    userInfo,
    isBlur,
    setIsBlur,
    eventY,
    valuationMin,
    basicsMin,
    newestPrice,
    status,
    one,
    setOne,
    currencyRate,
  } = props;

  //盘口
  const [curType, setCurType] = useState('0');
  const [buyData, setBuyData] = useState([]);
  const [sellData, setSellData] = useState([]);
  //盘口按钮
  const [isDropdown, setIsDropdown] = useState(false);
  const [btnImage, setBtnImage] = useState(Imgs.icon_order);
  const [depthNum, setDepthNum] = useState('2位小数');
  const [precisionTextData, setPrecisionTextData] = useState([{}]);
  //限价
  const [isOpenPricePanel, setIsOpenPricePanel] = useState(false);
  const [priceData, setPriceData] = useState([{}]);
  //左边中间输入框
  const [midText, setMidText] = useState('');
  const [isInput, setIsInput] = useState(true);
  const [initText, setInitText] = useState('买入量');
  const [bottomText, setBottomText] = useState('0');
  //拖拉条   LeftSchedule
  const [sliderValue, setSliderValue] = useState(0);
  const [imageTrack, setImageTrack] = useState(0);
  const [imageThumb, setImageThumb] = useState(0);
  //左下Btn
  const [bottomText2, setBottomText2] = useState('0');
  const [bottomBtnBgColor, setBottomBtnBgColor] = useState(Colors.colorA2);
  const [bottomBtnText, setBottomBtnText] = useState('登录');
  const [disabled, setDisabled] = useState(true);

  const [buy1, setBuy1] = useState('0');
  const [sell1, setSell1] = useState('0');
  const [marketPrice, setMarketPrice] = useState('价格');
  const [isSchedule, setIsSchedule] = useState(false);

  //整理买币数据
  const processBuy = () => {
    const tmpBuy = buy;
    let tmpList: any = [];

    setBuy1('0');
    if (!tmpBuy) {
      setBuyData([]);
    } else if (curType === '0') {
      if (tmpBuy.length > 4) {
        tmpList = tmpBuy.slice(0, 5);
      } else {
        tmpList = tmpBuy.slice(0);
      }
    } else if (curType === '2') {
      if (tmpBuy.length > 10) {
        tmpList = tmpBuy.slice(0, 11);
      } else {
        tmpList = tmpBuy.slice(0);
      }
    }
    let tmpNum = 0;
    for (let i = 0; i < tmpList.length; i++) {
      tmpNum += toNumber(tmpList[i].entrustNum);
      tmpList[i].entrustNum = formatNumberBase(tmpList[i].entrustNum, 4);
    }
    for (let i = 0; i < tmpList.length; i++) {
      if (tmpNum !== 0) {
        const tmp = division(tmpList[i].entrustNum, tmpNum.toString(), 8);
        tmpList[i].accumulativeTotal = multiplication('232', tmp, 0);
      } else {
        tmpList[i].accumulativeTotal = multiplication('232', 0, 0);
      }
    }
    if (tmpList.length) {
      setBuy1(tmpList[0].entrustPrice);
    }
    setBuyData(tmpList);
  };

  //整理卖数据
  const processSell = () => {
    if (!sell) {
      setSellData([]);
      return;
    }
    setSell1('0');

    const tmpData: any = { entrustPrice: '', entrustNum: '', accumulativeTotal: '' };
    //倒序
    const tmpSell = sell;
    let tmpList: any = [];

    if (curType === '0') {
      if (tmpSell.length > 4) {
        tmpList = tmpSell.slice(tmpSell.length - 5, tmpSell.length);
      } else {
        tmpList = tmpSell.slice(0);
        for (let i = tmpSell.length; i < 5; i++) {
          tmpList.unshift(tmpData);
        }
      }
    } else if (curType === '1') {
      if (tmpSell.length > 10) {
        tmpList = tmpSell.slice(tmpSell.length - 11, tmpSell.length);
      } else {
        tmpList = tmpSell.slice(0);
      }
    }

    let tmpNum = 0;
    for (let i = 0; i < tmpList.length; i++) {
      if (tmpList[i].entrustNum) {
        tmpNum += toNumber(tmpList[i].entrustNum);
        tmpList[i].entrustNum = formatNumberBase(tmpList[i].entrustNum, 4);
      }
    }
    for (let i = 0; i < tmpList.length; i++) {
      if (tmpList[i].entrustNum) {
        if (tmpNum !== 0) {
          const tmp = division(tmpList[i].entrustNum, tmpNum.toString(), 8);
          tmpList[i].accumulativeTotal = multiplication('232', tmp, 0);
        } else {
          tmpList[i].accumulativeTotal = multiplication('232', 0, 0);
        }
      }
    }

    if (tmpList.length) {
      setSell1(tmpList[tmpList.length - 1].entrustPrice);
    }
    setSellData(tmpList);
  };

  useEffect(() => {
    setBuyData([]);
    setSellData([]);
    processBuy();
    processSell();
  }, [curType, buy, sell]);

  useEffect(() => {
    if (one && toNumber(sell1)) {
      // setTimeout(() => {
      setOneInputValue(sell1);
      setOne(false);
      // }, 4000);
    }
  }, [one, sell1]);

  useEffect(() => {
    if (JSON.stringify(sell) !== '[]') {
      const tmpArr = sell;
      setOneInputValue(tmpArr[tmpArr.length - 1]['entrustPrice']);
    } else {
      setOneInputValue('0');
    }
  }, [baseCurrency, paymentCurrency]);

  const closeBlur = () => {
    setTimeout(() => {
      setIsBlur(false);
    }, 200);
  };

  //====================盘口按钮

  const onColse = () => {
    setIsDropdown(false);
    setIsOpenPricePanel(false);
  };

  const precisionData = [
    { text: '4位小数', color: Colors.colorA1 },
    { text: '3位小数', color: Colors.colorB2 },
    { text: '2位小数', color: Colors.colorB2 },
    { text: '1位小数', color: Colors.colorB2 },
    { text: '1位整数', color: Colors.colorB2 },
    { text: '2位整数', color: Colors.colorB2 },
  ];

  useEffect(() => {
    if (valuationMin !== -1) {
      for (let i = 0; i < precisionData.length; i++) {
        if (valuationMin - i > 0) {
          precisionData[i]['text'] = Math.abs(valuationMin - i) + '位小数';
        } else {
          precisionData[i]['text'] = Math.abs(valuationMin - i) + 1 + '位整数';
        }
      }
      setDepthNum(precisionData[0]['text']);
      setPrecisionTextData(precisionData);
    }
  }, [valuationMin]);

  const setPrecisionData = (index: number) => {
    for (let i = 0; i < precisionData.length; i += 1) {
      if (valuationMin - i > 0) {
        precisionData[i]['text'] = Math.abs(valuationMin - i) + '位小数';
      } else {
        precisionData[i]['text'] = Math.abs(valuationMin - i) + 1 + '位整数';
      }
      if (index === i) {
        precisionData[i]['color'] = Colors.colorA1;
      } else {
        precisionData[i]['color'] = Colors.colorB2;
      }
    }
    setPrecisionTextData(precisionData);
  };

  const onDataDis = (text: string, index: number) => {
    setDepthNum(text);
    onColse();
    setPrecisionData(index);
    const accuracy = { msgType: 'switch_accuracy', msgData: { bookLevel: index } };
    WebSocket.getInstance().send(sendWrapper(accuracy));
    setIsBlur(true);
    closeBlur();
  };

  useEffect(() => {
    setPrecisionTextData(precisionData);
    return () => {
      onColse();
    };
  }, []);

  const onDepth = () => {
    setIsDropdown(true);
  };

  //===================限价
  const tmpPriceData = [{ text: '限价', color: Colors.colorA1 }, { text: '市价', color: Colors.colorB2 }];

  const setPriceValue = (index: number) => {
    for (let i = 0; i < 2; i += 1) {
      if (index === i) {
        tmpPriceData[i]['color'] = Colors.colorA1;
      } else {
        tmpPriceData[i]['color'] = Colors.colorB2;
      }
    }
    setPriceData(tmpPriceData);
  };

  const onDataDis1 = (text: string, index: number) => {
    if (index) {
      setIsInput(false);
      setMarketPrice('市价');
      setOneInputValue('');
    } else {
      setIsInput(true);
      setMarketPrice('价格');
      if (isBuy) {
        setOneInputValue(sell1.toString());
      } else {
        setOneInputValue(buy1.toString());
      }
    }
    setSliderValue(0);
    setTwoInputValue('0');
    setInitPriceText(text);
    onColse();
    setPriceValue(index);
    setIsBlur(true);
    closeBlur();
  };

  useEffect(() => {
    setPriceData(tmpPriceData);
  }, []);

  const onPrice = () => {
    setIsOpenPricePanel(true);
  };

  //切换盘口按钮
  const onChange = () => {
    if (curType === '0') {
      setCurType('1');
      setBtnImage(Imgs.icon_order_sell);
    } else if (curType === '1') {
      setCurType('2');
      setBtnImage(Imgs.icon_order_buy);
    } else if (curType === '2') {
      setCurType('0');
      setBtnImage(Imgs.icon_order);
    }
    setIsBlur(true);
    closeBlur();
  };

  //左边中间的输入框
  const onJian = () => {
    if (oneInputValue === '' || toNumber(oneInputValue) === 0 || valuationMin === -1 || !currencyRate) {
      return;
    }
    const tmp = 1 / 10 ** toNumber(valuationMin);
    const tmp1 = sub(oneInputValue, tmp);
    const tmpCNY = '≈ ' + multiplication(oneInputValue, currencyRate, 2) + ' CNY';
    setOneInputValue(tmp1.toString());
    setMidText(tmpCNY.toString());
    setIsBlur(true);
    closeBlur();
  };

  const onJia = () => {
    if (oneInputValue === '' || valuationMin === -1 || !currencyRate) {
      return;
    }
    const tmp = 1 / 10 ** toNumber(valuationMin);
    const tmp1 = addition(oneInputValue, tmp);
    setOneInputValue(tmp1.toString());
    const tmpCNY = '≈ ' + multiplication(oneInputValue, currencyRate, 2) + ' CNY';
    setMidText(tmpCNY.toString());
    setIsBlur(true);
    closeBlur();
  };

  useEffect(() => {
    let tmpPrice = '';
    if (oneInputValue && currencyRate) {
      tmpPrice = '≈ ' + multiplication(currencyRate, oneInputValue, 2) + ' CNY';
    } else {
      tmpPrice = '≈ 0 CNY';
    }
    if (!isInput) {
      tmpPrice = '';
    }
    setMidText(tmpPrice);

    if (twoInputValue && oneInputValue && oneInputValue !== '' && oneInputValue !== '0') {
      const tmp = multiplication(oneInputValue, twoInputValue);
      setBottomText2(tmp.toString());
    } else {
      setBottomText2('0');
    }

    if (isInput && toNumber(oneInputValue) && toNumber(twoInputValue)) {
      setDisabled(false);
    } else if (toNumber(oneInputValue) === 0) {
      setDisabled(true);
    } else if (!isInput && isBuy) {
      if (toNumber(twoInputValue) && sell1) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    } else if (!isInput && !isBuy) {
      if (toNumber(twoInputValue) && buy1) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }
  }, [oneInputValue]);

  useEffect(() => {
    if (basicsMin !== -1) {
      if (twoInputValue) {
        let tmp = '';
        let tmp1 = '';
        let tmp2 = '';
        let tmp3 = '';
        if (isBuy && paymentBalanceData && paymentBalanceData !== '0') {
          if (isInput && oneInputValue !== '' && oneInputValue !== '0') {
            tmp = multiplication(oneInputValue, twoInputValue).toString();
            tmp1 = division(paymentBalanceData, oneInputValue, basicsMin).toString();
            tmp2 = division(tmp1, '100').toString();
            tmp2 = tmp2.substring(0, tmp2.indexOf('.') + basicsMin + 1);
            if (toNumber(tmp2)) {
              tmp3 = division(twoInputValue, tmp2, 0).toString();
            } else {
              tmp3 = '0';
            }
          } else if (!isInput && newestPrice && newestPrice !== '0') {
            tmp = '0';
            tmp1 = division(paymentBalanceData, newestPrice, basicsMin).toString();
            tmp2 = division(tmp1, '100').toString();
            tmp2 = tmp2.substring(0, tmp2.indexOf('.') + basicsMin + 1);
            if (toNumber(tmp2)) {
              tmp3 = division(twoInputValue, tmp2, 0).toString();
            } else {
              tmp3 = '0';
            }
          } else {
            tmp = '0';
            tmp2 = '0';
            tmp3 = '0';
          }
        } else if (!isBuy && baseBalanceData && baseBalanceData !== '0') {
          tmp2 = division(baseBalanceData, '100').toString();
          tmp2 = tmp2.substring(0, tmp2.indexOf('.') + basicsMin + 1);
          if (toNumber(tmp2)) {
            if (toNumber(tmp2) !== 0) {
              tmp3 = division(twoInputValue, tmp2, 0).toString();
            } else {
              tmp3 = '0';
            }
          } else {
            tmp3 = '0';
          }
          if (isInput && oneInputValue !== '' && oneInputValue !== '0') {
            tmp = multiplication(oneInputValue, twoInputValue).toString();
          } else {
            tmp = '0';
          }
        }

        setIsSchedule(false);
        if (toNumber(tmp3) > 100) {
          setSliderValue(100);
        } else if (toNumber(tmp3)) {
          setSliderValue(toNumber(tmp3));
        } else if (toNumber(tmp2) === 0 && toNumber(twoInputValue)) {
          setSliderValue(100);
        }

        setBottomText2(tmp.toString());
        if (isInput && toNumber(oneInputValue) && toNumber(twoInputValue)) {
          setDisabled(false);
        } else if (!isInput) {
          if (isBuy && toNumber(twoInputValue) && sell1) {
            setDisabled(false);
          } else if (!isBuy && toNumber(twoInputValue) && buy1) {
            setDisabled(false);
          } else {
            setDisabled(true);
          }
        }
      } else {
        setBottomText2('0');
        setDisabled(true);
        setSliderValue(0);
      }
    }
  }, [twoInputValue]);

  useEffect(() => {
    if (paymentBalanceData && paymentBalanceData !== '0') {
      let tmp = '';
      let tmp1 = '';
      let tmp2 = '';
      if (isBuy) {
        if (isInput && oneInputValue && oneInputValue !== '0' && oneInputValue !== '') {
          tmp = division(paymentBalanceData, oneInputValue, basicsMin).toString();
          tmp1 = division(tmp, '100').toString();
          tmp1 = tmp1.substring(0, tmp1.indexOf('.') + basicsMin + 1);
          if (toNumber(tmp1)) {
            tmp2 = multiplication(sliderValue.toString(), tmp1, basicsMin).toString();
          } else {
            tmp2 = '0';
          }
        } else if (!isInput && newestPrice && newestPrice !== '0') {
          tmp = division(paymentBalanceData, newestPrice, basicsMin).toString();
          tmp1 = division(tmp, '100').toString();
          tmp1 = tmp1.substring(0, tmp1.indexOf('.') + basicsMin + 1);
          if (toNumber(tmp1)) {
            tmp2 = multiplication(sliderValue.toString(), tmp1, basicsMin).toString();
          } else {
            tmp2 = '0';
          }
        } else {
          tmp2 = '0';
        }
      } else {
        tmp1 = division(baseBalanceData, '100', basicsMin).toString();
        if (toNumber(tmp1)) {
          tmp2 = multiplication(sliderValue.toString(), tmp1, basicsMin).toString();
        } else {
          tmp2 = '0';
        }
      }

      if (isSchedule) {
        if (tmp2.toString() === '0') {
          setTwoInputValue('');
        } else {
          setTwoInputValue(tmp2.toString());
        }
      }
    }
  }, [paymentBalanceData, sliderValue]);

  useEffect(() => {
    if (isBuy && paymentBalanceData) {
      setBottomText(paymentBalanceData);
    } else if (baseBalanceData) {
      setBottomText(baseBalanceData);
    }
  }, [paymentBalanceData, baseBalanceData]);

  //左下按钮
  useEffect(() => {
    if (isBuy) {
      if (userInfo.data) {
        setBottomBtnText('买入');
      } else {
        setBottomBtnText('登录');
      }
      setBottomBtnBgColor(Colors.colorA2);
      setInitText('买入量');
      setImageTrack(Imgs.img_progress_1);
      setImageThumb(Imgs.img_drag_1);
      setSliderValue(0);
      setTwoInputValue('');
      if (isInput) {
        setOneInputValue(sell1.toString());
      }
      setBottomText(paymentBalanceData);
    } else {
      if (userInfo.data) {
        setBottomBtnText('卖出');
      } else {
        setBottomBtnText('登录');
      }
      setBottomBtnBgColor(Colors.colorA3);
      setInitText('卖出量');
      setImageTrack(Imgs.img_progress_2);
      setImageThumb(Imgs.img_drag_2);
      setSliderValue(0);
      setTwoInputValue('');
      if (isInput) {
        setOneInputValue(buy1.toString());
      }

      setBottomText(baseBalanceData);
    }
  }, [isBuy, userInfo]);

  return (
    <View style={styles.midBg}>
      <View style={styles.midLeftBg}>
        <LeftHeader
          initPriceText={initPriceText}
          isOpenPricePanel={isOpenPricePanel}
          priceData={priceData}
          onPrice={onPrice}
          onColse={onColse}
          onBack={onDataDis1}
          eventY={eventY}
        />
        <LeftMiddle
          twoInputValue={twoInputValue}
          setTwoInputValue={setTwoInputValue}
          onJia={onJia}
          onJian={onJian}
          midText={midText}
          isInput={isInput}
          oneInputValue={oneInputValue}
          setOneInputValue={setOneInputValue}
          initText={initText}
          bottomText={bottomText}
          baseCurrency={baseCurrency}
          paymentCurrency={paymentCurrency}
          marketPrice={marketPrice}
          isBlur={isBlur}
          isBuy={isBuy}
          valuationMin={valuationMin}
          basicsMin={basicsMin}
        />
        <LeftSchedule setIsSchedule={setIsSchedule} sliderValue={sliderValue} setSliderValue={setSliderValue} imageTrack={imageTrack} imageThumb={imageThumb} />
        <LeftBottom
          bottomBtnBgColor={bottomBtnBgColor}
          bottomBtnText={bottomBtnText}
          isInput={isInput}
          bottomText2={bottomText2}
          disabled={disabled}
          openDeal={openDeal}
          status={status}
          isBuy={isBuy}
          baseBalanceData={baseBalanceData}
          paymentCurrency={paymentCurrency}
        />
      </View>
      <View style={styles.midRightBg}>
        <RightHeader />
        <RightMiddle type={curType} data={sellData} data1={buyData} />
        <RightBottom
          onDepth={onDepth}
          onChange={onChange}
          isDropdown={isDropdown}
          depthNum={depthNum}
          precisionTextData={precisionTextData}
          onColse={onColse}
          btnImage={btnImage}
          onBack={onDataDis}
          eventY={eventY}
        />
      </View>
    </View>
  );
});

export default MidComponent;
