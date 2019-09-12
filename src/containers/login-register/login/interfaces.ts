import { baseAuthsRequest } from '../../../redux/actions';

export interface Props {
  loginFetching: boolean;
  userInfo: any;
  loginCode: string;
  logAction: string;
}

export interface DispatchProps {
  loginRequest: Function;
  removeLoginCode: Function;
  baseAuthsRequest: Function;
  checktradepwdRequest: Function;
}

export interface StateProps {
  userInfo: {
    data?: any;
    isFetching: boolean;
    code: string;
    msg: string;
    action: string;
  };
  movies: {
    title: string;
    movies: [];
    isFetching: boolean;
  };
}
