import React from "react";
import {
	MainDiv,
	TitleDiv,
	InputDiv,
	StyledInput,
	ErrorDiv,
} from "./LoginInput.Style.js";
import PropTypes from "prop-types";

class LoginInput extends React.PureComponent {
	handleInputChange = event => {
		this.props.handleInputValueChange(event.target.value);
	};

	render() {
		return (
			<MainDiv>
				<TitleDiv>{this.props.title}</TitleDiv>
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

LoginInput.defaultProps = {
	type: "text",
	showError: false,
	errorMessage: "You have an error!",
	handleInputValueChange: () => {},
	disabled: false
};

LoginInput.propTypes = {
	title: PropTypes.string.isRequired,
	inputValue: PropTypes.string.isRequired,
	handleInputValueChange: PropTypes.func,
	type: PropTypes.string,
	showError: PropTypes.bool,
	errorMessage: PropTypes.string,
	disabled: PropTypes.bool
};

export default LoginInput;
