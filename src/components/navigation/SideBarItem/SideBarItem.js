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
	title = "Project",
	onClickHandler = () => {},
}) => {
	const projectTitle = createNew ? "Create New Project" : title;

	return (
		<ItemDiv onClick={onClickHandler}>
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
