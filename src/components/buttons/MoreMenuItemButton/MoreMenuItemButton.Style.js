import styled from "styled-components";

export const ButtonDiv = styled.div`
	user-select: none;
	cursor: pointer;
	height: 35px;
	line-height: 35px;
	padding-left: 10px;

	font-size: 15px;
	font-weight: 800;
	text-align: left;
	color: #5e5e5e;

	:hover {
		color: black;
	}

	:active {
		color: #0055fe;
	}
`;

export const MenuToolTipDiv = styled.div`
	width: 200px;
`;
