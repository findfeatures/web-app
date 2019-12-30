import {
	API_END,
	API_START,
	CHECK_IF_USER_EXISTS,
	SIGN_UP_USER,
	VERIFY_EMAIL,
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

	isVerifyingEmail: false,
	verifyEmail: {
		statusCode: null,
		error: null,
	},
};

const apiStartCheckIfUserExists = (state, action) => {
	return {
		...state,
		isCheckingIfUserExists: true,
	};
};

const apiStartSignUpUser = (state, action) => {
	return {
		...state,
		isSigningUpUser: true,
	};
};

const apiStartVerifyEmail = (state, action) => {
	return {
		...state,
		isVerifyingEmail: true,
	};
};

const apiEndCheckIfUserExists = (state, action) => {
	return {
		...state,
		isCheckingIfUserExists: false,
		checkIfUserExists: {
			statusCode: action.statusCode,
			error: action.error,
		},
	};
};

const apiEndSignUpUser = (state, action) => {
	return {
		...state,
		isSigningUpUser: false,
		signUp: {
			statusCode: action.statusCode,
			error: action.error,
		},
	};
};

const apiEndVerifyEmail = (state, action) => {
	return {
		...state,
		isVerifyingEmail: false,
		verifyEmail: {
			statusCode: action.statusCode,
			error: action.error,
		},
	};
};

export default function signUp(state = initialState, action) {
	const payload = action.payload;

	switch (action.type) {
		case API_START:
			if (payload === CHECK_IF_USER_EXISTS) {
				apiStartCheckIfUserExists(state, action);
			}
			if (payload === SIGN_UP_USER) {
				apiStartSignUpUser(state, action);
			}
			if (payload === VERIFY_EMAIL) {
				apiStartVerifyEmail(state, action);
			}
			break;
		case API_END:
			if (payload === CHECK_IF_USER_EXISTS) {
				apiEndCheckIfUserExists(state, action);
			}
			if (payload === SIGN_UP_USER) {
				apiEndSignUpUser(state, action);
			}
			if (payload === VERIFY_EMAIL) {
				apiEndVerifyEmail(state, action);
			}
			break;
		default:
			return state;
	}
	return state;
}
