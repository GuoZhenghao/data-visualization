import request from '../utils/request';
import baseConfig from './config';

//北京人口
export async function getBJpopMapLayerData() {
    // alert(JSON.stringify(params));
    return request(baseConfig.guozhenghaoServiveDomain + '/datavisualization/v1/population/getlocationresult?day=-1', {
        method: 'get',
    });
}
