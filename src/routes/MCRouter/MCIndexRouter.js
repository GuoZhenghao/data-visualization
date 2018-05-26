import React from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import styles from './MCIndexRouter.css';
import {dasType} from "../../utils/dasUtils/dasUtils";

import BaseMap from '../../components/Map/Map/BaseMap';
import IRightView from '../../components/DAS/Medical/IRightView';
import BottomView from '../../components/DAS/Medical/MedicalBottomView';

import CompassWidget from '../../components/Common/MapTools/CompassWidget';
import MapToolWidget from '../../components/Common/MapTools/MapToolWidget';

class MCIndexRouter extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch({type: 'mcLeftMenuModel/changeSelectMenuReducer', payload: dasType.MEDICAL_INDEX})
        this.props.dispatch({type: 'baseMapModel/changeDasTypeReducer', payload: dasType.MEDICAL_INDEX})
        this.props.dispatch({type: 'mapToolModel/changeDasTypeReducer', payload: dasType.MEDICAL_INDEX})
        this.props.dispatch({type: 'medicalIndexMapModel/getMedicalIndexMapLayerData', payload: "xxxx"})

    }

    componentWillUnmount() {
        if (this.props.history.action == "POP") {
        }
    }

    render() {
        return (
            <div className={styles.normal}>
                <BaseMap></BaseMap>
                <IRightView></IRightView>
                <BottomView></BottomView>

                {/*<CompassWidget></CompassWidget>*/}
                {/*<MapToolWidget></MapToolWidget>*/}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        model: state.mcIndexModel,
    }
}

export default connect(mapStateToProps)(MCIndexRouter);
