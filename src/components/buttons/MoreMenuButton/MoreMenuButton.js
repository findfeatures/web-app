import { navigate } from "@reach/router";
import React from "react";
import { Tooltip } from "react-tippy";

import { ReactComponent as DownArrowSVG } from "../../../assets/svgs/down-arrow.svg";
import MenuButton from "../MenuButton";
import MoreMenuItemButton from "../MoreMenuItemButton";
import { MenuToolTipDiv } from "./MoreMenuButton.Style.js";

const MoreMenuButton = () => {
	return (
		<Tooltip
			html={
				<MenuToolTipDiv>
					<MoreMenuItemButton
						onClickHandler={() => {
							localStorage.removeItem("JWT_TOKEN");
							navigate("/login");
						}}
						text={"Logout"}
					/>
				</MenuToolTipDiv>
			}
			interactive={true}
			position="bottom"
			trigger="click"
			theme="light"
			animation="perspective"
			arrow="true"
		>
			<MenuButton>
				<DownArrowSVG />
			</MenuButton>
		</Tooltip>
	);
};

export default MoreMenuButton;
