import MedicalBaseMapClass from './MedicalMapClass/MedicalBaseMapClass';
import MedicalBaseMapToolClass from './MedicalMapClass/MedicalBaseMapToolClass';
import MedicalIndexMapClass from './MedicalMapClass/MedicalIndexMapClass';
import MedicalIndexMapToolClass from './MedicalMapClass/MedicalIndexMapToolClass';
import EnvMapClass from './EnvMap/EnvMapClass';


// baitasi
import BTSEnvMapClass from './bts/BTSEnvMapClass';
import MBHisMapClass from './mobike/MBHisMapClass';
import MBRealMapClass from './mobike/MBRealMapClass';

import BJTrafficMapClass from './BJTraffic/BJTrafficMapClass';

import {dasType} from '../../../utils/dasUtils/dasUtils';

export function dasTypeFuction(props, map, mapboxgl) {
    let dasTypeState = props.model.dasTypeState;
    switch (dasTypeState) {
        // 医疗
        case dasType.MEDICAL_BASE:
            initMedicalBaseClass(props, map, mapboxgl);
            break;
        case dasType.MEDICAL_INDEX:
            initMedicalIndexClass(props, map, mapboxgl);
            break;
        // 环境
        case dasType.ENVIRONMENT:
            initEnvClass(props, map, mapboxgl);
            break;
        // 白塔寺
        case dasType.BTS_ENVIRONMENT:
            initBTSClass(props, map, mapboxgl);
            break;
        case dasType.BTS_POPULATION:
            initBTSClass(props, map, mapboxgl);
            break;
        // 共享单车
        case dasType.BJ_MOBIKE_REALTIME:
            initMobikeClass(props, map, mapboxgl);
            break;
        case dasType.BJ_MOBIKE_HISTORY:
            initMobikeClass(props, map, mapboxgl);
            break;
        // 北京交通
        case dasType.BJ_TRAFFIC:
            initBJTrafficClass(props, map, mapboxgl);
            break;
        // 北京人口
        case dasType.BJ_POPULATION:
            initBJTrafficClass(props, map, mapboxgl);
            break;
        default:

    }
}

function initMedicalBaseClass(props, map, mapboxgl) {
    /**
     * 医疗基础maptool类
     * @class medicalBaseMapClass
     * @class MedicalBaseMapToolClass
     * @constructor
     */

    let medicalBaseMapToolClass = new MedicalBaseMapToolClass(mapboxgl, map, props.dispatch);
    props.dispatch({
        type: 'medicalBaseMapToolModel/initMedicalBaseMapToolClass',
        payload: medicalBaseMapToolClass
    })

    let medicalBaseMapClass = new MedicalBaseMapClass(mapboxgl, map, props.dispatch);
    props.dispatch({
        type: 'medicalBaseMapModel/initMedicalBaseMapClass',
        payload: medicalBaseMapClass
    })

}

function initMedicalIndexClass(props, map, mapboxgl) {
    /**
     * 医疗基础maptool类
     * @class MedicalIndexMapToolClass
     * @class MedicalIndexMapClass
     * @constructor
     */
    let medicalIndexMapToolClass = new MedicalIndexMapToolClass(mapboxgl, map, props.dispatch);
    props.dispatch({
        type: 'medicalIndexMapToolModel/initMedicalIndexMapToolClass',
        payload: medicalIndexMapToolClass
    })

    let medicalIndexMapClass = new MedicalIndexMapClass(mapboxgl, map, props.dispatch);
    props.dispatch({
        type: 'medicalIndexMapModel/initMedicalIndexMapClass',
        payload: medicalIndexMapClass
    })
}

//

function initEnvClass(props, map, mapboxgl) {

    let envMapClass = new EnvMapClass(mapboxgl, map, props.dispatch);
    props.dispatch({
        type: 'envMapModel/initMedicalBaseMapClass',
        payload: envMapClass
    })
}

function initBTSClass(props, map, mapboxgl) {

    let envMapClass = new BTSEnvMapClass(mapboxgl, map, props.dispatch);
    props.dispatch({
        type: 'btsModel/initMedicalBaseMapClass',
        payload: envMapClass
    })
}

function initMobikeClass(props, map, mapboxgl) {

    let envMapClass = new MBHisMapClass(mapboxgl, map, props.dispatch);
    props.dispatch({
        type: 'mobikeModel/initMedicalBaseMapClass',
        payload: envMapClass
    })
}

function initBJTrafficClass(props, map, mapboxgl) {

    let envMapClass = new BJTrafficMapClass(mapboxgl, map, props.dispatch);
    props.dispatch({
        type: 'bjModel/initMedicalBaseMapClass',
        payload: envMapClass
    })
}
