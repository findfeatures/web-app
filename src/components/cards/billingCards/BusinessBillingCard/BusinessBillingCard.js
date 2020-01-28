import React from "react";

import BaseBillingCard from "../BaseBillingCard/BaseBillingCard";

const BusinessBillingCard = ({
	onClickHandler = () => {},
	showBorder = true,
	footerText = "You won't be charged yet!",
	purchaseText = "Select Plan",
	showSpinner = false,
}) => {
	return (
		<BaseBillingCard
			id={"plan_Ga0YFeoBspguoC"}
			title={"Business 💼"}
			price={"$199.99 per month"}
			showBorder={showBorder}
			footerText={footerText}
			purchaseText={purchaseText}
			features={[
				"Up to 50 Feature Flags",
				["Up to 20 Users", "If you need more, these can be added later on!"],
				["2 Environments", "Prod and Non-Prod"],
				[
					"10 Million Requests p/Day",
					"If we see you're reaching your limit we'll get in touch.",
				],
				"Support within 48 hours",
				["Permission Roles", "Read Only and Admin"],
				"Audit Log",
			]}
			onClickHandler={id => onClickHandler(id)}
			showSpinner={showSpinner}
		/>
	);
};

export default BusinessBillingCard;
