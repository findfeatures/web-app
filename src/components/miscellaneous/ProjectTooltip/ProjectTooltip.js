import { navigate } from "@reach/router";
import React from "react";

import MoreMenuItemButton from "../../buttons/MoreMenuItemButton";
import { Content, StyledHr, Title } from "./ProjectTooltip.Style.js";

const ProjectTooltip = ({
	title,
	onClickHandler,
	isProject = true,
	projectID,
}) => {
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
						onClickHandler={() => {
							navigate(`/dashboard/${projectID}/feature-flags`);
						}}
						text={"Feature Flags"}
					/>
					<MoreMenuItemButton
						onClickHandler={() => {
							navigate(`/dashboard/${projectID}/audit-trail`);
						}}
						text={"Audit Trail"}
					/>
					<MoreMenuItemButton onClickHandler={() => {}} text={"Analytics"} />
					<MoreMenuItemButton
						onClickHandler={() => {}}
						text={"User Management"}
					/>
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
