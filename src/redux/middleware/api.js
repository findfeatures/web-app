import axios from "axios";

import { apiEnd, apiStart } from "../actions/index";
import { API } from "../actions/types";

const defaultHeaders = {};
let headers = { ...defaultHeaders };

const apiMiddleware = ({ dispatch }) => next => action => {
	next(action);

	if (action.type !== API) return;

	sendRequest({ dispatch, action });
};

const sendRequest = ({ dispatch, action, retries = 0 }) => {
	const {
		url,
		method,
		data,
		requiresAccessToken,
		onSuccess,
		onFailure,
		label,
		headersOverride,
		timeout,
	} = action.payload;

	const dataOrParams = ["GET", "DELETE"].includes(method) ? "params" : "data";

	if (!label) {
		throw Error("label must be defined in apiMiddleware");
	}

	if (requiresAccessToken) {
		headers = {
			...headers,
			Authorization: `${localStorage.getItem("JWT_TOKEN")}`,
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
			timeout,
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
				if (error.response.status === 429) {
					console.log("attempting to re-request as rate limit reached");
					// rate limit, retry the request again in 1 second
					setTimeout(function() {
						console.log("requesting as rate limit reached", retries + 1);
						sendRequest({ dispatch, action, retries: retries + 1 });
					}, 1000 * retries * 2);
					return;
				}

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
