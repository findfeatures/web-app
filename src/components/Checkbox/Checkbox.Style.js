import styled from "styled-components";

export const Icon = styled.svg`
	fill: none;
	stroke: black;
	stroke-width: 5px;
`;

export const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
	// Hide checkbox visually but remain accessible to screen readers.
	// Source: https://polished.js.org/docs/#hidevisually
	border: 0;
	clip: rect(0 0 0 0);
	clippath: inset(50%);
	height: 1px;
	margin: -1px;
	overflow: hidden;
	padding: 0;
	position: absolute;
	white-space: nowrap;
	width: 1px;
`;

export const StyledCheckbox = styled.div`
	display: inline-block;
	width: 16px;
	height: 16px;
	outline: 2px solid black;
	transition: all 150ms;
	cursor: pointer;
	
	${HiddenCheckbox}:focus + & {
	    box-shadow: 0 0 0 3px #0055FE;
    }
    
    ${Icon} {
		visibility: ${props => props.checked ? 'visible' : 'hidden'}
	}
`;

export const CheckboxContainer = styled.div`
	display: inline-block;
	vertical-align: middle;
	display: flex;
`;