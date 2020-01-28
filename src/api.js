/*
--------- User API ---------
 */
export const auth_user_api = {
	path: `/v1/user/auth`,
	method: "POST",
};

export const check_user_api = {
	path: "/v1/user",
	method: "HEAD",
};

export const sign_up_user_api = {
	path: "/v1/user",
	method: "POST",
};

export const verify_email_user_api = {
	path: "/v1/user/token",
	method: "POST",
};

export const resend_email_user_api = {
	path: "/v1/user/resend-email",
	method: "POST",
};

export const get_notifications_api = {
	path: "/v1/user/notifications",
	method: "GET",
};

/*
--------- Project API ---------
 */

export const get_projects_api = {
	path: "/v1/projects",
	method: "GET",
};

export const get_project_completed_setup_api = {
	path: "/v1/projects/complete",
	method: "POST",
};

/*
--------- Stripe API ---------
 */

export const get_stripe_checkout_session = {
	path: "/v1/stripe/checkout-session",
	method: "POST",
};
