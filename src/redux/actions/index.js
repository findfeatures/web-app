import { API, API_END, API_START } from "./types";

export const apiAction = ({
	url = "",
	method = "GET",
	data = null,
	requiresAccessToken = false,
	onSuccess = null,
	onFailure = null,
	label = "",
	timeout = 30000,
	headersOverride = null,
}) => {
	return {
		type: API,
		payload: {
			url,
			method,
			data,
			requiresAccessToken,
			onSuccess,
			onFailure,
			label,
			timeout,
			headersOverride,
		},
	};
};

export const apiStart = label => ({
	type: API_START,
	payload: label,
});

export const apiEnd = ({ label, statusCode = 200, error = null }) => {
	return {
		type: API_END,
		payload: label,
		statusCode,
		error,
	};
};
