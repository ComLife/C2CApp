import React, { Fragment } from 'react';
import ListItem from '../list-item';
import ListSubTitle from '../list-subtitle';
import { I18n } from '../../../../localization/i18n';
import NoDataHolder from '../../../../components/no-data';

interface Props {
  data: any[];
  onItemPress?: (event: Record<string, string>) => void;
}

const GrowthList = (props: Props) => {
  const { data } = props;
  if (!data || !data.length) {
    return <NoDataHolder />;
  }

  const isLast = (index: number) => {
    return index === data.length - 1;
  };

  return (
    <Fragment>
      <ListSubTitle text1={I18n.t('homePage.name')} text2={I18n.t('homePage.newPrice')} text3={I18n.t('homePage.growthPercent')} />
      {data.map((item: Record<string, any>, index: number) => (
        <ListItem key={index} item={item} isLast={isLast(index)} onItemPress={props.onItemPress} />
      ))}
    </Fragment>
  );
};

export default GrowthList;
