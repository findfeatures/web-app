import axios from "axios";
import { API } from "../actions/types";
import { apiStart, apiEnd } from "../actions/index";

const BASE_URL = process.env.REACT_APP_BASE_URL || "";

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
		throw Error('label must be defined in apiMiddleware');
	}

	if (accessToken) {
		headers = {
			...headers,
			Authorization: `Bearer ${accessToken}`,
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
			url: `${BASE_URL}${url}`,
			method,
			headers,
			[dataOrParams]: data,
		})
		.then(({ data }) => {
			dispatch(apiEnd({
				label
			}));

			if (onSuccess) {
				dispatch(onSuccess(data));
			}
		})
		.catch(error => {
			if (error.response && error.response.status) {
				dispatch(apiEnd({
					label,
					statusCode: error.response.status,
					error: error.response
				}));
			}

			if (onFailure) {
				dispatch(onFailure(label));
			}
		});
};

export default apiMiddleware;
