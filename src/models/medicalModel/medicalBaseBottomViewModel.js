import {initChartView} from '../chartView/echartsAll';
import IPConfig from '../../services/config';
import * as medicalService from "../../services/medicalService";

export default {

    namespace: 'medicalBaseBottomViewModel',

    state: {
        bottomChartContent: {
            params: {group: "month"},
            Scales: "1",
            Charts: [
                {
                    "id": "1",
                    "Name": "就诊人数",
                    "Type": "Chart",
                    "Title": null,
                    "subtitle": null,
                    "theme": "medicalLine",
                    "Style": "MedicalLineStyle",
                    "series": [
                        {
                            "type": "line",
                            "name": "男",
                            "xAxisName": "时间",
                            "yAxisName": "人"
                        },
                        {
                            "type": "line",
                            "name": "女",
                            "xAxisName": "时间",
                            "yAxisName": "人"
                        },
                        {
                            "type": "line",
                            "name": "全部",
                            "xAxisName": "时间",
                            "yAxisName": "人"
                        }
                    ]
                }
            ]
        },
        param: {
            province: '',
            city: '',
            area: '',
            level: '',
            sex: 0,
            group: 'month'
        },
        dispatch: null,
    },

    subscriptions: {
        setup({dispatch, history}) {
        },
    },

    effects: {
        * fetch({payload}, {call, put}) {
            yield put({type: 'save'});
        },

        * getChartsData({payload}, {call, put, select}) {
            let allChartType = [];
            let thisModel = yield select(state => state.medicalBaseBottomViewModel);
            let chartContent = thisModel.bottomChartContent;
            for (let j = 0; j < chartContent.Charts.length; j++) {
                let pathURL = IPConfig.guozhenghaoServiveDomain + "/datavisualization/v1/medicals/ngs/timecount";
                let result = yield call(medicalService.medicalIndexBottomService, thisModel.param)
                alert(result)
                if (!result.error) {
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
        //接收储存dispatch
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
                case "group":
                    // state.param.group = value;

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
