import React from 'react';
import styles from './Header.css';

class Header extends React.Component {

    render() {
        return (
            <div className={styles.backgroundView}>
                时空大数据分析与可视化系统
            </div>
        )
    }
}

export default Header;
