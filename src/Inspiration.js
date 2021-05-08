import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";
import SearchForm from "./forms/SearchForm";
import { Card, CardImg, Button } from "reactstrap";
// import SearchForm from "./forms/SearchForm";
import "./Inspiration.css";
/* Main search changes according to data type. */

const API_BASE_URL = "https://api.unsplash.com/search/photos?";
const CLIENT_ID = "fuu4Aqv5aFWntJFpJUnvLVyzmKhRFzGN1Z85GUmUfH0";

const Inspiration = () => {
	const [ pictures, setPictures ] = useState([]);

	useEffect(() => {
		getPictures();
	}, []);

	async function getPictures (query) {
		let pics = await axios.get(
			`${API_BASE_URL}client_id=${CLIENT_ID}&query=${query}&orientation=landscape&page=5`
		);
		let data = pics.data.results;
		setPictures(data);
	}

	return (
		<section>
			<div className="Event-form">
				<SearchForm searchFor={getPictures} />
			</div>
			<div className="Events">
				{pictures.map((item) => (
					<Card key={item.id} className="Events-card">
						<CardImg className="Events-img" src={item.urls.regular} />
						<Button className="btn btn-secondary">Save!</Button>
					</Card>
				))}
			</div>
		</section>
	);
};

export default Inspiration;
