import PropTypes from "prop-types";
import React from "react";

import {
	ErrorDiv,
	InputDiv,
	MainDiv,
	StyledInput,
	TitleLabel,
} from "./Input.Style.js";

class Input extends React.PureComponent {
	handleInputChange = event => {
		this.props.handleInputValueChange(event.target.value);
	};

	render() {
		return (
			<MainDiv>
				<TitleLabel>{this.props.title}</TitleLabel>
				<InputDiv>
					<StyledInput
						onChange={this.handleInputChange}
						type={this.props.type}
						value={this.props.inputValue}
						disabled={this.props.disabled}
					/>
				</InputDiv>
				{this.props.showError && <ErrorDiv>{this.props.errorMessage}</ErrorDiv>}
			</MainDiv>
		);
	}
}

Input.defaultProps = {
	type: "text",
	showError: false,
	errorMessage: "You have an error!",
	handleInputValueChange: () => {},
	disabled: false,
};

Input.propTypes = {
	title: PropTypes.string.isRequired,
	inputValue: PropTypes.string.isRequired,
	handleInputValueChange: PropTypes.func,
	type: PropTypes.string,
	showError: PropTypes.bool,
	errorMessage: PropTypes.string,
	disabled: PropTypes.bool,
};

export default Input;
