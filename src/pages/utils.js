import { navigate } from "@reach/router";
import jwt from "jsonwebtoken";

export const handleHomeButtonClicked = () => {
	try {
		const token = jwt.decode(sessionStorage.getItem("JWT_TOKEN"));

		if (token.exp > Date.now().valueOf() / 1000) {
			navigate("/dashboard");
		}
	} catch (error) {
		navigate("/login");
	}
};
