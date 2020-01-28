import { get_project_completed_setup_api, get_projects_api } from "../../api";
import { apiAction } from "./index";
import { GET_PROJECTS, GET_PROJECT_COMPLETED_SETUP } from "./types";

export const getProjects = () =>
	apiAction({
		path: get_projects_api.path,
		method: get_projects_api.method,
		label: GET_PROJECTS,
		requiresAccessToken: true,
		defaultData: [],
	});

export const getProjectCompletedSetup = sessionId =>
	apiAction({
		path: get_project_completed_setup_api.path,
		method: get_project_completed_setup_api.method,
		label: GET_PROJECT_COMPLETED_SETUP,
		data: {
			session_id: sessionId,
		},
		requiresAccessToken: true,
	});
