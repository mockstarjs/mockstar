module.exports = function (params) {
    if (params && params.a) {
        return 'from_param_' + params.a;
    }

    if (params && params._ms_extra) {
        return '_ms_extra_' + (typeof params._ms_extra === 'object' ? JSON.stringify(params._ms_extra) : params._ms_extra);
    }

    return 4;
};