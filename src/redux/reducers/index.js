import { combineReducers } from "redux";

import auth from "./auth";
import notifications from "./notifications";
import projects from "./projects";
import signUp from "./signUp";

export default combineReducers({
	auth,
	signUp,
	projects,
	notifications,
});
