import request from '../utils/request';
import baseConfig from './config';

/**
 *医疗基础地图渲染服务
 */
export async function medicalBaseMapService(params) {
    // alert(JSON.stringify(params));
    return request(baseConfig.guozhenghaoServiveDomain + '/datavisualization/v1/medicals/ngs/hospitalcount', {
        method: 'post',
        // headers: {
        //   'Content-type': 'application/json'
        // },
        body: JSON.stringify(params)
    });
}

/**
 * 医疗指数地图渲染服务
 */
export async function medicalIndexMapService(params) {
    // alert(JSON.stringify(params));
    return request(baseConfig.guozhenghaoServiveDomain + '/datavisualization/v1/medicals/ngs/hospitalcount', {
        method: 'post',
        // headers: {
        //   'Content-type': 'application/json'
        // },
        body: JSON.stringify(params)
    });
}


/**
 *麦迪医疗十项指标服务对接
 */
export async function medicalIndexRightService(params) {
    // alert(JSON.stringify(params));
    return request(baseConfig.guozhenghaoServiveDomain + '/datavisualization/v1/medicals/ngs/tentarget', {
        method: 'post',
        // headers: {
        //   'Content-type': 'application/json'
        // },
        body: JSON.stringify(params)
    });
}


/**
 *shijianzou
 */
export async function medicalIndexBottomService(params) {
    // alert(JSON.stringify(params));
    return request(baseConfig.guozhenghaoServiveDomain + '/datavisualization/v1/medicals/ngs/timecount', {
        method: 'post',
        // headers: {
        //   'Content-type': 'application/json'
        // },
        body: JSON.stringify(params)
    });
}


/**
 *kangshuai
 */
export async function medicalBaseRight1Service(params) {
    // alert(JSON.stringify(params));
    return request(baseConfig.guozhenghaoServiveDomain + '/datavisualization/v1/medicals/apc/sum', {
        method: 'post',
        // headers: {
        //   'Content-type': 'application/json'
        // },
        body: JSON.stringify(params)
    });
}

/**
 *jiangya
 */
export async function medicalBaseRight2Service(params) {
    // alert(JSON.stringify(params));
    return request(baseConfig.guozhenghaoServiveDomain + '/datavisualization/v1/medicals/hg/sum', {
        method: 'post',
        // headers: {
        //   'Content-type': 'application/json'
        // },
        body: JSON.stringify(params)
    });
}

/**
 *tinglei
 */
export async function medicalBaseRight3Service(params) {
    // alert(JSON.stringify(params));
    return request(baseConfig.guozhenghaoServiveDomain + '/datavisualization/v1/medicals/ll/sum', {
        method: 'post',
        // headers: {
        //   'Content-type': 'application/json'
        // },
        body: JSON.stringify(params)
    });
}
