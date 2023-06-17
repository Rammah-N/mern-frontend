import React, { useRef } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import "./SideDrawer.css";
const SideDrawer = (props) => {
	const nodeRef = useRef(null);

	const content = (
		<CSSTransition
			in={props.visible}
			timeout={200}
			classNames="slide-in-left"
			mountOnEnter
			unmountOnExit>
			<aside className="side-drawer" onClick={props.closeDrawer}>
				{props.children}
			</aside>
		</CSSTransition>
	);

	return ReactDOM.createPortal(content, document.getElementById("drawer"));
};

export default SideDrawer;
