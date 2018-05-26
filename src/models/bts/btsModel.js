import * as btsService from '../../services/btsService';
import {initChartView, callBack} from "../chartView/echartsAll";

export default {

    namespace: 'btsModel',

    state: {
        selectMenuState: false,
        medicalBaseMapClass: null,
        baseMapLayerData: null,
        dasTypeState: null,
        // 下部环境折线图
        bottomChartContent: {
            Scales: "1",
            Charts: [
                {
                    "id": "1",
                    "Name": "环境指标变化趋势",
                    "Type": "Chart",
                    "Title": null,
                    "subtitle": null,
                    "theme": "medicalLine",
                    "Style": "lineBaseStyle",
                    "series": [
                        {
                            "type": "line",
                            "name": "",
                            "xAxisName": "时间",
                            "yAxisName": "数值"
                        }
                    ],
                    "dataSource": "/dataeye/v1/data/filter/fortmatchart?"
                }
            ]
        },
        //右侧三图表
        rightChartContent: {
            "Scales": "1:1:1",
            "Charts": [
                {
                    "id": "right1",
                    "Name": "男女比例",
                    "labelData": null,
                    "Title": null,
                    "Type": "Chart",
                    "subtitle": null,
                    "theme": "mobike",
                    "Style": "pieRingStyle",
                    "series": [
                        {
                            "type": "pie"
                        }
                    ],
                    "dataSource": "/dataeye/v1/data/filter/fortmatchart?"
                },
                {
                    "id": "right2",
                    "Name": "年龄段分布",
                    "labelData": null,
                    "Title": null,
                    "Type": "Chart",
                    "subtitle": null,
                    "theme": "mobike",
                    "Style": "pieBaseStyle",
                    "series": [
                        {
                            "type": "pie"
                        }
                    ],
                    "dataSource": "/dataeye/v1/data/filter/fortmatchart?"
                },
                {
                    "id": "right3",
                    "Name": "人口来源(去除北京)",
                    "labelData": null,
                    "Title": null,
                    "Type": "Chart",
                    "subtitle": null,
                    "theme": "mobike",
                    "Style": "barBaseStyle",
                    "series": [
                        {
                            "type": "bar",
                            "name": "",
                            "xAxisName": "省份",
                            "yAxisName": "百分比"
                        }
                    ],
                    "dataSource": "/dataeye/v1/data/filter/fortmatchart?"
                }
            ]
        },
        selectType: "PM2.5",
    },

    subscriptions: {
        setup({dispatch, history}) {
        },
    },

    effects: {
        * fetch({payload}, {call, put}) {
            yield put({type: 'save'});
        },
        * getEnvMapLayerData({
                                 payload
                             }, {call, put, select}) {
            let thisModel = yield select(state => state.btsModel);
            let result = yield call(btsService.btsEnvMapService, thisModel.selectType);
            if (result.data.result == true) {
                yield put({type: "getBaseMapLayerDataReducer", payload: result})
            } else {
            }
        },
        * getPopMapLayerData({
                                 payload
                             }, {call, put, select}) {
            let thisModel = yield select(state => state.btsModel);
            let result = yield call(btsService.btsPopMapService, thisModel.param);
            if (result.data.result == true) {
                yield put({type: "getPopBaseMapLayerDataReducer", payload: result})
            } else {
            }
        },
        * getEnvChartsData({payload}, {call, put, select}) {
            let allChartType = [];
            let thisModel = yield select(state => state.btsModel);
            let chartContent = thisModel.bottomChartContent;
            for (let j = 0; j < chartContent.Charts.length; j++) {
                let result = yield call(btsService.btaEnvChartService, thisModel.selectType)
                if (!result.err) {
                    let obj = chartContent.Charts[j];
                    let chartId = chartContent.Charts[j].id;
                    yield initChartView(chartId, result, obj);
                }
            }
        },

        * getPopChartsData({payload}, {call, put, select}) {
            let allChartType = [];
            let thisModel = yield select(state => state.btsModel);
            let chartContent = thisModel.rightChartContent;
            let arrayUrl = [btsService.btsPopRight1ChartService, btsService.btsPopRight2ChartService, btsService.btsPopRight3ChartService]
            for (let j = 0; j < chartContent.Charts.length; j++) {
                let result = yield call(arrayUrl[j])
                if (!result.err) {
                    let obj = chartContent.Charts[j];
                    let chartId = chartContent.Charts[j].id;
                    yield initChartView(chartId, result, obj);
                }
            }
        },

    },

    reducers: {
        changeSelectMenuReducer(state, action) {
            state.selectMenuState = action.payload;
            return {...state, ...action.payload};
        },
        /**
         *初始化
         */
        initMedicalBaseMapClass(state, action) {
            if (action.payload != null) {
                state.medicalBaseMapClass = action.payload;
            }
            return {
                ...state,
                ...action.payload
            };
        },

        changeDasTypeReducer(state, action) {
            state.dasTypeState = action.payload;
            return {...state, ...action.payload};
        },

        getBaseMapLayerDataReducer(state, action) {
            if (state.medicalBaseMapClass != null) {
                state.baseMapLayerData = action.payload;
                let type = "env";
                state.medicalBaseMapClass.setMapLayerData(state.baseMapLayerData, type);
            }
            return {
                ...state,
                ...action.payload
            };
        },
        getPopBaseMapLayerDataReducer(state, action) {
            if (state.medicalBaseMapClass != null) {
                state.baseMapLayerData = action.payload;
                let type = "pop";
                state.medicalBaseMapClass.setMapLayerData(state.baseMapLayerData, type);
            }
            return {
                ...state,
                ...action.payload
            };
        },
        getAQITypeReducer(state, action) {
            state.selectType = action.payload;
            return {
                ...state,
                ...action.payload
            };
        }


    },

};
