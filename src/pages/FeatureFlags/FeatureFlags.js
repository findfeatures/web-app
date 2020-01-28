import React from "react";
import InfiniteScroll from "react-infinite-scroller";

import BlockButton from "../../components/buttons/BlockButton";
import FullPageCard from "../../components/cards/FullPageCard";
import {
	StatusDiv,
	StatusDivWrapper,
	StyledButtonWrapper,
	StyledList,
	StyledListDiv,
	StyledListDivWrapper,
	StyledListItemDiv,
	StyledListItemTitle,
	StyledTitle,
} from "./FeatureFlags.Style.js";

const FeatureFlags = () => {
	const _data = [
		{
			id: 1,
			featureFlag: "Group Displacement Service",
			defaultState: Math.random() < 0.5,
			createdDateUtc: "2020-01-21T13:15:00Z",
		},
		{
			id: 2,
			featureFlag: "Automation",
			defaultState: Math.random() < 0.5,
			createdDateUtc: "2020-01-21T13:15:00Z",
		},
		{
			id: 3,
			featureFlag: "Price Decay Model",
			defaultState: Math.random() < 0.5,
			createdDateUtc: "2020-01-03T18:35:50Z",
		},
		{
			id: 4,
			featureFlag: "A/B Price Testing",
			defaultState: Math.random() < 0.5,
			createdDateUtc: "2020-01-03T18:35:50Z",
		},
		{
			id: 5,
			featureFlag: "Analytics Service",
			defaultState: Math.random() < 0.5,
			createdDateUtc: "2020-01-03T18:35:50Z",
		},
		{
			id: 6,
			featureFlag: "Site Maintenance Mode",
			defaultState: Math.random() < 0.5,
			createdDateUtc: "2020-01-04T12:35:50Z",
		},
		{
			id: 7,
			featureFlag: "Enable Debugger",
			defaultState: Math.random() < 0.5,
			createdDateUtc: "2020-01-03T18:35:50Z",
		},
		{
			id: 8,
			featureFlag: "RabbitMQ Kill Switch",
			defaultState: Math.random() < 0.5,
			createdDateUtc: "2020-01-03T18:35:50Z",
		},
	];

	const data = _data.sort(() => Math.random() - 0.5);

	return (
		<FullPageCard>
			<StyledTitle>Feature Flags</StyledTitle>
			<StyledButtonWrapper>
				<BlockButton>ADD NEW +</BlockButton>
			</StyledButtonWrapper>
			<StyledListDivWrapper>
				<StyledListDiv>
					<InfiniteScroll useWindow={false}>
						<StyledList>
							{data.map((d, index) => {
								return (
									<li>
										<StyledListItemDiv lastItem={index === data.length - 1}>
											<StyledListItemTitle>{d.featureFlag}</StyledListItemTitle>
											<StatusDivWrapper>
												{/*<p>State</p>*/}
												<StatusDiv
													backgroundColor={d.defaultState ? "#00e83e" : "red"}
												>
													{d.defaultState ? "ON" : "OFF"}
												</StatusDiv>
											</StatusDivWrapper>
										</StyledListItemDiv>
									</li>
								);
							})}
						</StyledList>
					</InfiniteScroll>
				</StyledListDiv>
			</StyledListDivWrapper>
		</FullPageCard>
	);
};

export default FeatureFlags;
