import dva from 'dva';
import 'antd/dist/antd.css';
import './index.css';

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example').default);
app.model(require('./models/homeModel/homeModel').default)
//medaical
app.model(require('./models/medicalModel/mcLeftMenuModel').default)
app.model(require('./models/medicalModel/medicalBottomModel').default)
app.model(require('./models/map/medicalMapModel/medicalBaseMapModel/medicalBaseMapModel').default)
app.model(require('./models/map/medicalMapModel/medicalBaseMapModel/medicalBaseMapToolModel').default)
app.model(require('./models/map/medicalMapModel/medicalIndexMapModel/medicalIndexMapModel').default)
app.model(require('./models/map/medicalMapModel/medicalIndexMapModel/medicalIndexMapToolModel').default)
//map
app.model(require('./models/map/baseMapModel').default)
app.model(require('./models/map/mapToolModel').default)
app.model(require('./models/map/bjPop/bjPopMapModel').default)

app.model(require('./models/medicalModel/medicalBaseBottomViewModel').default)
app.model(require('./models/medicalModel/medicalBaseRightViewModel').default)

app.model(require('./models/medicalModel/medicalIndexBottomViewModel').default)
app.model(require('./models/medicalModel/medicalIndexRightViewModel').default)
//
app.model(require('./models/env/envModel').default)
app.model(require('./models/map/env/envMapModel').default)
//
app.model(require('./models/bts/btsModel').default)
app.model(require('./models/mobike/mobikeModel').default)

app.model(require('./models/bjTraffic/bjModel').default)


// 4. Router
app.router(require('./router').default);


// 5. Start
app.start('#root');
