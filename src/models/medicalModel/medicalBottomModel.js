import {initChartView, callBack} from "../chartView/echartsAll";

import * as medicalService from "../../services/medicalService";

export default {

    namespace: 'medicalBottomModel',

    state: {
        bottomChartContent: {
            Scales: "1",
            Charts: [
                {
                    "id": "1",
                    "Name": "就诊折线图",
                    "Type": "Chart",
                    "Title": null,
                    "subtitle": null,
                    "theme": "medicalLine",
                    "Style": "lineBaseStyle"
                }
            ]
        },
        rightContent: {
            "group": "month"
        },

        dispatch: null
    },

    subscriptions: {
        setup({dispatch, history}) {
        }
    },

    effects: {
        * fetch({
                    payload
                }, {call, put}) {
            yield put({type: 'save'});
        },

        * getChartsData({
                            payload
                        }, {call, put, select}) {
            let allChartType = [];
            let thisModel = yield select(state => state.medicalBottomModel);
            let chartContent = thisModel.bottomChartContent;
            for (let j = 0; j < chartContent.Charts.length; j++) {
                let result = yield call(medicalService.medicalIndexBottomService, thisModel.rightContent)
                if (!result.err) {
                    let obj = chartContent.Charts[j];
                    let chartId = chartContent.Charts[j].id;
                    let series = [];
                    let desc = result.data.data.description;
                    for (let i = 0; i < desc.length; i++) {
                        series.push({"type": "line", "name": desc[i], "xAxisName": "时间", "yAxisName": "人"})
                    }
                    chartContent.Charts[j].series = series;
                    yield initChartView(chartId, result, obj);
                }
            }
        }
    },

    reducers: {
        setDispatch(state, action) {
            state.dispatch = action.payload;
            return {
                ...state,
                ...action
            }
        },

        getValuesReducer(state, action) {
            state.rightContent = action.payload;
            return {
                ...state,
                ...action
            }
        },

    }
}
