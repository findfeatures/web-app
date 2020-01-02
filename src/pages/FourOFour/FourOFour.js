import { navigate } from "@reach/router";
import React from "react";

import BlockButton from "../../components/buttons/BlockButton";
import LargeCard from "../../components/cards/LargeCard";
import {
	ButtonWrapper,
	FourOFourPageDiv,
	StyledH1,
} from "./FourOFour.Style.js";

class FourOFour extends React.Component {
	lostMessages = [
		"You seem lost, here's a way home!",
		"Not found :(",
		"Don't worry, we all get lost sometimes.",
		"Oops... looks like you got lost.",
		"You weren't supposed to see this!",
		"Nothing to see here!",
		"There's been a glitch!",
		"Someones getting fired for this.",
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
					<StyledH1>404</StyledH1>
					<h2>{message}</h2>
					<ButtonWrapper>
						<BlockButton handleButtonClick={this.handleButtonClick}>
							TAKE ME HOME
						</BlockButton>
					</ButtonWrapper>
				</LargeCard>
			</FourOFourPageDiv>
		);
	}
}

export default FourOFour;
