import { API, API_END, API_START } from "./types";

export const apiAction = ({
	path = "",
	host = process.env.REACT_APP_BASE_URL || "http://localhost:8000",
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
			url: host + path,
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
