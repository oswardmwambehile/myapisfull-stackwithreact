import React, { useState } from "react";
import axios from "axios";
import "../styles/Auth.css";


export default function Register() {
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password1: "",
		password2: "",
	});
	const [isLoading, setIsLoading] = useState(false);
	const [successMessage, setSuccessMessage] = useState(null);
	const [error, setError] = useState(null);

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (isLoading) return;

		setIsLoading(true);
		setError(null);
		setSuccessMessage(null);

		try {
			const response = await axios.post("http://127.0.0.1:8000/api/register/", formData);
			console.log("Success!", response.data);
			setSuccessMessage("Registration Successful!");
		} catch (error) {
			console.log("Error during registration!", error.response?.data);
			if (error.response && error.response.data) {
				Object.keys(error.response.data).forEach((field) => {
					const errorMessages = error.response.data[field];
					if (errorMessages && errorMessages.length > 0) {
						setError(errorMessages[0]);
					}
				});
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="form-container">
			<form className="form" onSubmit={handleSubmit}>
				<h2>Register</h2>

				{error && <p className="error-message">{error}</p>}
				{successMessage && <p className="success-message">{successMessage}</p>}

				<div className="form-group">
					<label htmlFor="username">Username:</label>
					<input
						type="text"
						name="username"
						value={formData.username}
						onChange={handleChange}
						required
					/>
				</div>

				<div className="form-group">
					<label htmlFor="email">Email:</label>
					<input
						type="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						required
					/>
				</div>

				<div className="form-group">
					<label htmlFor="password1">Password:</label>
					<input
						type="password"
						name="password1"
						value={formData.password1}
						onChange={handleChange}
						required
					/>
				</div>

				<div className="form-group">
					<label htmlFor="password2">Confirm Password:</label>
					<input
						type="password"
						name="password2"
						value={formData.password2}
						onChange={handleChange}
						required
					/>
				</div>

				<button type="submit" className="form-button" disabled={isLoading}>
					{isLoading ? "Registering..." : "Register"}
				</button>

				{isLoading && (
					<div className="loading-indicator">
						<div className="spinner"></div>
					</div>
				)}
			</form>
		</div>
	);
}
