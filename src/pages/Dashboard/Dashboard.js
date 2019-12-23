import React from "react";
import { connect } from "react-redux";
import { DashboardPageDiv } from "./Dashboard.Style.js";
import { authenticateUser } from "../../redux/actions/auth";

class Dashboard extends React.Component {
	render() {
		return (
			<DashboardPageDiv>
				You're logged in!
				<button
					onClick={() => this.props.authenticateUser("calum@so-cal.co.uk", "passwor123d")}
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
