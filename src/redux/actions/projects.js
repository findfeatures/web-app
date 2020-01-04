import { get_projects_api } from "../../api";
import { apiAction } from "./index";
import { GET_PROJECTS, SET_PRODUCTS_DATA } from "./types";

// todo: remove setProjectData and use the
export const getProjects = () =>
	apiAction({
		url: get_projects_api.url,
		method: get_projects_api.method,
		label: GET_PROJECTS,
		requiresAccessToken: true,
		defaultData: [],
	});
