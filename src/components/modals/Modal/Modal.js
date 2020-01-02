import PropTypes from "prop-types";
import React from "react";
import ReactModal from "react-modal";

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
		border: "none",
		backgroundColor: "white",
		boxShadow: "0px 0px 67px 0px rgba(0, 0, 0, 0.19)",
		borderRadius: "0",
	},
	overlay: {
		backgroundColor: "",
	},
};

class Modal extends React.PureComponent {
	onRequestClose = () => {
		this.props.onRequestClose();
	};

	render() {
		return (
			<ReactModal
				isOpen={this.props.isOpen}
				style={customStyles}
				onRequestClose={this.onRequestClose}
				ariaHideApp={false}
			>
				{this.props.children}
			</ReactModal>
		);
	}
}

Modal.defaultProps = {
	isOpen: false,
	onRequestClose: () => {},
};

Modal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onRequestClose: PropTypes.func.isRequired,
	children: PropTypes.node,
};

export default Modal;
