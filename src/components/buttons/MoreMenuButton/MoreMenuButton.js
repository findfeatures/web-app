import { navigate } from "@reach/router";
import React from "react";
import { Tooltip } from "react-tippy";

import { ReactComponent as DownArrowSVG } from "../../../assets/svgs/down-arrow.svg";
import MenuButton from "../MenuButton";
import { TippyOverride } from "./MoreMenuButton.Style.js";

const MoreMenuButton = () => {
	return (
		<TippyOverride>
			<Tooltip
				html={
					<div style={{ width: "200px" }}>
						<div
							onClick={() => {
								console.log("here!:)");
								localStorage.removeItem("JWT_TOKEN");
								navigate("/login");
							}}
							style={{ width: "100%", height: "35px", fontSize: "12px" }}
						>
							Logout
						</div>
					</div>
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
		</TippyOverride>
	);
};

export default MoreMenuButton;
