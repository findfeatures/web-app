import {
	API_END,
	API_START,
	GET_PROJECTS,
	GET_PROJECT_COMPLETED_SETUP,
} from "../actions/types";

const initialState = {
	isRequestingProjects: false,
	projectsData: [],
	projectsStatusCode: 200,
	projectsError: null,

	isRequestingProjectCompletedSetup: false,
	projectCompletedData: false,
	projectCompletedStatusCode: 200,
	projectCompletedError: null,
};

const apiStartGetProjects = (state, action) => {
	return {
		...state,
		isRequestingProjects: true,
	};
};

const apiStartGetProjectCompletedSetup = (state, action) => {
	return {
		...state,
		isRequestingProjectCompletedSetup: true,
	};
};

const apiEndGetProjects = (state, action) => {
	return {
		...state,
		isRequestingProjects: false,
		projectsStatusCode: action.statusCode,
		projectsData: action.data.projects || action.data,
		projectsError: action.error,
	};
};

const apiEndGetProjectCompletedSetup = (state, action) => {
	return {
		...state,
		isRequestingProjectCompletedSetup: false,
		projectCompletedStatusCode: action.statusCode,
		projectCompletedError: action.error,
		projectCompletedData: action.data.completed,
	};
};

export default function projects(state = initialState, action) {
	const payload = action.payload;

	switch (action.type) {
		case API_START:
			if (payload === GET_PROJECTS) {
				return apiStartGetProjects(state, action);
			}
			if (payload === GET_PROJECT_COMPLETED_SETUP) {
				return apiStartGetProjectCompletedSetup(state, action);
			}
			break;
		case API_END:
			if (payload === GET_PROJECTS) {
				return apiEndGetProjects(state, action);
			}
			if (payload === GET_PROJECT_COMPLETED_SETUP) {
				return apiEndGetProjectCompletedSetup(state, action);
			}
			break;
		default:
			return state;
	}
	return state;
}
