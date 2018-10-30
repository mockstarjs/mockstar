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
    let { adminSitePath } = getMockStarConfig();

    return adminSitePath;
}

export function getCGIPath() {
    let { adminCGIPath } = getMockStarConfig();

    return adminCGIPath;
}





