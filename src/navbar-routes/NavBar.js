import React from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";

/** Navigation bar that changes according to currentUser. */

const NavBar = ({ currentUser, logout }) => {
	return (
		<div>
			<Navbar expand="md" color="light">
				<NavLink exact to="/" className="navbar-welcome">
					BoogieBot
				</NavLink>
				{currentUser && (
					<Nav className="ml-auto" navbar className="NavBar">
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
			</Navbar>
		</div>
	);
};

export default NavBar;
