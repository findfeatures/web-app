import React from "react";

import BusinessBillingCard from "../../cards/billingCards/BusinessBillingCard";
import EnterpriseBillingCard from "../../cards/billingCards/EnterpriseBillingCard";
import StartupBillingCard from "../../cards/billingCards/StartupBillingCard";
import { BillingCardWrappers } from "./BillingInfo.Style.js";

const BillingInfo = ({ onClickHandler }) => {
	return (
		<BillingCardWrappers>
			<StartupBillingCard onClickHandler={id => onClickHandler(id)} />
			<BusinessBillingCard onClickHandler={id => onClickHandler(id)} />
			<EnterpriseBillingCard onClickHandler={id => onClickHandler(id)} />
		</BillingCardWrappers>
	);
};

export default BillingInfo;
