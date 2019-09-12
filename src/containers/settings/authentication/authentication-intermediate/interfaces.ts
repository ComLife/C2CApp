export interface Props {
  getUpLoadImgAuthCode: any;
  getUpLoadSaveAuthCode: any;
}

export interface DispatchProps {
  getUpLoadImgAuth: Function;
  getUpLoadSaveAuth: Function;
  resetState: Function;
}

export interface StateProps {
  getUpLoadImgAuth: {
    msg: string;
    code: string;
    data: any;
  };
  getUpLoadSaveAuth: {
    msg: string;
    code: string;
    data: any;
  };
}
