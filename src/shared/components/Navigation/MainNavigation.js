import React, { useState } from "react";
import { Link } from "react-router-dom";

import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import "./MainNavigation.css";
import Backdrop from "../UIElements/Backdrop";

const MainNavigation = () => {
	const [visible, setVisible] = useState(false);

	const openDrawer = () => setVisible(true);
	const closeDrawer = () => setVisible(false);
	return (
		<>
			{visible && (
				<>
					<SideDrawer>
						<nav className="main-navigation__drawer-nav">
							<NavLinks />
						</nav>
					</SideDrawer>
					<Backdrop onClick={closeDrawer} />
				</>
			)}
			<MainHeader>
				<button className="main-navigation__menu-btn" onClick={openDrawer}>
					<span />
					<span />
					<span />
				</button>
				<h1 className="main-navigation__title">
					<Link to="/">Your Places</Link>
				</h1>
				<nav className="main-navigation__header-nav">
					<NavLinks />
				</nav>
			</MainHeader>
		</>
	);
};

export default MainNavigation;
