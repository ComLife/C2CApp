import React, { memo, useEffect, useRef, useState } from 'react';
import WebView from 'react-native-webview';
import styles from './styles';
import { connect } from 'react-redux';
import mapDispatchToProps from './map-dispatch-to-props';
import { DispatchProps, Props } from './interfaces';
import { ERROR_CODE } from '../../../../../const/enum-set';
import { addition } from '../../../../../utils/digital';
import { IS_ANDROID } from '../../../../../utils/screen-util';
import { ActivityIndicator, View } from 'react-native';
import * as types from '../../../../../redux/action-types';
import { createSelector } from 'reselect';

// 记录K线时间，用于history请求
let klineTime: any = null;
// K线是否是第一次请求
let firstDataRequest = false;
// 最后一个柱
let lastBar: any = null;
// 当前柱
let currentBar: any = null;
// 柱数量
let barSize = 0;

const klineArgsMap = {
  // 主图指标
  MA: ['Moving Average', '14'],
  BOLL: ['Bollinger Bands', '20,2'],
  // 副图指标
  MACD: ['MACD', '12, 26, "close", 9'],
  KDJ: ['Stochastic', '9'],
  RSI: ['Relative Strength Index', '6'],
  TRIX: ['TRIX', '18'],
};

const ChartView = memo((props: Props & DispatchProps) => {
  const webViewRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [isMainArg, setIsMainArg] = useState(true);
  const [mainArgIds, setMainArgIds] = useState([]);
  const [subArgIds, setSubArgIds] = useState([]);
  const htmlPath = { uri: IS_ANDROID ? 'file:///android_asset/trading_view/index.html' : './trading_view/index.html' };
  //js注入  bar表示修改bar信息， history表示修改history信息
  const injectJavascript = (afterScript = '') => {
    const scriptContent = `
    (function(){
        window.symbol="${props.symbol}";
        window.valuationMin=${props.valuationMin};
        ${afterScript}
    })()`;
    console.log('scriptContent', scriptContent);
    return scriptContent;
  };

  useEffect(() => {
    return () => {
      props.resetState(types.REMOVE_KLINE_HISTORY);
    };
  }, []);

  useEffect(() => {
    // console.log('who changes=====', props.mainArg);
    if (props.mainArg) {
      if (mainArgIds && mainArgIds.length) {
        mainArgIds.forEach((item: string) => {
          webViewRef.current.injectJavaScript(injectJavascript(`window.tradingViewCartFunc('removeEntity', ['${item}'])`));
        });
        setMainArgIds([]);
      }

      const klineArg = klineArgsMap[props.mainArg];
      if (klineArg && klineArg.length) {
        console.log('mainArg klineArg====', klineArg);
        const [name, arg] = klineArg;
        setIsMainArg(true);
        webViewRef.current.injectJavaScript(
          injectJavascript(`
          window.tradingViewCartFunc('createStudy', ["${name}", false, false, [${arg}], null, {"plot.color": "#84AAD5"}]);
          `),
        );
      }
    }
  }, [props.mainArg]);

  useEffect(() => {
    // console.log('who changes=====', props.subArg);
    if (props.subArg) {
      if (subArgIds && subArgIds.length) {
        subArgIds.forEach((item: string) => {
          webViewRef.current.injectJavaScript(injectJavascript(`window.tradingViewCartFunc('removeEntity', ['${item}'])`));
        });
        setSubArgIds([]);
      }

      const klineArg = klineArgsMap[props.subArg];
      if (klineArg && klineArg.length === 2) {
        console.log('subArg klineArg====', klineArg);
        const [name, arg] = klineArg;
        setIsMainArg(false);
        webViewRef.current.injectJavaScript(
          injectJavascript(`
          window.tradingViewCartFunc('createStudy', ["${name}", false, false, [${arg}], null, {"plot.color": "#84AAD5"}]);
          `),
        );
      }
    }
  }, [props.subArg]);

  // 接受html发送rn的消息
  const onMessage = (event: Record<string, any>) => {
    if (event.nativeEvent.data) {
      const { data } = event.nativeEvent;
      const json = JSON.parse(data);
      // console.log('onMessage=====', json);
      if (json.type === 'history') {
        firstDataRequest = json.data.firstDataRequest;
        //获取history
        props.klineHistoryRequest({
          symbol: props.requestSymbol,
          klineType: props.klineType,
          klineTime: klineTime,
        });
        // 其它更多指标 https://shimo.im/sheets/XwrdH8QVHrxCR3Yk/MODOC
      } else if (json.type === 'createStudy') {
        console.log('createStudy===============', json.data);
        if (isMainArg) {
          setMainArgIds([...mainArgIds, json.data]);
        } else {
          setSubArgIds([...subArgIds, json.data]);
        }
      }
    }
  };

  // 处理历史记录返回时
  useEffect(() => {
    if (props.klineHistory && props.klineHistory.data) {
      //发送消息给webview
      if (webViewRef && webViewRef.current) {
        setLoading(false);
        const data = props.klineHistory.data;
        if (props.klineHistory.code === ERROR_CODE.SUCCESS) {
          const bars = data.klines || [];
          if (firstDataRequest && bars.length > 0) {
            lastBar = bars[bars.length - 1];
          }
          currentBar = lastBar;
          klineTime = data.klineTime;

          barSize += bars.length;
          let afterScript = `window.onHistoryCallback && window.onHistoryCallback(${JSON.stringify(bars)},{noData:${bars.length === 0}});`;
          if (klineTime <= 0) {
            afterScript += `window.onHistoryCallback([],{noData:true});`;
          }
          webViewRef.current.injectJavaScript(injectJavascript(afterScript));
        } else {
          webViewRef.current.injectJavaScript(injectJavascript(`window.onErrorCallback(${JSON.stringify(props.klineHistory.msg)});`));
        }
      }
    }

    // deps 为 [props.userInfo] 表示 props.userInfo.data 变化了才执行
  }, [props.klineHistory.data]);

  // 处理更换时间
  useEffect(() => {
    // 更换K线显示
    klineTime = null;
    // K线是否是第一次请求
    firstDataRequest = false;
    // 最后一个柱
    lastBar = null;
    // 当前柱
    currentBar = null;
    // 柱数量
    barSize = 0;
    webViewRef.current.injectJavaScript(injectJavascript(`window.changeTime("${props.klineType}");`));
  }, [props.klineType]);

  // 处理获取到服务器推送数据时
  useEffect(() => {
    const data = props.klinePush.msgData;
    if (data && props.requestSymbol === data.Symbol) {
      const dKlines = data.klines;
      for (let i = 0; i < dKlines.length; ++i) {
        const { klineType, klines } = dKlines[i];
        if (klineType === props.klineType) {
          const realKlines = klines;
          for (let j = 0; j < realKlines.length; ++j) {
            const bar = realKlines[j];
            lastBar = bar;
            currentBar = lastBar;
            barSize++;
            webViewRef.current.injectJavaScript(
              injectJavascript(`
                            var e = new CustomEvent("changeBar", {
                                detail:${JSON.stringify(lastBar)}
                            });
                            document.dispatchEvent(e);`),
            );
          }
          break;
        }
      }
    }
  }, [props.klinePush]);

  // 处理服务器当前成交信息
  useEffect(() => {
    const data = props.turnoverrecordAdd.msgData;
    if (lastBar != null && data) {
      const lastData = data;
      const price = parseFloat(lastData.price);
      lastBar.close = price;
      if (lastBar.volume === 0 && barSize > 1) {
        lastBar.open = price;
        lastBar.high = price;
        lastBar.low = price;
      } else {
        if (price > lastBar.high) {
          lastBar.high = price;
        }
        if (price < lastBar.low || lastBar.low === 0) {
          lastBar.low = price;
        }
        if (lastBar.open === 0) {
          lastBar.open = price;
        }
      }
      lastBar.volume = parseFloat(addition(lastBar.volume, lastData.amount));
      webViewRef.current.injectJavaScript(
        injectJavascript(`
                            var e = new CustomEvent("changeBar", {
                                detail:${JSON.stringify(lastBar)}
                            });
                            document.dispatchEvent(e);`),
      );
    }
  }, [props.turnoverrecordAdd]);
  useEffect(() => {
    // 记录K线时间，用于history请求
    klineTime = null;
    // K线是否是第一次请求
    firstDataRequest = false;
    // 最后一个柱
    lastBar = null;
    // 当前柱
    currentBar = null;
    // 柱数量
    barSize = 0;
  }, []);

  return (
    <View style={styles.container}>
      <WebView
        style={styles.klineView}
        source={htmlPath}
        injectedJavaScript={injectJavascript()}
        allowUniversalAccessFromFileURLs={true}
        onShouldStartLoadWithRequest={() => {
          return true;
        }}
        onMessage={onMessage}
        ref={webViewRef}
        useWebKit={false}
        originWhitelist={['*']}
      />
      {loading ? (
        <View style={styles.bgView}>
          <ActivityIndicator />
        </View>
      ) : null}
    </View>
  );
});

const mapStateToProps = createSelector(
  [
    (state: Record<string, any>) => state.klineHistory,
    (state: Record<string, any>) => state.klinePush,
    (state: Record<string, any>) => state.turnoverrecordAdd,
  ],
  (klineHistory, klinePush, turnoverrecordAdd) => {
    return {
      klineHistory,
      klinePush,
      turnoverrecordAdd,
    };
  },
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChartView);
