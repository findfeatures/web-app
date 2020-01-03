import jwt_decode from "jwt-decode";

import {
	API_END,
	API_START,
	AUTHENTICATE_USER,
	DECODE_JWT_TOKEN,
	SET_JWT_TOKEN,
} from "../actions/types";

const initialState = {
	isAuthenticatingUser: false,
	statusCode: null,
	error: null,
	jwtData: null,
};

const setJWTToken = (state, action) => {
	const token = action.payload.JWT;

	localStorage.setItem("JWT_TOKEN", token);

	return {
		...state,
	};
};

const decodeJWTToken = (state, action) => {
	const token = localStorage.getItem("JWT_TOKEN");

	return {
		...state,
		jwtData: jwt_decode(token),
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
			return setJWTToken(state, action);
		case DECODE_JWT_TOKEN:
			return decodeJWTToken(state, action);
		case API_START:
			if (payload === AUTHENTICATE_USER) {
				return apiStartAuthenticateUser(state, action);
			}
			break;
		case API_END:
			if (payload === AUTHENTICATE_USER) {
				return apiEndAuthenticateUser(state, action);
			}
			break;
		default:
			return state;
	}
	return state;
}
