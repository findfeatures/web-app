import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import FullPageCard from "../../components/cards/FullPageCard";
import Spinner from "../../components/miscellaneous/Spinner";
import {
	getProjectCompletedSetup,
	getProjects,
} from "../../redux/actions/projects";
import { StyledHeader, StyledP } from "./CreateProjectSuccess.Style";

function usePrevious(value) {
	const ref = useRef();
	useEffect(() => {
		ref.current = value;
	});
	return ref.current;
}

const CreateProjectSuccess = () => {
	const [projectSetup, setProjectSetup] = useState(false);
	const dispatch = useDispatch();

	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);

	const makeRequest = () => {
		const sessionId = urlParams.get("session_id");

		if (sessionId != null) {
			setTimeout(() => {
				dispatch(getProjectCompletedSetup(sessionId));
			}, 2000);
		}
	};

	useEffect(() => {
		makeRequest();
	}, []);

	const isRequestingProjectCompletedSetup =
		useSelector(state => state.projects.isRequestingProjectCompletedSetup) ||
		false;
	const isProjectCompleted =
		useSelector(state => state.projects.projectCompletedData) || false;

	const requestingData = usePrevious({ isRequestingProjectCompletedSetup });

	useEffect(() => {
		if (requestingData) {
			const prevRequesting = requestingData.isRequestingProjectCompletedSetup;
			const nowRequesting = isRequestingProjectCompletedSetup;

			if (prevRequesting && nowRequesting !== prevRequesting) {
				if (isProjectCompleted) {
					dispatch(getProjects());
					setProjectSetup(true);
				} else {
					makeRequest();
				}
			}
		}
	}, [isRequestingProjectCompletedSetup, isProjectCompleted]);

	return (
		<FullPageCard>
			{projectSetup ? (
				<>
					<StyledHeader>You're all set up!</StyledHeader>
					<StyledP>
						Your new project will appear on the side bar shortly.
					</StyledP>
				</>
			) : (
				<>
					<StyledHeader>
						Hang tight whilst we're building your project!
					</StyledHeader>
					<Spinner color={"black"} />
					<StyledP>(This can take up to 30 seconds)</StyledP>
				</>
			)}
		</FullPageCard>
	);
};

export default CreateProjectSuccess;
