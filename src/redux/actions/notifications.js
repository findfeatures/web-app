import { get_notifications_api } from "../../api";
import { apiAction } from "./index";
import { GET_NOTIFICATIONS } from "./types";

export const getNotifications = () =>
	apiAction({
		url: get_notifications_api.url,
		method: get_notifications_api.method,
		label: GET_NOTIFICATIONS,
		requiresAccessToken: true,
		defaultData: [],
	});
