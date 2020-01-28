import { navigate } from "@reach/router";
import React from "react";

import MoreMenuButton from "../../buttons/MoreMenuButton";
import NotificationMenuButton from "../../buttons/NotificationMenuButton";
import {
	ContentDiv,
	LogoContainer,
	LogoDiv,
	ProjectNameDiv,
	RightButtonsDiv,
} from "./NavBar.Style.js";

const NavBar = ({ projectName, projectID }) => {
	const returnHome = () => {
		navigate("/dashboard");
	};

	const gotoProject = () => {
		if (projectID !== 0) {
			navigate(`/dashboard/${projectID}/home`);
		}
	};

	const maxLength = 48;
	const shortendProjectName =
		projectName.length < maxLength
			? projectName
			: projectName.slice(0, maxLength - 3) + "...";

	return (
		<ContentDiv>
			<LogoContainer>
				<LogoDiv onClick={returnHome}>Find Features</LogoDiv>
			</LogoContainer>
			<ProjectNameDiv onClick={gotoProject}>
				{shortendProjectName}
			</ProjectNameDiv>
			<RightButtonsDiv>
				<NotificationMenuButton />
				<MoreMenuButton />
			</RightButtonsDiv>
		</ContentDiv>
	);
};

export default NavBar;
