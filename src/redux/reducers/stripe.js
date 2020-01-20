import {
	API_END,
	API_START,
	GET_STRIPE_CHECKOUT_SESSION,
} from "../actions/types";

const initialState = {
	isRequestingStripeCheckoutSession: false,
	data: "",
	statusCode: 200,
	error: null,
};

const apiStartGetStripeCheckoutSession = (state, action) => {
	return {
		...state,
		isRequestingStripeCheckoutSession: true,
	};
};

const apiEndGetStripeCheckoutSession = (state, action) => {
	return {
		...state,
		isRequestingStripeCheckoutSession: false,
		statusCode: action.statusCode,
		error: action.error,
		data: action.data.session_id || action.data,
	};
};

export default function stripe(state = initialState, action) {
	const payload = action.payload;

	switch (action.type) {
		case API_START:
			if (payload === GET_STRIPE_CHECKOUT_SESSION) {
				return apiStartGetStripeCheckoutSession(state, action);
			}
			break;
		case API_END:
			if (payload === GET_STRIPE_CHECKOUT_SESSION) {
				return apiEndGetStripeCheckoutSession(state, action);
			}
			break;
		default:
			return state;
	}
	return state;
}
