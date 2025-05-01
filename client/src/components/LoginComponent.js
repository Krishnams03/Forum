import React, { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { Redirect, useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';

// Add Tailwind CSS CDN in your HTML file:
// <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">

const LoginComponent = () => {
    const dispatch = useDispatch();
    const { error, auth } = useSelector((state) => state);
    const { state } = useLocation();
    
    useEffect(() => () => dispatch(clearErrors()), []);
    
    const schema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid e-mail format!')
            .required('E-mail is required!'),
        password: Yup.string()
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
                'Invalid password format!'
            )
            .required('Password is required!'),
    });
    
    const { from } = state || { from: '/' };
    
    if (auth.isAuthenticated) {
        return (
            <Redirect
                to={{
                    pathname: from,
                    state: { notification: 'You have been logged in.' },
                }}
            />
        );
    }
    
    return (
        <div className="p-6">
            {error.id === 'LOGIN_FAIL' ? (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
                    <p>{error.msg.message}</p>
                </div>
            ) : null}
            
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={schema}
                onSubmit={(values, { setSubmitting }) => {
                    dispatch(
                        login({
                            email: values.email,
                            password: values.password,
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
                            
                            <div className="mb-6">
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

export default LoginComponent;