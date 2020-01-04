import { combineReducers } from "redux";

import auth from "./auth";
import notifications from "./notifications";
import signUp from "./signUp";

export default combineReducers({
	auth,
	signUp,
	notifications,
});
