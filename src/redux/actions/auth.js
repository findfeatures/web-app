import { auth_user_api } from "../../api";
import { apiAction } from "./index";
import { AUTHENTICATE_USER, SET_JWT_TOKEN } from "./types";

export const authenticateUser = (email, password) =>
	apiAction({
		url: auth_user_api.url,
		method: auth_user_api.method,
		data: {
			email: email,
			password: password,
		},
		onSuccess: setJWTToken,
		label: AUTHENTICATE_USER,
	});

const setJWTToken = data => {
	return {
		type: SET_JWT_TOKEN,
		payload: data,
	};
};
