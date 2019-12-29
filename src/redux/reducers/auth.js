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

export default function auth(state = initialState, action) {
	const payload = action.payload;

	switch (action.type) {
		case SET_JWT_TOKEN:
			return {
				...state,
				data: action.payload,
			};
		case API_START:
			if (payload === AUTHENTICATE_USER) {
				return {
					...state,
					isAuthenticatingUser: true,
				};
			}
			break;
		case API_END:
			if (payload === AUTHENTICATE_USER) {
				return {
					...state,
					isAuthenticatingUser: false,
					statusCode: action.statusCode,
					error: action.error,
				};
			}
			break;
		default:
			return state;
	}
	return state;
}
