export const BASE_URL =
	process.env.REACT_APP_BASE_URL || "http://localhost:8000";

export const auth_user_api = {
	url: `${BASE_URL}/user/auth`,
	method: "POST",
};

export const check_user_api = {
	url: `${BASE_URL}/user`,
	method: "HEAD",
};

export const sign_up_user_api = {
	url: `${BASE_URL}/user`,
	method: "POST",
};

export const verify_email_user_api = {
	url: `${BASE_URL}/user-token`,
	method: "POST",
};
