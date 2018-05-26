import React from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import styles from './MobikeRealRightView.less';

class MobikeRealRightView extends React.Component {

    constructor(props) {
        super(props);
    }


    componentDidMount() {
        this.props.dispatch({
            type: 'mobikeModel/getMobikeRealRightData'
        })
    }

    addListView = () => {

        let array = this.props.model.arrayRight;
        if (array == null) {
            return null;
        }
        let listView = array.map(function (elem, index) {
            return (
                <div key={index}>
                    <div className={styles.listTitle}>{elem.name}</div>
                    <div className={styles.listValue}>{elem.value1}</div>
                </div>
            );
        })

        return listView;

    }

    render() {
        return (
            <div className={styles.backgroundView}>
                {this.addListView()}

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        model: state.mobikeModel,
    }
}

export default connect(mapStateToProps)(MobikeRealRightView);
