import * as allService from "../../../services/popService";

export default {

    namespace: 'bjPopMapModel',

    state: {

    },

    subscriptions: {
        setup({dispatch, history}) {
        },
    },

    effects: {
        * fetch({payload}, {call, put}) {
            yield put({type: 'save'});
        },
        * getMapLayerData({payload}, {call, put, select}) {  // eslint-disable-line
            let thisModel = yield select(state => state.bjPopMapModel);
            let result = yield call(allService.getBJpopMapLayerData)
            if (!result.err) {
                let mapData = result.data.data;
                let data = [];
                for (let i in mapData[0].content) {
                    data.push([Number(mapData[0].content[i]), Number(mapData[1].content[i]), {weight: Number(mapData[2].content[i])}])
                }
                yield put({type: 'setData', payload: data})

            }
        },

    },

    reducers: {
        setData(state, action) {
            state.data = action.payload;
            return {...state, ...action.payload};
        },
    },

};
