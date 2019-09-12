export interface Props {
  authenticationStatus: number;
  authPhotoUrl: string;
  authVideoUrl: string;
  errorAuth: string;
  level: number;
  quota: any;
}

export interface DispatchProps {
  getAuthRequest: Function;
  getAuthQuotaRequest: Function;
}

export interface StateProps {
  getAuthRequest: {
    state: any;
    code: string;
    data: any;
  };
  getAuthenQuota: {
    state: any;
    code: string;
    data: any;
  };
}
