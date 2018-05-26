import request from '../utils/request';
import baseConfig from './config';

// 传感器位置及指标数据
export async function btsEnvMapService() {
    return request(baseConfig.guozhenghaoServiveDomain + '/datavisualization/v1/environment/bts/getmonitor?type=3&name=PM2.5', {
        method: 'get',
    });
}

// 热力
export async function btsPopMapService() {
    return request(baseConfig.guozhenghaoServiveDomain + '/datavisualization/v1/environment/bts/getheat?type=3', {
        method: 'get',
    });
}

// 环境
export async function btaEnvChartService(name) {
    // alert(JSON.stringify(params));
    return request(baseConfig.guozhenghaoServiveDomain + '/datavisualization/v1/environment/bts/getmonitorchange?name=' + name, {
        method: 'get',
    });
}

// 人口
export async function btsPopRight1ChartService() {
    // alert(JSON.stringify(params));
    return request(baseConfig.guozhenghaoServiveDomain + '/datavisualization/v1/environment/bts/getpopulation?type=sex', {
        method: 'get',
    });
}


export async function btsPopRight2ChartService() {
    // alert(JSON.stringify(params));
    return request(baseConfig.guozhenghaoServiveDomain + '/datavisualization/v1/environment/bts/getpopulation?type=age', {
        method: 'get',
    });
}

export async function btsPopRight3ChartService() {
    // alert(JSON.stringify(params));
    return request(baseConfig.guozhenghaoServiveDomain + '/datavisualization/v1/environment/bts/getpopulation?type=source', {
        method: 'get',
    });
}
