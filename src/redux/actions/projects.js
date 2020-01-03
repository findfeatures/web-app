import { get_projects_api } from "../../api";
import { apiAction } from "./index";
import { GET_PROJECTS, SET_PRODUCTS_DATA } from "./types";

export const getProjects = () =>
	apiAction({
		url: get_projects_api.url,
		method: get_projects_api.method,
		label: GET_PROJECTS,
		requiresAccessToken: true,
		onSuccess: setProjectsData,
	});

const setProjectsData = data => {
	return {
		type: SET_PRODUCTS_DATA,
		payload: data,
	};
};
