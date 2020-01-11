import { navigate } from "@reach/router";
import React from "react";

import SideBarItem from "../SideBarItem";
import { ContentDiv } from "./SideBar.Style.js";

const SideBar = ({ projects = [] }) => {
	// todo: hook up projects into here!
	// todo: find out which one the user is on?!
	const fakeProjects = [
		{
			id: 1,
			title: "Pace",
			selected: false,
		},
		{
			id: 2,
			title: "Find Features",
			selected: true,
		},
		{
			id: 3,
			title: "Twitter",
			selected: false,
		},
	];
	return (
		<ContentDiv>
			{fakeProjects.map(item => (
				<SideBarItem {...item} key={item.id} />
			))}
			<SideBarItem
				createNew={true}
				key={0}
				onClickHandler={() => navigate("/dashboard/projects/create")}
			/>
		</ContentDiv>
	);
};

export default SideBar;
