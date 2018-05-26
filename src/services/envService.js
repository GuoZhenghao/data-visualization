import request from '../utils/request';
import baseConfig from './config';

/**
 *地图渲染服务
 */
export async function envMapService() {
    return request(baseConfig.guozhenghaoServiveDomain + '/datavisualization/v1/environment/rank/getall', {
        method: 'get',
    });
}

/**
 *图底部表服务
 */
export async function envBottomChartService(params) {
    return request(baseConfig.guozhenghaoServiveDomain + '/datavisualization/v1/environment/rank/getrange', {
        method: 'post',
        body: JSON.stringify(params)
    });
}
