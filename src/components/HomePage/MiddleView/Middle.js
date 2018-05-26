import React from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import styles from './Middle.css';
import Card from './Card';
import {dasType} from '../../../utils/dasUtils/dasUtils';
import {listJSON} from '../../../utils/homeListJSON/dasList';

class Middle extends React.Component {

    constructor(props) {
        super(props);
    }

    // 将大屏装配到card中
    addListView = (currentThis) => {
        let arrayDas = listJSON.list;
        const ListView = arrayDas.map(function (elem, index) {
            return <Card
                key={index + "home"}
                title={elem.name}
                des={elem.desc}
                image={elem.image}
                onClickDasLook={currentThis.clickDasLook.bind(currentThis, elem)}
            ></Card>;
        })
        return ListView;
    }
    // 点击事件
    clickDasLook = (elem) => {
        const type = elem.type;
        switch (type) {
            // 白塔寺
            case dasType.BTS_POPULATION:
                console.log("this.props", this.props);
                this.props.dispatch(routerRedux.push('/bts/btsenv'));
                break;
            // 环境
            case dasType.ENVIRONMENT:
                console.log("this.props", this.props);
                this.props.dispatch(routerRedux.push('/env'));
                break;
            // 交通
            case dasType.BJ_TRAFFIC:
                console.log("this.props", this.props);
                this.props.dispatch(routerRedux.push('/bjtrffic'));
                break;
            // 共享单车
            case dasType.BJ_MOBIKE_REALTIME:
                console.log("this.props", this.props);
                this.props.dispatch(routerRedux.push('/mb/real'));
                break;
            // 医疗
            case dasType.MEDICAL_BASE:
                console.log("this.props", this.props);
                this.props.dispatch(routerRedux.push('/medical/medicalbasedata'));
                break;
            // 人口
            case dasType.BJ_POPULATION:
                console.log("this.props", this.props);
                this.props.dispatch(routerRedux.push('/bjpop'));
                break;
            default:
        }
    }

    render() {
        return (
            <div className={styles.backgroundView}>
                {
                    this.addListView(this)
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        model: state.homeModel,
    }
}

export default connect(mapStateToProps)(Middle);
