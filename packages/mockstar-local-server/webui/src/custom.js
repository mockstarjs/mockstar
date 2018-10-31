export function getMockStarConfig() {
    let config = window._mockstar_config_ || {
        'namespace': '',
        'adminSitePath': '/mockstar-admin',
        'adminCGIPath': '/mockstar-cgi'
    };

    window._mockstar_config_ = config;

    return config;
}

export function getSiteRoot() {
    let { namespace } = getMockStarConfig();

    return namespace ? `/${namespace}/` : '/';
}

export function getSitePath() {
    let { namespace, adminSitePath } = getMockStarConfig();

    return (namespace ? '/' + namespace : '') + adminSitePath;
}

export function getCGIPath() {
    let { namespace, adminCGIPath } = getMockStarConfig();

    return (namespace ? '/' + namespace : '') + adminCGIPath;
}

export function getPort() {
    let { port } = getMockStarConfig();

    return port;
}

export function getNamespace() {
    let { namespace } = getMockStarConfig();

    return namespace;
}


