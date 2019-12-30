import { navigate } from "@reach/router";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

import BlockButton from "../../components/BlockButton";
import Checkbox from "../../components/Checkbox";
import Input from "../../components/Input";
import LargeCard from "../../components/LargeCard";
import Spinner from "../../components/Spinner";
import { authenticateUser } from "../../redux/actions/auth";
import {
	ExtraDetailsDiv,
	FormWrapper,
	LoginPageDiv,
	LogoWrapper,
	RightButtonWrapper,
	StyledLabel,
	StyledSignUpDiv,
	StyledSpan,
} from "./Login.Style.js";

class Login extends React.Component {
	state = {
		usernameInputValue: "",
		usernameErrorMessage: "",
		showUsernameError: false,

		passwordInputValue: "",
		passwordErrorMessage: "",
		showPasswordError: false,

		staySignedInChecked: false,

		loading: false,
	};

	componentDidUpdate(prevProps) {
		const authenticatingUser =
			this.props.isAuthenticatingUser !== prevProps.isAuthenticatingUser &&
			this.props.isAuthenticatingUser;
		const finishedAuthenticatingUser =
			this.props.isAuthenticatingUser !== prevProps.isAuthenticatingUser &&
			prevProps.isAuthenticatingUser;

		if (finishedAuthenticatingUser) {
			this.handleFinishedAuthenticationUser(this.props.statusCode);
		}

		if (authenticatingUser) {
			this.setState({
				loading: true,
			});
		}
	}

	handleFinishedAuthenticationUser = statusCode => {
		if (statusCode === 200) {
			navigate("/dashboard");
		} else if (statusCode === 503) {
			// can't connect to server error
			this.setState({
				showPasswordError: true,
				passwordErrorMessage: "Can't connect to server! Please retry.",
			});
		} else if (statusCode === 418) {
			// i'm a teapot (418) = email exists but not verified
			this.setState({
				showPasswordError: true,
				passwordErrorMessage: "Please verify your email first.",
			});
		} else {
			// we could handle different codes here a bit better
			// (e.g. 500 "internal server error" or 401 "not authorised")
			this.setState({
				showPasswordError: true,
				passwordErrorMessage: "Incorrect Email / Password combination!",
			});
		}
		this.setState({ loading: false });
	};

	handleUsernameInputValueChange = val => {
		this.setState({ usernameInputValue: val }, () =>
			this.validateUsernameInput(),
		);
	};

	validateUsernameInput = () => {
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
			this.props.authenticateUser(
				this.state.usernameInputValue,
				this.state.passwordInputValue,
			);
		}
	};

	handleStaySignedInCheckChange = val => {
		this.setState({ staySignedInChecked: val });
	};

	handleSignUpClicked = () => {
		navigate("/sign-up");
	};

	render() {
		return (
			<LoginPageDiv>
				<LargeCard>
					<LogoWrapper>Find Features</LogoWrapper>
					<FormWrapper>
						<Input
							title={"Email"}
							handleInputValueChange={this.handleUsernameInputValueChange}
							inputValue={this.state.usernameInputValue}
							showError={this.state.showUsernameError}
							errorMessage={this.state.usernameErrorMessage}
							disabled={this.state.loading}
						/>
						<Input
							title={"Password"}
							type={"password"}
							handleInputValueChange={this.handlePasswordInputValueChange}
							inputValue={this.state.passwordInputValue}
							showError={this.state.showPasswordError}
							errorMessage={this.state.passwordErrorMessage}
							disabled={this.state.loading}
						/>
						<ExtraDetailsDiv>
							<StyledLabel>
								<Checkbox
									checked={this.state.staySignedInChecked}
									onCheckChange={this.handleStaySignedInCheckChange}
								/>
								<StyledSpan>Remember me</StyledSpan>
							</StyledLabel>

							<div>Forgot your password?</div>
						</ExtraDetailsDiv>
					</FormWrapper>

					<StyledSignUpDiv onClick={this.handleSignUpClicked}>
						Need an account? Sign up <b>here</b>!
					</StyledSignUpDiv>

					<RightButtonWrapper>
						<BlockButton
							handleButtonClick={this.handleLoginClicked}
							disabled={this.state.loading}
						>
							{this.state.loading ? <Spinner /> : "LOG IN"}
						</BlockButton>
					</RightButtonWrapper>
				</LargeCard>
			</LoginPageDiv>
		);
	}
}

Login.defaultProps = {
	isAuthenticatingUser: false,
	statusCode: 200,
	authenticateUser: () => {},
};

Login.propTypes = {
	isAuthenticatingUser: PropTypes.bool,
	statusCode: PropTypes.number,
	authenticateUser: PropTypes.func,
};

const mapStateToProps = reduxState => {
	return {
		isAuthenticatingUser: reduxState.auth.isAuthenticatingUser,
		statusCode: reduxState.auth.statusCode,
	};
};

export default connect(
	mapStateToProps,
	{
		authenticateUser,
	},
)(Login);
