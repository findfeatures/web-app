import React from "react";
import { connect } from "react-redux";
import { Tooltip } from "react-tippy";

import { ReactComponent as BellSVG } from "../../../assets/svgs/bell.svg";
import { getNotifications } from "../../../redux/actions/notifications";
import NotificationCentre from "../../NotificationCentre";
import MenuButton from "../MenuButton";

const NotificationMenuButton = ({
	isRequestingNotifications = false,
	notificationData = [],
	getNotifications = () => {},
}) => {
	return (
		<Tooltip
			html={
				<NotificationCentre
					loading={isRequestingNotifications}
					data={notificationData}
				/>
			}
			interactive={true}
			position="bottom"
			trigger="click"
			theme="light"
			animation="perspective"
			arrow="true"
			onShow={() => getNotifications()}
		>
			<MenuButton>
				<BellSVG />
			</MenuButton>
		</Tooltip>
	);
};

const mapStateToProps = reduxState => {
	return {
		isRequestingNotifications:
			reduxState.notifications.isRequestingNotifications,
		notificationData: reduxState.notifications.data,
	};
};

export default connect(
	mapStateToProps,
	{
		getNotifications,
	},
)(NotificationMenuButton);
