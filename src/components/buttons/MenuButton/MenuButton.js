import React from "react";

import { ButtonDiv } from "./MenuButton.Style.js";

const MenuButton = ({ children, onClickHandler = () => {} }) => {
	return <ButtonDiv onClick={onClickHandler}>{children}</ButtonDiv>;
};

export default MenuButton;
