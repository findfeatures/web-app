import {
	check_user_api,
	resend_email_user_api,
	sign_up_user_api,
	verify_email_user_api,
} from "../../api";
import { apiAction } from "./index";
import {
	CHECK_IF_USER_EXISTS,
	RESEND_EMAIL,
	SIGN_UP_USER,
	VERIFY_EMAIL,
} from "./types";

export const checkIfUserExists = email =>
	apiAction({
		path: check_user_api.path + `/${email}`,
		method: check_user_api.method,
		label: CHECK_IF_USER_EXISTS,
	});

export const signUpUser = (displayName, email, password) =>
	apiAction({
		path: sign_up_user_api.path,
		data: {
			display_name: displayName,
			email: email,
			password: password,
		},
		method: sign_up_user_api.method,
		label: SIGN_UP_USER,
	});

export const verifyEmail = (email, token) =>
	apiAction({
		path: verify_email_user_api.path,
		data: {
			email: email,
			token: token,
		},
		method: verify_email_user_api.method,
		label: VERIFY_EMAIL,
	});

export const resendTokenEmail = (email, password) =>
	apiAction({
		path: resend_email_user_api.path,
		data: {
			email: email,
			password: password,
		},
		method: resend_email_user_api.method,
		label: RESEND_EMAIL,
	});
