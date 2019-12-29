import { combineReducers } from "redux";

import auth from "./auth";
import signUp from "./signUp";

export default combineReducers({
	auth,
	signUp
});
