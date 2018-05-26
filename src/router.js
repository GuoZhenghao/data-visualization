import React from 'react';
import {Router, Route, Switch} from 'dva/router';
// 首页
import HomePage from './routes/HomePage';
// 环境
import ENVRouter from './routes/ENVRouter/ENVRouter';
// 北京交通
import BJTrafficRouter from './routes/BJTrafficRouter/BJTrafficRouter';
// 白塔寺
import BTSLeftMenuRouter from './routes/BTSRouter/BTSLeftMenuRouter';
import BTSEnvRouter from './routes/BTSRouter/BTSEnvRouter';
import BTSPopRouter from './routes/BTSRouter/BTSPopRouter';
// 共享单车
import MBLeftMenuRouter from './routes/MBRouter/MBLeftMenuRouter';
import MBHisRouter from './routes/MBRouter/MBHisRouter';
import MBRealRouter from './routes/MBRouter/MBRealRouter';
// 医疗
import MCBaseRouter from './routes/MCRouter/MCBaseRouter';
import MCIndexRouter from './routes/MCRouter/MCIndexRouter';
import MCLeftMenuRouter from './routes/MCRouter/MCLeftMenuRouter';
//北京人口
import BJPopRouter from './routes/BJPopRouter/BJPopRouter';

function RouterConfig({history}) {
    console.log("history", history);
    return (
        <Router history={history}>
            <Switch>
                <Route path="/" exact component={HomePage}/>
                <div>
                    {/* 环境 */}
                    <Route path="/env" component={ENVRouter}></Route>
                    {/* 交通 */}
                    <Route path="/bjtrffic" component={BJTrafficRouter}></Route>
                    {/* 社区 */}
                    <Route path="/bts" component={BTSLeftMenuRouter}></Route>
                    <Route path="/bts/btsenv" component={BTSEnvRouter}></Route>
                    <Route path="/bts/btspop" component={BTSPopRouter}></Route>
                    {/* 共享单车 */}
                    <Route path="/mb" component={MBLeftMenuRouter}></Route>
                    <Route path="/mb/his" component={MBHisRouter}></Route>
                    <Route path="/mb/real" component={MBRealRouter}></Route>
                    {/* 医疗 */}
                    <Route path="/medical" component={MCLeftMenuRouter}></Route>
                    <Route path="/medical/medicalbasedata" component={MCBaseRouter}></Route>
                    <Route path="/medical/medicalindexdata" component={MCIndexRouter}></Route>
                    {/* 人口 */}
                    <Route path="/bjpop" component={BJPopRouter}></Route>
                </div>
            </Switch>
        </Router>
    );
}

export default RouterConfig;
