import PropTypes from "prop-types";
import React from "react";

import {
	CheckboxContainer,
	HiddenCheckbox,
	Icon,
	StyledCheckbox,
} from "./Checkbox.Style.js";

class Checkbox extends React.PureComponent {
	handleCheckChange = event => {
		this.props.onCheckChange(event.target.checked);
	};

	render() {
		return (
			<CheckboxContainer className={this.props.className}>
				<HiddenCheckbox
					checked={this.props.checked}
					onChange={this.handleCheckChange}
				/>
				<StyledCheckbox checked={this.props.checked}>
					<Icon viewBox="0 0 24 24" data-test-id="checkbox-svg">
						<polyline points="20 3 9 15 4 9" />
					</Icon>
				</StyledCheckbox>
			</CheckboxContainer>
		);
	}
}

Checkbox.defaultProps = {
	checked: false,
	onCheckChange: () => {},
};

Checkbox.propTypes = {
	className: PropTypes.string,
	checked: PropTypes.bool,
	onCheckChange: PropTypes.func,
};

export default Checkbox;
