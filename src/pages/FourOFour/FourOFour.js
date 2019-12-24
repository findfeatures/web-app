import { navigate } from "@reach/router";
import React from "react";

import BlockButton from "../../components/BlockButton";
import LargeCard from "../../components/LargeCard";
import { FourOFourPageDiv } from "./FourOFour.Style.js";

class FourOFour extends React.Component {
	lostMessages = [
		"You seem lost, here's a way home!",
		"Not found :(",
		"Don't worry, we all get lost sometimes.",
		"Oops... looks like you got lost.",
		"You weren't supposed to see this!",
		"Nothing to see here!",
	];

	handleButtonClick = () => {
		navigate("/login");
	};

	render() {
		const message = this.lostMessages[
			Math.floor(Math.random() * this.lostMessages.length)
		];

		return (
			<FourOFourPageDiv>
				<LargeCard>
					<h1 style={{ fontSize: "200px", margin: 0 }}>404</h1>
					<h2>{message}</h2>
					<div style={{ width: 250, height: 75, marginTop: 20 }}>
						<BlockButton handleButtonClick={this.handleButtonClick}>
							TAKE ME HOME
						</BlockButton>
					</div>
				</LargeCard>
			</FourOFourPageDiv>
		);
	}
}

export default FourOFour;
