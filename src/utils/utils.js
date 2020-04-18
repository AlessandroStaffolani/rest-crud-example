const url = require('url')

function isEmpty(value) {
    return value === '' || value === null || value === undefined
}

function getRouterRoutes(router, prefix='/') {
    return router.stack
        .filter(route => route !== undefined)
        .map(route => ({method: Object.keys(route.route.methods)[0].toUpperCase(), path: prefix + route.route.path}))
}

function getRoutesFromRouters(allRouters, sortByPath=true, groupByMethod=true) {
    const routes = allRouters
        .map(({router, prefix}) => getRouterRoutes(router, prefix).map(route => route))
        .reduce((flat, route) => flat.concat(route))
    if (sortByPath) {
        routes.sort((a, b) => objectStringCompare(a, b, 'path'))
    }
    if (groupByMethod) {
        routes.sort((a, b) => objectStringCompare(a, b, 'method'))
    }
    return routes
}

function apiToStringArray(api) {
    return api.map(route => route.method + spacer(7 - route.method.length) + route.path)
}

function objectStringCompare(a, b, field) {
    const fieldA = a[field].toUpperCase();
    const fieldB = b[field].toUpperCase();
    if (fieldA < fieldB) {
        return -1;
    }
    if (fieldA > fieldB) {
        return 1;
    }

    // they are the same
    return 0;
}

function spacer(x) {
    let res = '';
    while(x--) res += ' ';
    return res;
}

module.exports = {
    isEmpty,
    getRouterRoutes,
    getRoutesFromRouters,
    apiToStringArray
}
