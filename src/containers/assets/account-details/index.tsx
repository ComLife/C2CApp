import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, RefreshControl, Text, View } from 'react-native';
import { createSelector } from 'reselect';
import { DivisorLine, FlatList, Indicator, SafeAreaView } from 'space-ui';
import Header from './components/header';
import mapDispatchToProps from './map-dispatch-to-props';
import { DispatchProps, Props } from './interfaces';
import { useNavigation } from '../../../routes/navigation-service';
import outerStyles from './styles';
import { setRatio } from '../../../utils/screen-util';
import SelectPage from './components/select-page';
import Colors from '../../../const/colors';
import Item from './components/item';
import NoDataHolder from '../../../components/no-data';
import { division } from '../../../utils/digital';
import { REMOVE_CHECK_BB_LOG, REMOVE_CHECK_RULE_LOG } from '../../../redux/action-types';
import { formatHHmmss, formatYYYYMMDD } from '../../../utils/date-time';

let one = true;

const AccountDetails = (props: DispatchProps & Props) => {
  const styles = outerStyles();
  const { goBack, state } = useNavigation();
  const params = state.params.index;

  const [coinData, setCoinData] = useState([{}]);
  const [coinCode, setCoinCode] = useState([{}]);
  const [isOpenPanel, setIsOpenPanel] = useState(false);

  const [initDate, setInitDate] = useState('最近七天');
  const [initCoin, setInitCoin] = useState('全部币种');
  const [initType, setInitType] = useState('全部类型');
  const [recentDate, setRecentDate] = useState([{}]);
  const [allCoin, setAllCoin] = useState([{}]);
  const [allType, setAllType] = useState([{}]);
  const [curType, setCurType] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [itemData, setItemData] = useState([]);
  const [num, setNum] = useState(1);
  const [preNum, setPreNum] = useState(0);
  const [isDown, setIsDown] = useState(true);
  const [isLoad, setIsLoad] = useState(true);
  //date转换
  const dateConversion = (tmpDate: number) => {
    const date = new Date();
    let tmpYear = date.getFullYear();
    let tmpMonth = date.getMonth() + 1;
    let tmpdate = date.getDate();

    if (tmpdate <= tmpDate) {
      if ((tmpMonth -= 1) === 0) {
        tmpYear -= 1;
        tmpMonth = 12;
      }
      tmpdate += 30 - tmpDate;
    } else {
      tmpdate -= tmpDate;
    }

    const tmp = tmpYear + '-' + tmpMonth + '-' + tmpdate;
    const tmp1 = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

    return { startDate: tmp.toString(), endDate: tmp1.toString() };
  };

  const tmpRecentDate = [
    { text: '当    天', color: Colors.colorB2, type: 0 },
    { text: '最近一天', color: Colors.colorB2, type: 1 },
    { text: '最近三天', color: Colors.colorB2, type: 3 },
    { text: '最近七天', color: Colors.colorA1, type: 7 },
    { text: '最近一月', color: Colors.colorB2, type: 30 },
  ];

  const tmpAllCoin = [{ text: '全部币种', color: Colors.colorA1, type: '' }];

  const tmpAllType = [{ text: '全部类型', color: Colors.colorA1, type: 0 }];

  useEffect(() => {
    const tmpDate = dateConversion(7);
    props.getBbLogList({ pageNum: 1, pageSize: 10, startDate: tmpDate.startDate, endDate: tmpDate.endDate });
    props.getRuleLogList({ page: 1, pageSize: 10, walletType: -1, begin: tmpDate.startDate, end: tmpDate.endDate, changeTypes: '3,4' });
    props.getCloudWalletTypeRequest();
    props.getAllCloudWalletTypeRequest();
    //, begin: tmpDate.startDate, end: tmpDate.endDate
  }, []);

  const setData = (index: number) => {
    //点击时间
    if (curType === 1) {
      for (let i = 0; i < tmpRecentDate.length; i += 1) {
        if (index === i) {
          tmpRecentDate[i]['color'] = Colors.colorA1;
        } else {
          tmpRecentDate[i]['color'] = Colors.colorB2;
        }
      }
      setRecentDate(tmpRecentDate);
    } else if (curType === 2) {
      if (coinData) {
        for (let i = 0; i < coinData.length; i++) {
          //取出币币可用的币种并存下来
          const tmp = { text: coinData[i].toString(), color: Colors.colorB2, type: coinCode[i].id };
          tmpAllCoin.push(tmp);
        }
      }

      for (let i = 0; i < tmpAllCoin.length; i += 1) {
        if (index === i) {
          tmpAllCoin[i]['color'] = Colors.colorA1;
        } else {
          tmpAllCoin[i]['color'] = Colors.colorB2;
        }
      }
      setAllCoin(tmpAllCoin);
    } else if (curType === 3) {
      if (params === 0) {
        tmpAllType.push({ text: '转    出', color: Colors.colorB2, type: 1 });
        tmpAllType.push({ text: '转    入', color: Colors.colorB2, type: 2 });
        tmpAllType.push({ text: '买    入', color: Colors.colorB2, type: 3 });
        tmpAllType.push({ text: '卖    出', color: Colors.colorB2, type: 7 });
      } else if (params === 1) {
        tmpAllType.push({ text: '转    出', color: Colors.colorB2, type: 4 });
        tmpAllType.push({ text: '转    入', color: Colors.colorB2, type: 3 });
      }
      for (let i = 0; i < tmpAllType.length; i += 1) {
        if (index === i) {
          tmpAllType[i]['color'] = Colors.colorA1;
        } else {
          tmpAllType[i]['color'] = Colors.colorB2;
        }
      }
      setAllType(tmpAllType);
    }
  };

  const onBack = () => {
    props.resetState(REMOVE_CHECK_BB_LOG);
    props.resetState(REMOVE_CHECK_RULE_LOG);
    one = true;
    setIsDown(true);
    goBack();
  };

  const openPanel = (index: number) => {
    setCurType(index);
    setIsOpenPanel(true);
  };

  const onColse = () => {
    setIsOpenPanel(false);
  };

  const onDataDis = (text: string, index: number) => {
    if (curType === 1) {
      setInitDate(text);
    } else if (curType === 2) {
      setInitCoin(text);
    } else if (curType) {
      setInitType(text);
    }
    onColse();
    setData(index);
    setRefresh(true);
  };

  //解析可用币种
  useEffect(() => {
    if (props.getAllCloudWalletTypeCode) {
      const tmpList = [];
      const tmpList1 = [];
      for (let i = 0; i < props.getAllCloudWalletTypeCode.length; i++) {
        if (params === 0) {
          //取出币币可用的币种并存下来
          if ((2 & props.getAllCloudWalletTypeCode[i]['supportFlag']) > 0) {
            const tmp = props.getAllCloudWalletTypeCode[i]['code'];
            const tmp1 = props.getAllCloudWalletTypeCode[i]['id'];
            tmpList.push(tmp);
            tmpList1.push({ id: tmp1, code: tmp });
          }
        } else if (params === 1) {
          if ((1 & props.getAllCloudWalletTypeCode[i]['supportFlag']) > 0) {
            const tmp = props.getAllCloudWalletTypeCode[i]['code'];
            const tmp1 = props.getAllCloudWalletTypeCode[i]['id'];
            tmpList.push(tmp);
            tmpList1.push({ id: tmp1, code: tmp });
          }
        }
      }
      setCoinData(tmpList);
      setCoinCode(tmpList1);
    }
  }, [props.getAllCloudWalletTypeCode]);

  //解析可用币种
  useEffect(() => {
    if (coinData) {
      for (let i = 0; i < coinData.length; i++) {
        //取出币币可用的币种并存下来
        const tmp = { text: coinData[i].toString(), color: Colors.colorB2, type: coinCode[i].id };
        tmpAllCoin.push(tmp);
      }
    }
    if (params === 0) {
      tmpAllType.push({ text: '转    出', color: Colors.colorB2, type: 1 });
      tmpAllType.push({ text: '转    入', color: Colors.colorB2, type: 2 });
      tmpAllType.push({ text: '买    入', color: Colors.colorB2, type: 3 });
      tmpAllType.push({ text: '卖    出', color: Colors.colorB2, type: 7 });
    } else if (params === 1) {
      tmpAllType.push({ text: '转    出', color: Colors.colorB2, type: 4 });
      tmpAllType.push({ text: '转    入', color: Colors.colorB2, type: 3 });
    }

    setRecentDate(tmpRecentDate);
    setAllCoin(tmpAllCoin);
    setAllType(tmpAllType);
  }, [coinData]);

  const renderItem = ({ item, index }: any) => {
    let numPre = 0;
    for (let i = 0; i < props.getAllCloudWalletTypeCode.length; i++) {
      if (item.walletTypeCode === props.getAllCloudWalletTypeCode[i].code) {
        numPre = props.getAllCloudWalletTypeCode[i].numPrecision;
      }
    }
    const ratio = (10 ** numPre).toString();

    const leftTopText = formatYYYYMMDD(item.createTime);
    const leftBottomText = formatHHmmss(item.createTime);
    const code = item.walletTypeCode;
    let typeText = item.typeText;
    const value = item.flag
      ? division(item.amount + item.freezeAmount + item.preAmount + item.commission, ratio, 4)
      : division(item.freezeAmount + item.preAmount - item.amount + item.commission, ratio, 4);
    const allAmount: string = '余额:' + value + '';

    let amount = division(item.amount, ratio, 4);
    let type = true;
    const tmpCommission = item.commission ? item.commission : 0;
    let bottomText = division(tmpCommission, ratio, 4);
    let textColor = Colors.colorA2;

    if (params === 0 && (item.changeType === 1 || item.changeType === 7)) {
      textColor = Colors.colorA3;
      amount = '-' + amount;
    } else if (params === 0) {
      textColor = Colors.colorA2;
      amount = '+' + amount;
    }

    if (params === 0 && (item.changeType === 3 || item.changeType === 7)) {
      type = true;
      bottomText = '手续费:' + division(tmpCommission, ratio, 4);
    } else if (params === 0) {
      type = false;
      bottomText = allAmount;
    }

    if (params === 1) {
      type = false;
      bottomText = '余额:' + division(item.balance, ratio, 4);
      if (item.flag) {
        typeText = '转入';
        amount = '+' + amount;
        textColor = Colors.colorA2;
      } else {
        typeText = '转出';
        amount = '-' + amount;
        textColor = Colors.colorA3;
      }
    } else {
      if (item.changeType === 1 || item.changeType === 2) {
        type = false;
      }
    }
    return (
      <View style={styles.view}>
        <Item
          leftTopText={leftTopText}
          leftBottomText={leftBottomText}
          rightTopText={code}
          rightViewColor={textColor}
          leftMidText={typeText}
          rightViewText={amount}
          bottomText={bottomText}
          rightBottomText={allAmount}
          type={type}
        />
        <View style={styles.divLine} />
      </View>
    );
  };

  const hardLoading = () => {
    return (
      <View style={styles.activityIndicatorView}>
        <ActivityIndicator size="small" />
        <Text>{'   努力加载中！'}</Text>
      </View>
    );
  };

  const renderListEmptyComponent = () => {
    if (one) {
      return hardLoading();
    }
    return <NoDataHolder />;
  };

  const conversionData = (data: any) => {
    for (let i = 0; i < data.length; i += 1) {
      if (data[i]['color'] === Colors.colorA1) {
        return data[i]['type'];
      }
    }
  };

  const requestRefresh = (bool: boolean) => {
    if (!isLoad) {
      return;
    }
    setIsLoad(false);
    const tmpRecent = conversionData(recentDate);
    const tmpCoin = conversionData(allCoin);
    const tmpType = conversionData(allType);
    const tmpDate = dateConversion(tmpRecent);
    let tmpNum = 1;
    if (bool) {
      tmpNum = 1;
    } else {
      tmpNum = num;
    }
    //云端3 转入 4转出
    if (params === 0) {
      if (!tmpCoin && tmpType === 0) {
        props.getBbLogList({ pageNum: tmpNum, pageSize: 10, startDate: tmpDate.startDate, endDate: tmpDate.endDate });
      } else if (!tmpCoin) {
        props.getBbLogList({ pageNum: tmpNum, pageSize: 10, startDate: tmpDate.startDate, endDate: tmpDate.endDate, changeType: tmpType });
      } else if (tmpType === 0) {
        props.getBbLogList({ pageNum: tmpNum, pageSize: 10, startDate: tmpDate.startDate, endDate: tmpDate.endDate, walletType: tmpCoin });
      } else {
        props.getBbLogList({ pageNum: tmpNum, pageSize: 10, startDate: tmpDate.startDate, endDate: tmpDate.endDate, walletType: tmpCoin, changeType: tmpType });
      }
    } else if (params === 1) {
      if (!tmpCoin && tmpType === 0) {
        props.getRuleLogList({ page: tmpNum, pageSize: 10, begin: tmpDate.startDate, end: tmpDate.endDate, walletType: -1, changeTypes: '3,4' });
      } else if (!tmpCoin) {
        props.getRuleLogList({ page: tmpNum, pageSize: 10, begin: tmpDate.startDate, end: tmpDate.endDate, changeTypes: tmpType, walletType: -1 });
      } else if (tmpType === 0) {
        props.getRuleLogList({ page: tmpNum, pageSize: 10, begin: tmpDate.startDate, end: tmpDate.endDate, walletType: tmpCoin, changeTypes: '3,4' });
      } else {
        props.getRuleLogList({ page: tmpNum, pageSize: 10, begin: tmpDate.startDate, end: tmpDate.endDate, walletType: tmpCoin, changeTypes: tmpType });
      }
    }
  };

  const handleRefresh = () => {
    setNum(1);
    setPreNum(1);
    setIsDown(true);
    one = true;
    requestRefresh(true);
  };

  //解析可用币种
  useEffect(() => {
    if (refresh) {
      handleRefresh();
      setRefresh(false);
    }
  }, [recentDate, allCoin, allType]);

  const footer = () => {
    if (preNum === -1) {
      handleRefresh();
    } else if (preNum === -2) {
      return (
        <View style={styles.activityIndicatorView}>
          <ActivityIndicator size="small" />
          <Text>{'   我也是有底线的！'}</Text>
        </View>
      );
    } else {
      return <View style={styles.activityIndicatorView} />;
    }
  };

  //判断页码
  const isPageNumber = (page: any) => {
    if (page > num) {
      setPreNum(-1);
    } else if (page < num) {
      setPreNum(-2);
      setTimeout(() => {
        setPreNum(2);
      }, 200);
      return;
    }
  };

  const loadmore = () => {
    if (preNum === 2) {
      return;
    }
    if (params === 0) {
      isPageNumber(props.getTotalPage);
    } else {
      isPageNumber(props.getRuleTotalPage);
    }
    setIsDown(false);
    requestRefresh(false);
  };

  //刷新数据
  const refreshData = (data: any) => {
    const arrList = data;
    if (isDown && arrList && one) {
      setItemData(arrList);
      one = false;
      setIsLoad(true);
      setNum(num + 1);
    } else if (!isDown && arrList && JSON.stringify(itemData) !== '[]') {
      setItemData(itemData.concat(arrList));
      setTimeout(() => {
        setIsLoad(true);
        setNum(num + 1);
      }, 200);
    }
  };

  //解析可用币种
  useEffect(() => {
    if (params === 0) {
      refreshData(props.getLogList);
    } else if (params === 1) {
      refreshData(props.getLogRuleList);
    }
  }, [props.getLogList, props.getLogRuleList]);

  return (
    <SafeAreaView style={styles.container}>
      <Header title={params === 0 ? '币币账户明细' : '法币账户明细'} onBack={onBack} />
      <DivisorLine height={setRatio(15)} backgroundColor={Colors.colorB5} />
      <SelectPage
        initType={initType}
        initCoin={initCoin}
        initDate={initDate}
        onColse={onColse}
        openPanel={openPanel}
        isOpenPanel={isOpenPanel}
        onBack={onDataDis}
        allType={allType}
        allCoin={allCoin}
        recentDate={recentDate}
      />
      <FlatList
        data={itemData}
        keyExtractor={(item, index) => index + ''}
        renderItem={renderItem}
        // refreshing={this.state.refreshing} // 是否刷新 ，自带刷新控件
        onEndReachedThreshold={0.1} // 距离底部多少刷新
        ListEmptyComponent={renderListEmptyComponent}
        ListFooterComponent={footer} //footer尾部组件
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh} //因为涉及到this.state
            colors={['#ff0000', '#00ff00', '#0000ff', '#3ad564']}
            progressBackgroundColor="#ffffff"
          />
        }
        onEndReached={loadmore}
      />
    </SafeAreaView>
  );
};

const mapStateToProps = createSelector(
  [
    (state: Record<string, any>) => state.getCloudWalletType,
    (state: Record<string, any>) => state.getAllCloudWalletType,
    (state: Record<string, any>) => state.chenkBbLog,
    (state: Record<string, any>) => state.chenkRuleLog,
  ],
  (getCloudWalletType, getAllCloudWalletType, chenkBbLog, chenkRuleLog) => {
    const { code = '', data = {}, msg = '' } = chenkBbLog;
    const { code: code1 = '', data: data1 = {}, msg: msg1 = '' } = chenkRuleLog;
    const { data: tmpData = {} } = getAllCloudWalletType;

    let dataList = [];
    let dataList1 = [];
    let totalPageCount = 0;
    let totalPageCount1 = 0;
    const tmpDataList = tmpData && tmpData.dataList ? tmpData.dataList : [];
    if (data) {
      dataList = data.dataList;
      totalPageCount = data.totalPageCount;
    }
    if (data1) {
      dataList1 = data1.dataList;
      totalPageCount1 = data1.totalPageCount;
    }
    return {
      getCloudWalletTypeCode: getCloudWalletType.data,
      getAllCloudWalletTypeCode: tmpDataList,
      getLogList: dataList,
      getLogRuleList: dataList1,
      logCode: code,
      getTotalPage: totalPageCount,
      getRuleTotalPage: totalPageCount1,
      logMsg: msg,
    };
  },
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccountDetails);
