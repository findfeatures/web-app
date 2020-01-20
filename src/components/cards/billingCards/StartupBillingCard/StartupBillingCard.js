import React from "react";

import BaseBillingCard from "../BaseBillingCard/BaseBillingCard";

const StartupBillingCard = ({
	onClickHandler,
	showBorder = false,
	purchaseText = "Select Plan",
	footerText = "You won't be charged yet!",
	showSpinner = false,
}) => {
	return (
		<BaseBillingCard
			id={"plan_Ga0Xrskb4VQpwq"}
			title={"Startup"}
			price={"$19.99 per month"}
			showBorder={showBorder}
			footerText={footerText}
			purchaseText={purchaseText}
			features={[
				"Up to 3 Feature Flags",
				"1 User",
				["1 Environment", "Prod Only"],
				[
					"100,000 Requests p/Day",
					"If we see you're reaching your limit we'll get in touch.",
				],
				["Limited Support", "Basic Email Support (within 72 hours)"],
			]}
			onClickHandler={id => onClickHandler(id)}
			showSpinner={showSpinner}
		/>
	);
};

export default StartupBillingCard;
