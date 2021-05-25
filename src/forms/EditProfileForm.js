import React, { useState, useContext } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import "./EditProfileForm.css";
import BoogieBotApi from "../Api";
import { Row, Col } from "react-bootstrap";
import Alert from "../helpers/Alert";
import dict from "../helpers/dictionary";
import UserContext from "../helpers/UserContext";

/** Form to edit user info in db. */

const EditProfileForm = () => {
	const { currentUser, setCurrentUser } = useContext(UserContext);

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
	const [ formSuccess, setFormSuccess ] = useState(false);
	const history = useHistory();

	const profile = currentUser.profileUrl === "" ? dict.userDefaultUrl : currentUser.profileUrl;

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

		let updatedUser;
		let username = currentUser.username;
		try {
			updatedUser = await BoogieBotApi.saveProfile(username, profileData);
			setFormSuccess(true);
			history.push("/");
		} catch (err) {
			setFormErrors(err);
			alert("Password is incorrect, please try again.");
			console.error(formErrors);
			return;
		}
		setFormData((form) => ({ ...form, password: "" }));
		setFormErrors([]);
		// trigger reloading of user information throughout the site
		setCurrentUser(updatedUser);
	};

	return (
		<div className="Form">
			<div className="Form-left">
				<span className="Form-update">{dict.editProfileFormTip}</span>
				<p>{dict.editProfileFormTipDesc}</p>
			</div>
			<div className="Form-right">
				<img className="Form-profile-pic" src={profile} alt="userprofilepicture" />
				<p>
					<b>{currentUser.username}</b>
				</p>

				<Form className="Form-body" onSubmit={handleSubmit}>
					<Row>
						<Col md={6}>
							<FormGroup>
								<Label htmlFor="firstName">{dict.formFirstName}</Label>
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
								<Label htmlFor="lastName">{dict.formLastName}</Label>
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
						<Label htmlFor="email">{dict.formEmail}</Label>
						<Input
							className="Form-input"
							name="email"
							id="email"
							value={formData.email}
							onChange={handleChange}
						/>
					</FormGroup>
					<FormGroup>
						<Label htmlFor="profileUrl">{dict.formProfileURL}</Label>
						<Input
							className="Form-input"
							name="profileUrl"
							id="profileUrl"
							value={formData.profileUrl}
							onChange={handleChange}
						/>
					</FormGroup>
					<FormGroup>
						<Label htmlFor="password">{dict.editProfileFormConfirmPwd}</Label>
						<Input
							className="Form-input"
							type="password"
							name="password"
							id="password"
							value={formData.password}
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

export default EditProfileForm;
