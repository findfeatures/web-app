import React from "react";

import FullPageCard from "../../components/cards/FullPageCard";
import { StyledFullPage } from "./Welcome.Style.js";

class Welcome extends React.PureComponent {
	render() {
		return (
			<StyledFullPage>
				<FullPageCard></FullPageCard>

				{/*<FullPageCard>*/}
				{/*	<h1>Hello World!</h1>*/}
				{/*</FullPageCard>*/}
			</StyledFullPage>
		);
	}
}

export default Welcome;
