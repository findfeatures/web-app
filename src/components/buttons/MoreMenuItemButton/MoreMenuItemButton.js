import React from "react";

import { ButtonDiv } from "./MoreMenuItemButton.Style.js";

const MoreMenuItemButton = ({ text, onClickHandler = () => {} }) => {
	return <ButtonDiv onClick={onClickHandler}>{text}</ButtonDiv>;
};

export default MoreMenuItemButton;
