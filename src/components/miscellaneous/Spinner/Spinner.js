import React from "react";

import { StyledDiv } from "./Spinner.Style.js";

const Spinner = ({ color = "#fff" }) => {
	/* icon from here: https://loading.io/css/ */
	return (
		<StyledDiv color={color}>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</StyledDiv>
	);
};

export default Spinner;
