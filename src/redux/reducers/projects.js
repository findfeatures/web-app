import {
	API_END,
	API_START,
	GET_PROJECTS,
	SET_PRODUCTS_DATA,
} from "../actions/types";

const initialState = {
	isRequestingProjects: false,
	data: [],
};

const setProductsData = (state, action) => {
	return {
		...state,
		data: action.payload.projects,
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
	};
};

export default function projects(state = initialState, action) {
	const payload = action.payload;

	switch (action.type) {
		case SET_PRODUCTS_DATA:
			return setProductsData(state, action);
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
