import React, { useState } from "react";

import FullPageCard from "../../components/cards/FullPageCard";
import BillingInfo from "../../components/miscellaneous/BillingInfo";
import CreateProjectInfo from "../../components/miscellaneous/CreateProjectInfo";
import { StyledTitle } from "./CreateProject.Style.js";

const CreateProject = () => {
	const [page, setPage] = useState(0);
	const [billingId, setBillingId] = useState(null);

	const renderPage = () => {
		switch (page) {
			case 0:
				return (
					<BillingInfo
						onClickHandler={id => {
							setPage(page => page + 1);
							setBillingId(id);
						}}
					/>
				);
			case 1:
				return (
					<CreateProjectInfo billingId={billingId}>Page 2</CreateProjectInfo>
				);
			default:
				return <div>THERES AN ISSUE</div>;
		}
	};

	return (
		<FullPageCard>
			<StyledTitle>Create New Project</StyledTitle>
			{renderPage()}
		</FullPageCard>
	);
};

export default CreateProject;
