import { DETAIL_REQUEST, DETAIL_REQUEST_FAIL, DETAIL_REQUEST_SUCCESS } from './action';
import _ from 'lodash';

const initialState = {
    isLoaded: false,
    config: {}
};

export default function detailInfo(state = initialState, action) {
    let { type, data } = action,
        update = {};

    switch (type) {
        case DETAIL_REQUEST:
            update = {
                isLoaded: false
            };
            break;

        case DETAIL_REQUEST_SUCCESS:
            update = _.merge({
                isLoaded: true
            }, state, data);
            break;

        case DETAIL_REQUEST_FAIL:
            update = {
                isLoaded: true
            };
            break;

        default:
            break;
    }

    return Object.keys(update).length ? Object.assign({}, state, update) : state;
}
