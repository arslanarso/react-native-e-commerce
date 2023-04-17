import React from 'react';
import Router from './Route/Router';
import {Provider} from 'react-redux';
import store from '../Redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};
export default App;
