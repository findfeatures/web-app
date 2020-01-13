import React from "react";

import {
	ContentDiv,
	ItemDiv,
	StyledTooltip,
	TooltipContent,
} from "./SideBarItem.Style.js";

const SideBarItem = ({
	createNew = false,
	selected = false,
	name = "Project",
	onClickHandler = () => {},
	projectID = null,
}) => {
	const projectTitle = createNew ? "Create New Project" : name;

	const onItemClickHandler = () => {
		onClickHandler(projectID);
	};

	return (
		<ItemDiv onClick={onItemClickHandler}>
			<StyledTooltip
				html={<TooltipContent>{projectTitle}</TooltipContent>}
				position="right"
				theme="light"
				animation="perspective"
				arrow="true"
			>
				<ContentDiv fontSize={createNew ? "40px" : "18px"} selected={selected}>
					{createNew ? <div>+</div> : <div>{projectTitle.substring(0, 2)}</div>}
				</ContentDiv>
			</StyledTooltip>
		</ItemDiv>
	);
};

export default SideBarItem;
