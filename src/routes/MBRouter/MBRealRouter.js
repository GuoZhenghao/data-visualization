import React from 'react';
import {connect} from 'dva';
import BaseMap from '../../components/Map/Map/mobike/BaseMap';
import styles from './MBRealRouter.less';
import {dasType} from "../../utils/dasUtils/dasUtils";
import MobikeRealBottomView from '../../components/DAS/MoBike/MobikeRealBottomView';
import MobikeRealRightView from '../../components/DAS/MoBike/MobikeRealRightView';

class MBRealRouter extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch({type: 'mobikeModel/getPopMapLayerData'})
        this.props.dispatch({type: 'mobikeModel/changeSelectMenuReducer', payload: dasType.BJ_MOBIKE_REALTIME})
        this.props.dispatch({type: 'baseMapModel/changeDasTypeReducer', payload: dasType.BJ_MOBIKE_REALTIME})

    }

    componentWillUnmount() {
        this.props.dispatch({type: 'mobikeModel/closeSocketReducer'})

    }

    render() {
        return (
            <div className={styles.normal}>
                <BaseMap></BaseMap>
                <MobikeRealBottomView></MobikeRealBottomView>
                <MobikeRealRightView></MobikeRealRightView>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        model: state.mobikeModel,
    }
}

export default connect(mapStateToProps)(MBRealRouter);
