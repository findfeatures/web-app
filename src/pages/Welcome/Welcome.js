import React from "react";

import FullPageCard from "../../components/cards/FullPageCard";
import { StyledFullPage } from "./Welcome.Style.js";

class Welcome extends React.PureComponent {
	render() {
		return (
			<StyledFullPage>
				<FullPageCard>
					<h1>Welcome to Find Features</h1>
				</FullPageCard>
			</StyledFullPage>
		);
	}
}

export default Welcome;
