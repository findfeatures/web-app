import { navigate } from "@reach/router";
import PropTypes from "prop-types";
import * as queryString from "query-string";
import React from "react";
import { connect } from "react-redux";

import BlockButton from "../../components/BlockButton";
import LargeCard from "../../components/LargeCard";
import Spinner from "../../components/Spinner";
import { verifyEmail } from "../../redux/actions/signUp";
import {
	ButtonWrapper,
	EmailVerificationPage,
	StyledFooter,
} from "./EmailVerification.Style.js";

class EmailVerification extends React.PureComponent {
	state = {
		email: "",
		token: "",
		verifyingEmail: false,
		errorMessage: "",
	};

	handleButtonClick = () => {
		// todo: send verification!
		navigate("/login");
	};

	static getDerivedStateFromProps = (props, state) => {
		const queryParams = queryString.parse(props.location.search);

		const email = queryParams.email || null;
		const token = queryParams.token || null;

		return {
			...state,
			email: email,
			token: token,
		};
	};

	componentDidUpdate(prevProps) {
		const verifyingEmail =
			this.props.isVerifyingEmail !== prevProps.isVerifyingEmail &&
			this.props.isVerifyingEmail;

		const finishedVerifyingEmail =
			this.props.isVerifyingEmail !== prevProps.isVerifyingEmail &&
			prevProps.isVerifyingEmail;

		if (verifyingEmail) {
			this.setState({
				verifyingEmail: true,
			});
		}

		if (finishedVerifyingEmail) {
			if (this.props.statusCode === 200) {
				this.setState({
					verifyingEmail: false,
				});
			} else {
				this.setState({
					verifyingEmail: false,
					errorMessage:
						"Failed to authenticate token. Please contact support if the problem persists.",
				});
			}
		}
	}

	componentDidMount() {
		if (this.state.email !== null && this.state.token !== null) {
			this.props.verifyEmail(this.state.email, this.state.token);
		}
	}

	render() {
		const activating = this.state.verifyingEmail;

		return (
			<EmailVerificationPage>
				<LargeCard>
					<div
						style={{
							fontSize: "40px",
							fontWeight: 900,
							top: "15px",
							position: "absolute",
						}}
					>
						Find Features
					</div>
					<h3 style={{ fontSize: "30px" }}>
						{activating
							? "Your account is being activated!"
							: "Your account is ready!"}
					</h3>

					<ButtonWrapper>
						<BlockButton handleButtonClick={this.handleButtonClick}>
							{this.state.verifyingEmail ? <Spinner /> : "BACK TO LOGIN"}
						</BlockButton>
					</ButtonWrapper>
					<StyledFooter color={this.state.errorMessage ? "red" : "black"}>
						{this.state.errorMessage ? (
							this.state.errorMessage
						) : (
							<div style={{ width: "50%" }}>
								Thanks for signing up! Once your account is activated, please go
								back to the login page and login!
							</div>
						)}
					</StyledFooter>
				</LargeCard>
			</EmailVerificationPage>
		);
	}
}

EmailVerification.defaultProps = {
	isVerifyingEmail: false,
	statusCode: 200,
	verifyEmail: () => {},
};

EmailVerification.propTypes = {
	isVerifyingEmail: PropTypes.bool,
	statusCode: PropTypes.number,
	verifyEmail: PropTypes.func,
};

const mapStateToProps = reduxState => {
	return {
		isVerifyingEmail: reduxState.signUp.isVerifyingEmail,
		statusCode: reduxState.signUp.verifyEmail.statusCode,
	};
};

export default connect(
	mapStateToProps,
	{
		verifyEmail,
	},
)(EmailVerification);
