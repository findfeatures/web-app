import jwt from "jsonwebtoken"
import React from "react";
import { connect } from "react-redux";

import NavBar from "../../components/NavBar";
import { ContentDiv, DashboardPageDiv, NavBarDiv } from "./Dashboard.Style.js";
import FourOFour from "../FourOFour";

class Dashboard extends React.Component {
	state = {
		hasValidToken: false,
	};

	constructor(props) {
		super(props);

		try {
			const token = jwt.decode(sessionStorage.getItem("JWT_TOKEN"));

			if (token.exp > (Date.now().valueOf() / 1000)) {
				this.state.hasValidToken = true;
			}
		} catch (error) {
			console.log(error)
		}
	}

	render() {
		if (!this.state.hasValidToken) {
			return <FourOFour/>
		}

		return (
			<DashboardPageDiv>
				<NavBarDiv>
					<NavBar />
				</NavBarDiv>
				<ContentDiv>{this.props.children}</ContentDiv>
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
