import React from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import styles from './BTSEnvSelectView.less';

/**
 * 白塔寺环境指标选择
 */
class BTSEnvSelectView extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    selectAqiTypeHandle = (elem) => {
        this.props.dispatch({type: 'btsModel/getAQITypeReducer', payload: elem.name})
        this.props.dispatch({type: 'btsModel/getEnvMapLayerData'})
        this.props.dispatch({type: 'btsModel/getEnvChartsData'})
    }

    listView = () => {
        let currentThis = this;
        let array = [
            {
                "name": "PM2.5"
            },
            {
                "name": "PM10"
            },
            {
                "name": "O3"
            },
            {
                "name": "VOC"
            },
            {
                "name": "CO"
            },
            {
                "name": "CO2"
            },
            {
                "name": "SO2"
            },
            {
                "name": "车流量"
            },
            {
                "name": "紫外线指数"
            },
            {
                "name": "风速"
            },
            {
                "name": "噪声"
            }

        ]

        let listView = array.map(function (elem, index) {
            let classNameStyle = null;
            if (elem.name == currentThis.props.model.selectType) {
                classNameStyle = styles.selectListView;
            } else {
                classNameStyle = styles.listView;
            }
            return (
                <div key={index} className={classNameStyle}
                     onClick={currentThis.selectAqiTypeHandle.bind(currentThis, elem)}>{elem.name}</div>
            );
        })

        return listView;

    }

    render() {
        return (
            <div className={styles.backgroundView}>
                {this.listView()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        model: state.btsModel,
    }
}

export default connect(mapStateToProps)(BTSEnvSelectView);
