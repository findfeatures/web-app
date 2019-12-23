import React from "react";
import BlockButton from "../../components/BlockButton";
import LoginInput from "../../components/LoginInput";
import Checkbox from "../../components/Checkbox";
import PropTypes from 'prop-types';
import {
	navigate
} from "@reach/router"

import {
	LoginPageDiv,
	LoginCardDiv,
	LogoWrapper,
	ButtonWrapper,
	FormWrapper,
	StyledLabel,
	ExtraDetailsDiv,
	StyledSpan,
} from "./Login.Style.js";
import {connect} from "react-redux";
import {authenticateUser} from "../../redux/actions/auth";

class Login extends React.Component {
	state = {
		usernameInputValue: "",
		usernameErrorMessage: "",
		showUsernameError: false,

		passwordInputValue: "",
		passwordErrorMessage: "",
		showPasswordError: false,

		staySignedInChecked: false,
	};

	componentDidUpdate(prevProps) {
		const finishedAuthenticatingUser = (this.props.isAuthenticatingUser !== prevProps.isAuthenticatingUser) && prevProps.isAuthenticatingUser;

		if (finishedAuthenticatingUser) {
			this.handleFinishedAuthenticationUser(this.props.statusCode)
		}
	}

	handleFinishedAuthenticationUser = (statusCode) => {
		if (statusCode === 200) {
			navigate('/dashboard')
		} else {
			// we could handle different codes here a bit better
			// (e.g. 500 "internal server error" or 401 "not authorised")
			this.setState({showPasswordError: true, passwordErrorMessage: "Incorrect Email / Password combination!"})
		}
	};

	handleUsernameInputValueChange = val => {
		this.setState({ usernameInputValue: val }, () =>
			this.validateUsernameInput(),
		);
	};

	validateUsernameInput = () => {
		// check if username is empty (spaces = empty)
		if (this.state.usernameInputValue.replace(/\s/g, "") === "") {
			this.setState({
				usernameErrorMessage: "Username is required.",
				showUsernameError: true,
			});
			return true;
		} else {
			this.setState({ usernameErrorMessage: "", showUsernameError: false });
			return false;
		}
	};

	handlePasswordInputValueChange = val => {
		this.setState({ passwordInputValue: val }, () =>
			this.validatePasswordInput(),
		);
	};

	validatePasswordInput = () => {
		// check if username is empty (spaces = empty)
		if (this.state.passwordInputValue === "") {
			this.setState({
				passwordErrorMessage: "Password is required.",
				showPasswordError: true,
			});
			return true;
		} else {
			this.setState({ passwordErrorMessage: "", showPasswordError: false });
			return false;
		}
	};

	handleLoginClicked = () => {
		const usernameError = this.validateUsernameInput();
		const passwordError = this.validatePasswordInput();

		if (!usernameError && !passwordError) {
			this.props.authenticateUser(this.state.usernameInputValue, this.state.passwordInputValue);
		}
	};

	handleStaySignedInCheckChange = val => {
		this.setState({ staySignedInChecked: val });
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

							<div>Forgot your password?</div>
						</ExtraDetailsDiv>
					</FormWrapper>

					<ButtonWrapper>
						<BlockButton handleButtonClick={this.handleLoginClicked}>
							LOG IN
						</BlockButton>
					</ButtonWrapper>
				</LoginCardDiv>
			</LoginPageDiv>
		);
	}
}

Login.defaultProps = {
	isAuthenticatingUser: false,
	statusCode: 200,
	authenticateUser: () => {}
};

Login.propTypes = {
	isAuthenticatingUser: PropTypes.bool,
	statusCode: PropTypes.number,
	authenticateUser: PropTypes.func
};

const mapStateToProps = (reduxState) => {
	return {
		isAuthenticatingUser: reduxState.auth.isAuthenticatingUser,
		statusCode: reduxState.auth.statusCode
	}
};

export default connect(
	mapStateToProps,
	{
		authenticateUser,
	},
)(Login);
