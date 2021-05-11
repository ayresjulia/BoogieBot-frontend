import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchForm from "./forms/SearchForm";
import { Card, CardTitle, CardSubtitle, Button, CardImg } from "reactstrap";
import "./Catering.css";
import { CLIENT_KEY_DOCUMENU } from "./secret";

const API_BASE_URL = "https://api.documenu.com/v2/restaurants/search/fields?";

const Catering = () => {
	const [ restaurants, setRestaurants ] = useState([]);

	useEffect(() => {
		getRestaurants();
	}, []);

	async function getRestaurants (zip) {
		let getRestaurant = await axios.get(
			`${API_BASE_URL}zip_code=${zip}&key=${CLIENT_KEY_DOCUMENU}`
		);

		let data = getRestaurant.data.data;
		setRestaurants(data);
	}
	return (
		<section>
			<div className="Catering-form">
				<div className="Catering-new">
					<span className="Catering-bold">lookup</span>
					<p className="Catering-p">
						restaurants nearby with your <i>zip code</i> for catering options.
					</p>
					<p className="Catering-small">
						save a restaurant to your event, it will appear in your event details
					</p>
				</div>
				<SearchForm searchFor={getRestaurants} />
			</div>
			<div className="Catering">
				{restaurants.map((item) => (
					<Card key={item.restaurant_id} className="Catering-card">
						<CardImg
							top
							className="Catering-card-img"
							width="100%"
							src="https://images.unsplash.com/photo-1557962011-4b36a6f5d921?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
							alt="restaurant image"
						/>
						<CardTitle tag="h5">{item.restaurant_name}</CardTitle>
						{item.cuisines.length > 1 && (
							<CardSubtitle tag="h6" className="mb2 text-muted">
								Cuisine: {item.cuisines[0]}
							</CardSubtitle>
						)}
						<a
							a
							href={`http://maps.google.com/?q=${item.address["formatted"]}`}
							target="_blank"
							rel="noreferrer"
							tag="h6"
							className="mb2 text-muted">
							{item.address["formatted"]}
						</a>

						{item.restaurant_phone && (
							<a
								href={`tel:${item.restaurant_phone}`}
								tag="h6"
								className="mb2 text-muted">
								{item.restaurant_phone}
							</a>
						)}
						{item.restaurant_website && (
							<a
								href={item.restaurant_website}
								target="_blank"
								rel="noreferrer"
								tag="h6"
								className="mb2 text-muted">
								website
							</a>
						)}

						<Button className="btn btn-secondary">Save!</Button>
					</Card>
				))}
			</div>
		</section>
	);
};

export default Catering;