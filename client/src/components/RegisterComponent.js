import React, { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { Redirect } from 'react-router-dom';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';

// Add Tailwind CSS CDN in your HTML file:
// <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">

const RegisterComponent = () => {
	const dispatch = useDispatch();
	const { error, auth } = useSelector((state) => state);

	useEffect(() => () => dispatch(clearErrors()), []);

	const schema = Yup.object().shape({
		username: Yup.string()
			.min(3, 'Username minimum 3 characters long!')
			.required('Username is required!'),
		email: Yup.string()
			.email('Invalid e-mail format!')
			.required('E-mail is required!'),
		password: Yup.string()
			.matches(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
				'Invalid password format!'
			)
			.required('Password is required!'),
		confirmPassword: Yup.string()
			.oneOf([Yup.ref('password'), null], 'Passwords have to be the same!')
			.required('Confirm password is required!'),
	});

	return (
		<div className="p-6">
			{auth.isAuthenticated ? <Redirect to="/" /> : null}
			{error.id === 'REGISTER_FAIL' ? (
				<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
					<p>{error.msg.message}</p>
				</div>
			) : null}
			<Formik
				initialValues={{
					username: '',
					email: '',
					password: '',
					confirmPassword: '',
				}}
				validationSchema={schema}
				onSubmit={(values, { setSubmitting }) => {
					dispatch(
						register({
							username: values.username,
							email: values.email,
							password: values.password,
							confirmPassword: values.confirmPassword,
						})
					);
					setSubmitting(false);
				}}
			>
				{({ errors, touched, isSubmitting }) => (
					<Form>
						<div className="mb-4 max-w-md">
							<div className="mb-4">
								<label 
									htmlFor="username" 
									className="block text-gray-700 text-sm font-bold mb-2"
								>
									Username
								</label>
								<Field
									type="text"
									name="username"
									id="username"
									className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
										errors.username && touched.username ? 'border-red-500' : ''
									}`}
								/>
								{errors.username && touched.username ? (
									<p className="text-red-500 text-xs italic mt-1">{errors.username}</p>
								) : null}
							</div>
							
							<div className="mb-4">
								<label 
									htmlFor="email" 
									className="block text-gray-700 text-sm font-bold mb-2"
								>
									E-mail
								</label>
								<Field
									type="email"
									name="email"
									id="email"
									className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
										errors.email && touched.email ? 'border-red-500' : ''
									}`}
								/>
								{errors.email && touched.email ? (
									<p className="text-red-500 text-xs italic mt-1">{errors.email}</p>
								) : null}
							</div>
							
							<div className="mb-4">
								<label 
									htmlFor="password" 
									className="block text-gray-700 text-sm font-bold mb-2"
								>
									Password
								</label>
								<Field
									type="password"
									name="password"
									id="password"
									className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
										errors.password && touched.password ? 'border-red-500' : ''
									}`}
								/>
								{errors.password && touched.password ? (
									<p className="text-red-500 text-xs italic mt-1">{errors.password}</p>
								) : null}
								<p className="text-gray-600 text-xs italic mt-1">
									At least 1 lowercase, 1 uppercase, 1 numeric, 1 special character and must be at least 8 characters long.
								</p>
							</div>
							
							<div className="mb-6">
								<label 
									htmlFor="confirm-password" 
									className="block text-gray-700 text-sm font-bold mb-2"
								>
									Confirm password
								</label>
								<Field
									type="password"
									name="confirmPassword"
									id="confirm-password"
									className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
										errors.confirmPassword && touched.confirmPassword ? 'border-red-500' : ''
									}`}
								/>
								{errors.confirmPassword && touched.confirmPassword ? (
									<p className="text-red-500 text-xs italic mt-1">{errors.confirmPassword}</p>
								) : null}
							</div>
							
							<div>
								<button
									type="submit"
									disabled={isSubmitting}
									className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full disabled:opacity-50"
								>
									Submit
								</button>
							</div>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default RegisterComponent;