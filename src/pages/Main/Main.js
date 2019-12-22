import React from "react";
import withSizes from "react-sizes";
import PropTypes from "prop-types";
import UnsupportedError from "../../components/UnsupportedError";
import Login from "../Login";

class Main extends React.Component {
	render() {
		const isSupportedScreenSize = this.props.isSupportedScreenSize;

		return (
			<>
				<Login />
				<UnsupportedError show={!isSupportedScreenSize} />
			</>
		);
	}
}

Main.propTypes = {
	isSupportedScreenSize: PropTypes.bool,
};

const mapSizesToProps = ({ width, height }) => ({
	isSupportedScreenSize: width > 1000 && height > 600,
});

export default withSizes(mapSizesToProps)(Main);
