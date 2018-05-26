import React from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import styles from './ENVENVRightView.less';

class ENVENVRightView extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className={styles.backgroundView}>
                <div className={styles.middleView}>
                    <div
                        className={styles.listView}>省份:&nbsp;&nbsp;&nbsp;&nbsp;{this.props.model.rightContent.province}</div>
                    <div
                        className={styles.listView}>城市:&nbsp;&nbsp;&nbsp;&nbsp;{this.props.model.rightContent.city}</div>
                    <div
                        className={styles.listView}>AQI:&nbsp;&nbsp;&nbsp;&nbsp;{this.props.model.rightContent.aqi}</div>
                    <div
                        className={styles.listView}>PM2.5:&nbsp;&nbsp;&nbsp;&nbsp;{this.props.model.rightContent.pm25}</div>
                    <div
                        className={styles.listView}>PM10:&nbsp;&nbsp;&nbsp;&nbsp;{this.props.model.rightContent.pm10}</div>
                    <div className={styles.listView}>Co:&nbsp;&nbsp;&nbsp;&nbsp;{this.props.model.rightContent.co}</div>
                    <div
                        className={styles.listView}>No2:&nbsp;&nbsp;&nbsp;&nbsp;{this.props.model.rightContent.no2}</div>
                    <div
                        className={styles.listView}>So2:&nbsp;&nbsp;&nbsp;&nbsp;{this.props.model.rightContent.so2}</div>
                    <div className={styles.listView}>O3:&nbsp;&nbsp;&nbsp;&nbsp;{this.props.model.rightContent.o3}</div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        model: state.envModel,
    }
}

export default connect(mapStateToProps)(ENVENVRightView);
