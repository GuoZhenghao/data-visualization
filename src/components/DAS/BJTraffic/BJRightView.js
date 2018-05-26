import React from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import styles from './BJRightView.less';

class BJRightView extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {

    }

    componentDidMount() {
        this.props.dispatch({
            type: 'bjModel/getRightChartsData'
        })
        this.props.dispatch({
            type: 'bjModel/getRight1Data'
        })
        this.props.dispatch({
            type: 'bjModel/getRight2Data'
        })
    }


    listView = () => {
        console.log(this.props)
        let content = this.props.model.rightChartContent;
        let currentThis = this;
        if (content === null) {
            return null;
        }
        let NewWidth = content.Scales.split(":");
        let scalesAnd = 0;
        for (let i = 0; i < NewWidth.length; i++) {
            scalesAnd += parseInt(NewWidth[i]);
        }
        let xwidthAnd = [];
        for (let j = 0; j < NewWidth.length; j++) {
            let xwidth = parseInt(NewWidth[j]) / scalesAnd * 100 + "%";
            xwidthAnd.push(xwidth);
        }
        let listView = content.Charts.map(function (content, elem) {
            let style = {
                width: "100%",
                height: "40%",
                marginBottom: "7px",
            }

            return (
                <div key={"gzh" + elem} style={style}>
                    <div id={content.id} className={styles.chartView}></div>
                </div>
            )
        })
        return listView;
    }

    addListView1 = () => {

        let array = this.props.model.arrayRight1;
        if (array == null) {
            return null;
        }
        let listView = array.map(function (elem, index) {
            return (
                <div key={index}>
                    <div className={styles.listTitle}>{elem.name}</div>
                    <div className={styles.listValue}>{elem.value1}</div>
                    <div className={styles.listValue}>{elem.value2}</div>
                </div>
            );
        })

        return listView;

    }

    addListView2 = () => {

        let array = this.props.model.arrayRight2;
        if (array == null) {
            return null;
        }
        let listView = array.map(function (elem, index) {
            return (
                <div key={index}>
                    <div className={styles.listTitle}>{elem.name}</div>
                    <div className={styles.listValue}>{elem.value1}</div>
                    <div className={styles.listValue}>{elem.value2}</div>
                </div>
            );
        })

        return listView;

    }

    render() {
        return (
            <div className={styles.backgroundView}>
                {this.listView()}
                <div className={styles.middleView}>
                    <div className={styles.name}>实施道路拥堵指数</div>
                    {
                        this.addListView1()
                    }
                </div>
                <div className={styles.bottomView}>
                    <div className={styles.name}>昨日早晚高峰</div>
                    {
                        this.addListView2()
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        model: state.bjModel,
    }
}

export default connect(mapStateToProps)(BJRightView);
