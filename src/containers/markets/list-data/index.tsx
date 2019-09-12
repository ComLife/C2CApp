/* eslint-disable @typescript-eslint/camelcase, @typescript-eslint/ban-ts-ignore */
import React, { memo, useEffect, useState } from 'react';
import { orderBy } from 'lodash';
import { FlatList } from 'space-ui';
import ListItem from '../components/list-item';
import ListSubTitle from '../../home/components/list-subtitle';
import { I18n } from '../../../localization/i18n';
import NoDataHolder from '../../../components/no-data';

interface Props {
  tabLabel: string;
  data: [];
  onItemPress?: (event: Record<string, string>) => void;
}

const ListData = memo((props: Props) => {
  const { data = [], onItemPress } = props;
  if (!data || !data.length) {
    return <NoDataHolder />;
  }

  const [orderData, setOrderData] = useState(null);
  const [percentSort, setPercentSort] = useState('default'); // 升序:1, 默认:0, 降序:-1
  const onPercentSortingPress = () => {
    console.log('onPercentSortingPress===', percentSort);
    let newValue = 'default';
    switch (percentSort) {
      case 'asc':
        newValue = 'desc';
        break;
      case 'desc':
        newValue = 'default';
        break;
      default:
        newValue = 'asc';
        break;
    }
    setPercentSort(newValue);
    // @ts-ignore
    const orderDataTmp = orderBy(data, ['twentyfourGain'], [newValue]);
    setOrderData(orderDataTmp);
  };

  const keyExtractor = ({ tabLabel }: { tabLabel: string }, index: number) => `${index}${tabLabel}`;

  const renderItem = ({ item }: any) => <ListItem item={item} onItemPress={onItemPress} />;

  const renderListHeaderComponent = () => (
    <ListSubTitle
      btn3Enabled={true}
      percentSort={percentSort}
      btn3Press={onPercentSortingPress}
      text1={I18n.t('homePage.name')}
      text2={I18n.t('homePage.newPrice')}
      text3={I18n.t('homePage.growthPercent')}
    />
  );
  return <FlatList ListHeaderComponent={renderListHeaderComponent} data={orderData || data} keyExtractor={keyExtractor} renderItem={renderItem} />;
});

export default ListData;
