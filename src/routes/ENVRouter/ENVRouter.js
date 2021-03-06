import React from 'react';
import {connect} from 'dva';
import styles from './ENVRouter.css';
import BaseMap from '../../components/Map/Map/EnvMap/BaseMap';
import {dasType} from "../../utils/dasUtils/dasUtils";
import ENVBottomView from '../../components/DAS/ENV/ENVBottomView';
import ENVENVRightView from '../../components/DAS/ENV/ENVENVRightView';

class ENVRouter extends React.Component {
    constructor(props) {
        super(props);
    }
    // 数据加载，组件加载完成后调用
    componentDidMount() {
        this.props.dispatch({type: 'baseMapModel/changeDasTypeReducer', payload: dasType.ENVIRONMENT})
        this.props.dispatch({type: 'envMapModel/getMedicalBaseMapLayerData', payload: "xxxx"})
    }

    componentWillUnmount() {
    }

    // 构建环境界面
    render() {
        return (
            <div className={styles.normal}>
                <BaseMap></BaseMap>
                <ENVBottomView></ENVBottomView>
                <ENVENVRightView></ENVENVRightView>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        model: state.mcBaseModel,
    }
}

export default connect(mapStateToProps)(ENVRouter);
