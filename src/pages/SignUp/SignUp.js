import { navigate } from "@reach/router";
import PropTypes from "prop-types";
import * as queryString from "query-string";
import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { connect } from "react-redux";
import zxcvbn from "zxcvbn";

import BlockButton from "../../components/BlockButton";
import LargeCard from "../../components/LargeCard";
import LoginInput from "../../components/LoginInput";
import Spinner from "../../components/Spinner";
import { checkIfUserExists, signUpUser } from "../../redux/actions/signUp";
import {
	LeftButtonWrapper,
	RightButtonWrapper,
	SignUpCompleteDiv,
	SignUpDiv,
	SignUpPageDiv,
	StyledFooter,
	StyledSpan,
	StyledTitle,
	TitleWrapper,
} from "./SignUp.Style.js";

class SignUp extends React.PureComponent {
	state = {
		currentScreenIndex: 0,
		lastScreenIndex: 4,

		checkingIfUserExists: false,

		isSigningUpUser: false,

		captchaPassed: false,

		// display name
		displayNameInputValue: "",
		displayNameErrorMessage: "",
		showDisplayNameError: false,

		// email
		emailInputValue: "",
		emailErrorMessage: "",
		showEmailError: false,

		// passwords
		zxcvbn: {
			score: 0,
		},
		passwordInputValue: "",
		passwordErrorMessage: "",
		showPasswordError: false,

		repeatPasswordInputValue: "",
		repeatPasswordErrorMessage: "",
		showRepeatPasswordError: false,
	};

	componentDidUpdate(prevProps) {
		const checkingIfUserExists =
			this.props.isCheckingIfUserExists !== prevProps.isCheckingIfUserExists &&
			this.props.isCheckingIfUserExists;
		const finishedCheckingIfUserExists =
			this.props.isCheckingIfUserExists !== prevProps.isCheckingIfUserExists &&
			prevProps.isCheckingIfUserExists;

		if (checkingIfUserExists) {
			this.setState({
				checkingIfUserExists: true,
			});
		}

		if (finishedCheckingIfUserExists) {
			if (this.props.checkIfUserExistsStatusCode === 200) {
				this.setState(prevState => ({
					checkingIfUserExists: false,
					currentScreenIndex: prevState.currentScreenIndex + 1,
				}));
			} else if (this.props.checkIfUserExistsStatusCode === 503) {
				this.setState({
					checkingIfUserExists: false,
					emailErrorMessage: "Can't connect to server! Please retry.",
					showEmailError: true,
				});
			} else {
				this.setState({
					checkingIfUserExists: false,
					emailErrorMessage: "Email already exists!",
					showEmailError: true,
				});
			}
		}

		const isSigningUpUser =
			this.props.isSigningUpUser !== prevProps.isSigningUpUser &&
			this.props.isSigningUpUser;
		const finishedSigningUpUser =
			this.props.isSigningUpUser !== prevProps.isSigningUpUser &&
			prevProps.isSigningUpUser;

		if (isSigningUpUser) {
			this.setState({
				isSigningUpUser: true,
			});
		}

		if (finishedSigningUpUser) {
			// currently dont support any errors here...
			this.setState(prevState => ({
				isSigningUpUser: false,
				currentScreenIndex: prevState.lastScreenIndex,
			}));
		}
	}

	handleBackClicked = () => {
		if (this.state.currentScreenIndex !== 0) {
			this.setState(prevState => ({
				currentScreenIndex: prevState.currentScreenIndex - 1,
			}));
		} else {
			navigate("/login");
		}
	};

	handleNextClicked = () => {
		switch (this.state.currentScreenIndex) {
			case 0:
				if (this.validateDisplayNameInput()) {
					return;
				}
				break;
			case 1:
				if (this.validateEmailInput()) {
					return;
				}

				this.props.checkIfUserExists(this.state.emailInputValue);

				return;
			case 2:
				if (
					this.validatePasswordInput() ||
					this.validateRepeatPasswordInput()
				) {
					return;
				}

				break;
			case 3:
				if (this.state.captchaPassed) {
					this.props.signUpUser(
						this.state.displayNameInputValue,
						this.state.emailInputValue,
						this.state.passwordInputValue,
					);
				}
				return;
			default:
				return;
		}

		this.setState(prevState => ({
			currentScreenIndex: prevState.currentScreenIndex + 1,
			captchaPassed: false,
		}));
	};

	handleDisplayNameInputValueChange = val => {
		this.setState(
			{
				displayNameInputValue: val,
			},
			() => {
				this.validateDisplayNameInput();
			},
		);
	};

	handleEmailInputValueChange = val => {
		this.setState(
			{
				emailInputValue: val,
			},
			() => {
				this.validateEmailInput();
			},
		);
	};

	handlePasswordInputValueChange = val => {
		this.setState(
			{
				passwordInputValue: val,
				zxcvbn: zxcvbn(this.state.passwordInputValue),
			},
			() => {
				this.validatePasswordInput();

				if (this.state.repeatPasswordInputValue) {
					this.validateRepeatPasswordInput();
				}
			},
		);
	};

	handleRepeatPasswordInputValueChange = val => {
		this.setState(
			{
				repeatPasswordInputValue: val,
			},
			() => {
				this.validateRepeatPasswordInput();
			},
		);
	};

	validateDisplayNameInput = () => {
		if (this.state.displayNameInputValue.replace(/\s/g, "") === "") {
			this.setState({
				displayNameErrorMessage: "Display name is required.",
				showDisplayNameError: true,
			});
			return true;
		} else if (this.state.displayNameInputValue.length > 25) {
			this.setState({
				displayNameErrorMessage: "Display name too long (25 char max).",
				showDisplayNameError: true,
			});
			return true;
		}
		this.setState({
			displayNameErrorMessage: "",
			showDisplayNameError: false,
		});
		return false;
	};

	validateEmailInput = () => {
		if (this.state.emailInputValue.replace(/\s/g, "") === "") {
			this.setState({
				emailErrorMessage: "Email Address is required.",
				showEmailError: true,
			});
			return true;
		}
		this.setState({
			emailErrorMessage: "",
			showEmailError: false,
		});
		return false;
	};

	validatePasswordInput = () => {
		if (this.state.passwordInputValue.replace(/\s/g, "") === "") {
			this.setState({
				passwordErrorMessage: "Password is required.",
				showPasswordError: true,
			});
			return true;
		} else if (this.state.passwordInputValue.length < 5) {
			this.setState({
				passwordErrorMessage: "Password must be at least 6 characters.",
				showPasswordError: true,
			});
			return true;
		} else if (this.state.zxcvbn.score < 2) {
			this.setState({
				passwordErrorMessage: "Password is to insecure.",
				showPasswordError: true,
			});
			return true;
		}

		this.setState({
			passwordErrorMessage: "",
			showPasswordError: false,
		});
		return false;
	};

	validateRepeatPasswordInput = () => {
		if (this.state.repeatPasswordInputValue.replace(/\s/g, "") === "") {
			this.setState({
				repeatPasswordErrorMessage: "Repeat Password is required.",
				showRepeatPasswordError: true,
			});
			return true;
		} else if (
			this.state.repeatPasswordInputValue !== this.state.passwordInputValue
		) {
			this.setState({
				repeatPasswordErrorMessage: "Repeat Password must match Password.",
				showRepeatPasswordError: true,
			});
			return true;
		}
		this.setState({
			repeatPasswordErrorMessage: "",
			showRepeatPasswordError: false,
		});
		return false;
	};

	passwordStrength = score => {
		switch (score) {
			case 0:
				return "Weak";
			case 1:
				return "Weak";
			case 2:
				return "Fair";
			case 3:
				return "Good";
			case 4:
				return "Strong";
			default:
				return "Weak";
		}
	};

	renderDisplayNameScreen = () => {
		return (
			<>
				<StyledTitle>What can we call you?</StyledTitle>
				<LoginInput
					title={"Display Name"}
					handleInputValueChange={this.handleDisplayNameInputValueChange}
					inputValue={this.state.displayNameInputValue}
					showError={this.state.showDisplayNameError}
					errorMessage={this.state.displayNameErrorMessage}
				/>
				<StyledFooter>
					Your display name is how other people will see you when interacting
					with Features. This can be edited later.
				</StyledFooter>
			</>
		);
	};

	renderEmailScreen = () => {
		return (
			<>
				<StyledTitle>
					Great! <i>{this.state.displayNameInputValue}</i> where can we reach
					you?
				</StyledTitle>
				<LoginInput
					title={"Email Address"}
					handleInputValueChange={this.handleEmailInputValueChange}
					inputValue={this.state.emailInputValue}
					showError={this.state.showEmailError}
					errorMessage={this.state.emailErrorMessage}
				/>
				<StyledFooter>
					Your Privacy is Our Policy. We'll only ever contact you about your
					account, payments and actions you request.
				</StyledFooter>
			</>
		);
	};

	renderPasswordScreen = () => {
		const passwordScore = this.state.zxcvbn.score;
		const passwordStrengthText = this.passwordStrength(passwordScore);

		return (
			<>
				<StyledTitle top={"15px"}>
					Time to think of something secure
				</StyledTitle>
				<LoginInput
					title={"Password"}
					type={"password"}
					handleInputValueChange={this.handlePasswordInputValueChange}
					inputValue={this.state.passwordInputValue}
					showError={this.state.showPasswordError}
					errorMessage={this.state.passwordErrorMessage}
				/>
				<LoginInput
					title={"Repeat Password"}
					type={"password"}
					handleInputValueChange={this.handleRepeatPasswordInputValueChange}
					inputValue={this.state.repeatPasswordInputValue}
					showError={this.state.showRepeatPasswordError}
					errorMessage={this.state.repeatPasswordErrorMessage}
				/>
				<StyledFooter bottom={"-5px"}>
					Password Strength:{" "}
					<StyledSpan color={passwordScore < 2 ? "red" : "green"}>
						<i>{passwordStrengthText}</i>
					</StyledSpan>
				</StyledFooter>
			</>
		);
	};

	handleRecaptchaChange = () => {
		this.setState({
			captchaPassed: true,
		});
	};

	renderRobotCheckScreen = () => {
		return (
			<>
				<StyledTitle top={"15px"}>Finally, are you a robot?</StyledTitle>
				<ReCAPTCHA
					sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
					onChange={this.handleRecaptchaChange}
				/>
				<StyledFooter>Robophobia: The irrational fear of Robots!</StyledFooter>
			</>
		);
	};

	switchScreen = currScreen => {
		switch (currScreen) {
			case 0:
				// Display name
				return this.renderDisplayNameScreen();
			case 1:
				// Email
				return this.renderEmailScreen();
			case 2:
				// Password
				return this.renderPasswordScreen();
			case 3:
				// Robot check
				return this.renderRobotCheckScreen();
			default:
				navigate("/404");
		}
	};

	renderScreen = () => {
		const screen = this.switchScreen(this.state.currentScreenIndex);

		return (
			<>
				<TitleWrapper>Sign Up</TitleWrapper>
				<SignUpDiv>{screen}</SignUpDiv>
				<LeftButtonWrapper>
					<BlockButton handleButtonClick={this.handleBackClicked}>
						{this.state.currentScreenIndex !== 0 ? "BACK" : "LOGIN"}
					</BlockButton>
				</LeftButtonWrapper>
				<RightButtonWrapper>
					<BlockButton
						handleButtonClick={this.handleNextClicked}
						disabled={
							this.state.checkingIfUserExists || this.state.isSigningUpUser
						}
					>
						{this.state.checkingIfUserExists || this.state.isSigningUpUser ? (
							<Spinner />
						) : this.state.currentScreenIndex === this.state.lastScreenIndex ? (
							"SIGN UP"
						) : (
							"NEXT"
						)}
					</BlockButton>
				</RightButtonWrapper>
			</>
		);
	};

	renderFinalScreen = () => {
		return (
			<>
				<TitleWrapper>Sign Up Complete!</TitleWrapper>

				<SignUpCompleteDiv>
					Be on the look out for an email in your inbox to verify your email
					address.
					<br />
				</SignUpCompleteDiv>
			</>
		);
	};

	render() {
		// only used when debugging! (e.g. ?screen=4)
		const queryParams = queryString.parse(this.props.location.search);

		const showSignUpFinished =
			this.state.currentScreenIndex === this.state.lastScreenIndex ||
			queryParams.screen === this.state.lastScreenIndex.toString();
		return (
			<SignUpPageDiv>
				<LargeCard>
					{showSignUpFinished ? this.renderFinalScreen() : this.renderScreen()}
				</LargeCard>
			</SignUpPageDiv>
		);
	}
}

SignUp.defaultProps = {
	isCheckingIfUserExists: false,
	checkIfUserExistsStatusCode: 200,
	checkIfUserExists: () => {},

	isSigningUpUser: false,
	signUpUserStatusCode: 200,
	signUpUser: () => {},
};

SignUp.propTypes = {
	isCheckingIfUserExists: PropTypes.bool,
	checkIfUserExistsStatusCode: PropTypes.number,
	checkIfUserExists: PropTypes.func,

	isSigningUpUser: PropTypes.bool,
	signUpUserStatusCode: PropTypes.number,
	signUpUser: PropTypes.func,
};

const mapStateToProps = reduxState => {
	return {
		isCheckingIfUserExists: reduxState.signUp.isCheckingIfUserExists,
		checkIfUserExistsStatusCode: reduxState.signUp.checkIfUserExists.statusCode,

		isSigningUpUser: reduxState.signUp.isSigningUpUser,
		signUpUserStatusCode: reduxState.signUp.signUp.statusCode,
	};
};

export default connect(
	mapStateToProps,
	{
		checkIfUserExists,
		signUpUser,
	},
)(SignUp);
