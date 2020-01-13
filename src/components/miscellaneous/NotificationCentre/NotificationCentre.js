import React from "react";

import Spinner from "../Spinner";
import {
	Content,
	NoNotificationWrapper,
	StyledHr,
	Title,
} from "./NotificationCentre.Style.js";

const NotificationCentre = ({ loading = false, data = [] }) => {
	const hasNotifications = data.length !== 0;

	const noNotificationComponent = (
		<NoNotificationWrapper>
			<div style={{ width: "80%", textAlign: "center" }}>
				You currently do not have any notifications, please check back later!
			</div>
		</NoNotificationWrapper>
	);

	return (
		<Content>
			<Title>Notification Centre</Title>
			<StyledHr />
			{loading ? (
				<Spinner color={"black"} />
			) : hasNotifications ? (
				"NOTIFICATIONS"
			) : (
				noNotificationComponent
			)}
		</Content>
	);
};

export default NotificationCentre;
