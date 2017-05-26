import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';


class App extends Component {
	
	componentWillMount() {

  var config = {
    apiKey: "AIzaSyApcl8R1-kiPRO33cD5k_bYT2_TMH_A9pU",
    authDomain: "employeemanager-bf813.firebaseapp.com",
    databaseURL: "https://employeemanager-bf813.firebaseio.com",
    projectId: "employeemanager-bf813",
    storageBucket: "employeemanager-bf813.appspot.com",
    messagingSenderId: "961507577620"
  };

  firebase.initializeApp(config);
	}

	render() {
		return (
			<Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}> 
					<Router />
			</Provider> 
		)
	}
}

export default App;
