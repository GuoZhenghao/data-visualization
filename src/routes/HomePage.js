import React from 'react';
import {connect} from 'dva';
import styles from './HomePage.css';

// 顶部的标题栏
import Header from '../components/HomePage/HeaderView/Header';
// 中间的各个大屏
import Middle from '../components/HomePage/MiddleView/Middle';

// 设置首页显示内容
function HomePage() {
    return (
        <div className={styles.normal}>
            <Header></Header>
            <Middle></Middle>
        </div>
    );
}

HomePage.propTypes = {};

export default connect()(HomePage);
