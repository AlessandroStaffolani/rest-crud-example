const os = require('os');
const { getRoutesFromRouters, apiToStringArray } = require('../../utils/utils');
const studentApi = require('../routes/student');
const universityApi = require('../routes/university');
const ResponseObject = require('../../utils/ResponseObject');


function getOsInterfacesIp() {
    const ifaces = os.networkInterfaces();
    const interfacesIp = []

    Object.keys(ifaces).forEach(function (ifname) {
        let alias = 0;

        ifaces[ifname].forEach(function (iface) {
            if ('IPv4' !== iface.family || iface.internal !== false) {
                // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                return;
            }

            if (alias >= 1) {
                // this single interface has multiple ipv4 addresses
                interfacesIp.push({
                    name: ifname + ':' + alias,
                    ip: iface.address

                });
            } else {
                // this interface has only one ipv4 adress
                interfacesIp.push({
                    name: ifname,
                    ip: iface.address
                });
            }
            ++alias;
        });
    });
    return interfacesIp
}


function getApiInfo(req, res, next) {
    const sortByPath = req.query.sortByPath || false;
    const groupByMethod = req.query.groupByMethod || false;
    console.log(sortByPath, groupByMethod)
    const api = getRoutesFromRouters([
        {router: universityApi, prefix: 'api/v1/universities'},
        {router: studentApi, prefix: 'api/v1/students'}
    ], sortByPath, groupByMethod)
    res.status(200)
    res.json(ResponseObject(200, 'Server is running', {
        node: {
            hostname: os.hostname(),
            interfaces: getOsInterfacesIp()
        },
        api: apiToStringArray(api)
    }))
}

module.exports = {
    getApiInfo
}
