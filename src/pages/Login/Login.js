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
import LoginVerificationModal from '../../components/LoginVerificationModal';


class Login extends React.Component {
	state = {
		emailInputValue: "",
		emailErrorMessage: "",
		showEmailError: false,

		passwordInputValue: "",
		passwordErrorMessage: "",
		showPasswordError: false,

		rememberMeChecked: false,

		loading: false,

		showVerificationModel: false
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

	componentDidMount() {
		document.addEventListener("keydown", this.handleKeyDown);
	}

	componentWillUnmount() {
		document.removeEventListener("keydown", this.handleKeyDown);
	}

	handleKeyDown = event => {
		if (event.key === "Enter") {
			this.handleLoginClicked();
		}
	};

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
			// I'm a teapot (418) = email exists but not verified
			this.setState({
				showPasswordError: true,
				passwordErrorMessage: "Please verify your email first.",
				showVerificationModel: true
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

	handleEmailInputValueChange = val => {
		this.setState({ emailInputValue: val }, () => this.validateEmailInput());
	};

	validateEmailInput = () => {
		if (this.state.emailInputValue.replace(/\s/g, "") === "") {
			this.setState({
				emailErrorMessage: "Email is required.",
				showEmailError: true,
			});
			return true;
		} else {
			this.setState({ emailErrorMessage: "", showEmailError: false });
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
		const emailError = this.validateEmailInput();
		const passwordError = this.validatePasswordInput();

		if (!emailError && !passwordError) {
			this.props.authenticateUser(
				this.state.emailInputValue,
				this.state.passwordInputValue,
			);
		}
	};

	handleRememberMeChecked = val => {
		this.setState({ rememberMeChecked: val });
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
							handleInputValueChange={this.handleEmailInputValueChange}
							inputValue={this.state.emailInputValue}
							showError={this.state.showEmailError}
							errorMessage={this.state.emailErrorMessage}
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
									checked={this.state.rememberMeChecked}
									onCheckChange={this.handleRememberMeChecked}
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
