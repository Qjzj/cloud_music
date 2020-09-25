import React from 'react';
import { Provider } from 'react-redux'
import { GlobalStyle } from './style'
import { renderRoutes } from 'react-router-config';
import { HashRouter } from 'react-router-dom';
import routes from './routes'
import store from './store/index'
import {Data} from './application/Singers/data'
require('./assets/fonts/TMall/iconfont.css');

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <GlobalStyle />
        <Data>
          {renderRoutes(routes)}
        </Data>
      </HashRouter>
    </Provider>
  );
}

export default App;
