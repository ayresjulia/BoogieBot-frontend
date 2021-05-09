import React, { useState } from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem, NavbarBrand, Collapse, NavbarToggler } from "reactstrap";

/** Navigation bar that changes according to currentUser. */

const NavBar = ({ currentUser, logout }) => {
	const [ collapsed, setCollapsed ] = useState(true);

	const toggleNavbar = () => setCollapsed(!collapsed);

	return (
		<div>
			<Navbar expand="md" color="faded" light className="NavBar-main">
				<NavbarBrand href="/">BoogieBot</NavbarBrand>
				<NavbarToggler onClick={toggleNavbar} />
				<Collapse isOpen={!collapsed} navbar>
					{currentUser && (
						<Nav className="ml-auto" navbar>
							<NavItem>
								<NavLink className="navbar-link" to="/events">
									My Events
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink className="navbar-link" to="/inspiration">
									Get Inspired
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink className="navbar-link" to="/catering">
									Catering
								</NavLink>
							</NavItem>
							{/* <NavItem className="navbar-link">
							<NavLink to="/transit">Transit</NavLink>
						</NavItem> */}
							<NavItem>
								<NavLink className="navbar-link" to="/profile">
									Profile
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink className="navbar-link" to="/" onClick={logout}>
									Log Out
								</NavLink>
							</NavItem>
						</Nav>
					)}
					{!currentUser && (
						<Nav className="ml-auto" navbar>
							<NavItem>
								<NavLink className="navbar-link" to="/inspiration">
									Get Inspired
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink className="navbar-link" to="/login">
									Log In
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink className="navbar-link" to="/signup">
									Sign Up
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
