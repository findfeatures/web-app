import { navigate } from "@reach/router";
import React from "react";

import BlockButton from "../../components/BlockButton";
import LargeCard from "../../components/LargeCard";
import {
	LeftButtonWrapper,
	RightButtonWrapper,
	SignUpPageDiv,
	TitleWrapper,
} from "./SignUp.Style.js";

class SignUp extends React.Component {
	state = {};

	handleBackClicked = () => {
		navigate("/login");
	};

	handleNextClicked = () => {}

	render() {
		return (
			<SignUpPageDiv>
				<LargeCard>
					<TitleWrapper>Sign Up</TitleWrapper>
					Currently we're not accepting sign ups, please try again later!
					<LeftButtonWrapper>
						<BlockButton handleButtonClick={this.handleBackClicked}>
							BACK
						</BlockButton>
					</LeftButtonWrapper>
					<RightButtonWrapper>
						<BlockButton handleButtonClick={this.handleNextClicked}>
							NEXT
						</BlockButton>
					</RightButtonWrapper>
				</LargeCard>
			</SignUpPageDiv>
		);
	}
}

SignUp.defaultProps = {};

SignUp.propTypes = {};

export default SignUp;
