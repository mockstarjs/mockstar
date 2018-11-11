import _ from 'lodash';

export function getLocalServerConfig() {
    const config = _.merge({
        'namespace': '',
        'adminSiteRouteName': 'mockstar-admin',
        'adminCGIRouteName': 'mockstar-cgi'
    }, window._mockstar_config_);

    window._mockstar_config_ = config;

    return config;
}

export function getSiteRoot() {
    let { namespace } = getLocalServerConfig();

    return namespace ? `/${namespace}/` : '/';
}

export function getSiteBase() {
    let { adminSiteRouteName } = getLocalServerConfig();

    return getSiteRoot() + adminSiteRouteName;
}

export function getCGIBase() {
    let { adminCGIRouteName } = getLocalServerConfig();

    return getSiteRoot() + adminCGIRouteName;
}

export function getPort() {
    let { port } = getLocalServerConfig();

    return port;
}

export function getNamespace() {
    let { namespace } = getLocalServerConfig();

    return namespace;
}


