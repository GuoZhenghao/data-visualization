import React from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {dasType} from "../../utils/dasUtils/dasUtils";
import envImage from '../../assets/bts/env.png';
import popImage from '../../assets/bts/pop.png';

import styles from './BTSLeftMenuRouter.less';

/**
 * 白塔寺社区左侧菜单栏
 */
class BTSLeftMenuRouter extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        window.addEventListener('hashchange', function (ev) {
        });
    }

    clickListHandle = (elem) => {
        this.props.dispatch({type: 'btsModel/changeSelectMenuReducer', payload: elem.type})
        switch (elem.type) {
            case dasType.BTS_ENVIRONMENT:
                this.props.history.push('/bts/btsenv');
                break;
            case dasType.BTS_POPULATION:
                this.props.history.push('/bts/btspop');
                break;
            default:
        }
    }

    addListView = () => {
        let currentThis = this;
        const array = [
            {
                type: dasType.BTS_ENVIRONMENT,
                icon: envImage,
                title: "环境"
            },
            {
                type: dasType.BTS_POPULATION,
                icon: popImage,
                title: "人口"
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
                <img className={styles.iconView} src={elem.icon}></img>
                <div className={styles.titleView}>{elem.title}</div>
            </div>;
        })

        return listView;
    }

    render() {
        return (
            <div className={styles.leftView}>
                <div className={styles.logo}></div>
                {
                    this.addListView()
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {model: state.btsModel}
}

export default connect(mapStateToProps)(BTSLeftMenuRouter);
