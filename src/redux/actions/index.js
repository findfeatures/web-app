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
	defaultData = null,
}) => {
	return {
		type: API,
		payload: {
			url,
			method,
			data,
			defaultData,
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

export const apiEnd = ({ label, statusCode = 200, error = null, data }) => {
	return {
		type: API_END,
		payload: label,
		statusCode,
		error,
		data,
	};
};
