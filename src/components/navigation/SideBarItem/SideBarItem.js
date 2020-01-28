import React from "react";

import ProjectTooltip from "../../miscellaneous/ProjectTooltip";
import { ContentDiv, ItemDiv, StyledTooltip } from "./SideBarItem.Style.js";

const SideBarItem = ({
	createNew = false,
	selected = false,
	name = "Project",
	onClickHandler = () => {},
	projectID = null,
}) => {
	const projectTitle = createNew ? "Projects" : name;

	const onItemClickHandler = () => {
		onClickHandler(projectID);
	};

	return (
		<ItemDiv onClick={onItemClickHandler}>
			<StyledTooltip
				// html={<TooltipContent>{projectTitle}</TooltipContent>}
				html={
					<ProjectTooltip
						title={projectTitle}
						onClickHandler={onItemClickHandler}
						isProject={!createNew}
						projectID={projectID}
					/>
				}
				interactive={true}
				position="right"
				theme="light"
				animation="perspective"
				arrow="true"
				// popperOptions={{
				//   modifiers: {
				//     preventOverflow: {
				//       boundariesElement: 'window'
				//     }
				//   }
				// }}
			>
				<ContentDiv fontSize={createNew ? "40px" : "18px"} selected={selected}>
					{createNew ? <div>+</div> : <div>{projectTitle.substring(0, 2)}</div>}
				</ContentDiv>
			</StyledTooltip>
		</ItemDiv>
	);
};

export default SideBarItem;
