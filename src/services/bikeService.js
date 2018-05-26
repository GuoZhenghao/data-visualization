import request from '../utils/request';
import baseConfig from './config';

export async function MobikeRealRightMapService() {
    return request(baseConfig.guozhenghaoServiveDomain + '/datavisualization/v1/weibo/gettop?day=1', {
        method: 'get',
    });
}

// 单车图层服务
export async function MobikeEnvMapService() {
    // alert(JSON.stringify(params));
    return request(baseConfig.guozhenghaoServiveDomain + '/datavisualization/v1/bike/old/getpoint?day=-1&hour=08', {
        method: 'get',
    });
}

export async function MobikePopMapService() {
    return request(baseConfig.guozhenghaoServiveDomain + '/datavisualization/v1/environment/bts/getheat?type=3', {
        method: 'get',
    });
}

// 单车
export async function mobikeHisChartService() {
    // alert(JSON.stringify(params));
    return request(baseConfig.guozhenghaoServiveDomain + '/datavisualization/v1/bike/old/getpointchange', {
        method: 'get',
    });
}

export async function mobikeBottom1Service() {
    // alert(JSON.stringify(params));
    return request(baseConfig.guozhenghaoServiveDomain + '/datavisualization/v1/bike/old/getage?day=1', {
        method: 'get',
    });
}

export async function mobikeBottom2Service() {
    // alert(JSON.stringify(params));
    return request(baseConfig.guozhenghaoServiveDomain + '/datavisualization/v1/bike/old/gettime?day=1', {
        method: 'get',
    });
}

export async function mobikeBottom3Service() {
    // alert(JSON.stringify(params));
    return request(baseConfig.guozhenghaoServiveDomain + '/datavisualization/v1/bike/old/getsex?day=1', {
        method: 'get',
    });
}

export async function mobikeRight1Service() {
    // alert(JSON.stringify(params));
    return request(baseConfig.guozhenghaoServiveDomain + '/datavisualization/v1/bike/old/getage?day=-1', {
        method: 'get',
    });
}

export async function mobikeRight2Service() {
    // alert(JSON.stringify(params));
    return request(baseConfig.guozhenghaoServiveDomain + '/datavisualization/v1/bike/old/gettime?day=-1', {
        method: 'get',
    });
}

export async function mobikeRight3Service() {
    // alert(JSON.stringify(params));
    return request(baseConfig.guozhenghaoServiveDomain + '/datavisualization/v1/bike/old/getsex?day=-1', {
        method: 'get',
    });
}

// 热力
export async function btsPopMapService() {
    return request(baseConfig.guozhenghaoServiveDomain + '/datavisualization/v1/environment/bts/getheat?type=3', {
        method: 'get',
    });
}