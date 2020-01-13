import { navigate } from "@reach/router";
import React from "react";

import SideBarItem from "../SideBarItem";
import { ContentDiv } from "./SideBar.Style.js";

const SideBar = ({ projects = [], selectedProjectID = 0 }) => {
	// selectedProjectID === 0 => create new project!

	const onSideBarItemClickHandler = projectID => {
		navigate(`/dashboard/${projectID}/home`);
	};

	return (
		<ContentDiv>
			{projects.map(item => (
				<SideBarItem
					{...item}
					selected={item.id === selectedProjectID}
					projectID={item.id}
					key={item.id}
					onClickHandler={onSideBarItemClickHandler}
				/>
			))}
			<SideBarItem
				createNew={true}
				onClickHandler={() => navigate("/dashboard/projects/create")}
				selected={selectedProjectID === 0}
				projectID={0}
				key={0}
			/>
		</ContentDiv>
	);
};

export default SideBar;
