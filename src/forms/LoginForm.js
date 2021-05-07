import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Alert from "../Alert";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import "./LoginForm.css";

/** Form to login a user and show homepage at "/" . */

const LoginForm = ({ login }) => {
	const history = useHistory();
	const [ formData, setFormData ] = useState({
		username: "",
		password: ""
	});
	const [ formErrors, setFormErrors ] = useState([]);

	async function handleSubmit (e) {
		e.preventDefault();
		let result = await login(formData);
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
		<div className="LoginForm">
			<Form className="Form-body" onSubmit={handleSubmit}>
				<FormGroup>
					<Label htmlFor="username">Username</Label>
					<Input
						id="username"
						name="username"
						className="Form-input"
						value={formData.username}
						onChange={handleChange}
						autoComplete="username"
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
						autoComplete="current-password"
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

export default LoginForm;
