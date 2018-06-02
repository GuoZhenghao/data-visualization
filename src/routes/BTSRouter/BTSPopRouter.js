import React from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import styles from './BTSPopRouter.less';
import BaseMap from '../../components/Map/Map/bts/BaseMap';
import {dasType} from "../../utils/dasUtils/dasUtils";
import BTSPopRightView from '../../components/DAS/BTS/BTSPopRightView';

class BTSPopRouter extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch({type: 'btsModel/getPopMapLayerData'})
        this.props.dispatch({type: 'btsModel/changeSelectMenuReducer', payload: dasType.BTS_POPULATION})
        this.props.dispatch({type: 'baseMapModel/changeDasTypeReducer', payload: dasType.BTS_POPULATION})

    }

    componentWillUnmount() {
    }

    render() {
        return (
            <div className={styles.normal}>
                <BaseMap></BaseMap>
                <BTSPopRightView></BTSPopRightView>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        // model: state.mcBaseModel,
        model: state.btsModel
    }
}

export default connect(mapStateToProps)(BTSPopRouter);
