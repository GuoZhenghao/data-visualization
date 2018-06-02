import * as allService from '../../services/bikeService';
import {initChartView} from "../chartView/echartsAll";

export default {

    namespace: 'mobikeModel',

    state: {
        selectMenuState: false,
        medicalBaseMapClass: null,
        bottomRealChartContent: {
            Scales: "1:1:1",
            Charts: [
                {
                    "id": "realAge",
                    "Name": "今日骑行年龄段分布",
                    "Type": "Chart",
                    "Title": null,
                    "subtitle": null,
                    "theme": "medicalLine",
                    "Style": "barBaseStyle",
                    "series": [
                        {
                            "type": "bar",
                            "name": "",
                            "xAxisName": "时间",
                            "yAxisName": "人数"
                        }
                    ]
                },
                {
                    "id": "realTime",
                    "Name": "今日骑行时间段分布",
                    "Type": "Chart",
                    "Title": null,
                    "subtitle": null,
                    "theme": "medicalLine",
                    "Style": "barBaseStyle",
                    "series": [
                        {
                            "type": "bar",
                            "name": "",
                            "xAxisName": "时间",
                            "yAxisName": "人数"
                        }
                    ]
                },
                {
                    "id": "realSex",
                    "Name": "今日骑行性别分布",
                    "Type": "Chart",
                    "Title": null,
                    "subtitle": null,
                    "theme": "medicalLine",
                    "Style": "barBaseStyle",
                    "series": [
                        {
                            "type": "bar",
                            "name": "",
                            "xAxisName": "性别",
                            "yAxisName": "人"
                        }
                    ]
                }
            ]
        },
        bottomChartContent: {
            Scales: "1",
            Charts: [
                {
                    "id": "1",
                    "Name": "昨日开关锁点随时间变化情况",
                    "Type": "Chart",
                    "Title": null,
                    "subtitle": null,
                    "theme": "medicalLine",
                    "Style": "lineBaseStyle",
                    "series": [
                        {
                            "type": "line",
                            "name": "开锁",
                            "xAxisName": "时间",
                            "yAxisName": "数量"
                        },
                        {
                            "type": "line",
                            "name": "关锁",
                            "xAxisName": "时间",
                            "yAxisName": "数量"
                        }
                    ]
                }
            ]
        },
        rightChartContent: {
            "Scales": "1:1:1",
            "Charts": [
                {
                    "id": "hisAge",
                    "Name": "昨日骑行年龄段分布",
                    "labelData": null,
                    "Title": null,
                    "Type": "Chart",
                    "subtitle": null,
                    "theme": "mobike",
                    "Style": "pieRingStyle",
                    "series": [
                        {
                            "type": "pie",
                            "name": "",
                            "xAxisName": "",
                            "yAxisName": ""
                        }
                    ]
                },
                {
                    "id": "hisTime",
                    "Name": "昨日骑行时间段分布",
                    "labelData": null,
                    "Title": null,
                    "Type": "Chart",
                    "subtitle": null,
                    "theme": "mobike",
                    "Style": "pieBaseStyle",
                    "series": [
                        {
                            "type": "pie",
                            "name": "",
                            "xAxisName": "",
                            "yAxisName": ""
                        }
                    ]
                },
                {
                    "id": "hisSex",
                    "Name": "昨日骑行性别分布",
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
                            "xAxisName": "",
                            "yAxisName": ""
                        }
                    ],
                }
            ]
        },
        arrayRight: null
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
            let thisModel = yield select(state => state.mobikeModel);
            let result = yield call(allService.MobikeEnvMapService, thisModel.param);
            if (result.data.result == true) {
                yield put({type: "getBaseMapLayerDataReducer", payload: result})
            } else {
            }
        },
        * getPopMapLayerData({
                                 payload
                             }, {call, put, select}) {
            let thisModel = yield select(state => state.btsModel);
            let result = yield call(allService.btsPopMapService, thisModel.param);
            if (result.data.result == true) {
                yield put({type: "getPopBaseMapLayerDataReducer", payload: result})
            } else {
            }
        },

        * getMobikeBottomChartsData({payload}, {call, put, select}) {
            let allChartType = [];
            let thisModel = yield select(state => state.mobikeModel);
            let chartContent = thisModel.bottomChartContent;
            for (let j = 0; j < chartContent.Charts.length; j++) {
                let result = yield call(allService.mobikeHisChartService)
                console.log(result, 'wangresult')
                if (!result.err) {
                    let obj = chartContent.Charts[j];
                    let chartId = chartContent.Charts[j].id;
                    yield initChartView(chartId, result, obj);
                }
            }
        },

        * getMobikeRightChartsData({payload}, {call, put, select}) {
            let allChartType = [];
            let thisModel = yield select(state => state.mobikeModel);
            let chartContent = thisModel.rightChartContent;
            let arrayUrl = [allService.mobikeRight1Service, allService.mobikeRight2Service, allService.mobikeRight3Service]
            for (let j = 0; j < chartContent.Charts.length; j++) {
                let result = yield call(arrayUrl[j])
                if (!result.err) {
                    let obj = chartContent.Charts[j];
                    let chartId = chartContent.Charts[j].id;
                    yield initChartView(chartId, result, obj);
                }
            }
        },

        * getMobikeRealBottomChartsData({payload}, {call, put, select}) {
            let allChartType = [];
            let thisModel = yield select(state => state.mobikeModel);
            let chartContent = thisModel.bottomRealChartContent;
            let arrayUrl = [allService.mobikeBottom1Service, allService.mobikeBottom2Service, allService.mobikeBottom3Service]
            for (let j = 0; j < chartContent.Charts.length; j++) {
                let result = yield call(arrayUrl[j])
                if (!result.err) {
                    let obj = chartContent.Charts[j];
                    let chartId = chartContent.Charts[j].id;
                    yield initChartView(chartId, result, obj);
                }
            }
        },
        * getMobikeRealRightData({payload}, {call, put, select}) {
            let allChartType = [];
            let thisModel = yield select(state => state.mobikeModel);
            let chartContent = thisModel.rightChartContent;
            let result = yield call(allService.MobikeRealRightMapService)
            if (result.data.result) {
                yield put({type: "getRightDateReducer", payload: result.data.data})
            }
        }


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

        closeSocketReducer(state, action) {
            if (state.medicalBaseMapClass != null) {
                state.medicalBaseMapClass.closeSecket();
            }
            return {
                ...state,
                ...action.payload
            };
        },
        getRightDateReducer(state, action) {
            state.arrayRight = action.payload
            return {
                ...state,
                ...action.payload
            };
        },
    },


};
