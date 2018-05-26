import {initChartView, callBack} from "../chartView/echartsAll";
import * as medicalService from "../../services/medicalService";

export default {

    namespace: 'medicalIndexBottomViewModel',

    state: {
        param: {
            province: '',
            city: '',
            area: '',
            level: '',
            sex: 0,
            agid: 0,
            group: 'month'
        },

        dispatch: null
    },

    subscriptions: {
        setup({dispatch, history}) {
        },
    },

    effects: {
        * fetch({payload}, {call, put}) {
            yield put({type: 'save'});
        },

        * getChartsData({payload}, {call, put, select}) {  // eslint-disable-line
            let allChartType = [];
            let thisModel = yield select(state => state.medicalIndexBottomViewModel);
            let chartContent = thisModel.bottomChartContent;
            for (let j = 0; j < chartContent.Charts.length; j++) {
                let result = yield call(medicalService.medicalIndexBottomService, thisModel.param)
                if (!result.err) {
                    let obj = chartContent.Charts[j];
                    let chartId = chartContent.Charts[j].id;
                    let series = [];
                    let desc = result.data.data.description;
                    for (let i = 0; i < desc.length; i++) {
                        series.push({
                            "type": "line",
                            "name": desc[i],
                            "xAxisName": "时间",
                            "yAxisName": "人"
                        })
                    }
                    chartContent.Charts[j].series = series;
                    yield initChartView(chartId, result, obj, thisModel.dispatch, thisModel.param.group);
                }
            }
        },
    },

    reducers: {
        setDispatch(state, action) {
            state.dispatch = action.payload;
            return {...state, ...action}
        },
        getParamsReducer(state, action) {
            let name = action.payload.name;
            let value = action.payload.value;
            let time = action.payload.time;
            switch (name) {
                case "province":
                    state.param.province = value;
                    state.param.city = "";
                    state.param.area = "";
                    break;
                case "city":
                    state.param.province = "";
                    state.param.city = value;
                    state.param.area = "";
                    break;
                case "area":
                    state.param.province = "";
                    state.param.city = "";
                    state.param.area = value;
                    break;
                case "level":
                    state.param.level = value;

                    break;
                case "agid":
                    state.param.agid = value;
                    break;
                case "group":
                    break;
                case "sex":
                    state.param.sex = value;

                    break;
                default:

            }
            return {
                ...state,
                ...action.payload
            };
        }
    },

};
