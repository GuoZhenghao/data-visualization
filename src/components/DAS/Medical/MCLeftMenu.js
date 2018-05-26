import React from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import styles from './MCLeftMenu.css';

class MCLeftMenu extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    clickMedicalTypeHandle = () => {

    }

    render() {
        return (
            <div className={styles.leftView} onClick={this.clickMedicalTypeHandle}>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        model: state.mcLeftMenuModel,
    }
}

export default connect(mapStateToProps)(MCLeftMenu);
