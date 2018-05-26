import React from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {dasType} from "../../utils/dasUtils/dasUtils";
import hisImage from '../../assets/bike/his.png';
import realImage from '../../assets/bike/real.png';
import styles from './MBLeftMenuRouter.less';

class MBLeftMenuRouter extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        window.addEventListener('hashchange', function (ev) {
        });
    }

    clickListHandle = (elem) => {
        this.props.dispatch({type: 'mobikeModel/changeSelectMenuReducer', payload: elem.type})
        switch (elem.type) {
            case dasType.BJ_MOBIKE_HISTORY:
                this.props.history.push('/mb/his');
                break;
            case dasType.BJ_MOBIKE_REALTIME:
                this.props.history.push('/mb/real');
                break;
            default:

        }
    }

    backMainView = () => {
        this.props.dispatch(routerRedux.push('/'));
    }

    addListView = () => {
        let currentThis = this;
        const array = [
            {
                type: dasType.BJ_MOBIKE_REALTIME,
                icon: realImage,
                title: "实时"
            },
            {
                type: dasType.BJ_MOBIKE_HISTORY,
                icon: hisImage,
                title: "历史"
            }
        ]


        let currentSelectState = this.props.model.selectMenuState;
        let listView = array.map(function (elem, index) {
            let styleName = null;
            if (currentSelectState == elem.type) {
                styleName = styles.listView;
            } else {
                styleName = styles.listBottomView;
            }
            return <div key={index + "list"} className={styleName}
                        onClick={currentThis.clickListHandle.bind(currentThis, elem)}>
                <img className={styles.iconView} src={elem.icon}/>
                <div className={styles.titleView}>{elem.title}</div>
            </div>;
        })

        return listView;
    }

    render() {
        return (
            <div className={styles.leftView}>
                <div className={styles.logo} onClick={this.backMainView}></div>
                {
                    this.addListView()
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {model: state.mobikeModel}
}

export default connect(mapStateToProps)(MBLeftMenuRouter);
