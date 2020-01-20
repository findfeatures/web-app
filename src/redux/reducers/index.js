import { combineReducers } from "redux";

import auth from "./auth";
import notifications from "./notifications";
import projects from "./projects";
import signUp from "./signUp";
import stripe from "./stripe";

export default combineReducers({
	auth,
	signUp,
	notifications,
	projects,
	stripe,
});
