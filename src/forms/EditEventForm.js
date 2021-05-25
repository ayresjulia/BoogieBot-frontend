import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useParams } from "react-router-dom";
import BoogieBotApi from "../Api";
import { Row, Col } from "react-bootstrap";
import Alert from "../helpers/Alert";
import dict from "../helpers/dictionary";
import states from "../helpers/states";
import countries from "../helpers/countries";
import { v4 as uuid } from "uuid";
import "./EditEventForm.css";
import { useHistory } from "react-router-dom";

/** Form to edit user info in db. */

const EditEventForm = ({ events }) => {
	const history = useHistory();
	let { id } = useParams();

	let targetEvent = events.find((evt) => parseInt(evt.id) === parseInt(id));

	const INITIAL_STATE = {
		title: targetEvent.title,
		description: targetEvent.description,
		eventDate: targetEvent.eventDate,
		eventTime: targetEvent.eventTime,
		city: targetEvent.city,
		state: targetEvent.state,
		country: targetEvent.country,
		imgUrl: targetEvent.imgUrl || dict.defaultEventImg
	};
	const [ formData, setFormData ] = useState(INITIAL_STATE);
	const [ formErrors, setFormErrors ] = useState([]);
	const [ formSuccess, setFormSuccess ] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((formData) => ({
			...formData,
			[name]: value
		}));
	};

	/** Submit form and add new event data to db. */

	const handleSubmit = async () => {
		let eventData = {
			title: formData.title,
			description: formData.description,
			eventDate: formData.eventDate,
			eventTime: formData.eventTime,
			city: formData.city,
			state: formData.state,
			country: formData.country,
			imgUrl: formData.imgUrl
		};

		try {
			await BoogieBotApi.editEvent(id, eventData);
			setFormSuccess(true);
			history.push("/events");
		} catch (err) {
			setFormErrors(err);
			alert("Error");
			console.error(formErrors);
			return;
		}
		setFormData((form) => ({ ...form }));
		setFormErrors([]);
	};

	return (
		<div className="Form">
			<div className="Form-left">
				<span className="Form-update">{dict.editEventFormTip}</span>
				<p>{dict.editEventFormTipDesc}</p>
			</div>
			<div className="Form-right">
				<div className="font-weight-bold text-center mb-card-title event-title">
					Edit {targetEvent.title}
				</div>
				<Form className="Form-body" onSubmit={handleSubmit}>
					<Row>
						<Col md={6}>
							<FormGroup>
								<Label htmlFor="title">{dict.editEventFormTitle}</Label>
								<Input
									className="Form-input"
									name="title"
									id="title"
									value={formData.title}
									onChange={handleChange}
								/>
							</FormGroup>
						</Col>
						<Col md={6}>
							<FormGroup>
								<Label htmlFor="description">{dict.editEventFormDescription}</Label>
								<Input
									className="Form-input"
									name="description"
									id="description"
									value={formData.description}
									onChange={handleChange}
								/>
							</FormGroup>
						</Col>
					</Row>
					<Row>
						<Col md={6}>
							<FormGroup>
								<Label htmlFor="eventDate">{dict.editEventFormEventDate}</Label>
								<Input
									className="Form-input"
									type="date"
									name="eventDate"
									id="eventDate"
									value={formData.eventDate}
									onChange={handleChange}
									required
								/>
							</FormGroup>
						</Col>
						<Col md={6}>
							<FormGroup>
								<Label htmlFor="eventTime">{dict.editEventFormEventTime}</Label>
								<Input
									className="Form-input"
									type="time"
									name="eventTime"
									id="eventTime"
									value={formData.eventTime}
									onChange={handleChange}
									required
								/>
							</FormGroup>
						</Col>
					</Row>
					<Row>
						<Col md={6}>
							<FormGroup>
								<Label htmlFor="city">{dict.editEventFormCity}</Label>
								<Input
									className="Form-input"
									placeholder="city"
									name="city"
									id="city"
									value={formData.city}
									onChange={handleChange}
								/>
							</FormGroup>
						</Col>
						<Col md={2}>
							<FormGroup>
								<Label htmlFor="state" />
								<Input
									className="Form-input"
									type="select"
									name="state"
									id="state"
									value={formData.state}
									onChange={handleChange}>
									<option>state</option>
									{states.map((state) => <option key={uuid()}>{state}</option>)}
								</Input>
							</FormGroup>
						</Col>
						<Col md={4}>
							<FormGroup>
								<Label htmlFor="country" />
								<Input
									type="select"
									id="country"
									name="country"
									value={formData.country}
									className="Form-input"
									onChange={handleChange}>
									<option>country</option>
									{countries.map((country) => (
										<option key={uuid()}>{country}</option>
									))}
								</Input>
							</FormGroup>
						</Col>
					</Row>
					<FormGroup>
						<Label htmlFor="imgUrl" />
						<Input
							id="imgUrl"
							name="imgUrl"
							className="Form-input"
							value={formData.imgUrl}
							placeholder="event image url (optional)"
							onChange={handleChange}
						/>
					</FormGroup>
					{formSuccess ? (
						<Alert type="success" messages={[ "Updated successfully." ]} />
					) : null}
					<Button className="Form-btn btn-success">Save</Button>
				</Form>
			</div>
		</div>
	);
};

export default EditEventForm;
