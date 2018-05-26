import * as allService from '../../services/trafficService';
import {initChartView, callBack} from "../chartView/echartsAll";

export default {

    namespace: 'bjModel',

    state: {
        selectMenuState: false,
        medicalBaseMapClass: null,
        baseMapLayerData: null,
        dasTypeState: null,
        bottomChartContent: {
            Scales: "1:1",
            Charts: [
                {
                    "id": "cofficient",
                    "Name": "过去24h平均拥堵指数",
                    "Type": "Chart",
                    "Title": null,
                    "subtitle": null,
                    "theme": "mobike",
                    "Style": "lineBaseStyle",
                    "series": [
                        {
                            "type": "line",
                            "name": "",
                            "xAxisName": "时间",
                            "yAxisName": "拥堵指数"
                        }
                    ],
                    "dataSource": "/dataeye/v1/data/filter/fortmatchart?"
                },
                {
                    "id": "speed",
                    "Name": "过去24h平均速度",
                    "Type": "Chart",
                    "Title": null,
                    "subtitle": null,
                    "theme": "mobike",
                    "Style": "lineBaseStyle",
                    "series": [
                        {
                            "type": "line",
                            "name": "",
                            "xAxisName": "时间",
                            "yAxisName": "km/h"
                        }
                    ],
                    "dataSource": "/dataeye/v1/data/filter/fortmatchart?"
                }
            ]
        },
        rightChartContent: {
            "Scales": "1",
            "Charts": [
                {
                    "id": "mile",
                    "Name": "实时拥堵里程",
                    "labelData": null,
                    "Title": null,
                    "Type": "Chart",
                    "subtitle": null,
                    "theme": "mobike",
                    "Style": "barBaseStyle",
                    "dataSource": "/dataeye/v1/data/filter/fortmatchart?"
                }
            ]
        },
        selectType: "",
        arrayRight1: null,
        arrayRight2: null
    },

    subscriptions: {
        setup({dispatch, history}) {
        },
    },

    effects: {
        * fetch({payload}, {call, put}) {
            yield put({type: 'save'});
        },
        * getBJMapLayerData({
                                payload
                            }, {call, put, select}) {
            let thisModel = yield select(state => state.bjModel);
            let result = yield call(allService.bjTrafficMapService);
            if (result.data.result == true) {
                yield put({type: "getBaseMapLayerDataReducer", payload: result})
            } else {
            }
        },

        * getRightChartsData({payload}, {call, put, select}) {
            let allChartType = [];
            let thisModel = yield select(state => state.bjModel);
            let chartContent = thisModel.rightChartContent;
            for (let j = 0; j < chartContent.Charts.length; j++) {
                let result = yield call(allService.bjRight0Service)
                if (!result.err) {
                    if (result.data.data != null) {
                        let series = [];
                        let desc = result.data.data.description;
                        for (let i = 0; i < desc.length; i++) {
                            series.push({
                                "type": "bar",
                                "name": desc[i],
                                "xAxisName": "",
                                "yAxisName": ""
                            })
                        }
                        chartContent.Charts[j].series = series;
                        let obj = chartContent.Charts[j];
                        let chartId = chartContent.Charts[j].id;
                        yield initChartView(chartId, result, obj);
                    }
                }
            }
        },

        * getRight1Data({payload}, {call, put, select}) {
            let result = yield call(allService.bjRight1Service)
            if (result.data.result) {
                yield put({type: "getgetRight1DataReducer", payload: result.data.data})

            }
        },
        * getRight2Data({payload}, {call, put, select}) {
            let result = yield call(allService.bjRight2Service)
            if (result.data.result) {
                yield put({type: "getgetRight2DataReducer", payload: result.data.data})
            }
        },
        * getBottomChartsData({payload}, {call, put, select}) {
            let allChartType = [];
            let thisModel = yield select(state => state.bjModel);
            let chartContent = thisModel.bottomChartContent;
            let arrayUrl = [allService.bjTrafficBottom1Service, allService.bjTrafficBottom2Service]

            for (let j = 0; j < chartContent.Charts.length; j++) {
                let result = yield call(arrayUrl[j], thisModel.selectType)
                if (!result.err) {
                    if (result.data.data != null) {
                        let obj = chartContent.Charts[j];
                        let chartId = chartContent.Charts[j].id;
                        yield initChartView(chartId, result, obj);
                    }
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
                // alert(JSON.stringify(state.baseMapLayerData));
                state.medicalBaseMapClass.setMapLayerData(state.baseMapLayerData);
            }
            return {
                ...state,
                ...action.payload
            };
        },

        getSelectTypeReducer(state, action) {
            state.selectType = action.payload;
            return {
                ...state,
                ...action.payload
            };
        },
        getgetRight1DataReducer(state, action) {
            state.arrayRight1 = action.payload;
            return {
                ...state,
                ...action.payload
            };
        },
        getgetRight2DataReducer(state, action) {
            state.arrayRight2 = action.payload;
            return {
                ...state,
                ...action.payload
            };
        },
    },
};
