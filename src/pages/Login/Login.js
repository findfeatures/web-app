import { navigate } from "@reach/router";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

import BlockButton from "../../components/buttons/BlockButton";
import LargeCard from "../../components/cards/LargeCard";
import Checkbox from "../../components/inputs/Checkbox";
import Input from "../../components/inputs/Input";
import Credits from "../../components/miscellaneous/Credits";
import Spinner from "../../components/miscellaneous/Spinner";
import LoginVerificationModal from "../../components/modals/LoginVerificationModal";
import { authenticateUser } from "../../redux/actions/auth";
import { resendTokenEmail } from "../../redux/actions/signUp";
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
		emailInputValue: "",
		emailErrorMessage: "",
		showEmailError: false,

		passwordInputValue: "",
		passwordErrorMessage: "",
		showPasswordError: false,

		rememberMeChecked: false,

		loading: false,

		showVerificationModel: false,
		emailResendingLoading: false,
		hasResentEmail: false,
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

		const finishedResendingEmail =
			this.props.isResendingTokenEmail !== prevProps.isResendingTokenEmail &&
			prevProps.isResendingTokenEmail;

		if (finishedResendingEmail) {
			this.setState({
				hasResentEmail: true,
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
			if (!this.state.showVerificationModal) {
				this.handleLoginClicked();
			}
		}
	};

	handleFinishedAuthenticationUser = statusCode => {
		switch (statusCode) {
			case 200:
				navigate("/dashboard");
				break;
			case 418:
				// I'm a teapot (418) = email exists but not verified
				this.setState({
					showPasswordError: true,
					passwordErrorMessage: "Please verify your email first.",
				});
				this.setShowVerificationModal(true);
				break;
			case 503:
				// can't connect to server error
				this.setState({
					showPasswordError: true,
					passwordErrorMessage: "Can't connect to server! Please retry.",
				});
				break;
			case 500:
				// internal server error
				this.setState({
					showPasswordError: true,
					passwordErrorMessage: "Internal Server Error! Please retry.",
				});
				break;
			default:
				this.setState({
					showPasswordError: true,
					passwordErrorMessage: "Incorrect Email / Password combination!",
				});
				break;
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
		// disable clicking this if 'logging' in.
		if (!this.state.loading) {
			navigate("/sign-up");
		}
	};

	setShowVerificationModal = val => {
		// don't allow the modal to shut if the request is still processing.
		if (!this.props.isResendingTokenEmail) {
			if (val) {
				this.setState({
					showVerificationModal: val,
					hasResentEmail: false,
				});
			} else {
				this.setState({
					showVerificationModal: val,
				});
			}
		}
	};

	onEmailResend = () => {
		this.props.resendTokenEmail(
			this.state.emailInputValue,
			this.state.passwordInputValue,
		);
	};

	render() {
		return (
			<LoginPageDiv>
				<Credits />
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
							onClickHandler={this.handleLoginClicked}
							disabled={this.state.loading}
						>
							{this.state.loading ? <Spinner /> : "LOG IN"}
						</BlockButton>
					</RightButtonWrapper>
				</LargeCard>
				<LoginVerificationModal
					isOpen={this.state.showVerificationModal}
					onRequestClose={() => this.setShowVerificationModal(false)}
					onConfirm={this.onEmailResend}
					confirmLoading={this.props.isResendingTokenEmail}
					finishedLoading={this.state.hasResentEmail}
				/>
			</LoginPageDiv>
		);
	}
}

Login.defaultProps = {
	isAuthenticatingUser: false,
	statusCode: 200,
	authenticateUser: () => {},
	isResendingTokenEmail: false,
	resendTokenEmail: () => {},
};

Login.propTypes = {
	isAuthenticatingUser: PropTypes.bool,
	statusCode: PropTypes.number,
	authenticateUser: PropTypes.func,
	isResendingTokenEmail: PropTypes.bool,
	resendTokenEmail: PropTypes.func,
};

const mapStateToProps = reduxState => {
	return {
		isAuthenticatingUser: reduxState.auth.isAuthenticatingUser,
		statusCode: reduxState.auth.statusCode,
		isResendingTokenEmail: reduxState.signUp.isResendingTokenEmail,
	};
};

export default connect(
	mapStateToProps,
	{
		authenticateUser,
		resendTokenEmail,
	},
)(Login);
