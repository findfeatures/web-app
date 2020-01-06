export const BASE_URL =
	process.env.REACT_APP_BASE_URL || "http://localhost:8000";

export const auth_user_api = {
	url: `${BASE_URL}/v1/user/auth`,
	method: "POST",
};

export const check_user_api = {
	url: `${BASE_URL}/v1/user`,
	method: "HEAD",
};

export const sign_up_user_api = {
	url: `${BASE_URL}/v1/user`,
	method: "POST",
};

export const verify_email_user_api = {
	url: `${BASE_URL}/v1/user/token`,
	method: "POST",
};

export const resend_email_user_api = {
	url: `${BASE_URL}/v1/user/resend-email`,
	method: "POST",
};

export const get_notifications_api = {
	url: `${BASE_URL}/v1/user/notifications`,
	method: "GET",
};

export const get_projects_api = {
	url: `${BASE_URL}/v1/projects`,
	method: "GET",
};
