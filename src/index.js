import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { DrizzleProvider } from 'drizzle-react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

// Layouts
import App from './App'
import HomeContainer from './layouts/home/HomeContainer'
import LoadingContainer from './layouts/loading/LoadingContainer'

// Pages
import ApplyContainer from './pages/apply'

// Contracts
import ComplexStorage from './../build/contracts/ComplexStorage.json'
import SimpleStorage from './../build/contracts/SimpleStorage.json'
import TutorialToken from './../build/contracts/TutorialToken.json'

// Redux Store
import store from './store'

// Initialize react-router-redux.
const history = syncHistoryWithStore(browserHistory, store)

// Set Drizzle options.
const options = {
  web3: {
    block: false,
    fallback: {
      type: 'ws',
      url: 'ws://127.0.0.1:8545'
    }
  },
  contracts: [
    ComplexStorage,
    SimpleStorage,
    TutorialToken
  ],
  events: {
    SimpleStorage: ['StorageSet']
  }
}

ReactDOM.render((
    <MuiThemeProvider>
      <DrizzleProvider options={options}>
        <Provider store={store}>
          <LoadingContainer>
            <Router history={history}>
              <Route path="/" component={App}>
                <IndexRoute component={HomeContainer} />
                <Route path="apply" component={ApplyContainer} />
              </Route>
            </Router>
          </LoadingContainer>
        </Provider>
      </DrizzleProvider>
    </MuiThemeProvider>
  ),
  document.getElementById('root')
);
