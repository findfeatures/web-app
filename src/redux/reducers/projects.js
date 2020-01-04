import {
	API_END,
	API_START,
	GET_PROJECTS,
	SET_PRODUCTS_DATA,
} from "../actions/types";

const initialState = {
	isRequestingProjects: false,
	data: null,
};

const setProductsData = (state, action) => {
	return {
		...state,
	};
};

const apiStartGetProjects = (state, action) => {
	return {
		...state,
		isRequestingProjects: true,
	};
};

const apiEndGetProjects = (state, action) => {
	return {
		...state,
		isRequestingProjects: false,
		data: action.data.projects || action.data,
	};
};

export default function projects(state = initialState, action) {
	const payload = action.payload;

	switch (action.type) {
		case API_START:
			if (payload === GET_PROJECTS) {
				return apiStartGetProjects(state, action);
			}
			break;
		case API_END:
			if (payload === GET_PROJECTS) {
				return apiEndGetProjects(state, action);
			}
			break;
		default:
			return state;
	}
	return state;
}
