import React from 'react';
import { Provider } from 'react-redux';
import decode from 'jwt-decode';

import {store} from './store';
import { setCurrentUser, addError } from './store/actions';
import { setToken } from './services/api';

import Auth from './components/Auth';
import Error from './components/Error';

import './App.css';


if(localStorage.jwtToken){
  setToken(localStorage.jwtToken);

  try {
    store.dispatch(setCurrentUser(decode(localStorage.jwtToken)))
  } catch (e) {
    store.dispatch(setCurrentUser({}));
    store.dispatch(addError(e));
  }
}

 const App = () => (

  <Provider store={store}>
    <div>
      <Auth authType={'login'} />
      <Error />
    </div>
    </Provider>
  
 )


export default App;
