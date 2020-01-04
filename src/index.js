import "react-tippy/dist/tippy.css";

import "./css/index.css";
import "./css/tippyOverides.css";

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { createGlobalFeatureStyle } from "./globalStyle.js";
import Main from "./pages/Main";
import apiMiddleware from "./redux/middleware/api";
import reducer from "./redux/reducers/index";
import * as serviceWorker from "./serviceWorker";

const GlobalStyle = createGlobalFeatureStyle();

const store = createStore(
	reducer,
	{},
	composeWithDevTools(applyMiddleware(apiMiddleware)),
);

ReactDOM.render(
	<>
		<GlobalStyle />
		<Provider store={store}>
			<Main />
		</Provider>
	</>,
	document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
