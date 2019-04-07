import { MS_NAME, MS_TARGET, MS_DISABLE, MS_EXTRA } from '../config';

export default class MockStarQueryItem {
    /**
     * 构造函数
     *
     * @param {Object | String} mockerName mocker 的名字，或者是对象
     * @param {String} [mockModuleName] mock module 的名字
     * @param {Boolean} [shouldDisable] 是否禁用 mocker 服务
     * @param {*} [extra] 额外信息
     */
    constructor(mockerName, mockModuleName, shouldDisable, extra) {
        if (mockerName && (typeof mockerName === 'object')) {
            // 如果传入的是对象，则假设这个对象是符合 MockStarQueryItem 字段定义的对象
            this[MS_NAME] = mockerName[MS_NAME];
            this[MS_TARGET] = mockerName[MS_TARGET];
            this[MS_DISABLE] = mockerName[MS_DISABLE];
            this[MS_EXTRA] = mockerName[MS_EXTRA];
        } else {
            // 如果传递的是普通的参数，则依次设置
            this[MS_NAME] = mockerName;
            this[MS_TARGET] = mockModuleName;
            this[MS_DISABLE] = shouldDisable ? 1 : 0;
            this[MS_EXTRA] = extra;
        }
    }

    /**
     * 是否为 disable 状态
     *
     * @returns {Boolean}
     */
    isDisabled() {
        return !!this[MS_DISABLE];
    }

    /**
     * 通过mocker名字查询是否为当前的 MockStarQueryItem 项
     *
     * @param {String} name mocker的名字
     * @returns {Boolean}
     */
    isMe(name) {
        return this[MS_NAME] === name;
    }
}