import { API, API_END, API_START } from "./types";

export const apiAction = ({
	url = "",
	method = "GET",
	data = null,
	accessToken = null,
	onSuccess = null,
	onFailure = null,
	label = "",
	headersOverride = null,
}) => {
	return {
		type: API,
		payload: {
			url,
			method,
			data,
			accessToken,
			onSuccess,
			onFailure,
			label,
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
