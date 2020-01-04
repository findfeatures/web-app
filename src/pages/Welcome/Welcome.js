import { navigate } from "@reach/router";
import React from "react";

import BlockButton from "../../components/buttons/BlockButton";
import {
	StyledButtonDiv,
	StyledButtonsDiv,
	StyledFadeIn,
	StyledFullPage,
	StyledHeader,
	StyledSubHeader,
} from "./Welcome.Style.js";

class Welcome extends React.PureComponent {
	handleCreateButtonClicked = () => {
		navigate("/dashboard/project/create");
	};

	handleJoinButtonClicked = () => {
		navigate("/dashboard/project/join");
	};

	render() {
		return (
			<StyledFullPage>
				<StyledFadeIn>
					<StyledHeader>Welcome to Find Features</StyledHeader>
					<StyledFadeIn delay={100}>
						<StyledSubHeader>
							Create a new project or join an existing one now!
						</StyledSubHeader>
					</StyledFadeIn>
					<StyledFadeIn delay={200}>
						<StyledButtonsDiv>
							<StyledButtonDiv>
								<BlockButton onClickHandler={this.handleCreateButtonClicked}>
									CREATE
								</BlockButton>
							</StyledButtonDiv>
							<StyledButtonDiv>
								<BlockButton onClickHandler={this.handleJoinButtonClicked}>
									JOIN
								</BlockButton>
							</StyledButtonDiv>
						</StyledButtonsDiv>
					</StyledFadeIn>
				</StyledFadeIn>
			</StyledFullPage>
		);
	}
}

export default Welcome;
