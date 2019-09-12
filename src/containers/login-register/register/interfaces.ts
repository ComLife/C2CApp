export interface DispatchProps {
  registerCodeRequest: Function;
  registerResetRequest: Function;
  removeRegMessCode: Function;
}

export interface StateProps {
  registerData: {
    isFetching: boolean;
    regMseeCode: string;
    regMessData: any;
  };
  registerConfirmData: any;
}
