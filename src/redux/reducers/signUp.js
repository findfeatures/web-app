import {
	API_END,
	API_START,
	CHECK_IF_USER_EXISTS,
	SIGN_UP_USER,
} from "../actions/types";

const initialState = {
	isCheckingIfUserExists: false,
	checkIfUserExists: {
		statusCode: null,
		error: null,
	},

	isSigningUpUser: false,
	signUp: {
		statusCode: null,
		error: null,
	},
};

export default function signUp(state = initialState, action) {
	const payload = action.payload;

	switch (action.type) {
		case API_START:
			if (payload === CHECK_IF_USER_EXISTS) {
				return {
					...state,
					isCheckingIfUserExists: true,
				};
			}
			if (payload === SIGN_UP_USER) {
				return {
					...state,
					isSigningUpUser: true,
				};
			}
			break;
		case API_END:
			if (payload === CHECK_IF_USER_EXISTS) {
				return {
					...state,
					isCheckingIfUserExists: false,
					checkIfUserExists: {
						statusCode: action.statusCode,
						error: action.error,
					},
				};
			}
			if (payload === SIGN_UP_USER) {
				return {
					...state,
					isSigningUpUser: false,
					signUp: {
						statusCode: action.statusCode,
						error: action.error,
					},
				};
			}
			break;
		default:
			return state;
	}
	return state;
}
