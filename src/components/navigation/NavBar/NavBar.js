import { navigate } from "@reach/router";
import React from "react";

import MoreMenuButton from "../../buttons/MoreMenuButton";
import NotificationMenuButton from "../../buttons/NotificationMenuButton";
import {
	ContentDiv,
	LogoContainer,
	LogoDiv,
	RightButtonsDiv,
} from "./NavBar.Style.js";

const NavBar = () => {
	const returnHome = () => {
		navigate("/dashboard");
	};

	return (
		<ContentDiv>
			<LogoContainer>
				<LogoDiv onClick={returnHome}>Find Features</LogoDiv>
			</LogoContainer>
			<RightButtonsDiv>
				<NotificationMenuButton />
				<MoreMenuButton />
			</RightButtonsDiv>
		</ContentDiv>
	);
};

export default NavBar;
