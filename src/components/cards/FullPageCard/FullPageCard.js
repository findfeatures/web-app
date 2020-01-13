import React from "react";

import { Card, CardWrapper } from "./FullPageCard.Style.js";

const FullPageCard = ({ children, padding = "15px" }) => {
	return (
		<CardWrapper padding={padding}>
			<Card>{children}</Card>
		</CardWrapper>
	);
};

export default FullPageCard;
