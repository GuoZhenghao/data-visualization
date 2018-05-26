import request from "../utils/request";
import baseConfig from "./config";

export async function bjTrafficMapService() {
    // alert(JSON.stringify(params));
    return request(baseConfig.guozhenghaoServiveDomain + '/datavisualization/v1/traffic/top/getlocation', {
        method: 'get',
    });
}

//

export async function bjTrafficBottom1Service(name) {
    // alert(JSON.stringify(params));
    return request(baseConfig.guozhenghaoServiveDomain + '/datavisualization/v1/traffic/top/getinfo?type=cofficient&name=' + name, {
        method: 'get',
    });
}

export async function bjTrafficBottom2Service(name) {
    // alert(JSON.stringify(params));
    return request(baseConfig.guozhenghaoServiveDomain + '/datavisualization/v1/traffic/top/getinfo?type=speed&name=' + name, {
        method: 'get',
    });
}

//


export async function bjRight0Service() {
    // alert(JSON.stringify(params));
    return request(baseConfig.guozhenghaoServiveDomain + '/datavisualization/v1/traffic/top/getmileage', {
        method: 'get',
    });
}

export async function bjRight1Service() {
    // alert(JSON.stringify(params));
    return request(baseConfig.guozhenghaoServiveDomain + '/datavisualization/v1/traffic/top/getcoefficient', {
        method: 'get',
    });
}

export async function bjRight2Service() {
    // alert(JSON.stringify(params));
    return request(baseConfig.guozhenghaoServiveDomain + '/datavisualization/v1/traffic/top/getrushtime', {
        method: 'get',
    });
}