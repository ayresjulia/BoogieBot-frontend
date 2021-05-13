import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import axios from "axios";
import { Card, CardBody, CardTitle } from "reactstrap";
import "./MyEvent.css";
import dict from "./helpers/dictionary";
import { Image, Row, Col } from "react-bootstrap";
import { CLIENT_KEY_DOCUMENU } from "./secret";
import BoogieBotApi from "./Api";

const API_BASE_URL = "https://api.documenu.com/v2/restaurants/search/fields?";

const SearchEvent = ({ events, cantFind }) => {
	const { id } = useParams();
	const [ restaurants, setRestaurants ] = useState([]);
	const [ evtMoodboard, setEvtMoodboard ] = useState([]);

	let event = events.find((event) => parseInt(event.id) === parseInt(id));

	useEffect(() => {
		getEvent();
		getRestaurants();
	}, []);

	async function getRestaurants (zip) {
		let getRestaurant = await axios.get(
			`${API_BASE_URL}zip_code=${zip}&key=${CLIENT_KEY_DOCUMENU}`
		);

		let data = getRestaurant.data.data;
		setRestaurants(data);
	}

	async function getEvent () {
		let moodboard = await BoogieBotApi.getEvent(event.id);
		setEvtMoodboard(moodboard);
	}

	// let result = restaurants.find(
	// 	(item) => item.restaurant_id === evtMoodboard.moodboard.restaurantKey
	// );
	console.log(restaurants);
	if (!event) return <Redirect to={cantFind} />;

	return (
		<div>
			<Row>
				<Col m={6}>
					<div className="mb-left">
						{evtMoodboard.moodboard &&
							evtMoodboard.moodboard.map((item) => (
								<Image className="mb-insp" fluid src={item.inspirationUrl} />
							))}
					</div>
				</Col>
				<Col m={6}>
					<div className="mb-right">
						<Card className="Event-card">
							<CardBody>
								<CardTitle className="font-weight-bold text-center mb-card-title">
									{event.title}
								</CardTitle>

								<p>
									<b>{dict.myEventDesc}</b> {event.description}
								</p>
								<p>
									<b>{dict.myEventWhen}</b> {event.eventDate}
								</p>
								<p>
									<b>{dict.myEventTime}</b> {event.eventTime}
								</p>
								<p>
									<b>{dict.myEventLocation}</b> {event.city} | {event.state} |{" "}
									{event.country}
								</p>
								<CardTitle className="font-weight-bold text-center mb-catering-title">
									catering options
								</CardTitle>
								<ol>
									{evtMoodboard.moodboard &&
										evtMoodboard.moodboard.map(
											(item) =>
												item.restaurantKey && <li>{item.restaurantKey}</li>
										)}
								</ol>
							</CardBody>
						</Card>
					</div>
				</Col>
			</Row>
		</div>
	);
};

export default SearchEvent;
