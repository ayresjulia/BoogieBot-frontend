import React, { useState } from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem, NavbarBrand, Collapse, NavbarToggler } from "reactstrap";
import dict from "../helpers/dictionary";
/** Navigation bar that changes according to currentUser. */

const NavBar = ({ currentUser, logout }) => {
	const [ collapsed, setCollapsed ] = useState(true);

	const toggleNavbar = () => setCollapsed(!collapsed);

	return (
		<div>
			<Navbar expand="md" light className="Navbar">
				<NavbarBrand href="/" className="Navbar-brand">
					{dict.logoName}
				</NavbarBrand>
				<NavbarToggler onClick={toggleNavbar} className="Navbar-hamburger" />
				<Collapse isOpen={!collapsed} navbar>
					{currentUser && (
						<Nav className="Navbar-cntr ml-auto" navbar>
							<NavItem>
								<NavLink className="navbar-link" to="/events">
									{dict.navMyEvents}
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink className="navbar-link" to="/inspiration">
									{dict.navInspiration}
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink className="navbar-link" to="/catering">
									{dict.navCatering}
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink className="navbar-link" to="/profile">
									{dict.navProfile}
								</NavLink>
							</NavItem>

							<NavItem>
								<NavLink className="navbar-link" to="/" onClick={logout}>
									{dict.navLogOut}
								</NavLink>
							</NavItem>
						</Nav>
					)}
					{!currentUser && (
						<Nav className="ml-auto" navbar>
							<NavItem>
								<NavLink className="navbar-link" to="/login">
									{dict.navLogIn}
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink className="navbar-link" to="/signup">
									{dict.navSignUp}
								</NavLink>
							</NavItem>
						</Nav>
					)}
				</Collapse>
			</Navbar>
		</div>
	);
};

export default NavBar;
