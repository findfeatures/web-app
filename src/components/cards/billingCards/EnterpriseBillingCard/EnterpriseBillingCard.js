import React from "react";

import BaseBillingCard from "../BaseBillingCard/BaseBillingCard";

const EnterpriseBillingCard = ({
	onClickHandler = () => {},
	showBorder = false,
	footerText = "You won't be charged yet!",
	purchaseText = "Select Plan",
	showSpinner = false,
}) => {
	return (
		<BaseBillingCard
			id={"plan_Ga0YNRfEEaNcGI"}
			title={"Enterprise"}
			price={"$399.99 per month"}
			showBorder={showBorder}
			footerText={footerText}
			purchaseText={purchaseText}
			features={[
				"Unlimited Feature Flags",
				"Unlimited Users",
				["2 Environments", "Prod and Non-Prod"],
				"Unlimited Requests p/Day",
				"Support Within 24 Hours",
				["Permission Roles", "Read Only and Admin"],
			]}
			onClickHandler={id => onClickHandler(id)}
			showSpinner={showSpinner}
		/>
	);
};

export default EnterpriseBillingCard;
