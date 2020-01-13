import React from "react";

import BlockButton from "../../components/buttons/BlockButton";
import LargeCard from "../../components/cards/LargeCard";
import { handleHomeButtonClicked } from "../utils.js";
import {
	ButtonWrapper,
	FourOFourPageDiv,
	StyledH1,
} from "./FourOFour.Style.js";

const FourOFour = () => {
	const lostMessages = [
		"You seem lost, here's a way home!",
		"Not found :(",
		"Don't worry, we all get lost sometimes.",
		"Oops... looks like you got lost.",
		"You weren't supposed to see this!",
		"Nothing to see here!",
		"There's been a glitch!",
		"Someones getting fired for this.",
		"What is the matrix?",
	];

	const message = lostMessages[Math.floor(Math.random() * lostMessages.length)];

	return (
		<FourOFourPageDiv>
			<LargeCard>
				<StyledH1>404</StyledH1>
				<h2>{message}</h2>
				<ButtonWrapper>
					<BlockButton onClickHandler={handleHomeButtonClicked}>
						TAKE ME HOME
					</BlockButton>
				</ButtonWrapper>
			</LargeCard>
		</FourOFourPageDiv>
	);
};

export default FourOFour;
