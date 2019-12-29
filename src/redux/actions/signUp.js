import { check_user_api } from "../../api";
import { apiAction } from "./index";
import { CHECK_IF_USER_EXISTS, USER_EXISTS } from "./types";

export const checkIfUserExists = email =>
	apiAction({
		url: check_user_api.url,
		method: check_user_api.method,
		data: {
			email: email,
		},
		onSuccess: userExists(),
		label: CHECK_IF_USER_EXISTS,
	});

function userExists(data) {
	return {
		type: USER_EXISTS,
		payload: data,
	};
}
