import React from 'react';
import {connect} from 'dva';
import styles from './BJTrafficRouter.less';
import BaseMap from '../../components/Map/Map/BJTraffic/BaseMap';
import {dasType} from "../../utils/dasUtils/dasUtils";

import BJBottomView from '../../components/DAS/BJTraffic/BJBottomView';
import BJRightView from '../../components/DAS/BJTraffic/BJRightView';

class BJTrafficRouter extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

        this.props.dispatch({type: 'bjModel/getBJMapLayerData'})
        this.props.dispatch({type: 'baseMapModel/changeDasTypeReducer', payload: dasType.BJ_TRAFFIC})
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div className={styles.normal}>
                <BaseMap></BaseMap>
                <BJRightView></BJRightView>
                <BJBottomView></BJBottomView>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        model: state.mcBaseModel,
    }
}

export default connect(mapStateToProps)(BJTrafficRouter);
