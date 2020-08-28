import {CALL_API} from '../../middlewares/api';
import {getCGIBase} from '../../custom';

export const DETAIL_REQUEST = 'DETAIL_REQUEST';
export const DETAIL_REQUEST_SUCCESS = 'DETAIL_REQUEST_SUCCESS';
export const DETAIL_REQUEST_FAIL = 'DETAIL_REQUEST_FAIL';

function fetchDetail() {
  return {
    [CALL_API]: {
      types: [DETAIL_REQUEST, DETAIL_REQUEST_SUCCESS, DETAIL_REQUEST_FAIL],
      url: `${getCGIBase()}/detail`,
    },
  };
}

export function loadDetail() {
  return (dispatch, getState) => {
    return dispatch(fetchDetail());
  };
}
