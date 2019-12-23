import { apiAction } from "./index";
import { AUTHENTICATE_USER, SET_JWT_TOKEN } from "./types";

export const authenticateUser = (email, password) =>
	apiAction({
		url: "http://localhost:8000/user/auth",
		method: "POST",
		data: {
			email: email,
			password: password,
		},
		onSuccess: setJWTToken,
		label: AUTHENTICATE_USER,
	});

function setJWTToken(data) {
	return {
		type: SET_JWT_TOKEN,
		payload: data,
	};
}
