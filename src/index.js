/**
 * 配置moment语言
 * */
import moment from 'moment';
import 'moment/locale/zh-cn';

/**
 * 使用 dvajs 启动程序入口
 * */
import dva from 'dva';
import './index.less';
import { createBrowserHistory } from 'history';

moment.locale('zh-cn');

// 1. Initialize
const app = dva({
    history: createBrowserHistory(),
});

// 2. Plugins
// app.use({})

// 3. Model
app.model(require('./models/app').default);

// 4. Router
app.router(require('./routers').default);

// 5. Start
app.start('#root');

/**
 * 使用 create-react-app 启动程序入口
 *
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Router from './router';
import configStore from './redux';
import * as serviceWorker from './serviceWorker';

const store = configStore();

ReactDOM.render(
    <Provider store={store}>
        <Router />
    </Provider>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
* */

if (module.hot) {
    module.hot.accept();
}
