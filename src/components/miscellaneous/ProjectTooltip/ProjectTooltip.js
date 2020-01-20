import React from "react";

import MoreMenuItemButton from "../../buttons/MoreMenuItemButton";
import { Content, StyledHr, Title } from "./ProjectTooltip.Style.js";

const ProjectTooltip = ({ title, onClickHandler, isProject = true }) => {
	return (
		<Content>
			<Title onClick={onClickHandler}>{title}</Title>
			<StyledHr />
			{isProject ? (
				<>
					<MoreMenuItemButton
						onClickHandler={() => {
							onClickHandler();
						}}
						text={"Home"}
					/>
					<MoreMenuItemButton
						onClickHandler={() => {}}
						text={"Getting Started"}
					/>
					<MoreMenuItemButton onClickHandler={() => {}} text={"Analytics"} />
					<MoreMenuItemButton onClickHandler={() => {}} text={"Invite Users"} />
					<MoreMenuItemButton onClickHandler={() => {}} text={"Settings"} />
					<StyledHr />
					<MoreMenuItemButton
						onClickHandler={() => {}}
						text={"Leave Project"}
					/>
				</>
			) : (
				<>
					<MoreMenuItemButton
						onClickHandler={() => {
							onClickHandler();
						}}
						text={"Create New Project"}
					/>
				</>
			)}
		</Content>
	);
};

export default ProjectTooltip;
