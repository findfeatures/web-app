import React from "react";
import { connect } from "react-redux";

import { authenticateUser } from "../../redux/actions/auth";
import { DashboardPageDiv } from "./Dashboard.Style.js";

class Dashboard extends React.Component {
	render() {
		return (
			<DashboardPageDiv>
				You're logged in!
				<button
					onClick={() =>
						this.props.authenticateUser("calum@so-cal.co.uk", "passwor123d")
					}
				>
					CLICK ME TO AUTH!
				</button>
			</DashboardPageDiv>
		);
	}
}

const mapStateToProps = ({ data = {}, isLoadingData = false }) => ({
	data,
	isLoadingData,
});

export default connect(
	mapStateToProps,
	{
		authenticateUser,
	},
)(Dashboard);
