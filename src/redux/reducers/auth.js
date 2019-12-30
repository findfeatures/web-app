import {
	API_END,
	API_START,
	AUTHENTICATE_USER,
	SET_JWT_TOKEN,
} from "../actions/types";

const initialState = {
	isAuthenticatingUser: false,
	data: {},
	statusCode: null,
	error: null,
};

const setJwtToken = (state, action) => {
	return {
		...state,
		data: action.payload,
	};
};

const apiStartAuthenticateUser = (state, action) => {
	return {
		...state,
		isAuthenticatingUser: true,
	};
};

const apiEndAuthenticateUser = (state, action) => {
	return {
		...state,
		isAuthenticatingUser: false,
		statusCode: action.statusCode,
		error: action.error,
	};
};

export default function auth(state = initialState, action) {
	const payload = action.payload;

	switch (action.type) {
		case SET_JWT_TOKEN:
			return setJwtToken(state, action);
		case API_START:
			if (payload === AUTHENTICATE_USER) {
				apiStartAuthenticateUser(state, action);
			}
			break;
		case API_END:
			if (payload === AUTHENTICATE_USER) {
				apiEndAuthenticateUser(state, action);
			}
			break;
		default:
			return state;
	}
	return state;
}
