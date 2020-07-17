import {combineReducers} from 'redux';

import {mockerInfo} from '../pages/mockers/data/data-mocker';
import {mockerListInfo} from '../pages/mockers/data/data-mocker-list';
import {detailInfo} from '../datas/data-detail';

const rootReducer = combineReducers({
  mockerInfo: mockerInfo,
  mockerListInfo: mockerListInfo,
  detailInfo: detailInfo,
});

export default rootReducer;
