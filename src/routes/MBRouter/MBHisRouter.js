import React from 'react';
import {connect} from 'dva';
import BaseMap from '../../components/Map/Map/mobike/BaseMap';
import styles from './MBHisRouter.less';
import {dasType} from "../../utils/dasUtils/dasUtils";
import MobikeBottomView from '../../components/DAS/MoBike/MobikeBottomView';
import MobikeRightView from '../../components/DAS/MoBike/MobikeRightView';


class MBHisRouter extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch({type: 'mobikeModel/getEnvMapLayerData'})
        this.props.dispatch({type: 'mobikeModel/changeSelectMenuReducer', payload: dasType.BJ_MOBIKE_HISTORY})
        this.props.dispatch({type: 'baseMapModel/changeDasTypeReducer', payload: dasType.BJ_MOBIKE_HISTORY})
    }

    componentWillMount() {
        this.props.dispatch({type: 'mobikeModel/changeSelectMenuReducer', payload: "bjMobikeHistory"})
    }

    render() {
        return (
            <div className={styles.normal}>
                <BaseMap></BaseMap>
                <MobikeBottomView></MobikeBottomView>
                <MobikeRightView></MobikeRightView>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        model: state.mobikeModel,
    }
}

export default connect(mapStateToProps)(MBHisRouter);
