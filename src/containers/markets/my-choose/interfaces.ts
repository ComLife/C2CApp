export interface Props {
  tabLabel: string;
  userInfo: any;
  collNoData: boolean;
  collDataList: [];
  localCollection: [];
}

export interface StateProps {
  userInfo: {
    data: Record<string, any>;
  };
  collectionList: Record<string, any>;
  localCollection: Record<string, any>;
}
