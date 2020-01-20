import { get_stripe_checkout_session } from "../../api";
import { apiAction } from "./index";
import { GET_STRIPE_CHECKOUT_SESSION } from "./types";

export const getStripeCheckoutSession = ({
	plan,
	successUrl,
	cancelUrl,
	projectData,
}) =>
	apiAction({
		path: get_stripe_checkout_session.path,
		method: get_stripe_checkout_session.method,
		label: GET_STRIPE_CHECKOUT_SESSION,
		requiresAccessToken: true,
		defaultData: "",
		data: {
			plan: plan,
			success_url: successUrl,
			cancel_url: cancelUrl,
			project_data: projectData,
		},
	});
