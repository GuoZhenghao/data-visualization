import {dasType} from '../dasUtils/dasUtils';
import btsImage from '../../assets/home/bts.png'
import envImage from '../../assets/home/env.png'
import medicalImage from '../../assets/home/medical.png'
import popImage from '../../assets/home/pop.png'
import trafficImage from '../../assets/home/traffic.png'
import bikeImage from '../../assets/home/bike.png'

// 首页列表中的所有大屏专题信息
export const listJSON = {
    baseInfo: {
        "name": "首页列表"
    },
    list: [
        {
            name: "白塔寺社区",
            desc: "北京首个全感知物联网社区",
            type: dasType.BTS_POPULATION,
            image: btsImage
        },
        {
            name: "全国环境",
            desc: "中国实时环境监测信息",
            type: dasType.ENVIRONMENT,
            image: envImage
        },
        {
            name: "北京交通",
            desc: "北京实时拥堵信息",
            type: dasType.BJ_TRAFFIC,
            image: trafficImage
        },
        {
            name: "摩拜共享单车",
            desc: "摩拜实时与历史数据分析",
            type: dasType.BJ_MOBIKE_REALTIME,
            image: bikeImage
        },
        {
            name: "全国医疗",
            desc: "全国部分地区医疗状况分析",
            type: dasType.MEDICAL_BASE,
            image: medicalImage
        },
        {
            name: "北京人口",
            desc: "北京一天的人口密度效果",
            type: dasType.BJ_POPULATION,
            image: popImage
        }
    ]
}
