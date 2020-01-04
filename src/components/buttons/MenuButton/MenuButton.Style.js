import styled from "styled-components";

export const ButtonDiv = styled.div`
	margin: 0 3px;
	width: 38px;
	height: 38px;
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
	cursor: pointer;

	svg {
		fill: #5e5e5e;
		height: 20px;
	}

	svg:hover {
		fill: black;
	}

	:active {
		svg {
			fill: #0055fe;
		}
	}
`;
