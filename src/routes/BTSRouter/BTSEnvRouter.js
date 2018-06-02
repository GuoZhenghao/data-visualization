import React from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import styles from './BTSEnvRouter.less';
import BaseMap from '../../components/Map/Map/bts/BaseMap';
import {dasType} from "../../utils/dasUtils/dasUtils";
import BTSEnvBottomView from '../../components/DAS/BTS/BTSEnvBottomView';
import BTSEnvSelectView from '../../components/DAS/BTS/BTSEnvSelectView';

class BTSEnvRouter extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch({type: 'btsModel/getEnvMapLayerData'})
        this.props.dispatch({type: 'btsModel/changeSelectMenuReducer', payload: dasType.BTS_ENVIRONMENT})
        this.props.dispatch({type: 'baseMapModel/changeDasTypeReducer', payload: dasType.BTS_ENVIRONMENT})
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <div className={styles.normal}>
                <BaseMap></BaseMap>
                <BTSEnvBottomView></BTSEnvBottomView>
                <BTSEnvSelectView></BTSEnvSelectView>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        model: state.btsModel,
    }
}

export default connect(mapStateToProps)(BTSEnvRouter);