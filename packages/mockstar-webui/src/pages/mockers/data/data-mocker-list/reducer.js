import _ from 'lodash';

import { MOCKER_LIST_REQUEST_FAIL, MOCKER_LIST_REQUEST_SUCCESS } from './action';

import { SET_ACTIVE_MODULE_REQUEST_SUCCESS } from '../data-mocker';

const initialState = {
  isLoaded: false,
  list: [],
};

function mockerListInfo(state = initialState, action) {
  let { type, data } = action,
    update = {};

  switch (type) {
    case MOCKER_LIST_REQUEST_SUCCESS:
      update = {
        isLoaded: true,
        list: (data || [])
          .map((item) => {
            // 为了方便后续处理，将 method 全部修改为小写
            if (item.config && item.config.method) {
              item.config.method = item.config.method.toLowerCase();
            }

            return item;
          })
          .sort((a, b) => {
            return b.priority - a.priority;
          }),
      };
      break;
    case MOCKER_LIST_REQUEST_FAIL:
      update = {
        isLoaded: true,
      };
      break;

    case SET_ACTIVE_MODULE_REQUEST_SUCCESS:
      update.list = state.list.map(item => {
        if (item.name === data.name) {
          item = _.merge({}, item, data);
        }
        return item;
      });
      break;

    default:
      break;
  }

  return Object.keys(update).length ? Object.assign({}, state, update) : state;
}

export default mockerListInfo;
