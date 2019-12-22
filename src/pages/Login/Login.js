import React from "react";
import BlockButton from "../../components/BlockButton";
import LoginInput from "../../components/LoginInput";
import Checkbox from "../../components/Checkbox";

import {
	LoginPageDiv,
	LoginCardDiv,
	LogoWrapper,
	ButtonWrapper,
	FormWrapper,
	StyledLabel,
	ExtraDetailsDiv,
	StyledSpan
} from "./Login.Style.js";

class Login extends React.Component {
	state = {
		usernameInputValue: '',
		usernameErrorMessage: '',
		showUsernameError: false,

		passwordInputValue: '',
		passwordErrorMessage: '',
		showPasswordError: false,

		staySignedInChecked: false
	};

	handleUsernameInputValueChange = (val) => {
		this.setState({usernameInputValue: val}, () => this.validateUsernameInput());
	};

	validateUsernameInput = () => {
		// check if username is empty (spaces = empty)
		if (this.state.usernameInputValue.replace(/\s/g, '') === "") {
			this.setState({usernameErrorMessage: 'Username is required.', showUsernameError: true});
			return true;
		} else {
			this.setState({usernameErrorMessage: '', showUsernameError: false});
			return false;
		}
	};

	handlePasswordInputValueChange = (val) => {
		this.setState({passwordInputValue: val}, () => this.validatePasswordInput());
	};

	validatePasswordInput = () => {
		// check if username is empty (spaces = empty)
		if (this.state.passwordInputValue === "") {
			this.setState({passwordErrorMessage: 'Password is required.', showPasswordError: true});
			return true;
		} else {
			this.setState({passwordErrorMessage: '', showPasswordError: false});
			return false;
		}
	};

	handleLoginClicked = () => {
		const usernameError = this.validateUsernameInput();
		const passwordError = this.validatePasswordInput();

		if (!usernameError && !passwordError) {
			console.log('make request to server!');
		}
	};

	handleStaySignedInCheckChange = (val) => {
		this.setState({staySignedInChecked: val});
	};

	render() {
		return (
			<LoginPageDiv>
				<LoginCardDiv>
					<LogoWrapper>Features</LogoWrapper>

					<FormWrapper>
						<LoginInput
							title={"Username"}
							handleInputValueChange={this.handleUsernameInputValueChange}
							inputValue={this.state.usernameInputValue}
							showError={this.state.showUsernameError}
							errorMessage={this.state.usernameErrorMessage}
						/>
						<LoginInput
							title={"Password"}
							type={"password"}
							handleInputValueChange={this.handlePasswordInputValueChange}
							inputValue={this.state.passwordInputValue}
							showError={this.state.showPasswordError}
							errorMessage={this.state.passwordErrorMessage}
						/>
						<ExtraDetailsDiv>
							<StyledLabel>
								<Checkbox
									checked={this.state.staySignedInChecked}
									onCheckChange={this.handleStaySignedInCheckChange}
								/>
								<StyledSpan>Stay Signed In</StyledSpan>
							</StyledLabel>

							<div>
								Forgot your password?
							</div>
						</ExtraDetailsDiv>
					</FormWrapper>

					<ButtonWrapper>
						<BlockButton handleButtonClick={this.handleLoginClicked}>LOG IN</BlockButton>
					</ButtonWrapper>
				</LoginCardDiv>
			</LoginPageDiv>
		);
	}
}

Login.propTypes = {};

export default Login;
