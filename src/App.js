import React, { useState, useEffect } from "react";
import NavBar from "./navbar-routes/NavBar";
import Routes from "./navbar-routes/Routes";
import { BrowserRouter, Redirect } from "react-router-dom";
import BoogieBotApi from "./Api";
// import UserContext from "./UserContext";
import jwt from "jsonwebtoken";
import useLocalStorage from "./hooks/useLocalStorage";

/** Key name for storing token in localStorage. */
export const TOKEN_STORAGE_ID = "boogiebot-token";

/** BoogieBot App.
 *
 * - infoLoaded: making sure user data has been pulled out from API.
 *
 * - currentUser: user obj from API. 
 *
 * - token: for logged in users, this is their authentication JWT, stored in localStorage.
 */

const App = () => {
	const [ infoLoaded, setInfoLoaded ] = useState(false);
	// const [ hosts, setHosts ] = useState(new Set([]));
	const [ currentUser, setCurrentUser ] = useState(null);
	const [ token, setToken ] = useLocalStorage(TOKEN_STORAGE_ID);

	/** Load user info from API. Until a user is logged in and they have a token,
	this should not run. It only needs to re-run when a user logs out, so
	the value of the token is a dependency for this effect. */

	useEffect(
		function loadUserInfo () {
			async function getCurrentUser () {
				if (token) {
					try {
						let { username } = jwt.decode(token);
						// put the token on the Api class so it can use it to call the API.
						BoogieBotApi.token = token;
						let currentUser = await BoogieBotApi.getCurrentUser(username);
						setCurrentUser(currentUser);
						// setHosts(new Set(currentUser.hosts));
					} catch (err) {
						console.error("App loadUserInfo: problem loading", err);
						setCurrentUser(null);
					}
				}
				setInfoLoaded(true);
			}
			/** set infoLoaded to false while async getCurrentUser runs; once the
			data is fetched, this will be set back
			to false to display Loading... again. */
			setInfoLoaded(false);
			getCurrentUser();
		},
		[ token ]
	);

	/** Handles user login. */

	async function login (loginData) {
		try {
			let token = await BoogieBotApi.login(loginData);
			setToken(token);
			return { success: true };
		} catch (errors) {
			console.error("login failed", errors);
			return { success: false, errors };
		}
	}

	/** Handles user signup. */

	async function signup (signupData) {
		try {
			let token = await BoogieBotApi.signup(signupData);
			setToken(token);
			return { success: true };
		} catch (errors) {
			console.error("signup failed", errors);
			return { success: false, errors };
		}
	}
	/** Handles user logout. */

	const logout = () => {
		setCurrentUser(null);
		setToken(null);
	};

	// /** Checks if user hosts any event. */

	// const isHostingAnEvent = (id) => {
	// 	return hosts.has(id);
	// };

	/** Host and event: makes API call and updates set of hosts IDs. */

	// const hostAnEvent = (id) => {
	// 	if (isHostingAnEvent(id)) return;
	// 	BoogieBotApi.hostAnEvent(currentUser.username, id);
	// 	setHosts(new Set([ ...hosts, id ]));
	// };

	return (
		<div className="App">
			<BrowserRouter>
				<NavBar currentUser={currentUser} logout={logout} />
				<Routes login={login} signup={signup} logout={logout} currentUser={currentUser} />
				{!infoLoaded && <Redirect to="/" />}
			</BrowserRouter>
		</div>
	);
};

export default App;