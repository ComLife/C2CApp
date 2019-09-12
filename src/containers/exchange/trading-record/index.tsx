import React, { memo, useEffect, useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { SafeAreaView } from 'space-ui';
import { connect } from 'react-redux';
import CustomTabBar from '../transation-search/customTabBar';
import UIColor from '../../../const/colors';
import TradingView from './tradingView';
import ImageSet from '../../../const/image-set';
import outerStyles from './styles';
import { useNavigation } from '../../../routes/navigation-service';
import mapDispatchToProps from './map-dispatch-to-props';
import { createSelector } from 'reselect';

interface Props {
  onClosePress?: any;
}

const TeadingRecord = memo((props: any) => {
  console.log('TeadingRecord=', props);
  const styles = outerStyles();
  const tradingState = [{ key: 'k1', title: '当前委托' }, { key: 'k2', title: '历史委托' }, { key: 'k3', title: '交易记录' }];
  const { goBack } = useNavigation();
  const [entrustHisList, setEntrustHisList] = useState([]);
  const [entrustEealList, setEntrustEealList] = useState([]);

  const sendHistoryEntrust = (pageNum: number, isMore = false) => {
    if (isMore) {
      props.historyEntrustRequest(
        {
          baseCurrency: props.marketInfoMsgData.baseCurrency,
          paymentCurrency: props.marketInfoMsgData.paymentCurrency,
          pageNum: pageNum,
          pageSize: 15,
          homePage: 'history',
        },
        (res: any) => {
          if (res.code === '1') {
            setEntrustHisList(entrustHisList.concat(res.data.dataList));
          }
        },
      );
    } else {
      props.historyEntrustRequest(
        {
          baseCurrency: props.marketInfoMsgData.baseCurrency,
          paymentCurrency: props.marketInfoMsgData.paymentCurrency,
          pageNum: pageNum,
          pageSize: 15,
          homePage: 'history',
        },
        (res: any) => {
          if (res.code === '1') {
            setEntrustHisList(res.data.dataList);
          }
        },
      );
    }
  };

  const sendDealEntrust = async (pageNum: number, isMore = false) => {
    if (isMore) {
      props.dealEntrustRequest(
        {
          baseCurrency: props.marketInfoMsgData.baseCurrency,
          paymentCurrency: props.marketInfoMsgData.paymentCurrency,
          pageNum: pageNum,
          pageSize: 15,
        },
        (res: any) => {
          if (res.code === '1') {
            setEntrustEealList(entrustEealList.concat(res.data.dataList));
          }
        },
      );
    } else {
      props.dealEntrustRequest(
        {
          baseCurrency: props.marketInfoMsgData.baseCurrency,
          paymentCurrency: props.marketInfoMsgData.paymentCurrency,
          pageNum: pageNum,
          pageSize: 15,
        },
        (res: any) => {
          if (res.code === '1') {
            setEntrustEealList(res.data.dataList);
          }
        },
      );
    }
  };

  const judgeEntrust = (item: any) => {
    if (item.key === 'k2') {
      return sendHistoryEntrust;
    } else if (item.key === 'k3') {
      return sendDealEntrust;
    } else {
      return () => {};
    }
  };

  const onRenderScene = () => {
    return tradingState.map((item: any, index: number) => {
      let dataList = [];
      let _page = 1;
      let _allPage = 1;
      if (item.key === 'k1') {
        if (props.userEntrustOrdersData.length > 10) {
          dataList = props.userEntrustOrdersData.slice(0, 10);
        } else {
          dataList = props.userEntrustOrdersData;
        }
      } else if (item.key === 'k2') {
        dataList = entrustHisList;
        _page = (props.entrustHisListData && props.entrustHisListData.pageNumber) || 1;
        _allPage = (props.entrustHisListData && props.entrustHisListData.totalPageCount) || 1;
      } else if (item.key === 'k3') {
        dataList = entrustEealList;
        _page = (props.entrustEealListData && props.entrustEealListData.pageNumber) || 1;
        _allPage = (props.entrustEealListData && props.entrustEealListData.totalPageCount) || 1;
      }
      const click = judgeEntrust(item);
      return (
        <TradingView
          key={item.key}
          tabLabel={item.title}
          dataList={dataList}
          marketInfoMsgData={props.marketInfoMsgData}
          type={item.key}
          entrustRequest={click}
          page={_page}
          allPage={_allPage}
        />
      );
    });
  };

  useEffect(() => {
    sendHistoryEntrust(1);
    sendDealEntrust(1);
  }, []);

  const onBack = () => {
    goBack();
  };

  const changeTab = (tab: any) => {
    if (tab.type === 'k2') {
      sendHistoryEntrust(1);
    } else if (tab.type === 'k3') {
      sendDealEntrust(1);
    }
  };

  return (
    <SafeAreaView>
      <ScrollableTabView
        initialPage={0}
        onChangeTab={(tab: any) => changeTab(tab.ref.props)}
        renderTabBar={(props: any) => (
          <View style={styles.ScrollableTabHeader}>
            <TouchableOpacity style={styles.backView} onPress={onBack}>
              <Image source={ImageSet.back} />
            </TouchableOpacity>
            <CustomTabBar
              {...props}
              style={styles.CustomTabBarView}
              backgroundColor={UIColor.whiteColor}
              tabUnderlineDefaultWidth={20} // default containerWidth / (numberOfTabs * 4)
              tabUnderlineScaleX={3} // default 3
              activeColor={UIColor.colorB1}
              inactiveColor={UIColor.colorB2}
            />
          </View>
        )}>
        {onRenderScene()}
      </ScrollableTabView>
    </SafeAreaView>
  );
});

const mapStateToProps = createSelector(
  [
    (state: Record<string, any>) => state.userEntrustOrders,
    (state: Record<string, any>) => state.marketInfo,
    (state: Record<string, any>) => state.entrustHistory,
    (state: Record<string, any>) => state.entrustDeal,
  ],
  (userEntrustOrders, marketInfo, entrustHistory, entrustDeal) => {
    const { msgData: userEntrustOrdersData = [] } = userEntrustOrders;
    const { msgData: marketInfoMsgData = [] } = marketInfo;

    return {
      userEntrustOrdersData: userEntrustOrdersData,
      marketInfoMsgData: marketInfoMsgData,
      entrustHisListData: entrustHistory.data,
      entrustEealListData: entrustDeal.data,
    };
  },
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TeadingRecord);
