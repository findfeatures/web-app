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
					<div style={{ width: "150px" }}>
						<button
							onClick={() => console.log("clicked!")}
							style={{ width: "100%", background: "red" }}
						>
							Logout
						</button>
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
