import { API_END, API_START, GET_NOTIFICATIONS } from "../actions/types";

const initialState = {
	isRequestingNotifications: false,
	data: [],
	statusCode: 200,
	error: null,
};
const apiStartGetNotifications = (state, action) => {
	return {
		...state,
		isRequestingNotifications: true,
	};
};

const apiEndGetNotifications = (state, action) => {
	return {
		...state,
		isRequestingNotifications: false,
		statusCode: action.statusCode,
		error: action.error,
		data: action.data.notifications || action.data,
	};
};

export default function notifications(state = initialState, action) {
	const payload = action.payload;

	switch (action.type) {
		case API_START:
			if (payload === GET_NOTIFICATIONS) {
				return apiStartGetNotifications(state, action);
			}
			break;
		case API_END:
			if (payload === GET_NOTIFICATIONS) {
				return apiEndGetNotifications(state, action);
			}
			break;
		default:
			return state;
	}
	return state;
}
