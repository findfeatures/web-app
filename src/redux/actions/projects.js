import { get_projects_api } from "../../api";
import { apiAction } from "./index";
import { GET_PROJECTS } from "./types";

export const getProjects = () =>
	apiAction({
		path: get_projects_api.path,
		method: get_projects_api.method,
		label: GET_PROJECTS,
		requiresAccessToken: true,
		defaultData: [],
	});
