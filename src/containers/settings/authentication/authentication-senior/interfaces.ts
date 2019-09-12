export interface Props {
  getUpLoadFaceAuthCode: string;
}

export interface DispatchProps {
  getUpLoadFaceAuth: Function;
  resetState: Function;
}

export interface StateProps {
  getUpLoadFaceAuth: {
    msg: string;
    code: string;
    data: any;
  };
}
