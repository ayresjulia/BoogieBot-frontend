import React, { useState, useEffect } from "react";
import axios from "axios";
import {
	Card,
	CardTitle,
	CardSubtitle,
	Button,
	CardImg,
	CardBody,
	Container,
	Form,
	FormGroup,
	Label,
	Input,
	Row,
	Col
} from "reactstrap";

import "./Catering.css";
import Alert from "./helpers/Alert";
import SearchForm from "./forms/SearchForm";
import { CLIENT_KEY_DOCUMENU } from "./secret";
import dict from "./helpers/dictionary";

const API_BASE_URL = "https://api.documenu.com/v2/restaurants/search/fields?";

const Catering = ({ events, currentUser, saveToMoodboard }) => {
	const [ restaurants, setRestaurants ] = useState([]);
	const [ checkedId, setCheckedId ] = useState(null);
	const [ restInfo, setRestInfo ] = useState({
		event_id: checkedId,
		inspiration_url: null,
		restaurant_name: "",
		restaurant_address: ""
	});
	const [ formErrors, setFormErrors ] = useState([]);

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

	let filteredEvents = currentUser.isAdmin
		? events
		: events.filter((e) => Object.values(e).includes(currentUser.username));

	const getEventId = (e) => {
		if (e.target.checked) {
			setCheckedId(e.target.value);
		}
	};

	const getRestaurantInfo = (e) => {
		let restName = e.target.parentNode.querySelector(".restName").innerText;
		let restAddr = e.target.parentNode.querySelector(".restAddr").innerText;
		setRestInfo({
			event_id: checkedId,
			restaurant_name: restName,
			restaurant_address: restAddr
		});
	};

	async function handleSubmit (e) {
		e.preventDefault();

		let result = await saveToMoodboard(restInfo);
		if (!result.success) {
			setFormErrors(result.errors);
		}
	}

	if (!events) return console.error(dict.consoleEventsError);
	if (!currentUser.username) return console.error(dict.consoleUserError);

	return (
		<div>
			<div className="Catering-form">
				<div className="Catering-new">
					<span className="Catering-bold">{dict.cateringLookup}</span>
					<p className="Catering-p">{dict.cateringInfo}</p>
					<p className="Catering-small">{dict.cateringFootnote}</p>
				</div>
				<SearchForm searchFor={getRestaurants} />
			</div>
			<div>
				<Form className="form-inline" onSubmit={handleSubmit}>
					<div className="Catering-row">
						<Row>
							{filteredEvents &&
								filteredEvents.map((event) => (
									<Col key={event.id}>
										<FormGroup check>
											<Label check>
												<Input
													type="checkbox"
													value={event.id}
													onChange={getEventId}
												/>{" "}
												{event.title}
											</Label>
										</FormGroup>
									</Col>
								))}
						</Row>
					</div>
					<Container className="Catering-cards">
						<Row xs="1" sm="2" md="4">
							{restaurants.map((item) => (
								<Col key={item.restaurant_id}>
									<Card
										key={item.restaurant_id}
										id={item.restaurant_id}
										className="Catering-card">
										<CardImg
											top
											className="Catering-card-img"
											width="100%"
											src={dict.cateringDefault}
											alt="restaurant image"
										/>
										<CardBody>
											<CardTitle tag="h5" className="restName">
												{item.restaurant_name}
											</CardTitle>
											{item.cuisines.length > 1 && (
												<CardSubtitle tag="h6" className="mb2 text-muted">
													Cuisine: {item.cuisines[0]}
												</CardSubtitle>
											)}
											{item.address && (
												<p>
													<a
														href={`http://maps.google.com/?q=${item
															.address["formatted"]}`}
														target="_blank"
														rel="noreferrer"
														tag="h6"
														className="mb2 text-muted restAddr">
														{item.address["formatted"]}
													</a>
												</p>
											)}
											{item.restaurant_phone && (
												<p>
													<a
														href={`tel:${item.restaurant_phone}`}
														tag="h6"
														className="mb2 text-muted">
														{item.restaurant_phone}
													</a>
												</p>
											)}
											{item.restaurant_website && (
												<p>
													<a
														href={item.restaurant_website}
														target="_blank"
														rel="noreferrer"
														tag="h6"
														className="mb2 text-muted">
														{dict.cateringWeb}
													</a>
												</p>
											)}
										</CardBody>
										{formErrors.length ? (
											<Alert type="danger" messages={formErrors} />
										) : null}

										<Button
											type="submit"
											className="Catering-btn btn-secondary"
											onClick={getRestaurantInfo}>
											Save!
										</Button>
									</Card>
								</Col>
							))}
						</Row>
					</Container>
				</Form>
			</div>
		</div>
	);
};

export default Catering;
