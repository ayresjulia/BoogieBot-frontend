import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import "./EditProfileForm.css";
import BoogieBotApi from "../Api";
import { Row, Col } from "react-bootstrap";
import Alert from "../Alert";

/** Form to edit user info in db. */

const EditProfileForm = ({ currentUser }) => {
	console.log("CURRENTUSER", currentUser);
	const INITIAL_STATE = {
		username: currentUser.username,
		firstName: currentUser.firstName,
		lastName: currentUser.lastName,
		email: currentUser.email,
		profileUrl: currentUser.profileUrl,
		password: ""
	};
	const [ formData, setFormData ] = useState(INITIAL_STATE);
	const [ formErrors, setFormErrors ] = useState([]);
	const [ saveConfirmed, setSaveConfirmed ] = useState(false);

	const history = useHistory();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((formData) => ({
			...formData,
			[name]: value
		}));
	};

	/** Submit form and add new user data to db. */

	const handleSubmit = async (e) => {
		e.preventDefault();
		let profileData = {
			firstName: formData.firstName,
			lastName: formData.lastName,
			email: formData.email,
			profileUrl: formData.profileUrl,
			password: formData.password
		};
		try {
			let username = currentUser.username;
			let updatedUser = await BoogieBotApi.saveProfile(username, profileData);
			console.log(updatedUser);
		} catch (e) {
			setFormErrors(e);
			return;
		}
		setFormData((f) => ({ ...f, password: "" }));
		setFormErrors([]);
		setSaveConfirmed(true);

		history.push("/");
	};

	return (
		<div className="Form">
			<div className="Form-left">
				<span className="Form-update">tip.</span>
				<p>
					while updating your info, keep in mind, that picking a great playlist is key for
					any party!
				</p>
			</div>
			<div className="Form-right">
				<img
					className="Form-profile-pic"
					src={currentUser.profileUrl}
					alt="userprofilepicture"
				/>
				<p>
					<b>{currentUser.username}</b>
				</p>

				<Form className="Form-body" onSubmit={handleSubmit}>
					<Row form>
						<Col md={6}>
							<FormGroup>
								<Label htmlFor="firstName">First Name</Label>
								<Input
									className="Form-input"
									name="firstName"
									id="firstName"
									value={formData.firstName}
									onChange={handleChange}
								/>
							</FormGroup>
						</Col>
						<Col md={6}>
							<FormGroup>
								<Label htmlFor="lastName">Last Name</Label>
								<Input
									className="Form-input"
									name="lastName"
									id="lastName"
									value={formData.lastName}
									onChange={handleChange}
								/>
							</FormGroup>
						</Col>
					</Row>
					<FormGroup>
						<Label htmlFor="email">Email</Label>
						<Input
							className="Form-input"
							name="email"
							id="email"
							value={formData.email}
							onChange={handleChange}
						/>
					</FormGroup>
					<FormGroup>
						<Label htmlFor="profileUrl">Profile URL</Label>
						<Input
							className="Form-input"
							name="profileUrl"
							id="profileUrl"
							value={formData.profileUrl}
							onChange={handleChange}
						/>
					</FormGroup>
					<FormGroup>
						<Label htmlFor="password">Confirm password to make changes</Label>
						<Input
							className="Form-input"
							type="password"
							name="password"
							id="password"
							value={formData.password}
							onChange={handleChange}
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

export default EditProfileForm;
