import { get_notifications_api } from "../../api";
import { apiAction } from "./index";
import { GET_NOTIFICATIONS } from "./types";

export const getNotifications = () =>
	apiAction({
		path: get_notifications_api.path,
		method: get_notifications_api.method,
		label: GET_NOTIFICATIONS,
		requiresAccessToken: true,
		defaultData: [],
	});
