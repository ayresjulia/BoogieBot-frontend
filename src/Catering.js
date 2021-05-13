import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Alert from "./helpers/Alert";
import SearchForm from "./forms/SearchForm";
import { Card, CardTitle, CardSubtitle, Button, CardImg, CardBody } from "reactstrap";
import "./Catering.css";
import { CLIENT_KEY_DOCUMENU } from "./secret";
import dict from "./helpers/dictionary";
import { Form, FormGroup, Label, Input, Row, Col } from "reactstrap";

const API_BASE_URL = "https://api.documenu.com/v2/restaurants/search/fields?";

const Catering = ({ events, currentUser, saveToMoodboard }) => {
	const [ restaurants, setRestaurants ] = useState([]);
	const [ checkedId, setCheckedId ] = useState(null); // get id of which event is checked
	const [ restId, setRestId ] = useState(null); // get id of which restaurant is clicked
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

	// FROM EVENT CHECKBOX FORM
	let filteredEvents = currentUser.isAdmin
		? events
		: events.filter((e) => Object.values(e).includes(currentUser.username));

	const getEventId = (e) => {
		if (e.target.checked) {
			setCheckedId(e.target.value); // got the id of checked event
		}
	};

	const getRestaurantID = (e) => {
		setRestId(e.target.value); // restaurant id
	};

	// SUBMIT FORM
	async function handleSubmit (e) {
		e.preventDefault();

		let result = await saveToMoodboard({
			event_id: parseInt(checkedId),
			inspiration_url: null,
			restaurant_key: restId
		});

		if (result.success) {
			setFormErrors(result.errors);
		}
	}

	if (!events) return <Redirect to="/" />;
	if (!currentUser.username) return <Redirect to="/" />;

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
									<Col m={4}>
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
					<div className="Catering-cards">
						{restaurants.map((item) => (
							<Card
								key={item.restaurant_id}
								id={item.restaurant_id}
								className="Catering-card">
								<CardImg
									top
									className="Catering-card-img"
									width="100%"
									src="https://images.unsplash.com/photo-1557962011-4b36a6f5d921?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
									alt="restaurant image"
								/>
								<CardBody>
									<CardTitle tag="h5">{item.restaurant_name}</CardTitle>
									{item.cuisines.length > 1 && (
										<CardSubtitle tag="h6" className="mb2 text-muted">
											Cuisine: {item.cuisines[0]}
										</CardSubtitle>
									)}
									{item.address && (
										<p>
											<a
												a
												href={`http://maps.google.com/?q=${item.address[
													"formatted"
												]}`}
												target="_blank"
												rel="noreferrer"
												tag="h6"
												className="mb2 text-muted">
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
												website
											</a>
										</p>
									)}
								</CardBody>
								{formErrors.length ? (
									<Alert type="danger" messages={formErrors} />
								) : null}

								<Button
									type="submit"
									id={item.restaurant_id}
									value={item.restaurant_id}
									className="Catering-btn btn-secondary"
									onClick={getRestaurantID}>
									Save!
								</Button>
							</Card>
						))}
					</div>
				</Form>
			</div>
		</div>
	);
};

export default Catering;
