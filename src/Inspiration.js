import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchForm from "./forms/SearchForm";
import { Image } from "react-bootstrap";
import "./Inspiration.css";
import { CLIENT_ID_UNSPLASH } from "./secret";

const API_BASE_URL = "https://api.unsplash.com/search/photos?";

const Inspiration = () => {
	const [ pictures, setPictures ] = useState([]);

	useEffect(() => {
		getPictures();
	}, []);

	async function getPictures (query) {
		let pics = await axios.get(
			`${API_BASE_URL}client_id=${CLIENT_ID_UNSPLASH}&query=${query}&orientation=squarish&per_page=100`
		);
		let data = pics.data.results;
		setPictures(data);
	}

	return (
		<div>
			<div className="Inspiration-form">
				<div className="Inspiration-new">
					<span className="bold">add</span>
					<p className="Inspiration-p">
						pictures to your event <i>moodboard</i> for inspiration.
					</p>
					<p className="small-text">
						save a picture to your event, it will appear in your event details
					</p>
				</div>
				<SearchForm searchFor={getPictures} />
			</div>
			<div className="Inspiration">
				{pictures.map((item) => (
					<a href="#">
						<Image className="rounded" fluid src={item.urls.regular} />
					</a>
				))}
			</div>
		</div>
	);
};

export default Inspiration;
