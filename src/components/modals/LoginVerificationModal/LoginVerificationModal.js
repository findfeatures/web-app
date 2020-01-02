import PropTypes from "prop-types";
import React from "react";

import BlockButton from "../../buttons/BlockButton";
import Spinner from "../../miscellaneous/Spinner";
import Modal from "../Modal";
import { StyledDiv, StyledTitle } from "./LoginVerificationModal.Style.js";

class LoginVerificationModal extends React.PureComponent {
	onRequestClose = () => {
		this.props.onRequestClose();
	};

	render() {
		return (
			<Modal
				isOpen={this.props.isOpen}
				onRequestClose={this.onRequestClose}
				ariaHideApp={false}
			>
				<StyledDiv>
					<StyledTitle>Important!</StyledTitle>
					{this.props.finishedLoading
						? "Thank you, your email has been sent again."
						: "You need to verify your account first before logging in."}
					<div style={{ width: "250px", height: "75px" }}>
						<BlockButton
							onClickHandler={
								this.props.finishedLoading
									? this.onRequestClose
									: this.props.onConfirm
							}
							disabled={this.props.confirmLoading}
						>
							{this.props.confirmLoading ? (
								<Spinner />
							) : this.props.finishedLoading ? (
								"CLOSE"
							) : (
								"RESEND EMAIL"
							)}
						</BlockButton>
					</div>
				</StyledDiv>
			</Modal>
		);
	}
}

LoginVerificationModal.defaultProps = {
	isOpen: false,
	onRequestClose: () => {},
	onConfirm: () => {},
	confirmLoading: false,
};

LoginVerificationModal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onRequestClose: PropTypes.func.isRequired,
	children: PropTypes.node,
	onConfirm: PropTypes.func.isRequired,
	confirmLoading: PropTypes.bool.isRequired,
	finishedLoading: PropTypes.bool.isRequired,
};

export default LoginVerificationModal;
