import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Alert from "../Alert";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import "./SignupForm.css";

/** Form to signup a user and save user to db. */

const SignupForm = ({ signup }) => {
	const history = useHistory();
	const [ formData, setFormData ] = useState({
		username: "",
		password: "",
		firstName: "",
		lastName: "",
		email: ""
	});
	const [ formErrors, setFormErrors ] = useState([]);

	/** On submit, redirect to homepage "/". */

	async function handleSubmit (e) {
		e.preventDefault();
		let result = await signup(formData);
		if (result.success) {
			history.push("/");
		} else {
			setFormErrors(result.errors);
		}
	}

	function handleChange (e) {
		const { name, value } = e.target;
		setFormData((formData) => ({ ...formData, [name]: value }));
	}

	return (
		<div className="SignupForm">
			<Form className="Form-body" onSubmit={handleSubmit}>
				<FormGroup>
					<Label htmlFor="username">Username</Label>
					<Input
						id="username"
						name="username"
						className="Form-input"
						value={formData.username}
						onChange={handleChange}
						required
					/>
				</FormGroup>

				<FormGroup>
					<Label htmlFor="password">Password</Label>
					<Input
						id="password"
						type="password"
						name="password"
						className="Form-input"
						value={formData.password}
						onChange={handleChange}
						required
					/>
				</FormGroup>
				<FormGroup>
					<Label htmlFor="firstName">First Name</Label>
					<Input
						id="firstName"
						type="text"
						name="firstName"
						className="Form-input"
						value={formData.firstName}
						onChange={handleChange}
						required
					/>
				</FormGroup>
				<FormGroup>
					<Label htmlFor="lastName">Last Name</Label>
					<Input
						id="lastName"
						type="text"
						name="lastName"
						className="Form-input"
						value={formData.lastName}
						onChange={handleChange}
						required
					/>
				</FormGroup>
				<FormGroup>
					<Label htmlFor="email">Email</Label>
					<Input
						id="email"
						type="email"
						name="email"
						className="Form-input"
						value={formData.email}
						onChange={handleChange}
						required
					/>
				</FormGroup>

				{formErrors.length ? <Alert type="danger" messages={formErrors} /> : null}

				<Button className="btn btn-success float-right" onSubmit={handleSubmit}>
					Submit
				</Button>
			</Form>
		</div>
	);
};

export default SignupForm;
