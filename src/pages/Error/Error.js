import { navigate } from "@reach/router";
import React from "react";

import BlockButton from "../../components/buttons/BlockButton";
import LargeCard from "../../components/cards/LargeCard";
import { ButtonWrapper, ErrorPageDiv, StyledH1 } from "./Error.Style.js";

class Error extends React.Component {
	onClickHandler = () => {
		navigate("/login");
	};

	render() {
		return (
			<ErrorPageDiv>
				<LargeCard>
					<StyledH1>ERROR</StyledH1>
					<h2>This was a terrible mistake on our behalf :(</h2>
					<ButtonWrapper>
						<BlockButton onClickHandler={this.onClickHandler}>
							TAKE ME HOME
						</BlockButton>
					</ButtonWrapper>
				</LargeCard>
			</ErrorPageDiv>
		);
	}
}

export default Error;
