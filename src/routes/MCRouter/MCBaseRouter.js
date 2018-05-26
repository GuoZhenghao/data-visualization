import React from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import styles from './MCBaseRouter.css';
import {dasType} from "../../utils/dasUtils/dasUtils";
import BaseMap from '../../components/Map/Map/BaseMap';
import RightView from '../../components/DAS/Medical/RightView';
import BottomView from '../../components/DAS/Medical/MedicalBottomView';

import CompassWidget from '../../components/Common/MapTools/CompassWidget';
import MapToolWidget from '../../components/Common/MapTools/MapToolWidget';

class MCBaseRouter extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

        this.props.dispatch({type: 'mcLeftMenuModel/changeSelectMenuReducer', payload: dasType.MEDICAL_BASE})
        this.props.dispatch({type: 'baseMapModel/changeDasTypeReducer', payload: dasType.MEDICAL_BASE})
        this.props.dispatch({type: 'mapToolModel/changeDasTypeReducer', payload: dasType.MEDICAL_BASE})
        this.props.dispatch({type: 'medicalBaseMapModel/getMedicalBaseMapLayerData', payload: "xxxx"})
    }

    componentWillUnmount() {
        console.log("mcBaseModel", this.props);
        if (this.props.history.action == "POP") {
        }

    }

    render() {
        return (
            <div className={styles.normal}>
                <BaseMap></BaseMap>
                <RightView></RightView>
                <BottomView></BottomView>

                {/*<CompassWidget></CompassWidget>*/}
                {/*<MapToolWidget></MapToolWidget>*/}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        model: state.mcBaseModel,
    }
}

export default connect(mapStateToProps)(MCBaseRouter);
