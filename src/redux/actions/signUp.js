import { check_user_api, sign_up_user_api } from "../../api";
import { apiAction } from "./index";
import { CHECK_IF_USER_EXISTS, SIGN_UP_USER } from "./types";

export const checkIfUserExists = email =>
	apiAction({
		url: check_user_api.url + `/${email}`,
		method: check_user_api.method,
		label: CHECK_IF_USER_EXISTS,
	});

export const signUpUser = (displayName, email, password) =>
	apiAction({
		url: sign_up_user_api.url,
		data: {
			display_name: displayName,
			email: email,
			password: password
		},
		method: sign_up_user_api.method,
		label: SIGN_UP_USER
	});
