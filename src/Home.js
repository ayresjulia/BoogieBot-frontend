import React from "react";
import { Image } from "react-bootstrap";

import "./Home.css";
import dict from "./helpers/dictionary";

/** Home page. If user is logged in, welcomes them by username and profile picture. */

const Home = ({ currentUser }) => {
	return (
		<div>
			<div className="Home">
				<div className="Home-body">
					{currentUser && (
						<p>
							{dict.homeWelcome}
							<b>{currentUser.username}</b>{" "}
							<Image
								className="Profile-url"
								src={currentUser.profileUrl}
								alt="homepage-img"
							/>
						</p>
					)}
				</div>
				<div className="Home-img">
					<Image className="img1" fluid src={dict.homeImg1} alt="homepage-img" />
					<Image className="img2" fluid src={dict.homeImg2} alt="homepage-img" />
					<Image className="img3" fluid src={dict.homeImg3} alt="homepage-img" />
					<Image className="img4" fluid src={dict.homeImg4} alt="homepage-img" />
				</div>
			</div>
		</div>
	);
};

export default Home;
