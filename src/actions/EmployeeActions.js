import firebase from "firebase";
import { Actions } from "react-native-router-flux"
import {
	EMPLOYEE_UPDATE,
	EMPLOYEE_CREATE,
	EMPLOYEES_FETCH_SUCCESS,
	EMPLOYEE_SAVE_SUCCESS,
	EMPLOYEE_DELETE
} from './types';

export const employeeUpdate = ({ prop, value }) => {
	return {
		type: EMPLOYEE_UPDATE,
		payload: { prop, value }
	}
};

export const employeeCreate = ({ name, phone, shift }) => {
	const { currentUser } = firebase.auth();

//pushes to server with new employee, then navigates back to employeeList, without back button since it 'resets' stack
//also dispatches EMPLOYEE_CREATE to clear employee create form
	return (dispatch) => {
	firebase.database().ref(`/users/${currentUser.uid}/employees`)
		.push({ name, phone, shift })
		.then(() => {
			dispatch({ type: EMPLOYEE_CREATE });
			Actions.employeeList( { type: 'reset' })
		});	
	};
};

export const employeesFetch = () => {
	//current user is the user authorized inside firebase currently
	const { currentUser} = firebase.auth() 

	return (dispatch) => {
		firebase.database().ref(`/users/${currentUser.uid}/employees`)
			.on('value', snapshot => {
				dispatch({ type: EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val() });
			});
	};
};

export const employeeSave = ({ name, phone, shift, uid }) => {
	const { currentUser } = firebase.auth();

//the dispatch and EMPLOYEE_SAVE_SUCCESS clears the form when you click "Add" again
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
      .set({ name, phone, shift })
      .then(() => {
        dispatch({ type: EMPLOYEE_SAVE_SUCCESS });
        Actions.employeeList({ type: 'reset' });
      });
  };
};

export const employeeDelete = ( { uid } ) => {
	const { currentUser } = firebase.auth();

	return() => {
		firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
			.remove()
			.then(() => {
        Actions.employeeList({ type: 'reset' });
			});
	};
};






