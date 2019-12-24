import { createGlobalStyle } from "styled-components";

export const createGlobalFeatureStyle = () => {
	return createGlobalStyle`			
		::selection {
		    background-color: #0055FE;
		    color: #FFFFFF;
		}

		#root {
			height: 100%;
			margin: 0px;
			overflow-y: scroll;
			background-color: #fafafa;
			letter-spacing: 2px;
		}

		* {
            font-family: HelveticaNowDisplay;
        }
		
	`;
};
