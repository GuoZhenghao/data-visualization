import * as envService from '../../../services/envService';

export default {

    namespace: 'envMapModel',

    state: {

        medicalBaseMapClass: null,
        baseMapLayerData: null,
        param: {
        }
    },

    subscriptions: {
        setup({dispatch, history}) {
        }
    },

    effects: {
        * getMedicalBaseMapLayerData({
                                         payload
                                     }, {call, put, select}) {
            let thisModel = yield select(state => state.envMapModel);
            let result = yield call(envService.envMapService, thisModel.param);
            if (result.data.result == true) {
                yield put({type: "getBaseMapLayerDataReducer", payload: result})
            } else {
            }
        }
    },

    reducers: {

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
                state.medicalBaseMapClass.setMapLayerData(state.baseMapLayerData);
            }
            return {
                ...state,
                ...action.payload
            };
        },


    }
};
