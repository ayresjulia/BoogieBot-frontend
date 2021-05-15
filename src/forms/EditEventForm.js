import React, { useParams, useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import BoogieBotApi from "../Api";
import { Row, Col } from "react-bootstrap";
import Alert from "../helpers/Alert";
import dict from "../helpers/dictionary";
import states from "../helpers/states";
import countries from "../helpers/countries";

/** Form to edit user info in db. */

const EditEventForm = ({ events }) => {
	console.log("EVENTS", events);

	const { id } = useParams();
	let event = events.find((e) => e.id === id);

	console.log("EVENT", event, "ID", id);
	const INITIAL_STATE = {
		title: "",
		description: "",
		eventDate: "",
		eventTime: "",
		city: "",
		state: "",
		country: "",
		imageUrl: ""
	};
	const [ formData, setFormData ] = useState(INITIAL_STATE);
	const [ formErrors, setFormErrors ] = useState([]);
	const [ saveConfirmed, setSaveConfirmed ] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((formData) => ({
			...formData,
			[name]: value
		}));
	};

	/** Submit form and add new event data to db. */

	const handleSubmit = async (e) => {
		e.preventDefault();
		let eventData = {
			title: formData.title,
			description: formData.description,
			eventDate: formData.eventDate,
			eventTime: formData.eventTime,
			city: formData.city,
			state: formData.state,
			country: formData.country,
			imageUrl: formData.imageUrl
		};
		try {
			await BoogieBotApi.editEvent(id, eventData);
		} catch (e) {
			setFormErrors(e);
			return;
		}
		setFormData((form) => ({ ...form }));
		setFormErrors([]);
		setSaveConfirmed(true);
	};

	return (
		<div className="Form">
			<div className="Form-left">
				<span className="Form-update">{dict.editProfileFormTip}</span>
				<p>{dict.editProfileFormTipDesc}</p>
			</div>
			<div className="Form-right">
				<Form className="Form-body" onSubmit={handleSubmit}>
					<Row>
						<Col md={6}>
							<FormGroup>
								<Label htmlFor="title">Title</Label>
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
								<Label htmlFor="description">Description</Label>
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
					<FormGroup>
						<Label htmlFor="eventDate">Event Date</Label>
						<Input
							className="Form-input"
							type="date"
							name="eventDate"
							id="eventDate"
							value={formData.eventDate}
							onChange={handleChange}
						/>
					</FormGroup>
					<FormGroup>
						<Label htmlFor="eventTime">Event Time</Label>
						<Input
							className="Form-input"
							type="time"
							name="eventTime"
							id="eventTime"
							value={formData.eventTime}
							onChange={handleChange}
						/>
					</FormGroup>
					<Row>
						<Col md={6}>
							<FormGroup>
								<Label htmlFor="city">City</Label>
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
								<Label htmlFor="city">State</Label>
								<Input
									className="Form-input"
									type="select"
									name="city"
									id="city"
									value={formData.state}
									onChange={handleChange}>
									<option>state</option>
									{states.map((state) => <option>{state}</option>)}
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
									{countries.map((country) => <option>{country}</option>)}
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
							required
						/>
					</FormGroup>
					{formErrors.length ? <Alert type="danger" messages={formErrors} /> : null}

					{saveConfirmed ? (
						<Alert type="success" messages={[ "Updated successfully." ]} />
					) : null}
					<Button className="Form-btn btn-success">Save</Button>
				</Form>
			</div>
		</div>
	);
};

export default EditEventForm;
