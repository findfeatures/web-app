import React from "react";
import BlockButton from "../../components/BlockButton";
import LoginInput from "../../components/LoginInput";
import Checkbox from "../../components/Checkbox";
import Spinner from "../../components/Spinner";

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

		loading: false
	};

	componentDidUpdate(prevProps) {
		const authenticatingUser = (this.props.isAuthenticatingUser !== prevProps.isAuthenticatingUser) && this.props.isAuthenticatingUser;
		const finishedAuthenticatingUser = (this.props.isAuthenticatingUser !== prevProps.isAuthenticatingUser) && prevProps.isAuthenticatingUser;

		if (finishedAuthenticatingUser) {
			this.handleFinishedAuthenticationUser(this.props.statusCode)
		}

		if (authenticatingUser) {
			this.setState({
				loading: true
			})
		}
	}

	handleFinishedAuthenticationUser = (statusCode) => {
		if (statusCode === 200) {
			navigate('/dashboard')
		} else if (statusCode === 503) {
			// can't connect to server error
			this.setState({showPasswordError: true, passwordErrorMessage: "Can't connect to server! Please retry."})
		} else {
			// we could handle different codes here a bit better
			// (e.g. 500 "internal server error" or 401 "not authorised")
			this.setState({showPasswordError: true, passwordErrorMessage: "Incorrect Email / Password combination!"})
		}
		this.setState({loading: false})
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

	renderLoginCard = () => {
		return (
			<>
				<LogoWrapper>Features</LogoWrapper>
				<FormWrapper>
					<LoginInput
						title={"Username"}
						handleInputValueChange={this.handleUsernameInputValueChange}
						inputValue={this.state.usernameInputValue}
						showError={this.state.showUsernameError}
						errorMessage={this.state.usernameErrorMessage}
						disabled={this.state.loading}
					/>
					<LoginInput
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
							<StyledSpan>Stay Signed In</StyledSpan>
						</StyledLabel>

						<div>Forgot your password?</div>
					</ExtraDetailsDiv>
				</FormWrapper>

				<ButtonWrapper>
					<BlockButton handleButtonClick={this.handleLoginClicked} disabled={this.state.loading}>
						{
							this.state.loading ? <Spinner/> : 'LOG IN'
						}
					</BlockButton>
				</ButtonWrapper>
			</>
		)
	};

	render() {
		return (
			<LoginPageDiv>
				<LoginCardDiv>
					{/*{*/}
					{/*	this.state.loading ? <Spinner/> : this.renderLoginCard()*/}
					{/*}*/}
					{
						this.renderLoginCard()
					}
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
