import React from 'react';
import {connect} from 'dva';
import styles from './BJPopRouter.less';
import BJPopMap from '../../components/Map/Map/BJPop/BJPopMap';
import {dasType} from "../../utils/dasUtils/dasUtils";

class BJPopRouter extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

        // this.props.dispatch({type: 'bjModel/getBJMapLayerData'})
        // this.props.dispatch({type: 'bjModel/changeSelectMenuReducer', payload: dasType.BJ_TRAFFIC})
        // this.props.dispatch({type: 'baseMapModel/changeDasTypeReducer', payload: dasType.BJ_TRAFFIC})
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div className={styles.normal}>
                <BJPopMap></BJPopMap>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        model: state.mcBaseModel,
    }
}

export default connect(mapStateToProps)(BJPopRouter);
