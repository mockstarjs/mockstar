'use strict';

const Promise = require('bluebird');

const colorsLog = require('../../utils/colorsLog');

let data = [
    {
        'basePath': '/Users/helinjiang/gitprojects/now-h5-shake-redpacket/mockstar-app/mock_server/mockers/doExchangeGiftAction',
        'watch': true,
        'name': 'doExchangeGiftAction',
        'mockModuleList': [
            {
                'name': 'error_not_login',
                'config': {
                    'name': 'error_not_login',
                    'description': '错误：未登录',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'error_not_login'
                    },
                    'priority': 0
                }
            },
            {
                'name': 'error_not_money',
                'config': {
                    'name': 'error_not_money',
                    'description': '错误：红包余额不足',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'error_not_money'
                    },
                    'priority': 0
                }
            },
            {
                'name': 'error_not_time',
                'config': {
                    'name': 'error_not_time',
                    'description': '错误：兑换次数不足',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'error_not_time'
                    },
                    'priority': 0
                }
            },
            {
                'name': 'error_not_withdraw',
                'config': {
                    'name': 'error_not_withdraw',
                    'description': '错误：提现额度不足',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'error_not_withdraw'
                    },
                    'priority': 0
                }
            },
            {
                'name': 'success',
                'config': {
                    'name': 'success',
                    'description': '成功',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'success'
                    },
                    'priority': 0
                }
            }
        ],
        'config': {
            'name': 'doExchangeGiftAction',
            'route': '/cgi-bin/ktv_match/shake_redpacket/gift/doExchangeGiftAction',
            'routeExtra': {},
            'description': '兑换礼物',
            'disable': false,
            'defaultModule': 'success',
            'activeModule': 'success',
            'method': 'get',
            'plugin': 'xhr',
            'priority': 0,
            'tags': [
                '全部',
                'linjianghe',
                'index.html 余额页'
            ]
        }
    },
    {
        'basePath': '/Users/helinjiang/gitprojects/now-h5-shake-redpacket/mockstar-app/mock_server/mockers/doShakeAction',
        'watch': true,
        'name': 'doShakeAction',
        'mockModuleList': [
            {
                'name': 'error_10065',
                'config': {
                    'name': 'error_10065',
                    'description': '新用户无法一天内重复领取红包',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'error_10065'
                    },
                    'priority': 0
                }
            },
            {
                'name': 'error_10070',
                'config': {
                    'name': 'error_10070',
                    'description': '摇一摇请重试',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'error_10070'
                    },
                    'priority': 0
                }
            },
            {
                'name': 'error_no_count',
                'config': {
                    'name': 'error_no_count',
                    'description': '摇一摇次数不足',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'error_no_count'
                    },
                    'priority': 0
                }
            },
            {
                'name': 'error_not_login',
                'config': {
                    'name': 'error_not_login',
                    'description': '错误：未登录',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'error_not_login'
                    },
                    'priority': 0
                }
            },
            {
                'name': 'error_not_whitelist',
                'config': {
                    'name': 'error_not_whitelist',
                    'description': '非白名单用户',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'error_not_whitelist'
                    },
                    'priority': 0
                }
            },
            {
                'name': 'error_server',
                'config': {
                    'name': 'error_server',
                    'description': '后台服务错误',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'error_server'
                    },
                    'priority': 0
                }
            },
            {
                'name': 'success_new',
                'config': {
                    'name': 'success_new',
                    'description': '新用户',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'success_new'
                    },
                    'priority': 0
                }
            },
            {
                'name': 'success_new_koi',
                'config': {
                    'name': 'success_new_koi',
                    'description': '新用户',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'success_new_koi'
                    },
                    'priority': 0
                }
            },
            {
                'name': 'success_old',
                'config': {
                    'name': 'success_old',
                    'description': '老用户',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'success_old'
                    },
                    'priority': 0
                }
            },
            {
                'name': 'success_old_koi',
                'config': {
                    'name': 'success_old_koi',
                    'description': '老用户【锦鲤时间】',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'success_old_koi'
                    },
                    'priority': 0
                }
            },
            {
                'name': 'success_old_label_1',
                'config': {
                    'name': 'success_old_label_1',
                    'description': '老用户-白名单',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'success_old_label_1'
                    },
                    'priority': 0
                }
            },
            {
                'name': 'success_old_media_1',
                'config': {
                    'name': 'success_old_media_1',
                    'description': '视频类型',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'success_old_media_1'
                    },
                    'priority': 0
                }
            },
            {
                'name': 'success_old_media_2',
                'config': {
                    'name': 'success_old_media_2',
                    'description': '图片类型',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'success_old_media_2'
                    },
                    'priority': 0
                }
            }
        ],
        'config': {
            'name': 'doShakeAction',
            'route': '/cgi-bin/ktv_match/shake_redpacket/shake/doShakeAction',
            'routeExtra': {},
            'description': '摇一摇接口',
            'disable': false,
            'defaultModule': 'success_new',
            'activeModule': 'success_new_koi',
            'method': 'get',
            'plugin': 'xhr',
            'priority': 0,
            'tags': [
                '全部',
                'kevinyyang',
                'shake.html 摇一摇页面'
            ]
        }
    },
    {
        'basePath': '/Users/helinjiang/gitprojects/now-h5-shake-redpacket/mockstar-app/mock_server/mockers/doSignInAction',
        'watch': true,
        'name': 'doSignInAction',
        'mockModuleList': [
            {
                'name': 'error_not_login',
                'config': {
                    'name': 'error_not_login',
                    'description': '错误：未登录',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'error_not_login'
                    },
                    'priority': 0
                }
            },
            {
                'name': 'success_1',
                'config': {
                    'name': 'success_1',
                    'description': '成功type1',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'success_1'
                    },
                    'priority': 0
                }
            },
            {
                'name': 'success_2',
                'config': {
                    'name': 'success_2',
                    'description': '成功type2',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'success_2'
                    },
                    'priority': 0
                }
            }
        ],
        'config': {
            'name': 'doSignInAction',
            'route': '/cgi-bin/ktv_match/shake_redpacket/sign_in/doSignInAction',
            'routeExtra': {},
            'description': '用户签到',
            'disable': false,
            'defaultModule': 'success_1',
            'activeModule': 'success_1',
            'method': 'get',
            'plugin': 'xhr',
            'priority': 0,
            'tags': [
                '全部',
                '签到'
            ]
        }
    },
    {
        'basePath': '/Users/helinjiang/gitprojects/now-h5-shake-redpacket/mockstar-app/mock_server/mockers/doWithdrawAction',
        'watch': true,
        'name': 'doWithdrawAction',
        'mockModuleList': [
            {
                'name': 'error_not_login',
                'config': {
                    'name': 'error_not_login',
                    'description': '错误：未登录',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'error_not_login'
                    },
                    'priority': 0
                }
            },
            {
                'name': 'error_not_money',
                'config': {
                    'name': 'error_not_money',
                    'description': '错误：红包余额不足',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'error_not_money'
                    },
                    'priority': 0
                }
            },
            {
                'name': 'error_not_times',
                'config': {
                    'name': 'error_not_times',
                    'description': '错误：次数不足',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'error_not_times'
                    },
                    'priority': 0
                }
            },
            {
                'name': 'error_not_withdraw',
                'config': {
                    'name': 'error_not_withdraw',
                    'description': '错误：额度不足',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'error_not_withdraw'
                    },
                    'priority': 0
                }
            },
            {
                'name': 'error_uv_limit',
                'config': {
                    'name': 'error_uv_limit',
                    'description': '今日活动提现人数已达上限，请明日再来',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'error_uv_limit'
                    },
                    'priority': 0
                }
            },
            {
                'name': 'success_1',
                'config': {
                    'name': 'success_1',
                    'description': '成功type1',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'success_1'
                    },
                    'priority': 0
                }
            }
        ],
        'config': {
            'name': 'doWithdrawAction',
            'route': '/cgi-bin/ktv_match/shake_redpacket/redpack/doWithdrawAction',
            'routeExtra': {},
            'description': '红包提现',
            'disable': false,
            'defaultModule': 'success_1',
            'activeModule': 'success_1',
            'method': 'get',
            'plugin': 'xhr',
            'priority': 0,
            'tags': [
                '全部'
            ]
        }
    },
    {
        'basePath': '/Users/helinjiang/gitprojects/now-h5-shake-redpacket/mockstar-app/mock_server/mockers/follow-anchor',
        'watch': true,
        'name': 'follow-anchor',
        'mockModuleList': [
            {
                'name': 'error_not_login',
                'config': {
                    'name': 'error_not_login',
                    'description': '错误：未登录',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'error_not_login'
                    },
                    'priority': 0
                }
            },
            {
                'name': 'error_other',
                'config': {
                    'name': 'error_other',
                    'description': '错误：其他错误',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'error_other'
                    },
                    'priority': 0
                }
            },
            {
                'name': 'error_safe_defend',
                'config': {
                    'name': 'error_safe_defend',
                    'description': '错误：被安全打击，关注过多',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'error_safe_defend'
                    },
                    'priority': 0
                }
            },
            {
                'name': 'success',
                'config': {
                    'name': 'success',
                    'description': '关注或取消关注成功',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'success'
                    },
                    'priority': 0
                }
            }
        ],
        'config': {
            'name': 'follow-anchor',
            'route': '/cgi-bin/now/web/anchor/follow_anchor',
            'routeExtra': {},
            'description': '关注或取消关注',
            'disable': false,
            'defaultModule': 'success',
            'activeModule': 'success',
            'method': 'post',
            'plugin': 'xhr',
            'priority': 0,
            'tags': [
                '全部',
                'linjianghe',
                'index.html 余额页'
            ]
        }
    },
    {
        'basePath': '/Users/helinjiang/gitprojects/now-h5-shake-redpacket/mockstar-app/mock_server/mockers/getGiftList',
        'watch': true,
        'name': 'getGiftList',
        'mockModuleList': [
            {
                'name': 'error_not_login',
                'config': {
                    'name': 'error_not_login',
                    'description': '错误：未登录',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'error_not_login'
                    },
                    'priority': 0
                }
            },
            {
                'name': 'success_basic',
                'config': {
                    'name': 'success_basic',
                    'description': '成功',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'success_basic'
                    },
                    'priority': 0
                }
            }
        ],
        'config': {
            'name': 'getGiftList',
            'route': '/cgi-bin/ktv_match/shake_redpacket/gift/getGiftList',
            'routeExtra': {},
            'description': '拉取兑换礼物列表',
            'disable': false,
            'defaultModule': 'success_basic',
            'activeModule': 'success_basic',
            'method': 'get',
            'plugin': 'xhr',
            'priority': 0,
            'tags': [
                '全部',
                'linjianghe',
                'index.html 余额页'
            ]
        }
    },
    {
        'basePath': '/Users/helinjiang/gitprojects/now-h5-shake-redpacket/mockstar-app/mock_server/mockers/getMissionStatus',
        'watch': true,
        'name': 'getMissionStatus',
        'mockModuleList': [
            {
                'name': 'error_not_login',
                'config': {
                    'name': 'error_not_login',
                    'description': '错误：未登录',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'error_not_login'
                    },
                    'priority': 0
                }
            },
            {
                'name': 'error_not_whitelist',
                'config': {
                    'name': 'error_not_whitelist',
                    'description': '该用户不是白名单用户',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'error_not_whitelist'
                    },
                    'priority': 0
                }
            },
            {
                'name': 'success_1_doing',
                'config': {
                    'name': 'success_1_doing',
                    'description': '任务未完成',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'success_1_doing'
                    },
                    'priority': 0
                }
            },
            {
                'name': 'success_2_done',
                'config': {
                    'name': 'success_2_done',
                    'description': '任务已完成',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'success_2_done'
                    },
                    'priority': 0
                }
            },
            {
                'name': 'success_2_done_koi',
                'config': {
                    'name': 'success_2_done_koi',
                    'description': '任务已完成【锦鲤时间】',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'success_2_done_koi'
                    },
                    'priority': 0
                }
            }
        ],
        'config': {
            'name': 'getMissionStatus',
            'route': '/cgi-bin/ktv_match/shake_redpacket/mission/getMissionStatus',
            'routeExtra': {},
            'description': '拉取任务状态以便刷新任务',
            'disable': false,
            'defaultModule': 'success_1_doing',
            'activeModule': 'success_1_doing',
            'method': 'get',
            'plugin': 'xhr',
            'priority': 0,
            'tags': [
                '全部',
                'kevinyyang',
                'shake.html 摇一摇页面'
            ]
        }
    },
    {
        'basePath': '/Users/helinjiang/gitprojects/now-h5-shake-redpacket/mockstar-app/mock_server/mockers/getQuotaMissionList',
        'watch': true,
        'name': 'getQuotaMissionList',
        'mockModuleList': [
            {
                'name': 'error_not_login',
                'config': {
                    'name': 'error_not_login',
                    'description': '错误：未登录',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'error_not_login'
                    },
                    'priority': 0
                }
            },
            {
                'name': 'error_not_whitelist',
                'config': {
                    'name': 'error_not_whitelist',
                    'description': '该用户不是白名单用户',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'error_not_whitelist'
                    },
                    'priority': 0
                }
            },
            {
                'name': 'success',
                'config': {
                    'name': 'success',
                    'description': '任务列表',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'success'
                    },
                    'priority': 0
                }
            },
            {
                'name': 'success_empty',
                'config': {
                    'name': 'success_empty',
                    'description': '空列表',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'success_empty'
                    },
                    'priority': 0
                }
            }
        ],
        'config': {
            'name': 'getQuotaMissionList',
            'route': '/cgi-bin/ktv_match/shake_redpacket/mission/getQuotaMissionList',
            'routeExtra': {},
            'description': '获取额度任务列表',
            'disable': false,
            'defaultModule': 'success',
            'activeModule': 'success',
            'method': 'get',
            'plugin': 'xhr',
            'priority': 0,
            'tags': [
                '全部',
                'linjianghe',
                'index.html 余额页'
            ]
        }
    },
    {
        'basePath': '/Users/helinjiang/gitprojects/now-h5-shake-redpacket/mockstar-app/mock_server/mockers/getRedPackRemain',
        'watch': true,
        'name': 'getRedPackRemain',
        'mockModuleList': [
            {
                'name': 'error_not_login',
                'config': {
                    'name': 'error_not_login',
                    'description': '错误：未登录',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'error_not_login'
                    },
                    'priority': 0
                }
            },
            {
                'name': 'success_0',
                'config': {
                    'name': 'success_0',
                    'description': '0元',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'success_0'
                    },
                    'priority': 0
                }
            },
            {
                'name': 'success_16',
                'config': {
                    'name': 'success_16',
                    'description': '0.16元',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'success_16'
                    },
                    'priority': 0
                }
            },
            {
                'name': 'success_166',
                'config': {
                    'name': 'success_166',
                    'description': '1.66元',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'success_166'
                    },
                    'priority': 0
                }
            },
            {
                'name': 'success_1688',
                'config': {
                    'name': 'success_1688',
                    'description': '16.88元',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'success_1688'
                    },
                    'priority': 0
                }
            }
        ],
        'config': {
            'name': 'getRedPackRemain',
            'route': '/cgi-bin/ktv_match/shake_redpacket/redpack/getRedPackRemain',
            'routeExtra': {},
            'description': '拉取红包余额',
            'disable': false,
            'defaultModule': 'success_166',
            'activeModule': 'success_1688',
            'method': 'get',
            'plugin': 'xhr',
            'priority': 0,
            'tags': [
                '全部',
                'linjianghe',
                'index.html 余额页',
                'APP 我的收益页'
            ]
        }
    },
    {
        'basePath': '/Users/helinjiang/gitprojects/now-h5-shake-redpacket/mockstar-app/mock_server/mockers/getRedpackFlow',
        'watch': true,
        'name': 'getRedpackFlow',
        'mockModuleList': [
            {
                'name': 'error_not_login',
                'config': {
                    'name': 'error_not_login',
                    'description': '错误：未登录',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'error_not_login'
                    },
                    'priority': 0
                }
            },
            {
                'name': 'success_basic',
                'config': {
                    'name': 'success_basic',
                    'description': '成功',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'success_basic'
                    },
                    'priority': 0
                }
            },
            {
                'name': 'success_empty',
                'config': {
                    'name': 'success_empty',
                    'description': '成功-无任何记录',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'success_empty'
                    },
                    'priority': 0
                }
            }
        ],
        'config': {
            'name': 'getRedpackFlow',
            'route': '/cgi-bin/ktv_match/shake_redpacket/redpack/getRedpackFlow',
            'routeExtra': {},
            'description': '拉取红包/额度流水',
            'disable': false,
            'defaultModule': 'success_basic',
            'activeModule': 'success_basic',
            'method': 'get',
            'plugin': 'xhr',
            'priority': 0,
            'tags': [
                '全部',
                'transaction.html 流水页'
            ]
        }
    },
    {
        'basePath': '/Users/helinjiang/gitprojects/now-h5-shake-redpacket/mockstar-app/mock_server/mockers/getShakeTimesRemain',
        'watch': true,
        'name': 'getShakeTimesRemain',
        'mockModuleList': [
            {
                'name': 'error_not_login',
                'config': {
                    'name': 'error_not_login',
                    'description': '错误：未登录',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'error_not_login'
                    },
                    'priority': 0
                }
            },
            {
                'name': 'error_not_whitelist',
                'config': {
                    'name': 'error_not_whitelist',
                    'description': '非白名单用户',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'error_not_whitelist'
                    },
                    'priority': 0
                }
            },
            {
                'name': 'error_server',
                'config': {
                    'name': 'error_server',
                    'description': '后台服务错误',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'error_server'
                    },
                    'priority': 0
                }
            },
            {
                'name': 'success_0',
                'config': {
                    'name': 'success_0',
                    'description': '还剩0次',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'success_0'
                    },
                    'priority': 0
                }
            },
            {
                'name': 'success_1',
                'config': {
                    'name': 'success_1',
                    'description': '还剩1次',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'success_1'
                    },
                    'priority': 0
                }
            },
            {
                'name': 'success_3',
                'config': {
                    'name': 'success_3',
                    'description': '还剩3次',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'success_3'
                    },
                    'priority': 0
                }
            },
            {
                'name': 'success_3_koi',
                'config': {
                    'name': 'success_3_koi',
                    'description': '还剩3次【锦鲤时间】',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'success_3_koi'
                    },
                    'priority': 0
                }
            },
            {
                'name': 'success_media_1',
                'config': {
                    'name': 'success_media_1',
                    'description': '还剩3次【锦鲤时间】，视频类型',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'success_media_1'
                    },
                    'priority': 0
                }
            },
            {
                'name': 'success_media_2',
                'config': {
                    'name': 'success_media_2',
                    'description': '还剩3次【锦鲤时间】，图片类型',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'success_media_2'
                    },
                    'priority': 0
                }
            }
        ],
        'config': {
            'name': 'getShakeTimesRemain',
            'route': '/cgi-bin/ktv_match/shake_redpacket/shake/getShakeTimesRemain',
            'routeExtra': {},
            'description': '拉剩余摇一摇红包个数',
            'disable': false,
            'defaultModule': 'success_3',
            'activeModule': 'success_3_koi',
            'method': 'get',
            'plugin': 'xhr',
            'priority': 0,
            'tags': [
                '全部',
                'kevinyyang',
                'shake.html 摇一摇页面'
            ]
        }
    },
    {
        'basePath': '/Users/helinjiang/gitprojects/now-h5-shake-redpacket/mockstar-app/mock_server/mockers/getSignInInfo',
        'watch': true,
        'name': 'getSignInInfo',
        'mockModuleList': [
            {
                'name': 'error_not_login',
                'config': {
                    'name': 'error_not_login',
                    'description': '错误：未登录',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'error_not_login'
                    },
                    'priority': 0
                }
            },
            {
                'name': 'success_continue',
                'config': {
                    'name': 'success_continue',
                    'description': '成功，连续签到三天',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'success_continue'
                    },
                    'priority': 0
                }
            },
            {
                'name': 'success_full_today_28_not_sign',
                'config': {
                    'name': 'success_full_today_28_not_sign',
                    'description': '成功，签满，今天28天未签',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'success_full_today_28_not_sign'
                    },
                    'priority': 0
                }
            },
            {
                'name': 'success_full_today_28_sign',
                'config': {
                    'name': 'success_full_today_28_sign',
                    'description': '成功，签满，今天28天已签',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'success_full_today_28_sign'
                    },
                    'priority': 0
                }
            },
            {
                'name': 'success_full_today_29',
                'config': {
                    'name': 'success_full_today_29',
                    'description': '成功，签满，今天第29天',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'success_full_today_29'
                    },
                    'priority': 0
                }
            },
            {
                'name': 'success_full_today_31',
                'config': {
                    'name': 'success_full_today_31',
                    'description': '成功，签满，今天第31天',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'success_full_today_31'
                    },
                    'priority': 0
                }
            },
            {
                'name': 'success_left_1',
                'config': {
                    'name': 'success_left_1',
                    'description': '成功，差一天签满',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'success_left_1'
                    },
                    'priority': 0
                }
            },
            {
                'name': 'success_not_continue',
                'config': {
                    'name': 'success_not_continue',
                    'description': '成功，非连续签到',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'success_not_continue'
                    },
                    'priority': 0
                }
            },
            {
                'name': 'success_not_first_open',
                'config': {
                    'name': 'success_not_first_open',
                    'description': '成功，非首次打开',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'success_not_first_open'
                    },
                    'priority': 0
                }
            },
            {
                'name': 'success_not_remind',
                'config': {
                    'name': 'success_not_remind',
                    'description': '成功，无提醒',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'success_not_remind'
                    },
                    'priority': 0
                }
            },
            {
                'name': 'success_not_today',
                'config': {
                    'name': 'success_not_today',
                    'description': '成功，当天未签到',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'success_not_today'
                    },
                    'priority': 0
                }
            },
            {
                'name': 'success_today',
                'config': {
                    'name': 'success_today',
                    'description': '成功，当天已签到',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'success_today'
                    },
                    'priority': 0
                }
            }
        ],
        'config': {
            'name': 'getSignInInfo',
            'route': '/cgi-bin/ktv_match/shake_redpacket/sign_in/getSignInInfo',
            'routeExtra': {},
            'description': '拉取签到信息',
            'disable': false,
            'defaultModule': 'success_not_today',
            'activeModule': 'success_not_remind',
            'method': 'get',
            'plugin': 'xhr',
            'priority': 0,
            'tags': [
                '全部',
                '签到'
            ]
        }
    },
    {
        'basePath': '/Users/helinjiang/gitprojects/now-h5-shake-redpacket/mockstar-app/mock_server/mockers/getUserVerifyLimit',
        'watch': true,
        'name': 'getUserVerifyLimit',
        'mockModuleList': [
            {
                'name': 'error_not_login',
                'config': {
                    'name': 'error_not_login',
                    'description': '错误：未登录',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'error_not_login'
                    },
                    'priority': 0
                }
            },
            {
                'name': 'success',
                'config': {
                    'name': 'success',
                    'description': '成功，且还没达到限制',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'success'
                    },
                    'priority': 0
                }
            },
            {
                'name': 'success_limited',
                'config': {
                    'name': 'success_limited',
                    'description': '成功，且需要限制',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'success_limited'
                    },
                    'priority': 0
                }
            }
        ],
        'config': {
            'name': 'getUserVerifyLimit',
            'route': '/cgi-bin/ktv_match/shake_redpacket/user/getUserVerifyLimit',
            'routeExtra': {},
            'description': '是否开启认证限频',
            'disable': false,
            'defaultModule': 'success',
            'activeModule': 'success',
            'method': 'get',
            'plugin': 'xhr',
            'priority': 0,
            'tags': [
                '全部',
                'linjianghe',
                'index.html 余额页'
            ]
        }
    },
    {
        'basePath': '/Users/helinjiang/gitprojects/now-h5-shake-redpacket/mockstar-app/mock_server/mockers/getUserVerifyStatus',
        'watch': true,
        'name': 'getUserVerifyStatus',
        'mockModuleList': [
            {
                'name': 'error_not_login',
                'config': {
                    'name': 'error_not_login',
                    'description': '错误：未登录',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'error_not_login'
                    },
                    'priority': 0
                }
            },
            {
                'name': 'success_not_phone_id',
                'config': {
                    'name': 'success_not_phone_id',
                    'description': '手机未认证，实名已认证',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'success_not_phone_id'
                    },
                    'priority': 0
                }
            },
            {
                'name': 'success_not_phone_not_id',
                'config': {
                    'name': 'success_not_phone_not_id',
                    'description': '手机未认证，实名未认证',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'success_not_phone_not_id'
                    },
                    'priority': 0
                }
            },
            {
                'name': 'success_phone_id',
                'config': {
                    'name': 'success_phone_id',
                    'description': '手机已认证，实名已认证',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'success_phone_id'
                    },
                    'priority': 0
                }
            },
            {
                'name': 'success_phone_not_id',
                'config': {
                    'name': 'success_phone_not_id',
                    'description': '手机已认证，实名未认证',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'success_phone_not_id'
                    },
                    'priority': 0
                }
            }
        ],
        'config': {
            'name': 'getUserVerifyStatus',
            'route': '/cgi-bin/ktv_match/shake_redpacket/user/getUserVerifyStatus',
            'routeExtra': {},
            'description': '拉取认证状态',
            'disable': false,
            'defaultModule': 'success_phone_id',
            'activeModule': 'success_phone_id',
            'method': 'get',
            'plugin': 'xhr',
            'priority': 0,
            'tags': [
                '全部',
                'linjianghe',
                'index.html 余额页',
                'withdraw.html 提现页'
            ]
        }
    },
    {
        'basePath': '/Users/helinjiang/gitprojects/now-h5-shake-redpacket/mockstar-app/mock_server/mockers/getWithdrawLimit',
        'watch': true,
        'name': 'getWithdrawLimit',
        'mockModuleList': [
            {
                'name': 'error_not_login',
                'config': {
                    'name': 'error_not_login',
                    'description': '错误：未登录',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'error_not_login'
                    },
                    'priority': 0
                }
            },
            {
                'name': 'success_0',
                'config': {
                    'name': 'success_0',
                    'description': '0元',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'success_0'
                    },
                    'priority': 0
                }
            },
            {
                'name': 'success_100',
                'config': {
                    'name': 'success_100',
                    'description': '1元',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'success_100'
                    },
                    'priority': 0
                }
            },
            {
                'name': 'success_1688',
                'config': {
                    'name': 'success_1688',
                    'description': '16.88元',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'success_1688'
                    },
                    'priority': 0
                }
            }
        ],
        'config': {
            'name': 'getWithdrawLimit',
            'route': '/cgi-bin/ktv_match/shake_redpacket/redpack/getWithdrawLimit',
            'routeExtra': {},
            'description': '拉取可提现额度',
            'disable': false,
            'defaultModule': 'success_100',
            'activeModule': 'success_1688',
            'method': 'get',
            'plugin': 'xhr',
            'priority': 0,
            'tags': [
                '全部',
                'linjianghe',
                'index.html 余额页'
            ]
        }
    },
    {
        'basePath': '/Users/helinjiang/gitprojects/now-h5-shake-redpacket/mockstar-app/mock_server/mockers/get_short_video',
        'watch': true,
        'name': 'get_short_video',
        'mockModuleList': [
            {
                'name': 'error_not_login',
                'config': {
                    'name': 'error_not_login',
                    'description': '错误：未登录',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'error_not_login'
                    },
                    'priority': 0
                }
            },
            {
                'name': 'success_type_1',
                'config': {
                    'name': 'success_type_1',
                    'description': 'type=1短视频',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'success_type_1'
                    },
                    'priority': 0
                }
            },
            {
                'name': 'success_type_2',
                'config': {
                    'name': 'success_type_2',
                    'description': 'type=2图片',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'success_type_2'
                    },
                    'priority': 0
                }
            },
            {
                'name': 'success_type_3',
                'config': {
                    'name': 'success_type_3',
                    'description': 'type=1短视频',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'success_type_3'
                    },
                    'priority': 0
                }
            }
        ],
        'config': {
            'name': 'get_short_video',
            'route': '/cgi-bin/ktv_match/qq_movement_red_packet/get_short_video',
            'routeExtra': {},
            'description': '获取首页短视频',
            'disable': false,
            'defaultModule': 'success_type_1',
            'activeModule': 'success_type_2',
            'method': 'get',
            'plugin': 'xhr',
            'priority': 0,
            'tags': [
                '全部',
                'linjianghe',
                'index.html 余额页'
            ]
        }
    },
    {
        'basePath': '/Users/helinjiang/gitprojects/now-h5-shake-redpacket/mockstar-app/mock_server/mockers/setSignInRemind',
        'watch': true,
        'name': 'setSignInRemind',
        'mockModuleList': [
            {
                'name': 'error_not_login',
                'config': {
                    'name': 'error_not_login',
                    'description': '错误：未登录',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'error_not_login'
                    },
                    'priority': 0
                }
            },
            {
                'name': 'error_not_success',
                'config': {
                    'name': 'error_not_success',
                    'description': '错误：设置失败',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'error_not_success'
                    },
                    'priority': 0
                }
            },
            {
                'name': 'success',
                'config': {
                    'name': 'success',
                    'description': '成功',
                    'delay': 0,
                    'match': {
                        '_ms_target': 'success'
                    },
                    'priority': 0
                }
            }
        ],
        'config': {
            'name': 'setSignInRemind',
            'route': '/cgi-bin/ktv_match/shake_redpacket/sign_in/setSignInRemind',
            'routeExtra': {},
            'description': '设置签到提醒状态',
            'disable': false,
            'defaultModule': 'success',
            'activeModule': 'success',
            'method': 'get',
            'plugin': 'xhr',
            'priority': 0,
            'tags': [
                '全部',
                '签到'
            ]
        }
    }
];

const Table = require('cli-table2');

// console.log(data.length);
// data.forEach((item) => {
//     // console.log(item.name,item.mockModuleList.length)
//     console.log(`colorsLog.info('Checking ${item.name}...');`);
//     console.log(`colorsLog.info('${item.name} mock module count: ${item.mockModuleList.length}, success: ${item.mockModuleList.length}, error: 0');`);
// });

// instantiate
var table = new Table({
    head: ['mocker', 'total', 'success', 'error']
});

data.forEach((item) => {
    // console.log(item.name,item.mockModuleList.length)
    table.push([item.name, item.mockModuleList.length, item.mockModuleList.length, 0]);
});



// colorsLog.info(`Checking doShakeAction ...`);
// colorsLog.info(`doShakeAction mock module count: 10, success: 10, error: 0`);

/**
 *
 * @param {Object} args 参数
 */
module.exports = function (args) {
    // console.log(args);
    const self = this;

    return new Promise((resolve, reject) => {
        colorsLog.info(`Begin to check...`);
        // console.log(table.toString());
        colorsLog.info(table.toString());
        colorsLog.info(`Finished! cost 152 ms`);
    });
};


