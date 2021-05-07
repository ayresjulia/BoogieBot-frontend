import React from "react";
import "./Home.css";
/** Home page. If user is logged in, welcomes them by username. */

const Home = ({ currentUser }) => {
	return (
		<div className="Home-body">
			<p>Bold text wow.</p>
			<p>Something cool and motivating about the event.</p>
			{currentUser && (
				<p>
					Welcome back, <b>{currentUser.username}</b>!
				</p>
			)}
			{!currentUser && <p>Please, Log in or Sign up to begin.</p>}
		</div>
	);
};

export default Home;
