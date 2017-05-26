import {
	EMPLOYEE_UPDATE,
	EMPLOYEE_CREATE,
	EMPLOYEE_SAVE_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
	name: '',
	phone: '',
	shift: ''
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case EMPLOYEE_UPDATE:
		// action.payload === { prop: 'name', value: 'jane' }
		//the brackets below are now an array, it's a KEY INTERPOLATION, the key will be determined at runtime, syntax from ES6
			return { ...state, [action.payload.prop]: action.payload.value };
		case EMPLOYEE_CREATE:
			return INITIAL_STATE;
		case EMPLOYEE_SAVE_SUCCESS:
			return INITIAL_STATE;
		default:
			return state;
	}
}