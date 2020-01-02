import {
	API_END,
	API_START,
	CHECK_IF_USER_EXISTS,
	RESEND_EMAIL,
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

	isResendingEmail: false,
	resendEmail: {
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

const apiStartResendEmail = (state, action) => {
	return {
		...state,
		isResendingEmail: true,
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

const apiEndResendEmail = (state, action) => {
	return {
		...state,
		isResendingEmail: false,
		resendEmail: {
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
				return apiStartCheckIfUserExists(state, action);
			}
			if (payload === SIGN_UP_USER) {
				return apiStartSignUpUser(state, action);
			}
			if (payload === VERIFY_EMAIL) {
				return apiStartVerifyEmail(state, action);
			}
			if (payload === RESEND_EMAIL) {
				return apiStartResendEmail(state, action);
			}
			break;
		case API_END:
			if (payload === CHECK_IF_USER_EXISTS) {
				return apiEndCheckIfUserExists(state, action);
			}
			if (payload === SIGN_UP_USER) {
				return apiEndSignUpUser(state, action);
			}
			if (payload === VERIFY_EMAIL) {
				return apiEndVerifyEmail(state, action);
			}
			if (payload === RESEND_EMAIL) {
				return apiEndResendEmail(state, action);
			}
			break;
		default:
			return state;
	}
	return state;
}
