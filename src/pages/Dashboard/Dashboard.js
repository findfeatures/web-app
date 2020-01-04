import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

import NavBar from "../../components/NavBar";
import { ContentDiv, DashboardPageDiv, NavBarDiv } from "./Dashboard.Style.js";

class Dashboard extends React.Component {
	render() {
		return (
			<DashboardPageDiv>
				<NavBarDiv>
					<NavBar />
				</NavBarDiv>
				<ContentDiv>
					{/*add children here??!! then can wrap dashboard!*/}
					HELLO WORLD!
				</ContentDiv>
			</DashboardPageDiv>
		);
	}
}

Dashboard.defaultProps = {};

Dashboard.propTypes = {};

const mapStateToProps = reduxState => {
	return {};
};

export default connect(
	mapStateToProps,
	{},
)(Dashboard);
