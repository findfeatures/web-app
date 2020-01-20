import React from "react";

import {
	ErrorDiv,
	InputDiv,
	MainDiv,
	StyledInput,
} from "./SimpleInput.Style.js";

const SimpleInput = ({
	inputValue,
	handleInputValueChange,
	showError = false,
	errorMessage = "",
	disabled,
}) => {
	const handleInputChange = event => {
		handleInputValueChange(event.target.value);
	};

	return (
		<MainDiv>
			<InputDiv>
				<StyledInput
					value={inputValue}
					onChange={handleInputChange}
					disabled={disabled}
				/>
			</InputDiv>
			{showError && <ErrorDiv>{errorMessage}</ErrorDiv>}
		</MainDiv>
	);
};

/*
inputValue: PropTypes.string.isRequired,
	handleInputValueChange: PropTypes.func,
 */
export default SimpleInput;
