import React from 'react';
import { Provider } from 'react-redux';
import decode from 'jwt-decode';

import {store} from './store';
import { setCurrentUser, addError } from './store/actions';

import './App.css';
import { setToken } from './services/api';

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
    Hello Polling App!    
    </div>
    </Provider>
  
 )


export default App;
