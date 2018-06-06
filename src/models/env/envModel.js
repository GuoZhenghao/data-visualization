import {initChartView, callBack} from "../chartView/echartsAll";
import * as envService from "../../services/envService";

export default {

    namespace: 'envModel',

    state: {
        // 封装好的图标组件格式
        bottomChartContent: {
            Scales: "1",
            Charts: [
                {
                    "id": "1",
                    "Name": "当天全国环境指数变化",
                    "Type": "Chart",
                    "Title": null,
                    "subtitle": null,
                    "theme": "mobike",
                    "Style": "lineBaseStyle"
                }
            ]
        },
        rightContent: {
            "aqi": 0,
            "city": "查看详情",
            "co": 0,
            "no2": 0,
            "o3": 0,
            "pm10": 0,
            "pm2.5": 0,
            "province": "点击监测站",
            "so2": 0
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
        // 获取数据
        * getChartsData({
                            payload
                        }, {call, put, select}) {
            let allChartType = [];
            let thisModel = yield select(state => state.envModel);
            let chartContent = thisModel.bottomChartContent;
            for (let j = 0; j < chartContent.Charts.length; j++) {
                let result = yield call(envService.envBottomChartService, thisModel.rightContent)
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
        // 点击事件修改参数值
        getValuesReducer(state, action) {
            state.rightContent = action.payload;
            return {
                ...state,
                ...action
            }
        },
    }
}
