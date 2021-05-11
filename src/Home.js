import React from "react";
import "./Home.css";
import { Image } from "react-bootstrap";

/** Home page. If user is logged in, welcomes them by username. */

const Home = ({ currentUser }) => {
	return (
		<div>
			<div className="Home">
				<div className="Home-body">
					{currentUser && (
						<p>
							Welcome back, <b>{currentUser.username}</b>{" "}
							<Image
								className="Profile-url"
								src={currentUser.profileUrl}
								alt="homepage-img"
							/>
						</p>
					)}
					{!currentUser && <p>Please, Log in or Sign up to begin.</p>}
				</div>
				<div className="Home-img">
					<Image
						className="img1"
						fluid
						src="https://images.unsplash.com/photo-1620324446278-be6c7bb3ece5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
						alt="homepage-img"
					/>
					<Image
						className="img2"
						fluid
						src="https://images.unsplash.com/photo-1527275393322-8ddae8bd5de9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
						alt="homepage-img"
					/>
					<Image
						className="img3"
						fluid
						src="https://images.unsplash.com/photo-1525268771113-32d9e9021a97?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
						alt="homepage-img"
					/>
					<Image
						className="img4"
						fluid
						src="https://images.unsplash.com/photo-1534119238569-839b7389d552?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
						alt="homepage-img"
					/>
				</div>
			</div>
		</div>
	);
};

export default Home;
