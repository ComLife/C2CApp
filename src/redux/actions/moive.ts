import * as types from '../action-types';
import { facebookService } from '../../services';

function getMovies(payload: any) {
  return { type: types.GET_MOVIES, payload };
}

export const getMoviesRequest = () => async (dispatch: Function) => {
  try {
    dispatch(getMovies({ isFetching: true }));
    const result = await facebookService.getMovies();
    return dispatch(getMovies({ ...result, isFetching: false }));
  } catch (e) {
    return dispatch(getMovies({ isFetching: false, success: false, code: 404, msg: types.NETWORK_ERROR }));
  }
};
