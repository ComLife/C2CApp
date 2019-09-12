export interface Props {
  isInstalled?: string;
}

export interface DispatchProps {
  storeState: Function;
}

export interface StateProps {
  appConfig: Record<string, string>;
}
