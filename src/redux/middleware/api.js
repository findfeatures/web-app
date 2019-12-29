import axios from "axios";

import { apiEnd, apiStart } from "../actions/index";
import { API } from "../actions/types";

const defaultHeaders = {};
let headers = { ...defaultHeaders };

const apiMiddleware = ({ dispatch }) => next => action => {
	next(action);

	if (action.type !== API) return;

	const {
		url,
		method,
		data,
		accessToken,
		onSuccess,
		onFailure,
		label,
		headersOverride,
	} = action.payload;

	const dataOrParams = ["GET", "DELETE"].includes(method) ? "params" : "data";

	if (!label) {
		throw Error("label must be defined in apiMiddleware");
	}

	if (accessToken) {
		headers = {
			...headers,
			Authorization: `${accessToken}`,
		};
	}

	if (headersOverride) {
		headers = {
			...headers,
			...headersOverride,
		};
	}

	dispatch(apiStart(label));

	axios
		.request({
			url: `${url}`,
			method,
			headers,
			[dataOrParams]: data,
		})
		.then(({ data }) => {
			dispatch(
				apiEnd({
					label,
				}),
			);

			if (onSuccess) {
				dispatch(onSuccess(data));
			}
		})
		.catch(error => {
			if (error.response && error.response.status) {
				dispatch(
					apiEnd({
						label,
						statusCode: error.response.status,
						error: error.response,
					}),
				);
			} else {
				// default to status code 503 if dont get response back
				// (can happen if cant connect to server)
				dispatch(
					apiEnd({
						label,
						statusCode: 503,
						error: {
							message: "Can't connect to server!",
						},
					}),
				);
			}

			if (onFailure) {
				dispatch(onFailure(label));
			}
		});
};

export default apiMiddleware;
